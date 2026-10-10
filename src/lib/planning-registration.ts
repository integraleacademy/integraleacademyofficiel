import { getSessionSeatAvailability } from '@/lib/session-seat-availability';

export function planningRegistrationAction(session: any) {
  if (session.status === 'COMING_SOON') return { kind: 'opening', label: 'Me renseigner sur l’ouverture' };
  if (session.status === 'FULL' || (session.scheduleKind !== 'vtc-exam' && getSessionSeatAvailability(session).count === 0)) {
    return { kind: 'waiting-list', label: 'Rejoindre la liste d’attente' };
  }
  return { kind: 'registration', label: 'Choisir cette session' };
}

export function validatePlanningRequest(input: Record<string, unknown>) {
  const text = (key: string, limit: number) => typeof input[key] === 'string' ? (input[key] as string).trim().slice(0, limit) : '';
  const data = { firstName: text('firstName', 80), lastName: text('lastName', 80), email: text('email', 120), phone: text('phone', 40), sessionId: text('sessionId', 160), requestId: text('requestId', 36) };
  if (!data.firstName || !data.lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.phone.replace(/\D/g, '').length < 8 || !data.sessionId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.requestId)) return null;
  return data;
}
