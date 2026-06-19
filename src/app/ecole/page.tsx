import { Button, Hero, LocationCard, SectionTitle, StatCard } from '@/components/ui';
import { contact, legalRefs } from '@/data/site';

export const metadata = {
  title: 'Notre école',
  description: 'Découvrez Intégrale Academy : campus, agréments, certifications, indicateurs qualité, équipe pédagogique et accès.',
};

const certifications = [
  { title: 'Qualiopi', detail: 'Certification qualité n°03169 du 21/10/2024 pour rassurer candidats, financeurs et entreprises.' },
  { title: 'NDA DREETS', detail: 'Déclaration d’activité organisme de formation n°93830600283.' },
  { title: 'UAI', detail: 'Références UAI Côte d’Azur 0831774C et Paris 0756548K pour les parcours BTS.' },
  { title: 'CNAPS', detail: 'Autorisation formation sécurité privée FOR-083-2027-02-08-20200755135.' },
  { title: 'ADEF', detail: 'Agréments APS 8320032701, A3P 8320111201 et CPSP 8325091511.' },
  { title: 'SSIAP / INRS / VTC', detail: 'SSIAP n°8323, habilitation SST INRS et agrément préfectoral VTC-26-001.' },
];

const indicators = [
  { value: '400 m²', label: 'Campus Côte d’Azur dédié aux enseignements pratiques et théoriques.' },
  { value: '3', label: 'Implantations : Puget-sur-Argens, Paris et Aurillac.' },
  { value: '10+', label: 'Références, agréments et certifications affichés pour vos dossiers.' },
  { value: '2024', label: 'Dernière référence Qualiopi indiquée sur nos documents qualité.' },
];

const qualityItems = [
  'Nombre d’élèves formés : indicateur consolidé et mis à jour par l’équipe administrative.',
  'Taux de réussite : suivi par parcours afin de distinguer BTS, sécurité privée, SSIAP, SST et VTC.',
  'Taux de satisfaction : recueilli auprès des apprenants pour améliorer l’accompagnement.',
  'Taux d’insertion ou poursuite de parcours : communiqué selon les formations concernées.',
];

const team = [
  { name: 'Clément VAILLANT', role: 'Directeur général', initials: 'CV', accent: 'from-yellow-300 to-academy-gold' },
  { name: 'Cassandre MENARD', role: 'Responsable commerciale', initials: 'CM', accent: 'from-amber-200 to-orange-300' },
  { name: 'Aurélie CHAUSSEZ', role: 'Chargée des relations clients', initials: 'AC', accent: 'from-stone-200 to-yellow-200' },
  { name: 'Yannice LIBAULT', role: 'Coordinateur pédagogique · Azzera Academy', initials: 'YL', accent: 'from-academy-gold to-yellow-100' },
];

function CertificationCard({ title, detail }: { title: string; detail: string }) {
  return <div className="group rounded-[1.75rem] border border-academy-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-academy-gold/70">
    <div className="flex items-center gap-3">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-academy-gold/25 text-lg font-black text-yellow-800">✓</span>
      <h3 className="text-lg font-black">{title}</h3>
    </div>
    <p className="mt-4 text-sm leading-7 text-stone-600">{detail}</p>
  </div>;
}

function TeamCard({ name, role, initials, accent }: { name: string; role: string; initials: string; accent: string }) {
  return <article className="group relative overflow-hidden rounded-[2rem] bg-white p-1 shadow-soft ring-1 ring-academy-line transition hover:-translate-y-1">
    <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${accent} opacity-90`} />
    <div className="relative p-6 pt-10 text-center">
      <div className="mx-auto grid h-28 w-28 place-items-center rounded-[2rem] border-4 border-white bg-academy-ink text-3xl font-black tracking-tight text-academy-gold shadow-gold transition group-hover:rotate-3">
        {initials}
      </div>
      <h3 className="mt-6 text-xl font-black">{name}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">{role}</p>
      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-academy-gold" />
    </div>
  </article>;
}

export default function Page() {
  return <>
    <Hero
      badge="Notre école"
      title="Une école certifiante, humaine et orientée réussite"
      subtitle="Intégrale Academy accompagne les candidats, alternants et professionnels avec des campus identifiés, des agréments affichés et une équipe disponible à chaque étape du parcours."
      actions={<><Button href="#agrements">Voir les agréments</Button><Button href="#equipe" variant="secondary">Découvrir l’équipe</Button></>}
    />

    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-4 md:grid-cols-4">{indicators.map(item => <StatCard key={item.value} {...item} />)}</div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle eyebrow="Campus" title="Un environnement pensé pour apprendre">À Puget-sur-Argens, notre campus Côte d’Azur regroupe salles modernes, espaces pratiques, zone détente et accès facilité.</SectionTitle>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-academy-line"><b className="text-lg">Salles modernes</b><p className="mt-3 text-sm leading-7 text-stone-600">Des espaces pédagogiques adaptés aux enseignements théoriques et aux mises en situation métier.</p></div>
        <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-academy-line"><b className="text-lg">Espace détente</b><p className="mt-3 text-sm leading-7 text-stone-600">Distributeurs, réfrigérateurs et micro-ondes pour favoriser un quotidien simple et convivial.</p></div>
        <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-academy-line"><b className="text-lg">Accompagnement</b><p className="mt-3 text-sm leading-7 text-stone-600">Un suivi administratif, commercial et pédagogique pour clarifier prérequis, financement et inscription.</p></div>
      </div>
    </section>

    <section id="agrements" className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle eyebrow="Agréments & certifications" title="Des références visibles et centralisées">Qualité, sécurité privée, sécurité incendie, secourisme, VTC et BTS : les informations réglementaires essentielles sont regroupées ici.</SectionTitle>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{certifications.map(item => <CertificationCard key={item.title} {...item} />)}</div>
      <div className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-stone-600 shadow-soft ring-1 ring-academy-line"><b className="text-academy-ink">Références complètes : </b>{legalRefs.join(' · ')} · ADEF CPSP 8325091511.</div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="overflow-hidden rounded-[2rem] bg-academy-ink p-6 text-white shadow-soft md:p-10">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div><span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-academy-gold">Indicateurs qualité</span><h2 className="mt-5 text-3xl font-black md:text-5xl">Réussite, satisfaction et élèves formés</h2><p className="mt-4 text-sm leading-7 text-stone-200 md:text-base">La page est prête pour publier les chiffres officiels par année et par formation. Les libellés ci-dessous évitent de mélanger les parcours et facilitent la mise à jour dès validation interne.</p></div>
          <div className="grid gap-3">{qualityItems.map(item => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-stone-100">{item}</div>)}</div>
        </div>
      </div>
    </section>

    <section id="equipe" className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle eyebrow="Notre équipe" title="Des interlocuteurs identifiés à chaque étape">Direction, admissions, relation client et pédagogie travaillent ensemble pour fluidifier votre parcours.</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{team.map(member => <TeamCard key={member.name} {...member} />)}</div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle eyebrow="Accès" title="Nos centres" />
      <div className="grid gap-5 md:grid-cols-3">{contact.locations.map(location => <LocationCard key={location.name} {...location} />)}</div>
    </section>

  </>;
}
