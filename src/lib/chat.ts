import { academyFallbackResponse, getRelevantKnowledge } from '@/lib/knowledge';

const PRICE_QUESTION_PATTERN = /\b(combien|cout|coût|coute|coûte|prix|tarif)\b/i;
const TARIFF_LINE_PATTERN = /Tarif indiqué\s*:\s*(\d[\d\s]*)\s*€/i;
const APS_CONTEXT_PATTERN = /formation\s+APS|Agent de Prévention et de Sécurité|Fichier:\s*02-formations-aps\.md/i;

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatDebugResult = {
  ok: boolean;
  question: string;
  selectedFiles: string[];
  contextPreview: string;
  rawOpenAIAnswer: string;
  finalAnswer: string;
  fallbackUsed: boolean;
};

function formatEuroAmount(amount: string) {
  return Number(amount.replace(/\s/g, '')).toLocaleString('fr-FR');
}

function getDeterministicTariffAnswer(question: string, context: string) {
  if (!PRICE_QUESTION_PATTERN.test(question)) return '';

  const tariffMatch = context.match(TARIFF_LINE_PATTERN);
  if (!tariffMatch) return '';

  const amount = formatEuroAmount(tariffMatch[1]);

  if (APS_CONTEXT_PATTERN.test(context)) {
    return `La formation APS est indiquée à ${amount} €. Elle dure 5 semaines, soit 175 heures, à Puget-sur-Argens / Côte d’Azur. Pour confirmer votre financement ou votre inscription, vous pouvez contacter Intégrale Academy au 04 22 47 07 68.`;
  }

  return `Le tarif indiqué est de ${amount} €. Pour confirmer votre financement ou votre inscription, vous pouvez contacter Intégrale Academy au 04 22 47 07 68.`;
}

function buildSystemPrompt(context: string, message: string) {
  return `Tu es l’assistant Intégrale Academy.
Tu dois répondre uniquement à partir du CONTEXTE ci-dessous.
Si le CONTEXTE contient l’information demandée, tu dois répondre directement.
Tu ne dois utiliser la réponse de secours que si le CONTEXTE ne contient pas l’information.

Règles strictes :
- Réponds en français comme un conseiller professionnel, clair et rassurant.
- N'invente jamais de dates, tarifs, conditions, agréments ou modalités.
- Pour une question de tarif, si une ligne "Tarif indiqué" est présente dans le CONTEXTE, donne ce tarif directement.
- Si le CONTEXTE ne contient vraiment pas l'information demandée ou si elle est incertaine, réponds exactement avec cette réponse de secours : "${academyFallbackResponse}"
- Oriente vers une inscription ou une prise de contact quand c'est pertinent.
- Si l'utilisateur semble intéressé par une formation, tu peux proposer : "Souhaitez-vous laisser vos coordonnées pour être rappelé ?"
- Ne collecte pas de données sensibles dans le chat.

CONTEXTE :
${context}

QUESTION :
${message}`;
}

async function getOpenAIAnswer(messages: ChatMessage[], context: string, question: string) {
  if (!process.env.OPENAI_API_KEY) return '';

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
      messages: [{ role: 'system', content: buildSystemPrompt(context, question) }, ...messages],
    }),
  });

  if (!openaiResponse.ok) return '';

  const data = await openaiResponse.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
}

export async function answerChatQuestion(messages: ChatMessage[]): Promise<ChatDebugResult> {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return {
      ok: false,
      question: '',
      selectedFiles: [],
      contextPreview: '',
      rawOpenAIAnswer: '',
      finalAnswer: academyFallbackResponse,
      fallbackUsed: true,
    };
  }

  const { selectedFiles, context } = await getRelevantKnowledge(latestUserMessage.content);

  console.log('[CHAT] Question:', latestUserMessage.content);
  console.log('[CHAT] Selected files:', selectedFiles);
  console.log('[CHAT] Context preview:', context.slice(0, 500));

  const deterministicAnswer = getDeterministicTariffAnswer(latestUserMessage.content, context);
  let rawAnswer = '';
  let finalAnswer = deterministicAnswer;

  if (!finalAnswer) {
    try {
      rawAnswer = await getOpenAIAnswer(messages, context, latestUserMessage.content);
    } catch (error) {
      console.error('[CHAT] OpenAI request failed:', error);
    }

    finalAnswer = rawAnswer || academyFallbackResponse;
  }

  const fallbackUsed = finalAnswer === academyFallbackResponse;

  console.log('[CHAT] Context sent to OpenAI:', context.slice(0, 1000));
  console.log('[CHAT] Raw OpenAI answer:', rawAnswer);
  console.log('[CHAT] Final answer returned:', finalAnswer);

  return {
    ok: true,
    question: latestUserMessage.content,
    selectedFiles,
    contextPreview: context.slice(0, 1000),
    rawOpenAIAnswer: rawAnswer,
    finalAnswer,
    fallbackUsed,
  };
}
