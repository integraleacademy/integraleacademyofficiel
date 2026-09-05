import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const apsPage = read('src/components/ApsReferencePage.tsx');
const dateCards = read('src/components/TrainingDatesPricingSection.tsx');
const assistant = read('src/components/OrientationAssistant.tsx');
const formations = read('src/data/formations.ts');
const knowledge = read('src/knowledge/02-formations-aps.md');
const legacyPage = read('src/app/formations-securite/[slug]/page.tsx');

test('les volumes horaires APS correspondent au programme V3.2 fourni', () => {
  const apsSources = [apsPage, assistant, formations, knowledge, legacyPage].join('\n');

  assert.doesNotMatch(apsSources, /\b62\s*(?:h|heures)\b/i);
  assert.doesNotMatch(apsSources, /\b113\s*(?:h|heures)\b/i);

  for (const expected of ['175 heures', '51 heures maximum', '124 heures minimum', '63,5 heures', '60,5 heures']) {
    assert.ok(apsSources.includes(expected), `volume APS manquant : ${expected}`);
  }

  assert.ok(apsPage.includes("['71 %','du parcours au minimum en présentiel']"));
  assert.ok(apsPage.includes("['36 %','du parcours consacré à la pratique']"));
  assert.ok(apsPage.includes("['29 %','du parcours au maximum à distance']"));
});

test('la page principale décrit les 14 UV et les contenus structurants', () => {
  const programBlock = apsPage.slice(apsPage.indexOf('const program = ['), apsPage.indexOf('const examSteps = ['));
  const units = programBlock.match(/\['UV \d+'/g) || [];

  assert.equal(units.length, 14);
  for (let unit = 1; unit <= 14; unit += 1) {
    assert.ok(programBlock.includes(`['UV ${unit}'`), `UV ${unit} manquante`);
  }

  for (const topic of ['article 73', 'main courante électronique', 'feu réel', 'secourisme tactique', 'PTI/DATI', 'SEVESO', 'ORSEC', 'ATEX']) {
    assert.match(programBlock, new RegExp(topic, 'i'), `contenu officiel manquant : ${topic}`);
  }
});

test('les prérequis, l’examen et les débouchés sont explicités sans seuil non sourcé', () => {
  const apsFormation = formations.slice(formations.indexOf("slug: '/formations-securite/aps'"), formations.indexOf("slug:'/formations-securite/ssiap-1'"));

  for (const source of [apsPage, apsFormation, knowledge]) {
    assert.doesNotMatch(source, /(?:supérieure?|minimum|au moins)[^\n.]{0,40}12\/20/i);
  }

  for (const expected of [
    'principes de la République',
    'titre de séjour détenu depuis au moins cinq ans',
    'banque de plus de 1 000 questions',
    'deux mises en situation',
    'agent de sécurité pré-vol',
    'K2503',
  ]) {
    assert.ok([apsPage, apsFormation, knowledge].some((source) => source.includes(expected)), `information APS manquante : ${expected}`);
  }
});

test('la nature et la durée de validité de la certification sont correctement présentées', () => {
  assert.ok(apsPage.includes('Titre à finalité professionnelle'));
  assert.doesNotMatch([apsPage, formations, knowledge].join('\n'), /Titre professionnel reconnu/i);
  assert.ok(apsPage.includes('Programme CPNEFP version V3.2 mis à jour le 23 juillet 2026'));
  assert.ok(apsPage.includes("['Certificateurs','CPNE / ADEF']"));
  assert.ok(apsPage.includes('1er juillet 2027'));
  assert.ok(apsPage.includes('sous réserve du renouvellement de l’enregistrement'));
  assert.ok(apsPage.includes('RNCP34054'));
});

test('les cartes de session distinguent période et disponibilité', () => {
  assert.ok(dateCards.includes("label: 'Période complète'"));
  assert.ok(dateCards.includes("if (isFull(session)) return 'Session complète'"));
  assert.ok(dateCards.includes('remotePeriodFallback'));
  assert.ok(dateCards.includes('inPersonPeriodFallback'));
  assert.match(apsPage, /const hasSeatCount = seats !== null && seats !== undefined && seats !== ''/);
  assert.match(apsPage, /session\?\.status === 'FULL' \|\| \(hasSeatCount && Number\(seats\) === 0\)/);
});
