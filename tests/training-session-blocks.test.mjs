import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const section = read('src/components/TrainingDatesPricingSection.tsx');
const cards = read('src/components/TrainingSessionCards.tsx');
const desp = read('src/components/DespChoiceReferencePage.tsx');
const despInitial = read('src/app/formations-securite/desp-initial/page.tsx');
const a3p = read('src/components/A3pReferencePage.tsx');
const ssiap = read('src/components/SsiapReferencePage.tsx');
const sst = read('src/components/SstReferencePage.tsx');

test('toutes les fiches héritent par défaut de la présentation APS', () => {
  assert.ok(section.includes('initialSessionLimit = 2'));
  assert.ok(section.includes('showSessionTitle = true'));
  assert.ok(section.includes('showOverallPeriodLabel = false'));
  assert.ok(section.includes('underlineDisclosure = false'));
  assert.ok(cards.includes('resolveSessionSeatCapacity(session, seatCapacity)'));
  assert.ok(cards.includes("bg-[#101a29]"));
  assert.doesNotMatch(sst, /<TrainingDatesPricingSection[^>]*title=/);
});

test('les capacités administrées sont transmises jusqu’aux cartes publiques', () => {
  assert.ok(section.includes('seatsTotal?: number | string | null'));
  assert.ok(section.includes('seatsTotal: session.seatsTotal'));
  assert.ok(cards.includes('seatsTotal?: number | string | null'));
  assert.ok(a3p.includes('seatCapacity={12}'));
  assert.ok(ssiap.includes('seatCapacity={12}'));
  assert.ok(desp.includes('seatCapacity={20}'));
  assert.ok(despInitial.includes('seatCapacity={20}'));
  assert.ok(sst.includes('seatCapacity={10}'));
});

test('DESP conserve son filtre de centre et affiche ses périodes détaillées', () => {
  assert.match(desp, /<TrainingDatesPricingSection[\s\S]*?showDeliveryPeriods[\s\S]*?showLocationFilter/);
});
