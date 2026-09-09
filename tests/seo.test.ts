import assert from 'node:assert/strict';
import test from 'node:test';
import { seoPages } from '../src/data/seo-pages';
import { allFormations } from '../src/data/formations';
import { btsFormations } from '../src/data/bts';
import sitemap from '../src/app/sitemap';
import { SITE_ORIGIN } from '../src/lib/site-urls';
import { createPageMetadata, pageBreadcrumbs, pageStructuredData, serializeCourseJsonLd, serializeJsonLd, ORGANIZATION_ID, SITE_NAME } from '../src/lib/seo';

test('toutes les formations et les pages publiques possèdent des métadonnées distinctes', () => {
  for (const formation of [...allFormations, ...btsFormations]) {
    assert.ok(seoPages[formation.slug], `Page absente : ${formation.slug}`);
  }
  const pages = Object.entries(seoPages).filter(([, page]) => !page.noindex);
  assert.equal(pages.length, 37);
  assert.equal(new Set(pages.map(([, page]) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map(([, page]) => page.description)).size, pages.length);
  for (const [path, page] of pages) {
    const metadata = createPageMetadata(path);
    assert.deepEqual(metadata.title, { absolute: `${page.title} | ${SITE_NAME}` });
    assert.equal(page.title.includes(SITE_NAME), false, `Marque en double : ${path}`);
    assert.equal(metadata.description, page.description);
    assert.equal(metadata.alternates?.canonical, `${SITE_ORIGIN}${path}`);
    assert.equal(metadata.openGraph?.url, `${SITE_ORIGIN}${path}`);
    assert.equal(metadata.openGraph?.title, `${page.title} | ${SITE_NAME}`);
    assert.equal(metadata.twitter?.description, page.description);
  }
});

test('les URL canoniques neutralisent anciens chemins et paramètres de campagne', () => {
  assert.equal(createPageMetadata('/formations-securite/desp-initial/?utm_source=google#dates').alternates?.canonical, `${SITE_ORIGIN}/dirigeant`);
  assert.equal(createPageMetadata('/securiteprivee?gclid=abc').alternates?.canonical, `${SITE_ORIGIN}/formations-securite/aps`);
  assert.throws(() => createPageMetadata('/page-inexistante'));
});

test('les confirmations et ressources internes restent exclues du sitemap et de l’index', () => {
  const urls = new Set(sitemap().map(({ url }) => url));
  for (const [path, page] of Object.entries(seoPages)) {
    assert.equal(urls.has(`${SITE_ORIGIN}${path}`), !page.noindex, path);
    const robots = createPageMetadata(path).robots;
    assert.ok(robots && typeof robots === 'object');
    assert.equal(robots.index, !page.noindex, path);
    if (page.noindex) assert.equal(pageStructuredData(path), null);
  }
});

test('les fils d’Ariane remontent jusqu’à l’accueil sans boucle ni lien relatif dans le JSON-LD', () => {
  for (const path of Object.keys(seoPages)) {
    const crumbs = pageBreadcrumbs(path);
    assert.equal(crumbs[0].path, '/');
    assert.equal(crumbs.at(-1)?.path, path);
    assert.equal(new Set(crumbs.map((item) => item.path)).size, crumbs.length);
    for (const crumb of crumbs) assert.ok(seoPages[crumb.path]);
    const data = pageStructuredData(path);
    if (!data) continue;
    const breadcrumb = data['@graph'].find((item) => item['@type'] === 'BreadcrumbList');
    assert.equal(Boolean(breadcrumb), path !== '/');
    if (breadcrumb) {
      const items = breadcrumb.itemListElement as Array<{ position: number; item: string }>;
      items.forEach((item, index) => {
        assert.equal(item.position, index + 1);
        assert.equal(item.item, `${SITE_ORIGIN}${crumbs[index].path}`);
      });
    }
  }
  assert.deepEqual(pageBreadcrumbs('/dirigeant').map((item) => item.path), ['/', '/formations-securite', '/despvaeouinitial', '/dirigeant']);
  assert.deepEqual(pageBreadcrumbs('/bts/mos').map((item) => item.path), ['/', '/bts', '/bts/mos']);
});

test('les données formation et FAQ sont conservées avec un organisme et une URL canoniques', () => {
  const data = JSON.parse(serializeCourseJsonLd({ '@graph': [
    { '@type': 'Course', name: 'Formation test', provider: { description: 'École' } },
    { '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Question visible' }] },
    { '@type': 'BreadcrumbList', itemListElement: [] },
  ] }, '/formations-securite/desp-initial'));
  assert.equal(data['@graph'].length, 2);
  const [course, faq] = data['@graph'];
  assert.equal(course.url, `${SITE_ORIGIN}/dirigeant`);
  assert.equal(course['@id'], `${SITE_ORIGIN}/dirigeant#course`);
  assert.equal(course.provider['@id'], ORGANIZATION_ID);
  assert.equal(course.provider.description, 'École');
  assert.equal(faq.mainEntity[0].name, 'Question visible');
  const vae = pageStructuredData('/vaedirigeant')!['@graph'];
  assert.ok(vae.some((item) => item['@type'] === 'Service'));
  assert.ok(!vae.some((item) => item['@type'] === 'Course'));
});

test('le JSON-LD convertit les anciens liens et échappe les délimiteurs de script', () => {
  const description = '</script><script>alert(1)</script>\u2028\u2029';
  const serialized = serializeJsonLd({ url: '/formations-securite/desp-initial', description, image: ['/images/logo.png'], external: 'https://example.com' });
  assert.equal(serialized.includes('<'), false);
  assert.equal(serialized.includes('\u2028'), false);
  assert.equal(serialized.includes('\u2029'), false);
  const data = JSON.parse(serialized);
  assert.equal(data.description, description);
  assert.equal(data.url, `${SITE_ORIGIN}/dirigeant`);
  assert.equal(data.image[0], `${SITE_ORIGIN}/images/logo.png`);
  assert.equal(data.external, 'https://example.com');
});
