'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type TrainingRow = { id: string; name: string; title: string; slug: string };
type SessionRow = any;
const sessionStatuses = ['OPEN', 'FULL', 'COMING_SOON', 'HIDDEN'];
const expectedBaseTrainingsCount = 15;
type DbHealth = { ok: boolean; hasDatabaseUrl: boolean; canConnectToDatabase: boolean; trainingsCount: number; sessionsCount: number; error?: string };

const displayDate = (value: any) => value ? new Date(value).toLocaleDateString('fr-FR') : '';
const inputDate = (value: any) => value ? new Date(value).toISOString().slice(0, 10) : '';
const emptySession = (training?: TrainingRow) => ({ trainingId: training?.id || '', title: '', startDate: '', endDate: '', examDate: '', priceCents: '', priceLabel: '', location: '', status: 'OPEN', seatsTotal: '', seatsLeft: '', registrationUrl: '', fundingNotes: '', publicNotes: '', internalNotes: '', sortOrder: 0, isHighlighted: false });

function serialize(row: SessionRow) {
  return { trainingId: row.trainingId, title: row.title, startDate: inputDate(row.startDate) || row.startDate, endDate: inputDate(row.endDate) || row.endDate, examDate: inputDate(row.examDate) || row.examDate, priceCents: row.priceCents, priceLabel: row.priceLabel, location: row.location || '', status: row.status, seatsTotal: row.seatsTotal ?? '', seatsLeft: row.seatsLeft ?? '', registrationUrl: row.registrationUrl || '', fundingNotes: row.fundingNotes || '', publicNotes: row.publicNotes || '', internalNotes: row.internalNotes || '', sortOrder: row.sortOrder || 0, isHighlighted: !!row.isHighlighted };
}

export function SessionsClient({ initialRows }: { initialRows: SessionRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [trainings, setTrainings] = useState<TrainingRow[]>([]);
  const [draft, setDraft] = useState<SessionRow | null>(null);
  const [health, setHealth] = useState<DbHealth | null>(null);
  const [message, setMessage] = useState('');
  const [selectedTrainingId, setSelectedTrainingId] = useState('all');
  const autoSeedStarted = useRef(false);
  const importInputRef = useRef<HTMLInputElement>(null);
  const canEdit = !!health?.ok;
  const sortedTrainings = [...trainings].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  const visibleRows = selectedTrainingId === 'all' ? rows : rows.filter(row => row.trainingId === selectedTrainingId);
  const selectedTraining = sortedTrainings.find(training => training.id === selectedTrainingId);
  const trainingCounts = rows.reduce<Record<string, number>>((counts, row) => { counts[row.trainingId] = (counts[row.trainingId] || 0) + 1; return counts; }, {});
  const hasTrainings = trainings.length > 0 || (health?.trainingsCount || 0) > 0;

  async function refreshHealth() {
    const response = await fetch('/api/admin/db-health', { cache: 'no-store' });
    const data = await response.json();
    setHealth(data);
    return data as DbHealth;
  }
  async function refreshRows() { const response = await fetch('/api/admin/sessions', { cache: 'no-store' }); if (response.ok) setRows(await response.json()); }
  async function refreshTrainings() { const response = await fetch('/api/admin/trainings', { cache: 'no-store' }); if (response.ok) setTrainings(await response.json()); }
  async function refreshAll() { const [currentHealth] = await Promise.all([refreshHealth(), refreshTrainings(), refreshRows()]); return currentHealth; }

  useEffect(() => {
    refreshAll()
      .then(currentHealth => {
        if (currentHealth.ok && currentHealth.trainingsCount < expectedBaseTrainingsCount && !autoSeedStarted.current) {
          autoSeedStarted.current = true;
          initialize('Complétion automatique des formations de base en cours…');
        }
      })
      .catch(() => setHealth({ ok: false, hasDatabaseUrl: false, canConnectToDatabase: false, trainingsCount: 0, sessionsCount: 0, error: 'Contrôle base de données impossible.' }));
  }, []);

  function updateLocal(id: string, patch: Record<string, any>) { setRows(current => current.map(row => row.id === id ? { ...row, ...patch } : row)); }
  function updateDraft(patch: Record<string, any>) { setDraft((current: any) => ({ ...(current || emptySession(sortedTrainings[0])), ...patch })); }

  async function initialize(progressMessage = 'Initialisation en cours…') {
    setMessage(progressMessage);
    const response = await fetch('/api/admin/seed', { method: 'POST' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(data.error || 'Initialisation impossible.'); return; }
    setMessage(`Formations initialisées : ${data.trainingsCount} formations · ${data.sessionsCount} session(s).`);
    setDraft(null);
    await refreshAll();
  }

  async function save(row: SessionRow, patch: Record<string, any> = {}) {
    setMessage('');
    const response = await fetch(`/api/admin/sessions/${row.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...serialize(row), ...patch }) });
    if (!response.ok) { const data = await response.json().catch(() => ({})); setMessage(data.error || 'Enregistrement impossible.'); return; }
    const saved = await response.json();
    setRows(current => current.map(item => item.id === saved.id ? saved : item));
    setMessage('Modification enregistrée.');
    await refreshHealth();
  }

  async function createSession() {
    if (!draft) return;
    setMessage('');
    const response = await fetch('/api/admin/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(serialize(draft)) });
    if (!response.ok) { const data = await response.json().catch(() => ({})); setMessage(data.error || 'Création impossible.'); return; }
    const created = await response.json();
    setRows(current => [...current, created]);
    setDraft(null);
    setMessage('Session créée.');
    await refreshHealth();
  }

  async function remove(row: SessionRow) {
    if (!confirm(`Supprimer ${row.title} ?`)) return;
    const response = await fetch(`/api/admin/sessions/${row.id}`, { method: 'DELETE' });
    if (response.ok) { setRows(current => current.filter(item => item.id !== row.id)); setMessage('Session supprimée.'); await refreshHealth(); }
  }

  async function duplicate(row: SessionRow) { setDraft({ ...serialize(row), title: `${row.title} (copie)`, sortOrder: (row.sortOrder || 0) + 1 }); }

  async function importExcel(file: File) {
    if (!confirm('Importer ce fichier va écraser toutes les sessions existantes. Continuer ?')) {
      if (importInputRef.current) importInputRef.current.value = '';
      return;
    }
    setMessage('Import Excel en cours…');
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/admin/sessions/excel', { method: 'POST', body: formData });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(data.error || 'Import impossible. Vérifiez que le fichier provient bien du modèle exporté et que les dates sont au format DD/MM/YYYY.');
      if (importInputRef.current) importInputRef.current.value = '';
      return;
    }
    setDraft(null);
    setMessage(`Import terminé : ${data.importedCount || 0} session(s) importée(s). Les anciennes sessions ont été remplacées.`);
    if (importInputRef.current) importInputRef.current.value = '';
    await refreshAll();
  }

  function addSession(training?: TrainingRow) {
    if (!hasTrainings) { setMessage('Veuillez initialiser les formations avant d’ajouter une session.'); return; }
    const trainingForDraft = training || selectedTraining || sortedTrainings[0];
    setDraft(emptySession(trainingForDraft));
    if (trainingForDraft) setSelectedTrainingId(trainingForDraft.id);
  }

  const healthMessage = useMemo(() => {
    if (!health) return 'Vérification de la base de données serveur…';
    if (health.ok) return `Base connectée : ${health.trainingsCount} formations · ${health.sessionsCount} sessions.`;
    return health.error || 'Base de données indisponible côté serveur. Vérifiez DATABASE_URL, Prisma et les migrations Render.';
  }, [health]);

  const fields = (row: SessionRow, onChange: (patch: Record<string, any>) => void, disabled: boolean) => <>
    <label className="text-sm font-semibold">Formation<select value={row.trainingId || ''} onChange={event => onChange({ trainingId: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}>{sortedTrainings.map(training => <option key={training.id} value={training.id}>{training.name}</option>)}</select></label>
    <label className="text-sm font-semibold">Titre<input value={row.title || ''} onChange={event => onChange({ title: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Début<input type="date" value={inputDate(row.startDate) || row.startDate || ''} onChange={event => onChange({ startDate: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Fin<input type="date" value={inputDate(row.endDate) || row.endDate || ''} onChange={event => onChange({ endDate: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Examen<input type="date" value={inputDate(row.examDate) || row.examDate || ''} onChange={event => onChange({ examDate: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Statut<select value={row.status} onChange={event => onChange({ status: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}>{sessionStatuses.map(status => <option key={status} value={status}>{status}</option>)}</select></label>
    <label className="text-sm font-semibold">Tarif centimes<input type="number" min="0" value={row.priceCents ?? ''} onChange={event => onChange({ priceCents: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Libellé tarif<input value={row.priceLabel || ''} onChange={event => onChange({ priceLabel: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Lieu<input value={row.location || ''} onChange={event => onChange({ location: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Places totales<input type="number" min="0" value={row.seatsTotal ?? ''} onChange={event => onChange({ seatsTotal: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Places restantes<input type="number" min="0" value={row.seatsLeft ?? ''} onChange={event => onChange({ seatsLeft: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold">Lien inscription<input value={row.registrationUrl || ''} onChange={event => onChange({ registrationUrl: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold md:col-span-2">Notes publiques<textarea value={row.publicNotes || ''} onChange={event => onChange({ publicNotes: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
    <label className="text-sm font-semibold md:col-span-2">Notes internes<textarea value={row.internalNotes || ''} onChange={event => onChange({ internalNotes: event.target.value })} className="mt-1 w-full rounded-xl border p-3" disabled={disabled}/></label>
  </>;

  return <>
    <div className={`mt-4 rounded-xl border p-3 text-sm ${canEdit ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>{healthMessage}</div>
    {message ? <p className="mt-3 rounded-xl border bg-white p-3 text-sm text-stone-700">{message}</p> : null}
    <div className="mt-5 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-64 flex-1 text-sm font-semibold">Filtrer par formation
          <select value={selectedTrainingId} onChange={event => setSelectedTrainingId(event.target.value)} className="mt-1 w-full rounded-xl border p-3">
            <option value="all">Toutes les formations ({rows.length})</option>
            {sortedTrainings.map(training => <option key={training.id} value={training.id}>{training.name} ({trainingCounts[training.id] || 0})</option>)}
          </select>
        </label>
        <button type="button" onClick={() => addSession()} disabled={!canEdit} className="rounded-xl bg-academy-gold px-4 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50">Ajouter une session{selectedTraining ? ` ${selectedTraining.name}` : ''}</button>
        <a href="/api/admin/sessions/excel" className="rounded-xl border px-4 py-3 font-bold text-stone-800">Exporter le modèle Excel</a>
        <input ref={importInputRef} type="file" accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/xml" onChange={event => { const file = event.target.files?.[0]; if (file) importExcel(file); }} className="hidden"/>
        <button type="button" onClick={() => importInputRef.current?.click()} disabled={!canEdit} className="rounded-xl bg-academy-ink px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Importer Excel et remplacer</button>
        {health && health.ok && health.trainingsCount < expectedBaseTrainingsCount ? <button type="button" onClick={() => initialize()} className="rounded-xl bg-academy-ink px-4 py-3 font-bold text-white">Initialiser / compléter les formations</button> : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setSelectedTrainingId('all')} className={`rounded-full px-3 py-2 text-sm font-bold ${selectedTrainingId === 'all' ? 'bg-academy-ink text-white' : 'border bg-white text-stone-700'}`}>Toutes</button>
        {sortedTrainings.map(training => <button key={training.id} type="button" onClick={() => setSelectedTrainingId(training.id)} className={`rounded-full px-3 py-2 text-sm font-bold ${selectedTrainingId === training.id ? 'bg-academy-ink text-white' : 'border bg-white text-stone-700'}`}>{training.name} · {trainingCounts[training.id] || 0}</button>)}
      </div>
    </div>
    {draft ? <form onSubmit={(event) => { event.preventDefault(); createSession(); }} className="mt-6 rounded-2xl border-2 border-academy-gold bg-white p-5 shadow"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold">Nouvelle session</h2><button className="rounded-xl bg-academy-ink px-4 py-3 font-bold text-white">Créer la session</button></div><div className="mt-4 grid gap-4 md:grid-cols-4">{fields(draft, updateDraft, !canEdit)}</div></form> : null}
    <div className="mt-6 space-y-4">{visibleRows.length === 0 ? <div className="rounded-2xl border border-dashed bg-white p-6 text-center text-stone-600"><p className="font-semibold">Aucune session pour ce filtre.</p><button type="button" onClick={() => addSession()} disabled={!canEdit} className="mt-3 rounded-xl bg-academy-gold px-4 py-3 font-bold disabled:opacity-50">Ajouter la première session</button></div> : null}{visibleRows.map(row => <form key={row.id} onSubmit={(event) => { event.preventDefault(); save(row); }} className="rounded-2xl bg-white p-5 shadow"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-academy-gold">{row.training?.name}</p><input value={row.title} onChange={event => updateLocal(row.id, { title: event.target.value })} className="mt-2 w-full rounded-xl border p-3 text-lg font-bold" disabled={!canEdit}/></div><div className="flex flex-wrap gap-2"><button disabled={!canEdit} className="rounded-xl bg-academy-ink px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Enregistrer</button><button type="button" onClick={() => duplicate(row)} disabled={!canEdit} className="rounded-xl border px-4 py-3 font-bold disabled:opacity-50">Dupliquer</button><button type="button" onClick={() => remove(row)} disabled={!canEdit} className="rounded-xl border border-red-200 px-4 py-3 font-bold text-red-700 disabled:opacity-50">Supprimer</button></div></div><div className="mt-4 grid gap-4 md:grid-cols-4">{fields(row, patch => updateLocal(row.id, patch), !canEdit)}</div><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => save(row, { status: 'FULL' })} disabled={!canEdit} className="rounded-xl border px-3 py-2 font-bold disabled:opacity-50">Mettre complet</button><button type="button" onClick={() => save(row, { status: 'OPEN' })} disabled={!canEdit} className="rounded-xl border px-3 py-2 font-bold disabled:opacity-50">Mettre ouvert</button><button type="button" onClick={() => save(row, { status: 'HIDDEN' })} disabled={!canEdit} className="rounded-xl border px-3 py-2 font-bold disabled:opacity-50">Masquer</button></div><p className="mt-3 text-xs text-stone-500">Affichage public actuel : du {displayDate(row.startDate)} au {displayDate(row.endDate)} · examen {displayDate(row.examDate) || 'non précisé'} · {row.priceLabel} · {row.seatsLeft ?? '—'} places restantes.</p></form>)}</div>
  </>;
}
