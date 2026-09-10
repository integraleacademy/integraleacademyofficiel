'use client';

import Link from 'next/link';
import { courseJourneys, type CourseJourneyConfig, type CourseJourneyKey } from '@/data/courseJourneys';
import { TrainingJourney } from './TrainingJourney';
import styles from './CourseJourney.module.css';

function Arrow({ rise = false }: { rise?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={rise ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} /></svg>;
}

function CardHeader({ label }: { label: string }) {
  return <div className={styles.cardHeader}><span className={styles.brand}>INTÉGRALE<span>ACADEMY</span></span><span className={styles.cardLabel}>{label}</span></div>;
}

function CardAction({ href, label }: { href: string; label: string }) {
  return <Link href={href} className={styles.cardAction}><span>{label}</span><span className={styles.actionArrow}><Arrow /></span></Link>;
}

function CardNextAction({ onNext, label }: { onNext: () => void; label: string }) {
  return <button type="button" onClick={onNext} className={`${styles.cardAction} ${styles.cardNextAction}`} aria-label={`Étape suivante : ${label}`}><span className={styles.actionArrow}><Arrow /></span></button>;
}

function JourneyCard({ config, index, onNext }: { config: CourseJourneyConfig; index: number; onNext: () => void }) {
  const step = config.steps[index];
  const action = index < config.steps.length - 1
    ? <CardNextAction onNext={onNext} label={config.steps[index + 1].label} />
    : <CardAction href={step.href} label={step.link} />;
  if (index === 0) {
    const card = config.opening;
    return <div className={`${styles.card} ${styles.openingCard}`}>
      {card.image && <>
        {/* Reuse the editable hero asset; the image is decorative behind the copy. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.coverPhoto} src={card.image} alt="" width="1536" height="1024" loading="lazy" decoding="async" />
      </>}
      <div className={styles.orbit} aria-hidden="true" />
      <CardHeader label={config.name} />
      <div className={styles.openingBody}>
        <p className={styles.eyebrow}>{card.kicker}</p>
        <p className={styles.openingTitle}>{card.heading[0]}<br /><span>{card.heading[1]}</span></p>
        <p className={styles.subtitle}>{card.text}</p>
        <span className={styles.openingArrow} aria-hidden="true"><Arrow rise /></span>
      </div>
      <div className={styles.verbs}>{card.verbs.map((verb, i) => <span key={verb}><small>0{i + 1}</small>{verb}</span>)}</div>
      {action}
    </div>;
  }
  if (index === 1) {
    const card = config.study;
    return <div className={`${styles.card} ${styles.studyCard}`}>
      <CardHeader label={step.label} />
      <div className={styles.metricHeadline}>
        <strong className={styles.metricValue}>{card.value}</strong>
        <div><p className={styles.eyebrow}>{card.unit}</p><p className={styles.metricTitle}>{card.heading[0]}<br /><span>{card.heading[1]}</span></p></div>
      </div>
      <div className={styles.studyPanels}>{card.panels.map((panel, i) => <div key={panel.label} data-dark={i === 1}>
        <p className={styles.eyebrow}>{panel.label}</p>
        <p className={styles.panelMetric}><strong>{panel.value}</strong><span>{panel.unit}</span></p>
        <p className={styles.panelDetail}>{panel.detail}</p>
      </div>)}</div>
      <div className={styles.skills}><p className={styles.eyebrow}>Au cœur du parcours</p><div>{card.skills.map((skill, i) => <span key={skill}><small>0{i + 1}</small>{skill}</span>)}</div></div>
      {action}
    </div>;
  }
  if (index === 2) {
    const card = config.practice;
    return <div className={`${styles.card} ${styles.practiceCard}`}>
      <CardHeader label={step.label} />
      <p className={styles.practiceTitle}>{card.heading[0]}<br /><span>{card.heading[1]}</span></p>
      <div className={styles.practiceSheet}>
        <div className={styles.sheetHeader}><p className={styles.eyebrow}>{card.eyebrow}</p><Arrow rise /></div>
        <ol>{card.rows.map((row, i) => <li key={row.title}><span className={styles.rowNumber}>0{i + 1}</span><div><strong>{row.title}</strong><p>{row.text}</p></div></li>)}</ol>
      </div>
      <p className={styles.practiceNote}>{card.note}</p>
      {action}
    </div>;
  }
  const card = config.outcome;
  return <div className={`${styles.card} ${styles.outcomeCard}`}>
    <div className={styles.futureOrbit} aria-hidden="true" />
    <CardHeader label={step.label} />
    <p className={styles.futureHeading}>{card.heading[0]}<br /><span>{card.heading[1]}</span></p>
    <div className={styles.destination}><strong data-long={card.code.length > 4}>{card.code}<span><Arrow rise /></span></strong><p>{card.role}</p></div>
    <div className={styles.milestones}>{card.milestones.map(item => <Link key={item.title} href={item.href}><span>{item.label}<Arrow rise /></span><strong>{item.title}</strong><p>{item.text}</p></Link>)}</div>
    <p className={styles.validationNote}>{card.note}</p>
    {action}
  </div>;
}

export function CourseJourney({ course }: { course: CourseJourneyKey }) {
  const config: CourseJourneyConfig = courseJourneys[course];
  return <TrainingJourney
    id={config.id}
    name={config.name}
    theme={config.theme}
    eyebrow={config.eyebrow}
    title={<>{config.heading[0]}<br /><span>{config.heading[1]}</span></>}
    steps={config.steps.map((step, index) => ({ ...step, visual: (onNext: () => void) => <JourneyCard config={config} index={index} onNext={onNext} /> }))}
  />;
}
