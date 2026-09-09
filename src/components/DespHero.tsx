import Link from 'next/link';
import type { ReactNode } from 'react';
import { TrainingHero, TrainingHeroSessionCard } from '@/components/TrainingHero';

export function DespHero({ variant, title, subtitle, stats, sessions }: {
  variant: 'initial' | 'vae';
  title: string;
  subtitle: ReactNode;
  stats: [string, string, string?][];
  sessions: any[];
}) {
  const isVae = variant === 'vae';
  const next = sessions.find(session => !isVae || session.training?.slug === 'desp-vae');
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
    <TrainingHeroSessionCard
      session={next}
      theme="orange"
      assistantKey={isVae ? 'desp-vae' : 'desp'}
      duration={isVae ? 'Selon dossier et jury' : '245 heures'}
      defaultPrice={price}
      defaultLocation={isVae ? 'À distance · jury selon convocation' : 'Paris, Côte d’Azur ou Aurillac'}
      modality={isVae ? 'Accompagnement VAE' : 'Distanciel + présentiel'}
      label={isVae ? 'Votre parcours VAE' : 'Prochaine session'}
      emptyTitle={isVae ? 'Préparez votre parcours VAE' : undefined}
      emptyDescription={isVae ? 'Nous étudions votre expérience et définissons votre accompagnement. Le jury est organisé selon la convocation du certificateur.' : undefined}
      emptyActionLabel={isVae ? 'Démarrer mon dossier VAE →' : undefined}
      examLabel={isVae ? 'Jury le' : 'Examen le'}
    />
  </TrainingHero>;
}
