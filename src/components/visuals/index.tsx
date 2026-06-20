import type { ReactNode } from 'react';

type VisualTone = 'academy' | 'security' | 'aps' | 'a3p' | 'desp' | 'ssiap' | 'bts' | 'vtc' | 'funding' | 'contact' | 'exam' | 'dates' | 'program' | 'cnaps';

type VisualSpec = {
  glow: string;
  line: string;
  accent: string;
  text: string;
  stroke: string;
  pattern: 'constellation' | 'shield' | 'route' | 'campus' | 'funding' | 'contact' | 'flame' | 'dashboard' | 'exam' | 'calendar' | 'modules' | 'cnaps';
};

const specs: Record<VisualTone, VisualSpec> = {
  academy: { glow: 'from-academy-gold/30 via-sky-400/10 to-emerald-400/10', line: 'via-academy-gold/55', accent: 'bg-academy-gold', text: 'text-academy-gold', stroke: '#F4C45A', pattern: 'constellation' },
  security: { glow: 'from-emerald-400/22 via-academy-gold/18 to-blue-500/12', line: 'via-emerald-400/50', accent: 'bg-emerald-400', text: 'text-emerald-300', stroke: '#34d399', pattern: 'shield' },
  aps: { glow: 'from-emerald-400/24 via-academy-gold/18 to-slate-900/10', line: 'via-emerald-400/55', accent: 'bg-emerald-400', text: 'text-emerald-300', stroke: '#34d399', pattern: 'shield' },
  a3p: { glow: 'from-sky-400/24 via-academy-gold/16 to-indigo-500/10', line: 'via-sky-300/55', accent: 'bg-sky-300', text: 'text-sky-200', stroke: '#7dd3fc', pattern: 'dashboard' },
  desp: { glow: 'from-academy-gold/28 via-amber-300/14 to-slate-900/14', line: 'via-academy-gold/60', accent: 'bg-academy-gold', text: 'text-academy-gold', stroke: '#F4C45A', pattern: 'dashboard' },
  ssiap: { glow: 'from-orange-400/22 via-academy-gold/16 to-red-500/10', line: 'via-orange-300/50', accent: 'bg-orange-300', text: 'text-orange-200', stroke: '#fdba74', pattern: 'flame' },
  bts: { glow: 'from-sky-400/22 via-academy-gold/16 to-emerald-300/14', line: 'via-sky-300/50', accent: 'bg-sky-300', text: 'text-sky-200', stroke: '#7dd3fc', pattern: 'campus' },
  vtc: { glow: 'from-cyan-300/24 via-academy-gold/15 to-slate-900/10', line: 'via-cyan-300/55', accent: 'bg-cyan-300', text: 'text-cyan-200', stroke: '#67e8f9', pattern: 'route' },
  funding: { glow: 'from-violet-300/22 via-academy-gold/18 to-emerald-300/14', line: 'via-violet-300/50', accent: 'bg-violet-300', text: 'text-violet-200', stroke: '#c4b5fd', pattern: 'funding' },
  contact: { glow: 'from-rose-300/20 via-academy-gold/16 to-sky-300/14', line: 'via-rose-200/50', accent: 'bg-rose-200', text: 'text-rose-100', stroke: '#fecdd3', pattern: 'contact' },
  exam: { glow: 'from-academy-gold/24 via-emerald-300/18 to-slate-950/10', line: 'via-academy-gold/55', accent: 'bg-academy-gold', text: 'text-academy-gold', stroke: '#F4C45A', pattern: 'exam' },
  dates: { glow: 'from-blue-300/22 via-academy-gold/14 to-emerald-300/14', line: 'via-blue-300/50', accent: 'bg-blue-300', text: 'text-blue-200', stroke: '#93c5fd', pattern: 'calendar' },
  program: { glow: 'from-academy-gold/20 via-slate-200/12 to-emerald-300/12', line: 'via-academy-gold/50', accent: 'bg-academy-gold', text: 'text-academy-gold', stroke: '#F4C45A', pattern: 'modules' },
  cnaps: { glow: 'from-emerald-300/24 via-academy-gold/16 to-blue-400/12', line: 'via-emerald-300/55', accent: 'bg-emerald-300', text: 'text-emerald-200', stroke: '#86efac', pattern: 'cnaps' },
};

function VisualSvg({ pattern, stroke }: { pattern: VisualSpec['pattern']; stroke: string }) {
  const common = { fill: 'none', stroke, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 420 260" className="absolute inset-0 h-full w-full opacity-90" aria-hidden="true">
    <defs><filter id={`glow-${pattern}`}><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <g className="visual-svg-main" filter={`url(#glow-${pattern})`}>
      {pattern === 'route' && <><path {...common} d="M40 210 C115 168 135 116 210 136 S310 176 382 72"/><path {...common} d="M64 218 C140 184 151 139 214 156 S310 194 398 96" opacity=".35"/><circle cx="78" cy="198" r="16" fill="rgba(255,255,255,.12)" stroke={stroke} strokeWidth="3"/><rect x="284" y="48" width="72" height="46" rx="14" fill="rgba(255,255,255,.10)" stroke={stroke} strokeWidth="3"/><path {...common} d="M302 72h36M320 58v28"/></>}
      {pattern === 'campus' && <><path {...common} d="M70 95l140-55 140 55-140 55z"/><path {...common} d="M118 128v58c44 28 137 28 184 0v-58" opacity=".7"/><path {...common} d="M210 150v78"/><rect x="60" y="180" width="80" height="42" rx="14" fill="rgba(255,255,255,.11)" stroke={stroke} strokeWidth="3"/><rect x="280" y="180" width="80" height="42" rx="14" fill="rgba(255,255,255,.11)" stroke={stroke} strokeWidth="3"/></>}
      {pattern === 'shield' && <><path {...common} d="M210 34l112 42v74c0 66-45 99-112 126C143 249 98 216 98 150V76z"/><path {...common} d="M156 145l35 35 79-86"/><path {...common} d="M66 98h44M310 98h44M72 174h36M312 174h36" opacity=".55"/></>}
      {pattern === 'flame' && <><path {...common} d="M211 226c58-20 91-58 91-108 0-39-22-70-55-89 1 44-30 57-39 83-23-18-31-41-26-68-38 26-64 65-64 105 0 40 30 68 93 77z"/><path {...common} d="M212 213c26-12 41-30 41-54 0-20-11-35-27-46-1 24-17 33-23 47-13-10-18-23-16-40-21 17-33 38-33 59 0 20 16 32 58 34z" opacity=".55"/></>}
      {pattern === 'dashboard' && <><rect x="62" y="54" width="296" height="160" rx="28" fill="rgba(255,255,255,.10)" stroke={stroke} strokeWidth="3"/><path {...common} d="M94 96h90M94 128h54M94 160h76" opacity=".55"/><path {...common} d="M222 174c6-45 33-72 82-80"/><circle cx="304" cy="94" r="9" fill={stroke}/><path {...common} d="M236 174h88M280 134v40"/></>}
      {pattern === 'funding' && <><rect x="72" y="58" width="276" height="154" rx="30" fill="rgba(255,255,255,.10)" stroke={stroke} strokeWidth="3"/><circle cx="148" cy="135" r="44" fill="rgba(255,255,255,.08)" stroke={stroke} strokeWidth="3"/><path {...common} d="M136 135h30M151 116v39M216 104h86M216 136h64M216 168h96"/><path {...common} d="M104 220l32-32M316 220l-32-32" opacity=".5"/></>}
      {pattern === 'contact' && <><rect x="70" y="62" width="280" height="142" rx="30" fill="rgba(255,255,255,.10)" stroke={stroke} strokeWidth="3"/><path {...common} d="M92 92l118 78L328 92"/><circle cx="322" cy="58" r="28" fill="rgba(34,197,94,.22)" stroke={stroke} strokeWidth="3"/><path {...common} d="M310 58l9 9 17-21"/></>}
      {pattern === 'exam' && <><rect x="112" y="42" width="196" height="176" rx="24" fill="rgba(255,255,255,.10)" stroke={stroke} strokeWidth="3"/><path {...common} d="M154 96h112M154 130h112M154 164h76" opacity=".65"/><path {...common} d="M148 96l10 10 21-27M148 164l10 10 21-27"/><circle cx="158" cy="130" r="12" stroke={stroke} strokeWidth="3" fill="none"/></>}
      {pattern === 'calendar' && <><rect x="72" y="60" width="276" height="160" rx="28" fill="rgba(255,255,255,.10)" stroke={stroke} strokeWidth="3"/><path {...common} d="M72 106h276M132 42v40M288 42v40"/><g fill={stroke}>{[128,176,224,272].map((x,i)=><circle key={x} cx={x} cy={142 + (i%2)*38} r="8"/>)}<circle cx="304" cy="180" r="8"/></g></>}
      {pattern === 'modules' && <><path {...common} d="M80 76h98v62H80zM242 76h98v62h-98zM80 168h98v62H80zM242 168h98v62h-98z"/><path {...common} d="M178 107h64M178 199h64M129 138v30M291 138v30" opacity=".55"/></>}
      {pattern === 'cnaps' && <><rect x="100" y="62" width="220" height="142" rx="24" fill="rgba(255,255,255,.10)" stroke={stroke} strokeWidth="3"/><path {...common} d="M138 112h84M138 144h58M248 116l18 18 38-48"/><path {...common} d="M210 204v32M164 236h92" opacity=".55"/></>}
      {pattern === 'constellation' && <><path {...common} d="M92 174l64-78 76 40 94-72"/><circle cx="92" cy="174" r="14" fill="rgba(255,255,255,.12)" stroke={stroke} strokeWidth="3"/><circle cx="156" cy="96" r="14" fill="rgba(255,255,255,.12)" stroke={stroke} strokeWidth="3"/><circle cx="232" cy="136" r="14" fill="rgba(255,255,255,.12)" stroke={stroke} strokeWidth="3"/><circle cx="326" cy="64" r="14" fill="rgba(255,255,255,.12)" stroke={stroke} strokeWidth="3"/><path {...common} d="M82 218h256" opacity=".35"/></>}
    </g>
  </svg>;
}

export function PremiumBackground({ tone = 'academy', density = 'normal' }: { tone?: VisualTone; density?: 'normal' | 'compact' }) {
  const spec = specs[tone];
  const dots = density === 'compact' ? 7 : 12;
  return <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className={`visual-orb absolute -left-24 top-10 h-80 w-80 rounded-full bg-gradient-to-br ${spec.glow} blur-3xl`} />
    <div className={`visual-orb visual-orb-delay absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br ${spec.glow} blur-3xl`} />
    <div className="absolute inset-0 opacity-[.14] grid-soft" />
    <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${spec.line} to-transparent`} />
    {Array.from({ length: dots }).map((_, index) => <span key={index} className={`visual-dot ${spec.accent}`} style={{ left: `${8 + (index * 13) % 84}%`, top: `${12 + (index * 19) % 72}%`, animationDelay: `${index * .22}s` }} />)}
  </div>;
}

export function VisualSection({ children, tone = 'academy', className = '' }: { children: ReactNode; tone?: VisualTone; className?: string }) {
  return <div className={`relative isolate overflow-hidden ${className}`}><PremiumBackground tone={tone} />{children}</div>;
}

export function MotionGlow({ tone = 'academy', className = '' }: { tone?: VisualTone; className?: string }) {
  const spec = specs[tone];
  return <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
    <div className={`visual-orb absolute -left-16 top-10 h-64 w-64 rounded-full bg-gradient-to-br ${spec.glow} blur-3xl`} />
    <div className={`visual-orb visual-orb-delay absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br ${spec.glow} blur-3xl`} />
    <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${spec.line} to-transparent`} />
  </div>;
}

export const AnimatedBackground = PremiumBackground;

export function FloatingBadge({ tone = 'academy', className = '' }: { tone?: VisualTone; className?: string }) {
  const spec = specs[tone];
  return <div className={`pointer-events-none absolute hidden rounded-3xl border border-white/15 bg-[#07111f]/90 p-3 shadow-card backdrop-blur-xl md:block ${className}`} aria-hidden="true">
    <div className="flex items-center gap-3">
      <span className={`visual-check grid h-9 w-9 place-items-center rounded-2xl ${spec.accent} text-sm font-black text-academy-gold-text`}>✓</span>
      <span className="grid gap-1"><span className="h-2 w-24 rounded-full bg-white/24"/><span className="h-2 w-14 rounded-full bg-white/14"/></span>
    </div>
  </div>;
}

export function AnimatedIcon({ tone = 'academy', icon = '✦' }: { tone?: VisualTone; icon?: string }) {
  const spec = specs[tone];
  return <span className="premium-icon visual-icon-pop" aria-hidden="true"><span className={spec.text}>{icon}</span></span>;
}

export const PremiumIcon = AnimatedIcon;

export function SuccessTimeline({ tone = 'academy', steps = 4 }: { tone?: VisualTone; steps?: number }) {
  const spec = specs[tone];
  return <div className="success-timeline pointer-events-none mx-auto mt-10 grid max-w-5xl gap-4 md:flex md:items-center" aria-hidden="true">
    {Array.from({ length: steps }).map((_, index) => <div key={index} className="grid gap-3 md:flex md:flex-1 md:items-center">
      <span className={`visual-check grid h-11 w-11 place-items-center rounded-2xl ${spec.accent} text-sm font-black text-academy-gold-text shadow-gold`}>✓</span>
      {index < steps - 1 && <span className={`visual-line h-px min-h-px flex-1 bg-gradient-to-r from-transparent ${spec.line} to-transparent md:h-px`} />}
    </div>)}
  </div>;
}

export const VisualTimeline = SuccessTimeline;

export function IllustrationCard({ tone = 'academy', className = '' }: { tone?: VisualTone; className?: string }) {
  const spec = specs[tone];
  return <div className={`visual-illustration relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] shadow-card ${className}`} aria-hidden="true">
    <PremiumBackground tone={tone} density="compact" />
    <VisualSvg pattern={spec.pattern} stroke={spec.stroke} />
    <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
      {[0, 1, 2].map((item) => <span key={item} className="h-12 rounded-2xl border border-white/10 bg-white/10 backdrop-blur" />)}
    </div>
  </div>;
}

export function AcademyHeroVisual({ children }: { children?: ReactNode }) {
  return <div className="relative reveal">
    <IllustrationCard tone="academy" className="min-h-[25rem]" />
    <FloatingBadge tone="academy" className="-left-5 top-8" />
    <div className="absolute inset-x-4 bottom-4 rounded-[1.6rem] border border-white/10 bg-white/85 p-3 shadow-card backdrop-blur dark:bg-academy-ink/80">{children}</div>
  </div>;
}

export function AssistantOrbVisual({ children }: { children: ReactNode }) {
  return <div className="assistant-orb-shell relative reveal">
    <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-academy-gold/20 via-sky-300/10 to-emerald-300/10 blur-2xl" aria-hidden="true" />
    <div className="relative overflow-hidden rounded-[2rem] border border-academy-line bg-academy-surface/88 p-3 shadow-card backdrop-blur-xl">
      <span className="assistant-orb" aria-hidden="true" />
      {children}
    </div>
  </div>;
}

export const SecurityTrainingVisual = ({ variant = 'security' as VisualTone }: { variant?: VisualTone }) => <IllustrationCard tone={variant} />;
export const ApsVisual = () => <IllustrationCard tone="aps" />;
export const A3pVisual = () => <IllustrationCard tone="a3p" />;
export const DespVisual = () => <IllustrationCard tone="desp" />;
export const SsiapVisual = () => <IllustrationCard tone="ssiap" />;
export const BtsAlternanceVisual = () => <IllustrationCard tone="bts" />;
export const VtcTrainingVisual = () => <IllustrationCard tone="vtc" />;
export const CnapsVisual = () => <IllustrationCard tone="cnaps" />;
export const FundingVisual = () => <IllustrationCard tone="funding" />;
export const ExamVisual = () => <IllustrationCard tone="exam" />;
export const DatesSessionVisual = () => <IllustrationCard tone="dates" />;
export const ProgramModulesVisual = () => <IllustrationCard tone="program" />;
export const ContactVisual = () => <IllustrationCard tone="contact" />;

export function TrainingPathVisual({ tone = 'academy' }: { tone?: VisualTone }) {
  return <div className="relative mx-auto mt-10 max-w-6xl rounded-[2rem] border border-academy-line bg-academy-surface/70 p-4 shadow-soft backdrop-blur">
    <div className="grid gap-4 md:grid-cols-[.8fr_1.2fr]"><IllustrationCard tone={tone} className="min-h-[13rem]" /><SuccessTimeline tone={tone} /></div>
  </div>;
}

export function ConversionCtaVisual({ tone = 'academy' }: { tone?: VisualTone }) {
  return <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true"><PremiumBackground tone={tone} /><div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-academy-gold/70 to-transparent" /></div>;
}
