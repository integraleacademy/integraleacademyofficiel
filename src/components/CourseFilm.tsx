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

type Props = { film: keyof typeof videos; title: string; titleAccent?: string; description: string; followPageSound?: boolean };
// Both films in a course share a visitor's choice for the lifetime of that page.
const pageSound = new WeakMap<Element, { muted: boolean }>();
let activePlayer: YouTubePlayer | null = null;

function claimPlayer(player: YouTubePlayer) {
  if (activePlayer && activePlayer !== player && [1, 3].includes(activePlayer.getPlayerState())) activePlayer.pauseVideo();
  activePlayer = player;
}

function enableSound(player: YouTubePlayer) {
  if (player.getVolume() === 0) player.setVolume(70);
  player.unMute();
}

export function CourseFilm({ film, title, titleAccent, description, followPageSound = false }: Props) {
  const video = videos[film];
  const portrait = film === 'neo';
  const fullTitle = titleAccent ? `${title} ${titleAccent}` : title;
  const anchor = portrait ? 'reportage-neo' : 'presentation-video';
  const watchUrl = portrait ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
  const stage = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const startManually = useRef<(() => void) | null>(null);
  const changeSound = useRef<((enable: boolean) => void) | null>(null);
  const [display, setDisplay] = useState<'poster' | 'player' | 'unavailable'>('poster');
  const [sound, setSound] = useState<'off' | 'on' | null>(null);

  useEffect(() => {
    if (!mount.current || !stage.current) return;
    const host = mount.current;
    const screen = stage.current;
    const page = screen.closest('[data-course-design]') ?? screen;
    const preference = (followPageSound && pageSound.get(page)) || { muted: false };
    if (followPageSound) pageSound.set(page, preference);
    let waitingForSound = false;
    let wasAudible = false;
    let frame: HTMLIFrameElement | undefined;
    let player: YouTubePlayer | undefined;
    let ready = false;
    let disposed = false;
    let failed = false;
    let visibleRatio = 0;
    let manual = false;
    let resume = true;
    let pausedOffscreen = false;
    let playRequested = false;
    let triedMutedPlayback = false;
    let needsPlayGesture = true;
    let volumeTimer: number | undefined;
    setDisplay('poster');
    setSound(null);

    function updateSoundControl() {
      if (!player || !ready || disposed || failed) return;
      const audible = !player.isMuted() && player.getVolume() > 0;
      if (followPageSound && player.getPlayerState() === 1) {
        if (audible) {
          waitingForSound = false;
          preference.muted = false;
        } else if (wasAudible && !waitingForSound) {
          // The visitor can also mute the film with YouTube’s own controls.
          preference.muted = true;
        } else if (!preference.muted) {
          waitingForSound = true;
        }
        wasAudible = audible;
      }
      setSound(!needsPlayGesture && audible ? 'on' : 'off');
    }

    function stopWatchingVolume() {
      window.clearInterval(volumeTimer);
      volumeTimer = undefined;
    }

    function requestPlayback(target: YouTubePlayer) {
      pausedOffscreen = false;
      playRequested = target.getPlayerState() !== 1;
      claimPlayer(target);
      target.playVideo();
    }

    function sync() {
      if (disposed || failed) return;
      if (document.hidden || (visibleRatio === 0 && !manual)) {
        stopWatchingVolume();
        if (followPageSound && frame && !ready) {
          frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), 'https://www.youtube-nocookie.com');
        }
        if (ready && player && (playRequested || [1, 3].includes(player.getPlayerState()))) {
          playRequested = false;
          pausedOffscreen = true;
          player.pauseVideo();
        }
        return;
      }
      if (ready && volumeTimer === undefined) {
        // YouTube's native volume controls do not emit a public volume-change event.
        updateSoundControl();
        volumeTimer = window.setInterval(updateSoundControl, 500);
      }
      if (!manual && (visibleRatio <= .5 || !resume)) return;
      if (!frame) {
        frame = document.createElement('iframe');
        const url = new URL(`https://www.youtube-nocookie.com/embed/${video.id}`);
        url.search = new URLSearchParams({
          ...(followPageSound ? { autoplay: '1', mute: preference.muted ? '1' : '0' } : {}),
          enablejsapi: '1', origin: window.location.origin, playsinline: '1', controls: '1', rel: '0', hl: 'fr',
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
              if (preference.muted) target.mute();
              else enableSound(target);
              sync();
            },
            onStateChange: ({ target, data }) => {
              if (disposed) return;
              if (data === 0 || data === 1 || data === 2) playRequested = false;
              if (data === 1 || data === 3) needsPlayGesture = false;
              updateSoundControl();
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
                if (!needsPlayGesture) waitingForSound = false;
              }
            },
            onAutoplayBlocked: ({ target }) => {
              if (disposed || failed) return;
              playRequested = false;
              needsPlayGesture = true;
              waitingForSound = !preference.muted;
              wasAudible = false;
              setSound('off');
              if (document.hidden || (!manual && visibleRatio <= .5)) return;
              if (triedMutedPlayback) {
                manual = false;
                resume = false;
                return;
              }
              triedMutedPlayback = true;
              target.mute();
              requestPlayback(target);
            },
            onError: () => {
              if (disposed) return;
              failed = true;
              stopWatchingVolume();
              setSound(null);
              if (activePlayer === player) activePlayer = null;
              setDisplay('unavailable');
            },
          } });
        }).catch(() => {
          // The native iframe still provides its own play, sound and fullscreen controls.
        });
      } else if (ready && player && !playRequested && ![1, 3].includes(player.getPlayerState())) {
        if (followPageSound) {
          if (preference.muted) player.mute();
          else if (pausedOffscreen && !waitingForSound) enableSound(player);
        }
        requestPlayback(player);
      }
    }

    function retrySound(event: Event) {
      if (!event.isTrusted || !waitingForSound || preference.muted || !ready || !player || disposed || failed) return;
      if (document.hidden || visibleRatio <= .5 || (activePlayer && activePlayer !== player)) return;
      if (event.target instanceof Element && event.target.closest('[data-film-control]')) return;
      if (event instanceof KeyboardEvent && (event.repeat || event.metaKey || event.ctrlKey || event.altKey || event.key === 'Escape')) return;
      // Browsers can require a fresh, trusted gesture in order to upgrade muted autoplay.
      waitingForSound = false;
      triedMutedPlayback = false;
      needsPlayGesture = false;
      resume = true;
      enableSound(player);
      requestPlayback(player);
    }

    changeSound.current = enable => {
      if (!player || !ready || failed) return;
      if (followPageSound) {
        preference.muted = !enable;
        waitingForSound = false;
        wasAudible = false;
      }
      if (enable) {
        manual = visibleRatio === 0 && player.getPlayerState() !== 1;
        resume = true;
        triedMutedPlayback = false;
        needsPlayGesture = false;
        enableSound(player);
        requestPlayback(player);
      } else {
        player.mute();
        setSound('off');
      }
    };
    startManually.current = () => { manual = true; resume = true; sync(); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      visibleRatio = entry.intersectionRatio;
      sync();
    }, { threshold: [0, .51, 1] });
    observer?.observe(screen);
    document.addEventListener('visibilitychange', sync);
    if (followPageSound) {
      document.addEventListener('click', retrySound);
      document.addEventListener('keydown', retrySound);
    }
    return () => {
      disposed = true;
      startManually.current = null;
      changeSound.current = null;
      stopWatchingVolume();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      document.removeEventListener('click', retrySound);
      document.removeEventListener('keydown', retrySound);
      if (activePlayer === player) activePlayer = null;
      player?.destroy();
      host.replaceChildren();
    };
  }, [video.id, fullTitle, followPageSound]);

  function playFromPoster(event: MouseEvent<HTMLAnchorElement>) {
    if (display === 'unavailable' || !startManually.current || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    startManually.current();
  }

  const playIcon = <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3.5v13L16 10z" /></svg>;
  const soundButton = sound !== null && (
    <button type="button" data-film-control="sound" className={styles.soundButton} aria-pressed={sound === 'on'} onClick={() => changeSound.current?.(sound !== 'on')}>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5 6 9H3v6h3l5 4z" />
        {sound === 'on' ? <path d="M15 9a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12" /> : <path d="m16 9 6 6m0-6-6 6" />}
      </svg>
      {sound === 'on' ? 'Couper le son' : 'Activer le son'}
    </button>
  );
  const soundHint = sound === 'off' && <span className={styles.soundHint}>Vidéo sans son ? Vous pouvez l’activer ici.</span>;
  const playerStage = (
    <div ref={stage} className={portrait ? `${styles.stage} ${reportage.video}` : styles.stage}>
      <div ref={mount} hidden={display !== 'player'} className={styles.player} />
      {display !== 'player' && (
        <a className={styles.poster} href={watchUrl} target="_blank" rel="noopener noreferrer" onClick={playFromPoster} aria-label={`Lire « ${fullTitle} »`}>
          <Image src={`/images/course-videos/${film}.webp`} alt="" fill sizes={portrait ? '(max-width: 760px) 62vw, 240px' : '(max-width: 760px) min(92vw, 512px), (max-width: 1150px) 44vw, 512px'} />
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
          <div className={`${styles.actions} ${reportage.actions}`}>
            {soundButton}
            {soundHint}
            <a className={reportage.watch} href={watchUrl} target="_blank" rel="noopener noreferrer">
              <span className={reportage.play}>{playIcon}</span>
              Voir sur YouTube <span className={reportage.duration}>{video.duration}</span>
            </a>
          </div>
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
          <p className={styles.credit}>{video.credit}<span>{video.duration}</span></p>
          <h2 id={`${anchor}-titre`} className={styles.title}>{title}</h2>
          <div className={styles.summary}>
            <p>{description}</p>
            <div className={styles.actions}>
              {soundButton}
            {soundHint}
              <a href={watchUrl} target="_blank" rel="noopener noreferrer">Voir sur YouTube <span aria-hidden="true">↗︎</span></a>
            </div>
          </div>
        </header>
        {playerStage}
      </div>
    </section>
  );
}
