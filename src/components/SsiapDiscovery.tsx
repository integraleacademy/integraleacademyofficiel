'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './SsiapReferencePage.module.css';
import experience from './SsiapExperience.module.css';
import { ManualArtwork } from './ManualArtwork';
import { ssiapArtwork } from '@/data/manualIllustrations';

const specimenUrl = 'https://gestionstagiaires-test-v2.onrender.com/static/manuals/specimens/ssiap1-20-pages.pdf';
const pages = [
  { file: 'page-02.webp', label: 'Le triangle du feu' },
  { file: 'page-07.webp', label: 'Le compartimentage' },
  { file: 'page-14.webp', label: 'Observer le résultat d’un DAS' },
  { file: 'page-19.webp', label: 'Choisir et comprendre l’extincteur' },
];

export function SsiapManualPreview() {
  const [preview, setPreview] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  function close() { dialog.current?.close(); setSelected(null); opener.current?.focus(); }
  return <section className={`${styles.manual} ${experience.manualSection}`} aria-labelledby="manuel-ssiap-title">
    <div className={styles.container}>
      <div className={experience.manualLayout}>
        <div className={experience.manualCopy}><p className={experience.eyebrow}>Votre support, avant même le premier cours</p><h2 id="manuel-ssiap-title" className={styles.sectionTitle}>Ouvrez votre<br /><em>manuel SSIAP 1.</em></h2><p>Des cours illustrés, des schémas et des repères pour apprendre et réviser. Découvrez une sélection de pages de votre manuel de formation.</p><a className={styles.textLink} href={specimenUrl} target="_blank" rel="noopener noreferrer">Feuilleter les 20 pages sélectionnées <span aria-hidden="true">↗</span><span className="sr-only"> (PDF, nouvel onglet)</span></a>
          <div className={experience.manualThumbs} aria-label="Choisir une page du manuel">{pages.map((page, index) => <button type="button" key={page.file} onClick={() => setPreview(index)} aria-pressed={preview === index} aria-label={`Afficher l’extrait ${index + 1} : ${page.label}`}><Image src={`/images/ssiap-1/extraits/${page.file}`} alt="" width={50} height={71} sizes="28px" /><span>Extrait {String(index + 1).padStart(2, '0')}<strong>{page.label}</strong></span></button>)}</div>
        </div>
        <div><div className={experience.manualSpread}><Image className={experience.manualCover} src="/images/ssiap-1/manuel/couverture-ssiap-1.webp" alt="La couverture du manuel SSIAP 1 Intégrale Academy" width={600} height={849} sizes="(max-width: 700px) 35vw, 210px" /><button className={experience.manualPageButton} type="button" onClick={event => { opener.current = event.currentTarget; setSelected(preview); }} aria-label={`Agrandir l’extrait ${preview + 1} du manuel SSIAP 1`}><Image src={`/images/ssiap-1/extraits/${pages[preview].file}`} alt={`Extrait du manuel SSIAP 1 : ${pages[preview].label}`} width={780} height={1103} sizes="(max-width: 700px) 48vw, 300px" /><span>Agrandir ↗</span></button></div><div className={experience.manualCaption}><div aria-live="polite"><small>EXTRAIT {String(preview + 1).padStart(2, '0')} / 04</small><strong>{pages[preview].label}</strong></div><span><button type="button" aria-label="Afficher l’extrait précédent" onClick={() => setPreview((preview + pages.length - 1) % pages.length)}>←</button><button type="button" aria-label="Afficher l’extrait suivant" onClick={() => setPreview((preview + 1) % pages.length)}>→</button></span></div></div>
      </div>
    </div>
    <dialog ref={dialog} className={styles.manualDialog} aria-label="Extrait du manuel SSIAP 1" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => {
      if (selected === null) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); setSelected((selected + 1) % pages.length); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSelected((selected + pages.length - 1) % pages.length); }
    }}>
      {selected !== null && <><div className={styles.dialogBar}><strong>Manuel SSIAP 1 · extrait {selected + 1} / {pages.length}</strong><button type="button" onClick={close} autoFocus>Fermer ✕</button></div><Image src={`/images/ssiap-1/extraits/${pages[selected].file}`} alt={`Extrait ${selected + 1} du manuel SSIAP 1 agrandi`} width={780} height={1103} sizes="(max-width: 800px) 90vw, 700px" /><div className={styles.dialogBar}><button type="button" onClick={() => setSelected((selected + pages.length - 1) % pages.length)}>← Précédent</button><button type="button" onClick={() => setSelected((selected + 1) % pages.length)}>Suivant →</button></div></>}
    </dialog>
  </section>;
}

export function SsiapPracticeQuestion() {
  const [answer, setAnswer] = useState<number | null>(null);
  const choices = ['Attendre la prochaine ronde.', 'Faire dégager le passage et rendre compte.', 'Déplacer le panneau de sortie.'];
  return <div className={experience.practiceQuestion}>
    <div><p className={experience.eyebrow}>À vous d’observer · Mise en situation</p><h3>Votre premier réflexe ?</h3><p>Lors d’une ronde, vous repérez des cartons qui encombrent un dégagement. Quelle action choisissez-vous ?</p><div className={experience.practiceScene}><ManualArtwork illustration={ssiapArtwork.ronde} natural sizes="(max-width: 700px) 85vw, 500px" /><span>À votre tour · Une situation de ronde</span></div></div>
    <div><div className={experience.practiceAnswers}>{choices.map((choice, index) => <button type="button" key={choice} onClick={() => setAnswer(index)} aria-pressed={answer === index} data-selected={answer === index}><span>{String(index + 1).padStart(2, '0')}</span>{choice}</button>)}</div><div className={experience.practiceFeedback} data-correct={answer === 1} aria-live="polite">{answer === null ? 'Choisissez une réponse pour découvrir l’explication.' : answer === 1 ? 'C’est le bon réflexe. Le dégagement doit rester libre. Faites retirer l’obstacle selon les consignes du site et rendez compte de l’anomalie.' : 'Un dégagement encombré peut gêner l’évacuation. Il faut faire retirer l’obstacle selon les consignes du site et rendre compte de l’anomalie.'}</div></div>
  </div>;
}
