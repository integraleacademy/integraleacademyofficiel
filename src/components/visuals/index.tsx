import type { ReactNode } from 'react';

type VisualTone = 'academy' | 'security' | 'bts' | 'vtc' | 'funding' | 'contact' | 'exam';

const toneStyles: Record<VisualTone, { glow: string; line: string; icon: string; accent: string }> = {
  academy: { glow: 'from-academy-gold/25 via-sky-400/10 to-emerald-400/10', line: 'via-academy-gold/55', icon: 'text-academy-gold', accent: 'bg-academy-gold' },
  security: { glow: 'from-emerald-400/20 via-academy-gold/16 to-blue-500/10', line: 'via-emerald-400/45', icon: 'text-emerald-300', accent: 'bg-emerald-400' },
  bts: { glow: 'from-sky-400/20 via-academy-gold/16 to-emerald-300/12', line: 'via-sky-300/45', icon: 'text-sky-200', accent: 'bg-sky-300' },
  vtc: { glow: 'from-cyan-300/22 via-academy-gold/15 to-slate-900/10', line: 'via-cyan-300/45', icon: 'text-cyan-200', accent: 'bg-cyan-300' },
  funding: { glow: 'from-violet-300/20 via-academy-gold/16 to-emerald-300/14', line: 'via-violet-300/45', icon: 'text-violet-200', accent: 'bg-violet-300' },
  contact: { glow: 'from-rose-300/18 via-academy-gold/16 to-sky-300/12', line: 'via-rose-200/45', icon: 'text-rose-100', accent: 'bg-rose-200' },
  exam: { glow: 'from-academy-gold/24 via-emerald-300/16 to-slate-950/10', line: 'via-academy-gold/55', icon: 'text-academy-gold', accent: 'bg-academy-gold' },
};

const iconSets: Record<VisualTone, string[]> = {
  academy: ['✦', '◈', '✓', '◇'],
  security: ['◆', '⬟', '✓', '◉'],
  bts: ['◇', '▱', '✓', '✦'],
  vtc: ['⌁', '◇', '◉', '→'],
  funding: ['✓', '◇', '●', '↗'],
  contact: ['✉', '◇', '✓', '●'],
  exam: ['✓', '◇', '◉', '✦'],
};

export function MotionGlow({ tone = 'academy', className = '' }: { tone?: VisualTone; className?: string }) {
  const style = toneStyles[tone];
  return <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
    <div className={`visual-orb absolute -left-16 top-10 h-64 w-64 rounded-full bg-gradient-to-br ${style.glow} blur-3xl`} />
    <div className={`visual-orb visual-orb-delay absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br ${style.glow} blur-3xl`} />
    <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${style.line} to-transparent`} />
  </div>;
}

export function AnimatedBackground({ tone = 'academy', density = 'normal' }: { tone?: VisualTone; density?: 'normal' | 'compact' }) {
  const style = toneStyles[tone];
  const icons = iconSets[tone];
  const dots = density === 'compact' ? 5 : 8;
  return <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <MotionGlow tone={tone} />
    <div className="absolute inset-0 opacity-[.16] grid-soft" />
    {Array.from({ length: dots }).map((_, index) => <span key={index} className={`visual-dot ${style.accent}`} style={{ left: `${12 + (index * 11) % 74}%`, top: `${18 + (index * 17) % 58}%`, animationDelay: `${index * .35}s` }} />)}
    {icons.map((icon, index) => <span key={`${icon}-${index}`} className={`visual-glyph ${style.icon}`} style={{ left: `${8 + index * 24}%`, top: `${12 + (index % 2) * 58}%`, animationDelay: `${index * .5}s` }}>{icon}</span>)}
  </div>;
}

export function VisualSection({ children, tone = 'academy', className = '' }: { children: ReactNode; tone?: VisualTone; className?: string }) {
  return <div className={`relative isolate overflow-hidden ${className}`}><AnimatedBackground tone={tone} />{children}</div>;
}

export function FloatingBadge({ tone = 'academy', className = '' }: { tone?: VisualTone; className?: string }) {
  const style = toneStyles[tone];
  return <div className={`pointer-events-none absolute hidden rounded-3xl border border-white/15 bg-academy-ink/90 p-3 shadow-card backdrop-blur md:block ${className}`} aria-hidden="true">
    <div className="flex items-center gap-2">
      <span className={`visual-check grid h-8 w-8 place-items-center rounded-2xl ${style.accent} text-sm font-black text-academy-gold-text`}>✓</span>
      <span className="h-2 w-20 rounded-full bg-white/18" />
    </div>
  </div>;
}

export function PremiumIcon({ tone = 'academy', icon = '✦' }: { tone?: VisualTone; icon?: string }) {
  const style = toneStyles[tone];
  return <span className="premium-icon" aria-hidden="true"><span className={style.icon}>{icon}</span></span>;
}

export function VisualTimeline({ tone = 'academy' }: { tone?: VisualTone }) {
  const style = toneStyles[tone];
  return <div className="pointer-events-none mx-auto mt-10 hidden max-w-4xl items-center justify-between gap-3 md:flex" aria-hidden="true">
    {[0, 1, 2, 3].map((step, index) => <div key={step} className="flex flex-1 items-center gap-3">
      <span className={`visual-check grid h-10 w-10 place-items-center rounded-2xl ${style.accent} text-sm font-black text-academy-gold-text shadow-gold`}>✓</span>
      {index < 3 && <span className={`visual-line h-px flex-1 bg-gradient-to-r from-transparent ${style.line} to-transparent`} />}
    </div>)}
  </div>;
}
