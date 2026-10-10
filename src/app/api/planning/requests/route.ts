import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { planningRegistrationAction, validatePlanningRequest } from '@/lib/planning-registration';
import { formatSessionDate, formatSessionPeriod } from '@/lib/public-sessions';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  try {
    if (!origin || new URL(origin).host !== request.headers.get('host')) return NextResponse.json({ error: 'Origine de la demande invalide.' }, { status: 403 });
    const body = await request.text();
    if (body.length > 4096) return NextResponse.json({ error: 'Demande trop volumineuse.' }, { status: 413 });
    let input;
    try { input = JSON.parse(body); } catch { return NextResponse.json({ error: 'Demande invalide.' }, { status: 400 }); }
    const data = input && typeof input === 'object' ? validatePlanningRequest(input) : null;
    if (!data) return NextResponse.json({ error: 'Vérifiez votre nom, prénom, adresse e-mail et téléphone.' }, { status: 400 });
    const prisma = await getPrisma();
    if (!prisma) return NextResponse.json({ error: 'Le formulaire est momentanément indisponible. Vous pouvez nous appeler au 04 22 47 07 68.' }, { status: 503 });
    const session = (await loadPlanningSessions()).find((row) => row.id === data.sessionId);
    if (!session) return NextResponse.json({ error: 'Cette session n’est plus proposée. Actualisez le planning pour choisir une nouvelle date.' }, { status: 409 });
    const action = planningRegistrationAction(session);
    const purpose = action.kind === 'waiting-list' ? 'Demande de liste d’attente' : action.kind === 'opening' ? 'Renseignements sur une ouverture prochaine' : 'Demande d’inscription';
    const dates = session.scheduleKind === 'vtc-exam'
      ? 'Inscription avant le ' + formatSessionDate(session.startDate) + ' · Théorie le ' + formatSessionDate(session.endDate) + (session.examDate ? ' · Pratique le ' + formatSessionDate(session.examDate) : '')
      : formatSessionPeriod(session.startDate, session.endDate) + (session.examDate ? ' · Examen le ' + formatSessionDate(session.examDate) : '');
    await prisma.chatLead.upsert({
      where: { id: 'planning-' + data.requestId },
      update: {},
      create: {
        id: 'planning-' + data.requestId,
        firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone,
        trainingInterest: session.training?.name || session.title || 'Formation',
        source: 'planning-' + action.kind,
        message: [purpose, session.title, 'Session : ' + session.id, dates, 'Lieu : ' + (session.location || 'À confirmer'), 'Aucune place réservée automatiquement.'].filter(Boolean).join('\n'),
      },
    });
    return NextResponse.json({ ok: true, kind: action.kind });
  } catch {
    return NextResponse.json({ error: 'Votre demande n’a pas pu être confirmée. Réessayez ou appelez-nous au 04 22 47 07 68.' }, { status: 503 });
  }
}
