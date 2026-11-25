export const despInitialAdminData = {
  rncpCode: 'RNCP40385',
  level: 'niveau 5, correspondant à un niveau bac +2',
  duration: { total: '245 heures', remote: '175 heures à distance', inPerson: '70 heures en présentiel' },
  priceLabel: '4 350 € TTC',
  cpfEligibleWhenActive: true,
  handicapReferent: { name: 'Référent handicap à confirmer', email: 'handicap@integraleacademy.com', phone: '04 22 47 07 68' },
};

export const despFinancingCards = [
  ['CPF', 'Mobilisable lorsque l’offre active publiée est éligible et que vos droits disponibles couvrent tout ou partie du parcours.'],
  ['France Travail', 'Un financement peut être étudié après échange et accord de votre conseiller, selon votre projet et les règles applicables à votre dossier.'],
  ['Employeur ou OPCO', 'Pour les salariés ou projets portés par une entreprise, une demande de prise en charge peut être préparée auprès de l’employeur ou de l’OPCO.'],
  ['Financement personnel', 'Le candidat peut financer directement son parcours lorsque les autres dispositifs ne sont pas mobilisables ou seulement partiellement.'],
  ['Paiement échelonné', 'Des facilités de paiement peuvent être étudiées selon les solutions réellement proposées au moment de l’inscription.'],
];

export const despEnrollmentSteps = [
  'Entretien avec un conseiller',
  'Vérification des prérequis',
  'Étude du projet de création, reprise ou évolution',
  'Validation du financement',
  'Confirmation de l’inscription et accès à la plateforme',
];

export const despOutcomes = [
  'dirigeant d’entreprise de sécurité privée',
  'associé d’une entreprise de sécurité',
  'créateur ou repreneur',
  'directeur d’agence',
  'directeur adjoint',
  'responsable d’exploitation',
  'responsable sécurité',
  'directeur d’un service interne de sécurité privée',
];

export const despActivities = [
  'surveillance humaine et gardiennage',
  'surveillance électronique et télésurveillance',
  'vidéoprotection',
  'protection physique des personnes',
  'transport de fonds',
  'sûreté aéroportuaire',
  'protection des navires',
  'activités armées lorsqu’elles sont spécifiquement autorisées',
];

export const despInitialFaq = [
  {
    q: 'Que signifie DESP ?',
    a: 'DESP signifie « Dirigeant d’entreprise de sécurité privée ». Le titre prépare à prendre les décisions qui relèvent de la direction d’une société de sécurité, que vous souhaitiez la créer, la reprendre ou prendre des responsabilités en agence.\n\n' +
      'Le parcours relie cinq aspects du métier. Vous cadrez un projet d’entreprise, étudiez la réglementation du secteur, pilotez les finances et l’administration, développez l’activité commerciale et organisez le travail des équipes. Un prévisionnel ou une réponse à un appel d’offres font partie des situations concrètes étudiées.',
  },
  {
    q: 'Quel est le niveau du diplôme ?',
    a: 'Le DESP est un titre professionnel de niveau 5, correspondant au niveau de qualification bac +2. Il est enregistré au Répertoire national des certifications professionnelles sous le numéro RNCP40385. Le certificateur indiqué sur la fiche officielle est Scotia Formation.\n\n' +
      'Le niveau 5 correspond aux compétences évaluées en fin de parcours. Pour savoir si vous pouvez entrer en formation, l’équipe examine séparément votre niveau d’études ou vos responsabilités antérieures. Vous pouvez ainsi préparer le titre après une première expérience d’encadrement selon l’étude de votre candidature.',
    links: [
      { href: 'https://www.francecompetences.fr/recherche/rncp/40385/', label: 'Consulter la certification DESP' },
    ],
  },
  {
    q: 'Combien de temps dure la formation ?',
    a: 'Le parcours compte 245 heures sur sept semaines de formation. Les cinq semaines à distance représentent 175 heures. Elles sont suivies de deux semaines, soit 70 heures, dans le centre choisi pour la session.\n\n' +
      'À distance, vous suivez les cours, réalisez des études de cas et préparez votre projet d’entreprise. Le présentiel sert notamment aux exercices collectifs, à la gestion financière et commerciale et aux entraînements aux soutenances. Consultez les dates de début, de présence et d’examen dans le planning avant d’organiser votre disponibilité.',
  },
  {
    q: 'Faut-il obligatoirement avoir trois ans d’expérience ?',
    a: 'Trois années d’expérience ne sont pas exigées de tous les candidats au DESP initial. Pour un candidat majeur maîtrisant le français à l’oral et à l’écrit, le certificateur examine plusieurs voies d’accès, dont le niveau bac ou équivalent, le SSIAP 3, un poste à responsabilités ou un avis favorable à l’entretien préalable.\n\n' +
      'Si vous candidatez grâce à votre expérience, décrivez ce que vous avez personnellement encadré. Un chef d’équipe peut expliquer les effectifs suivis et les décisions prises. L’équipe vérifiera avec vous les autres conditions d’admission, notamment celles applicables à votre situation pour exercer dans ce secteur réglementé.',
  },
  {
    q: 'Le diplôme donne-t-il automatiquement l’agrément CNAPS ?',
    a: 'L’obtention du DESP permet de justifier de votre aptitude professionnelle pour une demande d’agrément dirigeant. Le Conseil national des activités privées de sécurité (CNAPS) délivre cet agrément personnel après avoir examiné votre dossier et les autres conditions réglementaires.\n\n' +
      'Après l’obtention du titre, préparez votre justificatif de qualification et les pièces indiquées par le CNAPS pour votre situation. Si vous créez une entreprise, prévoyez également sa demande d’autorisation d’exercice. Les deux démarches peuvent vous concerner au démarrage de votre activité.',
  },
  {
    q: 'Combien de temps l’agrément est-il valable ?',
    a: 'L’agrément dirigeant délivré par le CNAPS est valable cinq ans. La demande de renouvellement doit être déposée au moins trois mois avant la date d’expiration indiquée sur votre agrément.\n\n' +
      'Vous pouvez préparer cette démarche depuis votre espace personnel Dracar Ultimate. Le CNAPS propose aussi un formulaire de renouvellement. Reportez dès la délivrance la date d’expiration dans votre calendrier et vérifiez les pièces demandées au moment de déposer votre dossier.',
  },
  {
    q: 'Quelle différence entre l’agrément et l’autorisation d’exercice ?',
    a: 'L’agrément est délivré à la personne qui dirige l’entreprise. L’autorisation d’exercice est délivrée à l’entreprise pour l’établissement où elle exerce l’activité de sécurité privée. La création d’une société vous amène donc à vérifier ces deux conditions auprès du CNAPS.\n\n' +
      'Par exemple, un dirigeant déjà agréé qui lance une nouvelle société doit préparer l’autorisation de cette société. Si l’entreprise ouvre ensuite un établissement secondaire où elle exerce une activité de sécurité privée, une autorisation distincte est prévue pour cet établissement.',
    links: [
      { href: 'https://cnaps.interieur.gouv.fr/FAQ/Dirigeants-et-entreprises', label: 'Consulter la FAQ du CNAPS pour les dirigeants' },
    ],
  },
  {
    q: 'Puis-je travailler comme agent avec uniquement le DESP ?',
    a: 'Pour effectuer personnellement des missions d’agent, vous devez détenir la carte professionnelle du CNAPS correspondant à l’activité exercée. Le DESP atteste de compétences de direction et sert au dossier d’agrément du dirigeant.\n\n' +
      'Par exemple, si vous souhaitez diriger votre société et assurer aussi des vacations de surveillance pour un client, vérifiez la mention et la validité de votre propre carte professionnelle. Les autorisations délivrées à la société et à son dirigeant répondent chacune à un autre besoin.',
  },
  {
    q: 'Puis-je créer immédiatement ma société après le diplôme ?',
    a: 'Vous pouvez préparer votre projet de création et vos formalités de société. Pour commencer à assurer des prestations de sécurité privée, il faut également que le dirigeant dispose de son agrément et que l’entreprise obtienne du CNAPS l’autorisation d’exercice correspondant à son établissement et à son activité.\n\n' +
      'Prévoyez dans votre calendrier des étapes distinctes pour la constitution de la société, le dépôt des demandes et le démarrage des prestations. Lorsque vous échangez avec un premier client, tenez compte de ces décisions pour fixer la date de début de la mission.',
  },
  {
    q: 'La formation est-elle entièrement à distance ?',
    a: 'Le DESP initial associe 175 heures de cours à distance et 70 heures de présence obligatoire en centre. La partie en ligne permet de travailler les notions réglementaires, les études de cas et la préparation du projet professionnel depuis votre lieu de résidence.\n\n' +
      'Réservez ensuite les deux semaines de présentiel dans le centre de la session. Elles permettent de mettre votre projet à l’épreuve en groupe et de vous entraîner aux évaluations et aux soutenances. La fiche de session indique aussi la date d’examen à prendre en compte pour votre déplacement.',
  },
  {
    q: 'Peut-on suivre la formation à Paris ou Puget-sur-Argens ?',
    a: 'Les sessions de DESP initial sont proposées à Paris ou à Puget-sur-Argens selon le planning. Le centre parisien est situé au 34 rue Poissonnière, 75002 Paris, à 50 mètres du Grand Rex. Le centre de la Côte d’Azur se trouve au 54 chemin du Carreou, 83480 Puget-sur-Argens.\n\n' +
      'Dans le planning, choisissez le lieu puis consultez le détail de la session. Vous pourrez distinguer les semaines à distance des jours à passer sur place et repérer l’examen avant de réserver vos transports ou un hébergement.',
  },
  {
    q: 'La formation garantit-elle la réussite de l’entreprise ?',
    a: 'La formation vous donne des outils pour éprouver votre projet. Vous travaillez notamment sur le marché visé, les coûts de personnel, le prévisionnel financier, l’organisation des équipes et la manière de présenter une offre commerciale.\n\n' +
      'Ces exercices permettent par exemple de voir si le prix d’une prestation couvre les moyens que vous prévoyez d’y consacrer. La réussite de l’entreprise dépend ensuite de vos décisions, de la demande et des contrats effectivement obtenus. L’obtention du DESP atteste des compétences évaluées pendant le parcours.',
  },
  {
    q: 'La VAE est-elle proposée ?',
    a: 'Oui. La validation des acquis de l’expérience (VAE) permet de viser le même titre si vous avez déjà exercé des responsabilités en rapport avec les cinq activités du DESP. Vous constituez alors un dossier sur les missions réellement menées et vous l’expliquez devant un jury.\n\n' +
      'Pour choisir, regardez ce que vous pouvez déjà démontrer. Si vous avez géré une équipe et un budget, quelles preuves avez-vous aussi de vos décisions commerciales, de la conformité et du projet d’entreprise ? L’étude de votre parcours permet d’identifier les compétences à faire reconnaître ou à acquérir en formation initiale.',
  },
  {
    q: 'Comment s’inscrire ?',
    a: 'Remplissez le formulaire de demande d’informations en précisant « DESP initial », votre projet et, si vous le savez, la session de Paris ou de Puget-sur-Argens qui vous intéresse. Un premier entretien permet d’examiner votre candidature et vos possibilités de financement.\n\n' +
      'Préparez votre CV, les diplômes ou l’expérience qui appuient votre candidature, ainsi que vos disponibilités pour les 175 heures à distance et les 70 heures en centre. Après vérification des prérequis et du financement, l’école confirme l’inscription et vous communique les modalités d’accès à la plateforme.',
  },
  {
    q: 'Où se déroulent les formations ?',
    a: 'Les cinq premières semaines du DESP initial se déroulent à distance. Les deux semaines de formation en centre ont lieu à Paris ou à Puget-sur-Argens, selon la session. Les journées consacrées aux exercices et aux soutenances imposent donc d’être disponible pour le déplacement.\n\n' +
      'Le planning est le meilleur point de repère si plusieurs dates s’offrent à vous. Ouvrez la session souhaitée et comparez le lieu, les dates de présence et le jour de l’examen avec vos contraintes personnelles ou professionnelles.',
  },
  {
    q: 'Comment sont validés les prérequis ?',
    a: 'L’équipe étudie les conditions prévues par le certificateur, dont la majorité, la maîtrise du français et le profil scolaire ou professionnel. Un niveau bac ou équivalent, le SSIAP 3 ou des fonctions à responsabilités peuvent étayer une candidature. Un avis favorable lors de l’entretien préalable est également prévu selon le profil.\n\n' +
      'Pour l’entretien, décrivez votre projet et les responsabilités que vous avez déjà assumées. Apportez les éléments qui les établissent, par exemple votre diplôme, votre CV ou une attestation de fonctions. Vous pourrez aussi vérifier les conditions réglementaires applicables à votre situation avant de vous engager.',
  },
];
