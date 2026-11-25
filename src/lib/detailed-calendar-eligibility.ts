import { planningSsiapCourse } from './planning-ssiap';

export type CalendarCandidate = {
  id?: string | number | null;
  title?: string | null;
  training?: { slug?: string | null; name?: string | null } | null;
};

export function hasDetailedCalendar(session: CalendarCandidate): boolean {
  const slug = session.training?.slug?.toLowerCase();
  if (!slug || !session.id) return false;
  const name = session.training?.name ?? '';
  const title = session.title ?? '';
  if (['aps', 'tfp-aps'].includes(slug)) return !/\b(?:mac|recyclage)\b/i.test(title + ' ' + name);
  if (['desp', 'desp-initial', 'desp-dssp', 'dssp', 'dssp-initial'].includes(slug)) {
    return !/\bvae\b|validation des acquis/i.test(title + ' ' + name);
  }
  const course = planningSsiapCourse({ title, training: { slug, name } });
  return course === 'ssiap-1' || course === 'ssiap-3';
}
