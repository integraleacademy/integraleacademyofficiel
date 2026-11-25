import { TrainingActionLink } from '@/components/TrainingActionLink';
import { informationRequestHref } from '@/lib/contact-request';
import { PlanningRegistrationButton } from '@/app/planning/PlanningRegistration';
import { listPublicSessions } from '@/lib/training-data';
import { formatSessionPeriod, isPublicUpcomingSession } from '@/lib/public-sessions';
import { planningSsiapCourse } from '@/lib/planning-ssiap';

type Params = Record<string, string | string[] | undefined>;

/** Show the visitor's selected course and period before the existing CRM form. */
export async function SsiapContactChoice({ params }: { params: Params }) {
  const first = (value: Params[string]) => Array.isArray(value) ? value[0] : value;
  const course = first(params.formation);
  if (course !== 'ssiap-1' && course !== 'ssiap-2' && course !== 'ssiap-3') return null;
  const label = course.toUpperCase().replace('-', ' ');
  const formula = first(params.formule);
  const formulaLabel = course === 'ssiap-1' && formula === 'ssiap-1-sst' ? 'SSIAP 1 + SST' : course === 'ssiap-1' && formula !== 'ssiap-1' ? 'Formation SSIAP 1' : label;
  const sessionId = first(params.session);
  const session = course !== 'ssiap-1' && sessionId
    ? (await listPublicSessions()).find(row => row.id === sessionId && isPublicUpcomingSession(row) && planningSsiapCourse(row) === course)
    : undefined;
  const period = first(params.periode) || '';
  const safePeriod = session ? formatSessionPeriod(session.startDate, session.endDate)
    : course === 'ssiap-1' && /^Du \d{2}\/\d{2}\/\d{4} au \d{2}\/\d{2}\/\d{4}$/.test(period) ? period : '';
  const selectedText = [formulaLabel, safePeriod].filter(Boolean).join(' — ');
  const subjects: Record<string, string> = {
    'prochaines dates': 'Prochaines dates', devis: 'Demande de devis', 'verification des prérequis': 'Vérification des prérequis',
    'rendez-vous téléphonique avec Cassandre MENARD': 'Rendez-vous téléphonique', [`financement ${label}`]: 'Financement de la formation',
  };
  const subject = course === 'ssiap-1' ? 'Inscription' : subjects[first(params.objet) || ''] ?? 'Inscription';
  const message = subject === 'Inscription' ? `Je souhaite préparer mon inscription : ${selectedText}.` : `Je vous contacte au sujet de la formation ${label} (${subject.toLowerCase()}).`;
  const email = `mailto:ecole@integraleacademy.com?subject=${encodeURIComponent(`${subject} ${formulaLabel}`)}&body=${encodeURIComponent(`Bonjour Cassandre MENARD,\n\n${message}\n\nMerci de me recontacter pour vérifier mon dossier et mon financement.\n\nNom :\nTéléphone :`)}`;
  const secondary = 'inline-flex min-h-12 items-center justify-center rounded-full border border-academy-line px-5 py-3 text-center text-sm font-bold';
  return <section id="choix-ssiap" className="page-container scroll-mt-28 px-4 py-8" aria-labelledby="choix-ssiap-title">
    <div className="rounded-3xl border border-red-200 bg-academy-surface p-6 text-academy-ink sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-300">Votre projet {label}</p>
      <h2 id="choix-ssiap-title" className="mt-3 text-2xl font-black">{formulaLabel}</h2>
      {safePeriod && <p className="mt-2 font-bold">{safePeriod}</p>}
      <p className="mt-3 max-w-3xl text-sm leading-7 text-academy-muted">Votre choix est rappelé ici pour préparer votre échange avec Cassandre MENARD, Responsable commerciale. L’équipe vérifie les prérequis, les dates de présence et le financement avant de confirmer l’inscription.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={email} className="inline-flex min-h-12 items-center justify-center rounded-full bg-red-700 px-5 py-3 text-center text-sm font-bold text-white">{subject === 'Inscription' ? 'Transmettre ce choix par e-mail' : 'Écrire à notre équipe'} →</a>
        {session ? <PlanningRegistrationButton session={session} className={secondary} /> : course === 'ssiap-1'
          ? <TrainingActionLink href={informationRequestHref(params)} className={secondary}>Compléter ma demande d’informations →</TrainingActionLink>
          : <a href="tel:0422470768" className={secondary}>Appeler le 04 22 47 07 68</a>}
      </div>
      {course === 'ssiap-1' && <p className="mt-3 text-xs leading-6 text-academy-muted">Votre session et votre formule sont reprises dans la demande.</p>}
    </div>
  </section>;
}
