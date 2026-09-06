import Link from 'next/link';
import type { ReactNode } from 'react';
import { BtsCompleteInformation, BtsStudentBenefits } from '@/components/BtsExpandedContent';
import { MissionAnimation } from '@/components/MissionAnimation';
import { PremiumFAQSection } from '@/components/ui';

const applicationUrl = 'https://inscriptionsbts.onrender.com/';
const aurelieEmail = 'aurelie@integraleacademy.com';
const aurelieDirectHref = 'tel:+33487830615';
const aurelieMobileHref = 'tel:+33769390457';

const contactHref = (subject = 'BTS MCO') =>
  `mailto:${aurelieEmail}?subject=${encodeURIComponent(subject)}`;

const careerSteps = [
  ['01', 'Vendre', 'Conseiller et fidéliser', 'Comprendre le besoin, vendre dans un contexte omnicanal et entretenir durablement la relation client.', 'blue'],
  ['02', 'Animer', 'Dynamiser l’offre', 'Mettre en valeur les produits et services, créer des animations et concevoir la communication commerciale.', 'green'],
  ['03', 'Gérer', 'Piloter les résultats', 'Suivre les stocks, les budgets, les objectifs et analyser les performances de l’unité commerciale.', 'coral'],
  ['04', 'Manager', 'Faire grandir l’équipe', 'Organiser le travail, recruter, motiver et évaluer les collaborateurs.', 'gold'],
];

const program = [
  ['01', 'Culture générale et expression', 'Développer votre capacité à comprendre, argumenter, synthétiser et communiquer avec précision.'],
  ['02', 'Langue vivante étrangère', 'Communiquer dans un contexte professionnel et mobiliser le vocabulaire utile aux situations de travail.'],
  ['03', 'Culture économique, juridique et managériale', 'Comprendre l’environnement économique, le droit et les décisions de management qui structurent une organisation.'],
  ['04', 'Développement de la relation client et vente conseil', 'Assurer la veille, réaliser des études commerciales, vendre en omnicanal et fidéliser la clientèle.'],
  ['05', 'Animation et dynamisation de l’offre commerciale', 'Adapter l’offre, organiser l’espace commercial, développer sa performance et concevoir la communication.'],
  ['06', 'Gestion opérationnelle', 'Gérer les opérations courantes, prévoir les budgets et analyser les performances commerciales.'],
  ['07', 'Management de l’équipe commerciale', 'Organiser le travail, recruter, animer l’équipe et évaluer les performances individuelles et collectives.'],
];

const admissionSteps = [
  ['01', 'Je candidate', 'Je complète mon dossier de pré-inscription en ligne.'],
  ['02', 'Mon dossier est étudié', 'L’équipe vérifie mon projet, mon niveau et mes prérequis.'],
  ['03', 'Je suis admis', 'Je reçois les informations pour finaliser mon inscription.'],
  ['04', 'Je cherche mon entreprise', 'Je prépare ma recherche et mon contrat d’apprentissage.'],
  ['05', 'Je fais ma rentrée', 'Je rejoins ma promotion sur le campus ou en visioconférence.'],
];

const faq = [
  {
    q: 'Puis-je candidater juste après le bac ?',
    a: 'Oui. Le BTS MCO est accessible aux candidats titulaires d’un baccalauréat ou d’un titre équivalent, sous réserve de l’étude du dossier et de la validation du projet d’alternance.',
  },
  {
    q: 'Le BTS peut-il être suivi à distance ?',
    a: 'Oui. Le parcours peut être suivi en présentiel à Puget-sur-Argens ou 100 % à distance en visioconférence selon les modalités validées avec l’équipe admissions. À distance, les cours sont assurés en direct avec les formateurs et la promotion.',
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
    a: 'Oui. Le BTS Management Commercial Opérationnel est un diplôme national de niveau 5 délivré par le ministère de l’Enseignement supérieur et de la Recherche et enregistré au RNCP sous le numéro 38362.',
  },
  {
    q: 'Quels métiers peut-on exercer après le BTS MCO ?',
    a: 'Le BTS prépare notamment aux fonctions de conseiller de vente, chargé de clientèle, marchandiseur, manager adjoint ou responsable d’une unité commerciale de proximité. Avec de l’expérience, il permet d’évoluer vers des fonctions de chef des ventes, responsable de rayon, responsable e-commerce ou manager d’unité commerciale.',
  },
  {
    q: 'Qui contacter pour parler du BTS ?',
    a: 'Aurélie CHAUSSEZ, chargée des relations clients Intégrale Academy et responsable des BTS, répond à vos questions au 04 87 83 06 15, au 07 69 39 04 57 ou par e-mail à aurelie@integraleacademy.com.',
  },
];

function CTA({
  href,
  children,
  variant = 'dark',
  className = '',
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'dark' | 'gold' | 'light' | 'outline' | 'blue';
  className?: string;
  external?: boolean;
}) {
  const styles = {
    dark: 'bg-[#0D1725] text-white hover:bg-black',
    gold: 'bg-academy-gold text-academy-gold-text hover:brightness-105',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
    blue: 'bg-[#4AA8FF] text-[#07121F] hover:bg-[#72BCFF]',
  };
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-academy-gold/25 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-sky-300' : 'text-yellow-700'}`}>
      {children}
    </p>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = 'cream',
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  tone?: 'cream' | 'paper' | 'dark';
}) {
  const colors =
    tone === 'dark'
      ? 'bg-[#0D1725] text-white'
      : tone === 'paper'
        ? 'bg-[#FFFDF8] text-academy-ink'
        : 'bg-academy-bg text-academy-ink';
  return (
    <section id={id} className={`${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-20`}>
      <div className="page-container">
        <div className="mb-9 grid gap-5 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
          {intro && (
            <div className={`max-w-3xl text-base font-medium leading-8 ${tone === 'dark' ? 'text-white/65' : 'text-academy-muted'}`}>
              {intro}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function HeroRoadmap() {
  const steps = [
    ['01', 'Votre bac', 'Votre point de départ', 'PRÊT'],
    ['02', 'L’école + l’entreprise', 'Apprendre en situation réelle', '2 ANS'],
    ['03', 'Le diplôme d’État', 'BTS · niveau 5', 'BAC+2'],
    ['04', 'Votre premier poste', 'Commerce & management', 'GO'],
  ];
  return (
    <aside className="relative rounded-[2rem] border border-white/60 bg-[#FFFDF8] p-5 text-academy-ink shadow-[0_34px_100px_rgba(0,0,0,.34)] sm:p-6">
      <span className="absolute -right-2 -top-3 rounded-full bg-[#FF6B55] px-3 py-2 text-[.58rem] font-black uppercase tracking-[.14em] text-white shadow-soft">
        Admissions 2026
      </span>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Eyebrow>Votre trajectoire</Eyebrow>
          <h2 className="mt-2 text-2xl font-black">Objectif : BTS MCO</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[.6rem] font-black uppercase tracking-[.12em] text-emerald-800 ring-1 ring-emerald-200">
          Dossier en ligne
        </span>
      </div>
      <div className="mt-5 rounded-[1.5rem] border border-[#E4D9C8] bg-[#F4EFE6] p-4">
        {steps.map(([number, title, detail, status], index) => (
          <div key={number} className={`grid grid-cols-[2.3rem_1fr_auto] items-center gap-3 py-3 ${index ? 'border-t border-[#DED4C5]' : ''}`}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0D1725] text-[.65rem] font-black text-academy-gold">
              {number}
            </span>
            <div>
              <p className="text-sm font-black">{title}</p>
              <p className="mt-0.5 text-[.68rem] font-semibold text-academy-muted">{detail}</p>
            </div>
            <span className="text-[.6rem] font-black text-emerald-700">{status}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-academy-line bg-white p-4">
          <p className="text-[.6rem] font-black uppercase tracking-[.15em] text-yellow-700">Campus</p>
          <p className="mt-1 font-black">Puget-sur-Argens</p>
        </div>
        <div className="rounded-2xl border border-academy-line bg-white p-4">
          <p className="text-[.6rem] font-black uppercase tracking-[.15em] text-sky-700">Ou à distance</p>
          <p className="mt-1 font-black">Visio en direct</p>
        </div>
      </div>
    </aside>
  );
}

export function BtsMcoReferencePage() {
  return (
    <main className="relative overflow-hidden pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Course',
                name: 'BTS Management Commercial Opérationnel (MCO)',
                description: 'BTS MCO en alternance, en présentiel à Puget-sur-Argens ou à distance en visioconférence.',
                educationalCredentialAwarded: 'BTS - diplôme national de niveau 5',
                provider: {
                  '@type': 'EducationalOrganization',
                  name: 'Intégrale Academy',
                  telephone: '04 87 83 06 15',
                  email: aurelieEmail,
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: faq.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' },
                  { '@type': 'ListItem', position: 2, name: 'BTS en alternance', item: '/#bts' },
                  { '@type': 'ListItem', position: 3, name: 'BTS MCO', item: '/bts/mco' },
                ],
              },
            ],
          }),
        }}
      />

      <section className="relative isolate overflow-hidden bg-[#0A1725] px-4 pb-8 pt-10 text-white sm:pt-14 lg:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_76%,rgba(124,99,255,.25),transparent_29%),radial-gradient(circle_at_87%_12%,rgba(244,166,33,.22),transparent_28%),linear-gradient(135deg,#07111E_0%,#0E2035_62%,#111922_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="page-container">
          <div className="grid items-center gap-9 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/35 bg-white/8 px-4 py-2 text-[.66rem] font-black uppercase tracking-[.18em] text-sky-100 backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full bg-academy-gold shadow-[0_0_16px_rgba(239,184,50,.9)]" />
                Diplôme d’État · Bac+2 · RNCP 38362
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.06em] sm:text-5xl lg:text-6xl xl:text-7xl">
                Prenez les commandes <span className="text-[#FFD56A]">du commerce.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/70 sm:text-xl">
                Avec le BTS MCO, apprenez à vendre, animer une offre, piloter les résultats et manager une équipe — en magasin, dans les services ou le e-commerce.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTA href={applicationUrl} variant="gold" external>Je candidate pour 2026 →</CTA>
                <CTA href={aurelieDirectHref} variant="outline">Parler à Aurélie</CTA>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-white/75">
                <span className="rounded-full border border-white/15 bg-white/7 px-3 py-2">✓ Sans frais de scolarité pour l’apprenti*</span>
                <span className="rounded-full border border-sky-300/35 bg-sky-300/10 px-3 py-2 text-sky-100">✓ iPad offert dès la signature</span>
                <span className="rounded-full border border-academy-gold/40 bg-academy-gold/10 px-3 py-2 text-[#FFD56A]">✓ Londres en 2ᵉ année · 100 % pris en charge</span>
                <span className="rounded-full border border-white/15 bg-white/7 px-3 py-2">✓ Présentiel ou visioconférence</span>
                <span className="rounded-full border border-white/15 bg-white/7 px-3 py-2">✓ Accompagnement jusqu’au contrat</span>
              </div>
            </div>
            <HeroRoadmap />
          </div>
          <div className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Durée', '2 ans en alternance'],
              ['Alternance', '2 jours école · 3 jours entreprise'],
              ['Diplôme', 'Diplôme d’État · Bac+2'],
              ['Admission', 'Après le bac'],
            ].map(([key, value]) => (
              <div key={key} className="border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0">
                <p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p>
                <p className="mt-1 font-black text-white">{value}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[.64rem] font-semibold text-white/40">* Sous réserve de la conclusion et de la prise en charge du contrat d’alternance.</p>
        </div>
      </section>

      <nav aria-label="Sommaire du BTS MCO" className="sticky top-0 z-30 hidden border-b border-academy-line bg-[#FFFDF8]/95 px-4 py-3 backdrop-blur lg:block">
        <div className="page-container flex items-center justify-between gap-5">
          <span className="text-xs font-black">BTS MCO</span>
          <div className="flex items-center gap-5 text-xs font-extrabold text-academy-muted">
            {[
              ['Pour qui ?', '#pour-qui'],
              ['Le métier', '#metier'],
              ['Formats', '#formats'],
              ['Alternance', '#alternance'],
              ['Programme', '#programme'],
              ['Admission', '#admission'],
              ['FAQ', '#faq-mco'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-academy-ink">{label}</Link>
            ))}
          </div>
          <CTA href={applicationUrl} variant="gold" className="min-h-10 px-4 py-2" external>Je candidate</CTA>
        </div>
      </nav>

      <BtsStudentBenefits courseName="BTS MCO" />

      <Section
        id="pour-qui"
        eyebrow="01 — Un choix qui parle à toute la famille"
        title={<>Un projet motivant pour vous. Un parcours rassurant pour vos parents.</>}
        intro={<>Cette page répond aux deux vraies questions : « Est-ce que je vais aimer ? » et « Est-ce que cette école va bien m’accompagner ? »</>}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#22354C] bg-[#0D1725] p-6 text-white shadow-card sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-400/15 text-2xl text-sky-300">↗</span>
            <Eyebrow light>Pour le futur étudiant</Eyebrow>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Vous aimez convaincre, créer et relever des défis.</h3>
            <p className="mt-4 leading-7 text-white/62">Le BTS MCO transforme votre énergie en compétences : vente, digital, gestion, animation commerciale et management d’équipe.</p>
            <div className="mt-6 grid gap-3">
              {['Des missions commerciales dès la formation', 'Un quotidien vivant, humain et concret', 'Des compétences pour évoluer rapidement'].map((item) => (
                <p key={item} className="flex items-center gap-3 rounded-2xl bg-white/7 p-4 font-bold"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs">✓</span>{item}</p>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-card sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#FFF0C4] text-2xl text-yellow-700">◎</span>
            <Eyebrow>Pour les parents</Eyebrow>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Vous cherchez un diplôme solide et un cadre sérieux.</h3>
            <p className="mt-4 leading-7 text-academy-muted">Le parcours associe un diplôme national, deux années d’expérience professionnelle et le suivi d’une équipe identifiée.</p>
            <div className="mt-6 grid gap-3">
              {['Diplôme d’État de niveau 5 — RNCP 38362', 'Sans frais de scolarité pour l’apprenti*', 'Accompagnement de la candidature jusqu’au contrat'].map((item) => (
                <p key={item} className="flex items-center gap-3 rounded-2xl bg-academy-bg p-4 font-bold"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs text-white">✓</span>{item}</p>
              ))}
            </div>
            <CTA href={contactHref('Question d’un parent sur le BTS MCO')} variant="light" className="mt-6">Poser une question à Aurélie →</CTA>
          </article>
        </div>
      </Section>

      <Section
        id="metier"
        eyebrow="02 — De la relation client au management"
        title={<>Vous apprenez à faire performer une activité.</>}
        intro={<>Le BTS MCO vous apprend à comprendre les clients, développer les ventes, gérer une unité commerciale et animer une équipe.</>}
        tone="paper"
      >
        <div className="grid gap-5 lg:grid-cols-[.68fr_1.32fr]">
          <article className="rounded-[2rem] bg-[#0D1725] p-7 text-white shadow-card lg:p-9">
            <Eyebrow light>Votre montée en compétences</Eyebrow>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Une vision complète du commerce moderne.</h3>
            <p className="mt-4 leading-7 text-white/62">Vous progressez de la vente conseil au pilotage des résultats, jusqu’au management d’une équipe commerciale.</p>
            <p className="mt-12 text-7xl font-black text-academy-gold">4</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[.18em] text-white/70">grands blocs professionnels</p>
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            {careerSteps.map(([number, label, title, text, tone]) => {
              const accent = tone === 'blue' ? 'bg-sky-400' : tone === 'green' ? 'bg-emerald-400' : tone === 'coral' ? 'bg-[#FF6B55]' : 'bg-academy-gold';
              return (
                <article key={number} className="relative overflow-hidden rounded-[1.7rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft">
                  <span className={`absolute inset-x-5 top-0 h-1 rounded-full ${accent}`} />
                  <p className="mt-2 text-[.62rem] font-black uppercase tracking-[.16em] text-academy-muted">{number} · {label}</p>
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-academy-muted">{text}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['Conseiller de vente', 'Chargé de clientèle', 'Manager adjoint', 'Responsable de rayon'].map((job) => (
            <div key={job} className="rounded-2xl border border-academy-line bg-academy-bg p-4 text-center font-black">{job}</div>
          ))}
        </div>
        <MissionAnimation variant="mco" className="mt-8" />
      </Section>

      <Section
        id="formats"
        eyebrow="03 — Deux formats, le même BTS"
        title={<>Choisissez la façon d’étudier qui vous correspond vraiment.</>}
        intro={<>Le format est un choix d’organisation. L’exigence, le diplôme et l’accompagnement restent au cœur du parcours.</>}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6 shadow-card sm:p-8">
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-2 text-[.62rem] font-black uppercase tracking-[.15em] text-emerald-800 ring-1 ring-emerald-200">● Sur le campus</span>
            <h3 className="mt-6 text-3xl font-black tracking-[-.04em]">En présentiel à Puget-sur-Argens</h3>
            <p className="mt-4 leading-7 text-academy-muted">Un cadre vivant pour apprendre avec votre promotion, échanger directement avec les formateurs et profiter du campus.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Cours en groupe', 'Équipe sur place', 'Vie de promotion', 'Locaux dédiés'].map((item) => <p key={item} className="rounded-2xl bg-academy-bg p-4 text-sm font-black">✓ {item}</p>)}
            </div>
          </article>
          <article className="rounded-[2rem] border border-[#284661] bg-[#102B48] p-6 text-white shadow-card sm:p-8">
            <span className="inline-flex rounded-full bg-sky-400/15 px-3 py-2 text-[.62rem] font-black uppercase tracking-[.15em] text-sky-200 ring-1 ring-sky-300/30">◉ Classe virtuelle</span>
            <h3 className="mt-6 text-3xl font-black tracking-[-.04em]">100 % à distance en visioconférence</h3>
            <p className="mt-4 leading-7 text-white/62">De vrais cours en direct avec vos formateurs et votre promotion, depuis chez vous — pas une simple plateforme laissée en autonomie.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Cours en direct', 'Interactions en visio', 'Suivi régulier', 'Accessible partout en France'].map((item) => <p key={item} className="rounded-2xl bg-white/8 p-4 text-sm font-black">✓ {item}</p>)}
            </div>
          </article>
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-[1.7rem] border border-yellow-300 bg-yellow-50 p-5 sm:flex-row sm:items-center">
          <div><p className="text-lg font-black text-yellow-950">Même diplôme d’État. Même programme. Même équipe à vos côtés.</p><p className="mt-1 text-sm font-semibold text-yellow-900/65">Le format est validé avec l’équipe admissions selon votre situation.</p></div>
          <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-academy-ink ring-1 ring-yellow-300">BTS MCO · RNCP 38362</span>
        </div>
      </Section>

      <Section
        id="alternance"
        eyebrow="04 — L’alternance"
        title={<>Apprenez. Travaillez. Construisez déjà votre CV.</>}
        intro={<>Deux années pour obtenir un diplôme, acquérir une vraie expérience professionnelle et commencer à construire votre réseau.</>}
        tone="paper"
      >
        <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card sm:p-8">
            <Eyebrow light>Une formation qui se vit</Eyebrow>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">À l’école, vous comprenez. En entreprise, vous appliquez.</h3>
            <div className="mt-6 grid gap-3">
              {[
                ['01', 'À l’école', 'Vente, digital, gestion, marketing et management'],
                ['02', 'En entreprise', 'Clients, stocks, promotions, objectifs et travail en équipe'],
                ['03', 'À la sortie', 'Un diplôme et deux années d’expérience sur le CV'],
              ].map(([number, title, detail]) => (
                <div key={number} className="grid grid-cols-[2.4rem_1fr] items-center gap-3 rounded-2xl bg-white/7 p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[.62rem] font-black text-academy-gold">{number}</span>
                  <div><p className="font-black">{title}</p><p className="mt-1 text-xs font-semibold text-white/48">{detail}</p></div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] border border-yellow-300 bg-[#F7E5AC] p-6 shadow-card sm:p-8">
            <Eyebrow>Côté budget</Eyebrow>
            <p className="mt-5 text-7xl font-black tracking-[-.08em]">0 €*</p>
            <h3 className="mt-5 text-3xl font-black tracking-[-.04em]">de frais de scolarité pour l’apprenti.</h3>
            <p className="mt-4 leading-7 text-yellow-950/70">La formation est prise en charge dans le cadre du contrat d’alternance et de l’accord de l’entreprise avec son OPCO.</p>
            <CTA href={contactHref('Question sur le financement du BTS MCO')} variant="dark" className="mt-6">Poser ma question à Aurélie →</CTA>
            <p className="mt-4 text-[.62rem] font-semibold text-yellow-950/55">* Sous réserve de la conclusion et de la prise en charge du contrat.</p>
          </article>
        </div>
        <article className="mt-5 rounded-[2rem] border border-academy-line bg-academy-bg p-6 shadow-soft">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div><Eyebrow>Le coin des parents</Eyebrow><h3 className="mt-3 text-2xl font-black">Ce qui compte vraiment pour vous rassurer.</h3></div>
            <CTA href={aurelieDirectHref} variant="light">Appeler Aurélie →</CTA>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Diplôme officiel', 'Diplôme national de niveau 5 — RNCP 38362.'],
              ['Équipe identifiée', 'Aurélie répond aux questions du jeune et de sa famille.'],
              ['Parcours encadré', 'Un suivi pédagogique pendant les deux années.'],
              ['Expérience utile', 'Des missions valorisables dès la sortie.'],
            ].map(([title, text]) => <div key={title} className="rounded-2xl border border-academy-line bg-white p-4"><p className="font-black">{title}</p><p className="mt-2 text-xs leading-5 text-academy-muted">{text}</p></div>)}
          </div>
        </article>
      </Section>

      <Section
        id="programme"
        eyebrow="05 — Le programme et le diplôme"
        title={<>Un programme solide. Des compétences utiles dès demain.</>}
        intro={<>Des matières générales pour prendre de la hauteur et quatre blocs professionnels directement liés au commerce, à la gestion et au management.</>}
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {program.map(([number, title, text], index) => (
            <details key={number} open={index === 0} className="group rounded-[1.5rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-black ${index >= 3 ? 'bg-[#0D1725] text-academy-gold' : 'bg-academy-bg text-academy-ink'}`}>{number}</span>
                <strong className="min-w-0 flex-1">{title}</strong>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-academy-gold font-black transition group-open:rotate-45">+</span>
              </summary>
              <p className="ml-[3.25rem] mt-4 text-sm leading-6 text-academy-muted">{text}</p>
            </details>
          ))}
        </div>
        <div className="mt-7 grid gap-5 rounded-[2rem] bg-[#0D1725] p-6 text-white lg:grid-cols-[.72fr_1.28fr] lg:p-8">
          <div><Eyebrow light>Validation</Eyebrow><h3 className="mt-4 text-3xl font-black">Un diplôme national de niveau 5.</h3><p className="mt-4 leading-7 text-white/62">Le diplôme est obtenu avec une moyenne supérieure ou égale à 10/20 sur l’ensemble des épreuves nationales, dossiers professionnels et évaluations prévues par le référentiel.</p></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['01', 'Épreuves nationales', 'Selon le référentiel de l’Éducation nationale'],
              ['02', 'Dossiers professionnels', 'Travaux et situations issus du parcours'],
              ['03', 'Expérience en entreprise', 'Compétences développées en alternance'],
            ].map(([number, title, text]) => <article key={number} className="rounded-2xl border border-white/10 bg-white/7 p-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-academy-gold text-xs font-black text-academy-gold-text">{number}</span><h4 className="mt-5 font-black">{title}</h4><p className="mt-2 text-xs leading-5 text-white/50">{text}</p></article>)}
          </div>
        </div>
      </Section>

      <BtsCompleteInformation course="mco" />

      <section id="admission" className="relative isolate overflow-hidden bg-[#0A1725] px-4 py-14 text-white sm:py-16 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_12%,rgba(239,184,50,.25),transparent_27%),linear-gradient(145deg,#07111D,#112641)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="page-container">
          <Eyebrow light>06 — Admissions 2026</Eyebrow>
          <div className="mt-3 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div><h2 className="max-w-4xl text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">Votre candidature en cinq étapes. <span className="text-[#FFD56A]">Simple, claire, accompagnée.</span></h2><p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/62">Vous ne savez pas encore comment trouver une entreprise ? C’est normal. Commencez par votre candidature : notre équipe vous guide ensuite.</p></div>
            <CTA href={applicationUrl} variant="gold" external>Je candidate pour 2026 →</CTA>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {admissionSteps.map(([number, title, text]) => (
              <article key={number} className="rounded-[1.6rem] border border-white/10 bg-white/7 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-academy-gold text-xs font-black text-academy-gold-text">{number}</span>
                <h3 className="mt-7 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <article className="rounded-[2rem] bg-[#FFFDF8] p-6 text-academy-ink shadow-card">
              <Eyebrow>Après le BTS</Eyebrow>
              <h3 className="mt-3 text-3xl font-black">Des débouchés concrets</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Conseiller de vente', 'Chargé de clientèle', 'Marchandiseur', 'Manager adjoint', 'Responsable de rayon', 'Poursuite d’études'].map((job) => <span key={job} className="rounded-full border border-academy-line bg-academy-bg px-4 py-2 text-xs font-black">{job}</span>)}
              </div>
            </article>
            <article className="rounded-[2rem] bg-gradient-to-br from-[#EFB832] to-[#FFD56A] p-6 text-academy-gold-text shadow-gold">
              <Eyebrow>Votre avenir commence ici</Eyebrow>
              <h3 className="mt-3 text-3xl font-black">Prêt à révéler votre potentiel ?</h3>
              <p className="mt-4 text-sm font-semibold leading-6 opacity-70">Déposez votre candidature et échangez avec Aurélie avant toute décision définitive.</p>
              <CTA href={aurelieDirectHref} variant="dark" className="mt-5">Parler à Aurélie →</CTA>
            </article>
          </div>
        </div>
      </section>

      <div id="faq-mco">
        <PremiumFAQSection
          badge="FAQ BTS MCO"
          title="Tout comprendre avant de vous lancer"
          description="Admission, alternance, entreprise, visioconférence, coût ou diplôme : Aurélie répond aux questions du jeune comme à celles de sa famille."
          items={faq}
          contactHref={contactHref('Question sur le BTS MCO')}
          contactLabel="Écrire à Aurélie"
          callHref={aurelieDirectHref}
          callLabel="Appeler Aurélie"
        />
      </div>

      <section className="bg-[#FFFDF8] px-4 py-8">
        <div className="page-container grid gap-4 rounded-[2rem] border border-academy-line bg-academy-bg p-5 shadow-soft sm:grid-cols-3">
          <a href={`mailto:${aurelieEmail}`} className="rounded-2xl bg-white p-4 text-center transition hover:-translate-y-0.5"><p className="text-[.62rem] font-black uppercase tracking-[.15em] text-yellow-700">E-mail BTS</p><p className="mt-2 break-all font-black">{aurelieEmail}</p></a>
          <a href={aurelieDirectHref} className="rounded-2xl bg-white p-4 text-center transition hover:-translate-y-0.5"><p className="text-[.62rem] font-black uppercase tracking-[.15em] text-yellow-700">Ligne directe</p><p className="mt-2 font-black">04 87 83 06 15</p></a>
          <a href={aurelieMobileHref} className="rounded-2xl bg-white p-4 text-center transition hover:-translate-y-0.5"><p className="text-[.62rem] font-black uppercase tracking-[.15em] text-yellow-700">Portable</p><p className="mt-2 font-black">07 69 39 04 57</p></a>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <CTA href={aurelieDirectHref} variant="light" className="min-w-0 flex-1 px-3">Appeler Aurélie</CTA>
          <CTA href={applicationUrl} variant="gold" className="min-w-0 flex-[1.2] px-3" external>Je candidate</CTA>
        </div>
      </div>
    </main>
  );
}
