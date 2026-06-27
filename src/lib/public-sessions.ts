export type PublicSessionLike = {
  id?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  status?: string;
  seatsLeft?: number | string | null;
  showSeatsLeft?: boolean | null;
  training?: { slug?: string; name?: string; title?: string; isActive?: boolean | null } | null;
};

export function parisDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

export function daysUntilParis(value: string | Date) {
  const toUtcMidnight = (key: string) => { const [year, month, day] = key.split('-').map(Number); return Date.UTC(year, month - 1, day); };
  return Math.ceil((toUtcMidnight(parisDateKey(new Date(value))) - toUtcMidnight(parisDateKey())) / 86400000);
}

export function isPublicUpcomingSession(session: PublicSessionLike) {
  if (!session?.training?.isActive || session.status === 'HIDDEN' || !session.startDate) return false;
  return parisDateKey(new Date(session.startDate)) >= parisDateKey();
}

export function computedSeats(session: PublicSessionLike): number | null {
  if (session.showSeatsLeft === false) return null;
  if (session.seatsLeft !== null && session.seatsLeft !== undefined && session.seatsLeft !== '') return Number(session.seatsLeft);
  if (!session.startDate) return null;
  const days = daysUntilParis(session.startDate);
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
