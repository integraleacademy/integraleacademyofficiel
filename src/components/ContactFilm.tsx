'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './ContactFilm.module.css';

type Scene = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  alt: string;
  duration: number;
};

const scenes: Scene[] = [
  { id: 'intro', label: 'Votre avenir', eyebrow: 'INTÉGRALE ACADEMY', title: 'Faites le premier pas', accent: 'vers votre futur métier.', description: 'Un projet qui vous ressemble. Des métiers concrets.', image: 'aps-arrivee', alt: 'Illustration de l’accueil des futurs stagiaires à Intégrale Academy', duration: 5500 },
  { id: 'aps', label: 'APS', eyebrow: 'PRÉVENTION & SÉCURITÉ', title: 'Sécurité', accent: 'privée.', description: 'Observer, prévenir, protéger.', image: 'aps-atelier-radio', alt: 'Stagiaires en sécurité privée lors d’un exercice de communication radio', duration: 4000 },
  { id: 'a3p', label: 'A3P', eyebrow: 'PROTECTION DES PERSONNES', title: 'Protection', accent: 'rapprochée.', description: 'Anticiper, accompagner, sécuriser.', image: 'a3p-mission-ensemble', alt: 'Équipe de protection rapprochée en situation professionnelle', duration: 4000 },
  { id: 'ssiap', label: 'SSIAP', eyebrow: 'SÉCURITÉ INCENDIE', title: 'Sécurité', accent: 'incendie.', description: 'Prévenir, intervenir, assister.', image: 'ssiap-1-galerie-ssi', alt: 'Agents de sécurité incendie autour du système de sécurité incendie', duration: 4000 },
  { id: 'desp', label: 'DESP', eyebrow: 'DIRECTION & ENTREPRISE', title: 'Diriger', accent: 'en sécurité privée.', description: 'Organiser, piloter, entreprendre.', image: 'desp-initial-mission', alt: 'Dirigeants préparant l’organisation d’une mission de sécurité privée', duration: 4000 },
  { id: 'vtc', label: 'VTC', eyebrow: 'CHAUFFEUR PROFESSIONNEL', title: 'Transport', accent: 'de personnes.', description: 'Accueillir, conduire, accompagner.', image: 'vtc-parcours', alt: 'Chauffeur VTC accueillant un passager près de son véhicule', duration: 4000 },
  { id: 'bts', label: 'BTS', eyebrow: 'ÉTUDES & ENTREPRISE', title: 'Apprendre', accent: 'en alternance.', description: 'Se former, pratiquer, évoluer.', image: 'bts-ndrc-parcours', alt: 'Étudiants en BTS travaillant ensemble sur un projet professionnel', duration: 4000 },
  { id: 'projet', label: 'Votre projet', eyebrow: 'À VOS CÔTÉS, DÈS LE DÉPART', title: 'Votre projet.', accent: 'Notre accompagnement.', description: 'Un premier échange pour avancer.', image: 'desp-vae-accompagnement', alt: 'Un conseiller accompagne un candidat dans son projet de formation', duration: 5500 },
  { id: 'avenir', label: 'Premier pas', eyebrow: 'ET SI L’ON EN PARLAIT ?', title: 'Faites le premier pas', accent: 'vers votre futur métier.', description: 'Un premier échange gratuit et sans engagement.', image: 'aps-arrivee', alt: 'Bienvenue à Intégrale Academy', duration: 7000 },
];

// A responsive part of the page, with no media player or video download.
export function ContactFilm() {
  const section = useRef<HTMLElement>(null);
  const remaining = useRef(scenes[0].duration);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [quietMode, setQuietMode] = useState(true);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    const syncPreferences = () => setQuietMode(motion.matches || Boolean(connection?.saveData));
    const syncVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2), { threshold: [0, 0.2] });
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

  const running = visible && pageVisible && !paused && !quietMode;
  useEffect(() => {
    if (!running) return;
    const started = performance.now();
    let advanced = false;
    const timer = window.setTimeout(() => {
      advanced = true;
      const next = (current + 1) % scenes.length;
      remaining.current = scenes[next].duration;
      setCurrent(next);
    }, remaining.current);
    return () => {
      window.clearTimeout(timer);
      if (!advanced) remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [current, running]);

  function selectScene(index: number) {
    setPaused(true);
    setCurrent(index);
    remaining.current = scenes[index].duration;
  }

  function toggleMotion() {
    if (paused) remaining.current = scenes[current].duration;
    setPaused(value => !value);
  }

  return (
    <section
      ref={section}
      className={styles.section}
      aria-label="Faites le premier pas vers votre futur métier"
      aria-roledescription="présentation"
    >
      <div className={styles.container}>
        <div className={styles.stage} aria-live="off" data-motion={quietMode ? 'reduced' : 'full'}>
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              id={`contact-scene-${scene.id}`}
              className={`${styles.scene} ${scene.id === 'projet' ? styles.support : ''}`}
              data-current={index === current}
              aria-hidden={index !== current}
              inert={index !== current}
              role="group"
              aria-label={scene.label}
            >
              <div className={styles.copy}>
                <p className={styles.eyebrow}><span aria-hidden="true" />{scene.eyebrow}</p>
                <h2 className={styles.title}>{scene.title}<em>{scene.accent}</em></h2>
                {scene.id === 'projet' ? (
                  <ol className={styles.steps}>
                    <li><span>01</span>Choisir votre formation.</li>
                    <li><span>02</span>Étudier votre financement.</li>
                    <li><span>03</span>Préparer votre admission.</li>
                  </ol>
                ) : <p className={styles.description}>{scene.description}</p>}
              </div>
              <figure className={styles.artwork}>
                <Image src={`/images/formation-scenes-manuel/${scene.image}.webp`} alt={scene.alt} width={1536} height={1024} sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1440px) 52vw, 690px" loading="lazy" />
              </figure>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <nav className={styles.chapters} aria-label="Explorer les métiers">
            <button type="button" onClick={() => selectScene(0)} aria-current={current === 0 || current === 8 ? 'step' : undefined} aria-controls="contact-scene-intro">Votre avenir</button>
            {scenes.slice(1, 7).map((scene, index) => (
              <button type="button" key={scene.id} onClick={() => selectScene(index + 1)} aria-current={current === index + 1 ? 'step' : undefined} aria-controls={`contact-scene-${scene.id}`}>{scene.label}</button>
            ))}
            <button type="button" onClick={() => selectScene(7)} aria-current={current === 7 ? 'step' : undefined} aria-controls="contact-scene-projet">Votre projet</button>
          </nav>
          <a href="#demande" className={styles.contact}>Parlons de votre projet <span aria-hidden="true">↗</span></a>
        </div>
        {!quietMode && <button type="button" className={styles.motion} onClick={toggleMotion}>{paused ? 'Reprendre l’animation' : 'Mettre l’animation en pause'}</button>}
      </div>
    </section>
  );
}
