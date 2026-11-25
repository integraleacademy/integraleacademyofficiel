import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { PDFDocument } from 'pdf-lib';
import { ADMISSIONS_URL, SECURITY_PATHWAY_PDF } from '../src/data/admissions';
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

test('les deux périodes de présentiel et l’examen sont conservés dans le PDF', async () => {
  const model = sessionCalendar(toPublicSession({id:'exemple', title:'Session', startDate:'2027-02-01', endDate:'2027-02-26',
    remoteStartDate:'2027-02-01', remoteEndDate:'2027-02-05', inPersonStartDate:'2027-02-08', inPersonFirstEndDate:'2027-02-12',
    inPersonResumeDate:'2027-02-22', inPersonEndDate:'2027-02-26', examDate:'2027-03-01', location:'Paris'}));
  assert.deepEqual(model.phases.map(phase => phase.kind), ['distance','centre','centre','examen']);
  assert.equal(model.lastMonth, '2027-03-01');
  assert.match(model.address, /Grand Rex/);
  const pdf=await PDFDocument.load(await createCalendarPdf(model));
  assert.equal(pdf.getPageCount(), 2);
});

test('le PDF de janvier et les deux examens DMS accompagnent les promotions publiées', async () => {
  const original = await PDFDocument.load(readFileSync('public' + SECURITY_PATHWAY_PDF));
  assert.equal(original.getPageCount(),2);
  const model=sessionCalendar(toPublicSession(scheduledIntakes.find(session=>session.id==='rentree-2027-bachelor-dms')));
  assert.deepEqual(model.phases.filter(phase=>phase.kind==='examen').map(phase=>phase.label), ['Examen DESP','Examen SSIAP 3']);
  assert.ok(model.phases.some(phase=>phase.kind==='entreprise'));
});
