'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './TrainingJourney.module.css';

export type TrainingJourneyStep = {
  label: string;
  title: string;
  description: string;
  link: string;
  href: string;
  visual: ReactNode;
};

export type TrainingJourneyTheme = 'orange' | 'blue' | 'green' | 'red' | 'violet' | 'bts';

type TrainingJourneyProps = {
  id: string;
  name: string;
  eyebrow: string;
  title: ReactNode;
  steps: readonly TrainingJourneyStep[];
  shortcut: { href: string; label: string; ariaLabel: string };
  closingNote: string;
  theme?: TrainingJourneyTheme;
};

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function TrainingJourney({ id, name, eyebrow, title, steps, shortcut, closingNote, theme = 'orange' }: TrainingJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
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
    window.scrollTo({ top: bounds.start + (bounds.end - bounds.start) * ((index + 0.35) / steps.length), behavior: 'smooth' });
  }, [getBounds, steps.length]);

  useEffect(() => {
    // The layout also checks its actual content height below: zoomed text and
    // smaller screens must remain readable, rather than being squeezed to fit.
    const media = window.matchMedia('(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)');
    const sync = () => setEnhanced(media.matches);
    sync();
    media.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
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

    const fits = () => {
      const stageBox = stage.getBoundingClientRect();
      const intro = stage.querySelector<HTMLElement>(`.${styles.intro}`);
      const introBottom = intro?.getBoundingClientRect().bottom ?? stageBox.top;
      return [...stage.querySelectorAll<HTMLElement>(`.${styles.visualInner} > *, .${styles.copy}`)].every(element => {
        const box = element.getBoundingClientRect();
        // Oversized decorative rings intentionally extend beyond the card.
        // Measure the reading flow, not their contribution to scrollHeight.
        const contentFits = [...element.children].every(child => {
          if (getComputedStyle(child).position === 'absolute') return true;
          const childBox = child.getBoundingClientRect();
          return childBox.top >= box.top - 2 && childBox.bottom <= box.bottom + 2
            && childBox.left >= box.left - 2 && childBox.right <= box.right + 2;
        });
        return contentFits
          && box.top >= stageBox.top - 2 && box.bottom <= stageBox.bottom + 2
          && (!element.classList.contains(styles.copy) || box.top >= introBottom - 2);
      });
    };

    const update = () => {
      frame = 0;
      if (measureNeeded) {
        measureNeeded = false;
        bounds = getBounds();
        if (!fits()) {
          setEnhanced(false);
          return;
        }
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
    };
  }, [enhanced, getBounds, steps.length]);

  function goTo(index: number) {
    if (!enhanced) return;
    scrollToStep(index);
  }

  return (
    <section id={id} ref={sectionRef} className={styles.journey} data-enhanced={enhanced} data-theme={theme} aria-labelledby={`${id}-title`}>
      <div ref={stageRef} className={styles.stage}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <nav className={styles.navigation} aria-label={`Étapes du parcours ${name}`}>
            {steps.map((step, index) => <button key={step.label} type="button" aria-label={`Étape ${index + 1} : ${step.label}`} aria-current={index === active ? 'step' : undefined} onClick={() => goTo(index)}><span>0{index + 1}</span></button>)}
            <a href={shortcut.href} aria-label={shortcut.ariaLabel}>{shortcut.label} <Arrow /></a>
          </nav>
          <div className={styles.scrollProgress} aria-hidden="true"><span ref={progressRef} /></div>
        </header>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.label} className={styles.step} data-current={index === active} inert={enhanced && index !== active ? true : undefined}>
              <div className={styles.copy}>
                <div className={styles.stepHeading}><span className={styles.stepNumber}>0{index + 1}</span><span>{step.label}</span></div>
                <h3>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                <Link href={step.href} className={styles.link}>{step.link}<Arrow /></Link>
                {index < steps.length - 1 ? <button type="button" className={styles.next} onClick={() => goTo(index + 1)}><span>0{index + 2}</span><span>{steps[index + 1].label}</span><Arrow /></button> : <span className={styles.lastStep}>{closingNote}</span>}
              </div>
              <div className={styles.visual} data-scene={index}>
                <div className={styles.visualInner}>{step.visual}</div>
                <span className={styles.visualCounter} aria-hidden="true">0{index + 1} / {String(steps.length).padStart(2, '0')}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
