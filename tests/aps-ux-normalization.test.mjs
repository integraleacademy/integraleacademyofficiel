import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const apsPage = read('src/components/ApsReferencePage.tsx');
const apsStyles = read('src/components/ApsReferencePage.module.css');
const sessionsSection = `${read('src/components/TrainingDatesPricingSection.tsx')}\n${read('src/components/TrainingSessionCards.tsx')}`;
const seatAvailability = read('src/lib/session-seat-availability.ts');

test('le héros APS donne la priorité au nom de la formation et au nouveau CTA', () => {
  const hero = apsPage.slice(apsPage.indexOf('<section className={`${styles.hero}'), apsPage.indexOf('<nav aria-label'));

  assert.match(hero, /<h1[^>]*text-\[2\.65rem\][^>]*>[\s\S]*Formation agent de prévention et de sécurité[\s\S]*<\/h1>/);
  assert.ok(hero.includes('lg:text-[4.75rem]'));
  assert.ok(hero.includes('Je démarre mon projet'));
  assert.ok(hero.includes('variant="blue"'));
  assert.doesNotMatch(hero, /Vérifier mon éligibilité/);
});

test('les repères visuels propres à la page APS utilisent le bleu', () => {
  assert.doesNotMatch(apsPage, /(?:text|bg|border|ring)-emerald-/);
  assert.ok(apsStyles.includes('background: #1d4ed8;'));
  assert.ok(apsStyles.includes('rgba(59,130,246,.52)'));

  const programStart = apsPage.indexOf('{program.map');
  const programEnd = apsPage.indexOf('</details>)}', programStart);
  const programMarkup = apsPage.slice(programStart, programEnd);
  for (const token of ['border-blue-200', 'bg-blue-100', 'text-blue-800', 'focus-visible:ring-blue-200']) {
    assert.ok(programMarkup.includes(token), `repère bleu manquant dans le programme : ${token}`);
  }
  assert.doesNotMatch(programMarkup, /emerald|academy-gold|yellow-/);
});

test('le parcours animé renvoie aux rubriques sans répéter les listes de missions et d’horaires', () => {
  const journey = read('src/components/ApsJourney.tsx');
  const summary = read('src/components/ApsTrainingSummary.tsx');
  const hybrid = read('src/components/ApsExperienceSections.tsx').split('export function ApsHybridExperience()')[1].split('export function TrainingExamExperience')[0];
  assert.doesNotMatch(journey, /[Rr]ondes de sécurité|[Cc]ontrôle d’accès|[Pp]alpation|[Ii]nspection des bagages|[Gg]estion d’incidents/);
  assert.doesNotMatch(journey + summary, /\b(?:51|124)\b/);
  assert.match(summary, /175 heures/);
  for (const duration of ['51 h', '124 h', '63,5 h', '60,5 h']) {
    assert.equal(hybrid.split(duration).length - 1, 1, duration);
  }
});

test('l’immersion APS illustre trois situations reliées au poste de sécurité', () => {
  const exercises = apsPage.slice(apsPage.indexOf('const practicalExercises = ['), apsPage.indexOf('const enrollmentSteps = ['));
  for (const detail of ['sans badge', 'chariot de cartons', 'main courante']) {
    assert.ok(exercises.includes(detail), detail);
  }
  const images = [...exercises.matchAll(/illustration: \{ src: '([^']+)', alt: '([^']+)'/g)];
  assert.equal(images.length, 3);
  assert.equal(new Set(images.map(match => match[1])).size, 3);
  const immersion = apsPage.slice(apsPage.indexOf('<Section id="pratique"'), apsPage.indexOf('<Section id="programme"'));
  assert.match(immersion, /<TrainingPracticeCards columns=\{3\}/);
  assert.match(immersion, /href="#pc-securite"/);
});

test('les six illustrations métier restent accessibles dans les cartes', () => {
  const artwork = read('src/data/originalArtwork.ts');
  const missionKeys = apsPage.match(/const apsMissionArtwork = \[(.*?)\]/)[1];
  const keys = [...missionKeys.matchAll(/'(aps-mission-[\w-]+)'/g)].map(match => match[1]);
  assert.equal(new Set(keys).size, 6);
  for (const key of keys) {
    const entry = artwork.split('\n').find(line => line.includes('"' + key + '"'));
    assert.match(entry ?? '', /alt: "[^"]+"/);
  }
  assert.match(apsPage, /<TrainingMissionCards items=\{missions\.map/);
});

test('la page APS trie les sessions et limite la vue initiale aux deux prochaines', () => {
  assert.ok(apsPage.includes('sortSessionsChronologically(sessions)'));
  assert.ok(apsPage.includes('initialSessionLimit={2}'));
  assert.ok(apsPage.includes('theme="blue"'));
  assert.ok(sessionsSection.includes('const initiallyVisibleSessions = filteredSessions.slice(0, normalizedInitialLimit)'));
  assert.ok(sessionsSection.includes('const additionalSessions = filteredSessions.slice(normalizedInitialLimit)'));
});

test('chaque carte APS affiche le titre renseigné dans l’administration', () => {
  assert.ok(apsPage.includes('showSessionTitle'));
  assert.ok(sessionsSection.includes('title?: string | null'));
  assert.ok(sessionsSection.includes('title: session.title'));
  assert.ok(sessionsSection.includes('{sessionTitle}</h3>'));
});

test('les cartes APS gardent les dates sans leur libellé et affichent les places exactes', () => {
  assert.ok(apsPage.includes('showOverallPeriodLabel={false}'));
  assert.ok(apsPage.includes('seatCapacity={12}'));
  assert.ok(apsPage.includes('underlineDisclosure={false}'));
  assert.ok(sessionsSection.includes("showOverallPeriodLabel ? <span"));
  assert.ok(sessionsSection.includes('seatAvailability.label'));
  assert.ok(seatAvailability.includes('computedSeats'));
});

test('les sessions suivantes sont révélées par un contrôle natif et accessible', () => {
  assert.ok(sessionsSection.includes('<details className="group/session-list mt-5">'));
  assert.ok(sessionsSection.includes('aria-controls={additionalSessionsId}'));
  assert.ok(sessionsSection.includes('Voir les prochaines sessions'));
  assert.ok(sessionsSection.includes('Masquer les prochaines sessions'));
  assert.ok(sessionsSection.includes('focus-visible:ring-4'));
  assert.ok(sessionsSection.includes('[&::-webkit-details-marker]:hidden'));
});

test('le composant de sessions formalise la charte par formation', () => {
  for (const theme of ['blue', 'green', 'violet', 'orange', 'red']) {
    assert.ok(sessionsSection.includes(`${theme}: {`), `thème de formation manquant : ${theme}`);
  }
});
