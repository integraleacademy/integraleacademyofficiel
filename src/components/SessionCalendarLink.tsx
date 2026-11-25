import { hasDetailedCalendar, type CalendarCandidate } from '@/lib/detailed-calendar-eligibility';

export function SessionCalendarLink({ session }: { session: CalendarCandidate }) {
  if (!hasDetailedCalendar(session)) return null;
  const href = `/api/calendriers/${encodeURIComponent(String(session.id))}`;
  return <a href={href} download data-session-calendar={session.id}
    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold underline decoration-1 underline-offset-4">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" /></svg>
    Télécharger le calendrier détaillé (PDF)
  </a>;
}
