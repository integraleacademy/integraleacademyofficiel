export type PresentationDossier = {
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
};

export const professionalPresentationDossiers = [
  {
    title: 'A3P',
    category: 'Protection rapprochée',
    description: 'Agent de protection physique des personnes : programme, prérequis, certification et débouchés.',
    image: '/images/dossiers/cover-01.png',
    href: 'https://www.canva.com/design/DAFN-OO-BnI/DoEXFFMzuSySlWBEIYfumw/view?utm_content=DAFN-OO-BnI&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'SSIAP 1 incendie',
    category: 'Sécurité incendie',
    description: 'Le parcours pour devenir agent de service de sécurité incendie et d’assistance à personnes.',
    image: '/images/dossiers/cover-02.png',
    href: 'https://www.canva.com/design/DAGMZpzJHmI/3jHIe19PkdsaIc9yYzmq3g/view?utm_content=DAGMZpzJHmI&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'APS',
    category: 'Sécurité privée',
    description: 'Toutes les informations utiles pour préparer le TFP Agent de prévention et de sécurité.',
    image: '/images/dossiers/cover-03.png',
    href: 'https://www.canva.com/design/DAFxQeOg9Kk/nQf5ivhzRaYy0kRxqUYO2g/view?utm_content=DAFxQeOg9Kk&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Dirigeant (initial)',
    category: 'Direction d’entreprise',
    description: 'Le parcours initial pour créer, reprendre ou diriger une entreprise de sécurité privée.',
    image: '/images/dossiers/cover-04.png',
    href: 'https://www.canva.com/design/DAG6oNDacEY/kLa2Cz-t3ccWSAP5-4CVfQ/view?utm_content=DAG6oNDacEY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h19b551dcc8',
  },
  {
    title: 'Chauffeur VTC',
    id: 'vtc',
    category: 'Transport de personnes',
    description: 'Découvrez la préparation théorique et pratique à l’examen de chauffeur VTC.',
    image: '/images/dossiers/cover-05.png',
    href: 'https://www.canva.com/design/DAFhLhaNPtg/JTpC91OFj5kP1K96Zq7LGQ/view?utm_content=DAFhLhaNPtg&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Dirigeant (VAE)',
    category: 'Validation des acquis',
    description: 'Le dossier de présentation du parcours VAE pour faire reconnaître votre expérience de dirigeant.',
    image: '/images/dossiers/cover-06.png',
    href: 'https://www.canva.com/design/DAG6pSdmnLE/J6ZY337101gC1liznXRpXA/view?utm_content=DAG6pSdmnLE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha2e0c30b3a',
  },
] satisfies readonly PresentationDossier[];

export const btsPresentationDossiers = [
  {
    title: 'MOS (sécurité)',
    category: 'Management de la sécurité',
    description: 'BTS Management opérationnel de la sécurité : programme, alternance et perspectives professionnelles.',
    image: '/images/dossiers/cover-07.png',
    href: 'https://www.canva.com/design/DAFUjJ2ck_Y/Ji5vFzieMTAIrqi7tMaq3A/view?utm_content=DAFUjJ2ck_Y&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Immobilier (PI)',
    category: 'Professions immobilières',
    description: 'BTS Professions immobilières : transaction, gestion locative, copropriété et conseil.',
    image: '/images/dossiers/cover-08.png',
    href: 'https://www.canva.com/design/DAFybcvNoTQ/jKbiMsxw999hPOqqrwA0Gg/view?utm_content=DAFybcvNoTQ&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'MCO (commerce)',
    category: 'Management commercial',
    description: 'BTS Management commercial opérationnel : vente, relation client et pilotage d’une unité commerciale.',
    image: '/images/dossiers/cover-09.png',
    href: 'https://www.canva.com/design/DAFUiO79cvQ/eeZw3en3IPUIII2uLuId4Q/view?utm_content=DAFUiO79cvQ&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'NDRC (commerce)',
    category: 'Relation client',
    description: 'BTS Négociation et digitalisation de la relation client : prospection, négociation et fidélisation.',
    image: '/images/dossiers/cover-10.png',
    href: 'https://www.canva.com/design/DAFybfJcfhc/IFxFNlVqR1TcqEt6xfAEhA/view?utm_content=DAFybfJcfhc&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Commerce international (CI)',
    category: 'International',
    description: 'BTS Commerce international : développement de marchés et coordination des opérations import-export.',
    image: '/images/dossiers/cover-11.png',
    href: 'https://www.canva.com/design/DAGVNpUITsI/2wf_HST7zlm7a8AzYczlxQ/view?utm_content=DAGVNpUITsI&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
] satisfies readonly PresentationDossier[];
