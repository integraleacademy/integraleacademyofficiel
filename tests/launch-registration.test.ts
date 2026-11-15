import assert from 'node:assert/strict';
import test from 'node:test';
import { importedSessionPrice, ssiapRegistrationHref, ssiapSessionFormula } from '../src/lib/ssiap-registration';
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

test('le calendrier Excel conserve le bon tarif de la session avec SST', () => {
  const date = new Date('2027-02-11');
  for (const name of ['SSIAP 1 avec SST', 'SSIAP 1 + SST']) {
    assert.deepEqual(importedSessionPrice('ssiap-1', name, date, 98000, '980 €'), { priceCents: 123000, priceLabel: '1 230 € TTC' });
    assert.equal(importedSessionPrice('ssiap-1', name, date, null, '').priceCents, 123000);
  }
  for (const [slug, title, year, cents] of [
    ['ssiap-1', 'SSIAP 1 sans SST', 2027, 98000], ['aps', 'avec SST', 2027, 98000],
    ['ssiap-1', 'SSIAP 1 avec SST', 2026, 98000], ['ssiap-1', 'SSIAP 1 avec SST', 2027, 110000],
  ] as const) {
    assert.equal(importedSessionPrice(slug, title, new Date(`${year}-02-11`), cents, '').priceCents, cents);
  }
});
