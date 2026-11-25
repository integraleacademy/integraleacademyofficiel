import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, PageSizes, type PDFImage } from 'pdf-lib';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { CalendarPage, CONTENT, HEIGHT, MARGIN, WIDTH, palette, type PdfFonts } from './calendar-pdf-page';
import { calendarMonths, calendarWeeks, capitalized, drawLegend, drawMonth, monthCardHeight, phaseAccent } from './calendar-pdf-months';
import { calendarMonthName, type PhaseKind, type SessionCalendar } from './session-calendar';
import type { DetailedCalendarCourse } from './detailed-calendar-eligibility';

const courses: Record<DetailedCalendarCourse, { label: string; name: string }> = {
  aps: { label: 'TFP APS', name: 'Agent de prévention et de sécurité' },
  'ssiap-1': { label: 'SSIAP 1', name: 'Agent de sécurité incendie' },
  'ssiap-3': { label: 'SSIAP 3', name: 'Chef de service de sécurité incendie' },
  'desp-initial': { label: 'DESP initial', name: 'Dirigeant d’entreprise de sécurité privée' },
};
const dateRange = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const fullDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const timeSlot = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
const bottom = HEIGHT - 70;
const NOTICE = 'Dates et horaires sous réserve de modifications';

type Stage = { label: string; date: string; kind: PhaseKind };
type Fact = { name: string; value: string };

function sessionOrganisation(model: SessionCalendar) {
  // A dated recap from the public listing can also carry the duration of each stage.
  // Omit it from the notes only when all four dates match the actual calendar.
  const recap = /^(?:e-learning|distanciel) du (\d{2}\/\d{2}\/\d{4}) au (\d{2}\/\d{2}\/\d{4})(?: \(([^()]+)\))?\s*·\s*présentiel du (\d{2}\/\d{2}\/\d{4}) au (\d{2}\/\d{2}\/\d{4})(?: \(([^()]+)\))?\.?$/i.exec(model.publicNotes.trim());
  const distance = model.phases.filter(p => p.kind === 'distance');
  const centre = model.phases.filter(p => p.kind === 'centre');
  const frenchDate = (key: string) => key.split('-').reverse().join('/');
  const matches = recap && distance.length === 1 && centre.length === 1 &&
    [distance[0].start, distance[0].end, centre[0].start, centre[0].end]
      .every((key, i) => frenchDate(key) === [recap[1], recap[2], recap[4], recap[5]][i]);
  const multiYear = model.firstMonth.slice(0, 4) !== model.lastMonth.slice(0, 4);
  const shortDay = (key: string) => timeSlot.format(new Date(key)) + (multiYear ? ' ' + key.slice(0, 4) : '');
  const stages: Stage[] = model.phases.map(phase => {
    const hours = matches && (phase.kind === 'distance' ? recap[3] : phase.kind === 'centre' ? recap[6] : '');
    return {
      label: phase.label + (hours ? ' · ' + hours : ''),
      date: capitalized(shortDay(phase.start)) + (phase.end === phase.start ? '' : ' au ' + shortDay(phase.end)),
      kind: phase.kind,
    };
  });
  if (model.monthSteps.length) {
    for (const step of model.monthSteps) stages.push({ label: step.title + ' · ' + step.detail, date: step.date, kind: 'formation' });
  }
  const notes = matches ? '' : model.publicNotes.trim();
  return { stages, notes };
}

function summary(model: SessionCalendar): Fact[] {
  const period = model.monthOnly ? capitalized(calendarMonthName(model.start)) : dateRange.formatRange(new Date(model.start), new Date(model.end));
  const facts = [{ name: model.monthOnly ? 'Rentrée' : 'Dates de formation', value: period }];
  // Some imported SSIAP sessions have only an internal number in the duration field.
  const duration = /^\d+$/.test(model.duration.trim()) ? '' : model.duration.replace(/\bheures?\b/i, 'h');
  const sst = model.sessionTitle.match(/\b(avec|sans) SST\b/i)?.[0];
  if (sst) facts.push({ name: 'Formule', value: [capitalized(sst), duration].filter(Boolean).join(' · ') });
  else if (duration) facts.push({ name: 'Durée de formation', value: duration });
  const exam = model.phases.find(p => p.kind === 'examen');
  if (exam) facts.push({ name: 'Examen', value: capitalized(fullDate.format(new Date(exam.start))) });
  return facts;
}

function masthead(page: CalendarPage, model: SessionCalendar, logo: PDFImage, picture: PDFImage | null, compact: boolean) {
  const course = model.course ? courses[model.course] : null;
  const label = course?.label || model.title;
  if (compact) {
    page.box(0, 0, WIDTH, 56, palette.navy);
    page.image(logo, MARGIN, 12, 98, 98 * logo.height / logo.width);
    const title = page.words(label + '  /  Calendrier détaillé', CONTENT - 115, 11, 'bold')[0];
    page.right(title, WIDTH - MARGIN, 21, 11, 'bold', palette.paper);
    return 80;
  }
  const artWidth = 202, artHeight = 131;
  const textWidth = picture ? CONTENT - artWidth - 24 : CONTENT;
  const titleSize = label.length > 18 ? 25 : 39;
  const names = page.words(label, textWidth, titleSize, 'bold');
  const description = course?.name || model.courseTitle;
  const descriptionLines = page.words(description, textWidth, 11.5);
  const titleTop = 70;
  const descriptionTop = titleTop + names.length * titleSize * 1.15 + 3;
  const height = Math.max(165, descriptionTop + descriptionLines.length * 16 + 17);
  page.box(0, 0, WIDTH, height, palette.navy);
  page.box(0, 0, WIDTH, 3.5, palette.gold);
  page.image(logo, MARGIN, 15, 111, 111 * logo.height / logo.width);
  page.text('CALENDRIER DÉTAILLÉ  /  ' + calendarMonthName(model.start).toLocaleUpperCase('fr-FR'), MARGIN, 55, 8.5, 'bold', palette.gold);
  names.forEach((line, i) => page.text(line, MARGIN - 1, titleTop + i * titleSize * 1.15, titleSize, 'bold', palette.paper));
  descriptionLines.forEach((line, i) => page.text(line, MARGIN, descriptionTop + i * 16, 11.5, 'body', palette.light));
  if (picture) {
    const x = WIDTH - MARGIN - artWidth, top = (height - artHeight) / 2 + 1;
    page.box(x + 3, top + 3, artWidth, artHeight, palette.gold, 11);
    page.image(picture, x, top, artWidth, artHeight, 11);
  }
  return height + 15;
}

function drawFacts(page: CalendarPage, facts: Fact[], y: number) {
  const gap = 8;
  const width = (CONTENT - (facts.length - 1) * gap) / facts.length;
  const lines = facts.map(fact => page.words(fact.value, width - 22, 12, 'bold'));
  const height = 36 + Math.max(...lines.map(text => text.length)) * 15;
  facts.forEach((fact, i) => {
    const x = MARGIN + i * (width + gap);
    const isExam = fact.name === 'Examen';
    page.box(x, y, width, height, isExam ? palette.cream : palette.pale, 7);
    page.text(fact.name.toLocaleUpperCase('fr-FR'), x + 11, y + 8, 8, 'bold', isExam ? '#785415' : palette.muted);
    lines[i].forEach((line, j) => page.text(line, x + 11, y + 24 + j * 15, 12, 'bold'));
  });
  return y + height;
}

export async function createCalendarPdf(model: SessionCalendar) {
  const months = calendarMonths(model);
  const { stages, notes } = sessionOrganisation(model);
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle('Calendrier détaillé · ' + (model.sessionTitle || model.title));
  doc.setSubject([model.title, model.location, NOTICE].join(' · '));
  doc.setAuthor('Intégrale Academy');
  doc.setLanguage('fr-FR');
  const asset = (filename: string) => readFile(path.join(process.cwd(), 'public', filename));
  const [body, bold, logo, picture] = await Promise.all([
    asset('fonts/entreprises/Poppins-Regular-latin.ttf').then(bytes => doc.embedFont(bytes, { subset: true })),
    asset('fonts/entreprises/Poppins-SemiBold-latin.ttf').then(bytes => doc.embedFont(bytes, { subset: true })),
    asset('documents/calendriers/integrale-academy.png').then(bytes => doc.embedPng(bytes)),
    model.course ? asset('documents/calendriers/' + model.course + '.jpg').then(bytes => doc.embedJpg(bytes)) : null,
  ]);
  const fonts: PdfFonts = { body, bold };
  const pages: CalendarPage[] = [];
  function nextPage() {
    const page = new CalendarPage(doc.addPage(PageSizes.A4), fonts);
    const top = masthead(page, model, logo, picture, pages.length > 0);
    pages.push(page);
    return { page, top };
  }
  let { page, top } = nextPage();
  const cohort = model.sessionTitle || model.title;
  top = drawFacts(page, summary(model), top) + 20;

  const kinds = [...new Set(model.phases.map(p => p.kind))];
  const campus = model.address || model.location;
  const additional = model.monthOnly ? model.note : notes;
  const caption = 'Les couleurs indiquent les périodes. Votre convocation précise les jours et horaires de présence' +
    (kinds.includes('examen') ? ' ainsi que le lieu d’examen.' : '.');
  const boxPad = 13, infoSplit = CONTENT * .44;
  const addressLines = campus.split(/ · |, (?=\d{5} )/).flatMap(s => page.words(s, infoSplit - boxPad * 2, 9.9, 'bold'));
  const infoLines = [additional, model.monthOnly ? '' : caption].filter(Boolean).flatMap(s => page.words(s, CONTENT - infoSplit - boxPad * 2, 8.8));
  const columns = Math.min(3, months.length);
  const gap = 8, width = (CONTENT - (columns - 1) * gap) / columns;
  const preferredDayHeight = stages.length >= 4 ? 22 : columns === 1 ? 31 : 29;
  const infoHeight = 31 + Math.max(addressLines.length, infoLines.length) * 13;
  const split = CONTENT * .55;
  const agenda = stages.map(stage => {
    const label = page.words(stage.label, split - 24, 11, 'bold');
    const dates = page.words(stage.date, CONTENT - split - 9, 10.6);
    const height = Math.max(stages.length >= 4 ? 35 : 41, 18 + Math.max(label.length, dates.length) * 15);
    return { ...stage, label, dates, height };
  });
  const agendaHeight = (agenda.length ? 46 : 0) + agenda.reduce((total, row) => total + row.height, 0);
  function calendarHeading() {
    page.text('Calendrier mois par mois', MARGIN, top, 17.5, 'bold');
    top = drawLegend(page, kinds, MARGIN, top + 29, CONTENT) + 8;
  }
  calendarHeading();
  for (let i = 0; i < months.length; i += columns) {
    const group = months.slice(i, i + columns);
    const weeks = Math.max(...group.map(calendarWeeks));
    // For short sessions, size the grid around the actual weeks and the space needed
    // for the dated stages and notes. Longer schedules flow onto additional pages.
    const free = bottom - top - monthCardHeight(0, weeks) - 9 - agendaHeight - 16 - infoHeight - 2;
    const dayHeight = months.length <= 3 ? Math.max(16, Math.min(preferredDayHeight, Math.floor(free / weeks))) : 19;
    const cardHeight = monthCardHeight(dayHeight, weeks);
    if (top + cardHeight > bottom) { ({ page, top } = nextPage()); calendarHeading(); }
    group.forEach((month, col) => drawMonth(page, model, month, MARGIN + col * (width + gap), top, width, dayHeight, weeks));
    top += cardHeight + 9;
  }

  function stageHeading() {
    page.text('Déroulement de la session', MARGIN, top, 16.5, 'bold');
    page.right('Dates incluses', WIDTH - MARGIN, top + 5, 8.5, 'body', palette.muted);
    top += 34;
  }
  if (stages.length) {
    top += 12;
    if (top + 72 > bottom) ({ page, top } = nextPage());
    stageHeading();
  }
  for (const { label, dates, height, kind } of agenda) {
    if (top + height > bottom) { ({ page, top } = nextPage()); stageHeading(); }
    page.box(MARGIN, top, CONTENT, .7, palette.line);
    page.box(MARGIN + 1, top + 10, 3, height - 20, phaseAccent(kind), 1.4);
    label.forEach((line, i) => page.text(line, MARGIN + 13, top + (height - label.length * 15) / 2 + i * 15, 11, 'bold'));
    dates.forEach((line, i) => page.right(line, WIDTH - MARGIN, top + (height - dates.length * 15) / 2 + i * 15, 10.6));
    top += height;
  }
  if (stages.length) page.box(MARGIN, top, CONTENT, .7, palette.line);
  top += 16;

  let addressIndex = 0, infoIndex = 0;
  while (addressIndex < addressLines.length || infoIndex < infoLines.length) {
    const remaining = Math.max(addressLines.length - addressIndex, infoLines.length - infoIndex);
    if (bottom - top < Math.min(70, 31 + remaining * 13)) ({ page, top } = nextPage());
    const capacity = Math.floor((bottom - top - 31) / 13);
    const address = addressLines.slice(addressIndex, addressIndex + capacity);
    const info = infoLines.slice(infoIndex, infoIndex + capacity);
    const height = 31 + Math.max(address.length, info.length) * 13;
    const y = pages.length === 1 ? Math.max(top, bottom - height) : top;
    page.box(MARGIN, y, CONTENT, height, '#F1F5F6', 8);
    page.box(MARGIN + infoSplit, y + 11, .75, height - 22, '#D2DCE0');
    page.text('LIEU DE FORMATION', MARGIN + boxPad, y + 7, 7.6, 'bold', palette.muted);
    page.text('ORGANISATION', MARGIN + infoSplit + boxPad, y + 7, 7.6, 'bold', palette.muted);
    address.forEach((s, i) => page.text(s, MARGIN + boxPad, y + 20 + i * 13, 9.9, 'bold'));
    info.forEach((s, i) => page.text(s, MARGIN + infoSplit + boxPad, y + 20 + i * 13, 8.8));
    addressIndex += address.length;
    infoIndex += info.length;
    top = y + height;
  }

  pages.forEach((p, i) => {
    const y = HEIGHT - 60;
    p.box(MARGIN, y, CONTENT, 27, palette.cream, 6);
    p.box(MARGIN + 8, y + 7, 3, 13, '#A77519', 1);
    p.text(NOTICE, MARGIN + 17, y + 5.5, 11, 'bold');
    p.right(String(i + 1) + ' / ' + pages.length, WIDTH - MARGIN - 10, y + 8, 8.2, 'bold', palette.muted);
    const sessionName = p.words(cohort, CONTENT - 175, 7.7);
    sessionName.slice(0, 2).forEach((line, j) => p.text(line, MARGIN, y + 33 + j * 10, 7.7, 'body', palette.muted));
    p.right('Intégrale Academy · 04 22 47 07 68', WIDTH - MARGIN, y + 33, 7.7, 'body', palette.muted);
  });
  return doc.save();
}
