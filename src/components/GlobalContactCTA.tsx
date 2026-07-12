'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { appointmentFormUrl } from '@/components/ui';

const hiddenPathPrefixes = ['/admin', '/login', '/connexion', '/espace', '/mon-compte', '/dashboard'];

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M7 3v3M17 3v3M4.5 9.2h15M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"/></svg>;
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M7.2 4.6 9 4.1c.8-.2 1.6.2 1.9.9l.9 2.1c.3.7.1 1.5-.5 2l-.9.7a10.8 10.8 0 0 0 3.8 3.8l.7-.9c.5-.6 1.3-.8 2-.5l2.1.9c.7.3 1.1 1.1.9 1.9l-.5 1.8c-.2.8-.9 1.3-1.7 1.3A13.7 13.7 0 0 1 5.9 6.3c0-.8.5-1.5 1.3-1.7Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>;
}

export function GlobalContactCTA() {
  const pathname = usePathname();
  const [memojiAvailable, setMemojiAvailable] = useState(true);

  if (hiddenPathPrefixes.some((prefix) => pathname?.startsWith(prefix))) {
    return null;
  }

  return (
    <section className="px-4 py-10 sm:py-12 md:py-16" aria-labelledby="global-contact-cta-title">
      <div className="page-container">
        <div className="reveal relative isolate overflow-visible rounded-[2rem] border border-academy-line/80 bg-academy-surface p-1 shadow-soft md:rounded-[2.6rem]">
          <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-academy-gold/10 blur-3xl" aria-hidden="true" />
          <div className="relative isolate overflow-hidden rounded-[1.8rem] bg-[radial-gradient(circle_at_18%_12%,rgb(var(--accent)/.22),transparent_31%),radial-gradient(circle_at_86%_18%,rgb(var(--surface-elevated)/.95),transparent_28%),linear-gradient(135deg,rgb(var(--surface-elevated)),rgb(var(--surface))_58%,rgb(var(--accent-soft)/.32))] p-6 sm:p-8 md:rounded-[2.35rem] md:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.18] [background-image:linear-gradient(rgb(var(--text-main)/.22)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--text-main)/.18)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-academy-gold/25 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-28 left-1/4 -z-10 h-72 w-72 rounded-full bg-white/55 blur-3xl dark:bg-white/10" aria-hidden="true" />

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,.75fr)] lg:items-center">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-academy-gold/30 bg-academy-gold/15 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-academy-gold-strong">Une question sur votre projet ?</span>
                <h2 id="global-contact-cta-title" className="mt-5 text-balance text-4xl font-black leading-[1.02] tracking-[-.055em] text-academy-ink sm:text-5xl lg:text-6xl">Faites le premier pas vers votre futur métier.</h2>
                <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-academy-muted sm:text-lg">Notre équipe vous accompagne pour choisir la formation adaptée à votre projet et vous aider à concrétiser votre avenir professionnel.</p>
              </div>

              <div className="relative">
                <div className="absolute -right-3 -top-7 hidden h-20 w-20 rounded-full border border-academy-gold/25 bg-academy-gold/15 blur-sm lg:block" aria-hidden="true" />
                <div className="relative overflow-visible rounded-[1.8rem] border border-white/60 bg-white/62 p-5 shadow-[0_24px_70px_rgba(54,40,20,.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8 sm:p-6">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="relative shrink-0">
                      {memojiAvailable ? <img src="/static/img/cassandre-memoji.png" alt="Memoji de Cassandre" onError={() => setMemojiAvailable(false)} className="h-24 w-24 object-contain drop-shadow-[0_18px_24px_rgba(54,40,20,.18)] sm:-ml-2 sm:-mt-8 sm:h-32 sm:w-32" /> : <div className="grid h-20 w-20 place-items-center rounded-[1.6rem] bg-gradient-to-br from-academy-gold via-yellow-200 to-white text-2xl font-black text-academy-gold-text shadow-gold ring-4 ring-white sm:h-24 sm:w-24">CM</div>}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[.18em] text-academy-gold-strong">Contactez Cassandre</p>
                      <h3 className="mt-2 text-2xl font-black leading-tight text-academy-ink">Cassandre</h3>
                      <p className="mt-1 text-sm font-bold leading-6 text-academy-muted">Responsable commerciale — Intégrale Academy</p>
                      <a href="tel:+33422470768" className="mt-3 inline-flex font-black text-academy-ink underline decoration-academy-gold/55 decoration-2 underline-offset-4 transition hover:text-academy-gold-strong">04 22 47 07 68</a>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Link href={appointmentFormUrl} className="group inline-flex min-h-14 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-academy-ink px-5 py-3 text-center text-sm font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-gold"><CalendarIcon />Réserver un rendez-vous téléphonique<span className="transition group-hover:translate-x-0.5" aria-hidden="true">→</span></Link>
                    <a href="tel:+33422470768" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-academy-line bg-white/85 px-5 py-3 text-center text-sm font-black text-academy-ink shadow-sm transition hover:-translate-y-1 hover:border-academy-gold hover:bg-academy-gold hover:text-academy-gold-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academy-gold dark:bg-white/10"><PhoneIcon />Appeler Cassandre</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
