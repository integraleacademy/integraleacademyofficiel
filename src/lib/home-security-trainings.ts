import type { SecurityTrainingHighlight } from '@/components/SecurityTrainingGrid';

export type HomeTrainingSession = {
  startDate: string | Date;
  location?: string | null;
  seatsLeft?: number | null;
  showSeatsLeft?: boolean | null;
  status?: string | null;
  training?: {
    slug?: string | null;
    isActive?: boolean | null;
  } | null;
};

const parisDateParts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const frenchSessionDate = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const apsSlugs = new Set(['aps']);
const a3pSlugs = new Set(['a3p', 'a3p-apr']);
const despSlugs = new Set(['desp', 'desp-dssp', 'desp-initial', 'desp-vae']);

function parisDateKey(value: string | Date) {
  return parisDateParts.format(new Date(value));
}

function formatFrenchDate(value: string | Date) {
  const parts = frenchSessionDate.formatToParts(new Date(value));
  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  const month = parts.find((part) => part.type === 'month')?.value ?? '';
  const year = parts.find((part) => part.type === 'year')?.value ?? '';
  return `${day === '1' ? '1er' : day} ${month} ${year}`.trim();
}

function nearestSession(
  sessions: HomeTrainingSession[],
  slugs: ReadonlySet<string>,
  now: string | Date = new Date(),
) {
  const today = parisDateKey(now);
  const nearest = sessions
    .filter((session) => {
      const startDate = new Date(session.startDate);
      return !Number.isNaN(startDate.getTime())
        && session.training?.isActive === true
        && session.status !== 'HIDDEN'
        && slugs.has(session.training?.slug ?? '')
        && parisDateKey(startDate) >= today;
    })
    .sort((left, right) => +new Date(left.startDate) - +new Date(right.startDate))[0];

  return nearest;
}

function nextDetails(sessions: HomeTrainingSession[], slugs: ReadonlySet<string>, now: string | Date, fallback = 'Dates à venir') {
  const item = nearestSession(sessions, slugs, now);
  const n = item?.seatsLeft;
  const places = item?.status === 'FULL' || n === 0 ? 'Complet' : item?.showSeatsLeft && typeof n === 'number'
    ? (n === 1 ? '1 place restante' : n + ' places restantes') : undefined;
  const site = item?.location?.toLowerCase().includes('paris') ? 'Paris' : item?.location ? 'Puget-sur-Argens' : '';
  return { nextSession: item ? formatFrenchDate(item.startDate) : fallback, places, sessionCentre: site };
}

export function getNearestDespSessionLabel(
  sessions: HomeTrainingSession[],
  now: string | Date = new Date(),
) {
  return nextDetails(sessions, despSlugs, now).nextSession;
}

export function createHomeSecurityHighlights(
  sessions: HomeTrainingSession[],
  now: string | Date = new Date(),
): SecurityTrainingHighlight[] {
  return [
    {
      slug: '/formations-securite/aps',
      shortTitle: 'APS',
      title: 'Agent de prévention et de sécurité',
      description: 'Prévenir les risques, surveiller les sites et protéger les personnes.',
      duration: '175 h',
      modality: 'Distanciel + Présentiel',
      location: 'Puget-sur-Argens',
      ...nextDetails(sessions, apsSlugs, now),
      visual: 'aps',
      featured: true,
    },
    {
      slug: '/formations-securite/ssiap',
      shortTitle: 'SSIAP',
      title: 'Sécurité incendie',
      description: 'SSIAP 1, SSIAP 2, SSIAP 3, Remise à niveau et Recyclage.',
      duration: '14 à 216 h',
      modality: 'Présentiel',
      location: 'Puget-sur-Argens',
      financing: 'Selon le parcours',
      ...nextDetails(sessions, new Set(['ssiap-1', 'ssiap-2', 'ssiap-3']), now, 'Dates selon le parcours'),
      visual: 'ssiap',
    },
    {
      slug: '/formations-securite/sst',
      shortTitle: 'SST',
      title: 'Sauveteur secouriste du travail',
      description: 'Maîtriser les gestes de premiers secours et la prévention en entreprise.',
      duration: '14 h',
      modality: 'Présentiel',
      location: 'Puget-sur-Argens',
      financing: 'Entreprise · Personnel',
      ...nextDetails(sessions, new Set(['sst']), now, 'Dates sur demande'),
      visual: 'sst',
    },
    {
      slug: '/formations-securite/a3p-apr',
      shortTitle: 'A3P',
      title: 'Agent de protection physique des personnes',
      description: 'Préparer et sécuriser les déplacements de personnes exposées.',
      duration: '328 h hors examen',
      modality: 'Présentiel',
      location: 'Puget-sur-Argens',
      financing: 'CPF · France Travail',
      ...nextDetails(sessions, a3pSlugs, now),
      visual: 'a3p',
    },
    {
      slug: '/despvaeouinitial',
      shortTitle: 'DESP',
      title: 'Dirigeant d’entreprise de sécurité privée',
      description: 'Créer, reprendre ou piloter une entreprise de sécurité privée.',
      duration: '245 h',
      modality: 'Distanciel + Présentiel',
      location: 'Paris ou Puget sur Argens',
      pathway: 'En initial ou VAE',
      financing: 'CPF · France Travail',
      ...nextDetails(sessions, despSlugs, now),
      visual: 'desp',
    },
  ];
}
