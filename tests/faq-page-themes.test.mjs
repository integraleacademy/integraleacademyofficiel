import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import ts from 'typescript';

const read = p => readFileSync(p, 'utf8');
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(`${dir}/${entry.name}`) : entry.name.endsWith('.tsx') ? [`${dir}/${entry.name}`] : []);
function faqNodes(path) {
  const result = [];
  const source = ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(source) === 'PremiumFAQSection') {
      result.push({ node, source, theme: node.attributes.properties.find(a => ts.isJsxAttribute(a) && a.name.getText(source) === 'theme') });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return result;
}

test('All site FAQ sections choose their page palette explicitly', () => {
  let count = 0;
  for (const path of files('src')) {
    for (const { theme } of faqNodes(path)) {
      assert.ok(theme?.initializer, `${path}: select a FAQ theme explicitly`);
      count++;
    }
  }
  assert.ok(count >= 20, `Expected a full-site FAQ audit, found ${count}`);
  console.log(`Audited ${count} explicitly themed FAQ sections`);
});

test('Institutional pages use gold; each training retains its own colour', () => {
  const expected = {
    'src/app/page.tsx': 'gold',
    'src/app/financements/page.tsx': 'gold',
    'src/app/entreprises/page.tsx': 'gold',
    'src/app/planning/PlanningHelp.tsx': 'gold',
    'src/components/SstReferencePage.tsx': 'green',
    'src/components/A3pReferencePage.tsx': 'green',
    'src/components/ApsReferencePage.tsx': 'blue',
    'src/components/SsiapReferencePage.tsx': 'red',
    'src/components/SsiapCoursePage.tsx': 'red',
    'src/app/formations-securite/ssiap/page.tsx': 'red',
    'src/app/vtc/page.tsx': 'violet',
    'src/components/DespChoiceReferencePage.tsx': 'orange',
    'src/app/formations-securite/desp-initial/page.tsx': 'orange',
    'src/app/formations-securite/desp-vae/page.tsx': 'orange',
    'src/app/faq/page.tsx': 'bts',
    'src/app/bts/[slug]/page.tsx': 'bts',
    ...Object.fromEntries(['Mos', 'Mco', 'Ndrc', 'Ci', 'Pi', 'Cg'].map(course => [`src/components/Bts${course}ReferencePage.tsx`, 'bts'])),
  };
  for (const [path, expectedTheme] of Object.entries(expected)) {
    const nodes = faqNodes(path);
    assert.ok(nodes.length, `${path}: no FAQ`);
    for (const { theme } of nodes) assert.equal(theme?.initializer?.text, expectedTheme, path);
  }
});

test('New FAQ defaults and keyboard focus cannot force blue onto every page', () => {
  const component = read('src/components/FAQ.tsx');
  assert.equal(component.match(/theme = 'gold'/g)?.length, 2);
  assert.doesNotMatch(component, /theme = 'blue'/);
  assert.match(component, /data-faq-list data-faq-theme=\{theme\}/);
  const css = read('src/components/FAQ.module.css');
  assert.match(css, /outline: 3px solid var\(--faq-focus/);
  for (const theme of ['gold', 'blue', 'red', 'green', 'orange', 'violet', 'bts']) assert.ok(css.includes(`[data-faq-theme='${theme}']`));
});
