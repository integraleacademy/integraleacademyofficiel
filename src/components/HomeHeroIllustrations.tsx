'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { upcomingFamilies } from '@/data/upcoming-trainings';
import styles from './HomeHeroIllustrations.module.css';

const familyScenes = {
  bachelors: { image: '/images/bts/mos-unifie-2026/manager.webp', alt: 'Un responsable de sécurité organise le travail de son équipe.' },
  masteres: { image: '/images/accueil-formations/masteres-ia.webp', alt: 'Deux spécialistes testent un assistant documentaire dans un atelier d’intelligence artificielle.' },
  'titres-professionnels': { image: '/images/accueil-formations/titres-professionnels.webp', alt: 'Une chargée d’accueil reçoit un visiteur pendant qu’une collègue traite les dossiers du service.' },
};

const scenes = [
  {
    label: 'Sécurité privée', href: '#formations-securite',
    title: 'Protéger, intervenir et évoluer',
    description: 'Sécurité privée, sécurité incendie, protection rapprochée, direction d’une entreprise de sécurité.',
    action: 'Découvrez nos formations métiers de la sécurité privée',
    image: '/images/formation-scenes-manuel/aps-atelier-radio.webp', alt: 'Des stagiaires en sécurité privée s’entraînent à communiquer par radio.',
  },
  {
    label: 'Chauffeur VTC', href: '#formation-vtc',
    title: 'Prenez le volant de votre avenir',
    description: 'De la théorie à la conduite, préparez votre examen VTC avec notre formation tout inclus.',
    action: 'Découvrir la formation chauffeur VTC',
    image: '/images/formation-scenes-manuel/vtc-parcours.webp', alt: 'Une stagiaire prépare son véhicule avec son formateur VTC.',
  },
  {
    label: 'BTS en alternance', href: '#bts',
    title: 'Un diplôme officiel et de l’expérience',
    description: 'Découvrez nos six BTS en alternance et construisez votre avenir.',
    action: 'Découvrir nos BTS en alternance',
    image: '/images/formation-scenes-manuel/bts-campus-mixte.webp?v=manuel-aps-4', alt: 'Une étudiante et un étudiant en BTS préparent ensemble un projet en classe.',
  },
  ...upcomingFamilies.map(family => ({
    label: family.label, href: `#${family.id}`,
    title: { bachelors: 'Enquêter ou diriger une équipe de sécurité', masteres: 'Concevoir des produits et des applications IA', 'titres-professionnels': 'Apprendre un métier en alternance' }[family.id],
    description: { bachelors: 'Deux bachelors pour travailler dans le renseignement sur les cybermenaces ou le management de la sécurité.', masteres: 'Deux parcours à Paris et à Puget-sur-Argens, du pilotage de produit à l’ingénierie de l’IA générative.', 'titres-professionnels': 'Paie, ressources humaines, secrétariat médical, accueil et vidéoprotection.' }[family.id],
    action: `Découvrir nos ${family.label.toLowerCase()}`,
    ...familyScenes[family.id],
  })),
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

  const [visited, setVisited] = useState<number[]>([0]);
  useEffect(() => {
    setVisited(previous => previous.includes(current) ? previous : [...previous, current]);
  }, [current]);

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
                {(index === current || visited.includes(index)) && <Image
                  src={scene.image}
                  alt={scene.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1320px) 50vw, 640px"
                  priority={index === 0}
                  loading={index === 0 ? undefined : 'lazy'}
                  draggable={false}
                />}
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
          <span className={styles.counter} aria-hidden="true">{String(current + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
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
