'use client';

import { useState } from 'react';

const simulatorUrl = 'https://assistance-alw9.onrender.com/simulateur-eligibilite-vae-desp';

export function VaeEligibilityModal(){
  const [open,setOpen]=useState(false);
  return <>
    <button type="button" onClick={()=>setOpen(true)} className="inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5 hover:bg-academy-gold-strong focus:outline-none focus:ring-4 focus:ring-academy-gold/30">Tester mon éligibilité à la VAE</button>
    {open&&<div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Simulateur d’éligibilité VAE DESP">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-academy-surface shadow-[0_30px_90px_rgba(0,0,0,.35)] ring-1 ring-white/20">
        <div className="flex items-center justify-between gap-4 border-b border-academy-line p-4 sm:p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">VAE DESP</p>
            <h2 className="text-lg font-black text-academy-ink sm:text-2xl">Testez votre éligibilité</h2>
          </div>
          <button type="button" onClick={()=>setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-academy-bg text-xl font-black text-academy-ink transition hover:bg-academy-gold" aria-label="Fermer la modale">×</button>
        </div>
        <iframe src={simulatorUrl} title="Simulateur d’éligibilité VAE DESP" className="min-h-0 flex-1 bg-academy-surface" />
      </div>
    </div>}
  </>
}
