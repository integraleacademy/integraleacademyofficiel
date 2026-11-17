import Link from 'next/link';
import { FAQ } from '@/components/FAQ';
import { questionsByTopic } from '@/data/faq/catalogue';
import { faqTopics } from '@/data/faq/topics';
import { createPageMetadata } from '@/lib/seo';
import { FaqFilter } from './FaqFilter';
import styles from './faq.module.css';

export const metadata = createPageMetadata('/faq');

export default async function FaqPage({ searchParams }: { searchParams: Promise<{ formation?: string | string[] }> }) {
  const { formation } = await searchParams;
  const selected = faqTopics.find(topic => topic.id === formation);
  const topics = selected ? [selected] : faqTopics;
  return <div className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div>
          <h1>Questions <em>fréquentes</em></h1>
          <p>Choisissez votre formation pour retrouver les réponses sur l’inscription, le financement ou le déroulement des cours.</p>
        </div>
        <FaqFilter selected={selected?.id} />
      </div>
    </header>
    <div className={styles.results}>
      <div className={styles.resultsHeader}>
        <h2 aria-live="polite">{selected?.label ?? 'Toutes les questions'}</h2>
        {selected && <Link href="/faq" scroll={false}>Effacer le filtre <span aria-hidden="true">×</span></Link>}
      </div>
      {topics.map(topic => {
        const items = questionsByTopic[topic.id];
        if (selected) return <FAQ key={topic.id} theme="gold" items={items} />;
        return <details key={topic.id} className={styles.group} open={topic.id === 'general'}>
          <summary><span>{topic.label}</span><small>{items.length} questions</small><i aria-hidden="true" /></summary>
          <FAQ theme="gold" items={items} />
        </details>;
      })}
    </div>
  </div>;
}
