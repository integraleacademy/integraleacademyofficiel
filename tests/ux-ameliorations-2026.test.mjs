import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('la demande de brochure ne se fait plus passer pour un téléchargement direct', () => {
  const card = read('src/components/CourseBrochureCard.tsx');
  const companies = read('src/app/entreprises/page.tsx');
  for (const source of [card, companies]) {
    assert.match(source, /Recevoir la brochure/);
    assert.match(source, /href=\{INFORMATION_REQUEST_URL\}[^>]*target="_blank"/);
  }
  assert.doesNotMatch(card, /Télécharger la brochure/);
  assert.match(card, /formulaire de demande d’informations/);
  assert.match(card, /relatedCourses/);
});

test('les interactions restent sobres, accessibles et respectent les préférences de mouvement', () => {
  const shared = read('src/app/globals.css');
  assert.match(shared, /data-academy-action/);
  assert.match(shared, /prefers-reduced-motion: reduce/);
  const nav = read('src/components/TrainingSectionNavigation.module.css');
  assert.match(nav, /courseNavLinkActive::after/);
  const menu = read('src/components/TrainingFamilyMenu.module.css');
  assert.match(menu, /primaryHeading:hover/);
  const video = read('src/components/CourseFilm.tsx');
  assert.match(video, /aria-pressed=\{sound === 'on'\}/);
  assert.match(video, /Vidéo sans son/);
});

test('les sessions, les programmes et les vrais avis gardent leurs éléments existants', () => {
  const sessions = read('src/components/TrainingSessionCards.tsx');
  assert.match(sessions, /Session suivante/);
  assert.match(sessions, /data-next-session/);
  const programme = read('src/components/TrainingProgramExplorer.tsx');
  assert.match(programme, /Sélectionnez une unité/);
  assert.match(programme, /aria-live="polite"/);
  const reviews = read('src/components/TrainingCourseTestimonials.tsx');
  assert.match(reviews, /review\.sourceUrl/);
  assert.match(reviews, /ReviewQuote/);
});

test('les masters et bachelors en projet sont présentés sans garantie de certification', () => {
  const data = read('src/data/upcoming-trainings.ts');
  assert.equal((data.match(/enregistrement en cours auprès de France compétences/g) || []).length, 3);
  assert.match(data, /jobs: \['Coordinateur de prestations de sécurité'/);
  const carousel = read('src/components/TrainingCarousel.tsx');
  assert.match(carousel, /certificationStatus/);
  assert.match(carousel, /Exemples de métiers visés/);
});

test('l’assistant conserve ses actions et clarifie son parcours', () => {
  const assistant = read('src/components/OrientationAssistant.tsx');
  assert.match(assistant, /Voir dates et tarifs/);
  assert.match(assistant, /Réserver un rendez-vous téléphonique/);
  assert.match(assistant, /INFORMATION_REQUEST_URL|quoteRequestUrl/);
});
