import assert from 'node:assert/strict';
import test from 'node:test';
import { getSessionSeatAvailability, resolveSessionSeatCapacity } from '../src/lib/session-seat-availability';
import { computedSeats } from '../src/lib/public-sessions';
import { validateSessionSeatCounts } from '../src/lib/session-capacity';

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
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 20, seatsLeft: null }, 20), 12);
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 46, seatsLeft: null }, 12), 12);
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 92, seatsLeft: null }, 12), 12);
});

test('les données de l’assistant suivent les mêmes règles que les cartes, y compris les anciennes capacités', () => {
  for (const slug of ['aps', 'a3p-apr', 'desp-initial', 'desp-vae', 'vtc', 'bts-mco', 'ssiap-3']) {
    for (const seatsLeft of [25, 12, 3, 0, null, -1, 2.5, 'invalide']) {
      const session = { training: { slug }, seatsTotal: 46, seatsLeft, startDate: '2026-11-03' };
      const count = computedSeats(session, referenceDate);
      assert.equal(count, getSessionSeatAvailability(session, 20, referenceDate).count);
      assert.ok(count !== null && count >= 0 && count <= 12);
    }
  }
});

test('les sessions complètes, masquées et à capacité réduite restent cohérentes', () => {
  assert.equal(computedSeats({ seatsLeft: 25, status: 'FULL' }), 0);
  assert.equal(getSessionSeatAvailability({ seatsLeft: 5, showSeatsLeft: false }).count, null);
  assert.equal(getSessionSeatAvailability({ seatsLeft: 25, status: 'FULL', showSeatsLeft: false }).label, 'Session complète');
  assert.equal(computedSeats({ seatsTotal: 3, seatsLeft: null, startDate: '2027-01-04' }, referenceDate), 3);
  assert.equal(resolveSessionSeatCapacity({ seatsTotal: 12, training: { slug: 'sst' } }), 10);
});

test('la saisie refuse les capacités invalides et conserve le mode automatique vide', () => {
  for (const seatsTotal of [13, 25, -1, 0, 3.5, 'invalide']) assert.ok(validateSessionSeatCounts({ seatsTotal }));
  for (const seatsLeft of [13, 25, -1, 3.5, 'invalide']) assert.ok(validateSessionSeatCounts({ seatsLeft }));
  assert.ok(validateSessionSeatCounts({ seatsTotal: 5, seatsLeft: 6 }));
  assert.equal(validateSessionSeatCounts({ seatsTotal: 12, seatsLeft: 0 }), null);
  assert.equal(validateSessionSeatCounts({ seatsTotal: '', seatsLeft: '' }), null);
  assert.equal(validateSessionSeatCounts({ seatsTotal: 12, seatsLeft: 12 }), null);
});
