import assert from 'node:assert/strict';
import test from 'node:test';
import redirects from '../src/data/url-redirects.json';
import { canonicalSiteHref, SITE_ORIGIN } from '../src/lib/site-urls';
import sitemap from '../src/app/sitemap';
import { informationRequestHref, INFORMATION_REQUEST_URL } from '../src/lib/contact-request';

test('les trois pages DESP conservent les adresses historiques demandées', () => {
  assert.equal(canonicalSiteHref('/formations-securite/desp-initial'), '/dirigeant');
  assert.equal(canonicalSiteHref('/formations-securite/desp'), '/despvaeouinitial');
  assert.equal(canonicalSiteHref('/formations-securite/desp-vae'), '/vaedirigeant');
  assert.equal(canonicalSiteHref('/securiteprivee'), '/formations-securite/aps');
  assert.equal(canonicalSiteHref('/securiteprivee-1'), '/formations-securite');
});

test('les liens déjà enregistrés gardent session, suivi publicitaire et ancre', () => {
  const href = 'https://integraleacademyofficiel-1.onrender.com/formations-securite/desp-initial/?session=abc&utm_source=google&gclid=123#dates-tarifs';
  assert.equal(canonicalSiteHref(href), '/dirigeant?session=abc&utm_source=google&gclid=123#dates-tarifs');
  assert.equal(canonicalSiteHref('/mentions-l%C3%A9gales'), '/mentions-legales');
  assert.equal(canonicalSiteHref('/dossiervtc?utm_source=email'), '/dossiersfc?utm_source=email#vtc');
  assert.equal(canonicalSiteHref('/formations-vtc'), '/vtc');
});

test('les applications externes gardent leur domaine et leur chemin', () => {
  for (const href of [
    'https://assistance-alw9.onrender.com/demande-informations-formations?formation=desp',
    'https://inscriptionsbts.onrender.com/',
    'https://gestionstagiaires-r5no.onrender.com/test-positionnement',
    'mailto:ecole@integraleacademy.com',
    '#programme',
  ]) assert.equal(canonicalSiteHref(href), href);
  assert.equal(canonicalSiteHref('/candidature'), 'https://inscriptionsbts.onrender.com/');
});

test('aucune redirection ne reboucle ni ne passe par une autre redirection', () => {
  const sources = new Set(redirects.map(({ source }) => source));
  assert.equal(sources.size, redirects.length);
  for (const { source, destination } of redirects) {
    const target = new URL(destination, SITE_ORIGIN);
    if (target.origin === SITE_ORIGIN) assert.ok(!sources.has(target.pathname), `${source} → ${destination}`);
  }
});

test('les anciens liens de rappel rejoignent le CRM avec la formation et la campagne', () => {
  for (const [path, formation] of [['/rdvteldirigeant', 'DESP_INIT'], ['/reservationrdvvtc', 'VTC']]) {
    const target = new URL(canonicalSiteHref(`${path}?utm_source=google&gclid=campagne`));
    assert.equal(`${target.origin}${target.pathname}`, INFORMATION_REQUEST_URL);
    assert.equal(target.searchParams.get('formation'), formation);
    assert.equal(target.searchParams.get('utm_source'), 'google');
    assert.equal(target.searchParams.get('gclid'), 'campagne');
  }
});

test('la page contact transmet une formation reconnue et les paramètres publicitaires au CRM', () => {
  for (const [formation, expected] of [['desp-initial', 'DESP_INIT'], ['desp-vae', 'DESP_VAE'], ['a3p-apr', 'A3P'], ['ssiap-1', 'SSIAP'], ['vtc', 'VTC'], ['APS', 'APS']]) {
    const url = new URL(informationRequestHref({ formation, gclid: 'abc+123', utm_campaign: 'Formation & avenir' }));
    assert.equal(url.searchParams.get('formation'), expected);
    assert.equal(url.searchParams.get('gclid'), 'abc+123');
    assert.equal(url.searchParams.get('utm_campaign'), 'Formation & avenir');
  }
  const fallback = new URL(informationRequestHref({ formation: 'sst', redirect: 'https://example.com', mail: 'private@example.com' }));
  assert.equal(fallback.href, INFORMATION_REQUEST_URL);
  assert.equal(new URL(informationRequestHref({ formation: ['vtc', 'aps'] })).searchParams.get('formation'), 'VTC');
});

test('le sitemap ne contient que les pages canoniques du domaine public', () => {
  const urls = sitemap().map(({ url }) => url);
  assert.equal(new Set(urls).size, urls.length);
  for (const path of ['/dirigeant', '/despvaeouinitial', '/vaedirigeant', '/vtc', '/bts/mos']) {
    assert.ok(urls.includes(`${SITE_ORIGIN}${path}`));
  }
  for (const url of urls) {
    assert.ok(url.startsWith(`${SITE_ORIGIN}/`));
    assert.ok(!redirects.some(({ source }) => url === `${SITE_ORIGIN}${source}`));
    assert.ok(!url.includes('/admin/') && !url.includes('/api/') && !url.endsWith('/gestion'));
    assert.ok(!url.endsWith('/rdvvtc') && !url.endsWith('/rdvconfirmedirigeant'));
  }
});
