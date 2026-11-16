import Image from 'next/image';
import Link from 'next/link';
import { CampusFormationTags } from './CampusFormationTags';
import { locations } from '@/data/locations';
import { destinationArtwork } from '@/data/siteIllustrations';
import styles from './CampusSection.module.css';

export function CampusSection() {
  return (
    <section className={styles.section} aria-labelledby="home-campus-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="home-campus-title">Nos centres de formation</h2>
          <Link href="/ecole">Découvrir notre école <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.grid}>
          {locations.map(({ id, shortName, planningKey, address, tags }) => {
            const artwork = destinationArtwork[planningKey];
            return (
              <article key={id} id={`centre-${planningKey}`} className={styles.centre}>
                <Image src={artwork.src} alt="" width={1536} height={1024} sizes="(max-width: 700px) 94vw, (min-width: 1600px) 710px, 47vw" />
                <div className={styles.caption}>
                  <h3>{shortName}</h3>
                  <CampusFormationTags tags={tags} />
                  <p>{address}</p>
                  <Link href={`/planning?lieu=${planningKey}#sessions`}>{id === 'paris' ? 'Voir les dates du DESP à Paris' : 'Voir les dates sur la Côte d’Azur'} <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
