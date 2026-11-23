'use client';

import { useState } from 'react';
import styles from './vtc.module.css';

// Examen blanc de Gestion Stagiaires, module H, question vtc-h-independent-04 (leçon H.02).
const answers = [
  ['faster', 'Choisir A et annoncer les 8 € seulement à l’arrivée, car A est plus rapide.'],
  ['certain', 'Choisir B en affirmant qu’aucun retard n’est possible puisqu’il reste onze minutes.'],
  ['agree', 'Présenter les deux temps et le supplément éventuel, puis confirmer le choix avant le départ.'],
] as const;

export function VtcLessonSample() {
  const [result, setResult] = useState('');
  return <section id="extrait-vtc" className={styles.sample} aria-labelledby="extrait-vtc-title">
    <div className={styles.wrap}>
      <header className={styles.sectionIntro}><p className={styles.label}>Extrait du e-learning Intégrale Academy</p>
        <h2 id="extrait-vtc-title">À vous de choisir l’itinéraire</h2>
        <p>Entrez dans le cours « Préparer un itinéraire », puis essayez une question de notre examen blanc.</p></header>
      <div className={styles.sampleGrid}>
        <figure className={styles.lessonFilm}>
          <video controls preload="none" playsInline poster="/videos/vtc/preparer-un-itineraire.webp" aria-label="Extrait du cours Préparer un itinéraire">
            <source src="/videos/vtc/preparer-un-itineraire.mp4" type="video/mp4" />
            <track kind="captions" src="/videos/vtc/preparer-un-itineraire.vtt" srcLang="fr" label="Français" default />
          </video>
          <figcaption><strong>Préparer un itinéraire</strong><span>Module H · Vidéo du cours · 45 secondes</span></figcaption>
          <a href="#formation" className={styles.textLink}>Visiter l’espace stagiaire</a>
        </figure>
        <form className={styles.sampleQuestion} onSubmit={event => {
          event.preventDefault();
          setResult(String(new FormData(event.currentTarget).get('choix')));
        }} onChange={() => setResult('')} onReset={() => setResult('')}>
          <fieldset><legend><span className={styles.label}>Question d’examen blanc</span>
            Deux itinéraires sont possibles. Le premier prend 32 minutes avec 8 € de péage. Le second prend 39 minutes sans péage. Il reste 50 minutes avant l’arrivée demandée et le devis exclut les péages. Que proposez-vous&nbsp;?</legend>
            {answers.map(([key, label]) => <label key={key}><input type="radio" name="choix" value={key} required />{label}</label>)}
          </fieldset>
          <button className={styles.checkAnswer} type="submit">Vérifier ma réponse</button>
          <div role="status" className={styles.feedback}>{result && <>
            <strong>{result === 'agree' ? 'Bonne réponse.' : 'Le bon réflexe est de présenter les deux itinéraires au client.'}</strong>
            <p>Les deux trajets respectent le délai estimé. Annoncez le temps et le coût de chacun, puis convenez du trajet avant le départ. La circulation peut évoluer.</p>
          </>}</div>
          {result && <button className={styles.textLink} type="reset">Recommencer</button>}
        </form>
      </div>
    </div>
  </section>;
}
