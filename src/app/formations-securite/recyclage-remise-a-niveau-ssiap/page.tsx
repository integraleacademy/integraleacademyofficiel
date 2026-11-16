import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { SsiapCoursePage } from '@/components/SsiapCoursePage';
import { ssiapMaintenanceConfig } from '@/data/ssiap-catalogue';
import { planningSsiapCourse, ssiapPlanningCourses } from '@/lib/planning-ssiap';
import { isPublicUpcomingSession } from '@/lib/public-sessions';
import { listPublicSessions } from '@/lib/training-data';

export const dynamic = 'force-dynamic';
export const metadata = createPageMetadata('/formations-securite/recyclage-remise-a-niveau-ssiap');

const sessionDates = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris',
});

export default async function SsiapMaintenancePage() {
  const upcoming = (await listPublicSessions()).filter(isPublicUpcomingSession)
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  const courses = ssiapPlanningCourses.filter(course => course.group !== 'initial').map(course => ({
    ...course,
    duration: ssiapMaintenanceConfig.program.find(item => item.title === course.label)?.duration,
    sessions: upcoming.filter(session => planningSsiapCourse(session) === course.key),
  })).filter(course => course.sessions.length > 0);

  const sessions = courses.flatMap(course => course.sessions);
  const venue = sessions[0]?.location;
  const note = sessions[0]?.publicNotes;
  const datesSection = courses.length > 0 && (
    <section id="dates-tarifs" aria-labelledby="maintenance-dates-title" className="scroll-mt-24 bg-[#EFE7D9] px-4 py-14 text-[#172638] sm:py-16">
      <div className="page-container">
        <h2 id="maintenance-dates-title" className="text-3xl font-black tracking-tight sm:text-4xl">Les prochaines sessions</h2>
        {venue && sessions.every(session => session.location === venue) && <p className="mt-3 text-sm font-semibold">{venue}</p>}
        {note && sessions.every(session => session.publicNotes === note) && <p className="mt-1 text-sm">{note}</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {courses.map(course => (
            <article key={course.key} className="rounded-3xl border border-[#dfd5c2] bg-[#FFFDF8] p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-black tracking-tight">{course.label}</h3>
                <span className="text-sm font-bold text-red-800">{course.duration}</span>
              </div>
              <ul className="mt-4 divide-y divide-[#dfd5c2] border-y border-[#dfd5c2]">
                {course.sessions.map(session => <li key={session.id} className="py-3 font-semibold">
                  {sessionDates.formatRange(new Date(session.startDate), new Date(session.endDate))}
                </li>)}
              </ul>
              <Link href={`/planning?formation=ssiap&parcours=${course.key}&dates=toutes#sessions`} aria-label={`Choisir une session – ${course.label}`} className="mt-4 inline-flex min-h-11 items-center font-bold text-red-800 underline underline-offset-4">
                Choisir une session →
              </Link>
            </article>
          ))}
        </div>
        <Link href="/contact?formation=recyclage-remise-a-niveau-ssiap&objet=devis" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Demander un devis</Link>
      </div>
    </section>
  );
  return <SsiapCoursePage config={ssiapMaintenanceConfig} datesSection={datesSection} />;
}
