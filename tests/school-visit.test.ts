import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSchoolVisit } from '../src/lib/school-visit';
import { parseSessionLocationFilter, sessionMatchesLocation } from '../src/lib/session-location-filter';

const request = { firstName: ' Léa ', lastName: 'Martin', email: 'lea@example.com', phone: '+33 (0)6 12 34 56 78', requestId: '9b3e8479-74b7-4498-a53a-984b526a9801', campus: 'puget', message: 'Disponibilité le mercredi.', website: '' };

test('une visite garde le lieu, les coordonnées et les disponibilités', () => {
  const result = validateSchoolVisit(request);
  assert.equal(result?.campus, 'puget');
  assert.equal(result?.firstName, 'Léa');
  assert.equal(result?.message, request.message);
  assert.equal(validateSchoolVisit({ ...request, campus: 'paris', message: '' })?.campus, 'paris');
});
test('les données invalides et les lieux non proposés ne créent pas de demande', () => {
  for (const input of [null, [], 'visite', {}, { ...request, campus: 'aurillac' }, { ...request, campus: '__proto__' }, { ...request, firstName: ' ' }, { ...request, email: 'invalide' }, { ...request, phone: '1234567' }, { ...request, phone: 'abcdef12345678' }, { ...request, requestId: request.requestId + 'ignored' }, { ...request, website: 'https://spam.example' }, { ...request, message: 'a'.repeat(801) }, { ...request, lastName: 'a'.repeat(81) }]) {
    assert.equal(validateSchoolVisit(input), null);
  }
});
test('le message libre reste facultatif', () => {
  const { message, ...withoutMessage } = request;
  assert.equal(validateSchoolVisit(withoutMessage)?.message, '');
});
test('les liens des trois campus sélectionnent uniquement les sessions du lieu attendu', () => {
  const sessions = [{ location: 'Paris' }, { location: 'Puget-sur-Argens / Côte d’Azur' }, { location: 'Aurillac / Centre France' }];
  for (const [index, key] of ['paris', 'cote-azur', 'auvergne'].entries()) {
    assert.deepEqual(sessions.filter(session => sessionMatchesLocation(session, parseSessionLocationFilter(key))), [sessions[index]]);
  }
  assert.equal(parseSessionLocationFilter(['paris', 'cote-azur']), 'paris');
  for (const input of [undefined, '', 'inconnu', '__proto__']) assert.equal(parseSessionLocationFilter(input), 'all');
});
