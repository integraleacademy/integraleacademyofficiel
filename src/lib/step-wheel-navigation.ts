type WheelInput = {
  delta: number;
  now: number;
  position: number;
  start: number;
  end: number;
  step: number;
};

type WheelAction =
  | { kind: 'hold' }
  | { kind: 'step'; index: number }
  | { kind: 'exit'; direction: number }
  | null;

// High-inertia wheels can deliver another burst well after the first one.
// Require a real pause before rearming, not just the end of the animation.
const GESTURE_GAP = 1000;
const TRANSITION_PAUSE = 900;
const WHEEL_THRESHOLD = 48;

export function normalizeWheelDelta(delta: number, mode: number, viewportHeight: number) {
  return delta * (mode === 1 ? 16 : mode === 2 ? viewportHeight : 1);
}

/** Consume a whole wheel/trackpad gesture, including its momentum, only once. */
export function createStepWheelNavigation(count: number) {
  let lastEvent = -Infinity;
  let lockedUntil = -Infinity;
  let direction = 0;
  let accumulated = 0;
  let consumed = false;

  function lock(now: number) {
    lockedUntil = now + TRANSITION_PAUSE;
    lastEvent = now;
    consumed = true;
    accumulated = 0;
  }

  function handle({ delta, now, position, start, end, step }: WheelInput): WheelAction {
    if (!Number.isFinite(delta) || delta === 0 || end <= start) return null;
    const nextDirection = Math.sign(delta);

    // Catch even a large first wheel movement before it can jump over the story.
    if (position < start || position > end) {
      const entersFromAbove = position < start && delta > 0 && position + delta >= start;
      const entersFromBelow = position > end && delta < 0 && position + delta <= end;
      if (!entersFromAbove && !entersFromBelow) return null;
      direction = nextDirection;
      lock(now);
      return { kind: 'step', index: entersFromAbove ? 0 : count - 1 };
    }

    if (now - lastEvent >= GESTURE_GAP || nextDirection !== direction) {
      accumulated = 0;
      consumed = false;
    }
    direction = nextDirection;
    lastEvent = now;

    // Never queue a second transition: the visitor must make a fresh gesture.
    if (now < lockedUntil) consumed = true;
    if (consumed) return { kind: 'hold' };
    accumulated += Math.abs(delta);
    if (accumulated < WHEEL_THRESHOLD) return { kind: 'hold' };

    lock(now);
    const index = step + direction;
    if (index < 0 || index >= count) return { kind: 'exit', direction };
    return { kind: 'step', index };
  }

  return { handle, lock };
}
