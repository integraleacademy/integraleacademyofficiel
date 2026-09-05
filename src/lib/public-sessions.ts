export type PublicSessionLike = {
  id?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  inPersonStartDate?: string | Date | null;
  inPersonEndDate?: string | Date | null;
  remoteStartDate?: string | Date | null;
  remoteEndDate?: string | Date | null;
  status?: string;
  seatsLeft?: number | string | null;
  showSeatsLeft?: boolean | null;
  training?: { slug?: string; name?: string; title?: string; isActive?: boolean | null } | null;
};

export function parisDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

export function daysUntilParis(value: string | Date, referenceDate = new Date()) {
  const toUtcMidnight = (key: string) => { const [year, month, day] = key.split('-').map(Number); return Date.UTC(year, month - 1, day); };
  return Math.ceil((toUtcMidnight(parisDateKey(new Date(value))) - toUtcMidnight(parisDateKey(referenceDate))) / 86400000);
}

export function isPublicUpcomingSession(session: PublicSessionLike) {
  if (!session?.training?.isActive || session.status === 'HIDDEN' || !session.startDate) return false;
  return parisDateKey(new Date(session.startDate)) >= parisDateKey();
}

export function computedSeats(session: PublicSessionLike, referenceDate = new Date()): number | null {
  if (session.showSeatsLeft === false) return null;
  if (session.seatsLeft !== null && session.seatsLeft !== undefined && session.seatsLeft !== '') return Number(session.seatsLeft);
  if (!session.startDate) return null;
  const days = daysUntilParis(session.startDate, referenceDate);
  if (days <= 15) return 2;
  if (days <= 30) return 4;
  if (days <= 45) return 5;
  if (days <= 60) return 6;
  return null;
}

export function formatSessionDate(value?: string | Date) {
  if (!value) return '';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

export function formatSessionNumericDate(value?: string | Date | null) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatSessionPeriod(startDate?: string | Date | null, endDate?: string | Date | null) {
  const start = formatSessionNumericDate(startDate);
  const end = formatSessionNumericDate(endDate);
  return start && end ? `Du ${start} au ${end}` : 'À renseigner dans l’administration';
}

export function hasDetailedDeliveryPeriods(session: PublicSessionLike) {
  const slug = session.training?.slug || '';
  return slug === 'aps' || slug === 'desp' || slug === 'desp-dssp' || slug.startsWith('desp-');
}
