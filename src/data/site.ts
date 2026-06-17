import { contactInfo, locations } from './locations';
import { allFormations, btsFormations, securityFormations, vtcFormation } from './formations';

export const contact = { ...contactInfo, locations };
export const formations = allFormations;
export const bts = btsFormations;
export { securityFormations, vtcFormation, locations };

export const legalRefs = ['NDA DREETS 93830600283','Qualiopi n°03169 du 21/10/2024','UAI Côte d’Azur 0831774C','UAI Paris 0756548K','CNAPS FOR-083-2027-02-08-20200755135','ADEF APS 8320032701','ADEF A3P 8320111201','VTC-26-001','SSIAP n°8323','INRS SST H34836/2020/SST-1/O/07'];

export const planning = [
  {formation:'TFP APS',place:'Puget-sur-Argens',date:'8 juillet - 12 août 2026 · examen 13 août',status:'1 place'},
  {formation:'TFP APS',place:'Puget-sur-Argens',date:'7 septembre - 9 octobre 2026 · examen 12 octobre',status:'2 places'},
  {formation:'TFP A3P',place:'Puget-sur-Argens',date:'1er septembre - 27 octobre 2026 · examen 28 octobre',status:'4 places'},
  {formation:'DESP',place:'Paris, Côte d’Azur, Aurillac',date:'Sessions 2026 selon calendrier détaillé',status:'À confirmer'},
];
