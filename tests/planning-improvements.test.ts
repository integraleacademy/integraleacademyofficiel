import assert from 'node:assert/strict';
import test from 'node:test';
import { toPublicSession } from '../src/lib/public-session-data';
import { planningMonths, sessionMatchesMonth, nextBtsIntakeYear } from '../src/lib/planning-filters';
import { planningRegistrationAction, validatePlanningRequest } from '../src/lib/planning-registration';
import { getVtcPlanningSessions } from '../src/lib/planning-data';

test('public sessions expose only approved fields, including nested training and VTC dates', () => {
  const session = toPublicSession({ id: 's1', title: 'APS', internalNotes: 'PRIVATE_SESSION', privateFutureField: 'PRIVATE_FUTURE', createdAt: 'private', training: { slug: 'aps', name: 'APS', isActive: true, internalNotes: 'PRIVATE_TRAINING' }, vtcDates: { deadline: '2026-11-20', theory: '2026-12-08', internalNotes: 'PRIVATE_VTC' } });
  assert.equal(session.id, 's1');
  assert.equal(session.training?.slug, 'aps');
  assert.doesNotMatch(JSON.stringify(session), /PRIVATE|internalNotes|privateFutureField|createdAt/);
});

test('month filtering includes every month of a course and its separate exam', () => {
  const session = { startDate: '2026-11-09', endDate: '2027-01-19', examDate: '2027-02-01' };
  assert.deepEqual(planningMonths([session]), ['2026-11', '2026-12', '2027-01', '2027-02']);
  assert.equal(sessionMatchesMonth(session, '2026-12'), true);
  assert.equal(sessionMatchesMonth(session, '2027-02'), true);
  assert.equal(sessionMatchesMonth(session, '2026-10'), false);
  assert.equal(sessionMatchesMonth(session, 'all'), true);
});

test('BTS no longer advertises a past September as its next intake', () => {
  assert.equal(nextBtsIntakeYear(new Date('2026-08-31T12:00:00Z')), 2026);
  assert.equal(nextBtsIntakeYear(new Date('2026-10-10T12:00:00Z')), 2027);
  assert.equal(nextBtsIntakeYear(new Date('2027-10-10T12:00:00Z')), 2028);
});

test('full and upcoming sessions cannot be counted as registrations', () => {
  assert.equal(planningRegistrationAction({ status: 'FULL', seatsLeft: 12 }).kind, 'waiting-list');
  assert.equal(planningRegistrationAction({ status: 'OPEN', seatsLeft: 0 }).kind, 'waiting-list');
  assert.equal(planningRegistrationAction({ status: 'COMING_SOON', seatsLeft: 12 }).kind, 'opening');
  assert.equal(planningRegistrationAction({ status: 'OPEN', seatsLeft: 4 }).kind, 'registration');
  assert.equal(planningRegistrationAction({ status: 'OPEN', scheduleKind: 'vtc-exam', seatsLeft: 0 }).kind, 'registration');
});

test('contact request requires valid contact details and a session identifier', () => {
  const input = { firstName: ' Test ', lastName: ' User ', email: 'user@example.com', phone: '0612345678', sessionId: 'session-1', requestId: 'e6169aec-c638-453c-a731-6a579b1bf91e', internalNotes: 'DO_NOT_ACCEPT', title: 'forged title' };
  assert.equal(validatePlanningRequest(input)?.firstName, 'Test');
  assert.equal(validatePlanningRequest({ ...input, email: 'invalid' }), null);
  assert.equal(validatePlanningRequest({ ...input, sessionId: '' }), null);
  assert.equal(validatePlanningRequest({ ...input, phone: '1' }), null);
  assert.doesNotMatch(JSON.stringify(validatePlanningRequest(input)), /DO_NOT_ACCEPT|forged/);
});

test('managed VTC dates override the legacy fallback and hidden sessions stay hidden', () => {
  const session = { id: 'managed-vtc', startDate: '2099-11-20', endDate: '2099-12-08', examDate: '2100-01-04', status: 'OPEN', training: { slug: 'vtc', isActive: true } };
  const rows = getVtcPlanningSessions(new Date(), [session]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, 'managed-vtc');
  assert.equal(rows[0].vtcDates.theory, '2099-12-08');
  assert.equal(rows[0].showSeatsLeft, false);
  assert.deepEqual(getVtcPlanningSessions(new Date(), [{ ...session, status: 'HIDDEN' }]), []);
});
