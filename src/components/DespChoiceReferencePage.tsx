import { OrientationAssistant } from '@/components/OrientationAssistant';
import { TrainingDatesPricingSection, type TrainingDatesPricingSession } from '@/components/TrainingDatesPricingSection';
import { VaeEligibilityModal } from '@/components/VaeEligibilityModal';
import { Button, ConversionStrip, FAQ, Hero, SectionTitle } from '@/components/ui';
import { formationFaq } from '@/data/faq';

function sessionHref(session: TrainingDatesPricingSession) {
  return session.id
    ? `/contact?formation=desp&session=${encodeURIComponent(String(session.id))}`
    : '/contact?formation=desp';
}

function OrangeHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-0 bottom-[.04em] h-[.24em] rounded bg-orange-400" aria-hidden="true" />
    </span>
  );
}

function MiniStep({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-orange-200 bg-academy-surface p-4 shadow-soft">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 font-black text-orange-950">{n}</span>
      <h3 className="mt-4 font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-academy-muted">{text}</p>
    </div>
  );
}

type DespPathCardProps = {
  tone: 'light' | 'dark';
  label: string;
  highlight?: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  audience: string;
  audienceTitle?: string;
  cta: string;
  href: string;
  secondaryCta?: string;
};

function DespPathCard({
  tone,
  label,
  highlight,
  title,
  subtitle,
  description,
  bullets,
  audience,
  audienceTitle = 'Pour qui ?',
  cta,
  href,
  secondaryCta,
}: DespPathCardProps) {
  const dark = tone === 'dark';

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-8 ${
        dark ? 'border-orange-400/45 bg-[#17100B] text-white' : 'border-orange-200 bg-white text-[#111827]'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[.18em] ${
            dark ? 'bg-orange-500 text-orange-950' : 'bg-orange-50 text-orange-700 ring-1 ring-orange-300'
          }`}
        >
          {label}
        </span>
        {highlight ? (
          <span className="rounded-full border border-orange-400/45 bg-white/10 px-4 py-2 text-xs font-black text-orange-100">
            {highlight}
          </span>
        ) : null}
      </div>

      <div className="mt-7">
        <h3 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h3>
        <p className={`mt-3 text-lg font-extrabold ${dark ? 'text-orange-200' : 'text-orange-700'}`}>{subtitle}</p>
        <p className={`mt-5 leading-7 ${dark ? 'text-white/78' : 'text-academy-muted'}`}>{description}</p>
      </div>

      <ul className="mt-7 space-y-4">
        {bullets.map((bullet) => (
          <li key={bullet} className={`flex gap-3 text-sm leading-6 sm:text-base ${dark ? 'text-white/84' : 'text-academy-muted'}`}>
            <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-black ${dark ? 'bg-orange-500 text-orange-950' : 'bg-orange-100 text-orange-700'}`}>
              ✓
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className={`mt-7 rounded-2xl border p-4 ${dark ? 'border-orange-300/25 bg-orange-400/10' : 'border-orange-200 bg-orange-50'}`}>
        <p className={`text-xs font-black uppercase tracking-[.16em] ${dark ? 'text-orange-200' : 'text-orange-700'}`}>{audienceTitle}</p>
        <p className={`mt-2 text-sm font-semibold leading-6 ${dark ? 'text-white/75' : 'text-academy-muted'}`}>{audience}</p>
      </div>

      {secondaryCta ? (
        <VaeEligibilityModal
          label={secondaryCta}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-orange-400/60 bg-white/10 px-6 py-4 text-center text-sm font-black text-orange-100 transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/45"
        />
      ) : null}

      <Button href={href} variant="orange" className={`${secondaryCta ? 'mt-3' : 'mt-8'} w-full`}>
        {cta} <span aria-hidden="true">→</span>
      </Button>
    </article>
  );
}

function DespLocationsNotice() {
  const locations = [
    ['Paris', 'Centre Paris · 142 rue de Rivoli, 75001 Paris'],
    ['Côte d’Azur', 'Puget-sur-Argens · 54 chemin du Carreou, 83480 Puget-sur-Argens'],
    ['Aurillac', 'Village d’entreprises · 14 avenue du Garric, 15000 Aurillac'],
  ];

  return (
    <section className="page-container py-10">
      <div className="rounded-[2rem] border border-orange-300 bg-orange-50 p-6 shadow-soft sm:p-8">
        <p className="text-xs font-black uppercase tracking-[.22em] text-orange-700">Dates DESP selon le lieu</p>
        <h2 className="mt-3 text-3xl font-black text-orange-950">Des sessions DESP sont prévues sur plusieurs sites</h2>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-orange-950/80">
          Attention : le planning DESP peut proposer des dates à Paris, en Côte d’Azur à Puget-sur-Argens et à Aurillac. Vérifiez bien le lieu indiqué avant de choisir votre session ou de déposer votre dossier.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {locations.map(([city, address]) => (
            <div key={city} className="rounded-2xl border border-orange-200 bg-white p-4">
              <p className="text-lg font-black text-academy-ink">{city}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-academy-muted">{address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DespChoiceReferencePage({ sessions }: { sessions: TrainingDatesPricingSession[] }) {
  return (
    <main className="relative overflow-hidden pb-28 lg:pb-0">
      <Hero
        theme="orange"
        badge="DESP · RNCP n°40385"
        title={<>Dirigeant d’entreprise de sécurité privée : <OrangeHighlight>formation reconnue</OrangeHighlight> ou VAE ?</>}
        subtitle="Deux chemins mènent au même objectif : préparer l’agrément dirigeant CNAPS. Choisissez la formation initiale si vous voulez apprendre le métier de dirigeant. Choisissez la VAE si votre expérience peut déjà prouver les compétences attendues."
        actions={
          <>
            <Button href="#choisir-desp" variant="orange">Comparer les 2 parcours</Button>
            <Button href="/contact" variant="orange">Parler à un conseiller</Button>
          </>
        }
        visual={<OrientationAssistant initialFormationKey="desp" />}
      />

      <section id="choisir-desp" className="scroll-mt-[120px] bg-gradient-to-b from-orange-50 via-white to-orange-50/60 px-4 py-16 sm:py-20">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[.28em] text-orange-700">Bien choisir</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
              Choisissez le parcours DESP adapté à votre <OrangeHighlight>inscription</OrangeHighlight>
            </h2>
            <p className="mt-5 text-base leading-7 text-academy-muted sm:text-lg">Formation initiale ou VAE : deux chemins différents pour atteindre le même objectif.</p>
          </div>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <DespPathCard
              tone="light"
              label="FORMATION INITIALE"
              title="DESP en initial"
              subtitle="J’apprends et je me prépare étape par étape"
              description="Le parcours idéal si vous souhaitez acquérir les bases solides pour créer, reprendre ou diriger une entreprise de sécurité privée."
              bullets={[
                'Cadre juridique de la sécurité privée',
                'Management, gestion et organisation d’une entreprise',
                'Cours, supports, entraînements et évaluations',
                'Idéal si vous devez acquérir ou consolider vos compétences',
                'Durée indicative : 7 semaines · 245 heures',
              ]}
              audience="Candidats qui veulent apprendre le métier de dirigeant étape par étape."
              cta="Voir les infos DESP initial"
              href="/formations-securite/desp-initial"
            />
            <DespPathCard
              tone="dark"
              label="VAE"
              highlight="Pour profils expérimentés"
              title="DESP en VAE"
              subtitle="Je transforme mon expérience en certification"
              description="La VAE permet de faire reconnaître officiellement les compétences déjà acquises grâce à votre expérience professionnelle."
              bullets={[
                'Analyse de votre expérience et de vos missions',
                'Constitution du dossier de preuves',
                'Accompagnement à la rédaction du livret VAE',
                'Préparation au passage devant le jury',
                'Adapté aux profils expérimentés en sécurité, encadrement, gestion ou direction',
                'Durée indicative VAE : environ 1 mois',
              ]}
              audience="Expérience justifiée en management, création, gestion d’entreprise."
              audienceTitle="Conditions :"
              cta="Voir les infos DESP VAE"
              href="/formations-securite/desp-vae"
              secondaryCta="Tester mon éligibilité à la VAE"
            />
          </div>
        </div>
      </section>

      <section id="desp-initial" className="page-container scroll-mt-[120px] py-10">
        <div className="rounded-[2rem] border border-orange-200 bg-academy-surface p-6 shadow-soft sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.22em] text-orange-700">DESP initial</p>
            <h2 className="mt-3 text-3xl font-black text-academy-ink">Informations DESP en initial</h2>
            <p className="mt-4 text-lg leading-8 text-academy-muted">La formation initiale DESP permet d’acquérir les compétences attendues en réglementation, gestion, management, organisation et pilotage d’activité.</p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <MiniStep n="1" title="Objectif" text="Construire les bases nécessaires pour exercer des responsabilités de dirigeant en sécurité privée." />
            <MiniStep n="2" title="Durée" text="Un parcours indicatif de 7 semaines et 245 heures pour progresser avec méthode." />
            <MiniStep n="3" title="Accompagnement" text="Cours, supports, entraînements et évaluations pour sécuriser votre préparation." />
          </div>
        </div>
      </section>

      <section id="desp-vae" className="page-container scroll-mt-[120px] py-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
          <div className="rounded-[2rem] border border-orange-200 bg-academy-elevated p-7 text-academy-ink shadow-card">
            <p className="text-xs font-black uppercase tracking-[.22em] text-orange-700">Comprendre la VAE</p>
            <h2 className="mt-3 text-3xl font-black">La VAE, ce n’est pas une formation classique</h2>
            <p className="mt-5 text-lg leading-8 text-academy-muted">Vous êtes accompagné pour formaliser votre parcours, sélectionner les bonnes preuves et préparer le passage devant le jury.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <MiniStep n="1" title="Expérience" text="On vérifie vos missions et responsabilités." />
              <MiniStep n="2" title="Dossier" text="Vous décrivez vos acquis avec des preuves." />
              <MiniStep n="3" title="Jury" text="Vous défendez votre parcours pour valider le titre." />
            </div>
          </div>
          <div id="test-eligibilite-vae" className="rounded-[2rem] border border-orange-300 bg-gradient-to-br from-orange-100 via-orange-300 to-orange-100 p-7 text-orange-950 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[.22em] text-orange-800">Test rapide</p>
            <h2 className="mt-3 text-3xl font-black">Tester mon éligibilité à la VAE</h2>
            <p className="mt-4 font-semibold leading-7 text-orange-950/85">Répondez à quelques questions pour savoir si votre profil semble compatible avec une démarche VAE DESP.</p>
            <div className="mt-7"><VaeEligibilityModal /></div>
          </div>
        </div>
      </section>

      <DespLocationsNotice />
      <TrainingDatesPricingSection
        sessions={sessions}
        theme="orange"
        seatCapacity={20}
        showDeliveryPeriods
        showLocationFilter
        defaultPrice="À partir de 3 800 €"
        defaultLocation="Paris, Puget-sur-Argens ou Aurillac"
        priceDescription="Parcours initial : 4 300 € · VAE : 3 800 €"
        benefits={['CPF', 'France Travail', 'Paiement x3 / x4 / x10', 'Initial ou VAE']}
        registrationHref={sessionHref}
        priceAction={{ href: '/contact?formation=desp&objet=financement', label: 'Étudier mon financement →' }}
        emptyAction={{ href: '/contact?formation=desp&objet=alerte-planning', label: 'Recevoir les prochaines dates →' }}
      />
      <ConversionStrip theme="orange" />
      <section className="page-container py-10">
        <SectionTitle title="FAQ formation" />
        <FAQ items={formationFaq} theme="orange" />
      </section>
    </main>
  );
}
