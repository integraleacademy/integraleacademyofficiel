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
        imageSrc: '/images/certifications/eiag-mission.webp',
        imageAlt: 'Une analyste compare des données sur deux écrans et prend des notes.',
        status: 'PROCHAINEMENT',
        topics: ['Évaluer la fiabilité des sources qui signalent une menace.', 'Reconstituer la chronologie d’un incident à partir des traces disponibles.', 'Rédiger une synthèse pour les équipes chargées de protéger l’organisation.'],
      },
      {
        anchorId: 'bachelor-dms', shortTitle: 'DMS', title: 'Direction et management de la sécurité', tabLabel: 'DMS',
        description: 'Organiser une prestation de sécurité, encadrer les équipes sur le terrain et conseiller le client sur la protection de son site.',
        imageSrc: '/images/desp/manuel/management.webp',
        imageAlt: 'Un responsable échange avec un agent de sécurité et une cliente à l’entrée d’un site.',
        status: 'SEPTEMBRE 2027',
        topics: ['Dimensionner une prestation de sécurité en fonction des risques du site.', 'Organiser les plannings, répartir les missions et transmettre les consignes.', 'Suivre la qualité de la prestation et en rendre compte au client.'],
      },
    ],
  },
  {
    id: 'masteres', label: 'Mastères', singular: 'Mastère', level: 'Bac +5', location: 'Paris',
    items: [
      {
        anchorId: 'mastere-chef-de-produit-ia', shortTitle: 'Chef de produit', title: 'en intelligence artificielle et automatisation', tabLabel: 'Produit IA',
        description: 'Partir d’un besoin utilisateur, choisir ce qui peut être automatisé et guider l’équipe qui transforme le prototype en produit.',
        imageSrc: '/images/certifications/cpiaa-hero.webp',
        imageAlt: 'Une cheffe de produit présente la feuille de route d’un projet à un collègue.',
        status: 'PROCHAINEMENT',
        topics: ['Choisir un usage de l’IA à partir des difficultés rencontrées par les utilisateurs.', 'Tester un prototype et arbitrer les fonctionnalités à développer.', 'Mesurer l’adoption du produit et décider des améliorations prioritaires.'],
      },
      {
        anchorId: 'mastere-ingenierie-ia-generative', shortTitle: 'Expert en ingénierie', title: 'de l’IA générative', tabLabel: 'IA générative',
        description: 'Concevoir une application qui utilise des modèles génératifs, tester la qualité de ses réponses et suivre son fonctionnement après la mise en service.',
        imageSrc: '/images/certifications/eiag-hero.webp',
        imageAlt: 'Deux professionnels examinent l’architecture et les tests d’un système d’IA.',
        status: 'PROCHAINEMENT',
        topics: ['Choisir un modèle et préparer les données adaptées à l’usage visé.', 'Intégrer les composants et tester la fiabilité des résultats.', 'Déployer le système et suivre sa qualité en conditions réelles.'],
      },
    ],
  },
  {
    id: 'titres-professionnels', label: 'Titres professionnels', singular: 'Titre professionnel', location: 'Puget-sur-Argens',
    items: [
      {
        anchorId: 'tp-gestionnaire-de-paie', shortTitle: 'Gestionnaire', title: 'de paie', tabLabel: 'Paie',
        description: 'Traduire les heures travaillées, les absences et les primes en bulletins de paie, puis contrôler les montants à verser.',
        imageSrc: '/images/bts/tenues-2026/cg-carte.webp', imageAlt: 'Deux personnes vérifient des documents et des chiffres à un bureau.',
        status: 'PROCHAINEMENT',
        topics: ['Recueillir les éléments variables auprès des équipes.', 'Établir et vérifier les bulletins de salaire.', 'Contrôler les données transmises aux organismes sociaux.'],
      },
      {
        anchorId: 'tp-assistant-ressources-humaines', shortTitle: 'Assistant', title: 'ressources humaines', tabLabel: 'RH',
        description: 'Accompagner les salariés dès leur arrivée et assurer le suivi administratif de leur parcours dans l’entreprise.',
        imageSrc: '/images/bts/tenues-2026/atelier-equipe.webp', imageAlt: 'Une professionnelle examine un dossier avec deux collègues.',
        status: 'PROCHAINEMENT',
        topics: ['Mettre à jour les dossiers du personnel.', 'Participer au recrutement et à l’accueil des nouveaux salariés.', 'Organiser le suivi des formations et des entretiens.'],
      },
      {
        anchorId: 'tp-secretaire-assistant-medico-administratif', shortTitle: 'Secrétaire assistant', title: 'médico-administratif', tabLabel: 'Médical',
        description: 'Accueillir les patients, organiser les rendez-vous et assurer le suivi administratif en lien avec les professionnels de santé.',
        imageSrc: '/images/bts/tenues-2026/atelier-pilotage.webp', imageAlt: 'Deux personnes consultent un planning et des dossiers.',
        status: 'PROCHAINEMENT',
        topics: ['Orienter le patient vers le bon interlocuteur.', 'Gérer les agendas et préparer les documents avant un rendez-vous.', 'Tenir le dossier patient à jour en respectant la confidentialité.'],
      },
      {
        anchorId: 'tp-charge-accueil-gestion-administrative', shortTitle: 'Chargé d’accueil', title: 'et de gestion administrative', tabLabel: 'Accueil',
        description: 'Être le premier contact des visiteurs et assurer les tâches administratives qui facilitent le travail de l’équipe.',
        imageSrc: '/images/vtc/manuel/communication.webp', imageAlt: 'Une personne à l’accueil renseigne un visiteur au comptoir.',
        status: 'PROCHAINEMENT',
        topics: ['Accueillir et orienter les visiteurs et les appels.', 'Traiter le courrier et mettre en forme les documents courants.', 'Classer les dossiers et suivre les demandes jusqu’à leur traitement.'],
      },
      {
        anchorId: 'tp-operateur-videoprotection-telesurveillance', shortTitle: 'Opérateur', title: 'en vidéoprotection et en télésurveillance', tabLabel: 'OVT',
        description: 'Repérer un événement sur les écrans, vérifier une alerte et transmettre les informations aux intervenants depuis le poste de surveillance.',
        imageSrc: '/images/formation-scenes-manuel/aps-pc-pedagogique.webp', imageAlt: 'Deux agents consultent les écrans d’un poste de surveillance.',
        status: 'PROCHAINEMENT',
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
