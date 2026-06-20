import { NextRequest, NextResponse } from 'next/server';
import { getRelevantKnowledge } from '@/lib/knowledge';

export const runtime = 'nodejs';

function getContextPreview(context: string) {
  const tariffLine = context
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line === 'Tarif indiqué : 1650 €.' || (/tarif|prix|coût|cout|montant/i.test(line) && !line.toLowerCase().includes('informations tarifaires')));

  return tariffLine || context.slice(0, 500);
}

export async function GET(request: NextRequest) {
  const question = request.nextUrl.searchParams.get('q')?.trim() || 'combien coute la formation aps';
  const { selectedFiles, context } = await getRelevantKnowledge(question);
  const contextPreview = getContextPreview(context);

  return NextResponse.json({
    ok: true,
    question,
    selectedFiles,
    contextPreview,
    hasTarif: context.includes('Tarif indiqué : 1650 €.'),
  });
}
