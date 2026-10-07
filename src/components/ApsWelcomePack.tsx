import Image from 'next/image';
import styles from './ApsPackBanner.module.css';

export function ApsWelcomePack() {
  return <section id="pack-integrale" className={styles.banner} aria-labelledby="pack-integrale-title">
    <div className={styles.shell}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Les essentiels de votre formation</p>
          <h2 id="pack-integrale-title">Votre <span>Pack Intégrale.</span></h2>
          <p className={styles.description}>Un manuel pour apprendre, un carnet et un stylo pour retenir, un écocup pour les pauses. Dès votre arrivée, les bons outils vous attendent.</p>
        </div>
        <p className={styles.dayBadge}><span aria-hidden="true">✓</span> Remis le 1er jour de formation</p>
      </div>

      <div className={styles.pack}>
        <div className={styles.overview}>
          <div className={styles.visual}>
            <Image
              src="/images/welcome-pack/pack-aps-panoramique-sans-ecocup.webp"
              alt="Le manuel APS, le carnet noir et doré et le stylo du Pack Intégrale. Le manuel et le carnet sont présentés fermés et ouverts."
              width={2172}
              height={724}
              sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1384px) 62vw, 860px"
              quality={90}
            />
          </div>
          <ul className={styles.contents} role="list" aria-label="Vos supports de formation">
            <li>
              <span className={styles.detailLabel}>Apprendre &amp; réviser</span>
              <h3>Le manuel APS</h3>
              <p>Votre support illustré pour suivre les cours et retrouver les points essentiels.</p>
            </li>
            <li>
              <span className={styles.detailLabel}>Noter &amp; mémoriser</span>
              <h3>Le carnet de notes</h3>
              <p>Un carnet A5 de 40 pages, noir et doré, pour vos notes, vos idées et vos repères.</p>
            </li>
            <li>
              <span className={styles.detailLabel}>Écrire &amp; pratiquer</span>
              <h3>Le stylo Intégrale</h3>
              <p>Toujours à portée de main pour vos prises de notes et vos activités en formation.</p>
            </li>
          </ul>
        </div>

        <article className={styles.cup}>
          <div className={styles.cupVisual}>
            <Image
              src="/images/welcome-pack/ecocup-dore.webp"
              alt="Les deux faces de l’écocup transparent et doré Intégrale Academy : le logo de l’école et le grand A noir."
              width={1536}
              height={1024}
              sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 45vw, (max-width: 1384px) 32vw, 440px"
            />
          </div>
          <div className={styles.cupCopy}>
            <span className={styles.detailLabel}>Votre compagnon de pause</span>
            <h3>L’écocup<br />{' '}Intégrale Academy.</h3>
            <p>Un gobelet réutilisable aux couleurs de l’école, pour vous accompagner à chaque pause.</p>
            <span className={styles.cupNote}>Un écocup, présenté de face et de dos.</span>
          </div>
        </article>
      </div>
    </div>
  </section>;
}
