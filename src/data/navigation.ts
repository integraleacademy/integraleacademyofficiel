export const trainingNavigation = [
  {label:'Métiers de la sécurité', href:'/#formations-securite', description:'Agent de sécurité privée (APS), Agent de Protection Physique des Personnes (A3P), SSIAP et Dirigeant d’entreprise de sécurité privée (DESP).', icon:'👮'},
  {label:'BTS en alternance', href:'/#bts', description:'BTS sécurité (MOS), BTS commerce (CI, MCO, NDRC), BTS immobilier (PI).', icon:'🎓'},
  {label:'Chauffeur VTC', href:'/vtc', description:'Formation Théorique et Formation Pratique VTC.', icon:'🚘'},
] as const;

export const navigation = [
  {label:'Nos formations', children:trainingNavigation},
  {label:'Notre école', href:'/ecole'},
  {label:'Financements', href:'/financements'},
  {label:'Entreprises', href:'/entreprises'},
  {label:'Planning', href:'/planning'},
  {label:'Contact', href:'/contact'},
] as const;
