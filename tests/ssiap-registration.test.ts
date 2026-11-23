import assert from 'node:assert/strict';
import test from 'node:test';
import { ssiapRegistrationHref } from '../src/lib/ssiap-registration';

const session = { id: 'ssiap-3-2027-10-18', startDate: '2027-10-18', endDate: '2027-12-01' };

test('une session SSIAP 2 ou 3 conserve son niveau et sa période jusqu’à l’inscription', () => {
  for (const course of ['ssiap-2', 'ssiap-3'] as const) {
    const href = ssiapRegistrationHref(session, undefined, course);
    const url = new URL(href, 'https://example.com');
    assert.equal(url.pathname, '/contact');
    assert.equal(url.hash, '#choix-ssiap');
    assert.equal(url.searchParams.get('formation'), course);
    assert.equal(url.searchParams.get('session'), session.id);
    assert.equal(url.searchParams.get('periode'), 'Du 18/10/2027 au 01/12/2027');
    assert.equal(url.searchParams.has('formule'), false);
  }
});

test('le parcours SSIAP 1 conserve sa formule SST', () => {
  const url = new URL(ssiapRegistrationHref({ ...session, title: 'SSIAP 1 avec SST' }), 'https://example.com');
  assert.equal(url.searchParams.get('formation'), 'ssiap-1');
  assert.equal(url.searchParams.get('formule'), 'ssiap-1-sst');
});
