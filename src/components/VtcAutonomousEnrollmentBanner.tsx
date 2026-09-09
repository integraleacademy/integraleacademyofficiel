import Image from 'next/image';
import styles from './VtcAutonomousEnrollmentBanner.module.css';

const enrollmentUrl = 'https://assistance-alw9.onrender.com/inscriptions';

export function VtcAutonomousEnrollmentBanner() {
  return (
    <section id="inscription" className={styles.section} aria-labelledby="vtc-autonomous-title">
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
            Vous avez plus de 1500 euros sur votre compte CPF ? Votre Identité
            Numérique la Poste fonctionne ? Vous pouvez vous inscrire en formation{' '}
            <strong>Chauffeur VTC</strong> en totale autonomie, grâce à notre parcours
            en ligne qui vous guide pas à pas.
          </p>
        </div>

        <div className={styles.conditions}>
          <p className={styles.conditionsLabel}>Deux points à vérifier avant de démarrer</p>
          <div className={`${styles.condition} ${styles.cpfCondition}`}>
            <div className={styles.fundingHeader}>
              <span className={styles.conditionNumber}>01 · Votre financement</span>
              <span className={styles.cpfLogo}>
                <Image src="/images/mon-compte-formation.svg" alt="Mon Compte Formation" width={144} height={72} />
              </span>
            </div>
            <h3>Plus de <span className={styles.amount}>1 500 €</span> sur votre CPF ?</h3>
            <p>Disponibles sur votre Compte Personnel de Formation (CPF).</p>
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
          <p className={styles.actionPrompt}>À vous de jouer !</p>
          <a className={styles.cta} href={enrollmentUrl}>
            <span>Je m’inscris en formation VTC</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </span>
          </a>
        </div>

        <div className={styles.advisor}>
          <div className={styles.advisorCopy}>
            <h3>Vous préférez vous inscrire avec un de nos conseillers ?</h3>
            <p>Contactez-nous : notre équipe vous accompagne dans votre inscription.</p>
          </div>
          <a className={styles.advisorPhone} href="tel:+33422470768" aria-label="Appeler un conseiller au 04 22 47 07 68">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 3H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z" />
            </svg>
            <span>04 22 47 07 68</span>
          </a>
        </div>
      </div>
    </section>
  );
}
