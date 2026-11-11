import { CertificationProjectPage, certificationProjectMetadata } from '@/components/CertificationProjectPage';
import { certificationProjects } from '@/data/certification-projects';

export const metadata = certificationProjectMetadata(certificationProjects.cpiaa);

export default function Page() {
  return <CertificationProjectPage project={certificationProjects.cpiaa} />;
}
