import type { SecurityTrainingHighlight } from '@/components/SecurityTrainingGrid';

export type HomeTrainingSession = {
  startDate: string | Date;
  status?: string | null;
  training?: {
    slug?: string | null;
    isActive?: boolean | null;
  } | null;
};

const despSlugs = new Set(['desp', 'desp-dssp', 'desp-initial', 'desp-vae']);

function parisDateKey(value: string | Date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
}

function formatFrenchDate(value: string | Date) {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(new Date(value));
  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  const month = parts.find((part) => part.type === 'month')?.value ?? '';
  const year = parts.find((part) => part.type === 'year')?.value ?? '';
  return `${day === '1' ? '1er' : day} ${month} ${year}`.trim();
}

export function getNearestDespSessionLabel(
  sessions: HomeTrainingSession[],
  now: string | Date = new Date(),
) {
  const today = parisDateKey(now);
  const nearest = sessions
    .filter((session) => {
      const startDate = new Date(session.startDate);
      return !Number.isNaN(startDate.getTime())
        && session.training?.isActive === true
        && session.status !== 'HIDDEN'
        && despSlugs.has(session.training?.slug ?? '')
        && parisDateKey(startDate) >= today;
    })
    .sort((left, right) => +new Date(left.startDate) - +new Date(right.startDate))[0];

  return nearest ? formatFrenchDate(nearest.startDate) : 'Dates à venir';
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
      nextSession: '7 septembre 2026',
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
      nextSession: 'Dates selon le parcours',
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
      nextSession: 'Dates sur demande',
      visual: 'sst',
    },
    {
      slug: '/formations-securite/a3p-apr',
      shortTitle: 'A3P',
      title: 'Agent de protection physique des personnes',
      description: 'Préparer et sécuriser les déplacements de personnes exposées.',
      duration: '327 h',
      modality: 'Présentiel',
      location: 'Puget-sur-Argens',
      financing: 'CPF · France Travail',
      nextSession: '1er septembre 2026',
      visual: 'a3p',
    },
    {
      slug: '/formations-securite/desp',
      shortTitle: 'DESP',
      title: 'Dirigeant d’entreprise de sécurité privée',
      description: 'Créer, reprendre ou piloter une entreprise de sécurité privée.',
      duration: '245 h',
      modality: 'Distanciel + Présentiel',
      location: 'Paris ou Puget sur Argens',
      pathway: 'En initial ou VAE',
      financing: 'CPF · France Travail',
      nextSession: getNearestDespSessionLabel(sessions, now),
      visual: 'desp',
    },
  ];
}
