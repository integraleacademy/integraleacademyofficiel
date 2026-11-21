'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import styles from './ResponsiveSectionLinks.module.css';

export function ResponsiveSectionLinks({ activeLabel, children, className, linksClassName }: {
  activeLabel: string;
  children: ReactNode;
  className?: string;
  linksClassName?: string;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)');
    function update() {
      // Before hydration, all section links are available in the wrapped list.
      const focusedLink = root.current?.querySelector('a:focus');
      setOpen(media.matches && Boolean(focusedLink));
      setCompact(media.matches);
    }
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener('pointerdown', closeOutside);
    window.addEventListener('hashchange', close);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      window.removeEventListener('hashchange', close);
    };
  }, [open]);

  return <div ref={root} className={`${styles.root} ${className ?? ''}`} data-compact={compact || undefined}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={event => {
      if (open && event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    }}>
    {compact && <button ref={trigger} type="button" data-section-toggle aria-expanded={open} aria-controls={id}
      className={styles.toggle} onClick={() => setOpen(!open)}>
      <span>Sommaire</span><strong>{activeLabel}</strong>
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>}
    <div id={id} className={`${styles.links} ${linksClassName ?? ''}`} hidden={compact && !open}
      onClick={event => {
        if (compact && event.target instanceof Element && event.target.closest('a[href]') && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
          setOpen(false);
        }
      }}>
      {children}
    </div>
  </div>;
}
