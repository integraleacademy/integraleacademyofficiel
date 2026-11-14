import { formatSessionDate, parisDateKey } from '@/lib/public-sessions';

export { vtcFormation } from './formations';
export type { Formation } from './formations';

export const vtcCourse = {
  durationHours: 105,
  priceCents: 150000,
  priceLabel: '1 500 €',
  location: 'Côte d’Azur',
  startDescription: 'La théorie démarre dès la finalisation de votre inscription.',
  examNotice: 'La CMA peut ajuster ces dates. Votre convocation précise le jour et l’heure de votre passage.',
} as const;

// Shared by the VTC page and the planning: these are exam milestones,
// not fixed start/end dates for the online training.
// CMA PACA 2027: https://www.cmar-paca.fr/galerie/1/0a500ccd55a994cd8ef5b03c77af67b9.pdf
export const vtcExamSessions = [
  { deadline: '2026-09-11', theory: '2026-09-29', practical: '2026-10-26' },
  { deadline: '2026-11-20', theory: '2026-12-08', practical: '2027-01-04' },
  { deadline: '2027-01-08', theory: '2027-01-26', practical: '2027-02-22' },
  { deadline: '2027-03-05', theory: '2027-03-30', practical: '2027-04-26' },
  { deadline: '2027-05-04', theory: '2027-05-25', practical: '2027-06-23' },
  { deadline: '2027-07-02', theory: '2027-07-20', practical: '2027-08-23' },
  { deadline: '2027-09-10', theory: '2027-09-28', practical: '2027-10-25' },
  { deadline: '2027-11-19', theory: '2027-12-07', practical: '2028-01-03' },
] as const;

const parisHour = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Paris', hour: '2-digit', hourCycle: 'h23',
});

export function isVtcRegistrationOpen(deadline: string | Date, referenceDate: Date) {
  const lastDay = parisDateKey(new Date(deadline));
  const today = parisDateKey(referenceDate);
  return lastDay > today || (lastDay === today && Number(parisHour.format(referenceDate)) < 12);
}

export function formatVtcDeadline(value?: string | Date | null) {
  return value ? formatSessionDate(value) + ' avant 12 h' : 'À confirmer';
}

export function formatVtcExamDate(value?: string | Date | null) {
  return value ? 'À partir du ' + formatSessionDate(value) : 'À confirmer';
}

export function getUpcomingVtcExamSessions(referenceDate = new Date()) {
  return vtcExamSessions.filter((session) => isVtcRegistrationOpen(session.deadline, referenceDate));
}
