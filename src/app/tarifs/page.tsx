import Link from 'next/link';
import { Button, ContactBlock } from '@/components/ui';
import { allFormations } from '@/data/formations';

export const metadata = {
  title: 'Tarifs formations professionnelles',
  description: 'Tarifs des formations Intégrale Academy hors BTS : sécurité privée, sécurité incendie, secourisme, direction sécurité privée et VTC.',
};

const pricingNotes = [
  'Tarifs indicatifs hors formations BTS.',
  'Financements CPF, France Travail, OPCO, entreprise ou facilités de paiement selon dossier.',
  'Un conseiller vérifie avec vous les prérequis, les dates et le montant final applicable.',
];

const highlightedSlugs = ['/formations-securite/aps', '/vtc', '/formations-securite/a3p-apr'];
const pricedFormations = allFormations.filter((formation) => formation.category !== 'bts');

function formatPrice(price?: string) {
  if (!price) return { main: 'Sur devis', detail: 'Tarif personnalisé selon votre projet' };
  const match = price.match(/^([\d\s]+)\s€(?:\s(.+))?$/);
  if (!match) return { main: price, detail: 'Voir conditions avec l’équipe admissions' };
  return { main: `${match[1].trim()}€`, detail: match[2] ? match[2].trim() : 'Tarif formation' };
}

export default function Page() {
  return <>
    <section className="relative overflow-hidden bg-[#fbfaf7] px-4 py-16 md:py-24">
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-academy-gold/25 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl text-center">
        <div className="mx-auto flex max-w-xs items-center justify-center gap-4 text-xs font-black uppercase tracking-[.35em] text-orange-700">
          <span className="h-px flex-1 bg-orange-500" />
          Tarifs
          <span className="h-px flex-1 bg-orange-500" />
        </div>
        <h1 className="mt-8 text-5xl font-black tracking-tight text-academy-ink md:text-7xl">
          Tarification <span className="font-serif italic font-normal text-orange-700">transparente</span>
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-xl font-semibold leading-9 text-slate-600">
          Retrouvez les prix de nos formations professionnelles hors BTS, avec une lecture claire des durées, lieux et possibilités de financement.
        </p>
        <div className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-3">
          {pricingNotes.map((note) => <span key={note} className="rounded-full border border-academy-line bg-white/80 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm backdrop-blur">{note}</span>)}
        </div>
      </div>
    </section>

    <section className="px-4 pb-16 md:pb-24">
      <div className="mx-auto -mt-10 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pricedFormations.map((formation, index) => {
          const price = formatPrice(formation.price);
          const featured = highlightedSlugs.includes(formation.slug);
          return <article key={formation.slug} className={`relative overflow-hidden rounded-[2rem] p-1 ${featured ? 'bg-gradient-to-br from-orange-500 via-academy-gold to-orange-500 shadow-gold' : 'bg-academy-line shadow-soft'}`}>
            {featured && <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-2xl bg-gradient-to-r from-orange-500 to-academy-gold px-5 py-2 text-xs font-black uppercase tracking-[.18em] text-white shadow-lg">Formation phare</div>}
            <div className={`h-full rounded-[1.8rem] p-7 md:p-8 ${featured ? 'bg-[radial-gradient(circle_at_top_right,rgba(244,196,90,.22),transparent_34%),linear-gradient(145deg,#101827,#171717)] text-white' : 'bg-white text-academy-ink'}`}>
              <div className={`grid h-16 w-16 place-items-center rounded-3xl text-2xl ${featured ? 'bg-white/10 text-academy-gold' : 'bg-orange-50 text-orange-700'}`} aria-hidden="true">{index + 1}</div>
              <h2 className="mt-8 text-2xl font-black leading-tight">{formation.title}</h2>
              <p className={`mt-3 min-h-20 text-sm leading-6 ${featured ? 'text-slate-300' : 'text-slate-600'}`}>{formation.short}</p>
              <div className="mt-8">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black tracking-tight md:text-6xl">{price.main}</span>
                </div>
                <p className={`mt-3 text-sm font-bold ${featured ? 'text-slate-300' : 'text-slate-500'}`}>{price.detail}</p>
              </div>
              <div className={`mt-8 space-y-3 border-t pt-6 ${featured ? 'border-white/10' : 'border-academy-line'}`}>
                {[formation.duration, formation.locations, formation.financing].map((item) => <div key={item} className="flex gap-3 text-sm font-semibold leading-6">
                  <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${featured ? 'bg-green-400/15 text-green-300' : 'bg-academy-green/10 text-green-700'}`}>✓</span>
                  <span className={featured ? 'text-slate-200' : 'text-slate-700'}>{item}</span>
                </div>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={formation.slug} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 ${featured ? 'bg-academy-gold text-academy-ink' : 'bg-academy-ink text-white'}`}>Voir la formation</Link>
                <Link href="/contact" className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold ring-1 transition hover:-translate-y-0.5 ${featured ? 'bg-white/10 text-white ring-white/15 hover:bg-white/15' : 'bg-white text-academy-ink ring-academy-line hover:bg-stone-50'}`}>Demander un devis</Link>
              </div>
            </div>
          </article>;
        })}
      </div>
    </section>

    <section className="px-4 pb-12">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-academy-line md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[.25em] text-orange-700">BTS non affichés</p>
          <h2 className="mt-3 text-3xl font-black">Besoin d’un tarif personnalisé ou d’un financement ?</h2>
          <p className="mt-3 max-w-3xl text-slate-600">Les BTS sont volontairement exclus de cette page. Pour les autres formations, notre équipe peut confirmer le prix, l’éligibilité CPF et les facilités de paiement disponibles.</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button href="/contact">Parler à un conseiller</Button>
          <Button href="/financements" variant="ghost">Voir les financements</Button>
        </div>
      </div>
    </section>

    <section className="px-4"><ContactBlock /></section>
  </>;
}
