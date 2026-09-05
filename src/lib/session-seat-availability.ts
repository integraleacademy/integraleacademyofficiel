export type SessionSeatAvailabilityTone = 'available' | 'moderate' | 'low' | 'critical' | 'full' | 'unknown';

type SessionSeatAvailabilitySource = {
  seatsLeft?: number | string | null;
  status?: string | null;
};

export type SessionSeatAvailability = {
  count: number | null;
  label: string;
  tone: SessionSeatAvailabilityTone;
  badgeClassName: string;
};

const badgeStyles: Record<SessionSeatAvailabilityTone, string> = {
  available: 'border-emerald-300 bg-emerald-100 text-emerald-800 shadow-[0_0_22px_rgba(16,185,129,.14)]',
  moderate: 'border-amber-300 bg-amber-100 text-amber-800',
  low: 'border-orange-300 bg-orange-100 text-orange-800 shadow-[0_0_22px_rgba(249,115,22,.14)]',
  critical: 'border-rose-300 bg-rose-100 text-rose-800 shadow-[0_0_24px_rgba(244,63,94,.18)]',
  full: 'border-red-300 bg-red-100 text-red-800',
  unknown: 'border-stone-300 bg-stone-100 text-stone-700',
};

function normalizeSeatCount(value: SessionSeatAvailabilitySource['seatsLeft']) {
  if (value === null || value === undefined || value === '') return null;

  const count = Number(value);
  if (!Number.isFinite(count)) return null;
  return Math.max(0, Math.floor(count));
}

export function getSessionSeatAvailability(
  session: SessionSeatAvailabilitySource,
  capacity = 12,
): SessionSeatAvailability {
  const count = normalizeSeatCount(session.seatsLeft);

  if (session.status === 'FULL' || count === 0) {
    return { count: 0, label: 'Session complète', tone: 'full', badgeClassName: badgeStyles.full };
  }

  if (count === null) {
    return { count: null, label: 'Places restantes à confirmer', tone: 'unknown', badgeClassName: badgeStyles.unknown };
  }

  const safeCapacity = Number.isFinite(capacity) && capacity > 0 ? capacity : 12;
  const occupancyRatio = count / safeCapacity;
  const tone: SessionSeatAvailabilityTone = occupancyRatio >= 0.75
    ? 'available'
    : occupancyRatio >= 0.5
      ? 'moderate'
      : occupancyRatio >= 0.25
        ? 'low'
        : 'critical';

  return {
    count,
    label: count === 1 ? '1 place restante' : `${count} places restantes`,
    tone,
    badgeClassName: badgeStyles[tone],
  };
}
