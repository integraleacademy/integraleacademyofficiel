import Link from 'next/link';

export function ContactRequestCard({ href }: { href: string }) {
  return (
    <div className="rounded-[2rem] border border-academy-line/70 bg-academy-surface p-5 shadow-[0_28px_90px_rgba(54,40,20,.12)] sm:p-8">
      <span className="inline-flex rounded-full bg-academy-gold-soft/55 px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] text-academy-gold-strong">Votre demande</span>
      <h2 className="mt-5 text-2xl font-black tracking-[-.03em] text-academy-ink dark:text-white sm:text-3xl">Préparons votre projet de formation.</h2>
      <p className="mt-4 text-sm font-semibold leading-7 text-academy-muted">
        Pour une formation en sécurité privée, SSIAP 1 ou VTC, indiquez vos coordonnées, la formation souhaitée et votre situation. Notre équipe pourra étudier votre demande et vous accompagner dans les prochaines étapes.
      </p>
      <a href={href} className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-academy-gold px-6 py-4 text-center text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5 hover:shadow-soft">
        Compléter ma demande d’informations <span aria-hidden="true">→</span>
      </a>
      <p className="mt-4 text-xs leading-6 text-academy-muted">
        Intégrale Academy utilise vos informations pour étudier votre projet et vous recontacter. Le formulaire dédié enregistre les réponses au fil de la saisie, avant validation. Pour connaître les destinataires, la conservation des données et vos droits d’accès ou de suppression, consultez notre <Link href="/politique-confidentialite" className="font-bold text-academy-ink underline underline-offset-4 dark:text-white">politique de confidentialité</Link>.
      </p>
      <div className="mt-8 border-t border-academy-line/70 pt-6">
        <h3 className="text-base font-black text-academy-ink dark:text-white">Votre projet concerne un BTS ?</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">Aurélie vous accompagne pour votre candidature et votre recherche d’alternance.</p>
        <a href="mailto:aurelie@integraleacademy.com?subject=Question%20sur%20un%20BTS" className="mt-4 inline-flex min-h-12 items-center rounded-full border border-academy-line px-5 py-3 text-sm font-black text-academy-ink transition hover:border-academy-gold dark:text-white">Écrire à Aurélie</a>
      </div>
      <p className="mt-6 text-sm font-semibold leading-6 text-academy-muted">
        Pour une autre formation ou une question particulière, <a href="mailto:ecole@integraleacademy.com?subject=Contact%20site%20internet" className="font-black text-academy-ink underline underline-offset-4 dark:text-white">écrivez à notre équipe</a>.
      </p>
    </div>
  );
}
