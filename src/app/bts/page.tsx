import { ADMISSIONS_URL } from '@/data/admissions';
import Image from 'next/image';
import Link from 'next/link';
import { BtsTrainingComparisonModal } from '@/components/BtsTrainingComparisonModal';
import { CatalogueHero } from '@/components/CatalogueHero';
import { CourseJourney } from '@/components/CourseJourney';
import { TrainingReferenceCampus } from '@/components/TrainingReferenceLayout';
import { btsHighlights } from '@/data/bts-highlights';
import { btsArtwork } from '@/data/btsIllustrations';
import { btsRhythms, type BtsCode } from '@/data/btsRhythms';
import { originalArtwork } from '@/data/originalArtwork';
import { createPageMetadata } from '@/lib/seo';
import identity from '@/components/BtsIdentity.module.css';
import styles from './bts.module.css';

export const metadata = createPageMetadata('/bts');


export default function BtsPage() {
  return <>
    <CatalogueHero
      id="bts-title"
      title={<>Choisissez votre BTS <em>en alternance</em></>}
      description="De la sécurité au commerce, de l’immobilier à la comptabilité, préparez un diplôme d’État de niveau bac +2 en deux ans. Suivez les cours à Puget-sur-Argens ou en visioconférence selon le parcours."
      artwork={originalArtwork['bts-ndrc-parcours']}
      actions={[{ label: 'Découvrir les six BTS', href: '#formations-bts' }, { label: 'Déposer ma candidature', href: ADMISSIONS_URL }]}
    />
    <section id="formations-bts" aria-labelledby="catalogue-bts-title" className={styles.catalogue}>
      <header className={styles.catalogueHeading}>
        <h2 id="catalogue-bts-title">Quel BTS vous correspond ?</h2>
        <BtsTrainingComparisonModal items={btsHighlights} className={styles.compare} />
      </header>
      {btsHighlights.map((bts) => {
        const artwork = btsArtwork[bts.visual];
        const rhythm = btsRhythms[bts.visual.toUpperCase() as BtsCode];
        return (
          <article key={bts.slug} id={`bts-${bts.visual}`} aria-labelledby={`titre-${bts.visual}`}
            className={`${styles.band} ${identity.identity}`} data-bts={bts.visual}>
            <div className={styles.bandInner}>
              <div className={styles.bandCopy}>
                <h3 id={`titre-${bts.visual}`}>{bts.shortTitle} <em>{bts.title}</em></h3>
                <p>{bts.description}</p>
                <dl className={styles.bandRhythm}>
                  <dt>Rythme d’alternance</dt><dd>{rhythm.description}</dd>
                </dl>
                <Link href={bts.slug} className={styles.discover} data-academy-action="training">
                  Découvrir le {bts.shortTitle} <span aria-hidden="true">→</span>
                </Link>
              </div>
              <Link href={bts.slug} className={styles.bandArt} aria-label={`Voir la fiche du ${bts.shortTitle}`}>
                <Image src={artwork.src} alt={artwork.alt} width={960} height={640}
                  sizes="(max-width: 700px) 94vw, (max-width: 1400px) 45vw, 600px" />
              </Link>
            </div>
          </article>
        );
      })}
    </section>
    <CourseJourney course="bts-overview">
      <section id="alternance-bts" className={styles.alternance} aria-labelledby="alternance-title">
        <div className="page-container">
          <h2 id="alternance-title">Entre l’école <em>et l’entreprise</em></h2>
          <div className={styles.rhythms}>
            <article><h3>BTS MOS</h3><p>{btsRhythms.MOS.description}</p></article>
            <article><h3>BTS MCO, NDRC, CI, PI et CG</h3><p>{btsRhythms.MCO.description}</p></article>
            <article><h3>Votre candidature</h3><p>L’équipe admissions étudie votre dossier et vous accompagne dans la recherche d’une entreprise et la préparation du contrat.</p><Link href={ADMISSIONS_URL}>Commencer mon dossier <span aria-hidden="true">→</span></Link></article>
          </div>
          <Link className={styles.funding} href="/financements#alternance">Financer mon BTS <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </CourseJourney>
    <TrainingReferenceCampus compact />
  </>;
}
