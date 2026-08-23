export type BtsExamUnit = {
  title: string;
  coefficient: string;
  format: string;
};

export type BtsCompetencyBlock = {
  title: string;
  items: string[];
};

export type BtsExpandedCourse = {
  shortName: string;
  fullName: string;
  rncp: string;
  rncpUrl: string;
  summary: string;
  objective: string[];
  profile: string[];
  missions: string[];
  competencyBlocks: BtsCompetencyBlock[];
  examUnits: BtsExamUnit[];
  rhythm: string;
  examLocation: string;
  admission: string[];
  employers: string[];
  jobs: string[];
  furtherStudies: string[];
  specificPanel?: {
    title: string;
    body: string;
    items: string[];
  };
  campusEquipment?: {
    title: string;
    intro: string;
    items: string[];
  };
};

export type BtsExpandedCourseKey = 'mos' | 'mco' | 'ndrc' | 'ci' | 'pi';

export const btsExpandedCourses: Record<BtsExpandedCourseKey, BtsExpandedCourse> = {
  mos: {
    shortName: 'BTS MOS',
    fullName: 'BTS Management Opérationnel de la Sécurité',
    rncp: '41000',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/41000/',
    summary:
      'Le BTS MOS forme des professionnels capables de préparer une prestation de sécurité, manager les équipes, suivre la relation client et participer à la sécurité globale d’un site ou d’un événement.',
    objective: [
      'Conduire des activités dans une entreprise de sécurité-sûreté ou dans le service interne de sécurité d’une organisation privée ou publique.',
      'Organiser le service, participer à la gestion administrative et juridique du personnel et assurer le lien entre les agents, la hiérarchie, le client et les acteurs institutionnels.',
      'Réaliser un diagnostic de sécurité, choisir les moyens humains et techniques, construire un rétroplanning et piloter la qualité, la traçabilité et la protection des données.',
    ],
    profile: [
      'Être titulaire d’un baccalauréat général, technologique ou professionnel, ou d’un titre équivalent.',
      'S’intéresser aux métiers de la sécurité privée et publique.',
      'Avoir le sens du relationnel et du travail en équipe.',
      'Faire preuve de rigueur, d’organisation et d’autonomie.',
      'Être capable d’adopter une présentation et un comportement professionnels.',
      'Respecter la confidentialité, les procédures et le cadre légal.',
    ],
    missions: [
      'Réaliser un diagnostic de sécurité ou de sûreté.',
      'Identifier les moyens humains, techniques et technologiques nécessaires.',
      'Préparer une prestation conforme au cahier des charges du client.',
      'Établir le dossier de sécurité et le rétroplanning de démarrage.',
      'Organiser le service, affecter les agents et établir les plannings.',
      'Animer les réunions, transmettre les consignes et encadrer les équipes.',
      'Participer au recrutement, à l’intégration et au suivi du personnel.',
      'Prévenir les risques et préparer les commissions et exercices de sécurité.',
      'Gérer les incidents, accidents, événements et situations de crise.',
      'Préparer et argumenter une offre commerciale.',
      'Suivre la qualité, les coûts, les marges et les tableaux de bord.',
      'Rendre compte au client et à la hiérarchie et proposer des améliorations.',
    ],
    competencyBlocks: [
      {
        title: 'Préparation et mise en œuvre d’une prestation de sécurité',
        items: [
          'Veille réglementaire et technologique',
          'Diagnostic de sécurité et analyse des risques',
          'Identification et choix des moyens humains et techniques',
          'Achats liés à la prestation',
          'Dossier de sécurité, rétroplanning, qualité et traçabilité',
          'Protection et suivi des données',
        ],
      },
      {
        title: 'Management des ressources humaines',
        items: [
          'Organisation du service et affectation des personnels',
          'Élaboration et suivi des plannings',
          'Recrutement, intégration et contrats de travail',
          'Animation, accompagnement et évaluation des équipes',
          'Santé et sécurité au travail',
          'Dialogue social et gestion des conflits',
        ],
      },
      {
        title: 'Gestion de la relation client',
        items: [
          'Analyse du cahier des charges',
          'Préparation, chiffrage et argumentation de l’offre',
          'Suivi et contrôle de la prestation',
          'Gestion des prestataires extérieurs',
          'Suivi des coûts, marges et tableaux de bord',
          'Réunions client, comptes rendus et amélioration continue',
        ],
      },
      {
        title: 'Participation à la sécurité globale',
        items: [
          'Relations avec les partenaires institutionnels',
          'Commissions de sécurité et d’accessibilité',
          'Document unique et documents de sécurité',
          'Organisation d’exercices',
          'Gestion des contrôles, incidents et accidents',
          'Gestion d’événements et de crises',
        ],
      },
    ],
    examUnits: [
      { title: 'Culture générale et expression', coefficient: '4', format: 'Écrit / CCF selon statut' },
      { title: 'Langue vivante étrangère', coefficient: '4', format: 'Écrit et oral / CCF selon statut' },
      { title: 'Culture économique, juridique et managériale', coefficient: '6', format: 'Écrit / CCF selon statut' },
      { title: 'Préparation et mise en œuvre d’une prestation de sécurité', coefficient: '8', format: 'Oral ou CCF' },
      { title: 'Management des ressources humaines', coefficient: '5', format: 'Oral ou CCF' },
      { title: 'Gestion de la relation client', coefficient: '5', format: 'Oral ou CCF' },
      { title: 'Participation à la sécurité globale', coefficient: '6', format: 'Écrit / CCF selon statut' },
    ],
    rhythm: '15 jours par mois à l’école et 15 jours par mois en entreprise.',
    examLocation: 'Les épreuves finales nécessitant une convocation se déroulent en présentiel, selon les indications de l’académie.',
    admission: [
      'Étude du dossier et validation de la cohérence du projet professionnel.',
      'Contrat d’apprentissage en principe accessible jusqu’à 29 ans révolus, sous réserve des dérogations légales.',
      'Casier judiciaire compatible avec l’exercice d’une activité privée de sécurité.',
      'Pour l’alternance en sécurité privée, disposer de la carte professionnelle CNAPS demandée pour les missions concernées.',
    ],
    employers: [
      'Entreprises de sécurité privée',
      'Services internes de sécurité de grandes entreprises',
      'Grande distribution, sites industriels, touristiques ou tertiaires',
      'Administrations publiques, hôpitaux et collectivités locales',
      'Télésurveillance, vidéoprotection, transport de fonds ou protection rapprochée',
    ],
    jobs: [
      'Chef de secteur ou chef de site',
      'Chef d’équipe en télésurveillance ou vidéoprotection',
      'Assistant ou responsable d’exploitation',
      'Chargé d’affaires ou chargé de clientèle',
      'Coordinateur de sites',
      'Superviseur aéroportuaire',
      'Contrôleur de sites ou contrôleur qualité',
      'Manager opérationnel en protection rapprochée',
    ],
    furtherStudies: [
      'Licence professionnelle sécurité des personnes et des biens',
      'Licence ou parcours sécurité, sûreté et gestion des risques',
      'Master de droit public, parcours sécurité-défense après un cursus adapté',
      'Concours de la Police nationale, Gendarmerie, SDIS, Police municipale, administration pénitentiaire ou Armée',
    ],
    specificPanel: {
      title: 'Carte professionnelle CNAPS et formation APS',
      body:
        'La carte professionnelle « surveillance humaine et gardiennage » est déterminante pour effectuer les missions d’alternance dans une entreprise de sécurité privée. Si vous ne la possédez pas encore, Intégrale Academy peut vous orienter vers la formation APS nécessaire.',
      items: [
        'Vérification de votre situation avec l’équipe admissions',
        'Orientation vers la prochaine session APS adaptée',
        'Information sur les démarches CNAPS et les délais à anticiper',
      ],
    },
    campusEquipment: {
      title: 'Un environnement d’entraînement pensé pour la sécurité',
      intro:
        'Le campus de Puget-sur-Argens dispose d’équipements permettant de travailler des situations concrètes de sécurité, de sûreté, d’incendie et de secourisme.',
      items: [
        'Salle de pratique avec tapis, sacs de frappe, boucliers et protections',
        'Matériel incendie : RIA, extincteurs, désenfumage, détecteurs et générateurs de fumée ou de flammes',
        'Matériel de secourisme : mannequins, défibrillateur de formation et équipements de premiers secours',
        'Matériel de sécurité privée : détecteurs de métaux, radios et matériels pédagogiques',
        'Poste central de sécurité fonctionnel : CMSI, vidéosurveillance, contrôle des rondes, alarme intrusion et registre de sécurité',
      ],
    },
  },
  mco: {
    shortName: 'BTS MCO',
    fullName: 'BTS Management Commercial Opérationnel',
    rncp: '38362',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/38362/',
    summary:
      'Le BTS MCO prépare à prendre la responsabilité opérationnelle de tout ou partie d’une unité commerciale physique ou digitale : relation client, offre, gestion et management.',
    objective: [
      'Prendre en charge la relation client dans sa globalité, de l’accueil au suivi et à la fidélisation.',
      'Animer et dynamiser l’offre de produits ou de services, en magasin comme sur les canaux digitaux.',
      'Piloter la gestion opérationnelle et manager l’équipe commerciale pour atteindre les objectifs de l’unité.',
    ],
    profile: [
      'Être titulaire d’un baccalauréat ou d’un titre équivalent.',
      'Aimer le commerce, le contact client et le conseil.',
      'Avoir le goût du challenge et du travail en équipe.',
      'S’intéresser au management, au marketing et à la communication.',
      'Savoir s’organiser, prendre des initiatives et gagner en autonomie.',
      'Être à l’aise avec les outils numériques et la vente omnicanale.',
    ],
    missions: [
      'Mettre en place des promotions et des actions de fidélisation.',
      'Créer et exploiter des enquêtes de satisfaction.',
      'Agencer les rayons, les zones de vente et les parcours clients.',
      'Conseiller, vendre et développer la vente additionnelle.',
      'Suivre les stocks, les approvisionnements, les livraisons et les règlements.',
      'Piloter les tableaux de bord et analyser les performances.',
      'Prospecter de nouveaux fournisseurs et partenaires commerciaux.',
      'Organiser le travail et accompagner l’équipe commerciale.',
      'Participer au recrutement et à l’intégration des collaborateurs.',
      'Gérer et améliorer le service après-vente.',
    ],
    competencyBlocks: [
      {
        title: 'Développement de la relation client et vente conseil',
        items: [
          'Veille et exploitation de l’information commerciale',
          'Études commerciales',
          'Vente conseil dans un contexte omnicanal',
          'Suivi de la qualité de service',
          'Fidélisation et développement de la clientèle',
        ],
      },
      {
        title: 'Animation et dynamisation de l’offre commerciale',
        items: [
          'Élaboration et adaptation de l’offre',
          'Agencement et maintien d’un espace commercial attractif',
          'Mise en valeur des produits et services',
          'Promotions et animations commerciales',
          'Communication interne et externe de l’unité commerciale',
          'Analyse et suivi de l’action commerciale',
        ],
      },
      {
        title: 'Gestion opérationnelle',
        items: [
          'Fixation des objectifs commerciaux',
          'Approvisionnements, achats et stocks',
          'Suivi des règlements et élaboration des budgets',
          'Gestion des risques et décisions d’investissement',
          'Analyse des performances et reporting',
        ],
      },
      {
        title: 'Management de l’équipe commerciale',
        items: [
          'Évaluation des besoins en personnel',
          'Répartition des tâches et réalisation des plannings',
          'Organisation du travail',
          'Recrutement et intégration',
          'Animation, valorisation et formation de l’équipe',
          'Évaluation des performances individuelles et collectives',
        ],
      },
    ],
    examUnits: [
      { title: 'Culture générale et expression', coefficient: '3', format: 'Écrit / CCF selon statut' },
      { title: 'Communication en langue vivante étrangère', coefficient: '3', format: 'Écrit et oral / CCF' },
      { title: 'Culture économique, juridique et managériale', coefficient: '3', format: 'Écrit / CCF selon statut' },
      { title: 'Développement de la relation client et vente conseil', coefficient: '3', format: 'Oral ou CCF' },
      { title: 'Animation et dynamisation de l’offre commerciale', coefficient: '3', format: 'Oral ou CCF' },
      { title: 'Gestion opérationnelle', coefficient: '3', format: 'Écrit' },
      { title: 'Management de l’équipe commerciale', coefficient: '3', format: 'Écrit ou CCF' },
    ],
    rhythm: '2 jours par semaine à l’école et 3 jours par semaine en entreprise.',
    examLocation: 'Les épreuves ponctuelles sont organisées en présentiel dans le centre indiqué sur la convocation académique.',
    admission: [
      'Étude du dossier et validation du projet d’alternance.',
      'Intérêt pour le commerce, le management et les environnements digitaux.',
      'Capacité à communiquer à l’oral et à l’écrit dans un contexte professionnel.',
    ],
    employers: [
      'Grandes enseignes et commerces de proximité',
      'Entreprises de distribution alimentaire ou spécialisée',
      'Unités commerciales d’entreprises de production',
      'E-commerce, commerce omnicanal et services',
      'PME, TPE et réseaux commerciaux',
    ],
    jobs: [
      'Conseiller de vente et de services',
      'Vendeur-conseil ou conseiller e-commerce',
      'Chargé de clientèle ou du service client',
      'Marchandiseur',
      'Manager adjoint ou second de rayon',
      'Manager d’une unité commerciale de proximité',
      'Avec expérience : chef des ventes, chef de rayon, responsable e-commerce ou responsable de secteur',
    ],
    furtherStudies: [
      'Licence générale en économie, gestion ou administration économique et sociale',
      'Licence professionnelle commerce et distribution, management ou gestion commerciale',
      'Bachelor marketing et commercial, banque, management, distribution, tourisme ou e-commerce',
      'École de commerce par admission parallèle selon les conditions de l’établissement',
    ],
  },
  ndrc: {
    shortName: 'BTS NDRC',
    fullName: 'BTS Négociation et Digitalisation de la Relation Client',
    rncp: '38368',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/38368/',
    summary:
      'Le BTS NDRC forme des commerciaux généralistes capables de prospecter, négocier, vendre, fidéliser et animer la relation client sur tous les canaux, en face-à-face comme à distance.',
    objective: [
      'Mettre en œuvre une stratégie commerciale et marketing pour créer une relation de proximité avec le client.',
      'Accompagner le client avant, pendant et après l’achat dans une logique omnicanale.',
      'Développer le e-commerce, animer la relation digitale et piloter des réseaux de distributeurs, de partenaires ou de vente directe.',
    ],
    profile: [
      'Être titulaire d’un baccalauréat ou d’un titre équivalent.',
      'Être à l’aise pour parler, argumenter et créer du lien.',
      'Aimer le challenge, la prospection et la négociation.',
      'S’intéresser aux réseaux sociaux, au e-commerce et aux outils numériques.',
      'Être organisé, dynamique, persévérant et adaptable.',
      'Aimer travailler en équipe et animer un réseau.',
    ],
    missions: [
      'Cibler les prospects et réaliser des campagnes de prospection.',
      'Prendre des rendez-vous et conduire des entretiens de vente.',
      'Conseiller, argumenter, négocier et conclure.',
      'Suivre les ventes et les accords commerciaux.',
      'Analyser le potentiel, la rentabilité et le risque des clients.',
      'Concevoir des actions de fidélisation ou de reconquête.',
      'Organiser et animer des événements commerciaux.',
      'Gérer la relation client à distance et la e-relation.',
      'Développer la vente en e-commerce.',
      'Animer des distributeurs, partenaires ou vendeurs directs.',
    ],
    competencyBlocks: [
      {
        title: 'Relation client et négociation-vente',
        items: [
          'Développement et prospection de clientèle',
          'Négociation, vente et valorisation de la relation client',
          'Animation de la relation client',
          'Veille et expertise commerciales',
          'Organisation d’événements commerciaux',
          'Exploitation et mutualisation de l’information commerciale',
        ],
      },
      {
        title: 'Relation client à distance et digitalisation',
        items: [
          'Gestion de la relation client à distance',
          'Gestion de la e-relation',
          'Gestion de la vente en e-commerce',
          'Maîtrise de la relation omnicanale',
          'Animation de la relation client digitale',
          'Développement de la relation client en e-commerce',
        ],
      },
      {
        title: 'Relation client et animation de réseaux',
        items: [
          'Implantation et promotion de l’offre chez des distributeurs',
          'Développement et animation d’un réseau de partenaires',
          'Création et animation d’un réseau de vente directe',
          'Suivi des performances et accompagnement du réseau',
        ],
      },
    ],
    examUnits: [
      { title: 'Culture générale et expression', coefficient: '3', format: 'Écrit / CCF selon statut' },
      { title: 'Langue vivante étrangère', coefficient: '3', format: 'Oral / CCF selon statut' },
      { title: 'Culture économique, juridique et managériale', coefficient: '3', format: 'Écrit / CCF selon statut' },
      { title: 'Relation client et négociation-vente', coefficient: '5', format: 'Oral ou CCF' },
      { title: 'Relation client à distance et digitalisation', coefficient: '4', format: 'Écrit et pratique' },
      { title: 'Relation client et animation de réseaux', coefficient: '3', format: 'Oral ou CCF' },
    ],
    rhythm: '2 jours par semaine à l’école et 3 jours par semaine en entreprise.',
    examLocation: 'Les épreuves ponctuelles sont organisées en présentiel dans le centre indiqué sur la convocation académique.',
    admission: [
      'Étude du dossier et validation du projet d’alternance.',
      'Goût du contact, de la négociation et de la communication.',
      'Intérêt marqué pour les outils digitaux et les nouvelles formes de relation client.',
    ],
    employers: [
      'Toute entreprise ou organisation qui met en œuvre une démarche commerciale',
      'Commerce BtoB, BtoC ou BtoG',
      'Services, industrie, artisanat, associations et secteur public',
      'Plateformes de relation client et centres de contacts',
      'E-commerce, vente directe et réseaux de partenaires',
    ],
    jobs: [
      'Commercial terrain ou représentant',
      'Conseiller commercial ou chargé de clientèle',
      'Négociateur ou technico-commercial',
      'Téléconseiller ou conseiller client à distance',
      'Commercial ou animateur e-commerce',
      'Marchandiseur ou chef de secteur',
      'Animateur de réseau ou des ventes',
      'Avec expérience : responsable e-commerce, manager d’équipe ou responsable de secteur',
    ],
    furtherStudies: [
      'Licence générale en économie, gestion ou administration économique et sociale',
      'Licence professionnelle e-commerce, commerce, marketing ou import-export',
      'Bachelor immobilier, webmarketing, communication digitale ou management',
      'École de commerce par admission parallèle selon les conditions de l’établissement',
    ],
  },
  ci: {
    shortName: 'BTS CI',
    fullName: 'BTS Commerce International',
    rncp: '41759',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/41759/',
    summary:
      'Le BTS Commerce International forme des professionnels capables de gérer la relation commerciale interculturelle, les opérations import-export et le développement commercial sur les marchés étrangers.',
    objective: [
      'Participer durablement au développement international d’une entreprise par la vente, les achats et la prospection.',
      'Assurer l’exécution et le suivi des contrats internationaux, de l’offre au paiement, en coordonnant clients, fournisseurs, services internes et prestataires.',
      'Analyser les marchés étrangers, assurer une veille, évaluer les risques et proposer des solutions adaptées dans un contexte multilingue et numérique.',
    ],
    profile: [
      'Être titulaire d’un baccalauréat ou d’un titre équivalent.',
      'Aimer les langues étrangères et les environnements interculturels.',
      'Faire preuve de curiosité, d’ouverture d’esprit et d’adaptabilité.',
      'Être à l’aise à l’oral comme à l’écrit.',
      'Avoir une fibre commerciale et le goût du challenge.',
      'Être dynamique, réactif et capable de travailler en équipe.',
    ],
    missions: [
      'Exploiter les données clients et fournisseurs.',
      'Gérer la relation commerciale internationale.',
      'Communiquer en français et en anglais dans des contextes interculturels.',
      'Coordonner les services et animer un réseau professionnel.',
      'Organiser, contrôler et suivre un contrat international.',
      'Mesurer les risques et gérer leur couverture, les sinistres et les litiges.',
      'Contrôler les processus et la chaîne documentaire import-export.',
      'Évaluer les prestataires et les offres fournisseurs.',
      'Concevoir et analyser des tableaux de bord.',
      'Réaliser une veille et analyser un marché cible.',
      'Contribuer à l’adaptation de l’offre et à la prospection commerciale.',
    ],
    competencyBlocks: [
      {
        title: 'Développement de la relation commerciale dans un environnement interculturel',
        items: [
          'Collecte, analyse et exploitation des données clients et fournisseurs',
          'Communication professionnelle en français et en anglais',
          'Suivi et pérennisation de la relation commerciale',
          'Coordination avec les services de l’organisation',
          'Proposition de solutions adaptées',
          'Animation d’un réseau professionnel en France et à l’étranger',
        ],
      },
      {
        title: 'Mise en œuvre des opérations internationales',
        items: [
          'Organisation et suivi d’un contrat international',
          'Évaluation des conséquences des choix opérés',
          'Gestion des risques, couvertures, sinistres et litiges',
          'Contrôle des processus et de la chaîne documentaire',
          'Évaluation des prestataires de services',
          'Tableaux de bord et amélioration des opérations',
        ],
      },
      {
        title: 'Participation au développement commercial international',
        items: [
          'Veille sur l’environnement global de l’entreprise',
          'Analyse et synthèse d’informations sur un marché cible',
          'Identification des modalités de déploiement',
          'Adaptation de l’offre au marché visé',
          'Prospection commerciale internationale',
        ],
      },
    ],
    examUnits: [
      { title: 'Culture générale et expression', coefficient: '3', format: 'Écrit / CCF selon statut' },
      { title: 'Langue vivante étrangère 2', coefficient: '3', format: 'Écrit et oral / CCF' },
      { title: 'Culture économique, juridique et managériale', coefficient: '3', format: 'Écrit / CCF selon statut' },
      { title: 'Relation commerciale interculturelle en anglais et en français', coefficient: '7', format: 'Écrit et oral / CCF' },
      { title: 'Mise en œuvre des opérations internationales', coefficient: '5', format: 'Écrit' },
      { title: 'Développement commercial international', coefficient: '4', format: 'Oral ou CCF' },
    ],
    rhythm: '2 jours par semaine à l’école et 3 jours par semaine en entreprise.',
    examLocation: 'Les épreuves ponctuelles sont organisées en présentiel dans le centre indiqué sur la convocation académique.',
    admission: [
      'Étude du dossier et validation du projet d’alternance.',
      'Intérêt pour l’anglais et une seconde langue vivante.',
      'Ouverture internationale, aisance rédactionnelle et relationnelle.',
    ],
    employers: [
      'PME et grandes entreprises industrielles ou commerciales',
      'Entreprises de prestations de services à l’international',
      'Services import-export, achats, ADV export et logistique',
      'Transitaires, transport international et représentation en douane',
      'Entreprises travaillant avec des clients, fournisseurs ou partenaires étrangers',
    ],
    jobs: [
      'Assistant export ou import',
      'Assistant import-export',
      'Assistant administration des ventes export',
      'Gestionnaire import-export',
      'Agent de transit ou d’exploitation',
      'Assistant référent douane',
      'Assistant commerce international',
      'Avec expérience : responsable ADV export, responsable de zone export, acheteur international ou commercial export',
    ],
    furtherStudies: [
      'Licence générale en économie, gestion ou administration économique et sociale',
      'Licence professionnelle commerce et distribution ou commercialisation de produits et services',
      'Licence professionnelle e-commerce, marketing numérique, technico-commercial ou management',
      'Bachelor marketing, commerce international, logistique, achats ou management',
    ],
  },
  pi: {
    shortName: 'BTS PI',
    fullName: 'BTS Professions Immobilières',
    rncp: '38380',
    rncpUrl: 'https://www.francecompetences.fr/recherche/rncp/38380/',
    summary:
      'Le BTS Professions Immobilières prépare aux activités de vente, de location, de gestion locative, de copropriété et de conseil sur le bâti dans un secteur fortement réglementé.',
    objective: [
      'Accompagner vendeurs, acquéreurs, bailleurs, locataires et copropriétaires tout au long de leur projet immobilier.',
      'Gérer les dimensions commerciales, juridiques, administratives, financières, comptables et techniques des opérations.',
      'Conseiller les clients sur le patrimoine, les travaux, les risques, le changement climatique, l’urbanisme et la valorisation du bien.',
    ],
    profile: [
      'Être titulaire d’un baccalauréat ou d’un titre équivalent.',
      'Avoir un bon relationnel et une expression orale et écrite soignée.',
      'Aimer la vente, la négociation, le conseil et les défis.',
      'Faire preuve de rigueur, d’organisation et de patience.',
      'S’intéresser au droit, à l’économie, à la finance et au bâti.',
      'Être capable de travailler en équipe et de construire une relation de confiance.',
    ],
    missions: [
      'Prospecter par téléphone, sur le terrain et par les canaux digitaux.',
      'Développer le portefeuille de l’agence et prendre des mandats.',
      'Estimer, mettre en valeur et commercialiser un bien.',
      'Conseiller le vendeur, l’acquéreur, le bailleur et le locataire.',
      'Constituer les dossiers et négocier dans l’intérêt des parties.',
      'Assurer le suivi administratif, juridique, financier et comptable d’une location.',
      'Préparer, conduire et suivre une assemblée générale de copropriété.',
      'Suivre les budgets, les travaux, les risques, les sinistres et les contentieux.',
      'Concevoir des supports de communication, vitrines et opérations commerciales.',
      'Informer le client sur l’urbanisme, le bâti et les enjeux climatiques.',
    ],
    competencyBlocks: [
      {
        title: 'Conduite du projet immobilier du client en vente et/ou location',
        items: [
          'Prospection et négociation du mandat',
          'Commercialisation du bien',
          'Accompagnement du vendeur, de l’acquéreur, du bailleur et du locataire',
          'Constitution des dossiers et transmission au notaire',
          'Suivi administratif, juridique, financier et comptable de la location',
          'Communication et exploitation de la base clients',
        ],
      },
      {
        title: 'Administration des copropriétés et de l’habitat social',
        items: [
          'Conclusion et suivi du contrat de syndic',
          'Préparation, conduite et suivi des assemblées générales',
          'Gestion administrative, comptable et financière',
          'Gestion du personnel de la copropriété',
          'Prévention et traitement des conflits et contentieux',
          'Accompagnement du parcours résidentiel en logement social',
        ],
      },
      {
        title: 'Conseil en gestion du bâti dans le contexte de changement climatique',
        items: [
          'Information sur les contraintes techniques et réglementaires',
          'Analyse du bien au regard des enjeux climatiques',
          'Accompagnement des travaux, rénovations et réhabilitations',
          'Prévention des risques et gestion des sinistres',
          'Urbanisme, aménagement du territoire et contraintes architecturales',
          'Accompagnement d’une vente en l’état futur d’achèvement',
        ],
      },
      {
        title: 'Construction d’une professionnalité dans l’immobilier',
        items: [
          'Analyse du territoire et développement de l’entreprise immobilière',
          'Démarche entrepreneuriale',
          'Dynamisation de la relation client',
          'Communication externe accessible',
          'Identité professionnelle et numérique',
          'Construction du projet professionnel',
        ],
      },
    ],
    examUnits: [
      { title: 'Culture générale et expression', coefficient: '4', format: 'Écrit / CCF selon statut' },
      { title: 'Anglais : compréhension et expression écrites', coefficient: '2', format: 'Écrit / CCF' },
      { title: 'Anglais : production orale et interaction', coefficient: '2', format: 'Oral / CCF' },
      { title: 'Environnement juridique et économique des activités immobilières', coefficient: '4', format: 'Écrit ou CCF' },
      { title: 'Conduite du projet immobilier du client en vente et/ou location', coefficient: '6', format: 'Écrit' },
      { title: 'Administration des copropriétés et de l’habitat social', coefficient: '6', format: 'Écrit' },
      { title: 'Conseil en gestion du bâti et changement climatique', coefficient: '3', format: 'Écrit ou CCF' },
      { title: 'Construction d’une professionnalité dans l’immobilier', coefficient: '3', format: 'Oral ou CCF' },
    ],
    rhythm: '2 jours par semaine à l’école et 3 jours par semaine en entreprise.',
    examLocation: 'Les épreuves ponctuelles sont organisées en présentiel dans le centre indiqué sur la convocation académique.',
    admission: [
      'Étude du dossier et validation du projet d’alternance.',
      'Intérêt pour les métiers de la transaction, de la location et de la copropriété.',
      'Présentation professionnelle, rigueur et capacité à communiquer avec des publics variés.',
    ],
    employers: [
      'Agences immobilières et réseaux de mandataires',
      'Cabinets d’administration de biens et syndics de copropriété',
      'Bailleurs sociaux et organismes HLM',
      'Promoteurs, constructeurs et gestionnaires de patrimoine',
      'Études notariales, banques, assurances et acteurs du diagnostic immobilier',
    ],
    jobs: [
      'Négociateur ou conseiller immobilier',
      'Conseiller location',
      'Gestionnaire locatif',
      'Assistant de copropriété',
      'Gestionnaire de copropriété junior',
      'Assistant transaction ou gestion',
      'Évolution possible vers des responsabilités d’agence ou de portefeuille',
    ],
    furtherStudies: [
      'Licence professionnelle métiers de l’immobilier : transaction et commercialisation',
      'Licence professionnelle gestion et administration de biens',
      'Licence professionnelle gestion et développement de patrimoine immobilier',
      'Bachelor immobilier, gestion de patrimoine, finance ou marketing',
      'Parcours responsable de programmes immobiliers',
    ],
    specificPanel: {
      title: 'Carte professionnelle immobilière',
      body:
        'Le BTS Professions Immobilières remplit la condition de diplôme permettant de justifier l’aptitude professionnelle pour demander la carte professionnelle prévue par la loi Hoguet. Les autres conditions réglementaires restent applicables.',
      items: [
        'Activités de transaction sur immeubles et fonds de commerce',
        'Activités de gestion immobilière',
        'Démarches à effectuer auprès de la CCI compétente après le diplôme',
      ],
    },
  },
};
