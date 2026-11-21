import Image from 'next/image';
import type { ReactNode } from 'react';
import { ContactMotion } from './ContactMotion';
import styles from './AdviserCallBanner.module.css';

type AdviserCallBannerProps = {
  adviser: { name: string; role: string; phone: string; phoneHref: string };
  illustration: string;
  message: string;
  href: string;
  label: string;
  children?: ReactNode;
};

export function AdviserCallBanner({ adviser, illustration, message, href, label, children }: AdviserCallBannerProps) {
  return <ContactMotion className={styles.wrap}>
    <div id="rendez-vous-telephonique" data-contact-reveal className={styles.banner}>
      <div className={styles.art} aria-hidden="true">
        <Image src={illustration} width={384} height={384} sizes="(max-width: 620px) 76px, (max-width: 1000px) 135px, 180px" alt="" className={styles.portrait} />
      </div>
      <div className={styles.identity}>
        <p className={styles.byline}><strong>{adviser.name}</strong><span>{adviser.role}</span></p>
        <h3 className={styles.title}>On s’appelle&nbsp;?</h3>
      </div>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <a className={styles.booking} href={href}>
          {label}<span aria-hidden="true">→</span>
        </a>
        <a className={styles.direct} href={adviser.phoneHref}>Ou appelez le {adviser.phone}</a>
        {children}
      </div>
    </div>
  </ContactMotion>;
}
