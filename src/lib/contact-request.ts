export const INFORMATION_REQUEST_URL = 'https://assistance-alw9.onrender.com/demande-informations-formations';

type SearchParams = Record<string, string | string[] | undefined>;

const formationCodes: Record<string, string> = {
  aps: 'APS',
  a3p: 'A3P',
  'a3p-apr': 'A3P',
  vtc: 'VTC',
  desp: 'DESP_INIT',
  'desp-initial': 'DESP_INIT',
  desp_init: 'DESP_INIT',
  desp_initial: 'DESP_INIT',
  'desp-vae': 'DESP_VAE',
  desp_vae: 'DESP_VAE',
  ssiap: 'SSIAP',
  'ssiap-1': 'SSIAP',
};

const campaignKeys = [
  'gclid', 'wbraid', 'gbraid', 'gad_source', 'gad_campaignid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
];

/** Keep the selected training and campaign when continuing to the existing CRM form. */
export function informationRequestHref(params: SearchParams = {}): string {
  const first = (value: SearchParams[string]) => Array.isArray(value) ? value[0] : value;
  const target = new URL(INFORMATION_REQUEST_URL);
  const formation = formationCodes[(first(params.formation) || '').toLowerCase()];
  if (formation) target.searchParams.set('formation', formation);
  for (const key of campaignKeys) {
    const value = first(params[key]);
    if (value) target.searchParams.set(key, value);
  }
  return target.href;
}
