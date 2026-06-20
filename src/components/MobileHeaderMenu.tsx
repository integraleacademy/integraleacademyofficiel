'use client';

import { useState } from 'react';
import Link from 'next/link';

type NavLink = readonly [string, string];
type MobileHeaderMenuProps = {
  nav: readonly NavLink[];
  appointmentFormUrl: string;
};

export function MobileHeaderMenu({ nav, appointmentFormUrl }: MobileHeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return <details className="relative" open={isOpen} onToggle={(event) => setIsOpen(event.currentTarget.open)}>
    <summary className="list-none rounded-full border border-academy-line bg-academy-surface px-4 py-2 text-sm font-bold shadow-soft cursor-pointer">Menu</summary>
    <div className="absolute right-0 mt-3 max-h-[80vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-3xl bg-academy-surface p-4 shadow-soft ring-1 ring-academy-line">
      <nav className="grid gap-2" aria-label="Navigation mobile">
        {nav.map(([n, h]) => <Link key={h} href={h} onClick={closeMenu} className="rounded-2xl px-4 py-3 font-semibold hover:text-academy-gold-strong">{n}</Link>)}
      </nav>
      <div className="mt-3 grid gap-2">
        <Link className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:bg-stone-50" href="tel:0422470768" onClick={closeMenu}>Appeler</Link>
        <Link className="inline-flex items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black" href="/contact" onClick={closeMenu}>Demander des informations</Link>
        <Link className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-academy-gold via-academy-gold to-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold ring-1 ring-academy-gold/70 transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-academy-gold focus:ring-offset-2" href={appointmentFormUrl} onClick={closeMenu}><span>Prendre RDV</span><span className="transition group-hover:translate-x-0.5" aria-hidden="true">→</span></Link>
      </div>
    </div>
  </details>;
}
