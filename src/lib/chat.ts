import { academyFallbackResponse, getRelevantKnowledge } from '@/lib/knowledge';
import { getPrisma } from '@/lib/db';
import { getRelevantDynamicTrainingData } from '@/lib/training-data';

const PRICE_QUESTION_PATTERN = /\b(combien|cout|coût|coute|coûte|prix|tarif)\b/i;
const TARIFF_LINE_PATTERN = /Tarif indiqué\s*:\s*(\d[\d\s]*)\s*€/i;

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatDebugResult = {
  ok: boolean;
  question: string;
  selectedFiles: string[];
  selectedDynamicTrainings: string[];
  selectedSessions: string[];
  stableContextPreview: string;
  dynamicContextPreview: string;
  contextPreview: string;
  rawOpenAIAnswer: string;
  finalAnswer: string;
  fallbackUsed: boolean;
  modelUsed: string;
  contextLength: number;
  finalAnswerLength: number;
};

function formatEuroAmount(amount: string) {
  return Number(amount.replace(/\s/g, '')).toLocaleString('fr-FR');
}

function getReliableExtractedFacts(question: string, context: string) {
  if (!PRICE_QUESTION_PATTERN.test(question)) return '';

  const tariffMatch = context.match(TARIFF_LINE_PATTERN);
  if (!tariffMatch) return '';

  return `Information fiable extraite du contexte : le tarif indiqué est de ${formatEuroAmount(tariffMatch[1])} €.`;
}

function buildSystemPrompt(knowledgeContext: string, dynamicTrainingContext: string, message: string, reliableFacts: string) {
  return `INSTRUCTIONS :
Tu es l’assistant IA officiel d’Intégrale Academy.
Tu réponds comme un conseiller formation professionnel, clair, rassurant, humain et orienté conversion.

Objectif :
- répondre précisément à la question
- utiliser uniquement les informations du contexte
- donner une réponse naturelle et utile
- valoriser la formation sans exagérer
- orienter vers une inscription, un financement ou une prise de contact
- poser une question de relance quand c’est pertinent

Style :
- ton humain, fluide, rassurant
- phrases courtes mais pas robotiques
- réponse développée quand la question le mérite
- ne pas répondre en une seule phrase sèche
- éviter les réponses trop longues sur mobile
- ne pas inventer de dates, tarifs ou conditions

Format recommandé :
- réponse directe dès la première phrase
- 2 à 4 informations utiles
- une phrase de conseil
- un appel à l’action clair

Règles strictes :
- Réponds en français.
- N’invente jamais de dates, tarifs, conditions, agréments, modalités ou places disponibles.
- Pour une question simple, vise environ 120 à 220 mots maximum.
- Tu peux être plus complet pour les sujets complexes comme CPF, France Travail, CNAPS, inscription ou financement.
- Si le CONTEXTE ne contient vraiment pas l’information demandée ou si elle est incertaine, réponds exactement avec cette réponse de secours : "${academyFallbackResponse}"
- Ne collecte pas de données sensibles dans le chat.
${reliableFacts ? `\n${reliableFacts}\nUtilise cette information uniquement comme repère fiable, puis reformule la réponse finale de manière naturelle et commerciale.` : ''}

CONTEXTE STABLE :
${knowledgeContext}

DONNÉES DYNAMIQUES :
${dynamicTrainingContext || 'Aucune donnée dynamique pertinente trouvée.'}

QUESTION DU VISITEUR :
${message}

CONSIGNE FINALE :
Réponds uniquement à partir du contexte. Si le contexte contient l’information demandée, réponds précisément et naturellement. Si le contexte ne contient pas l’information, dis que l’équipe peut confirmer et donne le téléphone 04 22 47 07 68. Ne jamais utiliser les notes internes dans la réponse.`;
}

async function getOpenAIAnswer(messages: ChatMessage[], context: string, dynamicTrainingContext: string, question: string, reliableFacts: string, model: string) {
  if (!process.env.OPENAI_API_KEY) return '';

  const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: Number(process.env.OPENAI_TEMPERATURE || 0.4),
      max_tokens: Number(process.env.OPENAI_MAX_TOKENS || 1100),
      messages: [{ role: 'system', content: buildSystemPrompt(context, dynamicTrainingContext, question, reliableFacts) }, ...messages],
    }),
  });

  if (!openaiResponse.ok) {
    const errorText = await openaiResponse.text();
    console.error('[CHAT] OpenAI response error:', openaiResponse.status, errorText.slice(0, 500));
    return '';
  }

  const data = await openaiResponse.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
}


function lineValue(context: string, label: string) {
  return context.split('\n').find((line) => line.startsWith(`${label}: `))?.slice(label.length + 2);
}

function buildLocalDynamicAnswer(question: string, dynamicContext: string) {
  if (!dynamicContext) return '';
  const q = question.toLowerCase();
  const price = lineValue(dynamicContext, 'Tarif')?.replace(/\s*\(\d+ centimes\)/, '');
  const dates = lineValue(dynamicContext, 'Dates');
  const exam = lineValue(dynamicContext, 'Examen');
  const location = lineValue(dynamicContext, 'Lieu');
  const seats = lineValue(dynamicContext, 'Places restantes');
  const status = lineValue(dynamicContext, 'Statut');
  const link = lineValue(dynamicContext, 'Inscription');
  const notes = lineValue(dynamicContext, 'Notes publiques');
  if (/place|places/.test(q) && seats) return `Il reste actuellement ${seats} place(s) indiquée(s) pour la session APS. La session est au statut ${status || 'non précisé'}${dates ? `, ${dates}` : ''}. Pour bloquer votre place ou vérifier votre dossier, vous pouvez utiliser le lien ${link || 'de la page formation'} ou contacter l’équipe au 04 22 47 07 68.`;
  if (/quand|prochaine|date|debut|début|examen/.test(q) && dates) return `La prochaine session APS indiquée est prévue ${dates}. L’examen est prévu le ${exam || 'non précisé'}. Le statut actuel est ${status || 'non précisé'}${seats ? ` et il reste ${seats} place(s)` : ''}. La formation se déroule à ${location || 'un lieu à confirmer'}. Vous pouvez consulter l’inscription ici : ${link || 'lien non précisé'}.`;
  if (/inscri|rendez|rappel|dossier|financement/.test(q)) return `Oui, vous pouvez avancer sur votre inscription APS : la session indiquée est ${status || 'disponible'}${dates ? `, ${dates}` : ''}. Le lien d’inscription est ${link || 'à confirmer avec l’équipe'}. ${price ? `Le tarif indiqué est ${price}.` : ''} Souhaitez-vous laisser vos coordonnées pour être rappelé par notre équipe ?`;
  if (/combien|coût|cout|coute|coûte|prix|tarif|montant/.test(q) && price) return `Le tarif indiqué pour la formation APS est ${price}. ${notes ? notes + ' ' : ''}La session se déroule à ${location || 'un lieu à confirmer'}${dates ? `, ${dates}` : ''}. Un financement peut être étudié selon votre situation (CPF, France Travail ou financement personnel). Pour vous inscrire ou vérifier votre prise en charge, consultez ${link || 'la page formation'} ou contactez Intégrale Academy au 04 22 47 07 68.`;
  return '';
}

function shouldLogDebug() {
  return process.env.CHAT_DEBUG === 'true' || process.env.OPENAI_DEBUG === 'true';
}

export async function answerChatQuestion(messages: ChatMessage[]): Promise<ChatDebugResult> {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');
  const modelUsed = process.env.OPENAI_MODEL || 'gpt-5.4-mini';

  if (!latestUserMessage) {
    return {
      ok: false,
      question: '',
      selectedFiles: [],
      selectedDynamicTrainings: [],
      selectedSessions: [],
      stableContextPreview: '',
      dynamicContextPreview: '',
      contextPreview: '',
      rawOpenAIAnswer: '',
      finalAnswer: academyFallbackResponse,
      fallbackUsed: true,
      modelUsed,
      contextLength: 0,
      finalAnswerLength: academyFallbackResponse.length,
    };
  }

  const { selectedFiles, context } = await getRelevantKnowledge(latestUserMessage.content);
  const dynamicData = await getRelevantDynamicTrainingData(latestUserMessage.content);
  const dynamicTrainingContext = dynamicData.context;
  const combinedContext = [context, dynamicTrainingContext].filter(Boolean).join('\n\n--- DONNÉES DYNAMIQUES ---\n\n');
  const reliableFacts = getReliableExtractedFacts(latestUserMessage.content, combinedContext);

  let rawAnswer = '';
  try {
    rawAnswer = await getOpenAIAnswer(messages, context, dynamicTrainingContext, latestUserMessage.content, reliableFacts, modelUsed);
  } catch (error) {
    console.error('[CHAT] OpenAI request failed:', error);
  }

  const finalAnswer = rawAnswer || buildLocalDynamicAnswer(latestUserMessage.content, dynamicTrainingContext) || academyFallbackResponse;
  const fallbackUsed = finalAnswer === academyFallbackResponse;

  if (shouldLogDebug()) {
    console.log('[CHAT DEBUG]', {
      modelUsed,
      selectedFiles,
      contextLength: combinedContext.length,
      finalAnswerLength: finalAnswer.length,
      fallbackUsed,
    });
  }

  try { const p = await getPrisma(); if (p) await p.chatConversationLog.create({data:{userMessage: latestUserMessage.content, assistantAnswer: finalAnswer, selectedKnowledgeFiles: selectedFiles.join(','), selectedSessions: dynamicData.selectedSessions.join(',')}}); } catch (e) { console.warn('[CHAT] log skipped', e); }

  return {
    ok: true,
    question: latestUserMessage.content,
    selectedFiles,
    selectedDynamicTrainings: dynamicData.selectedDynamicTrainings,
    selectedSessions: dynamicData.selectedSessions,
    stableContextPreview: context.slice(0, 1000),
    dynamicContextPreview: dynamicTrainingContext.slice(0, 1000),
    contextPreview: combinedContext.slice(0, 1000),
    rawOpenAIAnswer: rawAnswer,
    finalAnswer,
    fallbackUsed,
    modelUsed,
    contextLength: combinedContext.length,
    finalAnswerLength: finalAnswer.length,
  };
}
