import { formatSessionDate, parisDateKey } from '@/lib/public-sessions';

export { vtcFormation } from './formations';
export type { Formation } from './formations';

export const vtcCourse = {
  label: 'Chauffeur VTC',
  nextExamLabel: 'Prochain examen de chauffeur VTC',
  durationHours: 105,
  onlineModules: 8,
  onlineLessons: 96,
  priceCents: 150000,
  priceLabel: '1 500 €',
  location: 'Côte d’Azur',
  startDescription: 'La théorie démarre dès la finalisation de votre inscription.',
  examNotice: 'La CMA peut ajuster ces dates. Votre convocation précise le jour et l’heure de votre passage.',
} as const;

export const vtcCpfEnrollmentHref = 'https://assistance-alw9.onrender.com/inscriptions';
export const vtcFundingHref = '/financements?formation=vtc#simulateur';
export const vtcAppointmentHref = 'https://calendly.com/integraleacademy/chauffeurvtc';

export function vtcRegistrationHref(sessionId?: string | number | null) {
  if (!sessionId) return vtcAppointmentHref;
  return '/planning?formation=vtc&session=' + encodeURIComponent(String(sessionId)) + '#sessions';
}

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

export const vtcDeadlineTimeLabel = 'avant 12 h';

export function formatVtcDeadline(value?: string | Date | null) {
  return value ? formatSessionDate(value) + ' ' + vtcDeadlineTimeLabel : 'À confirmer';
}

export function formatVtcExamDate(value?: string | Date | null) {
  return value ? 'Semaine du ' + formatSessionDate(value) : 'À confirmer';
}

export function vtcRegistrationMessage(deadline?: string | Date | null, theory?: string | Date | null) {
  const exam = theory ? `l’examen théorique la semaine du ${formatSessionDate(theory)}` : 'la prochaine épreuve théorique';
  return deadline
    ? `Pour passer ${exam}, inscrivez-vous en formation avant le ${formatSessionDate(deadline)} à 12 h.`
    : `Contactez-nous pour connaître la date limite d’inscription en formation pour ${exam}.`;
}

export function vtcSessionTitle(theory?: string | Date | null) {
  return theory ? `Chauffeur VTC · Examen théorique la semaine du ${formatSessionDate(theory)}` : 'Chauffeur VTC · Examen théorique';
}

export function getUpcomingVtcExamSessions(referenceDate = new Date()) {
  return vtcExamSessions.filter((session) => isVtcRegistrationOpen(session.deadline, referenceDate));
}
