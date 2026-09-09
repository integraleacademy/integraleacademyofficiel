import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { nextSessionForLocation, sessionMatchesLocation } from '../src/lib/session-location-filter.js';

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

test('la prochaine session est choisie séparément par ville, indépendamment de l’ordre administré', () => {
  const parisLater = { location: 'Paris', startDate: '2027-01-10' };
  const coteLater = { location: 'Côte d’Azur', startDate: '2027-02-01' };
  const coteNext = { location: 'Puget-sur-Argens', startDate: new Date('2026-11-02') };
  const parisNext = { location: 'Paris · 14 Villa Lourcine 75014 Paris', startDate: '2026-09-24' };
  const sessions = Object.freeze([parisLater, coteLater, coteNext, parisNext]);

  assert.equal(nextSessionForLocation(sessions, 'cote-azur'), coteNext);
  assert.equal(nextSessionForLocation(sessions, 'paris'), parisNext);
  assert.deepEqual(sessions, [parisLater, coteLater, coteNext, parisNext]);
});

test('une ville sans session datée ne récupère pas celle d’une autre ville', () => {
  const sessions = [
    { location: 'Paris', startDate: 'date invalide' },
    { location: 'Paris', startDate: null },
    { location: 'Puget-sur-Argens', startDate: '2026-11-02' },
  ];
  assert.equal(nextSessionForLocation(sessions, 'paris'), undefined);
  assert.equal(nextSessionForLocation([], 'cote-azur'), undefined);
});

test('les pages DESP et DESP initial activent le sélecteur de centre', () => {
  const despPage = readFileSync('src/components/DespChoiceReferencePage.tsx', 'utf8');
  const despInitialPage = readFileSync('src/app/formations-securite/desp-initial/page.tsx', 'utf8');

  assert.match(despPage, /<TrainingDatesPricingSection[\s\S]*?showLocationFilter/);
  assert.match(despInitialPage, /<TrainingDatesPricingSection[\s\S]*?showLocationFilter/);
});
