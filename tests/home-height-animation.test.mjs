import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const home = readFileSync('src/app/page.tsx', 'utf8');
const layout = readFileSync('src/app/layout.tsx', 'utf8');
const css = readFileSync('src/app/home-height-animation.css', 'utf8');

test('le texte du hero reste strictement inchangé', () => {
  assert.match(
    home,
    /Votre futur métier mérite une formation <em>à la hauteur\.<\/em>/,
  );
});

test('la feuille du zoom est chargée et ne cible que le hero de la page accueil', () => {
  assert.match(layout, /import '\.\/home-height-animation\.css';/);
  assert.match(css, /\[data-home-page\] h1 em \{/);
});

test('à la hauteur devient réellement énorme sur desktop', () => {
  assert.match(css, /animation: homeHeightImpact 3\.4s \.62s/);
  assert.match(css, /@keyframes homeHeightImpact/);
  assert.match(css, /scale\(1\.86\)/);
  assert.match(css, /scale\(1\.44\)/);
  assert.match(css, /scale\(1\.12\)/);
});

test('le mobile garde un zoom spectaculaire mais réduit', () => {
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /animation-name: homeHeightImpactMobile/);
  assert.match(css, /@keyframes homeHeightImpactMobile/);
  assert.match(css, /scale\(1\.38\)/);
  assert.match(css, /scale\(1\.07\)/);
});

test('le zoom ne provoque pas de reflow par des propriétés de layout', () => {
  assert.doesNotMatch(css, /\b(?:width|height|margin|padding|font-size|line-height|letter-spacing)\s*:/);
});

test('prefers-reduced-motion neutralise complètement le zoom', () => {
  const reducedMotion = css.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*\n\}/)?.[0] ?? '';
  assert.ok(reducedMotion, 'le bloc prefers-reduced-motion doit exister');
  assert.match(reducedMotion, /animation: none !important/);
  assert.match(reducedMotion, /opacity: 1 !important/);
  assert.match(reducedMotion, /transform: none !important/);
  assert.match(reducedMotion, /filter: none !important/);
});
