import Link from 'next/link';
import styles from './CampusSection.module.css';

export function CampusSection() {
  return <section className={styles.section} aria-labelledby="home-campus-title"><div className={styles.container}>
    <div className={styles.heading}><div><p>Votre prochain cadre de formation</p><h2 id="home-campus-title">Poussez la porte.<br /><em>Projetez-vous.</em></h2></div><Link href="/ecole">Découvrir notre école <span aria-hidden="true">↗︎</span></Link></div>
    <div className={styles.grid}>
      <figure className={styles.photo}><img src="/images/campus/campus-accueil.jpg" alt="L’accueil réel du campus Intégrale Academy à Puget-sur-Argens, avec ses fauteuils jaunes" width="1600" height="1200" loading="lazy" decoding="async" /><figcaption><span>Bienvenue chez vous.</span><strong>Puget-sur-Argens · Côte d’Azur</strong></figcaption></figure>
      <div className={styles.side}><div className={styles.copy}><span>UN LIEU POUR APPRENDRE</span><h3>Le terrain comme<br />salle de classe.</h3><p>Des espaces de formation, des équipements pédagogiques et des mises en situation pour donner du sens à ce que vous apprenez.</p><Link href="/ecole#campus">Préparer votre venue <span aria-hidden="true">↗︎</span></Link></div><div className={styles.team}><img src="/images/formation-scenes-manuel/aps-arrivee.webp" alt="Illustration de l’accueil et de l’accompagnement des apprenants" width="520" height="345" loading="lazy" /><span>Et une équipe pour avancer.</span></div></div>
    </div>
  </div></section>;
}
