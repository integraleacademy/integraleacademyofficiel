'use client';

import { useEffect, useMemo, useState } from 'react';

type SessionRow = any;
const sessionStatuses = ['OPEN', 'FULL', 'COMING_SOON', 'HIDDEN'];

type DbHealth = { ok: boolean; hasDatabaseUrl: boolean; canConnectToDatabase: boolean; trainingsCount: number; sessionsCount: number; error?: string };

const displayDate = (value: any) => value ? new Date(value).toLocaleDateString('fr-FR') : '';
const inputDate = (value: any) => value ? new Date(value).toISOString().slice(0, 10) : '';

function serialize(row: SessionRow) {
  return {
    trainingId: row.trainingId,
    title: row.title,
    startDate: inputDate(row.startDate),
    endDate: inputDate(row.endDate),
    examDate: inputDate(row.examDate),
    priceCents: row.priceCents,
    priceLabel: row.priceLabel,
    location: row.location || '',
    status: row.status,
    seatsTotal: row.seatsTotal ?? '',
    seatsLeft: row.seatsLeft ?? '',
    registrationUrl: row.registrationUrl || '',
    fundingNotes: row.fundingNotes || '',
    publicNotes: row.publicNotes || '',
    internalNotes: row.internalNotes || '',
    sortOrder: row.sortOrder || 0,
    isHighlighted: !!row.isHighlighted,
  };
}

export function SessionsClient({ initialRows }: { initialRows: SessionRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [health, setHealth] = useState<DbHealth | null>(null);
  const [message, setMessage] = useState('');
  const canEdit = !!health?.ok;

  async function refreshHealth() {
    const response = await fetch('/api/admin/db-health', { cache: 'no-store' });
    const data = await response.json();
    setHealth(data);
  }

  async function refreshRows() {
    const response = await fetch('/api/admin/sessions', { cache: 'no-store' });
    if (response.ok) setRows(await response.json());
  }

  useEffect(() => { refreshHealth().then(refreshRows).catch(() => setHealth({ ok: false, hasDatabaseUrl: false, canConnectToDatabase: false, trainingsCount: 0, sessionsCount: 0, error: 'Contrôle base de données impossible.' })); }, []);

  function updateLocal(id: string, patch: Record<string, any>) {
    setRows(current => current.map(row => row.id === id ? { ...row, ...patch } : row));
  }

  async function save(row: SessionRow, patch: Record<string, any> = {}) {
    setMessage('');
    const response = await fetch(`/api/admin/sessions/${row.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...serialize(row), ...patch }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setMessage(data.error || 'Enregistrement impossible : la base de données serveur ne répond pas.');
      return;
    }
    const saved = await response.json();
    setRows(current => current.map(item => item.id === saved.id ? saved : item));
    setMessage('Modification enregistrée.');
  }

  async function remove(row: SessionRow) {
    if (!confirm(`Supprimer ${row.title} ?`)) return;
    const response = await fetch(`/api/admin/sessions/${row.id}`, { method: 'DELETE' });
    if (response.ok) setRows(current => current.filter(item => item.id !== row.id));
  }

  async function duplicate(row: SessionRow) {
    const response = await fetch('/api/admin/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...serialize(row), title: `${row.title} (copie)`, sortOrder: (row.sortOrder || 0) + 1 }),
    });
    if (response.ok) {
      const created = await response.json();
      setRows(current => [...current, created]);
    }
  }

  async function addSession() {
    const first = rows[0];
    if (!first) return;
    const response = await fetch('/api/admin/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...serialize(first), title: 'Nouvelle session', status: 'COMING_SOON', seatsLeft: '', seatsTotal: '' }),
    });
    if (response.ok) {
      const created = await response.json();
      setRows(current => [...current, created]);
    }
  }

  const healthMessage = useMemo(() => {
    if (!health) return 'Vérification de la base de données serveur…';
    if (health.ok) return `Base connectée : ${health.trainingsCount} formations · ${health.sessionsCount} sessions.`;
    return health.error || 'Base de données indisponible côté serveur. Vérifiez DATABASE_URL, Prisma et les migrations Render.';
  }, [health]);

  return <>
    <div className={`mt-4 rounded-xl border p-3 text-sm ${canEdit ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>{healthMessage}</div>
    {message ? <p className="mt-3 rounded-xl border bg-white p-3 text-sm text-stone-700">{message}</p> : null}
    <div className="mt-5"><button onClick={addSession} disabled={!canEdit} className="rounded-xl bg-academy-gold px-4 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50">Ajouter</button></div>
    <div className="mt-6 space-y-4">{rows.map(row => <form key={row.id} onSubmit={(event) => { event.preventDefault(); save(row); }} className="rounded-2xl bg-white p-5 shadow">
      <input type="hidden" name="id" value={row.id}/>
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-academy-gold">{row.training?.name}</p><input name="title" value={row.title} onChange={event => updateLocal(row.id, { title: event.target.value })} className="mt-2 w-full rounded-xl border p-3 text-lg font-bold" disabled={!canEdit}/></div><div className="flex flex-wrap gap-2"><button disabled={!canEdit} className="rounded-xl bg-academy-ink px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Enregistrer</button><button type="button" onClick={() => duplicate(row)} disabled={!canEdit} className="rounded-xl border px-4 py-3 font-bold disabled:opacity-50">Dupliquer</button><button type="button" onClick={() => remove(row)} disabled={!canEdit} className="rounded-xl border border-red-200 px-4 py-3 font-bold text-red-700 disabled:opacity-50">Supprimer</button></div></div>
      <div className="mt-4 grid gap-4 md:grid-cols-4"><label className="text-sm font-semibold">Début<input name="startDate" type="date" value={inputDate(row.startDate)} onChange={event => updateLocal(row.id, { startDate: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Fin<input name="endDate" type="date" value={inputDate(row.endDate)} onChange={event => updateLocal(row.id, { endDate: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Examen<input name="examDate" type="date" value={inputDate(row.examDate)} onChange={event => updateLocal(row.id, { examDate: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Statut<select name="status" value={row.status} onChange={event => updateLocal(row.id, { status: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}>{sessionStatuses.map(status => <option key={status} value={status}>{status}</option>)}</select></label><label className="text-sm font-semibold">Tarif centimes<input name="priceCents" type="number" min="0" value={row.priceCents} onChange={event => updateLocal(row.id, { priceCents: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Libellé tarif<input name="priceLabel" value={row.priceLabel} onChange={event => updateLocal(row.id, { priceLabel: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Places totales<input name="seatsTotal" type="number" min="0" value={row.seatsTotal ?? ''} onChange={event => updateLocal(row.id, { seatsTotal: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Places restantes<input name="seatsLeft" type="number" min="0" value={row.seatsLeft ?? ''} onChange={event => updateLocal(row.id, { seatsLeft: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label></div>
      <label className="mt-4 block text-sm font-semibold">Lieu<input name="location" value={row.location || ''} onChange={event => updateLocal(row.id, { location: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="mt-4 block text-sm font-semibold">Lien d'inscription<input name="registrationUrl" value={row.registrationUrl || ''} onChange={event => updateLocal(row.id, { registrationUrl: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label>
      <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => save(row, { status: 'FULL' })} disabled={!canEdit} className="rounded-xl border px-3 py-2 font-bold disabled:opacity-50">Mettre complet</button><button type="button" onClick={() => save(row, { status: 'OPEN' })} disabled={!canEdit} className="rounded-xl border px-3 py-2 font-bold disabled:opacity-50">Mettre ouvert</button><button type="button" onClick={() => save(row, { status: 'HIDDEN' })} disabled={!canEdit} className="rounded-xl border px-3 py-2 font-bold disabled:opacity-50">Masquer</button></div>
      <p className="mt-3 text-xs text-stone-500">Affichage public actuel : du {displayDate(row.startDate)} au {displayDate(row.endDate)} · examen {displayDate(row.examDate) || 'non précisé'} · {row.priceLabel} · {row.seatsLeft ?? '—'} places restantes.</p>
    </form>)}</div>
  </>;
}
