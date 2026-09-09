import { parisDateKey } from '@/lib/public-sessions';

export { vtcFormation } from './formations';
export type { Formation } from './formations';

export const vtcCourse = {
  durationHours: 105,
  priceCents: 150000,
  priceLabel: '1 500 €',
  location: 'Côte d’Azur',
  startDescription: 'La théorie démarre dès la finalisation de votre inscription.',
  examNotice: 'Dates communiquées à titre indicatif et susceptibles d’être ajustées par l’organisateur de l’examen.',
} as const;

// Shared by the VTC page and the planning: these are exam milestones,
// not fixed start/end dates for the online training.
export const vtcExamSessions = [
  { deadline: '2026-09-11', theory: '2026-09-29', practical: '2026-10-26' },
  { deadline: '2026-11-20', theory: '2026-12-08', practical: '2027-01-04' },
] as const;

export function getUpcomingVtcExamSessions(referenceDate = new Date()) {
  const today = parisDateKey(referenceDate);
  return vtcExamSessions.filter((session) => session.deadline >= today);
}
