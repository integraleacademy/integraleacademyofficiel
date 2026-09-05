import Link from 'next/link';
import { Button, Highlight } from '@/components/ui';
import type { PresentationDossier } from '@/data/presentation-dossiers';

type PresentationDossiersPageProps = {
  variant: 'professional' | 'bts';
  dossiers: readonly PresentationDossier[];
};

const stackPoses = [
  { transform: 'translate(-84%, -48%) rotate(-8deg)', zIndex: 1 },
  { transform: 'translate(-50%, -53%) rotate(0deg)', zIndex: 3 },
  { transform: 'translate(-16%, -48%) rotate(8deg)', zIndex: 2 },
] as const;

function ArrowUpRightIcon() {
  return <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M6 14 14 6M8 6h6v6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function FolderIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M3.5 7.5h6l2-2h4l2 2h3v11h-17v-11Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" /><path d="M3.5 9.5h17" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>;
}

function DossierStack({ dossiers, isBts }: { dossiers: readonly PresentationDossier[]; isBts: boolean }) {
  return <div className="relative isolate min-h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,#172235,#293a54_60%,#182334)] p-5 text-white shadow-[0_30px_90px_rgba(15,23,42,.32)] sm:min-h-[29rem]">
    <div className={`absolute inset-0 opacity-80 ${isBts ? 'bg-[radial-gradient(circle_at_78%_18%,rgba(59,130,246,.35),transparent_34%)]' : 'bg-[radial-gradient(circle_at_78%_18%,rgba(230,176,58,.34),transparent_34%)]'}`} aria-hidden="true" />
    <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-white/70"><FolderIcon /> Bibliothèque</span>
      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-black text-white/80">{dossiers.length} dossiers</span>
    </div>
    <div className="absolute inset-x-5 bottom-4 top-16">
      {dossiers.slice(0, 3).map((dossier, index) => <div key={dossier.title} className="absolute left-1/2 top-1/2 aspect-[600/850] w-[52%] max-w-[13.5rem] overflow-hidden rounded-[1rem] border border-white/20 bg-white shadow-[0_24px_60px_rgba(0,0,0,.45)]" style={stackPoses[index]}>
        <img src={dossier.image} alt={`Couverture ${dossier.title}`} width="600" height="850" loading="eager" decoding="async" className="h-full w-full object-cover" />
      </div>)}
    </div>
    <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#172235]/90 px-4 py-2 text-xs font-black text-white shadow-lg backdrop-blur">Cliquez · consultez · partagez</div>
  </div>;
}

function DossierCard({ dossier, isBts }: { dossier: PresentationDossier; isBts: boolean }) {
  return <a href={dossier.href} target="_blank" rel="noopener noreferrer" aria-label={`Consulter le dossier de présentation ${dossier.title} sur Canva (nouvel onglet)`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-academy-line bg-academy-surface shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-academy-gold/60 hover:shadow-card focus:outline-none focus:ring-4 focus:ring-academy-gold/30" data-dossier-card>
    <div className="relative mx-4 mt-4 aspect-[600/850] overflow-hidden rounded-[1.25rem] bg-academy-soft">
      <img src={dossier.image} alt={`Couverture du dossier de présentation ${dossier.title}`} width="600" height="850" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
      <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-full bg-[#172235]/92 px-4 py-3 text-xs font-black text-white shadow-lg backdrop-blur transition group-hover:bg-academy-gold group-hover:text-academy-gold-text">
        Afficher le dossier <ArrowUpRightIcon />
      </span>
    </div>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <span className={`w-fit rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[.13em] ${isBts ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-700/50' : 'bg-academy-gold/20 text-academy-gold-strong ring-1 ring-academy-gold/25'}`}>{dossier.category}</span>
      <h2 className="mt-4 text-2xl font-black tracking-tight text-academy-ink">{dossier.title}</h2>
      <p className="mt-3 text-sm font-medium leading-6 text-academy-muted">{dossier.description}</p>
      <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-black text-academy-gold-strong">Consulter en ligne <ArrowUpRightIcon /></span>
    </div>
  </a>;
}

function ClosingCallout({ isBts }: { isBts: boolean }) {
  if (isBts) {
    return <section className="px-4 py-8 sm:py-12">
      <div className="page-container overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#172235,#293a54_58%,#172235)] p-7 text-white shadow-soft sm:p-10">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-blue-200">Admissions 2026</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Les inscriptions 2026 sont ouvertes.</h2>
            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-white/70">Complétez votre dossier de pré-inscription en moins de 10 minutes. L’équipe BTS étudiera ensuite votre candidature et vous accompagnera dans les prochaines étapes.</p>
          </div>
          <a href="https://inscriptionsbts.onrender.com/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-academy-gold px-6 py-3 text-center text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-academy-gold/35">Débuter ma pré-inscription <ArrowUpRightIcon /></a>
        </div>
      </div>
    </section>;
  }

  return <section className="px-4 py-8 sm:py-12">
    <div className="page-container overflow-hidden rounded-[2rem] border border-academy-line bg-academy-surface p-7 shadow-soft sm:p-10">
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-3xl">
          <span className="text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">Votre projet formation</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Vous hésitez entre plusieurs parcours&nbsp;?</h2>
          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-academy-muted">Consultez les prochaines dates ou échangez avec notre équipe pour vérifier les prérequis, le financement et la formation la plus adaptée à votre objectif.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button href="/planning" variant="secondary">Voir le planning</Button>
          <Button href="/contact" variant="primary">Être conseillé</Button>
        </div>
      </div>
    </div>
  </section>;
}

export function PresentationDossiersPage({ variant, dossiers }: PresentationDossiersPageProps) {
  const isBts = variant === 'bts';

  return <>
    <section className={`grid-soft overflow-hidden px-4 py-14 sm:py-16 md:py-20 ${isBts ? 'training-glow-blue' : 'gold-glow'}`}>
      <div className="page-container grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <div className="reveal">
          <span className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-[.18em] ${isBts ? 'bg-blue-50 text-blue-800 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-700/50' : 'bg-academy-gold/20 text-academy-gold-strong ring-1 ring-academy-gold/25'}`}>Dossiers de présentation</span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">{isBts ? <>Découvrez nos <Highlight>BTS en alternance</Highlight></> : <>Découvrez nos <Highlight>formations professionnelles</Highlight></>}</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-academy-muted">{isBts ? 'Programme, rythme, diplôme, débouchés et alternance : consultez chaque dossier pour comparer les BTS proposés par Intégrale Academy.' : 'Programme, durée, prérequis, certification, financement et débouchés : retrouvez les informations essentielles de chaque parcours.'}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#dossiers" variant={isBts ? 'blue' : 'primary'}>Voir les dossiers</Button>
            <Button href={isBts ? '/dossiersfc' : '/dossiersbts'} variant="ghost">{isBts ? 'Formations professionnelles' : 'Voir les dossiers BTS'}</Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-academy-muted"><span className="grid h-6 w-6 place-items-center rounded-full bg-academy-green/15 text-xs text-academy-green" aria-hidden="true">✓</span> Consultation gratuite, sans formulaire</p>
        </div>
        <DossierStack dossiers={dossiers} isBts={isBts} />
      </div>
    </section>

    <section id="dossiers" className="scroll-mt-28 px-4 py-14 sm:py-16">
      <div className="page-container">
        <div className="mx-auto mb-10 max-w-3xl text-center reveal">
          <span className="text-xs font-black uppercase tracking-[.22em] text-academy-gold-strong">{dossiers.length} dossiers disponibles</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">Cliquez sur une couverture pour consulter le dossier détaillé.</h2>
          <p className="mt-4 text-base font-medium leading-7 text-academy-muted">Chaque document s’ouvre dans un nouvel onglet afin que vous puissiez le lire, le télécharger ou le partager facilement.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {dossiers.map((dossier) => <DossierCard key={dossier.title} dossier={dossier} isBts={isBts} />)}
        </div>
      </div>
    </section>

    <ClosingCallout isBts={isBts} />
  </>;
}
