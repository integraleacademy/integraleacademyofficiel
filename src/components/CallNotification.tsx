'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ContactMotion } from './ContactMotion';
import styles from './AcademyNotification.module.css';

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.55 3.6.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.45.55 3.57a1 1 0 0 1-.25 1.02L6.6 10.8Z" />
  </svg>;
}

export function CallNotification({ href }: { href: string }) {
  const [dismissed, setDismissed] = useState(false);

  return <ContactMotion className={styles.callFrame}>
    {dismissed ? <div className={styles.dismissed} role="status">
      <p>Proposition d’appel masquée.</p>
      <button type="button" onClick={() => setDismissed(false)}>Afficher la proposition de Cassandre</button>
    </div> : <div id="appel-cassandre" className={styles.call} data-contact-reveal role="group" aria-label="Rendez-vous téléphonique avec Cassandre">
      <Image className={styles.callerAvatar} src="/images/team/cassandre-telephone.webp" width={256} height={256} sizes="(max-width: 600px) 80px, 140px" alt="" />
      <div className={styles.caller}>
        <p className={styles.callerName}>Cassandre</p>
        <p className={styles.callText}>vous propose un appel pour parler de votre projet…</p>
      </div>
      <div className={styles.callActions}>
        <button type="button" className={styles.decline} onClick={() => setDismissed(true)} aria-label="Masquer la proposition d’appel" title="Masquer la proposition d’appel"><PhoneIcon /></button>
        <a className={styles.accept} href={href} aria-label="Choisir un rendez-vous téléphonique avec Cassandre" title="Choisir un rendez-vous téléphonique"><PhoneIcon /></a>
      </div>
    </div>}
  </ContactMotion>;
}
