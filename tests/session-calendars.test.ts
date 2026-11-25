import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { hasDetailedCalendar } from '../src/lib/detailed-calendar-eligibility';
import test from 'node:test';
import { PDFDocument } from 'pdf-lib';
import { ADMISSIONS_URL } from '../src/data/admissions';
import { scheduledIntakes } from '../src/data/intakes';
import { sessionCalendarPosition } from '../src/lib/planning-calendar';
import { toPublicSession } from '../src/lib/public-session-data';
import { sessionCalendar } from '../src/lib/session-calendar';
import { createCalendarPdf } from '../src/lib/session-calendar-pdf';

test('les quinze formations de septembre et les deux promotions sécurité renvoient aux admissions', () => {
  const admissions = scheduledIntakes.filter(session => session.scheduleKind === 'admissions');
  assert.equal(admissions.length, 17);
  assert.ok(admissions.every(session => session.registrationUrl === ADMISSIONS_URL));
  assert.equal(admissions.filter(session => session.startDate.startsWith('2027-09')).length, 15);
  assert.equal(new Set(admissions.map(s => s.id)).size, admissions.length);
});

test('un mois de rentrée reste sans jour de présence et occupe un seul mois dans le planning', () => {
  const june = scheduledIntakes.find(session => session.id === 'parcours-securite-juin-2027')!;
  const model = sessionCalendar(toPublicSession(june));
  assert.ok(model.monthSteps.length > 0);
  assert.equal(model.phases.length, 0);
  assert.equal(sessionCalendarPosition(june, Date.UTC(2027,6,1), Date.UTC(2027,9,1)), null);
  const september = scheduledIntakes.find(session => session.id === 'rentree-2027-bts-mos')!;
  assert.ok(september);
  const bts = sessionCalendar(toPublicSession(september));
  assert.equal(bts.monthOnly, true);
  assert.equal(bts.phases.length, 0);
  assert.match(bts.note, /entreprise/i);
});

test('le calendrier A4 réunit les deux périodes de présentiel et le mois de l’examen sur une page', async () => {
  const model = sessionCalendar(toPublicSession({id:'exemple', title:'DESP Paris', training: { slug: 'desp-initial', name: 'DESP initial' }, startDate:'2027-02-01', endDate:'2027-02-26',
    remoteStartDate:'2027-02-01', remoteEndDate:'2027-02-05', inPersonStartDate:'2027-02-08', inPersonFirstEndDate:'2027-02-12',
    inPersonResumeDate:'2027-02-22', inPersonEndDate:'2027-02-26', examDate:'2027-03-01', location:'Paris'}));
  assert.deepEqual(model.phases.map(phase => phase.kind), ['distance','centre','centre','examen']);
  assert.deepEqual(model.phases.filter(phase => phase.kind === 'centre').map(phase => phase.label), [
    'Au centre de formation · période 1', 'Au centre de formation · période 2',
  ]);
  assert.equal(model.lastMonth, '2027-03-01');
  assert.match(model.address, /Grand Rex/);
  const pdf = await PDFDocument.load(await createCalendarPdf(model));
  assert.equal(pdf.getPageCount(), 1);
  assert.equal(pdf.getTitle(), 'Calendrier détaillé · DESP Paris');
  assert.match(pdf.getSubject() ?? '', /sous réserve de modifications/);
  const { width, height } = pdf.getPage(0).getSize();
  assert.ok(Math.abs(width - 595.28) < 0.1 && Math.abs(height - 841.89) < 0.1);
});

test('les périodes SSIAP entièrement présentielles utilisent le même libellé même sans découpage horaire', () => {
  for (const slug of ['ssiap-1', 'ssiap-3']) {
    const model = sessionCalendar(toPublicSession({
      id: 'session-ssiap', title: 'Session SSIAP', training: { slug }, location: 'Puget-sur-Argens',
      startDate: '2027-02-15', endDate: '2027-02-26', examDate: '2027-03-01',
    }));
    assert.equal(model.phases[0].kind, 'centre');
    assert.equal(model.phases[0].label, 'Au centre de formation');
    assert.equal(model.phases[1].kind, 'examen');
  }
});

test('la réserve de modifications est imprimée sur chaque page d’une session longue', {
  skip: spawnSync('pdftotext', ['-v']).error?.message.includes('ENOENT') && 'pdftotext indisponible',
}, async () => {
  const model = sessionCalendar(toPublicSession({
    id: 'session-longue', title: 'Session APS', training: { slug: 'aps', name: 'APS' },
    startDate: '2027-01-11', endDate: '2027-12-17', examDate: '2027-12-20', location: 'Puget-sur-Argens',
  }));
  const bytes = await createCalendarPdf(model);
  const document = await PDFDocument.load(bytes);
  assert.ok(document.getPageCount() > 1);
  const extracted = spawnSync('pdftotext', ['-enc', 'UTF-8', '-', '-'], { input: Buffer.from(bytes), encoding: 'utf8' });
  assert.equal(extracted.status, 0, extracted.stderr);
  const pages = extracted.stdout.split('\f').filter(page => page.trim());
  assert.equal(pages.length, document.getPageCount());
  for (const page of pages) assert.match(page, /Dates et horaires sous réserve de modifications/);
});

test('seules les formations initiales autorisées ont un calendrier détaillé', () => {
  const visible = (slug: string, title = '') => hasDetailedCalendar({ id: 'session', title, training: { slug } });
  for (const slug of ['aps', 'ssiap-1', 'ssiap-3', 'desp-initial', 'desp-dssp']) assert.ok(visible(slug), slug);
  assert.ok(visible('ssiap-1', 'SSIAP 1 avec SST'));
  for (const slug of ['ssiap-2', 'recyclage-ssiap-1', 'remise-a-niveau-ssiap-3', 'desp-vae', 'a3p-apr', 'vtc', 'bts-mos', 'parcoursalternance']) assert.equal(visible(slug), false, slug);
  for (const session of scheduledIntakes) assert.equal(hasDetailedCalendar(session), false, session.id);
  assert.equal(visible('ssiap-1', 'RAN SSIAP 1'), false);
  assert.equal(visible('desp-dssp', 'Jury VAE'), false);
});
