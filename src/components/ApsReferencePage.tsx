import type { ReactNode } from 'react';
import { TrainingReferencePage, TrainingReferenceHero, TrainingReferenceSection as Section, TrainingReferenceContact, TrainingReferenceMobileBar } from '@/components/TrainingReferenceLayout';
import { TrainingCourseTestimonials } from '@/components/TrainingCourseTestimonials';

import { originalArtwork } from '@/data/originalArtwork';
import { ssiapArtwork } from '@/data/manualIllustrations';
import { serializeCourseJsonLd } from '@/lib/seo';

import Link from 'next/link';

import { ApsSectionNavigation } from '@/components/ApsSectionNavigation';
import { ApsTrainingSummary } from '@/components/ApsTrainingSummary';
import { ApsFacilitiesSections } from '@/components/ApsFacilitiesSections';
import { ApsProgramExplorer } from '@/components/ApsProgramExplorer';
import { ApsAdmission, ApsHybridExperience, ApsExamExperience, ApsFundingLogo, ApsWorkplaces, ApsOfficialReferences } from '@/components/ApsExperienceSections';
import { ApsJourney } from '@/components/ApsJourney';
import { IntegraleWelcomePack } from '@/components/IntegraleWelcomePack';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import { TrainingMissionCards } from '@/components/TrainingMissionCards';
import { ManualArtwork } from '@/components/ManualArtwork';
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

const missions = [
  ['◉', 'Surveillance générale', 'Observer, prévenir et sécuriser les personnes, les biens et les espaces.', true],
  ['⇥', 'Contrôle d’accès', 'Filtrer les entrées, orienter le public et appliquer les consignes du site.', false],
  ['↻', 'Rondes de sécurité', 'Identifier les anomalies, contrôler les installations et rendre compte.', false],
  ['△', 'Prévention des risques', 'Repérer les situations dangereuses et adopter les bons réflexes.', false],
  ['!', 'Gestion des incidents', 'Alerter, protéger et réagir avec calme, méthode et proportion.', false],
  ['✚', 'Secours aux personnes', 'Porter assistance dans le cadre des compétences du SST.', false],
];

// Artwork extracted from the APS manual, with matching illustrations for supervised practice.
const apsVisuals = {
  patrol: ['vigilance', 'Un agent surveille les allées d’un site et observe son environnement'],
  night: ['ronde', 'Un agent effectue une ronde de surveillance à la tombée de la nuit'],
  access: ['acces', 'Contrôle d’accès des visiteurs à l’accueil d’un site'],
  video: ['pc-securite', 'Une agente surveille les écrans au poste central de sécurité'],
  report: ['transmission', 'Deux professionnels échangent des consignes sur le site'],
  alert: ['conflit', 'Une agente garde une posture calme face à une situation de conflit'],
  baggage: ['bagages', 'Un agent réalise une inspection visuelle des bagages à l’entrée d’un site'],
  patdown: ['palpation', 'Exercice de palpation de sécurité avec un volontaire et un formateur'],
  extinguisher: ['incendie', 'Un agent repère une anomalie devant une porte de sécurité incendie'],
  cpr: ['sst', 'Une stagiaire s’exerce sur un mannequin de secourisme sous la supervision d’un formateur'],
} as const;

type ApsPracticalVisualKind = keyof typeof apsVisuals;
const apsMissionArtwork = ['aps-mission-surveillance', 'aps-mission-acces', 'aps-mission-ronde', 'aps-mission-prevention', 'aps-mission-incident', 'aps-mission-secours'].map(key => originalArtwork[key as keyof typeof originalArtwork]);

const audiences = ['Reconversion professionnelle', 'Demandeurs d’emploi', 'Salariés en évolution', 'Débutants motivés', 'Futurs agents de sécurité', 'Projet APS + SSIAP 1'];

const prerequisites = [
  ['Autorisation préalable d’entrée en formation', 'Notre équipe vous accompagnera pour constituer et déposer votre demande auprès du CNAPS (ministère de l’Intérieur). Nous vérifierons avec vous les pièces nécessaires et vous guiderons à chaque étape. Vous devrez obtenir cette autorisation avant votre entrée en formation, sauf si vous possédez déjà une carte professionnelle en cours de validité permettant cet accès.'],
  ['Compréhension du français', 'Vous passerez un test de français avant votre entrée en formation. Il permettra de vérifier votre compréhension des consignes et votre capacité à lire et à rédiger un compte rendu simple. Si vous êtes ressortissant étranger, y compris européen, vous devrez également justifier d’un niveau de français B1 minimum avec un diplôme ou une attestation reconnue. La formation abordera aussi les principes de la République, dont la liberté, l’égalité, la fraternité et la laïcité.'],
  ['Antécédents judiciaires et enquête administrative', 'Avant de délivrer l’autorisation, le CNAPS (ministère de l’Intérieur) vérifiera que vos antécédents et votre comportement sont compatibles avec le métier. Cette enquête administrative portera notamment sur le bulletin n° 2 du casier judiciaire et sur les fichiers de police et de gendarmerie, dont le traitement des antécédents judiciaires (TAJ). Des condamnations ou des faits incompatibles avec l’exercice de la sécurité privée pourront entraîner un refus d’autorisation.'],
  ['Ressortissants étrangers', 'Si vous êtes ressortissant hors Union européenne et Espace économique européen, vous devrez disposer d’un titre de séjour en cours de validité autorisant à travailler et justifier d’au moins cinq ans de détention d’un titre de séjour, conformément à la réglementation applicable à l’autorisation préalable. Les règles diffèrent pour les ressortissants européens. Selon votre situation, vous devrez également fournir un extrait de casier judiciaire du pays d’origine ou de provenance de moins de trois mois, avec une traduction en français. Nous vérifierons avec vous les pièces nécessaires.'],
  ['Pièce d’identité en cours de validité', 'Vous devrez fournir une copie lisible de votre carte nationale d’identité, de votre passeport ou de votre titre de séjour, selon votre situation. Votre document devra être en cours de validité. Pour une carte d’identité ou un titre de séjour, vous devrez transmettre le recto et le verso ; pour un passeport, la page comportant votre photo et votre identité.'],
  ['Justificatif de domicile de moins de trois mois', 'Vous devrez fournir un justificatif de domicile de moins de trois mois : par exemple une facture d’électricité, de gaz, d’eau ou une quittance de loyer délivrée par un organisme social ou une agence immobilière. Si vous êtes hébergé, vous devrez joindre une attestation d’hébergement signée, la pièce d’identité de l’hébergeant et son justificatif de domicile de moins de trois mois.'],
];

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
  ['↻', 'Rondes de sécurité', 'Préparer une ronde, suivre un itinéraire, repérer les anomalies, effectuer une levée de doute et transmettre un compte rendu exploitable.', ['patrol']],
  ['✋', 'Palpation de sécurité', 'Apprendre les gestes professionnels, le positionnement, le consentement et le cadre légal applicable, au travers d’exercices encadrés.', ['patdown']],
  ['⌕', 'Inspection visuelle des bagages', 'Contrôler méthodiquement sacs et bagages dans le respect des droits des personnes et des consignes du site.', ['baggage']],
  ['⇥', 'Contrôle d’accès et gestion des flux', 'Vérifier les accès, badges et autorisations, accueillir le public et gérer une file ou un refus d’accès avec professionnalisme.', ['access']],
  ['⌁', 'Poste de sécurité', 'Utiliser la main courante, recevoir une alarme, appliquer les consignes, communiquer par radio et coordonner une intervention.', ['video']],
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
  { q: 'Faut-il une autorisation CNAPS (ministère de l’Intérieur) avant d’entrer en formation ?', a: 'Oui, sauf si vous possédez déjà une carte professionnelle en cours de validité pour l’activité concernée. Intégrale Academy vous accompagne dans la préparation et le dépôt de la demande.' },
  { q: 'La formation APS est-elle entièrement à distance ?', a: 'Non. Sur les 175 heures, 51 heures sont réalisées à distance et 124 heures se déroulent en présentiel à Puget-sur-Argens. L’examen est obligatoirement organisé en présentiel.' },
  { q: 'Quelle est la part de pratique ?', a: 'Le programme prévoit 63,5 heures de pratique et 60,5 heures de théorie en présentiel. Les 51 heures restantes sont réalisées à distance.' },
  { q: 'Le e-learning est-il obligatoire ?', a: 'Oui lorsqu’il est prévu dans le calendrier de la session. Il représente 51 heures, doit être suivi et validé, et la progression est contrôlée par l’équipe pédagogique.' },
  { q: 'Comment se déroule l’examen APS ?', a: 'L’examen associe des QCU contextualisés organisés électroniquement et deux mises en situation professionnelles individuelles, notamment autour de la ronde et du poste de contrôle.' },
  { q: 'La formation permet-elle d’obtenir directement la carte professionnelle ?', a: 'La réussite permet d’obtenir le TFP APS, qui justifie l’aptitude professionnelle. Vous devez ensuite déposer une demande de carte professionnelle auprès du CNAPS (ministère de l’Intérieur).' },
  { q: 'Quelles conditions concernent les ressortissants étrangers ?', a: 'Pour les ressortissants hors Union européenne et Espace économique européen, la réglementation prévoit un titre de séjour en cours de validité autorisant à travailler, détenu depuis au moins cinq ans pour demander l’autorisation préalable. Un justificatif de français B1 minimum est demandé aux ressortissants étrangers, y compris européens. Notre équipe vérifie les pièces adaptées à votre situation.' },
  { q: 'Quel est le prix de la formation ?', a: 'Le tarif 2027 est de 1 700 € TTC. Retrouvez le prix dans la carte Tarif et les dates et places disponibles dans les cartes de session.' },
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
  const text = String(value || '1 700 € TTC').trim();
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

function ApsPracticalVisual({ kind, illustration }: { kind: ApsPracticalVisualKind; illustration?: { src: string; alt: string } }) {
  const [file, description] = apsVisuals[kind];
  const adapted = ['vigilance', 'bagages', 'acces', 'pc-securite', 'conflit', 'incendie'].includes(file);
  return <ManualArtwork
    illustration={illustration ?? { src: adapted ? `/images/aps/experience/atelier-${file}.webp` : `/images/aps/manuel/${file}.webp`, alt: description }}
    natural className={`${styles.manualVisual} ${styles.naturalVisual}`}
    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 560px" />;
}

function CompactAssistant() {
  return <div className="mt-3"><OrientationAssistant initialFormationKey="aps" hideInfoAction variant="modalTrigger" /></div>;
}

function HeroSession({ session }: { session: any }) {
  const full = isSessionFull(session);
  const seatAvailability = getSessionSeatAvailability(session, 12);
  return <aside data-aps-session aria-label="Prochaine session APS" className={`${styles.sessionCard} rounded-[2rem] border border-white/80 bg-[#FFFDF8] p-5 text-academy-ink sm:p-6 lg:p-7`}>
    <div data-session-grid className="grid gap-5">
      <div data-session-overview>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-blue-800 ring-1 ring-blue-200">Prochaine session</span>
          <span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${seatAvailability.badgeClassName}`}>{seatAvailability.label}</span>
        </div>
        <h2 className={`${styles.sessionDate} mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl`}>{formatDate(session?.startDate, true)} <span className="text-yellow-600">→</span><br />{formatDate(session?.endDate, true)}</h2>
        <p className="mt-2 text-sm font-extrabold text-academy-muted">Examen final le {formatDate(session?.examDate, true)}</p>
        <p className={styles.sessionApproval}>Agrément ADEF n° 8320032701</p>
      </div>
      <ApsTrainingSummary location={String(session?.location || 'Puget-sur-Argens').replace(/\s*\/\s*(?=Côte d[’']Azur)/g, ' · ')} />
      <div data-session-actions>
        <p className={styles.sessionPrice}><span>Tarif de la session</span><strong>{priceLabel(session?.priceLabel)}</strong></p>
        <CTA href={sessionHref()} variant={full ? 'light' : 'blue'} className="w-full">{full ? 'Être alerté de la prochaine session' : 'Réserver ma place →'}</CTA>
        <p className="mt-3 text-center text-xs font-bold text-academy-muted">Un conseiller vérifie votre dossier avant validation.</p>
        <CompactAssistant />
      </div>
    </div>
  </aside>;
}

export function ApsReferencePage({ sessions }: { sessions: any[] }) {
  const visibleSessions = sortSessionsChronologically(sessions.length ? sessions : fallbackSessions);
  const next = visibleSessions[0];
  return <TrainingReferencePage theme="blue">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Agent de Prévention et de Sécurité APS', description: 'Formation TFP APS de 175 heures à Puget-sur-Argens : 124 heures en présentiel, dont 63,5 heures de pratique et 60,5 heures de théorie, et 51 heures à distance.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'APS', item: '/formations-securite/aps' }] },
    ] }, "/formations-securite/aps") }} />

    <TrainingReferenceHero
      id="aps" badge="Formation TFP APS"
      heading="Devenez agent de" accent="prévention et sécurité."
      title="Formation agent de prévention et de sécurité"
      tagline="Apprenez le métier sur le terrain."
      description={<p>Rondes, contrôle d’accès, palpation, inspection des bagages et gestion d’incidents : entraînez-vous aux situations que vous rencontrerez réellement en poste.</p>}
      illustration={{ src: '/images/aps/manuel/equipe.webp', alt: 'Deux agents de sécurité préparent leur ronde, illustration du manuel APS Intégrale Academy' }}
      caption="Observer. Prévenir. Protéger."
      primaryAction={{ href: apsContact('démarrer mon projet'), label: 'Je démarre mon projet' }}
    ><HeroSession session={next} /></TrainingReferenceHero>

    <ApsSectionNavigation registrationHref="#dates-tarifs" />

    <ApsJourney />

    <Section id="metier" eyebrow="01 — Le métier" title={<>Un métier de terrain, de vigilance et de sang-froid.</>} intro={<>L’agent APS prévient les risques, protège les personnes et les biens, applique les consignes et rend compte de chaque événement.</>}>
      <TrainingMissionCards items={missions.map(([, title, text, featured], index) => ({ title: String(title), description: String(text), featured: Boolean(featured), illustration: apsMissionArtwork[index] }))} />
      <div className={`${styles.liftCard} mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:grid-cols-[.7fr_1.3fr] lg:p-8`}><div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours accessible, un métier réglementé.</h3><p className="mt-4 leading-7 text-academy-muted">Aucune expérience préalable dans la sécurité n’est obligatoire.</p></div><div className="grid gap-3 sm:grid-cols-2">{audiences.map((item,index) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${index === 5 ? 'bg-orange-100 text-orange-700' : 'bg-sky-100 text-sky-700'}`}>✓</span>{item}</div>)}</div></div>
    </Section>

    <Section id="admission" eyebrow="02 — Admission" title={<>Votre dossier est-il prêt pour l’APS&nbsp;?</>} intro={<>Les conditions essentielles, une équipe pour vous guider et un dossier préparé ensemble.</>} tone="stone">
      <ApsAdmission prerequisites={prerequisites} href={apsContact('autorisation préalable CNAPS (ministère de l’Intérieur)')} />
    </Section>

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

    <ApsFacilitiesSections />

    <Section id="programme" eyebrow="04 — Programme" title={<>Les 14 UV du programme officiel, sans raccourci.</>} intro={<>Programme CPNEFP version V3.2 mis à jour le 23 juillet 2026 : 41 heures de socle de base et 134 heures de spécialité APS, soit 175 heures au total.</>}>
      <ApsProgramExplorer units={program} />
    </Section>

    <Section id="hybride" eyebrow="05 — Distanciel + Présentiel" title={<>La souplesse du distanciel, l’exigence du terrain.</>} intro={<>Découvrez votre espace de cours en ligne, puis retrouvez votre groupe à l’école. 175 heures, deux façons complémentaires d’apprendre.</>} tone="paper">
      <ApsHybridExperience />
    </Section>

    <IntegraleWelcomePack course="aps" title="Pack Intégrale Academy." />

    <Section id="examen" eyebrow="06 — Examen" title={<>Un examen qui valide vos réflexes.</>} intro={<>Connaissances, gestes professionnels et capacité à réagir : l’évaluation finale associe des QCU et deux mises en situation individuelles, en présentiel.</>} tone="dark">
      <ApsExamExperience steps={examSteps} />
    </Section>

    <TrainingDatesPricingSection
      compact
      priceYear={2027}
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
      defaultPrice="1 700 € TTC"
      defaultLocation="Puget-sur-Argens"
      priceDescription="Formation complète · SST inclus · examen final"
      registrationHref={sessionHref}
      showSessionPrice={false}
      intro="Repérez vos dates et choisissez votre session. Le calendrier détaillé reste accessible en un clic."
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
                  <ApsFundingLogo title={title} />
                  <h4 className="text-lg font-black text-blue-200">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>

    <Section id="debouches" eyebrow="09 — Débouchés & emploi" title={<>Un vrai diplôme dans un secteur qui recrute.</>} intro={<>Les besoins sont réguliers dans de nombreux environnements : commerce, industrie, logistique, santé, bureaux, événementiel et sites sensibles. Le TFP APS ouvre l’accès à des missions variées, sous réserve d’obtenir la carte professionnelle CNAPS (ministère de l’Intérieur).</>} tone="paper"><div className="mb-8 grid gap-4 md:grid-cols-3"><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-blue-200 bg-blue-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Un besoin permanent</p><h3 className="mt-3 text-2xl font-black">Des recrutements toute l’année</h3><p className="mt-3 leading-7 text-blue-950/70">Les entreprises de sécurité doivent couvrir des prestations de jour, de nuit, en semaine, le week-end et lors de grands événements.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-sky-200 bg-sky-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-sky-700">Des missions variées</p><h3 className="mt-3 text-2xl font-black">De nombreux sites à sécuriser</h3><p className="mt-3 leading-7 text-sky-950/70">Vous pouvez travailler sur un site fixe, effectuer des rondes, contrôler des accès, sécuriser un événement ou intervenir sur plusieurs sites.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-yellow-300 bg-yellow-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-yellow-800">Des évolutions possibles</p><h3 className="mt-3 text-2xl font-black">Construire un parcours</h3><p className="mt-3 leading-7 text-yellow-950/70">Avec l’expérience et des qualifications complémentaires, vous pouvez viser des fonctions de chef de poste, de sécurité incendie, de télésurveillance ou d’encadrement.</p></article></div><div className="grid gap-4 md:grid-cols-4">{[['Réussir le TFP APS','Valider les épreuves'],['Recevoir le titre niveau 3','Obtenir la certification'],['Demander la carte CNAPS (ministère de l’Intérieur)','Constituer le dossier'],['Commencer à exercer','Après délivrance de la carte']].map(([title,text],index) => <article key={title} className={`${styles.examCard} rounded-[1.7rem] border border-academy-line bg-white p-5 text-center`}><span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black">0{index+1}</span><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-academy-muted">{text}</p></article>)}</div><div className="mt-5 rounded-[1.4rem] border border-yellow-300 bg-yellow-50 p-4 font-bold text-yellow-900">Important : le TFP APS ne déclenche pas automatiquement la carte professionnelle.</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><Eyebrow>Débouchés</Eyebrow><h3 className="mt-3 text-3xl font-black">Les métiers accessibles</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map(([icon,title]) => <div key={title} className={styles.jobCard}><span className={styles.jobIcon}>{icon}</span><span className="text-sm font-black leading-5">{title}</span></div>)}</div></article><article className={styles.dualSkill}>
        <p className={styles.dualEyebrow}>Double compétence</p>
        <h3>Deux expertises.<br /><span>Plus de possibilités.</span></h3>
        <p className={styles.dualIntro}>Associez le TFP APS et le SSIAP 1 pour élargir vos missions dans la surveillance humaine et la sécurité incendie.</p>
        <div className={styles.dualPanels}>
          <div className={styles.dualSecurity}><span className={styles.dualLabel}>TFP APS</span><ApsPracticalVisual kind="patrol" illustration={originalArtwork['aps-metier-site']} /><h4>Prévenir & surveiller</h4><p>Rondes, contrôle d’accès, protection des personnes et des biens.</p></div>
          <span className={styles.dualPlus} aria-hidden="true">+</span>
          <div className={styles.dualFire}><span className={styles.dualLabel}>SSIAP 1</span><ApsPracticalVisual kind="extinguisher" illustration={ssiapArtwork.evacuation} /><h4>Alerter & protéger</h4><p>Prévention incendie, évacuation et assistance aux personnes.</p></div>
        </div>
        <div className={styles.dualFooter}><span>Surveillance humaine <b>+</b> Sécurité incendie</span><CTA href="/formations-securite/ssiap-1" variant="dark" className="w-full">Découvrir le SSIAP 1 →</CTA><p>Deux qualifications complémentaires, chacune avec ses prérequis et son examen.</p></div>
      </article></div><ApsWorkplaces places={workplaces} /></Section>

    <ApsOfficialReferences conditions={workConditions} stats={nationalStats} />

    <TrainingCourseTestimonials category="APS" layout="home" />

    <div id="faq-aps"><PremiumFAQSection theme="blue" badge="FAQ APS" title="Les réponses avant de vous lancer" description="CNAPS (ministère de l’Intérieur), e-learning, examen, carte professionnelle et financement : retrouvez les informations indispensables avant votre inscription." items={faq} contactHref={apsContact('question APS')} /></div>

    <TrainingReferenceContact
      portraitMedallion
      description="Cassandre vérifie votre éligibilité, votre dossier CNAPS (ministère de l’Intérieur) et votre financement. Vous repartez avec des réponses claires et les prochaines étapes adaptées à votre situation."
      href={apsContact('rendez-vous avec Cassandre')}
      assurances={['Sans engagement', 'Étude personnalisée', 'Réponse sur le CNAPS (ministère de l’Intérieur) et le financement']}
    />
    <TrainingReferenceMobileBar label="Réserver ma place" />
  </TrainingReferencePage>;
}
