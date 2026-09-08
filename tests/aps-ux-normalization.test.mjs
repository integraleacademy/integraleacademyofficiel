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

test('la simulation animée de ronde reste visible dans le bloc pratique', () => {
  assert.ok(apsPage.includes("index === 0 ? styles.practicalPrimary : ''"));
  assert.ok(apsPage.includes('<ApsStoryIllustration kind="patrol"'));
  assert.ok(apsPage.includes('Animation d’un agent effectuant une ronde autour d’un bâtiment'));
  assert.match(apsStyles, /\.scanLine[\s\S]*?animation: radar 5\.5s linear infinite;/);
  assert.match(apsStyles, /@keyframes radar/);
});

test('le bloc immersion réutilise les illustrations de la galerie métier', () => {
  const immersionStart = apsPage.indexOf('<Section id="pratique"');
  const immersionEnd = apsPage.indexOf('<Section id="programme"', immersionStart);
  const immersion = apsPage.slice(immersionStart, immersionEnd);
  for (const kind of ['baggage', 'patdown', 'access']) {
    assert.ok(immersion.includes(`<ApsStoryIllustration kind="${kind}"`));
  }
  assert.doesNotMatch(immersion, /aps-training-(?:bag-inspection|patdown)\.jpg/);
  assert.ok(apsPage.includes('role="img" aria-label={description}'));
  assert.match(apsStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.storyBagCheck, \.storyPatdownAgent, \.storyPatdownZones \{ animation: none;/);
});

test('la partie métier présente six illustrations APS animées et accessibles', () => {
  const storiesBlock = apsPage.slice(
    apsPage.indexOf('const apsVisualStories = ['),
    apsPage.indexOf('const audiences = ['),
  );

  for (const title of [
    'Les rondes de sécurité',
    'La vigilance de nuit',
    'Le contrôle d’accès',
    'La surveillance vidéo',
    'Observer et rendre compte',
    'Réagir et alerter',
  ]) {
    assert.ok(storiesBlock.includes(title), `illustration APS manquante : ${title}`);
  }

  assert.ok(apsPage.includes('<ApsStoryIllustration key={kind}'));
  assert.ok(apsPage.includes('role="img" aria-label={description}'));
  assert.match(apsStyles, /\.visualStoriesGrid[\s\S]*?scroll-snap-type:\s*x mandatory;/);
  assert.match(apsStyles, /@keyframes storyNightSweep/);
  assert.match(apsStyles, /@keyframes storyVideoSweep/);
  assert.match(apsStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.storyNightBeam,[\s\S]*?\.storyVideoScan,/);
});

test('la page APS trie les sessions et limite la vue initiale aux deux prochaines', () => {
  assert.ok(apsPage.includes('sortSessionsChronologically(sessions.length ? sessions : fallbackSessions)'));
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
  assert.ok(sessionsSection.includes('seatAvailability?.label'));
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
