import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiap3Config } from '@/data/ssiap-catalogue';

export const metadata = ssiap3Config.seo;

export default function Ssiap3Page() {
  return <SsiapCoursePage config={ssiap3Config} />;
}
