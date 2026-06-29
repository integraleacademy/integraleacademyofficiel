import 'server-only';
import { execFile } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { getPrisma } from '@/lib/db';

const execFileAsync = promisify(execFile);
const centre = { name: 'Intégrale Academy', street: '54 chemin du Carreou', zip: '83480', city: 'Puget-sur-Argens' };
const espaceUrl = 'https://gestionstagiaires-r5no.onrender.com/espacestagiaire';

function formatDate(value: Date | string) { return new Date(value).toLocaleDateString('fr-FR'); }
function safeName(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9-]+/gi, '-').replace(/-+/g, '-').toLowerCase(); }
function isAps(training?: { name?: string; title?: string; slug?: string; category?: string } | null) { return [training?.name, training?.title, training?.slug, training?.category].filter(Boolean).some(v => String(v).toLowerCase().includes('aps')); }
function templatePath() { const root = process.cwd(); return [path.join(root, 'gestionstagiaires/templaces_word/convocationaps.docx'), path.join(root, 'gestionstagiaires/templates_word/convocationaps.docx'), path.join(root, 'templaces_word/convocationaps.docx'), path.join(root, 'templates_word/convocationaps.docx')]; }
async function existingTemplate() { for (const candidate of templatePath()) { try { await readFile(candidate); return candidate; } catch {} } throw new Error('modèle Word convocationaps.docx introuvable'); }

async function fillDocx(template: string, output: string, variables: Record<string, string>) {
  const script = `import zipfile,sys,re\nsrc,dst=sys.argv[1],sys.argv[2]\nvals=dict(a.split('=',1) for a in sys.argv[3:])\nwith zipfile.ZipFile(src) as zin, zipfile.ZipFile(dst,'w',zipfile.ZIP_DEFLATED) as zout:\n  for item in zin.infolist():\n    data=zin.read(item.filename)\n    if item.filename.startswith('word/') and item.filename.endswith('.xml'):\n      txt=data.decode('utf-8')\n      for k,v in vals.items():\n        for token in ('{{'+k+'}}','{'+k+'}','['+k+']'):\n          txt=txt.replace(token, v)\n      data=txt.encode('utf-8')\n    zout.writestr(item, data)`;
  await execFileAsync('python3', ['-c', script, template, output, ...Object.entries(variables).map(([k, v]) => `${k}=${v}`)]);
}

async function convertToPdf(docxPath: string, outDir: string) { await execFileAsync('soffice', ['--headless', '--convert-to', 'pdf', '--outdir', outDir, docxPath]); return path.join(outDir, `${path.basename(docxPath, '.docx')}.pdf`); }
async function sendEmail(to: string, pdfPath: string, firstName: string) {
  if (!process.env.RESEND_API_KEY) return;
  const pdf = await readFile(pdfPath);
  const html = `<div style="background:#f6f3ee;padding:28px;font-family:Arial,sans-serif;color:#1c1917"><div style="max-width:680px;margin:auto;background:#fff;border:1px solid #eadfce;border-radius:22px;padding:30px"><h1 style="margin:0;color:#111827">Intégrale Academy</h1><p>Bonjour ${firstName},</p><p>Nous vous confirmons votre inscription à la formation APS.</p><p>Vous trouverez en pièce jointe votre convocation officielle comprenant les informations importantes liées à votre formation, au e-learning, à l’examen, aux documents administratifs à déposer et aux informations pratiques d’accès au centre.</p><p>Merci de lire attentivement l’ensemble du document.</p><p><a href="${espaceUrl}" style="display:inline-block;background:#d8a640;color:#211805;text-decoration:none;border-radius:999px;padding:14px 20px;font-weight:700">Accéder à mon espace stagiaire</a></p><p>En cas de question, contactez-nous au 04 22 47 07 68 ou par email à ecole@integraleacademy.com.</p><p>À très bientôt,<br><b>Intégrale Academy</b><br>54 chemin du Carreou<br>83480 Puget-sur-Argens<br>04 22 47 07 68</p></div></div>`;
  const res = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.MAIL_FROM || 'Intégrale Academy <onboarding@resend.dev>', to, subject: 'Votre convocation officielle APS – Intégrale Academy', html, attachments: [{ filename: path.basename(pdfPath), content: pdf.toString('base64') }] }) });
  if (!res.ok) throw new Error(`envoi email impossible (${res.status})`);
}

export async function generateAndSendApsConvocation(traineeId: string) {
  const prisma = await getPrisma(); if (!prisma) throw new Error('Base de données serveur indisponible.');
  const trainee = await prisma.trainee.findUnique({ where: { id: traineeId }, include: { training: true, session: { include: { training: true } } } });
  if (!trainee) throw new Error('Stagiaire introuvable.');
  const training = trainee.session?.training || trainee.training; if (!isAps(training)) throw new Error('Ce stagiaire n’est pas inscrit sur une formation APS.');
  if (!trainee.email) throw new Error('Impossible d’envoyer la convocation : email stagiaire manquant');
  if (!trainee.session?.startDate) throw new Error('Impossible d’envoyer la convocation : date de début manquante');
  if (!trainee.session?.endDate) throw new Error('Impossible d’envoyer la convocation : date de fin manquante');
  if (!trainee.session?.examDate) throw new Error('Impossible d’envoyer la convocation : date d’examen manquante');
  const dir = path.join(process.cwd(), 'generated-documents', 'convocations-aps'); await mkdir(dir, { recursive: true });
  const base = `convocation-aps-${safeName(trainee.lastName)}-${safeName(trainee.firstName)}-${trainee.id}`;
  const docxPath = path.join(dir, `${base}-${randomUUID()}.docx`);
  const template = await existingTemplate();
  const vars = { civilite: trainee.civility || '', prenom: trainee.firstName, nom: trainee.lastName, formation: training?.name || training?.title || 'Formation APS', nom_formation: training?.name || training?.title || 'Formation APS', dates_formation: `du ${formatDate(trainee.session.startDate)} au ${formatDate(trainee.session.endDate)}`, date_debut: formatDate(trainee.session.startDate), date_convocation: formatDate(trainee.session.startDate), heure_convocation: '08h30', date_examen: formatDate(trainee.session.examDate), heure_examen: '08h00', lieu_formation: `${centre.name} - ${centre.street} - ${centre.zip} ${centre.city}`, adresse_centre: centre.street, code_postal: centre.zip, ville: centre.city, date_jour: formatDate(new Date()) };
  await fillDocx(template, docxPath, vars);
  const generatedPdf = await convertToPdf(docxPath, dir);
  const finalPdf = path.join(dir, `${base}.pdf`); await writeFile(finalPdf, await readFile(generatedPdf));
  await sendEmail(trainee.email, finalPdf, trainee.firstName);
  return prisma.trainee.update({ where: { id: trainee.id }, data: { convocationApsStatus: 'sent', convocationApsSentAt: new Date(), convocationApsPdfPath: finalPdf, convocationApsLastError: null }, include: { training: true, session: { include: { training: true } } } });
}

export { isAps };
