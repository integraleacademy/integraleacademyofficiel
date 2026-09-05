import Link from 'next/link';
import { PremiumFAQSection } from '@/components/ui';
import { ssiapOfficialReference } from '@/data/ssiap-catalogue';

export const metadata = {
  title: 'Formations SSIAP – Sécurité incendie | Intégrale Academy',
  description:
    'Découvrez toutes les formations SSIAP : SSIAP 1, SSIAP 2, SSIAP 3, recyclages et remises à niveau à Puget-sur-Argens.',
};

const courses = [
  {
    number: '01',
    label: 'SSIAP 1',
    role: 'Agent de sécurité incendie',
    duration: '67 heures',
    capacity: '12 stagiaires maximum',
    description:
      'Prévenez les risques, réalisez les rondes, exploitez le poste de sécurité et intervenez face à un début d’incendie.',
    href: '/formations-securite/ssiap-1',
    cta: 'Découvrir le SSIAP 1',
  },
  {
    number: '02',
    label: 'SSIAP 2',
    role: 'Chef d’équipe de sécurité incendie',
    duration: '70 heures',
    capacity: '12 stagiaires maximum',
    description:
      'Encadrez les agents SSIAP 1, animez la formation de l’équipe et dirigez le PC sécurité en situation de crise.',
    href: '/formations-securite/ssiap-2',
    cta: 'Découvrir le SSIAP 2',
  },
  {
    number: '03',
    label: 'SSIAP 3',
    role: 'Chef de service de sécurité incendie',
    duration: '216 heures',
    capacity: '10 stagiaires maximum',
    description:
      'Conseillez le chef d’établissement, pilotez le service, la réglementation, les risques, les travaux et le budget.',
    href: '/formations-securite/ssiap-3',
    cta: 'Découvrir le SSIAP 3',
  },
  {
    number: '04',
    label: 'Recyclages & remises à niveau',
    role: 'SSIAP 1, SSIAP 2 et SSIAP 3',
    duration: '14 à 35 heures',
    capacity: '15 stagiaires maximum',
    description:
      'Maintenez ou réactivez votre qualification avec le parcours réglementaire adapté à votre niveau et à votre activité.',
    href: '/formations-securite/recyclage-remise-a-niveau-ssiap',
    cta: 'Choisir mon maintien des acquis',
  },
];

const steps = [
  ['Je débute', 'SSIAP 1', 'Je veux devenir agent de sécurité incendie.', '/formations-securite/ssiap-1'],
  ['Je veux encadrer', 'SSIAP 2', 'Je suis SSIAP 1 expérimenté et je vise la fonction de chef d’équipe.', '/formations-securite/ssiap-2'],
  ['Je veux diriger', 'SSIAP 3', 'Je souhaite piloter un service et conseiller un chef d’établissement.', '/formations-securite/ssiap-3'],
  ['Je suis déjà diplômé', 'Maintien des acquis', 'Je dois recycler ou remettre à niveau ma qualification.', '/formations-securite/recyclage-remise-a-niveau-ssiap'],
];

const faq = [
  {
    q: 'Que signifie SSIAP ?',
    a: 'SSIAP signifie Service de sécurité incendie et d’assistance à personnes. Les trois niveaux correspondent aux fonctions d’agent, de chef d’équipe et de chef de service.',
  },
  {
    q: 'Quelle différence entre SSIAP 1, SSIAP 2 et SSIAP 3 ?',
    a: 'Le SSIAP 1 prépare au métier d’agent, le SSIAP 2 à l’encadrement d’une équipe et le SSIAP 3 à la direction complète d’un service de sécurité incendie.',
  },
  {
    q: 'Les formations se déroulent-elles à distance ?',
    a: 'Les parcours SSIAP présentés sont organisés en présentiel, avec des exercices, manipulations et mises en situation réglementaires.',
  },
  {
    q: 'Le secourisme doit-il être à jour ?',
    a: 'Oui. Les conditions exactes dépendent du parcours, mais une qualification de secourisme valide est exigée pour les formations et le maintien des connaissances SSIAP.',
  },
  {
    q: 'À quelle fréquence faut-il recycler son diplôme ?',
    a: 'Le maintien des connaissances SSIAP est triennal. Le secourisme doit également rester à jour.',
  },
  {
    q: 'Comment savoir si je dois faire un recyclage ou une remise à niveau ?',
    a: 'L’équipe vérifie la date du diplôme, la dernière attestation et l’activité exercée. Si les conditions du recyclage ne sont pas remplies, une remise à niveau peut être nécessaire.',
  },
];

export default function SsiapCataloguePage() {
  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Formations SSIAP Intégrale Academy',
            itemListElement: courses.map((course, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: course.label,
              url: course.href,
            })),
          }),
        }}
      />

      <section className="relative isolate overflow-hidden bg-[#0D1725] px-4 py-14 text-white sm:py-18 lg:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(248,113,113,.26),transparent_31%),radial-gradient(circle_at_88%_25%,rgba(220,38,38,.22),transparent_28%),linear-gradient(135deg,#080D15_0%,#121B2A_55%,#2A0F12_100%)]" />
        <div className="page-container">
          <nav className="mb-7 flex items-center gap-2 text-xs font-bold text-white/55" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link><span>→</span><Link href="/formations-securite">Formations sécurité</Link><span>→</span><span className="text-red-200">SSIAP</span>
          </nav>
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-300/35 bg-red-400/10 px-4 py-2 text-[.68rem] font-black uppercase tracking-[.2em] text-red-200"><span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_16px_rgba(248,113,113,.9)]" />Sécurité incendie</span>
              <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-7xl">Toutes nos formations <span className="text-red-300">SSIAP.</span></h1>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-white/70 sm:text-xl">SSIAP 1, SSIAP 2, SSIAP 3, recyclages et remise à niveau : choisissez le parcours correspondant à votre fonction et à votre expérience.</p>
            </div>
            <aside className="rounded-[2rem] border border-white/10 bg-white/7 p-6 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[.2em] text-red-300">Centre agréé</p>
              <p className="mt-3 text-3xl font-black">SSIAP n°8323</p>
              <p className="mt-3 leading-7 text-white/60">Formations en présentiel à Puget-sur-Argens, avec vérification des prérequis avant l’inscription.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href="#parcours" className="inline-flex min-h-12 items-center justify-center rounded-full bg-red-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300/55">Choisir ma formation →</Link><Link href="/contact?formation=ssiap" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 py-3 text-center text-sm font-black text-white">Parler à un conseiller</Link></div>
            </aside>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{[['3 niveaux', 'Agent · chef d’équipe · chef de service'], ['67 à 216 h', 'Formations initiales'], ['14 à 35 h', 'Maintien des acquis'], ['Puget-sur-Argens', 'Campus Côte d’Azur']].map(([value, label]) => <div key={value} className="bg-[#0D1725]/75 p-5"><p className="text-xl font-black text-red-300">{value}</p><p className="mt-1 text-xs font-semibold text-white/50">{label}</p></div>)}</div>
        </div>
      </section>

      <section id="parcours" className="scroll-mt-24 bg-academy-bg px-4 py-14 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-black uppercase tracking-[.24em] text-red-700">Nos parcours</p><h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl">Une page dédiée à chaque besoin SSIAP.</h2><p className="mt-4 text-lg leading-8 text-academy-muted">Comparez la fonction visée, la durée et les conditions d’accès avant de consulter le programme complet.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">{courses.map((course, index) => <article key={course.href} className={`group flex h-full flex-col rounded-[2rem] border p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card sm:p-8 ${index === 2 ? 'border-[#26384F] bg-[#0D1725] text-white' : 'border-academy-line bg-[#FFFDF8] text-academy-ink'}`}><div className="flex items-start justify-between gap-5"><span className={`text-6xl font-black ${index === 2 ? 'text-red-300' : 'text-red-500'}`}>{course.number}</span><span className={`rounded-full px-3 py-1.5 text-xs font-black ${index === 2 ? 'bg-white/10 text-red-200' : 'bg-red-50 text-red-800'}`}>{course.duration}</span></div><p className={`mt-8 text-xs font-black uppercase tracking-[.2em] ${index === 2 ? 'text-red-300' : 'text-red-700'}`}>{course.role}</p><h3 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">{course.label}</h3><p className={`mt-4 flex-1 leading-7 ${index === 2 ? 'text-white/65' : 'text-academy-muted'}`}>{course.description}</p><div className={`mt-6 border-t pt-5 ${index === 2 ? 'border-white/10' : 'border-academy-line'}`}><p className={`text-xs font-bold ${index === 2 ? 'text-white/50' : 'text-academy-muted'}`}>{course.capacity}</p><Link href={course.href} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-red-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300/55">{course.cta} <span className="ml-2 transition group-hover:translate-x-1">→</span></Link></div></article>)}</div>
        </div>
      </section>

      <section className="bg-[#FFFDF8] px-4 py-14 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-xs font-black uppercase tracking-[.24em] text-red-700">Quel SSIAP choisir ?</p><h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">Partez de votre situation actuelle.</h2><p className="mt-4 leading-7 text-academy-muted">Le niveau ne se choisit pas seulement selon l’objectif : les diplômes, l’expérience et le secourisme conditionnent l’accès.</p></div><div className="grid gap-3 sm:grid-cols-2">{steps.map(([profile, course, text, href], index) => <Link key={href} href={href} className="group rounded-[1.6rem] border border-academy-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-red-300"><span className="text-xs font-black uppercase tracking-[.16em] text-red-700">0{index + 1} · {profile}</span><h3 className="mt-3 text-2xl font-black">{course}</h3><p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p><span className="mt-4 inline-flex font-black text-red-700">Voir le parcours <span className="ml-2 transition group-hover:translate-x-1">→</span></span></Link>)}</div></div>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-[#EFE7D9] p-6 sm:p-8 lg:flex-row lg:items-center"><div><h3 className="text-2xl font-black">Un doute sur votre éligibilité ?</h3><p className="mt-2 max-w-3xl leading-7 text-academy-muted">Envoyez vos diplômes, attestations de secourisme et justificatifs d’activité. Nous vous orientons vers le bon niveau ou le bon maintien des acquis.</p></div><Link href="/contact?formation=ssiap&objet=orientation" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300/55">Faire vérifier mon parcours →</Link></div>
        </div>
      </section>

      <section className="bg-[#0D1725] px-4 py-14 text-white sm:py-16">
        <div className="page-container grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[.24em] text-red-300">Cadre réglementaire</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Des programmes conformes au référentiel SSIAP.</h2><p className="mt-4 max-w-3xl leading-7 text-white/65">Les durées, prérequis, programmes et modalités de maintien des connaissances présentés sur ces pages reposent sur l’arrêté du 2 mai 2005 modifié.</p></div><a href={ssiapOfficialReference} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-red-300/40 bg-red-400/10 px-6 py-3 text-center text-sm font-black text-red-200">Consulter Légifrance ↗</a></div>
      </section>

      <PremiumFAQSection theme="red" badge="FAQ SSIAP" title="Comprendre les parcours SSIAP" description="Niveaux, prérequis, durée, recyclage et remise à niveau : les repères essentiels pour choisir sans vous tromper." items={faq} contactHref="/contact?formation=ssiap&objet=question" />

      <section className="bg-academy-bg px-4 pb-20 pt-8"><div className="page-container rounded-[2.4rem] border border-academy-line bg-[#FFFDF8] p-7 shadow-card sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-12"><div><p className="text-xs font-black uppercase tracking-[.24em] text-red-700">Votre projet</p><h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-.05em] sm:text-5xl">Choisissez votre parcours SSIAP avec un conseiller.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-academy-muted">Nous vérifions le niveau, les prérequis, les dates et les solutions de financement adaptées.</p></div><div className="mt-7 flex shrink-0 flex-col gap-3 lg:mt-0"><Link href="/contact?formation=ssiap&objet=rendez-vous" className="inline-flex min-h-12 items-center justify-center rounded-full bg-red-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300/55">Réserver un rendez-vous →</Link><a href="tel:0422470768" className="inline-flex min-h-12 items-center justify-center rounded-full border border-red-200 bg-white px-6 py-3 text-center text-sm font-black text-red-700 transition hover:border-red-400">04 22 47 07 68</a></div></div></section>
    </main>
  );
}
