import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiap2Config } from '@/data/ssiap-catalogue';

export const metadata = { ...ssiap2Config.seo, alternates: { canonical: '/formations-securite/ssiap-2' } };

export default function Ssiap2Page() {
  return <SsiapCoursePage config={ssiap2Config} />;
}
