export type TrainingStatus = 'PROCHAINEMENT' | 'SEPTEMBRE 2027';

export type AnnouncedMenuGroup = {
  label: string;
  href?: string;
  items: readonly { label: string; status: TrainingStatus }[];
};

type AnnouncedDegree = {
  shortTitle: string;
  title: string;
  tabLabel: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  status: TrainingStatus;
};

type DegreeFamily = {
  id: string;
  label: string;
  singular: string;
  level: string;
  items: AnnouncedDegree[];
};

export const degreeFamilies: DegreeFamily[] = [
  {
    id: 'bachelors', label: 'Bachelors', singular: 'Bachelor', level: 'Bac +3',
    items: [
      {
        shortTitle: 'EIRC', title: 'Expert en investigation et renseignement sur les cybermenaces', tabLabel: 'EIRC',
        description: 'Recouper des indices numériques, retracer un incident et transmettre aux équipes de sécurité les informations qui les aideront à réagir.',
        imageSrc: '/images/certifications/eiag-mission.webp',
        imageAlt: 'Une analyste compare des données sur deux écrans et prend des notes.',
        status: 'PROCHAINEMENT',
      },
      {
        shortTitle: 'DMS', title: 'Direction et management de la sécurité', tabLabel: 'DMS',
        description: 'Organiser une prestation de sécurité, encadrer les équipes sur le terrain et conseiller le client sur la protection de son site.',
        imageSrc: '/images/desp/manuel/management.webp',
        imageAlt: 'Un responsable échange avec un agent de sécurité et une cliente à l’entrée d’un site.',
        status: 'SEPTEMBRE 2027',
      },
    ],
  },
  {
    id: 'masteres', label: 'Mastères', singular: 'Mastère', level: 'Bac +5',
    items: [
      {
        shortTitle: 'Chef de produit', title: 'en intelligence artificielle et automatisation', tabLabel: 'Produit IA',
        description: 'Partir d’un besoin utilisateur, choisir ce qui peut être automatisé et guider l’équipe qui transforme le prototype en produit.',
        imageSrc: '/images/certifications/cpiaa-hero.webp',
        imageAlt: 'Une cheffe de produit présente la feuille de route d’un projet à un collègue.',
        status: 'PROCHAINEMENT',
      },
      {
        shortTitle: 'Expert en ingénierie', title: 'de l’IA générative', tabLabel: 'IA générative',
        description: 'Concevoir une application qui utilise des modèles génératifs, tester la qualité de ses réponses et suivre son fonctionnement après la mise en service.',
        imageSrc: '/images/certifications/eiag-hero.webp',
        imageAlt: 'Deux professionnels examinent l’architecture et les tests d’un système d’IA.',
        status: 'PROCHAINEMENT',
      },
    ],
  },
];

export const degreeMenuGroups: AnnouncedMenuGroup[] = degreeFamilies.map(family => ({
  label: `${family.label} (${family.level})`,
  href: `/#${family.id}`,
  items: family.items.map(({ shortTitle, title, status }) => ({
    label: family.id === 'bachelors' ? `${shortTitle} – ${title}` : `${shortTitle} ${title}`,
    status,
  })),
}));

export const professionalTitleGroup: AnnouncedMenuGroup = {
  label: 'Titres professionnels',
  items: [
    'Gestionnaire de paie',
    'Assistant ressources humaines',
    'Secrétaire assistant médico-administratif',
    'Chargé d’accueil et de gestion administrative',
    'Opérateur en vidéoprotection et en télésurveillance',
  ].map(label => ({ label, status: 'PROCHAINEMENT' })),
};
