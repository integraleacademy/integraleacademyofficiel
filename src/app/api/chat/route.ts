import { NextRequest, NextResponse } from 'next/server';
import { answerChatQuestion, type ChatMessage } from '@/lib/chat';

export const runtime = 'nodejs';

const MAX_MESSAGE_LENGTH = 700;
const MAX_HISTORY_MESSAGES = 12;
const MAX_REQUESTS_PER_WINDOW = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

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

  const result = await answerChatQuestion(messages);
  return NextResponse.json({
    reply: result.structuredAnswer.answerText,
    answerText: result.structuredAnswer.answerText,
    quickActions: result.structuredAnswer.quickActions,
    showCallbackForm: result.structuredAnswer.showCallbackForm,
    suggestedNextStep: result.structuredAnswer.suggestedNextStep,
    intent: result.structuredAnswer.intent,
  });
}
