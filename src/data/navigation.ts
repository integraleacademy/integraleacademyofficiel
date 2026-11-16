import { btsHighlights } from './bts-highlights';
import { upcomingCourseName, upcomingFamilies, type TrainingStatus } from './upcoming-trainings';

export type TrainingMenuCourse = { label: string; href: string; status?: TrainingStatus };
export type TrainingMenuFamily = {
  label: string; href: string; description: string; icon: 'security' | 'vtc' | 'bts' | UpcomingFamilyId;
  courses: TrainingMenuCourse[];
};
type UpcomingFamilyId = (typeof upcomingFamilies)[number]['id'];

const familyDescriptions: Record<UpcomingFamilyId, string> = {
  bachelors: 'Cybermenaces et management de la sécurité',
  masteres: 'Intelligence artificielle et automatisation',
  'titres-professionnels': 'Paie, RH, accueil, secrétariat et surveillance',
};

export const trainingNavigation: TrainingMenuFamily[] = [
  {
    label: 'Métiers de la sécurité', href: '/#formations-securite', icon: 'security', description: 'Surveillance, protection, incendie et secours',
    courses: [
      { label: 'APS – Agent de prévention et de sécurité', href: '/formations-securite/aps' },
      { label: 'A3P – Agent de protection physique des personnes', href: '/formations-securite/a3p-apr' },
      { label: 'DESP – Dirigeant d’entreprise de sécurité privée', href: '/despvaeouinitial' },
      { label: 'SSIAP – Sécurité incendie', href: '/formations-securite/ssiap' },
      { label: 'SST – Sauveteur secouriste du travail', href: '/formations-securite/sst' },
    ],
  },
  {
    label: 'Chauffeur VTC', href: '/#formation-vtc', icon: 'vtc', description: 'De la théorie à la conduite professionnelle',
    courses: [{ label: 'Formation chauffeur VTC', href: '/vtc' }],
  },
  {
    label: 'BTS en alternance', href: '/#bts', icon: 'bts', description: 'Six spécialités pour préparer un Bac +2',
    courses: btsHighlights.map(course => ({ label: `${course.shortTitle} – ${course.title}`, href: course.slug })),
  },
  ...upcomingFamilies.map(family => ({
    label: family.level ? `${family.label} (${family.level})` : family.label,
    href: `/#${family.id}`, icon: family.id, description: familyDescriptions[family.id],
    courses: family.items.map(course => ({
      label: upcomingCourseName(family, course), href: `/#${course.anchorId}`, status: course.status,
    })),
  })),
];

export const navigation = [
  {label:'Nos formations', children:trainingNavigation},
  {label:'Notre école', href:'/ecole'},
  {label:'Financements', href:'/financements'},
  {label:'Entreprises', href:'/entreprises'},
  {label:'Planning', href:'/planning'},
  {label:'Contact', href:'/contact'},
] as const;
