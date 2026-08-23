import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const pages = [
  ['BtsMosReferencePage.tsx', 'mos'],
  ['BtsMcoReferencePage.tsx', 'mco'],
  ['BtsNdrcReferencePage.tsx', 'ndrc'],
  ['BtsCiReferencePage.tsx', 'ci'],
  ['BtsPiReferencePage.tsx', 'pi'],
];

for (const [filename, course] of pages) {
  test(`${course}: les deux avantages et le guide complet sont présents`, () => {
    const source = readFileSync(new URL(`../src/components/${filename}`, import.meta.url), 'utf8');

    assert.match(source, /iPad offert dès la signature/);
    assert.match(source, /Londres en 2ᵉ année · 100 % pris en charge/);
    assert.match(source, /<BtsStudentBenefits courseName=/);
    assert.match(source, new RegExp(`<BtsCompleteInformation course="${course}"`));
  });
}

test('le bloc avantages explicite les conditions iPad et Londres', () => {
  const source = readFileSync(new URL('../src/components/BtsExpandedContent.tsx', import.meta.url), 'utf8');

  assert.match(source, /Un iPad offert à chaque étudiant/);
  assert.match(source, /dès la signature de votre contrat d’apprentissage/);
  assert.match(source, /voyage à Londres en 2ᵉ année/);
  assert.match(source, /100 % pris en charge pour les étudiants/);
});

test('les cinq fiches utilisent les références RNCP actuelles', () => {
  const source = readFileSync(new URL('../src/data/btsExpanded.ts', import.meta.url), 'utf8');

  for (const rncp of ['41000', '38362', '38368', '41759', '38380']) {
    assert.match(source, new RegExp(`rncp: '${rncp}'`));
    assert.match(source, new RegExp(`/rncp/${rncp}/`));
  }
});

