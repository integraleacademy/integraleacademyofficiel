import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createHomeSecurityHighlights,
  getNearestDespSessionLabel,
  type HomeTrainingSession,
} from '../src/lib/home-security-trainings';

const now = '2026-08-24T08:00:00+02:00';

function session(
  slug: string,
  startDate: string,
  overrides: Partial<HomeTrainingSession> = {},
): HomeTrainingSession {
  return {
    startDate,
    status: 'OPEN',
    training: { slug, isActive: true },
    ...overrides,
  };
}

test('la carte DESP expose les trois repères demandés et choisit la session la plus proche, tous lieux confondus', () => {
  const cards = createHomeSecurityHighlights([
    session('desp-initial', '2026-09-24T00:00:00.000Z'),
    session('desp-vae', '2026-09-07T00:00:00.000Z'),
    session('desp-initial', '2026-09-12T00:00:00.000Z'),
  ], now);
  const desp = cards.find((card) => card.visual === 'desp');

  assert.ok(desp);
  assert.equal(desp.location, 'Paris ou Puget sur Argens');
  assert.equal(desp.modality, 'Distanciel + Présentiel');
  assert.equal(desp.pathway, 'En initial ou VAE');
  assert.equal(desp.nextSession, '7 septembre 2026');
});

test('le calcul ignore les sessions passées, masquées, inactives et non-DESP', () => {
  const label = getNearestDespSessionLabel([
    session('desp-initial', '2026-08-10T00:00:00.000Z'),
    session('desp-initial', '2026-08-25T00:00:00.000Z', { status: 'HIDDEN' }),
    session('desp-initial', '2026-08-26T00:00:00.000Z', {
      training: { slug: 'desp-initial', isActive: false },
    }),
    session('aps', '2026-08-27T00:00:00.000Z'),
    session('desp-dssp', '2026-09-24T00:00:00.000Z'),
  ], now);

  assert.equal(label, '24 septembre 2026');
});

test('la carte APS précise son format et ne porte plus le financement retiré', () => {
  const aps = createHomeSecurityHighlights([], now).find((card) => card.visual === 'aps');

  assert.ok(aps);
  assert.equal(aps.modality, 'Distanciel + Présentiel');
  assert.equal(aps.financing, undefined);
});

test('la carte DESP affiche un repli explicite sans session publique à venir', () => {
  assert.equal(getNearestDespSessionLabel([], now), 'Dates à venir');
});
