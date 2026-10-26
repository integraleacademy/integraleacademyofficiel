import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { courseJourneys } from '@/data/courseJourneys';
import { ManualArtwork } from './ManualArtwork';
import { ssiapEditorialArtwork } from '@/data/siteIllustrations';
import styles from './SsiapExperience.module.css';
import { SsiapJourneyDisclosure } from './SsiapExperienceInteractions';

export function SsiapJourneyOverview() {
  const journey = courseJourneys['ssiap-1'];
  return <section id={journey.id} className={styles.journeyOverview} aria-labelledby="ssiap-journey-title"><div className={styles.container}>
    <div className={styles.journeyHeading}><div><p className={styles.eyebrow}>{journey.eyebrow}</p><h2 id="ssiap-journey-title">{journey.heading[0]}<br /><span>{journey.heading[1]}</span></h2></div><p>Votre projet prend forme.<br /><strong>Explorez les étapes de votre parcours.</strong></p></div>
    <SsiapJourneyDisclosure labels={journey.steps.map(step => step.label)}>{journey.steps.map((step, index) => <Fragment key={step.label}>
      <h3>{step.title}</h3><p>{step.description}</p>
      {index === 0 && <><Image src={journey.opening.image} alt="Un agent SSIAP 1 porte assistance à une personne en fauteuil roulant" width={1536} height={1024} sizes="(max-width: 700px) 90vw, 300px" /><p className={styles.eyebrow}>{journey.opening.kicker}</p><h4>{journey.opening.heading.join(' ')}</h4><p>{journey.opening.text}</p><p>{journey.opening.verbs.join(' · ')}</p></>}
      {index === 1 && <><h4>{journey.study.heading.join(' ')}</h4><p><strong>{journey.study.value}</strong> {journey.study.unit}</p><dl>{journey.study.panels.map(panel => <div key={panel.label}><dt>{panel.label} · {panel.value} {panel.unit}</dt><dd>{panel.detail}</dd></div>)}</dl><p className={styles.eyebrow}>Au cœur du parcours</p><ul>{journey.study.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></>}
      {index === 2 && <><h4>{journey.practice.heading.join(' ')}</h4><p className={styles.eyebrow}>{journey.practice.eyebrow}</p><dl>{journey.practice.rows.map(row => <div key={row.title}><dt>{row.title}</dt><dd>{row.text}</dd></div>)}</dl><p>{journey.practice.note}</p></>}
      {index === 3 && <><h4>{journey.outcome.heading.join(' ')}</h4><p><strong>{journey.outcome.code}</strong> · {journey.outcome.role}</p>{journey.outcome.milestones.map(item => <Link key={item.title} href={item.href} className={styles.journeyMilestone}><small>{item.label}</small><strong>{item.title}</strong><span>{item.text} ↗</span></Link>)}<p>{journey.outcome.note}</p></>}
      <Link className={styles.inlineLink} href={step.href}>{step.link} ↗</Link>
    </Fragment>)}</SsiapJourneyDisclosure>
    <div id={`${journey.id}-suite`} />
  </div></section>;
}

export function SsiapAdmissionDossier({ prerequisites, enrollment }: { prerequisites: string[][]; enrollment: string[] }) {
  return <>
    <div className={styles.admissionDossier}>
      <div className={styles.dossierIllustration}><span className={styles.folderTab}>Votre entrée en formation</span><div className={styles.dossierSheet}><p className={styles.eyebrow}>Intégrale Academy · SSIAP 1</p><h3>Un projet.<br />Un dossier.<br /><span>On avance ensemble.</span></h3><div className={styles.documentLines} aria-hidden="true"><span /><span /><span /></div><a href="/documents/certificat-medical-ssiap.pdf" target="_blank" rel="noopener noreferrer"><span className={styles.pdfBadge}>PDF</span><span>Certificat médical<small>Le document à préparer</small></span><span aria-hidden="true">↓</span></a><p className={styles.dossierStamp}>Accompagné<br /><strong>par notre équipe</strong></p></div></div>
      <div className={styles.requirements}><p className={styles.eyebrow}>Les quatre points à vérifier</p>{prerequisites.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}<div className={styles.requirementLinks}><a href="/documents/certificat-medical-ssiap.pdf" target="_blank" rel="noopener noreferrer">Télécharger le certificat médical (PDF) ↗</a><a href="#dates-tarifs">Choisir entre SSIAP 1 et SSIAP 1 + SST →</a></div></div>
    </div>
    <div className={styles.enrollment}><div><p className={styles.eyebrow}>Inscription</p><h3>Cinq étapes, un dossier maîtrisé.</h3></div><ol>{enrollment.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol></div>
  </>;
}

export function SsiapExamExperience({ steps }: { steps: string[][] }) {
  return <div className={styles.examExperience}>
    <div className={styles.examTheory}><p className={styles.eyebrow}>01 · {steps[0][1]}</p><div className={styles.examMetrics}><div><strong>30</strong><span>questions</span></div><span aria-hidden="true">/</span><div><strong>30</strong><span>minutes</span></div></div><p>{steps[0][2]}</p><div className={styles.examThreshold}><strong>12<span>/20</span></strong><span>La note minimale<br />attendue au QCM</span></div></div>
    <div className={styles.examPractice}><ManualArtwork illustration={ssiapEditorialArtwork.exam} natural sizes="(max-width: 800px) 90vw, 600px" /><div><p className={styles.eyebrow}>02 · {steps[1][1]}</p><h3>Vos réflexes, en situation.</h3><p>{steps[1][2]}</p></div></div>
    <div className={styles.examValidation}><span className={styles.validationMark} aria-hidden="true">✓</span><div><p className={styles.eyebrow}>03 · {steps[2][1]}</p><p>{steps[2][2]}</p></div><span className={styles.diploma}>SSIAP 1<small>Diplôme · RS5641</small></span></div>
  </div>;
}
