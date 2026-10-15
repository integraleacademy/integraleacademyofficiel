import Link from 'next/link';
import { vtcArtwork } from '@/data/manualIllustrations';
import styles from './TrainingCarousel.module.css';

type VtcTrainingCardProps = {
  description: string;
  duration: string;
  price: string;
  href: string;
};

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function VtcTrainingCard({ description, duration, price, href }: VtcTrainingCardProps) {
  return (
    <div className={styles.carousel}>
      <div className={styles.stage}>
        <article className={`${styles.slide} ${styles.visualFirst}`} data-active="true" aria-labelledby="vtc-course-title">
          <div className={styles.visual}>
            <figure className={styles.artwork}>
              <img
                src={vtcArtwork.accueil.src}
                alt={vtcArtwork.accueil.alt}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </figure>
            <div className={styles.caption}>
              <strong>{price}</strong>
              <span>CPF selon éligibilité</span>
            </div>
          </div>
          <div className={styles.copy}>
            <p className={styles.category}>Transport de personnes</p>
            <h3 id="vtc-course-title" className={styles.title}>
              <strong>VTC</strong>
              <em>Chauffeur professionnel</em>
            </h3>
            <p className={styles.description}>{description}</p>
            <dl className={styles.courseFacts}>
              <div><dt className="sr-only">Durée</dt><dd>{duration}</dd></div>
              <div><dt className="sr-only">Modalités</dt><dd>E-learning + présentiel</dd></div>
              <div className={styles.courseLocation}><dt className="sr-only">Lieu de pratique</dt><dd>Nice, Cannes, Toulon ou Fréjus</dd></div>
            </dl>
            <Link href={href} className={styles.discover}>Découvrir la formation chauffeur VTC <ArrowIcon /></Link>
          </div>
        </article>
      </div>
      <div className={styles.navigation}>
        <p className={styles.formats}><strong>100 h en ligne</strong> · <strong>5 h au volant</strong> · Examen inclus</p>
        <Link href="/contact?formation=vtc" className={styles.secondary}>Parlons de votre projet <ArrowIcon /></Link>
      </div>
      <div className={styles.footer}>
        <p className={styles.formats}>Certification RS n°5637 · Agrément préfectoral VTC-26-001</p>
      </div>
    </div>
  );
}
