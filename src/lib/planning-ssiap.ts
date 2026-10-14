export const ssiapPlanningGroups = [
  { key: 'initial', label: 'Formation initiale' },
  { key: 'recyclage', label: 'Recyclage' },
  { key: 'remise-a-niveau', label: 'Remise à niveau' },
] as const;

export const ssiapPlanningCourses = [
  { key: 'ssiap-1', group: 'initial', level: 1, label: 'SSIAP 1', detail: 'Agent de sécurité incendie', href: '/formations-securite/ssiap-1' },
  { key: 'ssiap-2', group: 'initial', level: 2, label: 'SSIAP 2', detail: 'Chef d’équipe de sécurité incendie', href: '/formations-securite/ssiap-2' },
  { key: 'ssiap-3', group: 'initial', level: 3, label: 'SSIAP 3', detail: 'Chef de service de sécurité incendie', href: '/formations-securite/ssiap-3' },
  { key: 'recyclage-ssiap-1', group: 'recyclage', level: 1, label: 'Recyclage SSIAP 1', detail: 'Maintien des connaissances · niveau 1', href: '/formations-securite/recyclage-remise-a-niveau-ssiap' },
  { key: 'recyclage-ssiap-2', group: 'recyclage', level: 2, label: 'Recyclage SSIAP 2', detail: 'Maintien des connaissances · niveau 2', href: '/formations-securite/recyclage-remise-a-niveau-ssiap' },
  { key: 'recyclage-ssiap-3', group: 'recyclage', level: 3, label: 'Recyclage SSIAP 3', detail: 'Maintien des connaissances · niveau 3', href: '/formations-securite/recyclage-remise-a-niveau-ssiap' },
  { key: 'remise-a-niveau-ssiap-1', group: 'remise-a-niveau', level: 1, label: 'Remise à niveau SSIAP 1', detail: 'Actualisation des acquis · niveau 1', href: '/formations-securite/recyclage-remise-a-niveau-ssiap' },
  { key: 'remise-a-niveau-ssiap-2', group: 'remise-a-niveau', level: 2, label: 'Remise à niveau SSIAP 2', detail: 'Actualisation des acquis · niveau 2', href: '/formations-securite/recyclage-remise-a-niveau-ssiap' },
  { key: 'remise-a-niveau-ssiap-3', group: 'remise-a-niveau', level: 3, label: 'Remise à niveau SSIAP 3', detail: 'Actualisation des acquis · niveau 3', href: '/formations-securite/recyclage-remise-a-niveau-ssiap' },
] as const;

export type SsiapPlanningCourse = typeof ssiapPlanningCourses[number]['key'];
export type SsiapPlanningSession = { title?: string; training?: { slug?: string; name?: string } | null };

const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[_-]+/g, ' ');

function courseMode(value: string) {
  const refresher = /recycl/.test(value);
  const restart = /remise|\bran\b/.test(value);
  if (refresher && restart) return 'ambiguous';
  if (refresher) return 'recyclage';
  if (restart) return 'remise-a-niveau';
  return /initial/.test(value) ? 'initial' : null;
}

/** A session belongs to one precise level AND course type, never the whole SSIAP family. */
export function planningSsiapCourse(session: SsiapPlanningSession): SsiapPlanningCourse | null {
  const slug = normalize(session.training?.slug);
  if (!slug.includes('ssiap')) return null;
  const title = normalize(session.title);
  const name = normalize(session.training?.name);
  const mode = courseMode(title) || courseMode(slug + ' ' + name) || 'initial';
  if (mode === 'ambiguous') return null;

  let level: string | undefined;
  for (const source of [title, slug, name]) {
    const levels = [...new Set([...source.matchAll(/\bssiap\s*([123])\b/g)].map(match => match[1]))];
    if (levels.length > 1 || /\bssiap\s*[123]\s*(?:[,/]|et|ou)\s*[123]\b/.test(source)) return null;
    if (levels.length) { level = levels[0]; break; }
  }
  if (!level) return null;
  const key = (mode === 'initial' ? '' : mode + '-') + 'ssiap-' + level;
  return ssiapPlanningCourses.find(course => course.key === key)?.key || null;
}

export function ssiapPlanningContactHref(key: SsiapPlanningCourse) {
  const course = ssiapPlanningCourses.find(item => item.key === key)!;
  return 'mailto:ecole@integraleacademy.com?subject=' + encodeURIComponent('Prochaines dates — ' + course.label)
    + '&body=' + encodeURIComponent('Bonjour,\n\nJe souhaite connaître les prochaines dates pour la formation ' + course.label + '.\n\nMerci.');
}
