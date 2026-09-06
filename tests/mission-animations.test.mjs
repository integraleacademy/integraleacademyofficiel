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

test('chaque scène décrit un geste métier distinct et accessible', () => {
  for (const label of [
    'Simulation animée d’un dispositif de protection rapprochée en déplacement',
    'Simulation animée du pilotage d’une entreprise de sécurité privée',
    'Simulation animée d’une détection incendie reliée au poste de sécurité',
    'Simulation animée d’un trajet professionnel en VTC',
  ]) {
    assert.ok(component.includes(label), `libellé accessible manquant : ${label}`);
  }

  for (const marker of ['a3pRoute', 'networkActive', 'floorPlan', 'vtcRoute']) {
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
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.motionGroup,[\s\S]*?\.signalPacket \{ display: none; \}/);
  assert.match(styles, /\.staticGroup \{ display: block; \}/);
});
