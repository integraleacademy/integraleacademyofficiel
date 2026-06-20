import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getPrisma } from '@/lib/db';
import { seedAdminData } from '@/lib/admin/seed';
import { inflateRawSync } from 'zlib';

export const runtime = 'nodejs';

const columns = [
  'Titre',
  'Date début (DD/MM/YYYY)',
  'Date fin (DD/MM/YYYY)',
  'Date examen (DD/MM/YYYY)',
  'Statut (OPEN/FULL/COMING_SOON/HIDDEN)',
  'Tarif centimes',
  'Libellé tarif',
  'Lieu',
  'Places totales',
  'Places restantes',
  'Lien inscription',
  'Durée',
  'Notes publiques',
  'Notes internes',
  'Ordre',
  'Mis en avant (oui/non)',
];

const columnWidths = [220, 130, 130, 140, 230, 110, 130, 260, 110, 125, 220, 130, 340, 300, 80, 145];

type SheetTheme = 'aps' | 'a3p' | 'desp' | 'neutral';
type ImportSheet = { name: string; slug: string; location: string; registrationUrl: string; theme: SheetTheme; durationLabel?: string; priceLabel?: string; priceCents?: number };

const sheets: ImportSheet[] = [
  { name: 'APS', slug: 'aps', theme: 'aps', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/aps', durationLabel: '175 heures', priceLabel: '1 650 €', priceCents: 165000 },
  { name: 'A3P', slug: 'a3p-apr', theme: 'a3p', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/a3p-apr' },
  { name: 'DESP Côte d’Azur', slug: 'desp-dssp', theme: 'desp', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/desp' },
  { name: 'DESP Paris', slug: 'desp-dssp', theme: 'desp', location: 'Paris · 142 rue de Rivoli, 75001 Paris', registrationUrl: '/formations-securite/desp' },
  { name: 'DESP Aurillac', slug: 'desp-dssp', theme: 'desp', location: 'Aurillac · 14 avenue du Garric, 15000 Aurillac', registrationUrl: '/formations-securite/desp' },
  { name: 'SSIAP 1', slug: 'ssiap-1', theme: 'neutral', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/ssiap-1' },
];

const themeStyle: Record<SheetTheme, { headerStyle: string; tabColorIndex: number }> = {
  aps: { headerStyle: 'HeaderAps', tabColorIndex: 44 },
  a3p: { headerStyle: 'HeaderA3p', tabColorIndex: 35 },
  desp: { headerStyle: 'HeaderDesp', tabColorIndex: 45 },
  neutral: { headerStyle: 'HeaderNeutral', tabColorIndex: 15 },
};

const statuses = new Set(['OPEN', 'FULL', 'COMING_SOON', 'HIDDEN']);
const escapeXml = (value: unknown) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unescapeXml = (value: string) => value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
const nullableNumber = (value: string) => value.trim() === '' ? null : Number(value);
const yes = (value: string) => ['oui', 'yes', 'true', '1', 'x'].includes(value.trim().toLowerCase());
const textOnly = (value: string) => unescapeXml(value.replace(/<[^>]+>/g, '').trim());

function safeDate(value: string) {
  const trimmed = value.trim();
  const french = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (french) return new Date(`${french[3]}-${french[2]}-${french[1]}T00:00:00.000Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? new Date(`${trimmed}T00:00:00.000Z`) : null;
}

function rowXml(values: unknown[], styleId = 'Cell', height?: number) {
  return `<Row${height ? ` ss:Height="${height}"` : ''}>${values.map(value => `<Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`).join('')}</Row>`;
}

function workbookStyles() {
  return `<Styles><Style ss:ID="Cell"><Alignment ss:Vertical="Top" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/></Borders></Style><Style ss:ID="Help"><Alignment ss:Vertical="Top" ss:WrapText="1"/><Font ss:Italic="1" ss:Color="#6B7280"/><Interior ss:Color="#F9FAFB" ss:Pattern="Solid"/></Style><Style ss:ID="HeaderAps"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Font ss:Bold="1" ss:Color="#111827"/><Interior ss:Color="#F7D887" ss:Pattern="Solid"/></Style><Style ss:ID="HeaderA3p"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1F9D55" ss:Pattern="Solid"/></Style><Style ss:ID="HeaderDesp"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#2563EB" ss:Pattern="Solid"/></Style><Style ss:ID="HeaderNeutral"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#6B7280" ss:Pattern="Solid"/></Style></Styles>`;
}

function worksheetXml(sheet: ImportSheet) {
  const theme = themeStyle[sheet.theme];
  const help = `Remplir une session par ligne. Dates obligatoires au format DD/MM/YYYY. Les lignes sans date début ou date fin sont ignorées. Statuts autorisés : OPEN, FULL, COMING_SOON, HIDDEN.`;
  const example = [`Exemple ${sheet.name}`, '', '', '', 'OPEN', sheet.priceCents ?? '', sheet.priceLabel ?? '', sheet.location, '', '', sheet.registrationUrl, sheet.durationLabel ?? '', '', '', '0', 'non'];
  return `<Worksheet ss:Name="${escapeXml(sheet.name)}"><Table>${columnWidths.map(width => `<Column ss:Width="${width}"/>`).join('')}${rowXml([help, '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], 'Help', 42)}${rowXml(columns, theme.headerStyle, 34)}${rowXml(example)}</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>2</SplitHorizontal><TopRowBottomPane>2</TopRowBottomPane><ActivePane>2</ActivePane><TabColorIndex>${theme.tabColorIndex}</TabColorIndex><ProtectObjects>False</ProtectObjects><ProtectScenarios>False</ProtectScenarios></WorksheetOptions></Worksheet>`;
}

function workbookXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">${workbookStyles()}${sheets.map(worksheetXml).join('')}</Workbook>`;
}

function cellsFromRow(rowXmlValue: string) {
  const cells = [...rowXmlValue.matchAll(/<Cell\b[^>]*>([\s\S]*?)<\/Cell>/gi)];
  return cells.map(cell => {
    const data = cell[1].match(/<Data\b[^>]*>([\s\S]*?)<\/Data>/i);
    return textOnly(data?.[1] || '');
  });
}

function rowsToSessions(rowsBySheet: Map<string, string[][]>) {
  const sessions: Array<any> = [];
  for (const sheet of sheets) {
    const allRows = rowsBySheet.get(sheet.name) || [];
    const headerIndex = allRows.findIndex(row => row.some(cell => cell.toLowerCase().includes('date début')));
    const rows = allRows.slice(headerIndex >= 0 ? headerIndex + 1 : 0);
    rows.forEach((cells, index) => {
      const startDate = safeDate(cells[1] || '');
      const endDate = safeDate(cells[2] || '');
      if (!startDate || !endDate) return;
      const status = statuses.has((cells[4] || '').trim()) ? (cells[4] || '').trim() : 'OPEN';
      sessions.push({
        sheet,
        data: {
          title: cells[0] || `${sheet.name} ${cells[1]}`,
          startDate,
          endDate,
          examDate: safeDate(cells[3] || ''),
          status,
          priceCents: nullableNumber(cells[5] || ''),
          priceLabel: cells[6] || sheet.priceLabel || '',
          location: cells[7] || sheet.location,
          seatsTotal: nullableNumber(cells[8] || ''),
          seatsLeft: nullableNumber(cells[9] || ''),
          showSeatsLeft: true,
          registrationUrl: cells[10] || sheet.registrationUrl,
          durationLabel: cells[11] || sheet.durationLabel || '',
          publicNotes: cells[12] || '',
          internalNotes: cells[13] || '',
          sortOrder: Number(cells[14] || index),
          isHighlighted: yes(cells[15] || ''),
        },
      });
    });
  }
  return sessions;
}

function parseXmlWorkbook(xml: string) {
  const rowsBySheet = new Map<string, string[][]>();
  for (const sheet of sheets) {
    const worksheet = [...xml.matchAll(/<Worksheet\b[^>]*(?:ss:)?Name="([^"]+)"[^>]*>([\s\S]*?)<\/Worksheet>/gi)].find(match => unescapeXml(match[1]) === sheet.name);
    if (!worksheet) continue;
    rowsBySheet.set(sheet.name, [...worksheet[2].matchAll(/<Row\b[^>]*>([\s\S]*?)<\/Row>/gi)].map(match => cellsFromRow(match[1])));
  }
  return rowsToSessions(rowsBySheet);
}

function unzip(buffer: Buffer) {
  const files = new Map<string, Buffer>();
  let eocd = -1;
  for (let index = buffer.length - 22; index >= 0; index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) { eocd = index; break; }
  }
  if (eocd < 0) return files;
  const entryCount = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);
  for (let entry = 0; entry < entryCount; entry += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) break;
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.subarray(offset + 46, offset + 46 + fileNameLength).toString('utf8');
    const localFileNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
    if (!name.endsWith('/')) files.set(name, method === 8 ? inflateRawSync(compressed) : compressed);
    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  return files;
}

function attr(xml: string, name: string) {
  return xml.match(new RegExp(`${name}="([^"]+)"`))?.[1] || '';
}

function columnIndex(reference: string) {
  const letters = (reference.match(/^[A-Z]+/i)?.[0] || '').toUpperCase();
  return letters.split('').reduce((total, letter) => total * 26 + letter.charCodeAt(0) - 64, 0) - 1;
}

function excelSerialToDate(value: string) {
  const serial = Number(value);
  if (!Number.isFinite(serial)) return value;
  const date = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
  return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;
}

function parseXlsx(buffer: Buffer) {
  const files = unzip(buffer);
  const workbook = files.get('xl/workbook.xml')?.toString('utf8') || '';
  const rels = files.get('xl/_rels/workbook.xml.rels')?.toString('utf8') || '';
  const sharedXml = files.get('xl/sharedStrings.xml')?.toString('utf8') || '';
  const sharedStrings = [...sharedXml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(match => textOnly(match[1]));
  const relById = new Map([...rels.matchAll(/<Relationship\b([^>]+)>/g)].map(match => [attr(match[1], 'Id'), attr(match[1], 'Target').replace(/^\//, '')]));
  const rowsBySheet = new Map<string, string[][]>();
  for (const sheetMatch of workbook.matchAll(/<sheet\b([^>]+)>/g)) {
    const sheetName = unescapeXml(attr(sheetMatch[1], 'name'));
    if (!sheets.some(sheet => sheet.name === sheetName)) continue;
    const relationshipId = attr(sheetMatch[1], 'r:id');
    const target = relById.get(relationshipId);
    const path = target ? `xl/${target.replace(/^xl\//, '')}` : '';
    const xml = files.get(path)?.toString('utf8');
    if (!xml) continue;
    const rows = [...xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)].map(row => {
      const values: string[] = [];
      for (const cell of row[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
        const index = columnIndex(attr(cell[1], 'r'));
        const targetIndex = index >= 0 ? index : values.length;
        const type = attr(cell[1], 't');
        const raw = cell[2].match(/<v>([\s\S]*?)<\/v>/)?.[1] || cell[2].match(/<t[^>]*>([\s\S]*?)<\/t>/)?.[1] || '';
        let value = type === 's' ? (sharedStrings[Number(raw)] || '') : textOnly(raw);
        if ([1, 2, 3].includes(targetIndex) && /^[0-9]+(?:\.[0-9]+)?$/.test(value)) value = excelSerialToDate(value);
        values[targetIndex] = value;
      }
      return values;
    });
    rowsBySheet.set(sheetName, rows);
  }
  return rowsToSessions(rowsBySheet);
}

function parseWorkbook(buffer: Buffer) {
  if (buffer.subarray(0, 2).toString('utf8') === 'PK') return parseXlsx(buffer);
  return parseXmlWorkbook(buffer.toString('utf8'));
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return new NextResponse(workbookXml(), {
    headers: {
      'Content-Type': 'application/vnd.ms-excel; charset=utf-8',
      'Content-Disposition': 'attachment; filename="modele-import-sessions.xls"',
    },
  });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const prisma = await getPrisma();
  if (!prisma) return NextResponse.json({ error: 'Base de données serveur indisponible.' }, { status: 503 });
  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'Fichier Excel manquant.' }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  const parsed = parseWorkbook(buffer);
  if (parsed.length === 0) return NextResponse.json({ error: 'Aucune session importée. Vérifiez que le fichier est bien le modèle Excel avec les onglets attendus et que les dates début/fin sont remplies au format DD/MM/YYYY.' }, { status: 400 });
  await seedAdminData(prisma);
  const trainings = await prisma.training.findMany({ where: { slug: { in: [...new Set(sheets.map(sheet => sheet.slug))] } } });
  const trainingBySlug = new Map(trainings.map((training: any) => [training.slug, training]));
  await prisma.$transaction(async (tx: any) => {
    await tx.trainingSession.deleteMany({});
    for (const item of parsed) {
      const training = trainingBySlug.get(item.sheet.slug);
      if (!training) continue;
      await tx.trainingSession.create({ data: { ...item.data, trainingId: training.id } });
    }
  });
  return NextResponse.json({ ok: true, importedCount: parsed.length });
}
