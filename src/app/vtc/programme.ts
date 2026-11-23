import type { TrainingProgramUnit } from '@/components/TrainingProgramExplorer';
import { vtcArtwork } from '@/data/manualIllustrations';

const theory = 'Théorie en e-learning · cours, quiz et corrigés';

export const vtcProgram: TrainingProgramUnit[] = [
  {
    number: 'A', title: 'Réglementation du transport de personnes', delivery: theory, illustration: vtcArtwork.reglementation,
    description: 'Situez votre activité dans le transport public particulier de personnes (T3P).',
    items: ['Distinguer les activités de taxi et de VTC à partir de situations de prise en charge.',
      'Identifier les conditions d’accès à la profession et le rôle des organismes de contrôle.',
      'Repérer les documents à présenter lors d’un contrôle et les obligations du conducteur.'],
  },
  {
    number: 'B', title: 'Gestion de l’activité', delivery: theory, illustration: vtcArtwork.gestion,
    description: 'À partir d’une course, déterminez ce qu’elle coûte et ce qu’elle rapporte.',
    items: ['Distinguer les charges fixes, comme l’assurance, des frais variables, comme le carburant.',
      'Calculer le coût de revient et la marge d’une prestation.',
      'Lire les principaux documents comptables et estimer le chiffre d’affaires nécessaire pour couvrir ses charges.'],
  },
  {
    number: 'C', title: 'Sécurité routière', delivery: theory, illustration: vtcArtwork.conduite,
    description: 'Préparez vos décisions au volant, du départ à la dépose du passager.',
    items: ['Vérifier l’état du véhicule et les équipements avant une course.',
      'Adapter sa vitesse et ses distances à la circulation et aux conditions météo.',
      'Reconnaître les effets de la fatigue et des distractions sur la conduite.'],
  },
  {
    number: 'D', title: 'Compréhension et expression en français', delivery: theory, illustration: vtcArtwork.communication,
    description: 'Lisez un texte en français et formulez une réponse claire et précise.',
    items: ['Repérer l’idée principale, une consigne ou une information dans un texte.',
      'Répondre par écrit à une question de compréhension.',
      'Reformuler une demande et vérifier le sens, la grammaire et la précision de sa réponse.'],
  },
  {
    number: 'E', title: 'Anglais professionnel', delivery: theory, illustration: vtcArtwork.pratique,
    description: 'Accompagnez un passager anglophone à chaque étape du trajet.',
    items: ['Accueillir le client et vérifier son nom, sa destination et ses bagages.',
      'Comprendre une demande simple et annoncer une durée ou un retard.',
      'Indiquer un prix, expliquer le paiement et prendre congé.'],
  },
  {
    number: 'F(V)', title: 'Développement commercial VTC', delivery: theory, illustration: vtcArtwork.commercial,
    description: 'Construisez une offre de transport et faites-la connaître auprès de vos clients.',
    items: ['Identifier les besoins de différentes clientèles, du transfert aéroport au déplacement professionnel.',
      'Chiffrer une proposition en tenant compte du trajet, du temps et des services.',
      'Présenter son offre à un hôtel ou à une entreprise et assurer le suivi pour fidéliser sa clientèle.'],
  },
  {
    number: 'G(V)', title: 'Réglementation spécifique VTC', delivery: theory, illustration: vtcArtwork.profession,
    description: 'Vérifiez les conditions dans lesquelles vous pouvez accepter et effectuer une course.',
    items: ['Identifier les règles relatives à la carte professionnelle, au registre VTC et au véhicule.',
      'Vérifier les informations du justificatif de réservation.',
      'Distinguer les conditions d’attente, de stationnement et de prise en charge d’un client.'],
  },
  {
    number: 'P', title: 'Mise en situation pratique', delivery: 'Pratique en présentiel · 5 h sur véhicule à double commande', illustration: vtcArtwork.accueil,
    description: 'Avec votre formateur, réalisez une prestation complète, de la réservation à la facture.',
    items: ['Préparer un itinéraire, proposer une alternative et annoncer la durée du trajet.',
      'Accueillir le passager et ses bagages, puis conduire avec souplesse et en sécurité.',
      'Renseigner le client pendant la course, établir le devis et la facture, puis encaisser le règlement.'],
  },
];
