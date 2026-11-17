'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { faqHref, faqTopics, type FaqTopic } from '@/data/faq/topics';
import styles from './faq.module.css';

const families = [...new Set(faqTopics.map(topic => topic.family))];

export function FaqFilter({ selected }: { selected?: FaqTopic }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return <form action="/faq" method="get" className={styles.filter} aria-busy={pending}>
    <label htmlFor="faq-formation">Filtrer par formation</label>
    <select key={selected ?? 'all'} id="faq-formation" name="formation" defaultValue={selected ?? ''}
      onChange={event => {
        const topic = faqTopics.find(item => item.id === event.target.value);
        startTransition(() => router.push(faqHref(topic?.id), { scroll: false }));
      }}>
      <option value="">Toutes les formations et thématiques</option>
      {families.map(family => <optgroup label={family} key={family}>
        {faqTopics.filter(topic => topic.family === family).map(topic => <option key={topic.id} value={topic.id}>{topic.label}</option>)}
      </optgroup>)}
    </select>
    <noscript><button type="submit">Afficher les questions</button></noscript>
  </form>;
}
