import type { TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { formatSessionPeriod } from '@/lib/public-sessions';

export type SsiapFormula = 'ssiap-1' | 'ssiap-1-sst';

export function ssiapSessionFormula(title?: string | null): SsiapFormula | undefined {
  if (/(?:\bavec\s+|\+\s*)SST\b/i.test(title || '')) return 'ssiap-1-sst';
  if (/\bsans SST\b/i.test(title || '')) return 'ssiap-1';
  return undefined;
}

export function importedSessionPrice(
  slug: string, title: string, startDate: Date, priceCents: number | null, priceLabel: string,
) {
  const label = priceLabel.replace(/[€\s]/g, '').replace(/TTC$/i, '');
  const commonPrice = !label || /^(?:980|1230)(?:[,.]00)?$/.test(label);
  if (slug === 'ssiap-1' && startDate.getUTCFullYear() === 2027 &&
      ssiapSessionFormula(title) === 'ssiap-1-sst' && commonPrice &&
      (priceCents === null || priceCents === 98000 || priceCents === 123000)) {
    return { priceCents: 123000, priceLabel: '1 230 € TTC' };
  }
  return { priceCents, priceLabel };
}

export function ssiapRegistrationHref(session?: TrainingDatesPricingSession | null, formula?: SsiapFormula) {
  const params = new URLSearchParams({ formation: 'ssiap-1', objet: 'inscription' });
  if (session?.id) params.set('session', String(session.id));
  if (session?.startDate && session?.endDate) params.set('periode', formatSessionPeriod(session.startDate, session.endDate));
  const selected = ssiapSessionFormula(session?.title) ?? formula;
  if (selected) params.set('formule', selected);
  return `/contact?${params.toString()}#choix-ssiap`;
}
