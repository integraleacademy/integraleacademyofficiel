import styles from './MissionAnimation.module.css';

type MissionAnimationVariant =
  | 'a3p'
  | 'desp'
  | 'ssiap'
  | 'vtc'
  | 'mos'
  | 'ndrc'
  | 'mco'
  | 'ci'
  | 'cg'
  | 'despInitial'
  | 'despVae';

type MissionAnimationProps = {
  variant: MissionAnimationVariant;
  className?: string;
  compact?: boolean;
};

const copy: Record<MissionAnimationVariant, { kicker: string; status: string; title: string; caption: string; label: string }> = {
  a3p: {
    kicker: 'Mission simulée',
    status: 'Dispositif actif',
    title: 'Protection en mouvement',
    caption: 'Reconnaître · encadrer · sécuriser',
    label: 'Simulation animée d’un dispositif de protection rapprochée en déplacement',
  },
  desp: {
    kicker: 'Pilotage simulé',
    status: 'Flux coordonnés',
    title: 'Centre de décision',
    caption: 'Organiser · contrôler · décider',
    label: 'Simulation animée du pilotage d’une entreprise de sécurité privée',
  },
  ssiap: {
    kicker: 'Scénario incendie',
    status: 'Alerte transmise',
    title: 'Détection & levée de doute',
    caption: 'Prévenir · alerter · évacuer',
    label: 'Simulation animée d’une détection incendie reliée au poste de sécurité',
  },
  vtc: {
    kicker: 'Course simulée',
    status: 'Trajet en cours',
    title: 'Navigation professionnelle',
    caption: 'Accueillir · conduire · servir',
    label: 'Simulation animée d’un trajet professionnel en VTC',
  },
  mos: {
    kicker: 'PC opérationnel',
    status: 'Équipes coordonnées',
    title: 'Pilotage d’une prestation',
    caption: 'Planifier · superviser · rendre compte',
    label: 'Simulation animée du pilotage d’équipes et d’une prestation de sécurité en BTS MOS',
  },
  ndrc: {
    kicker: 'CRM simulé',
    status: 'Relation active',
    title: 'Du contact au client',
    caption: 'Prospecter · négocier · fidéliser',
    label: 'Simulation animée d’un parcours de relation client omnicanale en BTS NDRC',
  },
  mco: {
    kicker: 'Unité commerciale',
    status: 'Objectif suivi',
    title: 'Commerce en mouvement',
    caption: 'Vendre · animer · piloter',
    label: 'Simulation animée du pilotage des ventes et d’une unité commerciale en BTS MCO',
  },
  ci: {
    kicker: 'Opération internationale',
    status: 'Flux synchronisés',
    title: 'Échanges sans frontières',
    caption: 'Prospecter · négocier · acheminer',
    label: 'Simulation animée d’une opération commerciale import-export en BTS Commerce International',
  },
  cg: {
    kicker: 'Flux comptable',
    status: 'Écriture contrôlée',
    title: 'Des pièces aux décisions',
    caption: 'Enregistrer · vérifier · analyser',
    label: 'Simulation animée du traitement comptable jusqu’au tableau de bord en BTS Comptabilité et Gestion',
  },
  despInitial: {
    kicker: 'Parcours dirigeant',
    status: 'Compétences en cours',
    title: 'Construire puis diriger',
    caption: 'Réglementer · gérer · manager',
    label: 'Simulation animée du parcours de formation initiale DESP vers le pilotage d’une entreprise de sécurité',
  },
  despVae: {
    kicker: 'Dossier VAE',
    status: 'Preuves structurées',
    title: 'De l’expérience au titre',
    caption: 'Identifier · démontrer · présenter',
    label: 'Simulation animée de la constitution d’un dossier de preuves DESP VAE jusqu’au jury',
  },
};

const a3pRoute = 'M74 246 C154 246 156 154 244 164 S345 260 421 174 S492 86 570 88';
const vtcRoute = 'M44 252 C130 246 126 153 218 162 S324 256 400 177 S477 83 594 72';

function A3pScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <path className={styles.mapTrace} d="M22 84 174 84 174 31 M487 286 487 226 621 226 M287 0 287 91 358 91" />
      <path className={styles.routeShadow} d={a3pRoute} />
      <path className={styles.routeActive} d={a3pRoute} />
      <g className={styles.routePoint} transform="translate(74 246)"><circle r="11" /><text y="4">A</text></g>
      <g className={styles.routePoint} transform="translate(570 88)"><circle r="11" /><text y="4">B</text></g>
      <g className={styles.motionGroup}>
        <animateMotion dur="8s" repeatCount="indefinite" path={a3pRoute} keyPoints="0;1;1;0;0" keyTimes="0;.42;.54;.96;1" />
        <circle className={styles.protectionZone} r="47" />
        <circle className={styles.protectee} r="13" />
        <circle className={styles.guard} cx="-29" cy="-18" r="9" />
        <circle className={styles.guard} cx="-29" cy="18" r="9" />
        <path className={styles.formationLine} d="M-29-18 0 0-29 18" />
      </g>
      <g className={styles.staticGroup} transform="translate(421 174)">
        <circle className={styles.protectionZone} r="47" />
        <circle className={styles.protectee} r="13" />
        <circle className={styles.guard} cx="-29" cy="-18" r="9" />
        <circle className={styles.guard} cx="-29" cy="18" r="9" />
        <path className={styles.formationLine} d="M-29-18 0 0-29 18" />
      </g>
      <g className={styles.mapMarker} transform="translate(318 62)"><path d="m-7-7 14 14m0-14-14 14" /><text x="13" y="4">ZONE À ÉVITER</text></g>
      <g className={styles.mapMarker} transform="translate(518 247)"><circle r="7" /><text x="13" y="4">REPLI</text></g>
    </svg>
  );
}

function DespScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <path className={styles.networkLine} d="M320 160 130 82 M320 160 510 82 M320 160 130 244 M320 160 510 244" />
      <path className={styles.networkActive} d="M320 160 130 82 M320 160 510 82 M320 160 130 244 M320 160 510 244" />
      <g className={styles.despPacket}><circle r="6" /><animateMotion dur="3.8s" repeatCount="indefinite" path="M130 82 320 160" /></g>
      <g className={styles.despPacket}><circle r="6" /><animateMotion begin=".9s" dur="3.8s" repeatCount="indefinite" path="M510 82 320 160" /></g>
      <g className={styles.despPacket}><circle r="6" /><animateMotion begin="1.8s" dur="3.8s" repeatCount="indefinite" path="M130 244 320 160" /></g>
      <g className={styles.despPacket}><circle r="6" /><animateMotion begin="2.7s" dur="3.8s" repeatCount="indefinite" path="M510 244 320 160" /></g>
      <g className={styles.despNode} transform="translate(130 82)"><rect x="-62" y="-30" width="124" height="60" rx="16" /><text y="-4">TERRAIN</text><text className={styles.nodeValue} y="14">12 ÉQUIPES</text><circle cx="47" cy="-15" r="4" /></g>
      <g className={styles.despNode} transform="translate(510 82)"><rect x="-62" y="-30" width="124" height="60" rx="16" /><text y="-4">PLANNING</text><text className={styles.nodeValue} y="14">COUVERT</text><circle cx="47" cy="-15" r="4" /></g>
      <g className={styles.despNode} transform="translate(130 244)"><rect x="-62" y="-30" width="124" height="60" rx="16" /><text y="-4">QUALITÉ</text><text className={styles.nodeValue} y="14">CONFORME</text><circle cx="47" cy="-15" r="4" /></g>
      <g className={styles.despNode} transform="translate(510 244)"><rect x="-62" y="-30" width="124" height="60" rx="16" /><text y="-4">GESTION</text><text className={styles.nodeValue} y="14">SUIVIE</text><circle cx="47" cy="-15" r="4" /></g>
      <g className={styles.hub} transform="translate(320 160)">
        <circle className={styles.hubOuter} r="65" />
        <circle className={styles.hubRing} r="50" />
        <circle className={styles.hubCore} r="37" />
        <path d="m-13 1 9 9 19-22" />
        <text y="28">DÉCISION</text>
      </g>
    </svg>
  );
}

function SsiapScene() {
  const signalPath = 'M466 87 C428 115 401 148 350 159 S250 195 184 236';

  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <g className={styles.floorPlan}>
        <path d="M64 49H572V267H64zM252 49v82h132V49M252 267v-78h132v78M64 158h118M458 158h114" />
        <path className={styles.door} d="M182 146v24M252 120v22M384 120v22M458 146v24M252 178v22M384 178v22" />
      </g>
      <g className={styles.roomLabels}><text x="91" y="82">ZONE 01</text><text x="279" y="82">ZONE 02</text><text x="429" y="82">ZONE 03</text><text x="91" y="220">POSTE DE SÉCURITÉ</text><text x="429" y="220">ISSUE</text></g>
      <rect className={styles.scanBar} x="72" y="54" width="5" height="208" rx="3" />
      <path className={styles.signalLine} d={signalPath} />
      <g className={styles.signalPacket}><circle r="6" /><animateMotion dur="2.7s" repeatCount="indefinite" path={signalPath} /></g>
      <g className={styles.detector} transform="translate(466 87)">
        <circle className={styles.alarmRingTwo} r="40" />
        <circle className={styles.alarmRing} r="25" />
        <circle className={styles.alarmCore} r="10" />
        <path d="M-3-4h6v8h-6z" />
      </g>
      <g className={styles.controlPanel} transform="translate(184 236)"><rect x="-58" y="-27" width="116" height="54" rx="14" /><circle cx="-39" r="5" /><text x="-25" y="4">SSI · ALERTE</text></g>
      <path className={styles.evacRoute} d="M304 236H454q24 0 24-24v-10" />
      <g className={styles.exitMarker} transform="translate(478 190)"><path d="M-14-12h22v24h-22zM-2 0h20m-6-7 7 7-7 7" /></g>
    </svg>
  );
}

function VtcScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <path className={styles.vtcStreet} d="M-10 83h180l50-50M431 301v-78l78-78h142M58 301V184l52-52M290 0v83l65 65" />
      <path className={styles.routeShadow} d={vtcRoute} />
      <path className={styles.routeActive} d={vtcRoute} />
      <g className={styles.vtcPin} transform="translate(94 228)"><circle r="15" /><text y="4">1</text></g>
      <g className={styles.vtcPin} transform="translate(302 215)"><circle r="15" /><text y="4">2</text></g>
      <g className={styles.vtcPin} transform="translate(494 112)"><circle r="15" /><text y="4">3</text></g>
      <g className={styles.motionGroup}>
        <animateMotion dur="7.5s" repeatCount="indefinite" path={vtcRoute} keyPoints="0;1;1;0;0" keyTimes="0;.44;.56;.96;1" />
        <circle className={styles.vehicleHalo} r="31" />
        <g className={styles.vehicle} transform="translate(-18 -11)"><path d="M4 9 8 2h20l6 7h3a3 3 0 0 1 3 3v9H1v-9a3 3 0 0 1 3-3Z" /><circle cx="9" cy="22" r="4" /><circle cx="31" cy="22" r="4" /><path d="m10 4-3 7h26l-6-7z" /></g>
      </g>
      <g className={styles.staticGroup} transform="translate(400 177)">
        <circle className={styles.vehicleHalo} r="31" />
        <g className={styles.vehicle} transform="translate(-18 -11)"><path d="M4 9 8 2h20l6 7h3a3 3 0 0 1 3 3v9H1v-9a3 3 0 0 1 3-3Z" /><circle cx="9" cy="22" r="4" /><circle cx="31" cy="22" r="4" /><path d="m10 4-3 7h26l-6-7z" /></g>
      </g>
      <g className={styles.destination} transform="translate(553 54)"><rect x="-72" y="-29" width="144" height="58" rx="16" /><text y="-5">ARRIVÉE</text><text className={styles.nodeValue} y="15">CLIENT À BORD</text></g>
    </svg>
  );
}

const mosRoute = 'M118 226 C179 218 190 112 268 112 S365 230 442 178 S515 87 570 98';

function MosScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <g className={styles.floorPlan}>
        <path d="M222 48H600V270H222zM348 48v83M475 48v83M222 173h126M475 173h125M348 131h127v139" />
      </g>
      <g className={styles.roomLabels}>
        <text x="244" y="76">ACCÈS 01</text><text x="372" y="76">ZONE CLIENT</text><text x="499" y="76">ACCÈS 02</text>
        <text x="244" y="204">RONDE</text><text x="372" y="204">ÉQUIPE</text><text x="499" y="204">CONTRÔLE</text>
      </g>
      <path className={styles.routeShadow} d={mosRoute} />
      <path className={styles.routeActive} d={mosRoute} />
      <g className={styles.sceneNode} transform="translate(104 92)">
        <rect x="-72" y="-35" width="144" height="70" rx="18" />
        <text y="-8">PC OPÉRATIONNEL</text><text className={styles.nodeValue} y="13">PLANNING COUVERT</text><circle cx="57" cy="-20" r="4" />
      </g>
      <g className={styles.sceneNode} transform="translate(112 255)">
        <rect x="-67" y="-24" width="134" height="48" rx="14" />
        <text y="-3">MAIN COURANTE</text><text className={styles.nodeValue} y="14">À JOUR</text>
      </g>
      <g className={styles.flowPacket}>
        <animateMotion dur="7.4s" repeatCount="indefinite" path={mosRoute} keyPoints="0;1;1;0;0" keyTimes="0;.44;.56;.96;1" />
        <circle className={styles.teamHalo} r="27" />
        <path className={styles.teamIcon} d="M0-14 13-8v9c0 10-6 16-13 20C-7 17-13 11-13 1v-9Z" />
        <path className={styles.teamCheck} d="m-6 2 4 4 8-9" />
      </g>
      <g className={styles.staticMarker} transform="translate(442 178)">
        <circle className={styles.teamHalo} r="27" /><path className={styles.teamIcon} d="M0-14 13-8v9c0 10-6 16-13 20C-7 17-13 11-13 1v-9Z" /><path className={styles.teamCheck} d="m-6 2 4 4 8-9" />
      </g>
      <g className={styles.roster} transform="translate(530 242)">
        <rect x="-54" y="-21" width="108" height="42" rx="13" /><circle cx="-35" cy="0" r="6" /><circle cx="-13" cy="0" r="6" /><circle cx="9" cy="0" r="6" /><text x="33" y="4">4/4</text>
      </g>
    </svg>
  );
}

const ndrcRoute = 'M66 190 C128 103 192 103 246 168 S350 239 408 161 S512 72 578 119';

function NdrcScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <path className={styles.pipelineShadow} d={ndrcRoute} />
      <path className={styles.routeActive} d={ndrcRoute} />
      {[
        [72, 218, 'CONTACT', '+12'],
        [235, 116, 'ÉCHANGE', '+7'],
        [408, 210, 'OFFRE', '+4'],
        [570, 87, 'CLIENT', 'FIDÈLE'],
      ].map(([x, y, label, value]) => (
        <g key={label} className={styles.sceneNode} transform={`translate(${x} ${y})`}>
          <rect x="-51" y="-28" width="102" height="56" rx="15" />
          <text y="-4">{label}</text><text className={styles.nodeValue} y="15">{value}</text><circle cx="38" cy="-14" r="4" />
        </g>
      ))}
      <g className={styles.flowPacket}>
        <animateMotion dur="6.6s" repeatCount="indefinite" path={ndrcRoute} />
        <circle className={styles.contactHalo} r="24" />
        <path className={styles.messageIcon} d="M-13-10h26v18H1l-8 7V8h-6z" />
        <circle className={styles.messageDot} cx="-6" cy="-1" r="2" /><circle className={styles.messageDot} cy="-1" r="2" /><circle className={styles.messageDot} cx="6" cy="-1" r="2" />
      </g>
      <g className={styles.staticMarker} transform="translate(408 161)">
        <circle className={styles.contactHalo} r="24" /><path className={styles.messageIcon} d="M-13-10h26v18H1l-8 7V8h-6z" />
      </g>
      <g className={styles.crmPanel} transform="translate(495 253)">
        <rect x="-88" y="-32" width="176" height="64" rx="16" />
        <text x="-68" y="-11">CRM · CONVERSION</text>
        <path d="M-67 17-40 5-13 11 13-7 40 0 67-18" /><circle cx="67" cy="-18" r="4" />
      </g>
    </svg>
  );
}

const mcoRoute = 'M69 240 C118 211 126 125 193 125 S285 226 352 170';

function McoScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <g className={styles.storePlan}>
        <rect x="42" y="48" width="342" height="224" rx="24" />
        <path d="M86 83h69v54H86zM186 83h69v54h-69zM286 83h55v54h-55zM86 168h69v54H86zM186 168h69v54h-69z" />
        <text x="64" y="257">SURFACE DE VENTE</text>
      </g>
      <path className={styles.pipelineShadow} d={mcoRoute} />
      <path className={styles.routeActive} d={mcoRoute} />
      <g className={styles.flowPacket}>
        <animateMotion dur="6.8s" repeatCount="indefinite" path={mcoRoute} keyPoints="0;1;1;0;0" keyTimes="0;.44;.56;.96;1" />
        <circle className={styles.contactHalo} r="24" />
        <path className={styles.cartIcon} d="M-15-12h4l4 18h18l5-13H-8M-3 13h1m11 0h1" />
      </g>
      <g className={styles.staticMarker} transform="translate(268 202)">
        <circle className={styles.contactHalo} r="24" /><path className={styles.cartIcon} d="M-15-12h4l4 18h18l5-13H-8M-3 13h1m11 0h1" />
      </g>
      <g className={styles.kpiPanel} transform="translate(508 160)">
        <rect x="-92" y="-108" width="184" height="216" rx="24" />
        <text x="-68" y="-77">VENTES · TEMPS RÉEL</text>
        <path d="M-66 59H67M-66 19H67M-66-21H67" />
        <rect className={styles.kpiBarOne} x="-55" y="11" width="22" height="48" rx="6" />
        <rect className={styles.kpiBarTwo} x="-18" y="-14" width="22" height="73" rx="6" />
        <rect className={styles.kpiBarThree} x="19" y="-43" width="22" height="102" rx="6" />
        <rect className={styles.kpiBarFour} x="56" y="-65" width="22" height="124" rx="6" />
        <text className={styles.kpiValue} x="-68" y="88">OBJECTIF  94 %</text><circle cx="65" cy="84" r="5" />
      </g>
    </svg>
  );
}

const ciRouteOne = 'M105 166 C190 54 316 52 397 137 S521 216 585 126';
const ciRouteTwo = 'M105 166 C204 273 366 281 505 221';

function CiScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <g className={styles.globe} transform="translate(319 160)">
        <circle r="126" /><ellipse rx="58" ry="126" /><path d="M-126 0h252M-106-67h212M-106 67h212" />
      </g>
      <path className={styles.worldArc} d={ciRouteOne} />
      <path className={styles.worldArc} d={ciRouteTwo} />
      <g className={styles.flowPacket}>
        <animateMotion dur="7.2s" repeatCount="indefinite" path={ciRouteOne} />
        <circle className={styles.cargoHalo} r="24" /><rect className={styles.cargoBox} x="-14" y="-10" width="28" height="20" rx="4" /><path className={styles.cargoLine} d="M-14-3h28M-5-10v20M5-10v20" />
      </g>
      <g className={styles.flowPacket}>
        <animateMotion begin="2.4s" dur="7.2s" repeatCount="indefinite" path={ciRouteTwo} />
        <circle className={styles.cargoHalo} r="20" /><path className={styles.planeIcon} d="m-17 2 14-5 8-14 5 2-3 14 11 5-2 4L5 6-3 18l-4-2 3-12-12 2Z" />
      </g>
      <g className={styles.staticMarker} transform="translate(397 137)">
        <circle className={styles.cargoHalo} r="24" /><rect className={styles.cargoBox} x="-14" y="-10" width="28" height="20" rx="4" />
      </g>
      {[[105, 166, 'FRANCE'], [397, 137, 'EUROPE'], [585, 126, 'MARCHÉ'], [505, 221, 'LOGISTIQUE']].map(([x, y, label]) => (
        <g key={label} className={styles.worldNode} transform={`translate(${x} ${y})`}><circle r="9" /><text y="-17">{label}</text></g>
      ))}
    </svg>
  );
}

const cgRoute = 'M102 166 C177 166 177 93 254 93 S341 226 414 183 S500 108 555 108';

function CgScene() {
  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <path className={styles.pipelineShadow} d={cgRoute} />
      <path className={styles.routeActive} d={cgRoute} />
      <g className={styles.documentStack} transform="translate(91 167)">
        <rect x="-47" y="-52" width="78" height="98" rx="13" /><rect x="-34" y="-42" width="78" height="98" rx="13" />
        <text x="5" y="-15">PIÈCES</text><path d="M-17 1h43M-17 14h34M-17 27h26" />
      </g>
      <g className={styles.sceneNode} transform="translate(286 95)">
        <rect x="-61" y="-31" width="122" height="62" rx="16" /><text y="-5">ÉCRITURE</text><text className={styles.nodeValue} y="15">CONTRÔLÉE</text><circle cx="47" cy="-16" r="4" />
      </g>
      <g className={styles.sceneNode} transform="translate(406 220)">
        <rect x="-61" y="-31" width="122" height="62" rx="16" /><text y="-5">RÉVISION</text><text className={styles.nodeValue} y="15">VALIDÉE</text><circle cx="47" cy="-16" r="4" />
      </g>
      <g className={styles.flowPacket}>
        <animateMotion dur="6.9s" repeatCount="indefinite" path={cgRoute} />
        <circle className={styles.cargoHalo} r="20" /><path className={styles.ledgerIcon} d="M-10-13h20v26h-20zM-5-6h10M-5 0h10M-5 6h6" />
      </g>
      <g className={styles.staticMarker} transform="translate(414 183)"><circle className={styles.cargoHalo} r="20" /><path className={styles.ledgerIcon} d="M-10-13h20v26h-20zM-5-6h10M-5 0h10M-5 6h6" /></g>
      <g className={styles.balancePanel} transform="translate(554 173)">
        <rect x="-56" y="-88" width="112" height="176" rx="22" /><text y="-60">TABLEAU DE BORD</text>
        <circle r="35" /><path className={styles.gaugeTrack} d="M-24 15a28 28 0 0 1 48 0" /><path className={styles.gaugeNeedle} d="M0 8 18-13" /><circle cy="8" r="5" />
        <text className={styles.kpiValue} y="65">ÉQUILIBRE</text>
      </g>
    </svg>
  );
}

const despInitialRoute = 'M60 188 C120 106 181 106 235 178 S339 248 392 169 S497 81 579 134';

function DespInitialScene() {
  const steps = [
    [62, 215, 'CADRE', 'RÉGLEMENTAIRE'],
    [211, 116, 'GESTION', 'FINANCIÈRE'],
    [365, 221, 'ÉQUIPES', 'MANAGEMENT'],
    [493, 105, 'PROJET', 'D’ENTREPRISE'],
  ];

  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      <path className={styles.pipelineShadow} d={despInitialRoute} />
      <path className={styles.routeActive} d={despInitialRoute} />
      {steps.map(([x, y, label, value], index) => (
        <g key={label} className={styles.stepNode} transform={`translate(${x} ${y})`}>
          <circle r="28" /><text className={styles.stepNumber} y="4">0{index + 1}</text><text className={styles.stepLabel} y="48">{label}</text><text className={styles.stepValue} y="61">{value}</text>
        </g>
      ))}
      <g className={styles.flowPacket}>
        <animateMotion dur="7.8s" repeatCount="indefinite" path={despInitialRoute} />
        <circle className={styles.contactHalo} r="22" /><path className={styles.briefcaseIcon} d="M-15-8h30v22h-30zM-6-8v-6H6v6M-15 1h30M-3 1v4h6V1" />
      </g>
      <g className={styles.staticMarker} transform="translate(392 169)"><circle className={styles.contactHalo} r="22" /><path className={styles.briefcaseIcon} d="M-15-8h30v22h-30zM-6-8v-6H6v6M-15 1h30M-3 1v4h6V1" /></g>
      <g className={styles.certificationNode} transform="translate(580 134)">
        <circle className={styles.hubOuter} r="48" /><circle className={styles.hubRing} r="37" /><circle className={styles.hubCore} r="27" /><path d="m-9 0 6 7 14-17" /><text y="62">PILOTAGE</text>
      </g>
    </svg>
  );
}

function DespVaeScene() {
  const evidencePaths = ['M126 76 C213 76 214 142 302 154', 'M126 160 C215 160 225 160 302 160', 'M126 244 C213 244 214 178 302 166'];

  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      {evidencePaths.map((path) => <path key={path} className={styles.worldArc} d={path} />)}
      <path className={styles.pipelineShadow} d="M344 160 C407 160 430 160 486 160" />
      <path className={styles.routeActive} d="M344 160 C407 160 430 160 486 160" />
      {[[104, 76, 'EXPÉRIENCE'], [104, 160, 'MISSIONS'], [104, 244, 'RÉSULTATS']].map(([x, y, label], index) => (
        <g key={label} className={styles.evidenceCard} transform={`translate(${x} ${y})`}>
          <rect x="-67" y="-26" width="134" height="52" rx="14" /><path d="M-48-9h18v18h-18zM-20-7h66M-20 5h49" /><text y="44">PREUVE 0{index + 1} · {label}</text>
        </g>
      ))}
      {evidencePaths.map((path, index) => (
        <g key={path} className={styles.flowPacket}>
          <animateMotion begin={`${index * .8}s`} dur="4.4s" repeatCount="indefinite" path={path} />
          <circle r="5" />
        </g>
      ))}
      <g className={styles.dossierNode} transform="translate(326 160)">
        <rect x="-45" y="-58" width="90" height="116" rx="16" /><path d="M-25-31h50M-25-16h50M-25-1h42M-25 14h48" /><circle cy="34" r="12" /><path d="m-6 34 4 4 8-9" /><text y="78">DOSSIER VAE</text>
      </g>
      <g className={styles.flowPacket}>
        <animateMotion begin="1.4s" dur="4.4s" repeatCount="indefinite" path="M344 160 C407 160 430 160 486 160" />
        <circle className={styles.cargoHalo} r="19" /><path className={styles.ledgerIcon} d="M-10-13h20v26h-20zM-5-6h10M-5 0h10M-5 6h6" />
      </g>
      <g className={styles.staticMarker} transform="translate(430 160)"><circle className={styles.cargoHalo} r="19" /><path className={styles.ledgerIcon} d="M-10-13h20v26h-20zM-5-6h10M-5 0h10M-5 6h6" /></g>
      <g className={styles.juryNode} transform="translate(548 160)">
        <circle className={styles.hubOuter} r="61" /><circle className={styles.hubRing} r="48" /><circle className={styles.hubCore} r="35" /><path d="m-12 0 8 9 18-22" /><text y="78">JURY</text>
      </g>
    </svg>
  );
}

const scenes = {
  a3p: <A3pScene />,
  desp: <DespScene />,
  ssiap: <SsiapScene />,
  vtc: <VtcScene />,
  mos: <MosScene />,
  ndrc: <NdrcScene />,
  mco: <McoScene />,
  ci: <CiScene />,
  cg: <CgScene />,
  despInitial: <DespInitialScene />,
  despVae: <DespVaeScene />,
};

export function MissionAnimation({ variant, className = '', compact = false }: MissionAnimationProps) {
  const content = copy[variant];

  return (
    <div
      className={`${styles.visual} ${styles[variant]} ${compact ? styles.compact : ''} ${className}`}
      role="img"
      aria-label={content.label}
      data-mission-animation={variant}
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.topbar} aria-hidden="true">
        <span className={styles.kicker}><i className={styles.statusDot} />{content.kicker}</span>
        <span className={styles.status}>{content.status}</span>
      </div>
      <div className={styles.stage} aria-hidden="true">{scenes[variant]}</div>
      <div className={styles.footer} aria-hidden="true">
        <strong>{content.title}</strong>
        <span>{content.caption}</span>
      </div>
    </div>
  );
}
