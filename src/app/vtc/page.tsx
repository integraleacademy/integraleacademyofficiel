import { Badge, Button, ChatGptAgentBanner, ContactBlock, ConversionStrip, FAQ, FeatureCard, Hero, SectionTitle } from '@/components/ui';
import { formationFaq } from '@/data/faq';
import { formations } from '@/data/site';

export const metadata={title:'Formation VTC',description:'Formation chauffeur VTC tout inclus avec e-learning, pratique et CPF.'};

const enrollmentSteps = [
  {
    step: '01',
    title: 'Premier rendez-vous',
    text: "Nous vous invitons à convenir d'un rendez-vous téléphonique en nous contactant au 04 22 47 07 68 afin que nous puissions aborder ensemble tous les détails de votre projet de formation.",
    note: 'Vous pouvez demander à être rappelé(e).',
  },
  {
    step: '02',
    title: 'Organisation de la formation',
    text: "Lors de notre rendez-vous téléphonique nous aborderons ensemble tous les détails pratiques et l'organisation de la formation.",
  },
  {
    step: '03',
    title: 'Identité Numérique La Poste',
    text: 'Si vous souhaitez utiliser votre Compte Personnel de Formation (CPF) ou demander un financement à Pôle Emploi vous devez créer votre Identité Numérique La Poste.',
    note: 'Pour en savoir plus, cliquez-ci.',
  },
  {
    step: '04',
    title: 'Finalisation du dossier',
    text: "Lors d'un second entretien téléphonique, nous finalisons ensemble votre inscription (demande de financement à Pôle Emploi, validation de vos droits CPF).",
  },
  {
    step: '05',
    title: 'Validation & accès formation',
    text: 'Votre financement est validé ? Vous êtes inscrit, vous pouvez commencer votre formation théorique en ligne.',
  },
];

function EnrollmentShowcase(){return <section className="relative overflow-hidden px-4 py-14"><div className="absolute inset-x-0 top-10 -z-10 mx-auto h-64 max-w-5xl rounded-full bg-academy-gold/20 blur-3xl"/><div className="mx-auto max-w-7xl rounded-[2.5rem] bg-academy-ink p-6 text-white shadow-soft md:p-10"><div className="grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-center"><div><Badge>Inscription et financement</Badge><h2 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">Les étapes de votre inscription.</h2><p className="mt-5 text-lg leading-8 text-stone-200">Nous vous accompagnons du premier rendez-vous téléphonique jusqu’à la validation du financement et au démarrage de votre formation théorique en ligne.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="tel:0422470768" variant="secondary">Appeler</Button><Button href="/contact" variant="ghost">Être rappelé(e)</Button></div></div><div className="relative"><div className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-full border border-academy-gold/50 md:block"/><div className="rounded-[2rem] bg-white p-4 text-academy-ink shadow-gold"><div className="rounded-[1.5rem] bg-academy-bg p-5"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[.2em] text-yellow-700">Plan d’action</p><h3 className="mt-1 text-2xl font-black">Inscription en 5 temps</h3></div><span className="grid h-14 w-14 place-items-center rounded-2xl bg-academy-gold text-2xl font-black">↓</span></div><div className="mt-6 grid gap-4 md:grid-cols-2">{enrollmentSteps.map(item=><div key={item.step} className="group rounded-3xl bg-white p-5 ring-1 ring-academy-line transition hover:-translate-y-1 hover:shadow-soft"><div className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-academy-ink font-black text-academy-gold">{item.step}</span><div><h4 className="font-black">{item.title}</h4><p className="mt-1 text-sm leading-6 text-stone-600">{item.text}</p>{item.step==='01'&&<div className="mt-4 flex flex-wrap gap-2"><Button href="tel:0422470768">Appeler</Button><Button href="/contact" variant="ghost">Être rappelé(e)</Button></div>}{item.step==='03'&&<div className="mt-4 inline-block rounded-2xl bg-blue-50 px-4 py-3 font-black leading-5 text-blue-700 ring-1 ring-blue-100">L’Identité<br/>Numérique</div>}{item.note&&<p className="mt-3 text-sm font-black text-academy-ink underline underline-offset-4">{item.note}</p>}</div></div></div>)}</div><div className="mt-5 rounded-3xl bg-academy-gold/25 p-5 text-sm font-bold leading-6 text-stone-800">Votre financement est validé ? Vous êtes inscrit, vous pouvez commencer votre formation théorique en ligne.</div></div></div></div></div></div></section>}

export default function Page(){const f=formations.find(x=>x.slug==='/vtc')!;return <><Hero badge={f.certification} title={f.title} subtitle={f.short} actions={<><Button href="/contact">Inscription / devis</Button><Button href="tel:0422470768" variant="secondary">Contact</Button></>}/><section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-4 md:grid-cols-3"><FeatureCard title="Durée">{f.duration}</FeatureCard><FeatureCard title="Public concerné">{f.audience}</FeatureCard><FeatureCard title="Prérequis">{f.prerequisites}</FeatureCard><FeatureCard title="Lieux">{f.locations}</FeatureCard><FeatureCard title="Financement">{f.financing}</FeatureCard><FeatureCard title="Certification / examen">{f.certification}<br/>Tarif : {f.price}</FeatureCard></div></section><ConversionStrip/><ChatGptAgentBanner/><EnrollmentShowcase/>{[['Objectifs de la formation',f.objectives],['Programme détaillé',f.program],['Modalités d’évaluation',f.evaluation],['Débouchés',f.outcomes],['Pourquoi Intégrale Academy',f.why]].map(([t,items])=><section key={t as string} className="mx-auto max-w-5xl px-4 py-8"><h2 className="text-2xl font-black">{t as string}</h2><div className="mt-5 grid gap-3">{(items as string[]).map(i=><div key={i} className="rounded-2xl bg-white p-4 ring-1 ring-academy-line"><p className="mt-2 text-stone-700">{i}</p></div>)}</div></section>)}<section className="px-4 py-10"><SectionTitle title="FAQ formation"/><FAQ items={formationFaq}/></section><section className="px-4"><ContactBlock/></section></>}
