'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './SsiapReferencePage.module.css';
import mos from './SsiapMos.module.css';

type Course = 'ssiap-1' | 'ssiap-2' | 'ssiap-3';

const manuals = {
  'ssiap-1': {
    label: 'SSIAP 1', count: 20,
    specimenUrl: 'https://gestionstagiaires-test-v2.onrender.com/static/manuals/specimens/ssiap1-20-pages.pdf',
    pages: [
      { file: 'page-02.webp', label: 'Le triangle du feu' },
      { file: 'page-07.webp', label: 'Le compartimentage' },
      { file: 'page-14.webp', label: 'Observer le résultat d’un DAS' },
      { file: 'page-19.webp', label: 'Choisir et comprendre l’extincteur' },
    ],
  },
  'ssiap-2': {
    label: 'SSIAP 2', count: 20,
    specimenUrl: 'https://gestionstagiaires-r5no.onrender.com/static/manuals/specimens/ssiap2-20-pages.pdf',
    pages: [
      { file: 'page-02.webp', label: 'La posture du chef d’équipe' },
      { file: 'page-07.webp', label: 'Gérer un désaccord avec un tiers' },
      { file: 'page-14.webp', label: 'Une protection des personnes continue' },
      { file: 'page-19.webp', label: 'Transmettre quatre informations essentielles' },
    ],
  },
  'ssiap-3': {
    label: 'SSIAP 3', count: 3,
    specimenUrl: 'https://gestionstagiaires-r5no.onrender.com/static/manuals/specimens/ssiap3-3-pages.pdf',
    pages: [
      { file: 'page-01.webp', label: 'Conseiller le chef d’établissement' },
      { file: 'page-02.webp', label: 'Analyser les risques' },
      { file: 'page-03.webp', label: 'Préparer le budget du service' },
    ],
  },
};

export function SsiapManualPreview({ course = 'ssiap-1' }: { course?: Course }) {
  const { label, pages, count, specimenUrl } = manuals[course];
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  function close() { dialog.current?.close(); setSelected(null); opener.current?.focus(); }
  return <section className={`${styles.manual} ${mos.manual}`} aria-labelledby="manuel-ssiap-title">
    <div className={mos.container}>
      <div className={mos.sectionHeading}><div><p className={styles.eyebrow}>Votre support, avant même le premier cours</p><h2 id="manuel-ssiap-title" className={styles.sectionTitle}>Ouvrez votre<br /><em>manuel {label}</em></h2></div><div><p className={styles.intro}>Des cours illustrés, des schémas et des repères pour apprendre et réviser. Découvrez une sélection de pages de votre manuel de formation.</p><a className={styles.textLink} href={specimenUrl} target="_blank" rel="noopener noreferrer">Feuilleter les {count} pages sélectionnées <span aria-hidden="true">↗</span><span className="sr-only"> (PDF, nouvel onglet)</span></a></div></div>
      <div className={`${styles.manualPages} ${mos.manualPages}`}>{pages.map((page, index) => <button type="button" key={page.file} onClick={event => { opener.current = event.currentTarget; setSelected(index); }} aria-label={`Agrandir l’extrait ${index + 1} du manuel ${label}`}><Image src={`/images/${course}/extraits/${page.file}`} alt={`Extrait du manuel ${label} : ${page.label}`} width={780} height={1103} sizes="(max-width: 600px) 43vw, 23vw" /><span>Extrait {String(index + 1).padStart(2, '0')} <span aria-hidden="true">↗</span></span><small>{page.label}</small></button>)}</div>
    </div>
    <dialog ref={dialog} className={styles.manualDialog} aria-label={`Extrait du manuel ${label}`} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => {
      if (selected === null) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); setSelected((selected + 1) % pages.length); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSelected((selected + pages.length - 1) % pages.length); }
    }}>
      {selected !== null && <><div className={styles.dialogBar}><strong>Manuel {label} · extrait {selected + 1} / {pages.length}</strong><button type="button" onClick={close} autoFocus>Fermer ✕</button></div><Image src={`/images/${course}/extraits/${pages[selected].file}`} alt={`Extrait ${selected + 1} du manuel ${label} agrandi`} width={780} height={1103} sizes="(max-width: 800px) 90vw, 700px" /><div className={styles.dialogBar}><button type="button" onClick={() => setSelected((selected + pages.length - 1) % pages.length)}>← Précédent</button><button type="button" onClick={() => setSelected((selected + 1) % pages.length)}>Suivant →</button></div></>}
    </dialog>
  </section>;
}

const questions = {
  'ssiap-1': {
    prompt: 'Lors d’une ronde, vous repérez des cartons qui encombrent un dégagement. Quelle action choisissez-vous ?',
    choices: ['Attendre la prochaine ronde.', 'Faire dégager le passage et rendre compte.', 'Déplacer le panneau de sortie.'],
    correct: 1,
    success: 'C’est le bon réflexe. Le dégagement doit rester libre. Faites retirer l’obstacle selon les consignes du site et rendez compte de l’anomalie.',
    feedback: 'Un dégagement encombré peut gêner l’évacuation. Il faut faire retirer l’obstacle selon les consignes du site et rendre compte de l’anomalie.',
  },
  'ssiap-2': {
    prompt: 'Vous présentez une nouvelle consigne lors du briefing. Comment vérifiez-vous que chaque agent a compris son rôle ?',
    choices: ['Demander à chacun de reformuler sa mission.', 'Afficher la consigne à la fin du service.', 'Demander uniquement une signature.'],
    correct: 0,
    success: 'Oui. En écoutant chaque agent reformuler sa mission, vous pouvez repérer et clarifier un malentendu avant la prise de poste.',
    feedback: 'Une signature ou un affichage atteste d’une transmission. Demandez aussi à chaque agent d’expliquer la mission qui lui revient.',
  },
  'ssiap-3': {
    prompt: 'La direction prépare le budget de maintenance. Sur quoi appuyez-vous vos priorités ?',
    choices: ['Le prix de chaque devis uniquement.', 'L’ordre de réception des devis.', 'Les risques identifiés, les obligations et les échéances.'],
    correct: 2,
    success: 'Oui. Ces éléments permettent de justifier les priorités et de présenter à la direction un calendrier de dépenses argumenté.',
    feedback: 'Le coût et les dates de réception des devis ne suffisent pas à apprécier les besoins de sécurité. Reliez chaque dépense aux risques, aux obligations et aux échéances.',
  },
};

export function SsiapPracticeQuestion({ course = 'ssiap-1' }: { course?: Course }) {
  const [answer, setAnswer] = useState<number | null>(null);
  const { prompt, choices, correct, success, feedback } = questions[course];
  return <div className={styles.practiceQuestion}>
    <div><p className={styles.eyebrow}>À vous d’observer · Mise en situation</p><h3>Votre premier réflexe ?</h3><p>{prompt}</p></div>
    <div><div className={styles.answers}>{choices.map((choice, index) => <button type="button" key={choice} onClick={() => setAnswer(index)} aria-pressed={answer === index} data-selected={answer === index}><span>{String(index + 1).padStart(2, '0')}</span>{choice}</button>)}</div>
      <div className={styles.feedback} aria-live="polite">{answer === null ? 'Choisissez une réponse pour découvrir l’explication.' : answer === correct ? success : feedback}</div>
    </div>
  </div>;
}
