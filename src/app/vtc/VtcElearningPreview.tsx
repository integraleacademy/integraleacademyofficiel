'use client';

import Image from 'next/image';
import { useState } from 'react';
import experience from '@/components/ApsExperience.module.css';
import styles from './vtc.module.css';

const screenshot = '/images/vtc/experience/plateforme.webp';
const answers = ['Le carburant utilisé pendant la course', 'La cotisation annuelle d’assurance'];

export function VtcElearningPreview() {
  const [view, setView] = useState<'cours' | 'quiz'>('cours');
  const [answer, setAnswer] = useState<number | null>(null);

  return <div className={experience.demoPreview} role="region" aria-label="Aperçu du e-learning VTC">
    <div className={`${experience.browserBar} ${styles.previewBar}`}><span aria-hidden="true">● ● ●</span><span>Votre espace e-learning VTC</span></div>
    <div className={experience.slideChoices} role="group" aria-label="Découvrir le e-learning">
      <button type="button" aria-pressed={view === 'cours'} aria-controls="vtc-elearning-panel" onClick={() => setView('cours')}>Voir le cours</button>
      <button type="button" aria-pressed={view === 'quiz'} aria-controls="vtc-elearning-panel" onClick={() => setView('quiz')}>Essayer un quiz</button>
    </div>
    <div id="vtc-elearning-panel">
      {view === 'cours' ? <figure>
        <a href={screenshot} target="_blank" rel="noopener noreferrer" aria-label="Agrandir la capture du cours VTC dans un nouvel onglet">
          <Image src={screenshot} width={1912} height={868} sizes="(max-width: 800px) 92vw, 780px" alt="L’espace e-learning VTC avec la liste des leçons et un extrait du module de marketing" />
        </a>
        <figcaption className={experience.slideCaption}><h4>À l’intérieur du cours</h4>
          <p>Extrait de la séquence de développement commercial. Le menu à gauche permet de retrouver chaque leçon.</p>
          <a href={screenshot} className={styles.textLink} target="_blank" rel="noopener noreferrer">Agrandir la capture ↗</a>
        </figcaption>
      </figure> : <div className={styles.quiz}>
        <p className={styles.label}>Exemple de quiz · Gestion</p>
        <fieldset><legend>Quelle dépense varie avec la distance parcourue&nbsp;?</legend>
          {answers.map((label, index) => <label key={label}>
            <input type="radio" name="vtc-quiz" checked={answer === index} onChange={() => setAnswer(index)} />{label}
          </label>)}
        </fieldset>
        <div className={styles.feedback} role="status">{answer !== null && <>
          <strong>{answer === 0 ? 'Bonne réponse · 1/1' : 'À revoir · 0/1'}</strong>
          <p>Le carburant est une charge variable. La cotisation annuelle d’assurance reste due indépendamment du nombre de kilomètres parcourus.</p>
        </>}</div>
        {answer !== null && <button type="button" className={styles.textLink} onClick={() => setAnswer(null)}>Recommencer le quiz</button>}
      </div>}
    </div>
  </div>;
}
