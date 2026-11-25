import { ADMISSIONS_URL, septemberId } from './admissions';
import { alternanceSessions, poeiSessions } from './employer-intakes';
import { btsHighlights } from './bts-highlights';
import { btsRhythms, type BtsCode } from './btsRhythms';
import { upcomingCoursePages, upcomingCourseName } from './upcoming-trainings';

const courses = [
  ...btsHighlights.map(bts => ({
    slug: 'bts-' + bts.slug.split('/').pop(), pageUrl: bts.slug,
    name: `${bts.shortTitle} · ${bts.title}`, category: 'bts', location: 'Puget-sur-Argens ou visioconférence',
    rhythm: btsRhythms[bts.shortTitle.slice(4) as BtsCode].description, durationLabel: '2 ans',
  })),
  ...upcomingCoursePages.map(({ course, family, path }) => ({
    slug: course.anchorId, pageUrl: path, name: `${family.singular} ${upcomingCourseName(family, course)}`, category: family.id,
    location: family.location ?? (course.anchorId === 'bachelor-dms' ? 'Puget-sur-Argens' : 'Lieu à préciser'),
    rhythm: course.anchorId === 'bachelor-dms' ? 'Périodes de deux semaines à l’école, en alternance avec l’entreprise.'
      : family.id === 'titres-professionnels' ? 'Formation en alternance à Puget-sur-Argens.' : '',
    durationLabel: course.anchorId === 'bachelor-dms' ? '1 an · 461 h de cours' : null,
  })),
];

export const scheduledIntakes = [
  ...courses.map(({ location, durationLabel, rhythm, ...training }) => {
    const dms = training.slug === 'bachelor-dms';
    return {
      id: septemberId(training.slug), title: training.name, scheduleKind: 'admissions', datePrecision: dms ? 'day' : 'month',
      // These bounds place a month-only intake in the September calendar, without assigning attendance days.
      startDate: '2027-09-01', endDate: dms ? '2028-08-31' : '2027-09-30',
      location, durationLabel, publicNotes: rhythm, status: 'OPEN', showSeatsLeft: false,
      registrationUrl: ADMISSIONS_URL, training: { ...training, isActive: true },
    };
  }),
  {
    id: 'parcours-securite-janvier-2027', title: 'Parcours sécurité en alternance', scheduleKind: 'admissions', datePrecision: 'day',
    startDate: '2027-01-08', endDate: '2028-01-08', location: 'Puget-sur-Argens',
    durationLabel: '12 mois · 573 h de formation', publicNotes: 'APS, A3P et SSIAP 1, avec 1 106 h prévisionnelles en entreprise.',
    status: 'OPEN', showSeatsLeft: false, registrationUrl: ADMISSIONS_URL,
    training: { slug: 'parcoursalternance', pageUrl: '/parcoursalternance', name: 'Parcours sécurité en alternance', category: 'alternance', isActive: true },
  },
  {
    id: 'parcours-securite-juin-2027', title: 'Parcours sécurité en alternance · Promotion de juin', scheduleKind: 'admissions', datePrecision: 'month',
    startDate: '2027-06-01', endDate: '2028-06-30', location: 'Puget-sur-Argens', durationLabel: '12 mois',
    publicNotes: `${alternanceSessions[1].worked.toLocaleString('fr-FR')} h prévisionnelles en entreprise. Calendrier de juin 2027 à juin 2028.`,
    status: 'OPEN', showSeatsLeft: false, registrationUrl: ADMISSIONS_URL,
    training: { slug: 'parcoursalternance', pageUrl: '/parcoursalternance', name: 'Parcours sécurité en alternance', category: 'alternance', isActive: true },
  },
  ...poeiSessions.map(session => ({
    id: session.id, title: 'POEI sécurité privée · ' + session.label, scheduleKind: 'employeur', datePrecision: 'day',
    startDate: session.startDate, endDate: session.endDate, location: 'Puget-sur-Argens', durationLabel: '450 h',
    publicNotes: 'Parcours de préparation à l’embauche. Les dates des modules et des épreuves sont précisées sur convocation.',
    status: 'OPEN', showSeatsLeft: false, registrationUrl: '/entreprises#contact-entreprises',
    training: { slug: 'poei', pageUrl: '/entreprises#poei', name: 'POEI sécurité privée', category: 'entreprises', isActive: true },
  })),
];

export function intakeMatchesSession(intake: typeof scheduledIntakes[number], session: {
  training?: { slug?: string; pageUrl?: string } | null; startDate?: string | Date;
}) {
  const sameCourse = session.training?.slug === intake.training.slug || session.training?.pageUrl === intake.training.pageUrl;
  return Boolean(sameCourse && session.startDate && new Date(session.startDate).toISOString().slice(0, 7) === intake.startDate.slice(0, 7));
}
