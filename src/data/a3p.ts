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
  priceLabel: '4 250 € TTC',
  priceCents: 425000,
  location: 'Puget-sur-Argens',
  locationDetail: 'Var · Côte d’Azur',
  modality: '100 % présentiel',
  accommodationLabel: 'Possible sur place',
  accommodationPriceLabel: '350 € TTC',
  accommodationNote: 'Tarif 2027 pour la totalité de la formation, sur réservation et sous réserve de disponibilité.',
  programPdfUrl: '/documents/programme-a3p.pdf',
  videoUrl: '',
  heroImage: '/images/campus/salle-formation.webp',
  gallery: ['/images/campus/salle-formation.webp', '/images/campus/salle-lumineuse.webp', '/images/campus/accueil-centre.webp'],
  adefApproval: '8320111201',
  advisor: { name: 'Cassandre', role: 'Responsable commerciale — Intégrale Academy', phone: '04 22 47 07 68', phoneHref: 'tel:0422470768' },
  apsA3pOffer: { priceLabel: '5 300 €', oldPriceLabel: '5 950 € TTC', discountLabel: '650 € de réduction', href: '/contact?formation=aps-a3p&type=parcours-recommande' },
  indicators: [] as { label: string; value: string; period: string; updatedAt: string }[],
  testimonials: [] as { name: string; text: string; role?: string }[],
};

export const a3pContact = (type = 'dossier') => `/contact?formation=a3p-apr&type=${encodeURIComponent(type)}&source=${encodeURIComponent(a3pConfig.pageUrl)}`;

export const a3pInfoCards = [
  ['Durée', a3pConfig.durationHours, `${a3pConfig.practiceHours} · ${a3pConfig.durationLabel}`],
  ['Lieu', a3pConfig.location, a3pConfig.locationDetail],
  ['Tarif 2027', a3pConfig.priceLabel, 'Financements et paiement échelonné selon votre situation'],
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
  {
    q: 'Quelle est la différence entre A3P, APR et garde du corps ?',
    a: 'A3P est l’abréviation d’« agent de protection physique des personnes », l’intitulé du titre à finalité professionnelle enregistré au niveau 4 sous le numéro RNCP38002. « Agent de protection rapprochée » (APR) et « garde du corps » sont des appellations que vous pouvez rencontrer dans les offres d’emploi.\n\n' +
      'Ces termes renvoient à la protection d’un client, par exemple lors de ses déplacements privés ou professionnels. Si vous comparez deux formations, recherchez l’intitulé de la certification et son numéro RNCP pour identifier le titre préparé et l’activité professionnelle visée.',
  },
  {
    q: 'La formation A3P permet-elle de travailler immédiatement ?',
    a: 'Pour exercer en France, il faut avoir obtenu du CNAPS une carte professionnelle couvrant la protection physique des personnes. La réussite du TFP A3P vous donne le justificatif d’aptitude professionnelle à joindre à la demande.\n\n' +
      'Si vous travaillez déjà dans la surveillance ou le gardiennage, vérifiez les activités mentionnées sur votre carte. Si la protection physique des personnes en est absente, demandez l’extension correspondant à cette activité et attendez sa délivrance avant d’accepter une mission de protection rapprochée.',
  },
  {
    q: 'Faut-il avoir été militaire ou policier ?',
    a: 'Vous pouvez candidater en venant d’un autre métier ou dans le cadre d’une reconversion. L’Académie accueille aussi bien des candidats découvrant le secteur que des agents de sécurité expérimentés. L’expérience dans la police ou les armées n’est pas un prérequis du TFP A3P.\n\n' +
      'Votre admission porte sur les conditions d’accès au métier, le français de niveau B1 et votre capacité à prendre part aux exercices. Le premier échange permet aussi de vérifier que vous êtes disponible pour environ neuf semaines en présentiel et pour les épreuves de certification.',
  },
  {
    q: 'Ai-je besoin d’une autorisation du CNAPS ?',
    a: 'Avant d’entrer en formation A3P, vous devez présenter une autorisation préalable du CNAPS portant sur la protection physique des personnes, ou une carte professionnelle en cours de validité permettant l’entrée sur ce parcours. Si vous possédez déjà une carte de sécurité privée, présentez-la au centre pour examiner votre situation.\n\n' +
      'Pour une première demande, l’école fournit le justificatif de préinscription. Le CNAPS étudie votre dossier et effectue l’enquête administrative relevant de sa compétence. L’autorisation accordée à ce stade donne accès à la formation. Le droit d’exercer fera l’objet d’une demande après la certification.',
  },
  {
    q: 'Intégrale Academy fait-elle la demande CNAPS à ma place ?',
    a: 'Vous déposez et suivez vous-même votre demande auprès du CNAPS. Intégrale Academy vous remet les éléments de préinscription nécessaires et vous explique quelles pièces réunir en fonction de votre situation. La décision appartient au CNAPS.\n\n' +
      'Conservez la référence de votre demande pour suivre son avancement. Dès réception de la décision, communiquez-la à l’équipe admissions pour vérifier l’activité mentionnée et sa période de validité avant le début de la session. Si vous disposez déjà d’une carte professionnelle, indiquez-le dès la préinscription.',
  },
  {
    q: 'Combien de temps dure la formation ?',
    a: 'La formation complète représente 328 heures de cours hors examen, soit environ neuf semaines en présentiel. Elle comprend 41 heures de socle commun aux métiers de la sécurité privée et 287 heures de spécialité consacrées à la protection physique des personnes. Les 92 heures et 50 minutes de pratique sont comprises dans ces 328 heures.\n\n' +
      'Le planning précise les différentes périodes de chaque session et la date d’examen. Pour organiser vos absences et vos déplacements, relevez toutes les périodes indiquées sur la session que vous choisissez.',
  },
  {
    q: 'Comment se déroule l’examen ?',
    a: 'La théorie est évaluée par des questions à choix unique (QCU) portant sur des situations professionnelles. Pour une unité évaluée par questionnaire, une note de 12/20 ou plus la valide. Entre 8/20 inclus et 12/20 exclu, une nouvelle présentation est possible. En dessous de 8/20, il faut suivre à nouveau le module concerné.\n\n' +
      'La partie pratique donne lieu à une appréciation « apte » ou « inapte ». Elle comprend la préparation et la réalisation d’une mission complète en formation. Vous présentez votre dossier au jury et répondez à ses questions sur votre travail et vos choix professionnels.',
  },
  {
    q: 'Le titre est-il découpé en blocs capitalisables ?',
    a: 'La certification A3P vise un métier réglementé et se valide dans son ensemble. La fiche RNCP38002 ne prévoit ni capitalisation de blocs de compétences indépendants ni équivalence de blocs avec une autre certification.\n\n' +
      'Les neuf unités de valeur organisent l’apprentissage et les épreuves du parcours. En cas d’ajournement à une unité, appuyez-vous sur votre relevé de résultats pour identifier l’épreuve à représenter ou le module à refaire. La délivrance du titre complet permet ensuite d’engager la demande de carte professionnelle A3P.',
    links: [
      { href: 'https://www.francecompetences.fr/recherche/rncp/38002/', label: 'Consulter la certification A3P' },
    ],
  },
  {
    q: 'Jusqu’à quand le RNCP38002 est-il enregistré ?',
    a: 'France compétences fixe au 20 septembre 2028 l’échéance d’enregistrement du TFP « Agent de protection physique des personnes » sous le numéro RNCP38002. La fiche officielle permet de vérifier le niveau 4, l’identité du certificateur, les modalités d’évaluation et les métiers visés.\n\n' +
      'Cette date concerne l’enregistrement de la certification. Pour votre calendrier personnel, distinguez-la de la date d’examen de votre session et de la date de validité figurant ensuite sur votre propre carte professionnelle délivrée par le CNAPS.',
    links: [
      { href: 'https://www.francecompetences.fr/recherche/rncp/38002/', label: 'Consulter la certification A3P' },
    ],
  },
  {
    q: 'Où se déroule la formation ?',
    a: 'Le parcours A3P se déroule en présentiel au centre Côte d’Azur d’Intégrale Academy, au 54 chemin du Carreou, 83480 Puget-sur-Argens, dans le Var. Vous y suivez les enseignements et retrouvez votre groupe pour les exercices encadrés.\n\n' +
      'Un stationnement gratuit est disponible sur le site. Avant de réserver vos trajets, relevez dans le planning les différentes périodes de cours et la date d’examen propres à votre session. Votre convocation précise les modalités de rendez-vous.',
  },
  {
    q: 'Peut-on être hébergé sur place ?',
    a: 'Oui, vous pouvez demander une place en dortoir collectif au centre de Puget-sur-Argens. Pour 2027, cet hébergement coûte 350 € TTC pour la totalité de la formation A3P. Les résidents disposent d’une cuisine équipée, d’une salle de bain avec douche, d’un lave-linge, d’un sèche-linge et d’espaces communs.\n\n' +
      'Les couchages sont proposés sur réservation, sous réserve de disponibilité. Indiquez la session A3P souhaitée au moment de votre demande et faites confirmer les périodes couvertes et les modalités d’arrivée avant d’organiser votre séjour.',
  },
  {
    q: 'La formation est-elle éligible au CPF ?',
    a: 'Le financement par le CPF dépend de l’offre publiée pour votre session. Sur Mon Compte Formation, recherchez « Agent de protection physique des personnes » et vérifiez le nom de l’organisme et les dates à Puget-sur-Argens. Le tarif de référence A3P pour 2027 est de 4 250 € TTC.\n\n' +
      'Votre espace personnel donne le montant de vos droits et le reste éventuel à régler. Si vous envisagez un complément, demandez au centre les références de la session ou son devis. Vous pourrez présenter à votre financeur le même parcours que celui sélectionné sur la plateforme.',
  },
  {
    q: 'France Travail peut-il financer la formation ?',
    a: 'Si vous êtes inscrit à France Travail, vous pouvez présenter un projet de formation A3P à votre conseiller. Une demande de prise en charge individuelle ou de complément peut être examinée selon votre situation, vos droits et la cohérence du parcours avec votre retour à l’emploi.\n\n' +
      'Avant la session, demandez le programme, les dates et un devis au centre. Décrivez le poste que vous visez et, si vous en avez, les pistes de recrutement repérées. France Travail examine ces éléments et décide du montant éventuellement accordé. Attendez sa réponse pour arrêter votre budget.',
  },
  {
    q: 'Peut-on payer la formation en plusieurs fois ?',
    a: 'Un paiement échelonné peut être étudié pour la part que vous financez personnellement. Le tarif de référence 2027 du parcours A3P est de 4 250 € TTC. Si vous avez un financement partiel, commencez par déterminer la somme qui restera à votre charge.\n\n' +
      'Indiquez au centre la session envisagée et le montant que vous devez financer. Avant de confirmer votre inscription, demandez une proposition écrite précisant les échéances, leurs dates et les modalités de règlement applicables à votre dossier.',
  },
  {
    q: 'Est-ce une formation armée ?',
    a: 'Le TFP A3P proposé à Puget-sur-Argens prépare aux missions de protection physique des personnes non armée. Le programme porte notamment sur le cadre juridique de la profession, la communication en équipe, la prévention des risques et la relation avec le client.\n\n' +
      'À l’issue du parcours, le titre vous permet de justifier votre aptitude pour demander la carte professionnelle correspondant à cette activité. Une activité armée relève d’un cadre distinct et de qualifications et d’autorisations spécifiques.',
  },
  {
    q: 'La formation est-elle physiquement difficile ?',
    a: 'Le parcours est intensif et demande de pouvoir participer régulièrement aux exercices pendant environ neuf semaines. Il comprend notamment du travail en équipe, des déplacements à pied, des mises en situation professionnelles et du secourisme. Le programme annonce 92 heures et 50 minutes de pratique sur les 328 heures de cours.\n\n' +
      'Si une limitation ou un handicap peut avoir une incidence sur votre participation, décrivez à l’école les exercices ou les déplacements qui vous posent difficulté avant l’inscription. L’équipe pourra étudier avec vous les aménagements possibles au regard des objectifs du parcours et de l’examen.',
  },
  {
    q: 'Le permis de conduire est-il obligatoire ?',
    a: 'Le permis B ne figure pas dans les conditions d’entrée de la certification RNCP38002. Vous pouvez donc prendre contact avec l’école pour présenter votre candidature si vous n’avez pas le permis. L’autorisation ou la carte professionnelle permettant l’entrée en formation et les conditions de français restent à vérifier.\n\n' +
      'Pour l’emploi, les exigences varient selon le poste. Un recruteur qui recherche un conducteur de sécurité peut demander le permis et une expérience de conduite. Regardez les annonces correspondant aux missions que vous souhaitez exercer pour anticiper ces critères.',
  },
  {
    q: 'Quel niveau de français est demandé ?',
    a: 'Le niveau attendu est B1 dans le cadre européen de référence pour les langues. Vous devez notamment pouvoir comprendre une consigne, échanger avec un client ou un collègue, expliquer oralement un événement et rédiger un compte rendu compréhensible.\n\n' +
      'Pour les ressortissants étrangers, y compris européens, le dossier individuel doit comporter un justificatif de français admis par la réglementation, par exemple le diplôme national du brevet ou une attestation de test recevable. Le seul test de positionnement de la branche ne suffit pas. Faites vérifier votre justificatif avant de vous inscrire à un nouveau test.',
  },
  {
    q: 'Quelles règles concernent les ressortissants étrangers ?',
    a: 'Les pièces à fournir au CNAPS dépendent de votre nationalité et de votre situation de séjour. Pour les personnes soumises à la condition de durée de séjour, il faut justifier d’au moins cinq ans de détention d’un titre, ainsi que du droit de travailler en France. L’équipe peut vous aider à identifier les pièces correspondant à votre statut avant le dépôt de votre demande.\n\n' +
      'La preuve d’un français de niveau B1 concerne aussi les ressortissants de l’Union européenne et de l’Espace économique européen. Préparez votre pièce d’identité et un diplôme ou une attestation recevable. La validation du dossier d’entrée appartient au CNAPS pour son autorisation.',
  },
  {
    q: 'Puis-je travailler à l’international après cette formation ?',
    a: 'Le TFP A3P est une certification française qui justifie l’aptitude professionnelle lors de votre demande de carte auprès du CNAPS. Il peut être présenté à un recruteur international pour attester votre formation en protection physique des personnes.\n\n' +
      'Avant toute mission dans un autre pays, renseignez-vous sur les conditions d’exercice auprès de l’autorité locale compétente et de l’employeur. Une reconnaissance du titre, une autorisation de travail ou une qualification locale peuvent être nécessaires. Les langues demandées et les conditions de déplacement dépendent également du poste.',
  },
  {
    q: 'La formation garantit-elle un emploi ?',
    a: 'Le TFP A3P atteste de votre niveau de qualification. Une fois la carte professionnelle correspondante obtenue, vous pouvez candidater à des postes d’agent de protection physique des personnes, notamment auprès d’entreprises de sécurité ou d’agences de protection rapprochée. Chaque employeur décide de son recrutement.\n\n' +
      'Pour préparer vos candidatures, précisez sur votre CV votre titre, les activités couvertes par votre carte, les langues que vous pratiquez et votre mobilité. Selon les postes, la disponibilité pour des déplacements, l’expérience en relation avec un client et les références professionnelles peuvent peser dans le choix du recruteur.',
  },
];
