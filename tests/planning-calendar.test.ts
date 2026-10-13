import assert from 'node:assert/strict';
import test from 'node:test';
import { calendarExtent, calendarMonth, calendarPosition, planningDay, sessionCalendarPosition, sessionInCalendarWindow } from '../src/lib/planning-calendar';

test('three-month navigation spans a year boundary and stops at the last published month', () => {
  const extent = calendarExtent([{ startDate: '2026-11-20', endDate: '2026-12-08', examDate: '2027-04-04' }])!;
  assert.equal(new Date(extent.start).toISOString().slice(0, 10), '2026-11-01');
  assert.equal(extent.maxOffset, 3);
  assert.equal(new Date(calendarMonth(extent.start, extent.maxOffset + 3)).toISOString().slice(0, 10), '2027-05-01');
  assert.deepEqual(calendarExtent([{ startDate: '2026-11-20' }]), { start: Date.UTC(2026, 10, 1), maxOffset: 0 });
  assert.equal(calendarExtent([]), null);
});

test('sessions remain visible through the final exam, including sessions starting before the window', () => {
  const start = Date.UTC(2027, 0, 1), end = Date.UTC(2027, 3, 1);
  assert.equal(sessionInCalendarWindow({ startDate: '2026-11-09', endDate: '2027-01-19', examDate: '2027-01-20' }, start, end), true);
  assert.equal(sessionInCalendarWindow({ startDate: '2026-12-01', endDate: '2026-12-31', examDate: '2027-01-01' }, start, end), true);
  assert.equal(sessionInCalendarWindow({ startDate: '2027-04-01', endDate: '2027-04-10' }, start, end), false);
  assert.equal(sessionInCalendarWindow({ startDate: '2026-12-01', endDate: '2026-12-31' }, start, end), false);
  assert.equal(sessionCalendarPosition({ startDate: '2026-11-09', endDate: '2027-01-19', examDate: '2027-01-20' }, start, end)?.left, 0);
});

test('single-day and clipped phases keep their true duration instead of receiving a misleading minimum width', () => {
  const start = Date.UTC(2028, 1, 1), end = Date.UTC(2028, 2, 1);
  assert.deepEqual(calendarPosition('2028-01-20', '2028-03-10', start, end), { left: 0, width: 100 });
  assert.equal(calendarPosition('2028-02-29', '2028-02-29', start, end)?.width, 100 / 29);
  assert.equal(calendarPosition('2028-03-01', '2028-03-01', start, end), null);
});

test('Paris days are stable over DST and invalid dates do not create bars', () => {
  assert.equal(planningDay('2026-10-24T22:30:00Z'), Date.UTC(2026, 9, 25));
  assert.equal(planningDay('2026-10-25T23:30:00Z'), Date.UTC(2026, 9, 26));
  assert.equal(planningDay('invalid'), null);
  assert.equal(calendarPosition('invalid', null, 0, 10), null);
  assert.equal(sessionInCalendarWindow({}, Date.UTC(2026, 0, 1), Date.UTC(2027, 0, 1)), false);
});
