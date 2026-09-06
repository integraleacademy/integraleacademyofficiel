'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './ApsReferencePage.module.css';

const sectionItems = [
  { index: '01', label: 'Métier', href: '#metier' },
  { index: '02', label: 'Admission', href: '#admission' },
  { index: '03', label: 'Format hybride', href: '#hybride' },
  { index: '04', label: 'Pratique', href: '#pratique' },
  { index: '05', label: 'Programme', href: '#programme' },
  { index: '06', label: 'Examen', href: '#examen' },
  { index: '07', label: 'Dates & tarifs', href: '#dates-tarifs' },
  { index: '08', label: 'Inscription', href: '#inscription-financement' },
  { index: '09', label: 'Débouchés', href: '#debouches' },
  { index: '10', label: 'FAQ', href: '#faq-aps' },
] as const;

export function ApsSectionNavigation({ registrationHref }: { registrationHref: string }) {
  const [activeHref, setActiveHref] = useState<string>('#metier');
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateFromHash = () => {
      if (sectionItems.some((item) => item.href === window.location.hash)) {
        setActiveHref(window.location.hash);
      }
    };

    const sections = sectionItems
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
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeLink = scroller?.querySelector<HTMLElement>(`[data-section="${activeHref.slice(1)}"]`);
    if (!scroller || !activeLink) return;

    const targetLeft = activeLink.offsetLeft - (scroller.clientWidth - activeLink.offsetWidth) / 2;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollTo({ left: Math.max(0, targetLeft), behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [activeHref]);

  return (
    <nav aria-label="Sommaire de la formation" className={styles.courseNav}>
      <div className={`${styles.courseNavShell} page-container`}>
        <a href="#metier" className={styles.courseNavIdentity} onClick={() => setActiveHref('#metier')}>
          <span className={styles.courseNavMark}>APS</span>
          <span className={styles.courseNavIdentityCopy}>
            <span className={styles.courseNavKicker}>Votre formation</span>
            <strong className={styles.courseNavTitle}>TFP APS</strong>
          </span>
        </a>

        <div ref={scrollerRef} className={styles.courseNavScroller}>
          <div className={styles.courseNavLinks}>
            {sectionItems.map((item) => {
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
                  <span className={styles.courseNavIndex}>{item.index}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <Link href={registrationHref} className={styles.courseNavCta}>
          <span>Je m’inscris</span>
          <span aria-hidden="true" className={styles.courseNavCtaArrow}>→</span>
        </Link>
      </div>
    </nav>
  );
}
