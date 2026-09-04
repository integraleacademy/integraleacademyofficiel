import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';
import styles from './ApsReferencePage.module.css';

const apsCpfUrl = 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/84089988400026_CQPAPS2022/84089988400026_CQPAPS2022?contexteFormation=ACTIVITE_PROFESSIONNELLE';
const apsContact = (subject = 'inscription') => `/contact?formation=aps&objet=${encodeURIComponent(subject)}`;

const fallbackSessions = [
  { id: 'aps-septembre-2026', startDate: '2026-09-07T00:00:00.000Z', endDate: '2026-10-09T00:00:00.000Z', examDate: '2026-10-12T00:00:00.000Z', status: 'OPEN', seatsLeft: 3, showSeatsLeft: true, location: 'Puget-sur-Argens', priceLabel: '1 650 €' },
  { id: 'aps-novembre-2026', startDate: '2026-11-03T00:00:00.000Z', endDate: '2026-12-08T00:00:00.000Z', examDate: '2026-12-09T00:00:00.000Z', status: 'OPEN', seatsLeft: 6, showSeatsLeft: true, location: 'Puget-sur-Argens', priceLabel: '1 650 €' },
];

const heroFacts = [
  ['Diplôme', 'TFP APS', 'Titre professionnel reconnu'],
  ['Niveau', 'Niveau 3', 'RNCP 36648'],
  ['Format', '62 h', 'e-learning accompagné'],
  ['Campus', '113 h', 'présentiel à Puget'],
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
  ['Niveau de français vérifié', 'Compréhension écrite et orale suffisante pour suivre les cours et les consignes.'],
  ['Pièce d’identité valide', 'Carte nationale d’identité, passeport ou titre admis en cours de validité.'],
  ['Justificatif de domicile récent', 'Document récent nécessaire à la préparation du dossier administratif.'],
];

const cnapsSteps = ['Échange conseiller', 'Vérification du dossier', 'Demande CNAPS', 'Admission confirmée'];

const program = [
  ['01', 'SST — Secours à personne', 'Protéger, examiner, alerter et secourir.'],
  ['02', 'Environnement juridique', 'Code de la sécurité intérieure, déontologie et libertés publiques.'],
  ['03', 'Gestion des conflits', 'Prévenir les tensions et adopter une réponse professionnelle.'],
  ['04', 'Transmission des consignes', 'Comprendre, restituer et effectuer une remontée claire.'],
  ['05', 'Incendie et alarmes', 'Prévention, évacuation, levée de doute et accueil des secours.'],
  ['06', 'Surveillance et gardiennage', 'Contrôle d’accès, poste de sécurité, rondes et communication.'],
  ['07', 'Palpation et bagages', 'Cadre légal et techniques d’inspection visuelle.'],
  ['08', 'Télésurveillance et vidéoprotection', 'Bases juridiques et opérationnelles de la télésécurité.'],
  ['09', 'Sécurité événementielle', 'Gestion des flux, accès, rassemblements et urgence.'],
  ['10', 'Situations dégradées', 'Stress, menace et réponse adaptée et proportionnée.'],
  ['11', 'Risques professionnels', 'Risques industriels, EPI et plans d’intervention.'],
  ['12', 'Prévention du risque terroriste', 'Vigilance, réaction et protection des personnes.'],
];

const examSteps = [
  ['01', 'QCU sur tablette', 'Note supérieure à 12/20 pour chaque module.'],
  ['02', 'Ronde de sécurité', 'Détection d’anomalies et compte rendu.'],
  ['03', 'Poste de contrôle', 'Mise en situation professionnelle devant jury.'],
  ['04', 'TFP APS + SST', 'Titre niveau 3 et certificat SST.'],
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
  ['01', 'Prenez contact', 'Appelez-nous au 04 22 47 07 68 ou demandez un rendez-vous. Un conseiller échange avec vous sur votre projet, votre situation et la session souhaitée.'],
  ['02', 'Vérifions votre admissibilité', 'Nous contrôlons les prérequis, les pièces d’identité et votre niveau de français, puis nous vous expliquons la démarche CNAPS.'],
  ['03', 'Choisissez votre financement', 'CPF, France Travail, employeur, OPCO ou financement personnel : nous identifions avec vous la solution adaptée et les démarches à effectuer.'],
  ['04', 'Finalisons les démarches', 'Nous vous accompagnons pour l’autorisation préalable CNAPS et la constitution du dossier de financement et d’inscription.'],
  ['05', 'Recevez votre convocation', 'Après validation du financement et du dossier administratif, votre inscription est confirmée et vous recevez toutes les informations de démarrage.'],
];

const financingOptions = [
  ['CPF', 'Mobilisez vos droits disponibles depuis Mon Compte Formation. Une Identité Numérique La Poste peut être nécessaire pour confirmer l’achat.'],
  ['France Travail', 'Votre conseiller peut étudier une prise en charge selon votre projet professionnel. Nous préparons les éléments utiles à votre demande.'],
  ['Employeur ou OPCO', 'La formation peut être financée dans le cadre d’un projet de recrutement, d’une évolution professionnelle ou du plan de développement des compétences.'],
  ['Financement personnel', 'Vous financez directement votre parcours. Des facilités de paiement peuvent être étudiées avec notre équipe selon votre dossier.'],
];

const jobs = [
  ['◉', 'Agent de prévention et de sécurité'],
  ['⌁', 'Agent de surveillance'],
  ['↻', 'Agent rondier'],
  ['⌖', 'Agent mobile / intervenant'],
  ['★', 'Agent de sécurité événementielle'],
  ['▣', 'Agent arrière-caisse'],
  ['⇥', 'Agent de contrôle d’accès'],
  ['▦', 'Opérateur de vidéoprotection selon poste et habilitations'],
];
const workplaces = ['Commerces', 'Centres commerciaux', 'Bureaux et sièges sociaux', 'Hôtels', 'Sites industriels', 'Entrepôts et plateformes logistiques', 'Événements', 'Établissements de santé', 'Chantiers', 'Résidences', 'Parkings', 'Sites culturels et de loisirs'];

const faq = [
  { q: 'Faut-il une autorisation CNAPS avant d’entrer en formation ?', a: 'Oui, sauf si vous possédez déjà une carte professionnelle en cours de validité pour l’activité concernée. Intégrale Academy vous accompagne dans la préparation et le dépôt de la demande.' },
  { q: 'La formation APS est-elle entièrement à distance ?', a: 'Non. Elle comprend 62 heures de e-learning encadré et 113 heures en présentiel à Puget-sur-Argens. L’examen se déroule obligatoirement en présentiel.' },
  { q: 'Le e-learning est-il obligatoire ?', a: 'Oui. Les 62 heures doivent être suivies et validées selon le calendrier de la session. Votre progression est contrôlée par l’équipe pédagogique.' },
  { q: 'Comment se déroule l’examen APS ?', a: 'L’examen associe des QCU sur tablette et des mises en situation professionnelles, notamment une ronde de sécurité et un exercice au poste de contrôle.' },
  { q: 'La formation permet-elle d’obtenir directement la carte professionnelle ?', a: 'La réussite permet d’obtenir le TFP APS, qui justifie l’aptitude professionnelle. Vous devez ensuite déposer une demande de carte professionnelle auprès du CNAPS.' },
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

function seatsLabel(session: any) {
  if (session?.status === 'FULL' || Number(session?.seatsLeft) === 0) return 'Session complète';
  if (session?.showSeatsLeft === false || session?.seatsLeft === null || session?.seatsLeft === undefined) return 'Places limitées';
  return Number(session.seatsLeft) === 1 ? '1 place restante' : `${session.seatsLeft} places restantes`;
}

function priceLabel(value: unknown) {
  if (typeof value === 'number') return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  const text = String(value || '1 650 €').trim();
  return /^\d+(?:[.,]\d+)?$/.test(text) ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(text.replace(',', '.'))) : text;
}

function CTA({ href, children, variant = 'dark', className = '', external = false }: { href: string; children: ReactNode; variant?: 'dark' | 'gold' | 'light' | 'outline' | 'blue'; className?: string; external?: boolean }) {
  const variantStyles = {
    dark: 'bg-academy-ink text-white hover:bg-black',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
    blue: 'bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:brightness-105',
  };
  const classNames = `${styles.cta} inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-academy-gold/25 ${variantStyles[variant]} ${className}`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={classNames}>{children}</a>;
  return <Link href={href} className={classNames}>{children}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-emerald-300' : 'text-yellow-700'}`}>{children}</p>;
}

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'stone' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] text-academy-ink' : tone === 'stone' ? 'bg-[#EFE7D9] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${styles.section} ${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-24`}><div className="page-container"><div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16"><div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className={`${styles.sectionHeading} mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl`}>{title}</h2></div>{intro && <div className={`${styles.sectionIntro} max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}</div>{children}</div></section>;
}

function CompactAssistant() {
  return <details className="group mt-3 overflow-hidden rounded-[1.35rem] border border-academy-line bg-white text-academy-ink shadow-soft"><summary className="flex cursor-pointer list-none items-center gap-3 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-academy-gold font-black text-academy-gold-text">✦</span><span className="min-w-0 flex-1"><strong className="block text-sm font-black">Une question avant de vous inscrire&nbsp;?</strong><small className="block text-xs font-semibold text-academy-muted">L’assistant vérifie les informations essentielles.</small></span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-academy-ink font-black text-white transition group-open:rotate-90">→</span></summary><div className="border-t border-academy-line bg-academy-bg p-3 sm:p-4"><OrientationAssistant initialFormationKey="aps" hideInfoAction /></div></details>;
}

function HeroSession({ session }: { session: any }) {
  const full = session?.status === 'FULL' || Number(session?.seatsLeft) === 0;
  return <aside className={`${styles.sessionCard} rounded-[2rem] border border-white/70 bg-[#FFFDF8] p-5 text-academy-ink sm:p-6`}><div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-emerald-800 ring-1 ring-emerald-200">Prochaine session</span><span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${full ? 'border-stone-300 bg-stone-100 text-stone-700' : 'border-yellow-300 bg-yellow-50 text-yellow-800'}`}>{seatsLabel(session)}</span></div><h2 className={`${styles.sessionDate} mt-5 text-3xl font-black tracking-[-.04em] sm:text-4xl`}>{formatDate(session?.startDate, true)} <span className="text-yellow-600">→</span><br />{formatDate(session?.endDate, true)}</h2><p className="mt-2 text-sm font-extrabold text-academy-muted">Examen final le {formatDate(session?.examDate, true)}</p><div className="mt-5 grid grid-cols-2 gap-2.5">{[['Durée', '175 heures'], ['Tarif', priceLabel(session?.priceLabel)], ['Lieu', session?.location || 'Puget-sur-Argens'], ['Format', 'Hybride']].map(([key, value]) => <div key={key} className={`${styles.metric} rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5`}><p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p><p className="mt-1 text-sm font-black sm:text-base">{value}</p></div>)}</div><CTA href={sessionHref(session)} variant={full ? 'light' : 'dark'} className="mt-5 w-full">{full ? 'Être alerté de la prochaine session' : 'Réserver ma place →'}</CTA><CompactAssistant /></aside>;
}

export function ApsReferencePage({ sessions }: { sessions: any[] }) {
  const visibleSessions = sessions.length ? sessions : fallbackSessions;
  const next = visibleSessions[0];
  return <main className={`${styles.page} relative overflow-hidden pb-24 lg:pb-0`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Agent de Prévention et de Sécurité APS', description: 'Formation TFP APS de 175 heures à Puget-sur-Argens, avec 62 heures en e-learning et 113 heures en présentiel.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'APS', item: '/formations-securite/aps' }] },
    ] }) }} />

    <section className={`${styles.hero} px-4 pb-9 pt-10 text-white sm:pt-14 lg:pb-10 lg:pt-16`}><div className={styles.heroGlow}/><div className="page-container"><div className="grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12"><div><span className={`${styles.heroBadge} inline-flex items-center gap-2 rounded-full border border-academy-gold/45 bg-academy-gold/10 px-4 py-2 text-[.68rem] font-black uppercase tracking-[.2em] text-[#F7D878] backdrop-blur`}><span className="h-2.5 w-2.5 rounded-full bg-academy-gold shadow-[0_0_16px_rgba(238,184,47,.9)]"/>TFP APS · RNCP 36648 · niveau 3</span><h1 className={`${styles.heroTitle} mt-5 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl xl:text-7xl`}>Devenez agent de <span className={styles.heroTitleAccent}>sécurité privée.</span></h1><p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/72 sm:text-xl">Prévenez les risques, surveillez les sites et protégez les personnes dans le respect du cadre légal.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={apsContact('éligibilité')} variant="gold">Vérifier mon éligibilité →</CTA><CTA href="tel:0422470768" variant="outline">Parler à un conseiller</CTA></div><div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-white/75"><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ Autorisation CNAPS accompagnée</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ SST inclus</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ Financements possibles</span></div></div><HeroSession session={next}/></div><div className={`${styles.facts} mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 sm:grid-cols-2 lg:grid-cols-6`}>{heroFacts.map(([key,value,detail]) => <div key={key} className={`${styles.fact} border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0`}><p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p><p className="mt-1 font-black text-white">{value}</p><p className="mt-1 text-[.68rem] font-semibold leading-4 text-white/48">{detail}</p></div>)}</div></div></section>

    <nav aria-label="Sommaire de la formation" className={`${styles.nav} sticky top-0 z-30 hidden bg-[#F6F1E8]/88 px-4 py-3 backdrop-blur-xl lg:block`}><div className={`${styles.navRail} page-container flex items-center justify-between gap-5`}><span className="text-xs font-black">TFP APS</span><div className="flex items-center gap-5 text-xs font-extrabold text-academy-muted">{[['Métier','#metier'],['Admission','#admission'],['Format hybride','#hybride'],['Pratique','#pratique'],['Programme','#programme'],['Examen','#examen'],['Dates & tarifs','#dates-tarifs'],['Débouchés','#debouches'],['FAQ','#faq-aps']].map(([label,href]) => <Link key={href} href={href} className="transition hover:text-academy-ink">{label}</Link>)}</div><CTA href={sessionHref(next)} variant="gold" className="min-h-10 px-4 py-2">Je m’inscris</CTA></div></nav>

    <Section id="metier" eyebrow="01 — Le métier" title={<>Un métier de terrain, de vigilance et de sang-froid.</>} intro={<>L’agent APS prévient les risques, protège les personnes et les biens, applique les consignes et rend compte de chaque événement.</>}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">{missions.map(([icon,title,text,featured],index) => <article key={String(title)} className={`${styles.liftCard} ${index === 0 || index === 4 ? 'lg:col-span-5' : index === 1 || index === 3 ? 'lg:col-span-3' : 'lg:col-span-4'} rounded-[1.8rem] border p-6 shadow-soft ${featured ? 'border-[#26384F] bg-[#0D1725] text-white' : 'border-academy-line bg-[#FFFDF8]'}`}><span className={styles.cardNumber}>MISSION 0{index+1}</span><span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-black ${featured ? 'bg-white/10 text-sky-300' : 'bg-academy-bg text-yellow-700'}`}>{icon}</span><h3 className="mt-7 text-xl font-black">{title}</h3><p className={`mt-3 leading-7 ${featured ? 'text-white/65' : 'text-academy-muted'}`}>{text}</p></article>)}</div><div className={`${styles.liftCard} mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:grid-cols-[.7fr_1.3fr] lg:p-8`}><div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours accessible, un métier réglementé.</h3><p className="mt-4 leading-7 text-academy-muted">Aucune expérience préalable dans la sécurité n’est obligatoire.</p></div><div className="grid gap-3 sm:grid-cols-2">{audiences.map((item,index) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${index === 5 ? 'bg-orange-100 text-orange-700' : 'bg-sky-100 text-sky-700'}`}>✓</span>{item}</div>)}</div></div></Section>

    <Section id="admission" eyebrow="02 — Admission" title={<>Votre dossier est-il prêt pour l’APS&nbsp;?</>} intro={<>Nous contrôlons chaque condition avant votre entrée en formation et vous accompagnons dans la démarche d’autorisation préalable.</>} tone="dark"><div className="grid gap-4 md:grid-cols-2">{prerequisites.map(([title,text]) => <article key={title} className={`${styles.liftCard} rounded-[1.7rem] border border-white/10 bg-white/7 p-5`}><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-400/15 font-black text-emerald-300">✓</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-white/62">{text}</p></article>)}</div><div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-[1.8rem] bg-gradient-to-r from-[#F7D57D] to-[#F0B52E] p-6 text-academy-gold-text lg:flex-row lg:items-center"><div><p className="text-xl font-black">Bonne nouvelle : nous préparons votre demande CNAPS.</p><p className="mt-1 font-semibold opacity-75">Vous fournissez les documents, notre équipe vous accompagne dans le dépôt.</p></div><CTA href={apsContact('autorisation préalable CNAPS')} variant="dark">Faire vérifier mon dossier →</CTA></div><div className="mt-8 grid gap-3 md:grid-cols-4">{cnapsSteps.map((item,index) => <div key={item} className="rounded-[1.4rem] bg-white p-4 text-academy-ink"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1725] text-xs font-black text-academy-gold">0{index+1}</span><p className="mt-5 font-black">{item}</p></div>)}</div></Section>

    <Section id="hybride" eyebrow="03 — Format hybride" title={<>La souplesse du distanciel, l’exigence du terrain.</>} intro={<>175 heures complètes, organisées pour apprendre la théorie à distance et maîtriser la pratique au centre.</>} tone="paper"><div className="grid overflow-hidden rounded-[2rem] border border-academy-line shadow-card lg:grid-cols-2"><article className="bg-[#0D1725] p-7 text-white lg:p-9"><span className="text-5xl font-black text-sky-300">62 h</span><h3 className="mt-2 text-2xl font-black">en e-learning</h3><div className="mt-6 grid gap-3">{['Plateforme accessible 24h/24','Vidéos et supports','Exercices et tests','Progression suivie'].map(item => <p key={item} className="flex gap-3 font-bold text-white/72"><span className="text-sky-300">✓</span>{item}</p>)}</div></article><article className="bg-white p-7 lg:p-9"><span className="text-5xl font-black text-emerald-700">113 h</span><h3 className="mt-2 text-2xl font-black">en présentiel</h3><div className="mt-6 grid gap-3">{['Cours encadrés','Rondes et mises en situation','Manipulation des équipements','Préparation à l’examen'].map(item => <p key={item} className="flex gap-3 font-bold text-academy-muted"><span className="text-emerald-600">✓</span>{item}</p>)}</div></article></div><div className="mt-5 rounded-[1.5rem] border border-academy-gold/60 bg-academy-gold/10 p-5"><p className="font-black">Vous n’êtes jamais seul devant votre écran.</p><p className="mt-1 text-sm font-semibold text-academy-muted">Votre progression est suivie et l’équipe pédagogique reste disponible.</p></div><div className="mt-10"><Eyebrow>Organisation</Eyebrow><h3 className="mt-3 text-3xl font-black">Une session, quatre temps forts.</h3><div className="mt-6 grid gap-3 md:grid-cols-4">{[['Accueil au centre','Présentation du parcours'],['62 h à distance','Apprentissage des notions clés'],['113 h au campus','Pratique et entraînements'],['Examen en présentiel','Évaluation devant jury']].map(([title,text],index) => <div key={title} className={`rounded-[1.5rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-academy-bg'}`}><span className="text-3xl font-black text-yellow-600">0{index+1}</span><h4 className="mt-6 text-lg font-black">{title}</h4><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></div>)}</div></div></Section>

    <Section id="pratique" eyebrow="04 — La pratique" title={<>Des exercices concrets pour être prêt dès votre première mission.</>} intro={<>La sécurité privée s’apprend aussi sur le terrain. Au centre, vous répétez les gestes, les procédures et les prises de décision attendus en situation professionnelle.</>} tone="dark"><div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">{practicalExercises.map(([icon,title,text],index) => <article key={title} className={`${styles.practicalCard} ${index === 0 ? styles.practicalPrimary : ''} rounded-[1.7rem] border border-white/10 bg-white/7 p-5`}><div className="relative z-10"><div className="flex items-start justify-between gap-3"><span className={`${styles.practicalIcon} grid h-11 w-11 place-items-center rounded-2xl bg-academy-gold text-xl font-black text-academy-gold-text`}>{icon}</span><span className="text-[.62rem] font-black tracking-[.18em] text-white/30">ATELIER 0{index+1}</span></div><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text}</p>{index === 0 && <div className={`${styles.practiceVisual} mt-6`}><div className={styles.scanLine}/><span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-sky-200">Simulation terrain</span><span className="absolute bottom-4 left-4 text-xs font-bold text-white/45">Observer · contrôler · signaler</span></div>}</div></article>)}</div><div className="mt-7 grid gap-4 rounded-[1.7rem] border border-emerald-300/25 bg-emerald-400/10 p-6 lg:grid-cols-[auto_1fr] lg:items-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-300 text-2xl font-black text-emerald-950">✓</span><div><p className="text-xl font-black text-emerald-200">L’objectif : transformer les connaissances en réflexes professionnels.</p><p className="mt-2 max-w-4xl leading-7 text-white/68">Les scénarios sont débriefés avec le formateur : observation, positionnement, communication, respect du cadre légal, compte rendu et choix de la réponse adaptée.</p></div></div></Section>

    <Section id="programme" eyebrow="05 — Programme" title={<>175 heures pour maîtriser les fondamentaux du métier.</>} intro={<>Un parcours réglementaire complet, du cadre juridique aux mises en situation professionnelles.</>}><div className="grid gap-3 lg:grid-cols-2">{program.map(([number,title,text],index) => <details key={number} open={index===0} className={`${styles.programItem} group rounded-[1.4rem] border p-4 ${index===5 ? 'border-emerald-300 bg-emerald-50' : index===0 || index===11 ? 'border-academy-gold/70 bg-[#FFFDF8]' : 'border-academy-line bg-[#FFFDF8]'}`}><summary className="flex cursor-pointer list-none items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black ${index===5 ? 'bg-emerald-200 text-emerald-900' : 'bg-academy-bg text-academy-ink'}`}>{number}</span><strong className="min-w-0 flex-1">{title}</strong><span className="grid h-8 w-8 place-items-center rounded-full border border-academy-line font-black transition group-open:rotate-45">+</span></summary><p className="ml-12 mt-3 text-sm leading-6 text-academy-muted">{text}</p></details>)}</div><div className="mt-10 grid gap-6 rounded-[2rem] bg-[#0D1725] p-6 text-white lg:grid-cols-[.8fr_1.2fr] lg:p-9"><div><Eyebrow light>Pédagogie terrain</Eyebrow><h3 className="mt-3 text-3xl font-black">On apprend en pratiquant.</h3><p className="mt-4 leading-7 text-white/65">Cas concrets et entraînements réguliers pour ancrer les bons réflexes.</p><p className="mt-5 font-black text-emerald-300">✓ SST inclus dans le parcours</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{['Rondes de sécurité','Poste de contrôle','Contrôle d’accès','Gestion d’incident','Palpation encadrée','Entraînement QCU'].map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/7 p-4 font-black">{item}</div>)}</div></div></Section>

    <Section id="examen" eyebrow="06 — Examen" title={<>Un examen qui valide vos réflexes.</>} intro={<>Théorie et pratique sont évaluées devant des professionnels du secteur.</>} tone="paper"><div className={`${styles.examGrid} grid gap-4 lg:grid-cols-4`}>{examSteps.map(([number,title,text],index) => <article key={number} className={`${styles.examCard} rounded-[1.7rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-white'}`}><span className="grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black text-academy-gold-text">{number}</span><h3 className="mt-6 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></article>)}</div><div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 text-center font-black text-emerald-800">Après réussite : demande de carte professionnelle CNAPS → accès au métier</div></Section>

    <TrainingDatesPricingSection
      id="dates-tarifs"
      eyebrow="07 — Dates & tarifs"
      sessions={visibleSessions}
      showDeliveryPeriods
      defaultPrice="1 650 €"
      defaultLocation="Puget-sur-Argens"
      priceDescription="Formation complète · SST inclus · examen final"
      registrationHref={sessionHref}
      priceAction={{ href: apsCpfUrl, label: 'S’inscrire avec mon CPF 🔐', external: true }}
    >
      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><Eyebrow>08 — Inscription & financement</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours simple, accompagné de A à Z.</h3><p className="mt-3 max-w-3xl leading-7 text-academy-muted">Vous n’avez pas à deviner quelle démarche effectuer : notre équipe vérifie votre situation, vous indique les justificatifs nécessaires et suit votre dossier jusqu’à la confirmation de votre entrée en formation.</p></div>
          <CTA href={apsContact('commencer mon inscription')} variant="dark">Commencer mon inscription →</CTA>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-5">{enrollmentSteps.map(([number,title,text]) => <article key={number} className={`${styles.enrollmentCard} rounded-[1.4rem] border border-academy-line bg-[#FFFDF8] p-5`}><span className="grid h-10 w-10 place-items-center rounded-full bg-academy-gold text-xs font-black">{number}</span><h4 className="mt-5 text-lg font-black">{title}</h4><p className="mt-3 text-sm leading-6 text-academy-muted">{text}</p></article>)}</div>
        <div className={`${styles.financePanel} mt-10 rounded-[2rem] p-6 text-white lg:p-8`}><div className={`${styles.financeContent} grid gap-5 lg:grid-cols-[.7fr_1.3fr]`}><div><Eyebrow light>Solutions possibles</Eyebrow><h4 className="mt-3 text-3xl font-black">Comment financer votre formation APS&nbsp;?</h4><p className="mt-4 leading-7 text-white/65">La prise en charge dépend de votre situation et de l’accord du financeur. Nous vous aidons à présenter une demande complète, sans promettre une acceptation automatique.</p></div><div className="grid gap-3 sm:grid-cols-2">{financingOptions.map(([title,text]) => <article key={title} className={`${styles.financeCard} rounded-2xl border border-white/10 bg-white/7 p-5`}><h5 className="text-lg font-black text-academy-gold">{title}</h5><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></article>)}</div></div><div className={`${styles.financeContent} mt-6 flex flex-col gap-3 sm:flex-row`}><CTA href={apsCpfUrl} variant="gold" external>Consulter la formation sur Mon Compte Formation →</CTA><CTA href={apsContact('étude de financement APS')} variant="outline">Faire étudier mon financement</CTA></div></div>
      </div>
    </TrainingDatesPricingSection>

    <Section id="debouches" eyebrow="09 — Débouchés & emploi" title={<>Un premier diplôme pour intégrer un secteur qui recrute.</>} intro={<>Les besoins sont réguliers dans de nombreux environnements : commerce, industrie, logistique, santé, bureaux, événementiel et sites sensibles. Le TFP APS ouvre l’accès à des missions variées, sous réserve d’obtenir la carte professionnelle CNAPS.</>} tone="paper"><div className="mb-8 grid gap-4 md:grid-cols-3"><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-emerald-200 bg-emerald-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-emerald-700">Un besoin permanent</p><h3 className="mt-3 text-2xl font-black">Des recrutements toute l’année</h3><p className="mt-3 leading-7 text-emerald-950/70">Les entreprises de sécurité doivent couvrir des prestations de jour, de nuit, en semaine, le week-end et lors de grands événements.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-sky-200 bg-sky-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-sky-700">Des missions variées</p><h3 className="mt-3 text-2xl font-black">De nombreux sites à sécuriser</h3><p className="mt-3 leading-7 text-sky-950/70">Vous pouvez travailler sur un site fixe, effectuer des rondes, contrôler des accès, sécuriser un événement ou intervenir sur plusieurs sites.</p></article><article className={`${styles.outcomeCard} rounded-[1.7rem] border border-yellow-300 bg-yellow-50 p-6`}><p className="text-sm font-black uppercase tracking-[.16em] text-yellow-800">Des évolutions possibles</p><h3 className="mt-3 text-2xl font-black">Construire un parcours</h3><p className="mt-3 leading-7 text-yellow-950/70">Avec l’expérience et des qualifications complémentaires, vous pouvez viser des fonctions de chef de poste, de sécurité incendie, de télésurveillance ou d’encadrement.</p></article></div><div className="grid gap-4 md:grid-cols-4">{[['Réussir le TFP APS','Valider les épreuves'],['Recevoir le titre niveau 3','Obtenir le diplôme'],['Demander la carte CNAPS','Constituer le dossier'],['Commencer à exercer','Après délivrance de la carte']].map(([title,text],index) => <article key={title} className={`${styles.examCard} rounded-[1.7rem] border border-academy-line bg-white p-5 text-center`}><span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black">0{index+1}</span><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-academy-muted">{text}</p></article>)}</div><div className="mt-5 rounded-[1.4rem] border border-yellow-300 bg-yellow-50 p-4 font-bold text-yellow-900">Important : le diplôme ne déclenche pas automatiquement la carte professionnelle.</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><Eyebrow>Débouchés</Eyebrow><h3 className="mt-3 text-3xl font-black">Les métiers accessibles</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{jobs.map(([icon,title]) => <div key={title} className={styles.jobCard}><span className={styles.jobIcon}>{icon}</span><span className="text-sm font-black leading-5">{title}</span></div>)}</div></article><article className="relative overflow-hidden rounded-[2rem] bg-[#0D1725] p-6 text-white"><div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 shadow-[0_0_0_45px_rgba(255,255,255,.025),0_0_0_90px_rgba(255,255,255,.015)]"/><div className="relative"><Eyebrow light>Double compétence</Eyebrow><h3 className="mt-3 text-3xl font-black">APS + SSIAP 1</h3><p className="mt-4 max-w-md leading-7 text-white/65">Élargissez vos opportunités en associant surveillance humaine et sécurité incendie.</p><div className="mt-7 grid gap-3"><div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/7 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-black text-sky-200">01</span><div><p className="font-black">Obtenir le TFP APS</p><p className="mt-1 text-xs font-semibold text-white/45">Socle de la surveillance humaine</p></div></div><div className="ml-5 h-5 w-px bg-gradient-to-b from-white/25 to-academy-gold"/><div className="flex items-center gap-4 rounded-2xl border border-academy-gold/40 bg-academy-gold/12 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-academy-gold text-sm font-black text-academy-gold-text">02</span><div><p className="font-black text-[#F9DC8A]">Ajouter le SSIAP 1</p><p className="mt-1 text-xs font-semibold text-white/50">Spécialisation sécurité incendie</p></div></div><div className="ml-5 h-5 w-px bg-gradient-to-b from-academy-gold to-emerald-300"/><div className="flex items-center gap-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-300 text-sm font-black text-emerald-950">03</span><div><p className="font-black text-emerald-200">Élargir les postes accessibles</p><p className="mt-1 text-xs font-semibold text-white/50">Selon les qualifications exigées par l’employeur</p></div></div></div><CTA href="/formations-securite/ssiap-1" variant="gold" className="mt-6">Découvrir le SSIAP 1 →</CTA></div></article></div><article className="mt-5 rounded-[2rem] border border-academy-line bg-white p-6"><h3 className="text-2xl font-black">Où travailler ?</h3><p className="mt-2 leading-7 text-academy-muted">Les agents APS interviennent aussi bien dans des lieux ouverts au public que sur des sites professionnels à accès contrôlé.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{workplaces.map(item => <div key={item} className={`${styles.workplace} rounded-2xl bg-academy-bg p-4 text-center font-black`}>{item}</div>)}</div></article><div className="mt-5 rounded-[1.5rem] border border-academy-line bg-[#FFFDF8] p-5"><p className="font-black">Bon à savoir : horaires et conditions varient selon les postes.</p><p className="mt-2 text-sm leading-6 text-academy-muted">Le secteur propose des emplois de jour ou de nuit, à temps plein ou partiel, sur site fixe ou mobile. Disponibilité, ponctualité, présentation, maîtrise de soi et qualité du compte rendu sont particulièrement recherchées par les employeurs.</p></div></Section>

    <div id="faq-aps"><PremiumFAQSection badge="FAQ APS" title="Les réponses avant de vous lancer" description="CNAPS, e-learning, examen, carte professionnelle et financement : retrouvez les informations indispensables avant votre inscription." items={faq} contactHref={apsContact('question APS')} /></div>

    <section className="bg-academy-bg px-4 pb-20 pt-8"><div className={`${styles.finalCta} page-container rounded-[2.4rem] border border-white/10 shadow-card`}><div className={`${styles.finalCtaContent} grid items-center lg:grid-cols-[1.05fr_.95fr]`}><div className="p-7 sm:p-9 lg:p-12"><Eyebrow light>Une question sur votre projet ?</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">Faites le premier pas vers votre futur métier.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-white/65">Cassandre vérifie votre éligibilité, votre dossier CNAPS et votre financement. Vous repartez avec des réponses claires et les prochaines étapes adaptées à votre situation.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={apsContact('rendez-vous avec Cassandre')} variant="gold">Réserver un rendez-vous →</CTA><CTA href="tel:0422470768" variant="outline">Appeler Cassandre</CTA></div><div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-white/60"><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">✓ Sans engagement</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">✓ Étude personnalisée</span><span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">✓ Réponse sur le CNAPS et le financement</span></div></div><div className="relative min-h-[390px] p-7"><div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[0_0_0_50px_rgba(255,255,255,.025),0_0_0_100px_rgba(255,255,255,.015)]"/><div className={`${styles.adviserCard} absolute inset-x-7 bottom-9 rounded-[1.8rem] border border-white/70 bg-white/95 p-5 text-academy-ink backdrop-blur`}><div className="flex items-center gap-4"><div className="relative"><div className="absolute -inset-1 rounded-[1.15rem] bg-gradient-to-br from-academy-gold to-sky-400 opacity-70 blur"/><Image src="/images/cassandre-memoji.png" width={88} height={88} alt="Cassandre, responsable commerciale Intégrale Academy" className="relative h-20 w-20 rounded-2xl bg-white object-cover"/></div><div><p className="text-xs font-black uppercase tracking-[.18em] text-yellow-700">Votre conseillère</p><p className="mt-1 text-2xl font-black">Cassandre</p><p className="text-sm font-semibold text-academy-muted">Responsable commerciale</p></div></div><a href="tel:0422470768" className="mt-4 block rounded-full bg-academy-gold px-5 py-3 text-center font-black text-academy-gold-text transition hover:brightness-105">04 22 47 07 68</a></div></div></div></div></section>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href={sessionHref(next)} variant="gold" className="min-w-0 flex-[1.4] px-3">Réserver ma place</CTA></div></div>
  </main>;
}
