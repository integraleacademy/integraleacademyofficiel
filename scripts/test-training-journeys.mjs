/** Run against a running site with Playwright installed, as for test-site-ui.mjs. */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.UI_TEST_BASE_URL || 'http://127.0.0.1:3000';
const routes = [
  ...['aps', 'a3p-apr', 'ssiap-1', 'ssiap-2', 'ssiap-3', 'sst'].map(slug => '/formations-securite/' + slug),
  '/despvaeouinitial', '/dirigeant', '/vaedirigeant', '/vtc', '/bts',
  ...['mos', 'mco', 'ndrc', 'commerce-international', 'professions-immobilieres', 'comptabilite-gestion'].map(slug => '/bts/' + slug),
];

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1508, height: 800 }, reducedMotion: 'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('integrale-academy-project-popup-dismissed', 'true'));
  for (const route of routes) {
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200, route);
    const journey = page.locator('section[data-visual-format="landscape"][data-enhanced="true"]');
    await journey.waitFor({ state: 'attached' });
    const positions = await journey.evaluate(section => {
      const group = section.firstElementChild;
      const scale = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      const top = parseFloat(getComputedStyle(group).top) * scale;
      const track = section.getBoundingClientRect();
      return { top, start: scrollY + track.top - top, travel: track.height - group.getBoundingClientRect().height };
    });
    assert.ok(positions.travel > 0, route);
    await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), positions.start - 80);
    await page.mouse.move(400, 440);
    for (const step of [1, 2, 3, 4, 3, 2, 1, 4]) {
      const y = positions.start + (step - 0.5) * positions.travel / 4;
      await page.mouse.wheel(0, y - await page.evaluate(() => scrollY));
      await page.waitForFunction(y => Math.abs(scrollY - y) < 3, y);
      await journey.locator('nav button').nth(step - 1).and(page.locator('[aria-current="step"]')).waitFor();
      const layout = await journey.evaluate(section => {
        const panel = section.querySelector('li[data-current="true"]');
        const visual = panel.querySelector('[data-scene]');
        const bottom = Math.max(panel.firstElementChild.getBoundingClientRect().bottom, visual.getBoundingClientRect().bottom);
        const next = section.querySelector('[data-journey-continuation]').firstElementChild;
        return { top: section.querySelector('header').getBoundingClientRect().top, gap: next.getBoundingClientRect().top - bottom };
      });
      assert.ok(Math.abs(layout.top - positions.top) < 3, route + ' étape ' + step + ' hors du point d’arrêt');
      assert.ok(layout.gap >= -1 && layout.gap <= 48, route + ' espace sous le bloc ' + layout.gap);
    }
    const exit = positions.start + positions.travel + 120;
    await page.mouse.wheel(0, exit - await page.evaluate(() => scrollY));
    await page.waitForFunction(y => Math.abs(scrollY - y) < 3, exit);
    const heading = await journey.locator('header').first().boundingBox();
    assert.ok(heading.y < positions.top - 80, route + ' sortie après la dernière étape');
    console.log(route + ' OK');
  }
} finally {
  await browser.close();
}
