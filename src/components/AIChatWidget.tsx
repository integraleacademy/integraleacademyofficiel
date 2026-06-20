'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const WELCOME_MESSAGE =
  'Bonjour, je suis l’assistant Intégrale Academy. Je peux vous renseigner sur nos formations, inscriptions, financements CPF, France Travail, CNAPS et examens.';
const MAX_MESSAGE_LENGTH = 700;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();

    if (!content || isLoading) return;
    if (content.length > MAX_MESSAGE_LENGTH) {
      setError(`Votre message est trop long. Limite : ${MAX_MESSAGE_LENGTH} caractères.`);
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data?.error || 'Une erreur est survenue.');

      if (!data?.reply) throw new Error('Le serveur n’a pas retourné de réponse.');

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Le tchat est momentanément indisponible.');

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Tchat IA Intégrale Academy"
          className="reveal flex h-[min(620px,calc(100vh-2.5rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-academy-gold/40 bg-white shadow-2xl dark:border-academy-gold/50 dark:bg-stone-950"
        >
          <div className="flex items-start justify-between gap-4 bg-academy-ink p-4 text-white">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.24em] text-academy-gold">Assistant IA</p>
              <h2 className="mt-1 text-lg font-bold">Intégrale Academy</h2>
              <p className="mt-1 text-xs text-stone-300">Formations, financements, CNAPS et examens</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/20 px-3 py-1 text-sm text-white transition hover:border-academy-gold hover:text-academy-gold"
              aria-label="Fermer le tchat"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-stone-50 p-4 dark:bg-stone-900">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    message.role === 'user'
                      ? 'bg-academy-ink text-white'
                      : 'border border-academy-line bg-white text-academy-ink dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100'
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-academy-line bg-white px-4 py-3 text-sm text-stone-600 shadow-sm dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  <span className="mr-2">L’IA écrit</span>
                  <span className="inline-flex gap-1 align-middle">
                    <span className="ai-typing-dot" />
                    <span className="ai-typing-dot ai-typing-dot-2" />
                    <span className="ai-typing-dot ai-typing-dot-3" />
                  </span>
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 border-t border-academy-line bg-white p-4 dark:border-stone-700 dark:bg-stone-950">
            {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p> : null}
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                placeholder="Écrivez votre question..."
                rows={2}
                className="min-h-12 flex-1 resize-none rounded-2xl border border-academy-line bg-white px-3 py-2 text-sm text-academy-ink shadow-inner transition focus:border-academy-gold dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-2xl bg-academy-gold px-4 py-2 text-sm font-bold text-academy-gold-text shadow-gold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                Envoyer
              </button>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-500">
              Ne transmettez pas de données sensibles dans ce tchat. Pour une demande personnalisée, contactez notre équipe.
            </p>
          </form>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 rounded-full border border-academy-gold/70 bg-academy-ink px-5 py-4 text-white shadow-2xl transition hover:-translate-y-1 hover:shadow-gold"
          aria-label="Ouvrir le tchat IA Intégrale Academy"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-academy-gold text-xl text-academy-gold-text">✦</span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-bold">Assistant IA</span>
            <span className="block text-xs text-stone-300 group-hover:text-white">Une question ?</span>
          </span>
        </button>
      )}
    </div>
  );
}
