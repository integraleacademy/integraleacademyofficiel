'use client';

import Image from 'next/image';
import { useRef, useState, type MouseEvent } from 'react';
import styles from './CourseFilm.module.css';

const videos = {
  aps: { id: 'E3Kni6Z5xvc', duration: '0:30', credit: 'Intégrale Academy · APS' },
  a3p: { id: 'huGhqeTQ2_c', duration: '0:32', credit: 'Intégrale Academy · A3P' },
  desp: { id: 'SOWfqWXRLuw', duration: '1:03', credit: 'Intégrale Academy · DESP' },
  neo: { id: 'sGZbgi0unGY', duration: '1:14', credit: 'Néo · Sacrés Français' },
} as const;

type Props = { film: keyof typeof videos; title: string; description: string };

export function CourseFilm({ film, title, description }: Props) {
  const video = videos[film];
  const portrait = film === 'neo';
  const anchor = portrait ? 'reportage-neo' : 'presentation-video';
  const watchUrl = portrait
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;
  const Heading = portrait ? 'h3' : 'h2';
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);

  function openPlayer(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
    event.preventDefault();
    dialog.current.showModal();
    setPlaying(true);
  }

  return (
    <section id={anchor} aria-labelledby={`${anchor}-titre`} className={styles.section} data-film={film}>
      <div className={styles.card}>
        <div className={styles.copy}>
          <p className={styles.credit}>{video.credit}</p>
          <Heading id={`${anchor}-titre`} className={styles.title}>{title}</Heading>
          <p className={styles.description}>{description}</p>
        </div>
        <a href={watchUrl} target="_blank" rel="noopener noreferrer" onClick={openPlayer}
          aria-haspopup="dialog" aria-label={`Lire la vidéo « ${title} » avec le lecteur YouTube`} className={styles.poster}>
          <Image src={`/images/course-videos/${film}.webp`} alt="" fill
            sizes={portrait ? '(max-width: 640px) 72vw, 260px' : '(max-width: 720px) 94vw, (max-width: 1200px) 54vw, 720px'} />
          <span className={styles.controls}>
            <span className={styles.play}>
              <svg aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" fill="currentColor"><path d="M1 1.4a.8.8 0 0 1 1.2-.7l9 5.6a.8.8 0 0 1 0 1.4l-9 5.6a.8.8 0 0 1-1.2-.7z" /></svg>
              {portrait ? 'Voir le reportage' : 'Voir la présentation'}
            </span>
            <span className={styles.duration}>{video.duration}</span>
          </span>
        </a>
      </div>
      <dialog ref={dialog} aria-label={title} className={styles.dialog}
        onClose={() => setPlaying(false)}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.bar}>
          <a href={watchUrl} target="_blank" rel="noopener noreferrer">Ouvrir sur YouTube <span aria-hidden="true">↗</span></a>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Fermer la vidéo">Fermer <span aria-hidden="true">×</span></button>
        </div>
        {playing && <iframe className={styles.player} title={title}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1`}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
      </dialog>
    </section>
  );
}
