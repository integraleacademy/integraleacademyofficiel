import { NextRequest, NextResponse } from 'next/server';
import { answerChatQuestion } from '@/lib/chat';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const question = request.nextUrl.searchParams.get('q')?.trim() || 'combien coute la formation aps ?';
  const result = await answerChatQuestion([{ role: 'user', content: question }]);

  return NextResponse.json(result);
}
