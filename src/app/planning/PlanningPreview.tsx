'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { calendarMonth, planningDay } from '@/lib/planning-calendar';
import { formatSessionDate, formatSessionPeriod } from '@/lib/public-sessions';
import styles from './planning.module.css';

type PreviewSession = {
  id: string;
  title?: string;
  startDate: string | Date;
  endDate?: string | Date;
  location?: string;
  scheduleKind?: string;
  training?: { name?: string } | null;
};
type PreviewFormation = { key: string; label: string; previewDetail?: string; image: string; sessions: PreviewSession[] };
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
  const [visibleMonth, setVisibleMonth] = useState<number | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const available = formations.map(item => ({ ...item, sessions: item.sessions
    .filter(session => planningDay(session.startDate) !== null)
    .sort((a, b) => planningDay(a.startDate)! - planningDay(b.startDate)!)
  })).filter(formation => formation.key === 'bts' || formation.key === 'ssiap' || formation.sessions.length > 0);
  const formation = available.find(item => item.key === formationKey) || available[0];
  const sessions = formation?.sessions || [];
  const isBts = formation?.key === 'bts';
  const firstMonth = sessions.length ? calendarMonth(planningDay(sessions[0].startDate)!) : null;
  const lastMonth = sessions.length ? calendarMonth(planningDay(sessions[sessions.length - 1].startDate)!) : null;
  const month = visibleMonth ?? firstMonth;
  const monthEnd = month !== null ? calendarMonth(month, 1) : null;
  const monthSessions = sessions.filter(item => month !== null && planningDay(item.startDate)! >= month && planningDay(item.startDate)! < monthEnd!);
  const session = monthSessions.find(item => item.id === selectedSessionId) || monthSessions[0];
  const selectedDay = session ? planningDay(session.startDate) : null;
  const daySessions = monthSessions.filter(item => planningDay(item.startDate) === selectedDay);
  const nextSession = sessions.find(item => monthEnd !== null && planningDay(item.startDate)! >= monthEnd);
  const monthDate = month !== null ? new Date(month) : null;
  const monthLabel = monthDate ? new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(monthDate) : '';
  const dayCount = monthEnd !== null ? new Date(monthEnd - 1).getUTCDate() : 0;
  const firstWeekday = monthDate ? (monthDate.getUTCDay() + 6) % 7 : 0;
  const isVtc = formation?.key === 'vtc';

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
        {!formation ? <div className={styles.previewEmpty}><strong>Votre projet commence ici.</strong><p>Découvrez les parcours et contactez l’équipe pour les prochaines ouvertures.</p><button type="button" onClick={() => onChoose('all')}>Découvrir les formations <Arrow /></button></div> : step === 0 ? <>
          <p className={styles.previewPrompt}>Quel métier vous attire ?</p>
          <div className={styles.previewChoices}>{available.map(item => <button key={item.key} type="button" onClick={() => { setFormationKey(item.key); setVisibleMonth(null); setSelectedSessionId(null); goToStep(1); }} aria-label={`Voir les prochaines dates ${item.label}`}><span><Image src={item.image} alt="" width={600} height={400} style={{ objectPosition: item.key === 'director' ? 'right center' : undefined }} sizes="(min-width: 1440px) 210px, (min-width: 1200px) 18vw, (min-width: 700px) 210px, (min-width: 600px) 27vw, 45vw" priority /></span><strong>{item.label}{item.previewDetail && <small>{item.previewDetail}</small>}</strong><i><Arrow diagonal /></i></button>)}</div>
        </> : isBts ? <div className={styles.previewSummary}>
          <div className={styles.previewSummaryImage}><Image src={formation.image} alt="" fill sizes="(max-width: 640px) 90vw, 400px" /></div>
          <span className={styles.previewSummaryLabel}>BTS en alternance</span>
          <h3>{step === 1 ? 'Votre prochaine rentrée' : 'Préparons votre candidature.'}</h3>
          <p className={styles.btsPreviewDate}>Septembre <strong>{btsIntakeYear}</strong></p>
          <p>{step === 1 ? `Rentrée suivante : septembre ${btsIntakeYear + 1}.` : 'Choix du BTS et recherche d’entreprise : Aurélie vous accompagne.'}</p>
          <button type="button" onClick={() => step === 1 ? goToStep(2) : onChoose('bts')}>{step === 1 ? 'Préparer ma rentrée' : 'Voir toutes les dates'} <Arrow /></button>
        </div> : !sessions.length ? <div className={styles.previewEmpty}>
          <strong>Sécurité incendie</strong>
          <p>SSIAP 1, SSIAP 2, SSIAP 3, recyclages et remises à niveau : soyez prévenu des prochaines ouvertures.</p>
          <button type="button" onClick={() => onChoose(formation.key)}>Voir les parcours et créer une alerte <Arrow /></button>
        </div> : step === 1 ? <>
          <div className={styles.miniOverview}><span className={styles.miniBadge}>{formation.label}</span><span>{sessions.length} session{sessions.length > 1 ? 's' : ''} à venir</span></div>
          {formation.key === 'ssiap' && <p className={styles.miniHint}>SSIAP 1, SSIAP 2, SSIAP 3, recyclages et remises à niveau. <button type="button" className={styles.previewCoursesLink} onClick={() => onChoose(formation.key)}>Voir tous les parcours et les prochaines ouvertures <Arrow /></button></p>}
          <div className={styles.miniMonthHeading}>
            <button type="button" aria-label="Mois précédent" disabled={month === null || month === firstMonth} onClick={() => setVisibleMonth(calendarMonth(month!, -1))}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
            <span id="planning-preview-month" aria-live="polite" aria-atomic="true">{monthLabel}</span>
            <button type="button" aria-label="Mois suivant" disabled={month === null || month === lastMonth} onClick={() => setVisibleMonth(calendarMonth(month!, 1))}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
          </div>
          <p className={styles.miniHint}>{isVtc ? 'Choisissez une date limite d’inscription.' : 'Choisissez une date de début.'}</p>
          <div className={styles.miniMonth} role="group" aria-labelledby="planning-preview-month">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => <small key={index} aria-hidden="true">{day}</small>)}
            {Array.from({ length: firstWeekday }, (_, index) => <span key={`blank-${index}`} aria-hidden="true" />)}
            {Array.from({ length: dayCount }, (_, index) => {
              const day = month! + index * 86_400_000;
              const starts = monthSessions.filter(item => planningDay(item.startDate) === day);
              return starts.length ? <button key={day} type="button" className={day === selectedDay ? styles.miniSelectedDay : styles.miniAvailableDay} aria-pressed={day === selectedDay} aria-label={`${isVtc ? 'Inscription avant le ' : ''}${formatSessionDate(starts[0].startDate)} : ${starts.length} session${starts.length > 1 ? 's' : ''}`} onClick={() => setSelectedSessionId(starts[0].id)}>{index + 1}<i aria-hidden="true" /></button> : <span key={day} aria-hidden="true">{index + 1}</span>;
            })}
          </div>
          <p className={styles.miniMonthCount} aria-live="polite">{monthSessions.length} session{monthSessions.length > 1 ? 's' : ''} ce mois-ci{monthSessions.length ? ' · Dates proposées en doré' : ''}</p>
          {daySessions.length ? <div className={styles.miniDateChoices}>
            {daySessions.length > 1 && <p className={styles.miniHint}>Plusieurs sessions à cette date : choisissez votre centre.</p>}
            {daySessions.map(item => <button key={item.id} type="button" className={styles.miniDateAction} aria-label={`Choisir la session ${item.title || formation.label}, ${formatSessionDate(item.startDate)}, ${item.location || 'centre à confirmer'}`} onClick={() => { setSelectedSessionId(item.id); goToStep(2); }}><span><small>{isVtc ? 'Inscription avant le' : 'Début de formation le'}</small><strong>{formatSessionDate(item.startDate)}</strong><small>{item.title || item.training?.name}</small><small>{item.location || 'Centre à confirmer'}</small></span><Arrow /></button>)}
          </div> : <div className={styles.miniEmptyMonth}><p>{isVtc ? 'Aucune date limite d’inscription publiée ce mois-ci.' : 'Aucun début de formation publié ce mois-ci.'}</p>{nextSession && <button type="button" onClick={() => setVisibleMonth(calendarMonth(planningDay(nextSession.startDate)!))}>Prochaines dates <Arrow /></button>}</div>}
        </> : session ? <div className={styles.previewSummary}>
          <div className={styles.previewSummaryImage}><Image src={formation.image} alt="" fill sizes="(max-width: 640px) 90vw, 400px" /></div>
          <span className={styles.previewSummaryLabel}>Votre prochaine étape</span>
          <h3>{session.title || session.training?.name}</h3>
          {isVtc && <p>Inscription avant le {formatSessionDate(session.startDate)}</p>}
          <p>{isVtc ? 'Examen théorique le ' + formatSessionDate(session.endDate) : formatSessionPeriod(session.startDate, session.endDate)}</p>
          <p>{session.location || 'Centre à confirmer'}</p>
          <button type="button" onClick={() => onChoose(formation.key)}>Voir toutes les dates <Arrow /></button>
        </div> : <div className={styles.previewEmpty}><strong>Choisissez votre date.</strong><p>Parcourez les mois pour trouver la session qui vous convient.</p><button type="button" onClick={() => goToStep(1)}>Voir les dates <Arrow /></button></div>}
      </div>
    </div>
    <p className={styles.previewCaption}><span aria-hidden="true" />Toutes les prochaines sessions publiées par notre équipe.</p>
  </div>;
}
