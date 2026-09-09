import { getUpcomingVtcExamSessions, vtcCourse } from '@/data/vtc';
import { formatSessionDate } from '@/lib/public-sessions';
import { canonicalSiteHref } from '@/lib/site-urls';

export function isBtsTraining(slug = '') {
  return slug === 'bts' || slug.startsWith('bts-') || ['commerce-international', 'comptabilite-gestion'].includes(slug);
}

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

export function getVtcPlanningSessions(referenceDate = new Date()) {
  return getUpcomingVtcExamSessions(referenceDate).map((dates) => ({
    id: 'vtc-exam-' + dates.theory,
    title: 'Chauffeur VTC — examen théorique du ' + formatSessionDate(dates.theory),
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
