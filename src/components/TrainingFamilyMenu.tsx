'use client';

import Link from 'next/link';
import { Fragment, useId } from 'react';
import { announcedTrainingNavigation, coreTrainingNavigation, trainingNavigation, type TrainingMenuFamily } from '@/data/navigation';
import { TrainingStatusBadge } from './TrainingStatusBadge';
import styles from './TrainingFamilyMenu.module.css';

const pictograms: Record<TrainingMenuFamily['icon'], string> = {
  security: 'M12 3 4.5 6v5.6c0 4.7 4.1 7.7 7.5 9.4 3.4-1.7 7.5-4.7 7.5-9.4V6L12 3Z M8.8 11.9l2.2 2.2 4.4-4.6',
  vtc: 'M4.5 10 6.6 5.7h10.8l2.1 4.3 M3.5 11.5c0-.8.6-1.5 1.5-1.5h14c.9 0 1.5.7 1.5 1.5v5.2h-17z M5.5 17v2.2 M18.5 17v2.2 M6.5 13.5h2 M15.5 13.5h2',
  bts: 'm2 8 10-4.5L22 8l-10 4.5L2 8Z M6 10v5.3c3.7 2.6 8.3 2.6 12 0V10 M21.5 8.4v6',
  bachelors: 'M4 4h13a2 2 0 0 1 2 2v7 M4 4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7 M6 8h9 M6 11h5 M15 17l-.8 4.1 2.8-1.5 2.8 1.5L19 17 M20.3 14.5a3.3 3.3 0 1 1-6.6 0 3.3 3.3 0 0 1 6.6 0Z',
  masteres: 'M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z M9 3v3m6-3v3m-6 12v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3 M9 13l2-3 2 4 2-3',
  'titres-professionnels': 'M8.5 7V5.5c0-.9.6-1.5 1.5-1.5h4c.9 0 1.5.6 1.5 1.5V7 M4.5 7h15A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-9A1.5 1.5 0 0 1 4.5 7Z M3 11c5 3 13 3 18 0 M10 12.8v2.7h4v-2.7',
};

function Arrow() {
  return <svg className={styles.arrow} aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Pictogram({ family }: { family: TrainingMenuFamily }) {
  return <span className={styles.icon} data-family={family.icon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" strokeLinecap="round"><path d={pictograms[family.icon]} /></svg></span>;
}

function FamilyCard({ family }: { family: TrainingMenuFamily }) {
  return <><Pictogram family={family} /><span className={styles.cardCopy}><strong>{family.label}</strong><small>{family.description}</small></span><Arrow /></>;
}

function CourseList({ family, onNavigate }: { family: TrainingMenuFamily; onNavigate: () => void }) {
  return <>
    <ul className={styles.courses}>
      {family.courses.map(course => {
        const content = <><span>{course.label}</span>{course.status && <TrainingStatusBadge status={course.status} />}<Arrow /></>;
        return <li key={course.href}>
          {course.href.startsWith('/#')
            ? <a href={course.href} onClick={onNavigate} className={styles.course}>{content}</a>
            : <Link href={course.href} onClick={onNavigate} className={styles.course}>{content}</Link>}
        </li>;
      })}
    </ul>
    <a href={family.href} onClick={onNavigate} className={styles.seeFamily}>Voir la rubrique sur l’accueil <Arrow /></a>
  </>;
}

type FamilyProps = { family: TrainingMenuFamily; onNavigate: () => void };

const primaryIcons: Partial<Record<TrainingMenuFamily['icon'], string>> = { security: '👮', bts: '🎓', vtc: '🚘' };

function PrimaryFamily({ family, onNavigate }: FamilyProps) {
  const href = family.icon === 'vtc' ? family.courses[0].href : family.href;
  return (
    <div className={styles.primaryFamily}>
      <a href={href} onClick={onNavigate} className={styles.primaryHeading}>
        <span className={styles.primaryIcon} aria-hidden="true">{primaryIcons[family.icon]}</span>
        <strong>{family.label}</strong>
        <Arrow />
      </a>
      <p className={styles.primaryDescription}>
        {family.courses.map((course, index) => (
          <Fragment key={course.href}>
            {index > 0 && (index === family.courses.length - 1 ? ' et ' : ', ')}
            <Link href={course.href} onClick={onNavigate} aria-label={course.label}>{course.shortLabel ?? course.label}</Link>
          </Fragment>
        ))}.
      </p>
    </div>
  );
}

function AnnouncedFamily({ family, onNavigate }: FamilyProps) {
  const isDegree = family.icon !== 'titres-professionnels';
  return (
    <section data-family={family.icon} className={styles.announced}>
      <h2>
        <a href={family.href} onClick={onNavigate}>{family.label}{isDegree && <Arrow />}</a>
      </h2>
      <ul>
        {family.courses.map(course => (
          <li key={course.href}>
            <a href={course.href} onClick={onNavigate}>
              <span>{course.label}</span>
              {course.status && <TrainingStatusBadge status={course.status} />}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TrainingFamilyMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate: () => void }) {
  const id = useId();

  if (mobile) return <div className={styles.mobileFamilies}>
    {trainingNavigation.map(family => <details key={family.href} name={id}>
      <summary className={styles.family}><FamilyCard family={family} /></summary>
      <div className={styles.mobileList}><CourseList family={family} onNavigate={onNavigate} /></div>
    </details>)}
  </div>;

  return (
    <div role="group" aria-label="Familles de formations" className={styles.overview}>
      <div className={styles.primary}>
        {coreTrainingNavigation.map(family => <PrimaryFamily key={family.href} family={family} onNavigate={onNavigate} />)}
      </div>
      {announcedTrainingNavigation.map(family => <AnnouncedFamily key={family.href} family={family} onNavigate={onNavigate} />)}
    </div>
  );
}
