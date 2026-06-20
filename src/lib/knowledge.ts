import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'knowledge');
const MIN_SELECTED_FILES = 3;
const MAX_SELECTED_FILES = 6;

export const academyFallbackResponse =
  'Je préfère vous orienter vers notre équipe pour une réponse précise. Vous pouvez nous contacter au 04 22 47 07 68.';

type KnowledgeDocument = {
  filePath: string;
  title: string;
  category: string;
  tags: string[];
  updated: string;
  content: string;
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

let knowledgeCache: KnowledgeDocument[] | null = null;

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function parseFrontmatter(raw: string, filePath: string): KnowledgeDocument {
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

export async function getKnowledgeDocuments() {
  if (knowledgeCache && process.env.NODE_ENV === 'production') return knowledgeCache;

  const files = await scanMarkdownFiles(KNOWLEDGE_DIR);
  const documents = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(file, 'utf8');
      return parseFrontmatter(raw, path.relative(KNOWLEDGE_DIR, file));
    }),
  );

  knowledgeCache = documents;
  return documents;
}

function scoreDocument(document: KnowledgeDocument, question: string) {
  const normalizedQuestion = normalize(question);
  const weightedText = normalize(
    [document.title, document.category, document.tags.join(' '), document.content].join(' '),
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

  return score;
}

export async function selectRelevantKnowledge(question: string) {
  const documents = await getKnowledgeDocuments();
  const ranked = documents
    .map((document) => ({ document, score: scoreDocument(document, question) }))
    .sort((a, b) => b.score - a.score || a.document.filePath.localeCompare(b.document.filePath));

  const positive = ranked.filter((item) => item.score > 0).slice(0, MAX_SELECTED_FILES);
  const selection = positive.length >= MIN_SELECTED_FILES ? positive : ranked.slice(0, Math.min(MAX_SELECTED_FILES, documents.length));

  return selection.map((item) => item.document);
}

export function buildKnowledgeContext(documents: KnowledgeDocument[]) {
  return documents
    .map(
      (document) => `# ${document.title}\nFichier: ${document.filePath}\nCatégorie: ${document.category}\nTags: ${document.tags.join(', ')}\nMise à jour: ${document.updated}\n\n${document.content}`,
    )
    .join('\n\n---\n\n');
}
