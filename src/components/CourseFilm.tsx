'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { loadYouTubePlayer, type YouTubePlayer } from '@/lib/youtube-player';
import styles from './CourseFilm.module.css';
import reportage from './NeoReportage.module.css';

const videos = {
  aps: { id: 'E3Kni6Z5xvc', duration: '30 s', credit: 'Intégrale Academy · APS' },
  a3p: { id: 'huGhqeTQ2_c', duration: '32 s', credit: 'Intégrale Academy · A3P' },
  desp: { id: 'SOWfqWXRLuw', duration: '1 min 03', credit: 'Intégrale Academy · DESP' },
  neo: { id: 'sGZbgi0unGY', duration: '1 min 14', credit: 'Néo · Sacrés Français' },
} as const;

type Props = { film: keyof typeof videos; title: string; titleAccent?: string; description: string };
let activePlayer: YouTubePlayer | null = null;

function claimPlayer(player: YouTubePlayer) {
  if (activePlayer && activePlayer !== player) activePlayer.pauseVideo();
  activePlayer = player;
}

export function CourseFilm({ film, title, titleAccent, description }: Props) {
  const video = videos[film];
  const portrait = film === 'neo';
  const fullTitle = titleAccent ? `${title} ${titleAccent}` : title;
  const anchor = portrait ? 'reportage-neo' : 'presentation-video';
  const watchUrl = portrait ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
  const stage = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const startManually = useRef<(() => void) | null>(null);
  const [display, setDisplay] = useState<'poster' | 'player' | 'unavailable'>('poster');

  useEffect(() => {
    if (!mount.current || !stage.current) return;
    const host = mount.current;
    const screen = stage.current;
    let frame: HTMLIFrameElement | undefined;
    let player: YouTubePlayer | undefined;
    let ready = false;
    let disposed = false;
    let failed = false;
    let visibleRatio = 0;
    let manual = false;
    let resume = true;
    let pausedOffscreen = false;
    setDisplay('poster');

    function sync() {
      if (disposed || failed) return;
      if (document.hidden || (visibleRatio === 0 && !manual)) {
        if (ready && player && [1, 3].includes(player.getPlayerState())) {
          pausedOffscreen = true;
          player.pauseVideo();
        }
        return;
      }
      if (!manual && (visibleRatio <= .5 || !resume)) return;
      if (!frame) {
        frame = document.createElement('iframe');
        const url = new URL(`https://www.youtube-nocookie.com/embed/${video.id}`);
        url.search = new URLSearchParams({
          enablejsapi: '1', origin: window.location.origin, playsinline: '1', controls: '1', rel: '0', mute: '1', hl: 'fr',
        }).toString();
        frame.title = fullTitle;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.src = url.href;
        host.append(frame);
        setDisplay('player');
        loadYouTubePlayer().then(api => {
          if (disposed || !frame) return;
          player = new api.Player(frame, { events: {
            onReady: ({ target }) => {
              if (disposed) return;
              player = target;
              ready = true;
              target.mute();
              sync();
            },
            onStateChange: ({ target, data }) => {
              if (disposed) return;
              if (data === 1) {
                if (document.hidden || (visibleRatio === 0 && !manual)) {
                  pausedOffscreen = true;
                  target.pauseVideo();
                  return;
                }
                claimPlayer(target);
                manual = false;
                pausedOffscreen = false;
                resume = true;
              } else if (data === 0 || (data === 2 && !pausedOffscreen)) {
                resume = false;
              }
            },
            onAutoplayBlocked: () => { manual = false; resume = false; },
            onError: () => {
              if (disposed) return;
              failed = true;
              if (activePlayer === player) activePlayer = null;
              setDisplay('unavailable');
            },
          } });
        }).catch(() => {
          // The native iframe still provides its own play, sound and fullscreen controls.
        });
      } else if (ready && player && player.getPlayerState() !== 1) {
        pausedOffscreen = false;
        claimPlayer(player);
        player.playVideo();
      }
    }

    startManually.current = () => { manual = true; resume = true; sync(); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      visibleRatio = entry.intersectionRatio;
      sync();
    }, { threshold: [0, .51, 1] });
    observer?.observe(screen);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      startManually.current = null;
      observer?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      if (activePlayer === player) activePlayer = null;
      player?.destroy();
      host.replaceChildren();
    };
  }, [video.id, fullTitle]);

  function playFromPoster(event: MouseEvent<HTMLAnchorElement>) {
    if (display === 'unavailable' || !startManually.current || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    startManually.current();
  }

  const playIcon = <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3.5v13L16 10z" /></svg>;
  const playerStage = (
    <div ref={stage} className={portrait ? `${styles.stage} ${reportage.video}` : styles.stage}>
      <div ref={mount} hidden={display !== 'player'} className={styles.player} />
      {display !== 'player' && (
        <a className={styles.poster} href={watchUrl} target="_blank" rel="noopener noreferrer" onClick={playFromPoster} aria-label={`Lire « ${fullTitle} »`}>
          <Image src={`/images/course-videos/${film}.webp`} alt="" fill sizes={portrait ? '(max-width: 760px) 65vw, 340px' : '100vw'} />
          <span className={styles.play}>{playIcon}{display === 'unavailable' ? 'Lire sur YouTube' : 'Lire la vidéo'}</span>
        </a>
      )}
    </div>
  );

  if (portrait) return (
    <section id={anchor} aria-labelledby={`${anchor}-titre`} className={reportage.band} data-film={film}>
      <div className={reportage.spread}>
        <div className={reportage.copy}>
          <p className={reportage.byline}><strong>Reportage</strong><span>{video.credit}</span></p>
          <h3 id={`${anchor}-titre`} className={reportage.headline}>{title}{titleAccent && <> <em>{titleAccent}</em></>}</h3>
          <p className={reportage.description}>{description}</p>
          <a className={reportage.watch} href={watchUrl} target="_blank" rel="noopener noreferrer">
            <span className={reportage.play}>{playIcon}</span>
            Voir sur YouTube <span className={reportage.duration}>{video.duration}</span>
          </a>
        </div>
        <div className={reportage.photos}>
          <div className={reportage.portrait}><Image src="/images/course-videos/neo-veronique.webp" alt="" fill sizes="(max-width: 760px) 38vw, 23vw" /></div>
          {playerStage}
          <div className={reportage.terrain}><Image src="/images/course-videos/neo-terrain.webp" alt="" fill sizes="(max-width: 760px) 38vw, 16vw" /></div>
        </div>
      </div>
    </section>
  );

  return (
    <section id={anchor} data-film={film} aria-labelledby={`${anchor}-titre`} className={styles.section}>
      <div className={styles.layout}>
        <header className={styles.heading}>
          <div>
            <p className={styles.credit}>{video.credit}<span>{video.duration}</span></p>
            <h2 id={`${anchor}-titre`} className={styles.title}>{title}</h2>
          </div>
          <div className={styles.summary}>
            <p>{description}</p>
            <a href={watchUrl} target="_blank" rel="noopener noreferrer">Voir sur YouTube <span aria-hidden="true">↗︎</span></a>
          </div>
        </header>
        {playerStage}
      </div>
    </section>
  );
}
