import Link from 'next/link';

export function CallbackConfirmation({ formation, href }: { formation: string; href: string }) {
  return (
    <section className="page-container py-14 sm:py-20">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-academy-line bg-academy-surface p-6 text-center shadow-soft sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>
        </span>
        <p className="mt-6 text-xs font-black uppercase tracking-[.15em] text-academy-gold-strong">{formation}</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-academy-ink dark:text-white sm:text-4xl">Votre demande de rappel est confirmée.</h1>
        <p className="mt-5 text-base font-semibold leading-8 text-academy-muted">Notre équipe vous recontactera au numéro indiqué dans votre demande pour échanger sur votre projet de formation.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={href} className="inline-flex min-h-12 items-center justify-center rounded-full bg-academy-gold px-6 py-3 text-sm font-black text-academy-gold-text">Consulter la formation</Link>
          <Link href="/planning" className="inline-flex min-h-12 items-center justify-center rounded-full border border-academy-line px-6 py-3 text-sm font-black text-academy-ink dark:text-white">Voir les prochaines dates</Link>
        </div>
        <p className="mt-8 text-sm font-semibold text-academy-muted">Une question ? <a href="tel:0422470768" className="whitespace-nowrap font-black text-academy-ink dark:text-white">04 22 47 07 68</a></p>
      </div>
    </section>
  );
}
