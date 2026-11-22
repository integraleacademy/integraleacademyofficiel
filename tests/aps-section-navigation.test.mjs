import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync(
  new URL('../src/components/ApsReferencePage.tsx', import.meta.url),
  'utf8',
);
const navigation = readFileSync(
  new URL('../src/components/ApsSectionNavigation.tsx', import.meta.url),
  'utf8',
);
const styles = readFileSync(
  new URL('../src/components/ApsReferencePage.module.css', import.meta.url),
  'utf8',
);
const sharedNavigation = readFileSync(
  new URL('../src/components/TrainingSectionNavigation.tsx', import.meta.url),
  'utf8',
);
const responsiveLinks = readFileSync(
  new URL('../src/components/ResponsiveSectionLinks.tsx', import.meta.url),
  'utf8',
);
const sharedNavigationStyles = readFileSync(
  new URL('../src/components/TrainingSectionNavigation.module.css', import.meta.url),
  'utf8',
);

test('la page APS utilise un sommaire dédié au lieu de l’ancienne barre compacte', () => {
  assert.match(page, /<ApsSectionNavigation registrationHref=\{apsRegistrationFormUrl\} \/>/);
  assert.doesNotMatch(page, /hidden bg-\[#F6F1E8\]\/88/);
  assert.doesNotMatch(page, /styles\.navRail/);
});

test('le sommaire affiche uniquement les huit rubriques utiles avec les bons libellés', () => {
  for (const target of [
    '#metier',
    '#pratique',
    '#programme',
    '#examen',
    '#dates-tarifs',
    '#inscription-financement',
    '#debouches',
    '#faq-aps',
  ]) {
    assert.ok(navigation.includes(`href: '${target}'`), `ancre manquante : ${target}`);
  }

  assert.equal((navigation.match(/href: '#/g) || []).length, 8);
  assert.doesNotMatch(navigation, /href: '#admission'/);
  assert.doesNotMatch(navigation, /href: '#hybride'/);
  assert.doesNotMatch(navigation, /index: '0\d'/);
  assert.doesNotMatch(navigation, /courseNavIndex/);
  assert.match(navigation, /label: 'Immersion'/);
  assert.match(navigation, /label: 'Inscriptions'/);
  assert.match(navigation, /Je m’inscris/);
});

test('le bouton d’inscription ouvre le formulaire demandé', () => {
  assert.match(page, /const apsRegistrationFormUrl = 'https:\/\/assistance-alw9\.onrender\.com\/demande-informations-formations';/);
  assert.match(page, /<ApsSectionNavigation registrationHref=\{apsRegistrationFormUrl\} \/>/);
  assert.match(navigation, /<TrainingSectionNavigation/);
  assert.match(navigation, /registrationHref=\{registrationHref\}/);
});

test('le bloc format hybride est placé juste après le programme', () => {
  const programmePosition = page.indexOf('<Section id="programme"');
  const hybridePosition = page.indexOf('id="hybride"');
  const examenPosition = page.indexOf('<Section id="examen"');

  assert.ok(programmePosition >= 0 && hybridePosition > programmePosition);
  assert.ok(examenPosition > hybridePosition);
});

test('la section active est annoncée et mise à jour pendant le défilement', () => {
  assert.match(navigation, /import \{ TrainingSectionNavigation \}/);
  assert.match(sharedNavigation, /^'use client';/);
  assert.match(sharedNavigation, /IntersectionObserver/);
  assert.match(sharedNavigation, /activeHref=\{activeHref\}/);
  assert.match(responsiveLinks, /aria-current=\{active \? 'location' : undefined\}/);
  assert.match(sharedNavigation, /setActiveHref/);
  assert.match(sharedNavigationStyles, /prefers-reduced-motion: reduce/);
  assert.match(sharedNavigation, /style\.scrollMarginTop/);
});

test('la navigation reste lisible et utilisable sur ordinateur comme sur mobile', () => {
  assert.match(page, /<main className=\{`\$\{styles\.page\} relative pb-24 lg:pb-0`\}>/);
  assert.doesNotMatch(page, /styles\.page\} relative overflow-hidden/);
  assert.match(styles, /\.page\s*\{[^}]*overflow-x:\s*clip;/s);
  assert.match(sharedNavigationStyles, /\.courseNav\s*\{[^}]*position:\s*sticky;[^}]*top:\s*55px;[^}]*backdrop-filter:\s*blur\(18px\);/s);
  assert.match(sharedNavigationStyles, /\.courseNavShell\s*\{[^}]*grid-template-columns:\s*fit-content\([^)]+\) minmax\(0, 1fr\) auto;/);
  assert.match(sharedNavigation, /<ResponsiveSectionLinks /);
  assert.match(sharedNavigationStyles, /\.courseNavLink\s*\{[^}]*font-size:\s*\.75rem;/s);
  assert.match(sharedNavigationStyles, /\.courseNavLinkActive::after[\s\S]*transform:\s*scaleX\(1\);/);
  assert.doesNotMatch(sharedNavigationStyles, /grid-row:\s*2/);
  assert.doesNotMatch(sharedNavigationStyles, /\.courseNav\s*\{[^}]*display:\s*none;/s);
});
