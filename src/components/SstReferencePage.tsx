import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { PremiumFAQSection } from '@/components/ui';
import { TrainingDatesPricingSection, type TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';

const contactHref = (subject = 'inscription') => `/contact?formation=sst&objet=${encodeURIComponent(subject)}`;

const emergencySteps = [
  ['01', 'Protéger', 'Éliminer ou isoler le danger sans s’exposer.'],
  ['02', 'Examiner', 'Observer la victime et rechercher les signes prioritaires.'],
  ['03', 'Alerter', 'Transmettre une alerte claire aux secours adaptés.'],
  ['04', 'Secourir', 'Réaliser les gestes appropriés à l’état de la victime.'],
];

const preventionActions = [
  'Repérer une situation dangereuse',
  'Faire remonter les risques',
  'Participer aux actions de prévention',
];

const sectors = ['Industrie', 'BTP', 'Commerce', 'Bureaux', 'Hôtellerie', 'Logistique', 'Sécurité privée'];

const days = [
  {
    number: '01',
    title: 'Jour 1 · Agir face à l’accident',
    tone: 'green',
    items: [
      'Situer son rôle de SST',
      'Protéger, examiner et alerter',
      'Réagir face à un saignement ou un étouffement',
      'Intervenir face à un malaise',
    ],
  },
  {
    number: '02',
    title: 'Jour 2 · Secourir et prévenir',
    tone: 'coral',
    items: [
      'Brûlures, traumatismes et plaies',
      'Inconscience et position latérale de sécurité',
      'Arrêt cardiaque, massage et défibrillateur',
      'Prévention des risques et évaluation certificative',
    ],
  },
];

const scenarios = [
  ['◒', 'Saignement abondant'],
  ['⌁', 'Étouffement'],
  ['◎', 'Malaise'],
  ['≋', 'Brûlure'],
  ['⌁', 'Traumatisme'],
  ['—', 'Inconscience'],
  ['♡', 'Arrêt cardiaque'],
  ['⚡', 'Défibrillateur'],
];

const trustCards = [
  ['Habilitation INRS', 'H34836/2020/SST-1/O/07'],
  ['Formateur SST certifié', 'dans le dispositif national'],
  ['Petit groupe', '4 à 10 participants'],
  ['Centre de formation', 'Puget-sur-Argens'],
];

const faq = [
  { q: 'À qui s’adresse la formation SST ?', a: 'Aux salariés, candidats sécurité et entreprises souhaitant acquérir les gestes de secours au travail et contribuer à la prévention des risques professionnels.' },
  { q: 'Y a-t-il des prérequis ?', a: 'Non. Aucun prérequis n’est exigé pour suivre la formation initiale SST.' },
  { q: 'Combien de temps dure la formation ?', a: 'La formation initiale dure au minimum 14 heures, généralement réparties sur deux journées en présentiel.' },
  { q: 'Combien de temps le certificat est-il valable ?', a: 'Le certificat SST est valable 24 mois. Il est reconnu au niveau national dans le cadre du dispositif Assurance Maladie – Risques professionnels / INRS.' },
  { q: 'Quand faut-il suivre le MAC SST ?', a: 'Le maintien et l’actualisation des compétences doit être réalisé tous les 24 mois. Le MAC SST dure au minimum 7 heures en présentiel.' },
  { q: 'Comment se déroule l’évaluation ?', a: 'Les compétences sont évaluées pendant la formation au moyen d’une mise en situation d’accident du travail et d’un questionnement portant sur la prévention.' },
  { q: 'Le certificat SST donne-t-il une équivalence PSC1 ?', a: 'Oui. Le certificat SST en cours de validité donne l’équivalence à l’unité d’enseignement PSC1.' },
  { q: 'Comment financer la formation ?', a: 'Un financement par l’employeur ou son OPCO, un financement personnel ou une intégration dans un parcours sécurité peuvent être étudiés selon le dossier.' },
  { q: 'Peut-on organiser une formation pour une équipe ?', a: 'Oui, notre équipe étudie votre effectif, votre environnement de travail, les dates souhaitées et les modalités d’organisation avant de vous transmettre un devis.' },
];

function formatDate(value?: string | Date | null) {
  if (!value) return 'À confirmer';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 'À confirmer';
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: 'short', year: 'numeric' }).format(date).replace(/^0/, '');
}

function formatPrice(value: unknown) {
  if (typeof value === 'number') return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  const text = String(value || 'Sur devis').trim();
  return /^\d+(?:[.,]\d+)?$/.test(text) ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(text.replace(',', '.'))) : text;
}

function sessionHref(session?: TrainingDatesPricingSession | null) {
  return session?.id ? `/contact?formation=sst&session=${encodeURIComponent(String(session.id))}` : contactHref('prochaines dates');
}

function isFull(session?: TrainingDatesPricingSession | null) {
  if (!session) return false;
  const hasSeatCount = session.seatsLeft !== null && session.seatsLeft !== undefined && session.seatsLeft !== '';
  return session.status === 'FULL' || (hasSeatCount && Number(session.seatsLeft) === 0);
}

function seatsLabel(session?: TrainingDatesPricingSession | null) {
  if (!session) return 'Planning en préparation';
  if (isFull(session)) return 'Session complète';
  if (session.showSeatsLeft === false || session.seatsLeft === null || session.seatsLeft === undefined || session.seatsLeft === '') return 'Places limitées';
  const seats = Number(session.seatsLeft);
  if (Number.isNaN(seats)) return 'Places limitées';
  return seats === 1 ? '1 place restante' : `${seats} places restantes`;
}

function CTA({ href, children, variant = 'dark', className = '' }: { href: string; children: ReactNode; variant?: 'dark' | 'gold' | 'light' | 'outline' | 'coral'; className?: string }) {
  const styles = {
    dark: 'bg-[#0D1725] text-white hover:bg-black',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
    coral: 'bg-[#F04C3A] text-white hover:bg-[#D93D2D]',
  };
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-academy-gold/25 ${styles[variant]} ${className}`}>{children}</Link>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-emerald-300' : 'text-emerald-800'}`}>{children}</p>;
}

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: { id?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode; tone?: 'cream' | 'paper' | 'dark' }) {
  const colors = tone === 'dark' ? 'bg-[#0D1725] text-white' : tone === 'paper' ? 'bg-[#FFFDF8] text-academy-ink' : 'bg-academy-bg text-academy-ink';
  return <section id={id} className={`${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-20`}><div className="page-container"><div className="mb-8 grid gap-5 lg:grid-cols-[.76fr_1.24fr] lg:items-end lg:gap-16"><div><Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl">{title}</h2></div>{intro && <div className={`max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>{intro}</div>}</div>{children}</div></section>;
}

function HeroOverview({ session }: { session?: TrainingDatesPricingSession | null }) {
  const full = isFull(session);
  return <aside className="rounded-[2rem] border border-white/65 bg-[#FFFDF8] p-5 text-academy-ink shadow-[0_34px_100px_rgba(0,0,0,.34)] sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-emerald-800 ring-1 ring-emerald-200">Votre formation en un coup d’œil</span><span className={`rounded-full border px-3 py-1.5 text-[.68rem] font-black ${full ? 'border-stone-300 bg-stone-100 text-stone-700' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>{seatsLabel(session)}</span></div>
    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">{[['Durée', '2 jours · 14 heures'], ['Prérequis', 'Aucun'], ['Certificat', 'SST · valable 24 mois'], ['Effectif', '4 à 10 participants']].map(([key, value]) => <div key={key} className="rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5"><p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p><p className="mt-1 text-sm font-black sm:text-base">{value}</p></div>)}</div>
    {session ? <div className="mt-4 rounded-2xl bg-[#0D1725] p-4 text-white"><p className="text-[.62rem] font-black uppercase tracking-[.16em] text-emerald-300">Prochaine session</p><div className="mt-2 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xl font-black">{formatDate(session.startDate)} → {formatDate(session.endDate)}</p><p className="mt-1 text-xs font-bold text-white/55">{session.location || 'Puget-sur-Argens'} · {formatPrice(session.priceLabel)}</p></div><CTA href={sessionHref(session)} variant={full ? 'light' : 'gold'}>{full ? 'Être alerté' : 'Choisir cette session →'}</CTA></div></div> : <div className="mt-4 rounded-2xl bg-[#0D1725] p-4 text-white"><p className="text-[.62rem] font-black uppercase tracking-[.16em] text-[#FF7B6E]">Prochaines dates en préparation</p><p className="mt-2 text-sm font-semibold text-white/65">Soyez informé dès l’ouverture des sessions.</p><CTA href={sessionHref()} variant="coral" className="mt-3 w-full">Être alerté →</CTA></div>}
  </aside>;
}

export function SstReferencePage({ sessions }: { sessions: TrainingDatesPricingSession[] }) {
  const next = sessions[0];
  return <main className="relative overflow-hidden pb-24 lg:pb-0">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Course', name: 'Formation Sauveteur Secouriste du Travail SST', description: 'Formation initiale SST de 14 heures en présentiel à Puget-sur-Argens, prévention des risques et premiers secours en entreprise.', provider: { '@type': 'Organization', name: 'Intégrale Academy', telephone: '04 22 47 07 68' } },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Formations sécurité', item: '/formations-securite' }, { '@type': 'ListItem', position: 3, name: 'SST', item: '/formations-securite/sst' }] },
    ] }) }} />

    <section className="relative isolate overflow-hidden bg-[#0D1725] px-4 pb-8 pt-10 text-white sm:pt-14 lg:pt-16"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_75%,rgba(16,185,129,.25),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(240,76,58,.19),transparent_28%),linear-gradient(135deg,#07121C_0%,#0D1D2E_58%,#0A1722_100%)]"/><div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:44px_44px]"/><div className="page-container"><div className="grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12"><div><span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/45 bg-emerald-400/10 px-4 py-2 text-[.68rem] font-black uppercase tracking-[.2em] text-emerald-300"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.9)]"/>Formation SST · Habilitation INRS</span><h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl xl:text-7xl">Devenez le premier maillon des <span className="text-[#F5C34E]">secours au travail.</span></h1><p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/72 sm:text-xl">En 2 jours, apprenez à prévenir les risques, réagir face à un accident et porter les premiers secours.</p><div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-black text-emerald-100"><span aria-hidden="true">●</span>100 % en présentiel · Puget-sur-Argens</div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={contactHref('programme SST')} variant="gold">Recevoir le programme →</CTA><CTA href="tel:0422470768" variant="outline">Parler à un conseiller</CTA></div></div><HeroOverview session={next}/></div><div className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 sm:grid-cols-2 lg:grid-cols-4">{[['Présentiel', 'Pour apprendre et pratiquer'], ['Mises en situation', 'Des scénarios proches du terrain'], ['Prévention + secours', 'Prévenez, protégez, secourez'], ['Certificat national', 'Valable pendant 24 mois']].map(([key, detail], index) => <div key={key} className="border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0"><span className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-black ${index === 2 ? 'bg-[#F04C3A]/15 text-[#FF897E]' : 'bg-emerald-400/12 text-emerald-300'}`}>{index === 0 ? '⌖' : index === 1 ? '◎' : index === 2 ? '+' : '✓'}</span><p className="mt-3 font-black text-white">{key}</p><p className="mt-1 text-xs font-semibold leading-5 text-white/48">{detail}</p></div>)}</div></div></section>

    <nav aria-label="Sommaire de la formation" className="sticky top-0 z-30 hidden border-b border-academy-line bg-[#FFFDF8]/95 px-4 py-3 backdrop-blur lg:block"><div className="page-container flex items-center justify-between gap-5"><span className="text-xs font-black">FORMATION SST</span><div className="flex items-center gap-5 text-xs font-extrabold text-academy-muted">{[['Présentation', '#role-sst'], ['Programme', '#programme-sst'], ['Évaluation', '#evaluation-sst'], ['Dates & tarifs', '#dates-tarifs'], ['Entreprises', '#entreprises-sst'], ['FAQ', '#faq-sst']].map(([label, href]) => <Link key={href} href={href} className="transition hover:text-academy-ink">{label}</Link>)}</div><CTA href={sessionHref(next)} variant="gold" className="min-h-10 px-4 py-2">Demander un devis →</CTA></div></nav>

    <Section id="role-sst" eyebrow="01 — Le rôle du SST" title={<>Bien plus que des gestes de secours.</>} intro={<>Le SST intervient face à un accident et contribue chaque jour à prévenir les risques dans son entreprise.</>}>
      <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]"><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8"><h3 className="text-2xl font-black">Face à un accident</h3><p className="mt-2 text-white/60">Une méthode claire pour agir sans perdre de temps.</p><div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{emergencySteps.map(([number, title, text], index) => <div key={number} className="rounded-2xl border border-white/10 bg-white/6 p-4"><span className={`grid h-9 w-9 place-items-center rounded-full text-xs font-black ${index < 2 ? 'bg-emerald-500 text-white' : 'bg-[#F04C3A] text-white'}`}>{number}</span><h4 className="mt-4 text-lg font-black">{title}</h4><p className="mt-2 text-xs font-semibold leading-5 text-white/55">{text}</p></div>)}</div></article><div className="grid gap-5"><article className="rounded-[2rem] border border-emerald-200 bg-emerald-50/70 p-6"><h3 className="text-2xl font-black text-emerald-900">Prévenir au quotidien</h3><div className="mt-4 space-y-3">{preventionActions.map(item => <p key={item} className="flex items-start gap-3 font-bold text-emerald-950/75"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-600 text-xs text-white">✓</span>{item}</p>)}</div></article><article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-soft"><h3 className="text-2xl font-black">Pour qui ?</h3><div className="mt-4 flex flex-wrap gap-2">{['Salariés', 'Candidats sécurité', 'Entreprises'].map(item => <span key={item} className="rounded-full border border-academy-line bg-white px-3 py-2 text-xs font-black">{item}</span>)}</div><span className="mt-4 inline-flex rounded-full bg-[#F04C3A] px-4 py-2 text-xs font-black text-white">✓ Aucun prérequis</span></article></div></div>
      <div className="mt-5 rounded-[1.8rem] bg-[#0D1725] p-5 text-white"><h3 className="text-xl font-black">Une compétence utile dans tous les secteurs</h3><div className="mt-4 flex flex-wrap gap-2">{sectors.map(item => <span key={item} className="rounded-full border border-emerald-400/35 bg-emerald-400/7 px-4 py-2 text-xs font-black text-emerald-200">{item}</span>)}</div></div>
    </Section>

    <Section id="programme-sst" eyebrow="02 — Programme · 2 jours" title={<>14 heures pour savoir quoi faire — vraiment.</>} intro={<>Un parcours rythmé par la pratique, les démonstrations et les mises en situation.</>} tone="paper">
      <div className="grid gap-5 lg:grid-cols-[.92fr_1.08fr]"><div className="grid gap-4">{days.map(day => <article key={day.number} className={`rounded-[1.8rem] border bg-white p-5 shadow-soft ${day.tone === 'green' ? 'border-emerald-300' : 'border-[#FF9A8F]'}`}><div className="flex items-center gap-4"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black text-white ${day.tone === 'green' ? 'bg-emerald-600' : 'bg-[#F04C3A]'}`}>{day.number}</span><h3 className="text-xl font-black uppercase tracking-[-.02em]">{day.title}</h3></div><ul className="mt-5 space-y-3">{day.items.map(item => <li key={item} className="flex gap-3 border-t border-academy-line/60 pt-3 font-semibold text-academy-muted first:border-0 first:pt-0"><span className={day.tone === 'green' ? 'text-emerald-600' : 'text-[#F04C3A]'}>✓</span>{item}</li>)}</ul></article>)}</div><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8"><h3 className="text-3xl font-black">Les situations travaillées</h3><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{scenarios.map(([icon, title], index) => <div key={title} className="rounded-2xl border border-white/20 bg-white/5 p-4 text-center"><span className={`mx-auto grid h-10 w-10 place-items-center text-2xl font-black ${index % 3 === 0 ? 'text-[#FF6958]' : 'text-emerald-400'}`}>{icon}</span><p className="mt-3 text-sm font-black">{title}</p></div>)}</div><div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-emerald-950"><h4 className="text-xl font-black">Une pédagogie très concrète</h4><p className="mt-2 font-semibold leading-7 text-emerald-900/70">Démonstrations, entraînements guidés et scénarios proches de votre environnement de travail.</p></div></article></div>
      <div className="mt-5 grid overflow-hidden rounded-[1.6rem] border border-academy-line bg-white sm:grid-cols-2 lg:grid-cols-4">{[['100 % présentiel', 'Apprenez et pratiquez'], ['Petit groupe · 4 à 10', 'Accompagnement personnalisé'], ['Matériel de simulation', 'Entraînement en conditions réelles']].map(([title, text]) => <div key={title} className="border-b border-academy-line p-5 sm:border-r lg:border-b-0"><p className="font-black">{title}</p><p className="mt-1 text-xs font-semibold text-academy-muted">{text}</p></div>)}<div className="grid place-items-center p-4"><CTA href={contactHref('programme SST')} variant="gold" className="w-full">Recevoir le programme →</CTA></div></div>
    </Section>

    <Section id="evaluation-sst" eyebrow="03 — Évaluation & certification" title={<>Des compétences vérifiées, un certificat reconnu.</>} intro={<>L’évaluation se déroule pendant la formation, au plus près des situations rencontrées en entreprise.</>}>
      <div className="grid gap-5 lg:grid-cols-2"><article className="rounded-[2rem] border border-emerald-200 bg-[#FFFDF8] p-6 shadow-soft lg:p-8"><h3 className="text-3xl font-black">Comment êtes-vous évalué ?</h3><div className="mt-7 space-y-4">{[['01', 'Mise en situation d’accident du travail', 'Analyser, protéger, examiner, alerter et réaliser les gestes adaptés.'], ['02', 'Questionnement prévention', 'Repérer un danger et proposer une action de prévention cohérente.']].map(([number, title, text], index) => <div key={number} className="grid gap-4 rounded-2xl border border-academy-line bg-white p-5 sm:grid-cols-[auto_1fr]"><span className={`grid h-11 w-11 place-items-center rounded-full font-black text-white ${index === 0 ? 'bg-emerald-600' : 'bg-[#F04C3A]'}`}>{number}</span><div><h4 className="text-lg font-black">{title}</h4><p className="mt-2 font-semibold leading-6 text-academy-muted">{text}</p></div></div>)}</div><div className="mt-4 rounded-2xl bg-emerald-50 p-5"><p className="font-black text-emerald-900">✓ Validation</p><p className="mt-1 text-sm font-semibold text-emerald-900/70">Les deux épreuves certificatives doivent être réussies.</p></div></article><article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card lg:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><span className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-[8px] border-[#F5C34E] bg-emerald-800 text-3xl font-black shadow-gold">SST</span><div><Eyebrow light>Votre certificat SST</Eyebrow><h3 className="mt-2 text-3xl font-black">Reconnu au niveau national</h3></div></div><div className="mt-7 grid gap-3 sm:grid-cols-2">{[['Validité', '24 mois'], ['Équivalence', 'PSC1'], ['Cadre', 'Assurance Maladie / INRS'], ['Habilitation', 'H34836/2020/SST-1/O/07']].map(([key, value]) => <div key={key} className="rounded-2xl border border-white/10 bg-white/7 p-4"><p className="text-[.62rem] font-black uppercase tracking-[.16em] text-emerald-300">{key}</p><p className="mt-2 font-black">{value}</p></div>)}</div><CTA href={contactHref('vérification projet SST')} variant="light" className="mt-5 w-full">Vérifier mon projet →</CTA></article></div>
      <article className="mt-5 rounded-[2rem] border border-emerald-200 bg-emerald-50/70 p-6 lg:p-8"><div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><Eyebrow>Et après ?</Eyebrow><h3 className="mt-2 text-2xl font-black text-emerald-950">Maintenez vos compétences à jour.</h3></div><div className="grid gap-3 sm:grid-cols-4">{[['Tous les 24 mois', 'Échéance'], ['MAC SST', 'Actualisation'], ['1 journée · 7 heures', 'Présentiel'], ['24 mois', 'Nouvelle validité']].map(([value, label], index) => <div key={value} className="relative rounded-2xl bg-white p-4 text-center shadow-soft"><p className="font-black text-emerald-900">{value}</p><p className="mt-1 text-xs font-semibold text-academy-muted">{label}</p>{index < 3 && <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 font-black text-emerald-600 sm:block">→</span>}</div>)}</div></div></article>
    </Section>

    <TrainingDatesPricingSection sessions={sessions} defaultPrice="Tarif sur devis" defaultLocation="Puget-sur-Argens" priceDescription="Formation initiale SST · 2 jours · 14 heures · Habilitation INRS H34836/2020/SST-1/O/07" registrationHref={sessionHref} benefits={['Employeur / OPCO', 'Financement personnel', 'Parcours sécurité', 'Conseiller dédié']} priceAction={{ href: contactHref('financement SST'), label: 'Étudier mon financement →' }} emptyAction={{ href: contactHref('alerte planning SST'), label: 'Recevoir les prochaines dates →' }} />

    <Section id="entreprises-sst" eyebrow="04 — Entreprises" title={<>Vous formez une équipe&nbsp;?</>} intro={<>Nous étudions avec vous une session adaptée à vos effectifs et à votre environnement de travail.</>} tone="dark"><div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><article className="rounded-[2rem] border border-white/10 bg-white/7 p-6 lg:p-8"><div className="grid gap-3 sm:grid-cols-3">{[['01', 'Besoin analysé', 'avec votre équipe'], ['02', 'Scénarios contextualisés', 'selon votre environnement'], ['03', 'Organisation simplifiée', 'devis et dates étudiés']].map(([number, title, text]) => <div key={number} className="rounded-2xl border border-white/10 bg-white/6 p-5"><span className="text-xs font-black text-emerald-300">{number}</span><h3 className="mt-3 text-lg font-black">{title}</h3><p className="mt-2 text-sm font-semibold text-white/55">{text}</p></div>)}</div><p className="mt-5 text-sm font-semibold text-white/45">Modalités selon votre projet et les disponibilités.</p></article><article className="rounded-[2rem] bg-[#FFFDF8] p-6 text-academy-ink shadow-card lg:p-8"><Eyebrow>Votre demande</Eyebrow><h3 className="mt-3 text-3xl font-black">Construisons votre session SST.</h3><p className="mt-3 font-semibold leading-7 text-academy-muted">Effectif, secteur, contraintes de planning et financement : Cassandre centralise votre besoin et prépare la suite avec l’équipe pédagogique.</p><CTA href={contactHref('devis entreprise SST')} variant="gold" className="mt-5 w-full">Demander un devis entreprise →</CTA></article></div></Section>

    <Section eyebrow="05 — Intégrale Academy" title={<>Un cadre sérieux pour apprendre à agir.</>} intro={<>Une formation courte ne doit pas être une formation superficielle : chaque compétence est démontrée, pratiquée et évaluée.</>}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{trustCards.map(([title, text], index) => <article key={title} className="rounded-[1.7rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft"><span className={`grid h-11 w-11 place-items-center rounded-2xl font-black ${index === 0 ? 'bg-emerald-100 text-emerald-800' : index === 1 ? 'bg-[#FFE7E3] text-[#D73F30]' : 'bg-academy-gold-soft text-yellow-800'}`}>✓</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">{text}</p></article>)}</div></Section>

    <div id="faq-sst"><PremiumFAQSection badge="FAQ SST" title="Vos questions sur la formation SST" description="Public, durée, certificat, maintien des compétences, financement et organisation en entreprise : retrouvez les réponses essentielles." items={faq} contactHref={contactHref('question SST')} /></div>

    <section className="bg-academy-bg px-4 pb-20 pt-8"><div className="page-container overflow-hidden rounded-[2.4rem] border border-academy-line bg-[#FFFDF8] shadow-card"><div className="grid items-center lg:grid-cols-[1.05fr_.95fr]"><div className="p-7 sm:p-9 lg:p-12"><Eyebrow>Une question sur votre projet ?</Eyebrow><h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">Faites le premier pas vers votre futur métier.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-academy-muted">Cassandre vous aide à choisir la bonne session, étudier l’organisation pour votre entreprise et préparer votre inscription.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={contactHref('rendez-vous avec Cassandre')} variant="dark">Réserver un rendez-vous →</CTA><CTA href="tel:0422470768" variant="light">Appeler Cassandre</CTA></div></div><div className="relative min-h-[370px] bg-[radial-gradient(circle_at_55%_30%,rgba(16,185,129,.24),transparent_32%),linear-gradient(140deg,#EEE4D4,#FFFDF8)] p-7"><div className="absolute inset-x-7 bottom-7 rounded-[1.8rem] border border-white/75 bg-white/88 p-5 shadow-soft backdrop-blur"><div className="flex items-center gap-4"><Image src="/images/cassandre-memoji.png" width={88} height={88} alt="Cassandre, responsable commerciale Intégrale Academy" className="h-20 w-20 rounded-2xl object-cover"/><div><p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Votre conseillère</p><p className="mt-1 text-2xl font-black">Cassandre</p><p className="text-sm font-semibold text-academy-muted">Responsable commerciale</p></div></div><a href="tel:0422470768" className="mt-4 block rounded-full bg-academy-gold px-5 py-3 text-center font-black text-academy-gold-text">04 22 47 07 68</a><p className="mt-3 text-center text-xs font-bold text-emerald-700">✓ Échange gratuit et sans engagement</p></div></div></div></div></section>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href={sessionHref(next)} variant="gold" className="min-w-0 flex-[1.4] px-3">Demander un devis</CTA></div></div>
  </main>;
}
