import { SECURITY_PATHWAY_PDF } from '@/data/admissions';

export function SessionCalendarLink({ id, className = '', label = 'Télécharger le calendrier détaillé (PDF)' }: {
  id?: string | number | null; className?: string; label?: string }) {
  if (!id) return null;
  const href = id === 'parcours-securite-janvier-2027' ? SECURITY_PATHWAY_PDF : `/api/calendriers/${encodeURIComponent(String(id))}`;
  return <a href={href} download data-session-calendar={id}
    className={`inline-flex min-h-11 items-center gap-2 text-sm font-bold underline decoration-1 underline-offset-4 ${className}`}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" /></svg>
    {label}
  </a>;
}
