import Image from 'next/image';
import styles from './BtsIllustratedBenefits.module.css';

const extras = [
  ['01', 'Votre carte étudiante', 'Votre statut étudiant et les avantages associés.'],
  ['02', 'Des ateliers pour découvrir', 'Sport, théâtre, gestion du stress, masterclass et visites d’entreprises.'],
  ['03', '3 € par jour à l’école', 'Un crédit boissons et snacks pour les étudiants en présentiel.'],
];

export function BtsIllustratedBenefits({ courseName }: { courseName: string }) {
  return <section id="avantages-bts" aria-label={`Les avantages de votre ${courseName}`} className={styles.benefits}>
    <div className={styles.cards}>
      <article className={styles.card}>
        <figure className={styles.benefitScene}>
          <Image src="/images/bts/tenues-2026/ipad.webp" alt="Illustration : une étudiante utilise sa tablette et un stylet pour travailler ses cours de BTS" width={1200} height={800} sizes="(max-width: 700px) 94vw, 46vw" />
          <figcaption>Votre compagnon de formation.</figcaption>
        </figure>
        <div className={styles.copy}>
          <span className={styles.badge}>Dès la signature du contrat</span>
          <h3>Un iPad offert.<br /><span>Pour vos deux années.</span></h3>
          <p>L’iPad est offert dès la signature de votre contrat d’apprentissage. Vos cours, vos notes et vos projets vous accompagnent au quotidien.</p>
          <p className={styles.condition}>Sous réserve de signature d’un contrat d’apprentissage.</p>
          <div className={styles.detail}><span aria-hidden="true">✓</span> Un outil pour travailler et vous organiser.</div>
        </div>
      </article>
      <article className={styles.card}>
        <figure className={styles.benefitScene}>
          <Image src="/images/bts/tenues-2026/londres.webp" alt="Illustration d’un groupe d’étudiants découvrant Londres, devant Big Ben et le palais de Westminster" width={1200} height={800} sizes="(max-width: 700px) 94vw, 46vw" />
          <figcaption>Votre promotion, à Londres.</figcaption>
        </figure>
        <div className={styles.copy}>
          <span className={styles.badge}>En 2ᵉ année · 100 % pris en charge</span>
          <h3>Direction Londres.<br /><span>Un voyage à partager.</span></h3>
          <p>Partez avec votre promotion en deuxième année. Le voyage à Londres est intégralement financé par Intégrale Academy pour les étudiants de la promotion.</p>
          <p className={styles.condition}>Sous réserve de signature d’un contrat d’apprentissage.</p>
          <div className={styles.detail}><span aria-hidden="true">✓</span> Une expérience collective au-delà des cours.</div>
        </div>
      </article>
    </div>
    <div className={styles.extras}>{extras.map(([number, title, text]) => <article key={number}><span aria-hidden="true">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
  </section>;
}
