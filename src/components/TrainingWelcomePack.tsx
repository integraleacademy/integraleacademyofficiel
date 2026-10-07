import Image from 'next/image';
import { WelcomePackGallery } from './WelcomePackGallery';
import styles from './ApsWelcomePack.module.css';
import { btsArtwork, type BtsArtworkCode } from '@/data/btsIllustrations';

const manuals = {
  aps: { theme: 'blue', title: 'Le manuel de formation APS', name: 'un manuel de formation APS', image: '/images/aps/manuel/couverture-aps.webp' },
  a3p: { theme: 'green', title: 'Le manuel de formation A3P', name: 'un manuel de formation A3P', image: '/images/a3p/manuel/couverture-a3p.webp' },
  'ssiap-1': { theme: 'red', title: 'Le manuel de formation SSIAP 1', name: 'un manuel de formation SSIAP 1', image: '/images/ssiap-1/manuel/couverture-ssiap-1.webp' },
  'desp-initial': { theme: 'orange', title: 'Le manuel du dirigeant', name: 'un manuel de formation du dirigeant', image: '/images/desp/manuel/couverture-dssp.webp' },
  'desp-vae': { theme: 'orange', title: 'Le manuel du dirigeant', name: 'un manuel de formation du dirigeant', image: '/images/desp/manuel/couverture-dssp.webp' },
  vtc: { theme: 'violet', title: 'Le manuel de formation VTC', name: 'un manuel de formation VTC', image: '/images/vtc/manuel/couverture-vtc.webp' },
  sst: { theme: 'green', title: 'Le manuel de formation SST', name: 'un manuel de formation SST', image: '/images/sst/manuel/couverture-sst.webp' },
} as const;

export function TrainingWelcomePack({ course }: { course: keyof typeof manuals | `bts-${BtsArtworkCode}` }) {
  const btsCode = course.startsWith('bts-') ? course.slice(4) as BtsArtworkCode : undefined;
  const manual = btsCode
    ? { theme: 'bts', title: `Les supports de cours BTS ${btsCode.toUpperCase()}`, name: `vos supports de cours BTS ${btsCode.toUpperCase()}`, image: btsArtwork[btsCode].src }
    : manuals[course as keyof typeof manuals];
  const vae = course === 'desp-vae';

  return <section id="pack-integrale" aria-labelledby="pack-integrale-title" className={styles.section} data-course-theme={manual.theme}>
    <div className={styles.shell}>
      <div className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Bienvenue chez Intégrale Academy</p>
          <h2 id="pack-integrale-title">{vae ? 'Votre parcours VAE.' : 'Votre premier jour.'}<br /><span>Votre Pack Intégrale.</span></h2>
          <p className={styles.lead}>{vae ? 'Votre accompagnement commence avec les bons outils.' : 'Tout commence avec les bons outils.'}</p>
          <p className={styles.description}>{vae ? 'Au début de votre accompagnement, nous vous remettons ' : 'Dès votre arrivée, nous vous remettons '}{manual.name}, un carnet de notes, un stylo et votre Ecocup Intégrale Academy.</p>
          <span className={styles.dayBadge}><span aria-hidden="true">✓</span> {vae ? 'Remis au début de l’accompagnement' : 'Remis le 1er jour de formation'}</span>
          <div className={styles.notebookIntro}>
            <span className={styles.detailLabel}>Le carnet Intégrale Academy</span>
            <p>Vos notes. Vos idées.<br />Vos premiers pas dans le métier.</p>
            <span className={styles.notebookSpecs}>Format A5 <span aria-hidden="true">·</span> 40 pages <span aria-hidden="true">·</span> Noir &amp; doré</span>
          </div>
        </div>
        <WelcomePackGallery />
      </div>

      <div className={styles.contentsHeading}>
        <h3>Et pour compléter votre pack…</h3>
        <span>Pour apprendre, écrire et faire une pause.</span>
      </div>
      <div className={styles.contents}>
        <article className={`${styles.product} ${styles.manualProduct}`}>
          <div className={styles.manualVisual}>
            <div className={styles.book}>
              {btsCode ? <div className={styles.studyCover} role="img" aria-label={`Présentation des supports de cours du BTS ${btsCode.toUpperCase()} Intégrale Academy`}>
                <span className={styles.studyCoverLabel}>Supports de cours</span>
                <strong>BTS<br />{btsCode.toUpperCase()}</strong>
                <div className={styles.studyCoverArtwork}><Image src={manual.image} alt="" fill sizes="160px" /></div>
                <span className={styles.studyCoverBrand}>INTÉGRALE<br /><b>ACADEMY</b></span>
              </div> : <Image src={manual.image} alt={`${manual.title} Intégrale Academy : couverture du support remis dans le pack`} fill sizes="(max-width: 540px) 125px, 160px" />}
            </div>
          </div>
          <div className={styles.productCopy}>
            <span className={styles.detailLabel}>Apprendre &amp; réviser</span>
            <h4>{manual.title}</h4>
            <p>{vae ? 'Un support illustré pour retrouver les repères du métier et accompagner votre travail sur l’expérience.' : 'Votre support illustré pour comprendre les cours et retrouver les points essentiels, tout au long de votre formation.'}</p>
          </div>
        </article>
        <article className={styles.product}>
          <div className={styles.cupVisual}>
            <Image src="/images/welcome-pack/ecocup-dore.webp" alt="Les deux faces de l’Ecocup transparent et doré Intégrale Academy, avec le logo et le grand A noir" width={1536} height={1024} sizes="(max-width: 540px) 90vw, (max-width: 900px) 45vw, 400px" />
          </div>
          <div className={styles.productCopy}>
            <span className={styles.detailLabel}>Utiliser &amp; réutiliser</span>
            <h4>Votre Ecocup, aux couleurs de l’école.</h4>
            <p>Un gobelet réutilisable pour vous accompagner pendant les pauses.</p>
          </div>
        </article>
        <article className={`${styles.product} ${styles.penProduct}`}>
          <div className={styles.penVisual}>
            <Image src="/images/aps/manuel/stylo.webp" alt="Stylo Intégrale Academy" fill sizes="(max-width: 540px) 140px, 220px" />
          </div>
          <div className={styles.productCopy}>
            <span className={styles.detailLabel}>Écrire &amp; retenir</span>
            <h4>Le stylo, toujours à portée de main.</h4>
            <p>{vae ? 'Pour vos notes et la préparation de votre dossier.' : 'Pour vos prises de notes et vos activités en formation.'}</p>
          </div>
        </article>
      </div>
      <p className={styles.caption}>Carnet et Ecocup : mises en scène réalisées à partir de nos modèles. Aperçus du carnet extraits des pages originales.</p>
    </div>
  </section>;
}
