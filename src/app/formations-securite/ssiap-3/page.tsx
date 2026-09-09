import { createPageMetadata } from '@/lib/seo';
import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiap3Config } from '@/data/ssiap-catalogue';

export const metadata = createPageMetadata('/formations-securite/ssiap-3');

export default function Ssiap3Page() {
  return <SsiapCoursePage config={ssiap3Config} />;
}
