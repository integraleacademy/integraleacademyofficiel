'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './AcademyExperience.module.css';

const filmUrl = '/videos/contact-integrale-academy-v1.mp4';
const posterUrl = '/videos/contact-integrale-academy-poster.webp';
const appointmentUrl = 'https://assistance-alw9.onrender.com/demande-informations-formations';

export function AcademyFilm({ compact = false }: { compact?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden || motion.matches || saveData) video.pause();
      else if (!pausedByUser.current && !motion.matches && !saveData) void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .25 });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); motion.removeEventListener('change', sync); };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { pausedByUser.current = false; void video.play().catch(() => setFailed(true)); }
    else { pausedByUser.current = true; video.pause(); }
  };
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    video.volume = .55;
    setMuted(video.muted);
    if (video.paused) { pausedByUser.current = false; void video.play().catch(() => {}); }
  };

  return <section className={`${styles.filmSection} ${compact ? styles.filmCompact : ''}`} aria-labelledby={titleId}>
    <div className={styles.container}>
      <div className={styles.filmHeading}><div><p className={styles.eyebrow}>Bienvenue chez Intégrale Academy</p><h2 id={titleId}>Votre avenir <em>prend forme.</em></h2></div><span className={styles.filmDuration}>Le premier pas <span>36 secondes</span></span></div>
      <div className={styles.cinema}>
        <video ref={videoRef} src={filmUrl} poster={posterUrl} muted loop playsInline preload="none" aria-label="Présentation animée d’Intégrale Academy" aria-describedby={`${titleId}-transcript`} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} onTimeUpdate={() => { const v = videoRef.current; if (v && Number.isFinite(v.duration) && v.duration > 0) setProgress(v.currentTime / v.duration * 100); }} />
        {!playing && !failed && <button type="button" className={styles.bigPlay} onClick={togglePlayback} aria-label="Lire le film de présentation"><span aria-hidden="true">▶</span></button>}
        {failed && <div className={styles.filmFallback}><p>Découvrez notre école et nos formations.</p><Link href="/ecole">Visiter l’école <span aria-hidden="true">↗</span></Link></div>}
        <div className={styles.filmControls}>
          <button type="button" onClick={togglePlayback} aria-label={playing ? 'Mettre le film en pause' : 'Lire le film'} disabled={failed}>{playing ? 'Ⅱ' : '▶'}</button>
          <input type="range" min="0" max="100" step=".1" value={progress} aria-label="Avancement du film" aria-valuetext={`${Math.round(progress * .36)} secondes sur 36`} onChange={e => { const v = videoRef.current; if (v && Number.isFinite(v.duration)) { v.currentTime = Number(e.target.value) / 100 * v.duration; setProgress(Number(e.target.value)); } }} />
          <button type="button" onClick={toggleSound} aria-pressed={!muted} disabled={failed}>{muted ? 'Activer le son' : 'Couper le son'} <span aria-hidden="true">{muted ? '♪' : '♫'}</span></button>
        </div>
      </div>
      <div className={styles.filmFoot}><span>Sécurité privée <i /> VTC <i /> BTS en alternance</span><details><summary>Lire la présentation</summary><p id={`${titleId}-transcript`}>Votre projet. Parlons-en. Quelle formation choisir ? Comment la financer ? Par où commencer ? Ne restez pas avec vos questions : notre équipe vous accompagne. Un échange permet de préciser votre projet, de trouver la formation adaptée et d’explorer les possibilités de financement selon votre situation. Sécurité privée, protection rapprochée, sécurité incendie, VTC ou BTS en alternance : construisons votre parcours. Des personnes à votre écoute dès le premier échange. Faites le premier pas : contactez Intégrale Academy au 04 22 47 07 68. Premier échange gratuit et sans engagement.</p></details></div>
    </div>
  </section>;
}

const steps = [
  { title: 'Vous avez un projet.', text: 'Un métier en tête, une envie de reconversion ou une poursuite d’études. Ensemble, nous trouvons le parcours qui vous correspond.', label: 'Le bon point de départ', caption: 'Une formation qui vous ressemble.' },
  { title: 'On prépare la suite.', text: 'Prérequis, dossier, solutions de financement et prochaines dates : notre équipe vous aide à préparer votre entrée en formation.', label: 'Une équipe à vos côtés', caption: 'Chaque étape devient plus simple.' },
  { title: 'Vous passez à l’action.', text: 'Cours, supports illustrés, exercices et mises en situation : vous développez les compétences concrètes de votre futur métier.', label: 'Place à la formation', caption: 'Apprendre. S’entraîner. Progresser.' },
];

export function AcademyJourney() {
  const [active, setActive] = useState(0);
  const [automatic, setAutomatic] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const panelId = useId();
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync(); query.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { query.removeEventListener('change', sync); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!automatic || !visible || reduced) return;
    const timer = window.setInterval(() => { if (!document.hidden) setActive(value => (value + 1) % steps.length); }, 6500);
    return () => window.clearInterval(timer);
  }, [automatic, visible, reduced]);

  return <section id="votre-parcours" ref={sectionRef} className={styles.journeySection} aria-labelledby="journey-title">
    <div className={styles.container}>
      <div className={styles.sectionHeading} data-home-journey-heading><p className={styles.eyebrow}>Du premier échange au premier cours</p><h2 id="journey-title">Un projet. <em>Et on avance.</em></h2><p>Vous savez toujours quelle est la prochaine étape.</p></div>
      <div className={styles.journeyGrid}>
        <div className={styles.journeySteps}>
          {steps.map((step, index) => <button type="button" key={step.title} className={`${styles.step} ${active === index ? styles.activeStep : ''}`} aria-pressed={active === index} aria-controls={panelId} onClick={() => { setActive(index); setAutomatic(false); }}><span className={styles.stepIndex}>0{index + 1}<span aria-hidden="true">↗</span></span><span><strong>{step.title}</strong><span>{step.text}</span></span></button>)}
          <div className={styles.journeyActions}><a href={appointmentUrl} className={styles.darkButton}>Parlons de votre projet <span aria-hidden="true">↗</span></a>{!reduced && <button className={styles.motionButton} type="button" onClick={() => setAutomatic(value => !value)} aria-pressed={automatic}>{automatic ? 'Ⅱ Pause' : '▶ Animer'}</button>}</div>
        </div>
        <div className={styles.phoneStage}>
          <div className={styles.phoneHalo} aria-hidden="true" />
          <div className={styles.phone} id={panelId} aria-label={`Illustration : étape ${active + 1}`}>
            <div className={styles.phoneTop} aria-hidden="true"><span>9:41</span><i /><span>▰</span></div>
            <div className={styles.phoneBrand}><img src="/images/sigle.png" width="30" height="30" alt="" /><strong>INTÉGRALE<br /><span>ACADEMY</span></strong><small>Votre parcours</small></div>
            <div key={active} className={styles.phoneContent}>
              <p className={styles.phoneEyebrow}>ÉTAPE 0{active + 1} / 03</p><h3>{steps[active].label}</h3>
              {active === 0 && <><img className={styles.phoneArt} src="/images/formation-scenes-manuel/aps-arrivee.webp" alt="Illustration de l’accueil d’un apprenant" width="420" height="280" loading="lazy" /><div className={styles.choice}>Sécurité privée <span>↗</span></div><div className={styles.choice}>Chauffeur VTC <span>↗</span></div><div className={styles.choice}>BTS en alternance <span>↗</span></div></>}
              {active === 1 && <><div className={styles.phoneAdviser}><img src="/images/cassandre-memoji.png" width="100" height="100" alt="Memoji de Cassandre" loading="lazy" /><strong>On regarde votre projet<br />ensemble.</strong></div><div className={styles.checklist}>{['Votre formation', 'Vos prérequis', 'Votre financement', 'Vos dates'].map((item, i) => <div key={item} style={{ animationDelay: `${i * 100}ms` }}><span aria-hidden="true">✓</span>{item}</div>)}</div><p className={styles.phoneNote}>Des conseils adaptés à votre situation.</p></>}
              {active === 2 && <><img className={styles.phoneArt} src="/images/formation-scenes-manuel/aps-atelier-radio.webp" alt="Illustration d’un exercice pratique de communication radio" width="420" height="280" loading="lazy" /><div className={styles.lesson}><span>VOTRE FORMATION</span><strong>Du savoir<br />au savoir-faire.</strong><div><i /><i /><i /></div><small>Comprendre · S’exercer · Progresser</small></div></>}
            </div>
            <div className={styles.phoneDots} aria-hidden="true">{steps.map((_, i) => <i key={i} data-active={i === active} />)}</div>
          </div>
          <p className={styles.phoneCaption}>{steps[active].caption}</p>
        </div>
      </div>
    </div>
  </section>;
}

const learningTabs = ['Des manuels illustrés', 'Des cours en ligne', 'De la pratique'];

export function AcademyLearningStudio() {
  const [active, setActive] = useState(0);
  const tabId = useId();
  return <section className={styles.learningSection} aria-labelledby="learning-title">
    <div className={styles.container}>
      <div className={styles.sectionHeading}><p className={styles.eyebrow}>Notre façon de former</p><h2 id="learning-title">Tout pour comprendre.<br /><em>Et savoir faire.</em></h2><p>Des supports qui donnent envie d’apprendre. Des exercices qui donnent confiance.</p></div>
      <div className={styles.learningTabs} role="tablist" aria-label="Découvrir nos outils pédagogiques">{learningTabs.map((label, index) => <button id={`${tabId}-tab-${index}`} key={label} type="button" role="tab" aria-selected={active === index} aria-controls={`${tabId}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={e => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (active + (e.key === 'ArrowRight' ? 1 : 2)) % 3; setActive(next); document.getElementById(`${tabId}-tab-${next}`)?.focus(); } }}><span>0{index + 1}</span>{label}</button>)}</div>
      <div className={styles.learningGrid} role="tabpanel" id={`${tabId}-panel`} aria-labelledby={`${tabId}-tab-${active}`} tabIndex={0}>
        <div className={styles.learningVisual} key={active}>
          {active === 0 && <div className={styles.books}>{[['ssiap-1/manuel/couverture-ssiap-1.webp', 'SSIAP 1'], ['aps/manuel/couverture-aps.webp', 'APS'], ['a3p/manuel/couverture-a3p.webp', 'A3P']].map(([src, label]) => <div key={src} className={styles.book}><img src={`/images/${src}`} alt={`Couverture du manuel ${label} Intégrale Academy`} width="210" height="300" loading="lazy" /></div>)}</div>}
          {active === 1 && <div className={styles.laptop}><div className={styles.laptopBar}><i /><i /><i /><span>Votre espace d’apprentissage</span></div><div className={styles.laptopBody}><div className={styles.lessonSidebar}><strong>Mon parcours</strong><span>✓ Comprendre</span><span>02 S’entraîner</span><span>03 Réviser</span></div><div className={styles.lessonMain}><span>APPRENDRE À SON RYTHME</span><h3>Prévenir les risques.</h3><img src="/images/aps/manuel/acces.webp" alt="Illustration pédagogique du contrôle d’accès" width="380" height="220" loading="lazy" /><div className={styles.lessonChips}><span>Cours illustrés</span><span>Exercices</span><span>Révisions</span></div></div></div></div>}
          {active === 2 && <div className={styles.practiceVisual}><img src="/images/formation-scenes-manuel/aps-atelier-radio.webp" alt="Illustration d’un formateur encadrant un exercice de communication radio" width="720" height="480" loading="lazy" /><span>Les gestes s’apprennent aussi sur le terrain.</span></div>}
        </div>
        <div className={styles.learningCopy}><span className={styles.smallNumber}>0{active + 1} / L’EXPÉRIENCE INTÉGRALE</span><h3>{['Le cours prend vie.', 'Votre formation vous suit.', 'La théorie devient un réflexe.'][active]}</h3><p>{['Des explications claires, des illustrations métier et des repères visuels pour comprendre et retrouver l’essentiel.', 'Selon votre parcours, retrouvez vos cours, vos exercices et vos révisions dans votre espace en ligne, en complément de la formation.', 'Vous vous entraînez avec des professionnels issus du terrain, dans des situations concrètes liées au métier que vous préparez.'][active]}</p><Link href="/ecole#pedagogie" className={styles.textLink}>Découvrir notre pédagogie <span aria-hidden="true">↗</span></Link><small>Supports et modalités selon la formation choisie.</small></div>
      </div>
    </div>
  </section>;
}
