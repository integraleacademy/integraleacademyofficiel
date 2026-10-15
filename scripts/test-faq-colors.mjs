import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.UI_TEST_BASE_URL || 'http://127.0.0.1:3000';
const pages = [
  ['/', 'gold'], ['/financements', 'gold'], ['/entreprises', 'gold'], ['/planning', 'gold'],
  ['/formations-securite/aps', 'blue'], ['/formations-securite/a3p-apr', 'green'],
  ['/formations-securite/sst', 'green'], ['/formations-securite/ssiap-1', 'red'],
  ['/formations-securite/ssiap', 'red'], ['/vtc', 'violet'],
  ['/formations-securite/desp-initial', 'orange'], ['/formations-securite/desp-vae', 'orange'],
  ...['mos', 'mco', 'ndrc', 'ci', 'pi', 'cg'].map(slug => [`/bts/${slug}`, 'bts']), ['/faq', 'gold'],
];
const colors = { gold: 'rgb(139, 88, 18)', blue: 'rgb(37, 99, 235)', green: 'rgb(5, 150, 105)', red: 'rgb(220, 38, 38)', orange: 'rgb(234, 88, 12)', violet: 'rgb(124, 58, 237)' };
const output = 'faq-color-artifacts';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const report = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 960 }, reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      localStorage.setItem('integrale-academy-theme', 'light');
      sessionStorage.setItem('integrale-academy-project-popup-dismissed', 'true');
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [path, theme] of pages) {
      const response = await page.goto(base + path, { waitUntil: 'networkidle', timeout: 90000 });
      assert.ok(response.status() < 400, `${path}: HTTP ${response.status()}`);
      const faq = page.locator('[data-faq-design="aps"]').first();
      await faq.waitFor();
      assert.equal(await faq.getAttribute('data-faq-theme'), theme, path);
      assert.equal(await faq.locator('[data-faq-list]').getAttribute('data-faq-theme'), theme, path);
      const item = faq.locator('[data-faq-item]').first();
      const summary = item.locator('summary');
      await summary.focus();
      await summary.press('Enter');
      assert.equal(await item.getAttribute('open'), '', path);
      const palette = await faq.evaluate(node => {
        const summary = node.querySelector('summary');
        const toggle = summary.lastElementChild;
        const badge = node.querySelector('div > div > span');
        const focus = getComputedStyle(summary).outlineColor;
        return { background: getComputedStyle(node).backgroundImage, toggle: getComputedStyle(toggle).backgroundImage, toggleColor: getComputedStyle(toggle).backgroundColor, badge: badge ? getComputedStyle(badge).color : null, focus, bts: getComputedStyle(node).getPropertyValue('--bts-700').trim() };
      });
      const expectedFocus = theme === 'bts' ? `rgb(${palette.bts.split(/\s+/).join(', ')})` : colors[theme];
      assert.equal(palette.focus, expectedFocus, `${path}: focus palette`);
      if (theme === 'gold') {
        assert.ok(!palette.background.includes('219, 234, 254'), path + ': no blue background');
        assert.ok(!palette.toggle.includes('37, 99, 235'), path + ': no blue toggle');
      }
      if (theme === 'bts') assert.equal(palette.toggleColor, expectedFocus, path + ': own BTS palette');
      const columns = await faq.locator('[data-faq-list]').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length);
      assert.equal(columns, width >= 768 ? 2 : 1, path);
      if (width > 768) await faq.screenshot({ path: `${output}/${path.replaceAll('/', '-') || 'home'}-${width}.png` });
      else await item.screenshot({ path: `${output}/${path.replaceAll('/', '-') || 'home'}-${width}.png` });
      await summary.press('Enter');
      assert.equal(await item.getAttribute('open'), null, path);
      await page.evaluate(() => { document.documentElement.classList.add('dark'); document.documentElement.dataset.theme = 'dark'; });
      assert.equal(await summary.evaluate(node => getComputedStyle(node).color), 'rgb(23, 19, 13)', path + ': readable dark mode');
      report.push({ path, width, theme, palette, accordion: 'passed', darkContrast: 'passed' });
    }
    assert.deepEqual(errors, [], `Browser errors at ${width}px`);
    await context.close();
  }
} catch (error) {
  await writeFile(`${output}/error.txt`, error.stack || String(error));
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
