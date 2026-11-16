'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { trainingNavigation } from '@/data/navigation';
import { degreeMenuGroups, professionalTitleGroup } from '@/data/upcoming-trainings';
import { AnnouncedTrainingGroup } from './AnnouncedTrainingGroup';

export function DesktopTrainingDropdown({ label }: { label: string }) {
  const [openMode, setOpenMode] = useState<'hover' | 'expanded' | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  function clearCloseTimer() {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }

  function closeMenu() {
    clearCloseTimer();
    setOpenMode(null);
  }

  useEffect(() => clearCloseTimer, []);
  useEffect(() => {
    if (!openMode) return;
    function closeOutside(event: Event) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) closeMenu();
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
        if (root.current?.contains(document.activeElement)) trigger.current?.focus();
      }
    }
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [openMode]);

  return (
    <div
      ref={root}
      onPointerEnter={event => {
        if (event.pointerType !== 'mouse') return;
        clearCloseTimer();
        setOpenMode(mode => mode ?? 'hover');
      }}
      onPointerLeave={event => {
        if (event.pointerType !== 'mouse') return;
        clearCloseTimer();
        timer.current = setTimeout(() => setOpenMode(mode => mode === 'hover' ? null : mode), 250);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-bold text-white/75 transition hover:bg-white/5 hover:text-academy-gold focus:bg-white/5 focus:text-academy-gold focus:outline-none focus:ring-2 focus:ring-academy-gold"
        aria-expanded={openMode !== null}
        aria-controls={panelId}
        onClick={() => {
          clearCloseTimer();
          setOpenMode(mode => mode === 'expanded' ? null : 'expanded');
        }}
      >
        <span>{label}</span>
        <span className={`text-academy-gold transition ${openMode ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
      </button>
      <div
        id={panelId}
        hidden={!openMode}
        onFocus={() => {
          clearCloseTimer();
          setOpenMode('expanded');
        }}
        className="absolute inset-x-0 top-full z-[70] mx-auto w-[calc(100%_-_2rem)] max-w-[74rem] pt-2"
      >
        <div className="grid max-h-[calc(100dvh-var(--site-header-height)-1rem)] grid-cols-[.9fr_1fr_1fr] items-start gap-6 overflow-y-auto overscroll-contain rounded-[1.75rem] border border-academy-line bg-academy-surface p-5 text-academy-ink shadow-card">
          <div className="grid gap-1 rounded-2xl bg-academy-soft/50 p-2">
            {trainingNavigation.map(item => (
              <Link key={item.href} href={item.href} onClick={closeMenu} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-academy-elevated focus-visible:bg-academy-elevated">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-academy-gold/20 text-xl" aria-hidden="true">{item.icon}</span>
                <span className="min-w-0">
                  <span className="block font-extrabold">{item.label}</span>
                  <span className="mt-1 block text-xs font-medium leading-5 text-academy-muted">{item.description}</span>
                </span>
                <span className="ml-auto text-academy-gold-strong" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <div className="grid gap-4">
            {degreeMenuGroups.map(group => <AnnouncedTrainingGroup key={group.label} group={group} onNavigate={closeMenu} />)}
          </div>
          <AnnouncedTrainingGroup group={professionalTitleGroup} onNavigate={closeMenu} />
        </div>
      </div>
    </div>
  );
}
