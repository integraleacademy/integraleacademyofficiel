import assert from 'node:assert/strict';
import test from 'node:test';
import redirects from '../src/data/url-redirects.json';
import { canonicalSiteHref, SITE_ORIGIN } from '../src/lib/site-urls';
import sitemap from '../src/app/sitemap';

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
  }
});
