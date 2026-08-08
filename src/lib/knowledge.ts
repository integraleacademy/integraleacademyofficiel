import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const MIN_SELECTED_FILES = 3;
const MAX_SELECTED_FILES = 6;
const PRICE_QUESTION_TERMS = [
  'prix',
  'tarif',
  'coût',
  'cout',
  'coûte',
  'coute',
  'combien',
  'payer',
  'frais',
  'examen inclus',
  'c’est combien',
  "c'est combien",
  'ça coûte combien',
  'ca coute combien',
  'combien ça coute',
  'combien ca coute',
  'combien ça coûte',
  'combien ca coûte',
  'montant',
];
const PRICE_LINE_TERMS = ['tarif', 'prix', 'coût', 'cout', 'montant'];

export const academyFallbackResponse =
  'Je préfère vous faire confirmer ce point par l’équipe Intégrale Academy pour éviter de vous donner une mauvaise information.';

export type KnowledgeDocument = {
  filePath: string;
  absolutePath: string;
  title: string;
  category: string;
  tags: string[];
  updated: string;
  content: string;
};

export type KnowledgeFilesResult = {
  cwd: string;
  knowledgePath: string;
  files: string[];
  relativeFiles: string[];
};

export type RelevantKnowledgeResult = {
  documents: KnowledgeDocument[];
  selectedFiles: string[];
  scoredDocuments: { filePath: string; score: number; preview: string }[];
  context: string;
};

const topicAliases: Record<string, string[]> = {
  aps: ['agent de prevention', 'agent de sécurité', 'agent securite', 'tfp aps', 'surveillance', 'gardiennage'],
  ssiap: ['incendie', 'erp', 'igh', 'ssiap 1', 'securite incendie'],
  bts: ['alternance', 'mco', 'ndrc', 'mos', 'commerce international', 'immobilier', 'professions immobilières'],
  vtc: ['chauffeur', 'conducteur', 'taxi', 'transport', 'permis'],
  desp: ['dssp', 'dirigeant', 'entreprise de sécurité', 'vae', 'création entreprise'],
  cpf: ['compte personnel formation', 'mon compte formation', 'financement', 'financer', 'france travail', 'pole emploi', 'opco'],
  cnaps: ['carte professionnelle', 'autorisation préalable', 'autorisation prealable', 'agrément', 'agrement'],
  inscription: ['inscrire', 'dossier', 'document', 'pièce', 'piece', 'examen', 'admission'],
  contact: ['adresse', 'telephone', 'téléphone', 'mail', 'email', 'horaires', 'contacter'],
};

let knowledgeCache: { knowledgePath: string; documents: KnowledgeDocument[] } | null = null;

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function parseFrontmatter(raw: string, filePath: string, absolutePath: string): KnowledgeDocument {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const frontmatter = match?.[1] || '';
  const content = (match?.[2] || raw).trim();
  const metadata = Object.fromEntries(
    frontmatter
      .split('\n')
      .map((line) => line.split(':'))
      .filter(([key, ...value]) => key && value.length > 0)
      .map(([key, ...value]) => [key.trim(), value.join(':').trim()]),
  );

  return {
    filePath,
    absolutePath,
    title: metadata.title || path.basename(filePath, '.md'),
    category: metadata.category || 'general',
    tags: (metadata.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    updated: metadata.updated || '',
    content,
  };
}

async function scanMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return scanMarkdownFiles(fullPath);
      if (entry.isFile() && entry.name.endsWith('.md')) return [fullPath];
      return [];
    }),
  );

  return nested.flat().sort();
}

function getKnowledgePathCandidates(cwd: string) {
  return [path.join(cwd, 'src', 'knowledge'), path.join(cwd, 'knowledge'), path.join(cwd, 'app', 'knowledge')];
}

export async function getKnowledgeFiles(): Promise<KnowledgeFilesResult> {
  const cwd = process.cwd();
  let lastError: unknown;

  for (const candidate of getKnowledgePathCandidates(cwd)) {
    try {
      const files = await scanMarkdownFiles(candidate);
      if (files.length > 0) {
        return {
          cwd,
          knowledgePath: candidate,
          files,
          relativeFiles: files.map((file) => path.relative(candidate, file)),
        };
      }
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError instanceof Error) throw lastError;
  throw new Error('Aucun fichier .md trouvé.');
}

export async function getKnowledgeDocuments() {
  const knowledgeFiles = await getKnowledgeFiles();
  if (knowledgeCache?.knowledgePath === knowledgeFiles.knowledgePath && process.env.NODE_ENV === 'production') {
    return knowledgeCache.documents;
  }

  const documents = await Promise.all(
    knowledgeFiles.files.map(async (file) => {
      const raw = await readFile(file, 'utf8');
      const relativeFile = path.relative(knowledgeFiles.knowledgePath, file);
      console.log(`[KNOWLEDGE] Fichier chargé: ${relativeFile}`);
      console.log(`[KNOWLEDGE] Caractères chargés: ${raw.length}`);
      if (relativeFile.toLowerCase().includes('vtc')) {
        console.log(`[KNOWLEDGE] Vérification VTC 1600 € tout inclus: ${raw.includes('1600 € tout inclus') ? 'OK' : 'MANQUANT'}`);
      }
      return parseFrontmatter(raw, relativeFile, file);
    }),
  );

  knowledgeCache = { knowledgePath: knowledgeFiles.knowledgePath, documents };
  return documents;
}

function scoreDocument(document: KnowledgeDocument, question: string) {
  const normalizedQuestion = normalize(question);
  const weightedText = normalize(
    [document.filePath, document.title, document.category, document.tags.join(' '), document.content].join(' '),
  );
  const words = normalizedQuestion.match(/[a-z0-9]{3,}/g) || [];
  let score = 0;

  for (const tag of document.tags) {
    if (normalizedQuestion.includes(normalize(tag))) score += 8;
  }

  for (const word of words) {
    if (weightedText.includes(word)) score += 1;
  }

  for (const [topic, aliases] of Object.entries(topicAliases)) {
    const topicMentioned = normalizedQuestion.includes(topic) || aliases.some((alias) => normalizedQuestion.includes(normalize(alias)));
    const documentRelated = weightedText.includes(topic) || aliases.some((alias) => weightedText.includes(normalize(alias)));
    if (topicMentioned && documentRelated) score += 10;
  }

  if (normalizedQuestion.includes('aps') && document.filePath.toLowerCase().includes('aps')) score += 100;
  if (normalizedQuestion.includes('vtc') && document.filePath.toLowerCase().includes('vtc')) score += 100;

  return score;
}

function isPriceQuestion(question: string) {
  const normalizedQuestion = normalize(question);
  return PRICE_QUESTION_TERMS.some((term) => normalizedQuestion.includes(normalize(term)));
}

function getPriceLines(content: string) {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && PRICE_LINE_TERMS.some((term) => normalize(line).includes(normalize(term))));
}

export function buildKnowledgeContext(documents: KnowledgeDocument[], question = '') {
  const priceQuestion = isPriceQuestion(question);

  return documents
    .map((document) => {
      const priceLines = priceQuestion ? getPriceLines(document.content) : [];
      const priorityLines = priceLines.length > 0 ? `Informations tarifaires pertinentes:\n${priceLines.join('\n')}\n\n` : '';

      return `# ${document.title}\nFichier: ${document.filePath}\nCatégorie: ${document.category}\nTags: ${document.tags.join(', ')}\nMise à jour: ${document.updated}\n\n${priorityLines}${document.content}`;
    })
    .join('\n\n---\n\n');
}

export async function getRelevantKnowledge(question: string): Promise<RelevantKnowledgeResult> {
  const documents = await getKnowledgeDocuments();
  const normalizedQuestion = normalize(question);
  const apsDocument = documents.find((document) => path.basename(document.filePath).toLowerCase() === '02-formations-aps.md')
    || documents.find((document) => document.filePath.toLowerCase().includes('aps'));

  const ranked = documents
    .map((document) => ({ document, score: scoreDocument(document, question) }))
    .sort((a, b) => b.score - a.score || a.document.filePath.localeCompare(b.document.filePath));

  let selected: KnowledgeDocument[];
  if (normalizedQuestion.includes('aps') && isPriceQuestion(question) && apsDocument) {
    selected = [apsDocument];
  } else {
    const positive = ranked.filter((item) => item.score > 0).slice(0, MAX_SELECTED_FILES);
    selected = (positive.length >= MIN_SELECTED_FILES ? positive : ranked.slice(0, Math.min(MAX_SELECTED_FILES, documents.length))).map(
      (item) => item.document,
    );

    if (normalizedQuestion.includes('aps') && apsDocument && !selected.some((document) => document.filePath === apsDocument.filePath)) {
      selected = [apsDocument, ...selected].slice(0, MAX_SELECTED_FILES);
    }
  }

  return {
    documents: selected,
    selectedFiles: selected.map((document) => document.filePath),
    scoredDocuments: ranked.map((item) => ({
      filePath: item.document.filePath,
      score: item.score,
      preview: item.document.content.replace(/\s+/g, ' ').trim().slice(0, 220),
    })),
    context: buildKnowledgeContext(selected, question),
  };
}

export async function selectRelevantKnowledge(question: string) {
  return (await getRelevantKnowledge(question)).documents;
}

export function getApsPreview(content: string) {
  const tariffLine = content
    .split('\n')
    .map((line) => line.trim())
    .find((line) => /tarif|1650|1\s*650|€/.test(line.toLowerCase()));

  return tariffLine || content.replace(/\s+/g, ' ').trim().slice(0, 160);
}
