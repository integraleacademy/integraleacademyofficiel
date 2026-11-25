import { isPublishedCampus } from '@/lib/session-location-filter';
import { normalizeSeatCount, resolveSessionSeatCapacity } from '@/lib/session-capacity';

// Reuse ICU formatters across requests: constructing one per date allocates
// native memory repeatedly when rendering session lists and availability.
const parisDateKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit',
});
const sessionDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris', day: 'numeric', month: 'long', year: 'numeric',
});
const sessionNumericDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris', day: '2-digit', month: '2-digit', year: 'numeric',
});

export type PublicSessionLike = {
  id?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  inPersonStartDate?: string | Date | null;
  inPersonEndDate?: string | Date | null;
  inPersonFirstEndDate?: string | Date | null;
  inPersonResumeDate?: string | Date | null;
  remoteStartDate?: string | Date | null;
  remoteEndDate?: string | Date | null;
  status?: string;
  location?: string | null;
  seatsLeft?: number | string | null;
  seatsTotal?: number | string | null;
  showSeatsLeft?: boolean | null;
  training?: { slug?: string; name?: string; title?: string; isActive?: boolean | null } | null;
};

export function parisDateKey(date = new Date()) {
  return parisDateKeyFormatter.format(date);
}

export function daysUntilParis(value: string | Date, referenceDate = new Date()) {
  const toUtcMidnight = (key: string) => { const [year, month, day] = key.split('-').map(Number); return Date.UTC(year, month - 1, day); };
  return Math.ceil((toUtcMidnight(parisDateKey(new Date(value))) - toUtcMidnight(parisDateKey(referenceDate))) / 86400000);
}

export function isPublicUpcomingSession(session: PublicSessionLike) {
  if (!session?.training?.isActive || session.status === 'HIDDEN' || !isPublishedCampus(session) || !session.startDate) return false;
  return parisDateKey(new Date(session.startDate)) >= parisDateKey();
}

export function computedSeats(session: PublicSessionLike, referenceDate = new Date()): number | null {
  if (session.status === 'FULL') return 0;
  if (session.status === 'COMING_SOON' || session.showSeatsLeft === false) return null;
  const capacity = resolveSessionSeatCapacity(session);
  const storedCount = normalizeSeatCount(session.seatsLeft);
  return storedCount !== null && storedCount <= capacity ? storedCount : null;
}

export function formatSessionDate(value?: string | Date) {
  if (!value) return '';
  return sessionDateFormatter.format(new Date(value));
}

export function formatSessionNumericDate(value?: string | Date | null) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return sessionNumericDateFormatter.format(date);
}

export function formatSessionPeriod(startDate?: string | Date | null, endDate?: string | Date | null) {
  const start = formatSessionNumericDate(startDate);
  const end = formatSessionNumericDate(endDate);
  return start && end ? `Du ${start} au ${end}` : 'À renseigner dans l’administration';
}

type InPersonSchedule = Pick<PublicSessionLike,
  'inPersonStartDate' | 'inPersonEndDate' | 'inPersonFirstEndDate' | 'inPersonResumeDate'>;

export function validateInPersonSplit(session: InPersonSchedule) {
  const { inPersonStartDate: start, inPersonFirstEndDate: firstEnd, inPersonResumeDate: resume, inPersonEndDate: end } = session;
  if (!firstEnd && !resume) return null;
  if (start && firstEnd && resume && end && +new Date(start) <= +new Date(firstEnd)
    && +new Date(firstEnd) < +new Date(resume) && +new Date(resume) <= +new Date(end)) return null;
  return 'Vérifiez la fin de la première période et la date de reprise dans les dates du présentiel.';
}

export function inPersonPeriods(session: InPersonSchedule) {
  const { inPersonStartDate: start, inPersonFirstEndDate: firstEnd, inPersonResumeDate: resume, inPersonEndDate: end } = session;
  if (!start || !end) return [];
  if (firstEnd && resume && !validateInPersonSplit(session)) {
    return [{ start, end: firstEnd }, { start: resume, end }];
  }
  return [{ start, end }];
}

export function formatSplitInPersonPeriod(session: InPersonSchedule) {
  const [first, second] = inPersonPeriods(session);
  if (!second) return null;
  return `${formatSessionPeriod(first.start, first.end)}, puis du ${formatSessionNumericDate(second.start)} au ${formatSessionNumericDate(second.end)}`;
}

export function hasDetailedDeliveryPeriods(session: PublicSessionLike) {
  const slug = session.training?.slug || '';
  return slug === 'aps' || slug === 'desp' || slug === 'desp-dssp' || slug.startsWith('desp-');
}
