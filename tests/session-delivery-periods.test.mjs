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

test('APS et DESP affichent les périodes utiles sur leurs pages et dans le planning public', () => {
  const formatter = read('src/lib/public-sessions.ts');
  const dateCards = `${read('src/components/TrainingDatesPricingSection.tsx')}\n${read('src/components/TrainingSessionCards.tsx')}`;
  const apsPage = read('src/components/ApsReferencePage.tsx');
  const despPage = read('src/app/formations-securite/desp-initial/page.tsx');
  const planning = read('src/app/planning/PlanningClient.tsx');

  assert.match(formatter, /day: '2-digit'/);
  assert.match(formatter, /month: '2-digit'/);
  assert.match(formatter, /return start && end \? `Du \$\{start\} au \$\{end\}`/);
  assert.match(formatter, /slug === 'aps'/);
  assert.match(formatter, /slug\.startsWith\('desp-'\)/);

  for (const label of ['Période complète', 'À distance', 'En présentiel']) {
    assert.ok(dateCards.includes(label), `libellé des fiches formation manquant : ${label}`);
  }
  for (const label of ['À distance', 'En présentiel']) {
    assert.ok(planning.includes(label), `libellé planning manquant : ${label}`);
  }
  assert.ok(!planning.includes('Période complète'), 'le planning ne doit plus afficher la période complète');
  assert.ok(
    planning.includes("{ label: '', value: displayPlanningPeriod(session.startDate, session.endDate), icon: 'calendar' }"),
    'les dates complètes doivent rester affichées dans le planning sans libellé',
  );

  assert.ok(dateCards.includes("fallback = 'Dates à confirmer'"));
  assert.ok(dateCards.includes('remotePeriodFallback'));
  assert.ok(dateCards.includes('inPersonPeriodFallback'));
  assert.ok(!dateCards.includes("'À renseigner dans l’administration'"));

  for (const field of fields) {
    assert.ok(dateCards.includes(`session.${field}`), `champ public manquant : ${field}`);
    assert.ok(planning.includes(`session.${field}`), `champ planning manquant : ${field}`);
  }

  assert.match(apsPage, /sessions=\{visibleSessions\}[\s\S]*?showDeliveryPeriods/);
  assert.ok(apsPage.includes('remotePeriodFallback="51 h maximum · calendrier détaillé à confirmer"'));
  assert.ok(apsPage.includes('inPersonPeriodFallback="124 h minimum · calendrier détaillé à confirmer"'));
  assert.match(despPage, /sessions=\{sessions\}[\s\S]*?showDeliveryPeriods/);
});

test('le planning s’ouvre en liste et remplace le résumé financement par la durée', () => {
  const planning = read('src/app/planning/PlanningClient.tsx');

  assert.match(planning, /useState<ViewMode>\('list'\)/);
  assert.match(planning, /function displayDuration\(session: Session\)/);
  assert.ok(planning.includes("return startDate && endDate ? formatSessionPeriod(startDate, endDate) : 'Dates à confirmer'"));
  assert.ok(planning.includes('{displayDuration(session)}'));
  assert.ok(!planning.includes('Accompagnement financement'));
  assert.ok(!planning.includes("session.fundingNotes ? 'À étudier' : 'Accompagnement'"));
});
