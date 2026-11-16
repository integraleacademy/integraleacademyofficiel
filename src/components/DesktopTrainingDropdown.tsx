'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { TrainingFamilyMenu } from './TrainingFamilyMenu';
import styles from './TrainingFamilyMenu.module.css';

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
        className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-bold text-white/75 transition hover:bg-white/5 hover:text-academy-gold aria-expanded:bg-white/5 aria-expanded:text-academy-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academy-gold"
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
        className={styles.flyout}
      >
        <div className={styles.surface}>
          <TrainingFamilyMenu onNavigate={closeMenu} />
        </div>
      </div>
    </div>
  );
}
