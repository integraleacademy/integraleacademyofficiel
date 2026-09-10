import btsStyles from './BtsIdentity.module.css';
import { btsRhythms } from '@/data/btsRhythms';
import { CourseJourney } from '@/components/CourseJourney';
import { serializeCourseJsonLd } from '@/lib/seo';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BtsSectionNavigation } from '@/components/BtsSectionNavigation';
import { MissionAnimation } from '@/components/MissionAnimation';
import { TrainingIllustratedCards, type TrainingIllustratedCard } from '@/components/TrainingIllustratedCards';
import { PremiumFAQSection } from '@/components/ui';

const applicationUrl = 'https://inscriptionsbts.onrender.com/';
const aurelieEmail = 'aurelie@integraleacademy.com';
const aurelieDirectHref = 'tel:+33487830615';
const aurelieMobileHref = 'tel:+33769390457';

const contactHref = (subject = 'BTS Comptabilité et Gestion') =>
  `mailto:${aurelieEmail}?subject=${encodeURIComponent(subject)}`;

const skillCards = [
  {
    number: "01", label: "Comptabiliser",
    title: "Fiabiliser les opérations",
    description: "Clients, fournisseurs, trésorerie, rapprochements bancaires et clôture.",
    scenes: [
      { kind: "evidence", description: "Animation de pièces comptables classées puis enregistrées avec méthode" },
      { kind: "feasibility", description: "Animation d’écritures comptables vérifiées une à une avant validation" },
    ],
  },
  {
    number: "02", label: "Déclarer",
    title: "Maîtriser fiscalité et social",
    description: "TVA, impôts, paie, obligations sociales et veille réglementaire.",
    scenes: [
      { kind: "compliance", description: "Animation d’un dossier fiscal et social contrôlé avant son échéance" },
    ],
  },
  {
    number: "03", label: "Analyser",
    title: "Mesurer la performance",
    description: "Coûts, budgets, trésorerie, rentabilité et diagnostic financier.",
    scenes: [
      { kind: "finance", description: "Animation d’un budget comparant les prévisions aux résultats réalisés" },
      { kind: "risk-radar", description: "Animation d’indicateurs analysés pour repérer les écarts significatifs" },
    ],
  },
  {
    number: "04", label: "Piloter",
    title: "Éclairer les décisions",
    description: "Tableaux de bord, reporting, données fiables et outils numériques.",
    scenes: [
      { kind: "approval", description: "Animation d’un dossier de clôture finalisé après les derniers contrôles" },
    ],
  },
] as const satisfies readonly TrainingIllustratedCard[];

const program = [
  ['01', 'Culture générale et expression', 'Comprendre, synthétiser, argumenter et communiquer avec précision dans les situations professionnelles.'],
  ['02', 'Anglais professionnel', 'Communiquer dans les principales situations de travail et exploiter une documentation professionnelle.'],
  ['03', 'Mathématiques appliquées', 'Mobiliser les outils mathématiques utiles à l’analyse, à la gestion et à la prise de décision.'],
  ['04', 'Culture économique, juridique et managériale', 'Comprendre l’environnement des organisations et analyser les décisions économiques, juridiques et managériales.'],
  ['05', 'Analyse comptable, fiscale et sociale', 'Traiter et justifier les obligations comptables, fiscales et sociales dans le respect des normes en vigueur.'],
  ['06', 'Pratiques comptables, fiscales et sociales', 'Utiliser le système d’information comptable pour produire, contrôler et présenter une information fiable.'],
  ['07', 'Analyse de gestion et analyse financière', 'Analyser les coûts, les budgets, la rentabilité, la trésorerie et la situation financière de l’organisation.'],
  ['08', 'Système d’information et outils numériques', 'Structurer les données, utiliser un PGI, automatiser les contrôles et sécuriser l’information comptable.'],
] as const;

const admissionSteps = [
  ['01', 'Je candidate', 'Je complète mon dossier de pré-inscription en ligne.'],
  ['02', 'Mon dossier est étudié', 'L’équipe vérifie mon projet, mon niveau et mes prérequis.'],
  ['03', 'Je suis admis', 'Je reçois les informations pour finaliser mon inscription.'],
  ['04', 'Je cherche mon entreprise', 'Je prépare ma recherche et mon contrat d’apprentissage.'],
  ['05', 'Je fais ma rentrée', 'Je rejoins ma promotion à l’école ou en visioconférence.'],
] as const;

const faq = [
  {
    q: 'Puis-je candidater juste après le bac ?',
    a: 'Oui. Le BTS Comptabilité et Gestion est accessible aux titulaires d’un baccalauréat ou d’un titre équivalent, sous réserve de l’étude du dossier et de la validation du projet d’alternance.',
  },
  {
    q: 'Faut-il être très fort en mathématiques ?',
    a: 'Il n’est pas nécessaire d’être un expert. Il faut surtout être rigoureux, logique, organisé et prêt à travailler régulièrement. Les mathématiques appliquées servent à comprendre les calculs de gestion et l’analyse financière.',
  },
  {
    q: 'Le BTS peut-il être suivi à distance ?',
    a: 'Oui. Le parcours peut être suivi en présentiel à Puget-sur-Argens ou 100 % à distance en visioconférence. À distance, les cours sont assurés en direct avec les formateurs et la promotion.',
  },
  {
    q: 'L’école aide-t-elle pour la recherche d’entreprise ?',
    a: 'L’équipe vous accompagne dans la préparation de votre candidature, la compréhension du contrat d’apprentissage et les étapes à suivre jusqu’à la signature avec une entreprise d’accueil.',
  },
  {
    q: 'Combien coûte le BTS en alternance ?',
    a: 'Dans le cadre d’un contrat d’alternance, les frais de formation sont pris en charge selon l’accord de l’entreprise et de son OPCO. La formation est donc sans frais de scolarité pour l’apprenti lorsque le contrat et sa prise en charge sont validés.',
  },
  {
    q: 'Le diplôme est-il reconnu par l’État ?',
    a: 'Oui. Le BTS Comptabilité et Gestion est un diplôme national de niveau 5 enregistré au RNCP sous le numéro 39159.',
  },
  {
    q: 'Quels métiers peut-on exercer après le BTS CG ?',
    a: 'Le BTS prépare notamment aux fonctions d’assistant comptable, de collaborateur en cabinet, de comptable clients ou fournisseurs, de gestionnaire comptable ou d’assistant contrôle de gestion.',
  },
  {
    q: 'Peut-on poursuivre ses études après le BTS ?',
    a: 'Oui. Selon votre dossier et votre projet, vous pouvez notamment poursuivre vers un DCG, une licence professionnelle, une licence de gestion ou une école spécialisée.',
  },
  {
    q: 'Qui contacter pour parler du BTS ?',
    a: 'Aurélie CHAUSSEZ, chargée des relations clients Intégrale Academy et responsable des BTS, répond à vos questions au 04 87 83 06 15, au 07 69 39 04 57 ou par e-mail à aurelie@integraleacademy.com.',
  },
];

function CTA({ href, children, variant = 'dark', className = '', external = false }: {
  href: string;
  children: ReactNode;
  variant?: 'dark' | 'gold' | 'light' | 'outline';
  className?: string;
  external?: boolean;
}) {
  const styles = {
    dark: 'bg-bts-700 text-white hover:bg-bts-800',
    gold: 'bg-bts-200 text-bts-950 hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
  };
  return (
    <Link href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-bts-200/25 ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-bts-300' : 'text-bts-700'}`}>{children}</p>;
}

function Section({ id, eyebrow, title, intro, children, tone = 'cream' }: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  tone?: 'cream' | 'paper';
}) {
  return (
    <section id={id} className={`${tone === 'paper' ? 'bg-[#FFFDF8]' : 'bg-academy-bg'} scroll-mt-24 px-4 py-14 text-academy-ink sm:py-16 lg:py-20`}>
      <div className="page-container">
        <div className="mb-9 grid gap-5 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-16">
          <div><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-3 max-w-4xl text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">{title}</h2></div>
          {intro && <div className="max-w-3xl text-base font-medium leading-8 text-academy-muted">{intro}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

function HeroRoadmap() {
  const steps = [
    ['01', 'Votre bac', 'Votre point de départ', 'PRÊT'],
    ['02', 'L’école + l’entreprise', 'Apprendre sur de vrais dossiers', '2 ANS'],
    ['03', 'Le diplôme d’État', 'BTS · niveau 5', 'BAC+2'],
    ['04', 'Votre premier poste', 'Cabinet, entreprise ou gestion', 'GO'],
  ];
  return (
    <aside className="relative rounded-[2rem] border border-white/60 bg-[#FFFDF8] p-5 text-academy-ink shadow-[0_34px_100px_rgba(0,0,0,.34)] sm:p-6">
      <span className="absolute -right-2 -top-3 rounded-full bg-bts-700 px-3 py-2 text-[.58rem] font-black uppercase tracking-[.14em] text-white shadow-soft">Admissions 2026</span>
      <div className="flex items-start justify-between gap-3"><div><Eyebrow>Votre trajectoire</Eyebrow><h2 className="mt-2 text-2xl font-black">Objectif : BTS CG</h2></div><span className="rounded-full bg-bts-50 px-3 py-1.5 text-[.6rem] font-black uppercase tracking-[.12em] text-bts-800 ring-1 ring-bts-200">Dossier en ligne</span></div>
      <div className="mt-5 rounded-[1.5rem] border border-[#E4D9C8] bg-[#F4EFE6] p-4">
        {steps.map(([number, title, detail, status], index) => (
          <div key={number} className={`grid grid-cols-[2.3rem_1fr_auto] items-center gap-3 py-3 ${index ? 'border-t border-[#DED4C5]' : ''}`}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0D1725] text-[.65rem] font-black text-bts-200">{number}</span>
            <div><p className="text-sm font-black">{title}</p><p className="mt-0.5 text-[.68rem] font-semibold text-academy-muted">{detail}</p></div>
            <span className="text-[.6rem] font-black text-bts-700">{status}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-academy-line bg-white p-4"><p className="text-[.6rem] font-black uppercase tracking-[.15em] text-bts-700">École</p><p className="mt-1 font-black">Puget-sur-Argens</p></div>
        <div className="rounded-2xl border border-academy-line bg-white p-4"><p className="text-[.6rem] font-black uppercase tracking-[.15em] text-bts-700">Ou à distance</p><p className="mt-1 font-black">Visio en direct</p></div>
      </div>
    </aside>
  );
}

export function BtsCgReferencePage() {
  return (
    <main data-bts="cg" className={`${btsStyles.page} relative overflow-x-clip pb-24 lg:pb-0`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeCourseJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Course', name: 'BTS Comptabilité et Gestion (CG)', description: 'BTS Comptabilité et Gestion en alternance, en présentiel à Puget-sur-Argens ou à distance en visioconférence.', educationalCredentialAwarded: 'BTS - diplôme national de niveau 5 - RNCP 39159', provider: { '@type': 'EducationalOrganization', name: 'Intégrale Academy', telephone: '04 87 83 06 15', email: aurelieEmail } },
          { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
          { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' },
            { '@type': 'ListItem', position: 2, name: 'BTS en alternance', item: '/#bts' },
            { '@type': 'ListItem', position: 3, name: 'BTS Comptabilité et Gestion', item: '/bts/comptabilite-gestion' },
          ] },
        ],
      }, "/bts/comptabilite-gestion") }} />

      <section className="relative isolate overflow-hidden bg-[#0A1725] px-4 pb-8 pt-10 text-white sm:pt-14 lg:pt-16">
        <div className={`absolute inset-0 -z-10 ${btsStyles.heroGlow}`} />
        <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="page-container">
          <div className="grid items-center gap-9 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-bts-300/35 bg-white/8 px-4 py-2 text-[.66rem] font-black uppercase tracking-[.18em] text-bts-100 backdrop-blur"><span className="h-2.5 w-2.5 rounded-full bg-bts-200 shadow-[0_0_16px_rgb(var(--bts-300)/.7)]" />Diplôme d’État · Bac+2 · Niveau 5 · RNCP 39159</span>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.06em] sm:text-5xl lg:text-6xl xl:text-7xl">Transformez les chiffres en <span className="text-bts-200">décisions.</span></h1>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/70 sm:text-xl">Avec le BTS Comptabilité et Gestion, apprenez à comprendre la santé d’une entreprise, sécuriser ses obligations et guider ses choix.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row"><CTA href={applicationUrl} variant="gold" external>Je candidate pour 2026 →</CTA><CTA href={aurelieDirectHref} variant="outline">Parler à Aurélie</CTA></div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-white/75"><span className="rounded-full border border-white/15 bg-white/7 px-3 py-2">✓ Sans frais de scolarité pour l’apprenti*</span><span className="rounded-full border border-white/15 bg-white/7 px-3 py-2">✓ Présentiel ou visioconférence</span><span className="rounded-full border border-white/15 bg-white/7 px-3 py-2">✓ Comptabilité, fiscalité et pilotage</span></div>
            </div>
            <HeroRoadmap />
          </div>
          <div className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 sm:grid-cols-2 lg:grid-cols-4">
            {[['Durée', '2 ans en alternance'], ['Alternance', btsRhythms.CG.shortLabel], ['Diplôme', 'Diplôme d’État · Bac+2'], ['Admission', 'Après le bac']].map(([key, value]) => <div key={key} className="border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0"><p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p><p className="mt-1 font-black text-white">{value}</p></div>)}
          </div>
          <p className="mt-3 text-[.64rem] font-semibold text-white/40">* Sous réserve de la conclusion et de la prise en charge du contrat d’alternance.</p>
        </div>
      </section>

      <CourseJourney course="bts-cg" />

      <BtsSectionNavigation code="CG" competencyHref="#competences" competencyLabel="Compétences" faqHref="#faq-cg" registrationHref={applicationUrl} />

      <Section id="pour-qui" eyebrow="01 — Un choix qui rassure et qui ouvre des portes" title={<>Un métier utile pour vous. Un diplôme solide pour vos parents.</>} intro={<>Un BTS pour celles et ceux qui aiment comprendre, organiser, vérifier et rendre les choses plus claires — avec des compétences recherchées dans tous les secteurs.</>}>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#22354C] bg-[#0D1725] p-6 text-white shadow-card sm:p-8"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-bts-400/15 text-2xl text-bts-300">↗</span><Eyebrow light>Pour le futur étudiant</Eyebrow><h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Vous aimez comprendre comment une entreprise fonctionne vraiment.</h3><p className="mt-4 leading-7 text-white/62">Le BTS CG transforme votre rigueur et votre goût des chiffres en compétences concrètes : comptabilité, paie, fiscalité, budgets et analyse financière.</p><div className="mt-6 grid gap-3">{['Des missions concrètes dès l’alternance', 'Des outils numériques et des cas réels', 'Un métier présent dans tous les secteurs'].map((item) => <p key={item} className="flex items-center gap-3 rounded-2xl bg-white/7 p-4 font-bold"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bts-500 text-xs">✓</span>{item}</p>)}</div></article>
          <article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-card sm:p-8"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-bts-100 text-2xl text-bts-700">◎</span><Eyebrow>Pour les parents</Eyebrow><h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Vous cherchez un diplôme reconnu et un cadre sérieux.</h3><p className="mt-4 leading-7 text-academy-muted">Le parcours associe un diplôme national, deux années d’expérience professionnelle et le suivi d’une équipe BTS clairement identifiée.</p><div className="mt-6 grid gap-3">{['Diplôme d’État de niveau 5 — RNCP 39159', 'Sans frais de scolarité pour l’apprenti*', 'Accompagnement de la candidature jusqu’au contrat'].map((item) => <p key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bts-500 text-xs text-white">✓</span>{item}</p>)}</div><CTA href={contactHref('Question d’un parent sur le BTS Comptabilité et Gestion')} variant="light" className="mt-6">Poser une question à Aurélie →</CTA></article>
        </div>
      </Section>

      <Section id="competences" eyebrow="02 — Bien plus que saisir des chiffres" title={<>Vous rendez l’entreprise plus fiable, plus lisible et mieux pilotée.</>} intro={<>Vous apprenez à produire une information juste, respecter les obligations, analyser la performance et aider les dirigeants à prendre de meilleures décisions.</>} tone="paper">
        <TrainingIllustratedCards items={skillCards} theme="bts" />
        <div className="mt-6 grid items-center gap-5 rounded-[1.7rem] border border-bts-200 bg-bts-50 p-6 sm:grid-cols-[1fr_auto]">
          <div><Eyebrow>Votre montée en compétences</Eyebrow><h3 className="mt-3 text-2xl font-black text-bts-950">De la pièce comptable au tableau de bord.</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-bts-950/70">Vous progressez du traitement quotidien des opérations jusqu’à l’analyse financière, en utilisant les outils numériques du métier.</p></div>
          <div className="rounded-2xl border border-bts-200 bg-white/70 px-6 py-4"><p className="text-4xl font-black text-bts-700">3+1</p><p className="mt-2 max-w-[14rem] text-xs font-black uppercase tracking-[.12em] text-bts-950/70">blocs métier et système d’information</p></div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['Assistant comptable', 'Collaborateur en cabinet', 'Comptable junior', 'Assistant contrôle de gestion'].map((job) => <div key={job} className="rounded-2xl border border-academy-line bg-academy-bg p-4 text-center font-black">{job}</div>)}</div>
        <MissionAnimation variant="cg" className="mt-8" />
      </Section>

      <Section id="formats" eyebrow="03 — Deux formats, le même BTS" title={<>Choisissez la façon d’étudier qui vous correspond vraiment.</>} intro={<>Le format est un choix d’organisation. Le diplôme, le programme officiel, les cours en direct et l’accompagnement restent les mêmes.</>}>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-card sm:p-8"><span className="inline-flex rounded-full bg-bts-50 px-3 py-2 text-[.62rem] font-black uppercase tracking-[.15em] text-bts-800 ring-1 ring-bts-200">● À l’école</span><h3 className="mt-6 text-3xl font-black tracking-[-.04em]">En présentiel à Puget-sur-Argens</h3><p className="mt-4 leading-7 text-academy-muted">Un cadre vivant pour apprendre avec votre promotion, échanger directement avec les formateurs et profiter de l’école.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Cours en groupe', 'Équipe sur place', 'Vie de promotion', 'Locaux dédiés'].map((item) => <p key={item} className="rounded-2xl bg-academy-bg p-4 text-sm font-black">✓ {item}</p>)}</div></article>
          <article className="rounded-[2rem] border border-[#284661] bg-bts-950 p-6 text-white shadow-card sm:p-8"><span className="inline-flex rounded-full bg-bts-400/15 px-3 py-2 text-[.62rem] font-black uppercase tracking-[.15em] text-bts-200 ring-1 ring-bts-300/30">◉ Classe virtuelle</span><h3 className="mt-6 text-3xl font-black tracking-[-.04em]">100 % à distance en visioconférence</h3><p className="mt-4 leading-7 text-white/62">De vrais cours en direct avec vos formateurs et votre promotion, depuis chez vous — pas une simple plateforme laissée en autonomie.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Cours en direct', 'Interactions en visio', 'Suivi régulier', 'Accessible partout en France'].map((item) => <p key={item} className="rounded-2xl bg-white/8 p-4 text-sm font-black">✓ {item}</p>)}</div></article>
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-[1.7rem] border border-bts-300 bg-bts-50 p-5 sm:flex-row sm:items-center"><div><p className="text-lg font-black text-bts-950">Même diplôme d’État. Même programme. Même équipe à vos côtés.</p><p className="mt-1 text-sm font-semibold text-bts-900/65">Le format est validé avec l’équipe admissions selon votre situation.</p></div><span className="rounded-full bg-white px-4 py-2 text-xs font-black text-academy-ink ring-1 ring-bts-300">BTS CG · RNCP 39159</span></div>
      </Section>

      <Section id="alternance" eyebrow="04 — L’alternance" title={<>Apprenez. Comptabilisez. Analysez. Construisez déjà votre expérience.</>} intro={<>Deux années pour obtenir un diplôme, traiter de vrais dossiers et acquérir une expérience immédiatement visible sur votre CV.</>} tone="paper">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card sm:p-8"><Eyebrow light>Une formation qui se vit</Eyebrow><h3 className="mt-4 text-3xl font-black tracking-[-.04em]">À l’école, vous comprenez. En entreprise, vous appliquez.</h3><div className="mt-6 grid gap-3">{[['01', 'À l’école', 'Comptabilité, fiscalité, paie, gestion et analyse financière'], ['02', 'En entreprise', 'Factures, déclarations, clôture, reporting et suivi budgétaire'], ['03', 'À la sortie', 'Un diplôme et deux années d’expérience sur le CV']].map(([number, title, detail]) => <div key={number} className="grid grid-cols-[2.4rem_1fr] items-center gap-3 rounded-2xl bg-white/7 p-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[.62rem] font-black text-bts-200">{number}</span><div><p className="font-black">{title}</p><p className="mt-1 text-xs font-semibold text-white/48">{detail}</p></div></div>)}</div></article>
          <article className="rounded-[2rem] border border-bts-300 bg-bts-100 p-6 shadow-card sm:p-8"><Eyebrow>Côté budget</Eyebrow><p className="mt-5 text-7xl font-black tracking-[-.08em]">0 €*</p><h3 className="mt-5 text-3xl font-black tracking-[-.04em]">de frais de scolarité pour l’apprenti.</h3><p className="mt-4 leading-7 text-bts-950/70">La formation est prise en charge dans le cadre du contrat d’alternance et de l’accord de l’entreprise avec son OPCO.</p><CTA href={contactHref('Question sur le financement du BTS Comptabilité et Gestion')} variant="dark" className="mt-6">Poser ma question à Aurélie →</CTA><p className="mt-4 text-[.62rem] font-semibold text-bts-950/55">* Sous réserve de la conclusion et de la prise en charge du contrat.</p></article>
        </div>
        <article className="mt-5 rounded-[2rem] border border-academy-line bg-academy-bg p-6 shadow-soft"><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><div><Eyebrow>Le coin des parents</Eyebrow><h3 className="mt-3 text-2xl font-black">Ce qui compte vraiment pour vous rassurer.</h3></div><CTA href={aurelieDirectHref} variant="light">Appeler Aurélie →</CTA></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[['Diplôme officiel', 'Diplôme national de niveau 5 — RNCP 39159.'], ['Équipe identifiée', 'Aurélie répond aux questions du jeune et de sa famille.'], ['Parcours encadré', 'Un suivi pédagogique pendant les deux années.'], ['Compétences durables', 'Des savoir-faire utiles dans tous les secteurs.']].map(([title, text]) => <div key={title} className="rounded-2xl border border-academy-line bg-white p-4"><p className="font-black">{title}</p><p className="mt-2 text-xs leading-5 text-academy-muted">{text}</p></div>)}</div></article>
      </Section>

      <Section id="programme" eyebrow="05 — Le programme et le diplôme" title={<>Un programme officiel. Des compétences au cœur de chaque entreprise.</>} intro={<>Le contenu suit le référentiel national du BTS Comptabilité et Gestion et les trois blocs professionnels du RNCP 39159.</>}>
        <div className="grid gap-3 lg:grid-cols-2">{program.map(([number, title, text], index) => <details key={number} open={index === 0} className="group rounded-[1.5rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft"><summary className="flex cursor-pointer list-none items-center gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-black ${index >= 4 ? 'bg-[#0D1725] text-bts-200' : 'bg-academy-bg text-academy-ink'}`}>{number}</span><strong className="min-w-0 flex-1">{title}</strong><span className="grid h-8 w-8 place-items-center rounded-full bg-bts-200 font-black transition group-open:rotate-45">+</span></summary><p className="ml-[3.25rem] mt-4 text-sm leading-6 text-academy-muted">{text}</p></details>)}</div>
        <div className="mt-7 grid gap-5 rounded-[2rem] bg-[#0D1725] p-6 text-white lg:grid-cols-[.72fr_1.28fr] lg:p-8"><div><Eyebrow light>Validation</Eyebrow><h3 className="mt-4 text-3xl font-black">Un diplôme national de niveau 5.</h3><p className="mt-4 leading-7 text-white/62">Le diplôme est obtenu selon les épreuves et modalités prévues par le référentiel national en vigueur.</p></div><div className="grid gap-3 sm:grid-cols-3">{[['01', 'Épreuves nationales', 'Selon le référentiel de l’Éducation nationale'], ['02', 'Situations professionnelles', 'Travaux comptables, fiscaux, sociaux et numériques'], ['03', 'Expérience en entreprise', 'Compétences développées en alternance']].map(([number, title, text]) => <article key={number} className="rounded-2xl border border-white/10 bg-white/7 p-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-bts-200 text-xs font-black text-bts-950">{number}</span><h4 className="mt-5 font-black">{title}</h4><p className="mt-2 text-xs leading-5 text-white/50">{text}</p></article>)}</div></div>
      </Section>

      <section id="admission" className="relative isolate overflow-hidden bg-[#0A1725] px-4 py-14 text-white sm:py-16 lg:py-20">
        <div className={`absolute inset-0 -z-10 ${btsStyles.admissionGlow}`} />
        <div className="page-container"><Eyebrow light>06 — Admissions 2026</Eyebrow><div className="mt-3 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"><div><h2 className="max-w-4xl text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">Votre candidature en cinq étapes. <span className="text-bts-200">Simple, claire, accompagnée.</span></h2><p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/62">Vous ne savez pas encore comment trouver une entreprise ? C’est normal. Commencez par votre candidature : notre équipe vous guide ensuite.</p></div><CTA href={applicationUrl} variant="gold" external>Je candidate pour 2026 →</CTA></div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{admissionSteps.map(([number, title, text]) => <article key={number} className="rounded-[1.6rem] border border-white/10 bg-white/7 p-5"><span className="grid h-11 w-11 place-items-center rounded-full bg-bts-200 text-xs font-black text-bts-950">{number}</span><h3 className="mt-7 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{text}</p></article>)}</div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><article className="rounded-[2rem] bg-[#FFFDF8] p-6 text-academy-ink shadow-card"><Eyebrow>Après le BTS</Eyebrow><h3 className="mt-3 text-3xl font-black">Des débouchés concrets et des poursuites d’études</h3><div className="mt-5 flex flex-wrap gap-2">{['Assistant comptable', 'Collaborateur en cabinet', 'Comptable clients ou fournisseurs', 'Assistant contrôle de gestion', 'DCG', 'Licence professionnelle'].map((job) => <span key={job} className="rounded-full border border-academy-line bg-academy-bg px-4 py-2 text-xs font-black">{job}</span>)}</div></article><article className="rounded-[2rem] bg-gradient-to-br from-bts-300 to-bts-200 p-6 text-bts-950 shadow-gold"><Eyebrow>Votre avenir commence ici</Eyebrow><h3 className="mt-3 text-3xl font-black">Prêt à faire parler les chiffres ?</h3><p className="mt-4 text-sm font-semibold leading-6 opacity-70">Déposez votre candidature et échangez avec Aurélie avant toute décision définitive.</p><CTA href={aurelieDirectHref} variant="dark" className="mt-5">Parler à Aurélie →</CTA></article></div>
        </div>
      </section>

      <div id="faq-cg"><PremiumFAQSection theme="bts" badge="FAQ BTS Comptabilité et Gestion" title="Tout comprendre avant de vous lancer" description="Admission, alternance, niveau en mathématiques, métiers, entreprise, visioconférence, coût ou diplôme : Aurélie répond aux questions du jeune comme à celles de sa famille." items={faq} contactHref={contactHref()} contactLabel="Écrire à Aurélie" callHref={aurelieDirectHref} callLabel="Appeler Aurélie" /></div>

      <section className="bg-[#FFFDF8] px-4 py-8"><div className="page-container grid gap-4 rounded-[2rem] border border-academy-line bg-academy-bg p-5 shadow-soft sm:grid-cols-3"><a href={`mailto:${aurelieEmail}`} className="rounded-2xl bg-white p-4 text-center transition hover:-translate-y-0.5"><p className="text-[.62rem] font-black uppercase tracking-[.15em] text-bts-700">E-mail BTS</p><p className="mt-2 break-all font-black">{aurelieEmail}</p></a><a href={aurelieDirectHref} className="rounded-2xl bg-white p-4 text-center transition hover:-translate-y-0.5"><p className="text-[.62rem] font-black uppercase tracking-[.15em] text-bts-700">Ligne directe</p><p className="mt-2 font-black">04 87 83 06 15</p></a><a href={aurelieMobileHref} className="rounded-2xl bg-white p-4 text-center transition hover:-translate-y-0.5"><p className="text-[.62rem] font-black uppercase tracking-[.15em] text-bts-700">Portable</p><p className="mt-2 font-black">07 69 39 04 57</p></a></div></section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg gap-2"><CTA href={aurelieDirectHref} variant="light" className="min-w-0 flex-1 px-3">Appeler Aurélie</CTA><CTA href={applicationUrl} variant="gold" className="min-w-0 flex-[1.2] px-3" external>Je candidate</CTA></div></div>
    </main>
  );
}
