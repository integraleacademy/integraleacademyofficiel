import styles from './CampusFormationTags.module.css';

export function CampusFormationTags({ tags }: { tags: readonly string[] }) {
  return (
    <span className={styles.tags}>
      {tags.map(tag => <span key={tag}>{tag}</span>)}
    </span>
  );
}
