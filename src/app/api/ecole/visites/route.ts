import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
import { schoolVisitCampuses, validateSchoolVisit } from '@/lib/school-visit';

export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; until: number }>();

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    if (!origin || new URL(origin).host !== request.headers.get('host')) return NextResponse.json({ error: 'Origine de la demande invalide.' }, { status: 403 });
    const now = Date.now();
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
    const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'anonymous';
    const attempt = attempts.get(key) || { count: 0, until: now + 60_000 };
    attempt.count += 1; attempts.set(key, attempt);
    if (attempt.count > 6) return NextResponse.json({ error: 'Merci de patienter une minute avant de réessayer.' }, { status: 429 });
    const body = await request.text();
    if (body.length > 4096) return NextResponse.json({ error: 'Demande trop volumineuse.' }, { status: 413 });
    let input: unknown;
    try { input = JSON.parse(body); } catch { return NextResponse.json({ error: 'Demande invalide.' }, { status: 400 }); }
    const data = validateSchoolVisit(input);
    if (!data) return NextResponse.json({ error: 'Vérifiez votre nom, prénom, adresse e-mail et téléphone.' }, { status: 400 });
    const prisma = await getPrisma();
    if (!prisma) return NextResponse.json({ error: 'Le formulaire est momentanément indisponible. Appelez-nous au 04 22 47 07 68.' }, { status: 503 });
    await prisma.chatLead.upsert({
      where: { id: 'visite-' + data.requestId }, update: {},
      create: {
        id: 'visite-' + data.requestId, firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone,
        trainingInterest: 'Visite de l’école · ' + schoolVisitCampuses[data.campus], source: 'ecole-visite',
        message: ['Demande de visite de l’école', 'Lieu : ' + schoolVisitCampuses[data.campus], data.message, 'Rendez-vous à convenir et à confirmer avec l’équipe.'].filter(Boolean).join('\n'),
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Votre demande n’a pas pu être confirmée. Réessayez ou appelez-nous au 04 22 47 07 68.' }, { status: 503 });
  }
}
