import Image from 'next/image';
import { INFORMATION_REQUEST_URL } from '@/lib/contact-request';
import { courseBrochures } from '@/data/course-brochures';
import styles from './CourseBrochure.module.css';

const relatedCourses: Record<string, { href: string; label: string } | undefined> = {
  aps: { href: '/formations-securite/a3p-apr', label: 'Découvrir la protection rapprochée (A3P)' },
  'a3p-apr': { href: '/despvaeouinitial', label: 'Découvrir la direction d’entreprise de sécurité (DESP)' },
  mos: { href: '/#bachelors', label: 'Explorer nos Bachelors en sécurité' },
};

export function CourseBrochureCard({ course }: { course: string }) {
  const brochure = courseBrochures[course];
  if (!brochure) return null;
  const relatedCourse = relatedCourses[course];
  const icon = <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />
            </svg>;

  return (
    <section id="brochure" className={styles.section} data-brochure-course={course} aria-labelledby="brochure-title">
      <div className={styles.band}>
        <div className={styles.copy}>
          <p className={styles.category}>{brochure.category}</p>
          <h2 id="brochure-title">La brochure <em>détaillée</em></h2>
          <p className={styles.course}>{brochure.title}</p>
          <p className={styles.details}>Dates, informations pratiques, programme et financement… Toutes les informations utiles pour préparer votre formation.</p>
          {brochure.file ? (
            <a href={brochure.file} target="_blank" rel="noopener noreferrer" className={styles.button} data-academy-action="brochure">
              {icon} Ouvrir la brochure PDF<span className="sr-only"> (nouvel onglet)</span>
            </a>
          ) : (
            <a href={INFORMATION_REQUEST_URL} target="_blank" rel="noopener noreferrer" className={styles.button} data-academy-action="brochure">
              {icon} Recevoir la brochure<span className="sr-only"> (formulaire dans un nouvel onglet)</span>
            </a>
          )}
          <p className={styles.formNote}>{brochure.file ? 'Brochure de la promotion 2027–2028 · 16 pages' : 'Le formulaire de demande d’informations s’ouvre dans un nouvel onglet.'}</p>
          {relatedCourse && <p className={styles.related}>Pour aller plus loin : <a href={relatedCourse.href}>{relatedCourse.label} <span aria-hidden="true">→</span></a></p>}
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
