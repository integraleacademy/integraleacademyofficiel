import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { sessionMatchesLocation } from '../src/lib/session-location-filter.js';

test('le filtre Paris conserve uniquement les sessions parisiennes', () => {
  assert.equal(sessionMatchesLocation({ location: 'Paris · 142 rue de Rivoli, 75001 Paris' }, 'paris'), true);
  assert.equal(sessionMatchesLocation({ location: 'Puget-sur-Argens / Côte d’Azur' }, 'paris'), false);
  assert.equal(sessionMatchesLocation({ location: 'Aurillac · Centre France' }, 'paris'), false);
});

test('le filtre Côte d’Azur reconnaît aussi Puget-sur-Argens', () => {
  assert.equal(sessionMatchesLocation({ location: 'Puget-sur-Argens / Côte d’Azur' }, 'cote-azur'), true);
  assert.equal(sessionMatchesLocation({ location: '54 chemin du Carreou, Puget sur Argens' }, 'cote-azur'), true);
  assert.equal(sessionMatchesLocation({ location: 'Paris · 75001' }, 'cote-azur'), false);
});

test('le filtre Tous conserve les autres centres comme Aurillac', () => {
  assert.equal(sessionMatchesLocation({ location: 'Aurillac · Centre France' }, 'all'), true);
  assert.equal(sessionMatchesLocation({ location: null }, 'all'), true);
});

test('les pages DESP et DESP initial activent le sélecteur de centre', () => {
  const despPage = readFileSync('src/components/DespChoiceReferencePage.tsx', 'utf8');
  const despInitialPage = readFileSync('src/app/formations-securite/desp-initial/page.tsx', 'utf8');

  assert.match(despPage, /<TrainingDatesPricingSection[\s\S]*?showLocationFilter/);
  assert.match(despInitialPage, /<TrainingDatesPricingSection[\s\S]*?showLocationFilter/);
});
