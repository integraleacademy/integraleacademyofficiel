import { planningSsiapCourse } from './planning-ssiap';

export type CalendarCandidate = {
  id?: string | number | null;
  title?: string | null;
  training?: { slug?: string | null; name?: string | null } | null;
};

export type DetailedCalendarCourse = 'aps' | 'desp-initial' | 'ssiap-1' | 'ssiap-3';

export function detailedCalendarCourse(session: CalendarCandidate): DetailedCalendarCourse | null {
  const slug = session.training?.slug?.toLowerCase();
  if (!slug || !session.id) return null;
  const name = session.training?.name ?? '';
  const title = session.title ?? '';
  if (['aps', 'tfp-aps'].includes(slug)) return /\b(?:mac|recyclage)\b/i.test(title + ' ' + name) ? null : 'aps';
  if (['desp', 'desp-initial', 'desp-dssp', 'dssp', 'dssp-initial'].includes(slug)) {
    return /\bvae\b|validation des acquis/i.test(title + ' ' + name) ? null : 'desp-initial';
  }
  const course = planningSsiapCourse({ title, training: { slug, name } });
  return course === 'ssiap-1' || course === 'ssiap-3' ? course : null;
}

export function hasDetailedCalendar(session: CalendarCandidate): boolean {
  return detailedCalendarCourse(session) !== null;
}
