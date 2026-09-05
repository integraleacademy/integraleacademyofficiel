import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const data = readFileSync('src/data/presentation-dossiers.ts', 'utf8');
const component = readFileSync('src/components/PresentationDossiersPage.tsx', 'utf8');
const fcPage = readFileSync('src/app/dossiersfc/page.tsx', 'utf8');
const btsPage = readFileSync('src/app/dossiersbts/page.tsx', 'utf8');
const footer = readFileSync('src/components/ui.tsx', 'utf8');
const contactCta = readFileSync('src/components/GlobalContactCTA.tsx', 'utf8');

test('les deux routes utilisent la galerie de dossiers adaptée', () => {
  assert.match(fcPage, /variant="professional"/);
  assert.match(fcPage, /professionalPresentationDossiers/);
  assert.match(btsPage, /variant="bts"/);
  assert.match(btsPage, /btsPresentationDossiers/);
});

test('les onze dossiers historiques et leurs liens Canva sont conservés', () => {
  for (const designId of [
    'DAFN-OO-BnI', 'DAGMZpzJHmI', 'DAFxQeOg9Kk', 'DAG6oNDacEY', 'DAFhLhaNPtg', 'DAG6pSdmnLE',
    'DAFUjJ2ck_Y', 'DAFybcvNoTQ', 'DAFUiO79cvQ', 'DAFybfJcfhc', 'DAGVNpUITsI',
  ]) {
    assert.match(data, new RegExp(designId));
  }

  assert.equal((data.match(/href: 'https:\/\/www\.canva\.com\/design\//g) ?? []).length, 11);
  assert.equal((data.match(/image: 'https:\/\/static\.wixstatic\.com\/media\//g) ?? []).length, 11);
});

test('la galerie est accessible, responsive et ouvre les documents dans un nouvel onglet', () => {
  assert.match(component, /sm:grid-cols-2 xl:grid-cols-3/);
  assert.match(component, /target="_blank"/);
  assert.match(component, /rel="noopener noreferrer"/);
  assert.match(component, /aria-label={\`Consulter le dossier de présentation/);
  assert.match(component, /loading="lazy"/);
  assert.match(component, /https:\/\/inscriptionsbts\.onrender\.com\//);
});

test('les pages sont accessibles depuis le pied de page et le contact BTS reste attribué à Aurélie', () => {
  assert.match(footer, /\['Dossiers formations','\/dossiersfc'\]/);
  assert.match(footer, /\['Dossiers BTS','\/dossiersbts'\]/);
  assert.match(contactCta, /pathname === '\/dossiersbts'/);
});
