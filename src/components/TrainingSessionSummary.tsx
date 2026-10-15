import styles from './TrainingSessionSummary.module.css';

export type TrainingSessionFact = {
  label: string;
  value: string;
  details?: readonly string[];
};

export function TrainingSessionSummary({ facts, location, locationNote }: {
  facts: readonly TrainingSessionFact[];
  location: string;
  locationNote?: string;
}) {
  const items = [...facts, { label: 'Lieu de formation', value: location, details: locationNote ? [locationNote] : [] }];
  return <dl data-session-details className={styles.facts} aria-label="La formation en bref">
    {items.map(({ label, value, details }) => <div key={label} className={styles.fact}>
      <dt>{label}</dt>
      <dd><strong>{value}</strong>{details?.map(detail => <span key={detail}>{detail}</span>)}</dd>
    </div>)}
  </dl>;
}
