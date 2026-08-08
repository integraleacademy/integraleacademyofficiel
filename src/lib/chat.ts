import { academyFallbackResponse, getRelevantKnowledge } from '@/lib/knowledge';
import { getPrisma } from '@/lib/db';
import { getRelevantDynamicTrainingData } from '@/lib/training-data';

const PRICE_QUESTION_PATTERN = /\b(prix|tarif|coût|cout|coûte|coute|combien|payer|frais|montant)\b|examen inclus|c[’']est combien|ça coûte combien|ca coute combien|combien ça coute|combien ca coute|combien ça coûte|combien ca coûte/i;
const TARIFF_LINE_PATTERN = /Tarifs? indiqués?\s*:\s*(.*?€(?:.*?€)?)/i;

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatIntent = 'tarif' | 'durée' | 'financement' | 'inscription' | 'programme' | 'examen' | 'CNAPS' | 'rappel' | 'question générale';

export type ChatQuickAction = { label: string; value: string; opensCallbackForm?: boolean };

export type StructuredChatAnswer = {
  answerText: string;
  quickActions: ChatQuickAction[];
  showCallbackForm: boolean;
  suggestedNextStep: string;
  intent: ChatIntent;
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
  structuredAnswer: StructuredChatAnswer;
  fallbackUsed: boolean;
  modelUsed: string;
  contextLength: number;
  finalAnswerLength: number;
};

const CALLBACK_ACTION_LABELS = ['Être rappelé', 'Vérifier mon financement', 'M’inscrire', 'Vérifier mon éligibilité VAE', 'Candidater'];

type TrainingKey = 'aps' | 'a3p' | 'desp' | 'vtc' | 'bts' | 'unknown';

function normalizeText(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function detectChatIntent(question: string): ChatIntent {
  const q = normalizeText(question);
  if (/\b(rappel|rappele|appeler|appelez|contact|telephone|rdv|rendez-vous)\b/.test(q)) return 'rappel';
  if (/\b(inscri|inscription|candidater|candidate|postuler|dossier|reserver)\b/.test(q)) return 'inscription';
  if (/\b(prix|tarif|cout|coute|combien|payer|frais|montant)\b|examen inclus|c[’']est combien|ca coute combien|combien ca coute/.test(q)) return 'tarif';
  if (/\b(financement|financer|cpf|france travail|pole emploi|paiement|prise en charge|aide)\b/.test(q)) return 'financement';
  if (/\b(duree|durée|temps|semaine|semaines|mois|heures|heure|longtemps)\b/.test(q)) return 'durée';
  if (/\b(programme|contenu|module|apprendre|cours)\b/.test(q)) return 'programme';
  if (/\b(examen|epreuve|épreuve|test|qcu|jury)\b/.test(q)) return 'examen';
  if (/\b(cnaps|carte professionnelle|autorisation|agrement|agrément)\b/.test(q)) return 'CNAPS';
  return 'question générale';
}

function detectTraining(question: string): TrainingKey {
  const q = normalizeText(question);
  if (/\b(desp|dssp|dirigeant|vae)\b/.test(q)) return 'desp';
  if (/\b(a3p|apr|protection rapprochee|garde du corps|protection physique)\b/.test(q)) return 'a3p';
  if (/\b(aps|agent de securite|prevention securite)\b/.test(q)) return 'aps';
  if (/\b(vtc|chauffeur|conducteur)\b/.test(q)) return 'vtc';
  if (/\b(bts|alternance|mco|ndrc|mos|immobilier|commerce international)\b/.test(q)) return 'bts';
  return 'unknown';
}


const VTC_PRICE_ANSWER = `La formation Chauffeur VTC coûte 1600 € tout inclus.

Ce tarif comprend :
- la formation théorique en ligne à distance ;
- l’accès e-learning 24h/24 et 7j/7 ;
- le livre officiel VTC ;
- la formation pratique ;
- le prêt du véhicule à doubles-commandes le jour de l’examen ;
- l’essence ;
- les péages ;
- les frais d’examen de 221 €.

Un financement peut être étudié selon votre situation.

Pour avancer sur votre inscription, contactez-nous au 04 22 47 07 68.`;

function isVtcPriceQuestion(question: string) {
  return detectTraining(question) === 'vtc' && detectChatIntent(question) === 'tarif';
}

function action(label: string, value: string): ChatQuickAction {
  return { label, value, opensCallbackForm: CALLBACK_ACTION_LABELS.includes(label) };
}

function buildFallbackStructuredAnswer(intent: ChatIntent): StructuredChatAnswer {
  const answerText = 'Je préfère vous faire confirmer ce point par l’équipe Intégrale Academy pour éviter de vous donner une mauvaise information.';
  return {
    answerText,
    quickActions: [action('Être rappelé', 'Je veux être rappelé'), action('Poser une autre question', 'J’ai une autre question')],
    showCallbackForm: false,
    suggestedNextStep: 'Être rappelé',
    intent,
  };
}

function buildKnownStructuredAnswer(question: string): StructuredChatAnswer | null {
  const intent = detectChatIntent(question);
  const training = detectTraining(question);
  const q = normalizeText(question);
  const isVaeDesp = training === 'desp' && /\bvae\b/.test(q);

  if (training === 'desp') {
    if (intent === 'tarif') return {
      answerText: 'La formation DESP est à 4 300 € en parcours initial.\n\nLa VAE DESP est à 3 800 €.\n\nLe parcours initial dure environ 7 semaines, soit 245 heures. Des financements peuvent être possibles selon votre situation : CPF, France Travail ou paiement en plusieurs fois.\n\nVous voulez que l’on vérifie rapidement votre financement ?',
      quickActions: [action('Voir le programme DESP', 'Voir le programme DESP'), action('Vérifier mon financement', 'Vérifier mon financement DESP'), action('Être rappelé', 'Être rappelé pour le DESP'), action('M’inscrire', 'Je veux m’inscrire en DESP')],
      showCallbackForm: false,
      suggestedNextStep: 'Vérifier mon financement',
      intent,
    };
    if (intent === 'durée' && isVaeDesp) return {
      answerText: 'La VAE DESP dure généralement environ 1 mois, selon l’avancement de votre dossier et les éléments à préparer.\n\nL’équipe peut vous dire rapidement si votre expérience est suffisante pour partir sur une VAE.',
      quickActions: [action('Vérifier mon éligibilité VAE', 'Vérifier mon éligibilité VAE DESP'), action('Être rappelé', 'Être rappelé pour la VAE DESP'), action('Voir la VAE DESP', 'Voir la VAE DESP')],
      showCallbackForm: false,
      suggestedNextStep: 'Vérifier mon éligibilité VAE',
      intent,
    };
    if (intent === 'durée') return {
      answerText: 'Le DESP en parcours initial dure environ 7 semaines, soit 245 heures.\n\nLa VAE DESP dure généralement environ 1 mois, selon votre dossier.\n\nVous hésitez entre l’initial et la VAE ?',
      quickActions: [action('Voir le programme DESP', 'Voir le programme DESP'), action('Vérifier mon éligibilité VAE', 'Vérifier mon éligibilité VAE DESP'), action('Être rappelé', 'Être rappelé pour le DESP')],
      showCallbackForm: false,
      suggestedNextStep: 'Vérifier le parcours adapté',
      intent,
    };
    if (intent === 'inscription' || intent === 'rappel') return {
      answerText: 'Très bien. Pour une inscription en DESP, l’équipe peut vérifier avec vous le parcours le plus adapté : formation initiale ou VAE.\n\nVous pouvez laisser vos coordonnées et nous vous rappelons rapidement.',
      quickActions: [action('Être rappelé', 'Être rappelé pour le DESP'), action('Voir le programme DESP', 'Voir le programme DESP'), action('Vérifier mon financement', 'Vérifier mon financement DESP')],
      showCallbackForm: intent === 'rappel',
      suggestedNextStep: 'Être rappelé',
      intent,
    };
  }

  if (training === 'aps' && intent === 'tarif') return {
    answerText: 'Le tarif de la formation APS dépend du mode de financement et de votre situation.\n\nElle peut être financée selon les cas par CPF, France Travail ou un paiement personnel.\n\nLe plus simple est de vérifier votre situation rapidement pour vous donner le bon montant.',
    quickActions: [action('Vérifier mon financement', 'Vérifier mon financement APS'), action('Voir la formation APS', 'Voir la formation APS'), action('Être rappelé', 'Être rappelé pour APS')],
    showCallbackForm: false,
    suggestedNextStep: 'Vérifier mon financement',
    intent,
  };

  if (training === 'aps') return {
    answerText: 'La formation APS permet de devenir Agent de Prévention et de Sécurité.\n\nC’est une formation réglementée pour accéder aux métiers de la sécurité privée et préparer la carte professionnelle CNAPS.\n\nVous souhaitez plutôt connaître le programme, le financement ou les prochaines étapes d’inscription ?',
    quickActions: [action('Voir la formation APS', 'Voir la formation APS'), action('Vérifier mon financement', 'Vérifier mon financement APS'), action('Être rappelé', 'Être rappelé pour APS')],
    showCallbackForm: false,
    suggestedNextStep: 'Choisir une action APS',
    intent,
  };

  if (/frais.*examen|examen.*inclus/.test(q)) return {
    answerText: `Oui, les frais d’examen VTC de 221 € sont inclus dans le tarif de la formation Chauffeur VTC à 1600 € tout inclus.

Le tarif comprend aussi la théorie en e-learning, la pratique, le livre officiel VTC, le prêt du véhicule à doubles-commandes le jour de l’examen, l’essence et les péages.

Pour avancer sur votre inscription, contactez-nous au 04 22 47 07 68.`,
    quickActions: [action('M’inscrire', 'Je veux m’inscrire en VTC'), action('Être rappelé', 'Être rappelé pour VTC'), action('Voir le programme VTC', 'Voir le programme VTC')],
    showCallbackForm: false,
    suggestedNextStep: 'M’inscrire',
    intent: 'tarif',
  };

  if (training === 'a3p') return {
    answerText: 'La formation A3P prépare au métier d’Agent de Protection Physique des Personnes, aussi appelé protection rapprochée ou garde du corps.\n\nC’est une formation réglementée, avec des conditions à vérifier avant l’entrée en formation.\n\nVous voulez voir le programme ou être rappelé pour vérifier votre profil ?',
    quickActions: [action('Voir la formation A3P', 'Voir la formation A3P'), action('Être rappelé', 'Être rappelé pour A3P')],
    showCallbackForm: false,
    suggestedNextStep: 'Voir la formation A3P',
    intent,
  };

  if (training === 'vtc' && intent === 'durée') return {
    answerText: `La durée totale de la formation Chauffeur VTC est de 105 heures.

Elle comprend 100 heures de formation théorique à distance en e-learning et 5 heures de formation pratique en présentiel.

Pour avancer sur votre inscription, contactez-nous au 04 22 47 07 68.`,
    quickActions: [action('M’inscrire', 'Je veux m’inscrire en VTC'), action('Être rappelé', 'Être rappelé pour VTC'), action('Voir le programme VTC', 'Voir le programme VTC')],
    showCallbackForm: false,
    suggestedNextStep: 'M’inscrire',
    intent,
  };

  if (training === 'vtc' && /\b(pratique|lieu|ou|où|presentiel|présentiel)\b/.test(q)) return {
    answerText: `La pratique VTC se déroule en présentiel sur véhicule homologué à doubles-commandes.

Les lieux de pratique indiqués sont : Nice, Cannes, Toulon et Fréjus. Les lieux exacts et les créneaux sont confirmés lors de l’inscription selon l’organisation de la formation.

Pour avancer sur votre inscription, contactez-nous au 04 22 47 07 68.`,
    quickActions: [action('M’inscrire', 'Je veux m’inscrire en VTC'), action('Être rappelé', 'Être rappelé pour VTC'), action('Voir le programme VTC', 'Voir le programme VTC')],
    showCallbackForm: false,
    suggestedNextStep: 'M’inscrire',
    intent,
  };

  if (training === 'vtc' && intent === 'tarif') return {
    answerText: VTC_PRICE_ANSWER,
    quickActions: [action('M’inscrire', 'Je veux m’inscrire en VTC'), action('Être rappelé', 'Être rappelé pour VTC'), action('Voir le programme VTC', 'Voir le programme VTC')],
    showCallbackForm: false,
    suggestedNextStep: 'M’inscrire',
    intent,
  };

  if (training === 'vtc') return {
    answerText: 'La formation VTC prépare au métier de chauffeur VTC et à l’examen VTC.\n\nUn financement peut être étudié selon votre situation.\n\nVous voulez consulter le programme ou avancer sur une inscription ?',
    quickActions: [action('Voir le programme VTC', 'Voir le programme VTC'), action('Être rappelé', 'Être rappelé pour VTC'), action('M’inscrire', 'Je veux m’inscrire en VTC')],
    showCallbackForm: false,
    suggestedNextStep: 'Voir le programme VTC',
    intent,
  };

  if (training === 'bts') return {
    answerText: 'Les BTS se font en alternance, avec un rythme entre l’école et l’entreprise.\n\nIntégrale Academy accompagne aussi les candidats dans la recherche d’entreprise et la préparation du dossier.\n\nVous voulez recevoir les infos ou candidater ?',
    quickActions: [action('Être rappelé', 'Être rappelé pour un BTS'), action('Recevoir les infos', 'Recevoir les infos BTS'), action('Candidater', 'Candidater en BTS')],
    showCallbackForm: false,
    suggestedNextStep: 'Recevoir les infos BTS',
    intent,
  };

  if (intent === 'financement') return {
    answerText: 'Les financements possibles dépendent de votre formation et de votre situation.\n\nSelon les cas, l’équipe peut étudier le CPF, France Travail ou un paiement en plusieurs fois.\n\nVous voulez que l’on vérifie rapidement la solution la plus adaptée ?',
    quickActions: [action('Vérifier mon financement', 'Vérifier mon financement'), action('Être rappelé', 'Être rappelé pour le financement'), action('Poser une autre question', 'J’ai une autre question')],
    showCallbackForm: false,
    suggestedNextStep: 'Vérifier mon financement',
    intent,
  };

  return null;
}

function toStructuredAnswer(answerText: string, question: string): StructuredChatAnswer {
  const intent = detectChatIntent(question);
  if (answerText === academyFallbackResponse) return buildFallbackStructuredAnswer(intent);
  const quickActions = intent === 'inscription' || intent === 'rappel'
    ? [action('Être rappelé', 'Être rappelé'), action('Vérifier mon financement', 'Vérifier mon financement'), action('Poser une autre question', 'J’ai une autre question')]
    : [action('Vérifier mon financement', 'Vérifier mon financement'), action('Être rappelé', 'Être rappelé'), action('Poser une autre question', 'J’ai une autre question')];
  return { answerText, quickActions, showCallbackForm: false, suggestedNextStep: quickActions[0].label, intent };
}


function getReliableExtractedFacts(question: string, context: string) {
  if (!PRICE_QUESTION_PATTERN.test(question)) return '';

  const tariffMatch = context.match(TARIFF_LINE_PATTERN);
  if (!tariffMatch) return '';

  return `Information fiable extraite du contexte : tarif indiqué : ${tariffMatch[1].trim()}.`;
}

function buildSystemPrompt(knowledgeContext: string, dynamicTrainingContext: string, message: string, reliableFacts: string) {
  return `INSTRUCTIONS :
Tu es l’assistant IA officiel d’Intégrale Academy.
Tu réponds comme un conseiller formation professionnel, clair, rassurant, humain et orienté conversion.

Objectif :
- répondre précisément à la question
- utiliser uniquement les informations du contexte
- répondre avec les informations précises de la base de connaissances
- si un tarif, une durée, un lieu ou une date est présent dans les documents, le donner directement
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
- Ne commence jamais par "Pour Formation".
- Ne copie jamais une phrase brute de la base de données : reformule proprement.
- Pour un tarif, donne le prix en premier. Pour une durée, donne la durée en premier.
- Termine par une question simple ou une action claire.
${reliableFacts ? `\n${reliableFacts}\nUtilise cette information uniquement comme repère fiable, puis reformule la réponse finale de manière naturelle et commerciale.` : ''}

CONTEXTE FORMATION :
${knowledgeContext}

DONNÉES DYNAMIQUES :
${dynamicTrainingContext || 'Aucune donnée dynamique pertinente trouvée.'}

QUESTION UTILISATEUR :
${message}

CONSIGNE :
Réponds uniquement avec les informations du contexte. Si le contexte contient un prix, donne le prix exact. Si le contexte contient une durée, un lieu ou une date, donne l’information exacte. Si le contexte ne contient pas l’information, dis que l’équipe peut confirmer et donne le téléphone 04 22 47 07 68. Ne jamais utiliser les notes internes dans la réponse.`;
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

function formatTrainingName(value?: string) {
  return value?.replace(/\s*\([^)]*\)\s*$/, '').trim() || 'cette formation';
}

function buildLocalDynamicAnswer(question: string, dynamicContext: string) {
  if (!dynamicContext) return '';
  const q = question.toLowerCase();
  const training = formatTrainingName(lineValue(dynamicContext, 'Formation'));
  const price = lineValue(dynamicContext, 'Tarif')?.replace(/\s*\(\d+ centimes\)/, '');
  const dates = lineValue(dynamicContext, 'Dates');
  const exam = lineValue(dynamicContext, 'Examen');
  const location = lineValue(dynamicContext, 'Lieu');
  const seats = lineValue(dynamicContext, 'Places restantes');
  const status = lineValue(dynamicContext, 'Statut');
  const link = lineValue(dynamicContext, 'Inscription');
  const notes = lineValue(dynamicContext, 'Notes publiques');
  if (/place|places/.test(q) && seats) return `Il reste actuellement ${seats} place(s) indiquée(s) pour la session ${training}. La session est au statut ${status || 'non précisé'}${dates ? `, ${dates}` : ''}. Pour bloquer votre place ou vérifier votre dossier, vous pouvez utiliser le lien ${link || 'de la page formation'} ou contacter l’équipe au 04 22 47 07 68.`;
  if (/quand|prochaine|date|debut|début|examen/.test(q) && dates) return `La prochaine session ${training} indiquée est prévue ${dates}. L’examen est prévu le ${exam || 'non précisé'}. Le statut actuel est ${status || 'non précisé'}${seats ? ` et il reste ${seats} place(s)` : ''}. La formation se déroule à ${location || 'un lieu à confirmer'}. Vous pouvez consulter l’inscription ici : ${link || 'lien non précisé'}.`;
  if (/inscri|rendez|rappel|dossier|financement/.test(q)) return `Oui, vous pouvez avancer sur votre inscription ${training} : la session indiquée est ${status || 'disponible'}${dates ? `, ${dates}` : ''}. Le lien d’inscription est ${link || 'à confirmer avec l’équipe'}. ${price ? `Le tarif indiqué est ${price}.` : ''} Souhaitez-vous laisser vos coordonnées pour être rappelé par notre équipe ?`;
  if (/combien|coût|cout|coute|coûte|prix|tarif|montant/.test(q) && price) return `Le tarif indiqué pour la formation ${training} est ${price}. ${notes ? notes + ' ' : ''}La session se déroule à ${location || 'un lieu à confirmer'}${dates ? `, ${dates}` : ''}. Un financement peut être étudié selon votre situation (CPF, France Travail ou financement personnel). Pour vous inscrire ou vérifier votre prise en charge, consultez ${link || 'la page formation'} ou contactez Intégrale Academy au 04 22 47 07 68.`;
  return '';
}

function buildLocalKnowledgeAnswer(question: string, context: string) {
  const q = question.toLowerCase();
  if (!context) return '';
  const title = context.match(/^#\s+(.+)$/m)?.[1] || 'cette formation';
  const tariffLine = context.match(/^Tarifs? indiqués?\s*:\s*(.+)$/im)?.[1];
  const durationLine = context.match(/^Durée\s*:\s*(.+)$/im)?.[1];
  const modalityLine = context.match(/^Modalités et lieux\s*:\s*(.+)$/im)?.[1];
  const fundingLine = context.match(/^Financement\s*:\s*(.+)$/im)?.[1];

  if (/combien|coût|cout|coute|coûte|prix|tarif|montant/.test(q) && tariffLine) {
    return `Le tarif indiqué est : ${tariffLine}. ${durationLine ? `Durée : ${durationLine}. ` : ''}${fundingLine ? `Financement possible : ${fundingLine}. ` : ''}Vous souhaitez que l’équipe Intégrale Academy confirme votre dossier ?`;
  }

  if (/durée|duree|temps|combien de temps|semaine|mois/.test(q) && durationLine) {
    return `La durée indiquée est : ${durationLine}. ${modalityLine ? `${modalityLine}. ` : ''}Vous souhaitez que l’équipe confirme la session adaptée à votre situation ?`;
  }

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
      structuredAnswer: buildFallbackStructuredAnswer('question générale'),
      fallbackUsed: true,
      modelUsed,
      contextLength: 0,
      finalAnswerLength: academyFallbackResponse.length,
    };
  }

  const { selectedFiles, scoredDocuments, context } = await getRelevantKnowledge(latestUserMessage.content);
  const dynamicData = await getRelevantDynamicTrainingData(latestUserMessage.content);
  const dynamicTrainingContext = dynamicData.context;
  const combinedContext = [context, dynamicTrainingContext].filter(Boolean).join('\n\n--- DONNÉES DYNAMIQUES ---\n\n');
  const reliableFacts = getReliableExtractedFacts(latestUserMessage.content, combinedContext);

  let rawAnswer = '';
  if (isVtcPriceQuestion(latestUserMessage.content)) {
    rawAnswer = '';
  } else try {
    rawAnswer = await getOpenAIAnswer(messages, context, dynamicTrainingContext, latestUserMessage.content, reliableFacts, modelUsed);
  } catch (error) {
    console.error('[CHAT] OpenAI request failed:', error);
  }

  const knownStructuredAnswer = buildKnownStructuredAnswer(latestUserMessage.content);
  const finalAnswer = knownStructuredAnswer?.answerText || rawAnswer || buildLocalDynamicAnswer(latestUserMessage.content, dynamicTrainingContext) || buildLocalKnowledgeAnswer(latestUserMessage.content, context) || academyFallbackResponse;
  const structuredAnswer = knownStructuredAnswer || toStructuredAnswer(finalAnswer, latestUserMessage.content);
  const fallbackUsed = structuredAnswer.answerText === buildFallbackStructuredAnswer(structuredAnswer.intent).answerText;

  if (shouldLogDebug()) {
    console.log('[CHAT DEBUG]', {
      modelUsed,
      question: latestUserMessage.content,
      chunksFound: scoredDocuments.filter((item) => selectedFiles.includes(item.filePath)),
      similarityScores: scoredDocuments,
      selectedFiles,
      contextSentToModel: context,
      contextLength: combinedContext.length,
      finalAnswerLength: finalAnswer.length,
      fallbackUsed,
    });
  }

  try { const p = await getPrisma(); if (p) await p.chatConversationLog.create({data:{userMessage: latestUserMessage.content, assistantAnswer: structuredAnswer.answerText, selectedKnowledgeFiles: selectedFiles.join(','), selectedSessions: dynamicData.selectedSessions.join(',')}}); } catch (e) { console.warn('[CHAT] log skipped', e); }

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
    structuredAnswer,
    fallbackUsed,
    modelUsed,
    contextLength: combinedContext.length,
    finalAnswerLength: finalAnswer.length,
  };
}
