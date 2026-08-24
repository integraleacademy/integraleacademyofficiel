import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiapMaintenanceConfig } from '@/data/ssiap-catalogue';

export const metadata = ssiapMaintenanceConfig.seo;

export default function SsiapMaintenancePage() {
  return <SsiapCoursePage config={ssiapMaintenanceConfig} />;
}
