import { ApsFundingLogo } from './ApsExperienceSections';
import editorial from './ApsEditorial.module.css';

export function TrainingFundingOptions({ options }: { options: string[][] }) {
  return <article className={editorial.options}>
    <header><p className={editorial.kicker}>Solutions possibles</p>
      <h3>Quatre voies, un accompagnement personnalisé</h3>
    </header>
    <div className={editorial.optionGrid}>
      {options.map(([title, text]) => (
        <div className={editorial.option} key={title}>
          <div className={editorial.logo}><ApsFundingLogo title={title} /></div>
          <div><h4>{title}</h4><p>{text}</p></div>
        </div>
      ))}
    </div>
  </article>;
}
