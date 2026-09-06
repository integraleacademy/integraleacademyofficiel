import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const apsPage = readFileSync(
  new URL('../src/components/ApsReferencePage.tsx', import.meta.url),
  'utf8',
);
const apsStyles = readFileSync(
  new URL('../src/components/ApsReferencePage.module.css', import.meta.url),
  'utf8',
);

const datesStart = apsPage.indexOf('<TrainingDatesPricingSection');
const datesEnd = apsPage.indexOf('</TrainingDatesPricingSection>', datesStart);
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

test('la section conserve une hiérarchie claire et cohérente', () => {
  for (const token of [
    'relative isolate overflow-hidden bg-[#0A1725]',
    'sm:grid-cols-2 lg:grid-cols-5',
    'border border-white/10 bg-white/7',
    'rounded-[1.5rem]',
    'Nous vous accompagnons de A à Z',
  ]) {
    assert.ok(enrollmentSection.includes(token), `repère visuel manquant : ${token}`);
  }
});

test('la promesse reste sur une seule ligne dans une mise en scène épurée', () => {
  for (const token of [
    'styles.enrollmentHeader',
    'styles.enrollmentPromise',
    'styles.enrollmentCard',
    'styles.enrollmentNumber',
    'styles.enrollmentFinancePrimary',
    'styles.enrollmentFinanceOptions',
  ]) {
    assert.ok(enrollmentSection.includes(token), `élément de design manquant : ${token}`);
  }

  assert.match(apsStyles, /\.enrollmentPromise\s*\{[^}]*white-space:\s*nowrap;/s);
  assert.match(apsStyles, /\.enrollmentCard::before\s*\{[^}]*background:\s*#60a5fa;/s);
  assert.doesNotMatch(apsStyles, /\.enrollmentCard::after\s*\{/);
  assert.doesNotMatch(apsStyles, /@keyframes promiseShimmer/);
  assert.doesNotMatch(apsPage, /EnrollmentStepIcon|styles\.enrollmentIcon|styles\.enrollmentCardFeatured/);
  assert.match(apsStyles, /@media \(prefers-reduced-motion: reduce\)/);
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
  assert.ok(enrollmentSection.includes('financingOptions.map'));
});

test('le parcours reprend précisément les cinq étapes du support commercial', () => {
  for (const wording of [
    'Planifiez votre premier rendez-vous',
    'Échangeons sur votre projet',
    'Créez votre Identité Numérique',
    'Lors d’un second entretien téléphonique',
    'Recevez votre convocation officielle',
    'nous vous envoyons votre convocation officielle en formation',
  ]) {
    assert.ok(apsPage.includes(wording), `étape commerciale manquante : ${wording}`);
  }

  assert.ok(apsPage.includes("const identityNumeriqueUrl = 'https://lidentitenumerique.laposte.fr/'"));
  assert.ok(enrollmentSection.includes('href={identityNumeriqueUrl}'));
  assert.ok(enrollmentSection.includes('Appeler le 04 22 47 07 68'));
  assert.ok(enrollmentSection.includes('CPF ou France Travail ? Anticipez votre Identité Numérique.'));
  assert.ok(enrollmentSection.includes('Du premier appel à votre entrée en formation.'));
  assert.ok(enrollmentSection.includes('jusqu’à votre formation et l’obtention de votre diplôme'));
  assert.ok(!enrollmentSection.includes('La prise en charge dépend de votre situation'));
  assert.ok(!enrollmentSection.includes('Simple, claire, accompagnée.'));
});

test('les actions d’inscription et de financement restent accessibles et sûres', () => {
  assert.ok(enrollmentSection.includes("apsContact('commencer mon inscription')"));
  assert.ok(enrollmentSection.includes('href={apsCpfUrl} variant="blue" external'));
  assert.ok(enrollmentSection.includes("apsContact('étude de financement APS')"));
  assert.match(apsPage, /target="_blank" rel="noopener noreferrer"/);
});
