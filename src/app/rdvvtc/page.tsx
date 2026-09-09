import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { CallbackConfirmation } from '@/components/CallbackConfirmation';

export const metadata: Metadata = createPageMetadata('/rdvvtc');

export default function Page() {
  return <CallbackConfirmation formation="Formation chauffeur VTC" href="/vtc" />;
}
