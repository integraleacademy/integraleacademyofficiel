'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import styles from './HomeHeroIllustrations.module.css';

const scenes = [
  { label: 'Sécurité', image: 'aps-atelier-radio', alt: 'Des stagiaires en sécurité privée s’entraînent à communiquer par radio.' },
  { label: 'VTC', image: 'vtc-parcours', alt: 'Une stagiaire prépare son véhicule avec son formateur VTC.' },
  { label: 'BTS', image: 'bts-ndrc-parcours', alt: 'Des étudiants en BTS construisent un projet en équipe.' },
];

export function HomeHeroIllustrations() {
  const carouselId = useId();
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [quietMode, setQuietMode] = useState(true);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    const syncPreferences = () => setQuietMode(motion.matches || Boolean(connection?.saveData));
    const syncVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .35), { threshold: [0, .35] });
    observer.observe(element);
    syncPreferences();
    syncVisibility();
    motion.addEventListener('change', syncPreferences);
    connection?.addEventListener('change', syncPreferences);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', syncPreferences);
      connection?.removeEventListener('change', syncPreferences);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  const running = visible && pageVisible && !paused && !hovered && !quietMode;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setCurrent(index => (index + 1) % scenes.length), 6000);
    return () => window.clearTimeout(timer);
  }, [current, running]);

  function selectScene(index: number) {
    setPaused(true);
    setCurrent(index);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % scenes.length;
    else if (event.key === 'ArrowLeft') next = (index + scenes.length - 1) % scenes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = scenes.length - 1;
    else return;
    event.preventDefault();
    selectScene(next);
    tabs.current[next]?.focus();
  }

  return (
    <div
      ref={root}
      className={styles.carousel}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Nos univers de formation"
      data-motion={quietMode ? 'reduced' : 'full'}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={event => { if (!(event.target as Element).closest('[data-rotation-control]')) setPaused(true); }}
    >
      <div className={styles.stage} aria-live={running ? 'off' : 'polite'}>
        {scenes.map((scene, index) => (
          <figure
            key={scene.label}
            id={`${carouselId}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${carouselId}-tab-${index}`}
            aria-hidden={index !== current}
            inert={index !== current}
            data-current={index === current}
            className={styles.scene}
          >
            <Image
              src={`/images/formation-scenes-manuel/${scene.image}.webp`}
              alt={scene.alt}
              width={1536}
              height={1024}
              sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1320px) 50vw, 640px"
              priority={index === 0}
              loading={index === 0 ? undefined : 'eager'}
              draggable={false}
            />
          </figure>
        ))}
      </div>
      <div className={styles.navigation}>
        <div className={styles.tabs} role="tablist" aria-label="Choisir un univers de formation">
          {scenes.map((scene, index) => (
            <button
              key={scene.label}
              ref={element => { tabs.current[index] = element; }}
              id={`${carouselId}-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={index === current}
              aria-controls={`${carouselId}-panel-${index}`}
              tabIndex={index === current ? 0 : -1}
              onClick={() => selectScene(index)}
              onKeyDown={event => handleTabKeyDown(event, index)}
            >{scene.label}</button>
          ))}
        </div>
        {!quietMode && <button
          type="button"
          className={styles.motion}
          data-rotation-control
          aria-label={paused ? 'Reprendre le défilement des illustrations' : 'Mettre le défilement des illustrations en pause'}
          title={paused ? 'Reprendre le défilement' : 'Mettre en pause'}
          onClick={() => setPaused(value => !value)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{paused
            ? <path d="m9 5 10 7-10 7V5Z" fill="currentColor" />
            : <path d="M9 6v12M15 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}</svg>
        </button>}
      </div>
    </div>
  );
}
