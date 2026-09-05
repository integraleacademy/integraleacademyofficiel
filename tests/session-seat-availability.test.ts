import assert from 'node:assert/strict';
import test from 'node:test';
import { getSessionSeatAvailability, resolveSessionSeatCapacity } from '../src/lib/session-seat-availability';

const referenceDate = new Date('2026-09-05T12:00:00.000Z');

test('le badge affiche toujours le nombre exact de places restantes', () => {
  assert.equal(getSessionSeatAvailability({ seatsLeft: 12 }, 12).label, '12 places restantes');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 1 }, 12).label, '1 place restante');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 4, status: 'FULL' }, 12).label, 'Session complète');
});

test('une ancienne valeur supérieure à 12 laisse la règle automatique reprendre la main', () => {
  const availability = getSessionSeatAvailability({ seatsLeft: 25, startDate: '2026-11-03T00:00:00.000Z' }, 12, referenceDate);
  assert.equal(availability.label, '6 places restantes');
  assert.equal(availability.count, 6);
});

test('la couleur devient plus urgente à mesure que les places diminuent', () => {
  assert.equal(getSessionSeatAvailability({ seatsLeft: 12 }, 12).tone, 'available');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 8 }, 12).tone, 'moderate');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 5 }, 12).tone, 'low');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 3 }, 12).tone, 'critical');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 2 }, 12).tone, 'critical');
  assert.equal(getSessionSeatAvailability({ seatsLeft: 0 }, 12).tone, 'full');
});

test('une session à plus de 60 jours affiche la capacité maximale', () => {
  const availability = getSessionSeatAvailability({ seatsLeft: null, startDate: '2027-01-04T00:00:00.000Z' }, 12, referenceDate);
  assert.equal(availability.label, '12 places restantes');
  assert.equal(availability.tone, 'available');
});

test('le nombre automatique diminue à l’approche de la date de début', () => {
  const automaticSeats = (startDate: string) => getSessionSeatAvailability({ seatsLeft: null, startDate }, 12, referenceDate).count;

  assert.equal(automaticSeats('2026-11-04T00:00:00.000Z'), 6);
  assert.equal(automaticSeats('2026-10-20T00:00:00.000Z'), 5);
  assert.equal(automaticSeats('2026-10-05T00:00:00.000Z'), 4);
  assert.equal(automaticSeats('2026-09-20T00:00:00.000Z'), 2);
  assert.equal(automaticSeats('2026-11-05T00:00:00.000Z'), 12);
});

test('une valeur administrée valide reste prioritaire sur le calcul automatique', () => {
  const availability = getSessionSeatAvailability({ seatsLeft: 5, startDate: '2026-09-07T00:00:00.000Z' }, 12, referenceDate);
  assert.equal(availability.count, 5);
});

test('la capacité administrée est utilisée uniquement si elle respecte le maximum du parcours', () => {
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 10, seatsLeft: null }, 12), 10);
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 20, seatsLeft: null }, 20), 20);
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 46, seatsLeft: null }, 12), 12);
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 92, seatsLeft: null }, 12), 12);
});
