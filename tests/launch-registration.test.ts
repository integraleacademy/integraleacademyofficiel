import assert from 'node:assert/strict';
import test from 'node:test';
import { ssiapRegistrationHref, ssiapSessionFormula } from '../src/lib/ssiap-registration';
import { informationRequestHref } from '../src/lib/contact-request';
import imageLoader from '../src/lib/static-image-loader';
import { PARIS_ADDRESS, contactInfo } from '../src/data/locations';

test('les formules et dates SSIAP suivent le candidat jusqu’au formulaire', () => {
  for (const [title, formula] of [['SSIAP 1 avec SST', 'ssiap-1-sst'], ['SSIAP 1 sans SST', 'ssiap-1']] as const) {
    const session = { id: 'session-test', title, startDate: '2027-02-11', endDate: '2027-02-26' };
    const url = new URL(ssiapRegistrationHref(session), 'https://www.integraleacademy.com');
    assert.equal(ssiapSessionFormula(title), formula);
    url.searchParams.set('utm_source', 'planning');
    const next = new URL(informationRequestHref(Object.fromEntries(url.searchParams)));
    assert.deepEqual([...next.searchParams.values()], ['SSIAP', 'session-test','Du 11/02/2027 au 26/02/2027', formula, 'planning']);
  }
  assert.ok(!informationRequestHref({formation:'aps',session:'42',formule:'ssiap-1'}).includes('session='));
});

test('les images du site ont des variantes statiques et les médias dynamiques gardent leur adresse', () => {
  assert.match(imageLoader({ src:'/images/logo.png',width:256 }), /^\/responsive-images\/[0-9a-f]{16}-256\.webp$/);
  assert.equal(imageLoader({src:'/api/photo/123', width:640}), '/api/photo/123');
  assert.equal(PARIS_ADDRESS,'34 rue Poissonnière, 75002 Paris');
  assert.equal(contactInfo.hours,'Du lundi au vendredi de 9 h à 17 h');
});
