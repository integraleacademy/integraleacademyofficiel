'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './HomeHeroIllustrations.module.css';

const scenes = [
  {
    label: 'Sécurité privée', href: '#formations-securite',
    title: 'Protéger. Intervenir. Évoluer.',
    description: 'Sécurité privée, incendie, protection rapprochée ou direction : trouvez votre parcours.',
    action: 'Découvrir les formations en sécurité',
    image: 'aps-atelier-radio', alt: 'Des stagiaires en sécurité privée s’entraînent à communiquer par radio.',
  },
  {
    label: 'Chauffeur VTC', href: '#formation-vtc',
    title: 'Prenez le volant de votre avenir.',
    description: 'De la théorie à la conduite, préparez votre examen VTC avec une formule tout inclus.',
    action: 'Découvrir la formation VTC',
    image: 'vtc-parcours', alt: 'Une stagiaire prépare son véhicule avec son formateur VTC.',
  },
  {
    label: 'BTS en alternance', href: '#bts',
    title: 'Un diplôme. De l’expérience.',
    description: 'Choisissez parmi 6 BTS et construisez votre avenir entre cours et entreprise.',
    action: 'Découvrir les BTS en alternance',
    image: 'bts-campus-etudiante', alt: 'Une étudiante en BTS, en jean et sweat, présente son projet avec son formateur.',
  },
];

export function HomeHeroIllustrations() {
  const root = useRef<HTMLDivElement>(null);
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

  function moveScene(direction: number) {
    setPaused(true);
    setCurrent(index => (index + direction + scenes.length) % scenes.length);
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
      <div className={styles.stage}>
        <div className={styles.scenes} aria-live={running ? 'off' : 'polite'}>
          {scenes.map((scene, index) => (
            <article
              key={scene.label}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${index + 1} sur ${scenes.length} : ${scene.label}`}
              aria-hidden={index !== current}
              inert={index !== current}
              data-current={index === current}
              className={styles.scene}
            >
              <a href={scene.href} className={styles.sceneLink} aria-label={scene.action} onClick={() => setPaused(true)}>
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
                <div className={styles.sceneContent}>
                  <span className={styles.sceneLabel}>{scene.label}</span>
                  <h2>{scene.title}</h2>
                  <p>{scene.description}</p>
                  <span className={styles.sceneAction}>{scene.action} <span aria-hidden="true">→</span></span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className={styles.controls} aria-label="Parcourir les univers de formation" role="group">
          <span className={styles.counter} aria-hidden="true">0{current + 1} / 03</span>
          <button type="button" aria-label="Univers précédent" onClick={() => moveScene(-1)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <button type="button" aria-label="Univers suivant" onClick={() => moveScene(1)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          {!quietMode && <button
            type="button"
            data-rotation-control
            aria-label={paused ? 'Reprendre le défilement des univers' : 'Mettre le défilement des univers en pause'}
            title={paused ? 'Reprendre le défilement' : 'Mettre en pause'}
            onClick={() => setPaused(value => !value)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{paused
              ? <path d="m9 5 10 7-10 7V5Z" fill="currentColor" />
              : <path d="M9 6v12M15 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}</svg>
          </button>}
        </div>
      </div>
      <nav className={styles.navigation} aria-label="Accès direct aux formations">
        {scenes.map((scene, index) => (
          <a key={scene.label} href={scene.href} data-active={index === current} onClick={() => { setCurrent(index); setPaused(true); }}>
            {scene.label} <span aria-hidden="true">↓</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
