import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const fields = ['inPersonStartDate', 'inPersonEndDate', 'remoteStartDate', 'remoteEndDate'];

test('les périodes présentiel et distanciel sont persistées par Prisma et les API', () => {
  const schema = read('prisma/schema.prisma');
  const migration = read('prisma/migrations/20260824080000_session_delivery_periods/migration.sql');
  const createRoute = read('src/app/api/admin/sessions/route.ts');
  const updateRoute = read('src/app/api/admin/sessions/[id]/route.ts');

  for (const field of fields) {
    assert.match(schema, new RegExp(`${field}\\s+DateTime\\?`));
    assert.ok(migration.includes(`"${field}"`), `colonne de migration manquante : ${field}`);
    assert.ok(createRoute.includes(`${field}: toDate(data.${field})`), `création manquante : ${field}`);
    assert.ok(updateRoute.includes(`update.${field} = toDate(data.${field})`), `mise à jour manquante : ${field}`);
  }
});

test('le formulaire affiche les six dates uniquement pour APS et DESP', () => {
  const source = read('src/app/admin/ia/(protected)/sessions/SessionsClient.tsx');

  assert.match(source, /training\?\.slug === 'aps'/);
  assert.match(source, /startsWith\('desp-'\)/);
  for (const label of [
    'Date de début',
    'Date de fin',
    'Date de début présentiel',
    'Date de fin présentiel',
    'Date de début distanciel',
    'Date de fin distanciel',
  ]) {
    assert.ok(source.includes(label), `libellé manquant : ${label}`);
  }
});

test('le modèle Excel APS et DESP contient les quatre dates détaillées et accepte encore les anciens modèles', () => {
  const source = read('src/app/api/admin/sessions/excel/route.ts');

  for (const label of [
    'Date de début présentiel (DD/MM/YYYY)',
    'Date de fin présentiel (DD/MM/YYYY)',
    'Date de début distanciel (DD/MM/YYYY)',
    'Date de fin distanciel (DD/MM/YYYY)',
  ]) {
    assert.ok(source.includes(label), `colonne Excel manquante : ${label}`);
  }
  assert.match(source, /name: 'APS'[\s\S]*?hasDeliveryPeriods: true/);
  assert.match(source, /name: 'DESP Paris'[\s\S]*?hasDeliveryPeriods: true/);
  assert.match(source, /const trailingOffset = hasDeliveryPeriods \? deliveryPeriodColumns\.length : 0/);
});

test('les périodes détaillées sont transmises au contexte de l’IA', () => {
  const source = read('src/lib/training-data.ts');

  assert.match(source, /Présentiel:/);
  assert.match(source, /Distanciel:/);
  for (const field of fields) assert.ok(source.includes(`s.${field}`), `champ IA manquant : ${field}`);
});
