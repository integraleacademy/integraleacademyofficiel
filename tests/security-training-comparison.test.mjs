import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const component = read('src/components/SecurityTrainingComparisonModal.tsx');
const styles = read('src/components/SecurityTrainingComparisonModal.module.css');
const home = read('src/app/page.tsx');

test('le bouton de l’accueil ouvre le comparateur sans quitter la page', () => {
  assert.match(home, /SecurityTrainingComparisonModal/);
  assert.match(home, /items=\{securityHighlights\}/);
  assert.doesNotMatch(home, /href="\/formations-securite" className=\{styles\.securityTrainingSecondary\}>Comparer les formations/);
  assert.match(component, /aria-haspopup="dialog"/);
  assert.match(component, /role="dialog"/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /createPortal/);
});

test('les cinq formations ont leurs usages, certifications et tarifs', () => {
  for (const key of ['aps', 'ssiap', 'sst', 'a3p', 'desp']) {
    assert.match(component, new RegExp(`\\n  ${key}: \\{`));
  }

  for (const price of ['1 650 €', 'Dès 980 €', 'Sur devis', '4 200 €', '3 800 à 4 300 €']) {
    assert.ok(component.includes(price), `tarif manquant : ${price}`);
  }

  assert.match(component, /Ce que cela permet de faire/);
  assert.match(component, /À l’issue du parcours/);
  assert.match(component, /details\.capabilities\.map/);
  assert.match(component, /href=\{item\.slug\}/);
});

test('la modale se ferme au clavier et restaure le défilement de la page', () => {
  assert.match(component, /event\.key === 'Escape'/);
  assert.match(component, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(component, /document\.body\.style\.overflow = previousOverflow/);
  assert.match(component, /previouslyFocused\?\.focus\(\)/);
});

test('la comparaison utilise cinq colonnes sur ordinateur et des cartes glissables sur mobile', () => {
  assert.match(styles, /grid-template-columns: repeat\(5, minmax\(13\.5rem, 1fr\)\)/);
  assert.match(styles, /@media \(min-width: 761px\) and \(max-height: 960px\)/);
  assert.match(styles, /max-height: calc\(100dvh - \.9rem\)/);
  assert.match(styles, /@media \(max-width: 760px\)/);
  assert.match(styles, /grid-auto-flow: column/);
  assert.match(styles, /grid-auto-columns: minmax\(82vw, 1fr\)/);
  assert.match(styles, /scroll-snap-type: x mandatory/);
  assert.match(styles, /env\(safe-area-inset-bottom\)/);
});
