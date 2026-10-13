'use client';

import { useMemo, useState } from 'react';
import { GOOGLE_REVIEWS_URL, REVIEW_CATEGORIES, matchesReviewCategory, type AdminGoogleReview } from '@/lib/google-reviews';

const inputStyle = 'w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-900';
const buttonStyle = 'rounded-xl bg-academy-ink px-5 py-3 text-sm font-bold text-white disabled:opacity-50';

function CategoryCheckboxes({ categories, onChange, disabled = false }: { categories: string[]; onChange: (categories: string[]) => void; disabled?: boolean }) {
  return <fieldset disabled={disabled}><legend className="mb-3 text-sm font-bold">Formations concernées — plusieurs choix possibles</legend><div className="flex flex-wrap gap-2">
    {REVIEW_CATEGORIES.map(category => <label key={category} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${categories.includes(category) ? 'border-amber-500 bg-amber-50 font-bold' : 'border-stone-200 bg-stone-50'}`}>
      <input type="checkbox" checked={categories.includes(category)} onChange={e => onChange(e.target.checked ? [...categories, category] : categories.filter(c => c !== category))} />{category}
    </label>)}
  </div></fieldset>;
}

function ReviewEditor({ review, onSaved }: { review: AdminGoogleReview; onSaved: (r: AdminGoogleReview) => void }) {
  const [excerpt, setExcerpt] = useState(review.excerpt);
  const [categories, setCategories] = useState(review.categories);
  const [published, setPublished] = useState(review.published);
  const [featured, setFeatured] = useState(review.featured);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const dirty = excerpt !== review.excerpt || published !== review.published || featured !== review.featured || JSON.stringify(categories) !== JSON.stringify(review.categories);

  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage(''); setError(false);
    try {
      const response = await fetch('/api/admin/google-reviews', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: review.id, updatedAt: review.updatedAt, excerpt, categories, published, featured }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Enregistrement impossible.');
      setExcerpt(body.review.excerpt); setCategories(body.review.categories); onSaved(body.review); setMessage('Avis enregistré. La page d’accueil est à jour.');
    } catch (err) { setError(true); setMessage(err instanceof Error ? err.message : 'Connexion interrompue. Vos modifications n’ont pas été enregistrées.'); }
    finally { setBusy(false); }
  }

  return <form onSubmit={save} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm md:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-bold">{review.author}</h2><p className="mt-1 text-sm"><span className="text-amber-600" aria-label="5 étoiles sur 5">★★★★★</span>{review.reviewedAt && <span className="ml-3 text-stone-500">{new Date(review.reviewedAt).toLocaleDateString('fr-FR', { timeZone: 'UTC' })}</span>}</p></div><a className="text-sm font-semibold underline" href={review.sourceUrl} target="_blank" rel="noopener noreferrer">Voir sur Google ↗</a></div>
    <details className="my-4 rounded-xl bg-stone-50 p-3 text-sm"><summary className="cursor-pointer font-semibold">Passage d’origine</summary><p className="mt-2 whitespace-pre-wrap leading-6 text-stone-600">{review.originalText || 'Avis sans commentaire.'}</p><p className="mt-2 text-xs text-stone-500">Le texte intégral reste consultable sur Google.</p></details>
    <fieldset disabled={busy} className="space-y-5">
      <label className="block text-sm font-bold">Extrait affiché sur le site<textarea rows={3} maxLength={700} className={`${inputStyle} mt-2 font-normal`} value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Avis sans commentaire" /><span className="mt-1 block text-xs font-normal text-stone-500">Corrigez l’orthographe en conservant le sens de l’avis. {excerpt.length}/700 caractères.</span></label>
      <CategoryCheckboxes categories={categories} onChange={setCategories} />
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />Afficher sur le site</label><label className="flex items-center gap-2"><input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />Mettre en avant</label>{!categories.length && <span className="font-semibold text-amber-700">Non classé</span>}</div>
    </fieldset>
    <div className="mt-5 flex flex-wrap items-center gap-3"><button className={buttonStyle} disabled={busy || !dirty}>{busy ? 'Enregistrement…' : 'Enregistrer cet avis'}</button>{dirty && !busy && <span className="text-xs text-amber-700">Modifications non enregistrées</span>}<p role={error ? 'alert' : 'status'} className={`text-sm ${error ? 'text-red-700' : 'text-emerald-700'}`}>{message}</p></div>
  </form>;
}

function AddReview({ onAdded }: { onAdded: (r: AdminGoogleReview) => void }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const data = new FormData(form); setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/admin/google-reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(data), categories, rating: 5, featured: false, published: true }) });
      const body = await response.json(); if (!response.ok) throw new Error(body.error || 'Ajout impossible.');
      onAdded(body.review); form.reset(); setCategories([]); setMessage('Avis ajouté et publié.');
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Ajout impossible.'); }
    finally { setBusy(false); }
  }
  return <details className="my-6 rounded-2xl border border-stone-200 bg-white p-5"><summary className="cursor-pointer font-bold">+ Ajouter un avis Google 5 étoiles</summary><form onSubmit={submit} className="mt-5 space-y-4"><fieldset disabled={busy} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Nom affiché sur Google<input name="author" required maxLength={120} className={inputStyle} /></label><label className="text-sm font-bold">Date de l’avis<input name="reviewedAt" type="date" className={inputStyle} /></label></div>
    <label className="block text-sm font-bold">Lien de l’avis Google<input name="sourceUrl" type="url" required className={inputStyle} placeholder={GOOGLE_REVIEWS_URL} /></label>
    <label className="block text-sm font-bold">Texte d’origine<textarea name="originalText" rows={3} maxLength={15000} className={inputStyle} /></label>
    <label className="block text-sm font-bold">Extrait corrigé à afficher<textarea name="excerpt" rows={3} maxLength={700} className={inputStyle} /></label>
    <CategoryCheckboxes categories={categories} onChange={setCategories} />
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" required />J’ai vérifié que cet avis provient de notre fiche Google et est noté 5 étoiles.</label>
    <button className={buttonStyle} disabled={busy}>{busy ? 'Ajout…' : 'Ajouter et publier'}</button>
  </fieldset><p role="status" className="text-sm">{message}</p></form></details>;
}

export function GoogleReviewManager({ initialReviews }: { initialReviews: AdminGoogleReview[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tous');
  const [status, setStatus] = useState('Tous');
  const [limit, setLimit] = useState(12);
  const filtered = useMemo(() => reviews.filter(r => matchesReviewCategory(r, category) &&
    (status === 'Tous' || (status === 'Publiés' ? r.published : !r.published)) &&
    `${r.author} ${r.excerpt} ${r.originalText}`.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr'))), [reviews, query, category, status]);
  const published = reviews.filter(r => r.published).length;
  return <div className="max-w-5xl text-stone-900"><h1 className="text-3xl font-bold">Avis Google</h1><p className="mt-3 leading-7 text-stone-600">Cochez les formations concernées, ajustez l’extrait puis enregistrez chaque avis. Un même avis peut apparaître dans plusieurs catégories.</p><p className="mt-2 text-sm text-stone-500">Les avis sont gérés manuellement. Cette sélection peut être complétée avec le bouton « Ajouter un avis ». <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="underline">Ouvrir la fiche Google</a>.</p>
    <div className="mt-5 flex flex-wrap gap-3 text-sm"><span className="rounded-xl bg-white px-4 py-3 font-bold">{reviews.length} avis 5 étoiles</span><span className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-800">{published} publiés</span><button className="rounded-xl bg-amber-50 px-4 py-3 text-amber-800" onClick={() => { setCategory('Non classés'); setLimit(12); }}>{reviews.filter(r => !r.categories.length).length} à classer</button><a className="rounded-xl bg-white px-4 py-3 underline" href="/#avis-google" target="_blank" rel="noopener noreferrer">Voir le résultat sur le site ↗</a></div>
    <AddReview onAdded={r => { setReviews(current => [r, ...current]); setLimit(12); setQuery(''); setCategory('Tous'); setStatus('Tous'); }} />
    <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]"><label className="text-sm font-semibold">Rechercher<input className={`${inputStyle} mt-1`} type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(12); }} placeholder="Nom ou contenu de l’avis" /></label><label className="text-sm font-semibold">Formation<select className={`${inputStyle} mt-1`} value={category} onChange={e => { setCategory(e.target.value); setLimit(12); }}>{['Tous', 'Non classés', ...REVIEW_CATEGORIES].map(c => <option key={c}>{c}</option>)}</select></label><label className="text-sm font-semibold">Publication<select className={`${inputStyle} mt-1`} value={status} onChange={e => { setStatus(e.target.value); setLimit(12); }}>{['Tous', 'Publiés', 'Masqués'].map(s => <option key={s}>{s}</option>)}</select></label></div>
    <p className="mb-4 text-sm text-stone-500" role="status">{filtered.length} avis correspondant{filtered.length > 1 ? 's' : ''}</p>
    <div className="space-y-5">{reviews.slice().map(r => <div key={r.id} hidden={!filtered.slice(0, limit).some(item => item.id === r.id)}><ReviewEditor review={r} onSaved={saved => setReviews(current => current.map(item => item.id === saved.id ? saved : item))} /></div>)}</div>
    {!filtered.length && <p className="rounded-2xl bg-white p-8 text-center">Aucun avis ne correspond à ces filtres.</p>}
    {filtered.length > limit && <button className={`${buttonStyle} mt-5`} onClick={() => setLimit(n => n + 12)}>Afficher les avis suivants ({filtered.length - limit})</button>}
  </div>;
}
