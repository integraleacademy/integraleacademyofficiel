'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

type TrainingNavItem = readonly [label: string, href: string, description: string, icon: string];

type DesktopTrainingDropdownProps = {
  label: string;
  items: readonly TrainingNavItem[];
};

const closeDelayMs = 250;

export function DesktopTrainingDropdown({ label, items }: DesktopTrainingDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, closeDelayMs);
  };

  const closeMenu = () => {
    clearCloseTimer();
    setIsOpen(false);
  };

  const menuStateClasses = isOpen
    ? 'visible translate-y-0 opacity-100'
    : 'invisible translate-y-3 opacity-0';

  return (
    <div
      className="group relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocus={openMenu}
      onBlur={scheduleClose}
    >
      <span className="invisible absolute left-1/2 top-full h-5 w-[30rem] -translate-x-1/2" aria-hidden="true" />
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-bold text-academy-muted transition hover:bg-academy-gold/10 hover:text-academy-gold-strong focus:bg-academy-gold/10 focus:text-academy-gold-strong focus:outline-none focus:ring-2 focus:ring-academy-gold"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <span className={`text-academy-gold-strong transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
      </button>
      <span className="absolute left-1/2 top-full z-[60] h-5 w-[30rem] -translate-x-1/2 bg-transparent" aria-hidden="true" />
      <div className={`absolute left-1/2 top-full z-[70] mt-3 w-[30rem] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-academy-gold/25 bg-academy-surface/95 p-3 shadow-[0_28px_80px_rgba(55,43,18,.18)] ring-1 ring-white/70 backdrop-blur-2xl transition duration-200 ${menuStateClasses}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,196,90,.28),transparent_38%),linear-gradient(135deg,rgba(255,255,255,.92),rgba(255,248,232,.72))]" aria-hidden="true" />
        <div className="relative rounded-[1.5rem] border border-white/70 bg-white/55 p-3">
          <p className="px-3 pb-2 text-[0.68rem] font-black uppercase tracking-[.22em] text-academy-gold-strong">Choisir une famille</p>
          <div className="grid gap-2">
            {items.map(([itemLabel, href, description, icon]) => (
              <Link key={href} href={href} onClick={closeMenu} className="group/item flex items-center gap-4 rounded-[1.25rem] p-3 text-academy-ink transition hover:-translate-y-0.5 hover:bg-white hover:shadow-card focus:-translate-y-0.5 focus:bg-white focus:shadow-card focus:outline-none">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-academy-gold/18 text-xl shadow-inner transition group-hover/item:scale-105" aria-hidden="true">{icon}</span>
                <span className="min-w-0">
                  <span className="block font-black">{itemLabel}</span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-academy-muted">{description}</span>
                </span>
                <span className="ml-auto text-lg text-academy-gold-strong transition group-hover/item:translate-x-1" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
