import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const component = readFileSync('src/components/GlobalContactCTA.tsx', 'utf8');
const layout = readFileSync('src/app/layout.tsx', 'utf8');
const motionCss = readFileSync('src/app/global-contact-cta-continuous.css', 'utf8');

test('le titre du bandeau reste inchangé et seul premier pas reçoit le déclencheur', () => {
  assert.match(
    component,
    /Faites le <span className=\{styles\.highlight\} data-contact-zoom=\{isVisible \? 'active' : undefined\}>premier pas<\/span> vers votre futur métier\./,
  );
});

test('la feuille du zoom est chargée globalement', () => {
  assert.match(layout, /import '\.\/global-contact-cta-continuous\.css';/);
  assert.match(motionCss, /#global-contact-cta-title \{/);
  assert.match(motionCss, /span\[data-contact-zoom='active'\]/);
});

test('le titre complet reste immobile et visible', () => {
  assert.match(
    motionCss,
    /#global-contact-cta-title \{[\s\S]*?opacity: 1;[\s\S]*?transform: none;[\s\S]*?animation: none !important;/,
  );
});

test('premier pas fait un seul gros zoom puis revient exactement à sa taille normale', () => {
  assert.match(
    motionCss,
    /span\[data-contact-zoom='active'\] \{[\s\S]*?globalContactFirstStepZoom 1\.1s \.28s both !important;/,
  );
  assert.match(motionCss, /@keyframes globalContactFirstStepZoom/);
  assert.match(motionCss, /38% \{[\s\S]*?scale\(1\.85\)/);
  assert.match(motionCss, /100% \{[\s\S]*?scale\(1\)/);
  assert.doesNotMatch(motionCss, /\binfinite\b/);
});

test('les anciens effets de glow et de soulignement animé sont neutralisés', () => {
  assert.match(motionCss, /span::before \{[\s\S]*?opacity: 0;[\s\S]*?animation: none !important;/);
  assert.match(motionCss, /span::after \{[\s\S]*?transform: scaleX\(1\);[\s\S]*?animation: none !important;/);
  assert.doesNotMatch(motionCss, /blur\(|drop-shadow\(|translate[XYZ]?\(/);
});

test('le mobile conserve un zoom franc avec une amplitude adaptée', () => {
  assert.match(motionCss, /@media \(max-width: 640px\)/);
  assert.match(motionCss, /animation-name: globalContactFirstStepZoomMobile !important/);
  assert.match(motionCss, /@keyframes globalContactFirstStepZoomMobile/);
  assert.match(motionCss, /38% \{[\s\S]*?scale\(1\.5\)/);
  assert.match(motionCss, /100% \{[\s\S]*?scale\(1\)/);
});

test('la nouvelle animation ne modifie pas les dimensions ou la typographie du bandeau', () => {
  assert.doesNotMatch(motionCss, /^\s*(?:width|height|margin|padding|font-size|line-height|letter-spacing)\s*:/m);
});

test('prefers-reduced-motion neutralise complètement le zoom', () => {
  const reducedMotion = motionCss.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*\n\}/)?.[0] ?? '';
  assert.ok(reducedMotion, 'le bloc prefers-reduced-motion doit exister');
  assert.match(reducedMotion, /#global-contact-cta-title,/);
  assert.match(reducedMotion, /#global-contact-cta-title > span,/);
  assert.match(reducedMotion, /animation: none !important/);
  assert.match(reducedMotion, /opacity: 1 !important/);
  assert.match(reducedMotion, /transform: none !important/);
});
