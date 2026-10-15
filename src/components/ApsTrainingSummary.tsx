import styles from './ApsTrainingSummary.module.css';

export function ApsTrainingSummary() {
  return <section className={styles.summary} aria-label="La formation APS en bref">
    <div className={styles.container}>
      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>Votre certification</dt>
          <dd>
            <strong>TFP APS</strong>
            <span>Titre à finalité professionnelle</span>
            <small>Niveau 3 · RNCP 36648</small>
          </dd>
        </div>
        <div className={styles.fact}>
          <dt>Votre formation</dt>
          <dd>
            <strong>175 heures</strong>
            <span>51 h à distance · 124 h en présentiel</span>
            <small>À Puget-sur-Argens</small>
          </dd>
        </div>
        <div className={styles.fact}>
          <dt>Le secourisme inclus</dt>
          <dd>
            <strong>SST inclus</strong>
            <span>Sauveteur secouriste du travail</span>
            <small>Intégré à votre parcours</small>
          </dd>
        </div>
      </dl>
      <p className={styles.approval}>Agrément ADEF <span>n° 8320032701</span></p>
    </div>
  </section>;
}
