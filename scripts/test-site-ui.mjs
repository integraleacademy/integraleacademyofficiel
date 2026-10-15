/** Browser regression: install playwright locally, start Next, then run this script. */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.UI_TEST_BASE_URL || 'http://127.0.0.1:3000';
await mkdir('ui-artifacts', { recursive: true });
const browser = await chromium.launch();
const report = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      localStorage.setItem('integrale-academy-theme', 'light');
      sessionStorage.setItem('integrale-academy-project-popup-dismissed', 'true');
    });
    const page = await context.newPage();
    let reference;
    for (const path of ['/ecole', '/contact', '/financements']) {
      const errors = [];
      const listener = e => errors.push(e.message);
      page.on('pageerror', listener);
      const response = await page.goto(base + path, { waitUntil: 'networkidle', timeout: 90000 });
      assert.equal(response.status(), 200, path);
      const nav = page.locator('[data-page-section-navigation]');
      await nav.waitFor();
      const links = nav.locator('a');
      const hrefs = await links.evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
      for (const href of hrefs) assert.equal(await page.locator(href).count(), 1, path + ' target ' + href);
      const metrics = await nav.evaluate(node => {
        const css = getComputedStyle(node), a = getComputedStyle(node.querySelector('a'));
        return { height: node.offsetHeight, position: css.position, fontSize: a.fontSize, fontWeight: a.fontWeight, background: css.backgroundColor, border: css.borderTopWidth, padding: a.paddingTop };
      });
      if (reference) assert.deepEqual(metrics, reference, path + ' navigation style differs');
      else reference = metrics;
      await links.nth(1).click();
      await page.waitForFunction(href => document.querySelector('[data-page-section-navigation] [aria-current="location"]')?.getAttribute('href') === href, hrefs[1]);
      const boxes = await nav.evaluate(node => ({ navTop: node.getBoundingClientRect().top, headerBottom: document.querySelector('header').getBoundingClientRect().bottom, navBottom: node.getBoundingClientRect().bottom }));
      assert.ok(Math.abs(boxes.navTop - boxes.headerBottom) < 3, path + ' sticky header gap');
      const target = await page.locator(hrefs[1]).boundingBox();
      assert.ok(target.y >= boxes.navBottom - 2, path + ' anchor obscured');
      assert.equal(await nav.evaluate(node => node.getBoundingClientRect().right <= innerWidth + 1), true, path + ' overflow');
      await nav.screenshot({ path: `ui-artifacts/nav-${path.slice(1)}-${width}.png` });
      assert.equal(errors.length, 0, path + ' client errors: ' + errors.join('\n'));
      page.off('pageerror', listener);
      report.push({ path, width, navigation: metrics, anchor: 'passed', errors });
    }
    for (const path of ['/formations-securite/aps', '/financements', '/entreprises', '/planning', '/bts/mos', '/formations-securite/ssiap-1', '/vtc', '/despvaeouinitial']) {
      const response = await page.goto(base + path, { waitUntil: 'networkidle', timeout: 90000 });
      assert.ok(response.status() < 400, path);
      const section = page.locator('[data-faq-design="aps"]').first();
      await section.waitFor();
      const list = section.locator('[data-faq-list]');
      const items = list.locator('[data-faq-item]');
      assert.ok(await items.count() > 0, path);
      const columns = await list.evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
      assert.equal(columns, width >= 768 ? 2 : 1, path + ' FAQ columns');
      await section.scrollIntoViewIfNeeded();
      const first = items.first();
      const summary = first.locator('summary');
      await summary.focus();
      await summary.press('Enter');
      assert.equal(await first.getAttribute('open'), '', path + ' keyboard open');
      assert.ok(await first.locator('p').isVisible(), path + ' visible answer');
      if (width >= 768) {
        const itemBox = await first.boundingBox(), listBox = await list.boundingBox();
        assert.ok(Math.abs(itemBox.width - listBox.width) < 3, path + ' expanded FAQ must span both columns');
      }
      const font = await summary.evaluate(node => ({ size: getComputedStyle(node).fontSize, weight: getComputedStyle(node).fontWeight }));
      assert.equal(font.size, width >= 640 ? '16px' : '15.2px', path + ' FAQ font size');
      assert.equal(font.weight, '900', path + ' FAQ font weight');
      await page.screenshot({ path: `ui-artifacts/faq-${path.replaceAll('/', '-')}-${width}.png` });
      await summary.press('Enter');
      assert.equal(await first.getAttribute('open'), null, path + ' keyboard close');
      await page.evaluate(() => { document.documentElement.classList.add('dark'); document.documentElement.dataset.theme = 'dark'; });
      assert.equal(await summary.evaluate(node => getComputedStyle(node).color), 'rgb(23, 19, 13)', path + ' dark theme FAQ contrast');
      report.push({ path, width, faqCount: await items.count(), keyboard: 'passed', font, darkContrast: 'passed' });
    }
    await context.close();
  }
} catch (error) {
  await writeFile('ui-artifacts/error.txt', error.stack || String(error));
  throw error;
} finally {
  await writeFile('ui-artifacts/report.json', JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
