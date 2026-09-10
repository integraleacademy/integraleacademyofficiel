import assert from 'node:assert/strict';
import test from 'node:test';
import { courseJourneys } from '../src/data/courseJourneys';
import { btsExpandedCourses } from '../src/data/btsExpanded';

test('MOS présente 15 jours à l’école puis 15 jours en entreprise dans les cartes et le guide', () => {
  const mos = courseJourneys['bts-mos'];
  assert.deepEqual(mos.study.panels.map(panel => panel.value), ['15', '15']);
  assert.match(mos.steps[1].description, /15 jours à l’école, puis 15 jours en entreprise/);
  assert.match(btsExpandedCourses.mos.rhythm, /15 jours à l’école, puis 15 jours en entreprise/);
  assert.doesNotMatch(mos.practice.note, /hebdomadaire/);
});

test('les cinq autres BTS conservent 2 jours à l’école et 3 jours en entreprise', () => {
  for (const code of ['mco', 'ndrc', 'ci', 'pi', 'cg'] as const) {
    const journey = courseJourneys[`bts-${code}`];
    assert.deepEqual(journey.study.panels.map(panel => panel.value), ['2', '3'], code);
    assert.match(journey.steps[1].description, /2 jours à l’école et 3 jours en entreprise chaque semaine/, code);
  }
});

test('la présentation générale distingue le rythme MOS des cinq autres BTS', () => {
  const overview = courseJourneys['bts-overview'];
  assert.match(overview.steps[1].description, /BTS MOS : 15 jours à l’école, puis 15 jours en entreprise/);
  assert.match(overview.steps[1].description, /MCO, NDRC, CI, PI et CG : 2 jours à l’école et 3 jours en entreprise/);
  assert.equal(overview.study.panels[0].label, 'BTS MOS');
  assert.equal(overview.study.panels[0].value, '15 / 15');
});
