import { MASTER_CAMPUSES } from './locations';
import { RNCP_REVIEW_STATUS } from './certification-status';

export const PROFESSIONAL_TITLE_INTAKE = 'À partir de septembre 2027';

export type TrainingStatus = 'PROCHAINEMENT' | 'SEPTEMBRE 2027';

export type UpcomingCourse = {
  anchorId: string;
  shortTitle: string;
  title: string;
  tabLabel: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  status: TrainingStatus;
  topics: string[];
  jobs?: string[];
  certificationStatus?: string;
};

export type UpcomingFamily = {
  id: 'bachelors' | 'masteres' | 'titres-professionnels';
  label: string;
  singular: string;
  level?: string;
  location?: string;
  items: UpcomingCourse[];
};

export const upcomingFamilies: UpcomingFamily[] = [
  {
    id: 'bachelors', label: 'Bachelors', singular: 'Bachelor', level: 'Bac +3',
    items: [
      {
        anchorId: 'bachelor-eirc', shortTitle: 'EIRC', title: 'Expert en investigation et renseignement sur les cybermenaces', tabLabel: 'EIRC',
        description: 'Recouper des indices numériques, retracer un incident et transmettre aux équipes de sécurité les informations qui les aideront à réagir.',
        imageSrc: '/images/formations-annoncees/bachelor-eirc.webp',
        imageAlt: 'Un analyste reconstitue la chronologie d’un incident au tableau avec une collègue munie d’une tablette.',
        status: 'SEPTEMBRE 2027',
        topics: ['Évaluer la fiabilité des sources qui signalent une menace.', 'Reconstituer la chronologie d’un incident à partir des traces disponibles.', 'Rédiger une synthèse pour les équipes chargées de protéger l’organisation.'],
        jobs: ['Analyste en renseignement sur les cybermenaces', 'Chargé de veille en cybersécurité', 'Analyste d’investigation numérique'],
        certificationStatus: `Niveau 6 visé. ${RNCP_REVIEW_STATUS}`,
      },
      {
        anchorId: 'bachelor-dms', shortTitle: 'DMS', title: 'Direction et management de la sécurité', tabLabel: 'DMS',
        description: 'Organiser une prestation de sécurité, encadrer les équipes sur le terrain et conseiller le client sur la protection de son site.',
        imageSrc: '/images/formations-annoncees/bachelor-dms.webp',
        imageAlt: 'Depuis la mezzanine d’un hall, une responsable et un agent de sécurité examinent le plan des accès.',
        status: 'SEPTEMBRE 2027',
        topics: ['Dimensionner une prestation de sécurité en fonction des risques du site.', 'Organiser les plannings, répartir les missions et transmettre les consignes.', 'Suivre la qualité de la prestation et en rendre compte au client.'],
        jobs: ['Coordinateur de prestations de sécurité', 'Responsable de site de sécurité', 'Adjoint au responsable d’exploitation'],
      },
    ],
  },
  {
    id: 'masteres', label: 'Mastères', singular: 'Mastère', level: 'Bac +5', location: MASTER_CAMPUSES,
    items: [
      {
        anchorId: 'mastere-chef-de-produit-ia', shortTitle: 'Chef de produit', title: 'en intelligence artificielle et automatisation', tabLabel: 'Produit IA',
        description: 'Partir d’un besoin utilisateur, choisir ce qui peut être automatisé et guider l’équipe qui transforme le prototype en produit.',
        imageSrc: '/images/formations-annoncees/mastere-produit-ia.webp',
        imageAlt: 'Une utilisatrice teste un prototype de tri des demandes sur une tablette pendant que la cheffe de produit prend des notes.',
        status: 'SEPTEMBRE 2027',
        topics: ['Choisir un usage de l’IA à partir des difficultés rencontrées par les utilisateurs.', 'Tester un prototype et arbitrer les fonctionnalités à développer.', 'Mesurer l’adoption du produit et décider des améliorations prioritaires.'],
        jobs: ['Chef de produit en IA', 'Product owner de solutions IA', 'Chef de projet automatisation'],
        certificationStatus: `Niveau 7 visé. ${RNCP_REVIEW_STATUS}`,
      },
      {
        anchorId: 'mastere-ingenierie-ia-generative', shortTitle: 'Expert en ingénierie', title: 'de l’IA générative', tabLabel: 'IA générative',
        description: 'Concevoir une application qui utilise des modèles génératifs, tester la qualité de ses réponses et suivre son fonctionnement après la mise en service.',
        imageSrc: '/images/formations-annoncees/mastere-ingenierie-ia-generative.webp?v=assistant-ia',
        imageAlt: 'Deux ingénieurs vérifient la réponse d’un assistant IA en la comparant au document source.',
        status: 'SEPTEMBRE 2027',
        topics: ['Choisir un modèle et préparer les données adaptées à l’usage visé.', 'Intégrer les composants et tester la fiabilité des résultats.', 'Déployer le système et suivre sa qualité en conditions réelles.'],
        jobs: ['Ingénieur en IA générative', 'Développeur d’applications IA', 'Architecte de solutions IA'],
        certificationStatus: `Niveau 7 visé. ${RNCP_REVIEW_STATUS}`,
      },
    ],
  },
  {
    id: 'titres-professionnels', label: 'Titres professionnels', singular: 'Titre professionnel', location: 'Puget-sur-Argens',
    items: [
      {
        anchorId: 'tp-gestionnaire-de-paie', shortTitle: 'Gestionnaire', title: 'de paie', tabLabel: 'Paie',
        description: 'Traduire les heures travaillées, les absences et les primes en bulletins de paie, puis contrôler les montants à verser.',
        imageSrc: '/images/formations-annoncees/tp-gestionnaire-de-paie.webp',
        imageAlt: 'Une gestionnaire de paie vérifie un bulletin de salaire à partir du relevé d’heures, une calculatrice à portée de main.',
        status: 'SEPTEMBRE 2027',
        topics: ['Recueillir les éléments variables auprès des équipes.', 'Établir et vérifier les bulletins de salaire.', 'Contrôler les données transmises aux organismes sociaux.'],
      },
      {
        anchorId: 'tp-assistant-ressources-humaines', shortTitle: 'Assistant', title: 'ressources humaines', tabLabel: 'RH',
        description: 'Accompagner les salariés dès leur arrivée et assurer le suivi administratif de leur parcours dans l’entreprise.',
        imageSrc: '/images/formations-annoncees/tp-assistant-rh.webp',
        imageAlt: 'Un assistant ressources humaines remet son badge à une nouvelle salariée.',
        status: 'SEPTEMBRE 2027',
        topics: ['Mettre à jour les dossiers du personnel.', 'Participer au recrutement et à l’accueil des nouveaux salariés.', 'Organiser le suivi des formations et des entretiens.'],
      },
      {
        anchorId: 'tp-secretaire-assistant-medico-administratif', shortTitle: 'Secrétaire assistant', title: 'médico-administratif', tabLabel: 'Médical',
        description: 'Accueillir les patients, organiser les rendez-vous et assurer le suivi administratif en lien avec les professionnels de santé.',
        imageSrc: '/images/formations-annoncees/tp-secretariat-medical.webp',
        imageAlt: 'Au secrétariat médical, une secrétaire montre à une patiente la date de son prochain rendez-vous sur un calendrier.',
        status: 'SEPTEMBRE 2027',
        topics: ['Orienter le patient vers le bon interlocuteur.', 'Gérer les agendas et préparer les documents avant un rendez-vous.', 'Tenir le dossier patient à jour en respectant la confidentialité.'],
      },
      {
        anchorId: 'tp-charge-accueil-gestion-administrative', shortTitle: 'Chargé d’accueil', title: 'et de gestion administrative', tabLabel: 'Accueil',
        description: 'Être le premier contact des visiteurs et assurer les tâches administratives qui facilitent le travail de l’équipe.',
        imageSrc: '/images/formations-annoncees/tp-accueil-administratif.webp',
        imageAlt: 'Un chargé d’accueil indique le couloir à suivre à un visiteur qui tient une enveloppe.',
        status: 'SEPTEMBRE 2027',
        topics: ['Accueillir et orienter les visiteurs et les appels.', 'Traiter le courrier et mettre en forme les documents courants.', 'Classer les dossiers et suivre les demandes jusqu’à leur traitement.'],
      },
      {
        anchorId: 'tp-operateur-videoprotection-telesurveillance', shortTitle: 'Opérateur', title: 'en vidéoprotection et en télésurveillance', tabLabel: 'OVT',
        description: 'Repérer un événement sur les écrans, vérifier une alerte et transmettre les informations aux intervenants depuis le poste de surveillance.',
        imageSrc: '/images/formations-annoncees/tp-videoprotection.webp',
        imageAlt: 'Un opérateur surveille quatre vues de caméras et consigne un événement dans sa main courante.',
        status: 'SEPTEMBRE 2027',
        topics: ['Observer les images et identifier une situation inhabituelle.', 'Traiter les signaux d’alarme selon les consignes du site.', 'Alerter les interlocuteurs concernés et consigner les événements.'],
      },
    ],
  },
];

export function upcomingCourseName(family: UpcomingFamily, course: UpcomingCourse) {
  return family.id === 'bachelors' ? `${course.shortTitle} – ${course.title}` : `${course.shortTitle} ${course.title}`;
}

export function upcomingDiscoveryLabel(family: UpcomingFamily, course: UpcomingCourse) {
  const name = family.id === 'bachelors' ? course.shortTitle : upcomingCourseName(family, course);
  return `Découvrir le ${family.singular.toLowerCase()} ${name}`;
}

export function upcomingCourseSlug(course: UpcomingCourse) {
  return course.anchorId.replace(/^(bachelor|mastere|tp)-/, '');
}

export function upcomingCoursePath(family: UpcomingFamily, course: UpcomingCourse) {
  return `/${family.id}/${upcomingCourseSlug(course)}`;
}

export const upcomingCoursePages = upcomingFamilies.flatMap(family =>
  family.items.map(course => ({ family, course, path: upcomingCoursePath(family, course) })),
);

export function isUpcomingCoursePath(path?: string | null) {
  return upcomingCoursePages.some(entry => entry.path === path?.replace(/\/+$/, ''));
}
