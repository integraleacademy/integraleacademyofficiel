import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getApsPreview, getKnowledgeFiles } from '@/lib/knowledge';

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

export async function GET() {
  try {
    const knowledgeFiles = await getKnowledgeFiles();
    const apsFile =
      knowledgeFiles.files.find((file) => path.basename(file).toLowerCase().includes('aps')) || knowledgeFiles.files[0];
    const apsContent = await readFile(apsFile, 'utf8');

    console.log('[KNOWLEDGE_HEALTH] cwd:', knowledgeFiles.cwd);
    console.log('[KNOWLEDGE_HEALTH] knowledgePath:', knowledgeFiles.knowledgePath);
    console.log('[KNOWLEDGE_HEALTH] files:', knowledgeFiles.relativeFiles);

    return NextResponse.json(
      {
        ok: true,
        cwd: knowledgeFiles.cwd,
        knowledgePath: knowledgeFiles.knowledgePath,
        filesFound: knowledgeFiles.files.length,
        files: knowledgeFiles.relativeFiles,
        apsPreview: getApsPreview(apsContent),
      } satisfies KnowledgeHealthResult,
      { status: 200 },
    );
  } catch (error) {
    const cwd = process.cwd();
    const knowledgePath = path.join(cwd, 'src', 'knowledge');

    console.log('[KNOWLEDGE_HEALTH] cwd:', cwd);
    console.log('[KNOWLEDGE_HEALTH] knowledgePath:', knowledgePath);
    console.log('[KNOWLEDGE_HEALTH] files:', []);

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
