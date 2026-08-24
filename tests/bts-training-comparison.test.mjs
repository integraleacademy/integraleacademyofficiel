import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const component = read('src/components/BtsTrainingComparisonModal.tsx');
const styles = read('src/components/SecurityTrainingComparisonModal.module.css');
const home = read('src/app/page.tsx');

test('le bouton Comparer les BTS ouvre une modale sans quitter la page', () => {
  assert.match(home, /BtsTrainingComparisonModal/);
  assert.match(home, /items=\{btsHighlights\}/);
  assert.doesNotMatch(home, /href="\/bts" className=\{styles\.securityTrainingSecondary\}>Comparer les BTS/);
  assert.match(component, /aria-haspopup="dialog"/);
  assert.match(component, /role="dialog"/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /createPortal/);
});

test('les six BTS présentent compétences, débouchés et certifications', () => {
  for (const key of ['mos', 'mco', 'ndrc', 'ci', 'pi', 'cg']) {
    assert.match(component, new RegExp(`\\n  ${key}: \\{`));
  }

  for (const rncp of ['41000', '38362', '38368', '41759', '38380', '39159']) {
    assert.ok(component.includes(`RNCP ${rncp}`), `RNCP manquant : ${rncp}`);
  }

  assert.match(component, /Ce que cela permet de faire/);
  assert.match(component, /Après le BTS/);
  assert.match(component, /0 €\*/);
  assert.match(component, /iPad offert/);
  assert.match(component, /Voyage à Londres pris en charge/);
});

test('la comparaison BTS conserve six colonnes et un mode mobile glissable', () => {
  assert.match(component, /data-columns="6"/);
  assert.match(styles, /comparisonGrid\[data-columns='6'\]/);
  assert.match(styles, /grid-template-columns: repeat\(6, minmax\(12\.7rem, 1fr\)\)/);
  assert.match(styles, /grid-auto-flow: column/);
  assert.match(styles, /scroll-snap-type: x mandatory/);
});

test('la modale BTS se ferme au clavier et restaure le focus', () => {
  assert.match(component, /event\.key === 'Escape'/);
  assert.match(component, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(component, /previouslyFocused\?\.focus\(\)/);
  assert.match(component, /Fermer le comparateur de BTS/);
});
