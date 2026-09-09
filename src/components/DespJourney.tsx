'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createStepWheelNavigation, normalizeWheelDelta } from '@/lib/step-wheel-navigation';
import styles from './DespJourney.module.css';

const steps = [
  { label: 'Votre projet', title: 'Créer, reprendre, diriger : commencez par votre ambition.', description: 'Vous souhaitez prendre la tête d’une entreprise de sécurité privée ? Votre expérience et vos objectifs sont le point de départ pour choisir entre formation initiale et VAE.', link: 'Parlons de votre projet', href: '/contact?formation=desp' },
  { label: 'La formation initiale', title: 'Apprenez le métier de dirigeant, étape par étape.', description: 'Un parcours de 7 semaines : 5 à distance, puis 2 en présentiel. Réglementation, gestion, management et développement commercial : vous construisez les compétences pour piloter votre activité.', link: 'Découvrir le DESP initial', href: '/dirigeant' },
  { label: 'La VAE', title: 'Vous avez l’expérience. Faites reconnaître vos compétences.', description: 'Vous exercez déjà des responsabilités de gestion, de management ou de direction ? Après étude de votre parcours, vous constituez votre dossier de preuves et préparez votre présentation devant le jury.', link: 'Découvrir le DESP en VAE', href: '/vaedirigeant' },
  { label: 'Votre prochain chapitre', title: 'Deux parcours. Un même titre. À vous de choisir votre chemin.', description: 'Apprendre avec la formation initiale ou faire reconnaître vos acquis avec la VAE : notre équipe vous aide à choisir le parcours adapté et à préparer votre inscription et votre financement.', link: 'Comparer les deux parcours', href: '#choisir-desp' },
] as const;

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CardHeader({ label }: { label: string }) {
  return <div className={styles.cardHeader}><span className={styles.brand}>INTÉGRALE<span> ACADEMY</span></span><span>{label}</span></div>;
}

function JourneyVisual({ index }: { index: number }) {
  if (index === 0) return (
    <div className={styles.card}>
      <CardHeader label="Votre avenir commence ici" />
      <div className={styles.schoolPhoto}>
        {/* Existing school photo, editable at the same path in GitHub. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/desp-initial-hero.jpg" alt="L’accueil de l’école Intégrale Academy" loading="lazy" decoding="async" width="1600" height="1200" />
        <span>UNE AMBITION, VOTRE ENTREPRISE.</span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.eyebrow}>Votre projet professionnel</p>
        <p className={styles.cardTitle}>Et si le prochain dirigeant,<br /><span>c’était vous ?</span></p>
        <div className={styles.projectTags}><span>Créer</span><span>Reprendre</span><span>Diriger <Arrow /></span></div>
        <div className={styles.cardNote}><span className={styles.smallDot} /> Un parcours adapté à votre expérience</div>
      </div>
    </div>
  );

  if (index === 1) return (
    <div className={styles.card}>
      <CardHeader label="Le parcours initial" />
      <div className={styles.cardBody}>
        <p className={styles.eyebrow}>Apprendre à diriger</p>
        <div className={styles.duration}><strong>7<span> semaines</span></strong><span className={styles.pill}>245 heures</span></div>
        <div className={styles.weeks} aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <span key={i} className={i > 4 ? styles.weekSchool : ''}>S{i + 1}</span>)}</div>
        <div className={styles.delivery}><div><span className={styles.smallDot} /><strong>5 semaines à distance</strong><small>175 heures</small></div><div><span className={styles.smallDot} /><strong>2 semaines en présentiel</strong><small>70 heures</small></div></div>
        <p className={styles.topicsLabel}>Les compétences au cœur du parcours</p>
        <div className={styles.topics}>{['Réglementation', 'Gestion d’entreprise', 'Management', 'Développement commercial'].map((topic, i) => <div key={topic}><span>0{i + 1}</span><strong>{topic}</strong></div>)}</div>
        <div className={styles.cardNote}><span className={styles.smallDot} /> À distance + à l’école, selon la session choisie</div>
      </div>
    </div>
  );

  if (index === 2) return (
    <div className={styles.card}>
      <CardHeader label="Le parcours VAE" />
      <div className={styles.cardBody}>
        <p className={styles.eyebrow}>Valoriser votre expérience</p>
        <p className={styles.cardTitle}>Votre parcours.<br /><span>Vos preuves. Votre titre.</span></p>
        <div className={styles.dossier}>
          <div className={styles.documentIcon} aria-hidden="true"><svg viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 1h14l8 8v30H5V1Z M19 1v9h8 M11 18h10 M11 24h10 M11 30h6" /></svg></div>
          <div><strong>Dossier de validation</strong><span>Vos missions, vos compétences, vos réalisations</span></div>
        </div>
        <div className={styles.proofTags}><span>Management</span><span>Gestion</span><span>Direction</span></div>
        <ol className={styles.vaeSteps}>
          <li><span>01</span><div><strong>Étude de votre expérience</strong><small>Vérifier l’adéquation avec le titre</small></div></li>
          <li><span>02</span><div><strong>Constitution de votre dossier</strong><small>Décrire et démontrer vos compétences</small></div></li>
          <li><span>03</span><div><strong>Présentation devant le jury</strong><small>Faire évaluer vos acquis</small></div></li>
        </ol>
        <div className={styles.cardNote}><span className={styles.smallDot} /> Un calendrier défini selon votre dossier</div>
      </div>
    </div>
  );

  return (
    <div className={`${styles.card} ${styles.choiceCard}`}>
      <CardHeader label="Le même objectif" />
      <div className={styles.cardBody}>
        <p className={styles.eyebrow}>Votre prochain chapitre</p>
        <p className={styles.cardTitle}>Prenez les commandes<br /><span>de votre avenir.</span></p>
        <div className={styles.paths}><div><small>FORMATION INITIALE</small><strong>J’apprends.</strong><span>Acquérir les compétences</span></div><div><small>VAE</small><strong>Je valorise.</strong><span>Faire reconnaître mes acquis</span></div></div>
        <div className={styles.convergence} aria-hidden="true" />
        <div className={styles.titleGoal}><span className={styles.titleMark}>DESP</span><div><strong>Dirigeant d’entreprise<br />de sécurité privée</strong><span>Un même titre, après validation</span></div></div>
        <p className={styles.signature}>Faites le premier pas vers votre futur métier.</p>
      </div>
    </div>
  );
}

export function DespJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<ReturnType<typeof createStepWheelNavigation> | null>(null);
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
    // Land in the middle of the step, away from rounding-sensitive boundaries.
    window.scrollTo({ top: bounds.start + (bounds.end - bounds.start) * ((index + 0.5) / steps.length), behavior: 'instant' });
    setActive(index);
  }, [getBounds]);

  useEffect(() => {
    // Short screens, mobile, reduced motion and no-JS retain the full reading flow.
    const media = window.matchMedia('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)');
    const sync = () => setEnhanced(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    const navigation = createStepWheelNavigation(steps.length);
    wheelRef.current = navigation;
    const debugWheel = new URLSearchParams(window.location.search).has('desp-scroll-debug');
    let frame = 0;
    const stepAt = (position: number, start: number, end: number) => {
      const progress = Math.max(0, Math.min(1, (position - start) / Math.max(1, end - start)));
      return Math.min(steps.length - 1, Math.floor(progress * steps.length));
    };
    const update = () => {
      frame = 0;
      const bounds = getBounds();
      if (bounds) setActive(stepAt(window.scrollY, bounds.start, bounds.end));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const onWheel = (event: WheelEvent) => {
      if (debugWheel) console.debug('[desp-wheel-input]', JSON.stringify({ time: Math.round(performance.now()), delta: event.deltaY, mode: event.deltaMode, cancelable: event.cancelable, prevented: event.defaultPrevented, y: window.scrollY }));
      if (event.defaultPrevented || !event.cancelable || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="dialog"], dialog')) return;
      if (getComputedStyle(document.body).overflowY === 'hidden') return;
      // Leave independent scroll areas (menus, forms, dialogs) in control.
      for (let element = target; element && element !== document.body && element !== document.documentElement; element = element.parentElement) {
        if (element.scrollHeight > element.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(element).overflowY)) return;
      }
      const bounds = getBounds();
      if (!bounds) return;
      const delta = normalizeWheelDelta(event.deltaY, event.deltaMode, window.innerHeight);
      const action = navigation.handle({ delta, now: performance.now(), position: window.scrollY, ...bounds, step: stepAt(window.scrollY, bounds.start, bounds.end) });
      if (debugWheel) console.debug('[desp-wheel-action]', JSON.stringify(action));
      if (!action) return;
      event.preventDefault();
      if (action.kind === 'step') scrollToStep(action.index);
      if (action.kind === 'exit') {
        const distance = Math.max(80, Math.min(Math.abs(delta), window.innerHeight / 2));
        window.scrollTo({ top: action.direction > 0 ? bounds.end + distance : bounds.start - distance, behavior: 'instant' });
      }
    };
    update();
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      wheelRef.current = null;
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [enhanced, getBounds, scrollToStep]);

  function goTo(index: number) {
    if (!enhanced) return;
    wheelRef.current?.lock(performance.now());
    scrollToStep(index);
  }

  return (
    <section id="parcours-desp" ref={sectionRef} className={styles.journey} data-enhanced={enhanced} aria-labelledby="desp-journey-title">
      <div ref={stageRef} className={styles.stage}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>DEVENIR DIRIGEANT · DESP</p>
          <h2 id="desp-journey-title">De votre ambition au titre DESP,<br /><span>trouvez votre chemin.</span></h2>
          <nav className={styles.navigation} aria-label="Étapes du parcours DESP">
            {steps.map((step, index) => <button key={step.label} type="button" aria-label={`Étape ${index + 1} : ${step.label}`} aria-current={index === active ? 'step' : undefined} onClick={() => goTo(index)}><span>0{index + 1}</span><span className={styles.navLine} /></button>)}
            <a href="#choisir-desp" aria-label="Aller directement au comparatif des deux parcours">Comparer <Arrow /></a>
          </nav>
        </header>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.label} className={styles.step} data-current={index === active}>
              <div className={styles.copy}>
                <div className={styles.stepHeading}><span className={styles.stepNumber}>0{index + 1}</span><span>{step.label}</span></div>
                <h3>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                <Link href={step.href} className={styles.link}>{step.link}<Arrow /></Link>
                {index < steps.length - 1 ? <button type="button" className={styles.next} onClick={() => goTo(index + 1)}><span>0{index + 2}</span><span>{steps[index + 1].label}</span><Arrow /></button> : <span className={styles.lastStep}>Intégrale Academy, à vos côtés à chaque étape.</span>}
              </div>
              <div className={styles.visual}>
                <div className={styles.visualInner}><JourneyVisual index={index} /></div>
                <span className={styles.visualCounter} aria-hidden="true">0{index + 1} / 04</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
