import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './TeamNote.module.css';

type TeamNoteProps = {
  id: string;
  person: 'cassandre' | 'aurelie';
  children: ReactNode;
  action?: { href: string; label: string };
};

export function TeamNote({ id, person, children, action }: TeamNoteProps) {
  const name = person === 'cassandre' ? 'Cassandre' : 'Aurélie';

  return <aside id={id} className={styles.note} aria-labelledby={`${id}-signature`}>
    <div className={styles.bubble}>
      <Image className={styles.avatar} src={`/images/team/${person}.png`} alt="" width={64} height={64} sizes="64px" />
      <p id={`${id}-signature`} className={styles.signature}>
        <strong>{name}</strong><span>Le mot de l’équipe</span>
      </p>
      <p className={styles.message}>{children}</p>
      {action && <a className={styles.action} href={action.href}>{action.label}<span aria-hidden="true">→</span></a>}
    </div>
  </aside>;
}
