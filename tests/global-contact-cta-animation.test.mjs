import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const component = readFileSync('src/components/GlobalContactCTA.tsx', 'utf8');
const layout = readFileSync('src/app/layout.tsx', 'utf8');
const motionCss = readFileSync('src/app/global-contact-cta-continuous.css', 'utf8');

test('le titre du bandeau reste strictement inchangé', () => {
  assert.match(
    component,
    /Faites le <span className=\{styles\.highlight\}>premier pas<\/span> vers votre futur métier\./,
  );
});

test('la feuille de mouvement continue est chargée globalement', () => {
  assert.match(layout, /import '\.\/global-contact-cta-continuous\.css';/);
  assert.match(motionCss, /#global-contact-cta-title \{/);
  assert.match(motionCss, /#global-contact-cta-title > span \{/);
});

test('le titre et premier pas ont une boucle longue, spectaculaire et continue', () => {
  assert.match(
    motionCss,
    /#global-contact-cta-title \{[\s\S]*?globalContactTitleSpectacle 8\.4s 1\.35s ease-in-out infinite !important;/,
  );
  assert.match(
    motionCss,
    /#global-contact-cta-title > span \{[\s\S]*?globalContactHighlightPulse 8\.4s 1\.35s ease-in-out infinite !important;/,
  );
  assert.match(
    motionCss,
    /#global-contact-cta-title > span::before \{[\s\S]*?globalContactHighlightGlow 8\.4s 1\.35s ease-in-out infinite !important;/,
  );
  assert.match(
    motionCss,
    /#global-contact-cta-title > span::after \{[\s\S]*?globalContactUnderlineCycle 8\.4s 1\.35s ease-in-out infinite !important;/,
  );
  assert.match(motionCss, /@keyframes globalContactTitleSpectacle/);
  assert.match(motionCss, /scale\(1\.024\)/);
  assert.match(motionCss, /@keyframes globalContactHighlightPulse/);
  assert.match(motionCss, /scale\(1\.072\)/);
});

test('la variante mobile conserve la boucle avec une amplitude réduite', () => {
  const mobile = motionCss.match(/@media \(max-width: 640px\) \{[\s\S]*?\n\}/)?.[0] ?? '';
  assert.ok(mobile, 'le bloc mobile doit exister');
  assert.match(mobile, /globalContactTitleSpectacleMobile 8\.4s 1\.25s ease-in-out infinite/);
  assert.match(mobile, /globalContactHighlightPulseMobile 8\.4s 1\.25s ease-in-out infinite/);
  assert.match(motionCss, /@keyframes globalContactTitleSpectacleMobile/);
  assert.match(motionCss, /@keyframes globalContactHighlightPulseMobile/);
});

test('la nouvelle animation ne modifie pas les dimensions ou la typographie du bandeau', () => {
  assert.doesNotMatch(motionCss, /\b(?:width|height|margin|padding|font-size|letter-spacing)\s*:/);
});

test('prefers-reduced-motion neutralise toute la boucle continue', () => {
  const reducedMotion = motionCss.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*\n\}/)?.[0] ?? '';
  assert.ok(reducedMotion, 'le bloc prefers-reduced-motion doit exister');
  assert.match(reducedMotion, /#global-contact-cta-title,/);
  assert.match(reducedMotion, /#global-contact-cta-title > span,/);
  assert.match(reducedMotion, /#global-contact-cta-title > span::before,/);
  assert.match(reducedMotion, /#global-contact-cta-title > span::after/);
  assert.match(reducedMotion, /animation: none !important/);
  assert.match(reducedMotion, /transform: none !important/);
  assert.match(reducedMotion, /filter: none !important/);
  assert.match(reducedMotion, /transform: scaleX\(1\) !important/);
});
