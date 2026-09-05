import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('la carte SSIAP de l’accueil présente toute la gamme et ouvre le catalogue', () => {
  const home = read('src/app/page.tsx');
  const source = read('src/lib/home-security-trainings.ts');

  assert.match(home, /createHomeSecurityHighlights\(await listSessions\(\)\)/);
  assert.match(home, /<SecurityTrainingGrid items=\{securityHighlights\}/);
  assert.match(source, /slug: '\/formations-securite\/ssiap'/);
  assert.match(source, /shortTitle: 'SSIAP'/);
  assert.match(source, /title: 'Sécurité incendie'/);
  assert.match(source, /SSIAP 1, SSIAP 2, SSIAP 3, Remise à niveau et Recyclage\./);
  assert.doesNotMatch(source, /slug: '\/formations-securite\/ssiap-1',\s*shortTitle: 'SSIAP 1'/);
});

test('la carte compacte SSIAP affiche le détail des parcours', () => {
  const source = read('src/components/SecurityTrainingGrid.tsx');

  assert.match(source, /item\.visual === 'ssiap'/);
  assert.match(source, /compactDescription/);
  assert.match(source, /\{item\.description\}/);
});

test('le catalogue SSIAP relie les quatre parcours demandés', () => {
  const source = read('src/app/formations-securite/ssiap/page.tsx');

  for (const href of [
    '/formations-securite/ssiap-1',
    '/formations-securite/ssiap-2',
    '/formations-securite/ssiap-3',
    '/formations-securite/recyclage-remise-a-niveau-ssiap',
  ]) {
    assert.match(source, new RegExp(href.replaceAll('/', '\\/')));
  }
});

test('les trois nouvelles routes utilisent la fiche SSIAP détaillée', () => {
  const pages = [
    ['src/app/formations-securite/ssiap-2/page.tsx', 'ssiap2Config'],
    ['src/app/formations-securite/ssiap-3/page.tsx', 'ssiap3Config'],
    ['src/app/formations-securite/recyclage-remise-a-niveau-ssiap/page.tsx', 'ssiapMaintenanceConfig'],
  ];

  for (const [path, config] of pages) {
    const source = read(path);
    assert.match(source, /SsiapCoursePage/);
    assert.match(source, new RegExp(config));
  }
});

test('les durées réglementaires SSIAP sont présentes', () => {
  const source = read('src/data/ssiap-catalogue.ts');

  for (const expected of [
    "duration: '70 heures'",
    "duration: '216 heures'",
    "duration: '14 à 35 heures'",
    "title: 'Recyclage SSIAP 1', duration: '14 h'",
    "title: 'Remise à niveau SSIAP 1', duration: '21 h'",
    "title: 'Recyclage SSIAP 3', duration: '21 h'",
    "title: 'Remise à niveau SSIAP 3', duration: '35 h'",
  ]) {
    assert.ok(source.includes(expected), `information manquante : ${expected}`);
  }
});

test('le référentiel officiel et les CTA sans faux calendrier sont intégrés', () => {
  const source = read('src/components/SsiapCoursePage.tsx');

  assert.match(source, /ssiapOfficialReference/);
  assert.match(source, /Consulter le texte sur Légifrance/);
  assert.match(source, /Aucun calendrier n’est affiché tant qu’il n’est pas ouvert à l’inscription/);
  assert.match(source, /Tarif', 'Sur devis'/);
});

test('les autres accès génériques renvoient vers le catalogue SSIAP', () => {
  const index = read('src/app/formations-securite/page.tsx');
  const ui = read('src/components/ui.tsx');

  assert.match(index, /slug: '\/formations-securite\/ssiap'/);
  assert.match(index, /SSIAP – Sécurité incendie/);
  assert.match(ui, /\['SSIAP','\/formations-securite\/ssiap'\]/);
});
