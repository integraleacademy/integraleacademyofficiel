/** Informational project pages are accessed directly, outside the training catalogue. */
export function isCertificationProjectPath(pathname: string | null): boolean {
  const path = pathname?.replace(/\/+$/, '');
  return path === '/certifications/cpiaa' || path === '/certifications/eiag';
}
