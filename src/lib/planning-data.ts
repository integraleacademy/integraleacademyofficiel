import { formatSessionPeriod } from './public-sessions';
import { getUpcomingVtcExamSessions, isVtcRegistrationOpen, vtcCourse, vtcSessionTitle } from '@/data/vtc';
import { canonicalSiteHref } from '@/lib/site-urls';

export function isBtsTraining(slug = '', category?: string | null) {
  return category?.toLowerCase() === 'bts' || slug === 'bts' || slug.startsWith('bts-')
    || ['mos', 'mco', 'ndrc', 'commerce-international', 'professions-immobilieres', 'comptabilite-gestion'].includes(slug);
}

export { planningSsiapCourse, type SsiapPlanningCourse } from '@/lib/planning-ssiap';

export function planningFormationHref(session: { training?: { slug?: string; pageUrl?: string } | null }) {
  const slug = session.training?.slug || '';
  if (['desp', 'desp-dssp', 'desp-initial'].includes(slug)) return '/dirigeant';
  if (slug === 'desp-vae') return '/vaedirigeant';
  const pageUrl = session.training?.pageUrl;
  if (pageUrl) return canonicalSiteHref(pageUrl);
  if (slug === 'vtc') return '/vtc';
  if (isBtsTraining(slug)) return '/bts';
  if (['a3p', 'apr', 'a3p-apr'].includes(slug)) return '/formations-securite/a3p-apr';
  if (slug === 'ssiap1') return '/formations-securite/ssiap-1';
  return slug ? canonicalSiteHref('/formations-securite/' + slug) : '/formations-securite';
}

export function getVtcPlanningSessions(referenceDate = new Date(), managedSessions: any[] = []) {
  // VTC admin fields: start = registration deadline, end = theory, exam = practical.
  // An existing hidden/expired row must not revive a legacy hard-coded session.
  if (managedSessions.length) return managedSessions
    .filter((session) => session.training?.isActive && session.status !== 'HIDDEN' && session.startDate && isVtcRegistrationOpen(session.startDate, referenceDate))
    .map((session) => ({
      ...session,
      title: session.title?.replace(/à partir du/gi, 'la semaine du') || vtcSessionTitle(session.endDate),
      scheduleKind: 'vtc-exam',
      showSeatsLeft: false,
      durationLabel: session.durationLabel || vtcCourse.durationHours + ' heures',
      vtcDates: { deadline: session.startDate, theory: session.endDate, practical: session.examDate },
    }));
  return getUpcomingVtcExamSessions(referenceDate).map((dates) => ({
    id: 'vtc-exam-' + dates.theory,
    title: vtcSessionTitle(dates.theory),
    scheduleKind: 'vtc-exam',
    startDate: dates.deadline,
    endDate: dates.theory,
    examDate: dates.practical,
    vtcDates: dates,
    priceCents: vtcCourse.priceCents,
    priceLabel: vtcCourse.priceLabel,
    durationLabel: vtcCourse.durationHours + ' heures',
    location: vtcCourse.location,
    status: 'OPEN',
    showSeatsLeft: false,
    training: { slug: 'vtc', name: 'Chauffeur VTC', pageUrl: '/vtc', isActive: true },
  }));
}


const monthYear = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'Europe/Paris' });
export function publicIntakePeriod(session: { startDate: string | Date; endDate?: string | Date; datePrecision?: string }) {
  if (session.datePrecision === 'month') return 'Rentrée de ' + monthYear.format(new Date(session.startDate));
  return formatSessionPeriod(session.startDate, session.endDate);
}
