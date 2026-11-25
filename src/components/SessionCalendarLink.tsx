import { hasDetailedCalendar, type CalendarCandidate } from '@/lib/detailed-calendar-eligibility';

export function SessionCalendarLink({ session }: { session: CalendarCandidate }) {
  if (!hasDetailedCalendar(session)) return null;
  const href = `/api/calendriers/${encodeURIComponent(String(session.id))}`;
  return <a href={href} target="_blank" rel="noopener noreferrer" data-session-calendar={session.id}
    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold underline decoration-1 underline-offset-4">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></svg>
    <span>Ouvrir le calendrier détaillé (PDF)<span className="sr-only"> (nouvel onglet)</span></span>
  </a>;
}
