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

test('à la hauteur fait un gros zoom unique puis revient exactement à sa taille normale', () => {
  assert.match(css, /animation: homeHeightZoom 1\.1s \.72s both;/);
  assert.match(css, /@keyframes homeHeightZoom/);
  assert.match(css, /38% \{[\s\S]*?scale\(2\.05\)/);
  assert.match(css, /100% \{[\s\S]*?scale\(1\)/);
  assert.doesNotMatch(css, /\binfinite\b/);
});

test('le zoom est net, sans rebond, flou ni déplacement parasite', () => {
  assert.doesNotMatch(css, /blur\(|drop-shadow\(|translate[XYZ]?\(/);
  assert.doesNotMatch(css, /scale\(1\.(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9])\)/);
});

test('le mobile garde un gros zoom adapté à la largeur disponible', () => {
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /animation-name: homeHeightZoomMobile/);
  assert.match(css, /@keyframes homeHeightZoomMobile/);
  assert.match(css, /38% \{[\s\S]*?scale\(1\.6\)/);
  assert.match(css, /100% \{[\s\S]*?scale\(1\)/);
});

test('le zoom ne provoque pas de reflow par des propriétés de layout', () => {
  assert.doesNotMatch(css, /\b(?:width|height|margin|padding|font-size|line-height|letter-spacing)\s*:/);
});

test('prefers-reduced-motion neutralise complètement le zoom', () => {
  const reducedMotion = css.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*\n\}/)?.[0] ?? '';
  assert.ok(reducedMotion, 'le bloc prefers-reduced-motion doit exister');
  assert.match(reducedMotion, /animation: none !important/);
  assert.match(reducedMotion, /transform: none !important/);
});
