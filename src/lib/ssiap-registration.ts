import type { TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { formatSessionPeriod } from '@/lib/public-sessions';

export type SsiapFormula = 'ssiap-1' | 'ssiap-1-sst';

export function ssiapSessionFormula(title?: string | null): SsiapFormula | undefined {
  if (/\bavec SST\b/i.test(title || '')) return 'ssiap-1-sst';
  if (/\bsans SST\b/i.test(title || '')) return 'ssiap-1';
  return undefined;
}

export function ssiapRegistrationHref(session?: TrainingDatesPricingSession | null, formula?: SsiapFormula) {
  const params = new URLSearchParams({ formation: 'ssiap-1', objet: 'inscription' });
  if (session?.id) params.set('session', String(session.id));
  if (session?.startDate && session?.endDate) params.set('periode', formatSessionPeriod(session.startDate, session.endDate));
  const selected = ssiapSessionFormula(session?.title) ?? formula;
  if (selected) params.set('formule', selected);
  return `/contact?${params.toString()}#choix-ssiap`;
}
