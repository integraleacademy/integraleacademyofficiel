import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const data = read('src/data/a3p.ts');
const component = read('src/components/A3pReferencePage.tsx');
const metadataPage = read('src/app/formations-securite/[slug]/page.tsx');
const priceUtility = read('src/lib/training-price.ts');
const planning = read('src/app/planning/PlanningClient.tsx');
const programPdf = readFileSync(new URL('../public/documents/programme-tfp-a3p-2023.pdf', import.meta.url));

test('le programme officiel contient 9 UV et totalise 328 heures hors examen', () => {
  const uvCodes = [...data.matchAll(/code: '(UV\d)'/g)].map((match) => match[1]);
  const durations = [...data.matchAll(/duration: '(\d+) h'/g)].map((match) => Number(match[1]));

  assert.match(data, /durationHours: '328 heures hors examen'/);
  assert.match(data, /practiceHours: '92 h 50 de pratique'/);
  assert.deepEqual(uvCodes, ['UV1', 'UV2', 'UV3', 'UV4', 'UV5', 'UV6', 'UV7', 'UV8', 'UV9']);
  assert.equal(durations.reduce((total, hours) => total + hours, 0), 328);
  assert.match(component, /41 h de socle de base/);
  assert.match(component, /287 h de spécialité A3P/);
  assert.doesNotMatch(component, /327 heures|15 modules|Dix compétences/);
  assert.doesNotMatch(metadataPage, /327 heures/);
});

test('le PDF téléchargeable est exactement le programme transmis', () => {
  assert.match(data, /programPdfUrl: '\/documents\/programme-tfp-a3p-2023\.pdf'/);
  assert.equal(createHash('sha256').update(programPdf).digest('hex'), '75e357b46887e804d0458041df4c21b1c319dc07949c7b71ccdcd92afc5ca554');
  assert.match(component, /href=\{a3pConfig\.programPdfUrl\} download/);
});

test('les identifiants RNCP, les prérequis étrangers et les statistiques certificateur sont publiés', () => {
  for (const expected of ['RNCP38002', '20 septembre 2028', '344 —', '42812 —', 'K2503 —', 'Bloc unique']) {
    assert.ok(data.includes(expected), `information RNCP manquante : ${expected}`);
  }

  assert.match(data, /au moins cinq ans/);
  assert.match(data, /arrêté du 31 mars 2022/);
  assert.match(data, /year: '2022', certified: '94', global: '78 %', targetJob: '43 %'/);
});

test('les modalités d’examen et leurs trois seuils sont affichés', () => {
  assert.match(component, /QCU contextualisés/);
  assert.match(component, /Note ≥ 12\/20/);
  assert.match(component, /8\/20 ≤ note < 12\/20/);
  assert.match(component, /Note < 8\/20/);
  assert.match(component, /« apte » ou « inapte »/);
  assert.match(component, /mission est préparée et exécutée en conditions réelles/);
});

test('le prix privilégie les centimes cohérents et une place inconnue ne rend pas la session complète', () => {
  assert.match(priceUtility, /source\?\.priceCents/);
  assert.match(priceUtility, /cents >= MINIMUM_COHERENT_TRAINING_PRICE_EUROS \* 100/);
  assert.ok(priceUtility.indexOf('source?.priceCents') < priceUtility.indexOf('source?.priceLabel'));
  assert.match(component, /formatTrainingPrice\(next, a3pConfig\.priceLabel\)/);
  assert.match(planning, /formatTrainingPrice\(session, fallbackPrices/);
  assert.match(planning, /slug === 'a3p' \|\| slug === 'a3p-apr'\) return '328 h'/);
  assert.match(component, /hasSeatCount && Number\(next\.seatsLeft\) === 0/);
  assert.doesNotMatch(component, /Number\(next\?\.seatsLeft\) === 0/);
});
