import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/guard';
import { getPrisma } from '@/lib/db';
import { seedAdminData } from '@/lib/admin/seed';

export const runtime = 'nodejs';

const columns = [
  'Titre',
  'Date début (AAAA-MM-JJ)',
  'Date fin (AAAA-MM-JJ)',
  'Date examen (AAAA-MM-JJ)',
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

type ImportSheet = { name: string; slug: string; location: string; registrationUrl: string; durationLabel?: string; priceLabel?: string; priceCents?: number };

const sheets: ImportSheet[] = [
  { name: 'APS', slug: 'aps', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/aps', durationLabel: '175 heures', priceLabel: '1 650 €', priceCents: 165000 },
  { name: 'A3P', slug: 'a3p-apr', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/a3p-apr' },
  { name: 'DESP Côte d’Azur', slug: 'desp-dssp', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/desp' },
  { name: 'DESP Paris', slug: 'desp-dssp', location: 'Paris · 142 rue de Rivoli, 75001 Paris', registrationUrl: '/formations-securite/desp' },
  { name: 'DESP Aurillac', slug: 'desp-dssp', location: 'Aurillac · 14 avenue du Garric, 15000 Aurillac', registrationUrl: '/formations-securite/desp' },
  { name: 'SSIAP 1', slug: 'ssiap-1', location: 'Puget-sur-Argens / Côte d’Azur', registrationUrl: '/formations-securite/ssiap-1' },
];

const statuses = new Set(['OPEN', 'FULL', 'COMING_SOON', 'HIDDEN']);
const escapeXml = (value: unknown) => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unescapeXml = (value: string) => value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
const safeDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value.trim()) ? new Date(`${value.trim()}T00:00:00.000Z`) : null;
const nullableNumber = (value: string) => value.trim() === '' ? null : Number(value);
const yes = (value: string) => ['oui', 'yes', 'true', '1', 'x'].includes(value.trim().toLowerCase());

function rowXml(values: unknown[]) {
  return `<Row>${values.map(value => `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`).join('')}</Row>`;
}

function workbookXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">${sheets.map(sheet => `<Worksheet ss:Name="${escapeXml(sheet.name)}"><Table>${rowXml(columns)}${rowXml([`Exemple ${sheet.name}`, '', '', '', 'OPEN', sheet.priceCents ?? '', sheet.priceLabel ?? '', sheet.location, '', '', sheet.registrationUrl, sheet.durationLabel ?? '', '', '', '0', 'non'])}</Table></Worksheet>`).join('')}</Workbook>`;
}

function cellsFromRow(rowXmlValue: string) {
  const cells = [...rowXmlValue.matchAll(/<Cell\b[^>]*>([\s\S]*?)<\/Cell>/gi)];
  return cells.map(cell => {
    const data = cell[1].match(/<Data\b[^>]*>([\s\S]*?)<\/Data>/i);
    return unescapeXml((data?.[1] || '').replace(/<[^>]+>/g, '').trim());
  });
}

function parseWorkbook(xml: string) {
  const sessions: Array<any> = [];
  for (const sheet of sheets) {
    const worksheet = [...xml.matchAll(/<Worksheet\b[^>]*(?:ss:)?Name="([^"]+)"[^>]*>([\s\S]*?)<\/Worksheet>/gi)].find(match => unescapeXml(match[1]) === sheet.name);
    if (!worksheet) continue;
    const rows = [...worksheet[2].matchAll(/<Row\b[^>]*>([\s\S]*?)<\/Row>/gi)].map(match => cellsFromRow(match[1])).slice(1);
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
  const xml = Buffer.from(await file.arrayBuffer()).toString('utf8');
  const parsed = parseWorkbook(xml);
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
