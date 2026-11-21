import type { ReactNode } from 'react';
import { despVaeAdmin } from '@/data/despVae';
import { TrainingOfficialReferences } from './ApsExperienceSections';

export function DespOfficialReferences({ course, conditions, note, details, detailsTitle }: {
  course: 'desp-initial' | 'desp-vae'; conditions: string[]; note: string; details: ReactNode; detailsTitle: string;
}) {
  return <TrainingOfficialReferences course={course} number="10" alias="reperes-officiels"
    title={<>Le titre DESP et <em>l’agrément dirigeant</em></>} intro="Les références du titre et les démarches pour exercer à la direction d’une entreprise de sécurité privée."
    qualification="DESP" name="Dirigeant d’entreprise de sécurité privée" registryCode={despVaeAdmin.rncp} level={despVaeAdmin.level}
    facts={[['Certificateur', despVaeAdmin.certifier], ['Échéance actuelle', despVaeAdmin.deadline]]} url="https://www.francecompetences.fr/recherche/rncp/40385/"
    profession="Titre, agrément et autorisation" conditionsLabel="Conditions d’exercice" conditions={conditions} professionNote={note}
    detailsTitle={detailsTitle} details={details} />;
}
