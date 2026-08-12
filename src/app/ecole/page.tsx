import Link from 'next/link';
import type { ReactNode } from 'react';
import { contact, legalRefs } from '@/data/site';

export const metadata = {
  title: 'Notre école | Intégrale Academy',
  description: 'Découvrez Intégrale Academy : une école fondée en 2018, une équipe engagée, un campus de 400 m² et des formations professionnelles encadrées et reconnues.',
};

const appointmentFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const linkedInUrl = 'https://fr.linkedin.com/in/vaillantclement';

type IconName = 'arrow' | 'award' | 'book' | 'building' | 'check' | 'location' | 'people' | 'shield' | 'sparkles' | 'target';

const proofStats = [
  { value: 'Depuis 2018', label: 'une expérience construite dans la durée' },
  { value: '400 m²', label: 'dédiés aux enseignements à Puget-sur-Argens' },
  { value: '4 salles', label: 'pour les cours théoriques et pratiques' },
  { value: '3 implantations', label: 'Côte d’Azur, Paris et Centre France' },
];

const storySteps = [
  {
    marker: '2018',
    title: 'Création d’Intégrale Academy',
    text: 'L’école naît d’une volonté simple : proposer des formations professionnelles sérieuses, encadrées et réellement utiles pour exercer un métier.',
  },
  {
    marker: 'Développement',
    title: 'Des parcours construits à partir du terrain',
    text: 'Sécurité privée, sécurité incendie, direction, VTC et alternance : l’offre s’est développée autour des besoins des candidats et des entreprises.',
  },
  {
    marker: 'Aujourd’hui',
    title: 'Une école structurée et multi-parcours',
    text: 'Une direction, une équipe administrative et commerciale, une coordination pédagogique et des formateurs experts travaillent autour de chaque apprenant.',
  },
];

const team = [
  {
    name: 'Cassandre MENARD',
    role: 'Responsable commerciale',
    initials: 'CM',
    mission: 'Elle échange avec les candidats, clarifie leur projet et les accompagne vers la formation et le financement adaptés.',
    tags: ['Orientation', 'Admissions', 'Financement'],
  },
  {
    name: 'Aurélie CHAUSSEZ',
    role: 'Chargée des relations clients',
    initials: 'AC',
    mission: 'Elle assure le lien avec les apprenants et les entreprises et veille à la bonne circulation des informations tout au long du parcours.',
    tags: ['Relation client', 'Entreprises', 'Suivi'],
  },
  {
    name: 'Elsa DUQUESNE',
    role: 'Assistante de direction',
    initials: 'ED',
    mission: 'Elle contribue à l’organisation administrative de l’école et accompagne la direction dans le suivi quotidien des activités.',
    tags: ['Organisation', 'Administration', 'Direction'],
  },
  {
    name: 'Yannice LIBAULT',
    role: 'Coordinateur pédagogique · Azzera Academy',
    initials: 'YL',
    mission: 'Il participe à la coordination pédagogique, au suivi des parcours et à l’articulation entre programmes, intervenants et apprenants.',
    tags: ['Pédagogie', 'Coordination', 'Qualité'],
  },
];

const approach = [
  { number: '01', title: 'Des professionnels issus du terrain', text: 'Les contenus sont reliés aux réalités des métiers, aux situations concrètes et aux exigences des secteurs préparés.', icon: 'target' as IconName },
  { number: '02', title: 'Un cadre réellement structuré', text: 'Programmes, conformité, évaluations et suivi administratif sont organisés pour sécuriser chaque parcours.', icon: 'shield' as IconName },
  { number: '03', title: 'Une équipe accessible', text: 'Le candidat sait à qui s’adresser avant, pendant et après la formation. Chaque étape a un interlocuteur identifié.', icon: 'people' as IconName },
  { number: '04', title: 'Une formation orientée métier', text: 'L’objectif n’est pas seulement de suivre un programme, mais de se préparer à exercer, évoluer ou recruter.', icon: 'book' as IconName },
];

const trainingDomains = [
  { number: '01', title: 'Sécurité privée', text: 'APS, A3P / APR et direction d’entreprise de sécurité privée.', href: '/formations-securite' },
  { number: '02', title: 'Sécurité incendie', text: 'SSIAP 1 et compétences complémentaires liées à la prévention.', href: '/formations-securite' },
  { number: '03', title: 'Chauffeur VTC', text: 'Préparation complète au métier, à l’examen et au lancement d’activité.', href: '/vtc' },
  { number: '04', title: 'BTS en alternance', text: 'Des diplômes d’État préparés avec une expérience concrète en entreprise.', href: '/bts' },
];

const certifications = [
  { title: 'Qualiopi', detail: 'Certification qualité n°03169 du 21/10/2024.', featured: true },
  { title: 'NDA DREETS', detail: 'Déclaration d’activité n°93830600283.' },
  { title: 'CFA · UAI', detail: 'Côte d’Azur 0831774C · Paris 0756548K.' },
  { title: 'CNAPS', detail: 'Autorisation FOR-083-2027-02-08-20200755135.' },
  { title: 'ADEF', detail: 'Agréments APS 8320032701 · A3P 8320111201 · CPSP 8325091511.' },
  { title: 'SSIAP', detail: 'Référence sécurité incendie n°8323.' },
  { title: 'INRS · SST', detail: 'Habilitation H34836/2020/SST-1/O/07.' },
  { title: 'VTC', detail: 'Agrément préfectoral VTC-26-001.' },
];

function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  };

  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  if (name === 'award') return <svg {...common}><circle cx="12" cy="8" r="5" /><path d="m8.5 12-1.5 9 5-3 5 3-1.5-9" /></svg>;
  if (name === 'book') return <svg {...common}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5A3.5 3.5 0 0 1 20 23V5.5Z" /></svg>;
  if (name === 'building') return <svg {...common}><path d="M4 21V5l8-3 8 3v16M8 8h1M8 12h1M8 16h1M15 8h1M15 12h1M15 16h1M10 21v-3h4v3" /></svg>;
  if (name === 'check') return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === 'location') return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === 'people') return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (name === 'shield') return <svg {...common}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-5" /></svg>;
  if (name === 'target') return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>;
  return <svg {...common}><path d="m12 3 1.4 4.1L18 8.5l-4.6 1.4L12 14l-1.4-4.1L6 8.5l4.6-1.4L12 3ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" /></svg>;
}

function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: ReactNode; children?: ReactNode; light?: boolean }) {
  return (
    <div className="max-w-4xl">
      <p className={'text-[10px] font-black uppercase tracking-[.22em] ' + (light ? 'text-academy-gold' : 'text-academy-gold-strong')}>{eyebrow}</p>
      <h2 className={'mt-4 text-3xl font-black tracking-[-.035em] sm:text-4xl lg:text-5xl ' + (light ? 'text-white' : 'text-academy-ink dark:text-white')}>{title}</h2>
      {children ? <div className={'mt-5 max-w-3xl text-base font-semibold leading-8 ' + (light ? 'text-white/62' : 'text-academy-muted')}>{children}</div> : null}
    </div>
  );
}

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={'group inline-flex items-center gap-2 text-sm font-black transition ' + (light ? 'text-white' : 'text-academy-ink dark:text-white')}>
      {children}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-hover:translate-x-1">
        <Icon name="arrow" className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#101a29] px-4 py-14 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_12%,rgba(234,183,53,.20),transparent_30%),radial-gradient(circle_at_92%_84%,rgba(234,183,53,.10),transparent_26%),linear-gradient(135deg,#101a29_0%,#111d30_58%,#162339_100%)]" />
        <div className="absolute -left-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full border border-academy-gold/15 bg-academy-gold/[.035]" />
        <div className="absolute -right-48 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-academy-gold/[.07]" />

        <div className="page-container grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-academy-gold/35 bg-academy-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">
              <Icon name="building" className="h-4 w-4" />
              Notre école · fondée en 2018
            </span>
            <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-[-.045em] sm:text-5xl lg:text-[4.35rem] lg:leading-[1.02]">
              Une école construite sur <span className="text-academy-gold">l’expérience.</span><br />Portée par une équipe.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              Depuis 2018, Intégrale Academy prépare apprenants, alternants et professionnels à des métiers concrets, dans un cadre exigeant, réglementé et profondément humain.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#equipe" className="inline-flex items-center justify-center gap-2 rounded-full bg-academy-gold px-6 py-4 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
                Découvrir notre équipe
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a href="#campus" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                Visiter notre campus
                <Icon name="location" className="h-4 w-4 text-academy-gold" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Certifié Qualiopi', 'Autorisation CNAPS', 'CFA · UAI', 'Agréments métiers'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.055] px-3 py-2 text-[10px] font-black text-white/72">
                  <Icon name="check" className="h-3.5 w-3.5 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal relative rounded-[2.1rem] border border-white/14 bg-white/[.055] p-5 shadow-[0_35px_110px_rgba(0,0,0,.30)] backdrop-blur-xl sm:p-7">
            <div className="absolute -right-8 -top-8 grid h-20 w-20 place-items-center rounded-full border border-academy-gold/30 bg-[#101a29] text-academy-gold shadow-gold">
              <Icon name="people" className="h-8 w-8" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">Une organisation complète</p>
            <h2 className="mt-4 max-w-md text-2xl font-black tracking-tight sm:text-3xl">Des personnes identifiées à chaque étape de votre parcours.</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                ['01', 'Direction', 'Vision, exigence et développement'],
                ['02', 'Admissions', 'Projet, orientation et financement'],
                ['03', 'Administration', 'Dossiers et suivi du parcours'],
                ['04', 'Pédagogie', 'Programmes, formateurs et évaluations'],
              ].map(([number, title, detail]) => (
                <div key={number} className="rounded-[1.25rem] border border-white/10 bg-white/[.055] p-4">
                  <span className="text-[10px] font-black text-academy-gold">{number}</span>
                  <p className="mt-3 text-sm font-black">{title}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-white/45">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-bold text-white/55">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,.7)]" />
              Une équipe disponible avant, pendant et après la formation
            </p>
          </div>
        </div>

        <div className="page-container mt-12 grid grid-cols-2 gap-5 border-t border-white/10 pt-7 lg:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.value}>
              <p className="text-xl font-black text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-2 max-w-[15rem] text-[10px] font-bold leading-5 text-white/44">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="histoire" className="page-container py-16 sm:py-20">
        <SectionHeading eyebrow="Notre histoire" title={<>Une expérience construite <span className="text-academy-gold-strong">dans la durée.</span></>}>
          Intégrale Academy ne s’est pas construite autour d’un catalogue. L’école s’est développée à partir du terrain, des métiers réglementés et des besoins réels des entreprises et des candidats.
        </SectionHeading>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {storySteps.map((step, index) => (
            <article key={step.marker} className="group relative min-h-[20rem] overflow-hidden rounded-[1.8rem] border border-academy-line/70 bg-academy-surface p-6 shadow-[0_18px_55px_rgba(54,40,20,.07)] transition hover:-translate-y-1 hover:border-academy-gold sm:p-7">
              <span className="absolute right-5 top-2 text-[5rem] font-black leading-none text-academy-gold/[.10]">0{index + 1}</span>
              <div className="relative flex h-full flex-col">
                <span className="w-fit rounded-full bg-[#101a29] px-4 py-2 text-[10px] font-black uppercase tracking-[.14em] text-academy-gold">{step.marker}</span>
                <h3 className="mt-8 max-w-sm text-2xl font-black tracking-tight text-academy-ink dark:text-white">{step.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-academy-muted">{step.text}</p>
                <span className="mt-auto block h-1 w-12 rounded-full bg-academy-gold transition-all group-hover:w-24" />
              </div>
            </article>
          ))}
        </div>

        <blockquote className="mt-6 grid gap-5 rounded-[1.8rem] bg-[#101a29] p-6 text-white shadow-[0_24px_80px_rgba(16,26,41,.17)] sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-academy-gold text-3xl font-black text-academy-gold-text">“</span>
          <p className="max-w-5xl text-xl font-black leading-relaxed sm:text-2xl">Former, c’est préparer une personne à exercer un métier, à comprendre son environnement professionnel et à construire la suite de son parcours.</p>
        </blockquote>
      </section>

      <section className="bg-[#101a29] px-4 py-16 text-white sm:py-20">
        <div className="page-container grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-stretch">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_25%_18%,rgba(234,183,53,.22),transparent_28%),linear-gradient(145deg,#1a2739,#0b1421)] p-7 shadow-[0_30px_90px_rgba(0,0,0,.22)] sm:p-9">
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-academy-gold/20 bg-academy-gold/[.06]" />
            <div className="relative flex h-full flex-col">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold">Fondateur & directeur général</p>
              <div className="mt-10 grid h-36 w-36 place-items-center rounded-[2rem] border border-academy-gold/35 bg-academy-gold text-4xl font-black text-academy-gold-text shadow-gold">
                CV
              </div>
              <h2 className="mt-8 text-3xl font-black tracking-tight sm:text-4xl">Clément VAILLANT</h2>
              <p className="mt-2 text-sm font-bold text-academy-gold">Une direction issue du terrain</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {['Sécurité privée', 'Management', 'Communication', 'Formation'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/12 bg-white/[.055] px-3 py-2 text-[10px] font-black text-white/65">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <article className="rounded-[2rem] bg-[#f7f1e7] p-6 text-[#171a20] shadow-[0_30px_90px_rgba(0,0,0,.18)] dark:bg-academy-surface dark:text-white sm:p-9 lg:p-11">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#956b0e] dark:text-academy-gold">La direction</p>
            <h3 className="mt-4 max-w-3xl text-3xl font-black tracking-[-.035em] sm:text-4xl">Une vision stratégique nourrie par l’expérience opérationnelle.</h3>
            <div className="mt-7 space-y-5 text-sm font-semibold leading-8 text-[#5e625f] dark:text-academy-muted sm:text-base">
              <p>Entrepreneur engagé dans la formation professionnelle et le développement des compétences, Clément VAILLANT a construit son parcours au croisement de la sécurité privée, de la gestion d’équipes, de la communication et de la formation.</p>
              <p>Son expérience s’est développée dans des environnements exigeants et réglementés, de fonctions opérationnelles à la coordination puis à la direction de projets et d’équipes.</p>
              <p>Titulaire d’un Master 2 en communication et stratégies d’image, il associe aujourd’hui culture terrain, pilotage d’entreprise et recherche constante d’amélioration dans les parcours proposés par Intégrale Academy.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ['Vision', 'Faire évoluer l’école sans perdre l’exigence ni la proximité.'],
                ['Responsabilité', 'Maintenir un cadre conforme, clair et utile pour chaque public.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-[#ddd1bd] bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-black text-[#956b0e] dark:text-academy-gold">{title}</p>
                  <p className="mt-2 text-xs font-semibold leading-6 text-[#5e625f] dark:text-academy-muted">{text}</p>
                </div>
              ))}
            </div>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#101a29] px-5 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5">
              Voir le parcours sur LinkedIn
              <Icon name="arrow" className="h-4 w-4 text-academy-gold" />
            </a>
          </article>
        </div>
      </section>

      <section id="equipe" className="page-container scroll-mt-24 py-16 sm:py-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Notre équipe" title={<>Une responsabilité claire <span className="text-academy-gold-strong">à chaque étape.</span></>}>
            Information, financement, administration, relation entreprise et coordination pédagogique : vous savez toujours qui intervient et pourquoi.
          </SectionHeading>
          <a href={appointmentFormUrl} className="inline-flex w-fit items-center gap-2 rounded-full bg-academy-gold px-5 py-3.5 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">
            Échanger avec l’équipe
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {team.map((member, index) => (
            <article key={member.name} className="group relative overflow-hidden rounded-[1.8rem] border border-academy-line/70 bg-academy-surface p-6 shadow-[0_18px_55px_rgba(54,40,20,.07)] transition hover:-translate-y-1 hover:border-academy-gold sm:p-7">
              <span className="absolute -right-3 -top-6 text-[7rem] font-black leading-none text-academy-gold/[.07]">{member.initials}</span>
              <div className="relative flex items-start gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#101a29] text-base font-black text-academy-gold shadow-[0_12px_30px_rgba(16,26,41,.14)]">{member.initials}</div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.15em] text-academy-gold-strong">Équipe · 0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-black tracking-tight text-academy-ink dark:text-white">{member.name}</h3>
                  <p className="mt-1 text-xs font-black text-academy-gold-strong">{member.role}</p>
                </div>
              </div>
              <p className="relative mt-6 text-sm font-semibold leading-7 text-academy-muted">{member.mission}</p>
              <div className="relative mt-6 flex flex-wrap gap-2 border-t border-academy-line/60 pt-5 dark:border-white/10">
                {member.tags.map((tag) => <span key={tag} className="rounded-full bg-academy-soft px-3 py-1.5 text-[9px] font-black uppercase tracking-[.08em] text-academy-ink dark:bg-white/10 dark:text-white">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 rounded-[1.8rem] bg-academy-gold p-6 text-academy-gold-text shadow-gold sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#101a29] text-academy-gold"><Icon name="people" className="h-7 w-7" /></span>
          <div>
            <h3 className="text-xl font-black sm:text-2xl">Et toute une équipe pédagogique mobilisée selon les parcours.</h3>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-academy-gold-text/70">Formateurs, évaluateurs et professionnels issus du terrain interviennent selon leur expertise et les exigences propres à chaque formation.</p>
          </div>
          <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#101a29] px-5 py-3.5 text-sm font-black text-white">Nous contacter <Icon name="arrow" className="h-4 w-4 text-academy-gold" /></Link>
        </div>
      </section>

      <section className="border-y border-academy-line/70 bg-academy-soft/55 py-16 sm:py-20">
        <div className="page-container">
          <SectionHeading eyebrow="Notre méthode" title={<>Du sérieux dans le cadre. <span className="text-academy-gold-strong">De l’humain dans le suivi.</span></>}>
            Notre pédagogie ne repose pas sur une formule unique : elle combine exigences réglementaires, pratique, accompagnement et préparation à l’emploi.
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {approach.map((item) => (
              <article key={item.number} className="group flex min-h-[19rem] flex-col rounded-[1.6rem] border border-academy-line/70 bg-academy-surface p-5 shadow-[0_16px_45px_rgba(54,40,20,.06)] transition hover:-translate-y-1 hover:border-academy-gold sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#101a29] text-academy-gold"><Icon name={item.icon} className="h-5 w-5" /></span>
                  <span className="text-2xl font-black text-academy-gold/45">{item.number}</span>
                </div>
                <h3 className="mt-7 text-xl font-black tracking-tight text-academy-ink dark:text-white">{item.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-academy-muted">{item.text}</p>
                <span className="mt-auto block h-1 w-12 rounded-full bg-academy-gold transition-all group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container py-16 sm:py-20">
        <SectionHeading eyebrow="Nos domaines" title="Une expertise sur plusieurs voies professionnelles.">
          Formations réglementées, reconversion, création d’activité ou alternance : chaque pôle dispose de ses propres parcours et de son accompagnement.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {trainingDomains.map((domain) => (
            <Link key={domain.number} href={domain.href} className="group flex min-h-[16rem] flex-col rounded-[1.8rem] bg-[#101a29] p-6 text-white shadow-[0_20px_60px_rgba(16,26,41,.14)] transition hover:-translate-y-1 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[.18em] text-academy-gold">Pôle {domain.number}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[.06] text-academy-gold transition group-hover:translate-x-1"><Icon name="arrow" className="h-4 w-4" /></span>
              </div>
              <h3 className="mt-9 text-2xl font-black tracking-tight sm:text-3xl">{domain.title}</h3>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-white/52">{domain.text}</p>
              <span className="mt-auto border-t border-white/10 pt-5 text-xs font-black text-white/75">Découvrir les formations</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="campus" className="relative overflow-hidden bg-[#101a29] px-4 py-16 text-white sm:py-20">
        <div className="absolute -right-48 top-12 h-[32rem] w-[32rem] rounded-full bg-academy-gold/[.07]" />
        <div className="page-container relative">
          <SectionHeading eyebrow="Notre campus" title={<>Un environnement conçu pour <span className="text-academy-gold">apprendre et pratiquer.</span></>} light>
            À Puget-sur-Argens, le campus principal réunit les espaces nécessaires aux enseignements théoriques, numériques et pratiques, dans un lieu facile d’accès.
          </SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div className="rounded-[2rem] bg-[#f7f1e7] p-5 text-[#171a20] shadow-[0_30px_90px_rgba(0,0,0,.20)] sm:p-7">
              <div className="flex items-center justify-between border-b border-[#ddd1bd] pb-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.15em] text-[#956b0e]">Campus principal</p>
                  <h3 className="mt-2 text-2xl font-black">Puget-sur-Argens</h3>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#101a29] text-academy-gold"><Icon name="building" className="h-6 w-6" /></span>
              </div>
              <div className="mt-5 grid min-h-[26rem] grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="col-span-2 flex flex-col justify-between rounded-[1.35rem] bg-[#101a29] p-5 text-white sm:col-span-2">
                  <span className="text-[10px] font-black uppercase tracking-[.12em] text-academy-gold">Espace formation</span>
                  <span><span className="block text-4xl font-black">4</span><span className="mt-1 block text-sm font-bold text-white/55">salles de cours</span></span>
                </div>
                <div className="flex flex-col justify-between rounded-[1.35rem] border border-[#ddd1bd] bg-white/70 p-4">
                  <Icon name="book" className="h-6 w-6 text-[#956b0e]" />
                  <span className="text-sm font-black">Salle informatique Mac / PC</span>
                </div>
                <div className="flex flex-col justify-between rounded-[1.35rem] border border-[#ddd1bd] bg-white/70 p-4">
                  <Icon name="target" className="h-6 w-6 text-[#956b0e]" />
                  <span className="text-sm font-black">Espaces de mise en situation</span>
                </div>
                <div className="flex flex-col justify-between rounded-[1.35rem] border border-[#ddd1bd] bg-white/70 p-4">
                  <Icon name="people" className="h-6 w-6 text-[#956b0e]" />
                  <span className="text-sm font-black">Espace détente</span>
                </div>
                <div className="flex flex-col justify-between rounded-[1.35rem] bg-academy-gold p-4 text-academy-gold-text">
                  <span className="text-3xl font-black">400</span>
                  <span className="text-sm font-black">m² dédiés à la formation</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[.055] p-6 backdrop-blur">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-academy-gold">Accès & confort</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {['À 500 m de l’autoroute A8', 'Stationnement gratuit', 'Bus ligne 4 à proximité', 'Espaces théoriques et pratiques'].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.045] p-4 text-sm font-bold leading-6 text-white/68">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-academy-gold text-academy-gold-text"><Icon name="check" className="h-3.5 w-3.5" /></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.8rem] border border-academy-gold/30 bg-academy-gold/10 p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-academy-gold text-academy-gold-text"><Icon name="location" className="h-6 w-6" /></span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.14em] text-academy-gold">Adresse</p>
                    <p className="mt-3 text-base font-black leading-7">54 chemin du Carreou<br />83480 Puget-sur-Argens</p>
                  </div>
                </div>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white">Organiser une visite <Icon name="arrow" className="h-4 w-4 text-academy-gold" /></Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {contact.locations.map((location, index) => (
              <article key={location.name} className="rounded-[1.6rem] border border-white/10 bg-white/[.055] p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-academy-gold">0{index + 1}</span>
                  <Icon name="location" className="h-5 w-5 text-academy-gold" />
                </div>
                <h3 className="mt-5 text-lg font-black">{location.name}</h3>
                <p className="mt-3 text-xs font-bold leading-6 text-white/48">{location.address}</p>
                <p className="mt-3 text-xs font-semibold leading-6 text-white/58">{location.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agrements" className="page-container py-16 sm:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Agréments & certifications" title={<>Des références précises. <span className="text-academy-gold-strong">Un cadre vérifiable.</span></>}>
            Notre sérieux repose sur des autorisations, certifications et habilitations clairement identifiées, adaptées aux activités et formations proposées.
          </SectionHeading>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-academy-line bg-academy-surface px-4 py-3 text-xs font-black text-academy-ink dark:text-white">
            <Icon name="award" className="h-4 w-4 text-academy-gold-strong" />
            Références à jour
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((item, index) => (
            <article key={item.title} className={'group min-h-[13rem] rounded-[1.55rem] border p-5 transition hover:-translate-y-1 ' + (item.featured ? 'border-academy-gold bg-academy-gold text-academy-gold-text shadow-gold' : 'border-academy-line/70 bg-academy-surface shadow-[0_14px_40px_rgba(54,40,20,.06)] hover:border-academy-gold')}>
              <div className="flex items-center justify-between">
                <span className={'grid h-10 w-10 place-items-center rounded-xl ' + (item.featured ? 'bg-[#101a29] text-academy-gold' : 'bg-[#101a29] text-academy-gold')}><Icon name={item.featured ? 'award' : 'shield'} className="h-5 w-5" /></span>
                <span className={'text-[10px] font-black ' + (item.featured ? 'text-academy-gold-text/50' : 'text-academy-gold-strong')}>0{index + 1}</span>
              </div>
              <h3 className={'mt-6 text-lg font-black ' + (item.featured ? '' : 'text-academy-ink dark:text-white')}>{item.title}</h3>
              <p className={'mt-3 text-xs font-semibold leading-6 ' + (item.featured ? 'text-academy-gold-text/70' : 'text-academy-muted')}>{item.detail}</p>
            </article>
          ))}
        </div>

        <details className="mt-5 rounded-[1.5rem] border border-academy-line/70 bg-academy-surface p-5 text-sm shadow-[0_14px_40px_rgba(54,40,20,.05)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-academy-ink dark:text-white">
            Consulter toutes les références administratives
            <span className="grid h-8 w-8 place-items-center rounded-full bg-academy-gold text-academy-gold-text">+</span>
          </summary>
          <p className="mt-4 border-t border-academy-line/60 pt-4 font-semibold leading-7 text-academy-muted">{legalRefs.join(' · ')} · ADEF CPSP 8325091511.</p>
        </details>
      </section>

      <section className="px-4 pb-16 sm:pb-20">
        <div className="page-container relative overflow-hidden rounded-[2.2rem] bg-academy-gold p-7 text-academy-gold-text shadow-gold sm:p-10 lg:p-12">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-black/10 bg-white/15" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-academy-gold-text/55">Venez nous rencontrer</p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-.035em] sm:text-4xl lg:text-5xl">Découvrez l’école, échangez avec l’équipe et parlons de votre projet.</h2>
              <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-academy-gold-text/70 sm:text-base">Nous vous aidons à comprendre les parcours, les prérequis, les financements et les prochaines étapes avant toute inscription.</p>
            </div>
            <div className="flex flex-col gap-3 lg:min-w-[17rem]">
              <a href={appointmentFormUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#101a29] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5">Prendre rendez-vous <Icon name="arrow" className="h-4 w-4 text-academy-gold" /></a>
              <a href="tel:0422470768" className="inline-flex items-center justify-center rounded-full border border-academy-gold-text/20 bg-white/35 px-6 py-4 text-sm font-black">Appeler le {contact.phone}</a>
              <Link href="/planning" className="text-center text-xs font-black underline decoration-academy-gold-text/30 underline-offset-4">Voir les prochaines sessions</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
