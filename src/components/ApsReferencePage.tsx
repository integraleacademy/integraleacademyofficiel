import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import { getSessionSeatAvailability } from '@/lib/session-seat-availability';
import styles from './ApsReferencePage.module.css';

const apsCpfUrl = 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/84089988400026_CQPAPS2022/84089988400026_CQPAPS2022?contexteFormation=ACTIVITE_PROFESSIONNELLE';
const identityNumeriqueUrl = 'https://lidentitenumerique.laposte.fr/';
const apsContact = (subject = 'inscription') => `/contact?formation=aps&objet=${encodeURIComponent(subject)}`;

const fallbackSessions = [
  { id: 'aps-septembre-2026', startDate: '2026-09-07T00:00:00.000Z', endDate: '2026-10-09T00:00:00.000Z', examDate: '2026-10-12T00:00:00.000Z', status: 'OPEN', seatsLeft: 3, showSeatsLeft: true, location: 'Puget-sur-Argens', priceLabel: '1 650 €' },
  { id: 'aps-novembre-2026', startDate: '2026-11-03T00:00:00.000Z', endDate: '2026-12-08T00:00:00.000Z', examDate: '2026-12-09T00:00:00.000Z', status: 'OPEN', seatsLeft: 6, showSeatsLeft: true, location: 'Puget-sur-Argens', priceLabel: '1 650 €' },
];

const heroFacts = [
  ['Certification', 'TFP APS', 'Titre à finalité professionnelle'],
  ['Niveau', 'Niveau 3', 'RNCP 36648'],
  ['Format', '51 h max.', 'à distance'],
  ['Campus', '124 h min.', 'en présentiel à Puget'],
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
  ['UV 2', 'Environnement juridique', '22 h', 'Jusqu’à 20 h à distance · 1 h de pratique', 'Livre VI du Code de la sécurité intérieure, déontologie et secret professionnel, responsabilités civiles et pénales, légitime défense, état de nécessité, article 73, libertés publiques, CNIL, droit de propriété, principes de la République et convention collective.'],
  ['UV 3', 'Gestion des conflits', '14 h', 'Jusqu’à 3 h à distance · 7 h de pratique', 'Origines et types de conflits, émotions, techniques verbales, posture, évaluation de la dangerosité, résolution et gestion des conséquences au travers de mises en situation.'],
  ['UV 4', 'Module stratégique', '7 h', 'Jusqu’à 4 h à distance', 'Comprendre, transmettre et restituer les consignes, rédiger un rapport circonstancié, utiliser les outils informatiques et exploiter une main courante électronique.'],
  ['UV 5', 'Prévention des risques d’incendie', '7 h', 'Présentiel · 3 h de pratique', 'Phénomène de l’incendie, alarmes, évacuation, mise en sécurité, accueil des secours et manipulation des moyens de première intervention sur feu réel.'],
  ['UV 6', 'Appréhension dans le cadre du métier', '7 h', 'Jusqu’à 3 h à distance', 'Appliquer l’article 73 du Code de procédure pénale et appréhender une personne dans le strict respect des textes et des missions confiées à l’agent APS.'],
  ['UV 7', 'Prévention des risques terroristes', '13 h', 'Jusqu’à 7 h à distance · 3,5 h de pratique', 'Identifier les menaces et matériels, détecter les comportements suspects, se protéger, protéger les autres, alerter, faciliter l’intervention des forces de l’ordre et appliquer les premières notions de secourisme tactique.'],
  ['UV 8', 'Module professionnel', '45 h', 'Présentiel · 25 h de pratique', 'Accueil et communication, préparation d’une intervention, préservation des traces et indices, contrôle des personnes, véhicules, objets et matériels, prise en compte du poste de sécurité et rondes de surveillance.'],
  ['UV 9', 'Palpation et inspection des bagages', '7 h', 'Présentiel · 4 h de pratique', 'Cadre légal, agréments et sanctions, point d’inspection-filtrage, découverte d’un objet prohibé, prise en compte des mineurs et des personnes en situation de handicap, palpation et inspection visuelle.'],
  ['UV 10', 'Surveillance électronique', '7 h', 'Présentiel · 4 h de pratique', 'Cadres juridiques de la télésurveillance et de la vidéoprotection, chaîne de télésécurité et principes d’installation d’un système de vidéoprotection.'],
  ['UV 11', 'Gestion des risques', '11 h', 'Jusqu’à 2 h à distance · 5 h de pratique', 'Alarmes intrusion et incendie, levée de doute, accueil des secours, GTC/GTB, protection du travailleur isolé, PTI/DATI et sensibilisation au risque électrique.'],
  ['UV 12', 'Événementiel spécifique', '7 h', 'Jusqu’à 7 h à distance', 'Cadre légal des rassemblements, sécurisation des événements, acteurs et publics, zones d’accès, filtrage, billetterie, fraude, mouvements de foule et procédures d’urgence.'],
  ['UV 13', 'Situations conflictuelles dégradées', '7 h', 'Présentiel · 4 h de pratique', 'Comprendre et maîtriser le stress, récupérer après l’événement et agir de manière actuelle, nécessaire et proportionnée face à une agression.'],
  ['UV 14', 'Risques industriels', '7 h', 'Jusqu’à 5 h à distance', 'Évaluation des risques professionnels, document unique, ICPE, SEVESO, ORSEC, équipements de protection, produits dangereux, SGH, CLP et zones ATEX.'],
];

const examSteps = [
  ['01', 'QCU contextualisés', 'Questionnaires à choix unique organisés électroniquement à partir d’une banque de plus de 1 000 questions régulièrement actualisée.'],
  ['02', 'Mise en situation n° 1', 'Épreuve individuelle portant notamment sur une ronde, la détection d’anomalies et le compte rendu.'],
  ['03', 'Mise en situation n° 2', 'Épreuve individuelle au poste de contrôle, face à un événement ou à un incident professionnel.'],
  ['04', 'Jury professionnel', 'Au minimum un représentant salarié et un représentant employeur justifiant chacun d’au moins deux années d’exercice dans le domaine.'],
];

const practicalExercises = [
  ['↻', 'Rondes de sécurité', 'Préparer une ronde, suivre un itinéraire, repérer les anomalies, effectuer une levée de doute et transmettre un compte rendu exploitable.'],
  ['✋', 'Palpation de sécurité', 'Apprendre les gestes professionnels, le positionnement, le consentement et le cadre légal applicable, au travers d’exercices encadrés.'],
  ['⌕', 'Inspection visuelle des bagages', 'Contrôler méthodiquement sacs et bagages dans le respect des droits des personnes et des consignes du site.'],
  ['⇥', 'Contrôle d’accès et gestion des flux', 'Vérifier les accès, badges et autorisations, accueillir le public et gérer une file ou un refus d’accès avec professionnalisme.'],
  ['⌁', 'Poste de sécurité', 'Utiliser la main courante, recevoir une alarme, appliquer les consignes, communiquer par radio et coordonner une intervention.'],
  ['!', 'Incidents et conflits', 'Réagir face à une anomalie, un comportement agressif ou une situation dégradée en gardant calme, distance et proportion.'],
  ['♨', 'Prévention incendie', 'Identifier un risque, effectuer une levée de doute, donner l’alerte, participer à l’évacuation et accueillir les secours.'],
  ['✚', 'Secours aux personnes', 'Mettre en œuvre les gestes appris pendant le SST lors de mises en situation proches du terrain.'],
];

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
  { q: 'La formation APS est-elle entièrement à distance ?', a: 'Non. Sur les 175 heures, 51 heures au maximum peuvent être réalisées à distance et 124 heures au minimum se déroulent en présentiel à Puget-sur-Argens. L’examen est obligatoirement organisé en présentiel.' },
  { q: 'Quelle est la part de pratique ?', a: 'Le programme prévoit 63,5 heures de pratique et 60,5 heures de théorie en présentiel. Les 51 heures restantes au maximum peuvent être réalisées à distance.' },
  { q: 'Le e-learning est-il obligatoire ?', a: 'Oui lorsqu’il est prévu dans le calendrier de la session. Il représente au maximum 51 heures, doit être suivi et validé, et la progression est contrôlée par l’équipe pédagogique.' },
  { q: 'Comment se déroule l’examen APS ?', a: 'L’examen associe des QCU contextualisés organisés électroniquement et deux mises en situation professionnelles individuelles, notamment autour de la ronde et du poste de contrôle.' },
  { q: 'La formation permet-elle d’obtenir directement la carte professionnelle ?', a: 'La réussite permet d’obtenir le TFP APS, qui justifie l’aptitude professionnelle. Vous devez ensuite déposer une demande de carte professionnelle auprès du CNAPS.' },
  { q: 'Quelles conditions concernent les ressortissants étrangers ?', a: 'La fiche RNCP indique qu’un ressortissant étranger doit être titulaire d’un titre de séjour depuis au moins cinq ans pour demander l’autorisation préalable. L’équipe vérifie les règles et pièces applicables à chaque situation.' },
  { q: 'Quel est le prix de la formation ?', a: 'Le tarif affiché est de 1 650 €. Les dates, places restantes et éventuelles informations tarifaires administrées restent affichées sur chaque session.' },
  { q: 'Puis-je financer la formation avec mon CPF ?', a: 'Oui, selon votre éligibilité et l’offre active. France Travail, un employeur, un OPCO ou un paiement personnel peuvent également être étudiés.' },
  { q: 'Le SST est-il inclus ?', a: 'Oui. Le parcours comprend la préparation au certificat Sauveteur Secouriste du Travail.' },
  { q: 'Une expérience dans la sécurité est-elle obligatoire ?', a: 'Non. La formation est accessible aux débutants qui remplissent les conditions administratives et linguistiques réglementaires.' },
];

function formatDate(value?: string | null, compact = false) {
  if (!value) return 'À confirmer';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value)).replace(/^0/, compact ? '' : '0');
}

function sessionHref(session: any) {
  return session?.id ? `/contact?formation=aps&session=${encodeURIComponent(String(session.id))}` : apsContact('prochaine session');
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

function EnrollmentStepIcon({ step }: { step: string }) {
  const iconClass = 'h-5 w-5';

  if (step === '01') return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClass}><path d="M8.1 3.5 5.7 4.6c-.9.4-1.3 1.4-1 2.3 2.1 6.1 6.3 10.3 12.4 12.4.9.3 1.9-.1 2.3-1l1.1-2.4-4.3-2-1.2 1.8c-2.9-1.2-5.5-3.8-6.7-6.7l1.8-1.2-2-4.3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>;
  if (step === '02') return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClass}><path d="M4 5.5h16v10H9l-5 3v-13Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
  if (step === '03') return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClass}><rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="9" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.7"/><path d="M6.5 16c.6-1.5 1.4-2.2 2.5-2.2s1.9.7 2.5 2.2M14.5 10h3M14.5 13h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
  if (step === '04') return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClass}><path d="M8 4h8M9 3v3M15 3v3M6 5h12v16H6V5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m9 11 1.4 1.4L13 9.8M9 16h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClass}><path d="M3.5 6.5h17v12h-17v-12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m4.5 8 7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="m8.5 18 3.5-3 3.5 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
}

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'stone' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] text-academy-ink' : tone === 'stone' ? 'bg-[#EFE7D9] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${styles.section} ${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-24`}><div className="page-container"><div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16"><div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className={`${styles.sectionHeading} mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl`}>{title}</h2></div>{intro && <div className={`${styles.sectionIntro} max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}</div>{children}</div></section>;
}

function CompactAssistant() {
  return <details className="group mt-3 overflow-hidden rounded-[1.35rem] border border-academy-line bg-white text-academy-ink shadow-soft"><summary className="flex cursor-pointer list-none items-center gap-3 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-academy-gold font-black text-academy-gold-text">✦</span><span className="min-w-0 flex-1"><strong className="block text-sm font-black">Une question avant de vous inscrire&nbsp;?</strong><small className="block text-xs font-semibold text-academy-muted">L’assistant vérifie les informations essentielles.</small></span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-academy-ink font-black text-white transition group-open:rotate-90">→</span></summary><div className="border-t border-academy-line bg-academy-bg p-3 sm:p-4"><OrientationAssistant initialFormationKey="aps" hideInfoAction /></div></details>;
}

function HeroSession({ session }: { session: any }) {
  const full = isSessionFull(session);
  const seatAvailability = getSessionSeatAvailability(session, 12);
  return <aside className={`${styles.sessionCard} rounded-[2rem] border border-white/80 bg-[#FFFDF8] p-5 text-academy-ink sm:p-6 lg:p-7`}><div className="grid gap-6 lg:grid-cols-[1.05fr_1.15fr_.9fr] lg:items-center"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-blue-50 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-blue-800 ring-1 ring-blue-200">Prochaine session</span><span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${seatAvailability.badgeClassName}`}>{seatAvailability.label}</span></div><h2 className={`${styles.sessionDate} mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl`}>{formatDate(session?.startDate, true)} <span className="text-yellow-600">→</span><br />{formatDate(session?.endDate, true)}</h2><p className="mt-2 text-sm font-extrabold text-academy-muted">Examen final le {formatDate(session?.examDate, true)}</p></div><div className="grid grid-cols-2 gap-2.5">{[['Durée', '175 heures'], ['Tarif', priceLabel(session?.priceLabel)], ['Lieu', session?.location || 'Puget-sur-Argens'], ['Format', 'Hybride']].map(([key, value]) => <div key={key} className={`${styles.metric} rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5`}><p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p><p className="mt-1 text-sm font-black sm:text-base">{value}</p></div>)}</div><div><CTA href={sessionHref(session)} variant={full ? 'light' : 'dark'} className="w-full">{full ? 'Être alerté de la prochaine session' : 'Réserver ma place →'}</CTA><p className="mt-3 text-center text-xs font-bold text-academy-muted">Un conseiller vérifie votre dossier avant validation.</p><CompactAssistant /></div></div></aside>;
}

export function ApsReferencePage({ sessions }: { sessions: any[] }) {
  const visibleSessions = sortSessionsChronologically(sessions.length ? sessions : fallbackSessions);
  const next = visibleSessions[0];
  return <main className={`${styles.page} relative overflow-hidden pb-24 lg:pb-0`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Agent de Prévention et de Sécurité APS', description: 'Formation TFP APS de 175 heures à Puget-sur-Argens : 124 heures minimum en présentiel, dont 63,5 heures de pratique et 60,5 heures de théorie, et 51 heures maximum à distance.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'APS', item: '/formations-securite/aps' }] },
    ] }) }} />

    <section className={`${styles.hero} relative min-h-[720px] px-4 text-white`}>
      <Image src="/images/aps/aps-hero-round.jpg" alt="Exercice pratique de ronde de sécurité pendant la formation APS" fill priority sizes="100vw" className={styles.heroPhoto}/>
      <div className={styles.heroOverlay}/>
      <div className="page-container relative flex min-h-[720px] items-center py-16 sm:py-20 lg:py-24">
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
      <div className={`${styles.facts} page-container relative -mt-28 grid overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#0A1421]/85 text-white backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-6`}>
        {heroFacts.map(([key,value,detail]) => <div key={key} className={`${styles.fact} border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0`}><p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p><p className="mt-1 font-black text-white">{value}</p><p className="mt-1 text-[.68rem] font-semibold leading-4 text-white/48">{detail}</p></div>)}
      </div>
    </section>

    <section className="relative z-20 bg-academy-bg px-4 pb-8 pt-10 sm:pt-12"><div className="page-container"><HeroSession session={next}/></div></section>

    <nav aria-label="Sommaire de la formation" className={`${styles.nav} sticky top-0 z-30 hidden bg-[#F6F1E8]/88 px-4 py-3 backdrop-blur-xl lg:block`}><div className={`${styles.navRail} page-container flex items-center justify-between gap-5`}><span className="text-xs font-black">TFP APS</span><div className="flex items-center gap-5 text-xs font-extrabold text-academy-muted">{[['Métier','#metier'],['Admission','#admission'],['Format hybride','#hybride'],['Pratique','#pratique'],['Programme','#programme'],['Examen','#examen'],['Dates & tarifs','#dates-tarifs'],['Débouchés','#debouches'],['FAQ','#faq-aps']].map(([label,href]) => <Link key={href} href={href} className="transition hover:text-academy-ink">{label}</Link>)}</div><CTA href={sessionHref(next)} variant="gold" className="min-h-10 px-4 py-2">Je m’inscris</CTA></div></nav>

    <Section id="metier" eyebrow="01 — Le métier" title={<>Un métier de terrain, de vigilance et de sang-froid.</>} intro={<>L’agent APS prévient les risques, protège les personnes et les biens, applique les consignes et rend compte de chaque événement.</>}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">{missions.map(([icon,title,text,featured],index) => <article key={String(title)} className={`${styles.liftCard} ${index === 0 || index === 4 ? 'lg:col-span-5' : index === 1 || index === 3 ? 'lg:col-span-3' : 'lg:col-span-4'} rounded-[1.8rem] border p-6 shadow-soft ${featured ? 'border-[#26384F] bg-[#0D1725] text-white' : 'border-academy-line bg-[#FFFDF8]'}`}><span className={styles.cardNumber}>MISSION 0{index+1}</span><span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-black ${featured ? 'bg-white/10 text-sky-300' : 'bg-academy-bg text-yellow-700'}`}>{icon}</span><h3 className="mt-7 text-xl font-black">{title}</h3><p className={`mt-3 leading-7 ${featured ? 'text-white/65' : 'text-academy-muted'}`}>{text}</p></article>)}</div><div className={`${styles.liftCard} mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:grid-cols-[.7fr_1.3fr] lg:p-8`}><div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours accessible, un métier réglementé.</h3><p className="mt-4 leading-7 text-academy-muted">Aucune expérience préalable dans la sécurité n’est obligatoire.</p></div><div className="grid gap-3 sm:grid-cols-2">{audiences.map((item,index) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${index === 5 ? 'bg-orange-100 text-orange-700' : 'bg-sky-100 text-sky-700'}`}>✓</span>{item}</div>)}</div></div></Section>

    <Section id="admission" eyebrow="02 — Admission" title={<>Votre dossier est-il prêt pour l’APS&nbsp;?</>} intro={<>Nous contrôlons chaque condition avant votre entrée en formation et vous accompagnons dans la démarche d’autorisation préalable.</>} tone="dark"><div className="grid gap-4 md:grid-cols-2">{prerequisites.map(([title,text]) => <article key={title} className={`${styles.liftCard} rounded-[1.7rem] border border-white/10 bg-white/7 p-5`}><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-400/15 font-black text-blue-300">✓</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-white/62">{text}</p></article>)}</div><div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-[1.8rem] bg-gradient-to-r from-[#F7D57D] to-[#F0B52E] p-6 text-academy-gold-text lg:flex-row lg:items-center"><div><p className="text-xl font-black">Bonne nouvelle : nous préparons votre demande CNAPS.</p><p className="mt-1 font-semibold opacity-75">Vous fournissez les documents, notre équipe vous accompagne dans le dépôt.</p></div><CTA href={apsContact('autorisation préalable CNAPS')} variant="dark">Faire vérifier mon dossier →</CTA></div><div className="mt-8 grid gap-3 md:grid-cols-4">{cnapsSteps.map((item,index) => <div key={item} className="rounded-[1.4rem] bg-white p-4 text-academy-ink"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1725] text-xs font-black text-academy-gold">0{index+1}</span><p className="mt-5 font-black">{item}</p></div>)}</div></Section>

    <Section
      id="hybride"
      eyebrow="03 — Format hybride"
      title={<>La souplesse du distanciel, l’exigence du terrain.</>}
      intro={<>Le programme réglementaire totalise 175 heures : 124 heures minimum en présentiel et 51 heures maximum à distance.</>}
      tone="paper"
    >
      <div className="grid overflow-hidden rounded-[2rem] border border-academy-line shadow-card lg:grid-cols-2">
        <article className="bg-[#0D1725] p-7 text-white lg:p-9">
          <span className="text-5xl font-black text-sky-300">51 h max.</span>
          <h3 className="mt-2 text-2xl font-black">à distance</h3>
          <div className="mt-6 grid gap-3">{['Plateforme accessible 24h/24','Vidéos et supports','Exercices et tests','Progression suivie'].map(item => <p key={item} className="flex gap-3 font-bold text-white/72"><span className="text-sky-300">✓</span>{item}</p>)}</div>
        </article>
        <article className="bg-white p-7 lg:p-9">
          <span className="text-5xl font-black text-blue-700">124 h min.</span>
          <h3 className="mt-2 text-2xl font-black">en présentiel</h3>
          <div className="mt-6 grid gap-3">{['63,5 h de pratique','60,5 h de théorie en présentiel','Rondes et mises en situation','Préparation à l’examen'].map(item => <p key={item} className="flex gap-3 font-bold text-academy-muted"><span className="text-blue-600">✓</span>{item}</p>)}</div>
        </article>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[['71 %','du parcours au minimum en présentiel'],['36 %','du parcours consacré à la pratique'],['29 %','du parcours au maximum à distance']].map(([value,label]) => <div key={value} className="rounded-[1.4rem] border border-academy-line bg-white p-5 text-center"><p className="text-3xl font-black text-academy-ink">{value}</p><p className="mt-2 text-sm font-bold leading-6 text-academy-muted">{label}</p></div>)}
      </div>
      <div className="mt-5 rounded-[1.5rem] border border-academy-gold/60 bg-academy-gold/10 p-5"><p className="font-black">Vous n’êtes jamais seul devant votre écran.</p><p className="mt-1 text-sm font-semibold text-academy-muted">Votre progression à distance est suivie et l’équipe pédagogique reste disponible. Les enseignements en présentiel associent théorie, exercices et mises en situation.</p></div>
      <div className="mt-10"><Eyebrow>Organisation</Eyebrow><h3 className="mt-3 text-3xl font-black">Une session, quatre temps forts.</h3><div className="mt-6 grid gap-3 md:grid-cols-4">{[['Accueil au centre','Présentation du parcours'],['Jusqu’à 51 h à distance','Notions autorisées en distanciel'],['Au moins 124 h au campus','Théorie et pratique encadrées'],['Examen en présentiel','Évaluation devant jury']].map(([title,text],index) => <div key={title} className={`rounded-[1.5rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-academy-bg'}`}><span className="text-3xl font-black text-yellow-600">0{index+1}</span><h4 className="mt-6 text-lg font-black">{title}</h4><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></div>)}</div></div>
    </Section>

    <Section id="pratique" eyebrow="04 — Immersion terrain" title={<>Vous ne regardez pas seulement&nbsp;: vous pratiquez.</>} intro={<>La formation vous place dans des situations proches du réel. Chaque geste est expliqué, répété, observé puis débriefé avec le formateur.</>} tone="dark"><div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]"><figure className={`${styles.practicePhotoCard} min-h-[520px]`}><Image src="/images/aps/aps-training-bag-inspection.jpg" alt="Exercice d’inspection visuelle des bagages en formation APS" fill sizes="(min-width: 1024px) 54vw, 100vw" className={styles.practicePhoto}/><div className={styles.practicePhotoOverlay}/><figcaption className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8"><span className="inline-flex rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.18em] text-white backdrop-blur">Mise en situation réelle</span><h3 className="mt-4 max-w-xl text-3xl font-black sm:text-4xl">Inspection visuelle des bagages et contrôle d’accès</h3><p className="mt-3 max-w-xl leading-7 text-white/72">Adopter la bonne méthode, respecter le cadre légal, communiquer clairement et sécuriser un accès sans créer de tension.</p></figcaption></figure><div className="grid gap-5"><figure className={`${styles.practicePhotoCard} min-h-[330px]`}><Image src="/images/aps/aps-training-patdown.jpg" alt="Exercice encadré de palpation de sécurité pendant la formation APS" fill sizes="(min-width: 1024px) 46vw, 100vw" className={styles.practicePhoto}/><div className={styles.practicePhotoOverlay}/><figcaption className="absolute inset-x-0 bottom-0 z-10 p-6"><p className="text-[.62rem] font-black uppercase tracking-[.18em] text-[#F9DC8A]">Atelier encadré</p><h3 className="mt-2 text-2xl font-black">Palpation de sécurité</h3><p className="mt-2 text-sm leading-6 text-white/70">Positionnement, consentement, gestes professionnels et respect de la personne.</p></figcaption></figure><div className="grid gap-3 sm:grid-cols-2">{[['↻','Observer'],['⌕','Contrôler'],['!','Réagir'],['⌁','Rendre compte']].map(([icon,label]) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/7 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-academy-gold font-black text-academy-gold-text">{icon}</span><span className="font-black">{label}</span></div>)}</div></div></div>
      <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {practicalExercises.map(([icon,title,text],index) => <article key={title} className={`${styles.practicalCard} ${index === 0 ? styles.practicalPrimary : ''} rounded-[1.5rem] border border-white/10 bg-white/7 p-5`}>
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3"><span className={`${styles.practicalIcon} grid h-10 w-10 place-items-center rounded-xl bg-academy-gold font-black text-academy-gold-text`}>{icon}</span><span className="text-[.58rem] font-black tracking-[.16em] text-white/30">0{index+1}</span></div>
            <h3 className="mt-4 text-lg font-black">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
            {index === 0 && <div className={`${styles.practiceVisual} mt-6`} role="img" aria-label="Simulation animée d’une ronde de sécurité"><div className={styles.scanLine}/><span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-sky-200">Simulation terrain</span><span className="absolute bottom-4 left-4 text-xs font-bold text-white/45">Observer · contrôler · signaler</span></div>}
          </div>
        </article>)}
      </div><div className="mt-7 grid gap-4 rounded-[1.7rem] border border-blue-300/25 bg-blue-400/10 p-6 lg:grid-cols-[auto_1fr] lg:items-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-300 text-2xl font-black text-blue-950">✓</span><div><p className="text-xl font-black text-blue-200">L’objectif : transformer les connaissances en réflexes professionnels.</p><p className="mt-2 max-w-4xl leading-7 text-white/68">Observation, positionnement, communication, respect du cadre légal, compte rendu et choix d’une réponse adaptée sont analysés après chaque scénario.</p></div></div></Section>

    <Section id="programme" eyebrow="05 — Programme" title={<>Les 14 UV du programme officiel, sans raccourci.</>} intro={<>Programme CPNEFP version V3.2 mis à jour le 23 juillet 2026 : 41 heures de socle de base et 134 heures de spécialité APS, soit 175 heures au total.</>}>
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

    <Section id="examen" eyebrow="06 — Examen" title={<>Un examen qui valide vos réflexes.</>} intro={<>Des QCU contextualisés et deux épreuves individuelles de mise en situation sont évalués devant des professionnels du secteur.</>} tone="paper"><div className={`${styles.examGrid} grid gap-4 lg:grid-cols-4`}>{examSteps.map(([number,title,text],index) => <article key={number} className={`${styles.examCard} rounded-[1.7rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-white'}`}><span className="grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black text-academy-gold-text">{number}</span><h3 className="mt-6 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></article>)}</div><div className="mt-6 rounded-[1.5rem] border border-blue-200 bg-blue-50 p-5 text-center font-black text-blue-800">Après réussite : obtention du TFP APS de niveau 3 et du certificat SST. La carte professionnelle fait ensuite l’objet d’une demande distincte auprès du CNAPS.</div></Section>

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
      remotePeriodFallback="51 h maximum · calendrier détaillé à confirmer"
      inPersonPeriodFallback="124 h minimum · calendrier détaillé à confirmer"
      defaultPrice="1 650 €"
      defaultLocation="Puget-sur-Argens"
      priceDescription="Formation complète · SST inclus · examen final"
      registrationHref={sessionHref}
      priceAction={{ href: apsCpfUrl, label: 'S’inscrire avec mon CPF 🔐', external: true }}
    >
      <div className="mt-7 rounded-[1.5rem] border border-amber-300 bg-amber-50 p-5 text-amber-950">
        <p className="font-black">Validité de l’enregistrement RNCP</p>
        <p className="mt-2 text-sm font-semibold leading-6">La fiche RNCP36648 fournie indique un enregistrement jusqu’au 1er juillet 2027. Toute session débutant après cette date est proposée sous réserve du renouvellement de l’enregistrement ou de la certification qui le remplacera.</p>
      </div>
    </TrainingDatesPricingSection>

    <section id="inscription-financement" className={`${styles.enrollmentSection} relative isolate overflow-hidden bg-[#0A1725] px-4 py-14 text-white sm:py-16 lg:py-20`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_12%,rgba(59,130,246,.28),transparent_27%),linear-gradient(145deg,#07111D,#112641)]" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="page-container">
        <Eyebrow light>08 — Inscription & financement</Eyebrow>
        <div className={`${styles.enrollmentHero} mt-3 grid gap-8 rounded-[2.2rem] border border-white/10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:p-10`}>
          <div className="min-w-0">
            <h2 className="max-w-5xl text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">
              <span className="block">Du premier appel à votre entrée en formation.</span>
              <span className={`${styles.enrollmentPromise} mt-2 block`}>Nous vous accompagnons de A à Z</span>
            </h2>
            <p className={`${styles.enrollmentIntro} mt-6 max-w-4xl text-base font-medium leading-8 text-white/70`}>Tout commence par un rendez-vous téléphonique avec un membre de notre équipe. Contactez-nous au 04 22 47 07 68 pour réserver votre RDV téléphonique. Nous étudions votre projet en détails et nous vous accompagnons dans toutes vos démarches du financement, l’inscription, jusqu’à votre formation et l’obtention de votre diplôme.</p>
          </div>
          <div className={`${styles.enrollmentCtaWrap} relative flex w-full items-center justify-center lg:w-auto`}>
            <CTA href={apsContact('commencer mon inscription')} variant="gold" className={`${styles.enrollmentPrimaryCta} w-full lg:w-auto`}>Commencer mon inscription →</CTA>
          </div>
        </div>

        <div className={`${styles.enrollmentJourney} mt-8`}>
          <div className={`${styles.enrollmentGrid} grid gap-3 sm:grid-cols-2 lg:grid-cols-5`}>
            {enrollmentSteps.map(([number, title, text]) => (
              <article key={number} className={`${styles.enrollmentCard} ${(number === '01' || number === '03') ? styles.enrollmentCardFeatured : ''} rounded-[1.7rem] border border-white/10 bg-white/7 p-5`}>
                <div className={styles.enrollmentCardTop}>
                  <span className={styles.enrollmentNumber}>{number}</span>
                  <span className={styles.enrollmentIcon}><EnrollmentStepIcon step={number} /></span>
                </div>
                <h3 className={`${styles.enrollmentCardTitle} mt-7 text-lg font-black`}>{title}</h3>
                <p className={`${styles.enrollmentCardText} mt-3 text-sm leading-6 text-white/62`}>{text}</p>
                {number === '01' && <a href="tel:0422470768" className={`${styles.enrollmentCardLink} mt-5 inline-flex text-sm font-black text-blue-200 transition hover:text-white`}>Appeler le 04 22 47 07 68 →</a>}
                {number === '03' && <a href={identityNumeriqueUrl} target="_blank" rel="noopener noreferrer" className={`${styles.enrollmentCardLink} mt-5 inline-flex text-sm font-black text-blue-200 transition hover:text-white`}>Créer mon Identité Numérique →</a>}
              </article>
            ))}
          </div>
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

    <Section id="debouches" eyebrow="09 — Débouchés & emploi" title={<>Un premier titre pour intégrer un secteur qui recrute.</>} intro={<>Les besoins sont réguliers dans de nombreux environnements : commerce, industrie, logistique, santé, bureaux, événementiel et sites sensibles. Le TFP APS ouvre l’accès à des missions variées, sous réserve d’obtenir la carte professionnelle CNAPS.</>} tone="paper"><div className="mb-8 grid gap-4 md:grid-cols-3"><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-blue-200 bg-blue-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-blue-700">Un besoin permanent</p><h3 className="mt-3 text-2xl font-black">Des recrutements toute l’année</h3><p className="mt-3 leading-7 text-blue-950/70">Les entreprises de sécurité doivent couvrir des prestations de jour, de nuit, en semaine, le week-end et lors de grands événements.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-sky-200 bg-sky-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-sky-700">Des missions variées</p><h3 className="mt-3 text-2xl font-black">De nombreux sites à sécuriser</h3><p className="mt-3 leading-7 text-sky-950/70">Vous pouvez travailler sur un site fixe, effectuer des rondes, contrôler des accès, sécuriser un événement ou intervenir sur plusieurs sites.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-yellow-300 bg-yellow-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-yellow-800">Des évolutions possibles</p><h3 className="mt-3 text-2xl font-black">Construire un parcours</h3><p className="mt-3 leading-7 text-yellow-950/70">Avec l’expérience et des qualifications complémentaires, vous pouvez viser des fonctions de chef de poste, de sécurité incendie, de télésurveillance ou d’encadrement.</p></article></div><div className="grid gap-4 md:grid-cols-4">{[['Réussir le TFP APS','Valider les épreuves'],['Recevoir le titre niveau 3','Obtenir la certification'],['Demander la carte CNAPS','Constituer le dossier'],['Commencer à exercer','Après délivrance de la carte']].map(([title,text],index) => <article key={title} className={`${styles.examCard} rounded-[1.7rem] border border-academy-line bg-white p-5 text-center`}><span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black">0{index+1}</span><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-academy-muted">{text}</p></article>)}</div><div className="mt-5 rounded-[1.4rem] border border-yellow-300 bg-yellow-50 p-4 font-bold text-yellow-900">Important : le TFP APS ne déclenche pas automatiquement la carte professionnelle.</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><Eyebrow>Débouchés</Eyebrow><h3 className="mt-3 text-3xl font-black">Les métiers accessibles</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map(([icon,title]) => <div key={title} className={styles.jobCard}><span className={styles.jobIcon}>{icon}</span><span className="text-sm font-black leading-5">{title}</span></div>)}</div></article><article className="relative overflow-hidden rounded-[2rem] bg-[#0D1725] p-6 text-white"><div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 shadow-[0_0_0_45px_rgba(255,255,255,.025),0_0_0_90px_rgba(255,255,255,.015)]"/><div className="relative"><Eyebrow light>Double compétence</Eyebrow><h3 className="mt-3 text-3xl font-black">APS + SSIAP 1</h3><p className="mt-4 max-w-md leading-7 text-white/65">Élargissez vos opportunités en associant surveillance humaine et sécurité incendie.</p><div className="mt-7 grid gap-3"><div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/7 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-black text-sky-200">01</span><div><p className="font-black">Obtenir le TFP APS</p><p className="mt-1 text-xs font-semibold text-white/45">Socle de la surveillance humaine</p></div></div><div className="ml-5 h-5 w-px bg-gradient-to-b from-white/25 to-academy-gold"/><div className="flex items-center gap-4 rounded-2xl border border-academy-gold/40 bg-academy-gold/12 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-academy-gold text-sm font-black text-academy-gold-text">02</span><div><p className="font-black text-[#F9DC8A]">Ajouter le SSIAP 1</p><p className="mt-1 text-xs font-semibold text-white/50">Spécialisation sécurité incendie</p></div></div><div className="ml-5 h-5 w-px bg-gradient-to-b from-academy-gold to-blue-300"/><div className="flex items-center gap-4 rounded-2xl border border-blue-300/20 bg-blue-300/10 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-300 text-sm font-black text-blue-950">03</span><div><p className="font-black text-blue-200">Élargir les postes accessibles</p><p className="mt-1 text-xs font-semibold text-white/50">Selon les qualifications exigées par l’employeur</p></div></div></div><CTA href="/formations-securite/ssiap-1" variant="gold" className="mt-6">Découvrir le SSIAP 1 →</CTA></div></article></div><article className="mt-5 rounded-[2rem] border border-academy-line bg-white p-6"><h3 className="text-2xl font-black">Où travailler ?</h3><p className="mt-2 leading-7 text-academy-muted">Les agents APS interviennent aussi bien dans des lieux ouverts au public que sur des sites professionnels à accès contrôlé.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{workplaces.map(item => <div key={item} className={`${styles.workplace} rounded-2xl bg-academy-bg p-4 text-center font-black`}>{item}</div>)}</div></article><div className="mt-5 rounded-[1.5rem] border border-academy-line bg-[#FFFDF8] p-5"><p className="font-black">Bon à savoir : horaires et conditions varient selon les postes.</p><p className="mt-2 text-sm leading-6 text-academy-muted">Le secteur propose des emplois de jour ou de nuit, à temps plein ou partiel, sur site fixe ou mobile. Disponibilité, ponctualité, présentation, maîtrise de soi et qualité du compte rendu sont particulièrement recherchées par les employeurs.</p></div></Section>

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

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href={sessionHref(next)} variant="gold" className="min-w-0 flex-[1.4] px-3">Réserver ma place</CTA></div></div>
  </main>;
}
