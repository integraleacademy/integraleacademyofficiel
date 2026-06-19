import { NextRequest, NextResponse } from 'next/server';
import { academyFallbackResponse, academyKnowledge } from '@/data/academyKnowledge';

export const runtime = 'nodejs';

const MAX_MESSAGE_LENGTH = 700;
const MAX_HISTORY_MESSAGES = 12;
const MAX_REQUESTS_PER_WINDOW = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwardedFor || request.headers.get('x-real-ip') || 'anonymous';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function sanitizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== 'object') return false;
      const item = message as Partial<ChatMessage>;
      return (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string';
    })
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content.length > 0);
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Configuration OpenAI manquante côté serveur.' }, { status: 500 });
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: 'Trop de demandes en peu de temps. Merci de réessayer dans une minute.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const messages = sanitizeMessages((payload as { messages?: unknown }).messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return NextResponse.json({ error: 'Veuillez saisir une question.' }, { status: 400 });
  }

  if (latestUserMessage.content.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Votre message est trop long. Limite : ${MAX_MESSAGE_LENGTH} caractères.` },
      { status: 400 },
    );
  }

  const systemPrompt = `Tu es l'assistant IA d'Intégrale Academy. Réponds en français comme un conseiller professionnel, clair et rassurant.
Règles strictes :
- Utilise uniquement la base de connaissances fournie ci-dessous.
- N'invente jamais de dates, tarifs, conditions, agréments ou modalités.
- Si l'information n'est pas présente ou incertaine, réponds exactement avec cette réponse de secours : "${academyFallbackResponse}"
- Oriente vers une inscription ou une prise de contact quand c'est pertinent.
- Si l'utilisateur semble intéressé par une formation, tu peux proposer : "Souhaitez-vous laisser vos coordonnées pour être rappelé ?"
- Ne collecte pas de données sensibles dans le chat.

Base de connaissances Intégrale Academy :
${JSON.stringify(academyKnowledge)}`;

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 500,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      }),
    });

    if (!openaiResponse.ok) {
      return NextResponse.json({ reply: academyFallbackResponse }, { status: 200 });
    }

    const data = await openaiResponse.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || academyFallbackResponse;

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: academyFallbackResponse }, { status: 200 });
  }
}
