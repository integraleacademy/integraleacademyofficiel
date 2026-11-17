'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faqHref, faqTopics } from '@/data/faq/topics';
import type { FAQTheme } from './FAQ';
import styles from './FaqDirectoryLink.module.css';

type Props = { embedded?: boolean; id?: string; theme?: FAQTheme };

export function FaqDirectoryLink({ embedded = false, id, theme = 'gold' }: Props) {
  const path = usePathname()?.replace(/\/+$/, '') || '/';
  if (path === '/faq' || path === '/gestion' || path.startsWith('/admin')) return null;
  const topic = faqTopics.find(item => item.path === path);
  if (!embedded && topic && topic.id !== 'bts') return null;

  const related = topic?.id ?? (path.startsWith('/financements/') ? 'financements' : path === '/dossiersbts' ? 'bts' : undefined);
  const filter = related === 'general' ? undefined : related;
  const label = faqTopics.find(item => item.id === filter)?.label;

  return <aside id={id ?? (embedded ? undefined : 'questions-frequentes')} className={styles.section} data-entry-theme={theme} aria-label="Accès aux questions fréquentes">
    <div className={styles.copy}>
      <h2 className={styles.title}>Questions <em>fréquentes</em></h2>
      <p>{label ? <>Retrouvez les réponses de la rubrique <strong>{label}</strong>.</> : 'Admission, financement, déroulement des cours… Retrouvez les réponses de l’école pour chaque formation.'}</p>
      <Link href={faqHref(filter)} className={styles.action} aria-label={label ? `Consulter la FAQ · ${label}` : 'Consulter la FAQ'}>
        Consulter la FAQ <span aria-hidden="true">→</span>
      </Link>
    </div>
    <div className={styles.artwork}>
      <Image src="/images/illustrations-2026/campus-accompagnement.webp" fill sizes="(max-width: 660px) 100vw, 50vw" alt="" />
    </div>
  </aside>;
}
