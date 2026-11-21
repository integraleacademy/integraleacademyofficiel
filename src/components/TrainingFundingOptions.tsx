import { ApsFundingLogo } from './ApsExperienceSections';
import editorial from './ApsEditorial.module.css';

export function TrainingFundingOptions({ options, heading = 'Quatre voies, un accompagnement personnalisé', textOnly = false }: { options: ReadonlyArray<readonly [string, string] | string[]>; heading?: string; textOnly?: boolean }) {
  return <article className={editorial.options}>
    <header>{!textOnly && <p className={editorial.kicker}>Solutions possibles</p>}
      <h3>{heading}</h3>
    </header>
    <div className={editorial.optionGrid}>
      {options.map(([title, text]) => (
        <div className={textOnly ? editorial.textOption : editorial.option} key={title}>
          {!textOnly && <div className={editorial.logo}><ApsFundingLogo title={title} /></div>}
          <div><h4>{title}</h4><p>{text}</p></div>
        </div>
      ))}
    </div>
  </article>;
}
