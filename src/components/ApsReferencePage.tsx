import { serializeCourseJsonLd } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ApsSectionNavigation } from '@/components/ApsSectionNavigation';
import { TrainingMotionIllustration } from '@/components/TrainingMotionGallery';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import { getSessionSeatAvailability } from '@/lib/session-seat-availability';
import styles from './ApsReferencePage.module.css';

const apsCpfUrl = 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/84089988400026_CQPAPS2022/84089988400026_CQPAPS2022?contexteFormation=ACTIVITE_PROFESSIONNELLE';
const identityNumeriqueUrl = 'https://lidentitenumerique.laposte.fr/';
const apsRegistrationFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const apsContact = (subject = 'inscription') => `/contact?formation=aps&objet=${encodeURIComponent(subject)}`;

const fallbackSessions = [
  { id: 'aps-septembre-2026', startDate: '2026-09-07T00:00:00.000Z', endDate: '2026-10-09T00:00:00.000Z', examDate: '2026-10-12T00:00:00.000Z', status: 'OPEN', seatsLeft: 3, showSeatsLeft: true, location: 'Puget-sur-Argens', priceLabel: '1 650 €' },
  { id: 'aps-novembre-2026', startDate: '2026-11-03T00:00:00.000Z', endDate: '2026-12-08T00:00:00.000Z', examDate: '2026-12-09T00:00:00.000Z', status: 'OPEN', seatsLeft: 6, showSeatsLeft: true, location: 'Puget-sur-Argens', priceLabel: '1 650 €' },
];

const heroFacts = [
  ['Certification', 'TFP APS', 'Titre à finalité professionnelle'],
  ['Niveau', 'Niveau 3', 'RNCP 36648'],
  ['Format', '51 h', 'à distance'],
  ['École', '124 h', 'en présentiel à Puget'],
  ['Secourisme', 'SST inclus', 'dans le parcours'],
  ['Agrément', 'ADEF', '8320032701'],
];

const missions = [
  ['◉', 'Surveillance générale', 'Observer, prévenir et sécuriser les personnes, les biens et les espaces.', true],
  ['⇥', 'Contrôle d’accès', 'Filtrer les entrées, orienter le public et appliquer les consignes du site.', false],
  ['↻', 'Rondes de sécurité', 'Identifier les anomalies, contrôler les installations et rendre compte.', false],
  ['△', 'Prévention des risques', 'Repérer les situations dangereuses et adopter les bons réflexes.', false],
  ['!', 'Gestion des incidents', 'Alerter, protéger et réagir avec calme, méthode et proportion.', false],
  ['✚', 'Secours aux personnes', 'Porter assistance dans le cadre des compétences du SST.', false],
];

const apsVisualDescriptions = {
  patrol: 'Animation d’un agent effectuant une ronde autour d’un bâtiment',
  night: 'Animation d’une lampe balayant un site pendant une surveillance de nuit',
  access: 'Animation d’un agent vérifiant un badge devant une barrière de contrôle',
  video: 'Animation d’un écran de vidéoprotection affichant quatre zones surveillées',
  report: 'Animation d’un compte rendu complété après une observation',
  alert: 'Animation d’une radio transmettant une alerte depuis le terrain',
  baggage: 'Illustration animée d’un bagage et d’un contrôle visuel à la loupe',
  patdown: 'Illustration animée d’un agent et des zones de contrôle d’une palpation encadrée',
} as const;

type ApsVisualStoryKind = keyof typeof apsVisualDescriptions;
type ApsPracticalVisualKind = ApsVisualStoryKind | 'extinguisher' | 'cpr';

const audiences = ['Reconversion professionnelle', 'Demandeurs d’emploi', 'Salariés en évolution', 'Débutants motivés', 'Futurs titulaires CNAPS', 'Projet APS + SSIAP 1'];

const prerequisites = [
  ['Autorisation préalable CNAPS', 'Obligatoire avant l’entrée en formation, sauf carte professionnelle valide.'],
  ['Français et principes de la République', 'Justifier d’une connaissance suffisante de la langue française et attester de la connaissance des principes de la République.'],
  ['Conditions de moralité', 'L’autorisation et la future carte professionnelle sont soumises aux vérifications et à l’enquête administrative du CNAPS.'],
  ['Ressortissants étrangers', 'La fiche RNCP prévoit un titre de séjour détenu depuis au moins cinq ans pour demander l’autorisation préalable, sous réserve des règles applicables à chaque situation.'],
  ['Pièce d’identité valide', 'Carte nationale d’identité, passeport ou titre admis en cours de validité.'],
  ['Justificatif de domicile récent', 'Document récent nécessaire à la préparation du dossier administratif.'],
];

const cnapsSteps = ['Échange conseiller', 'Vérification du dossier', 'Demande CNAPS', 'Admission confirmée'];

const program = [
  ['UV 1', 'SST — Secours à personne', '14 h', 'Présentiel · 7 h de pratique', 'Situer le cadre de l’intervention, protéger, examiner, alerter et secourir, puis contribuer à la prévention des risques professionnels.'],
  ['UV 2', 'Environnement juridique', '22 h', '20 h à distance · 1 h de pratique', 'Livre VI du Code de la sécurité intérieure, déontologie et secret professionnel, responsabilités civiles et pénales, légitime défense, état de nécessité, article 73, libertés publiques, CNIL, droit de propriété, principes de la République et convention collective.'],
  ['UV 3', 'Gestion des conflits', '14 h', '3 h à distance · 7 h de pratique', 'Origines et types de conflits, émotions, techniques verbales, posture, évaluation de la dangerosité, résolution et gestion des conséquences au travers de mises en situation.'],
  ['UV 4', 'Module stratégique', '7 h', '4 h à distance', 'Comprendre, transmettre et restituer les consignes, rédiger un rapport circonstancié, utiliser les outils informatiques et exploiter une main courante électronique.'],
  ['UV 5', 'Prévention des risques d’incendie', '7 h', 'Présentiel · 3 h de pratique', 'Phénomène de l’incendie, alarmes, évacuation, mise en sécurité, accueil des secours et manipulation des moyens de première intervention sur feu réel.'],
  ['UV 6', 'Appréhension dans le cadre du métier', '7 h', '3 h à distance', 'Appliquer l’article 73 du Code de procédure pénale et appréhender une personne dans le strict respect des textes et des missions confiées à l’agent APS.'],
  ['UV 7', 'Prévention des risques terroristes', '13 h', '7 h à distance · 3,5 h de pratique', 'Identifier les menaces et matériels, détecter les comportements suspects, se protéger, protéger les autres, alerter, faciliter l’intervention des forces de l’ordre et appliquer les premières notions de secourisme tactique.'],
  ['UV 8', 'Module professionnel', '45 h', 'Présentiel · 25 h de pratique', 'Accueil et communication, préparation d’une intervention, préservation des traces et indices, contrôle des personnes, véhicules, objets et matériels, prise en compte du poste de sécurité et rondes de surveillance.'],
  ['UV 9', 'Palpation et inspection des bagages', '7 h', 'Présentiel · 4 h de pratique', 'Cadre légal, agréments et sanctions, point d’inspection-filtrage, découverte d’un objet prohibé, prise en compte des mineurs et des personnes en situation de handicap, palpation et inspection visuelle.'],
  ['UV 10', 'Surveillance électronique', '7 h', 'Présentiel · 4 h de pratique', 'Cadres juridiques de la télésurveillance et de la vidéoprotection, chaîne de télésécurité et principes d’installation d’un système de vidéoprotection.'],
  ['UV 11', 'Gestion des risques', '11 h', '2 h à distance · 5 h de pratique', 'Alarmes intrusion et incendie, levée de doute, accueil des secours, GTC/GTB, protection du travailleur isolé, PTI/DATI et sensibilisation au risque électrique.'],
  ['UV 12', 'Événementiel spécifique', '7 h', '7 h à distance', 'Cadre légal des rassemblements, sécurisation des événements, acteurs et publics, zones d’accès, filtrage, billetterie, fraude, mouvements de foule et procédures d’urgence.'],
  ['UV 13', 'Situations conflictuelles dégradées', '7 h', 'Présentiel · 4 h de pratique', 'Comprendre et maîtriser le stress, récupérer après l’événement et agir de manière actuelle, nécessaire et proportionnée face à une agression.'],
  ['UV 14', 'Risques industriels', '7 h', '5 h à distance', 'Évaluation des risques professionnels, document unique, ICPE, SEVESO, ORSEC, équipements de protection, produits dangereux, SGH, CLP et zones ATEX.'],
];

const examSteps = [
  ['01', 'QCU contextualisés', 'Questionnaires à choix unique organisés électroniquement à partir d’une banque de plus de 1 000 questions régulièrement actualisée.'],
  ['02', 'Mise en situation n° 1', 'Épreuve individuelle portant notamment sur une ronde, la détection d’anomalies et le compte rendu.'],
  ['03', 'Mise en situation n° 2', 'Épreuve individuelle au poste de contrôle, face à un événement ou à un incident professionnel.'],
  ['04', 'Jury professionnel', 'Au minimum un représentant salarié et un représentant employeur justifiant chacun d’au moins deux années d’exercice dans le domaine.'],
];

const practicalExercises = [
  ['↻', 'Rondes de sécurité', 'Préparer une ronde, suivre un itinéraire, repérer les anomalies, effectuer une levée de doute et transmettre un compte rendu exploitable.', ['patrol', 'night']],
  ['✋', 'Palpation de sécurité', 'Apprendre les gestes professionnels, le positionnement, le consentement et le cadre légal applicable, au travers d’exercices encadrés.', ['patdown']],
  ['⌕', 'Inspection visuelle des bagages', 'Contrôler méthodiquement sacs et bagages dans le respect des droits des personnes et des consignes du site.', ['baggage']],
  ['⇥', 'Contrôle d’accès et gestion des flux', 'Vérifier les accès, badges et autorisations, accueillir le public et gérer une file ou un refus d’accès avec professionnalisme.', ['access']],
  ['⌁', 'Poste de sécurité', 'Utiliser la main courante, recevoir une alarme, appliquer les consignes, communiquer par radio et coordonner une intervention.', ['video', 'report']],
  ['!', 'Incidents et conflits', 'Réagir face à une anomalie, un comportement agressif ou une situation dégradée en gardant calme, distance et proportion.', ['alert']],
  ['♨', 'Prévention incendie', 'Identifier un risque, effectuer une levée de doute, donner l’alerte, participer à l’évacuation et accueillir les secours.', ['extinguisher']],
  ['✚', 'Secours aux personnes', 'Mettre en œuvre les gestes appris pendant le SST lors de mises en situation proches du terrain.', ['cpr']],
] as const satisfies ReadonlyArray<readonly [string, string, string, readonly ApsPracticalVisualKind[]]>;

const enrollmentSteps = [
  ['01', 'Planifiez votre premier rendez-vous', 'Appelez-nous au 04 22 47 07 68 pour convenir d’un rendez-vous téléphonique. Lors de ce RDV, nous prendrons le temps de comprendre votre projet de formation et de vous guider dans les démarches à accomplir.'],
  ['02', 'Échangeons sur votre projet', 'Lors de ce premier entretien, nous abordons ensemble tous les détails pratiques, le calendrier, l’organisation de la formation et les prérequis liés à votre situation.'],
  ['03', 'Créez votre Identité Numérique', 'Si vous souhaitez utiliser votre compte CPF ou demandez un financement à France Travail, vous devez créer votre Identité Numérique La Poste afin de sécuriser et valider vos démarches en ligne.'],
  ['04', 'Finalisons votre inscription', 'Lors d’un second entretien téléphonique, nous finalisons ensemble votre inscription : mise en place du financement et démarches administratives.'],
  ['05', 'Recevez votre convocation officielle', 'Dès que tout est finalisé, votre inscription est confirmée et nous vous envoyons votre convocation officielle en formation.'],
];

const financingOptions = [
  ['CPF', 'Mobilisez vos droits disponibles depuis Mon Compte Formation. Préparez votre Identité Numérique La Poste avant la validation de votre inscription.'],
  ['France Travail', 'Votre conseiller peut étudier une prise en charge selon votre projet professionnel. Nous préparons la demande avec vous lors du second rendez-vous téléphonique.'],
  ['Employeur ou OPCO', 'La formation peut être financée dans le cadre d’un projet de recrutement, d’une évolution professionnelle ou du plan de développement des compétences.'],
  ['Financement personnel', 'Vous financez directement votre parcours. Des facilités de paiement peuvent être étudiées avec notre équipe selon votre dossier.'],
];

const jobs = [
  ['◉', 'Agent de prévention et de sécurité'],
  ['⌁', 'Agent de surveillance et de gardiennage'],
  ['◆', 'Agent de sécurité privée'],
  ['↻', 'Agent rondier en sécurité privée'],
  ['⌖', 'Agent d’intervention mobile en sécurité privée'],
  ['✈', 'Agent de sécurité pré-vol'],
  ['★', 'Agent de sécurité événementielle'],
  ['▣', 'Agent de sécurité arrière-caisse'],
  ['⇥', 'Agent de contrôle d’accès'],
  ['▦', 'Opérateur de vidéoprotection selon poste et habilitations'],
];
const workplaces = ['Commerces et grande distribution', 'Centres commerciaux', 'Bureaux et services internes', 'Hôtels et hébergements', 'Sites industriels', 'Entrepôts et plateformes logistiques', 'Transports', 'Événements', 'Établissements de santé et de soins', 'Chantiers', 'Résidences', 'Parkings', 'Sites culturels et de loisirs'];

const workConditions = [
  'Activité possible 24 h/24 et 7 j/7, de nuit, le week-end et les jours fériés',
  'Poste fixe, poste de sécurité, rondes ou interventions en mobilité',
  'Travail sous la responsabilité d’un chef de poste, chef d’équipe ou responsable d’exploitation',
  'Port d’une tenue professionnelle obligatoire, sauf exception réglementaire',
  'Utilisation possible d’un dispositif de protection du travailleur isolé PTI/DATI',
  'Relations régulières avec le public, la police, la gendarmerie, les pompiers et les équipes d’intervention',
];

const nationalStats = [
  ['2020', '7 560 certifiés', '91 %', '79 %', '65 %'],
  ['2019', '7 487 certifiés', '94 %', '87 %', '76 %'],
];

const faq = [
  { q: 'Faut-il une autorisation CNAPS avant d’entrer en formation ?', a: 'Oui, sauf si vous possédez déjà une carte professionnelle en cours de validité pour l’activité concernée. Intégrale Academy vous accompagne dans la préparation et le dépôt de la demande.' },
  { q: 'La formation APS est-elle entièrement à distance ?', a: 'Non. Sur les 175 heures, 51 heures sont réalisées à distance et 124 heures se déroulent en présentiel à Puget-sur-Argens. L’examen est obligatoirement organisé en présentiel.' },
  { q: 'Quelle est la part de pratique ?', a: 'Le programme prévoit 63,5 heures de pratique et 60,5 heures de théorie en présentiel. Les 51 heures restantes sont réalisées à distance.' },
  { q: 'Le e-learning est-il obligatoire ?', a: 'Oui lorsqu’il est prévu dans le calendrier de la session. Il représente 51 heures, doit être suivi et validé, et la progression est contrôlée par l’équipe pédagogique.' },
  { q: 'Comment se déroule l’examen APS ?', a: 'L’examen associe des QCU contextualisés organisés électroniquement et deux mises en situation professionnelles individuelles, notamment autour de la ronde et du poste de contrôle.' },
  { q: 'La formation permet-elle d’obtenir directement la carte professionnelle ?', a: 'La réussite permet d’obtenir le TFP APS, qui justifie l’aptitude professionnelle. Vous devez ensuite déposer une demande de carte professionnelle auprès du CNAPS.' },
  { q: 'Quelles conditions concernent les ressortissants étrangers ?', a: 'La fiche RNCP indique qu’un ressortissant étranger doit être titulaire d’un titre de séjour depuis au moins cinq ans pour demander l’autorisation préalable. L’équipe vérifie les règles et pièces applicables à chaque situation.' },
  { q: 'Quel est le prix de la formation ?', a: 'Le tarif affiché est de 1 650 €. Retrouvez le prix dans la carte Tarif et les dates et places disponibles dans les cartes de session.' },
  { q: 'Puis-je financer la formation avec mon CPF ?', a: 'Oui, selon votre éligibilité et l’offre active. France Travail, un employeur, un OPCO ou un paiement personnel peuvent également être étudiés.' },
  { q: 'Le SST est-il inclus ?', a: 'Oui. Le parcours comprend la préparation au certificat Sauveteur Secouriste du Travail.' },
  { q: 'Une expérience dans la sécurité est-elle obligatoire ?', a: 'Non. La formation est accessible aux débutants qui remplissent les conditions administratives et linguistiques réglementaires.' },
];

function formatDate(value?: string | null, compact = false) {
  if (!value) return 'À confirmer';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value)).replace(/^0/, compact ? '' : '0');
}

function sessionHref() {
  return apsRegistrationFormUrl;
}

function isSessionFull(session: any) {
  const seats = session?.seatsLeft;
  const hasSeatCount = seats !== null && seats !== undefined && seats !== '';
  return session?.status === 'FULL' || (hasSeatCount && Number(seats) === 0);
}

function priceLabel(value: unknown) {
  if (typeof value === 'number') return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  const text = String(value || '1 650 €').trim();
  return /^\d+(?:[.,]\d+)?$/.test(text) ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(text.replace(',', '.'))) : text;
}

function sortSessionsChronologically(sessions: any[]) {
  const timestamp = (value?: string | Date | null) => {
    if (!value) return Number.POSITIVE_INFINITY;
    const time = new Date(value).getTime();
    return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time;
  };

  return sessions
    .map((session, index) => ({ session, index, startTime: timestamp(session?.startDate) }))
    .sort((a, b) => a.startTime - b.startTime || a.index - b.index)
    .map(({ session }) => session);
}

function CTA({ href, children, variant = 'dark', className = '', external = false }: { href: string; children: ReactNode; variant?: 'dark' | 'gold' | 'light' | 'outline' | 'blue'; className?: string; external?: boolean }) {
  const variantStyles = {
    dark: 'bg-academy-ink text-white hover:bg-black',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
    blue: 'bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:brightness-105',
  };
  const focusStyle = variant === 'blue' ? 'focus-visible:ring-blue-300/55' : 'focus-visible:ring-academy-gold/30';
  const classNames = `${styles.cta} inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 ${focusStyle} ${variantStyles[variant]} ${className}`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={classNames}>{children}</a>;
  return <Link href={href} className={classNames}>{children}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-blue-300' : 'text-blue-700'}`}>{children}</p>;
}

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'stone' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] text-academy-ink' : tone === 'stone' ? 'bg-[#EFE7D9] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${styles.section} ${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-24`}><div className="page-container"><div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16"><div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className={`${styles.sectionHeading} mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl`}>{title}</h2></div>{intro && <div className={`${styles.sectionIntro} max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}</div>{children}</div></section>;
}

function ApsStoryIllustration({ kind }: { kind: ApsVisualStoryKind }) {
  const description = apsVisualDescriptions[kind];
  const visual = (() => {
    if (kind === 'baggage') return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <rect x="38" y="166" width="244" height="11" rx="5" fill="#9ec4f4" />
      <path d="M49 178v19M270 178v19" stroke="#172233" strokeWidth="6" strokeLinecap="round" />
      <g className={styles.storyBag}>
        <path d="M94 92V78c0-18 13-29 29-29h33c16 0 29 11 29 29v14" fill="none" stroke="#172233" strokeWidth="7" />
        <rect x="68" y="87" width="148" height="77" rx="16" fill="#2f70db" />
        <path d="M79 108h126M91 90v68M191 90v68" stroke="#9ec4f4" strokeWidth="3" />
        <rect x="108" y="122" width="67" height="27" rx="7" fill="#fff" />
      </g>
      <g className={styles.storyBagCheck}>
        <circle cx="227" cy="77" r="31" fill="#fff" stroke="#172233" strokeWidth="6" />
        <path d="m249 100 23 23" stroke="#172233" strokeWidth="11" strokeLinecap="round" />
        <path d="m213 78 10 10 19-23" fill="none" stroke="#2f70db" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>;

    if (kind === 'patdown') return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <circle cx="199" cy="43" r="15" fill="#172233" />
      <path d="M199 64v72M199 75l-45 20M199 75l44 20M199 136l-24 52M199 136l24 52" fill="none" stroke="#9ec4f4" strokeWidth="14" strokeLinecap="round" />
      <g className={styles.storyPatdownAgent}>
        <circle cx="86" cy="61" r="14" fill="#172233" />
        <path d="M68 91c3-15 9-21 18-21s15 6 18 21l4 49H65z" fill="#2f70db" />
        <path d="m75 140-5 49M94 140l7 49" stroke="#172233" strokeWidth="9" strokeLinecap="round" />
        <path d="m100 92 38 19 33-8" fill="none" stroke="#2f70db" strokeWidth="11" strokeLinecap="round" />
        <path d="m74 90 45 42 51-4" fill="none" stroke="#2f70db" strokeWidth="11" strokeLinecap="round" />
      </g>
      <g className={styles.storyPatdownZones} fill="none" stroke="#2f70db" strokeWidth="2.5" strokeDasharray="4 5">
        <circle cx="199" cy="99" r="18" /><circle cx="187" cy="160" r="13" />
      </g>
      <rect x="243" y="26" width="49" height="32" rx="10" fill="#fff" /><path d="m256 42 7 7 14-16" fill="none" stroke="#2f70db" strokeWidth="4" strokeLinecap="round" />
    </svg>;

    if (kind === 'patrol') return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <g className={styles.storyBuilding}>
        <rect x="164" y="39" width="116" height="104" rx="5" fill="#fff" stroke="#8bb8f2" strokeWidth="3" />
        <rect x="164" y="39" width="116" height="12" rx="5" fill="#2f70db" />
        <rect x="181" y="68" width="22" height="19" rx="3" fill="#c8dcf8" />
        <rect x="212" y="68" width="22" height="19" rx="3" fill="#c8dcf8" />
        <rect x="243" y="68" width="22" height="19" rx="3" fill="#c8dcf8" />
        <rect x="181" y="96" width="22" height="19" rx="3" fill="#c8dcf8" />
        <rect x="212" y="96" width="22" height="19" rx="3" fill="#c8dcf8" />
        <rect x="243" y="96" width="22" height="19" rx="3" fill="#c8dcf8" />
        <rect x="239" y="119" width="25" height="24" rx="2" fill="#172233" />
      </g>
      <g className={styles.storyPatrolAgent}>
        <circle cx="83" cy="74" r="13" fill="#172233" />
        <path d="M73 72c5-7 15-7 20 0" fill="none" stroke="#fff" strokeOpacity=".55" strokeLinecap="round" />
        <path d="M65 101c3-13 9-20 18-20s16 7 19 20l11 24-12 5-9-20-2 38H76l-2-38-8 20-12-5z" fill="#2f70db" />
        <path d="m73 85 10 14 11-14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M77 148l-3 31M89 148l4 31" stroke="#172233" strokeWidth="9" strokeLinecap="round" />
      </g>
      <path className={styles.storyRoute} d="M34 181H246" fill="none" stroke="#2f70db" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 10" />
      <g className={styles.storyMapPin}>
        <path d="M270 154c-12 0-20 8-20 19 0 15 20 32 20 32s20-17 20-32c0-11-8-19-20-19z" fill="#2f70db" />
        <circle cx="270" cy="173" r="6" fill="#fff" />
      </g>
    </svg>;

    if (kind === 'night') return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <circle cx="160" cy="105" r="88" fill="none" stroke="#9ec4f4" strokeOpacity=".42" strokeWidth="2" />
      <circle cx="160" cy="105" r="76" fill="none" stroke="#9ec4f4" strokeOpacity=".28" />
      <g className={styles.storyNightBeam}>
        <path d="M111 92 247 43v123L111 111z" fill="#2f70db" fillOpacity=".15" />
        <rect x="43" y="86" width="75" height="30" rx="10" fill="#172233" />
        <path d="M55 101h35" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <rect x="102" y="78" width="30" height="46" rx="8" fill="#2f70db" />
      </g>
      <g className={styles.storyNightBuilding}>
        <rect x="202" y="72" width="77" height="73" rx="4" fill="#fff" stroke="#9ec4f4" strokeWidth="2" />
        <rect x="202" y="72" width="77" height="8" rx="4" fill="#2f70db" />
        <rect x="215" y="91" width="14" height="13" rx="2" fill="#c8dcf8" />
        <rect x="237" y="91" width="14" height="13" rx="2" fill="#c8dcf8" />
        <rect x="259" y="91" width="10" height="13" rx="2" fill="#c8dcf8" />
        <rect x="215" y="113" width="14" height="13" rx="2" fill="#c8dcf8" />
        <rect x="237" y="113" width="14" height="13" rx="2" fill="#c8dcf8" />
        <rect x="249" y="126" width="17" height="19" rx="2" fill="#172233" />
      </g>
      <path d="M48 174H272" stroke="#9ec4f4" strokeWidth="3" strokeLinecap="round" />
    </svg>;

    if (kind === 'access') return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <g className={styles.storyAccessAgent}>
        <circle cx="65" cy="76" r="12" fill="#172233" />
        <path d="M56 73c5-6 14-6 18 0" fill="none" stroke="#fff" strokeOpacity=".55" strokeLinecap="round" />
        <path d="M49 104c3-14 8-20 16-20 9 0 14 6 17 20l9 22-11 5-8-18-2 36H58l-2-36-7 18-11-5z" fill="#2f70db" />
        <path d="M59 149l-3 27M69 149l3 27" stroke="#172233" strokeWidth="8" strokeLinecap="round" />
      </g>
      <g className={styles.storyAccessGate}>
        <rect x="144" y="48" width="45" height="126" rx="8" fill="#172233" />
        <rect x="199" y="48" width="45" height="126" rx="8" fill="#172233" />
        <rect x="153" y="61" width="27" height="37" rx="4" fill="#fff" />
        <circle className={styles.storyAccessSignal} cx="166.5" cy="78" r="7" fill="#2f70db" />
        <g className={styles.storyAccessArm}>
          <rect x="154" y="118" width="98" height="6" rx="3" fill="#2f70db" />
        </g>
      </g>
      <g className={styles.storyAccessBadge}>
        <rect x="262" y="70" width="39" height="55" rx="7" fill="#fff" />
        <circle cx="281.5" cy="87" r="7" fill="#2f70db" />
        <path d="M272 104h19M276 112h11" stroke="#9ec4f4" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>;

    if (kind === 'video') return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <g className={styles.storyMonitor}>
        <rect x="39" y="25" width="242" height="143" rx="12" fill="#172233" />
        <rect x="47" y="34" width="226" height="124" rx="5" fill="#fff" />
        {[0, 1, 2, 3].map(index => {
          const x = index % 2 === 0 ? 55 : 166;
          const y = index < 2 ? 43 : 101;
          return <g key={index}>
            <rect x={x} y={y} width="99" height="49" rx="2" fill="#d8e7fa" />
            <polyline className={styles.storyVideoTrace} points={`${x + 8},${y + 39} ${x + 28},${y + 13} ${x + 46},${y + 30} ${x + 68},${y + 22} ${x + 91},${y + 40}`} fill="none" stroke="#2f70db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>;
        })}
        <path d="M160 168v18M139 188h42" stroke="#172233" strokeWidth="7" strokeLinecap="round" />
      </g>
      <rect className={styles.storyVideoScan} x="49" y="34" width="34" height="124" fill="#7dd3fc" fillOpacity=".13" />
    </svg>;

    if (kind === 'report') return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <g className={styles.storyClipboard}>
        <rect x="111" y="22" width="151" height="166" rx="12" fill="#fff" stroke="#9ec4f4" strokeWidth="5" />
        <rect x="156" y="14" width="60" height="20" rx="7" fill="#2f70db" />
        <path d="M129 57h116" stroke="#9ec4f4" strokeWidth="2" />
        <text x="129" y="49" fill="#172233" fontSize="13" fontWeight="900">COMPTE RENDU</text>
        {[0, 1, 2].map(index => <g key={index} className={styles.storyReportRow} style={{ animationDelay: `${index * .35}s` }}>
          <circle cx="136" cy={83 + index * 34} r="8" fill="#2f70db" />
          <path d={`m132 ${83 + index * 34} 3 3 5-7`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path className={styles.storyReportLine} d={`M157 ${80 + index * 34}h76M157 ${89 + index * 34}h48`} stroke="#9ec4f4" strokeWidth="3" strokeLinecap="round" />
        </g>)}
      </g>
      <g className={styles.storyObserverCard}>
        <rect x="34" y="107" width="112" height="67" rx="11" fill="#2f70db" />
        <text x="49" y="133" fill="#fff" fontSize="12" fontWeight="900">OBSERVER</text>
        <path d="M49 148h67M49 158h54" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>;

    return <svg className={styles.storySvg} viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <g className={styles.storyAlertWaves} fill="none" stroke="#2f70db" strokeLinecap="round">
        <path d="M88 74c-16 15-16 47 0 62" strokeWidth="4" />
        <path d="M69 58c-27 25-27 68 0 94" strokeWidth="3" strokeOpacity=".55" />
        <path d="M232 74c16 15 16 47 0 62" strokeWidth="4" />
        <path d="M251 58c27 25 27 68 0 94" strokeWidth="3" strokeOpacity=".55" />
      </g>
      <g className={styles.storyRadio}>
        <path d="M179 39 199 14" stroke="#172233" strokeWidth="7" strokeLinecap="round" />
        <rect x="115" y="38" width="91" height="145" rx="18" fill="#172233" />
        <rect x="130" y="57" width="61" height="43" rx="8" fill="#d8e7fa" />
        <circle cx="160.5" cy="78.5" r="12" fill="#2f70db" />
        <path d="M153 79h15" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <rect x="134" y="118" width="53" height="8" rx="4" fill="#2f70db" />
        <rect x="134" y="136" width="35" height="7" rx="3.5" fill="#9ec4f4" />
        <circle className={styles.storyRadioButton} cx="175" cy="153" r="12" fill="#2f70db" />
      </g>
      <g className={styles.storyAlertBadge}>
        <circle cx="239" cy="46" r="22" fill="#fff" stroke="#9ec4f4" strokeWidth="3" />
        <path d="M239 34v15" stroke="#2f70db" strokeWidth="5" strokeLinecap="round" />
        <circle cx="239" cy="57" r="2.8" fill="#2f70db" />
      </g>
    </svg>;
  })();

  return <div className={styles.storyVisual} data-story={kind} role="img" aria-label={description}>{visual}</div>;
}

function ApsPracticalVisual({ kind }: { kind: ApsPracticalVisualKind }) {
  if (kind === 'extinguisher') return <TrainingMotionIllustration kind="extinguisher" theme="red" description="Animation d’un extincteur rouge et du contrôle de son indicateur pour la prévention incendie" />;
  if (kind === 'cpr') return <TrainingMotionIllustration kind="cpr" description="Animation de compressions thoraciques sur une personne allongée pour les gestes de secours SST" />;
  return <ApsStoryIllustration kind={kind} />;
}

function CompactAssistant() {
  return <div className="mt-3"><OrientationAssistant initialFormationKey="aps" hideInfoAction variant="modalTrigger" /></div>;
}

function HeroSession({ session }: { session: any }) {
  const full = isSessionFull(session);
  const seatAvailability = getSessionSeatAvailability(session, 12);
  return <aside className={`${styles.sessionCard} rounded-[2rem] border border-white/80 bg-[#FFFDF8] p-5 text-academy-ink sm:p-6 lg:p-7`}><div className="grid gap-6 lg:grid-cols-[1.05fr_1.15fr_.9fr] lg:items-center"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-blue-50 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-blue-800 ring-1 ring-blue-200">Prochaine session</span><span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${seatAvailability.badgeClassName}`}>{seatAvailability.label}</span></div><h2 className={`${styles.sessionDate} mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl`}>{formatDate(session?.startDate, true)} <span className="text-yellow-600">→</span><br />{formatDate(session?.endDate, true)}</h2><p className="mt-2 text-sm font-extrabold text-academy-muted">Examen final le {formatDate(session?.examDate, true)}</p></div><div className="grid grid-cols-2 gap-2.5">{[['Durée', '175 heures'], ['Tarif', priceLabel(session?.priceLabel)], ['Lieu', session?.location || 'Puget-sur-Argens'], ['Format', 'Hydrique (Distanciel + Présentiel)']].map(([key, value]) => <div key={key} className={`${styles.metric} rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5`}><p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p><p className="mt-1 text-sm font-black sm:text-base">{value}</p></div>)}</div><div><CTA href={sessionHref()} variant={full ? 'light' : 'dark'} className="w-full">{full ? 'Être alerté de la prochaine session' : 'Réserver ma place →'}</CTA><p className="mt-3 text-center text-xs font-bold text-academy-muted">Un conseiller vérifie votre dossier avant validation.</p><CompactAssistant /></div></div></aside>;
}

export function ApsReferencePage({ sessions }: { sessions: any[] }) {
  const visibleSessions = sortSessionsChronologically(sessions.length ? sessions : fallbackSessions);
  const next = visibleSessions[0];
  return <main className={`${styles.page} relative pb-24 lg:pb-0`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Agent de Prévention et de Sécurité APS', description: 'Formation TFP APS de 175 heures à Puget-sur-Argens : 124 heures en présentiel, dont 63,5 heures de pratique et 60,5 heures de théorie, et 51 heures à distance.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'APS', item: '/formations-securite/aps' }] },
    ] }, "/formations-securite/aps") }} />

    <section className={`${styles.hero} relative px-4 text-white`}>
      <Image src="/images/aps/aps-hero-round.jpg" alt="Exercice pratique de ronde de sécurité pendant la formation APS" fill priority sizes="100vw" className={styles.heroPhoto}/>
      <div className={styles.heroOverlay}/>
      <div className="page-container relative flex items-center py-10 sm:py-12 lg:py-14">
        <div className="max-w-4xl">
          <span className={`${styles.heroBadge} inline-flex items-center gap-2 rounded-full border border-blue-300/45 bg-blue-950/35 px-4 py-2 text-[.68rem] font-black uppercase tracking-[.2em] text-blue-100 backdrop-blur-md`}>
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,.95)]"/>
            TFP APS · RNCP 36648 · niveau 3
          </span>
          <h1 className={`${styles.heroTitle} mt-7 max-w-4xl text-[2.65rem] font-black leading-[.98] tracking-[-.055em] sm:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.15rem]`}>
            Formation agent de prévention et de sécurité
          </h1>
          <p className={`${styles.heroTagline} mt-5 max-w-3xl text-2xl font-black tracking-[-.035em] text-white sm:text-3xl`}>
            Apprenez le métier <span className={styles.heroTitleAccent}>sur le terrain.</span>
          </p>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/78 sm:text-xl">Rondes, contrôle d’accès, palpation, inspection des bagages et gestion d’incidents&nbsp;: entraînez-vous aux situations que vous rencontrerez réellement en poste.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTA href={apsContact('démarrer mon projet')} variant="blue">Je démarre mon projet</CTA>
            <CTA href="tel:0422470768" variant="outline">Parler à un conseiller</CTA>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-white/80">
            <span className="rounded-full border border-blue-200/25 bg-blue-950/25 px-3 py-2 backdrop-blur">✓ 175 heures</span>
            <span className="rounded-full border border-blue-200/25 bg-blue-950/25 px-3 py-2 backdrop-blur">✓ SST inclus</span>
            <span className="rounded-full border border-blue-200/25 bg-blue-950/25 px-3 py-2 backdrop-blur">✓ CNAPS accompagné</span>
            <span className="rounded-full border border-blue-200/25 bg-blue-950/25 px-3 py-2 backdrop-blur">✓ Financements possibles</span>
          </div>
        </div>
      </div>
      <div className="page-container mt-auto"><div className={`${styles.facts} relative grid overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#0A1421]/85 text-white backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-6`}>
        {heroFacts.map(([key,value,detail]) => <div key={key} className={`${styles.fact} border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0`}><p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p><p className="mt-1 font-black text-white">{value}</p><p className="mt-1 text-[.68rem] font-semibold leading-4 text-white/48">{detail}</p></div>)}
      </div></div>
    </section>

    <section className={`${styles.heroSessionSection} relative z-20 px-4 pb-8`}><div className="page-container"><HeroSession session={next}/></div></section>

    <ApsSectionNavigation registrationHref={apsRegistrationFormUrl} />

    <Section id="metier" eyebrow="01 — Le métier" title={<>Un métier de terrain, de vigilance et de sang-froid.</>} intro={<>L’agent APS prévient les risques, protège les personnes et les biens, applique les consignes et rend compte de chaque événement.</>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">{missions.map(([icon,title,text,featured],index) => <article key={String(title)} className={`${styles.liftCard} ${index === 0 || index === 4 ? 'lg:col-span-5' : index === 1 || index === 3 ? 'lg:col-span-3' : 'lg:col-span-4'} rounded-[1.8rem] border p-6 shadow-soft ${featured ? 'border-[#26384F] bg-[#0D1725] text-white' : 'border-academy-line bg-[#FFFDF8]'}`}><span className={styles.cardNumber}>MISSION 0{index+1}</span><span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-black ${featured ? 'bg-white/10 text-sky-300' : 'bg-academy-bg text-yellow-700'}`}>{icon}</span><h3 className="mt-7 text-xl font-black">{title}</h3><p className={`mt-3 leading-7 ${featured ? 'text-white/65' : 'text-academy-muted'}`}>{text}</p></article>)}</div>
      <div className={`${styles.liftCard} mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:grid-cols-[.7fr_1.3fr] lg:p-8`}><div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours accessible, un métier réglementé.</h3><p className="mt-4 leading-7 text-academy-muted">Aucune expérience préalable dans la sécurité n’est obligatoire.</p></div><div className="grid gap-3 sm:grid-cols-2">{audiences.map((item,index) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${index === 5 ? 'bg-orange-100 text-orange-700' : 'bg-sky-100 text-sky-700'}`}>✓</span>{item}</div>)}</div></div>
    </Section>

    <Section id="admission" eyebrow="02 — Admission" title={<>Votre dossier est-il prêt pour l’APS&nbsp;?</>} intro={<>Nous contrôlons chaque condition avant votre entrée en formation et vous accompagnons dans la démarche d’autorisation préalable.</>} tone="stone"><div className="grid gap-4 md:grid-cols-2">{prerequisites.map(([title,text]) => <article key={title} className={`${styles.liftCard} rounded-[1.7rem] border border-[#D8CEBD] bg-white/90 p-5`}><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 font-black text-blue-700">✓</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-academy-muted">{text}</p></article>)}</div><div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-[1.8rem] bg-gradient-to-r from-[#F7D57D] to-[#F0B52E] p-6 text-academy-gold-text lg:flex-row lg:items-center"><div><p className="text-xl font-black">Bonne nouvelle : nous préparons votre demande CNAPS.</p><p className="mt-1 font-semibold opacity-75">Vous fournissez les documents, notre équipe vous accompagne dans le dépôt.</p></div><CTA href={apsContact('autorisation préalable CNAPS')} variant="dark">Faire vérifier mon dossier →</CTA></div><div className="mt-8 grid gap-3 md:grid-cols-4">{cnapsSteps.map((item,index) => <div key={item} className="rounded-[1.4rem] bg-white p-4 text-academy-ink"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1725] text-xs font-black text-academy-gold">0{index+1}</span><p className="mt-5 font-black">{item}</p></div>)}</div></Section>

    <Section id="pratique" eyebrow="03 — Immersion terrain" title={<>Vous ne regardez pas seulement&nbsp;: vous pratiquez.</>} intro={<>La formation vous place dans des situations proches du réel. Chaque geste est expliqué, répété, observé puis débriefé avec le formateur.</>} tone="dark">
      <div className="grid gap-5 md:grid-cols-2">
        {practicalExercises.map(([icon,title,text,visuals],index) => <article key={title} className={`${styles.practicalCard} rounded-[1.5rem] border border-white/10 bg-white/7 p-5`}>
          <div className="relative z-10 flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-3"><span className={`${styles.practicalIcon} grid h-10 w-10 place-items-center rounded-xl bg-academy-gold font-black text-academy-gold-text`}>{icon}</span><span className="text-[.58rem] font-black tracking-[.16em] text-white/30">0{index+1}</span></div>
            <h3 className="mt-4 text-lg font-black">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
            <div className={styles.practicalVisuals} data-visual-count={visuals.length}>
              {visuals.map(kind => <div key={kind} className={styles.practicalVisual} data-visual={kind}><ApsPracticalVisual kind={kind} /></div>)}
            </div>
          </div>
        </article>)}
      </div><div className="mt-7 grid gap-4 rounded-[1.7rem] border border-blue-300/25 bg-blue-400/10 p-6 lg:grid-cols-[auto_1fr] lg:items-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-300 text-2xl font-black text-blue-950">✓</span><div><p className="text-xl font-black text-blue-200">L’objectif : transformer les connaissances en réflexes professionnels.</p><p className="mt-2 max-w-4xl leading-7 text-white/68">Observation, positionnement, communication, respect du cadre légal, compte rendu et choix d’une réponse adaptée sont analysés après chaque scénario.</p></div></div></Section>

    <Section id="programme" eyebrow="04 — Programme" title={<>Les 14 UV du programme officiel, sans raccourci.</>} intro={<>Programme CPNEFP version V3.2 mis à jour le 23 juillet 2026 : 41 heures de socle de base et 134 heures de spécialité APS, soit 175 heures au total.</>}>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[['41 h','Socle de base'],['134 h','Spécialité APS'],['63,5 h','Pratique au total']].map(([value,label]) => <div key={label} className="rounded-[1.4rem] border border-academy-line bg-white p-5"><p className="text-3xl font-black">{value}</p><p className="mt-1 text-sm font-bold text-academy-muted">{label}</p></div>)}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {program.map(([number,title,duration,delivery,text],index) => <details key={number} open={index===0} className={`${styles.programItem} group rounded-[1.4rem] border border-blue-200/80 bg-[#FFFDF8] p-4 focus-within:border-blue-400`}>
          <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70">
            <span className="grid h-9 min-w-14 shrink-0 place-items-center rounded-full bg-blue-100 px-2 text-xs font-black text-blue-800">{number}</span>
            <strong className="min-w-0 flex-1 text-blue-950">{title}</strong>
            <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-800 ring-1 ring-blue-200 sm:inline-flex">{duration}</span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-blue-200 text-blue-700 transition group-open:rotate-45 group-open:bg-blue-700 group-open:text-white">+</span>
          </summary>
          <div className="mt-4 border-t border-blue-100 pt-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white sm:hidden">{duration}</span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-800 ring-1 ring-blue-200">{delivery}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-academy-muted">{text}</p>
          </div>
        </details>)}
      </div>
      <div className="mt-10 grid gap-6 rounded-[2rem] bg-[#0D1725] p-6 text-white lg:grid-cols-[.8fr_1.2fr] lg:p-9"><div><Eyebrow light>Pédagogie terrain</Eyebrow><h3 className="mt-3 text-3xl font-black">On apprend en pratiquant.</h3><p className="mt-4 leading-7 text-white/65">Cas concrets, manipulation des équipements et entraînements réguliers pour ancrer les bons réflexes.</p><p className="mt-5 font-black text-blue-300">✓ SST inclus dans le parcours</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{['Rondes de sécurité','Poste de contrôle','Contrôle d’accès','Gestion d’incident','Palpation encadrée','Extinction sur feu réel','Main courante électronique','PTI / DATI','Entraînement QCU'].map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/7 p-4 font-black">{item}</div>)}</div></div>
    </Section>

    <Section
      id="hybride"
      eyebrow="05 — Distanciel + Présentiel"
      title={<>La souplesse du distanciel, l’exigence du terrain.</>}
      intro={<>Notre parcours de 175 heures se répartit ainsi : 124 heures en présentiel et 51 heures à distance.</>}
      tone="paper"
    >
      <div className="grid overflow-hidden rounded-[2rem] border border-academy-line shadow-card lg:grid-cols-2">
        <article className="bg-[#0D1725] p-7 text-white lg:p-9">
          <span className="text-5xl font-black text-sky-300">51 h</span>
          <h3 className="mt-2 text-2xl font-black">à distance</h3>
          <div className="mt-6 grid gap-3">{['Plateforme accessible 24h/24','Vidéos et supports','Exercices et tests','Progression suivie'].map(item => <p key={item} className="flex gap-3 font-bold text-white/72"><span className="text-sky-300">✓</span>{item}</p>)}</div>
        </article>
        <article className="bg-white p-7 lg:p-9">
          <span className="text-5xl font-black text-blue-700">124 h</span>
          <h3 className="mt-2 text-2xl font-black">en présentiel</h3>
          <div className="mt-6 grid gap-3">{['63,5 h de pratique','60,5 h de théorie en présentiel','Rondes et mises en situation','Préparation à l’examen'].map(item => <p key={item} className="flex gap-3 font-bold text-academy-muted"><span className="text-blue-600">✓</span>{item}</p>)}</div>
        </article>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[['71 %','du parcours en présentiel'],['36 %','du parcours consacré à la pratique'],['29 %','du parcours à distance']].map(([value,label]) => <div key={value} className="rounded-[1.4rem] border border-academy-line bg-white p-5 text-center"><p className="text-3xl font-black text-academy-ink">{value}</p><p className="mt-2 text-sm font-bold leading-6 text-academy-muted">{label}</p></div>)}
      </div>
      <div className="mt-5 rounded-[1.5rem] border border-academy-gold/60 bg-academy-gold/10 p-5"><p className="font-black">Vous n’êtes jamais seul devant votre écran.</p><p className="mt-1 text-sm font-semibold text-academy-muted">Votre progression à distance est suivie et l’équipe pédagogique reste disponible. Les enseignements en présentiel associent théorie, exercices et mises en situation.</p></div>
      <div className="mt-10"><Eyebrow>Organisation</Eyebrow><h3 className="mt-3 text-3xl font-black">Une session, quatre temps forts.</h3><div className="mt-6 grid gap-3 md:grid-cols-4">{[['Accueil au centre','Présentation du parcours'],['51 h à distance','Notions autorisées en distanciel'],['124 h à l’école','Théorie et pratique encadrées'],['Examen en présentiel','Évaluation devant jury']].map(([title,text],index) => <div key={title} className={`rounded-[1.5rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-academy-bg'}`}><span className="text-3xl font-black text-yellow-600">0{index+1}</span><h4 className="mt-6 text-lg font-black">{title}</h4><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></div>)}</div></div>
    </Section>

    <Section id="examen" eyebrow="06 — Examen" title={<>Un examen qui valide vos réflexes.</>} intro={<>Connaissances, gestes professionnels et capacité à réagir : l’évaluation finale associe des QCU et deux mises en situation individuelles, en présentiel.</>} tone="paper">
      <div className={`${styles.examGrid} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
        {examSteps.map(([number,title,text],index) => <article key={number} className={`${styles.examCard} rounded-[1.7rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-white'}`}><span className="grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black text-academy-gold-text">{number}</span><h3 className="mt-6 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></article>)}
      </div>
      <div className={styles.examDetails}>
        <article>
          <Eyebrow>L’épreuve théorique</Eyebrow><h3>Comprendre une situation, choisir la bonne réponse.</h3>
          <p>Les questionnaires à choix unique sont présentés sur un support électronique. Chaque question vous place dans un contexte professionnel et appelle une seule réponse.</p>
          <ul><li>Mobiliser les connaissances juridiques et les consignes de sécurité.</li><li>Identifier la conduite adaptée à un événement ou à un risque.</li><li>Distinguer les missions de l’agent et les limites de son intervention.</li></ul>
        </article>
        <article>
          <Eyebrow>Les épreuves pratiques</Eyebrow><h3>Agir sur le terrain et au poste de sécurité.</h3>
          <p>Les deux mises en situation permettent d’observer votre méthode de travail, votre communication et votre réponse à un événement.</p>
          <ul><li><strong>En ronde :</strong> prendre les consignes, contrôler les points sensibles, détecter une anomalie et en rendre compte.</li><li><strong>Au poste de sécurité :</strong> traiter une information ou une alarme, appliquer les procédures et coordonner l’alerte.</li><li><strong>Dans les deux cas :</strong> garder une posture professionnelle et assurer la traçabilité des actions.</li></ul>
        </article>
      </div>
      <div className={styles.examPracticalInfo}>
        <article><span>Avant l’examen</span><h3>Vous vous préparez progressivement.</h3><p>Entraînements aux QCU, exercices de ronde, utilisation de la main courante et mises en situation rythment le parcours. La convocation précise la date, l’horaire, le lieu et les pièces à présenter.</p></article>
        <article><span>Secourisme</span><h3>Le SST a sa propre évaluation.</h3><p>Le certificat Sauveteur Secouriste du Travail est délivré après validation des compétences lors des épreuves certificatives du module SST.</p></article>
        <article><span>Après les résultats</span><h3>Du titre à l’exercice du métier.</h3><p>La réussite aux épreuves du TFP APS permet d’obtenir le titre de niveau 3. Vous déposez ensuite une demande de carte professionnelle auprès du CNAPS. Si une épreuve reste à valider, l’équipe vous explique les suites adaptées à votre résultat.</p></article>
      </div>
      <p className="mt-6 text-sm font-semibold text-academy-muted">Modalités de certification : <a href="https://www.francecompetences.fr/recherche/rncp/36648/" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline underline-offset-4">consulter la fiche officielle du TFP APS</a>.</p>
    </Section>

    <TrainingDatesPricingSection
      id="dates-tarifs"
      eyebrow="07 — Dates & tarifs"
      sessions={visibleSessions}
      initialSessionLimit={2}
      theme="blue"
      showDeliveryPeriods
      showSessionTitle
      showOverallPeriodLabel={false}
      seatCapacity={12}
      underlineDisclosure={false}
      remotePeriodFallback="51 h · calendrier détaillé à confirmer"
      inPersonPeriodFallback="124 h · calendrier détaillé à confirmer"
      defaultPrice="1 650 €"
      defaultLocation="Puget-sur-Argens"
      priceDescription="Formation complète · SST inclus · examen final"
      registrationHref={sessionHref}
      showSessionPrice={false}
      intro="Comparez les dates, les périodes à distance et en présentiel, puis choisissez la session qui vous convient."
      priceAction={{ href: apsCpfUrl, label: 'S’inscrire avec mon CPF 🔐', external: true }}
    />

    <section id="inscription-financement" className={`${styles.enrollmentSection} relative isolate overflow-hidden bg-[#0A1725] px-4 py-14 text-white sm:py-16 lg:py-20`}>
      <div className="page-container">
        <Eyebrow light>08 — Inscriptions & financement</Eyebrow>
        <div className={`${styles.enrollmentHeader} mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12`}>
          <div className="min-w-0">
            <h2 className="max-w-5xl text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">
              <span className="block">Du premier appel à votre entrée en formation.</span>
              <span className={`${styles.enrollmentPromise} mt-2 block`}>Nous vous accompagnons de A à Z</span>
            </h2>
            <p className={`${styles.enrollmentIntro} mt-6 max-w-4xl text-base font-medium leading-8 text-white/70`}>Tout commence par un rendez-vous téléphonique avec un membre de notre équipe. Contactez-nous au 04 22 47 07 68 pour réserver votre RDV téléphonique. Nous étudions votre projet en détails et nous vous accompagnons dans toutes vos démarches du financement, l’inscription, jusqu’à votre formation et l’obtention de votre diplôme.</p>
          </div>
          <div className={`${styles.enrollmentCtaWrap} relative flex w-full items-center justify-center lg:w-auto`}>
            <CTA href={apsRegistrationFormUrl} variant="gold" className={`${styles.enrollmentPrimaryCta} w-full lg:w-auto`}>Commencer mon inscription →</CTA>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {enrollmentSteps.map(([number, title, text]) => (
            <article key={number} className={`${styles.enrollmentCard} rounded-[1.5rem] border border-white/10 bg-white/7 p-5`}>
              <span className={styles.enrollmentNumber}>{number}</span>
              <h3 className={`${styles.enrollmentCardTitle} mt-6 text-lg font-black`}>{title}</h3>
              <p className={`${styles.enrollmentCardText} mt-3 text-sm leading-6 text-white/62`}>{text}</p>
              {number === '01' && <a href="tel:0422470768" className={`${styles.enrollmentCardLink} mt-5 inline-flex text-sm font-black text-blue-200 transition hover:text-white`}>Appeler le 04 22 47 07 68 →</a>}
              {number === '03' && <a href={identityNumeriqueUrl} target="_blank" rel="noopener noreferrer" className={`${styles.enrollmentCardLink} mt-5 inline-flex text-sm font-black text-blue-200 transition hover:text-white`}>Créer mon Identité Numérique →</a>}
            </article>
          ))}
        </div>

        <div className={`${styles.enrollmentFinanceGrid} mt-6 grid gap-5 lg:grid-cols-[.78fr_1.22fr]`}>
          <article className={`${styles.enrollmentFinancePrimary} rounded-[2rem] bg-[#FFFDF8] p-6 text-academy-ink shadow-card lg:p-8`}>
            <Eyebrow>Votre financement</Eyebrow>
            <h3 className="mt-3 text-3xl font-black tracking-[-.04em]">Préparez votre financement.</h3>
            <div className={`${styles.identityCallout} mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4`}>
              <p className="font-black text-blue-950">CPF ou France Travail ? Anticipez votre Identité Numérique.</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-blue-950/70">Créez votre Identité Numérique La Poste avant votre second rendez-vous afin de pouvoir valider vos droits CPF ou votre demande de financement.</p>
              <a href={identityNumeriqueUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-black text-blue-700 transition hover:text-blue-950">En savoir plus sur l’Identité Numérique →</a>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <CTA href={apsCpfUrl} variant="blue" external>Consulter la formation sur Mon Compte Formation →</CTA>
              <CTA href={apsContact('étude de financement APS')} variant="light">Faire étudier mon financement</CTA>
            </div>
          </article>

          <article className={`${styles.enrollmentFinanceOptions} rounded-[2rem] border border-blue-300/25 bg-blue-400/10 p-6 shadow-card lg:p-8`}>
            <Eyebrow light>Solutions possibles</Eyebrow>
            <h3 className="mt-3 text-3xl font-black tracking-[-.04em]">Quatre voies, un accompagnement personnalisé.</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {financingOptions.map(([title, text]) => (
                <article key={title} className={`${styles.financeCard} rounded-2xl border border-white/10 bg-white/7 p-5`}>
                  <h4 className="text-lg font-black text-blue-200">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>

    <Section id="debouches" eyebrow="09 — Débouchés & emploi" title={<>Un premier titre pour intégrer un secteur qui recrute.</>} intro={<>Les besoins sont réguliers dans de nombreux environnements : commerce, industrie, logistique, santé, bureaux, événementiel et sites sensibles. Le TFP APS ouvre l’accès à des missions variées, sous réserve d’obtenir la carte professionnelle CNAPS.</>} tone="paper"><div className="mb-8 grid gap-4 md:grid-cols-3"><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-blue-200 bg-blue-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Un besoin permanent</p><h3 className="mt-3 text-2xl font-black">Des recrutements toute l’année</h3><p className="mt-3 leading-7 text-blue-950/70">Les entreprises de sécurité doivent couvrir des prestations de jour, de nuit, en semaine, le week-end et lors de grands événements.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-sky-200 bg-sky-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-sky-700">Des missions variées</p><h3 className="mt-3 text-2xl font-black">De nombreux sites à sécuriser</h3><p className="mt-3 leading-7 text-sky-950/70">Vous pouvez travailler sur un site fixe, effectuer des rondes, contrôler des accès, sécuriser un événement ou intervenir sur plusieurs sites.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-yellow-300 bg-yellow-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-yellow-800">Des évolutions possibles</p><h3 className="mt-3 text-2xl font-black">Construire un parcours</h3><p className="mt-3 leading-7 text-yellow-950/70">Avec l’expérience et des qualifications complémentaires, vous pouvez viser des fonctions de chef de poste, de sécurité incendie, de télésurveillance ou d’encadrement.</p></article></div><div className="grid gap-4 md:grid-cols-4">{[['Réussir le TFP APS','Valider les épreuves'],['Recevoir le titre niveau 3','Obtenir la certification'],['Demander la carte CNAPS','Constituer le dossier'],['Commencer à exercer','Après délivrance de la carte']].map(([title,text],index) => <article key={title} className={`${styles.examCard} rounded-[1.7rem] border border-academy-line bg-white p-5 text-center`}><span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black">0{index+1}</span><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-academy-muted">{text}</p></article>)}</div><div className="mt-5 rounded-[1.4rem] border border-yellow-300 bg-yellow-50 p-4 font-bold text-yellow-900">Important : le TFP APS ne déclenche pas automatiquement la carte professionnelle.</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><Eyebrow>Débouchés</Eyebrow><h3 className="mt-3 text-3xl font-black">Les métiers accessibles</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map(([icon,title]) => <div key={title} className={styles.jobCard}><span className={styles.jobIcon}>{icon}</span><span className="text-sm font-black leading-5">{title}</span></div>)}</div></article><article className={styles.dualSkill}>
        <p className={styles.dualEyebrow}>Double compétence</p>
        <h3>Deux expertises.<br /><span>Plus de possibilités.</span></h3>
        <p className={styles.dualIntro}>Associez le TFP APS et le SSIAP 1 pour élargir vos missions dans la surveillance humaine et la sécurité incendie.</p>
        <div className={styles.dualPanels}>
          <div className={styles.dualSecurity}><span className={styles.dualLabel}>TFP APS</span><TrainingMotionIllustration kind="site-check" theme="blue" description="Illustration animée de la surveillance et du contrôle d’un bâtiment" /><h4>Prévenir & surveiller</h4><p>Rondes, contrôle d’accès, protection des personnes et des biens.</p></div>
          <span className={styles.dualPlus} aria-hidden="true">+</span>
          <div className={styles.dualFire}><span className={styles.dualLabel}>SSIAP 1</span><TrainingMotionIllustration kind="extinguisher" theme="red" description="Illustration animée d’un extincteur rouge et de la vérification de son indicateur" /><h4>Alerter & protéger</h4><p>Prévention incendie, évacuation et assistance aux personnes.</p></div>
        </div>
        <div className={styles.dualFooter}><span>Surveillance humaine <b>+</b> Sécurité incendie</span><CTA href="/formations-securite/ssiap-1" variant="dark" className="w-full">Découvrir le SSIAP 1 →</CTA><p>Deux qualifications complémentaires, chacune avec ses prérequis et son examen.</p></div>
      </article></div><article className="mt-5 rounded-[2rem] border border-academy-line bg-white p-6"><h3 className="text-2xl font-black">Où travailler ?</h3><p className="mt-2 leading-7 text-academy-muted">Les agents APS interviennent aussi bien dans des lieux ouverts au public que sur des sites professionnels à accès contrôlé.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{workplaces.map(item => <div key={item} className={`${styles.workplace} rounded-2xl bg-academy-bg p-4 text-center font-black`}>{item}</div>)}</div></article><div className="mt-5 rounded-[1.5rem] border border-academy-line bg-[#FFFDF8] p-5"><p className="font-black">Bon à savoir : horaires et conditions varient selon les postes.</p><p className="mt-2 text-sm leading-6 text-academy-muted">Le secteur propose des emplois de jour ou de nuit, à temps plein ou partiel, sur site fixe ou mobile. Disponibilité, ponctualité, présentation, maîtrise de soi et qualité du compte rendu sont particulièrement recherchées par les employeurs.</p></div></Section>

    <Section id="reperes-rncp" eyebrow="10 — Repères officiels" title={<>Certification, conditions d’exercice et données d’insertion.</>} intro={<>Ces informations complètent la présentation commerciale avec les repères figurant dans la fiche RNCP36648 fournie.</>}>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <article className="rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:p-8">
          <Eyebrow>Réalités du métier</Eyebrow>
          <h3 className="mt-3 text-3xl font-black">Des conditions qui varient selon le poste.</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{workConditions.map(item => <div key={item} className="flex gap-3 rounded-2xl bg-academy-bg p-4 text-sm font-bold leading-6 text-academy-muted"><span className="mt-0.5 text-blue-700">✓</span><span>{item}</span></div>)}</div>
        </article>
        <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8">
          <Eyebrow light>Identification</Eyebrow>
          <h3 className="mt-3 text-3xl font-black">TFP APS · niveau 3</h3>
          <dl className="mt-6 grid gap-3">{[['Répertoire','RNCP36648'],['Certificateurs','CPNE / ADEF'],['Code ROME','K2503'],['Code NSF','344'],['Formacode','42854'],['Échéance RNCP','1er juillet 2027']].map(([term,value]) => <div key={term} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/7 px-4 py-3"><dt className="text-sm font-semibold text-white/55">{term}</dt><dd className="text-right font-black text-white">{value}</dd></div>)}</dl>
          <a href="https://www.francecompetences.fr/recherche/rncp/36648/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-black text-academy-gold transition hover:text-white">Consulter la fiche France compétences →</a>
        </article>
      </div>
      <article className="mt-5 overflow-hidden rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-soft lg:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><Eyebrow>Insertion nationale</Eyebrow><h3 className="mt-3 text-3xl font-black">Données historiques de la certification.</h3></div><p className="max-w-xl text-sm font-semibold leading-6 text-academy-muted">Statistiques nationales France compétences figurant dans la fiche RNCP fournie. Elles concernent la certification, pas les résultats propres à Intégrale Academy.</p></div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[720px] w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead><tr className="text-xs uppercase tracking-[.12em] text-academy-muted"><th className="px-4 py-2">Année</th><th className="px-4 py-2">Certifiés</th><th className="px-4 py-2">Insertion globale à 6 mois</th><th className="px-4 py-2">Métier visé à 6 mois</th><th className="px-4 py-2">Métier visé à 2 ans</th></tr></thead>
            <tbody>{nationalStats.map(([year,certified,globalSix,targetSix,targetTwo]) => <tr key={year} className="bg-white font-bold"><td className="rounded-l-2xl px-4 py-4 font-black">{year}</td><td className="px-4 py-4">{certified}</td><td className="px-4 py-4">{globalSix}</td><td className="px-4 py-4">{targetSix}</td><td className="rounded-r-2xl px-4 py-4">{targetTwo}</td></tr>)}</tbody>
          </table>
        </div>
        <details className="group mt-6 rounded-[1.4rem] border border-academy-line bg-white p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black"><span>Autres informations de la fiche RNCP</span><span className="grid h-8 w-8 place-items-center rounded-full bg-academy-bg transition group-open:rotate-45">+</span></summary>
          <div className="mt-5 grid gap-3 border-t border-academy-line pt-5 md:grid-cols-3">
            <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Voies d’accès recensées</p><p className="mt-2 text-sm font-bold leading-6">Apprentissage, formation continue, contrat de professionnalisation, candidature individuelle et VAE.</p></div>
            <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Blocs et correspondances</p><p className="mt-2 text-sm font-bold leading-6">Capitalisation des blocs : sans objet. Aucune correspondance déclarée avec une autre certification.</p></div>
            <div className="rounded-2xl bg-academy-bg p-4"><p className="text-xs font-black uppercase tracking-[.12em] text-academy-muted">Historique</p><p className="mt-2 text-sm font-bold leading-6">La certification RNCP36648 remplace la certification antérieure RNCP34054.</p></div>
          </div>
          <p className="mt-4 text-xs font-semibold leading-5 text-academy-muted">Ces voies sont celles de la certification nationale ; leur disponibilité chez Intégrale Academy doit être confirmée avec l’équipe admissions.</p>
        </details>
      </article>
    </Section>

    <div id="faq-aps"><PremiumFAQSection theme="blue" badge="FAQ APS" title="Les réponses avant de vous lancer" description="CNAPS, e-learning, examen, carte professionnelle et financement : retrouvez les informations indispensables avant votre inscription." items={faq} contactHref={apsContact('question APS')} /></div>

    <section className="bg-academy-bg px-4 pb-20 pt-8"><div className={`${styles.finalCta} page-container rounded-[2.4rem] border border-white/10 shadow-card`}><div className={`${styles.finalCtaContent} grid items-center lg:grid-cols-[1.05fr_.95fr]`}><div className="p-7 sm:p-9 lg:p-12"><Eyebrow light>Une question sur votre projet ?</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">Faites le premier pas vers votre futur métier.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-white/65">Cassandre vérifie votre éligibilité, votre dossier CNAPS et votre financement. Vous repartez avec des réponses claires et les prochaines étapes adaptées à votre situation.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={apsContact('rendez-vous avec Cassandre')} variant="gold">Réserver un rendez-vous →</CTA><CTA href="tel:0422470768" variant="outline">Appeler Cassandre</CTA></div><div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-white/60"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">✓ Sans engagement</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">✓ Étude personnalisée</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">✓ Réponse sur le CNAPS et le financement</span></div></div><div className="relative min-h-[390px] p-7"><div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[0_0_0_50px_rgba(255,255,255,.025),0_0_0_100px_rgba(255,255,255,.015)]"/><div className={`${styles.adviserCard} absolute inset-x-7 bottom-9 rounded-[1.8rem] border border-white/70 bg-white/95 p-5 text-academy-ink backdrop-blur`}><div className="flex items-center gap-4"><div className="relative"><div className="absolute -inset-1 rounded-[1.15rem] bg-gradient-to-br from-academy-gold to-sky-400 opacity-70 blur"/><Image src="/images/cassandre-memoji.png" width={88} height={88} alt="Cassandre, responsable commerciale Intégrale Academy" className="relative h-20 w-20 rounded-2xl bg-white object-cover"/></div><div><p className="text-xs font-black uppercase tracking-[.18em] text-yellow-700">Votre conseillère</p><p className="mt-1 text-2xl font-black">Cassandre</p><p className="text-sm font-semibold text-academy-muted">Responsable commerciale</p></div></div><a href="tel:0422470768" className="mt-4 block rounded-full bg-academy-gold px-5 py-3 text-center font-black text-academy-gold-text transition hover:brightness-105">04 22 47 07 68</a></div></div></div></div></section>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href={sessionHref()} variant="gold" className="min-w-0 flex-[1.4] px-3">Réserver ma place</CTA></div></div>
  </main>;
}
