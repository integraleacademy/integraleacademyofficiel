import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const workflow = readFileSync(
  new URL('../.github/workflows/notion-site-officiel-pr-sync.yml', import.meta.url),
  'utf8',
);

test('la fermeture d’une PR Work Notion déclenche la synchronisation', () => {
  assert.match(workflow, /pull_request:\s*\n\s+branches: \[main\]\s*\n\s+types: \[closed\]/);
  assert.ok(workflow.includes("startsWith(github.event.pull_request.head.ref, 'work/notion-site-officiel-')"));
  assert.ok(workflow.includes("contains(github.event.pull_request.body, '<!-- notion-page-id:')"));
});

test('une PR fusionnée passe automatiquement à Publié dans Notion', () => {
  assert.ok(workflow.includes('github.event.pull_request.merged'));
  assert.ok(workflow.includes('status = "Publié" if merged else "En attente"'));
  assert.ok(workflow.includes('"Statut": {"select": {"name": status}}'));
  assert.ok(workflow.includes('"Publié en bas": {"checkbox": merged}'));
});

test('la validation après publication reste exclusivement manuelle', () => {
  assert.doesNotMatch(workflow, /"Validé après publication"\s*:/);
});

test('les erreurs temporaires de Notion sont retentées avant échec', () => {
  assert.ok(workflow.includes('for attempt in range(1, 4)'));
  assert.ok(workflow.includes('exc.code == 429 or 500 <= exc.code <= 599'));
  assert.ok(workflow.includes('Retry-After'));
});
