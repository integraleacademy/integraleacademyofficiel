import assert from 'node:assert/strict';
import test from 'node:test';
import { createStepWheelNavigation, normalizeWheelDelta } from '../src/lib/step-wheel-navigation.js';

const inside = { start: 1000, end: 3000, position: 1250, step: 0 };

test('un grand coup de molette ne passe que de la première à la deuxième étape', () => {
  const navigation = createStepWheelNavigation(4);
  assert.deepEqual(navigation.handle({ ...inside, now: 0, delta: 4000 }), { kind: 'step', index: 1 });
  for (const now of [20, 70, 120]) {
    assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now, delta: 1500 }), { kind: 'hold' });
  }
});

test('une longue inertie ne déclenche aucune étape supplémentaire, même après la pause de transition', () => {
  const navigation = createStepWheelNavigation(4);
  navigation.handle({ ...inside, now: 0, delta: 120 });
  for (let now = 50; now <= 2200; now += 50) {
    assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now, delta: Math.max(1, 100 - now / 20) }), { kind: 'hold' });
  }
  assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now: 3300, delta: 120 }), { kind: 'step', index: 2 });
});

test('des gestes trop rapprochés ne sont pas mis en attente', () => {
  const navigation = createStepWheelNavigation(4);
  navigation.handle({ ...inside, now: 0, delta: 100 });
  assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now: 400, delta: 100 }), { kind: 'hold' });
  assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now: 1500, delta: 100 }), { kind: 'step', index: 2 });
});

test('plusieurs vagues espacées dans un même geste ne font pas sauter une étape', () => {
  const navigation = createStepWheelNavigation(4);
  assert.deepEqual(navigation.handle({ ...inside, now: 0, delta: 800 }), { kind: 'step', index: 1 });
  for (const now of [100, 450, 1100, 1800, 2650, 3450]) {
    assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now, delta: 200 }), { kind: 'hold' });
  }
  assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now: 4550, delta: 100 }), { kind: 'step', index: 2 });
});

test('les petits mouvements se cumulent sans qu’un frôlement change une étape', () => {
  const navigation = createStepWheelNavigation(4);
  for (const now of [0, 20, 40, 60]) {
    assert.deepEqual(navigation.handle({ ...inside, now, delta: 10 }), { kind: 'hold' });
  }
  assert.deepEqual(navigation.handle({ ...inside, now: 80, delta: 10 }), { kind: 'step', index: 1 });
});

test('un mouvement rapide à l’entrée montre toujours la première ou la dernière étape', () => {
  assert.deepEqual(createStepWheelNavigation(4).handle({ ...inside, position: 500, now: 0, delta: 8000 }), { kind: 'step', index: 0 });
  assert.deepEqual(createStepWheelNavigation(4).handle({ ...inside, position: 3500, now: 0, delta: -8000 }), { kind: 'step', index: 3 });
});

test('le défilement reste libre en dehors du parcours', () => {
  const navigation = createStepWheelNavigation(4);
  assert.equal(navigation.handle({ ...inside, position: 500, now: 0, delta: 100 }), null);
  assert.equal(navigation.handle({ ...inside, position: 3500, now: 0, delta: 100 }), null);
  assert.equal(navigation.handle({ ...inside, position: 500, now: 0, delta: -100 }), null);
});

test('un nouveau geste permet de quitter le parcours aux deux extrémités', () => {
  const navigation = createStepWheelNavigation(4);
  assert.deepEqual(navigation.handle({ ...inside, position: 2750, step: 3, now: 0, delta: 100 }), { kind: 'exit', direction: 1 });
  assert.deepEqual(navigation.handle({ ...inside, now: 1000, delta: -100 }), { kind: 'exit', direction: -1 });
});

test('le défilement vers le haut revient à une seule étape précédente', () => {
  const navigation = createStepWheelNavigation(4);
  assert.deepEqual(navigation.handle({ ...inside, position: 2250, step: 2, now: 0, delta: -4000 }), { kind: 'step', index: 1 });
  assert.deepEqual(navigation.handle({ ...inside, position: 1750, step: 1, now: 50, delta: -500 }), { kind: 'hold' });
});

test('un clic sur un numéro est protégé de l’inertie qui suit', () => {
  const navigation = createStepWheelNavigation(4);
  navigation.lock(0);
  assert.deepEqual(navigation.handle({ ...inside, position: 2250, step: 2, now: 50, delta: 300 }), { kind: 'hold' });
  assert.deepEqual(navigation.handle({ ...inside, position: 2250, step: 2, now: 1000, delta: -100 }), { kind: 'step', index: 1 });
});

test('les molettes en pixels, lignes et pages partagent le même traitement', () => {
  assert.equal(normalizeWheelDelta(48, 0, 900), 48);
  assert.equal(normalizeWheelDelta(3, 1, 900), 48);
  assert.equal(normalizeWheelDelta(-1, 2, 900), -900);
});
