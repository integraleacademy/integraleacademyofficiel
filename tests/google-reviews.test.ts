import assert from 'node:assert/strict';
import test from 'node:test';
import { parseNewReview, parseReviewEdit, matchesReviewCategory, REVIEW_CATEGORIES } from '../src/lib/google-reviews';
import seed from '../src/data/google-reviews-seed.json';

const sample = { author: 'Stagiaire test', rating: 5, sourceUrl: 'https://www.google.com/maps?cid=14373460169956988061', reviewedAt: '2026-10-01', originalText: 'Un avis original.', excerpt: 'Un avis original.', categories: ['APS', 'A3P'], published: true, featured: false };

test('un avis peut être retrouvé dans plusieurs formations, sans catégories dupliquées', () => {
  const review = parseNewReview({ ...sample, categories: ['APS', 'A3P', 'APS'] });
  assert.deepEqual(review.categories, ['APS', 'A3P']);
  assert.equal(matchesReviewCategory(review, 'APS'), true);
  assert.equal(matchesReviewCategory(review, 'A3P'), true);
  assert.equal(matchesReviewCategory(review, 'DESP'), false);
  assert.equal(matchesReviewCategory({ categories: [] }, 'Non classés'), true);
});

test('seuls les avis cinq étoiles et les liens Google sûrs sont acceptés', () => {
  for (const rating of [0, 4, 6, '5', undefined]) assert.throws(() => parseNewReview({ ...sample, rating }));
  for (const sourceUrl of ['javascript:alert(1)', 'https://google.com.evil.test/a', 'https://google.com@evil.test', 'http://google.com', 'https://user:pass@google.com']) assert.throws(() => parseNewReview({ ...sample, sourceUrl }));
  assert.equal(parseNewReview(sample).rating, 5);
});

test('les dates impossibles, extraits vides pour un avis écrit et catégories inconnues sont refusés', () => {
  assert.throws(() => parseNewReview({ ...sample, reviewedAt: '2026-02-31' }));
  assert.throws(() => parseNewReview({ ...sample, excerpt: '' }));
  assert.throws(() => parseReviewEdit({ ...sample, categories: ['inventée'] }));
  assert.throws(() => parseReviewEdit({ ...sample, published: 'true' }));
  assert.throws(() => parseReviewEdit({ ...sample, excerpt: 'x'.repeat(701) }));
  assert.equal(parseNewReview({ ...sample, originalText: '', excerpt: '' }).excerpt, '');
});

test('le catalogue initial conserve des sources, des notes vérifiées et des catégories valides', () => {
  const ids = new Set<string>();
  const sourceIds = new Set<string>();
  for (const review of seed.reviews) {
    assert.equal(review.rating, 5);
    assert.ok(review.excerpt.trim());
    assert.ok(review.provenance);
    assert.ok(review.sourceUrl.startsWith('https://www.google.com/maps'));
    assert.ok(!ids.has(review.id)); ids.add(review.id);
    assert.ok(!sourceIds.has(review.sourceId)); sourceIds.add(review.sourceId);
    assert.ok(review.categories.every(c => REVIEW_CATEGORIES.includes(c as typeof REVIEW_CATEGORIES[number])));
  }
  assert.equal(seed.complete, false, 'Une sélection partielle ne doit pas être présentée comme un import complet.');
  assert.ok(seed.reviews.some(r => r.categories.includes('DESP')));
});
