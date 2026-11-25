import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const apsPage = readFileSync(
  new URL('../src/components/ApsReferencePage.tsx', import.meta.url),
  'utf8',
);
const apsStyles = readFileSync(
  new URL('../src/components/ApsEditorial.module.css', import.meta.url),
  'utf8',
);

const fundingOptionsSection = readFileSync(
  new URL('../src/components/TrainingFundingOptions.tsx', import.meta.url),
  'utf8',
);

const datesStart = apsPage.indexOf('<TrainingDatesPricingSection');
const datesEnd = apsPage.indexOf('    />', datesStart);
const enrollmentStart = apsPage.indexOf('<section id="inscription-financement"');
const enrollmentEnd = apsPage.indexOf('</section>', enrollmentStart);
const enrollmentSection = apsPage.slice(enrollmentStart, enrollmentEnd);

test('le parcours inscription APS devient une section dédiée après les dates et tarifs', () => {
  assert.ok(datesStart >= 0, 'section dates et tarifs introuvable');
  assert.ok(datesEnd > datesStart, 'fin de la section dates et tarifs introuvable');
  assert.ok(enrollmentStart > datesEnd, 'la section inscription doit suivre les dates et tarifs');
  assert.ok(enrollmentEnd > enrollmentStart, 'fin de la section inscription introuvable');
  assert.doesNotMatch(apsPage.slice(datesStart, datesEnd), /Inscription & financement/);
});

test('les étapes, les actions de financement et les solutions ont des espaces indépendants', () => {
  for (const area of ['intro', 'steps', 'funding', 'fundingActions']) {
    assert.ok(enrollmentSection.includes('editorial.' + area));
  }
  assert.match(enrollmentSection, /<TrainingFundingOptions options=\{financingOptions\}/);
  assert.ok(enrollmentSection.indexOf('editorial.fundingActions') < enrollmentSection.indexOf('<TrainingFundingOptions'));
  for (const area of ['options', 'optionGrid']) assert.ok(fundingOptionsSection.includes('editorial.' + area));
  assert.match(apsStyles, /@media\(max-width:640px\)/);
  assert.doesNotMatch(apsStyles, /white-space:\s*nowrap/);
});

test('les cinq étapes et les quatre solutions de financement sont conservées', () => {
  const stepsBlock = apsPage.slice(
    apsPage.indexOf('const enrollmentSteps = ['),
    apsPage.indexOf('const financingOptions = ['),
  );
  const financingBlock = apsPage.slice(
    apsPage.indexOf('const financingOptions = ['),
    apsPage.indexOf('const jobs = ['),
  );

  assert.equal((stepsBlock.match(/\['0[1-5]'/g) || []).length, 5);
  for (const title of ['CPF', 'France Travail', 'Employeur ou OPCO', 'Financement personnel']) {
    assert.ok(financingBlock.includes(`['${title}'`), `financement manquant : ${title}`);
  }
  assert.ok(enrollmentSection.includes('enrollmentSteps.map'));
  assert.ok(fundingOptionsSection.includes('options.map'));
});

test('le parcours reprend précisément les cinq étapes du support commercial', () => {
  for (const wording of [
    'Planifiez votre premier rendez-vous',
    'Échangeons sur votre projet',
    'Créez votre Identité Numérique',
    'Lors d’un second entretien téléphonique',
    'Recevez votre convocation officielle',
  ]) {
    assert.ok(apsPage.includes(wording), `étape commerciale manquante : ${wording}`);
  }

  assert.ok(apsPage.includes("const identityNumeriqueUrl = 'https://lidentitenumerique.laposte.fr/'"));
  assert.ok(enrollmentSection.includes('href={identityNumeriqueUrl}'));
  assert.ok(enrollmentSection.includes('Appeler le 04 22 47 07 68'));
  assert.ok(enrollmentSection.includes('CPF ou France Travail ? Anticipez votre Identité Numérique.'));
  const firstSteps = apsPage.slice(apsPage.indexOf('const enrollmentSteps = ['), apsPage.indexOf("['03', 'Créez votre Identité Numérique'"));
  const intro = enrollmentSection.slice(0, enrollmentSection.indexOf('</header>'));
  assert.equal((firstSteps + intro).match(/rendez-vous téléphonique/gi)?.length, 1);
  assert.doesNotMatch(intro, /04 22 47 07 68/);
  assert.ok(!enrollmentSection.includes('La prise en charge dépend de votre situation'));
  assert.ok(!enrollmentSection.includes('Simple, claire, accompagnée.'));
});

test('les actions d’inscription et de financement restent accessibles et sûres', () => {
  assert.ok(enrollmentSection.includes("href={apsRegistrationFormUrl}"));
  assert.ok(enrollmentSection.includes('href={apsCpfUrl} variant="blue" external'));
  assert.ok(enrollmentSection.includes("apsContact('étude de financement APS')"));
  assert.match(apsPage, /target="_blank" rel="noopener noreferrer"/);
});
