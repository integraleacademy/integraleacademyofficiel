import { notFound } from "next/navigation";
import { bts } from "@/data/site";
import {
  Button,
  ConversionStrip,
  FeatureCard,
  Highlight,
  PremiumFAQSection,
} from "@/components/ui";
import { BtsMosReferencePage } from "@/components/BtsMosReferencePage";
import { BtsMcoReferencePage } from "@/components/BtsMcoReferencePage";

export function generateStaticParams() {
  return bts.map((x) => ({ slug: x.slug.split("/").pop()! }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "mos") {
    return {
      title: "BTS MOS en alternance",
      description:
        "Préparez le BTS Management Opérationnel de la Sécurité en alternance, à Puget-sur-Argens ou 100 % à distance en visioconférence.",
    };
  }
  if (slug === "mco") {
    return {
      title: "BTS MCO en alternance",
      description:
        "Préparez le BTS Management Commercial Opérationnel en alternance, à Puget-sur-Argens ou 100 % à distance en visioconférence.",
    };
  }
  const f = bts.find((x) => x.slug.endsWith(slug));
  return { title: f?.title || "BTS", description: f?.desc };
}

const btsApplicationUrl = "https://inscriptionsbts.onrender.com/";

function btsContactSlug(slug: string) {
  return slug.replace(/[^a-z0-9-]/gi, "-");
}
function shortBtsName(title: string) {
  const match = title.match(/\(([^)]+)\)/);
  return match?.[1] || title.replace(/^BTS\s+/i, "");
}
function btsHeroStats(f: (typeof bts)[number]) {
  return [
    ["Durée", f.duration],
    ["Modalité", f.locations],
    ["Financement", f.financing],
    ["Diplôme", f.certification],
  ];
}
function btsCards(f: (typeof bts)[number]) {
  const icons = ["🎓", "🏢", "🤝", "📈", "🧭", "✅"];
  const source = [...f.objectives, ...f.missions].slice(0, 6);
  return source.map((text, index) => [
    icons[index] || "✓",
    index === 0
      ? "Objectif principal"
      : index === 1
        ? "Compétence métier"
        : index === 2
          ? "Alternance"
          : index === 3
            ? "Pilotage"
            : index === 4
              ? "Accompagnement"
              : "Validation",
    text,
  ]);
}
function btsExamTitles(f: (typeof bts)[number]) {
  const defaults = [
    "Épreuves nationales",
    "Dossiers professionnels",
    "Suivi en entreprise",
  ];
  return f.evaluation.map((_, i) => defaults[i] || `Étape ${i + 1}`);
}

const btsAdmissionSteps = [
  {
    title: "Dossier de pré-inscription 2026",
    text: "Complétez votre dossier de pré-inscription en ligne. Vous pouvez aussi candidater directement sur Parcoursup lorsque le parcours concerné y est ouvert.",
    accent: "Lien de candidature BTS",
  },
  {
    title: "Étude de votre candidature",
    text: "Dès réception de votre vœu Parcoursup ou de votre dossier, notre équipe admissions étudie votre candidature dans un délai indicatif de 10 jours.",
    accent: "Processus détaillé",
  },
  {
    title: "Admission et dossier école",
    text: "Si vous êtes admis, nous vous envoyons par mail le dossier d’inscription à compléter et à nous retourner selon les consignes transmises.",
    accent: "Réponse par mail",
  },
  {
    title: "Inscription officielle",
    text: "Quand votre dossier d’inscription est complet, votre inscription devient officielle. Votre carte étudiante et votre certificat de scolarité sont ensuite envoyés par courrier.",
    accent: "Dossier complet",
  },
  {
    title: "Entreprise d’accueil",
    text: "Vous recherchez une entreprise d’accueil et signez votre contrat d’apprentissage. Pour la rentrée 2026, la signature peut intervenir jusqu’au 15 décembre 2026.",
    accent: "Alternance",
  },
];

function BtsSection({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-container py-10 sm:py-14">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[.24em] text-academy-gold">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 text-lg leading-8 text-academy-muted">{intro}</p>
        )}
      </div>
      {children}
    </section>
  );
}
function BtsCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <article className="reveal rounded-[1.5rem] border border-academy-line bg-academy-elevated p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <span className="text-3xl">{icon}</span>
      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <p className="mt-2 leading-7 text-academy-muted">{text}</p>
    </article>
  );
}

function BtsAdmissionShowcase() {
  return (
    <section
      id="candidature-admission-bts"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#111111,#263752_60%,#151515)] px-4 py-14 text-white md:py-20"
    >
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-academy-gold/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="page-container">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-academy-gold shadow-soft backdrop-blur">
              Candidature & admission BTS 2026
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Votre candidature BTS en <Highlight>5 étapes</Highlight>
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-stone-200 md:text-lg">
              Nous recevons chaque année de nombreuses candidatures : nous vous
              conseillons de candidater dès maintenant via le dossier de
              pré-inscription 2026.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={btsApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-center text-sm font-black text-academy-ink shadow-gold transition hover:-translate-y-0.5"
            >
              Candidater / se pré-inscrire
            </a>
            <a
              href="tel:0422470768"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-center text-sm font-black text-academy-ink ring-1 ring-academy-line transition hover:-translate-y-0.5"
            >
              Appeler
            </a>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white/95 p-5 text-academy-ink shadow-[0_28px_90px_rgba(0,0,0,.28)] ring-1 ring-white/20 sm:p-6 md:p-7">
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {btsAdmissionSteps.map((step, index) => (
              <article
                key={step.title}
                className="flex h-full min-h-[20rem] flex-col rounded-[1.5rem] border border-academy-line bg-gradient-to-b from-white to-blue-50/90 p-6 shadow-soft"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-academy-ink text-sm font-black text-academy-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-5 text-lg font-black leading-6 text-academy-ink">
                  {step.title}
                </h4>
                <p className="mt-4 flex-1 text-sm font-semibold leading-7 text-academy-muted">
                  {step.text}
                </p>
                <p className="mt-5 inline-flex rounded-full bg-[#FF4B23]/10 px-3 py-1 text-xs font-black text-[#FF4B23]">
                  {step.accent}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BtsPromise() {
  return (
    <section className="bg-gradient-to-r from-[#FAF7F0] via-white to-[#EAF2FF] px-4 py-14 sm:py-16">
      <div className="page-container grid gap-5 lg:grid-cols-3">
        <div className="reveal rounded-[1.75rem] bg-[#111827] p-6 text-white shadow-card lg:col-span-1">
          <p className="text-xs font-black uppercase tracking-[.22em] text-academy-gold">
            Parcours BTS guidé
          </p>
          <h2 className="mt-3 text-3xl font-black">
            Nous vous accompagnons de la candidature jusqu’au{" "}
            <Highlight>contrat d’apprentissage</Highlight>
          </h2>
        </div>
        {[
          "Avant toute inscription, nous vérifions votre projet, votre niveau, votre rythme d’alternance et les pièces nécessaires au dossier.",
          "Le site de candidature et de pré-inscription centralise le démarrage du dossier BTS : vous avancez ensuite avec l’équipe admissions.",
        ].map((text) => (
          <div
            key={text}
            className="reveal rounded-[1.75rem] border border-academy-line bg-academy-elevated p-6 shadow-soft"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 font-black text-white">
              ✓
            </span>
            <p className="mt-5 text-lg font-bold leading-8 text-academy-muted">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = bts.find((x) => x.slug.endsWith(slug));
  if (!f) notFound();
  if (slug === "mos") return <BtsMosReferencePage />;
  if (slug === "mco") return <BtsMcoReferencePage />;
  const contactSlug = btsContactSlug(slug);
  const label = shortBtsName(f.title);
  return (
    <main className="relative overflow-hidden pb-28 lg:pb-0">
      <section className="relative isolate bg-[#0B0F17] px-4 py-12 text-white sm:py-16 lg:py-14 xl:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(216,166,64,.34),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,.18),transparent_28%),linear-gradient(135deg,#080B10_0%,#121827_55%,#111827_100%)]" />
        <div className="absolute -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-academy-gold/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="page-container">
          <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_.98fr]">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-academy-gold/40 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[#F8E6B5] backdrop-blur">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,.95)]" />
                </span>
                {f.certification}
              </span>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {f.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                {f.desc}
              </p>
              <div className="mt-5 inline-flex max-w-2xl items-center gap-3 rounded-2xl border border-sky-300/35 bg-sky-400/12 px-4 py-3 text-left shadow-[0_18px_45px_rgba(14,165,233,.12)] backdrop-blur">
                <p className="text-base font-black leading-6 text-white sm:text-lg">
                  BTS en alternance{" "}
                  <span className="text-sky-200">{f.locations}</span>
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={btsApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-academy-gold px-5 py-3 text-sm font-black text-academy-ink transition hover:-translate-y-0.5 hover:brightness-95"
                >
                  Candidater / pré-inscription
                </a>
                <Button href="tel:0422470768" variant="secondary">
                  Appeler un conseiller
                </Button>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {btsHeroStats(f).map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-white/10 bg-white/8 p-3 sm:p-4"
                  >
                    <p className="text-xs font-black uppercase tracking-[.18em] text-white/50">
                      {k}
                    </p>
                    <p className="mt-1 font-extrabold text-white">{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-card backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[.2em] text-academy-gold">
                Admissions BTS 2026
              </p>
              <h2 className="mt-4 text-3xl font-black">
                Un dossier clair, suivi par l’école
              </h2>
              <p className="mt-4 leading-7 text-white/76">
                Déposez votre candidature ou pré-inscription sur la plateforme
                dédiée. Notre équipe étudie votre dossier, vous répond par mail
                et vous guide jusqu’à l’inscription officielle puis la recherche
                d’entreprise.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-black uppercase tracking-[.18em] text-white/55">
                  Plateforme BTS
                </p>
                <p className="mt-2 break-words text-lg font-black text-academy-gold">
                  inscriptionsbts.onrender.com
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Candidatures et pré-inscriptions BTS 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BtsSection
        eyebrow="Métier"
        title={`À quoi prépare le BTS ${label} ?`}
        intro={f.audience}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {btsCards(f).map(([icon, title, text]) => (
            <BtsCard key={title + text} icon={icon} title={title} text={text} />
          ))}
        </div>
      </BtsSection>
      <BtsSection eyebrow="Repères" title="Informations clés">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard title="Public concerné">{f.audience}</FeatureCard>
          <FeatureCard title="Prérequis">{f.prerequisites}</FeatureCard>
          <FeatureCard title="Financement">{f.financing}</FeatureCard>
        </div>
      </BtsSection>
      <BtsPromise />
      <BtsSection eyebrow="Compétences" title="Ce que vous allez apprendre">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {f.objectives.map((item) => (
            <div
              key={item}
              className="reveal flex gap-3 rounded-2xl border border-academy-line bg-academy-surface p-4 shadow-soft"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-sm font-black text-white">
                ✓
              </span>
              <p className="text-sm font-semibold leading-6 text-academy-muted">
                {item}
              </p>
            </div>
          ))}
        </div>
      </BtsSection>
      <BtsSection eyebrow="Programme" title="Programme du BTS">
        <div className="space-y-3">
          {f.program.map((item, index) => (
            <details
              key={item}
              open={index === 0}
              className="group rounded-2xl border border-academy-line bg-academy-elevated p-5 shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                <span>{item.split(":")[0]}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-academy-gold text-academy-gold-text transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-academy-muted">{item}</p>
            </details>
          ))}
        </div>
      </BtsSection>
      <BtsSection eyebrow="Certification" title="Validation et examen final">
        <div className="grid gap-4 md:grid-cols-3">
          {btsExamTitles(f).map((step, i) => (
            <div
              key={step}
              className="reveal rounded-2xl border border-academy-line bg-academy-surface p-5 shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-academy-ink font-black text-academy-gold">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-black">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-academy-muted">
                {f.evaluation[i]}
              </p>
            </div>
          ))}
        </div>
      </BtsSection>
      <BtsAdmissionShowcase />
      <ConversionStrip />
      <BtsSection eyebrow="Missions en entreprise" title="Pendant l’alternance">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {f.missions.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-academy-line bg-academy-elevated p-5 font-bold text-academy-muted shadow-soft"
            >
              {item}
            </div>
          ))}
        </div>
      </BtsSection>
      <BtsSection eyebrow="Débouchés" title="Après le BTS">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {f.outcomes.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-academy-line bg-academy-elevated p-5 font-bold text-academy-muted shadow-soft"
            >
              {item}
            </div>
          ))}
        </div>
      </BtsSection>
      <BtsSection eyebrow="Profil" title="Qualités attendues">
        <div className="grid gap-3 md:grid-cols-2">
          {f.qualities.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-academy-surface p-4 ring-1 ring-academy-line"
            >
              <p className="font-semibold leading-7 text-academy-muted">
                ✓ {item}
              </p>
            </div>
          ))}
        </div>
      </BtsSection>
      <PremiumFAQSection
        badge={`FAQ BTS ${label}`}
        title={`Vos questions sur le BTS ${label}`}
        description="Retrouvez les réponses fréquentes sur le déroulement, la candidature, l’alternance, le financement et l’examen."
        items={f.faq}
        contactHref={`/contact?formation=${contactSlug}`}
        contactLabel="Demander des informations"
      />
    </main>
  );
}
