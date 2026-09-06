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

test('la page APS utilise un sommaire dédié au lieu de l’ancienne barre compacte', () => {
  assert.match(page, /<ApsSectionNavigation registrationHref=\{sessionHref\(next\)\} \/>/);
  assert.doesNotMatch(page, /hidden bg-\[#F6F1E8\]\/88/);
  assert.doesNotMatch(page, /styles\.navRail/);
});

test('le sommaire donne accès aux dix étapes importantes, dont l’inscription', () => {
  for (const target of [
    '#metier',
    '#admission',
    '#hybride',
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

  assert.equal((navigation.match(/href: '#/g) || []).length, 10);
  assert.match(navigation, /Je m’inscris/);
});

test('la section active est annoncée et mise à jour pendant le défilement', () => {
  assert.match(navigation, /^'use client';/);
  assert.match(navigation, /IntersectionObserver/);
  assert.match(navigation, /aria-current=\{active \? 'location' : undefined\}/);
  assert.match(navigation, /setActiveHref/);
  assert.match(navigation, /prefers-reduced-motion: reduce/);
});

test('la navigation reste lisible et utilisable sur ordinateur comme sur mobile', () => {
  assert.match(styles, /\.courseNav\s*\{[^}]*position:\s*sticky;[^}]*backdrop-filter:\s*blur\(18px\);/s);
  assert.match(styles, /\.courseNavScroller\s*\{[^}]*overflow-x:\s*auto;/s);
  assert.match(styles, /\.courseNavLink\s*\{[^}]*font-size:\s*\.75rem;/s);
  assert.match(styles, /\.courseNavLinkActive\s*\{[^}]*background:\s*#0d1725;/s);
  assert.match(styles, /@media \(max-width: 1180px\)[\s\S]*\.courseNavScroller\s*\{[^}]*grid-row:\s*2;/);
  assert.doesNotMatch(styles, /\.courseNav\s*\{[^}]*display:\s*none;/s);
});
