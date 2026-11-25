import { CalendarPage, palette } from './calendar-pdf-page';
import { holidayDates, onsiteCalendarLabel, type PhaseKind, type SessionCalendar } from './session-calendar';

const phaseColors = {
  distance: { label: 'À distance', fill: '#C9E3FB', ink: '#234D73' },
  centre: { label: onsiteCalendarLabel, fill: '#AC4A13', ink: '#FFFFFF' },
  formation: { label: 'Formation', fill: '#F6E5C2', ink: '#775119' },
  entreprise: { label: 'Entreprise', fill: '#EBE0F3', ink: '#67487F' },
  inscription: { label: 'Inscription', fill: '#F5DCCF', ink: '#8A4630' },
  examen: { label: 'Examen', fill: '#172D4C', ink: '#FFFFFF' },
  libre: { label: 'Hors période', fill: '#EFF2F4', ink: '#59697B' },
} as const;

export function phaseAccent(kind: PhaseKind) {
  const { fill, ink } = phaseColors[kind];
  return ink === '#FFFFFF' ? fill : ink;
}

const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'UTC' });
export function capitalized(value: string) { return value.charAt(0).toLocaleUpperCase('fr-FR') + value.slice(1); }

export function calendarMonths(model: SessionCalendar) {
  const first = new Date(model.firstMonth);
  const last = new Date(model.lastMonth);
  if (!Number.isFinite(+first) || !Number.isFinite(+last)) throw new Error('Session sans date publique');
  const months: Date[] = [];
  for (let cursor = Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1); cursor <= +last;) {
    const month = new Date(cursor);
    months.push(month);
    cursor = Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 1);
  }
  return months;
}

export function drawLegend(page: CalendarPage, kinds: PhaseKind[], x: number, top: number, maxWidth: number) {
  let left = x;
  const entries: { label: string; fill: string; ink: string }[] = kinds.map(kind => phaseColors[kind]);
  for (const entry of [...entries, phaseColors.libre, { label: 'Jour férié', fill: '', ink: '#A04024' }]) {
    const itemWidth = 17 + page.measure(entry.label, 8.3) + 15;
    if (left > x && left + itemWidth - 15 > x + maxWidth) { left = x; top += 15; }
    if (entry.fill) {
      page.box(left, top + 1, 12, 10, entry.fill, 2);
      page.box(left, top + 2, 2, 8, entry.ink === '#FFFFFF' ? palette.gold : entry.ink, 1);
    } else page.dot(left + 6, top + 6, 3, entry.ink);
    page.text(entry.label, left + 16, top, 8.3, 'body', palette.muted);
    left += itemWidth;
  }
  return top + 13;
}

export function calendarWeeks(month: Date) {
  const start = (month.getUTCDay() + 6) % 7;
  const dayCount = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
  return Math.ceil((start + dayCount) / 7);
}
export const monthCardHeight = (dayHeight: number, weeks: number) => 58 + weeks * dayHeight;

export function drawMonth(page: CalendarPage, model: SessionCalendar, month: Date, x: number, top: number, width: number, dayHeight: number, weeks: number) {
  const height = monthCardHeight(dayHeight, weeks);
  page.box(x, top, width, height, palette.line, 10);
  page.box(x + .8, top + .8, width - 1.6, height - 1.6, palette.paper, 9.4);
  const small = width < 200;
  const pad = small ? 9 : 13;
  const year = month.getUTCFullYear();
  page.text(capitalized(monthName.format(month)), x + pad, top + 9, small ? 13.1 : 15.3, 'bold');
  page.right(String(year), x + width - pad, top + 12, 8.5, 'bold', palette.muted);
  page.box(x + pad, top + 33, width - 2 * pad, .7, palette.line);

  const cellWidth = (width - 2 * pad) / 7;
  const weekdays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  weekdays.forEach((day, i) => page.centered(day, x + pad + (i + .5) * cellWidth, top + 37, small ? 7.4 : 8.3, 'bold', palette.muted));
  const offset = (month.getUTCDay() + 6) % 7;
  const count = new Date(Date.UTC(year, month.getUTCMonth() + 1, 0)).getUTCDate();
  const prefix = month.toISOString().slice(0, 8);
  const holidays = holidayDates(year);
  const daySize = small ? 10.2 : 11.5;
  for (let day = 1; day <= count; day++) {
    const key = prefix + String(day).padStart(2, '0');
    const phases = model.phases.filter(phase => phase.start <= key && key <= phase.end);
    const phase = phases.find(p => p.kind === 'examen') ?? phases[0];
    const style = phaseColors[phase?.kind ?? 'libre'];
    const index = offset + day - 1;
    const left = x + pad + (index % 7) * cellWidth;
    const y = top + 52 + Math.floor(index / 7) * dayHeight;
    page.box(left + .6, y, cellWidth - 1.2, dayHeight - 1.6, style.fill, 2.5);
    page.centered(String(day), left + cellWidth / 2, y + (dayHeight - daySize) / 2 - 1.4,
      daySize, style.ink === '#FFFFFF' ? 'bold' : 'body', style.ink);
    if (holidays.has(key)) {
      const markerX = left + cellWidth - 4, markerY = y + 3.5;
      page.dot(markerX, markerY, 2.2, palette.paper);
      page.dot(markerX, markerY, 1.5, '#A04024');
    }
  }
}
