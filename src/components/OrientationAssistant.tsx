'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type FormationKey = 'aps' | 'a3p' | 'desp' | 'vtc' | 'bts';
type Step = 1 | 2 | 3;

type AssistantFormation = {
  key: FormationKey;
  label: string;
  icon: string;
  infoUrl: string;
  rdvUrl: string;
};

const formations: AssistantFormation[] = [
  { key: 'aps', label: 'Agent de sécurité privée (APS)', icon: '🛡️', infoUrl: '/formations-securite/aps', rdvUrl: '/contact?formation=aps&type=rdv' },
  { key: 'a3p', label: 'Agent de protection physique des personnes (A3P)', icon: '◆', infoUrl: '/formations-securite/a3p-apr', rdvUrl: '/contact?formation=a3p&type=rdv' },
  { key: 'desp', label: 'Dirigeant d’entreprise de sécurité (DESP)', icon: '▣', infoUrl: '/formations-securite/desp', rdvUrl: '/contact?formation=desp&type=rdv' },
  { key: 'vtc', label: 'Chauffeur VTC', icon: '✦', infoUrl: '/vtc', rdvUrl: '/contact?formation=vtc&type=rdv' },
  { key: 'bts', label: 'Un BTS en alternance', icon: '◇', infoUrl: '/bts', rdvUrl: '/contact?formation=bts&type=rdv' },
];

export function OrientationAssistant(){
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState<Step>(1);
  const [selectedKey, setSelectedKey] = useState<FormationKey | null>(null);
  const selectedFormation = useMemo(() => formations.find((formation) => formation.key === selectedKey) ?? null, [selectedKey]);

  function chooseFormation(key: FormationKey){
    setSelectedKey(key);
    setStep(2);
  }

  function goBack(){
    if(step === 3) setStep(2);
    if(step === 2) setStep(1);
  }

  if(!isOpen){
    return <button type="button" onClick={() => setIsOpen(true)} className="group fixed bottom-20 right-4 z-40 inline-flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-academy-gold/60 bg-white/95 px-4 py-3 text-left text-sm font-black text-academy-ink shadow-[0_18px_45px_rgba(17,17,17,.14)] backdrop-blur transition hover:-translate-y-0.5 hover:border-academy-gold md:bottom-6 md:right-6">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-academy-ink text-academy-gold transition group-hover:rotate-6" aria-hidden="true">?</span>
      <span>Être conseillé</span>
    </button>
  }

  return <aside className="orientation-assistant relative mx-auto w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 p-4 text-academy-ink shadow-[0_28px_90px_rgba(17,17,17,.16)] ring-1 ring-academy-line backdrop-blur reveal sm:rounded-[2rem] sm:p-5" aria-label="Assistant d’orientation formation">
    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-academy-gold/30 blur-3xl" aria-hidden="true"/>
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.2em] text-yellow-700">Étape {step} sur 3</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Notre assistant va vous aider</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-stone-600">{step === 1 ? 'Je souhaite des renseignements concernant la formation :' : selectedFormation?.label}</p>
        </div>
        <button type="button" onClick={() => setIsOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-academy-line bg-white text-lg font-black text-stone-500 transition hover:bg-stone-50 hover:text-academy-ink" aria-label="Réduire l’assistant">×</button>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-stone-100" aria-hidden="true"><div className="h-full rounded-full bg-gradient-to-r from-academy-gold to-yellow-300 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}/></div>

      <div className="mt-6 transition-all duration-300">
        {step === 1 && <div className="grid gap-3">
          {formations.map((formation) => <button key={formation.key} type="button" onClick={() => chooseFormation(formation.key)} className="group flex w-full items-center gap-3 rounded-2xl border border-academy-line bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-academy-gold hover:shadow-gold active:translate-y-0">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-academy-bg text-lg font-black text-yellow-700 transition group-hover:bg-academy-ink group-hover:text-academy-gold" aria-hidden="true">{formation.icon}</span>
            <span className="flex-1 text-sm font-black leading-5 sm:text-base">{formation.label}</span>
            <span className="text-yellow-700 transition group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>)}
        </div>}

        {step === 2 && selectedFormation && <div className="space-y-4">
          <h3 className="text-xl font-black">Que souhaitez-vous faire&nbsp;?</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href={selectedFormation.infoUrl} className="flex min-h-28 flex-col justify-between rounded-2xl border border-academy-line bg-white p-5 font-black shadow-sm transition hover:-translate-y-0.5 hover:border-academy-gold hover:shadow-gold"><span>Je souhaite des informations</span><span className="text-sm text-yellow-700">Voir la formation →</span></Link>
            <button type="button" onClick={() => setStep(3)} className="flex min-h-28 flex-col justify-between rounded-2xl bg-academy-ink p-5 text-left font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-black active:translate-y-0"><span>Je souhaite m’inscrire</span><span className="text-sm text-academy-gold">Préparer mon rendez-vous →</span></button>
          </div>
        </div>}

        {step === 3 && selectedFormation && <div className="rounded-[1.35rem] bg-academy-bg p-5">
          <h3 className="text-xl font-black">Parfait, nous pouvons vous rappeler</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">Nous vérifierons votre projet, vos financements possibles et les prochaines dates disponibles.</p>
          <div className="mt-5 grid gap-3"><Link href={selectedFormation.rdvUrl} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-academy-gold via-yellow-300 to-academy-gold px-5 py-3 text-sm font-black text-academy-ink shadow-gold transition hover:-translate-y-0.5">Réserver un rendez-vous téléphonique</Link><Link href={selectedFormation.infoUrl} className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:bg-stone-50">Voir d’abord les informations</Link></div>
        </div>}
      </div>

      {step > 1 && <button type="button" onClick={goBack} className="mt-5 inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-black text-stone-600 transition hover:text-yellow-700"><span aria-hidden="true">←</span> Retour</button>}
      <p className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-center text-xs font-black text-green-800">Réponse rapide • Conseils personnalisés • Financements possibles</p>
    </div>
  </aside>
}
