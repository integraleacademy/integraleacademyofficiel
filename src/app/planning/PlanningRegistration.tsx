'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { formatSessionDate, formatSessionPeriod } from '@/lib/public-sessions';
import { planningRegistrationAction } from '@/lib/planning-registration';

export function PlanningRegistration({ session, onClose }: { session: any; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const requestId = useRef('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const action = planningRegistrationAction(session);
  useEffect(() => {
    requestId.current = crypto.randomUUID();
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    node?.showModal();
    return () => { node?.close(); document.body.style.overflow = overflow; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSending(true); setError('');
    try {
      const response = await fetch('/api/planning/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, sessionId: session.id, requestId: requestId.current }) });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'La demande n’a pas pu être enregistrée.');
      setSuccess(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Connexion interrompue. Réessayez.'); }
    finally { setSending(false); }
  }

  return <dialog ref={dialog} onCancel={onClose} aria-labelledby="registration-title" className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto rounded-3xl border border-academy-line bg-academy-surface p-5 text-academy-ink shadow-2xl backdrop:bg-black/50 sm:p-7">
    <div className="flex items-start justify-between gap-4">
      <h2 id="registration-title" className="text-2xl font-black">{success ? 'Votre demande est enregistrée' : action.kind === 'waiting-list' ? 'Demander une place en attente' : action.kind === 'opening' ? 'Se renseigner sur cette session' : 'Votre session sélectionnée'}</h2>
      <button type="button" onClick={onClose} aria-label="Fermer" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xl">×</button>
    </div>
    <div className="my-5 rounded-2xl border border-academy-line bg-academy-bg p-4 text-sm leading-6">
      <p className="font-black">{session.title || session.training?.name}</p>
      <p>{session.location}</p>
      {session.scheduleKind === 'vtc-exam' ? <><p>Inscription avant le {formatSessionDate(session.startDate)}</p><p>Examen théorique le {formatSessionDate(session.endDate)}</p><p>Examen pratique : {session.examDate ? formatSessionDate(session.examDate) : 'à confirmer'}</p></> : <><p>{formatSessionPeriod(session.startDate, session.endDate)}</p>{session.examDate ? <p>Examen le {formatSessionDate(session.examDate)}</p> : null}</>}
    </div>
    {success ? <div role="status"><p className="leading-7">Votre choix et vos coordonnées ont été transmis à notre équipe. Un conseiller vous recontactera pour vérifier les disponibilités, les prérequis et votre financement.</p><p className="mt-3 text-sm text-academy-muted">Votre inscription sera confirmée avec le centre de formation.</p><button type="button" onClick={onClose} className="mt-6 w-full rounded-full bg-academy-ink px-5 py-3 font-bold text-white">Revenir au planning</button></div> : <form onSubmit={submit} className="grid gap-4">
      <p className="text-sm leading-6 text-academy-muted">Indiquez vos coordonnées pour être recontacté au sujet de cette session. Cette demande est sans engagement.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold">Prénom<input name="firstName" autoComplete="given-name" required maxLength={80} className="mt-1 w-full rounded-xl border border-academy-line bg-academy-surface p-3 font-normal" /></label>
        <label className="text-sm font-bold">Nom<input name="lastName" autoComplete="family-name" required maxLength={80} className="mt-1 w-full rounded-xl border border-academy-line bg-academy-surface p-3 font-normal" /></label>
      </div>
      <label className="text-sm font-bold">Adresse e-mail<input name="email" type="email" autoComplete="email" required maxLength={120} className="mt-1 w-full rounded-xl border border-academy-line bg-academy-surface p-3 font-normal" /></label>
      <label className="text-sm font-bold">Téléphone<input name="phone" type="tel" autoComplete="tel" required maxLength={40} minLength={8} className="mt-1 w-full rounded-xl border border-academy-line bg-academy-surface p-3 font-normal" /></label>
      <p className="text-xs leading-5 text-academy-muted">Vos coordonnées servent à traiter votre demande. <Link href="/politique-confidentialite" className="underline">Protection de vos données</Link>.</p>
      {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      <button disabled={sending} className="rounded-full bg-academy-ink px-5 py-3.5 font-bold text-white disabled:opacity-60">{sending ? 'Envoi en cours…' : 'Envoyer ma demande'}</button>
    </form>}
  </dialog>;
}
