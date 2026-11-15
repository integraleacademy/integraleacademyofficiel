import type { NextConfig } from 'next';
import imageWidths from './src/data/image-widths.json';
import urlRedirects from './src/data/url-redirects.json';
import { INFORMATION_REQUEST_URL } from './src/lib/contact-request';

const renderHost = [{ type: 'host' as const, value: '.*\\.onrender\\.com' }];

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { ...imageWidths, loader: 'custom', loaderFile: './src/lib/static-image-loader.ts' },
  async redirects() {
    // Existing CRM emails link to the galleries on the public domain.
    const previewDossiers = ['/dossiersfc', '/dossiersbts'].map(source => ({
      source, has: renderHost, destination: INFORMATION_REQUEST_URL, permanent: false,
    }));
    return [...previewDossiers, ...urlRedirects.map(redirect => ({ ...redirect, permanent: true }))];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        has: renderHost,
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
