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

function EnrollmentShowcase(){return <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#111111,#263752_60%,#151515)] px-4 py-14 text-white md:py-20"><div className="absolute inset-0 -z-10 opacity-70"><div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-academy-gold/25 blur-3xl"/><div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"/></div><div className="mx-auto max-w-7xl"><div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><Badge>Inscription et financement</Badge><h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Inscription en 5 temps</h2><p className="mt-4 max-w-3xl text-base leading-8 text-stone-200 md:text-lg">Nous vous accompagnons du premier rendez-vous téléphonique jusqu’à la validation du financement et au démarrage de votre formation théorique en ligne.</p></div><div className="flex shrink-0 flex-wrap gap-3"><Button href="tel:0422470768" variant="secondary">Appeler</Button><Button href="/contact" variant="ghost">Être rappelé(e)</Button></div></div><div className="rounded-[2rem] bg-white/95 p-4 text-academy-ink shadow-[0_28px_90px_rgba(0,0,0,.28)] ring-1 ring-white/20 md:p-6"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{enrollmentSteps.map(item=><div key={item.step} className="rounded-2xl bg-academy-bg/70 p-4 ring-1 ring-academy-line"><span className="grid h-10 w-10 place-items-center rounded-full bg-academy-ink text-sm font-black text-academy-gold">{item.step}</span><h4 className="mt-4 font-black">{item.title}</h4><p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>{item.step==='01'&&<div className="mt-4 flex flex-wrap gap-2"><Button href="tel:0422470768">Appeler</Button><Button href="/contact" variant="ghost">Être rappelé(e)</Button></div>}{item.step==='03'&&<div className="mt-4 inline-block rounded-xl bg-blue-50 px-3 py-2 text-sm font-black leading-5 text-blue-700 ring-1 ring-blue-100">L’Identité<br/>Numérique</div>}{item.note&&<p className="mt-3 text-sm font-bold text-academy-ink underline underline-offset-4">{item.note}</p>}</div>)}</div><div className="mt-4 rounded-2xl bg-academy-gold/20 p-4 text-sm font-bold leading-6 text-stone-800">Votre financement est validé ? Vous êtes inscrit, vous pouvez commencer votre formation théorique en ligne.</div></div></div></section>}


export default function Page(){const f=formations.find(x=>x.slug==='/vtc')!;return <><Hero badge={f.certification} title={f.title} subtitle={f.short} actions={<><Button href="/contact">Inscription / devis</Button><Button href="tel:0422470768" variant="secondary">Contact</Button></>}/><section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-4 md:grid-cols-3"><FeatureCard title="Durée">{f.duration}</FeatureCard><FeatureCard title="Public concerné">{f.audience}</FeatureCard><FeatureCard title="Prérequis">{f.prerequisites}</FeatureCard><FeatureCard title="Lieux">{f.locations}</FeatureCard><FeatureCard title="Financement">{f.financing}</FeatureCard><FeatureCard title="Certification / examen">{f.certification}<br/>Tarif : {f.price}</FeatureCard></div></section><ConversionStrip/><ChatGptAgentBanner/><EnrollmentShowcase/>{[['Objectifs de la formation',f.objectives],['Programme détaillé',f.program],['Modalités d’évaluation',f.evaluation],['Débouchés',f.outcomes],['Pourquoi Intégrale Academy',f.why]].map(([t,items])=><section key={t as string} className="mx-auto max-w-5xl px-4 py-8"><h2 className="text-2xl font-black">{t as string}</h2><div className="mt-5 grid gap-3">{(items as string[]).map(i=><div key={i} className="rounded-2xl bg-white p-4 ring-1 ring-academy-line"><Badge tone="green">À conserver</Badge><p className="mt-2 text-stone-700">{i}</p></div>)}</div></section>)}<section className="px-4 py-10"><SectionTitle title="FAQ formation"/><FAQ items={formationFaq}/></section><section className="px-4"><ContactBlock/></section></>}
