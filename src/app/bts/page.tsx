import Link from 'next/link';
import { BtsTrainingComparisonModal } from '@/components/BtsTrainingComparisonModal';
import { BtsTrainingGrid } from '@/components/BtsTrainingGrid';
import { CatalogueHero } from '@/components/CatalogueHero';
import { CourseJourney } from '@/components/CourseJourney';
import { TrainingReferenceCampus } from '@/components/TrainingReferenceLayout';
import { btsHighlights } from '@/data/bts-highlights';
import { btsRhythms } from '@/data/btsRhythms';
import { originalArtwork } from '@/data/originalArtwork';
import { createPageMetadata } from '@/lib/seo';
import carousel from '@/components/TrainingCarousel.module.css';
import styles from './bts.module.css';

export const metadata = createPageMetadata('/bts');
const admissionsUrl = 'https://admissions.integraleconnect.com/';

export default function BtsPage() {
  return <>
    <CatalogueHero
      id="bts-title"
      title={<>Choisissez votre BTS <em>en alternance</em></>}
      description="De la sécurité au commerce, de l’immobilier à la comptabilité, préparez un diplôme d’État de niveau bac +2 en deux ans. Suivez les cours à Puget-sur-Argens ou en visioconférence selon le parcours."
      artwork={originalArtwork['bts-ndrc-parcours']}
      actions={[{ label: 'Découvrir les six BTS', href: '#formations-bts' }, { label: 'Déposer ma candidature', href: admissionsUrl }]}
    />
    <section id="formations-bts" aria-labelledby="catalogue-bts-title" className={carousel.section}>
      <div className="page-container">
        <div className={carousel.heading}>
          <h2 id="catalogue-bts-title">Quel BTS vous correspond ?</h2>
          <p>Explorez les six spécialités et comparez leurs débouchés.</p>
        </div>
        <BtsTrainingGrid items={btsHighlights} />
        <div className={carousel.footer}>
          <p className={carousel.formats}>Une question sur la prise en charge ? <Link href="/financements#alternance">Financer mon BTS <span aria-hidden="true">→</span></Link></p>
          <div className={carousel.actions}><BtsTrainingComparisonModal items={btsHighlights} className={carousel.secondary} /></div>
        </div>
      </div>
    </section>
    <CourseJourney course="bts-overview">
      <section id="alternance-bts" className={styles.alternance} aria-labelledby="alternance-title">
        <div className="page-container">
          <h2 id="alternance-title">Entre l’école <em>et l’entreprise</em></h2>
          <div className={styles.rhythms}>
            <article><h3>BTS MOS</h3><p>{btsRhythms.MOS.description}</p></article>
            <article><h3>BTS MCO, NDRC, CI, PI et CG</h3><p>{btsRhythms.MCO.description}</p></article>
            <article><h3>Votre candidature</h3><p>L’équipe admissions étudie votre dossier et vous accompagne dans la recherche d’une entreprise et la préparation du contrat.</p><Link href={admissionsUrl}>Commencer mon dossier <span aria-hidden="true">→</span></Link></article>
          </div>
        </div>
      </section>
    </CourseJourney>
    <TrainingReferenceCampus compact />
  </>;
}
