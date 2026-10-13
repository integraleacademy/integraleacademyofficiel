'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ContactFilm.module.css';

const filmSrc = '/videos/contact-integrale-academy-v4.mp4';

export function ContactFilm() {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const engaged = useRef(false);
  const manualPause = useRef(false);
  const [watching, setWatching] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const media = video.current;
    const element = frame.current;
    if (!media || !element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;

    const syncPlayback = () => {
      if (engaged.current) {
        if (document.hidden) media.pause();
        return;
      }
      if (!visible || document.hidden || motion.matches || connection?.saveData || manualPause.current) {
        media.pause();
        return;
      }
      if (!media.getAttribute('src')) media.src = filmSrc;
      media.muted = true;
      media.play().catch(() => { /* The play button remains available if autoplay is blocked. */ });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.2 });
    observer.observe(element);
    document.addEventListener('visibilitychange', syncPlayback);
    motion.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      motion.removeEventListener('change', syncPlayback);
      media.pause();
    };
  }, []);

  async function watch() {
    const media = video.current;
    if (!media) return;
    engaged.current = true;
    manualPause.current = false;
    setWatching(true);
    setEnded(false);
    setFailed(false);
    if (!media.getAttribute('src')) media.src = filmSrc;
    media.loop = false;
    media.muted = true;
    media.controls = true;
    media.currentTime = 0;
    try { await media.play(); }
    catch { /* Native controls provide a second play action on restrictive browsers. */ }
  }

  function togglePreview() {
    const media = video.current;
    if (!media) return;
    if (!media.getAttribute('src')) media.src = filmSrc;
    media.muted = true;
    manualPause.current = !media.paused;
    if (media.paused) media.play().catch(() => {});
    else media.pause();
  }

  return (
    <section className={styles.section} aria-label="Votre projet de formation en vidéo">
      <div className={styles.container}>
        <div className={styles.frame} ref={frame}>
          <video
            ref={video}
            className={styles.video}
            poster="/videos/contact-integrale-academy-v4-poster.webp"
            width="1920"
            height="1080"
            muted
            loop={!watching}
            playsInline
            preload="none"
            controls={watching && !ended}
            aria-label="Intégrale Academy : des métiers concrets, un projet qui vous ressemble"
            aria-describedby="contact-film-transcript"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => { setEnded(true); setPlaying(false); }}
            onError={() => setFailed(true)}
          />
          {(!watching || ended) && !failed && <>
            <button type="button" className={styles.watch} onClick={watch}>
              <span className={styles.playIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7V5Z" /></svg></span>
              <span>{ended ? 'Revoir le film' : 'Voir le film'}</span>
              <span className={styles.duration}>34 s</span>
            </button>
            {!ended && playing && <button type="button" className={styles.pause} onClick={togglePreview} aria-label="Mettre l’aperçu vidéo en pause"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zm7 0h3v14h-3z" /></svg></button>}
            {!ended && !playing && <button type="button" className={styles.pause} onClick={togglePreview} aria-label="Lire l’aperçu vidéo"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg></button>}
          </>}
          {failed && <div className={styles.error} role="status"><p>La vidéo n’est pas disponible pour le moment.</p><a href="#demande">Parlons de votre projet →</a></div>}
        </div>
        <div className={styles.caption}>
          <p>Faites le premier pas vers votre futur métier.</p>
          <a href="#demande">Échangeons ensemble <span aria-hidden="true">↗</span></a>
        </div>
        <details className={styles.transcript}>
          <summary>Lire le texte de la vidéo</summary>
          <p id="contact-film-transcript">Intégrale Academy. Faites le premier pas vers votre futur métier. Un projet qui vous ressemble. Des métiers concrets. APS — Sécurité privée. Observer, prévenir, protéger. A3P — Protection rapprochée. Anticiper, accompagner, sécuriser. SSIAP — Sécurité incendie. Prévenir, intervenir, assister. DESP — Diriger en sécurité privée. Organiser, piloter, entreprendre. VTC — Transport de personnes. Accueillir, conduire, accompagner. BTS — Apprendre en alternance. Se former, pratiquer, évoluer. Votre projet. Notre accompagnement. Choisir votre formation. Étudier votre financement. Préparer votre admission. Un premier échange pour avancer. Intégrale Academy. Faites le premier pas vers votre futur métier. 04 22 47 07 68. Un premier échange gratuit et sans engagement.</p>
        </details>
      </div>
    </section>
  );
}
