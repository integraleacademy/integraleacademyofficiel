import { Badge, Button, ChatGptAgentBanner, ContactBlock, ConversionStrip, FAQ, FeatureCard, Hero, SectionTitle } from '@/components/ui';
import { formationFaq } from '@/data/faq';
import { formations } from '@/data/site';

export const metadata={title:'Formation VTC',description:'Formation chauffeur VTC tout inclus avec e-learning, pratique et CPF.'};

const enrollmentSteps = [
  {
    step: '1',
    title: 'Premier rendez-vous',
    text: "Nous vous invitons à convenir d'un rendez-vous téléphonique en nous contactant au 04 22 47 07 68 afin que nous puissions aborder ensemble tous les détails de votre projet de formation.",
    note: 'Vous pouvez demander à être rappelé(e).',
  },
  {
    step: '2',
    title: 'Organisation de la formation',
    text: "Lors de notre rendez-vous téléphonique nous aborderons ensemble tous les détails pratiques et l'organisation de la formation.",
  },
  {
    step: '3',
    title: 'Identité Numérique La Poste',
    text: 'Si vous souhaitez utiliser votre Compte Personnel de Formation (CPF) ou demander un financement à Pôle Emploi vous devez créer votre Identité Numérique La Poste.',
    note: 'Pour en savoir plus, cliquez-ci.',
  },
  {
    step: '4',
    title: 'Finalisation du dossier',
    text: "Lors d'un second entretien téléphonique, nous finalisons ensemble votre inscription (demande de financement à Pôle Emploi, validation de vos droits CPF).",
  },
  {
    step: '5',
    title: 'Validation & accès formation',
    text: 'Votre financement est validé ? Vous êtes inscrit, vous pouvez commencer votre formation théorique en ligne.',
  },
];

function EnrollmentShowcase(){return <section className="relative overflow-hidden px-4 py-14"><div className="absolute inset-x-0 top-10 -z-10 mx-auto h-72 max-w-6xl rounded-full bg-academy-gold/20 blur-3xl"/><div className="mx-auto max-w-7xl"><div className="mx-auto max-w-3xl text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-4 border-academy-gold text-3xl font-black text-academy-gold">↓</div><h2 className="mt-6 inline-block bg-academy-gold px-4 py-2 text-3xl font-black tracking-tight text-white md:text-5xl">Inscription et financement</h2><p className="mx-auto mt-5 inline-block bg-academy-ink px-3 py-1 text-lg font-black text-white">Les étapes de votre inscription :</p></div><div className="mt-8 grid overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-academy-line lg:grid-cols-5">{enrollmentSteps.map((item,index)=><article key={item.step} className={`relative p-6 text-center md:p-8 ${index%2===0?'bg-blue-100':'bg-white'}`}><div className="absolute inset-x-0 top-0 h-1 bg-academy-gold/70"/><div className="mx-auto grid h-20 w-20 place-items-center text-6xl font-black text-white [text-shadow:_4px_4px_0_#32133f,_8px_8px_0_rgba(17,17,17,.22)]">{item.step}</div><h3 className="mt-8 text-lg font-black text-academy-ink">{item.title}</h3><p className="mt-4 text-sm font-bold leading-6 text-slate-700">{item.text}</p>{item.step==='1'&&<div className="mt-5 flex flex-col gap-3"><Button href="tel:0422470768">Appeler</Button><Button href="/contact" variant="ghost">Être rappelé(e)</Button></div>}{item.step==='3'&&<div className="mt-5 rounded-2xl bg-white p-3 font-black leading-5 text-blue-700 shadow-sm ring-1 ring-blue-100">L’Identité<br/>Numérique</div>}{item.note&&item.step!=='1'&&<p className="mt-4 text-sm font-black underline underline-offset-4 text-academy-ink">{item.note}</p>}</article>)}</div><div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3"><Button href="/contact" variant="secondary">Démarrer mon inscription</Button><Button href="tel:0422470768" variant="ghost">04 22 47 07 68</Button></div></div></section>}

export default function Page(){const f=formations.find(x=>x.slug==='/vtc')!;return <><Hero badge={f.certification} title={f.title} subtitle={f.short} actions={<><Button href="/contact">Inscription / devis</Button><Button href="tel:0422470768" variant="secondary">Contact</Button></>}/><section className="mx-auto max-w-7xl px-4 py-10"><div className="grid gap-4 md:grid-cols-3"><FeatureCard title="Durée">{f.duration}</FeatureCard><FeatureCard title="Public concerné">{f.audience}</FeatureCard><FeatureCard title="Prérequis">{f.prerequisites}</FeatureCard><FeatureCard title="Lieux">{f.locations}</FeatureCard><FeatureCard title="Financement">{f.financing}</FeatureCard><FeatureCard title="Certification / examen">{f.certification}<br/>Tarif : {f.price}</FeatureCard></div></section><ConversionStrip/><ChatGptAgentBanner/><EnrollmentShowcase/>{[['Objectifs de la formation',f.objectives],['Programme détaillé',f.program],['Modalités d’évaluation',f.evaluation],['Débouchés',f.outcomes],['Pourquoi Intégrale Academy',f.why]].map(([t,items])=><section key={t as string} className="mx-auto max-w-5xl px-4 py-8"><h2 className="text-2xl font-black">{t as string}</h2><div className="mt-5 grid gap-3">{(items as string[]).map(i=><div key={i} className="rounded-2xl bg-white p-4 ring-1 ring-academy-line"><p className="mt-2 text-stone-700">{i}</p></div>)}</div></section>)}<section className="px-4 py-10"><SectionTitle title="FAQ formation"/><FAQ items={formationFaq}/></section><section className="px-4"><ContactBlock/></section></>}
