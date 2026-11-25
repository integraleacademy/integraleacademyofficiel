import { alternanceSessions } from '@/data/employer-intakes';
import { dmsExams, dmsPeriods } from '@/data/dms-periods';
import { PARIS_ADDRESS, PARIS_LANDMARK, PUGET_ADDRESS } from '@/data/locations';
import { detailedCalendarCourse } from './detailed-calendar-eligibility';
import { inPersonPeriods, parisDateKey } from './public-sessions';
import type { toPublicSession } from './public-session-data';

export type PublicCalendarSession = ReturnType<typeof toPublicSession>;
export type PhaseKind = 'formation' | 'distance' | 'centre' | 'entreprise' | 'examen' | 'inscription';
type Phase = { kind: PhaseKind; label: string; start: string; end: string; detail: string };
export type SessionCalendar = ReturnType<typeof sessionCalendar>;

function day(value: unknown) {
  if (!(typeof value === 'string' || value instanceof Date) || !Number.isFinite(+new Date(value))) return '';
  return parisDateKey(new Date(value));
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
export function calendarDate(key: string) { return dateFormat.format(new Date(key)); }
export function calendarMonthName(key: string) { return monthFormat.format(new Date(key)); }

export function sessionCalendar(session: PublicCalendarSession) {
  const phases: Phase[] = [];
  function add(kind: PhaseKind, label: string, from: unknown, to: unknown, detail = '') {
    const start = day(from), end = day(to) || start;
    if (start && end >= start) phases.push({ kind, label, start, end, detail });
  }
  const start = day(session.startDate);
  const end = day(session.endDate) || start;
  const dms = session.id === 'rentree-2027-bachelor-dms';
  const vtc = session.scheduleKind === 'vtc-exam';
  const monthOnly = session.datePrecision === 'month';
  const location = String(session.location || 'Lieu à préciser');
  const address = /paris/i.test(location) ? `${PARIS_ADDRESS} · ${PARIS_LANDMARK}`
    : /puget|côte d.azur/i.test(location) ? PUGET_ADDRESS : '';
  if (dms) {
    for (const period of dmsPeriods) add(period.course === 'DESP' ? 'formation' : period.course ? 'centre' : 'entreprise',
      period.course ?? 'En entreprise', period.start, period.end, period.course ? `${period.hours} h · ${period.topic}` : 'Selon le planning de l’employeur.');
    for (const exam of dmsExams) add('examen', exam.label, exam.start, exam.end, 'Dates prévisionnelles à confirmer avec les jurys.');
  } else if (vtc) {
    add('inscription', 'Clôture des inscriptions', start, start, 'Transmettre le dossier avant 12 h.');
    add('examen', 'Examen théorique', session.vtcDates?.theory, null, 'Semaine indiquée. Date précise sur convocation.');
    add('examen', 'Examen pratique', session.vtcDates?.practical, null, 'Semaine indiquée. Date précise sur convocation.');
  } else if (!monthOnly) {
    add('distance', 'Formation à distance', session.remoteStartDate, session.remoteEndDate, 'Travail à distance sur la période indiquée.');
    const onsite = inPersonPeriods(session);
    onsite.forEach((period, index) => add('centre', onsite.length > 1 ? `En centre · période ${index + 1}` : 'Formation en centre', period.start, period.end, location));
    if (!phases.length) add('formation', 'Période de formation', start, end, 'Les horaires de présence sont précisés par l’école.');
    add('examen', 'Examen', session.examDate, null, 'Horaires et lieu de passage sur convocation.');
  }
  phases.sort((a, b) => a.start.localeCompare(b.start));
  const title = String(session.training?.name || session.title || 'Session de formation');
  const monthSteps = session.id === 'parcours-securite-juin-2027' ? alternanceSessions[1].steps : [];
  const note = monthOnly ? [session.publicNotes, 'Le jour de rentrée, les dates de cours et les examens seront communiqués par l’école.'].filter(Boolean).join(' ')
    : vtc ? 'Les repères des épreuves indiquent la semaine annoncée. La convocation précise le jour de passage.'
    : [session.publicNotes, 'Les dates encadrent les périodes. Les jours et horaires de présence sont précisés sur la convocation ou par l’employeur.'].filter(Boolean).join(' ');
  return {
    course: detailedCalendarCourse(session), courseTitle: String(session.training?.title || ''), publicNotes: String(session.publicNotes || ''),
    title, sessionTitle: session.title && session.title !== title ? String(session.title) : '', location, address,
    duration: String(session.durationLabel || ''), start, end, monthOnly, monthSteps, note, phases, vtc, dms,
    firstMonth: [start, ...phases.map(p => p.start)].filter(Boolean).sort()[0],
    lastMonth: [end, ...phases.map(p => p.end)].filter(Boolean).sort().at(-1)!,
  };
}

// French metropolitan public holidays, including the three dates relative to Easter Sunday.
export function holidayDates(year: number) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const h = (19 * a + b - d - Math.floor((b - f + 1) / 3) + 15) % 30;
  const l = (32 + 2 * e + 2 * Math.floor(c / 4) - h - c % 4) % 7;
  const n = h + l - 7 * Math.floor((a + 11 * h + 22 * l) / 451) + 114;
  const easter = Date.UTC(year, Math.floor(n / 31) - 1, (n % 31) + 1);
  return new Set([
    ...['01-01','05-01','05-08','07-14','08-15','11-01','11-11','12-25'].map(date => `${year}-${date}`),
    ...[1, 39, 50].map(offset => new Date(easter + offset * 86_400_000).toISOString().slice(0, 10)),
  ]);
}
