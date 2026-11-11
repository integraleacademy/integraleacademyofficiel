export type CertificationProject = {
  slug: 'cpiaa' | 'eiag';
  acronym: string;
  title: string;
  description: string;
  introduction: string;
  objective: string;
  role: string;
  blocks: readonly { code: string; title: string; summary: string }[];
  entryRequirement: string;
  entrySkills: readonly string[];
  admission: string;
  assessments: readonly string[];
  jobs: readonly string[];
  employmentNote?: string;
};

// Public descriptions derived from the controlled RNCP drafts dated 11 November 2026.
// These projects have not been submitted or registered. Their case numbers are not RNCP codes.
export const certificationProjects = {
  cpiaa: {
    slug: 'cpiaa',
    acronym: 'CPIAA',
    title: 'Chef de produit en intelligence artificielle et automatisation',
    description: 'Présentation du projet CPIAA d’Intégrale Academy : objectifs, compétences, prérequis et évaluations. Demande d’enregistrement au RNCP en préparation.',
    introduction: 'Définir un produit utile, coordonner sa réalisation et mesurer sa valeur : un projet de certification consacré au pilotage des produits d’IA et d’automatisation.',
    objective: 'Le projet CPIAA vise la maîtrise du cycle de vie d’un produit ou d’un service intégrant l’intelligence artificielle et des processus automatisés. Il prépare à transformer un besoin utilisateur en proposition de valeur, à construire les décisions d’investissement, à coordonner la réalisation et à suivre les résultats en exploitation.',
    role: 'Le chef de produit travaille avec les utilisateurs, les métiers, les équipes de développement et de données, ainsi que les fonctions de sécurité et juridiques. Il articule utilité, viabilité économique, faisabilité technique et maîtrise des risques dans les limites de ses responsabilités.',
    blocks: [
      {
        code: 'BC1',
        title: 'Définir la stratégie d’un produit d’intelligence artificielle et d’automatisation',
        summary: 'Analyser les besoins des utilisateurs et les processus métier, comparer les cas d’usage, construire le modèle économique et défendre une feuille de route priorisée.',
      },
      {
        code: 'BC2',
        title: 'Concevoir et valider la proposition de valeur d’un produit IA',
        summary: 'Concevoir les parcours et les exigences, expérimenter un prototype, analyser les retours utilisateurs et préparer la maîtrise des risques et la recette.',
      },
      {
        code: 'BC3',
        title: 'Piloter la réalisation et le déploiement d’un produit IA',
        summary: 'Coordonner les équipes, piloter les priorités et les aléas, préparer la mise en service et accompagner le déploiement et l’adoption du produit.',
      },
      {
        code: 'BC4',
        title: 'Gouverner la performance et les évolutions d’un produit IA',
        summary: 'Mesurer la valeur et la qualité du produit, traiter les incidents et dérives, organiser la veille et arbitrer les améliorations, le remplacement ou le retrait.',
      },
    ],
    entryRequirement: 'Être titulaire d’une certification de niveau 6 dans les domaines du numérique, du management, du commerce, du marketing ou de la gestion de projet ; ou justifier d’acquis professionnels équivalents en conduite de projet, analyse de besoins et traitement de données.',
    entrySkills: [
      'Analyser un besoin et décrire un processus métier.',
      'Exploiter un tableau de données et expliquer les limites d’un indicateur.',
      'Structurer une recommandation et argumenter un choix de projet.',
      'Comprendre les principes d’un produit numérique et les interactions entre utilisateurs, métiers et équipes techniques.',
      'Lire une documentation technique en anglais.',
    ],
    admission: 'L’admission prévue repose sur un dossier présentant le parcours et les réalisations, un entretien de positionnement et une étude de cas. Les candidats admis sur la base de leur expérience devront démontrer les mêmes acquis d’entrée. Le positionnement précisera les acquis, les écarts et les éventuelles remises à niveau.',
    assessments: [
      'Dossier de stratégie produit et soutenance individuelle.',
      'Dossier de conception et d’expérimentation et soutenance individuelle.',
      'Dossier de pilotage et de déploiement et soutenance individuelle.',
      'Dossier de performance et d’évolution et soutenance individuelle.',
    ],
    jobs: [
      'Chef de produit en intelligence artificielle et automatisation.',
      'Product manager de solutions d’intelligence artificielle et d’automatisation.',
      'Responsable produit IA.',
      'Product owner IA, lorsque le poste comprend le cadrage, l’arbitrage et le suivi de la valeur du produit.',
      'Chef de produit automatisation et services numériques intégrant de l’IA.',
    ],
  },
  eiag: {
    slug: 'eiag',
    acronym: 'EIAG',
    title: 'Expert en ingénierie de l’intelligence artificielle générative',
    description: 'Présentation du projet EIAG d’Intégrale Academy : objectifs, compétences, prérequis et évaluations. Demande d’enregistrement au RNCP en préparation.',
    introduction: 'Concevoir, développer et fiabiliser des systèmes génératifs : un projet de certification consacré à l’ingénierie de l’IA, de l’architecture à l’exploitation.',
    objective: 'Le projet EIAG vise la conception, le développement, la qualification et l’exploitation de systèmes intégrant l’intelligence artificielle générative. Il prépare à traduire un besoin métier en architecture justifiée, à développer les composants, à démontrer leur fiabilité et à organiser leur fonctionnement dans la durée.',
    role: 'L’expert intervient au sein d’équipes de développement, de données ou d’architecture. En lien avec les responsables produit, les métiers, l’exploitation, la sécurité et les fonctions juridiques, il défend des choix techniques fondés sur des essais reproductibles et organise la résolution de problèmes complexes.',
    blocks: [
      {
        code: 'BC1',
        title: 'Concevoir l’architecture et la stratégie de données d’un système d’IA générative',
        summary: 'Transformer le besoin en exigences techniques, préparer une stratégie de données et comparer des architectures adaptées aux usages, aux risques et aux ressources.',
      },
      {
        code: 'BC2',
        title: 'Développer et adapter des composants d’IA générative',
        summary: 'Développer et adapter les composants génératifs, mettre en œuvre la recherche documentaire et les agents, intégrer les interfaces et démontrer un fonctionnement reproductible.',
      },
      {
        code: 'BC3',
        title: 'Qualifier la fiabilité et la sécurité d’un système d’IA générative',
        summary: 'Évaluer la qualité et la robustesse, conduire des tests de sécurité autorisés, traiter les vulnérabilités et formuler une recommandation de mise en service fondée sur les preuves.',
      },
      {
        code: 'BC4',
        title: 'Industrialiser et piloter le cycle de vie d’un système d’IA générative',
        summary: 'Industrialiser les livraisons, organiser un déploiement réversible, superviser le système, traiter les incidents et préparer les évolutions et le transfert aux équipes.',
      },
    ],
    entryRequirement: 'Être titulaire d’une certification de niveau 6 en informatique, développement logiciel, science des données ou mathématiques appliquées ; ou justifier d’acquis professionnels équivalents démontrés par des réalisations techniques.',
    entrySkills: [
      'Programmer en Python, expliquer et modifier son code.',
      'Utiliser une API, manipuler des données et interroger une base.',
      'Versionner un projet et organiser des essais reproductibles.',
      'Mobiliser les fondamentaux de probabilités, de statistiques et d’apprentissage automatique.',
      'Lire une documentation technique en anglais.',
    ],
    admission: 'L’admission prévue repose sur un dossier présentant le parcours et les réalisations, un entretien de positionnement et une étude de cas technique. Les candidats admis sur la base de leur expérience devront démontrer les mêmes acquis d’entrée. Le positionnement précisera les acquis, les écarts et les éventuelles remises à niveau.',
    assessments: [
      'Étude d’architecture et décision de faisabilité.',
      'Réalisation et démonstration d’un système génératif.',
      'Qualification technique et décision de mise en service.',
      'Déploiement, exploitation et évolution d’un système génératif.',
    ],
    jobs: [
      'Expert en ingénierie de l’intelligence artificielle générative.',
      'Ingénieur en intelligence artificielle générative, en tant qu’intitulé d’emploi.',
      'Ingénieur logiciel spécialisé en IA générative.',
      'Ingénieur LLM et systèmes génératifs.',
      'Consultant technique en conception et industrialisation de systèmes d’IA générative.',
    ],
    employmentNote: 'Ce projet de certification ne constitue pas un diplôme d’ingénieur et ne confère pas le titre protégé d’ingénieur diplômé.',
  },
} satisfies Record<'cpiaa' | 'eiag', CertificationProject>;
