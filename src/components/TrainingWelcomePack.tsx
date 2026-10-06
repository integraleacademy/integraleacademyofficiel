import Image from 'next/image';
import styles from './ApsWelcomePack.module.css';
import { btsArtwork, type BtsArtworkCode } from '@/data/btsIllustrations';

const manuals = {
  a3p: { theme: 'green', title: 'Le manuel de formation A3P', name: 'un manuel de formation A3P', image: '/images/a3p/manuel/couverture-a3p.webp' },
  'ssiap-1': { theme: 'red', title: 'Le manuel de formation SSIAP 1', name: 'un manuel de formation SSIAP 1', image: '/images/ssiap-1/manuel/couverture-ssiap-1.webp' },
  'desp-initial': { theme: 'orange', title: 'Le manuel du dirigeant', name: 'un manuel de formation du dirigeant', image: '/images/desp/manuel/couverture-dssp.webp' },
  'desp-vae': { theme: 'orange', title: 'Le manuel du dirigeant', name: 'un manuel de formation du dirigeant', image: '/images/desp/manuel/couverture-dssp.webp' },
  vtc: { theme: 'violet', title: 'Le manuel de formation VTC', name: 'un manuel de formation VTC', image: '/images/vtc/manuel/couverture-vtc.webp' },
  sst: { theme: 'green', title: 'Le manuel de formation SST', name: 'un manuel de formation SST', image: '/images/sst/manuel/couverture-sst.webp' },
} as const;

export function TrainingWelcomePack({ course }: { course: keyof typeof manuals | `bts-${BtsArtworkCode}` }) {
  const btsCode = course.startsWith('bts-') ? course.slice(4) as BtsArtworkCode : undefined;
  const manual = btsCode ? { theme: 'bts', title: `Les supports de cours BTS ${btsCode.toUpperCase()}`, name: `vos supports de cours BTS ${btsCode.toUpperCase()}`, image: btsArtwork[btsCode].src } : manuals[course as keyof typeof manuals];
  const vae = course === 'desp-vae';
  const items = [
    {
      id: 'manuel', title: manual.title,
      description: vae ? 'Votre support illustré pour retrouver les repères du métier et accompagner votre travail sur l’expérience.' : 'Votre support de cours illustré pour apprendre, comprendre et réviser tout au long de la formation.',
      image: manual.image, alt: `${manual.title} Intégrale Academy : couverture du support remis dans le pack`, label: 'Apprendre & réviser',
    },
    {
      id: 'carnet', title: 'Le carnet de notes',
      description: vae ? 'Pour noter vos idées, les conseils de votre accompagnateur et les expériences à valoriser.' : 'Pour garder vos repères, noter les conseils du formateur et retrouver les points essentiels.',
      image: '/images/aps/manuel/carnet.webp', alt: 'Illustration du carnet de notes bleu marine Intégrale Academy', label: 'Noter & mémoriser',
    },
    {
      id: 'stylo', title: 'Le stylo',
      description: vae ? 'Toujours à portée de main pour vos prises de notes et la préparation de votre dossier.' : 'Toujours à portée de main pour vos prises de notes et vos activités en formation.',
      image: '/images/aps/manuel/stylo.webp', alt: 'Illustration du stylo bleu marine et argent Intégrale Academy', label: 'Écrire & retenir',
    },
    {
      id: 'ecocup', title: 'L’Ecocup Intégrale Academy',
      description: 'Votre gobelet réutilisable aux couleurs de l’école, pour vous accompagner pendant les pauses.',
      image: '/images/aps/manuel/ecocup.webp', alt: 'Illustration du gobelet réutilisable Ecocup Intégrale Academy', label: 'Utiliser & réutiliser',
    },
  ];

  return <section id="pack-integrale" aria-labelledby="pack-integrale-title" className={styles.section} data-theme={manual.theme}>
    <div className={`page-container ${styles.shell}`}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Bienvenue chez Intégrale Academy</p>
          <h2 id="pack-integrale-title">{vae ? 'Votre parcours VAE.' : 'Votre premier jour.'}<br /><span>Votre Pack Intégrale.</span></h2>
        </div>
        <div className={styles.intro}>
          <span className={styles.dayBadge}><span aria-hidden="true">✓</span> {vae ? 'Remis au début de l’accompagnement' : 'Remis le 1er jour de formation'}</span>
          <p>{vae ? 'Au début de votre accompagnement, nous vous remettons votre ' : 'Dès votre arrivée, nous vous remettons votre '}<strong>Pack Intégrale</strong> : {manual.name}, un carnet de notes, un stylo et un gobelet réutilisable Ecocup Intégrale Academy.</p>
        </div>
      </div>
      <div className={styles.grid}>
        {items.map((item, index) => <article key={item.id} className={styles.item}>
          <div className={styles.visual} data-item={item.id}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <div className={item.id === 'manuel' ? styles.book : styles.object}>
              {item.id === 'manuel' && btsCode ? <div className={styles.studyCover} role="img" aria-label={`Présentation des supports de cours du BTS ${btsCode.toUpperCase()} Intégrale Academy`}>
                <span className={styles.studyCoverLabel}>Supports de cours</span>
                <strong>BTS<br />{btsCode.toUpperCase()}</strong>
                <div className={styles.studyCoverArtwork}><Image src={item.image} alt="" fill sizes="160px" /></div>
                <span className={styles.studyCoverBrand}>INTÉGRALE<br /><b>ACADEMY</b></span>
              </div> : <Image src={item.image} alt={item.alt} fill sizes="(max-width: 540px) 80vw, (max-width: 1023px) 40vw, 260px" />}
            </div>
            <span className={styles.label}>{item.label}</span>
          </div>
          <div className={styles.copy}><h3>{item.title}</h3><p>{item.description}</p></div>
        </article>)}
      </div>
      <p className={styles.caption}>Illustrations de présentation du pack.</p>
    </div>
  </section>;
}
