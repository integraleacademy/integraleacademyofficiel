import { Button, SectionTitle } from '@/components/ui';
import { legalRefs } from '@/data/site';

export const metadata = {
  title: 'Notre école | Intégrale Academy',
  description: 'Découvrez Intégrale Academy, école de formation professionnelle fondée en 2018, son histoire, son équipe, ses domaines de formation et son cadre réglementaire.',
};

const appointmentFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const linkedInUrl = 'https://fr.linkedin.com/in/vaillantclement';

const heroBadges = ['Fondée en 2018', 'Formations réglementées', 'Accompagnement individualisé', 'Approche terrain'];
const timeline = [
  ['2018', 'Création d’Intégrale Academy'],
  ['2019-2021', 'Développement des formations en sécurité privée'],
  ['2022-2024', 'Structuration de l’école, de l’alternance et des process internes'],
  ['Aujourd’hui', 'Développement des parcours sécurité, incendie, VTC et BTS en alternance'],
] as const;
const directorTags = ['Sécurité privée', 'Formation professionnelle', 'Communication', 'Management', 'Stratégie d’image', 'Développement'];
const team = [
  { name: 'Cassandre MENARD', role: 'Responsable commerciale', initials: 'CM', text: 'Elle accompagne les candidats et les entreprises dans leurs démarches, leurs demandes d’information et leur orientation.' },
  { name: 'Aurélie CHAUSSEZ', role: 'Chargée des relations clients', initials: 'AC', text: 'Elle participe au suivi des candidats, à la relation client et à la qualité de l’expérience avant l’entrée en formation.' },
  { name: 'Yannice LIBAULT', role: 'Coordinateur pédagogique', initials: 'YL', text: 'Il contribue à la coordination pédagogique et au bon déroulement des parcours de formation.' },
];
const approachCards = [
  { title: 'Exigence', text: 'Des parcours structurés, encadrés et alignés avec les obligations des métiers préparés.' },
  { title: 'Terrain', text: 'Une pédagogie pensée à partir des réalités professionnelles, pas seulement de la théorie.' },
  { title: 'Accompagnement', text: 'Un suivi humain et administratif pour sécuriser chaque étape du parcours.' },
  { title: 'Employabilité', text: 'Une priorité donnée à l’insertion, à la reconversion, à l’alternance et à l’évolution professionnelle.' },
];
const trainingDomains = [
  { title: 'Sécurité privée', href: '/formations-securite' },
  { title: 'Sécurité incendie', href: '/formations-securite/ssiap-1' },
  { title: 'VTC', href: '/vtc' },
  { title: 'BTS en alternance', href: '/bts' },
];
const places = ['Puget-sur-Argens / Côte d’Azur', 'Paris', 'Aurillac / Centre France', 'Modalités à distance selon les parcours'];
const certifications = ['Qualiopi', 'NDA DREETS', 'UAI', 'CNAPS', 'ADEF', 'SSIAP', 'INRS', 'VTC'];

function PageSection({ id, tone = 'light', children }: { id?: string; tone?: 'light' | 'soft' | 'dark'; children: React.ReactNode }) {
  const toneClass = tone === 'dark' ? 'bg-academy-ink text-white' : tone === 'soft' ? 'bg-academy-surface/70' : '';
  return <section id={id} className={`${toneClass} scroll-mt-28 px-4 py-10 sm:py-12 md:py-14`}><div className="mx-auto max-w-6xl">{children}</div></section>;
}

function CompactCard({ title, children, dark = false }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return <article className={`reveal flex h-full flex-col rounded-[1.35rem] border p-5 shadow-soft transition hover:-translate-y-1 ${dark ? 'border-white/10 bg-white/10 text-white' : 'border-academy-line bg-white text-academy-ink'}`}>
    <h3 className="text-lg font-black">{title}</h3>
    <div className={`mt-3 text-sm leading-6 ${dark ? 'text-stone-200' : 'text-stone-600'}`}>{children}</div>
  </article>;
}

export default function Page() {
  return <>
    <section className="grid-soft gold-glow overflow-hidden px-4 py-12 sm:py-14 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <div className="reveal">
          <span className="inline-flex rounded-full bg-academy-gold/25 px-3 py-1 text-xs font-semibold text-stone-900">Notre école</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Intégrale Academy, une école née du terrain et tournée vers l’emploi</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600 md:text-lg">Fondée en 2018, Intégrale Academy accompagne les apprenants, alternants et professionnels dans des parcours de formation concrets, encadrés et orientés vers l’insertion, la reconversion et la montée en compétences.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button href="#histoire">Découvrir notre histoire</Button><Button href={appointmentFormUrl} variant="secondary">Prendre rendez-vous</Button></div>
        </div>
        <div className="reveal rounded-[2rem] border border-academy-line bg-white/90 p-4 shadow-soft backdrop-blur md:p-5">
          <div className="rounded-[1.5rem] bg-academy-ink p-5 text-white md:p-6">
            <p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold">Repères</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{heroBadges.map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black">{item}</div>)}</div>
          </div>
        </div>
      </div>
    </section>

    <PageSection id="histoire">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div className="reveal"><p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">Notre histoire</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Une école construite progressivement, à partir du terrain</h2><p className="mt-5 text-base leading-8 text-stone-600">Intégrale Academy est née d’une conviction simple : une formation professionnelle doit être claire, sérieuse, encadrée et directement utile. Depuis 2018, l’école s’est développée à partir d’une expérience concrète des métiers de la sécurité privée, de la gestion d’événements, de la communication et de l’accompagnement des parcours professionnels.</p></div>
        <ol className="reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{timeline.map(([year, text]) => <li key={year} className="relative rounded-2xl border border-academy-line bg-white p-4 shadow-soft sm:min-h-28 lg:min-h-0"><span className="text-sm font-black text-academy-gold-strong">{year}</span><p className="mt-1 text-sm font-semibold leading-6 text-stone-700">{text}</p></li>)}</ol>
      </div>
    </PageSection>

    <PageSection id="fondateur" tone="soft"><SectionTitle title="Une école portée par une vision de terrain" eyebrow="Le fondateur" />
      <article className="reveal grid gap-6 rounded-[2rem] border border-academy-gold/40 bg-white p-6 shadow-soft md:p-8 lg:grid-cols-[auto_1fr]">
        <div className="grid h-28 w-28 place-items-center rounded-[2rem] bg-academy-ink text-3xl font-black text-academy-gold shadow-gold">CV</div>
        <div><h3 className="text-2xl font-black text-academy-ink">Clément VAILLANT</h3><p className="mt-1 text-sm font-black text-academy-gold-strong">Fondateur et directeur général d’Intégrale Academy</p><p className="mt-5 text-sm leading-7 text-stone-700 md:text-base md:leading-8">Entrepreneur et dirigeant engagé dans la formation professionnelle, Clément VAILLANT a construit son parcours au croisement de la sécurité privée, de la gestion d’événements à forte affluence, de la communication et de la formation. Titulaire d’un Master 2 en communication et stratégies d’image, il associe aujourd’hui culture opérationnelle, vision stratégique et exigence pédagogique pour développer des parcours utiles aux apprenants comme aux entreprises.</p><div className="mt-5 flex flex-wrap gap-2">{directorTags.map(tag => <span key={tag} className="rounded-full bg-academy-ink px-3 py-1 text-xs font-black text-academy-gold">{tag}</span>)}</div><a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5">Voir le profil LinkedIn</a></div>
      </article>
    </PageSection>

    <PageSection><SectionTitle title="Une équipe engagée à chaque étape du parcours" eyebrow="L’équipe">Derrière chaque inscription, chaque dossier et chaque parcours, l’équipe Intégrale Academy assure un accompagnement administratif, commercial et pédagogique pour guider les candidats, les apprenants et les entreprises.</SectionTitle><div className="grid gap-4 md:grid-cols-3">{team.map(member => <CompactCard key={member.name} title={member.name}><p className="font-black text-academy-gold-strong">{member.role}</p><p className="mt-2">{member.text}</p></CompactCard>)}</div></PageSection>

    <PageSection tone="soft"><SectionTitle title="Une approche exigeante, humaine et orientée métier" eyebrow="Notre approche" /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{approachCards.map(card => <CompactCard key={card.title} title={card.title}>{card.text}</CompactCard>)}</div></PageSection>

    <PageSection tone="dark"><SectionTitle title="Nos grands domaines de formation" eyebrow="Formations">Intégrale Academy intervient sur plusieurs domaines complémentaires : sécurité privée, sécurité incendie, VTC et BTS en alternance. Chaque parcours dispose de sa page dédiée avec les objectifs, prérequis, modalités, tarifs et prochaines sessions.</SectionTitle><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{trainingDomains.map(domain => <CompactCard key={domain.title} title={domain.title} dark><Button href={domain.href} variant="secondary">Voir la page</Button></CompactCard>)}</div></PageSection>

    <PageSection><SectionTitle title="Des lieux de formation adaptés aux parcours" eyebrow="Lieux" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{places.map(place => <div key={place} className="reveal rounded-2xl border border-academy-line bg-white p-4 text-sm font-black text-academy-ink shadow-soft">{place}</div>)}</div></PageSection>

    <PageSection tone="soft"><SectionTitle title="Un cadre réglementaire clair et rassurant" eyebrow="Agréments" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{certifications.map(item => <div key={item} className="reveal rounded-2xl border border-academy-line bg-white p-4 text-center text-sm font-black text-academy-ink shadow-soft">{item}</div>)}</div><details className="reveal mt-5 rounded-[1.35rem] bg-white p-5 text-sm leading-7 text-stone-600 shadow-soft ring-1 ring-academy-line"><summary className="cursor-pointer font-black text-academy-ink">Voir les références complètes</summary><p className="mt-3">{legalRefs.join(' · ')} · ADEF CPSP 8325091511 · Agrément préfectoral VTC-26-001.</p></details></PageSection>

    <PageSection><div className="reveal rounded-[2rem] bg-academy-gold p-6 text-academy-gold-text shadow-gold md:p-10"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="text-3xl font-black md:text-5xl">Vous souhaitez intégrer Intégrale Academy&nbsp;?</h2><p className="mt-4 max-w-3xl text-base leading-8">Notre équipe vous accompagne pour choisir le bon parcours, vérifier les prérequis, étudier les financements possibles et préparer votre entrée en formation.</p></div><div className="flex flex-wrap gap-3 lg:justify-end"><Button href={appointmentFormUrl}>Prendre rendez-vous</Button><Button href="/contact" variant="ghost">Demander des informations</Button><Button href="/planning" variant="ghost">Voir le planning</Button></div></div></div></PageSection>
  </>;
}
