import { faqTopics, type FaqTopic } from '@/data/faq/topics';
import type { CatalogueQuestion } from '@/data/faq/catalogue';

function normalize(value: string) {
  return value.toLocaleLowerCase('fr').normalize('NFD').replace(/\p{M}/gu, '').replace(/œ/g, 'oe').replace(/[^a-z0-9]+/g, ' ').trim();
}

export function findFaqGroups(questions: Record<FaqTopic, readonly CatalogueQuestion[]>, selected: FaqTopic | undefined, query: string) {
  const tokens = normalize(query).split(' ').filter(Boolean);
  const seen = new Set<string>();
  return faqTopics.filter(topic => !selected || topic.id === selected).map(topic => {
    const items = questions[topic.id];
    if (!tokens.length) return { topic, items };
    const matches = items.filter(item => {
      const content = normalize([topic.label, topic.family, item.q, item.a, ...(item.links ?? []).map(link => link.label)].join(' '));
      if (!tokens.every(word => content.includes(word))) return false;
      const key = JSON.stringify([item.q, item.a, item.links]);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { topic, items: matches };
  }).filter(group => group.items.length > 0);
}
