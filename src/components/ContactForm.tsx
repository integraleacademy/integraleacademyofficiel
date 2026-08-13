'use client';

import { useState } from 'react';
import { bts, formations, contact } from '@/data/site';

export function ContactForm({ type = 'candidat' }: { type?: string }) {
  const [sent, setSent] = useState(false);
  const options = Array.from(new Set([...formations.map((formation) => formation.title), ...bts.map((formation) => formation.title)]));

  return (
    <form
      className="rounded-[2rem] border border-academy-line/70 bg-academy-surface p-5 shadow-[0_28px_90px_rgba(54,40,20,.12)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="border-b border-academy-line/70 pb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-academy-gold-soft/55 px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] text-academy-gold-strong">
          <span className="h-2 w-2 rounded-full bg-academy-gold" />
          Votre demande
        </span>
        <h2 className="mt-4 text-2xl font-black tracking-[-.03em] text-academy-ink dark:text-white sm:text-3xl">Dites-nous où vous en êtes.</h2>
        <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-academy-muted">Quelques informations suffisent pour que notre équipe prépare un premier échange utile et personnalisé.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id={`${type}-nom`} label="Nom" placeholder="Votre nom" autoComplete="family-name" />
        <Field id={`${type}-prenom`} label="Prénom" placeholder="Votre prénom" autoComplete="given-name" />
        <Field id={`${type}-telephone`} label="Téléphone" placeholder="06 00 00 00 00" type="tel" autoComplete="tel" />
        <Field id={`${type}-email`} label="E-mail" placeholder="vous@email.fr" type="email" autoComplete="email" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-academy-ink dark:text-white" htmlFor={`${type}-formation`}>
          Formation souhaitée
          <select id={`${type}-formation`} name="formation" className={fieldClasses} required defaultValue="">
            <option value="" disabled>Sélectionner une formation</option>
            {options.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-academy-ink dark:text-white" htmlFor={`${type}-lieu`}>
          Lieu souhaité
          <select id={`${type}-lieu`} name="lieu" className={fieldClasses} required defaultValue="">
            <option value="" disabled>Sélectionner un lieu</option>
            {contact.locations.map((location) => <option key={location.id}>{location.name}</option>)}
            <option>À distance</option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-black text-academy-ink dark:text-white" htmlFor={`${type}-message`}>
        Votre projet <span className="font-semibold text-academy-muted">(facultatif)</span>
        <textarea
          id={`${type}-message`}
          name="message"
          className={`${fieldClasses} min-h-36 resize-y`}
          placeholder="Votre objectif, votre situation actuelle, vos disponibilités…"
        />
      </label>

      <label className="mt-4 flex cursor-pointer gap-3 rounded-[1.25rem] border border-academy-line/60 bg-academy-bg/70 p-4 text-xs font-semibold leading-5 text-academy-muted" htmlFor={`${type}-rgpd`}>
        <input id={`${type}-rgpd`} name="rgpd" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-academy-gold" />
        <span>J’accepte que mes informations soient utilisées pour être recontacté au sujet de ma demande de formation.</span>
      </label>

      <button className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#101a29] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-soft" type="submit">
        Envoyer ma demande
        <span className="grid h-7 w-7 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-hover:translate-x-1">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </button>

      <p className="mt-4 text-center text-[11px] font-semibold leading-5 text-academy-muted">Vos informations restent confidentielles et sont utilisées uniquement pour traiter votre demande.</p>

      {sent ? (
        <p className="mt-5 rounded-[1.25rem] border border-emerald-600/20 bg-emerald-500/10 p-4 text-sm font-bold leading-6 text-emerald-800" role="status" aria-live="polite">
          Merci, votre demande est prête à être transmise. Un conseiller prendra contact avec vous dans les meilleurs délais.
        </p>
      ) : null}
    </form>
  );
}

const fieldClasses = 'min-h-12 rounded-2xl border border-academy-line bg-academy-elevated px-4 py-3 font-semibold text-academy-ink outline-none transition placeholder:font-medium placeholder:text-academy-muted/55 focus:border-academy-gold focus:ring-4 focus:ring-academy-gold/10 dark:text-white';

function Field({ id, label, placeholder, type = 'text', autoComplete }: { id: string; label: string; placeholder: string; type?: string; autoComplete?: string }) {
  return (
    <label className="grid gap-2 text-sm font-black text-academy-ink dark:text-white" htmlFor={id}>
      {label}
      <input id={id} name={id} type={type} autoComplete={autoComplete} placeholder={placeholder} required className={fieldClasses} />
    </label>
  );
}
