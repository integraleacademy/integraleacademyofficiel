'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TrainingSectionNavigation.module.css';

export type TrainingSectionNavigationItem = {
  label: string;
  href: `#${string}`;
};

type TrainingSectionNavigationProps = {
  mark: string;
  title: string;
  items: readonly TrainingSectionNavigationItem[];
  registrationHref: string;
  registrationLabel?: string;
  theme?: 'blue' | 'green' | 'violet' | 'orange';
  externalRegistration?: boolean;
  ariaLabel?: string;
};

export function TrainingSectionNavigation({
  mark,
  title,
  items,
  registrationHref,
  registrationLabel = 'Je m’inscris',
  theme = 'blue',
  externalRegistration = false,
  ariaLabel = `Sommaire de la formation ${title}`,
}: TrainingSectionNavigationProps) {
  const firstHref = items[0]?.href ?? '#top';
  const [activeHref, setActiveHref] = useState<string>(firstHref);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateFromHash = () => {
      if (items.some((item) => item.href === window.location.hash)) {
        setActiveHref(window.location.hash);
      }
    };

    const sections = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

      if (current) setActiveHref(`#${current.target.id}`);
    }, {
      rootMargin: '-110px 0px -68% 0px',
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, [items]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeLink = scroller?.querySelector<HTMLElement>(`[data-section="${activeHref.slice(1)}"]`);
    if (!scroller || !activeLink) return;

    const targetLeft = activeLink.offsetLeft - (scroller.clientWidth - activeLink.offsetWidth) / 2;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollTo({ left: Math.max(0, targetLeft), behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [activeHref]);

  return (
    <nav aria-label={ariaLabel} className={styles.courseNav} data-theme={theme}>
      <div className={`${styles.courseNavShell} page-container`}>
        <a href={firstHref} className={styles.courseNavIdentity} onClick={() => setActiveHref(firstHref)}>
          <span className={styles.courseNavMark}>{mark}</span>
          <span className={styles.courseNavIdentityCopy}>
            <span className={styles.courseNavKicker}>Votre formation</span>
            <strong className={styles.courseNavTitle}>{title}</strong>
          </span>
        </a>

        <div ref={scrollerRef} className={styles.courseNavScroller}>
          <div className={styles.courseNavLinks}>
            {items.map((item) => {
              const active = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-section={item.href.slice(1)}
                  aria-current={active ? 'location' : undefined}
                  className={`${styles.courseNavLink} ${active ? styles.courseNavLinkActive : ''}`}
                  onClick={() => setActiveHref(item.href)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>

        <a
          href={registrationHref}
          className={styles.courseNavCta}
          target={externalRegistration ? '_blank' : undefined}
          rel={externalRegistration ? 'noopener noreferrer' : undefined}
        >
          <span>{registrationLabel}</span>
          <span aria-hidden="true" className={styles.courseNavCtaArrow}>→</span>
        </a>
      </div>
    </nav>
  );
}
