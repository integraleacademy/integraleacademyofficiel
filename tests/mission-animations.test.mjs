import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const component = read('src/components/MissionAnimation.tsx');
const styles = read('src/components/MissionAnimation.module.css');

test('les quatre pages affichent leur animation métier dédiée', () => {
  for (const [path, variant] of [
    ['src/components/A3pReferencePage.tsx', 'a3p'],
    ['src/components/DespChoiceReferencePage.tsx', 'desp'],
    ['src/components/SsiapReferencePage.tsx', 'ssiap'],
    ['src/app/vtc/page.tsx', 'vtc'],
  ]) {
    const source = read(path);
    assert.ok(source.includes("import { MissionAnimation } from '@/components/MissionAnimation';"), `import manquant : ${path}`);
    assert.match(source, new RegExp(`<MissionAnimation variant="${variant}"`), `animation ${variant} manquante : ${path}`);
  }
});

test('les six pages BTS affichent chacune une scène métier dédiée', () => {
  for (const [path, variant] of [
    ['src/components/BtsMosReferencePage.tsx', 'mos'],
    ['src/components/BtsNdrcReferencePage.tsx', 'ndrc'],
    ['src/components/BtsMcoReferencePage.tsx', 'mco'],
    ['src/components/BtsCiReferencePage.tsx', 'ci'],
    ['src/components/BtsCgReferencePage.tsx', 'cg'],
    ['src/components/BtsPiReferencePage.tsx', 'pi'],
  ]) {
    const source = read(path);
    assert.ok(source.includes("import { MissionAnimation } from '@/components/MissionAnimation';"), `import manquant : ${path}`);
    assert.match(source, new RegExp(`<MissionAnimation variant="${variant}"`), `animation ${variant} manquante : ${path}`);
  }
});

test('les parcours DESP initial et VAE sélectionnent deux animations différentes', () => {
  const hero = read('src/components/DespHero.tsx');
  assert.ok(hero.includes("import { MissionAnimation } from '@/components/MissionAnimation';"));
  assert.ok(hero.includes("<MissionAnimation variant={isVae?'despVae':'despInitial'}"));
  assert.match(read('src/app/formations-securite/desp-initial/page.tsx'), /<DespHero variant="initial"/);
  assert.match(read('src/app/formations-securite/desp-vae/page.tsx'), /<DespHero variant="vae"/);
});

test('chaque scène décrit un geste métier distinct et accessible', () => {
  for (const label of [
    'Simulation animée d’un dispositif de protection rapprochée en déplacement',
    'Simulation animée du pilotage d’une entreprise de sécurité privée',
    'Simulation animée d’une détection incendie reliée au poste de sécurité',
    'Simulation animée d’un trajet professionnel en VTC',
    'Simulation animée du pilotage d’équipes et d’une prestation de sécurité en BTS MOS',
    'Simulation animée d’un parcours de relation client omnicanale en BTS NDRC',
    'Simulation animée du pilotage des ventes et d’une unité commerciale en BTS MCO',
    'Simulation animée d’une opération commerciale import-export en BTS Commerce International',
    'Simulation animée du traitement comptable jusqu’au tableau de bord en BTS Comptabilité et Gestion',
    'Simulation animée du parcours immobilier du mandat à la signature en BTS Professions Immobilières',
    'Simulation animée du parcours de formation initiale DESP vers le pilotage d’une entreprise de sécurité',
    'Simulation animée de la constitution d’un dossier de preuves DESP VAE jusqu’au jury',
  ]) {
    assert.ok(component.includes(label), `libellé accessible manquant : ${label}`);
  }

  for (const marker of ['a3pRoute', 'networkActive', 'floorPlan', 'vtcRoute', 'mosRoute', 'ndrcRoute', 'mcoRoute', 'ciRouteOne', 'cgRoute', 'piRoute', 'despInitialRoute', 'evidencePaths']) {
    assert.ok(component.includes(marker), `scénario métier manquant : ${marker}`);
  }

  assert.ok(component.includes('role="img"'));
  assert.ok(component.includes('data-mission-animation={variant}'));
});

test('les mouvements restent légers et respectent la réduction des animations', () => {
  assert.ok(component.includes('<animateMotion'));
  assert.match(styles, /@keyframes routeFlow/);
  assert.match(styles, /@keyframes hubRotate/);
  assert.match(styles, /@keyframes fireScan/);
  assert.match(styles, /@keyframes kpiGrow/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.signalPacket,[\s\S]*?\.flowPacket \{ display: none; \}/);
  assert.match(styles, /\.staticGroup,[\s\S]*?\.staticMarker \{ display: block; \}/);
});
