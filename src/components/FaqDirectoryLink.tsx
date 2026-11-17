'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faqHref, faqTopics } from '@/data/faq/topics';
import styles from './FaqDirectoryLink.module.css';

export function FaqDirectoryLink({ embedded = false }: { embedded?: boolean }) {
  const path = usePathname()?.replace(/\/+$/, '') || '/';
  if (path === '/faq' || path === '/gestion' || path.startsWith('/admin/')) return null;
  const topic = faqTopics.find(item => item.path === path);
  const hasFaqSection = Boolean(topic && topic.id !== 'bts');
  if (embedded !== hasFaqSection) return null;

  const related = topic ?? (path.startsWith('/financements/') ? faqTopics.find(item => item.id === 'financements')
    : path === '/dossiersbts' ? faqTopics.find(item => item.id === 'bts') : undefined);
  const heading = related && related.id !== 'general' ? related.label : 'Questions fréquentes';
  return <aside className={embedded ? styles.embedded : styles.section} aria-label="Accès aux questions fréquentes">
    <Link className={styles.card} href={faqHref(related?.id === 'general' ? undefined : related?.id)}>
      <span className={styles.icon} aria-hidden="true">?</span>
      <span className={styles.copy}><strong>{heading}</strong><span>Consulter la FAQ {related && related.id !== 'general' ? 'de cette rubrique' : 'par formation'}</span></span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </Link>
  </aside>;
}
