import styles from './ApsTrainingSummary.module.css';

export function ApsTrainingSummary({ location }: { location: string }) {
  return <dl data-session-details className={styles.facts} aria-label="La formation APS en bref">
    <div className={styles.fact}>
      <dt>Certification</dt>
      <dd>
        <strong>TFP APS</strong>
        <span>Titre à finalité professionnelle</span>
        <small>Niveau 3 · RNCP 36648</small>
      </dd>
    </div>
    <div className={styles.fact}>
      <dt>Durée et format</dt>
      <dd>
        <strong>175 heures</strong>
        <span>51 h à distance</span>
        <span>124 h en présentiel</span>
      </dd>
    </div>
    <div className={styles.fact}>
      <dt>Secourisme</dt>
      <dd>
        <strong>SST inclus</strong>
        <span>Sauveteur secouriste du travail</span>
        <small>Intégré à votre parcours</small>
      </dd>
    </div>
    <div className={styles.fact}>
      <dt>Lieu de formation</dt>
      <dd><strong>{location}</strong></dd>
    </div>
  </dl>;
}
