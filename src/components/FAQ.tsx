import { TrainingActionLink } from '@/components/TrainingActionLink';
import type { CatalogueQuestion } from '@/data/faq/catalogue';
import layout from './FAQ.module.css';

export type FAQTheme = 'gold' | 'blue' | 'green' | 'orange' | 'red' | 'violet' | 'bts';

export const premiumFaqThemes: Record<FAQTheme, { shell:string; glow:string; badge:string; contact:string; icon:string; item:string; bar:string; number:string; toggle:string; check:string }> = {
  bts: { shell:'bg-gradient-to-br from-bts-50 via-white to-bts-100', glow:'bg-bts-400/20', badge:'border-bts-300/45 text-bts-700', contact:'border-bts-300/45', icon:'bg-bts-100 text-bts-700', item:'border-bts-200/75 hover:border-bts-400 open:border-bts-500', bar:'bg-bts-700', number:'bg-bts-50 text-bts-700', toggle:'bg-bts-700 text-white shadow-soft', check:'bg-bts-100 text-bts-700' },
  gold: { shell:'bg-[linear-gradient(135deg,#F7F1E6_0%,#FFFDF8_48%,#F2E6D1_100%)]', glow:'bg-academy-gold/18', badge:'border-academy-gold/30 text-academy-gold-strong', contact:'border-academy-gold/35', icon:'bg-academy-gold/20 text-academy-gold-strong', item:'border-academy-gold/20 hover:border-academy-gold/40 open:border-academy-gold/55', bar:'bg-academy-gold', number:'bg-academy-bg text-academy-gold-strong', toggle:'bg-gradient-to-br from-academy-gold to-[#F6D77F] text-academy-gold-text shadow-gold', check:'bg-academy-gold/20 text-academy-gold-strong' },
  blue: { shell:'bg-[linear-gradient(135deg,#EFF6FF_0%,#FFFFFF_48%,#DBEAFE_100%)]', glow:'bg-blue-400/18', badge:'border-blue-300/45 text-blue-700', contact:'border-blue-300/45', icon:'bg-blue-100 text-blue-700', item:'border-blue-200/75 hover:border-blue-400 open:border-blue-500', bar:'bg-blue-600', number:'bg-blue-50 text-blue-700', toggle:'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_12px_28px_rgba(37,99,235,.22)]', check:'bg-blue-100 text-blue-700' },
  green: { shell:'bg-[linear-gradient(135deg,#ECFDF5_0%,#FFFFFF_48%,#D1FAE5_100%)]', glow:'bg-emerald-400/18', badge:'border-emerald-300/45 text-emerald-700', contact:'border-emerald-300/45', icon:'bg-emerald-100 text-emerald-700', item:'border-emerald-200/75 hover:border-emerald-400 open:border-emerald-500', bar:'bg-emerald-600', number:'bg-emerald-50 text-emerald-700', toggle:'bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-[0_12px_28px_rgba(5,150,105,.22)]', check:'bg-emerald-100 text-emerald-700' },
  orange: { shell:'bg-[linear-gradient(135deg,#FFF7ED_0%,#FFFFFF_48%,#FFEDD5_100%)]', glow:'bg-orange-400/18', badge:'border-orange-300/45 text-orange-700', contact:'border-orange-300/45', icon:'bg-orange-100 text-orange-700', item:'border-orange-200/75 hover:border-orange-400 open:border-orange-500', bar:'bg-orange-600', number:'bg-orange-50 text-orange-700', toggle:'bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-[0_12px_28px_rgba(234,88,12,.22)]', check:'bg-orange-100 text-orange-700' },
  red: { shell:'bg-[linear-gradient(135deg,#FEF2F2_0%,#FFFFFF_48%,#FEE2E2_100%)]', glow:'bg-red-400/18', badge:'border-red-300/45 text-red-700', contact:'border-red-300/45', icon:'bg-red-100 text-red-700', item:'border-red-200/75 hover:border-red-400 open:border-red-500', bar:'bg-red-600', number:'bg-red-50 text-red-700', toggle:'bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-[0_12px_28px_rgba(220,38,38,.22)]', check:'bg-red-100 text-red-700' },
  violet: { shell:'bg-[linear-gradient(135deg,#F5F3FF_0%,#FFFFFF_48%,#EDE9FE_100%)]', glow:'bg-violet-400/18', badge:'border-violet-300/45 text-violet-700', contact:'border-violet-300/45', icon:'bg-violet-100 text-violet-700', item:'border-violet-200/75 hover:border-violet-400 open:border-violet-500', bar:'bg-violet-600', number:'bg-violet-50 text-violet-700', toggle:'bg-gradient-to-br from-violet-600 to-purple-500 text-white shadow-[0_12px_28px_rgba(124,58,237,.22)]', check:'bg-violet-100 text-violet-700' },
};


/** Numbered accordion cards from the APS page. Native details retain keyboard support. */
export function FAQ({ items, theme = 'gold' }: { items: readonly CatalogueQuestion[]; theme?: FAQTheme }) {
  const styles = premiumFaqThemes[theme];
  return <div className={`${layout.list} grid gap-3 md:grid-cols-2 lg:gap-4`} data-faq-list data-faq-theme={theme}>
    {items.map((item, index) => <details key={item.q} data-faq-item className={`${layout.item} group overflow-hidden rounded-[1.35rem] border bg-white/92 shadow-[0_14px_42px_rgba(54,43,24,.075)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(54,43,24,.11)] open:shadow-[0_24px_70px_rgba(54,43,24,.14)] md:open:col-span-2 ${styles.item}`}>
      <summary className={`${layout.summary} relative flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-[0.95rem] font-black leading-6 text-academy-ink transition sm:px-5 sm:py-4 sm:text-base`}>
        <span className={`absolute inset-y-4 left-0 w-1 rounded-r-full opacity-0 transition group-open:opacity-100 ${styles.bar}`} aria-hidden="true" />
        <span className="flex items-start gap-3">
          <span className={`hidden min-w-8 rounded-full px-2.5 py-1 text-center text-[0.68rem] font-black sm:inline-block ${styles.number}`} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span>{item.q}</span>
        </span>
        <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg font-black transition duration-300 group-open:rotate-180 ${styles.toggle}`} aria-hidden="true">
          <span className="transition group-open:opacity-0">+</span>
          <span className="absolute opacity-0 transition group-open:opacity-100">−</span>
        </span>
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-open:grid-rows-[1fr]">
        <div className="overflow-hidden"><div className="px-4 pb-5 sm:px-5">
          <div className={`${layout.answer} border-t border-academy-line/80 text-academy-muted`}>
            {item.a.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {item.links?.length ? <ul className={layout.answerLinks} aria-label="Pour en savoir plus">
            {item.links.map(link => <li key={link.href}><TrainingActionLink href={link.href}>{link.label}<span aria-hidden="true">→</span></TrainingActionLink></li>)}
          </ul> : null}
        </div></div>
      </div>
    </details>)}
  </div>;
}
