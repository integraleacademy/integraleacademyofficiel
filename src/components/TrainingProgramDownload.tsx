type ProgramTheme = 'blue' | 'green' | 'red';

const themes: Record<ProgramTheme, string> = {
  blue: 'bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-300',
  green: 'bg-emerald-700 hover:bg-emerald-800 focus-visible:ring-emerald-300',
  red: 'bg-red-700 hover:bg-red-800 focus-visible:ring-red-300',
};

export function TrainingProgramDownload({ href, course, theme, className = '' }: {
  href: string;
  course: string;
  theme: ProgramTheme;
  className?: string;
}) {
  return <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Consulter le programme de formation ${course} (PDF, nouvel onglet)`}
    className={`inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-2xl px-5 py-3 text-center text-sm font-black leading-5 text-white shadow-soft transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 motion-reduce:transform-none ${themes[theme]} ${className}`}
  >
    <svg aria-hidden="true" className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    </svg>
    <span className="min-w-0">
      <span className="block">Consulter le programme de formation</span>
      <span className="mt-1 block text-xs font-semibold text-white/85">{course} · PDF · Nouvel onglet</span>
    </span>
  </a>;
}
