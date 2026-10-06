import Image from 'next/image';
import styles from './ApsWelcomePack.module.css';

const items = [
  {
    id: 'manuel', number: '01', title: 'Le manuel de formation APS',
    description: 'Votre support de cours illustré pour apprendre, comprendre et réviser tout au long de la formation.',
    image: 'couverture-aps', alt: 'Couverture du manuel de formation APS Intégrale Academy',
    label: 'Apprendre & réviser',
  },
  {
    id: 'carnet', number: '02', title: 'Le carnet de notes',
    description: 'Pour garder vos repères, noter les conseils du formateur et retrouver les points essentiels.',
    image: 'carnet', alt: 'Illustration du carnet de notes bleu marine Intégrale Academy',
    label: 'Noter & mémoriser',
  },
  {
    id: 'stylo', number: '03', title: 'Le stylo',
    description: 'Toujours à portée de main pour vos prises de notes et vos activités en formation.',
    image: 'stylo', alt: 'Illustration du stylo bleu marine et argent Intégrale Academy',
    label: 'Écrire & retenir',
  },
  {
    id: 'ecocup', number: '04', title: 'L’Ecocup Intégrale Academy',
    description: 'Votre gobelet réutilisable aux couleurs de l’école, pour vous accompagner pendant les pauses.',
    image: 'ecocup', alt: 'Illustration du gobelet réutilisable Ecocup Intégrale Academy',
    label: 'Utiliser & réutiliser',
  },
] as const;

export function ApsWelcomePack() {
  return <section id="pack-integrale" aria-labelledby="pack-integrale-title" className={styles.section}>
    <div className={`page-container ${styles.shell}`}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Bienvenue chez Intégrale Academy</p>
          <h2 id="pack-integrale-title">Votre premier jour.<br /><span>Votre Pack Intégrale.</span></h2>
        </div>
        <div className={styles.intro}>
          <span className={styles.dayBadge}><span aria-hidden="true">✓</span> Remis le 1er jour de formation</span>
          <p>Dès votre arrivée, nous vous remettons votre <strong>Pack Intégrale</strong> : un manuel de formation APS, un carnet de notes, un stylo et un gobelet réutilisable Ecocup Intégrale Academy.</p>
        </div>
      </div>
      <div className={styles.grid}>
        {items.map(item => <article key={item.id} className={styles.item}>
          <div className={styles.visual} data-item={item.id}>
            <span className={styles.number} aria-hidden="true">{item.number}</span>
            <div className={item.id === 'manuel' ? styles.book : styles.object}>
              <Image src={`/images/aps/manuel/${item.image}.webp`} alt={item.alt} fill sizes="(max-width: 540px) 80vw, (max-width: 1023px) 40vw, 260px" />
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
