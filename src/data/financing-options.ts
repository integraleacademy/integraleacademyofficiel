import { allFormations } from './formations';

const simulatedFormations = [
  { slug: '/formations-securite/aps', label: 'APS' },
  { slug: '/formations-securite/ssiap-1', label: 'SSIAP 1' },
  { slug: '/formations-securite/a3p-apr', label: 'A3P' },
  { slug: '/dirigeant', label: 'DESP initial' },
  { slug: '/vaedirigeant', label: 'DESP en VAE' },
  { slug: '/vtc', label: 'Chauffeur VTC' },
];

// Use the same published prices as the catalogue; quote-only courses are excluded.
export const financingFormationOptions = simulatedFormations.flatMap((option) => {
  const price = allFormations.find(({ slug }) => slug === option.slug)?.price;
  const amountText = price?.match(/([\d\s]+)\s*€/)?.[1];
  const amount = amountText ? Number(amountText.replace(/\s/g, '')) : NaN;
  return Number.isFinite(amount) && amount > 0 ? [{ ...option, amount }] : [];
});
