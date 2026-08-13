'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from 'react';
import { appointmentFormUrl } from '@/components/ui';
import styles from './GlobalContactCTA.module.css';

const hiddenPathPrefixes = ['/admin', '/login', '/connexion', '/espace', '/mon-compte', '/dashboard'];

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true"><path d="M7 3v3M17 3v3M4.5 9.2h15M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"/></svg>;
}

function PhoneIcon({ className = 'h-5 w-5 shrink-0' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M7.2 4.6 9 4.1c.8-.2 1.6.2 1.9.9l.9 2.1c.3.7.1 1.5-.5 2l-.9.7a10.8 10.8 0 0 0 3.8 3.8l.7-.9c.5-.6 1.3-.8 2-.5l2.1.9c.7.3 1.1 1.1.9 1.9l-.5 1.8c-.2.8-.9 1.3-1.7 1.3A13.7 13.7 0 0 1 5.9 6.3c0-.8.5-1.5 1.3-1.7Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true"><path d="m4.5 10.4 3.2 3.1 7.8-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4"/></svg>;
}

function SparkleIcon() {
  return <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true"><path d="M10 2.5 11.3 7 16 8.4l-4.7 1.3L10 14.5 8.7 9.7 4 8.4 8.7 7 10 2.5Z" fill="currentColor"/><path d="m15.5 13 .5 1.8 1.8.5-1.8.5-.5 1.7-.5-1.7-1.8-.5 1.8-.5.5-1.8Z" fill="currentColor" opacity=".65"/></svg>;
}

export function GlobalContactCTA() {
  const pathname = usePathname();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.24 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function updateSpotlight(event: MouseEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 1023px)').matches) {
      return;
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }

    const currentTarget = event.currentTarget;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    frameRef.current = window.requestAnimationFrame(() => {
      currentTarget.style.setProperty('--spotlight-x', `${x}%`);
      currentTarget.style.setProperty('--spotlight-y', `${y}%`);
    });
  }

  if (pathname === '/' || hiddenPathPrefixes.some((prefix) => pathname?.startsWith(prefix))) {
    return null;
  }

  return (
    <section className="px-4 py-10 sm:py-12 md:py-16" aria-labelledby="global-contact-cta-title">
      <div className="page-container">
        <div ref={shellRef} onMouseMove={updateSpotlight} className={`${styles.shell} ${isVisible ? styles.shellVisible : ''}`}>
          <div className={styles.inner}>
            <span className={styles.haloPrimary} aria-hidden="true" />
            <span className={styles.haloSecondary} aria-hidden="true" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(350px,.75fr)] lg:items-center">
              <div className="max-w-3xl">
                <span className={`${styles.badge} ${styles.revealItem}`} style={{ '--delay': '80ms' } as CSSProperties}>
                  <SparkleIcon />
                  Une question sur votre projet ?
                </span>
                <h2 id="global-contact-cta-title" className={`${styles.title} ${styles.revealItem}`} style={{ '--delay': '180ms' } as CSSProperties}>
                  Faites le <span className={styles.highlight}>premier pas</span> vers votre futur métier.
                </h2>
                <p className={`${styles.revealItem} mt-5 max-w-2xl text-base font-medium leading-8 text-academy-muted sm:text-lg`} style={{ '--delay': '280ms' } as CSSProperties}>
                  Notre équipe vous accompagne pour choisir la formation adaptée à votre projet et vous aider à concrétiser votre avenir professionnel.
                </p>
              </div>

              <div className={`${styles.contactCard} ${styles.revealItem}`} style={{ '--delay': '380ms' } as CSSProperties}>
                <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
                  <div className={styles.memojiWrap}>
                    <img
                      src="/images/cassandre-memoji.png"
                      alt="Memoji détouré de Cassandre, responsable commerciale d’Intégrale Academy"
                      className={styles.memoji}
                      width="190"
                      height="190"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 pt-1 sm:pt-2">
                    <p className="text-xs font-black uppercase tracking-[.18em] text-academy-gold-strong">Contactez Cassandre</p>
                    <h3 className="mt-2 text-3xl font-black leading-tight text-academy-ink">Cassandre</h3>
                    <p className="mt-2 max-w-xs text-sm font-bold leading-6 text-academy-muted">Responsable commerciale — Intégrale Academy</p>
                    <a href="tel:+33422470768" className={`${styles.phoneLink} mt-4`}>
                      <PhoneIcon className="h-4 w-4 shrink-0 text-academy-gold-strong" />
                      04 22 47 07 68
                    </a>
                  </div>
                </div>

                <div className={`${styles.revealItem} mt-6 grid gap-3 xl:grid-cols-[1.18fr_.82fr]`} style={{ '--delay': '480ms' } as CSSProperties}>
                  <Link href={appointmentFormUrl} className={`${styles.primaryButton} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-gold`}>
                    <CalendarIcon />
                    <span className={styles.longLabel}>Réserver un rendez-vous téléphonique</span>
                    <span className={styles.shortLabel}>Réserver un rendez-vous</span>
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </Link>
                  <a href="tel:+33422470768" className={`${styles.secondaryButton} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-gold`}>
                    <PhoneIcon />
                    Appeler Cassandre
                  </a>
                </div>

                <p className={`${styles.assurance} ${styles.revealItem} mt-4`} style={{ '--delay': '580ms' } as CSSProperties}>
                  <CheckIcon />
                  Échange gratuit et sans engagement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
