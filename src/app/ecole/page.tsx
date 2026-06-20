import { Button, Hero, SectionTitle } from '@/components/ui';
import { contact, legalRefs } from '@/data/site';

export const metadata = {
  title: 'Notre école | Intégrale Academy',
  description: 'Découvrez Intégrale Academy, centre de formation fondé en 2018, son histoire, son dirigeant Clément VAILLANT, son approche terrain et ses parcours orientés emploi.',
};

const appointmentFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const linkedInUrl = 'https://fr.linkedin.com/in/vaillantclement';

const heroBadges = ['Fondée en 2018', 'Approche terrain', 'Formations réglementées', 'Accompagnement individualisé'];

const approachCards = [
  { title: 'Exigence', text: 'Des parcours encadrés, structurés et alignés avec les obligations des métiers préparés.' },
  { title: 'Terrain', text: 'Une pédagogie pensée à partir des réalités professionnelles, pas uniquement de la théorie.' },
  { title: 'Accompagnement', text: 'Un suivi humain, administratif et pédagogique pour sécuriser chaque étape du parcours.' },
  { title: 'Employabilité', text: 'Une priorité donnée à la reconversion, à l’alternance, à l’insertion et à l’évolution professionnelle.' },
];

const directorTags = ['Sécurité privée', 'Formation professionnelle', 'Communication', 'Management', 'Stratégie d’image', 'Développement'];

const certifications = [
  { title: 'Qualiopi', detail: 'Certification qualité n°03169 du 21/10/2024.' },
  { title: 'NDA DREETS', detail: 'Déclaration d’activité organisme de formation n°93830600283.' },
  { title: 'UAI', detail: 'Références UAI Côte d’Azur 0831774C et Paris 0756548K.' },
  { title: 'CNAPS', detail: 'Autorisation formation sécurité privée FOR-083-2027-02-08-20200755135.' },
  { title: 'ADEF', detail: 'Agréments APS 8320032701, A3P 8320111201 et CPSP 8325091511.' },
  { title: 'SSIAP', detail: 'Référence sécurité incendie SSIAP n°8323.' },
  { title: 'INRS', detail: 'Habilitation SST INRS H34836/2020/SST-1/O/07.' },
  { title: 'VTC', detail: 'Agrément préfectoral VTC-26-001.' },
];

const qualityIndicators = [
  { title: 'Nombre d’apprenants formés', value: 'Indicateur suivi par formation' },
  { title: 'Taux de réussite', value: 'Indicateur suivi par parcours' },
  { title: 'Taux de satisfaction', value: 'Indicateur suivi auprès des apprenants' },
  { title: 'Taux d’insertion ou poursuite de parcours', value: 'Communiqué selon les formations concernées' },
];

const team = [
  { name: 'Cassandre MENARD', role: 'Responsable commerciale', initials: 'CM' },
  { name: 'Aurélie CHAUSSEZ', role: 'Chargée des relations clients', initials: 'AC' },
  { name: 'Yannice LIBAULT', role: 'Coordinateur pédagogique · Azzera Academy', initials: 'YL' },
];

function PremiumCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="reveal rounded-[1.75rem] border border-academy-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-academy-gold/70">
    <h3 className="text-lg font-black text-academy-ink">{title}</h3>
    <div className="mt-4 text-sm leading-7 text-stone-600">{children}</div>
  </article>;
}

function DirectorCard({ compact = false }: { compact?: boolean }) {
  return <article className={`reveal overflow-hidden rounded-[2.25rem] border border-academy-gold/40 bg-gradient-to-br from-white via-academy-surface to-academy-gold/10 p-6 shadow-soft ${compact ? '' : 'md:p-10'}`}>
    <div className={`grid gap-7 ${compact ? '' : 'lg:grid-cols-[auto_1fr] lg:items-start'}`}>
      <div className="mx-auto grid h-28 w-28 shrink-0 place-items-center rounded-[2rem] bg-gradient-to-br from-academy-ink to-stone-800 text-3xl font-black text-academy-gold shadow-gold ring-4 ring-academy-gold/20 lg:mx-0">CV</div>
      <div>
        <p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">Direction</p>
        <h3 className="mt-3 text-3xl font-black text-academy-ink">Clément VAILLANT</h3>
        <p className="mt-2 text-sm font-black text-academy-gold-strong">Fondateur et directeur général d’Intégrale Academy</p>
        <div className="mt-6 space-y-4 text-sm leading-7 text-stone-700 md:text-base md:leading-8">
          <p>Entrepreneur et dirigeant engagé dans la formation professionnelle et le développement des compétences, Clément VAILLANT a construit son parcours à partir du terrain, au croisement de la sécurité privée, de la gestion de dispositifs à forte affluence, de la communication et de la formation.</p>
          {!compact && <>
            <p>Très tôt impliqué dans l’organisation de manifestations sportives et culturelles d’envergure, il a évolué de fonctions opérationnelles vers des rôles de coordination, de supervision puis de direction, en pilotant des équipes, des flux, des périmètres de sécurité et des projets complexes dans des environnements exigeants et réglementés.</p>
            <p>Titulaire d’un Master 2 en communication et stratégies d’image, il combine aujourd’hui vision stratégique, culture opérationnelle et approche pragmatique de la formation, du management et du développement.</p>
          </>}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{directorTags.map(tag => <span key={tag} className="rounded-full bg-academy-ink px-3 py-1 text-xs font-black text-academy-gold">{tag}</span>)}</div>
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5 hover:brightness-95">Voir le profil LinkedIn</a>
      </div>
    </div>
  </article>;
}

function TeamGrid() {
  return <div className="grid gap-4 md:grid-cols-3">{team.map(member => <article key={member.name} className="reveal rounded-[1.5rem] border border-academy-line bg-white p-5 shadow-soft"><div className="flex items-center gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-academy-ink font-black text-academy-gold">{member.initials}</div><div><h4 className="font-black text-academy-ink">{member.name}</h4><p className="text-sm font-semibold leading-6 text-stone-600">{member.role}</p></div></div></article>)}</div>;
}

export default function Page() {
  return <>
    <Hero
      badge="Notre école"
      title="Intégrale Academy, une école fondée sur le terrain, l’exigence et l’accompagnement"
      subtitle="Depuis 2018, Intégrale Academy accompagne les apprenants, alternants et professionnels dans des parcours de formation concrets, encadrés et orientés vers l’emploi."
      actions={<><Button href="#histoire">Découvrir notre histoire</Button><Button href="#direction" variant="secondary">Rencontrer la direction</Button><Button href={appointmentFormUrl} variant="ghost">Prendre rendez-vous</Button></>}
      visual={<div className="reveal rounded-[2rem] border border-academy-line bg-white/90 p-5 shadow-soft backdrop-blur"><div className="rounded-[1.5rem] bg-academy-ink p-6 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold">Repères</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{heroBadges.map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black">{item}</div>)}</div></div></div>}
    />

    <section id="histoire" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-center">
        <div className="reveal"><p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">Notre histoire</p><h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Une école fondée en 2018, née du terrain</h2><div className="mt-6 space-y-5 text-base leading-8 text-stone-600"><p>Fondée en 2018, Intégrale Academy est née d’une volonté claire : proposer des formations professionnelles sérieuses, encadrées et réellement utiles. L’école s’est construite à partir d’une expérience terrain dans la sécurité privée, la gestion de dispositifs à forte affluence, la communication et la formation professionnelle.</p><p>Depuis sa création, Intégrale Academy développe des parcours pensés pour l’emploi, la reconversion et la montée en compétences, avec une attention particulière portée à l’accompagnement humain, à la conformité réglementaire et aux besoins concrets des entreprises.</p></div></div>
        <blockquote className="reveal rounded-[2rem] bg-academy-ink p-8 text-2xl font-black leading-tight text-white shadow-soft"><span className="text-academy-gold">“</span>Former, ce n’est pas seulement transmettre un programme. C’est préparer une personne à exercer un métier, à comprendre un cadre professionnel et à construire son avenir.<span className="text-academy-gold">”</span></blockquote>
      </div>
    </section>

    <section id="direction" className="bg-academy-surface/70 px-4 py-16 scroll-mt-28"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Direction" title="Une direction issue du terrain" /> <DirectorCard /></div></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle eyebrow="Équipe" title="Équipe administrative, commerciale et pédagogique">Aux côtés de la direction, l’équipe sécurise chaque étape du parcours : information, relation client, suivi administratif et coordination pédagogique.</SectionTitle><TeamGrid /></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle eyebrow="Approche pédagogique" title="Une approche exigeante, humaine et orientée emploi">Intégrale Academy défend une vision de la formation à la fois sérieuse, humaine et opérationnelle. Chaque parcours doit être clair, encadré et utile, avec un accompagnement adapté aux candidats, aux alternants, aux professionnels en reconversion et aux entreprises.</SectionTitle><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{approachCards.map(card => <PremiumCard key={card.title} title={card.title}><p>{card.text}</p></PremiumCard>)}</div></section>

    <section className="bg-academy-ink px-4 py-16 text-white"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Parcours" title="Nos grands domaines de formation">Sur cette page, nous rappelons uniquement les grands domaines portés par l’école : sécurité privée, sécurité incendie, VTC et BTS en alternance. Le détail des parcours est présenté sur les pages formations dédiées.</SectionTitle><div className="flex flex-wrap justify-center gap-3"><Button href="/formations-securite" variant="secondary">Formations sécurité</Button><Button href="/bts" variant="ghost">BTS en alternance</Button><Button href="/vtc" variant="ghost">Formation VTC</Button></div></div></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle eyebrow="Centres" title="Nos lieux de formation">Intégrale Academy s’appuie sur plusieurs lieux de formation et modalités pédagogiques afin de proposer des parcours adaptés aux besoins des apprenants et aux spécificités des formations.</SectionTitle><div className="grid gap-5 md:grid-cols-3">{contact.locations.map(location => <PremiumCard key={location.name} title={location.name}><p className="font-semibold text-academy-ink">{location.address}</p><p className="mt-3">{location.detail}</p><Button href="/contact" variant="ghost">Nous contacter</Button></PremiumCard>)}</div><div className="mt-5 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-stone-600 shadow-soft ring-1 ring-academy-line"><b className="text-academy-ink">BTS à distance : </b>certaines modalités peuvent être proposées à distance selon les parcours, les prérequis et l’organisation validée avec l’équipe admissions.</div></section>

    <section id="agrements" className="bg-academy-surface/70 px-4 py-16"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Agréments & certifications" title="Un cadre réglementaire lisible et rassurant">Les agréments et certifications sont conservés dans une présentation compacte afin d’identifier rapidement le cadre qualité, administratif et réglementaire de l’école.</SectionTitle><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{certifications.map(item => <PremiumCard key={item.title} title={item.title}><p>{item.detail}</p></PremiumCard>)}</div><details className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-stone-600 shadow-soft ring-1 ring-academy-line"><summary className="cursor-pointer font-black text-academy-ink">Références complètes</summary><p className="mt-3">{legalRefs.join(' · ')} · ADEF CPSP 8325091511.</p></details></div></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><div className="rounded-[2rem] bg-academy-ink p-6 text-white shadow-soft md:p-10"><div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><div><span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-academy-gold">Indicateurs qualité</span><h2 className="mt-5 text-3xl font-black md:text-5xl">Suivi qualité par formation</h2><p className="mt-4 text-sm leading-7 text-stone-200 md:text-base">Les indicateurs qualité sont suivis par formation et mis à jour selon les données consolidées par l’équipe administrative.</p></div><div className="grid gap-3 sm:grid-cols-2">{qualityIndicators.map(item => <div key={item.title} className="rounded-2xl border border-white/10 bg-white/10 p-4"><h3 className="font-black text-academy-gold">{item.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-stone-100">{item.value}</p></div>)}</div></div></div></section>


    <section className="mx-auto max-w-7xl px-4 py-16"><div className="reveal rounded-[2rem] bg-academy-gold p-8 text-academy-gold-text shadow-gold md:p-12"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="text-3xl font-black md:text-5xl">Une école à taille humaine, avec une ambition forte</h2><p className="mt-4 max-w-3xl text-base leading-8">Intégrale Academy continue de se développer avec une ambition claire : proposer des parcours sérieux, lisibles et utiles, accompagner les apprenants avec exigence et humanité, et construire des passerelles concrètes vers l’emploi, la reconversion et la réussite professionnelle.</p></div><div className="flex flex-wrap gap-3 lg:justify-end"><Button href={appointmentFormUrl}>Prendre rendez-vous</Button><Button href="/contact" variant="ghost">Nous contacter</Button><Button href="/formations-securite" variant="ghost">Voir les formations</Button></div></div></div></section>
  </>;
}
