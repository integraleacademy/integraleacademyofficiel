import type { CSSProperties } from 'react';
import styles from './TrainingMotionGallery.module.css';

type TrainingMotionGalleryVariant =
  | 'a3p'
  | 'ssiap'
  | 'sst'
  | 'despVae'
  | 'despInitial'
  | 'btsMos'
  | 'btsMco'
  | 'btsNdrc'
  | 'btsCi'
  | 'btsPi'
  | 'btsCg'
  | 'vtc';

type SceneKind =
  | 'mission-map' | 'risk-radar' | 'site-check' | 'close-protection' | 'secure-vehicle' | 'briefing'
  | 'fire-round' | 'extinguisher' | 'fire-panel' | 'fire-alert' | 'evacuation' | 'rescue-arrival'
  | 'hazard' | 'examine' | 'emergency-call' | 'first-aid' | 'cpr' | 'dae'
  | 'profile-review' | 'feasibility' | 'evidence' | 'competencies' | 'jury' | 'certificate'
  | 'business' | 'compliance' | 'finance' | 'commercial' | 'team' | 'approval';

type Story = readonly [SceneKind, string, string];

const galleries: Record<TrainingMotionGalleryVariant, {
  eyebrow: string;
  title: string;
  intro: string;
  theme: 'green' | 'red' | 'rescue' | 'orange' | 'blue' | 'violet';
  stories: readonly Story[];
}> = {
  a3p: {
    eyebrow: 'A3P en mouvement',
    title: 'La protection rapprochée, en images.',
    intro: 'Visualisez les réflexes qui structurent une mission, de la préparation au débriefing.',
    theme: 'green',
    stories: [
      ['mission-map', 'Préparer la mission', 'Animation d’un itinéraire préparé avant une mission de protection rapprochée'],
      ['risk-radar', 'Analyser les risques', 'Animation d’un radar identifiant les risques autour de la personne protégée'],
      ['site-check', 'Reconnaître les lieux', 'Animation d’un site dont les accès et les zones de repli sont vérifiés'],
      ['close-protection', 'Protéger en déplacement', 'Animation d’un dispositif rapproché autour d’une personne protégée'],
      ['secure-vehicle', 'Sécuriser les trajets', 'Animation d’un véhicule suivant un itinéraire sécurisé'],
      ['briefing', 'Briefer et débriefer', 'Animation d’un briefing d’équipe suivi d’un compte rendu de mission'],
    ],
  },
  ssiap: {
    eyebrow: 'SSIAP 1 en mouvement',
    title: 'La sécurité incendie, en images.',
    intro: 'Des rondes au poste de sécurité, découvrez les gestes essentiels d’un agent SSIAP 1.',
    theme: 'red',
    stories: [
      ['fire-round', 'Effectuer une ronde', 'Animation d’une ronde de sécurité incendie avec plusieurs points de contrôle'],
      ['extinguisher', 'Vérifier les équipements', 'Animation de la vérification d’un extincteur et de son indicateur de pression'],
      ['fire-panel', 'Exploiter le SSI', 'Animation d’un système de sécurité incendie signalant une zone'],
      ['fire-alert', 'Lever le doute et alerter', 'Animation d’une alarme incendie suivie d’une levée de doute'],
      ['evacuation', 'Faciliter l’évacuation', 'Animation de personnes guidées vers une issue de secours'],
      ['rescue-arrival', 'Accueillir les secours', 'Animation de l’arrivée des secours guidés vers la zone concernée'],
    ],
  },
  sst: {
    eyebrow: 'SST en mouvement',
    title: 'Les gestes qui sauvent, en images.',
    intro: 'Une méthode simple à mémoriser pour prévenir, protéger et secourir sans perdre de temps.',
    theme: 'rescue',
    stories: [
      ['hazard', 'Protéger la zone', 'Animation d’une zone de danger balisée avant toute intervention de secours'],
      ['examine', 'Examiner la victime', 'Animation d’un examen guidé pour identifier les signes de détresse'],
      ['emergency-call', 'Alerter les secours', 'Animation d’un appel transmettant les informations utiles aux secours'],
      ['first-aid', 'Réaliser le geste adapté', 'Animation d’un geste de premiers secours réalisé avec méthode'],
      ['cpr', 'Pratiquer la réanimation', 'Animation d’une réanimation cardio-pulmonaire avec contrôle du rythme'],
      ['dae', 'Utiliser un défibrillateur', 'Animation d’un défibrillateur guidant le sauveteur étape par étape'],
    ],
  },
  despVae: {
    eyebrow: 'DESP VAE en mouvement',
    title: 'De l’expérience au titre, en images.',
    intro: 'Visualisez les étapes qui transforment votre parcours professionnel en dossier de validation structuré.',
    theme: 'orange',
    stories: [
      ['profile-review', 'Analyser votre parcours', 'Animation d’un parcours professionnel analysé au regard du référentiel DESP'],
      ['feasibility', 'Établir la faisabilité', 'Animation d’un dossier de faisabilité complété puis vérifié'],
      ['evidence', 'Rassembler les preuves', 'Animation de pièces professionnelles classées dans un dossier de preuves'],
      ['competencies', 'Démontrer les compétences', 'Animation des cinq domaines de compétences DESP progressivement validés'],
      ['jury', 'Préparer le jury', 'Animation d’une présentation orale préparée face à un jury professionnel'],
      ['certificate', 'Faire reconnaître l’expérience', 'Animation du titre DESP obtenu après validation du jury'],
    ],
  },
  despInitial: {
    eyebrow: 'DESP initial en mouvement',
    title: 'Diriger une entreprise, en images.',
    intro: 'Du projet à l’agrément, visualisez les responsabilités clés d’un dirigeant de sécurité privée.',
    theme: 'orange',
    stories: [
      ['business', 'Construire le projet', 'Animation d’un projet de création ou de reprise d’entreprise qui prend forme'],
      ['compliance', 'Garantir la conformité', 'Animation d’un contrôle réglementaire des obligations de sécurité privée'],
      ['finance', 'Piloter les finances', 'Animation d’un tableau de bord financier suivi par le dirigeant'],
      ['commercial', 'Développer l’activité', 'Animation d’une stratégie commerciale atteignant ses objectifs'],
      ['team', 'Recruter et manager', 'Animation d’une équipe organisée et coordonnée par son dirigeant'],
      ['approval', 'Préparer les démarches CNAPS', 'Animation d’un dossier dirigeant contrôlé avant son dépôt auprès du CNAPS'],
    ],
  },
  btsMos: {
    eyebrow: 'BTS MOS en mouvement',
    title: 'Le management de la sécurité, en images.',
    intro: 'Du terrain au pilotage, visualisez les responsabilités qui structurent une prestation de sécurité.',
    theme: 'blue',
    stories: [
      ['mission-map', 'Planifier les missions', 'Animation d’un responsable organisant les moyens et les missions d’une prestation de sécurité'],
      ['site-check', 'Superviser le terrain', 'Animation d’un site dont les accès et les points de contrôle sont supervisés'],
      ['team', 'Coordonner les équipes', 'Animation d’une équipe d’agents coordonnée par son responsable opérationnel'],
      ['fire-panel', 'Piloter depuis le poste', 'Animation d’un poste de sécurité centralisant les informations opérationnelles'],
      ['briefing', 'Rendre compte au client', 'Animation d’un compte rendu de prestation présenté clairement au client'],
      ['compliance', 'Garantir la conformité', 'Animation d’un contrôle des procédures et obligations applicables à la prestation'],
    ],
  },
  btsMco: {
    eyebrow: 'BTS MCO en mouvement',
    title: 'Le commerce et le management, en images.',
    intro: 'Du conseil client au pilotage des résultats, découvrez les compétences d’un manager commercial opérationnel.',
    theme: 'blue',
    stories: [
      ['business', 'Piloter l’unité commerciale', 'Animation d’une unité commerciale organisée autour de ses clients et de ses objectifs'],
      ['profile-review', 'Comprendre les clients', 'Animation d’un profil client analysé afin de proposer une réponse personnalisée'],
      ['commercial', 'Développer les ventes', 'Animation d’une action commerciale atteignant progressivement son objectif'],
      ['evidence', 'Gérer l’offre et les stocks', 'Animation de références et documents de stock classés et contrôlés'],
      ['finance', 'Suivre la performance', 'Animation d’indicateurs commerciaux suivis dans un tableau de bord'],
      ['team', 'Animer l’équipe', 'Animation d’une équipe commerciale organisée et accompagnée par son manager'],
    ],
  },
  btsNdrc: {
    eyebrow: 'BTS NDRC en mouvement',
    title: 'La relation client à 360°, en images.',
    intro: 'Prospection, négociation et fidélisation : visualisez une relation commerciale devenue pleinement omnicanale.',
    theme: 'blue',
    stories: [
      ['risk-radar', 'Identifier les prospects', 'Animation d’un marché analysé pour repérer de nouvelles opportunités commerciales'],
      ['emergency-call', 'Entrer en relation', 'Animation d’une prise de contact menée par téléphone et outils numériques'],
      ['commercial', 'Négocier et vendre', 'Animation d’une négociation commerciale progressant jusqu’à la conclusion'],
      ['profile-review', 'Personnaliser le suivi', 'Animation d’une fiche client enrichie pour adapter chaque échange'],
      ['briefing', 'Fidéliser les clients', 'Animation d’un suivi structuré maintenant une relation client durable'],
      ['competencies', 'Animer les réseaux', 'Animation d’un réseau de contacts et partenaires qui se développe'],
    ],
  },
  btsCi: {
    eyebrow: 'BTS CI en mouvement',
    title: 'Les échanges internationaux, en images.',
    intro: 'Des marchés étrangers à la livraison, visualisez les étapes d’une opération commerciale internationale.',
    theme: 'blue',
    stories: [
      ['risk-radar', 'Étudier les marchés', 'Animation d’opportunités repérées et comparées sur plusieurs marchés internationaux'],
      ['mission-map', 'Organiser les flux', 'Animation d’un itinéraire commercial reliant plusieurs partenaires internationaux'],
      ['secure-vehicle', 'Piloter la logistique', 'Animation d’une expédition suivie tout au long de son acheminement'],
      ['compliance', 'Maîtriser les formalités', 'Animation de documents douaniers et réglementaires vérifiés avant expédition'],
      ['briefing', 'Négocier à l’international', 'Animation d’un échange commercial préparé dans un contexte interculturel'],
      ['finance', 'Suivre la performance export', 'Animation d’indicateurs permettant de piloter une activité internationale'],
    ],
  },
  btsPi: {
    eyebrow: 'BTS PI en mouvement',
    title: 'L’immobilier, en images.',
    intro: 'De l’estimation à la gestion, visualisez les missions qui rythment une activité immobilière.',
    theme: 'blue',
    stories: [
      ['site-check', 'Découvrir et estimer un bien', 'Animation d’un bien immobilier observé et analysé avant son estimation'],
      ['profile-review', 'Comprendre le projet client', 'Animation du projet d’un acquéreur, vendeur, bailleur ou locataire analysé'],
      ['mission-map', 'Organiser les visites', 'Animation d’un parcours de visites préparé entre plusieurs biens immobiliers'],
      ['commercial', 'Négocier la transaction', 'Animation d’une négociation immobilière menée vers un accord équilibré'],
      ['evidence', 'Sécuriser les dossiers', 'Animation des pièces d’un mandat, bail ou dossier de transaction vérifiées'],
      ['team', 'Gérer biens et copropriétés', 'Animation des différents interlocuteurs coordonnés autour d’un immeuble'],
    ],
  },
  btsCg: {
    eyebrow: 'BTS CG en mouvement',
    title: 'La gestion et la comptabilité, en images.',
    intro: 'De la pièce comptable au tableau de bord, visualisez les opérations qui rendent une entreprise plus fiable.',
    theme: 'blue',
    stories: [
      ['evidence', 'Enregistrer les opérations', 'Animation de pièces comptables classées puis enregistrées avec méthode'],
      ['feasibility', 'Contrôler les écritures', 'Animation d’écritures comptables vérifiées une à une avant validation'],
      ['compliance', 'Respecter les obligations', 'Animation d’un dossier fiscal et social contrôlé avant son échéance'],
      ['finance', 'Construire les budgets', 'Animation d’un budget comparant les prévisions aux résultats réalisés'],
      ['risk-radar', 'Analyser les écarts', 'Animation d’indicateurs analysés pour repérer les écarts significatifs'],
      ['approval', 'Préparer la clôture', 'Animation d’un dossier de clôture finalisé après les derniers contrôles'],
    ],
  },
  vtc: {
    eyebrow: 'VTC en mouvement',
    title: 'Le métier de chauffeur VTC, en images.',
    intro: 'De la réservation à la fidélisation, visualisez les gestes qui transforment un trajet en véritable service professionnel.',
    theme: 'violet',
    stories: [
      ['emergency-call', 'Organiser la réservation', 'Animation d’une réservation reçue puis confirmée avec toutes les informations utiles'],
      ['mission-map', 'Préparer l’itinéraire', 'Animation d’un trajet optimisé avant la prise en charge du passager'],
      ['profile-review', 'Accueillir le passager', 'Animation des besoins d’un passager identifiés pour personnaliser son accueil'],
      ['secure-vehicle', 'Conduire en sécurité', 'Animation d’un véhicule suivant un itinéraire avec une conduite sûre et souple'],
      ['finance', 'Calculer et facturer', 'Animation d’une prestation chiffrée puis facturée de manière professionnelle'],
      ['commercial', 'Fidéliser la clientèle', 'Animation d’une relation client développée après une prestation réussie'],
    ],
  },
};

const svgProps = {
  className: styles.scene,
  viewBox: '0 0 320 210',
  'aria-hidden': true,
  focusable: false,
} as const;

function Scene({ kind }: { kind: SceneKind }) {
  if (kind === 'mission-map') return <svg {...svgProps}>
    <path className={styles.mapGrid} d="M30 58h260M30 105h260M30 152h260M80 26v158M160 26v158M240 26v158" />
    <path className={styles.route} d="M43 160c42-3 46-65 92-65s45 54 88 29 29-67 62-72" />
    <g className={styles.pin}><path d="M43 140c-11 0-19 8-19 19 0 14 19 31 19 31s19-17 19-31c0-11-8-19-19-19Z"/><circle cx="43" cy="159" r="6"/></g>
    <g className={styles.target}><circle cx="285" cy="52" r="20"/><circle cx="285" cy="52" r="8"/><path d="m270 66 30-29"/></g>
    <g className={styles.packet}><circle cx="0" cy="0" r="8"/><path d="m-3 0 2 3 5-6"/></g>
  </svg>;

  if (kind === 'risk-radar') return <svg {...svgProps}>
    <circle cx="160" cy="105" r="77" className={styles.radarRing}/><circle cx="160" cy="105" r="51" className={styles.radarRing}/><circle cx="160" cy="105" r="25" className={styles.radarRing}/>
    <path className={styles.radarSweep} d="M160 105 160 28a77 77 0 0 1 67 39Z"/>
    <circle cx="116" cy="73" r="7" className={styles.signal}/><circle cx="205" cy="127" r="7" className={styles.signal}/><circle cx="147" cy="151" r="5" className={styles.signal}/>
    <g className={styles.shield} transform="translate(160 105)"><path d="M0-28 25-18v18c0 20-12 31-25 39C-13 31-25 20-25 0v-18Z"/><path d="m-9 1 7 7 14-17"/></g>
  </svg>;

  if (kind === 'site-check') return <svg {...svgProps}>
    <g className={styles.building}><rect x="72" y="43" width="176" height="127" rx="8"/><path d="M72 58h176"/><rect x="91" y="76" width="31" height="27" rx="4"/><rect x="137" y="76" width="31" height="27" rx="4"/><rect x="183" y="76" width="31" height="27" rx="4"/><rect x="144" y="125" width="40" height="45" rx="4"/></g>
    <g className={styles.scan}><path d="M55 116h210"/><circle cx="91" cy="116" r="11"/><circle cx="229" cy="116" r="11"/></g>
    <g className={styles.checkBadge}><circle cx="255" cy="54" r="22"/><path d="m244 54 8 8 15-18"/></g>
  </svg>;

  if (kind === 'close-protection') return <svg {...svgProps}>
    <circle cx="160" cy="107" r="75" className={styles.protectionHalo}/><circle cx="160" cy="107" r="51" className={styles.protectionHalo}/>
    <g className={styles.protectedPerson}><circle cx="160" cy="78" r="15"/><path d="M137 137c2-28 8-43 23-43s21 15 23 43Z"/></g>
    <g className={styles.guards}><g transform="translate(100 116)"><circle cy="-22" r="12"/><path d="M-19 29c2-25 7-39 19-39s17 14 19 39Z"/></g><g transform="translate(220 116)"><circle cy="-22" r="12"/><path d="M-19 29c2-25 7-39 19-39s17 14 19 39Z"/></g></g>
    <path className={styles.guardLink} d="M100 116 160 78l60 38M100 116h120"/>
  </svg>;

  if (kind === 'secure-vehicle') return <svg {...svgProps}>
    <path className={styles.route} d="M28 151h71c26 0 29-56 63-56h128"/>
    <g className={styles.vehicle}><path d="M83 116h92l20 21h22c8 0 14 6 14 14v16H65v-25c0-10 8-18 18-18Z"/><path d="m104 116 14-25h50l25 25"/><circle cx="102" cy="169" r="14"/><circle cx="197" cy="169" r="14"/><path d="M121 99h43l18 17h-71Z"/></g>
    <g className={styles.vehicleShield}><path d="M252 54 274 63v16c0 17-10 27-22 34-12-7-22-17-22-34V63Z"/><path d="m243 79 7 7 13-16"/></g>
  </svg>;

  if (kind === 'briefing') return <svg {...svgProps}>
    <g className={styles.clipboard}><rect x="116" y="31" width="137" height="151" rx="12"/><rect x="151" y="22" width="66" height="21" rx="7"/><path d="M139 75h91M139 101h91M139 127h68M139 153h78"/></g>
    <g className={styles.speech}><path d="M38 52h91v62H81l-19 17v-17H38Z"/><path d="M55 73h56M55 90h42"/></g>
    <g className={styles.checkBadge}><circle cx="251" cy="161" r="22"/><path d="m240 161 8 8 15-18"/></g>
  </svg>;

  if (kind === 'fire-round') return <svg {...svgProps}>
    <g className={styles.building}><rect x="112" y="34" width="154" height="139" rx="8"/><path d="M112 51h154"/><rect x="131" y="70" width="30" height="27" rx="3"/><rect x="176" y="70" width="30" height="27" rx="3"/><rect x="221" y="70" width="27" height="27" rx="3"/><rect x="177" y="126" width="39" height="47" rx="3"/></g>
    <path className={styles.route} d="M33 174h50c18 0 21-31 21-52s13-35 32-35h103"/>
    <g className={styles.agent} transform="translate(62 137)"><circle cy="-28" r="13"/><path d="M-20 27c2-28 8-43 20-43s18 15 20 43Z"/><path d="M-8 27-12 53M8 27l4 26"/></g>
    <g className={styles.fire} transform="translate(245 115)"><path d="M0 26c-17 0-27-11-25-27 2-13 12-18 16-31 13 9 20 18 17 31 5-4 8-10 8-16 9 9 14 19 11 29-3 9-13 14-27 14Z"/></g>
  </svg>;

  if (kind === 'extinguisher') return <svg {...svgProps}>
    <g className={styles.extinguisher}><rect x="111" y="69" width="86" height="115" rx="28"/><path d="M131 69V47h47v22M143 47V31h38M178 37h34l13 15"/><path d="M197 86c33 3 49 26 42 62"/><circle cx="154" cy="101" r="21"/><path d="M142 101h24M154 89v24"/></g>
    <g className={styles.gauge} transform="translate(233 66)"><circle r="27"/><path d="M-16 5a17 17 0 0 1 32 0M0 5l10-10"/></g>
    <g className={styles.checkBadge}><circle cx="73" cy="141" r="25"/><path d="m60 141 9 9 18-21"/></g>
  </svg>;

  if (kind === 'fire-panel') return <svg {...svgProps}>
    <g className={styles.panel}><rect x="45" y="30" width="230" height="151" rx="15"/><rect x="63" y="52" width="115" height="72" rx="7"/><path d="M76 71h88M76 89h64M76 107h76"/><circle cx="215" cy="70" r="11"/><circle cx="247" cy="70" r="11"/><circle cx="215" cy="105" r="11"/><circle cx="247" cy="105" r="11"/><path d="M67 147h186"/></g>
    <rect className={styles.panelScan} x="66" y="55" width="29" height="66" rx="4"/>
    <g className={styles.fire} transform="translate(231 145)"><path d="M0 22c-15 0-24-10-22-24 2-11 11-16 15-27 11 8 17 16 15 27 4-4 7-9 7-14 8 8 12 17 9 26-3 8-11 12-24 12Z"/></g>
  </svg>;

  if (kind === 'fire-alert') return <svg {...svgProps}>
    <g className={styles.siren}><path d="M104 140h112M118 140V95c0-30 18-50 42-50s42 20 42 50v45"/><rect x="98" y="140" width="124" height="22" rx="8"/><path d="M160 57v70M132 82h56"/></g>
    <g className={styles.alertWaves}><path d="M91 75c-16 14-20 37-11 56M229 75c16 14 20 37 11 56"/><path d="M68 56c-28 24-35 66-19 98M252 56c28 24 35 66 19 98"/></g>
    <g className={styles.magnifier}><circle cx="246" cy="151" r="24"/><path d="m263 168 20 20"/><path d="m237 151 6 6 12-15"/></g>
  </svg>;

  if (kind === 'evacuation') return <svg {...svgProps}>
    <g className={styles.exitDoor}><rect x="197" y="39" width="80" height="135" rx="7"/><path d="M211 58h45v91h-45Z"/><circle cx="248" cy="105" r="4"/></g>
    <g className={styles.walkers}><g transform="translate(78 116)"><circle cy="-37" r="13"/><path d="M0-23v46M0-6l-22 19M0-6l23 14M0 23l-20 32M0 23l23 31"/></g><g transform="translate(132 126)"><circle cy="-31" r="11"/><path d="M0-19v39M0-4l-17 16M0-4l19 12M0 20l-16 27M0 20l18 26"/></g></g>
    <path className={styles.exitArrow} d="M55 180h163m-19-16 21 16-21 16"/>
    <path className={styles.exitSign} d="M211 58h45v25h-45Z"/>
  </svg>;

  if (kind === 'rescue-arrival') return <svg {...svgProps}>
    <path className={styles.route} d="M25 166h270"/>
    <g className={styles.rescueTruck}><path d="M50 91h129v74H38v-57c0-9 5-17 12-17Z"/><path d="M179 117h55l31 27v21h-86Z"/><path d="M199 125h27l19 17h-46Z"/><circle cx="78" cy="168" r="15"/><circle cx="213" cy="168" r="15"/><path d="M94 111h35M111 94v35"/></g>
    <g className={styles.beacon}><rect x="89" y="73" width="42" height="18" rx="9"/><path d="M76 67 62 53M145 67l14-14M110 62V41"/></g>
    <g className={styles.pin}><path d="M281 39c-10 0-17 7-17 17 0 13 17 28 17 28s17-15 17-28c0-10-7-17-17-17Z"/><circle cx="281" cy="56" r="5"/></g>
  </svg>;

  if (kind === 'hazard') return <svg {...svgProps}>
    <g className={styles.worksite}><rect x="42" y="54" width="113" height="111" rx="8"/><path d="M42 70h113M64 91h28M105 91h29M64 113h28M105 113h29"/></g>
    <g className={styles.hazard}><path d="m222 44 69 121H153Z"/><path d="M222 80v43"/><circle cx="222" cy="141" r="5"/></g>
    <path className={styles.safetyLine} d="M25 179h270"/>
    <g className={styles.cones}><path d="m73 142 18 37H55Z"/><path d="m126 142 18 37h-36Z"/></g>
  </svg>;

  if (kind === 'examine') return <svg {...svgProps}>
    <g className={styles.personOutline}><circle cx="132" cy="66" r="25"/><path d="M93 172c4-49 15-76 39-76s35 27 39 76Z"/><path d="M108 119h48"/></g>
    <g className={styles.magnifier}><circle cx="211" cy="111" r="42"/><path d="m242 142 38 38"/><path d="M193 111h11l8-17 12 35 9-18h10"/></g>
    <g className={styles.scanDots}><circle cx="130" cy="67" r="5"/><circle cx="116" cy="123" r="5"/><circle cx="148" cy="147" r="5"/></g>
  </svg>;

  if (kind === 'emergency-call') return <svg {...svgProps}>
    <g className={styles.phone}><rect x="105" y="22" width="110" height="168" rx="22"/><rect x="119" y="42" width="82" height="107" rx="9"/><path d="M143 34h34"/><circle cx="160" cy="169" r="8"/><path d="M139 78c9 28 31 50 58 59"/></g>
    <g className={styles.phoneIcon}><path d="M141 70c3-5 9-7 14-3l9 9c3 3 3 8 1 11l-7 8c7 12 16 21 28 28l8-7c3-2 8-2 11 1l8 9"/></g>
    <g className={styles.alertWaves}><path d="M85 65c-15 15-20 37-13 56M235 65c15 15 20 37 13 56"/><path d="M61 48c-26 25-34 64-20 97M259 48c26 25 34 64 20 97"/></g>
  </svg>;

  if (kind === 'first-aid') return <svg {...svgProps}>
    <g className={styles.firstAidKit}><rect x="54" y="65" width="212" height="120" rx="22"/><path d="M123 65V43h74v22"/><rect x="132" y="88" width="56" height="56" rx="9"/><path d="M160 99v34M143 116h34"/></g>
    <g className={styles.bandage}><rect x="84" y="31" width="152" height="54" rx="27" transform="rotate(-11 160 58)"/><circle cx="144" cy="61" r="4"/><circle cx="160" cy="58" r="4"/><circle cx="176" cy="55" r="4"/></g>
    <g className={styles.checkBadge}><circle cx="256" cy="165" r="22"/><path d="m245 165 8 8 15-18"/></g>
  </svg>;

  if (kind === 'cpr') return <svg {...svgProps}>
    <g className={styles.cprPerson}><circle cx="78" cy="133" r="18"/><path d="M98 133h111c19 0 31 12 31 29H98Z"/><path d="M126 133 149 87h42l22 46"/></g>
    <g className={styles.cprHands}><path d="M155 66c-11 0-19 8-19 18s8 18 19 18h22c11 0 19-8 19-18s-8-18-19-18Z"/><path d="M166 102v32"/></g>
    <path className={styles.heartbeat} d="M37 49h60l12-18 18 40 17-28 17 20h121"/>
    <g className={styles.cprPulse}><circle cx="166" cy="132" r="25"/><circle cx="166" cy="132" r="11"/></g>
  </svg>;

  if (kind === 'dae') return <svg {...svgProps}>
    <g className={styles.dae}><rect x="81" y="29" width="158" height="157" rx="25"/><rect x="103" y="51" width="114" height="64" rx="10"/><path d="m167 57-28 37h24l-10 30 31-42h-24Z"/><circle cx="119" cy="149" r="12"/><circle cx="160" cy="149" r="12"/><circle cx="201" cy="149" r="12"/></g>
    <g className={styles.daeCable}><path d="M80 126C45 128 39 97 45 76"/><circle cx="45" cy="70" r="15"/><path d="M43 62v16M35 70h16"/></g>
    <g className={styles.signal}><circle cx="252" cy="55" r="9"/></g>
  </svg>;

  if (kind === 'profile-review') return <svg {...svgProps}>
    <g className={styles.profile}><rect x="62" y="29" width="149" height="159" rx="15"/><circle cx="112" cy="80" r="23"/><path d="M78 133c3-27 14-40 34-40s31 13 34 40Z"/><path d="M160 70h31M160 89h31M84 155h106"/></g>
    <g className={styles.magnifier}><circle cx="218" cy="126" r="45"/><path d="m250 158 35 35"/><path d="m201 126 11 11 24-29"/></g>
  </svg>;

  if (kind === 'feasibility') return <svg {...svgProps}>
    <g className={styles.clipboard}><rect x="84" y="25" width="157" height="166" rx="14"/><rect x="129" y="15" width="67" height="21" rx="7"/></g>
    {[0,1,2,3].map(index => <g key={index} className={styles.checkRow} style={{ '--delay': `${index * .25}s` } as CSSProperties}><circle cx="112" cy={67 + index * 31} r="9"/><path d={`m107 ${67 + index * 31} 4 4 7-9`}/><path d={`M135 ${64 + index * 31}h76M135 ${72 + index * 31}h49`}/></g>)}
    <g className={styles.checkBadge}><circle cx="249" cy="163" r="24"/><path d="m237 163 9 9 17-21"/></g>
  </svg>;

  if (kind === 'evidence') return <svg {...svgProps}>
    <g className={styles.folder}><path d="M42 72h90l17 19h129v91H42Z"/><path d="M42 72V51h89l17 21"/></g>
    <g className={styles.paperStack}><rect x="91" y="30" width="139" height="119" rx="10" transform="rotate(-7 160 90)"/><rect x="102" y="35" width="139" height="119" rx="10"/><path d="M123 65h95M123 86h76M123 107h88M123 128h57"/></g>
    <g className={styles.evidenceTag}><rect x="52" y="137" width="91" height="35" rx="12"/><path d="m70 154 7 7 13-16"/><path d="M99 154h27"/></g>
  </svg>;

  if (kind === 'competencies') return <svg {...svgProps}>
    <g className={styles.skillBlocks}>{[[73,51],[162,33],[207,106],[119,128],[46,112]].map(([x,y], index) => <g key={index} className={styles.skillBlock} style={{ '--delay': `${index * .22}s` } as CSSProperties}><rect x={x} y={y} width="68" height="58" rx="15"/><circle cx={x+34} cy={y+29} r="13"/><path d={`m${x+27} ${y+29} 5 5 10-12`}/></g>)}</g>
    <circle cx="160" cy="105" r="90" className={styles.orbit}/>
  </svg>;

  if (kind === 'jury') return <svg {...svgProps}>
    <g className={styles.juryDesk}><rect x="55" y="128" width="210" height="52" rx="10"/><path d="M81 180v20M239 180v20"/></g>
    <g className={styles.juryPeople}>{[100,160,220].map((x,index) => <g key={x} transform={`translate(${x} 100)`}><circle cy="-27" r="15"/><path d="M-23 26c2-28 9-43 23-43s21 15 23 43Z"/>{index===1&&<path className={styles.speaking} d="M17-32q19-8 27 5M20-23q16-4 21 3"/>}</g>)}</g>
    <g className={styles.presentation}><rect x="113" y="39" width="94" height="48" rx="8"/><path d="M131 69 148 55l13 10 17-18 12 13"/></g>
  </svg>;

  if (kind === 'certificate') return <svg {...svgProps}>
    <g className={styles.certificate}><rect x="62" y="27" width="196" height="143" rx="15"/><path d="M89 58h142M103 85h114M103 106h89M103 127h72"/><circle cx="218" cy="139" r="27"/><path d="m205 139 9 9 18-22"/></g>
    <g className={styles.ribbon}><path d="m202 160-12 43 28-14 27 14-11-43"/></g>
  </svg>;

  if (kind === 'business') return <svg {...svgProps}>
    <g className={styles.businessBuilding}><rect x="52" y="70" width="157" height="112" rx="9"/><path d="M52 84h157M78 103h28M122 103h28M166 103h20M78 130h28M122 130h28M166 130h20"/><rect x="115" y="148" width="34" height="34" rx="3"/></g>
    <path className={styles.growthArrow} d="M66 59 122 36l45 17 77-35m-21 1h21v21"/>
    <g className={styles.briefcase}><rect x="215" y="105" width="70" height="58" rx="10"/><path d="M235 105V91h30v14M215 129h70M243 123h14v13h-14Z"/></g>
  </svg>;

  if (kind === 'compliance') return <svg {...svgProps}>
    <g className={styles.complianceDoc}><rect x="54" y="28" width="144" height="159" rx="14"/><path d="M79 64h94M79 87h94M79 110h70M79 133h82M79 156h57"/></g>
    <g className={styles.shield} transform="translate(225 117)"><path d="M0-55 47-37v33c0 38-22 58-47 73-25-15-47-35-47-73v-33Z"/><path d="m-18 2 14 14 28-34"/></g>
    <g className={styles.scan}><path d="M68 119h116"/></g>
  </svg>;

  if (kind === 'finance') return <svg {...svgProps}>
    <g className={styles.dashboard}><rect x="35" y="27" width="250" height="158" rx="17"/><path d="M59 154h202M70 142V111h31v31M118 142V84h31v58M166 142V99h31v43M214 142V61h31v81"/></g>
    <path className={styles.chartLine} d="M70 103 118 78l48 12 48-45 35 10"/>
    <g className={styles.financeBadge}><circle cx="76" cy="64" r="22"/><path d="M76 50v28M66 58h16c8 0 8 9 0 9H70c-8 0-8 9 0 9h17"/></g>
  </svg>;

  if (kind === 'commercial') return <svg {...svgProps}>
    <g className={styles.targetRings}><circle cx="167" cy="108" r="77"/><circle cx="167" cy="108" r="52"/><circle cx="167" cy="108" r="27"/></g>
    <g className={styles.arrow}><path d="M44 169 166 108"/><path d="m137 100 29 8-13 27"/><path d="M44 169h35M44 169v-35"/></g>
    <g className={styles.clientCard}><rect x="217" y="29" width="74" height="59" rx="13"/><circle cx="238" cy="51" r="9"/><path d="M254 47h21M254 58h16M232 75h45"/></g>
  </svg>;

  if (kind === 'team') return <svg {...svgProps}>
    <path className={styles.orgLines} d="M160 77v28M74 105h172M74 105v30M160 105v30M246 105v30"/>
    <g className={styles.manager}><circle cx="160" cy="49" r="19"/><path d="M129 86c3-31 12-47 31-47s28 16 31 47Z"/></g>
    <g className={styles.teamMembers}>{[74,160,246].map((x,index)=><g key={x} className={styles.teamMember} style={{ '--delay': `${index * .25}s` } as CSSProperties}><circle cx={x} cy="148" r="16"/><path d={`M${x-26} 190c3-27 10-41 26-41s23 14 26 41Z`}/></g>)}</g>
  </svg>;

  return <svg {...svgProps}>
    <g className={styles.approvalDoc}><rect x="52" y="27" width="174" height="158" rx="15"/><path d="M80 65h118M80 91h92M80 117h105M80 143h73"/></g>
    <g className={styles.stamp}><circle cx="231" cy="139" r="51"/><circle cx="231" cy="139" r="39"/><path d="m211 139 13 13 28-34"/><path d="M212 92 220 63h22l8 29"/></g>
    <g className={styles.statusDot}><circle cx="83" cy="50" r="8"/></g>
  </svg>;
}

export function TrainingMotionGallery({ variant, className = '' }: { variant: TrainingMotionGalleryVariant; className?: string }) {
  const gallery = galleries[variant];

  return <section className={`${styles.gallery} ${styles[gallery.theme]} ${className}`} aria-labelledby={`${variant}-motion-title`}>
    <div className={styles.intro}>
      <div>
        <p className={styles.eyebrow}>{gallery.eyebrow}</p>
        <h3 id={`${variant}-motion-title`}>{gallery.title}</h3>
      </div>
      <p>{gallery.intro}</p>
    </div>
    <div className={styles.cards}>
      {gallery.stories.map(([kind, title, description]) => <article className={styles.card} data-scene={kind} key={kind}>
        <div className={styles.visual} role="img" aria-label={description}><Scene kind={kind} /></div>
        <h4>{title}</h4>
      </article>)}
    </div>
  </section>;
}

export function TrainingMotionIllustration({ kind, theme = 'blue', description }: { kind: SceneKind; theme?: 'blue' | 'red' | 'green'; description: string }) {
  return <div className={`${styles.illustration} ${styles[theme]}`} role="img" aria-label={description}><Scene kind={kind} /></div>;
}
