import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const planning = readFileSync('src/app/planning/PlanningClient.tsx', 'utf8');

test('le planning réutilise le calcul et les couleurs des pages formation', () => {
  assert.match(planning, /getSessionSeatAvailability/);
  assert.match(planning, /resolveSessionSeatCapacity/);
  assert.match(planning, /seatAvailability\.badgeClassName/);
  assert.match(planning, /seatAvailability\.label/);
  assert.doesNotMatch(planning, /computedSeats/);
  assert.doesNotMatch(planning, /seats === 'Session complète'/);
  assert.doesNotMatch(planning, /border-emerald-200 bg-emerald-50[^\n]*\{seats\}/);
});

test('le planning plafonne les capacités selon le parcours', () => {
  assert.match(planning, /slug\.startsWith\('desp'\)[^\n]*return 20/);
  assert.match(planning, /slug === 'sst'[^\n]*return 10/);
  assert.match(planning, /return 12;/);
});
