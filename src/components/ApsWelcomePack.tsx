import Image from 'next/image';
import styles from './ApsPackBanner.module.css';

export function ApsWelcomePack() {
  return <section id="pack-integrale" className={styles.banner} aria-labelledby="pack-integrale-title">
    <div className={styles.heading}>
      <h2 id="pack-integrale-title">Votre <span>Pack Intégrale.</span></h2>
      <p>Remis le 1er jour de formation</p>
    </div>
    <div className={styles.visual}>
      <Image
        src="/images/welcome-pack/pack-aps-panoramique-acces.webp"
        alt="Votre Pack Intégrale : le manuel APS fermé et ouvert sur le contrôle d’accès, le carnet noir et doré fermé et ouvert, le stylo et l’Ecocup réunis sur un même visuel."
        width={2172}
        height={724}
        sizes="100vw"
        quality={90}
      />
    </div>
  </section>;
}
