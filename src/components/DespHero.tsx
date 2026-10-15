import type { ReactNode } from 'react';
import { TrainingReferenceHero } from '@/components/TrainingReferenceLayout';
import Link from 'next/link';

import { TrainingHeroSessionCard } from '@/components/TrainingHero';
import { DespHeroSessions } from '@/components/DespHeroSessions';
import { despArtwork } from '@/data/manualIllustrations';

export function DespHero({ variant, title, subtitle, stats, sessions }: {
  variant: 'initial' | 'vae';
  title: string;
  subtitle: ReactNode;
  stats: [string, string, string?][];
  sessions: any[];
}) {
  const isVae = variant === 'vae';
  const next = sessions.find(session => session.training?.slug === 'desp-vae');
  const price = stats.find(([label]) => label === 'Tarif' || label === 'Tarif 2027')?.[1] || (isVae ? '3 850 € TTC' : '4 350 € TTC');
  const rncp = stats.find(([label]) => label === 'RNCP')?.[1] || 'RNCP40385';
  return <TrainingReferenceHero
    id={`desp-${variant}`}
    heading={isVae ? 'Votre expérience.' : 'Devenez dirigeant'}
    accent={isVae ? 'Votre titre DESP.' : 'en sécurité privée.'}
    illustration={isVae ? despArtwork.direction : despArtwork.pilotage}
    caption={isVae ? 'Démontrer. Valoriser. Faire reconnaître.' : 'Créer. Gérer. Développer.'}
    badge={`DESP · ${isVae ? 'Validation des acquis de l’expérience' : 'Formation initiale'}`}
    title={title}
    tagline={isVae ? 'Faites reconnaître votre expérience.' : 'Créez, reprenez, dirigez votre entreprise.'}
    description={subtitle}
    primaryAction={{ href: `/contact?formation=desp-${variant}`, label: 'Recevoir le dossier →' }}
    additionalAction={<Link href="/despvaeouinitial" className="self-center text-sm font-bold text-orange-200 underline decoration-orange-300/50 underline-offset-4">Comparer initial et VAE →</Link>}
  >
    {isVae ? <TrainingHeroSessionCard
      session={next}
      theme="orange"
      assistantKey="desp-vae"
      defaultPrice={price}
      defaultLocation="À distance"
      locationNote="Jury selon convocation"
      label="Votre parcours VAE"
      emptyTitle="Préparez votre parcours VAE"
      emptyDescription="Un calendrier personnalisé après étude de votre expérience. Jury selon convocation."
      emptyBadgeLabel="Calendrier personnalisé"
      emptyActionLabel="Démarrer mon dossier VAE →"
      examLabel="Jury le"
      registrationHref="/contact?formation=desp-vae"
      facts={[
        { label: 'Certification visée', value: 'Titre DESP', details: ['Dirigeant d’entreprise de sécurité privée', `Niveau 5 · ${rncp}`] },
        { label: 'Parcours VAE', value: 'Durée variable', details: ['Selon votre dossier et le jury'] },
        { label: 'Accompagnement', value: 'Individualisé', details: ['Dossier de preuves', 'Préparation du jury'] },
      ]}
    /> : <DespHeroSessions sessions={sessions} defaultPrice={price} rncp={rncp} />}
  </TrainingReferenceHero>;
}
