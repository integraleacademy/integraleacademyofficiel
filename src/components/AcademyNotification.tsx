import type { ReactNode } from 'react';
import { ContactMotion } from './ContactMotion';
import { TeamPortrait } from './TeamPortrait';
import styles from './AcademyNotification.module.css';

type AcademyNotificationProps = {
  id: string;
  person: 'cassandre' | 'aurelie';
  children: ReactNode;
};

export function AcademyNotification({ id, person, children }: AcademyNotificationProps) {
  const name = person === 'cassandre' ? 'Cassandre MENARD' : 'Aurélie BAYARD-CHAUSSEZ';

  return <ContactMotion className={styles.messageFrame}>
    <aside id={id} className={styles.message} data-contact-reveal aria-label={`Un message de ${name}`}>
      <TeamPortrait person={person} size={128} sizes="(max-width: 600px) 48px, 72px" className={styles.avatar} style={{ borderRadius: '26%' }} />
      <div className={styles.copy}>
        <p className={styles.sender}><strong>{name}</strong><span>maintenant</span></p>
        <p className={styles.text}>{children}</p>
      </div>
    </aside>
  </ContactMotion>;
}
