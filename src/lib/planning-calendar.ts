import { parisDateKey } from './public-sessions';

type DateValue = string | Date | null | undefined;
export type CalendarSession = { startDate?: DateValue; endDate?: DateValue; examDate?: DateValue };
const DAY = 86_400_000;

/** Work on Paris calendar days, so a DST change cannot move a session. */
export function planningDay(value: DateValue): number | null {
  if (!value || !Number.isFinite(+new Date(value))) return null;
  const [year, month, day] = parisDateKey(new Date(value)).split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

export function calendarMonth(value: number, offset = 0) {
  const date = new Date(value);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + offset, 1);
}

export function calendarExtent(sessions: CalendarSession[]) {
  const dates = sessions.flatMap(session => [session.startDate, session.endDate, session.examDate])
    .map(planningDay).filter((value): value is number => value !== null);
  if (!dates.length) return null;
  const start = calendarMonth(Math.min(...dates));
  const last = new Date(Math.max(...dates));
  const first = new Date(start);
  const monthCount = (last.getUTCFullYear() - first.getUTCFullYear()) * 12 + last.getUTCMonth() - first.getUTCMonth() + 1;
  return { start, maxOffset: Math.max(0, monthCount - 3) };
}

/** Clip to the visible window; end dates are inclusive, the window end is exclusive. */
export function calendarPosition(startValue: DateValue, endValue: DateValue, windowStart: number, windowEnd: number) {
  const start = planningDay(startValue);
  const endDay = planningDay(endValue) ?? start;
  if (start === null || endDay === null || windowEnd <= windowStart) return null;
  const end = Math.max(start, endDay) + DAY;
  const left = Math.max(start, windowStart);
  const right = Math.min(end, windowEnd);
  if (right <= left) return null;
  return { left: (left - windowStart) / (windowEnd - windowStart) * 100, width: (right - left) / (windowEnd - windowStart) * 100 };
}

export function sessionCalendarPosition(session: CalendarSession, start: number, end: number) {
  const last = [session.endDate, session.examDate, session.startDate].map(planningDay)
    .filter((value): value is number => value !== null);
  return last.length ? calendarPosition(session.startDate, new Date(Math.max(...last)), start, end) : null;
}

export function sessionInCalendarWindow(session: CalendarSession, start: number, end: number) {
  return sessionCalendarPosition(session, start, end) !== null;
}
