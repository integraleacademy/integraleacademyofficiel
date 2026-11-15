import Image from 'next/image';
import { INFORMATION_REQUEST_URL } from '@/lib/contact-request';
import { courseBrochures } from '@/data/course-brochures';
import styles from './CourseBrochure.module.css';

function BrochureDownloadIcon() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" /></svg>;
}

export function CourseBrochureCard({ course }: { course: string }) {
  const brochure = courseBrochures[course];
  if (!brochure) return null;
  return <section id="brochure" className={styles.section} aria-labelledby="brochure-title">
    <div className={styles.card}>
      <div className={styles.book} aria-hidden="true">
        <Image src={brochure.cover} alt="" width={190} height={210} sizes="110px" />
      </div>
      <div className={styles.copy}>
        <p className={styles.category}>{brochure.category}</p>
        <h2 id="brochure-title">La brochure de la formation</h2>
        <p>{brochure.title}</p>
      </div>
      <a href={INFORMATION_REQUEST_URL} className={styles.button}>
        <BrochureDownloadIcon />Télécharger la brochure
      </a>
    </div>
  </section>;
}
