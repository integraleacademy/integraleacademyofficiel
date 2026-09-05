export const a3pConfig = {
  slug: 'a3p-apr',
  pageUrl: '/formations-securite/a3p-apr',
  title: 'TFP Agent de protection physique des personnes',
  abbreviation: 'A3P',
  rncp: 'RNCP38002',
  previousRncp: 'RNCP35098',
  level: 'Niveau 4',
  certificateur: 'ADEF / CPNEFP Prévention-Sécurité',
  certificateurLegalName: 'Association pour le développement de la formation professionnelle dans la branche sécurité privée',
  rncpExpiry: '20 septembre 2028',
  nsf: '344 — Sécurité des biens et des personnes, police, surveillance',
  formacode: '42812 — Protection rapprochée',
  rome: 'K2503 — Sécurité et surveillance privées',
  certificationStructure: 'Bloc unique · aucune capitalisation ni équivalence de blocs',
  rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/38002/',
  durationHours: '328 heures hors examen',
  durationShort: '328 h',
  practiceHours: '92 h 50 de pratique',
  commonCoreHours: '41 h de socle de base',
  specialtyHours: '287 h de spécialité A3P',
  durationLabel: 'Environ 9 semaines de formation intensive',
  priceLabel: '4 200 €',
  priceCents: 420000,
  location: 'Puget-sur-Argens',
  locationDetail: 'Var · Côte d’Azur',
  modality: '100 % présentiel',
  accommodationLabel: 'Possible sur place',
  accommodationPriceLabel: '300 €',
  accommodationNote: 'Participation indicative pour la totalité de la formation, destinée notamment aux frais d’eau et d’électricité, à confirmer lors de l’inscription.',
  programPdfUrl: '/documents/programme-tfp-a3p-2023.pdf',
  videoUrl: '',
  heroImage: '/images/campus/campus-pratique.jpg',
  gallery: ['/images/campus/campus-pratique.jpg', '/images/campus/campus-salle-cours.jpg', '/images/campus/campus-principal.jpg'],
  adefApproval: '8320111201',
  advisor: { name: 'Cassandre', role: 'Responsable commerciale — Intégrale Academy', phone: '04 22 47 07 68', phoneHref: 'tel:0422470768' },
  apsA3pOffer: { priceLabel: '5 300 €', oldPriceLabel: '5 850 €', discountLabel: '550 € de réduction', href: '/contact?formation=aps-a3p&type=parcours-recommande' },
  indicators: [] as { label: string; value: string; period: string; updatedAt: string }[],
  testimonials: [] as { name: string; text: string; role?: string }[],
};

export const a3pContact = (type = 'dossier') => `/contact?formation=a3p-apr&type=${encodeURIComponent(type)}&source=${encodeURIComponent(a3pConfig.pageUrl)}`;

export const a3pInfoCards = [
  ['Durée', a3pConfig.durationHours, `${a3pConfig.practiceHours} · ${a3pConfig.durationLabel}`],
  ['Lieu', a3pConfig.location, a3pConfig.locationDetail],
  ['Tarif', a3pConfig.priceLabel, 'Financements et paiement échelonné selon votre situation'],
  ['Certification', 'TFP A3P', `${a3pConfig.rncp} · ${a3pConfig.level}`],
  ['Modalité', a3pConfig.modality, 'Entraînements théoriques et pratiques'],
  ['Hébergement', a3pConfig.accommodationLabel, 'Dortoir collectif équipé, sur réservation'],
];

export const a3pPrerequisites = [
  {
    title: 'Autorisation préalable ou carte professionnelle CNAPS',
    body: [
      'Avant l’entrée en formation, le candidat doit détenir une autorisation préalable correspondant à l’activité de protection physique des personnes ou une carte professionnelle en cours de validité permettant l’accès à la formation.',
      'La demande reste personnelle auprès du CNAPS. Intégrale Academy fournit les éléments de préinscription et explique la démarche.',
    ],
    note: 'L’autorisation préalable permet d’entrer en formation ; elle ne permet pas d’exercer.',
  },
  {
    title: 'Conditions d’honorabilité',
    body: ['La demande CNAPS donne lieu à une enquête administrative afin de vérifier l’absence de faits incompatibles avec l’exercice d’une activité privée de sécurité.'],
  },
  {
    title: 'Français de niveau B1 minimum',
    body: [
      'Le candidat doit comprendre le langage nécessaire au métier et être capable d’effectuer un compte rendu oral et écrit. Le niveau attendu est le niveau B1 du CECRL.',
      'Les justificatifs recevables sont vérifiés avant l’inscription en fonction de la situation du candidat.',
    ],
  },
  {
    title: 'Ressortissants étrangers',
    body: [
      'Le référentiel RNCP précise qu’une autorisation préalable ne peut être demandée qu’avec un titre de séjour détenu depuis au moins cinq ans, sous réserve des exceptions légales applicables.',
      'Le test B1 défini par l’arrêté du 31 mars 2022 est obligatoire pour les ressortissants étrangers ; le test de branche ne peut pas être utilisé.',
    ],
  },
  {
    title: 'Capacité à suivre les exercices pratiques',
    body: ['Le parcours comprend des déplacements, des techniques professionnelles, du secourisme et des mises en situation. Le candidat doit pouvoir participer à ces activités et signaler en amont tout besoin d’aménagement.'],
    note: 'Le certificat médical et le permis B ne figurent pas parmi les prérequis d’entrée listés sur la fiche RNCP38002.',
  },
];

export const a3pProgram = [
  {
    code: 'UV1',
    title: 'Module secourisme — SST',
    duration: '14 h',
    practice: 'dont 7 h de pratique',
    description: 'Intervenir face à une situation d’accident du travail et contribuer à la prévention des risques professionnels.',
    items: ['Protection, examen, alerte et secours', 'Hémorragies, étouffement, malaises et traumatismes', 'Réanimation cardio-pulmonaire et défibrillateur', 'Mises en situation conformes au dispositif SST de l’INRS'],
  },
  {
    code: 'UV2',
    title: 'Module juridique',
    duration: '22 h',
    practice: 'enseignement réglementaire',
    description: 'Maîtriser l’environnement juridique de la sécurité privée et les limites d’intervention de l’A3P.',
    items: ['Livre VI du Code de la sécurité intérieure', 'Responsabilités pénale et civile', 'Légitime défense, état de nécessité et article 73 du CPP', 'Libertés publiques, vie privée, CNIL et droit à l’image', 'Convention collective de la prévention-sécurité', 'Principes de la République et déontologie'],
  },
  {
    code: 'UV3',
    title: 'Gestion des conflits',
    duration: '14 h',
    practice: 'dont 7 h de pratique',
    description: 'Identifier, prévenir et résoudre une situation conflictuelle, y compris dans un contexte de protection de personne.',
    items: ['Origines et mécanismes du conflit', 'Communication et posture adaptées', 'Gestion des émotions et du stress', 'Prévention des débordements', 'Mises en situation et retour d’expérience'],
  },
  {
    code: 'UV4',
    title: 'Module stratégique',
    duration: '8 h',
    practice: 'dont 1 h de pratique',
    description: 'Transmettre des consignes et produire des informations professionnelles fiables, écrites comme orales.',
    items: ['Outils informatiques', 'Main courante', 'Compte rendu oral et écrit', 'Rapport professionnel', 'Alerte et compte rendu aux forces de l’ordre'],
  },
  {
    code: 'UV5',
    title: 'Prévention des risques terroristes',
    duration: '13 h',
    practice: 'dont 3 h 30 de pratique',
    description: 'Détecter une menace, prévenir le risque terroriste et adopter les réactions adaptées avant, pendant et après une attaque.',
    items: ['Niveaux de menace et modes opératoires', 'Matériels, armes et engins explosifs', 'Détection de comportements et situations suspects', 'Alerte et transmission aux autorités', 'Réflexes tactiques : fuir, se cacher, alerter', 'Secours et sécurisation immédiate'],
  },
  {
    code: 'UV6',
    title: 'Module professionnel approfondi',
    duration: '158 h',
    practice: 'dont 38 h de pratique',
    description: 'Préparer, organiser et conduire une mission de protection physique des personnes dans ses différentes configurations.',
    items: ['Anglais technique et professionnel — 21 h', 'Droit international — 4 h et article 73 du CPP — 3 h', 'Principes de protection et préparation de mission', 'Déplacements pédestres et positionnements', 'Reconnaissance et sécurisation de sites', 'Dispositifs embarqués, véhicules et deux-roues', 'Embarquement, débarquement, évacuation et conduite de sécurité', 'Communications, briefings, débriefings et coordination'],
  },
  {
    code: 'UV7',
    title: 'Techniques professionnelles',
    duration: '45 h',
    practice: 'dont 25 h de pratique',
    description: 'Mettre en œuvre les techniques professionnelles de protection, d’intervention, de surveillance et de contre-surveillance.',
    items: ['Pratique sportive de défense', 'Techniques d’intervention et de mise à l’abri', 'Surveillance et contre-surveillance', 'Détection et rupture d’une filature', 'Dépoussiérage et contrôle de l’environnement', 'Géolocalisation', 'Protection de l’information et cybersécurité'],
  },
  {
    code: 'UV8',
    title: 'Gestion des risques',
    duration: '40 h',
    practice: 'dont 3 h de pratique',
    description: 'Prévenir et gérer les risques susceptibles d’affecter une mission, la personne protégée ou le dispositif.',
    items: ['Prévention et intervention face au risque incendie', 'Risques liés aux transports terrestres, maritimes et aériens', 'Missions en situation dégradée ou zone de conflit', 'Événements, rassemblements et mouvements de foule', 'Menaces malveillantes : agression, enlèvement et prise d’otage'],
  },
  {
    code: 'UV9',
    title: 'Secourisme tactique d’urgence',
    duration: '14 h',
    practice: 'dont 8 h 20 de pratique',
    description: 'Porter secours dans un environnement hostile ou dégradé en protégeant la victime, l’équipe et la mission.',
    items: ['Phases et protocoles SAFE-ABC, MARCHE et RYAN', 'Hémorragies et détresses respiratoires', 'Extraction et mise à l’abri', 'Fractures, brûlures et traumatismes', 'Secours routier et défibrillation', 'Scénarios tactiques et transmission du bilan'],
  },
];

export const a3pWorkConditions = [
  'Protection et respect de la vie privée de personnalités, dirigeants et autres clients',
  'Activité au domicile comme lors de déplacements privés ou professionnels',
  'Travail seul ou en équipe selon la lettre de mission et le dispositif de protection',
  'Déplacements possibles partout en France et à l’international',
  'Communication permanente avec les équipiers au moyen d’un dispositif dédié',
  'Missions non armées ; équipements particuliers possibles selon le niveau de risque',
];

export const a3pEmployerSectors = [
  'Clients privés et particuliers',
  'Entreprises de sécurité privée',
  'Agences de protection rapprochée',
  'Ambassades et préfectures',
  'Collectivités territoriales et organismes publics',
  'Banques et assurances',
  'PME et grandes entreprises',
  'Missions nationales ou internationales',
];

export const a3pInsertionStats = [
  { year: '2022', certified: '94 certifiés', global: '78 %', targetJob: '43 %', targetJobTwoYears: '—' },
  { year: '2021', certified: '65 certifiés', global: '80 %', targetJob: '70 %', targetJobTwoYears: '20 %' },
  { year: '2020', certified: '42 certifiés', global: '88 %', targetJob: '65 %', targetJobTwoYears: '0 %' },
];

export const a3pEnrollmentSteps = [
  ['1', 'Échange sur le projet', 'Le centre vérifie le métier visé, la disponibilité et les contraintes du parcours.'],
  ['2', 'Contrôle des prérequis', 'Autorisation ou carte CNAPS, honorabilité, niveau B1 et situation administrative.'],
  ['3', 'Financement et inscription', 'Validation du financement, du contrat, des pièces et de la convocation.'],
  ['4', 'Formation et certification', '328 heures hors examen, évaluations, mission complète et jury.'],
  ['5', 'Demande de carte professionnelle', 'Après réussite, la demande de carte A3P est déposée auprès du CNAPS.'],
];

export const a3pFaq = [
  ['Quelle est la différence entre A3P, APR et garde du corps ?', 'A3P signifie agent de protection physique des personnes. APR signifie agent de protection rapprochée. « Garde du corps » est une appellation courante. Le TFP Agent de protection physique des personnes est l’intitulé officiel de la certification.'],
  ['La formation A3P permet-elle de travailler immédiatement ?', 'La réussite à la certification justifie l’aptitude professionnelle. Pour exercer, le diplômé doit ensuite demander et obtenir auprès du CNAPS la carte professionnelle correspondant à l’activité de protection physique des personnes.'],
  ['Faut-il avoir été militaire ou policier ?', 'Non. Cette expérience peut être utile, mais elle n’est pas obligatoire. Le candidat doit remplir les prérequis réglementaires et être en capacité de suivre les exercices pratiques.'],
  ['Ai-je besoin d’une autorisation du CNAPS ?', 'Oui, sauf situation particulière prévue par la réglementation. Avant l’entrée en formation, le candidat doit obtenir une autorisation préalable correspondant à l’activité ou détenir une carte professionnelle en cours de validité permettant l’accès à la formation.'],
  ['Intégrale Academy fait-elle la demande CNAPS à ma place ?', 'La demande est personnelle. Intégrale Academy fournit les documents de préinscription et explique les étapes de la démarche.'],
  ['Combien de temps dure la formation ?', 'Le programme réglementaire comprend 328 heures hors examen, dont 92 heures et 50 minutes de pratique : 41 heures de socle de base et 287 heures de spécialité A3P.'],
  ['Comment se déroule l’examen ?', 'Les connaissances sont évaluées par des QCU contextualisés. Une note d’au moins 12/20 valide l’UV ; de 8 à moins de 12/20, le candidat est ajourné et peut se représenter ; sous 8/20, il doit suivre à nouveau le module. Les compétences pratiques sont évaluées apte ou inapte, avec une mission complète, un dossier et une soutenance devant jury.'],
  ['Le titre est-il découpé en blocs capitalisables ?', 'Non. Il s’agit d’un bloc unique lié à l’exercice d’un métier réglementé. La fiche RNCP38002 ne prévoit ni capitalisation ni équivalence de blocs de compétences.'],
  ['Jusqu’à quand le RNCP38002 est-il enregistré ?', 'L’échéance d’enregistrement publiée sur la fiche France Compétences est fixée au 20 septembre 2028.'],
  ['Où se déroule la formation ?', 'La formation se déroule en présentiel à Puget-sur-Argens, dans le Var, entre Cannes et Saint-Tropez.'],
  ['Peut-on être hébergé sur place ?', 'Un hébergement collectif peut être proposé sur place, sous réserve de disponibilité et de réservation préalable. Contactez l’équipe pour connaître les conditions et le montant de la participation.'],
  ['La formation est-elle éligible au CPF ?', 'Une prise en charge CPF peut être possible lorsque l’offre et la session correspondantes sont publiées comme éligibles. Un conseiller peut vérifier votre situation et l’éventuel reste à charge.'],
  ['France Travail peut-il financer la formation ?', 'Une demande de financement peut être présentée à France Travail. L’acceptation dépend de la situation du candidat, de son projet professionnel et de la décision de son conseiller.'],
  ['Peut-on payer la formation en plusieurs fois ?', 'Des facilités de paiement peuvent être proposées après étude du dossier. Contactez l’équipe pour connaître les solutions disponibles.'],
  ['Est-ce une formation armée ?', 'Non. Le TFP A3P présenté ici concerne la protection physique des personnes non armée. Les activités armées relèvent d’autorisations, de cartes professionnelles et de formations spécifiques.'],
  ['La formation est-elle physiquement difficile ?', 'Elle comporte des déplacements, des techniques professionnelles, du secourisme et des mises en situation. Il faut pouvoir participer aux exercices, mais le parcours n’est pas un stage militaire.'],
  ['Le permis de conduire est-il obligatoire ?', 'Le permis B ne figure pas parmi les prérequis d’entrée de la fiche RNCP38002. Il peut néanmoins être utile pour certaines missions et certains emplois, notamment la conduite de sécurité.'],
  ['Quel niveau de français est demandé ?', 'Le niveau minimum attendu est B1 : comprendre les enseignements et les consignes, communiquer clairement et produire un compte rendu oral et écrit. Pour les ressortissants étrangers, le test B1 défini par l’arrêté du 31 mars 2022 est obligatoire et le test de branche ne peut pas être utilisé.'],
  ['Quelles règles concernent les ressortissants étrangers ?', 'La fiche RNCP38002 précise qu’ils doivent détenir un titre de séjour depuis au moins cinq ans pour demander l’autorisation préalable, sous réserve des exceptions légales applicables, et justifier leur niveau B1 selon les modalités réglementaires.'],
  ['Puis-je travailler à l’international après cette formation ?', 'La certification prépare d’abord à l’exercice réglementé en France. Pour exercer à l’étranger, il faut vérifier la réglementation du pays, les autorisations, les conditions d’emploi et les qualifications complémentaires éventuelles.'],
  ['La formation garantit-elle un emploi ?', 'Non. La certification est indispensable pour justifier l’aptitude professionnelle, mais le recrutement dépend aussi de l’expérience, du réseau, de la mobilité, des langues et du profil du candidat.'],
].map(([q, a]) => ({ q, a }));
