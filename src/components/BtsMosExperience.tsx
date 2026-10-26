'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { btsMosArtwork } from '@/data/btsMosArtwork';
import { btsRhythms } from '@/data/btsRhythms';
import styles from './BtsMosExperience.module.css';

const missionSteps = [
  { label: 'Repérer', title: 'Comprendre le site.', text: 'Observez les accès, identifiez les risques et clarifiez les besoins du client avant de proposer une organisation.', result: 'Votre diagnostic de sécurité', items: ['Les accès à surveiller', 'Les risques à anticiper', 'Les besoins du client'], image: btsMosArtwork.reperer.src, alt: btsMosArtwork.reperer.alt, caption: 'Sur le terrain : observer les accès et identifier les risques.' },
  { label: 'Organiser', title: 'Préparer la prestation.', text: 'Prévoyez les moyens humains et techniques, répartissez les missions et préparez le planning de la prestation.', result: 'Votre organisation de service', items: ['Les moyens nécessaires', 'Les missions de chacun', 'Le planning de l’équipe'], image: btsMosArtwork.organiser.src, alt: btsMosArtwork.organiser.alt, caption: 'Au poste de sécurité : répartir les missions et les moyens.' },
  { label: 'Manager', title: 'Accompagner votre équipe.', text: 'Préparez le briefing, transmettez les consignes et accompagnez les agents pour que chacun comprenne son rôle.', result: 'Votre briefing d’équipe', items: ['Des consignes compréhensibles', 'Une équipe coordonnée', 'Un suivi au quotidien'], image: btsMosArtwork.manager.src, alt: btsMosArtwork.manager.alt, caption: 'Avec l’équipe : transmettre les consignes et coordonner le travail.' },
  { label: 'Rendre compte', title: 'Faire le bilan avec le client.', text: 'Suivez la qualité de la prestation, analysez les résultats et présentez des pistes d’amélioration au client.', result: 'Votre compte rendu de prestation', items: ['Les résultats de la mission', 'Les points à améliorer', 'Les prochaines actions'], image: btsMosArtwork.bilan.src, alt: btsMosArtwork.bilan.alt, caption: 'Avec le client : présenter les résultats et les prochaines actions.' },
];

// Manual progression keeps the story readable, including with reduced motion.
export function BtsMosMission() {
  const [step, setStep] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = missionSteps[step];
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % missionSteps.length;
    else if (event.key === 'ArrowLeft') next = (index + missionSteps.length - 1) % missionSteps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = missionSteps.length - 1;
    else return;
    event.preventDefault();
    setStep(next);
    tabs.current[next]?.focus();
  }
  return <div id="mission-bts-mos" className={styles.mission}>
    <div className={styles.missionTabs} role="tablist" aria-label="Les quatre étapes d’une mission de sécurité">
      {missionSteps.map((item, index) => <button type="button" key={item.label} role="tab" id={`mos-mission-tab-${index}`} aria-controls="mos-mission-panel" aria-selected={step === index} tabIndex={step === index ? 0 : -1} ref={node => { tabs.current[index] = node; }} onKeyDown={event => onKey(event, index)} onClick={() => setStep(index)}><span>0{index + 1}</span>{item.label}<span className={styles.stepCheck} aria-hidden="true">{index < step ? '✓' : ''}</span></button>)}
    </div>
    <div id="mos-mission-panel" role="tabpanel" aria-labelledby={`mos-mission-tab-${step}`} tabIndex={0} className={styles.missionPanel}>
      <figure className={styles.missionScene}>
        <div className={styles.sceneTop}><span>Mise en situation illustrée</span><span>Étape 0{step + 1} / 04</span></div>
        <div className={styles.sceneImage}><Image key={current.image} src={current.image} alt={current.alt} width={1536} height={1024} sizes="(max-width: 850px) 94vw, 50vw" /></div>
        <figcaption>{current.caption}</figcaption>
        <div className={styles.sceneProgress} aria-hidden="true">{missionSteps.map((item, index) => <span key={item.label} data-complete={index <= step} />)}</div>
      </figure>
      <div className={styles.missionCopy}><p className={styles.eyebrow}>Votre décision / 0{step + 1}</p><h3 aria-live="polite" aria-atomic="true">{current.title}</h3><p>{current.text}</p><div className={styles.missionResult}><span>Ce que vous préparez</span><strong>{current.result}</strong><ul>{current.items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></div><button className={styles.nextStep} type="button" onClick={() => setStep((step + 1) % missionSteps.length)}>{step === missionSteps.length - 1 ? 'Revoir la mission' : `Ensuite : ${missionSteps[step + 1].label.toLowerCase()}`} <span aria-hidden="true">→</span></button></div>
    </div>
  </div>;
}

export function BtsMosCalendar() {
  const [phase, setPhase] = useState<'school' | 'company'>('school');
  const rhythm = btsRhythms.MOS;
  const isSchool = phase === 'school';
  return <div className={styles.calendar}>
    <div className={styles.calendarSheet}>
      <div className={styles.calendarTitle}><h3>Votre cycle d’alternance</h3><span>{rhythm.schoolDays} + {rhythm.companyDays} jours</span></div>
      <div className={styles.calendarControls} role="group" aria-label="Explorer les deux périodes d’alternance"><button type="button" className={styles.schoolButton} aria-pressed={isSchool} aria-controls="mos-period-detail" onClick={() => setPhase('school')}><i aria-hidden="true" />{rhythm.schoolDays} jours à l’école</button><button type="button" className={styles.companyButton} aria-pressed={!isSchool} aria-controls="mos-period-detail" onClick={() => setPhase('company')}><i aria-hidden="true" />{rhythm.companyDays} jours en entreprise</button></div>
      <div className={styles.dayGroups} aria-label={rhythm.description}>{(['school', 'company'] as const).map((period, group) => <div key={period} className={styles.dayGroup} data-active={phase === period} data-period={period}><p>{group === 0 ? 'Première période · École' : 'Deuxième période · Entreprise'}</p><div className={styles.days} aria-hidden="true">{Array.from({ length: group === 0 ? rhythm.schoolDays : rhythm.companyDays }, (_, index) => <span key={index}>{String(group * rhythm.schoolDays + index + 1).padStart(2, '0')}</span>)}</div></div>)}</div>
      <p className={styles.calendarNote}>Représentation du rythme d’alternance. Les dates précises et les jours de présence sont communiqués dans le planning de votre promotion.</p>
    </div>
    <div id="mos-period-detail" className={styles.periodDetail} data-period={phase} aria-live="polite" aria-atomic="true"><span className={styles.periodNumber}>{isSchool ? rhythm.schoolDays : rhythm.companyDays}<span>jours</span></span><p className={styles.eyebrow}>{isSchool ? 'À l’école ou en live sur ZOOM' : 'Dans votre entreprise d’accueil'}</p><h3>{isSchool ? 'Comprendre les méthodes.' : 'Les mettre en pratique.'}</h3><p>{isSchool ? 'Management, droit, organisation et relation client : vous développez les outils utiles à vos futures missions.' : 'Vous participez à des missions adaptées à votre progression et découvrez l’organisation d’une équipe professionnelle.'}</p><ul>{(isSchool ? ['Des cours avec vos formateurs', 'Des études de cas et des exercices', 'Des échanges avec votre promotion'] : ['Préparer et organiser une prestation', 'Accompagner le travail de l’équipe', 'Observer, appliquer et rendre compte']).map(item => <li key={item}>{item}</li>)}</ul></div>
  </div>;
}
