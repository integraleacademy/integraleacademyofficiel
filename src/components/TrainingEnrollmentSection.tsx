import type { ReactNode } from 'react';
import { TrainingReferenceAction } from './TrainingReferenceLayout';
import { TrainingFundingOptions } from './TrainingFundingOptions';
import editorial from './ApsEditorial.module.css';

type EnrollmentAction = { href: string; label: string };
type EnrollmentStep = string | { title: string; description: ReactNode };

export function TrainingEnrollmentSection({ number, title, intro, steps, registration, registrationAnchor = 'inscription', fundingTitle, fundingNote, funding, options, optionsHeading = 'Les solutions selon votre projet', showFundingSimulator = true, textOnlyOptions = false, children }: {
  number: string; title: string; intro: ReactNode; steps: readonly EnrollmentStep[]; registration: EnrollmentAction;
  registrationAnchor?: string | null; fundingTitle: string; fundingNote: ReactNode; funding: EnrollmentAction;
  optionsHeading?: string; showFundingSimulator?: boolean; textOnlyOptions?: boolean; options: ReadonlyArray<readonly [string, string] | string[]>; children?: ReactNode;
}) {
  return <section id="inscription-financement" className={editorial.enrollment}><div className={editorial.wrap} id={registrationAnchor ?? undefined}>
    <p className={editorial.kicker}>{number} — Inscription &amp; financement</p>
    <header className={editorial.intro}><div><h2><span>{title}</span><span>Nous vous accompagnons de A à Z</span></h2><p>{intro}</p></div>
      <TrainingReferenceAction href={registration.href}>{registration.label}</TrainingReferenceAction></header>
    <ol className={editorial.steps}>{steps.map((step, index) => {
      const title = typeof step === 'string' ? step : step.title;
      return <li key={title}><span className={editorial.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
        {typeof step === 'string' ? <h3>{step}</h3> : <div><h3>{title}</h3><p>{step.description}</p></div>}
      </li>;
    })}</ol>
    <article className={editorial.funding}><div><p className={editorial.kicker}>Votre financement</p><h3>{fundingTitle}</h3></div>
      <div className={editorial.identity}>{fundingNote}</div>
      <div className={editorial.fundingActions}><TrainingReferenceAction href={funding.href}>{funding.label}</TrainingReferenceAction>
        {showFundingSimulator && <TrainingReferenceAction outline href="/financements#simulateur">Ouvrir le simulateur →</TrainingReferenceAction>}</div></article>
    <TrainingFundingOptions options={options} heading={optionsHeading} textOnly={textOnlyOptions} />
    {children}
  </div></section>;
}
