type DatedSession = { startDate?: string | Date; endDate?: string | Date; examDate?: string | Date | null };

export function planningMonth(value: string | Date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit' }).format(new Date(value));
}

/** Include a course spanning the selected month, not only courses starting in it. */
export function sessionMatchesMonth(session: DatedSession, month: string) {
  if (month === 'all') return true;
  if (!session.startDate) return false;
  const first = planningMonth(session.startDate);
  const last = planningMonth(session.examDate || session.endDate || session.startDate);
  return first <= month && month <= last;
}

export function planningMonths(sessions: DatedSession[]) {
  const months = new Set<string>();
  for (const session of sessions) {
    if (!session.startDate) continue;
    const first = planningMonth(session.startDate);
    const last = planningMonth(session.examDate || session.endDate || session.startDate);
    const [year, month] = first.split('-').map(Number);
    for (let date = new Date(Date.UTC(year, month - 1, 1)); date.toISOString().slice(0, 7) <= last; date.setUTCMonth(date.getUTCMonth() + 1)) {
      months.add(date.toISOString().slice(0, 7));
    }
  }
  return [...months].sort();
}

export function nextBtsIntakeYear(referenceDate = new Date()) {
  const key = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(referenceDate);
  const year = Number(key.slice(0, 4));
  return key.slice(5) < '09-01' ? year : year + 1;
}
