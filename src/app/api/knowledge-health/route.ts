import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type KnowledgeHealthResult = {
  ok: boolean;
  cwd: string;
  knowledgePath: string;
  filesFound?: number;
  files?: string[];
  apsPreview?: string;
  error?: string;
};

async function listMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(fullPath);
      if (entry.isFile() && entry.name.endsWith('.md')) return [fullPath];
      return [];
    }),
  );

  return nestedFiles.flat().sort();
}

function getKnowledgePathCandidates(cwd: string) {
  return [path.join(cwd, 'src', 'knowledge'), path.join(cwd, 'knowledge'), path.join(cwd, 'app', 'knowledge')];
}

function getApsPreview(content: string) {
  const tariffLine = content
    .split('\n')
    .map((line) => line.trim())
    .find((line) => /tarif|1650|1\s*650|€/.test(line.toLowerCase()));

  return tariffLine || content.replace(/\s+/g, ' ').trim().slice(0, 160);
}

export async function GET() {
  const cwd = process.cwd();
  let knowledgePath = path.join(cwd, 'src', 'knowledge');
  let files: string[] = [];

  try {
    let lastError: unknown;

    for (const candidate of getKnowledgePathCandidates(cwd)) {
      knowledgePath = candidate;

      try {
        files = await listMarkdownFiles(candidate);
        break;
      } catch (error) {
        lastError = error;
        files = [];
      }
    }

    console.log('[KNOWLEDGE_HEALTH] cwd:', cwd);
    console.log('[KNOWLEDGE_HEALTH] knowledgePath:', knowledgePath);
    console.log(
      '[KNOWLEDGE_HEALTH] files:',
      files.map((file) => path.relative(knowledgePath, file)),
    );

    if (files.length === 0) {
      const errorMessage = lastError instanceof Error ? lastError.message : 'Aucun fichier .md trouvé.';
      return NextResponse.json(
        {
          ok: false,
          error: errorMessage,
          cwd,
          knowledgePath,
        } satisfies KnowledgeHealthResult,
        { status: 200 },
      );
    }

    const relativeFiles = files.map((file) => path.relative(knowledgePath, file));
    const apsFile = files.find((file) => path.basename(file).toLowerCase().includes('aps')) || files[0];
    const apsContent = await readFile(apsFile, 'utf8');

    return NextResponse.json(
      {
        ok: true,
        cwd,
        knowledgePath,
        filesFound: files.length,
        files: relativeFiles,
        apsPreview: getApsPreview(apsContent),
      } satisfies KnowledgeHealthResult,
      { status: 200 },
    );
  } catch (error) {
    console.log('[KNOWLEDGE_HEALTH] cwd:', cwd);
    console.log('[KNOWLEDGE_HEALTH] knowledgePath:', knowledgePath);
    console.log('[KNOWLEDGE_HEALTH] files:', files);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue pendant le contrôle knowledge.',
        cwd,
        knowledgePath,
      } satisfies KnowledgeHealthResult,
      { status: 200 },
    );
  }
}
