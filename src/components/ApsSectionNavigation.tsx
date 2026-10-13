import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';

const sectionItems = [
  { label: 'Métier', href: '#metier' },
  { label: 'Immersion', href: '#pratique' },
  { label: 'Programme', href: '#programme' },
  { label: 'Examen', href: '#examen' },
  { label: 'Dates & tarifs', href: '#dates-tarifs' },
  { label: 'Inscriptions', href: '#inscription-financement' },
  { label: 'Débouchés', href: '#debouches' },
  { label: 'FAQ', href: '#faq-aps' },
] as const;

export function ApsSectionNavigation({ registrationHref }: { registrationHref: string }) {
  return (
    <TrainingSectionNavigation
      mark="APS"
      title="TFP APS"
      items={sectionItems}
      registrationHref={registrationHref}
      registrationLabel="Je m’inscris"
      theme="blue"
      ariaLabel="Sommaire de la formation"
    />
  );
}
