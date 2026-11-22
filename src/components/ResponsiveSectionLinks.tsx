'use client';

import { useEffect, useRef } from 'react';
import styles from './ResponsiveSectionLinks.module.css';

type SectionLink = { href: string; label: string };

type SectionLinksProps = {
  items: readonly SectionLink[];
  shortcutHrefs?: readonly string[];
  allLinks?: boolean;
  activeHref: string;
  onNavigate?: (href: string) => void;
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
};

export function ResponsiveSectionLinks({
  items, shortcutHrefs = [], allLinks = false, activeHref, onNavigate, className, linkClassName, activeClassName,
}: SectionLinksProps) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const shortcuts = allLinks ? items : items.filter(item => shortcutHrefs.includes(item.href)).slice(0, 3);
  const activeInPanel = !shortcuts.some(item => item.href === activeHref);

  useEffect(() => {
    const menu = disclosure.current;
    if (!menu) return;
    const panel = menu.querySelector<HTMLElement>('[data-section-panel]');
    const nav = menu.closest('nav');
    if (!panel || !nav) return;
    const header = document.querySelector<HTMLElement>('.site-header');
    const fixedActions = document.querySelectorAll<HTMLElement>('[data-fixed-actions]');
    function positionPanel() {
      if (!menu?.open || !panel || !nav) return;
      const bounds = nav.getBoundingClientRect();
      const scale = bounds.width / nav.offsetWidth || 1;
      const viewportBottom = Array.from(fixedActions).reduce((bottom, actions) => {
        const rect = actions.getBoundingClientRect();
        return rect.height && getComputedStyle(actions).position === 'fixed' ? Math.min(bottom, rect.top) : bottom;
      }, window.innerHeight);
      const above = bounds.top - Math.max(0, header?.getBoundingClientRect().bottom ?? 0) - 10;
      const below = viewportBottom - bounds.bottom - 10;
      const height = Math.min(panel.scrollHeight * scale, window.innerHeight * .54);
      const openAbove = below < height && above > below;
      menu.toggleAttribute('data-above', openAbove);
      menu.style.setProperty('--panel-room', `${Math.max(0, openAbove ? above : below) / scale}px`);
    }
    const close = () => { menu.open = false; };
    const onPointerDown = (event: PointerEvent) => {
      if (menu.open && event.target instanceof Node && !menu.contains(event.target)) close();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.open) {
        event.preventDefault();
        close();
        summary.current?.focus({ preventScroll: true });
      }
    };
    menu.addEventListener('toggle', positionPanel);
    window.addEventListener('scroll', positionPanel, { passive: true });
    window.addEventListener('resize', positionPanel);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    window.addEventListener('hashchange', close);
    return () => {
      menu.removeEventListener('toggle', positionPanel);
      window.removeEventListener('scroll', positionPanel);
      window.removeEventListener('resize', positionPanel);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
      window.removeEventListener('hashchange', close);
    };
  }, []);

  function link(item: SectionLink, panel = false) {
    const active = item.href === activeHref;
    return <a key={item.href} href={item.href} data-section={item.href.slice(1)}
      data-shortcut-copy={panel && shortcuts.includes(item) || undefined}
      aria-current={active ? 'location' : undefined}
      className={panel ? styles.panelLink : [linkClassName, active && activeClassName].filter(Boolean).join(' ')}
      onClick={event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        if (disclosure.current) disclosure.current.open = false;
        onNavigate?.(item.href);
      }}>{item.label}</a>;
  }

  return <div data-section-links data-all-links={allLinks || undefined} className={[styles.root, className].filter(Boolean).join(' ')}>
    <div data-section-shortcuts className={styles.shortcuts}>{shortcuts.map(item => link(item))}</div>
    <details ref={disclosure} className={styles.disclosure}
      onBlur={event => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}>
      <summary ref={summary} data-section-toggle data-active-section={activeInPanel || undefined} className={styles.toggle}>
        <span className={styles.desktopLabel}>Autres rubriques</span>
        <span className={styles.compactLabel}>Sommaire</span>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <div className={styles.panel} data-section-panel>
        {items.map(item => link(item, true))}
      </div>
    </details>
  </div>;
}
