'use client';

import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const questions = [
  'Avez-vous participé à la création ou à la reprise d’une entreprise ?',
  'Avez-vous rédigé ou utilisé un business plan ?',
  'Avez-vous géré un budget ou une trésorerie ?',
  'Avez-vous suivi des contrats, la facturation ou la comptabilité ?',
  'Connaissez-vous le Livre VI du Code de la sécurité intérieure ?',
  'Avez-vous réalisé ou suivi des démarches CNAPS ?',
  'Avez-vous recruté ou managé des collaborateurs ?',
  'Avez-vous planifié des équipes ou organisé des prestations ?',
  'Avez-vous mené de la prospection commerciale ?',
  'Avez-vous préparé des devis ou répondu à des appels d’offres ?',
  'Avez-vous assuré le suivi de clients ?',
  'Disposez-vous de preuves professionnelles exploitables ?',
];

function resultFor(score:number){
  if(score>=9) return ['Profil fortement compatible', 'Votre expérience semble couvrir plusieurs domaines essentiels du DESP. Une étude de faisabilité reste nécessaire.'];
  if(score>=5) return ['Profil à étudier', 'Votre expérience couvre une partie du référentiel. Un conseiller doit analyser précisément vos missions et vos preuves.'];
  return ['Formation initiale probablement plus adaptée', 'Votre expérience semble actuellement insuffisante pour démontrer les cinq activités du titre. Le parcours DESP initial peut être plus approprié.'];
}

export function VaeEligibilityModal({label='Tester mon éligibilité à la VAE',className='inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5 hover:bg-academy-gold-strong focus:outline-none focus:ring-4 focus:ring-academy-gold/30'}:{label?:string;className?:string}){
  const [open,setOpen]=useState(false);
  const [answers,setAnswers]=useState<Record<number, boolean>>({});
  const answered = Object.keys(answers).length;
  const score = useMemo(()=>Object.values(answers).filter(Boolean).length,[answers]);
  const [title,text] = resultFor(score);
  return <>
    <button type="button" onClick={()=>setOpen(true)} className={className}>{label}</button>
    {open && typeof document !== 'undefined' && createPortal(<div className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Simulateur d’éligibilité VAE DESP">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-academy-surface shadow-[0_30px_90px_rgba(0,0,0,.35)] ring-1 ring-white/20">
        <div className="flex items-center justify-between gap-4 border-b border-academy-line p-4 sm:p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">VAE DESP</p>
            <h2 className="text-lg font-black text-academy-ink sm:text-2xl">Testez votre éligibilité</h2>
          </div>
          <button type="button" onClick={()=>setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-academy-bg text-xl font-black text-academy-ink transition hover:bg-academy-gold" aria-label="Fermer la modale">×</button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            {questions.map((question,index)=><div key={question} className="rounded-2xl border border-academy-line bg-white p-4 shadow-sm">
              <p className="font-bold text-academy-ink">{question}</p>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={()=>setAnswers({...answers,[index]:true})} className={`rounded-full px-4 py-2 text-sm font-black transition ${answers[index]===true?'bg-academy-gold text-academy-gold-text':'bg-academy-bg text-academy-muted hover:bg-academy-gold/30'}`}>Oui</button>
                <button type="button" onClick={()=>setAnswers({...answers,[index]:false})} className={`rounded-full px-4 py-2 text-sm font-black transition ${answers[index]===false?'bg-academy-ink text-white':'bg-academy-bg text-academy-muted hover:bg-academy-gold/30'}`}>Non</button>
              </div>
            </div>)}
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-academy-gold/35 bg-academy-gold/15 p-5">
            <p className="text-sm font-black uppercase tracking-[.18em] text-academy-gold-strong">Résultat indicatif · {answered}/{questions.length} réponses</p>
            <h3 className="mt-2 text-2xl font-black text-academy-ink">{title}</h3>
            <p className="mt-3 font-semibold leading-7 text-academy-muted">{text}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-academy-muted">Ce test est uniquement indicatif. Il ne constitue ni une décision de recevabilité, ni une garantie de validation par le jury.</p>
          </div>
        </div>
      </div>
    </div>, document.body)}
  </>
}
