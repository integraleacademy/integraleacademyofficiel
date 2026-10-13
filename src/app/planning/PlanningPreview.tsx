'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { planningDay } from '@/lib/planning-calendar';
import { formatSessionDate, formatSessionPeriod } from '@/lib/public-sessions';
import styles from './planning.module.css';

type PreviewFormation = { key: string; label: string; image: string; session?: any };
const steps = ['La formation', 'Les dates', 'Votre session'];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M5 12h14m-6-6 6 6-6 6'} /></svg>;
}

export function PlanningPreview({ formations, initialFormation, btsIntakeYear, onChoose }: {
  formations: PreviewFormation[];
  initialFormation: string;
  btsIntakeYear: number;
  onChoose: (key: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [formationKey, setFormationKey] = useState(initialFormation);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const available = formations.filter(formation => formation.key === 'bts' || (formation.session && planningDay(formation.session.startDate) !== null));
  const formation = available.find(item => item.key === formationKey) || available[0];
  const session = formation?.session;
  const isBts = formation?.key === 'bts';
  const date = session ? new Date(planningDay(session.startDate)!) : null;
  const monthLabel = date ? new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date) : '';
  const dayCount = date ? new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate() : 0;
  const firstWeekday = date ? (new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)).getUTCDay() + 6) % 7 : 0;
  const isVtc = session?.scheduleKind === 'vtc-exam';

  function goToStep(next: number) {
    setStep(next);
    window.requestAnimationFrame(() => tabs.current[next]?.focus({ preventScroll: true }));
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    else return;
    event.preventDefault(); setStep(next); tabs.current[next]?.focus();
  }

  return <div className={styles.preview}>
    <div className={styles.previewHeading}><p className={styles.eyebrow}>Votre planning, simplement</p><h2>Un projet.<br /><em>Une date pour commencer.</em></h2></div>
    <div className={styles.previewTabs} role="tablist" aria-label="Du projet à votre session">
      {steps.map((label, index) => <button key={label} ref={node => { tabs.current[index] = node; }} id={`planning-preview-step-${index}`} type="button" role="tab" aria-selected={step === index} aria-controls="planning-preview-panel" tabIndex={step === index ? 0 : -1} onClick={() => setStep(index)} onKeyDown={event => navigate(event, index)}><span>0{index + 1}</span>{label}</button>)}
    </div>
    <div id="planning-preview-panel" role="tabpanel" aria-labelledby={`planning-preview-step-${step}`} className={styles.previewPanel} tabIndex={0}>
      <div key={`${step}-${formation?.key}`} className={styles.previewScene}>
        {!session && !isBts ? <div className={styles.previewEmpty}><strong>Votre projet commence ici.</strong><p>Découvrez les parcours et contactez l’équipe pour les prochaines ouvertures.</p><button type="button" onClick={() => onChoose('all')}>Découvrir les formations <Arrow /></button></div> : step === 0 ? <>
          <p className={styles.previewPrompt}>Quel métier vous attire ?</p>
          <div className={styles.previewChoices}>{available.map(item => <button key={item.key} type="button" onClick={() => { setFormationKey(item.key); goToStep(1); }} aria-label={`Voir les prochaines dates ${item.label}`}><span><Image src={item.image} alt="" width={144} height={96} sizes="120px" /></span><strong>{item.label}</strong><i><Arrow diagonal /></i></button>)}</div>
        </> : isBts ? <div className={styles.previewSummary}>
          <div className={styles.previewSummaryImage}><Image src={formation.image} alt="" fill sizes="400px" /><span>BTS en alternance</span></div>
          <h3>{step === 1 ? 'Votre prochaine rentrée' : 'Préparons votre candidature.'}</h3>
          <p className={styles.btsPreviewDate}>Septembre <strong>{btsIntakeYear}</strong></p>
          <p>{step === 1 ? `Rentrée suivante : septembre ${btsIntakeYear + 1}.` : 'Choix du BTS et recherche d’entreprise : Aurélie vous accompagne.'}</p>
          <button type="button" onClick={() => step === 1 ? goToStep(2) : onChoose('bts')}>{step === 1 ? 'Préparer ma rentrée' : 'Voir les rentrées BTS'} <Arrow /></button>
        </div> : step === 1 ? <>
          <div className={styles.miniMonthHeading}><span>{monthLabel}</span><span className={styles.miniBadge}>{formation.label}</span></div>
          <div className={styles.miniMonth} aria-hidden="true">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => <small key={index}>{day}</small>)}
            {Array.from({ length: firstWeekday }, (_, index) => <span key={`blank-${index}`} />)}
            {Array.from({ length: dayCount }, (_, index) => <span key={index} className={index + 1 === date!.getUTCDate() ? styles.miniSelectedDay : undefined}>{index + 1}</span>)}
          </div>
          <button type="button" className={styles.miniDateAction} onClick={() => goToStep(2)}><span><small>{isVtc ? 'Inscription avant le' : 'Prochaine rentrée le'}</small><strong>{formatSessionDate(session.startDate)}</strong></span><Arrow /></button>
        </> : <div className={styles.previewSummary}>
          <div className={styles.previewSummaryImage}><Image src={formation.image} alt="" fill sizes="(max-width: 640px) 320px, 400px" /><span>Votre prochaine étape</span></div>
          <h3>{session.title || session.training?.name}</h3>
          <p>{isVtc ? 'Examen théorique le ' + formatSessionDate(session.endDate) : formatSessionPeriod(session.startDate, session.endDate)}</p>
          <p>{session.location || 'Centre à confirmer'}</p>
          <button type="button" onClick={() => onChoose(formation.key)}>Voir les sessions {formation.label} <Arrow /></button>
        </div>}
      </div>
    </div>
    <p className={styles.previewCaption}><span aria-hidden="true" />Un aperçu des dates publiées par notre équipe.</p>
  </div>;
}
