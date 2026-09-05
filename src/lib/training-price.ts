export type TrainingPriceSource = {
  priceCents?: number | string | null;
  priceLabel?: number | string | null;
};

const MINIMUM_COHERENT_TRAINING_PRICE_EUROS = 100;

function formatEuros(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function parseEuroLabel(value: unknown) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;

  const normalized = value
    .trim()
    .replace(/[€\s\u00a0\u202f]/g, '')
    .replace(',', '.');

  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

/**
 * Les imports de sessions peuvent contenir un priceLabel décalé ou tronqué.
 * Un montant en centimes cohérent est donc prioritaire, puis le libellé, puis
 * le tarif de référence de la formation.
 */
export function formatTrainingPrice(source: TrainingPriceSource | null | undefined, fallback: string) {
  const cents = Number(source?.priceCents);
  if (Number.isFinite(cents) && cents >= MINIMUM_COHERENT_TRAINING_PRICE_EUROS * 100) {
    return formatEuros(cents / 100);
  }

  const labelledAmount = parseEuroLabel(source?.priceLabel);
  if (labelledAmount !== null && labelledAmount >= MINIMUM_COHERENT_TRAINING_PRICE_EUROS) {
    return formatEuros(labelledAmount);
  }

  const label = String(source?.priceLabel ?? '').trim();
  if (label && !/\d/.test(label)) return label;

  const fallbackAmount = parseEuroLabel(fallback);
  if (fallbackAmount !== null) return formatEuros(fallbackAmount);
  return fallback.trim() || 'Sur devis';
}
