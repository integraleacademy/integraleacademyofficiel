import { computedSeats } from '@/lib/public-sessions';

export type SessionSeatAvailabilityTone = 'available' | 'moderate' | 'low' | 'critical' | 'full';

type SessionSeatAvailabilitySource = {
  startDate?: string | Date | null;
  seatsTotal?: number | string | null;
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
};

function normalizeSeatCount(value: SessionSeatAvailabilitySource['seatsLeft']) {
  if (value === null || value === undefined || value === '') return null;

  const count = Number(value);
  if (!Number.isFinite(count)) return null;
  return Math.max(0, Math.floor(count));
}

export function resolveSessionSeatCapacity(
  session: SessionSeatAvailabilitySource,
  maximumCapacity = 12,
) {
  const safeMaximum = normalizeSeatCount(maximumCapacity) || 12;

  const storedCapacity = normalizeSeatCount(session.seatsTotal);
  if (storedCapacity !== null && storedCapacity > 0 && storedCapacity <= safeMaximum) return storedCapacity;
  return safeMaximum;
}

export function getSessionSeatAvailability(
  session: SessionSeatAvailabilitySource,
  capacity = 12,
  referenceDate = new Date(),
): SessionSeatAvailability {
  const safeCapacity = Number.isFinite(capacity) && capacity > 0 ? Math.floor(capacity) : 12;
  const storedCount = normalizeSeatCount(session.seatsLeft);
  const validOverride = storedCount !== null && storedCount <= safeCapacity ? storedCount : null;
  const automaticCount = computedSeats({
    startDate: session.startDate ?? undefined,
    seatsLeft: validOverride,
    status: session.status ?? undefined,
    showSeatsLeft: true,
  }, referenceDate);
  const count = Math.min(automaticCount ?? safeCapacity, safeCapacity);

  if (session.status === 'FULL' || count === 0) {
    return { count: 0, label: 'Session complète', tone: 'full', badgeClassName: badgeStyles.full };
  }

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
