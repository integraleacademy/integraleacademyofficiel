import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { loadPlanningSessions } from '@/lib/planning-sessions';
import { SECURITY_PATHWAY_PDF } from '@/data/admissions';
import { scheduledIntakes, intakeMatchesSession } from '@/data/intakes';
import { sessionCalendar } from '@/lib/session-calendar';
import { createCalendarPdf } from '@/lib/session-calendar-pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sessions = await loadPlanningSessions();
  const intake = scheduledIntakes.find(entry => entry.id === id);
  const session = sessions.find(entry => entry.id === id) ?? (intake && sessions.find(entry => intakeMatchesSession(intake, entry)));
  if (!session) return new Response('Calendrier de session indisponible.', { status: 404 });
  if (session.id === 'parcours-securite-janvier-2027') {
    const original = await readFile(path.join(process.cwd(), 'public', SECURITY_PATHWAY_PDF));
    return new Response(original, { headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Calendrier-parcours-securite-janvier-2027.pdf"',
    } });
  }
  const calendar = sessionCalendar(session);
  const pdf = await createCalendarPdf(calendar);
  const slug = (session.training?.slug || 'formation').replace(/[^a-z0-9-]/gi, '-');
  const date = calendar.monthOnly ? calendar.start.slice(0,7) : calendar.start;
  return new Response(Buffer.from(pdf), { headers: {
    'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="Calendrier-${slug}-${date}.pdf"`,
    'Cache-Control': 'public, max-age=0, must-revalidate',
  } });
}
