export type PresentationDossier = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
};

export const professionalPresentationDossiers = [
  {
    title: 'A3P / APR',
    category: 'Protection rapprochée',
    description: 'Agent de protection physique des personnes : programme, prérequis, certification et débouchés.',
    image: 'https://static.wixstatic.com/media/008e7b_99cb31015b0b4ae6877fc2d74c258be4~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Presentation-TFP-A3P-2025.png',
    href: 'https://www.canva.com/design/DAFN-OO-BnI/DoEXFFMzuSySlWBEIYfumw/view?utm_content=DAFN-OO-BnI&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'SSIAP 1 incendie',
    category: 'Sécurité incendie',
    description: 'Le parcours pour devenir agent de service de sécurité incendie et d’assistance à personnes.',
    image: 'https://static.wixstatic.com/media/008e7b_f815e6ed36184248a22b92ec070bf480~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaquette-SSIAP-1-2025.png',
    href: 'https://www.canva.com/design/DAGMZpzJHmI/3jHIe19PkdsaIc9yYzmq3g/view?utm_content=DAGMZpzJHmI&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'APS',
    category: 'Sécurité privée',
    description: 'Toutes les informations utiles pour préparer le TFP Agent de prévention et de sécurité.',
    image: 'https://static.wixstatic.com/media/008e7b_0dac36671ff6452d90419a9ff26dbc0c~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaquette-TFP-APS-2025.png',
    href: 'https://www.canva.com/design/DAFxQeOg9Kk/nQf5ivhzRaYy0kRxqUYO2g/view?utm_content=DAFxQeOg9Kk&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Dirigeant (initial)',
    category: 'Direction d’entreprise',
    description: 'Le parcours initial pour créer, reprendre ou diriger une entreprise de sécurité privée.',
    image: 'https://static.wixstatic.com/media/008e7b_4ddb842e025e42cb8d2b50d4bea977fa~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dirigeant-initial.png',
    href: 'https://www.canva.com/design/DAG6oNDacEY/kLa2Cz-t3ccWSAP5-4CVfQ/view?utm_content=DAG6oNDacEY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h19b551dcc8',
  },
  {
    title: 'Chauffeur VTC',
    category: 'Transport de personnes',
    description: 'Découvrez la préparation théorique et pratique à l’examen de chauffeur VTC.',
    image: 'https://static.wixstatic.com/media/008e7b_b3338c2770c24d6cb81b120c59094e22~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Chauffeur-VTC-plaquette-2025.png',
    href: 'https://www.canva.com/design/DAFhLhaNPtg/JTpC91OFj5kP1K96Zq7LGQ/view?utm_content=DAFhLhaNPtg&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Dirigeant (VAE)',
    category: 'Validation des acquis',
    description: 'Le dossier de présentation du parcours VAE pour faire reconnaître votre expérience de dirigeant.',
    image: 'https://static.wixstatic.com/media/008e7b_9db99fcc797d49a0a5cc63e6b18c9996~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dirigeant-VAE.png',
    href: 'https://www.canva.com/design/DAG6pSdmnLE/J6ZY337101gC1liznXRpXA/view?utm_content=DAG6pSdmnLE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha2e0c30b3a',
  },
] satisfies readonly PresentationDossier[];

export const btsPresentationDossiers = [
  {
    title: 'MOS (sécurité)',
    category: 'Management de la sécurité',
    description: 'BTS Management opérationnel de la sécurité : programme, alternance et perspectives professionnelles.',
    image: 'https://static.wixstatic.com/media/008e7b_dfdbfdba790e4a29bcaa36e00258fcca~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Presentation-BTS-MOS-2025.png',
    href: 'https://www.canva.com/design/DAFUjJ2ck_Y/Ji5vFzieMTAIrqi7tMaq3A/view?utm_content=DAFUjJ2ck_Y&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Immobilier (PI)',
    category: 'Professions immobilières',
    description: 'BTS Professions immobilières : transaction, gestion locative, copropriété et conseil.',
    image: 'https://static.wixstatic.com/media/008e7b_22a53be680ce472b97e0d2c1130eab70~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaquette-immobilier-2025.png',
    href: 'https://www.canva.com/design/DAFybcvNoTQ/jKbiMsxw999hPOqqrwA0Gg/view?utm_content=DAFybcvNoTQ&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'MCO (commerce)',
    category: 'Management commercial',
    description: 'BTS Management commercial opérationnel : vente, relation client et pilotage d’une unité commerciale.',
    image: 'https://static.wixstatic.com/media/008e7b_5e5781f7adae45a5b5fe39f6d964f877~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaquette-MCO-2025.png',
    href: 'https://www.canva.com/design/DAFUiO79cvQ/eeZw3en3IPUIII2uLuId4Q/view?utm_content=DAFUiO79cvQ&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'NDRC (commerce)',
    category: 'Relation client',
    description: 'BTS Négociation et digitalisation de la relation client : prospection, négociation et fidélisation.',
    image: 'https://static.wixstatic.com/media/008e7b_c6ee41ce6d0f4cb7b41a0f2a6fab3016~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaquette-NDRC-2025.png',
    href: 'https://www.canva.com/design/DAFybfJcfhc/IFxFNlVqR1TcqEt6xfAEhA/view?utm_content=DAFybfJcfhc&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
  {
    title: 'Commerce international (CI)',
    category: 'International',
    description: 'BTS Commerce international : développement de marchés et coordination des opérations import-export.',
    image: 'https://static.wixstatic.com/media/008e7b_09c1bc40bf2e4c7aacafedb09885a61f~mv2.png/v1/fill/w_600,h_850,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Plaquette-BTS-CI-2025.png',
    href: 'https://www.canva.com/design/DAGVNpUITsI/2wf_HST7zlm7a8AzYczlxQ/view?utm_content=DAGVNpUITsI&utm_campaign=designshare&utm_medium=link&utm_source=editor',
  },
] satisfies readonly PresentationDossier[];
