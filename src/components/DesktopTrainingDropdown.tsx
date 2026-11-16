'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { TrainingFamilyMenu } from './TrainingFamilyMenu';

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
        className="absolute inset-x-0 top-full z-[70] mx-auto w-[calc(100%_-_2rem)] max-w-[58rem] pt-2"
      >
        <div className="max-h-[calc(100dvh-var(--site-header-height)-1rem)] overflow-y-auto overscroll-contain rounded-[1.5rem] border border-academy-line bg-academy-surface p-5 text-academy-ink shadow-card">
          <TrainingFamilyMenu onNavigate={closeMenu} />
        </div>
      </div>
    </div>
  );
}
