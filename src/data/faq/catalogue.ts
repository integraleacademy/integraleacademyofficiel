import { formationFaq, globalFaq } from '../faq';
import { commonBtsFaq } from '../bts';
import { a3pFaq } from '../a3p';
import { despInitialFaq } from '../despInitial';
import { despVaeFaq } from '../despVae';
import { ssiap2Config, ssiap3Config, ssiapMaintenanceConfig } from '../ssiap-catalogue';
import { certificationProjects, certificationProjectFaq } from '../certification-projects';
import { apsCourseFaq, ssiapOverviewFaq, ssiap1Faq, sstFaq } from './security';
import { btsMosFaq, btsMcoFaq, btsNdrcFaq, btsCiFaq, btsPiFaq, btsCgFaq } from './bts';
import { businessFaq, fundingFaq, vtcFaq } from './practical';
import type { FaqTopic } from './topics';

export type CatalogueQuestion = { q: string; a: string; links?: readonly { href: string; label: string }[] };

export const questionsByTopic: Record<FaqTopic, readonly CatalogueQuestion[]> = {
  general: globalFaq,
  financements: fundingFaq,
  entreprises: businessFaq,
  aps: apsCourseFaq,
  a3p: a3pFaq,
  cpsp: formationFaq,
  desp: formationFaq,
  'desp-initial': [...despInitialFaq, ...formationFaq],
  'desp-vae': [...despVaeFaq, ...formationFaq],
  ssiap: ssiapOverviewFaq,
  'ssiap-1': ssiap1Faq,
  'ssiap-2': ssiap2Config.faq,
  'ssiap-3': ssiap3Config.faq,
  'recyclage-remise-a-niveau-ssiap': ssiapMaintenanceConfig.faq,
  sst: sstFaq,
  vtc: vtcFaq,
  bts: commonBtsFaq,
  'bts-mos': btsMosFaq,
  'bts-mco': btsMcoFaq,
  'bts-ndrc': btsNdrcFaq,
  'bts-ci': btsCiFaq,
  'bts-pi': btsPiFaq,
  'bts-cg': btsCgFaq,
  cpiaa: certificationProjectFaq(certificationProjects.cpiaa),
  eiag: certificationProjectFaq(certificationProjects.eiag),
};
