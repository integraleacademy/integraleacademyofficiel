'use client';

import Image from 'next/image';
import { useRef, useState, type ReactNode } from 'react';
import type { toPublicSession } from '@/lib/public-session-data';
import { planningSsiapCourse, ssiapPlanningCourses, type SsiapPlanningCourse } from '@/lib/planning-ssiap';
import { directorPlanningLocations, nextSessionForLocation, type DirectorLocationFilterKey } from '@/lib/session-location-filter';
import { DirectorLocationChoices } from './DirectorLocationChoices';
import { SsiapCourseChoices } from './SsiapCourseChoices';
import styles from './planning.module.css';

export type PlanningFormationKey = 'aps' | 'a3p' | 'director' | 'ssiap' | 'vtc';
type PreviewSession = ReturnType<typeof toPublicSession>;
type PreviewFormation = {
  key: PlanningFormationKey;
  label: string;
  previewDetail?: string;
  image: string;
  sessions: PreviewSession[];
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M5 12h14m-6-6 6 6-6 6'} /></svg>;
}

export function PlanningPreview({ formations, initialFormation, initialSsiapCourse = null, initialDirectorLocation = null, onChoose, renderSession }: {
  formations: PreviewFormation[];
  initialFormation: PlanningFormationKey | 'all';
  initialSsiapCourse?: SsiapPlanningCourse | null;
  initialDirectorLocation?: DirectorLocationFilterKey | null;
  onChoose: (key: PlanningFormationKey, course: SsiapPlanningCourse | null, location: DirectorLocationFilterKey | null) => void;
  renderSession: (session: PreviewSession) => ReactNode;
}) {
  const [formationKey, setFormationKey] = useState(initialFormation);
  const [courseKey, setCourseKey] = useState(initialSsiapCourse);
  const [locationKey, setLocationKey] = useState(initialDirectorLocation);
  const heading = useRef<HTMLHeadingElement>(null);
  const formation = formations.find(item => item.key === formationKey);
  const needsLocation = formationKey === 'director' && !locationKey;
  const needsCourse = formationKey === 'ssiap' && !courseKey;
  const location = directorPlanningLocations.find(item => item.key === locationKey);
  const course = ssiapPlanningCourses.find(item => item.key === courseKey);
  const sessions = course ? formation?.sessions.filter(session => planningSsiapCourse(session) === course.key) : formation?.sessions;
  const nextSession = nextSessionForLocation(sessions ?? [], locationKey ?? 'all');

  function focusHeading() {
    window.requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  }

  function goBack() {
    if (courseKey) setCourseKey(null);
    else if (locationKey) setLocationKey(null);
    else setFormationKey('all');
    focusHeading();
  }

  let title = 'Quelle formation vous intéresse ?';
  if (needsLocation) title = 'Dans quel centre souhaitez-vous vous former ?';
  else if (needsCourse) title = 'Quel parcours SSIAP souhaitez-vous suivre ?';
  else if (formation) title = course?.label || [formation.label, location?.label].filter(Boolean).join(' · ');

  const showSession = formation && !needsLocation && !needsCourse;
  const openDates = () => formation && onChoose(formation.key, courseKey, locationKey);

  return (
    <div className={styles.preview}>
      <div className={styles.previewHeading}>
        <div>
          <p className={styles.eyebrow}>{showSession ? 'Prochaine session' : 'La formation'}</p>
          <h2 ref={heading} tabIndex={-1}>{title}</h2>
        </div>
        {formation && <button type="button" className={styles.previewBack} onClick={goBack}>
          <span aria-hidden="true">←</span> {courseKey ? 'Changer de parcours' : locationKey ? 'Changer de centre' : 'Toutes les formations'}
        </button>}
      </div>
      <div className={styles.previewPanel}>
        {!formation ? (
          <div className={styles.previewChoices}>
            {formations.map(item => <button key={item.key} type="button" onClick={() => { setFormationKey(item.key); focusHeading(); }}>
              <span><Image src={item.image} alt="" width={600} height={400} style={{ objectPosition: item.key === 'director' ? 'right center' : undefined }} sizes="(min-width: 1200px) 18vw, (min-width: 600px) 210px, 45vw" priority /></span>
              <strong>{item.label}{item.previewDetail && <small>{item.previewDetail}</small>}</strong>
              <i><Arrow diagonal /></i>
            </button>)}
          </div>
        ) : needsLocation ? (
          <DirectorLocationChoices compact sessions={formation.sessions} onChoose={key => { setLocationKey(key); focusHeading(); }} />
        ) : needsCourse ? (
          <SsiapCourseChoices compact sessions={formation.sessions} onChoose={key => { setCourseKey(key); focusHeading(); }} />
        ) : nextSession ? (
          <div className={styles.previewSummary}>
            {renderSession(nextSession)}
            <button type="button" className={styles.previewAction} onClick={openDates} aria-controls="sessions">Afficher toutes les dates <Arrow /></button>
          </div>
        ) : (
          <div className={styles.previewSummary}>
            <p>Aucune date publiée pour ce parcours pour le moment.</p>
            <button type="button" className={styles.previewAction} onClick={openDates}>Me renseigner sur ce parcours <Arrow /></button>
          </div>
        )}
      </div>
    </div>
  );
}
