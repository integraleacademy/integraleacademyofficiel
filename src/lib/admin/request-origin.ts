// Render terminates HTTPS before forwarding requests to Next's internal URL.
// Only recognised deployment hosts may override Host via X-Forwarded-Host.
const trustedProxyHosts = new Set([
  'integraleacademyofficiel-1.onrender.com',
  'www.integraleacademy.com',
  'integraleacademy.com',
  process.env.RENDER_EXTERNAL_HOSTNAME?.toLowerCase(),
]);
const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);

export function isAllowedAdminOrigin(request: Pick<Request, 'headers' | 'url'>): boolean {
  const origin = request.headers.get('origin');
  // Preserve authenticated non-browser clients that do not send Origin.
  if (!origin) return true;

  try {
    const source = new URL(origin);
    if (source.origin !== origin || !['http:', 'https:'].includes(source.protocol)) return false;
    if (source.protocol !== 'https:' && !localHosts.has(source.hostname)) return false;

    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0].trim().toLowerCase();
    const publicHost = forwardedHost && trustedProxyHosts.has(forwardedHost)
      ? forwardedHost
      : request.headers.get('host') || new URL(request.url).host;
    const target = new URL(`${source.protocol}//${publicHost}`);
    if (target.username || target.password || target.pathname !== '/' || target.search || target.hash) return false;
    return source.host === target.host;
  } catch {
    return false;
  }
}
