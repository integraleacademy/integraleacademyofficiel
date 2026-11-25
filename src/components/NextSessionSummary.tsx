import { publicIntakePeriod } from '@/lib/planning-data';
import { SessionCalendarLink } from './SessionCalendarLink';
import { formatSessionDate, formatSessionPeriod, hasDetailedDeliveryPeriods, inPersonPeriods, parisDateKey } from '@/lib/public-sessions';
import type { toPublicSession } from '@/lib/public-session-data';
import type { SessionSeatAvailability } from '@/lib/session-seat-availability';
import { formatVtcExamDate, vtcCourse, vtcRegistrationMessage } from '@/data/vtc';
import { PlanningIcon as Icon, type PlanningIconName as IconName } from './PlanningIcon';
import styles from '@/app/planning/planning.module.css';

const previewDate = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris',
});
const previewDayMonth = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric', month: 'long', timeZone: 'Europe/Paris',
});

function SessionDateMark({ value, label }: { value: Date; label: string }) {
  const parts = previewDate.formatToParts(value);
  return <div className={styles.dateMark}>
    <span className={styles.dateLabel}>{label}</span>
    <time dateTime={parisDateKey(value)} aria-label={previewDate.format(value)}>
      <b>{parts.find(part => part.type === 'day')?.value.padStart(2, '0')}</b>
      <span>{parts.find(part => part.type === 'month')?.value}<small>{parts.find(part => part.type === 'year')?.value}</small></span>
    </time>
  </div>;
}

function previewPeriod(from: string | Date, to: string | Date) {
  const start = new Date(from);
  const end = new Date(to);
  if (!(end >= start)) return formatSessionPeriod(from, to);
  const startKey = parisDateKey(start);
  const endKey = parisDateKey(end);
  if (startKey === endKey) return previewDate.format(start);
  let first = previewDate.format(start);
  if (startKey.slice(0, 7) === endKey.slice(0, 7)) first = String(Number(startKey.slice(8)));
  else if (startKey.slice(0, 4) === endKey.slice(0, 4)) first = previewDayMonth.format(start);
  return `Du ${first} au ${previewDate.format(end)}`;
}

export function NextSessionSummary({ session, price, availability }: {
  session: ReturnType<typeof toPublicSession>;
  price: string;
  availability: SessionSeatAvailability;
}) {
  if (session.scheduleKind === 'admissions') return <div className={styles.intakePreview}>
    <p className={styles.eyebrow}>Prochaine rentrée</p><h3>{publicIntakePeriod(session)}</h3><strong>{session.title}</strong>
    <p>{session.location}</p>{session.datePrecision === 'month' && <small>Jour de rentrée à préciser.</small>}
    <SessionCalendarLink session={session} />
  </div>;
  const isVtc = session.scheduleKind === 'vtc-exam';
  const start = new Date(session.startDate);
  const end = !isVtc && session.endDate ? new Date(session.endDate) : null;
  const hasEnd = end && end > start && parisDateKey(end) !== parisDateKey(start);
  const details: { label: string; value: string; icon: IconName }[] = [];
  if (isVtc) {
    details.push(
      { label: 'Examen théorique', value: formatVtcExamDate(session.vtcDates?.theory), icon: 'screen' },
      { label: 'Examen pratique', value: formatVtcExamDate(session.vtcDates?.practical), icon: 'check' },
    );
  } else {
    if (hasDetailedDeliveryPeriods(session)) {
      if (session.remoteStartDate && session.remoteEndDate) {
        details.push({ label: 'À distance', value: previewPeriod(session.remoteStartDate, session.remoteEndDate), icon: 'screen' });
      }
      const onSite = inPersonPeriods(session);
      if (onSite.length) details.push({
        label: 'En présentiel', value: onSite.map(period => previewPeriod(period.start, period.end)).join('\n'), icon: 'people',
      });
    }
    if (session.examDate) details.push({ label: 'Examen', value: formatSessionDate(session.examDate), icon: 'check' });
  }
  if (session.location) details.push({ label: 'Lieu', value: session.location.replace(/^Paris\s*·\s*(?=\d.*\bParis\b)/i, ''), icon: 'location' });

  return <>
    <div className={styles.sessionHeading}>
      <h3>{isVtc ? vtcCourse.nextExamLabel : 'Prochaine formation'}</h3>
      {!isVtc && <span className={styles.seatStatus} data-tone={availability.tone} title={availability.estimated ? 'Disponibilité estimée, à confirmer auprès de l’école.' : undefined}>
        {availability.estimated ? `Env. ${availability.label}` : availability.label}
      </span>}
    </div>
    {isVtc ? <p className={styles.vtcRegistration}>{vtcRegistrationMessage(start, session.vtcDates?.theory)}</p> : (
      <div className={styles.sessionDates}>
        <SessionDateMark value={start} label={hasEnd ? 'Du' : 'Date de formation'} />
        {hasEnd && <>
          <span className={styles.dateConnector} aria-hidden="true"><Icon name="arrow" /></span>
          <SessionDateMark value={end} label="Au" />
        </>}
      </div>
    )}
    {details.length > 0 && <dl className={styles.sessionDetails}>{details.map(({ label, value, icon }) => (
      <div key={label}><dt><Icon name={icon} />{label}</dt><dd>{value}</dd></div>
    ))}</dl>}
    <dl className={styles.sessionOffer}>
      <div><dt>Tarif</dt><dd>{price}</dd></div>
    </dl>
    <SessionCalendarLink session={session} />
  </>;
}
