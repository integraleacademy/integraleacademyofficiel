import Image from 'next/image';
import Link from 'next/link';
import { CampusFormationTags } from './CampusFormationTags';
import { locations } from '@/data/locations';
import { destinationArtwork } from '@/data/siteIllustrations';
import styles from './CampusSection.module.css';

export function CampusSection({ showDirections = false }: { showDirections?: boolean } = {}) {
  return (
    <section className={styles.section} aria-labelledby="home-campus-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="home-campus-title">{showDirections ? 'Préparer votre venue' : 'Nos centres de formation'}</h2>
          <Link href="/ecole">Découvrir notre école <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.grid}>
          {locations.map(({ id, shortName, planningKey, address, detail, tags }) => {
            const artwork = destinationArtwork[planningKey];
            return (
              <article key={id} id={`centre-${planningKey}`} className={styles.centre}>
                <Image src={artwork.src} alt="" width={1536} height={1024} sizes="(max-width: 700px) 94vw, (min-width: 1600px) 710px, 47vw" />
                <div className={styles.caption}>
                  <h3>{shortName}</h3>
                  <CampusFormationTags tags={tags} />
                  <p>{address}</p>
                  {showDirections && <div className={styles.directions}>
                    <p>{detail}</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">Obtenir l’itinéraire <span aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
                  </div>}
                  <Link href={`/planning?lieu=${planningKey}#sessions`}>{id === 'paris' ? 'Voir les sessions programmées à Paris' : 'Voir les dates sur la Côte d’Azur'} <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
