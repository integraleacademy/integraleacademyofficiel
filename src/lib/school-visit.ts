export const schoolVisitCampuses = { puget: 'Puget-sur-Argens', paris: 'Paris' } as const;
export type SchoolVisitCampus = keyof typeof schoolVisitCampuses;

export function validateSchoolVisit(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const values = input as Record<string, unknown>;
  const text = (key: string, max: number) => typeof values[key] === 'string' && values[key].length <= max ? values[key].trim() : '';
  const firstName = text('firstName', 80), lastName = text('lastName', 80);
  const email = text('email', 120), phone = text('phone', 40);
  const requestId = text('requestId', 36), campus = text('campus', 20);
  if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 8 || phone.replace(/\D/g, '').length > 15) return null;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestId) || (campus !== 'puget' && campus !== 'paris') || values.website) return null;
  if (values.message !== undefined && (typeof values.message !== 'string' || values.message.length > 800)) return null;
  return { firstName, lastName, email, phone, requestId, campus: campus as SchoolVisitCampus, message: text('message', 800) };
}
