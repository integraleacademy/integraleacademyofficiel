'use client';

import { useState } from 'react';
import { calendarExtent, calendarMonth, calendarPosition, sessionCalendarPosition, sessionInCalendarWindow } from '@/lib/planning-calendar';
import { formatSessionDate, formatSessionPeriod } from '@/lib/public-sessions';
import styles from './planning.module.css';

export function PlanningCalendar({ sessions, onSelect, selectedId, themeForSession }: {
  sessions: any[];
  onSelect: (session: any) => void;
  selectedId?: string;
  themeForSession: (session: any) => string;
}) {
  const [offset, setOffset] = useState(0);
  const extent = calendarExtent(sessions);
  if (!extent) return <p>Aucune date disponible pour cette sélection.</p>;
  const boundedOffset = Math.min(offset, extent.maxOffset);
  const start = calendarMonth(extent.start, boundedOffset);
  const end = calendarMonth(start, 3);
  const months = Array.from({ length: 3 }, (_, index) => {
    const date = calendarMonth(start, index);
    return { date, label: new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date), left: (date - start) / (end - start) * 100, width: (calendarMonth(date, 1) - date) / (end - start) * 100 };
  });
  const visible = sessions.filter(session => sessionInCalendarWindow(session, start, end));
  const positionStyle = (position: { left: number; width: number }) => ({ left: position.left + '%', width: position.width + '%' });

  return <div className={styles.calendar}>
    <div className={styles.calendarHeading}>
      <div><p className={styles.eyebrow}>Vue calendrier</p><h3>Votre prochaine rentrée,<br /><em>en un coup d’œil.</em></h3><p>Explorez les dates, puis cliquez sur une session pour la découvrir.</p></div>
      <div className={styles.monthControls}>
        <button type="button" disabled={boundedOffset === 0} onClick={() => setOffset(Math.max(0, boundedOffset - 3))} aria-label="Afficher les trois mois précédents">‹</button>
        <span aria-live="polite" aria-atomic="true">{months[0].label}<span aria-hidden="true"> → </span><span className="sr-only"> à </span>{months[2].label}</span>
        <button type="button" disabled={boundedOffset === extent.maxOffset} onClick={() => setOffset(Math.min(extent.maxOffset, boundedOffset + 3))} aria-label="Afficher les trois mois suivants">›</button>
      </div>
    </div>
    <div className={styles.calendarLegend} aria-label="Légende du calendrier">
      <span><i className={styles.remoteKey} />À distance</span><span><i className={styles.inPersonKey} />En présentiel</span><span><i className={styles.courseKey} />Formation / échéances VTC</span><span><i className={styles.examKey}>E</i>Examen</span>
    </div>
    <div key={start} className={`${styles.calendarSheet} ${styles.resultEnter}`}>
      <div className={styles.calendarHeader}>
        <span>Formation</span><div>{months.map(month => <span key={month.date} style={positionStyle(month)}>{month.label}</span>)}</div>
      </div>
      {visible.map(session => {
        const title = session.title || session.training?.name || 'Formation';
        const isVtc = session.scheduleKind === 'vtc-exam';
        const whole = sessionCalendarPosition(session, start, end)!;
        const phases = isVtc ? [] : [
          { label: 'À distance', from: session.remoteStartDate, to: session.remoteEndDate, className: styles.remotePhase },
          { label: 'En présentiel', from: session.inPersonStartDate, to: session.inPersonEndDate, className: styles.inPersonPhase },
        ].filter(phase => phase.from && phase.to);
        const exam = calendarPosition(session.examDate, session.examDate, start, end);
        return <button key={session.id} type="button" onClick={() => onSelect(session)} className={`${styles.calendarRow} ${themeForSession(session)}`} data-selected={selectedId === session.id || undefined} aria-label={`Voir la session ${title}, ${isVtc ? 'inscription avant le ' + formatSessionDate(session.startDate) : formatSessionPeriod(session.startDate, session.endDate)}`} aria-haspopup="dialog">
          <span className={styles.calendarLabel}><strong><i />{title}</strong><small>{isVtc ? 'Inscription → examens' : formatSessionPeriod(session.startDate, session.endDate)}</small></span>
          <span className={styles.calendarTrack}>
            {months.map(month => <i key={month.date} className={styles.monthLine} style={{ left: month.left + '%' }} />)}
            <span className={styles.courseBar} style={positionStyle(whole)} />
            {phases.map(phase => {
              const position = calendarPosition(phase.from, phase.to, start, end);
              return position ? <span key={phase.label} title={`${phase.label} · ${formatSessionPeriod(phase.from, phase.to)}`} className={`${styles.phase} ${phase.className}`} style={positionStyle(position)} /> : null;
            })}
            {exam ? <span className={styles.examMarker} style={{ left: `clamp(14px, ${exam.left + exam.width / 2}%, calc(100% - 14px))` }} title={'Examen le ' + formatSessionDate(session.examDate)}>E</span> : null}
          </span>
          <span className={styles.calendarRowArrow} aria-hidden="true">↗</span>
        </button>;
      })}
      {!visible.length ? <p className={styles.emptyMonths}>Aucune session sur ces trois mois. Utilisez les flèches pour explorer les prochaines dates.</p> : null}
    </div>
    <p className={styles.calendarCaption}>{visible.length} session{visible.length > 1 ? 's' : ''} sur cette période · les dates complètes sont accessibles en cliquant sur une ligne.</p>
  </div>;
}
