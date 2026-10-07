import Image from 'next/image';
import styles from './IntegraleWelcomePack.module.css';

const manuals = {
  aps: {
    src: '/images/welcome-pack/pack-aps-panoramique-sans-ecocup.webp',
    title: 'Le manuel APS',
    alt: 'Le Pack Intégrale présenté avec le manuel APS, le carnet noir et doré et le stylo. Le manuel et le carnet sont présentés fermés et ouverts.',
  },
  sst: {
    src: '/images/welcome-pack/pack-sst-panoramique-sans-ecocup.webp',
    title: 'Le manuel SST',
    alt: 'Le Pack Intégrale présenté avec le manuel SST, le carnet noir et doré et le stylo. Le manuel et le carnet sont présentés fermés et ouverts.',
  },
  a3p: {
    src: '/images/welcome-pack/pack-a3p-panoramique-sans-ecocup.webp',
    title: 'Le manuel A3P',
    alt: 'Le Pack Intégrale présenté avec le manuel A3P, le carnet noir et doré et le stylo. Le manuel et le carnet sont présentés fermés et ouverts.',
  },
  'desp-initial': {
    src: '/images/welcome-pack/pack-desp-initial-panoramique-sans-ecocup.webp',
    title: 'Le manuel du dirigeant',
    alt: 'Le Pack Intégrale présenté avec le manuel du dirigeant d’une société de sécurité privée, le carnet noir et doré et le stylo. Le manuel et le carnet sont présentés fermés et ouverts.',
  },
  'ssiap-1': {
    src: '/images/welcome-pack/pack-ssiap-1-panoramique-sans-ecocup.webp',
    title: 'Le manuel SSIAP 1',
    alt: 'Le Pack Intégrale présenté avec le manuel SSIAP 1, le carnet noir et doré et le stylo. Le manuel et le carnet sont présentés fermés et ouverts.',
  },
  'ssiap-2': {
    src: '/images/welcome-pack/pack-ssiap-2-panoramique-sans-ecocup.webp',
    title: 'Le manuel SSIAP 2',
    alt: 'Le Pack Intégrale présenté avec le manuel SSIAP 2, le carnet noir et doré et le stylo. Le manuel et le carnet sont présentés fermés et ouverts.',
  },
  'ssiap-3': {
    src: '/images/welcome-pack/pack-ssiap-3-panoramique-sans-ecocup.webp',
    title: 'Le manuel SSIAP 3',
    alt: 'Le Pack Intégrale présenté avec le manuel SSIAP 3, le carnet noir et doré et le stylo. Le manuel et le carnet sont présentés fermés et ouverts.',
  },
} as const;

export function IntegraleWelcomePack({ course }: { course: keyof typeof manuals }) {
  const manual = manuals[course];

  return <section id="pack-integrale" className={styles.banner} aria-labelledby="pack-integrale-title">
    <div className={styles.shell}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Les essentiels de votre formation</p>
          <h2 id="pack-integrale-title">Votre <span>Pack Intégrale.</span></h2>
        </div>
        <p className={styles.dayBadge}><span aria-hidden="true">✓</span> Remis le 1er jour de formation</p>
      </div>

      <div className={styles.pack}>
        <div className={styles.overview}>
          <div className={styles.visual}>
            <Image
              src={manual.src}
              alt={manual.alt}
              width={2172}
              height={724}
              sizes="(max-width: 900px) calc(100vw - 40px), calc(75vw - 66px)"
              quality={90}
            />
          </div>
          <ul className={styles.contents} role="list" aria-label="Vos supports de formation">
            <li>
              <span className={styles.detailLabel}>Apprendre &amp; réviser</span>
              <h3>{manual.title}</h3>
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
              sizes="(max-width: 600px) calc(37.5vw - 21px), (max-width: 900px) calc(37.5vw - 24px), calc(25vw - 22px)"
            />
          </div>
          <div className={styles.cupCopy}>
            <span className={styles.detailLabel}>Votre compagnon de pause</span>
            <h3>L’écocup Intégrale</h3>
            <p>Un gobelet réutilisable aux couleurs de l’école, pour vous accompagner à chaque pause.</p>
          </div>
        </article>
      </div>
    </div>
  </section>;
}
