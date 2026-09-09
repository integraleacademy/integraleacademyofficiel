import styles from './VtcAutonomousEnrollmentBanner.module.css';

const enrollmentUrl = 'https://assistance-alw9.onrender.com/inscriptions';

export function VtcAutonomousEnrollmentBanner() {
  return (
    <section className={styles.section} aria-labelledby="vtc-autonomous-title">
      <div className={styles.banner}>
        <span className={styles.wordmark} aria-hidden="true">VTC</span>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> Inscription CPF · En toute autonomie
          </p>
          <h2 id="vtc-autonomous-title" className={styles.title}>
            Votre nouveau départ<br />
            <span>commence ici.</span>
          </h2>
          <p className={styles.description}>
            Inscrivez-vous en formation <strong>Chauffeur VTC</strong> en totale
            autonomie, grâce à un parcours en ligne qui vous guide pas à pas.
          </p>
        </div>

        <div className={styles.conditions}>
          <p className={styles.conditionsLabel}>Deux points à vérifier avant de démarrer</p>
          <div className={styles.condition}>
            <span className={styles.conditionIcon} aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M6 10V8a3 3 0 0 1 3-3h14v5M6 10h20v16H9a3 3 0 0 1-3-3V10Z" />
                <path d="M26 15h-7v7h7M22 18.5h.01" />
              </svg>
            </span>
            <div>
              <span className={styles.conditionNumber}>01 · Votre financement</span>
              <h3>Plus de <span className={styles.amount}>1 500 €</span> sur votre CPF ?</h3>
              <p>Disponibles sur votre Compte Personnel de Formation (CPF).</p>
            </div>
          </div>
          <div className={styles.condition}>
            <span className={`${styles.conditionIcon} ${styles.identityIcon}`} aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="8" y="3" width="16" height="26" rx="4" />
                <path d="M13 6h6M14 26h4m-6-10 3 3 6-7" />
              </svg>
            </span>
            <div>
              <span className={styles.conditionNumber}>02 · Votre connexion</span>
              <h3>Une Identité Numérique La Poste fonctionnelle ?</h3>
              <p>Pour vous connecter avec <strong>FranceConnect+</strong>.</p>
            </div>
          </div>
        </div>

        <div className={styles.action}>
          <p className={styles.actionPrompt}>Vous avez les deux ? À vous de jouer.</p>
          <a className={styles.cta} href={enrollmentUrl}>
            <span>Je m’inscris en formation VTC</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </span>
          </a>
          <p className={styles.reassurance}>Votre inscription en ligne. Notre équipe à vos côtés si besoin.</p>
        </div>
      </div>
    </section>
  );
}
