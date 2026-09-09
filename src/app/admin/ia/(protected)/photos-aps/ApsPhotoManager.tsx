'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { APS_PHOTO_MAX_UPLOAD_BYTES, type ApsGallery, type ApsPhoto } from '@/lib/aps-gallery';

const groups: { gallery: ApsGallery; title: string; description: string }[] = [
  { gallery: 'pc-securite', title: 'Le PC sécurité', description: 'Montrez le poste de sécurité et le matériel utilisé pendant la formation.' },
  { gallery: 'ecole', title: 'L’école', description: 'Présentez l’accueil, les salles de cours ou les espaces de pratique.' },
];

async function readResponse(response: Response) {
  if (response.status === 401) throw new Error('Votre session a expiré. Reconnectez-vous à l’administration.');
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || 'L’enregistrement a échoué. Réessayez dans un instant.');
  return data;
}

function PhotoEditor({ gallery, slot, initialPhoto, available }: { gallery: ApsGallery; slot: number; initialPhoto?: ApsPhoto; available: boolean }) {
  const [photo, setPhoto] = useState(initialPhoto);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState(initialPhoto?.caption || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const prefix = `${gallery}-${slot}`;

  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    setError(''); setNotice('');
    const chosen = event.target.files?.[0];
    if (chosen && chosen.size > APS_PHOTO_MAX_UPLOAD_BYTES) {
      setError('La photo doit faire moins de 8 Mo.');
      event.target.value = ''; setFile(undefined); return;
    }
    setFile(chosen);
  }

  function clearFile() {
    setFile(undefined);
    if (fileInput.current) fileInput.current.value = '';
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const form = new FormData();
      form.set('gallery', gallery); form.set('slot', String(slot)); form.set('caption', caption);
      if (file) form.set('photo', file);
      const data = await readResponse(await fetch('/api/admin/aps-photos', { method: 'POST', body: form }));
      if (!data?.photo) throw new Error('La réponse est incomplète. Rechargez la page pour vérifier la photo.');
      setPhoto(data.photo); setCaption(data.photo.caption); clearFile();
      setNotice('Photo enregistrée sur la page APS.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Impossible d’enregistrer la photo.');
    } finally { setBusy(false); }
  }

  async function remove() {
    if (busy || !window.confirm(`Retirer la photo ${slot} de ce bloc ?`)) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await readResponse(await fetch('/api/admin/aps-photos', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ gallery, slot }),
      }));
      setPhoto(undefined); setCaption(''); clearFile(); setNotice('Photo retirée de la page APS.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Impossible de retirer la photo.');
    } finally { setBusy(false); }
  }

  const source = preview || photo?.src;
  return <form onSubmit={save} className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm" aria-labelledby={`${prefix}-title`} aria-busy={busy}>
    <div className="relative flex aspect-[4/3] items-center justify-center bg-stone-200">
      {source ? <Image src={source} alt={caption || `Aperçu de la photo ${slot}`} fill unoptimized sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover" /> : <p className="px-6 text-center text-sm text-stone-600">Emplacement disponible</p>}
      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-stone-900">Photo {slot}</span>
    </div>
    <div className="flex flex-1 flex-col gap-4 p-5">
      <h3 id={`${prefix}-title`} className="text-lg font-bold">Photo {slot} {photo ? '· publiée' : '· à ajouter'}</h3>
      <div>
        <label htmlFor={`${prefix}-file`} className="mb-2 block text-sm font-bold">{photo ? 'Remplacer la photo' : 'Choisir une photo'}</label>
        <input ref={fileInput} id={`${prefix}-file`} type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseFile} disabled={busy || !available} className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-stone-100 file:px-4 file:py-2 file:font-bold file:text-stone-800" />
        {file && <button type="button" onClick={clearFile} disabled={busy} className="mt-2 text-sm text-stone-600 underline">Annuler le choix du fichier</button>}
      </div>
      <div>
        <label htmlFor={`${prefix}-caption`} className="mb-2 block text-sm font-bold">Légende de la photo</label>
        <textarea id={`${prefix}-caption`} value={caption} onChange={(event) => setCaption(event.target.value)} required minLength={3} maxLength={200} rows={3} disabled={busy || !available} aria-describedby={`${prefix}-hint`} className="w-full rounded-xl border border-stone-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder={gallery === 'pc-securite' ? 'Ex. : Le poste de vidéosurveillance utilisé en formation' : 'Ex. : Une salle de cours de notre école'} />
        <p id={`${prefix}-hint`} className="mt-1 text-xs text-stone-500">Décrivez la photo en quelques mots. Cette légende est visible sur le site.</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-3">
        <button type="submit" disabled={busy || !available || (!file && !photo)} className="rounded-full bg-academy-ink px-5 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Mise à jour…' : 'Enregistrer'}</button>
        {photo && <button type="button" onClick={remove} disabled={busy || !available} className="rounded-full border border-red-200 px-4 py-2.5 text-sm font-bold text-red-800 disabled:opacity-50">Retirer</button>}
      </div>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      <p role="status" className="text-sm text-emerald-800">{notice}</p>
    </div>
  </form>;
}

export default function ApsPhotoManager({ initialPhotos, available }: { initialPhotos: ApsPhoto[]; available: boolean }) {
  return <div className="mt-10 space-y-12">
    {groups.map(({ gallery, title, description }) => <section key={gallery} aria-labelledby={`${gallery}-heading`}>
      <h2 id={`${gallery}-heading`} className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-stone-600">{description} Seuls les emplacements renseignés seront affichés.</p>
      <p className="mt-1 text-sm text-stone-500">{gallery === 'pc-securite' ? 'Sans photo, le bloc conserve son illustration pédagogique.' : 'Sans photo ajoutée, le bloc présente la photo de l’accueil.'}</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {[1, 2, 3].map((slot) => <PhotoEditor key={slot} gallery={gallery} slot={slot} available={available} initialPhoto={initialPhotos.find((photo) => photo.gallery === gallery && photo.slot === slot)} />)}
      </div>
    </section>)}
  </div>;
}
