import Image from 'next/image';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { destinationArtwork } from '@/data/siteIllustrations';
import styles from './CampusSection.module.css';

const centres = {
  puget: { key: 'cote-azur', name: 'Côte d’Azur', dates: 'Voir les dates sur la Côte d’Azur' },
  paris: { key: 'paris', name: 'Paris', dates: 'Voir les dates à Paris' },
} as const;

export function CampusSection() {
  return (
    <section className={styles.section} aria-labelledby="home-campus-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="home-campus-title">Nos deux centres de formation</h2>
          <Link href="/ecole">Découvrir notre école <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.grid}>
          {locations.map(({ id, address }) => {
            const centre = centres[id];
            const artwork = destinationArtwork[centre.key];
            return (
              <article key={id} id={`centre-${centre.key}`} className={styles.centre}>
                <Image src={artwork.src} alt="" width={1536} height={1024} sizes="(max-width: 700px) 94vw, (min-width: 1600px) 710px, 47vw" />
                <div className={styles.caption}>
                  <h3>{centre.name}</h3>
                  <p>{address}</p>
                  <Link href={`/planning?lieu=${centre.key}#sessions`}>{centre.dates} <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
