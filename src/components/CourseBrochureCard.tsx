import Image from 'next/image';
import { INFORMATION_REQUEST_URL } from '@/lib/contact-request';
import { courseBrochures } from '@/data/course-brochures';
import styles from './CourseBrochure.module.css';

export function CourseBrochureCard({ course }: { course: string }) {
  const brochure = courseBrochures[course];
  if (!brochure) return null;

  return (
    <section id="brochure" className={styles.section} aria-labelledby="brochure-title">
      <div className={styles.band}>
        <div className={styles.copy}>
          <p className={styles.category}>{brochure.category}</p>
          <h2 id="brochure-title">La brochure <em>de la formation</em></h2>
          <p className={styles.course}>{brochure.title}</p>
          <a href={INFORMATION_REQUEST_URL} className={styles.button}>
            <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />
            </svg>
            Télécharger la brochure
          </a>
        </div>
        <div className={styles.art} aria-hidden="true">
          <div className={styles.book}>
            <Image src={brochure.cover} alt="" width={600} height={850} sizes="(max-width: 560px) 25vw, (max-width: 900px) 19vw, 190px" />
          </div>
        </div>
      </div>
    </section>
  );
}
