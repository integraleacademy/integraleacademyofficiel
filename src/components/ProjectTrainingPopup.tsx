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
      className="fixed inset-0 z-[70] grid place-items-center bg-academy-ink/55 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-popup-title"
    >
      <div className="relative w-full max-w-2xl rounded-[2rem] bg-white p-6 text-center shadow-soft ring-1 ring-academy-line md:p-10">
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-3xl leading-none text-stone-400 transition hover:bg-academy-bg hover:text-academy-ink"
          aria-label="Fermer la fenêtre"
        >
          ×
        </button>

        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-academy-gold text-3xl font-black text-academy-ink shadow-gold ring-4 ring-white md:h-28 md:w-28">
          IA
        </div>

        <p className="mt-7 text-sm font-black uppercase tracking-[.18em] text-yellow-700">Intégrale Academy</p>
        <h2 id="project-popup-title" className="mt-3 text-3xl font-black tracking-tight text-academy-ink md:text-4xl">
          Parlez-nous de votre projet de formation
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-stone-600">
          Sécurité, VTC, BTS ou financement : un conseiller vous aide à choisir le bon parcours et vous rappelle rapidement.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/contact"
            onClick={closePopup}
            className="inline-flex items-center justify-center rounded-full bg-academy-ink px-6 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-black"
          >
            Je décris mon projet <span className="ml-3" aria-hidden="true">→</span>
          </Link>
          <Link
            href="tel:0422470768"
            onClick={closePopup}
            className="inline-flex items-center justify-center rounded-full bg-academy-gold px-6 py-4 text-base font-black text-academy-ink transition hover:-translate-y-0.5 hover:brightness-95"
          >
            Être conseillé maintenant
          </Link>
        </div>

        <button
          type="button"
          onClick={closePopup}
          className="mt-6 text-sm font-black uppercase tracking-[.16em] text-stone-400 transition hover:text-academy-ink"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
