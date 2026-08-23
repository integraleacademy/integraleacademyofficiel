import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const component = readFileSync('src/components/GlobalContactCTA.tsx', 'utf8');
const css = readFileSync('src/components/GlobalContactCTA.module.css', 'utf8');

test('le titre du bandeau reste strictement inchangé', () => {
  assert.match(
    component,
    /Faites le <span className=\{styles\.highlight\}>premier pas<\/span> vers votre futur métier\./,
  );
});

test('le titre et premier pas ont des animations dédiées non infinies', () => {
  assert.match(css, /\.shellVisible \.title \{[\s\S]*animation: ctaTitleReveal \.92s[^;]*;/);
  assert.match(css, /\.shellVisible \.highlight \{[\s\S]*animation: highlightLift \.82s[^;]*;/);
  assert.match(css, /\.shellVisible \.highlight::before \{[\s\S]*animation: highlightSweep 1\.15s[^;]*;/);
  assert.match(css, /\.shellVisible \.highlight::after \{[\s\S]*animation: underlineDraw \.72s[^;]*;/);

  for (const animation of ['ctaTitleReveal', 'highlightLift', 'highlightSweep', 'underlineDraw']) {
    const declaration = css.match(new RegExp(`animation: ${animation}[^;]*;`))?.[0] ?? '';
    assert.ok(declaration, `${animation} doit être utilisé`);
    assert.doesNotMatch(declaration, /infinite/, `${animation} ne doit pas boucler`);
  }
});

test('prefers-reduced-motion neutralise toutes les animations ajoutées', () => {
  const reducedMotion = css.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*\n\}/)?.[0] ?? '';
  assert.ok(reducedMotion, 'le bloc prefers-reduced-motion doit exister');
  assert.match(reducedMotion, /\.shellVisible \.title/);
  assert.match(reducedMotion, /\.shellVisible \.highlight,/);
  assert.match(reducedMotion, /\.shellVisible \.highlight::before/);
  assert.match(reducedMotion, /\.shellVisible \.highlight::after/);
  assert.match(reducedMotion, /animation: none !important/);
  assert.match(reducedMotion, /\.highlight::before \{[\s\S]*opacity: 0 !important/);
  assert.match(reducedMotion, /\.highlight::after \{ transform: scaleX\(1\); \}/);
});
