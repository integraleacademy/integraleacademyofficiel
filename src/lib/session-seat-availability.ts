import { computedSeats } from '@/lib/public-sessions';
import { resolveSessionSeatCapacity } from '@/lib/session-capacity';
export { resolveSessionSeatCapacity } from '@/lib/session-capacity';

export type SessionSeatAvailabilityTone = 'available' | 'moderate' | 'low' | 'critical' | 'full';

type SessionSeatAvailabilitySource = {
  startDate?: string | Date | null;
  seatsTotal?: number | string | null;
  seatsLeft?: number | string | null;
  status?: string | null;
  showSeatsLeft?: boolean | null;
  training?: { slug?: string | null } | null;
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

export function getSessionSeatAvailability(
  session: SessionSeatAvailabilitySource,
  capacity = 12,
  referenceDate = new Date(),
): SessionSeatAvailability {
  const safeCapacity = resolveSessionSeatCapacity(session, capacity);
  if (session.showSeatsLeft === false && session.status !== 'FULL') {
    return { count: null, label: 'Places limitées', tone: 'available', badgeClassName: badgeStyles.available };
  }
  const automaticCount = computedSeats({
    startDate: session.startDate ?? undefined,
    seatsLeft: session.seatsLeft,
    seatsTotal: safeCapacity,
    status: session.status ?? undefined,
    showSeatsLeft: true,
  }, referenceDate);
  const count = Math.min(automaticCount ?? safeCapacity, safeCapacity);

  if (session.status === 'FULL' || count === 0) {
    return { count: 0, label: 'Session complète', tone: 'full', badgeClassName: badgeStyles.full };
  }

  const occupancyRatio = count / safeCapacity;
  const tone: SessionSeatAvailabilityTone = count <= 3
    ? 'critical'
    : occupancyRatio >= 0.75
      ? 'available'
      : occupancyRatio >= 0.5
        ? 'moderate'
        : 'low';

  return {
    count,
    label: count === 1 ? '1 place restante' : `${count} places restantes`,
    tone,
    badgeClassName: badgeStyles[tone],
  };
}
