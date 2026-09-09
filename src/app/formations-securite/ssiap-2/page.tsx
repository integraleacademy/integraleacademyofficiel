import { createPageMetadata } from '@/lib/seo';
import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiap2Config } from '@/data/ssiap-catalogue';

export const metadata = createPageMetadata('/formations-securite/ssiap-2');

export default function Ssiap2Page() {
  return <SsiapCoursePage config={ssiap2Config} />;
}
