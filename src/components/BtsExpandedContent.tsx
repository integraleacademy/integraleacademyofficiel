import {
  btsExpandedCourses,
  type BtsExpandedCourseKey,
} from '@/data/btsExpanded';

function TabletIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-14 w-14" fill="none">
      <rect x="12" y="4" width="40" height="56" rx="8" fill="currentColor" opacity=".16" />
      <rect x="16" y="8" width="32" height="45" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M28 56h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 17h18M23 24h13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

function LondonIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-14 w-14" fill="none">
      <path d="M20 58h24M24 58V18h16v40M20 18h24L38 8H26l-6 10Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="29" r="6" stroke="currentColor" strokeWidth="3" />
      <path d="M32 25v5l3 2M28 8V4M36 8V4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 43h16M24 50h16" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 text-sm leading-6 ${dark ? 'text-white/72' : 'text-academy-muted'}`}>
          <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[.62rem] font-black ${dark ? 'bg-emerald-400 text-[#092014]' : 'bg-emerald-100 text-emerald-800'}`}>
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BtsStudentBenefits({ courseName }: { courseName: string }) {
  return (
    <section id="avantages-bts" className="scroll-mt-24 bg-[#081522] px-4 py-14 text-white sm:py-16 lg:py-20">
      <div className="page-container">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-academy-gold/40 bg-academy-gold/10 px-4 py-2 text-[.65rem] font-black uppercase tracking-[.2em] text-[#FFD56A]">
            Deux avantages exceptionnels inclus
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">
            Votre {courseName}, avec <span className="text-[#FFD56A]">l’iPad et Londres.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-8 text-white/65 sm:text-lg">
            Intégrale Academy équipe ses étudiants dès leur entrée dans l’apprentissage et finance intégralement une expérience collective à Londres en deuxième année.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[2rem] border border-sky-300/25 bg-gradient-to-br from-[#102E4D] to-[#0A1D31] p-7 shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:p-9">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/15 blur-2xl" />
            <div className="relative flex items-start justify-between gap-5">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.5rem] bg-sky-300 text-[#0A1D31] shadow-[0_16px_40px_rgba(125,211,252,.22)]">
                <TabletIcon />
              </span>
              <span className="rounded-full bg-white/10 px-3 py-2 text-[.62rem] font-black uppercase tracking-[.15em] text-sky-100 ring-1 ring-white/15">
                Dès la signature
              </span>
            </div>
            <p className="relative mt-7 text-[.68rem] font-black uppercase tracking-[.18em] text-sky-300">Votre outil de travail</p>
            <h3 className="relative mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">Un iPad offert à chaque étudiant.</h3>
            <p className="relative mt-4 max-w-xl text-base leading-7 text-white/65">
              L’iPad est offert dès la signature de votre contrat d’apprentissage pour travailler, suivre les cours et organiser vos projets pendant les deux années de BTS.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-amber-200/35 bg-gradient-to-br from-[#F6C94B] via-[#F0B832] to-[#DB8E1D] p-7 text-[#241707] shadow-[0_28px_80px_rgba(239,184,50,.2)] sm:p-9">
            <div className="absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-white/25 blur-2xl" />
            <div className="relative flex items-start justify-between gap-5">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.5rem] bg-[#241707] text-[#FFD56A] shadow-[0_16px_40px_rgba(36,23,7,.22)]">
                <LondonIcon />
              </span>
              <span className="rounded-full bg-[#241707] px-3 py-2 text-[.62rem] font-black uppercase tracking-[.15em] text-white shadow-soft">
                100 % pris en charge
              </span>
            </div>
            <p className="relative mt-7 text-[.68rem] font-black uppercase tracking-[.18em] text-[#704407]">Une expérience de promotion</p>
            <h3 className="relative mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">Un voyage à Londres en 2ᵉ année.</h3>
            <p className="relative mt-4 max-w-xl text-base font-semibold leading-7 text-[#432B0B]/75">
              Le voyage à Londres est intégralement financé par Intégrale Academy : il est 100 % pris en charge pour les étudiants de la promotion.
            </p>
          </article>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ['Carte étudiante officielle', 'Votre statut étudiant et les avantages associés.'],
            ['Ateliers découverte', 'Sport, théâtre, gestion du stress, masterclass et visites d’entreprises.'],
            ['3 € par jour sur le campus', 'Crédit boissons et snacks pour les étudiants en présentiel.'],
          ].map(([title, text]) => (
            <article key={title} className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5">
              <p className="font-black text-white">✓ {title}</p>
              <p className="mt-2 text-xs font-medium leading-5 text-white/48">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BtsCompleteInformation({ course }: { course: BtsExpandedCourseKey }) {
  const data = btsExpandedCourses[course];

  return (
    <section id="guide-complet" className="scroll-mt-24 bg-[#FFFDF8] px-4 py-14 text-academy-ink sm:py-16 lg:py-20">
      <div className="page-container">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[.66rem] font-black uppercase tracking-[.24em] text-yellow-700">Le guide complet de la formation</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-[-.05em] sm:text-4xl lg:text-5xl">
              Le {data.shortName} dans les moindres détails.
            </h2>
            <p className="mt-5 max-w-4xl text-base font-medium leading-8 text-academy-muted">{data.summary}</p>
          </div>
          <a
            href={data.rncpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-academy-line bg-white px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 hover:bg-academy-bg"
          >
            Fiche officielle RNCP {data.rncp} ↗
          </a>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Durée', '2 ans · 1 350 heures'],
            ['Rythme', data.rhythm],
            ['Modalités', 'Présentiel à Puget-sur-Argens ou classe virtuelle en direct'],
            ['Diplôme', `Diplôme national de niveau 5 · RNCP ${data.rncp}`],
          ].map(([label, value]) => (
            <article key={label} className="rounded-[1.5rem] border border-academy-line bg-academy-bg p-5 shadow-soft">
              <p className="text-[.62rem] font-black uppercase tracking-[.16em] text-yellow-700">{label}</p>
              <p className="mt-3 text-sm font-black leading-6">{value}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card sm:p-8">
            <p className="text-[.66rem] font-black uppercase tracking-[.2em] text-sky-300">Objectifs de la formation</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Ce que ce BTS vous prépare à faire.</h3>
            <div className="mt-6"><CheckList items={data.objective} dark /></div>
          </article>
          <article className="rounded-[2rem] border border-academy-line bg-white p-6 shadow-card sm:p-8">
            <p className="text-[.66rem] font-black uppercase tracking-[.2em] text-yellow-700">Profil et qualités attendues</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Ce parcours peut vous correspondre si…</h3>
            <div className="mt-6"><CheckList items={data.profile} /></div>
          </article>
        </div>

        <div className="mt-12">
          <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-yellow-700">Missions en entreprise</p>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h3 className="max-w-3xl text-3xl font-black tracking-[-.04em]">Des missions concrètes dès l’alternance.</h3>
            <p className="max-w-lg text-sm leading-6 text-academy-muted">Les missions varient selon l’entreprise d’accueil, son activité et votre progression.</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.missions.map((mission, index) => (
              <article key={mission} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-[1.35rem] border border-academy-line bg-academy-bg p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[.65rem] font-black text-yellow-700 shadow-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="pt-1 text-sm font-bold leading-6">{mission}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-academy-line bg-academy-bg p-5 sm:p-7 lg:p-9">
          <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-yellow-700">Programme professionnel détaillé</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-.04em]">Tous les grands blocs de compétences.</h3>
          <div className="mt-7 grid gap-3 lg:grid-cols-2">
            {data.competencyBlocks.map((block, index) => (
              <details key={block.title} open={index === 0} className="group rounded-[1.5rem] border border-academy-line bg-white p-5 shadow-soft">
                <summary className="flex cursor-pointer list-none items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0D1725] text-xs font-black text-academy-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <strong className="min-w-0 flex-1 leading-6">{block.title}</strong>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-academy-gold font-black transition group-open:rotate-45">+</span>
                </summary>
                <div className="ml-0 mt-5 sm:ml-[3.25rem]"><CheckList items={block.items} /></div>
              </details>
            ))}
          </div>
        </div>

        <div id="examens" className="mt-12 scroll-mt-24">
          <div className="grid gap-5 lg:grid-cols-[.68fr_1.32fr]">
            <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card sm:p-8">
              <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-sky-300">L’examen du BTS</p>
              <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Les épreuves et leurs coefficients.</h3>
              <p className="mt-5 leading-7 text-white/62">{data.examLocation}</p>
              <p className="mt-5 rounded-2xl bg-white/7 p-4 text-xs font-semibold leading-5 text-white/55">
                La forme exacte — contrôle en cours de formation ou épreuve ponctuelle — dépend du statut du candidat et de l’habilitation du CFA. L’équipe pédagogique confirme les modalités applicables à votre promotion.
              </p>
            </article>
            <div className="overflow-hidden rounded-[2rem] border border-academy-line bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead className="bg-academy-bg text-[.62rem] font-black uppercase tracking-[.14em] text-academy-muted">
                    <tr>
                      <th className="px-5 py-4">Épreuve</th>
                      <th className="px-5 py-4 text-center">Coefficient</th>
                      <th className="px-5 py-4">Format principal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.examUnits.map((unit) => (
                      <tr key={unit.title} className="border-t border-academy-line">
                        <td className="px-5 py-4 text-sm font-black leading-6">{unit.title}</td>
                        <td className="px-5 py-4 text-center">
                          <span className="inline-grid h-9 min-w-9 place-items-center rounded-full bg-academy-gold px-2 text-xs font-black text-academy-gold-text">{unit.coefficient}</span>
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-academy-muted">{unit.format}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-academy-line bg-white p-6 shadow-card sm:p-8">
            <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-yellow-700">Admission et alternance</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Les conditions à connaître.</h3>
            <div className="mt-6"><CheckList items={data.admission} /></div>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
              <p className="font-black">Pas encore d’entreprise à la rentrée 2026 ?</p>
              <p className="mt-2 text-sm font-medium leading-6 text-emerald-900/75">
                Vous pouvez commencer les cours et finaliser ensuite votre contrat d’apprentissage. La date limite annoncée pour cette rentrée est le 15 décembre 2026 ; la plupart des signatures interviennent entre septembre et novembre.
              </p>
            </div>
          </article>
          <article className="rounded-[2rem] border border-academy-line bg-academy-bg p-6 shadow-card sm:p-8">
            <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-yellow-700">Entreprises d’accueil</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Où réaliser votre alternance ?</h3>
            <div className="mt-6"><CheckList items={data.employers} /></div>
            <p className="mt-6 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-academy-muted shadow-soft">
              Votre rythme : <strong className="text-academy-ink">{data.rhythm}</strong>
            </p>
          </article>
        </div>

        {data.specificPanel && (
          <article className="mt-5 rounded-[2rem] border border-amber-300 bg-[#FFF4CF] p-6 shadow-soft sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-yellow-800">À savoir</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-.04em] text-yellow-950">{data.specificPanel.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-yellow-950/70">{data.specificPanel.body}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/65 p-5 ring-1 ring-yellow-300"><CheckList items={data.specificPanel.items} /></div>
            </div>
          </article>
        )}

        {data.campusEquipment && (
          <article className="mt-5 overflow-hidden rounded-[2rem] bg-[#102B48] p-6 text-white shadow-card sm:p-8">
            <div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
              <div>
                <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-sky-300">Équipements du campus</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-.04em]">{data.campusEquipment.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{data.campusEquipment.intro}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.campusEquipment.items.map((item) => (
                  <p key={item} className="rounded-2xl border border-white/10 bg-white/7 p-4 text-sm font-bold leading-6 text-white/75">✓ {item}</p>
                ))}
              </div>
            </div>
          </article>
        )}

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-[#0D1725] p-6 text-white shadow-card sm:p-8">
            <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-sky-300">Après le diplôme</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Les métiers accessibles.</h3>
            <div className="mt-6"><CheckList items={data.jobs} dark /></div>
          </article>
          <article className="rounded-[2rem] border border-academy-line bg-white p-6 shadow-card sm:p-8">
            <p className="text-[.66rem] font-black uppercase tracking-[.22em] text-yellow-700">Poursuite d’études</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">Continuer vers un bac+3 ou plus.</h3>
            <div className="mt-6"><CheckList items={data.furtherStudies} /></div>
          </article>
        </div>
      </div>
    </section>
  );
}
