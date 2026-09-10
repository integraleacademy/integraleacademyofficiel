import type { TrainingJourneyStep, TrainingJourneyTheme } from '@/components/TrainingJourney';

type Four<T> = readonly [T, T, T, T];
type Pair<T> = readonly [T, T];
type Three<T> = readonly [T, T, T];
type Copy = Omit<TrainingJourneyStep, 'visual'>;
type Panel = { label: string; value: string; unit: string; detail: string };
type PracticeRow = { title: string; text: string };
type Milestone = { label: string; title: string; text: string; href: string };

export type CourseJourneyConfig = {
  id: string;
  name: string;
  theme: TrainingJourneyTheme;
  eyebrow: string;
  heading: Pair<string>;
  shortcut?: { href: string; label: string; ariaLabel: string };
  steps: Four<Copy>;
  opening: { kicker: string; heading: Pair<string>; text: string; verbs: Three<string>; image?: string };
  study: { value: string; unit: string; heading: Pair<string>; panels: Pair<Panel>; skills: Four<string> };
  practice: { heading: Pair<string>; eyebrow: string; rows: Three<PracticeRow>; note: string };
  outcome: { heading: Pair<string>; code: string; role: string; milestones: Pair<Milestone>; note: string };
};

function copy(label: string, title: string, description: string, href: string, link: string): Copy {
  return { label, title, description, href, link };
}

// Editorial summaries of the existing course pages. Dates, prices and availability
// remain in their administered sections, linked from these four-stage introductions.
const professionalJourneys = {
  'a3p': {
    id: 'parcours-a3p', name: 'A3P', theme: 'green', eyebrow: 'PROTECTION RAPPROCHÉE · A3P',
    heading: ['Votre ambition : protéger.', 'Votre parcours commence ici.'],
    steps: [
      copy('Votre projet', 'La protection rapprochée commence par l’anticipation.', 'Comprendre un environnement, préparer un déplacement et protéger avec discrétion : découvrez les exigences d’un métier où chaque détail compte. Notre équipe vérifie avec vous les conditions d’entrée en formation.', '#admission', 'Préparer mon entrée'),
      copy('Votre formation', 'Un programme intensif. Des compétences concrètes.', '328 heures hors examen pour travailler le cadre professionnel, la préparation de mission et les techniques de protection. Le parcours se déroule en présentiel à Puget-sur-Argens.', '#programme', 'Explorer le programme'),
      copy('L’immersion terrain', 'Préparer. Se coordonner. S’adapter.', 'Reconnaissance de sites, déplacements et scénarios de protection : les exercices vous apprennent à agir en équipe. Briefings et débriefings permettent de comprendre vos choix et de progresser.', '#pedagogie', 'Découvrir les exercices'),
      copy('Votre prochain chapitre', 'Préparez le TFP A3P et la suite de votre parcours.', 'Vous vous préparez aux évaluations écrites, aux mises en situation et à la soutenance. Après la réussite, la demande de carte professionnelle A3P auprès du CNAPS constitue une étape distincte.', '#inscription', 'Préparer mon inscription'),
    ],
    opening: { image: '/images/a3p-hero.jpg', kicker: 'LA DISCRÉTION. LA PRÉCISION. L’ACTION.', heading: ['Une présence discrète.', 'Un rôle décisif.'], text: 'Apprenez à anticiper les risques et à protéger les personnes, en équipe et sur le terrain.', verbs: ['Anticiper', 'Préparer', 'Protéger'] },
    study: { value: '328', unit: 'HEURES · HORS EXAMEN', heading: ['Apprendre le métier.', 'Dans toute sa dimension.'], panels: [
      { label: 'LE SOCLE', value: '41', unit: 'heures', detail: 'Les fondamentaux de la sécurité privée' },
      { label: 'LA SPÉCIALITÉ', value: '287', unit: 'heures', detail: 'La protection physique des personnes' },
    ], skills: ['Préparation de mission', 'Analyse des risques', 'Protection en déplacement', 'Gestion de l’urgence'] },
    practice: { heading: ['L’entraînement fait', 'la différence.'], eyebrow: '92 H 50 DE PRATIQUE DANS LE PARCOURS', rows: [
      { title: 'Reconnaître les lieux', text: 'Étudier les accès, itinéraires et solutions de repli.' },
      { title: 'Travailler en équipe', text: 'Coordonner les déplacements et la communication.' },
      { title: 'Préparer une mission', text: 'Analyser, organiser puis débriefer un scénario.' },
    ], note: 'Des mises en situation encadrées, au plus près du métier.' },
    outcome: { heading: ['Votre engagement.', 'Une nouvelle trajectoire.'], code: 'A3P', role: 'Agent de protection physique des personnes.', milestones: [
      { label: '01 · CERTIFICATION', title: 'Le TFP A3P.', text: 'Préparer et réussir les évaluations', href: '#certification' },
      { label: '02 · EXERCICE', title: 'La carte pro.', text: 'Déposer votre demande au CNAPS', href: '#references-rncp' },
    ], note: 'Le titre et la carte professionnelle sont deux étapes distinctes.' },
  },
  'desp-initial': {
    id: 'parcours-desp-initial', name: 'DESP initial', theme: 'orange', eyebrow: 'APPRENDRE À DIRIGER · DESP INITIAL',
    heading: ['Votre projet d’entreprise.', 'Les compétences pour avancer.'],
    steps: [
      copy('Votre ambition', 'Créer, reprendre, diriger : donnez une structure à votre projet.', 'Vous souhaitez prendre la tête d’une entreprise de sécurité privée ? Le DESP initial vous aide à acquérir les compétences nécessaires pour construire votre projet et comprendre les responsabilités du dirigeant.', '#metier', 'Découvrir le métier'),
      copy('Votre formation', 'Sept semaines pour changer de perspective.', 'Le parcours de 245 heures associe cinq semaines à distance et deux semaines en présentiel. Vous approfondissez la réglementation, la gestion, le développement commercial et le management.', '#format', 'Voir l’organisation'),
      copy('Votre projet concret', 'Apprenez en construisant votre future activité.', 'Étude de marché, prévisionnel, offre commerciale et organisation des équipes : les études de cas vous font travailler sur les décisions du dirigeant. Vous préparez aussi les évaluations et les soutenances.', '#programme', 'Explorer le programme'),
      copy('Votre prochain chapitre', 'Préparez le titre. Anticipez les démarches qui suivent.', 'L’obtention du DESP passe par la validation des évaluations. Le titre, l’agrément personnel du dirigeant et l’autorisation d’exercice de l’entreprise sont ensuite trois éléments distincts de votre parcours.', '#inscription', 'Préparer mon inscription'),
    ],
    opening: { image: '/images/desp-initial-hero.jpg', kicker: 'VOTRE AMBITION PREND FORME.', heading: ['Pensez entreprise.', 'Apprenez à diriger.'], text: 'Une vision, des décisions, une équipe. Préparez-vous à prendre de nouvelles responsabilités.', verbs: ['Créer', 'Reprendre', 'Diriger'] },
    study: { value: '7', unit: 'SEMAINES · 245 HEURES', heading: ['Un nouveau', 'cap à prendre.'], panels: [
      { label: 'À DISTANCE', value: '5', unit: 'semaines', detail: '175 heures pour construire vos bases' },
      { label: 'EN PRÉSENTIEL', value: '2', unit: 'semaines', detail: '70 heures pour approfondir et pratiquer' },
    ], skills: ['Réglementation', 'Gestion d’entreprise', 'Management', 'Développement commercial'] },
    practice: { heading: ['Votre idée devient', 'un projet structuré.'], eyebrow: 'LES DÉCISIONS DU DIRIGEANT', rows: [
      { title: 'Définir votre activité', text: 'Positionnement, marché et offre de services.' },
      { title: 'Construire vos prévisions', text: 'Budget, coûts, trésorerie et développement.' },
      { title: 'Organiser votre entreprise', text: 'Recrutement, équipes et suivi des prestations.' },
    ], note: 'Des travaux pédagogiques pour préparer vos décisions.' },
    outcome: { heading: ['Votre formation.', 'Votre prochain chapitre.'], code: 'DESP', role: 'Dirigeant d’entreprise de sécurité privée.', milestones: [
      { label: '01 · LE TITRE', title: 'Je me prépare.', text: 'Évaluations, projet et soutenances', href: '#examen' },
      { label: '02 · LA SUITE', title: 'Je construis.', text: 'Démarches CNAPS et projet d’entreprise', href: '#debouches' },
    ], note: 'La délivrance des autorisations relève d’une instruction distincte.' },
  },
  'desp-vae': {
    id: 'parcours-desp-vae', name: 'DESP VAE', theme: 'orange', eyebrow: 'VALORISER VOTRE EXPÉRIENCE · DESP VAE',
    heading: ['Vous avez l’expérience.', 'Donnez-lui une nouvelle portée.'],
    shortcut: { href: '#eligibilite', label: 'Mon profil', ariaLabel: 'Étudier mon éligibilité à la VAE DESP' },
    steps: [
      copy('Votre expérience', 'Vos responsabilités peuvent devenir le point de départ.', 'Management, gestion, création ou direction : nous analysons vos expériences au regard du référentiel DESP. Ce premier échange permet de vérifier si la VAE correspond à votre parcours.', '#eligibilite', 'Étudier mon éligibilité'),
      copy('Votre accompagnement', 'Un parcours construit autour de vos acquis.', 'Vous préparez un dossier de faisabilité, puis, après recevabilité, un dossier de validation. L’accompagnement vous aide à analyser vos missions et à organiser vos preuves, selon un calendrier adapté à votre dossier.', '#parcours', 'Découvrir les étapes'),
      copy('Votre dossier', 'Faites parler vos réalisations.', 'À partir de situations professionnelles réelles, vous expliquez vos actions, vos choix et les compétences mobilisées. Les preuves donnent de la consistance à votre dossier et préparent l’échange avec le jury.', '#preuves', 'Voir les preuves utiles'),
      copy('Votre prochain chapitre', 'Présentez vos acquis. Préparez la suite.', 'Le jury étudie votre dossier et échange avec vous. La délivrance du titre dépend de sa décision. Après validation, les démarches d’agrément dirigeant et d’autorisation d’exercice restent distinctes.', '#jury', 'Comprendre le jury'),
    ],
    opening: { image: '/images/desp-vae-hero.jpg', kicker: 'VOTRE PARCOURS A DE LA VALEUR.', heading: ['Vous l’avez vécu.', 'Faites-le reconnaître.'], text: 'Vos missions, vos décisions et vos réalisations sont au cœur de votre démarche VAE.', verbs: ['Analyser', 'Démontrer', 'Valoriser'] },
    study: { value: 'VAE', unit: 'UN PARCOURS INDIVIDUALISÉ', heading: ['Votre expérience.', 'Votre fil conducteur.'], panels: [
      { label: 'LE POINT DE DÉPART', value: 'Vos', unit: 'missions', detail: 'Analyser les activités réellement exercées' },
      { label: 'LE DOSSIER', value: 'Vos', unit: 'preuves', detail: 'Démontrer les compétences mobilisées' },
    ], skills: ['Analyse du parcours', 'Faisabilité', 'Dossier de validation', 'Préparation du jury'] },
    practice: { heading: ['Vos réalisations.', 'Des preuves concrètes.'], eyebrow: 'LE DOSSIER DE VALIDATION', rows: [
      { title: 'Choisir une situation', text: 'Présenter le contexte et vos responsabilités.' },
      { title: 'Expliquer vos décisions', text: 'Décrire vos actions et analyser les résultats.' },
      { title: 'Rassembler les preuves', text: 'Relier les pièces aux compétences démontrées.' },
    ], note: 'Des expériences authentiques, présentées avec méthode.' },
    outcome: { heading: ['Votre expérience.', 'Un nouvel horizon.'], code: 'DESP', role: 'Le titre de dirigeant, par la validation de vos acquis.', milestones: [
      { label: '01 · PRÉSENTATION', title: 'Le jury.', text: 'Expliquer et défendre votre parcours', href: '#jury' },
      { label: '02 · PERSPECTIVES', title: 'La suite.', text: 'Préparer votre projet de direction', href: '#debouches' },
    ], note: 'Le titre est délivré après décision favorable du jury.' },
  },
  'vtc': {
    id: 'parcours-vtc', name: 'Chauffeur VTC', theme: 'violet', eyebrow: 'PRENDRE LE VOLANT · CHAUFFEUR VTC',
    heading: ['Votre envie de prendre la route.', 'Une formation pour démarrer.'],
    steps: [
      copy('Votre projet', 'Au volant, chaque détail compte.', 'Une conduite sûre, un accueil soigné et un service professionnel : préparez-vous à un métier qui allie mobilité et relation client. Notre équipe vous aide à organiser votre entrée en formation.', '#inscription', 'Démarrer ma formation'),
      copy('Votre préparation', 'La souplesse du distanciel. L’expérience du présentiel.', 'Le parcours représente 105 heures estimées, avec une théorie accessible en ligne 24 h/24 et une préparation pratique encadrée. Vous avancez sur les matières de l’examen et les gestes du métier.', '#formation', 'Découvrir la préparation'),
      copy('La mise en pratique', 'Préparez une course de bout en bout.', 'Itinéraire, accueil du passager, conduite et facturation : vous travaillez les situations de l’épreuve pratique. Le véhicule double commande est prévu pour l’examen dans la formule présentée.', '#examen', 'Explorer les épreuves'),
      copy('Votre prochain chapitre', 'De la préparation à vos premières démarches.', 'Vous préparez d’abord les épreuves théoriques puis la mise en situation pratique. Après la réussite, notre équipe vous explique les démarches de carte professionnelle et de lancement d’activité.', '#inscription', 'Préparer mon inscription'),
    ],
    opening: { kicker: 'UNE NOUVELLE DIRECTION.', heading: ['Prenez le volant.', 'Ouvrez la voie.'], text: 'Apprenez à offrir une expérience de transport sûre, fluide et professionnelle.', verbs: ['Accueillir', 'Conduire', 'Fidéliser'] },
    study: { value: '105', unit: 'HEURES ESTIMÉES', heading: ['Votre préparation.', 'À votre rythme.'], panels: [
      { label: 'THÉORIE EN LIGNE', value: '24/7', unit: 'accessible', detail: 'Cours, QCM et révisions' },
      { label: 'PRATIQUE ENCADRÉE', value: 'Sur', unit: 'la route', detail: 'Avec un formateur spécialisé VTC' },
    ], skills: ['Réglementation', 'Gestion de l’activité', 'Sécurité routière', 'Relation client'] },
    practice: { heading: ['Plus qu’un trajet.', 'Un vrai service.'], eyebrow: 'LES RÉFLEXES DU CHAUFFEUR', rows: [
      { title: 'Préparer la course', text: 'Étudier l’itinéraire et anticiper la prise en charge.' },
      { title: 'Accueillir et conduire', text: 'Allier confort, sécurité et qualité de service.' },
      { title: 'Finaliser la prestation', text: 'Facturer, encaisser et entretenir la relation client.' },
    ], note: 'Des mises en situation pour préparer l’épreuve pratique.' },
    outcome: { heading: ['Votre formation.', 'Votre nouvelle direction.'], code: 'VTC', role: 'Chauffeur professionnel. Un projet qui vous ressemble.', milestones: [
      { label: '01 · L’EXAMEN', title: 'Je me prépare.', text: 'Théorie puis mise en situation pratique', href: '#examen' },
      { label: '02 · LES DÉMARCHES', title: 'Je démarre.', text: 'Carte professionnelle et lancement', href: '#parcours' },
    ], note: 'Les formalités professionnelles suivent la réussite à l’examen.' },
  },
} satisfies Record<string, CourseJourneyConfig>;

const fireAndFirstAidJourneys = {
  'ssiap-1': {
    id: 'parcours-ssiap-1', name: 'SSIAP 1', theme: 'red', eyebrow: 'SÉCURITÉ INCENDIE · SSIAP 1',
    heading: ['Prévenir les risques.', 'Apprendre à intervenir.'],
    steps: [
      copy('Votre rôle', 'Devenez un maillon essentiel de la sécurité incendie.', 'Dans les établissements recevant du public et les immeubles de grande hauteur, l’agent SSIAP 1 contribue à la prévention et à la protection des personnes. Découvrez les missions et les conditions d’accès au parcours.', '#metier', 'Découvrir le métier'),
      copy('Votre formation', 'Comprendre le feu. Connaître les installations.', '67 heures minimum, hors examen et déplacements, pour étudier le feu, la sécurité des bâtiments et les installations techniques. Le parcours prépare les missions de l’agent de sécurité incendie.', '#programme', 'Explorer le programme'),
      copy('Votre entraînement', 'Des gestes répétés, des réflexes construits.', 'Manipulations, rondes avec anomalies et mises en situation complètent les cours. Vous apprenez à observer, transmettre une alerte et participer à l’intervention dans le cadre de vos missions.', '#pedagogie', 'Découvrir la pratique'),
      copy('Votre prochain chapitre', 'Préparez votre diplôme SSIAP 1.', 'La formation vous prépare aux épreuves de l’examen. Une fois diplômé, vous pouvez évoluer dans les services de sécurité incendie et poursuivre votre parcours selon votre expérience et les conditions d’accès.', '#dates-tarifs', 'Voir les prochaines dates'),
    ],
    opening: { image: '/images/ssiap-1-hero.jpg', kicker: 'PRÉVENIR. VEILLER. INTERVENIR.', heading: ['Votre vigilance.', 'Leur sécurité.'], text: 'Apprenez à prévenir les risques et à agir au sein d’un service de sécurité incendie.', verbs: ['Prévenir', 'Alerter', 'Intervenir'] },
    study: { value: '67', unit: 'HEURES MINIMUM · HORS EXAMEN', heading: ['Les connaissances.', 'Les bons réflexes.'], panels: [
      { label: 'COMPRENDRE', value: 'Le', unit: 'risque', detail: 'Feu, bâtiments et installations' },
      { label: 'AGIR', value: 'Les', unit: 'gestes', detail: 'Rondes et interventions encadrées' },
    ], skills: ['Le feu et ses effets', 'Sécurité des bâtiments', 'Installations techniques', 'Missions de l’agent'] },
    practice: { heading: ['Observer avec rigueur.', 'Agir avec méthode.'], eyebrow: 'VOTRE ENTRAÎNEMENT', rows: [
      { title: 'Réaliser une ronde', text: 'Repérer les anomalies et rendre compte.' },
      { title: 'Utiliser les équipements', text: 'Comprendre les moyens de secours et le SSI.' },
      { title: 'Gérer une situation', text: 'Alerter et mettre en œuvre les consignes.' },
    ], note: 'Cours, démonstrations et mises en situation se complètent.' },
    outcome: { heading: ['Votre formation.', 'Un rôle essentiel.'], code: 'SSIAP 1', role: 'Agent de sécurité incendie.', milestones: [
      { label: '01 · LE DIPLÔME', title: 'Je me prépare.', text: 'Connaître les attendus de l’examen', href: '#examen' },
      { label: '02 · LE MÉTIER', title: 'Je me projette.', text: 'Découvrir les fonctions et les évolutions', href: '#debouches' },
    ], note: 'Le diplôme est obtenu après réussite aux épreuves.' },
  },
  'ssiap-2': {
    id: 'parcours-ssiap-2', name: 'SSIAP 2', theme: 'red', eyebrow: 'ENCADRER UNE ÉQUIPE · SSIAP 2',
    heading: ['Votre expérience du terrain.', 'Une nouvelle responsabilité.'],
    steps: [
      copy('Votre évolution', 'Passez de l’intervention à la coordination.', 'Vous êtes agent SSIAP 1 expérimenté et souhaitez encadrer une équipe ? Le SSIAP 2 prépare l’organisation du service, la transmission des consignes et la coordination au poste central de sécurité.', '#admission', 'Vérifier mon admission'),
      copy('Votre formation', '70 heures pour prendre votre place de chef d’équipe.', 'Hors examen et déplacements, ce parcours en présentiel associe management, systèmes de sécurité incendie, hygiène et sécurité et gestion du poste central en situation de crise.', '#programme', 'Explorer le programme'),
      copy('Votre entraînement', 'Savoir décider et faire agir ensemble.', 'Vous préparez des séquences pédagogiques, travaillez la coordination des agents et la gestion d’incidents au PC sécurité. Les exercices vous aident à relier consignes, décisions et communication.', '#validation', 'Voir les mises en situation'),
      copy('Votre prochain chapitre', 'Préparez le diplôme de chef d’équipe.', 'Les épreuves écrite, orale et pratique évaluent les compétences attendues du chef d’équipe SSIAP 2. Notre équipe vérifie vos prérequis et vous accompagne dans l’organisation de votre entrée en formation.', '#dates-tarifs', 'Recevoir les prochaines dates'),
    ],
    opening: { image: '/images/ssiap-2-hero.jpg', kicker: 'LE TERRAIN. L’ÉQUIPE. LA DÉCISION.', heading: ['Faites équipe.', 'Prenez le relais.'], text: 'Donnez une nouvelle dimension à votre expérience de la sécurité incendie.', verbs: ['Encadrer', 'Coordonner', 'Transmettre'] },
    study: { value: '70', unit: 'HEURES · HORS EXAMEN', heading: ['Votre expérience.', 'Un nouveau niveau.'], panels: [
      { label: 'ENCADRER', value: 'Une', unit: 'équipe', detail: 'Organiser et accompagner les agents' },
      { label: 'COORDONNER', value: 'Le', unit: 'PC sécurité', detail: 'Piloter les actions en situation de crise' },
    ], skills: ['Management d’équipe', 'Systèmes incendie', 'Hygiène et sécurité', 'Gestion de crise'] },
    practice: { heading: ['Donner le cap.', 'Garder la maîtrise.'], eyebrow: 'LES MISSIONS DU CHEF D’ÉQUIPE', rows: [
      { title: 'Organiser le service', text: 'Répartir les missions et transmettre les consignes.' },
      { title: 'Coordonner un incident', text: 'Analyser la situation et orienter les agents.' },
      { title: 'Former et rendre compte', text: 'Expliquer les gestes et informer la hiérarchie.' },
    ], note: 'Des exercices pour préparer vos responsabilités et les épreuves.' },
    outcome: { heading: ['Votre expertise.', 'La force d’une équipe.'], code: 'SSIAP 2', role: 'Chef d’équipe de sécurité incendie.', milestones: [
      { label: '01 · VALIDATION', title: 'Le diplôme.', text: 'Écrit, oral et mise en situation', href: '#validation' },
      { label: '02 · RESPONSABILITÉS', title: 'Le terrain.', text: 'Organisation, coordination et management', href: '#missions' },
    ], note: 'Admission selon vos prérequis ; diplôme après réussite aux épreuves.' },
  },
  'ssiap-3': {
    id: 'parcours-ssiap-3', name: 'SSIAP 3', theme: 'red', eyebrow: 'PILOTER UN SERVICE · SSIAP 3',
    heading: ['Voir plus loin que l’intervention.', 'Piloter la sécurité incendie.'],
    steps: [
      copy('Votre ambition', 'Prenez la responsabilité d’un service de sécurité incendie.', 'Conseiller l’établissement, manager le service et suivre les moyens : le SSIAP 3 prépare une vision d’ensemble de la sécurité incendie. Votre dossier est étudié pour vérifier l’accès à ce niveau.', '#admission', 'Faire étudier mon dossier'),
      copy('Votre formation', 'Une vision technique, réglementaire et managériale.', '216 heures hors examen et déplacements pour approfondir la sécurité des bâtiments, la réglementation, la gestion des risques, le management et le budget du service.', '#programme', 'Explorer le programme'),
      copy('Vos études de cas', 'Analyser, argumenter, conseiller.', 'Lecture de plans, notice technique, analyse des risques et préparation des commissions : vous travaillez les situations du chef de service et préparez les attendus des épreuves.', '#validation', 'Découvrir les évaluations'),
      copy('Votre prochain chapitre', 'Préparez le diplôme SSIAP 3 et vos futures responsabilités.', 'Le parcours vous prépare aux épreuves écrites et à l’entretien devant le jury. Vous développez les compétences pour organiser le service et conseiller le chef d’établissement.', '#dates-tarifs', 'Recevoir les prochaines dates'),
    ],
    opening: { image: '/images/ssiap-3-hero.jpg', kicker: 'L’EXPERTISE QUI ORIENTE LES DÉCISIONS.', heading: ['Prenez de la hauteur.', 'Pilotez la sécurité.'], text: 'Reliez réglementation, risques et management pour diriger un service de sécurité incendie.', verbs: ['Analyser', 'Conseiller', 'Piloter'] },
    study: { value: '216', unit: 'HEURES · HORS EXAMEN', heading: ['Une vision globale.', 'Des choix éclairés.'], panels: [
      { label: 'L’EXPERTISE', value: 'Le', unit: 'cadre', detail: 'Bâtiments, risques et réglementation' },
      { label: 'LE PILOTAGE', value: 'Les', unit: 'moyens', detail: 'Équipe, maintenance et budget' },
    ], skills: ['Réglementation incendie', 'Analyse des risques', 'Management du service', 'Gestion budgétaire'] },
    practice: { heading: ['Comprendre l’ensemble.', 'Décider avec précision.'], eyebrow: 'LES ÉTUDES DU CHEF DE SERVICE', rows: [
      { title: 'Étudier les plans', text: 'Analyser un bâtiment et sa sécurité incendie.' },
      { title: 'Préparer les documents', text: 'Argumenter les choix dans une notice technique.' },
      { title: 'Conseiller l’établissement', text: 'Prioriser les risques et organiser les moyens.' },
    ], note: 'Des cas concrets pour relier l’expertise à la décision.' },
    outcome: { heading: ['Votre maîtrise.', 'Une vision d’ensemble.'], code: 'SSIAP 3', role: 'Chef de service de sécurité incendie.', milestones: [
      { label: '01 · VALIDATION', title: 'Le diplôme.', text: 'Épreuves écrites et entretien', href: '#validation' },
      { label: '02 · PILOTAGE', title: 'Le service.', text: 'Conseil, organisation et gestion des risques', href: '#missions' },
    ], note: 'Admission après étude du dossier ; diplôme après réussite aux épreuves.' },
  },
  'sst': {
    id: 'parcours-sst', name: 'SST', theme: 'green', eyebrow: 'PRÉVENIR ET PORTER SECOURS · SST',
    heading: ['Les bons gestes peuvent compter.', 'Apprenez à les faire.'],
    steps: [
      copy('Votre rôle', 'Au travail, vous pouvez faire la différence.', 'Le Sauveteur Secouriste du Travail contribue à la prévention des risques et intervient face à un accident. La formation initiale est accessible sans prérequis et place la pratique au cœur du parcours.', '#role-sst', 'Découvrir le rôle du SST'),
      copy('Votre formation', 'Deux jours pour apprendre à réagir.', '14 heures de formation en présentiel pour comprendre la prévention et travailler les gestes de premiers secours. Démonstrations et exercices permettent de progresser étape par étape.', '#programme-sst', 'Explorer le programme'),
      copy('Votre entraînement', 'Observer la situation. Choisir le bon geste.', 'Vous vous entraînez à protéger, examiner, alerter ou faire alerter, puis secourir. Les mises en situation vous aident à appliquer les gestes adaptés dans un contexte professionnel.', '#programme-sst', 'Découvrir les gestes'),
      copy('Votre prochain chapitre', 'Validez vos compétences, puis entretenez-les.', 'Les évaluations réalisées pendant la formation permettent de vérifier vos acquis. Le certificat SST est délivré après réussite ; le maintien et l’actualisation des compétences permettent ensuite de le renouveler.', '#dates-tarifs', 'Voir les prochaines dates'),
    ],
    opening: { image: '/images/sst-hero.jpg', kicker: 'DES GESTES QUI ONT DU SENS.', heading: ['Soyez prêt à agir.', 'Quand cela compte.'], text: 'Prévention et premiers secours : devenez un relais utile au sein de votre entreprise.', verbs: ['Protéger', 'Alerter', 'Secourir'] },
    study: { value: '14', unit: 'HEURES · 2 JOURS', heading: ['Apprendre ensemble.', 'S’entraîner pour agir.'], panels: [
      { label: 'PRÉVENTION', value: 'Les', unit: 'risques', detail: 'Repérer et contribuer à la prévention' },
      { label: 'INTERVENTION', value: 'Les', unit: 'secours', detail: 'Appliquer les gestes adaptés' },
    ], skills: ['Prévention en entreprise', 'Protection', 'Examen et alerte', 'Gestes de secours'] },
    practice: { heading: ['Comprendre le geste.', 'Apprendre à le faire.'], eyebrow: 'LES MISES EN SITUATION', rows: [
      { title: 'Protéger et examiner', text: 'Repérer le danger et observer la victime.' },
      { title: 'Alerter ou faire alerter', text: 'Transmettre les informations utiles aux secours.' },
      { title: 'Secourir', text: 'Choisir et réaliser les gestes adaptés.' },
    ], note: 'Des démonstrations, des répétitions et des retours du formateur.' },
    outcome: { heading: ['Votre formation.', 'Des réflexes utiles.'], code: 'SST', role: 'Sauveteur Secouriste du Travail.', milestones: [
      { label: '01 · CERTIFICATION', title: 'Je valide.', text: 'Démontrer les compétences acquises', href: '#evaluation-sst' },
      { label: '02 · ACTUALISATION', title: 'Je maintiens.', text: 'MAC SST tous les 24 mois', href: '#evaluation-sst' },
    ], note: 'Certificat délivré après réussite aux évaluations certificatives.' },
  },
} satisfies Record<string, CourseJourneyConfig>;

type BtsJourneyProfile = {
  code: string;
  name: string;
  headline: Pair<string>;
  pitch: string;
  verbs: Three<string>;
  skills: Four<string>;
  missions: Three<PracticeRow>;
  outcome: string;
  competencyHref: '#metier' | '#competences';
  hasBenefitsSection?: boolean;
};

function btsJourney(profile: BtsJourneyProfile): CourseJourneyConfig {
  return {
    id: `parcours-bts-${profile.code.toLowerCase()}`, name: `BTS ${profile.code}`, theme: 'blue', eyebrow: `VOTRE AVENIR EN ALTERNANCE · BTS ${profile.code}`,
    heading: [`Votre projet, votre BTS ${profile.code}.`, 'Passez à la prochaine étape.'],
    shortcut: { href: '#admission', label: 'Candidater', ariaLabel: `Voir les admissions du BTS ${profile.code}` },
    steps: [
      copy('Votre projet', profile.headline.join(' '), profile.pitch, profile.competencyHref, 'Découvrir les compétences'),
      copy('Votre alternance', 'Deux ans pour apprendre et prendre votre place.', `Votre BTS ${profile.code} associe deux jours de cours et trois jours en entreprise. Les cours se suivent à Puget-sur-Argens ou en visioconférence, selon les modalités validées avec l’équipe admissions.`, '#alternance', 'Comprendre mon alternance'),
      copy('Votre expérience', 'Ce que vous apprenez prend vie en entreprise.', `Votre alternance vous permet de mettre en pratique les compétences du BTS ${profile.code}. Vous prenez part à des missions concrètes, développez votre posture professionnelle et construisez progressivement votre expérience.`, '#programme', 'Explorer le programme'),
      copy('Votre prochain chapitre', 'Un diplôme. Une expérience. De nouvelles perspectives.', `${profile.outcome} Votre parcours prépare un diplôme national de niveau Bac+2. L’équipe vous accompagne dans votre candidature et les étapes vers l’entreprise d’accueil.`, '#admission', 'Préparer ma candidature'),
    ],
    opening: { kicker: 'VOTRE AVENIR SE CONSTRUIT MAINTENANT.', heading: profile.headline, text: profile.pitch, verbs: profile.verbs },
    study: { value: '2', unit: 'ANS · EN ALTERNANCE', heading: ['J’apprends.', 'Je mets en pratique.'], panels: [
      { label: 'LES COURS', value: '2', unit: 'jours', detail: 'À l’école ou en visioconférence' },
      { label: 'L’ENTREPRISE', value: '3', unit: 'jours', detail: 'Des missions professionnelles concrètes' },
    ], skills: profile.skills },
    practice: { heading: ['Votre formation.', 'La réalité du métier.'], eyebrow: `EN ENTREPRISE · BTS ${profile.code}`, rows: profile.missions, note: 'Un rythme hebdomadaire qui relie les cours à votre expérience.' },
    outcome: { heading: ['Votre talent.', 'De nouvelles possibilités.'], code: `BTS ${profile.code}`, role: profile.name, milestones: [
      { label: '01 · BAC+2', title: 'Le diplôme.', text: 'Préparer les compétences et les épreuves', href: '#programme' },
      { label: '02 · ALTERNANCE', title: 'L’expérience.', text: 'Apprendre au sein d’une entreprise', href: profile.hasBenefitsSection === false ? '#alternance' : '#avantages-bts' },
    ], note: profile.hasBenefitsSection === false ? 'Un diplôme national et une expérience professionnelle à valoriser.' : 'iPad dès le contrat d’apprentissage · Londres en 2ᵉ année.' },
  };
}

const btsJourneys = {
  'bts-mos': btsJourney({
    code: 'MOS', name: 'Management Opérationnel de la Sécurité', competencyHref: '#metier',
    headline: ['Le sens du terrain.', 'L’envie de manager.'],
    pitch: 'Apprenez à préparer les prestations de sécurité, organiser les moyens et accompagner les équipes au quotidien.',
    verbs: ['Préparer', 'Organiser', 'Manager'],
    skills: ['Prestations de sécurité', 'Management des équipes', 'Relation client', 'Suivi de la qualité'],
    missions: [
      { title: 'Préparer une prestation', text: 'Analyser les besoins et organiser les moyens.' },
      { title: 'Accompagner une équipe', text: 'Transmettre les consignes et suivre l’activité.' },
      { title: 'Suivre la qualité', text: 'Évaluer les résultats et rendre compte au client.' },
    ], outcome: 'Projetez-vous vers la coordination de prestations et l’encadrement opérationnel en sécurité privée.',
  }),
  'bts-mco': btsJourney({
    code: 'MCO', name: 'Management Commercial Opérationnel', competencyHref: '#metier',
    headline: ['Le goût du commerce.', 'L’élan du management.'],
    pitch: 'Apprenez à conseiller les clients, animer une offre commerciale et faire progresser les résultats d’une équipe.',
    verbs: ['Conseiller', 'Animer', 'Manager'],
    skills: ['Vente conseil', 'Animation commerciale', 'Gestion opérationnelle', 'Management d’équipe'],
    missions: [
      { title: 'Conseiller et fidéliser', text: 'Comprendre le besoin et accompagner l’achat.' },
      { title: 'Dynamiser l’offre', text: 'Mettre en valeur les produits et les services.' },
      { title: 'Piloter l’activité', text: 'Suivre les stocks, les résultats et l’équipe.' },
    ], outcome: 'Vente, relation client, management adjoint : construisez votre place dans le commerce et les services.',
  }),
  'bts-ndrc': btsJourney({
    code: 'NDRC', name: 'Négociation et Digitalisation de la Relation Client', competencyHref: '#competences',
    headline: ['Créez le contact.', 'Faites grandir la relation.'],
    pitch: 'Prospection, négociation et digital : développez les compétences pour accompagner les clients sur tous les canaux.',
    verbs: ['Prospecter', 'Négocier', 'Fidéliser'],
    skills: ['Négociation et vente', 'Relation omnicanale', 'Digital et e-commerce', 'Animation de réseaux'],
    missions: [
      { title: 'Ouvrir des opportunités', text: 'Cibler, prospecter et préparer un rendez-vous.' },
      { title: 'Développer la relation', text: 'Négocier une solution et fidéliser le client.' },
      { title: 'Activer les bons canaux', text: 'Animer le digital et les réseaux commerciaux.' },
    ], outcome: 'Commercial, chargé de clientèle ou animateur de réseau : préparez votre avenir dans la relation client.',
  }),
  'bts-ci': btsJourney({
    code: 'CI', name: 'Commerce International', competencyHref: '#competences',
    headline: ['Voyez plus grand.', 'Pensez international.'],
    pitch: 'Langues, relations interculturelles et import-export : apprenez à accompagner les échanges au-delà des frontières.',
    verbs: ['Explorer', 'Échanger', 'Développer'],
    skills: ['Relation interculturelle', 'Opérations internationales', 'Développement commercial', 'Langues vivantes'],
    missions: [
      { title: 'Explorer un marché', text: 'Réaliser une veille et identifier des opportunités.' },
      { title: 'Accompagner les échanges', text: 'Communiquer avec les clients et partenaires.' },
      { title: 'Coordonner les opérations', text: 'Suivre les documents et les flux import-export.' },
    ], outcome: 'Assistant import-export ou commercial international : donnez une dimension internationale à votre parcours.',
  }),
  'bts-pi': btsJourney({
    code: 'PI', name: 'Professions Immobilières', competencyHref: '#competences',
    headline: ['Des lieux de vie.', 'Des projets à accompagner.'],
    pitch: 'Transaction, location et gestion : apprenez à conseiller les clients et à suivre leurs projets immobiliers avec rigueur.',
    verbs: ['Conseiller', 'Négocier', 'Gérer'],
    skills: ['Transaction immobilière', 'Gestion locative', 'Copropriété', 'Conseil et droit immobilier'],
    missions: [
      { title: 'Accompagner un projet', text: 'Comprendre les attentes des vendeurs et acquéreurs.' },
      { title: 'Participer aux transactions', text: 'Prospecter, préparer les visites et négocier.' },
      { title: 'Suivre la gestion', text: 'Contribuer au suivi locatif et à la copropriété.' },
    ], outcome: 'Transaction, gestion locative ou copropriété : préparez-vous aux différentes facettes des métiers de l’immobilier.',
  }),
  'bts-cg': btsJourney({
    code: 'CG', name: 'Comptabilité et Gestion', competencyHref: '#competences', hasBenefitsSection: false,
    headline: ['Donnez du sens', 'aux chiffres.'],
    pitch: 'Comptabilité, fiscalité et analyse : apprenez à produire une information fiable et à éclairer les décisions de l’entreprise.',
    verbs: ['Vérifier', 'Analyser', 'Éclairer'],
    skills: ['Comptabilité', 'Fiscalité et gestion sociale', 'Analyse financière', 'Outils numériques'],
    missions: [
      { title: 'Fiabiliser les opérations', text: 'Enregistrer et contrôler les pièces comptables.' },
      { title: 'Préparer les déclarations', text: 'Participer aux travaux fiscaux et sociaux.' },
      { title: 'Analyser les résultats', text: 'Suivre la trésorerie et les tableaux de bord.' },
    ], outcome: 'Assistant comptable, collaborateur en cabinet ou assistant en gestion : développez une expertise utile aux organisations.',
  }),
} satisfies Record<string, CourseJourneyConfig>;

const btsOverviewJourney: CourseJourneyConfig = {
  id: 'parcours-bts', name: 'BTS en alternance', theme: 'blue', eyebrow: 'VOTRE AVENIR · BTS EN ALTERNANCE',
  heading: ['Un BTS qui vous ressemble.', 'Un avenir à construire.'],
  shortcut: { href: '#formations-bts', label: 'Les BTS', ariaLabel: 'Comparer les six formations BTS' },
  steps: [
    copy('Votre projet', 'Choisissez le domaine qui vous donne envie d’avancer.', 'Sécurité, commerce, relation client, international, immobilier ou comptabilité : découvrez nos six BTS et les compétences qu’ils permettent de développer.', '#formations-bts', 'Découvrir les six BTS'),
    copy('Votre alternance', 'Un diplôme et une expérience qui se construisent ensemble.', 'Deux jours de cours et trois jours en entreprise : l’alternance relie les apprentissages à la réalité professionnelle. Les modalités de présentiel ou de visioconférence sont précisées sur chaque parcours.', '#alternance-bts', 'Comprendre le rythme'),
    copy('Votre expérience', 'Apprendre un métier en participant à la vie d’une entreprise.', 'Conseiller un client, préparer une prestation, suivre une opération ou analyser des résultats : les missions dépendent du BTS et de l’entreprise qui vous accueille.', '#formations-bts', 'Trouver mon domaine'),
    copy('Votre prochain chapitre', 'Faites le premier pas vers votre BTS.', 'L’équipe admissions étudie votre dossier et votre projet. Elle vous accompagne dans les étapes de candidature, de recherche d’entreprise et de préparation du contrat d’apprentissage.', 'https://inscriptionsbts.onrender.com/', 'Préparer ma candidature'),
  ],
  opening: { kicker: 'VOTRE TALENT A DE L’AVENIR.', heading: ['Trouvez votre voie.', 'Prenez votre élan.'], text: 'Six BTS, des univers différents et une même ambition : vous aider à construire votre avenir professionnel.', verbs: ['Choisir', 'Apprendre', 'Avancer'] },
  study: { value: '2', unit: 'ANS · EN ALTERNANCE', heading: ['Un pied à l’école.', 'Un pied en entreprise.'], panels: [
    { label: 'LES COURS', value: '2', unit: 'jours', detail: 'Apprendre avec les formateurs' },
    { label: 'L’ENTREPRISE', value: '3', unit: 'jours', detail: 'Développer votre expérience' },
  ], skills: ['Compétences métier', 'Matières générales', 'Projets professionnels', 'Préparation du diplôme'] },
  practice: { heading: ['Votre curiosité.', 'Votre terrain de jeu.'], eyebrow: 'SIX PARCOURS À DÉCOUVRIR', rows: [
    { title: 'Sécurité et commerce', text: 'BTS MOS · BTS MCO' },
    { title: 'Client et international', text: 'BTS NDRC · BTS Commerce International' },
    { title: 'Immobilier et gestion', text: 'BTS PI · BTS Comptabilité et Gestion' },
  ], note: 'Explorez chaque BTS pour choisir le parcours adapté à votre projet.' },
  outcome: { heading: ['Votre choix.', 'Le début de la suite.'], code: 'BTS', role: 'Un diplôme Bac+2 et une expérience en entreprise.', milestones: [
    { label: '01 · MON PARCOURS', title: 'Je découvre.', text: 'Comparer les six spécialités', href: '#formations-bts' },
    { label: '02 · MA CANDIDATURE', title: 'Je me lance.', text: 'Préparer mon dossier en ligne', href: 'https://inscriptionsbts.onrender.com/' },
  ], note: 'Admission après étude du dossier et du projet d’alternance.' },
};

export const courseJourneys = { ...professionalJourneys, ...fireAndFirstAidJourneys, ...btsJourneys, 'bts-overview': btsOverviewJourney };
export type CourseJourneyKey = keyof typeof courseJourneys;
