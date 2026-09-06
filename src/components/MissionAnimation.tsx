import styles from './MissionAnimation.module.css';

type MissionAnimationVariant = 'a3p' | 'desp' | 'ssiap' | 'vtc';

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

const scenes = {
  a3p: <A3pScene />,
  desp: <DespScene />,
  ssiap: <SsiapScene />,
  vtc: <VtcScene />,
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
