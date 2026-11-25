import { SessionCalendarLink } from '@/components/SessionCalendarLink';
import { formatVtcExamDate, vtcRegistrationHref } from '@/data/vtc';
import { formatSessionNumericDate } from '@/lib/public-sessions';
import styles from './vtc.module.css';

type ExamDates = {
  sessionId: string;
  deadline: string | Date;
  theory?: string | Date | null;
  practical?: string | Date | null;
};

function ExamCard({ dates, next }: { dates: ExamDates; next: boolean }) {
  return <article className={styles.examDate} data-next-session={next || undefined}>
    <p className={styles.label}>{next ? 'Prochaine échéance' : 'Échéance suivante'}</p>
    <h3><small>Examen théorique</small>{formatSessionNumericDate(dates.theory) || 'À confirmer'}</h3>
    <dl>
      <div><dt>Inscription avant le</dt><dd>{formatSessionNumericDate(dates.deadline)} à 12 h</dd></div>
      <div><dt>Examen pratique</dt><dd>{formatVtcExamDate(dates.practical)}</dd></div>
    </dl>
    <SessionCalendarLink id={dates.sessionId} /><br />
    <a className={styles.textLink} href={vtcRegistrationHref(dates.sessionId)}>Choisir cet examen</a>
  </article>;
}

export function VtcExamCalendar({ dates }: { dates: readonly ExamDates[] }) {
  if (!dates.length) return <p className={styles.examDate}>Contactez l’équipe pour connaître les prochaines dates d’examen.</p>;
  return <>
    <div className={styles.dateGrid}>{dates.slice(0, 2).map((date, index) =>
      <ExamCard key={String(date.deadline) + String(date.theory)} dates={date} next={index === 0} />)}</div>
    {dates.length > 2 && <details className={styles.moreDates}>
      <summary aria-controls="autres-examens-vtc"><span>Afficher toutes les dates</span><span>Masquer les dates supplémentaires</span></summary>
      <div id="autres-examens-vtc" className={styles.dateGrid}>{dates.slice(2).map(date =>
        <ExamCard key={String(date.deadline) + String(date.theory)} dates={date} next={false} />)}</div>
    </details>}
  </>;
}
