import styles from './AnnouncedCoursePage.module.css';

import { dmsPeriods } from '@/data/dms-periods';
import { formatSessionDate } from '@/lib/public-sessions';

export function DmsCalendar() {
  return <div className={styles.calendar}>
    <p className={styles.kicker}>Promotion 2027–2028 · Puget-sur-Argens</p>
    <h3>Du 1er septembre 2027 au 31 août 2028</h3>
    <p>Les cours se déroulent par périodes de deux semaines. Entre chaque période et pendant l’été, vous rejoignez votre entreprise d’accueil.</p>
    <details><summary>Afficher le calendrier prévisionnel complet <span aria-hidden="true">＋</span></summary>
      <ol>{dmsPeriods.map(({ start, end, course, hours, topic }) => <li key={start}>
        <strong>Du {formatSessionDate(start)} au {formatSessionDate(end)}</strong><span>{course ? `À l’école · ${course} · ${hours} h` : 'En entreprise'}</span>{topic && <small>{topic}</small>}
      </li>)}</ol>
    </details>
    <p><strong>Examens prévisionnels</strong> · DESP les 13 et 14 avril 2028, SSIAP 3 les 22 et 23 juin 2028. Les dates sont à confirmer avec les jurys.</p>
  </div>;
}
