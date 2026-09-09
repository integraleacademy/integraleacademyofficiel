export const MAX_SESSION_CAPACITY = 12;

export type SessionCapacitySource = {
  seatsTotal?: number | string | null;
  seatsLeft?: number | string | null;
  training?: { slug?: string | null } | null;
};

export function normalizeSeatCount(value: SessionCapacitySource['seatsLeft']) {
  if (value === null || value === undefined || value === '') return null;
  const count = Number(value);
  return Number.isInteger(count) && count >= 0 ? count : null;
}

export function resolveSessionSeatCapacity(session: SessionCapacitySource, maximumCapacity = MAX_SESSION_CAPACITY) {
  const slug = session.training?.slug?.toLowerCase() || '';
  const trainingMaximum = slug === 'sst' || slug.startsWith('sst-') ? 10 : MAX_SESSION_CAPACITY;
  const maximum = Math.min(normalizeSeatCount(maximumCapacity) || MAX_SESSION_CAPACITY, trainingMaximum);
  const stored = normalizeSeatCount(session.seatsTotal);
  return stored !== null && stored > 0 ? Math.min(stored, maximum) : maximum;
}

export function validateSessionSeatCounts(session: SessionCapacitySource): string | null {
  for (const [field, label] of [['seatsTotal', 'Places totales'], ['seatsLeft', 'Places restantes']] as const) {
    const value = session[field];
    if (value === null || value === undefined || value === '') continue;
    const count = normalizeSeatCount(value);
    if (count === null || count > MAX_SESSION_CAPACITY || (field === 'seatsTotal' && count === 0)) {
      return `${label} : indiquez un nombre entier entre ${field === 'seatsTotal' ? 1 : 0} et ${MAX_SESSION_CAPACITY}.`;
    }
  }
  const remaining = normalizeSeatCount(session.seatsLeft);
  if (remaining !== null && remaining > resolveSessionSeatCapacity(session)) {
    return 'Les places restantes ne peuvent pas dépasser les places totales de la session.';
  }
  return null;
}
