import Link from 'next/link';

type VtcTrainingCardProps = {
  title: string;
  description: string;
  duration: string;
  href: string;
};

function CarIcon() {
  return <svg viewBox="0 0 32 32" fill="none" className="h-9 w-9" aria-hidden="true">
    <path d="m6.2 18 2.6-7.1A3 3 0 0 1 11.6 9h8.8a3 3 0 0 1 2.8 1.9l2.6 7.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 16.5h17c1.7 0 3 1.3 3 3V24H4.5v-4.5c0-1.7 1.3-3 3-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M8 24v2.2M24 24v2.2M8.5 20.2h2.2m10.6 0h2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}

const benefits = [
  ['E-learning', 'Théorie accessible à distance'],
  ['Présentiel', 'Pratique en véhicule encadrée'],
  ['Tout inclus', 'Frais d’examen compris'],
  ['Financement', 'CPF selon éligibilité'],
];

export function VtcTrainingCard({ title, description, duration, href }: VtcTrainingCardProps) {
  return <article className="group relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-violet-300/35 bg-academy-surface shadow-card transition duration-300 hover:-translate-y-1 hover:border-violet-400/60">
    <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-600" aria-hidden="true"/>
    <div className="grid lg:grid-cols-[0.82fr_1.35fr]">
      <div className="relative isolate flex min-h-[18rem] flex-col overflow-hidden bg-gradient-to-br from-violet-950 via-violet-800 to-fuchsia-700 p-7 text-white sm:p-9">
        <div className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-fuchsia-300/30 blur-3xl transition duration-500 group-hover:scale-125" aria-hidden="true"/>
        <div className="absolute -bottom-24 -left-16 -z-10 h-64 w-64 rounded-full bg-indigo-400/35 blur-3xl" aria-hidden="true"/>
        <div className="absolute inset-0 -z-10 opacity-[.15] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true"/>

        <div className="flex items-center justify-between gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-[1.35rem] border border-white/20 bg-white/[.12] text-fuchsia-100 shadow-lg backdrop-blur"><CarIcon/></span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.15em] text-violet-100 backdrop-blur">Parcours VTC</span>
        </div>

        <div className="mt-auto pt-10">
          <p className="text-[0.68rem] font-black uppercase tracking-[.2em] text-violet-200">Durée de la formation</p>
          <p className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{duration}</p>
          <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-violet-100">Théorie à distance, pratique en présentiel et préparation complète à l’examen.</p>
        </div>
      </div>

      <div className="relative flex flex-col p-7 sm:p-9">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-400/10 blur-3xl" aria-hidden="true"/>
        <div className="relative flex flex-wrap gap-2">
          <span className="rounded-full border border-violet-300/40 bg-violet-500/10 px-3 py-1.5 text-xs font-black text-violet-700 dark:text-violet-300">Formation professionnelle</span>
          <span className="rounded-full border border-academy-line bg-academy-elevated/80 px-3 py-1.5 text-xs font-black text-academy-muted">Transport de personnes</span>
        </div>

        <h3 className="relative mt-5 text-2xl font-black leading-tight tracking-tight text-academy-ink sm:text-3xl">{title}</h3>
        <p className="relative mt-4 max-w-2xl text-[0.97rem] font-medium leading-7 text-academy-muted">{description}</p>

        <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
          {benefits.map(([label, detail]) => <div key={label} className="rounded-2xl border border-academy-line/90 bg-academy-elevated/65 p-4">
            <p className="text-sm font-black text-academy-ink">{label}</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-academy-muted">{detail}</p>
          </div>)}
        </div>

        <div className="relative mt-auto pt-7">
          <Link href={href} className="inline-flex items-center gap-2 text-sm font-black text-academy-ink transition group-hover:text-violet-700 dark:group-hover:text-violet-300">
            Découvrir
            <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-700 text-white shadow-lg shadow-violet-700/20 transition duration-300 group-hover:translate-x-1 group-hover:bg-fuchsia-600" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  </article>;
}
