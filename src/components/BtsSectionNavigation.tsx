import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';

type BtsSectionNavigationProps = {
  code: string;
  competencyHref: '#metier' | '#competences';
  competencyLabel: 'Le métier' | 'Compétences';
  faqHref: `#faq-${string}`;
  registrationHref: string;
};

export function BtsSectionNavigation({
  code,
  competencyHref,
  competencyLabel,
  faqHref,
  registrationHref,
}: BtsSectionNavigationProps) {
  const items = [
    { label: 'Pour qui ?', href: '#pour-qui' },
    { label: competencyLabel, href: competencyHref },
    { label: 'Formats', href: '#formats' },
    { label: 'Alternance', href: '#alternance' },
    { label: 'Programme', href: '#programme' },
    { label: 'Admissions', href: '#admission' },
    { label: 'FAQ', href: faqHref },
  ] as const;

  return (
    <TrainingSectionNavigation
      mark={code}
      title={`BTS ${code}`}
      items={items}
      registrationHref={registrationHref}
      registrationLabel="Je candidate"
      theme="bts"
      externalRegistration
      ariaLabel={`Sommaire du BTS ${code}`}
    />
  );
}
