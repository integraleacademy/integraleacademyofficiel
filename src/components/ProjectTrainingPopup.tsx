'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'integrale-academy-project-popup-dismissed';

export function ProjectTrainingPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  function closePopup() {
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed bottom-24 right-4 z-[70] w-[calc(100%-2rem)] max-w-md md:bottom-6 md:right-6"
      role="dialog"
      aria-labelledby="project-popup-title"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-soft ring-1 ring-academy-line md:p-6">
        <div className="absolute inset-x-0 top-0 h-2 bg-academy-gold" aria-hidden="true" />
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none text-stone-400 transition hover:bg-academy-bg hover:text-academy-ink"
          aria-label="Fermer la fenêtre"
        >
          ×
        </button>

        <div className="flex items-start gap-4 pr-10">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-academy-gold text-xl font-black text-academy-ink shadow-gold ring-4 ring-white">
            IA
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-yellow-700">Intégrale Academy</p>
            <h2 id="project-popup-title" className="mt-2 text-2xl font-black tracking-tight text-academy-ink">
              Parlez-nous de votre projet de formation
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-stone-600">
          Sécurité, VTC, BTS ou financement : un conseiller vous aide à choisir le bon parcours et vous rappelle rapidement.
        </p>

        <div className="mt-5 grid gap-3">
          <Link
            href="/contact"
            onClick={closePopup}
            className="inline-flex items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black"
          >
            Je décris mon projet <span className="ml-3" aria-hidden="true">→</span>
          </Link>
          <Link
            href="tel:0422470768"
            onClick={closePopup}
            className="inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:brightness-95"
          >
            Être conseillé maintenant
          </Link>
        </div>

        <button
          type="button"
          onClick={closePopup}
          className="mx-auto mt-4 block text-xs font-black uppercase tracking-[.16em] text-stone-400 transition hover:text-academy-ink"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
