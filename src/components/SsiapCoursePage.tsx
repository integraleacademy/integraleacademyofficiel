import Link from 'next/link';
import type { ReactNode } from 'react';
import { PremiumFAQSection } from '@/components/ui';
import {
  ssiapOfficialReference,
  type SsiapCourseConfig,
} from '@/data/ssiap-catalogue';

const relatedCourses = [
  { label: 'SSIAP 1', role: 'Agent', href: '/formations-securite/ssiap-1' },
  { label: 'SSIAP 2', role: 'Chef d’équipe', href: '/formations-securite/ssiap-2' },
  { label: 'SSIAP 3', role: 'Chef de service', href: '/formations-securite/ssiap-3' },
  {
    label: 'Recyclage & remise à niveau',
    role: 'Maintien des acquis',
    href: '/formations-securite/recyclage-remise-a-niveau-ssiap',
  },
];

function contactHref(config: SsiapCourseConfig, subject = 'inscription') {
  return `/contact?formation=${config.slug}&objet=${encodeURIComponent(subject)}`;
}

function CTA({
  href,
  children,
  variant = 'red',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'dark' | 'red' | 'light' | 'outline';
  className?: string;
}) {
  const variants = {
    dark: 'bg-academy-ink text-white hover:bg-black',
    red: 'bg-red-600 text-white hover:bg-red-700',
    light: 'border border-academy-line bg-white text-academy-ink hover:bg-academy-bg',
    outline: 'border border-white/30 bg-white/5 text-white hover:bg-white/12',
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-300/55 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[.66rem] font-black uppercase tracking-[.24em] ${light ? 'text-red-300' : 'text-red-700'}`}>
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
  tone?: 'cream' | 'paper' | 'stone' | 'dark';
}) {
  const colors =
    tone === 'dark'
      ? 'bg-[#0D1725] text-white'
      : tone === 'paper'
        ? 'bg-[#FFFDF8] text-academy-ink'
        : tone === 'stone'
          ? 'bg-[#EFE7D9] text-academy-ink'
          : 'bg-academy-bg text-academy-ink';

  return (
    <section id={id} className={`${colors} scroll-mt-24 px-4 py-14 sm:py-16 lg:py-20`}>
      <div className="page-container">
        <div className="mb-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow light={tone === 'dark'}>{eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-4xl lg:text-5xl">{title}</h2>
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

export function SsiapCoursePage({ config }: { config: SsiapCourseConfig }) {
  const facts = [
    ['Parcours', config.label],
    ['Fonction', config.role],
    ['Durée', config.duration],
    ['Effectif', config.capacity],
    ['Campus', 'Puget-sur-Argens'],
    ['Validation', config.certification],
  ];
  const otherCourses = relatedCourses.filter((course) => !course.href.endsWith(`/${config.slug}`));
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Formation ${config.label}`,
    description: config.seo.description,
    provider: {
      '@type': 'Organization',
      name: 'Intégrale Academy',
      telephone: '04 22 47 07 68',
    },
  };

  return (
    <main className="relative overflow-hidden pb-24 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <section className="relative isolate overflow-hidden bg-[#0D1725] px-4 pb-9 pt-10 text-white sm:pt-14 lg:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(248,113,113,.25),transparent_31%),radial-gradient(circle_at_88%_20%,rgba(220,38,38,.20),transparent_29%),linear-gradient(135deg,#080D15_0%,#121B2A_55%,#2A0F12_100%)]" />
        <div className="absolute -left-20 top-16 -z-10 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="page-container">
          <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-white/55" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link><span>→</span>
            <Link href="/formations-securite/ssiap">Formations SSIAP</Link><span>→</span>
            <span className="text-red-200">{config.label}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-300/35 bg-red-400/10 px-4 py-2 text-[.68rem] font-black uppercase tracking-[.2em] text-red-200">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_16px_rgba(248,113,113,.9)]" />
                {config.label} · formation réglementée
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.055em] sm:text-5xl lg:text-6xl xl:text-7xl">{config.title}</h1>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/72 sm:text-xl">{config.intro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CTA href={contactHref(config, 'prochaines dates')} variant="red">Recevoir les prochaines dates →</CTA>
                <CTA href="tel:0422470768" variant="outline">Parler à un conseiller</CTA>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/65 bg-[#FFFDF8] p-5 text-academy-ink shadow-[0_34px_100px_rgba(0,0,0,.34)] sm:p-7">
              <span className="rounded-full bg-[#0D1725] px-3 py-1.5 text-[.62rem] font-black uppercase tracking-[.16em] text-red-300">Votre parcours</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-.04em] sm:text-4xl">{config.label}</h2>
              <p className="mt-2 text-lg font-extrabold text-red-700">{config.role}</p>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {[
                  ['Durée', config.duration],
                  ['Modalité', 'Présentiel'],
                  ['Lieu', 'Puget-sur-Argens'],
                  ['Tarif', 'Sur devis'],
                ].map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-[#E8DECE] bg-[#F5EFE4] p-3.5">
                    <p className="text-[.6rem] font-black uppercase tracking-[.16em] text-[#837968]">{key}</p>
                    <p className="mt-1 text-sm font-black sm:text-base">{value}</p>
                  </div>
                ))}
              </div>
              <CTA href={contactHref(config, 'devis')} className="mt-5 w-full">Demander un devis →</CTA>
              <p className="mt-4 text-center text-xs font-semibold leading-5 text-academy-muted">Dossier, prérequis et financement vérifiés avant toute inscription.</p>
            </aside>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/7 sm:grid-cols-2 lg:grid-cols-6">
            {facts.map(([key, value]) => (
              <div key={key} className="border-b border-white/10 p-4 last:border-b-0 sm:border-r lg:border-b-0">
                <p className="text-[.58rem] font-black uppercase tracking-[.18em] text-white/42">{key}</p>
                <p className="mt-1 font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Sommaire de la formation" className="sticky top-0 z-30 hidden border-b border-academy-line bg-[#FFFDF8]/95 px-4 py-3 backdrop-blur lg:block">
        <div className="page-container flex items-center justify-between gap-5">
          <span className="text-xs font-black">{config.label}</span>
          <div className="flex items-center gap-5 text-xs font-extrabold text-academy-muted">
            {[
              ['Missions', '#missions'],
              ['Admission', '#admission'],
              ['Programme', '#programme'],
              ['Validation', '#validation'],
              ['Dates & tarifs', '#dates-tarifs'],
              ['FAQ', '#faq-ssiap'],
            ].map(([label, href]) => <Link key={href} href={href} className="transition hover:text-academy-ink">{label}</Link>)}
          </div>
          <CTA href={contactHref(config, 'inscription')} variant="red" className="min-h-10 px-4 py-2">Je m’inscris</CTA>
        </div>
      </nav>

      <Section id="missions" eyebrow="Le parcours" title="Des compétences directement liées à votre fonction." intro={config.audience}>
        <div className="grid gap-4 lg:grid-cols-3">
          {config.missions.map((mission, index) => (
            <article key={mission.title} className={`rounded-[1.8rem] border p-6 shadow-soft ${index === 1 ? 'border-[#26384F] bg-[#0D1725] text-white' : 'border-academy-line bg-[#FFFDF8]'}`}>
              <span className={`text-5xl font-black ${index === 1 ? 'text-red-300' : 'text-red-600'}`}>0{index + 1}</span>
              <h3 className="mt-9 text-2xl font-black">{mission.title}</h3>
              <p className={`mt-3 leading-7 ${index === 1 ? 'text-white/65' : 'text-academy-muted'}`}>{mission.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="admission" eyebrow="Admission" title="Les conditions d’accès, vérifiées avant l’inscription." intro="Chaque justificatif est contrôlé pour vous orienter vers le bon parcours et sécuriser votre entrée en formation." tone="paper">
        <div className="grid gap-4 md:grid-cols-2">
          {config.prerequisites.map((item, index) => (
            <article key={item.title} className="rounded-[1.7rem] border border-academy-line bg-white p-5 shadow-soft">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-100 font-black text-red-700">{index + 1}</span>
                <div><h3 className="text-xl font-black">{item.title}</h3><p className="mt-2 leading-7 text-academy-muted">{item.text}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[1.7rem] border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center">
          <div><p className="font-black text-red-950">Vous ne savez pas si vos justificatifs sont suffisants ?</p><p className="mt-1 text-sm font-semibold leading-6 text-red-900/70">Envoyez votre dossier : l’équipe vérifie votre situation avant tout engagement.</p></div>
          <CTA href={contactHref(config, 'verification des prérequis')} variant="light">Vérifier mes prérequis</CTA>
        </div>
      </Section>

      <Section id="programme" eyebrow="Programme réglementaire" title={`${config.duration} pour maîtriser votre fonction.`} intro={config.durationDetail}>
        <div className="space-y-3">
          {config.program.map((item, index) => (
            <details key={item.title} open={index === 0} className="group rounded-[1.6rem] border border-academy-line bg-[#FFFDF8] p-5 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0D1725] font-black text-red-300">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1"><strong className="block text-lg font-black sm:text-xl">{item.title}</strong><small className="font-bold text-academy-muted">{item.duration}</small></span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-600 font-black text-white transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-5 border-t border-academy-line pt-5 leading-7 text-academy-muted sm:ml-16">{item.text}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 rounded-[1.7rem] border border-academy-line bg-[#EFE7D9] p-5">
          <p className="font-black">Référentiel officiel</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">Programme présenté conformément à l’arrêté du 2 mai 2005 modifié relatif aux services de sécurité incendie des ERP et des IGH.</p>
          <a href={ssiapOfficialReference} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex font-black text-red-700 underline decoration-red-300 underline-offset-4">Consulter le texte sur Légifrance ↗</a>
        </div>
      </Section>

      <Section id="validation" eyebrow="Validation" title="Des attendus clairs, travaillés pendant le parcours." intro="La formation alterne apports réglementaires, exercices, cas concrets et préparation aux modalités de validation." tone="dark">
        <div className="grid gap-4 lg:grid-cols-3">
          {config.assessment.map((step, index) => (
            <article key={step.title} className={`rounded-[1.8rem] border p-6 ${index === 1 ? 'border-red-300/35 bg-red-400/10' : 'border-white/10 bg-white/6'}`}>
              <span className="text-5xl font-black text-red-300">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
              <p className="mt-3 leading-7 text-white/65">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section id="dates-tarifs" className="scroll-mt-24 bg-[#EFE7D9] px-4 py-14 sm:py-16">
        <div className="page-container overflow-hidden rounded-[2.2rem] bg-[#0D1725] p-6 text-white shadow-card sm:p-9 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div>
            <Eyebrow light>Dates & tarifs</Eyebrow>
            <h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">Recevez le prochain calendrier et votre devis.</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/65">Les dates, le tarif et les possibilités de financement sont confirmés selon le parcours et votre dossier. Aucun calendrier n’est affiché tant qu’il n’est pas ouvert à l’inscription.</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-white/75"><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ {config.duration}</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ Présentiel</span><span className="rounded-full border border-white/15 bg-white/8 px-3 py-2">✓ Puget-sur-Argens</span></div>
          </div>
          <div className="mt-7 flex flex-col gap-3 lg:mt-0">
            <CTA href={contactHref(config, 'dates et tarif')} variant="red">Recevoir les dates →</CTA>
            <CTA href="tel:0422470768" variant="outline">04 22 47 07 68</CTA>
          </div>
        </div>
      </section>

      <Section eyebrow="Après la formation" title="Faites reconnaître et évoluer vos compétences." intro="Votre parcours vous prépare aux responsabilités correspondant à votre niveau SSIAP.">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[2rem] border border-academy-line bg-[#FFFDF8] p-6">
            <Eyebrow>Fonctions et perspectives</Eyebrow>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{config.outcomes.map((item) => <div key={item} className="rounded-2xl bg-academy-bg p-4 font-black">{item}</div>)}</div>
          </article>
          <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white">
            <Eyebrow light>Étape suivante</Eyebrow>
            <h3 className="mt-3 text-3xl font-black">{config.nextStep.title}</h3>
            <p className="mt-4 leading-7 text-white/65">{config.nextStep.text}</p>
            <CTA href={config.nextStep.href} variant="outline" className="mt-5">{config.nextStep.label} →</CTA>
          </article>
        </div>
        <div className="mt-8"><Eyebrow>Tout l’univers SSIAP</Eyebrow><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{otherCourses.map((course) => <Link key={course.href} href={course.href} className="group rounded-[1.4rem] border border-academy-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-red-300"><span className="text-xs font-black uppercase tracking-[.18em] text-red-700">{course.role}</span><span className="mt-2 flex items-center justify-between gap-4 text-xl font-black">{course.label}<span className="transition group-hover:translate-x-1">→</span></span></Link>)}</div></div>
      </Section>

      <div id="faq-ssiap">
        <PremiumFAQSection
          badge={`FAQ ${config.label}`}
          title={`Vos questions sur ${config.label}`}
          description="Prérequis, durée, programme, validation et maintien des acquis : les réponses essentielles avant votre inscription."
          items={config.faq}
          contactHref={contactHref(config, 'question')}
          theme="red"
        />
      </div>

      <section className="bg-academy-bg px-4 pb-20 pt-8">
        <div className="page-container overflow-hidden rounded-[2.4rem] border border-academy-line bg-[#FFFDF8] p-7 shadow-card sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-12">
          <div><Eyebrow>Votre projet SSIAP</Eyebrow><h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-.05em] sm:text-5xl">Faites vérifier votre parcours avant de vous inscrire.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-academy-muted">Cassandre vous aide à choisir le bon niveau, contrôler les justificatifs et préparer votre financement.</p></div>
          <div className="mt-7 flex shrink-0 flex-col gap-3 lg:mt-0"><CTA href={contactHref(config, 'rendez-vous avec Cassandre')}>Réserver un rendez-vous →</CTA><CTA href="tel:0422470768" variant="light">Appeler Cassandre</CTA></div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-academy-line bg-[#FFFDF8]/96 p-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,.12)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2"><CTA href="tel:0422470768" variant="light" className="min-w-0 flex-1 px-3">Appeler</CTA><CTA href={contactHref(config, 'inscription')} variant="red" className="min-w-0 flex-[1.4] px-3">Recevoir les dates</CTA></div>
      </div>
    </main>
  );
}
