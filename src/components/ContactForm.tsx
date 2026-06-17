'use client';

import { useState } from 'react';
import { bts, formations, contact } from '@/data/site';

export function ContactForm({ type = 'candidat' }: { type?: string }) {
  const [sent, setSent] = useState(false);
  const options = [...formations.map((f) => f.title), ...bts.map((f) => f.title)];

  return (
    <form
      className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-academy-line"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${type}-nom`} label="Nom" hint="Votre nom" />
        <Field id={`${type}-prenom`} label="Prénom" hint="Votre prénom" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${type}-telephone`} label="Téléphone" hint="04 00 00 00 00" type="tel" />
        <Field id={`${type}-email`} label="Email" hint="vous@email.fr" type="email" />
      </div>
      <label className="grid gap-2 text-sm font-semibold" htmlFor={`${type}-formation`}>
        Formation souhaitée
        <select id={`${type}-formation`} name="formation" className="rounded-2xl border border-academy-line bg-white px-4 py-3 font-normal text-stone-700" required>
          <option value="">Sélectionner une formation</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold" htmlFor={`${type}-lieu`}>
        Lieu souhaité
        <select id={`${type}-lieu`} name="lieu" className="rounded-2xl border border-academy-line bg-white px-4 py-3 font-normal text-stone-700" required>
          <option value="">Sélectionner un lieu</option>
          {contact.locations.map((location) => <option key={location.id}>{location.name}</option>)}
          <option>À distance</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold" htmlFor={`${type}-message`}>
        Message
        <textarea id={`${type}-message`} name="message" className="min-h-32 rounded-2xl border border-academy-line px-4 py-3 font-normal text-stone-700" aria-label="Votre demande" />
      </label>
      <label className="flex gap-3 rounded-2xl bg-academy-bg p-4 text-sm text-stone-700" htmlFor={`${type}-rgpd`}>
        <input id={`${type}-rgpd`} name="rgpd" type="checkbox" required className="mt-1 h-4 w-4 accent-academy-gold" />
        <span>J’accepte que mes informations soient utilisées pour être recontacté au sujet de ma demande de formation.</span>
      </label>
      <button className="rounded-full bg-academy-ink px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-soft" type="submit">Envoyer la demande</button>
      {sent && <p className="rounded-2xl bg-academy-green/10 p-4 text-sm font-semibold text-green-700" role="status">Votre demande est prête à être transmise. Un conseiller prendra contact avec vous dans les meilleurs délais.</p>}
    </form>
  );
}

function Field({ id, label, hint, type = 'text' }: { id: string; label: string; hint: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold" htmlFor={id}>
      {label}
      <input id={id} name={id} type={type} aria-label={hint} required className="rounded-2xl border border-academy-line px-4 py-3 font-normal text-stone-700" />
    </label>
  );
}
