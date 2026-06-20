import Link from 'next/link';
import { Button, Hero, LocationCard, SectionTitle, StatCard } from '@/components/ui';
import { contact, legalRefs } from '@/data/site';

export const metadata = {
  title: 'Notre école | Intégrale Academy',
  description: 'Découvrez Intégrale Academy, centre de formation fondé en 2018, spécialisé en sécurité privée, sécurité incendie, VTC et BTS en alternance, avec une approche terrain, humaine et orientée emploi.',
};

const appointmentFormUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';

const trustItems = ['Fondée en 2018', 'Formations réglementées', 'Accompagnement individualisé', 'Parcours orientés emploi'];

const fieldCards = [
  { title: 'Expérience terrain', text: 'Une vision issue des réalités opérationnelles, des exigences métier et des environnements réglementés.' },
  { title: 'Encadrement', text: 'Des formations structurées, suivies et organisées avec rigueur.' },
  { title: 'Professionnalisation', text: 'Des parcours conçus pour préparer à l’emploi, à la reconversion ou à l’évolution professionnelle.' },
  { title: 'Accompagnement humain', text: 'Un suivi individualisé pour aider chaque apprenant à avancer avec méthode et confiance.' },
];

const timeline = [
  { year: '2018', title: 'Fondation d’Intégrale Academy', text: 'Création d’un centre de formation avec une vision exigeante, humaine et orientée métier.' },
  { year: 'Développement', title: 'Sécurité privée et formations réglementées', text: 'Structuration de parcours dans les métiers de la sécurité, avec une attention forte portée à la conformité, au sérieux pédagogique et à la préparation professionnelle.' },
  { year: 'Ouverture', title: 'Nouvelles formations', text: 'Développement progressif de nouvelles offres : sécurité incendie, VTC, BTS en alternance et formations à distance.' },
  { year: 'Aujourd’hui', title: 'Une école structurée', text: 'Intégrale Academy accompagne des apprenants, alternants et professionnels avec des équipes identifiées, des centres mobilisables et des parcours adaptés aux besoins du marché.' },
  { year: 'Demain', title: 'Une vision durable', text: 'Continuer à développer une école exigeante, humaine et connectée aux réalités des entreprises.' },
];

const pillars = [
  { title: 'Exigence', text: 'Des parcours structurés, des règles claires et une préparation sérieuse aux métiers visés.' },
  { title: 'Terrain', text: 'Des contenus pensés à partir des réalités professionnelles, pas uniquement à partir de la théorie.' },
  { title: 'Accompagnement', text: 'Un suivi administratif, commercial et pédagogique pour sécuriser chaque étape du parcours.' },
  { title: 'Employabilité', text: 'Une orientation forte vers l’insertion professionnelle, la reconversion et la réussite durable.' },
];

const formationCards = [
  { title: 'Agent de Prévention et de Sécurité — APS', text: 'Se former aux fondamentaux de la sécurité privée et accéder à un métier réglementé.', href: '/formations-securite/aps' },
  { title: 'Agent de Protection Physique des Personnes — A3P', text: 'Développer des compétences spécialisées dans la protection rapprochée et la sécurité des personnes.', href: '/formations-securite/a3p-apr' },
  { title: 'Dirigeant d’Entreprise de Sécurité Privée — DESP', text: 'Préparer les futurs dirigeants aux exigences de gestion, de réglementation et de pilotage d’une entreprise de sécurité privée.', href: '/formations-securite/desp' },
  { title: 'SSIAP 1', text: 'Se former à la sécurité incendie et à l’assistance à personnes au sein des établissements recevant du public et immeubles de grande hauteur.', href: '/formations-securite/ssiap-1' },
  { title: 'Chauffeur VTC', text: 'Préparer l’examen VTC et l’exercice du métier de conducteur professionnel.', href: '/vtc' },
  { title: 'BTS en alternance', text: 'Suivre un parcours diplômant et professionnalisant, en lien avec l’entreprise et l’emploi.', href: '/bts' },
];

const steps = [
  { title: 'Orientation', text: 'Identifier la formation adaptée au projet professionnel.' },
  { title: 'Admission', text: 'Vérifier les prérequis, le dossier et les possibilités de financement.' },
  { title: 'Formation', text: 'Suivre un parcours encadré, structuré et professionnalisant.' },
  { title: 'Suivi', text: 'Bénéficier d’un accompagnement administratif et pédagogique.' },
  { title: 'Projet professionnel', text: 'Favoriser l’insertion, l’alternance, la reconversion ou l’évolution.' },
];

const values = [
  { title: 'Sérieux', text: 'Parce que les métiers préparés exigent rigueur, respect du cadre et professionnalisme.' },
  { title: 'Humanité', text: 'Parce que chaque apprenant arrive avec son parcours, ses contraintes et ses objectifs.' },
  { title: 'Clarté', text: 'Parce qu’un bon accompagnement commence par des informations simples, transparentes et compréhensibles.' },
  { title: 'Engagement', text: 'Parce que la réussite nécessite implication, suivi et exigence.' },
  { title: 'Utilité', text: 'Parce qu’une formation doit avoir un impact concret sur l’avenir professionnel.' },
];

const certifications = [
  { title: 'Qualiopi', detail: 'Certification qualité n°03169 du 21/10/2024 pour rassurer candidats, financeurs et entreprises.' },
  { title: 'NDA DREETS', detail: 'Déclaration d’activité organisme de formation n°93830600283.' },
  { title: 'UAI', detail: 'Références UAI Côte d’Azur 0831774C et Paris 0756548K pour les parcours BTS.' },
  { title: 'CNAPS', detail: 'Autorisation formation sécurité privée FOR-083-2027-02-08-20200755135.' },
  { title: 'ADEF', detail: 'Agréments APS 8320032701, A3P 8320111201 et CPSP 8325091511.' },
  { title: 'SSIAP / INRS / VTC', detail: 'SSIAP n°8323, habilitation SST INRS et agrément préfectoral VTC-26-001.' },
];

const indicators = [
  { value: '2018', label: 'Fondation d’Intégrale Academy.' },
  { value: '400 m²', label: 'Campus Côte d’Azur dédié aux enseignements pratiques et théoriques.' },
  { value: '3', label: 'Implantations : Puget-sur-Argens, Paris et Aurillac.' },
  { value: '10+', label: 'Références, agréments et certifications affichés pour vos dossiers.' },
];

const qualityItems = [
  'Nombre d’élèves formés : indicateur consolidé et mis à jour par l’équipe administrative.',
  'Taux de réussite : suivi par parcours afin de distinguer BTS, sécurité privée, SSIAP, SST et VTC.',
  'Taux de satisfaction : recueilli auprès des apprenants pour améliorer l’accompagnement.',
  'Taux d’insertion ou poursuite de parcours : communiqué selon les formations concernées.',
];

const team = [
  { name: 'Clément VAILLANT', role: 'Directeur général', initials: 'CV', mission: 'Pilote la vision, la conformité et le développement des parcours.' },
  { name: 'Cassandre MENARD', role: 'Responsable commerciale', initials: 'CM', mission: 'Accompagne les candidats dans le choix de formation et les premières démarches.' },
  { name: 'Aurélie CHAUSSEZ', role: 'Chargée des relations clients', initials: 'AC', mission: 'Fluidifie la relation client, le suivi et les informations utiles au parcours.' },
  { name: 'Yannice LIBAULT', role: 'Coordinateur pédagogique · Azzera Academy', initials: 'YL', mission: 'Coordonne les repères pédagogiques et l’organisation des apprentissages.' },
];

function PremiumCard({ title, children, index }: { title: string; children: React.ReactNode; index?: number }) {
  return <article className="reveal rounded-[1.75rem] border border-academy-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-academy-gold/70">
    <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-academy-ink text-sm font-black text-academy-gold">{index ? String(index).padStart(2, '0') : '✦'}</span><h3 className="text-lg font-black">{title}</h3></div>
    <div className="mt-4 text-sm leading-7 text-stone-600">{children}</div>
  </article>;
}

function CertificationCard({ title, detail }: { title: string; detail: string }) {
  return <PremiumCard title={title}><p>{detail}</p></PremiumCard>;
}

function TeamCard({ name, role, initials, mission }: { name: string; role: string; initials: string; mission: string }) {
  return <article className="reveal rounded-[2rem] border border-academy-line bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:border-academy-gold/70">
    <div className="mx-auto grid h-24 w-24 place-items-center rounded-[1.7rem] bg-gradient-to-br from-academy-ink to-stone-800 text-2xl font-black text-academy-gold shadow-gold ring-4 ring-academy-gold/20">{initials}</div>
    <h3 className="mt-5 text-xl font-black">{name}</h3>
    <p className="mt-2 text-sm font-black text-academy-gold-strong">{role}</p>
    <p className="mt-4 text-sm leading-7 text-stone-600">{mission}</p>
  </article>;
}

export default function Page() {
  return <>
    <Hero
      badge="Notre école"
      title="Intégrale Academy, une école fondée sur l’exigence, le terrain et l’accompagnement"
      subtitle="Depuis 2018, Intégrale Academy accompagne les apprenants, les alternants et les professionnels dans des parcours de formation concrets, encadrés et orientés vers l’emploi. Née d’une expérience terrain dans la sécurité privée, la gestion de dispositifs à forte affluence, la communication et la formation professionnelle, l’école s’est construite autour d’une conviction simple : une formation réussie doit être sérieuse, humaine, structurée et connectée aux réalités du marché."
      actions={<><Button href="/formations-securite">Découvrir nos formations</Button><Button href={appointmentFormUrl} variant="secondary">Prendre rendez-vous</Button><Button href="/contact" variant="ghost">Nous contacter</Button></>}
      visual={<div className="reveal rounded-[2rem] border border-academy-line bg-white/90 p-5 shadow-soft backdrop-blur"><div className="rounded-[1.5rem] bg-academy-ink p-6 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold">Bloc de confiance</p><div className="mt-5 grid gap-3">{trustItems.map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-black">{item}</div>)}</div></div></div>}
    />

    <section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-4 md:grid-cols-4">{indicators.map(item => <StatCard key={item.value} {...item} />)}</div></section>

    <section className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle eyebrow="ADN" title="Une école née du terrain">Intégrale Academy est issue d’un parcours construit sur le terrain, au croisement de la sécurité privée, de l’organisation d’événements à forte affluence, de la coordination d’équipes, de la communication et de la formation professionnelle. Cette expérience opérationnelle façonne des parcours concrets, exigeants, encadrés et pensés pour les attentes des entreprises.</SectionTitle>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{fieldCards.map(card => <PremiumCard key={card.title} title={card.title}><p>{card.text}</p></PremiumCard>)}</div>
    </section>

    <section className="bg-academy-surface/70 px-4 py-16">
      <div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Notre histoire" title="Depuis 2018, une ambition claire">Fondée en 2018, Intégrale Academy est née avec une ambition : proposer des formations professionnelles sérieuses, lisibles et réellement utiles. Au fil des années, l’école s’est développée autour de la sécurité privée, la sécurité incendie, le VTC et les BTS en alternance.</SectionTitle>
      <div className="relative grid gap-5 lg:grid-cols-5">{timeline.map((item, index) => <PremiumCard key={item.title} title={item.title} index={index + 1}><p className="mb-2 font-black text-academy-gold-strong">{item.year}</p><p>{item.text}</p></PremiumCard>)}</div></div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center"><div className="reveal"><SectionTitle eyebrow="Vision" title="Former, accompagner, professionnaliser">Pour Intégrale Academy, former ne signifie pas simplement transmettre un programme. Former, c’est préparer une personne à exercer un métier, à comprendre un environnement professionnel, à respecter un cadre réglementaire et à trouver sa place durablement.</SectionTitle><blockquote className="rounded-[2rem] bg-academy-ink p-7 text-2xl font-black leading-tight text-white shadow-soft"><span className="text-academy-gold">“</span>Une bonne formation doit être exigeante, encadrée, humaine et utile.<span className="text-academy-gold">”</span></blockquote></div><div className="grid gap-5 sm:grid-cols-2">{pillars.map(card => <PremiumCard key={card.title} title={card.title}><p>{card.text}</p></PremiumCard>)}</div></div>
    </section>

    <section id="formations" className="bg-academy-ink px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Nos formations" title="Des parcours pensés pour l’avenir professionnel">Intégrale Academy propose des formations adaptées aux besoins des apprenants, des entreprises et du marché de l’emploi.</SectionTitle><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{formationCards.map(card => <article key={card.title} className="reveal rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-academy-gold/70"><h3 className="text-xl font-black">{card.title}</h3><p className="mt-4 text-sm leading-7 text-stone-200">{card.text}</p><Link href={card.href} className="mt-6 inline-flex rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">Découvrir</Link></article>)}</div></div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle eyebrow="Accompagnement" title="Un accompagnement à chaque étape">Intégrale Academy accompagne les candidats avant, pendant et après leur entrée en formation : choix de la formation, prérequis, financement, inscription, suivi administratif, préparation et accompagnement.</SectionTitle><div className="grid gap-5 md:grid-cols-5">{steps.map((step, index) => <PremiumCard key={step.title} title={step.title} index={index + 1}><p>{step.text}</p></PremiumCard>)}</div></section>

    <section className="bg-academy-surface/70 px-4 py-16"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Valeurs" title="Nos valeurs" /><div className="grid gap-5 md:grid-cols-5">{values.map(value => <PremiumCard key={value.title} title={value.title}><p>{value.text}</p></PremiumCard>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><div className="reveal overflow-hidden rounded-[2rem] bg-gradient-to-br from-academy-ink via-stone-900 to-black p-8 text-white shadow-soft md:p-12"><div className="max-w-4xl"><p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold">Direction</p><h2 className="mt-4 text-3xl font-black md:text-5xl">Une vision portée par l’expérience</h2><p className="mt-6 text-base leading-8 text-stone-200">Intégrale Academy est dirigée avec une approche à la fois opérationnelle, stratégique et humaine. Son fondateur a construit son parcours à partir du terrain, dans la sécurité privée, la gestion de dispositifs à forte affluence, la communication et la formation.</p><p className="mt-4 text-base leading-8 text-stone-200">Titulaire d’un Master 2 en communication et stratégies d’image, il développe une vision de l’école fondée sur la qualité de l’accompagnement, la lisibilité des parcours, l’image professionnelle, la conformité réglementaire et l’adaptation aux besoins réels du marché.</p></div></div></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle eyebrow="Centres & modalités" title="Des lieux de formation identifiés">Intégrale Academy s’appuie sur plusieurs lieux de formation et modalités pédagogiques afin de proposer des parcours adaptés aux besoins des apprenants et aux spécificités des formations.</SectionTitle><div className="grid gap-5 md:grid-cols-3">{contact.locations.map(location => <LocationCard key={location.name} {...location} />)}</div><div className="mt-5 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-stone-600 shadow-soft ring-1 ring-academy-line"><b className="text-academy-ink">BTS à distance : </b>certaines modalités peuvent être proposées à distance selon les parcours, les prérequis et l’organisation validée avec l’équipe admissions.</div></section>

    <section id="agrements" className="bg-academy-surface/70 px-4 py-16"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Agréments, certifications & qualité" title="Des références visibles et centralisées">Dans des secteurs réglementés comme la sécurité privée, la sécurité incendie, le VTC ou l’alternance, la lisibilité des références, agréments et certifications est essentielle. Intégrale Academy centralise ces informations pour faciliter les démarches des candidats, entreprises et financeurs.</SectionTitle><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{certifications.map(item => <CertificationCard key={item.title} {...item} />)}</div><div className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-stone-600 shadow-soft ring-1 ring-academy-line"><b className="text-academy-ink">Références complètes : </b>{legalRefs.join(' · ')} · ADEF CPSP 8325091511.</div></div></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><div className="overflow-hidden rounded-[2rem] bg-academy-ink p-6 text-white shadow-soft md:p-10"><div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-academy-gold">Indicateurs qualité</span><h2 className="mt-5 text-3xl font-black md:text-5xl">Réussite, satisfaction et élèves formés</h2><p className="mt-4 text-sm leading-7 text-stone-200 md:text-base">La page reste prête pour publier les chiffres officiels par année et par formation dès validation interne, sans inventer de statistiques.</p></div><div className="grid gap-3">{qualityItems.map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-stone-100">{item}</div>)}</div></div></div></section>

    <section id="equipe" className="mx-auto max-w-7xl px-4 py-16"><SectionTitle eyebrow="Notre équipe" title="Des interlocuteurs identifiés à chaque étape">Direction, admissions, relation client et pédagogie travaillent ensemble pour fluidifier votre parcours.</SectionTitle><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{team.map(member => <TeamCard key={member.name} {...member} />)}</div></section>

    <section className="mx-auto max-w-7xl px-4 py-16"><div className="reveal rounded-[2rem] bg-academy-gold p-8 text-academy-gold-text shadow-gold md:p-12"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="text-3xl font-black md:text-5xl">Vous souhaitez rejoindre Intégrale Academy ?</h2><p className="mt-4 max-w-3xl text-base leading-8">Que vous soyez candidat, alternant, professionnel en reconversion ou entreprise partenaire, notre équipe vous accompagne pour identifier le parcours le plus adapté.</p></div><div className="flex flex-wrap gap-3 lg:justify-end"><Button href="/formations-securite">Découvrir les formations</Button><Button href="/planning" variant="ghost">Voir le planning</Button><Button href={appointmentFormUrl} variant="ghost">Prendre rendez-vous</Button><Button href="/contact" variant="ghost">Nous contacter</Button></div></div></div></section>
  </>;
}
