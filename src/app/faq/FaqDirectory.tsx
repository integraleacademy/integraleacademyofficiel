'use client';

import { useEffect, useMemo, useState } from 'react';
import { FAQ } from '@/components/FAQ';
import { faqHref, faqTopics, findFaqTopic, type FaqTopic } from '@/data/faq/topics';
import type { CatalogueQuestion } from '@/data/faq/catalogue';
import { findFaqGroups } from '@/lib/faq-search';
import styles from './faq.module.css';

const families = [...new Set(faqTopics.map(topic => topic.family))];

type Props = {
  initialFormation?: FaqTopic;
  initialQuery: string;
  questions: Record<FaqTopic, readonly CatalogueQuestion[]>;
};

export function FaqDirectory({ initialFormation, initialQuery, questions }: Props) {
  const [formation, setFormation] = useState(initialFormation);
  const [query, setQuery] = useState(initialQuery);
  const groups = useMemo(() => findFaqGroups(questions, formation, query), [questions, formation, query]);
  const total = groups.reduce((count, group) => count + group.items.length, 0);
  const selected = faqTopics.find(topic => topic.id === formation);
  const searching = Boolean(query.trim());

  useEffect(() => {
    function restore() {
      const params = new URLSearchParams(window.location.search);
      setFormation(findFaqTopic(params.get('formation')));
      setQuery(params.get('q') ?? '');
    }
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  function update(nextFormation: FaqTopic | undefined, nextQuery: string, push = false) {
    setFormation(nextFormation);
    setQuery(nextQuery);
    const href = faqHref(nextFormation, nextQuery);
    if (href === window.location.pathname + window.location.search) return;
    if (push) window.history.pushState(null, '', href);
    else window.history.replaceState(null, '', href);
  }

  return <>
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <h1>Questions <em>fréquentes</em></h1>
        <p>Retrouvez une réponse sur votre inscription, votre financement ou votre formation.</p>
        <form action="/faq" method="get" role="search" aria-label="Rechercher dans la FAQ" className={styles.filter}
          onSubmit={event => { event.preventDefault(); update(formation, query); }}>
          <div className={styles.field}>
            <label htmlFor="faq-search">Rechercher dans les questions et les réponses</label>
            <div className={styles.searchBox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" strokeLinecap="round" /></svg>
              <input type="search" id="faq-search" name="q" value={query} onChange={event => update(formation, event.target.value)}
                placeholder="CPF, hébergement, examen…" autoComplete="off" />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="faq-formation">Filtrer par formation</label>
            <select id="faq-formation" name="formation" value={formation ?? ''} onChange={event => update(findFaqTopic(event.target.value), query, true)}>
              <option value="">Toutes les formations et thématiques</option>
              {families.map(family => <optgroup label={family} key={family}>
                {faqTopics.filter(topic => topic.family === family).map(topic => <option key={topic.id} value={topic.id}>{topic.label}</option>)}
              </optgroup>)}
            </select>
          </div>
          <noscript><button type="submit">Rechercher</button></noscript>
        </form>
      </div>
    </header>
    <section className={styles.results} aria-label="Résultats de la FAQ">
      <div className={styles.resultsHeader}>
        <h2 aria-live="polite" aria-atomic="true">{searching
          ? `${total} résultat${total === 1 ? '' : 's'}${selected ? ` · ${selected.label}` : ''}`
          : selected?.label ?? 'Toutes les questions'}</h2>
        {(searching || selected) && <a href="/faq" onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault(); update(undefined, '', true);
        }}>{searching ? 'Réinitialiser la recherche' : 'Effacer le filtre'} <span aria-hidden="true">×</span></a>}
      </div>
      {!groups.length && <p className={styles.empty}>Essayez un autre mot, comme « inscription » ou « financement »{selected ? ', ou choisissez une autre formation.' : '.'}</p>}
      {groups.map(({ topic, items }) => selected
        ? <FAQ key={topic.id} theme="gold" items={items} />
        : <details key={`${topic.id}-${searching ? 'search' : 'all'}`} className={styles.group} open={searching || topic.id === 'general'}>
          <summary><span>{topic.label}</span><small>{items.length} question{items.length > 1 ? 's' : ''}</small><i aria-hidden="true" /></summary>
          <FAQ theme="gold" items={items} />
        </details>)}
    </section>
  </>;
}
