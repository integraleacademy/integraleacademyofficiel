export type SessionLocationFilterKey = 'all' | 'paris' | 'cote-azur';

export const sessionLocationFilters: { key: SessionLocationFilterKey; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'paris', label: 'Paris' },
  { key: 'cote-azur', label: 'Côte d’Azur' },
];

function normalizedLocation(value?: string | null) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function sessionMatchesLocation(
  session: { location?: string | null },
  filter: SessionLocationFilterKey,
) {
  if (filter === 'all') return true;

  const location = normalizedLocation(session.location);
  if (filter === 'paris') return /(^| )paris( |$)/.test(location);
  return location.includes('cote d azur') || location.includes('puget sur argens');
}
