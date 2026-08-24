import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { OrientationAssistant } from '@/components/OrientationAssistant';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection } from '@/components/TrainingDatesPricingSection';

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

const enrollmentSteps = ['Premier échange', 'Organisation', 'Financement', 'Finalisation du dossier', 'Validation & démarrage'];
const jobs = ['Agent de prévention et de sécurité', 'Agent de surveillance', 'Agent rondier', 'Agent mobile', 'Sécurité événementielle', 'Agent arrière-caisse'];
const workplaces = ['Commerces', 'Centres commerciaux', 'Bureaux', 'Hôtels', 'Sites industriels', 'Entrepôts', 'Événements', 'Établissements de santé'];

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
  const styles = {
    dark: 'bg-academy-ink text-white hover:bg-black',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
    blue: 'bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:brightness-105',
  };
  const classNames = `inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-academy-gold/25 ${styles[variant]} ${className}`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={classNames}>{children}</a>;
  return <Link href={href} className={classNames}>{children}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-emerald-300' : 'text-yellow-700'}`}>{children}</p>;
}

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'stone' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] text-academy-ink' : tone === 'stone' ? 'bg-[#EFE7D9] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-20`}><div className="page-container"><div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16"><div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl">{title}</h2></div>{intro && <div className={`max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}</div>{children}</div></section>;
}

function CompactAssistant() {
  return <details className="group mt-3 overflow-hidden rounded-[1.35rem] border border-academy-line bg-white text-academy-ink shadow-soft"><summary className="flex cursor-pointer list-none items-center gap-3 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-academy-gold font-black text-academy-gold-text">✦</span><span className="min-w-0 flex-1"><strong className="block text-sm font-black">Une question avant de vous inscrire&nbsp;?</strong><small className="block text-xs font-semibold text-academy-muted">L’assistant vérifie les informations essentielles.</small></span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-academy-ink font-black text-white transition group-open:rotate-90">→</span></summary><div className="border-t border-academy-line bg-academy-bg p-3 sm:p-4"><OrientationAssistant initialFormationKey="aps" hideInfoAction /></div></details>;
}

function HeroSession({ session }: { session: any }) {
  const full = session?.status === 'FULL' || Number(session?.seatsLeft) === 0;
  return <aside className="rounded-[2rem] border border-white/65 bg-[#FFFDF8] p-5 text-academy-ink shadow-[0_34px_100px_rgba(0,0,0,.34)] sm:p-6"><div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-emerald-800 ring-1 ring-emerald-200">Prochaine session</span><span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${full ? 'border-stone-300 bg-stone-100 text-stone-700' : 'border-yellow-300 bg-yellow-50 text-yellow-800'}`}>{seatsLabel(session)}</span></div><h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-4xl">{formatDate(session?.startDate, true)} <span className="text-yellow-600">→</span><br />{formatDate(session?.endDate, true)}</h2><p className="mt-2 text-sm font-extrabold text-academy-muted">Examen final le {formatDate(session?.examDate, true)}</p><div className="mt-5 grid grid-cols-2 gap-2.5">{[['Durée', '175 heures'], ['Tarif', priceLabel(session?.priceLabel)], ['Lieu', session?.location || 'Puget-sur-Argens'], ['Format', 'Hybride']].map(([key, value]) => <div key={key} className="rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5"><p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p><p className="mt-1 text-sm font-black sm:text-base">{value}</p></div>)}</div><CTA href={sessionHref(session)} variant={full ? 'light' : 'dark'} className="mt-5 w-full">{full ? 'Être alerté de la prochaine session' : 'Réserver ma place →'}</CTA><CompactAssistant /></aside>;
}

export function ApsReferencePage({ sessions }: { sessions: any[] }) {
  const visibleSessions = sessions.length ? sessions : fallbackSessions;
  const next = visibleSessions[0];
  return <main className="relative overflow-hidden pb-24 lg:pb-0">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Agent de Prévention et de Sécurité APS', description: 'Formation TFP APS de 175 heures à Puget-sur-Argens, avec 62 heures en e-learning et 113 heures en présentiel.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'APS', item: '/formations-securite/aps' }] },
    ] }) }} />

    <section className="relative isolate overflow-hidden bg-[#0D1725] px-4 pb-8 pt-10 text-white sm:pt-14 lg:pt-16"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_75%,rgba(238,184,47,.3),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,.22),transparent_31%),linear-gradient(135deg,#080D15_0%,#101C2D_58%,#0B1721_100%)]"/><div className="page-container"><div className="grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12"><div><span className="inline-flex items-center gap-2 rounded-full border border-academy-gold/45 bg-academy-gold/10 px-4 py-2 text-[.68rem] font-black uppercase tracking-[.2em] text-[#F7D878]"><span className="h-2.5 w-2.5 rounded-full bg-academy-gold shadow-[0_0_16px_rgba(238,184,47,.9)]"/>TFP APS · RNCP 36648 · niveau 3</span><h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl xl:text-7xl">Devenez agent de <span className="text-[#F5C34E]">sécurité privée.</span></h1><p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/72 sm:text-xl">Prévenez les risques, surveillez les sites et protégez les personnes dans le respect du cadre légal.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={apsContact('éligibilité')} variant="gold">Vérifier mon éligibilité →</CTA><CTA href="tel:0422470768" variant="outline">Parler à un conseiller</CTA></div><div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-white/75"><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ Autorisation CNAPS accompagnée</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ SST inclus</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ Financements possibles</span></div></div><HeroSession session={next}/></div><div className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 sm:grid-cols-2 lg:grid-cols-6">{heroFacts.map(([key,value,detail]) => <div key={key} className="border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0"><p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p><p className="mt-1 font-black text-white">{value}</p><p className="mt-1 text-[.68rem] font-semibold leading-4 text-white/48">{detail}</p></div>)}</div></div></section>

    <nav aria-label="Sommaire de la formation" className="sticky top-0 z-30 hidden border-b border-academy-line bg-[#FFFDF8]/95 px-4 py-3 backdrop-blur lg:block"><div className="page-container flex items-center justify-between gap-5"><span className="text-xs font-black">TFP APS</span><div className="flex items-center gap-5 text-xs font-extrabold text-academy-muted">{[['Métier','#metier'],['Admission','#admission'],['Format hybride','#hybride'],['Programme','#programme'],['Examen','#examen'],['Dates & tarifs','#dates-tarifs'],['Débouchés','#debouches'],['FAQ','#faq-aps']].map(([label,href]) => <Link key={href} href={href} className="transition hover:text-academy-ink">{label}</Link>)}</div><CTA href={sessionHref(next)} variant="gold" className="min-h-10 px-4 py-2">Je m’inscris</CTA></div></nav>

    <Section id="metier" eyebrow="01 — Le métier" title={<>Un métier de terrain, de vigilance et de sang-froid.</>} intro={<>L’agent APS prévient les risques, protège les personnes et les biens, applique les consignes et rend compte de chaque événement.</>}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{missions.map(([icon,title,text,featured]) => <article key={String(title)} className={`rounded-[1.8rem] border p-6 shadow-soft ${featured ? 'border-[#26384F] bg-[#0D1725] text-white' : 'border-academy-line bg-[#FFFDF8]'}`}><span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-black ${featured ? 'bg-white/10 text-sky-300' : 'bg-academy-bg text-yellow-700'}`}>{icon}</span><h3 className="mt-7 text-xl font-black">{title}</h3><p className={`mt-3 leading-7 ${featured ? 'text-white/65' : 'text-academy-muted'}`}>{text}</p></article>)}</div><div className="mt-8 grid gap-5 rounded-[2rem] border border-academy-line bg-white p-6 shadow-soft lg:grid-cols-[.7fr_1.3fr] lg:p-8"><div><Eyebrow>À qui s’adresse la formation ?</Eyebrow><h3 className="mt-3 text-3xl font-black">Un parcours accessible, un métier réglementé.</h3><p className="mt-4 leading-7 text-academy-muted">Aucune expérience préalable dans la sécurité n’est obligatoire.</p></div><div className="grid gap-3 sm:grid-cols-2">{audiences.map((item,index) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${index === 5 ? 'bg-orange-100 text-orange-700' : 'bg-sky-100 text-sky-700'}`}>✓</span>{item}</div>)}</div></div></Section>

    <Section id="admission" eyebrow="02 — Admission" title={<>Votre dossier est-il prêt pour l’APS&nbsp;?</>} intro={<>Nous contrôlons chaque condition avant votre entrée en formation et vous accompagnons dans la démarche d’autorisation préalable.</>} tone="dark"><div className="grid gap-4 md:grid-cols-2">{prerequisites.map(([title,text]) => <article key={title} className="rounded-[1.7rem] border border-white/10 bg-white/7 p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-400/15 font-black text-emerald-300">✓</span><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-white/62">{text}</p></article>)}</div><div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-[1.8rem] bg-gradient-to-r from-[#F7D57D] to-[#F0B52E] p-6 text-academy-gold-text lg:flex-row lg:items-center"><div><p className="text-xl font-black">Bonne nouvelle : nous préparons votre demande CNAPS.</p><p className="mt-1 font-semibold opacity-75">Vous fournissez les documents, notre équipe vous accompagne dans le dépôt.</p></div><CTA href={apsContact('autorisation préalable CNAPS')} variant="dark">Faire vérifier mon dossier →</CTA></div><div className="mt-8 grid gap-3 md:grid-cols-4">{cnapsSteps.map((item,index) => <div key={item} className="rounded-[1.4rem] bg-white p-4 text-academy-ink"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1725] text-xs font-black text-academy-gold">0{index+1}</span><p className="mt-5 font-black">{item}</p></div>)}</div></Section>

    <Section id="hybride" eyebrow="03 — Format hybride" title={<>La souplesse du distanciel, l’exigence du terrain.</>} intro={<>175 heures complètes, organisées pour apprendre la théorie à distance et maîtriser la pratique au centre.</>} tone="paper"><div className="grid overflow-hidden rounded-[2rem] border border-academy-line shadow-card lg:grid-cols-2"><article className="bg-[#0D1725] p-7 text-white lg:p-9"><span className="text-5xl font-black text-sky-300">62 h</span><h3 className="mt-2 text-2xl font-black">en e-learning</h3><div className="mt-6 grid gap-3">{['Plateforme accessible 24h/24','Vidéos et supports','Exercices et tests','Progression suivie'].map(item => <p key={item} className="flex gap-3 font-bold text-white/72"><span className="text-sky-300">✓</span>{item}</p>)}</div></article><article className="bg-white p-7 lg:p-9"><span className="text-5xl font-black text-emerald-700">113 h</span><h3 className="mt-2 text-2xl font-black">en présentiel</h3><div className="mt-6 grid gap-3">{['Cours encadrés','Rondes et mises en situation','Manipulation des équipements','Préparation à l’examen'].map(item => <p key={item} className="flex gap-3 font-bold text-academy-muted"><span className="text-emerald-600">✓</span>{item}</p>)}</div></article></div><div className="mt-5 rounded-[1.5rem] border border-academy-gold/60 bg-academy-gold/10 p-5"><p className="font-black">Vous n’êtes jamais seul devant votre écran.</p><p className="mt-1 text-sm font-semibold text-academy-muted">Votre progression est suivie et l’équipe pédagogique reste disponible.</p></div><div className="mt-10"><Eyebrow>Organisation</Eyebrow><h3 className="mt-3 text-3xl font-black">Une session, quatre temps forts.</h3><div className="mt-6 grid gap-3 md:grid-cols-4">{[['Accueil au centre','Présentation du parcours'],['62 h à distance','Apprentissage des notions clés'],['113 h au campus','Pratique et entraînements'],['Examen en présentiel','Évaluation devant jury']].map(([title,text],index) => <div key={title} className={`rounded-[1.5rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-academy-bg'}`}><span className="text-3xl font-black text-yellow-600">0{index+1}</span><h4 className="mt-6 text-lg font-black">{title}</h4><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></div>)}</div></div></Section>

    <Section id="programme" eyebrow="04 — Programme" title={<>175 heures pour maîtriser les fondamentaux du métier.</>} intro={<>Un parcours réglementaire complet, du cadre juridique aux mises en situation professionnelles.</>}><div className="grid gap-3 lg:grid-cols-2">{program.map(([number,title,text],index) => <details key={number} open={index===0} className={`group rounded-[1.4rem] border p-4 ${index===5 ? 'border-emerald-300 bg-emerald-50' : index===0 || index===11 ? 'border-academy-gold/70 bg-[#FFFDF8]' : 'border-academy-line bg-[#FFFDF8]'}`}><summary className="flex cursor-pointer list-none items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black ${index===5 ? 'bg-emerald-200 text-emerald-900' : 'bg-academy-bg text-academy-ink'}`}>{number}</span><strong className="min-w-0 flex-1">{title}</strong><span className="grid h-8 w-8 place-items-center rounded-full border border-academy-line font-black transition group-open:rotate-45">+</span></summary><p className="ml-12 mt-3 text-sm leading-6 text-academy-muted">{text}</p></details>)}</div><div className="mt-10 grid gap-6 rounded-[2rem] bg-[#0D1725] p-6 text-white lg:grid-cols-[.8fr_1.2fr] lg:p-9"><div><Eyebrow light>Pédagogie terrain</Eyebrow><h3 className="mt-3 text-3xl font-black">On apprend en pratiquant.</h3><p className="mt-4 leading-7 text-white/65">Cas concrets et entraînements réguliers pour ancrer les bons réflexes.</p><p className="mt-5 font-black text-emerald-300">✓ SST inclus dans le parcours</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{['Rondes de sécurité','Poste de contrôle','Contrôle d’accès','Gestion d’incident','Palpation encadrée','Entraînement QCU'].map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/7 p-4 font-black">{item}</div>)}</div></div></Section>

    <Section id="examen" eyebrow="05 — Examen" title={<>Un examen qui valide vos réflexes.</>} intro={<>Théorie et pratique sont évaluées devant des professionnels du secteur.</>} tone="paper"><div className="grid gap-4 lg:grid-cols-4">{examSteps.map(([number,title,text],index) => <article key={number} className={`rounded-[1.7rem] border p-5 ${index===3 ? 'border-academy-gold bg-academy-gold/10' : 'border-academy-line bg-white'}`}><span className="grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black text-academy-gold-text">{number}</span><h3 className="mt-6 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p></article>)}</div><div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 text-center font-black text-emerald-800">Après réussite : demande de carte professionnelle CNAPS → accès au métier</div></Section>

    <TrainingDatesPricingSection
      id="dates-tarifs"
      eyebrow="06 — Dates & tarifs"
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
          <div><Eyebrow>07 — Inscription</Eyebrow><h3 className="mt-3 text-3xl font-black">Votre inscription en cinq étapes.</h3></div>
          <CTA href={apsContact('commencer mon inscription')} variant="dark">Commencer mon inscription →</CTA>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-5">{enrollmentSteps.map((item, index) => <div key={item} className="rounded-[1.4rem] border border-academy-line bg-[#FFFDF8] p-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-academy-gold text-xs font-black">0{index + 1}</span><p className="mt-5 font-black">{item}</p></div>)}</div>
      </div>
    </TrainingDatesPricingSection>

    <Section id="debouches" eyebrow="08 — Après l’examen" title={<>Du TFP APS à votre carte professionnelle.</>} intro={<>La réussite à l’examen valide votre aptitude. La carte CNAPS reste nécessaire pour exercer.</>} tone="paper"><div className="grid gap-4 md:grid-cols-4">{[['Réussir le TFP APS','Valider les épreuves'],['Recevoir le titre niveau 3','Obtenir le diplôme'],['Demander la carte CNAPS','Constituer le dossier'],['Commencer à exercer','Après délivrance de la carte']].map(([title,text],index) => <article key={title} className="rounded-[1.7rem] border border-academy-line bg-white p-5 text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-academy-gold font-black">0{index+1}</span><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-2 text-sm text-academy-muted">{text}</p></article>)}</div><div className="mt-5 rounded-[1.4rem] border border-yellow-300 bg-yellow-50 p-4 font-bold text-yellow-900">Important : le diplôme ne déclenche pas automatiquement la carte professionnelle.</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-academy-line bg-white p-6"><Eyebrow>Débouchés</Eyebrow><h3 className="mt-3 text-3xl font-black">Les métiers accessibles</h3><div className="mt-5 flex flex-wrap gap-2">{jobs.map(item => <span key={item} className="rounded-full border border-academy-line bg-academy-bg px-4 py-2 text-sm font-bold">{item}</span>)}</div></article><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white"><Eyebrow light>Double compétence</Eyebrow><h3 className="mt-3 text-3xl font-black">APS + SSIAP 1</h3><p className="mt-4 leading-7 text-white/65">Élargissez vos opportunités en sécurité privée et incendie.</p><CTA href="/formations-securite/ssiap-1" variant="gold" className="mt-5">Découvrir le SSIAP 1 →</CTA></article></div><article className="mt-5 rounded-[2rem] border border-academy-line bg-white p-6"><h3 className="text-2xl font-black">Où travailler ?</h3><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{workplaces.map(item => <div key={item} className="rounded-2xl bg-academy-bg p-4 text-center font-black">{item}</div>)}</div></article></Section>

    <div id="faq-aps"><PremiumFAQSection badge="FAQ APS" title="Les réponses avant de vous lancer" description="CNAPS, e-learning, examen, carte professionnelle et financement : retrouvez les informations indispensables avant votre inscription." items={faq} contactHref={apsContact('question APS')} /></div>

    <section className="bg-academy-bg px-4 pb-20 pt-8"><div className="page-container overflow-hidden rounded-[2.4rem] border border-academy-line bg-[#FFFDF8] shadow-card"><div className="grid items-center lg:grid-cols-[1.05fr_.95fr]"><div className="p-7 sm:p-9 lg:p-12"><Eyebrow>Une question sur votre projet ?</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">Faites le premier pas vers votre futur métier.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-academy-muted">Cassandre vérifie votre éligibilité, votre dossier CNAPS et votre financement.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={apsContact('rendez-vous avec Cassandre')} variant="dark">Réserver un rendez-vous →</CTA><CTA href="tel:0422470768" variant="light">Appeler Cassandre</CTA></div></div><div className="relative min-h-[370px] bg-[radial-gradient(circle_at_55%_30%,rgba(238,184,47,.35),transparent_32%),linear-gradient(140deg,#EEE4D4,#FFFDF8)] p-7"><div className="absolute inset-x-7 bottom-7 rounded-[1.8rem] border border-white/75 bg-white/88 p-5 shadow-soft backdrop-blur"><div className="flex items-center gap-4"><Image src="/images/cassandre-memoji.png" width={88} height={88} alt="Cassandre, responsable commerciale Intégrale Academy" className="h-20 w-20 rounded-2xl object-cover"/><div><p className="text-xs font-black uppercase tracking-[.18em] text-yellow-700">Votre conseillère</p><p className="mt-1 text-2xl font-black">Cassandre</p><p className="text-sm font-semibold text-academy-muted">Responsable commerciale</p></div></div><a href="tel:0422470768" className="mt-4 block rounded-full bg-academy-gold px-5 py-3 text-center font-black text-academy-gold-text">04 22 47 07 68</a></div></div></div></div></section>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href={sessionHref(next)} variant="gold" className="min-w-0 flex-[1.4] px-3">Réserver ma place</CTA></div></div>
  </main>;
}
