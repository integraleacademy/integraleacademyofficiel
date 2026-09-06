import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const syncWorkflow = readFileSync(
  new URL('../.github/workflows/notion-site-officiel-pr-sync.yml', import.meta.url),
  'utf8',
);
const publishWorkflow = readFileSync(
  new URL('../.github/workflows/notion-work-publish.yml', import.meta.url),
  'utf8',
);

test('la fermeture d’une PR Work Notion déclenche la synchronisation', () => {
  assert.match(syncWorkflow, /pull_request:\s*\n\s+branches: \[main\]\s*\n\s+types: \[closed\]/);
  assert.ok(syncWorkflow.includes("startsWith(github.event.pull_request.head.ref, 'work/notion-site-officiel-')"));
  assert.ok(syncWorkflow.includes("contains(github.event.pull_request.body, '<!-- notion-page-id:')"));
});

test('le workflow de publication déclenche explicitement la synchronisation Notion', () => {
  assert.ok(syncWorkflow.includes('workflow_dispatch:'));
  assert.ok(syncWorkflow.includes("github.event_name == 'workflow_dispatch'"));
  assert.ok(syncWorkflow.includes('INPUT_PAGE_ID: ${{ inputs.page_id }}'));
  assert.ok(publishWorkflow.includes('page_id: ${{ steps.meta.outputs.page_id }}'));
  assert.match(publishWorkflow, /permissions:\s*\n\s+actions: write\s*\n\s+contents: write/);
  assert.ok(publishWorkflow.includes('gh workflow run notion-site-officiel-pr-sync.yml'));
  assert.ok(publishWorkflow.includes('-f page_id="$PAGE_ID"'));
  assert.ok(publishWorkflow.includes('-f pr_url="https://github.com/${GITHUB_REPOSITORY}/pull/${PR_NUMBER}"'));
  assert.ok(publishWorkflow.includes('-f branch="$HEAD_REF"'));
});

test('une PR fusionnée passe automatiquement à Publié dans Notion', () => {
  assert.ok(syncWorkflow.includes("github.event_name == 'workflow_dispatch' || github.event.pull_request.merged"));
  assert.ok(syncWorkflow.includes('status = "Publié" if merged else "En attente"'));
  assert.ok(syncWorkflow.includes('"Statut": {"select": {"name": status}}'));
  assert.ok(syncWorkflow.includes('"Publié en bas": {"checkbox": merged}'));
});

test('la validation après publication reste exclusivement manuelle', () => {
  assert.doesNotMatch(syncWorkflow, /"Validé après publication"\s*:/);
  assert.doesNotMatch(publishWorkflow, /"Validé après publication"\s*:/);
});

test('les erreurs temporaires de Notion sont retentées avec un délai borné', () => {
  assert.ok(syncWorkflow.includes('for attempt in range(1, 4)'));
  assert.ok(syncWorkflow.includes('exc.code == 429 or 500 <= exc.code <= 599'));
  assert.ok(syncWorkflow.includes('Retry-After'));
  assert.ok(syncWorkflow.includes('delay = min(requested_delay, 30)'));
});

test('le workflow refuse toute page hors du périmètre Notion attendu', () => {
  assert.ok(syncWorkflow.includes("github.event.pull_request.user.login == 'integraleacademy'"));
  assert.ok(syncWorkflow.includes('EXPECTED_DATABASE_ID: cfb1a7f4-3fa2-4586-a017-dbf23f690183'));
  assert.ok(syncWorkflow.includes('EXPECTED_DATA_SOURCE_ID: 7f12fe92-dbc4-40c8-af4e-77578b5dbfc0'));
  assert.ok(syncWorkflow.includes('EXPECTED_PLATFORM: Site internet officiel'));
  assert.ok(syncWorkflow.includes('if not parent_ids & expected_parent_ids:'));
  assert.ok(syncWorkflow.includes('platform != os.environ["EXPECTED_PLATFORM"]'));

  const readPosition = syncWorkflow.indexOf('page = notion_request("GET")');
  const writePosition = syncWorkflow.indexOf('notion_request("PATCH", payload)');
  assert.ok(readPosition >= 0, 'lecture préalable de la page absente');
  assert.ok(writePosition > readPosition, 'le PATCH doit intervenir après le contrôle de périmètre');
});
