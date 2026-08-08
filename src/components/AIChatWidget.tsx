'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const WELCOME_MESSAGE =
  'Bonjour, je suis l’assistant Intégrale Academy. Posez votre question : formation, tarif, financement, inscription, CNAPS ou examen.';
const MAX_MESSAGE_LENGTH = 700;

type QuickAction = { label: string; value: string; opensCallbackForm?: boolean };

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  quickActions?: QuickAction[];
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showLeadForm, isOpen]);

  async function sendMessage(content: string) {
    const cleanContent = content.trim();
    if (!cleanContent || isLoading) return;
    if (cleanContent.length > MAX_MESSAGE_LENGTH) {
      setError(`Votre message est trop long. Limite : ${MAX_MESSAGE_LENGTH} caractères.`);
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: cleanContent }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data?.error || 'Une erreur est survenue.');
      if (!data?.answerText && !data?.reply) throw new Error('Le serveur n’a pas retourné de réponse.');

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: data.answerText || data.reply, quickActions: data.quickActions || [] },
      ]);
      setShowLeadForm(Boolean(data.showCallbackForm));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Le tchat est momentanément indisponible.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleQuickAction(action: QuickAction) {
    if (action.opensCallbackForm) {
      setShowLeadForm(true);
      setLeadSent(false);
      return;
    }
    sendMessage(action.value);
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch('/api/chat/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      setError('Impossible de transmettre vos coordonnées pour le moment. Vous pouvez appeler le 04 22 47 07 68.');
      return;
    }
    setLeadSent(true);
    setShowLeadForm(false);
    setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: 'Merci, votre demande a bien été transmise. L’équipe Intégrale Academy pourra vous recontacter rapidement.' }]);
    form.reset();
  }

  return (
    <div className={isOpen ? 'fixed inset-0 z-50 flex items-center justify-center bg-academy-ink/45 p-3 backdrop-blur-sm sm:p-6' : 'fixed bottom-4 right-3 z-50 sm:bottom-6 sm:right-6'}>
      {isOpen ? (
        <section
          aria-label="Tchat IA Intégrale Academy"
          className="reveal flex h-[min(760px,calc(100vh-1.5rem))] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-academy-gold/40 bg-white shadow-2xl dark:border-academy-gold/50 dark:bg-stone-950 sm:h-[min(780px,calc(100vh-3rem))]"
        >
          <div className="flex items-start justify-between gap-4 bg-academy-ink p-4 text-white sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.24em] text-academy-gold">Assistant IA</p>
              <h2 className="mt-1 text-xl font-bold sm:text-2xl">Intégrale Academy</h2>
              <p className="mt-1 text-xs text-stone-300 sm:text-sm">Réponses courtes, financement, inscription</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:border-academy-gold hover:text-academy-gold" aria-label="Réduire le tchat">Réduire</button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-stone-50 p-4 dark:bg-stone-900 sm:p-6">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[74%] sm:text-base shadow-sm ${message.role === 'user' ? 'bg-academy-ink text-white' : 'border border-academy-line bg-white text-academy-ink dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100'}`}>
                  <p className="whitespace-pre-line">{message.content}</p>
                  {message.role === 'assistant' && message.quickActions?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickActions.map((action) => (
                        <button key={action.label} type="button" onClick={() => handleQuickAction(action)} className="rounded-full border border-academy-gold/50 bg-academy-gold-soft px-3 py-2 text-left text-xs font-black text-academy-gold-text transition hover:-translate-y-0.5 hover:bg-academy-gold">
                          {action.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {showLeadForm && !leadSent ? (
              <form onSubmit={handleLeadSubmit} className="rounded-2xl border border-academy-gold/45 bg-white p-3 text-xs shadow-card dark:border-academy-gold/50 dark:bg-stone-800">
                <p className="font-black text-academy-ink dark:text-white">Être rappelé par l’équipe</p>
                <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-300">Formulaire court — un conseiller revient vers vous.</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <input name="firstName" required placeholder="Prénom" className="rounded-xl border p-2 dark:bg-stone-900" />
                  <input name="lastName" required placeholder="Nom" className="rounded-xl border p-2 dark:bg-stone-900" />
                  <input name="phone" required placeholder="Téléphone" className="rounded-xl border p-2 dark:bg-stone-900" />
                  <input name="email" type="email" required placeholder="Email" className="rounded-xl border p-2 dark:bg-stone-900" />
                </div>
                <input name="trainingInterest" placeholder="Formation souhaitée" className="mt-2 w-full rounded-xl border p-2 dark:bg-stone-900" />
                <textarea name="message" placeholder="Votre demande" className="mt-2 w-full rounded-xl border p-2 dark:bg-stone-900" rows={2} />
                <button className="mt-2 w-full rounded-xl bg-academy-gold px-3 py-2 font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5">Transmettre ma demande</button>
              </form>
            ) : null}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="ai-typing-bubble rounded-2xl border border-academy-line bg-white px-4 py-3 text-sm text-stone-600 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  <span className="mr-2">L’assistant écrit</span><span className="inline-flex gap-1 align-middle"><span className="ai-typing-dot" /><span className="ai-typing-dot ai-typing-dot-2" /><span className="ai-typing-dot ai-typing-dot-3" /></span>
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 border-t border-academy-line bg-white p-4 dark:border-stone-700 dark:bg-stone-950 sm:p-6">
            {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p> : null}
            <div className="flex items-stretch gap-2">
              <textarea value={input} onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))} placeholder="Écrivez votre question..." rows={3} className="min-h-16 flex-1 resize-none rounded-2xl border border-academy-line bg-white px-4 py-3 text-sm text-academy-ink shadow-inner transition focus:border-academy-gold dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 sm:text-base" />
              <button type="submit" disabled={isLoading || !input.trim()} className="shrink-0 rounded-2xl bg-academy-gold px-5 py-3 text-sm font-black text-academy-gold-text shadow-gold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:px-6 sm:text-base">Envoyer</button>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-500">Ne transmettez pas de données sensibles dans ce tchat.</p>
          </form>
        </section>
      ) : (
        <button type="button" onClick={() => setIsOpen(true)} className="group flex items-center gap-3 rounded-full border border-academy-gold/70 bg-academy-ink px-5 py-4 text-white shadow-2xl transition hover:-translate-y-1 hover:shadow-gold" aria-label="Ouvrir le tchat IA Intégrale Academy">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-academy-gold text-xl text-academy-gold-text">✦</span>
          <span className="hidden text-left sm:block"><span className="block text-sm font-bold">Assistant IA</span><span className="block text-xs text-stone-300 group-hover:text-white">Une question ?</span></span>
        </button>
      )}
    </div>
  );
}
