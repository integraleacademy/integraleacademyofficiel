import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrainingHero, TrainingHeroSessionCard } from '@/components/TrainingHero';
import { DespHeroSessions } from '@/components/DespHeroSessions';

export function DespHero({ variant, title, subtitle, stats, sessions }: {
  variant: 'initial' | 'vae';
  title: string;
  subtitle: ReactNode;
  stats: [string, string, string?][];
  sessions: any[];
}) {
  const isVae = variant === 'vae';
  const next = sessions.find(session => session.training?.slug === 'desp-vae');
  const price = stats.find(([label]) => label === 'Tarif')?.[1] || (isVae ? '3 800 €' : '4 300 €');
  return <TrainingHero
    theme="orange"
    imageSrc={`/images/desp-${variant}-hero.jpg`}
    badge={`DESP · RNCP n°40385 · Niveau 5 · ${isVae ? 'VAE' : 'Formation initiale'}`}
    title={title}
    tagline={isVae ? 'Faites reconnaître' : 'Créez, reprenez,'}
    taglineAccent={isVae ? 'votre expérience.' : 'dirigez votre entreprise.'}
    description={subtitle}
    primaryAction={{ href: `/contact?formation=desp-${variant}`, label: 'Recevoir le dossier →' }}
    additionalAction={<Link href="/despvaeouinitial" className="mt-4 inline-block text-sm font-bold text-orange-200 underline decoration-orange-300/50 underline-offset-4">Comparer initial et VAE →</Link>}
    highlights={isVae ? ['Accompagnement individualisé', 'À distance', 'Préparation du jury'] : ['7 semaines · 245 h', 'Distanciel + présentiel', 'Suivi personnalisé']}
    facts={stats.map(([label, value, detail]) => [label, value, ...(detail ? [detail] : [])])}
  >
    {isVae ? <TrainingHeroSessionCard
      session={next}
      theme="orange"
      assistantKey="desp-vae"
      duration="Selon dossier et jury"
      defaultPrice={price}
      defaultLocation="À distance · jury selon convocation"
      modality="Accompagnement VAE"
      label="Votre parcours VAE"
      emptyTitle="Préparez votre parcours VAE"
      emptyDescription="Nous étudions votre expérience et définissons votre accompagnement. Le jury est organisé selon la convocation du certificateur."
      emptyActionLabel="Démarrer mon dossier VAE →"
      examLabel="Jury le"
    /> : <DespHeroSessions sessions={sessions} defaultPrice={price} />}
  </TrainingHero>;
}
