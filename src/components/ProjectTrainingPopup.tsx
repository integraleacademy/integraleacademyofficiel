'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'integrale-academy-project-popup-dismissed';

export function ProjectTrainingPopup() {
  const pathname = usePathname();
  const isBts = pathname?.startsWith('/bts');
  const contactName = isBts ? 'Aurélie' : 'Cassandre';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      return;
    }

    if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  function closePopup() {
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  }

  if (pathname === '/' || !isOpen) {
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
          <div
            className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-academy-gold via-yellow-200 to-white text-xl font-black text-academy-gold-text shadow-gold ring-4 ring-white"
            aria-label={isBts ? 'Aurélie CHAUSSEZ, responsable des BTS' : 'Cassandre M., responsable commerciale Intégrale Academy'}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.95),transparent_38%)]" aria-hidden="true" />
            <span className="relative">{isBts ? 'AC' : 'CM'}</span>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-yellow-700">
              {isBts ? 'Aurélie · Responsable des BTS' : 'Cassandre · Responsable commerciale'}
            </p>
            <h2 id="project-popup-title" className="mt-2 text-2xl font-black tracking-tight text-academy-ink">
              {isBts ? 'Parlons de votre projet BTS' : 'Parlez-nous de votre projet de formation'}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-stone-600">
          {isBts
            ? 'Aurélie CHAUSSEZ, chargée des relations clients et responsable des BTS, répond à vos questions sur la candidature et l’alternance.'
            : 'Réservez un RDV téléphone avec Cassandre, responsable commerciale Intégrale Academy.'}
        </p>

        {isBts && (
          <p className="mt-3 text-xs font-bold leading-5 text-stone-500">
            Ligne directe : 04 87 83 06 15 · Portable : 07 69 39 04 57<br />
            aurelie@integraleacademy.com
          </p>
        )}

        <div className="mt-5 grid gap-3">
          <Link
            href={isBts ? 'tel:+33487830615' : 'tel:0422470768'}
            onClick={closePopup}
            className="inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5 hover:brightness-95"
          >
            {isBts ? `Appeler ${contactName}` : 'Réserver un RDV téléphonique'} <span className="ml-3" aria-hidden="true">→</span>
          </Link>
          <Link
            href={isBts ? 'mailto:aurelie@integraleacademy.com?subject=Question%20sur%20un%20BTS' : '/contact'}
            onClick={closePopup}
            className="inline-flex items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black"
          >
            {isBts ? `Écrire à ${contactName}` : 'Écrire à l’équipe'}
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
