import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiapMaintenanceConfig } from '@/data/ssiap-catalogue';

export const metadata = { ...ssiapMaintenanceConfig.seo, alternates: { canonical: '/formations-securite/recyclage-remise-a-niveau-ssiap' } };

export default function SsiapMaintenancePage() {
  return <SsiapCoursePage config={ssiapMaintenanceConfig} />;
}
