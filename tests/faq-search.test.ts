import assert from 'node:assert/strict';
import test from 'node:test';
import { questionsByTopic } from '../src/data/faq/catalogue';
import { faqHref } from '../src/data/faq/topics';
import { findFaqGroups } from '../src/lib/faq-search';

test('la recherche porte sur les réponses et tolère accents et majuscules', () => {
  const results = findFaqGroups(questionsByTopic, 'a3p', 'HEBERGEMENT');
  assert.equal(results.length, 1);
  assert.deepEqual(results, findFaqGroups(questionsByTopic, 'a3p', 'hébergement'));
  assert.ok(results[0].items.length);
  const answerWord = questionsByTopic.aps[0].a.split(/\W+/).find(word => word.length > 5 && !questionsByTopic.aps[0].q.includes(word));
  assert.ok(answerWord);
  assert.ok(findFaqGroups(questionsByTopic, 'aps', answerWord)[0].items.includes(questionsByTopic.aps[0]));
});

test('les filtres se combinent, se partagent et acceptent zéro résultat', () => {
  assert.deepEqual(findFaqGroups(questionsByTopic, 'aps', 'xyzznoresults'), []);
  assert.equal(findFaqGroups(questionsByTopic, undefined, '').length, Object.keys(questionsByTopic).length);
  assert.deepEqual(findFaqGroups(questionsByTopic, 'aps', '')[0].items, questionsByTopic.aps);
  const href = new URL(faqHref('aps', 'cpf & examen'), 'https://example.test');
  assert.equal(href.searchParams.get('formation'), 'aps');
  assert.equal(href.searchParams.get('q'), 'cpf & examen');
});
