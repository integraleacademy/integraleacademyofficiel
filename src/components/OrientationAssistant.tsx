'use client';

import Link from 'next/link';
import FinancingSimulator from './FinancingSimulator';
import { VaeEligibilityModal } from './VaeEligibilityModal';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { computedSeats, formatSessionDate } from '@/lib/public-sessions';
import { securityFormations } from '@/data/formations';
import { createPortal } from 'react-dom';

type FormationKey = 'aps' | 'a3p' | 'desp' | 'vtc' | 'bts';
type Step = 'formations' | 'loading' | 'aps-result' | 2 | 3 | 4;
type AssistantSession = { id: string; startDate: string; endDate: string; examDate?: string | null; seatsLeft?: number | null; showSeatsLeft?: boolean | null; training?: { slug?: string; name?: string } | null; };

type AssistantFormation = {
  key: FormationKey;
  label: string;
  icon: string;
  infoUrl: string;
  rdvUrl: string;
};

const calendlyDirigeantUrl = 'https://calendly.com/integraleacademy/dirigeant';
const quoteRequestUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';
const apsFormation = securityFormations.find(formation => formation.slug === '/formations-securite/aps');

const formations: AssistantFormation[] = [
  { key: 'aps', label: 'Agent de sécurité privée (APS)', icon: '👮', infoUrl: '/formations-securite/aps', rdvUrl: '/contact?formation=aps&type=rdv' },
  { key: 'a3p', label: 'Agent de protection physique des personnes (A3P)', icon: '◆', infoUrl: '/formations-securite/a3p-apr', rdvUrl: '/contact?formation=a3p&type=rdv' },
  { key: 'desp', label: 'Dirigeant d’entreprise de sécurité (DESP)', icon: '▣', infoUrl: '/formations-securite/desp', rdvUrl: '/contact?formation=desp&type=rdv' },
  { key: 'vtc', label: 'Chauffeur VTC', icon: '🚗', infoUrl: '/vtc', rdvUrl: '/contact?formation=vtc&type=rdv' },
  { key: 'bts', label: 'Un BTS en alternance', icon: '◇', infoUrl: '/bts', rdvUrl: '/contact?formation=bts&type=rdv' },
];

export function OrientationAssistant({initialFormationKey, initialStep, hideInfoAction = false}:{initialFormationKey?:FormationKey; initialStep?:Step; hideInfoAction?:boolean} = {}){
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [step, setStep] = useState<Step>(initialStep ?? (initialFormationKey ? 2 : 'formations'));
  const [sessions, setSessions] = useState<AssistantSession[]>([]);
  const [selectedKey, setSelectedKey] = useState<FormationKey | null>(initialFormationKey ?? null);
  const [despExperience, setDespExperience] = useState<boolean | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const selectedFormation = useMemo(() => formations.find((formation) => formation.key === selectedKey) ?? null, [selectedKey]);
  const normalizedPathname = pathname?.replace(/\/$/, '') || '/';
  const isAlreadyOnSelectedFormation = Boolean(selectedFormation && normalizedPathname === selectedFormation.infoUrl);
  const shouldHideInfoAction = hideInfoAction || isAlreadyOnSelectedFormation;

  useEffect(() => {
    fetch('/api/sessions')
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => setSessions(Array.isArray(data.sessions) ? data.sessions : []))
      .catch(() => setSessions([]));
  }, []);

  useEffect(() => () => {
    if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
  }, []);

  function chooseFormation(key: FormationKey){
    if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
    setSelectedKey(key);
    setDespExperience(null);
    if (key === 'aps') {
      setStep('loading');
      loadingTimeoutRef.current = window.setTimeout(() => {
        setStep('aps-result');
        loadingTimeoutRef.current = null;
      }, 1200);
      return;
    }
    setStep(2);
    setIsExpanded(true);
  }

  function startApsInformation(){
    setStep('loading');
    window.setTimeout(() => setStep('aps-result'), 1200);
  }

  function goBack(){
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    if(step === 4){
      setStep(2);
      setDespExperience(null);
      return;
    }
    setSelectedKey(null);
    setStep('formations');
  }

  if(!isOpen){
    return <button type="button" onClick={() => { setIsOpen(true); setIsExpanded(false); }} className="group fixed bottom-20 right-4 z-40 inline-flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-academy-gold/60 bg-white/95 px-4 py-3 text-left text-sm font-black text-academy-ink shadow-[0_18px_45px_rgba(17,17,17,.14)] backdrop-blur transition hover:-translate-y-0.5 hover:border-academy-gold md:bottom-6 md:right-6">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-academy-ink text-academy-gold transition group-hover:rotate-6" aria-hidden="true">?</span>
      <span>Être conseillé</span>
    </button>
  }

  const assistantPanel = <aside className={`orientation-assistant relative mx-auto w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 p-4 text-academy-ink shadow-[0_28px_90px_rgba(17,17,17,.16)] ring-1 ring-academy-line backdrop-blur reveal sm:rounded-[2rem] sm:p-5 ${isExpanded ? 'max-w-4xl sm:p-7' : 'max-w-xl'}`} aria-label="Assistant d’orientation formation">
    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-academy-gold/30 blur-3xl" aria-hidden="true"/>
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-academy-gold/30 bg-academy-gold/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.18em] text-yellow-700"><span className="status-dot" aria-hidden="true" />Notre assistant est disponible</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Notre assistant va vous aider</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-stone-600">{step === 'formations' ? 'Je souhaite des renseignements concernant la formation :' : selectedFormation?.label}</p>
        </div>
        <button type="button" onClick={() => { if (isExpanded) setIsExpanded(false); else setIsOpen(false); }} className={isExpanded ? 'shrink-0 rounded-full border border-academy-line bg-white px-4 py-2 text-sm font-black text-stone-600 transition hover:bg-stone-50 hover:text-academy-ink' : 'grid h-10 w-10 shrink-0 place-items-center rounded-full border border-academy-line bg-white text-lg font-black text-stone-500 transition hover:bg-stone-50 hover:text-academy-ink'} aria-label="Réduire l’assistant">{isExpanded ? 'Réduire' : '×'}</button>
      </div>


      <div className="mt-6 transition-all duration-300">
        {step === 'formations' && <div className="grid gap-3">
          {formations.map((formation) => <button key={formation.key} type="button" onClick={() => chooseFormation(formation.key)} className="group flex w-full items-center gap-3 rounded-2xl border border-academy-line bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-academy-gold hover:shadow-gold active:translate-y-0">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academy-bg text-lg font-black text-yellow-700 transition group-hover:bg-academy-ink group-hover:text-academy-gold" aria-hidden="true">{formation.icon}</span>
            <span className="flex-1 text-sm font-black leading-5 sm:text-base">{formation.label}</span>
            <span className="text-yellow-700 transition group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>)}
        </div>}


        {step === 'loading' && <ApsAssistantLoading />}

        {step === 'aps-result' && <ApsAssistantResult sessions={sessions} onBack={() => { setSelectedKey(null); setStep('formations'); }} />}

        {step === 2 && selectedFormation && <div className="space-y-4">
          <h3 className="text-xl font-black">Que souhaitez-vous faire&nbsp;?</h3>
          <div className={`grid gap-3 ${shouldHideInfoAction ? '' : 'sm:grid-cols-2'}`}>
            {!shouldHideInfoAction && (selectedFormation.key === 'desp'
              ? <button type="button" onClick={() => setStep(4)} className="flex min-h-24 flex-col justify-between rounded-2xl border border-academy-line bg-white p-5 text-left font-black shadow-sm transition hover:-translate-y-0.5 hover:border-academy-gold hover:shadow-gold"><span>Je veux en savoir plus</span><span className="text-sm text-yellow-700">Répondre à une question →</span></button>
              : selectedFormation.key === 'aps'
                ? <button type="button" onClick={startApsInformation} className="flex min-h-24 flex-col justify-between rounded-2xl border border-academy-line bg-white p-5 text-left font-black shadow-sm transition hover:-translate-y-0.5 hover:border-academy-gold hover:shadow-gold"><span>Je veux en savoir plus</span><span className="text-sm text-yellow-700">Voir la réponse assistant →</span></button>
                : <Link href={selectedFormation.infoUrl} className="flex min-h-24 flex-col justify-between rounded-2xl border border-academy-line bg-white p-5 font-black shadow-sm transition hover:-translate-y-0.5 hover:border-academy-gold hover:shadow-gold"><span>Je veux en savoir plus</span><span className="text-sm text-yellow-700">Voir la formation →</span></Link>)}
            <button type="button" onClick={() => setStep(3)} className="flex min-h-24 flex-col justify-between rounded-2xl bg-academy-ink p-5 text-left font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-black active:translate-y-0"><span>Je souhaite m’inscrire</span><span className="text-sm text-academy-gold">Préparer mon rendez-vous →</span></button>
          </div>
        </div>}


        {step === 4 && selectedFormation?.key === 'desp' && <div className="space-y-5 rounded-[1.35rem] bg-academy-bg p-5">
          <div>
            <h3 className="text-xl font-black">Avez-vous déjà une expérience en management, gestion, création d’entreprise&nbsp;?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">Votre réponse nous permet de vous orienter entre le parcours VAE DESP et la formation initiale DESP.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setDespExperience(true)} className={`rounded-2xl px-5 py-4 text-left font-black transition ${despExperience === true ? 'bg-academy-ink text-white shadow-soft' : 'bg-white text-academy-ink ring-1 ring-academy-line hover:ring-academy-gold'}`}>Oui</button>
            <button type="button" onClick={() => setDespExperience(false)} className={`rounded-2xl px-5 py-4 text-left font-black transition ${despExperience === false ? 'bg-academy-ink text-white shadow-soft' : 'bg-white text-academy-ink ring-1 ring-academy-line hover:ring-academy-gold'}`}>Non</button>
          </div>
          {despExperience === true && <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-none border-0 bg-transparent px-1 py-2 text-sm font-black leading-6 text-academy-ink" role="status"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-academy-gold text-xs text-yellow-700" aria-hidden="true">✓</span><span><span className="block text-base">Vous êtes peut-être éligible à la VAE DESP</span><span className="block text-sm font-extrabold text-stone-600">Validation des Acquis de l’expérience</span></span></div>
            <DespActionGrid vae />
          </div>}
          {despExperience === false && <DespActionGrid />}
        </div>}

        {step === 3 && selectedFormation && <div className="rounded-[1.35rem] bg-academy-bg p-5">
          <h3 className="text-xl font-black">Parfait, nous pouvons vous rappeler</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">Nous vérifierons votre projet, vos financements possibles et les prochaines dates disponibles.</p>
          <div className="mt-5 grid gap-3"><Link href={selectedFormation.rdvUrl} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-academy-gold via-yellow-300 to-academy-gold px-5 py-3 text-sm font-black text-academy-ink shadow-gold transition hover:-translate-y-0.5">Réserver un rendez-vous téléphonique</Link>{!shouldHideInfoAction && <Link href={selectedFormation.infoUrl} className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:bg-stone-50">Voir d’abord les informations</Link>}</div>
        </div>}
      </div>

      {step !== 'formations' && <button type="button" onClick={goBack} className="mt-5 inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-black text-stone-600 transition hover:text-yellow-700"><span aria-hidden="true">←</span> Retour</button>}
      <p className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-center text-xs font-black text-green-800">Réponse rapide • Conseils personnalisés • Financements possibles</p>
    </div>
  </aside>;

  if (isExpanded) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-academy-ink/45 p-3 backdrop-blur-sm sm:p-6" role="presentation">{assistantPanel}</div>;
  }

  return assistantPanel;
}


function ApsAssistantLoading(){
  return <div className="overflow-hidden rounded-[1.35rem] border border-academy-gold/25 bg-gradient-to-br from-white via-[#FFFBF2] to-academy-bg p-5 shadow-soft">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academy-gold/15 text-xl" aria-hidden="true">👮</span>
      <div>
        <h3 className="text-lg font-black">Je recherche les informations sur la formation APS</h3>
        <div className="mt-2 flex gap-1" aria-hidden="true">{[0,1,2].map(index => <span key={index} className="h-2 w-2 rounded-full bg-academy-gold motion-safe:animate-pulse" style={{ animationDelay: `${index * 160}ms` }} />)}</div>
      </div>
    </div>
    <div className="mt-5 space-y-2" aria-hidden="true">
      <div className="h-3 w-11/12 overflow-hidden rounded-full bg-academy-gold/10"><span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-academy-gold/35 to-transparent motion-safe:animate-pulse" /></div>
      <div className="h-3 w-8/12 rounded-full bg-academy-gold/10" />
      <div className="h-3 w-10/12 rounded-full bg-academy-gold/10" />
    </div>
  </div>;
}

function apsSeatLabel(session: AssistantSession){
  const seats = computedSeats(session);
  if (seats === null || Number.isNaN(seats)) return 'Places limitées';
  if (seats < 4) return `Attention, il reste ${seats} place${seats > 1 ? 's' : ''}`;
  return `${seats} places restantes`;
}

function ApsAssistantResult({sessions,onBack}:{sessions:AssistantSession[];onBack:()=>void}){
  const upcomingApsSessions = sessions
    .filter(session => session.training?.slug === 'aps')
    .sort((a,b) => +new Date(a.startDate) - +new Date(b.startDate))
    .slice(0, 1);
  const keyPoints = [
    'Formation hybride : 62 h en e-learning + 113 h en présentiel',
    `Durée : ${apsFormation?.duration || '175 heures au total'}`,
    `Lieu : ${apsFormation?.locations || 'Puget-sur-Argens, Côte d’Azur'}`,
    `Certification : ${apsFormation?.certification || 'TFP APS · RNCP n°36648 · niveau 3'}`,
    'Examen final en présentiel : QCU sur tablette + mise en situation pratique',
    `Financements : ${apsFormation?.financing || 'CPF, France Travail ou paiement en plusieurs fois'}`,
  ];

  return <div className="space-y-3 rounded-[1.35rem] border border-academy-gold/25 bg-gradient-to-br from-white via-[#FFFBF2] to-academy-bg p-4 shadow-soft sm:p-5">
    <div>
      <p className="text-xs font-black uppercase tracking-[.22em] text-academy-gold">Réponse assistant IA</p>
      <h3 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Formation Agent de sécurité privée (APS)</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">Voici les informations clés concernant la formation APS chez Intégrale Academy.</p>
    </div>
    <div className="grid gap-2">
      <div className="rounded-2xl border border-academy-line bg-white/85 p-3"><p className="text-sm font-black">Informations clés</p><ul className="mt-2 space-y-1 text-xs font-semibold leading-5 text-stone-600 sm:text-sm">{keyPoints.map(point => <li key={point} className="flex gap-2"><span className="text-academy-gold" aria-hidden="true">✓</span><span>{point}</span></li>)}</ul></div>
      <div className="rounded-2xl border border-academy-line bg-white/85 p-3"><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">Tarif</span><span className="text-lg font-black text-academy-ink">{apsFormation?.price || 'Tarif sur demande'}</span></div>
    </div>
    <div>
      <p className="font-black">Prochaine formation</p>
      {upcomingApsSessions.length ? <div className="mt-3 grid gap-3">{upcomingApsSessions.map(session => <div key={session.id} className="rounded-2xl border border-academy-line bg-white p-3 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-3">
          <p><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">Début</span><span className="font-black">{formatSessionDate(session.startDate)}</span></p>
          <p><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">Fin</span><span className="font-black">{formatSessionDate(session.endDate)}</span></p>
          <p><span className="block text-[10px] font-black uppercase tracking-[.15em] text-academy-muted/70">Examen</span><span className="font-black">{session.examDate ? formatSessionDate(session.examDate) : 'À confirmer'}</span></p>
        </div>
        <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black ${computedSeats(session) !== null && Number(computedSeats(session)) < 4 ? 'bg-rose-100 text-rose-800' : 'bg-academy-gold/15 text-yellow-800'}`}>{apsSeatLabel(session)}</p>
      </div>)}</div> : <p className="mt-3 rounded-2xl border border-dashed border-academy-line bg-white/70 p-4 text-sm font-bold text-academy-muted">Places limitées</p>}
      <p className="mt-2 text-xs font-bold leading-5 text-stone-600">Consultez toutes les dates en <Link href="/planning?formation=aps" className="font-black text-yellow-700 underline decoration-academy-gold/50 underline-offset-4 hover:text-academy-ink">cliquant ici</Link>.</p>
    </div>
    <div className="grid gap-3">
      <Link href="/contact?formation=aps&type=inscription" className="group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-academy-gold via-yellow-300 to-academy-gold px-5 py-3 text-center text-sm font-black text-academy-gold-text shadow-gold ring-2 ring-academy-gold/45 transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(180,124,31,.38)] focus:outline-none focus:ring-4 focus:ring-academy-gold/35"><span className="relative z-10">Je souhaite m’inscrire</span><span className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/35 transition group-hover:translate-x-[280%]" aria-hidden="true" /></Link>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formations-securite/aps" className="inline-flex min-h-12 items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-center text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-black">Je souhaite en savoir plus</Link>
        <button type="button" onClick={onBack} className="inline-flex min-h-12 items-center justify-center rounded-full border border-academy-line bg-white px-5 py-3 text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:border-academy-gold">Retour aux formations</button>
      </div>
    </div>
  </div>;
}


function IframeModalButton({label,url,title,featured=false}:{label:string;url:string;title:string;featured?:boolean}){
  const [open,setOpen]=useState(false);
  const [iframeLoaded,setIframeLoaded]=useState(false);
  const openModal=()=>{setIframeLoaded(false);setOpen(true);};
  return <>
    <button type="button" onClick={openModal} className={featured ? 'relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-academy-gold via-yellow-300 to-academy-gold px-4 py-3 text-center text-sm font-black text-academy-gold-text shadow-gold ring-2 ring-academy-gold/45 transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(180,124,31,.38)] focus:outline-none focus:ring-4 focus:ring-academy-gold/35 motion-safe:animate-[rdvButtonPulse_2.4s_ease-in-out_infinite]' : 'inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold'}><span className={featured ? 'relative z-10' : undefined}>{label}</span>{featured && <span className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/35 motion-safe:animate-[rdvButtonShine_2.4s_ease-in-out_infinite]" aria-hidden="true" />}</button>
    {open && typeof document !== 'undefined' && createPortal(<div className="fixed inset-0 z-[9999] grid place-items-center bg-black/75 p-3 backdrop-blur-md sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_35px_110px_rgba(0,0,0,.45)] ring-1 ring-white/30">
        <div className="relative overflow-hidden border-b border-academy-gold/20 bg-gradient-to-br from-[#0B1220] via-[#101B2D] to-[#D8A640] p-5 text-white sm:p-6">
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-academy-gold/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[.24em] text-academy-gold">Intégrale Academy</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">{title}</h2>
              <p className="mt-2 text-sm font-semibold text-white/75 sm:text-base">Choisissez le créneau qui vous convient, notre équipe vous rappelle.</p>
            </div>
            <button type="button" onClick={()=>setOpen(false)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/12 text-2xl font-black text-white ring-1 ring-white/20 transition hover:bg-academy-gold hover:text-academy-ink focus:outline-none focus:ring-4 focus:ring-academy-gold/35" aria-label="Fermer la modale">×</button>
          </div>
        </div>
        <div className="relative min-h-0 flex-1 bg-[#F7F3EA]">
          {!iframeLoaded && <div className="absolute inset-0 z-10 grid place-items-center bg-[radial-gradient(circle_at_top,#fff7df,transparent_42%),linear-gradient(135deg,#F7F3EA,#ffffff)] p-8 text-center">
            <div className="max-w-sm rounded-[2rem] border border-academy-gold/25 bg-white/85 p-8 shadow-soft backdrop-blur">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-academy-gold/15 ring-8 ring-academy-gold/10"><span className="h-9 w-9 animate-spin rounded-full border-4 border-academy-gold/25 border-t-academy-gold" aria-hidden="true" /></div>
              <p className="mt-6 text-lg font-black text-academy-ink">Chargement en cours…</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">Nous préparons l’agenda sécurisé pour votre rendez-vous téléphonique.</p>
            </div>
          </div>}
          <iframe src={url} title={title} onLoad={()=>setIframeLoaded(true)} className="h-full w-full border-0 bg-white" />
        </div>
      </div>
    </div>, document.body)}
  </>;
}

function FinancingModalButton(){
  const [open,setOpen]=useState(false);
  return <>
    <button type="button" onClick={()=>setOpen(true)} className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold">Simuler mon financement</button>
    {open && typeof document !== 'undefined' && createPortal(<div className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Simulateur de financement">
      <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-[#080f1f] shadow-[0_30px_90px_rgba(0,0,0,.35)] ring-1 ring-white/20">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4 sm:p-5"><h2 className="text-lg font-black text-white sm:text-2xl">Simuler mon financement</h2><button type="button" onClick={()=>setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-xl font-black text-white transition hover:bg-academy-gold hover:text-academy-ink" aria-label="Fermer la modale">×</button></div>
        <div className="min-h-0 flex-1 overflow-y-auto"><FinancingSimulator /></div>
      </div>
    </div>, document.body)}
  </>;
}

function DespActionGrid({vae=false}:{vae?:boolean}){
  return <div className="grid gap-3 sm:grid-cols-2">
    {vae ? <VaeEligibilityModal className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold" /> : <Link href="/formations-securite/desp-initial" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold">En savoir plus sur la formation initiale DESP</Link>}
    {vae && <Link href="/formations-securite/desp-vae" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:ring-academy-gold">En savoir plus sur la VAE Dirigeant</Link>}
    <IframeModalButton label="Réserver un RDV téléphonique" url={calendlyDirigeantUrl} title="Réserver un RDV téléphonique" featured />
    <IframeModalButton label="Demander un devis personnalisé" url={quoteRequestUrl} title="Demander un devis personnalisé" />
    <FinancingModalButton />
  </div>;
}
