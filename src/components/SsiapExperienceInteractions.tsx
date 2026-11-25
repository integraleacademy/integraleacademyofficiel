'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { TrainingProgramExplorer } from './TrainingProgramExplorer';
import { ManualArtwork } from './ManualArtwork';
import { ssiapArtwork, type ManualIllustration } from '@/data/manualIllustrations';
import { ssiapEditorialArtwork } from '@/data/siteIllustrations';
import styles from './SsiapExperience.module.css';

export function SsiapJourneyDisclosure({ labels, children }: { labels: string[]; children: ReactNode[] }) {
  const [active, setActive] = useState<number | null>(null);
  const titles = ['Découvrir le métier', 'Acquérir les bases', 'Pratiquer les gestes', 'Préparer le diplôme'];
  return <div className={styles.journeyRail}>{labels.map((label, index) => <div key={label} className={styles.journeyStep} data-open={active === index}>
    <button type="button" data-journey-trigger id={`journey-trigger-${index}`} aria-expanded={active === index} aria-controls={`journey-detail-${index}`} onClick={() => setActive(active === index ? null : index)}><span className={styles.journeyNumber}>0{index + 1}</span><span>{label}<strong>{titles[index]}</strong></span><span className={styles.disclosureIcon} aria-hidden="true">+</span></button>
    <div id={`journey-detail-${index}`} role="region" aria-labelledby={`journey-trigger-${index}`} hidden={active !== index} className={styles.journeyDetail}>{children[index]}</div>
  </div>)}</div>;
}

function useTabs(count: number) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % count;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + count - 1) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }
  return { active, setActive, buttons, onKeyDown };
}

export function SsiapMissionShowcase({ missions }: { missions: string[][] }) {
  const tabs = useTabs(missions.length);
  const scenes = [ssiapArtwork.ronde, ssiapArtwork.pc, ssiapArtwork.secours];
  const captions = ['La vigilance commence pendant la ronde.', 'Une information. Une procédure. Une réponse.', 'Des consignes claires, des secours orientés.'];
  return <div className={styles.missionShowcase}>
    <div className={styles.missionChoices} role="tablist" aria-label="Les trois missions de l’agent SSIAP 1" aria-orientation="vertical">
      {missions.map(([number, title, text], index) => <button key={number} ref={node => { tabs.buttons.current[index] = node; }} type="button" role="tab" id={`mission-tab-${index}`} aria-controls={`mission-panel-${index}`} aria-selected={tabs.active === index} tabIndex={tabs.active === index ? 0 : -1} onClick={() => tabs.setActive(index)} onKeyDown={event => tabs.onKeyDown(event, index)}>
        <span className={styles.stepIndex}>{number} <span aria-hidden="true">↗</span></span><strong>{title}</strong><span className={styles.missionDescription}>{text}</span>
      </button>)}
      <a className={styles.inlineLink} href="#programme">Découvrir ce que vous apprendrez ↗</a>
    </div>
    <div className={styles.missionStage}>
      {missions.map(([number, title], index) => <div key={number} id={`mission-panel-${index}`} role="tabpanel" aria-labelledby={`mission-tab-${index}`} hidden={tabs.active !== index} tabIndex={0} className={styles.missionPanel}>
        <div className={styles.stageTop}><span>Dans la peau d’un agent SSIAP 1</span><span>{number} / 03</span></div>
        <ManualArtwork illustration={scenes[index]} natural sizes="(max-width: 800px) 92vw, 720px" />
        <div className={styles.stageCaption}><span>{title}</span><strong>{captions[index]}</strong></div>
      </div>)}
    </div>
  </div>;
}

const agentProgramScenes = [ssiapEditorialArtwork.fire, ssiapEditorialArtwork.building, ssiapEditorialArtwork.systems, ssiapEditorialArtwork.reporting, ssiapEditorialArtwork.exercise];

export function SsiapProgramExplorer({ parts, course = 'ssiap-1', label = 'SSIAP 1', hours = '67', menuTitle = 'Les cinq parties', progression = 'Des fondamentaux aux situations de terrain.', scenes = agentProgramScenes }: {
  parts: string[][]; course?: string; label?: string; hours?: string; menuTitle?: string; progression?: string; scenes?: readonly ManualIllustration[];
}) {
  return <TrainingProgramExplorer
    idPrefix="program" menuTitle={menuTitle} tabListLabel={`${menuTitle} du programme ${label}`}
    nextLabel="Partie suivante" restartLabel="Revenir au début" hourDistribution
    hours={hours} overview={`${parts.length} parties complémentaires`} subtitle="Hors examen et déplacements"
    facts={[['Progression', progression], ['Format', '100 % présentiel']]}
    illustration={course === 'ssiap-2' ? ssiapEditorialArtwork.reporting : course === 'ssiap-3' ? ssiapEditorialArtwork.building : ssiapArtwork.alerte}
    units={parts.map(([number, title, duration, description], index) => ({
      number, title, duration, description, delivery: `Partie ${number} / ${String(parts.length).padStart(2, '0')}`, illustration: scenes[index],
    }))}
  />;
}

const campusPhotos = [
  { src: '/images/campus/salle-formation.webp', alt: 'La salle de formation du centre Intégrale Academy à Puget-sur-Argens', label: 'La salle de formation', caption: 'Votre salle de formation · Puget-sur-Argens', description: 'Votre prochain cadre pour apprendre, échanger et avancer avec le groupe.' },
  { src: '/images/campus/accueil-centre.webp', alt: 'L’accueil du centre Intégrale Academy', label: 'L’accueil', caption: 'Un accueil, une équipe.', description: 'Des interlocuteurs pour vous accompagner pendant votre parcours.' },
  { src: '/images/campus/espace-detente.webp', alt: 'L’espace détente du centre Intégrale Academy', label: 'Les espaces de pause', caption: 'Un espace pour les pauses.', description: 'Un lieu pour souffler et partager un moment entre les cours.' },
];

export function SsiapCampusTour() {
  const tabs = useTabs(campusPhotos.length);
  return <div className={styles.campusTour}>
    <div className={styles.campusViews}>{campusPhotos.map((photo, index) => <figure key={photo.src} id={`campus-panel-${index}`} role="tabpanel" aria-labelledby={`campus-tab-${index}`} hidden={tabs.active !== index} tabIndex={0}>
      <Image src={photo.src} alt={photo.alt} width={1600} height={1066} sizes="(max-width: 800px) 100vw, 1180px" />
      <figcaption><span>Bienvenue à Puget-sur-Argens</span><strong>{photo.caption}</strong><p>{photo.description}</p></figcaption>
    </figure>)}</div>
    <div className={styles.campusControls} role="tablist" aria-label="Visiter le centre de formation">{campusPhotos.map((photo, index) => <button type="button" key={photo.src} ref={node => { tabs.buttons.current[index] = node; }} id={`campus-tab-${index}`} role="tab" aria-controls={`campus-panel-${index}`} aria-selected={tabs.active === index} tabIndex={tabs.active === index ? 0 : -1} onClick={() => tabs.setActive(index)} onKeyDown={event => tabs.onKeyDown(event, index)}><Image src={photo.src} alt="" width={120} height={80} sizes="70px" /><span><small>0{index + 1}</small>{photo.label}</span><span aria-hidden="true">↗</span></button>)}</div>
  </div>;
}
