'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styles from './AnimatedTrainingCTA.module.css';

const ROTATION_DELAY_MS = 2800;

const aspirations = [
  { prefix: 'Vous souhaitez devenir…', emphasis: 'agent de sécurité privée ?' },
  { prefix: 'Vous souhaitez devenir…', emphasis: 'agent de protection rapprochée ?' },
  { prefix: 'Vous souhaitez devenir…', emphasis: 'agent de sécurité incendie ?' },
  { prefix: 'Vous souhaitez devenir…', emphasis: 'dirigeant d’une entreprise de sécurité ?' },
  { prefix: 'Vous souhaitez', emphasis: 'financer votre formation ?' },
];

export function AnimatedTrainingCTA() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeAspiration = aspirations[activeIndex];
  const fullSentence = `${activeAspiration.prefix} ${activeAspiration.emphasis}`;

  const reducedMotionText = useMemo(
    () => aspirations.map((item) => `${item.prefix} ${item.emphasis}`).join(' '),
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % aspirations.length);
    }, ROTATION_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#061f2f] px-4 py-16 text-white sm:py-20 lg:min-h-[460px] lg:py-24"
      aria-labelledby="animated-training-cta-title"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(35,129,148,.55),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(235,184,72,.18),transparent_26%),linear-gradient(135deg,#041723_0%,#0a3140_52%,#03131e_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:54px_54px]" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 -z-10 h-40 w-[34rem] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center text-center lg:min-h-[280px]">
        <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/80 sm:text-sm">
          FORMEZ-VOUS AUX MÉTIERS DE LA SÉCURITÉ
        </p>

        <h2
          id="animated-training-cta-title"
          className="mt-6 max-w-5xl text-balance text-4xl font-black leading-[1.04] tracking-[-.05em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="sr-only">{reduceMotion ? reducedMotionText : fullSentence}</span>
          <span aria-hidden="true" className="block min-h-[7.8rem] sm:min-h-[8.6rem] md:min-h-[9.4rem] lg:min-h-[10rem]">
            <span className="block text-white/95">{activeAspiration.prefix}</span>
            <span key={fullSentence} className={`${styles.rotatingText} mt-2 block bg-gradient-to-r from-white via-cyan-100 to-amber-100 bg-clip-text text-transparent`}>
              {activeAspiration.emphasis}
            </span>
          </span>
        </h2>

        <Link
          href="/contact"
          className={`${styles.cta} mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black text-[#062233] shadow-[0_20px_60px_rgba(0,0,0,.28)] transition hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-[0_24px_70px_rgba(0,0,0,.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none sm:text-base`}
        >
          Parler à un conseiller <span className={`${styles.arrow} ml-3`} aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
