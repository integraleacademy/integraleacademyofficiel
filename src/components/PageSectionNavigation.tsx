'use client';

import { useEffect, useRef, useState } from 'react';
import { ResponsiveSectionLinks } from './ResponsiveSectionLinks';
import styles from './PageSectionNavigation.module.css';

export type PageChapter = readonly [id: string, label: string];

/** Sticky chapters shared by the school, contact, company and funding pages. */
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
      const threshold = (header?.getBoundingClientRect().height || 80) + node.getBoundingClientRect().height + 70;
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

  const activeLabel = chapters.find(([id]) => id === active)?.[1] ?? chapters[0]?.[1] ?? label;

  return <nav ref={nav} className={styles.navigation} aria-label={ariaLabel} data-page-section-navigation>
    <div className={styles.inner}>
      <span>{label}</span>
      <ResponsiveSectionLinks activeLabel={activeLabel} className={styles.sectionLinks} linksClassName={styles.links}>
        {chapters.map(([id, title], index) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{title}
        </a>)}
      </ResponsiveSectionLinks>
    </div>
  </nav>;
}
