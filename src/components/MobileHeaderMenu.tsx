'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';
import { degreeMenuGroups, professionalTitleGroup } from '@/data/upcoming-trainings';
import { AnnouncedTrainingGroup } from './AnnouncedTrainingGroup';

export function MobileHeaderMenu({ appointmentFormUrl }: { appointmentFormUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);
  const closeMenu = () => setIsOpen(false);

  return <div className="relative">
    <button
      type="button"
      aria-expanded={isOpen}
      ref={toggle}
      aria-controls={isOpen ? "mobile-navigation" : undefined}
      onClick={() => setIsOpen(current => !current)}
      className="min-h-11 rounded-full border border-academy-line bg-academy-surface px-3.5 py-2 text-sm font-bold text-academy-ink shadow-soft sm:px-4"
    >
      Menu
    </button>
    {isOpen ? <div id="mobile-navigation" className="fixed inset-x-3 top-[calc(var(--site-header-height)+.5rem)] max-h-[calc(100dvh-var(--site-header-height)-1.5rem)] w-auto overflow-y-auto overscroll-contain rounded-3xl bg-academy-surface p-4 text-academy-ink shadow-soft ring-1 ring-academy-line sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:max-h-[80vh] sm:w-[min(22rem,calc(100vw-2rem))]">
      <nav className="grid gap-2" aria-label="Navigation mobile">
        {navigation.map(item => 'children' in item ? (
          <div key={item.label} className="rounded-2xl bg-academy-bg/60 p-2">
            <p className="px-2 py-2 text-xs font-black uppercase tracking-[.18em] text-academy-gold-strong">{item.label}</p>
            <div className="grid gap-1">
              {item.children.map(link => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className="flex min-h-11 items-center rounded-xl px-3 py-2 font-semibold hover:text-academy-gold-strong">{link.label}</Link>
              ))}
              {[...degreeMenuGroups, professionalTitleGroup].map(group => (
                <AnnouncedTrainingGroup key={group.label} group={group} mobile onNavigate={closeMenu} />
              ))}
            </div>
          </div>
        ) : (
          <Link key={item.href} href={item.href} onClick={closeMenu} className="rounded-2xl px-4 py-3 font-semibold hover:text-academy-gold-strong">{item.label}</Link>
        ))}
      </nav>
      <div className="mt-3 grid gap-2">
        <Link className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5 hover:bg-stone-50" href="tel:0422470768" onClick={closeMenu}>Appeler</Link>
        <Link className="inline-flex items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black" href="/contact" onClick={closeMenu}>Demander des informations</Link>
        <Link className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-academy-gold via-academy-gold to-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold ring-1 ring-academy-gold/70 transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-academy-gold focus:ring-offset-2" href={appointmentFormUrl} onClick={closeMenu}><span>Prendre un rendez-vous téléphonique</span><span className="transition group-hover:translate-x-0.5" aria-hidden="true">→</span></Link>
      </div>
    </div> : null}
  </div>;
}
