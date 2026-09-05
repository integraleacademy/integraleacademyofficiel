import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const ui = read('src/components/ui.tsx');
const sessions = `${read('src/components/TrainingDatesPricingSection.tsx')}\n${read('src/components/TrainingSessionCards.tsx')}`;
const planning = read('src/app/planning/PlanningClient.tsx');
const globals = read('src/app/globals.css');

test('les composants partagés exposent toute la charte couleur des formations', () => {
  for (const theme of ['blue', 'green', 'orange', 'red', 'violet']) {
    assert.ok(ui.includes(`${theme}:`), `thème UI manquant : ${theme}`);
    assert.ok(sessions.includes(`${theme}: {`), `thème sessions manquant : ${theme}`);
  }

  assert.match(ui, /theme\?:UiAccent/);
  assert.match(sessions, /type TrainingTheme = 'blue' \| 'green' \| 'violet' \| 'orange' \| 'red' \| 'gold'/);
});

test('A3P utilise le vert sur toute sa page de référence', () => {
  const source = read('src/components/A3pReferencePage.tsx');

  assert.match(source, /theme="green"/);
  assert.match(source, /variant="green"/);
  assert.match(source, /emerald-600/);
  assert.doesNotMatch(source, /academy-gold|yellow-|variant="gold"/);
});

test('DESP utilise l’orange sur le choix, l’initial et la VAE', () => {
  const route = read('src/app/formations-securite/[slug]/page.tsx');
  const paths = [
    'src/components/DespChoiceReferencePage.tsx',
    'src/components/DespHero.tsx',
    'src/app/formations-securite/desp-initial/page.tsx',
    'src/app/formations-securite/desp-vae/page.tsx',
    'src/components/VaeEligibilityModal.tsx',
  ];

  assert.match(route, /slug==='desp'\)return <DespChoiceReferencePage sessions=\{sessions\}/);
  for (const path of paths) {
    const source = read(path);
    assert.match(source, /orange-/, `accent orange absent : ${path}`);
    assert.doesNotMatch(source, /academy-gold|emerald-/, `ancienne couleur présente : ${path}`);
  }
});

test('SSIAP utilise le rouge sur le catalogue et tous les parcours', () => {
  const paths = [
    'src/app/formations-securite/ssiap/page.tsx',
    'src/components/SsiapReferencePage.tsx',
    'src/components/SsiapCoursePage.tsx',
  ];

  for (const path of paths) {
    const source = read(path);
    assert.match(source, /red-/, `accent rouge absent : ${path}`);
    assert.doesNotMatch(source, /academy-gold|orange-|variant="gold"/, `ancienne couleur présente : ${path}`);
  }
});

test('Chauffeur VTC utilise le violet sur la page et la carte d’accueil', () => {
  const page = read('src/app/vtc/page.tsx');
  const styles = read('src/app/vtc/vtc.module.css');
  const card = `${read('src/components/VtcTrainingCard.tsx')}\n${read('src/components/VtcTrainingCard.module.css')}`;

  assert.match(page, /PremiumFAQSection theme="violet"/);
  assert.match(styles, /--accent:#7c3aed/);
  assert.match(card, /#7c3aed|#7C3AED|rgba\(139, 92, 246/);
  assert.doesNotMatch(styles, /--gold|var\(--gold\)|242,183,45|#f2b72d/i);
  assert.doesNotMatch(card, /#F1B82E|#f2bb31|rgba\(242, 187, 49/i);
});

test('les CTA, FAQ et sessions reçoivent la couleur du parcours', () => {
  for (const [path, theme] of [
    ['src/components/A3pReferencePage.tsx', 'green'],
    ['src/components/DespChoiceReferencePage.tsx', 'orange'],
    ['src/components/SsiapReferencePage.tsx', 'red'],
  ]) {
    const source = read(path);
    assert.ok(source.includes(`theme="${theme}"`), `thème ${theme} absent : ${path}`);
  }

  assert.match(sessions, /variant=\{full \? 'light' : theme\}/);
  assert.match(sessions, /variant=\{theme\} className="mt-5 w-full"/);
});

test('le planning conserve la charte avec des repères colorés subtils', () => {
  for (const [key, accent] of [
    ['aps', 'blue'],
    ['a3p', 'green'],
    ['director', 'orange'],
    ['ssiap', 'red'],
    ['vtc', 'violet'],
  ]) {
    assert.match(planning, new RegExp(`key: '${key}'[\\s\\S]{0,420}accent: '${accent}'`), `couleur planning incorrecte : ${key}`);
    assert.ok(globals.includes(`.planning-theme-${accent}`), `variables planning manquantes : ${accent}`);
  }

  assert.match(planning, /function planningAccentForSession\(session: Session\)/);
  assert.match(planning, /const themeClass = planningThemeForSession\(session\)/);
  assert.match(planning, /planning-accent-card/);
  assert.match(planning, /planning-accent-indicator/);
  assert.match(planning, /planning-calendar-bar/);
  assert.match(planning, /planning-formation-card-selected/);
  assert.match(planning, /planning-neutral-action/);
  assert.doesNotMatch(planning, /planning-accent-bg|planning-accent-shadow|planning-accent-chip/);
  assert.match(globals, /\.planning-accent-selected \{[^}]*rgb\(var\(--planning-accent\) \/ \.075\)/);
  assert.match(globals, /\.planning-calendar-bar \{[^}]*rgb\(var\(--planning-accent\) \/ \.16\)/);
  assert.match(globals, /\.planning-neutral-action \{ background-color: #101a29;/);
  assert.doesNotMatch(planning, /#efb82f|#d39a17/);
  assert.match(globals, /\.planning-theme-orange \{ --planning-accent: 249 115 22; --planning-accent-strong: 180 83 9;[\s\S]*?--planning-accent-contrast: 67 20 7;/);
  assert.doesNotMatch(globals, /\.planning-theme-orange \{ --planning-accent: 194 65 12;/);
});
