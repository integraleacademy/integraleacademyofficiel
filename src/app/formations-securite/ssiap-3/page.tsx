import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiap3Config } from '@/data/ssiap-catalogue';

export const metadata = { ...ssiap3Config.seo, alternates: { canonical: '/formations-securite/ssiap-3' } };

export default function Ssiap3Page() {
  return <SsiapCoursePage config={ssiap3Config} />;
}
