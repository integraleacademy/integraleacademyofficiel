import { btsFormations } from './bts';
import { contactInfo, locations } from './locations';
import { allFormations, securityFormations, vtcFormation } from './formations';

export const contact = { ...contactInfo, locations };
export const formations = allFormations;
export const bts = btsFormations;
export { securityFormations, vtcFormation, locations };

export { planning } from './planning';
export const legalRefs = ['NDA DREETS 93830600283','Qualiopi n°03169 du 21/10/2024','UAI Côte d’Azur 0831774C','UAI Paris 0756548K','CNAPS FOR-083-2027-02-08-20200755135','ADEF APS 8320032701','ADEF A3P 8320111201','VTC-26-001','SSIAP n°8323','INRS SST H34836/2020/SST-1/O/07'];
