'use client';

import Image from 'next/image';
import { useState } from 'react';
import experience from '@/components/ApsExperience.module.css';
import styles from './vtc.module.css';

// Captures du lecteur stagiaire de Gestion Stagiaires (7773f0c7), avec un profil de démonstration.
// Le catalogue correspondant est administré dans /admin/elearning/vtc.
const screens = {
  parcours: {
    src: '/images/vtc/experience/parcours.webp',
    title: 'Votre parcours stagiaire',
    description: 'Retrouvez vos modules, votre progression et le bouton pour reprendre la formation.',
    alt: 'Accueil de l’espace stagiaire VTC avec le bouton de démarrage du parcours et le suivi des modules.',
  },
  cours: {
    src: '/images/vtc/experience/plateforme.webp',
    title: 'Dans le cours « Préparer un itinéraire »',
    description: 'Dans le module H, vous apprenez à choisir un trajet et à expliquer ce choix au passager.',
    alt: 'Lecteur de cours VTC ouvert sur la leçon H.02 « Préparer un itinéraire », avec son illustration et son objectif.',
  },
} as const;

const views = [
  ['parcours', 'Mon parcours'],
  ['cours', 'Voir le cours'],
  ['exercice', 'Essayer un exercice'],
] as const;

type View = typeof views[number][0];

// Gestion Stagiaires, module H, atelier H.02 « Préparer un itinéraire », question q1.
const departureTimes = ['8 h 15', '8 h 35', '8 h 25'];
const correctTime = '8 h 15';

function RouteExercise() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return <form className={styles.quiz} onSubmit={event => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('departure')));
  }} onChange={() => setSubmitted(null)} onReset={() => setSubmitted(null)}>
    <p className={styles.label}>Atelier H.02 · Préparer un itinéraire</p>
    <fieldset>
      <legend>Arrivée souhaitée 9 h, trajet 35 min et marge 10 min. Quel départ au plus tard selon ces hypothèses&nbsp;?</legend>
      {departureTimes.map(time => <label key={time}>
        <input type="radio" name="departure" value={time} required />{time}
      </label>)}
    </fieldset>
    <button type="submit" className={styles.checkAnswer}>Vérifier ma réponse</button>
    <div className={styles.feedback} role="status">{submitted !== null && <>
      <strong>{submitted === correctTime ? 'Bonne réponse !' : 'La réponse attendue est 8 h 15.'}</strong>
      <p>On remonte depuis l’arrivée. 9 h − 35 min − 10 min = 8 h 15, avant de compter le temps d’installation.</p>
    </>}</div>
    {submitted !== null && <button type="reset" className={styles.textLink}>Recommencer l’exercice</button>}
  </form>;
}

export function VtcElearningPreview() {
  const [view, setView] = useState<View>('parcours');
  const screen = view === 'exercice' ? null : screens[view];

  return <div className={experience.demoPreview} role="region" aria-label="Aperçu du parcours e-learning VTC">
    <div className={`${experience.browserBar} ${styles.previewBar}`}><span aria-hidden="true">● ● ●</span><span>Votre espace e-learning VTC</span></div>
    <div className={experience.slideChoices} role="group" aria-label="Choisir un aperçu du parcours VTC">
      {views.map(([key, label]) => <button key={key} type="button" aria-pressed={view === key} aria-controls="vtc-elearning-panel" onClick={() => setView(key)}>{label}</button>)}
    </div>
    <div id="vtc-elearning-panel">
      {screen ? <figure>
        <a href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={`${screen.title} · agrandir la capture dans un nouvel onglet`}>
          <Image src={screen.src} width={1280} height={800} sizes="(max-width: 800px) 92vw, 780px" alt={screen.alt} />
        </a>
        <figcaption className={experience.slideCaption}>
          <h4>{screen.title}</h4><p>{screen.description}</p>
          <a href={screen.src} className={styles.textLink} target="_blank" rel="noopener noreferrer">Agrandir la capture ↗</a>
        </figcaption>
      </figure> : <RouteExercise />}
    </div>
  </div>;
}
