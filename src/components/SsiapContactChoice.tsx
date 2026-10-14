import { INFORMATION_REQUEST_URL } from '@/lib/contact-request';

type Params = Record<string, string | string[] | undefined>;

/** Show the visitor's selected course and period before the existing CRM form. */
export function SsiapContactChoice({ params }: { params: Params }) {
  const first = (value: Params[string]) => Array.isArray(value) ? value[0] : value;
  if (first(params.formation) !== 'ssiap-1') return null;
  const formula = first(params.formule);
  const formulaLabel = formula === 'ssiap-1-sst' ? 'SSIAP 1 + SST' : formula === 'ssiap-1' ? 'SSIAP 1' : 'Formation SSIAP 1';
  const period = first(params.periode) || '';
  const safePeriod = /^Du \d{2}\/\d{2}\/\d{4} au \d{2}\/\d{2}\/\d{4}$/.test(period) ? period : '';
  const selectedText = [formulaLabel, safePeriod].filter(Boolean).join(' — ');
  const email = `mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`Inscription ${formulaLabel}`)}&body=${encodeURIComponent(`Bonjour Cassandre,\n\nJe souhaite préparer mon inscription : ${selectedText}.\n\nMerci de me recontacter pour vérifier mon dossier et mon financement.\n\nNom :\nTéléphone :`)}`;
  return <section id="choix-ssiap" className="page-container scroll-mt-28 px-4 py-8" aria-labelledby="choix-ssiap-title">
    <div className="rounded-3xl border border-red-200 bg-academy-surface p-6 text-academy-ink sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-300">Votre projet SSIAP 1</p>
      <h2 id="choix-ssiap-title" className="mt-3 text-2xl font-black">{formulaLabel}</h2>
      {safePeriod && <p className="mt-2 font-bold">{safePeriod}</p>}
      <p className="mt-3 max-w-3xl text-sm leading-7 text-academy-muted">Votre choix est rappelé ici pour préparer votre échange avec Cassandre. L’équipe vérifie les prérequis, les dates de présence et le financement avant de confirmer l’inscription.</p>
      <div className="mt-5 flex flex-wrap gap-3"><a href={email} className="inline-flex min-h-12 items-center justify-center rounded-full bg-red-700 px-5 py-3 text-center text-sm font-bold text-white">Transmettre ce choix par e-mail →</a><a href={`${INFORMATION_REQUEST_URL}?formation=SSIAP`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-academy-line px-5 py-3 text-center text-sm font-bold">Compléter ma demande d’informations →</a></div>
      <p className="mt-3 text-xs leading-6 text-academy-muted">Le courriel reprend votre sélection. Pour un premier échange général, vous pouvez aussi compléter la demande d’informations SSIAP.</p>
    </div>
  </section>;
}
