'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './PageSectionNavigation.module.css';

export type PageChapter = readonly [id: string, label: string];

/** The École chapter navigation, shared by École, Contact and Financements. */
export function PageSectionNavigation({ chapters, label, ariaLabel }: {
  chapters: readonly PageChapter[];
  label: string;
  ariaLabel: string;
}) {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState(chapters[0]?.[0] ?? '');

  useEffect(() => {
    const node = nav.current;
    if (!node || !chapters.length) return;
    const parent = node.parentElement;
    const header = document.querySelector('header');
    const previousHeight = parent?.style.getPropertyValue('--section-nav-height') ?? '';
    let frame = 0;
    const update = () => {
      const threshold = (header?.getBoundingClientRect().height || 80) + node.offsetHeight + 70;
      let current = chapters[0][0];
      for (const [id] of chapters) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold) current = id;
      }
      setActive(current);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      parent?.style.setProperty('--section-nav-height', `${node.offsetHeight}px`);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (header) observer.observe(header);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('hashchange', schedule);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('hashchange', schedule);
      if (previousHeight) parent?.style.setProperty('--section-nav-height', previousHeight);
      else parent?.style.removeProperty('--section-nav-height');
    };
  }, [chapters]);

  // Reveal the active link on narrow screens without moving the page vertically.
  useEffect(() => {
    const inner = nav.current?.firstElementChild as HTMLElement | null;
    const link = inner?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!inner || !link || inner.scrollWidth <= inner.clientWidth) return;
    const bounds = inner.getBoundingClientRect();
    const target = link.getBoundingClientRect();
    if (target.left < bounds.left + 16) inner.scrollLeft += target.left - bounds.left - 16;
    else if (target.right > bounds.right - 16) inner.scrollLeft += target.right - bounds.right + 16;
  }, [active]);

  return <nav ref={nav} className={styles.navigation} aria-label={ariaLabel} data-page-section-navigation>
    <div className={styles.inner}>
      <span>{label}</span>
      {chapters.map(([id, title], index) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{title}
      </a>)}
    </div>
  </nav>;
}
