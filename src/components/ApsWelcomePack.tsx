import Image from 'next/image';
import styles from './ApsPackBanner.module.css';

export function ApsWelcomePack() {
  return <section id="pack-integrale" className={styles.banner} aria-labelledby="pack-integrale-title">
    <div className={styles.shell}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Les essentiels de votre formation</p>
          <h2 id="pack-integrale-title">Votre <span>Pack Intégrale.</span></h2>
          <p className={styles.description}>Dès votre arrivée, les essentiels pour apprendre, prendre des notes et profiter des pauses.</p>
        </div>
        <p className={styles.dayBadge}><span aria-hidden="true">✓</span> Remis le 1er jour de formation</p>
      </div>
    </div>

    <div className={styles.visual}>
      <Image
        src="/images/welcome-pack/pack-aps-panoramique-ecocup.webp"
        alt="Le Pack Intégrale réunit le manuel APS, le carnet noir et doré, le stylo et l’écocup Intégrale Academy. Le manuel et le carnet sont présentés fermés et ouverts."
        width={2172}
        height={724}
        sizes="(max-width: 2172px) 100vw, 2172px"
        quality={90}
      />
    </div>

    <div className={styles.shell}>
      <ul className={styles.contents} role="list" aria-label="Le contenu de votre Pack Intégrale">
        <li>
          <span className={styles.detailLabel}>Apprendre &amp; réviser</span>
          <h3>Le manuel APS</h3>
          <p>Votre support illustré pour suivre les cours et retrouver les points essentiels.</p>
        </li>
        <li>
          <span className={styles.detailLabel}>Noter &amp; mémoriser</span>
          <h3>Le carnet de notes</h3>
          <p>Un carnet A5 de 40 pages, noir et doré, pour vos notes et vos idées.</p>
        </li>
        <li>
          <span className={styles.detailLabel}>Écrire &amp; pratiquer</span>
          <h3>Le stylo Intégrale</h3>
          <p>À portée de main pour vos prises de notes et vos activités en formation.</p>
        </li>
        <li>
          <span className={styles.detailLabel}>Profiter des pauses</span>
          <h3>L’écocup Intégrale</h3>
          <p>Un gobelet réutilisable aux couleurs de l’école, pour vous accompagner à chaque pause.</p>
        </li>
      </ul>
    </div>
  </section>;
}
