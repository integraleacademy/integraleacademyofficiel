'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './TrainingJourney.module.css';

export type TrainingJourneyStep = {
  label: string;
  title: string;
  description: string;
  link: string;
  href: string;
  visual: (onNext: () => void) => ReactNode;
};

export type TrainingJourneyTheme = 'orange' | 'blue' | 'green' | 'red' | 'violet' | 'bts';

type TrainingJourneyProps = {
  id: string;
  name: string;
  eyebrow: string;
  title: ReactNode;
  steps: readonly TrainingJourneyStep[];
  continuationHref?: string;
  theme?: TrainingJourneyTheme;
};

function Arrow({ down = false }: { down?: boolean }) {
  return <svg className={down ? styles.downArrow : undefined} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={down ? 'M12 4v15m-6-6 6 6 6-6' : 'M4 12h15m-6-6 6 6-6 6'} strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function TrainingJourney({ id, name, eyebrow, title, steps, continuationHref, theme = 'orange' }: TrainingJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const pendingFocusRef = useRef<number | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);

  const getBounds = useCallback(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return null;
    const rect = section.getBoundingClientRect();
    const top = parseFloat(getComputedStyle(stage).top) || 0;
    const start = window.scrollY + rect.top - top;
    return { start, end: start + rect.height - stage.offsetHeight };
  }, []);

  const scrollToStep = useCallback((index: number) => {
    const bounds = getBounds();
    if (!bounds) return;
    // Explicit navigation follows the same positions as native scrolling.
    window.scrollTo({
      top: bounds.start + (bounds.end - bounds.start) * ((index + 0.35) / steps.length),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }, [getBounds, steps.length]);

  useEffect(() => {
    // Desktop always presents one step at a time. Height and motion preferences
    // must not silently turn the journey back into four stacked cards.
    const media = window.matchMedia('(min-width: 1024px)');
    const sync = () => setEnhanced(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    let frame = 0;
    let bounds = getBounds();
    let measureNeeded = true;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const update = () => {
      frame = 0;
      if (measureNeeded) {
        measureNeeded = false;
        // The grid reserves the largest card/copy, including hidden steps.
        // If text needs more room, let the entire stage grow and scroll with
        // the document instead of clipping content or disabling the journey.
        const stageHeight = `${Math.ceil(stage.getBoundingClientRect().height)}px`;
        if (section.style.getPropertyValue('--journey-stage-height') !== stageHeight) {
          section.style.setProperty('--journey-stage-height', stageHeight);
        }
        bounds = getBounds();
      }
      if (!bounds) return;
      const distance = Math.max(1, bounds.end - bounds.start);
      const position = window.scrollY - bounds.start;
      const progress = Math.max(0, Math.min(1, position / distance));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive(previous => {
        // A small spatial margin prevents boundary flicker. No wheel handling,
        // forced scroll position, cooldown or artificial scrolling speed.
        const stepDistance = distance / steps.length;
        if (next > previous && position < (previous + 1) * stepDistance + 12) return previous;
        if (next < previous && position > previous * stepDistance - 12) return previous;
        return next;
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const measure = () => { measureNeeded = true; schedule(); };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    observer.observe(stage);
    stage.querySelectorAll<HTMLElement>(`.${styles.visualInner} > *, .${styles.copy}`).forEach(element => observer.observe(element));
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      section.style.removeProperty('--journey-stage-height');
    };
  }, [enhanced, getBounds, steps.length]);

  useEffect(() => {
    if (pendingFocusRef.current !== active) return;
    headingRefs.current[active]?.focus({ preventScroll: true });
    pendingFocusRef.current = null;
  }, [active]);

  function goTo(index: number) {
    if (!enhanced) {
      headingRefs.current[index]?.closest('li')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
      headingRefs.current[index]?.focus({ preventScroll: true });
      return;
    }
    if (index !== active) pendingFocusRef.current = index;
    scrollToStep(index);
  }

  return (
    <><section id={id} ref={sectionRef} className={styles.journey} data-enhanced={enhanced} data-theme={theme} data-navigation-only="true" data-visual-format="landscape" aria-labelledby={`${id}-title`}>
      <div ref={stageRef} className={styles.stage}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <nav className={styles.navigation} aria-label={`Étapes du parcours ${name}`}>
            {steps.map((step, index) => <button key={step.label} type="button" aria-label={`Étape ${index + 1} : ${step.label}`} aria-current={index === active ? 'step' : undefined} onClick={() => goTo(index)}><span>0{index + 1}</span></button>)}
          </nav>
          <div className={styles.scrollProgress} aria-hidden="true"><span ref={progressRef} /></div>
        </header>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.label} className={styles.step} data-current={index === active} inert={enhanced && index !== active ? true : undefined}>
              <div className={styles.copy}>
                <div className={styles.stepHeading}><span className={styles.stepNumber}>0{index + 1}</span><span>{step.label}</span></div>
                <h3 ref={element => { headingRefs.current[index] = element; }} tabIndex={-1}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                {index < steps.length - 1 ? (
                  <button type="button" className={`${styles.link} ${styles.continueButton}`} onClick={() => goTo(index + 1)} aria-label={`Étape suivante : ${steps[index + 1].label}`}>
                    Étape suivante<Arrow />
                  </button>
                ) : <a href={continuationHref ?? `#${id}-suite`} className={`${styles.link} ${styles.continueButton}`}>Découvrir la suite<Arrow down /></a>}
              </div>
              <div className={styles.visual} data-scene={index}>
                <div className={styles.visualInner}>{step.visual(() => goTo(Math.min(index + 1, steps.length - 1)))}</div>
                <span className={styles.visualCounter} aria-hidden="true">0{index + 1} / {String(steps.length).padStart(2, '0')}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
    {!continuationHref && <div id={`${id}-suite`} className={styles.continuationTarget} />}</>
  );
}
