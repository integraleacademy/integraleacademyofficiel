import type { NextConfig } from 'next';
import urlRedirects from './src/data/url-redirects.json';

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    // Relative destinations work on the preview and on the future public domain.
    // Next.js retains query parameters and uses permanent HTTP 308 redirects.
    return urlRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
  async headers() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.onrender\\.com' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
      },
      ...['/admin/:path*', '/api/:path*'].map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      })),
    ];
  },
};
export default nextConfig;
