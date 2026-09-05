import assert from 'node:assert/strict';
import test from 'node:test';
import { getSessionSeatAvailability } from '../src/lib/session-seat-availability';

test('le badge affiche toujours le nombre exact de places restantes', () => {
  assert.equal(getSessionSeatAvailability({ seatsLeft: 12 }, 12).label, '12 places restantes');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 1 }, 12).label, '1 place restante');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 4, status: 'FULL' }, 12).label, 'Session complète');
});

test('le compteur public ne dépasse jamais la capacité APS de 12 places', () => {
  assert.equal(getSessionSeatAvailability({ seatsLeft: 25 }, 12).label, '12 places restantes');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 25 }, 12).count, 12);
});

test('la couleur devient plus urgente à mesure que les places diminuent', () => {
  assert.equal(getSessionSeatAvailability({ seatsLeft: 12 }, 12).tone, 'available');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 8 }, 12).tone, 'moderate');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 5 }, 12).tone, 'low');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 2 }, 12).tone, 'critical');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 0 }, 12).tone, 'full');
});

test('une session ouverte sans compteur démarre à la capacité maximale', () => {
  const availability = getSessionSeatAvailability({ seatsLeft: null }, 12);
  assert.equal(availability.label, '12 places restantes');
  assert.equal(availability.tone, 'available');
});
