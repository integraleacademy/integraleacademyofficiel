import Link from 'next/link';
import FinancingSimulator from '@/components/FinancingSimulator';
import { Button, ContactBlock } from '@/components/ui';
import { allFormations } from '@/data/formations';

export const metadata = {
  title: 'Tarifs formations professionnelles',
  description: 'Tarifs des formations Intégrale Academy hors BTS : sécurité privée, sécurité incendie, secourisme, direction sécurité privée et VTC.',
};

const pricedFormations = allFormations.filter((formation) => formation.category !== 'bts');
const essentials = ['Hors BTS', 'Financements possibles', 'Devis confirmé par conseiller'];

function formatPrice(price?: string) {
  if (!price) return { main: 'Sur devis', detail: 'Selon votre parcours' };
  const match = price.match(/^([\d\s]+)\s€(?:\s(.+))?$/);
  if (!match) return { main: price, detail: 'Modalités à confirmer' };
  return { main: `${match[1].trim()}€`, detail: match[2] ? match[2].trim() : 'Tarif indicatif' };
}

export default function Page() {
  return <>
    <section className="relative isolate overflow-hidden bg-academy-ink px-4 py-16 text-white md:py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(244,196,90,.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,.16),transparent_26%),radial-gradient(circle_at_15%_85%,rgba(244,196,90,.24),transparent_30%)]" />
      <div className="absolute left-0 top-0 -z-10 h-full w-full opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.72fr] lg:items-end">
        <div>
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-academy-gold backdrop-blur">Grille tarifaire</div>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[.95] tracking-tight md:text-7xl">
            Tous les tarifs de nos formations, hors BTS.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-200 md:text-xl">
            Toutes les formations professionnelles Intégrale Academy hors BTS, avec le tarif, la durée, le lieu et les options de financement en un coup d’œil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {essentials.map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85">{item}</span>)}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_28px_90px_rgba(0,0,0,.35)] backdrop-blur">
          <p className="text-sm font-black uppercase tracking-[.2em] text-academy-gold">À retenir</p>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl bg-white p-5 text-academy-ink">
              <span className="text-4xl font-black">{pricedFormations.length}</span>
              <p className="mt-1 text-sm font-bold text-stone-600">formations affichées, BTS exclus</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm leading-7 text-stone-200">Les montants restent indicatifs : l’équipe admissions confirme le tarif final selon votre session, votre financement et votre dossier.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f7f4ee] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.25em] text-yellow-700">Catalogue hors BTS</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Choisissez votre formation</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-600">Comparez rapidement les parcours selon leur tarif, leur durée, leur certification et les solutions de financement possibles.</p>
        </div>

        <div className="grid gap-5">
          {pricedFormations.map((formation, index) => {
            const price = formatPrice(formation.price);
            return <article key={formation.slug} className="group overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-academy-line transition hover:-translate-y-1 hover:shadow-gold">
              <div className="grid gap-0 lg:grid-cols-[10rem_1.3fr_.8fr]">
                <div className="flex items-center justify-between bg-gradient-to-br from-academy-gold to-yellow-200 p-6 lg:block lg:p-8">
                  <span className="text-xs font-black uppercase tracking-[.2em] text-stone-700">Parcours</span>
                  <div className="mt-0 text-4xl font-black text-academy-ink lg:mt-6">{String(index + 1).padStart(2, '0')}</div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-academy-bg px-3 py-1 text-xs font-black text-stone-600">{formation.duration}</span>
                    <span className="rounded-full bg-academy-bg px-3 py-1 text-xs font-black text-stone-600">{formation.locations}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight text-academy-ink">{formation.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">{formation.short}</p>
                  <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-stone-700">
                    <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-academy-green" />{formation.certification}</span>
                    <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-academy-gold" />{formation.financing}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between border-t border-academy-line bg-stone-50 p-6 md:p-8 lg:border-l lg:border-t-0">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.2em] text-stone-500">Tarif</p>
                    <div className="mt-3 text-4xl font-black tracking-tight text-academy-ink md:text-5xl">{price.main}</div>
                    <p className="mt-2 text-sm font-bold text-stone-500">{price.detail}</p>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    <Link href={formation.slug} className="inline-flex items-center justify-center rounded-full bg-academy-ink px-5 py-3 text-sm font-black text-white transition group-hover:bg-black">Détails</Link>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:bg-academy-gold">Devis</Link>
                  </div>
                </div>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <FinancingSimulator />

    <section className="px-4 py-12">
      <div className="mx-auto overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-academy-line md:max-w-7xl">
        <div className="grid lg:grid-cols-[.8fr_1.2fr]">
          <div className="bg-academy-ink p-8 text-white md:p-10">
            <p className="text-xs font-black uppercase tracking-[.25em] text-academy-gold">Important</p>
            <h2 className="mt-4 text-3xl font-black">Les BTS ne sont pas inclus sur cette grille.</h2>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-stone-600">Pour les formations affichées, un conseiller peut vérifier votre éligibilité CPF, France Travail, OPCO, entreprise ou facilités de paiement, puis confirmer un devis adapté.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact">Parler à un conseiller</Button>
              <Button href="/financements" variant="ghost">Voir les financements</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="px-4"><ContactBlock /></section>
  </>;
}
