/** Start the site, install Playwright locally and run this script with Node. */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.UI_TEST_BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });

function installTestPlayer({ policy, initialVolume }) {
  let interacted = false;
  window.addEventListener('click', event => { if (event.isTrusted) interacted = true; }, true);
  window.filmPlayers = {};
  window.YT = { Player: class {
    constructor(frame, { events }) {
      this.events = events;
      this.state = -1;
      this.muted = true;
      this.volume = initialVolume;
      this.attempts = [];
      window.filmPlayers[frame.closest('[data-film]').dataset.film] = this;
      setTimeout(() => this.events.onReady({ target: this }), 0);
    }
    playVideo() {
      this.attempts.push(this.muted);
      // YouTube can accept the gesture before it has received the first media frame.
      if (policy === 'blocked' && interacted && this.state === -1) return;
      if (policy === 'allowed' || interacted || (policy === 'muted-only' && this.muted)) this.setState(1);
      else setTimeout(() => this.events.onAutoplayBlocked({ target: this }), 0);
    }
    setState(state) { this.state = state; this.events.onStateChange({ target: this, data: state }); }
    pauseVideo() { this.setState(2); }
    getPlayerState() { return this.state; }
    getVolume() { return this.volume; }
    setVolume(value) { this.volume = value; }
    isMuted() { return this.muted; }
    mute() { this.muted = true; }
    unMute() { this.muted = false; }
    destroy() {}
  } };
}

async function showPlayer(section) {
  // Pinned sections on A3P can shift the target while the page is loading.
  await section.page().waitForFunction(key => {
    const target = document.querySelector(`[data-film="${key}"] [class*="_stage"]`);
    target?.scrollIntoView({ block: 'center', behavior: 'instant' });
    return Boolean(window.filmPlayers[key]);
  }, await section.getAttribute('data-film'), { polling: 200 });
}

try {
  const scenarios = [
    ['/formations-securite/aps', 'aps', 'allowed', 37, 1440],
    ['/formations-securite/a3p-apr', 'a3p', 'muted-only', 0, 1440],
    ['/despvaeouinitial', 'desp', 'blocked', 63, 390],
    ['/dirigeant', 'desp', 'muted-only', 42, 390],
    ['/vaedirigeant', 'desp', 'allowed', 59, 1440],
  ];
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  for (const [path, film, policy, initialVolume, width] of scenarios) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(installTestPlayer, { policy, initialVolume });
    await page.route('https://www.youtube-nocookie.com/embed/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Test</title>' }));
    await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    const section = page.locator(`[data-film="${film}"]`);
    await showPlayer(section);
    const frame = section.locator('iframe');
    await frame.waitFor();
    assert.notEqual(new URL(await frame.getAttribute('src')).searchParams.get('mute'), '1');
    const attempts = policy === 'allowed' ? [false] : [false, true];
    await page.waitForFunction(([key, count]) => window.filmPlayers[key]?.attempts.length >= count, [film, attempts.length]);
    const readPlayer = () => page.evaluate(key => {
      const p = window.filmPlayers[key];
      return { attempts: p.attempts, volume: p.volume, muted: p.muted, state: p.state };
    }, film);
    const initial = await readPlayer();
    assert.deepEqual(initial.attempts, attempts);
    assert.equal(initial.state === 1, policy !== 'blocked');
    if (initialVolume) assert.equal(initial.volume, initialVolume);
    else assert.ok(initial.volume > 0);

    const enable = section.getByRole('button', { name: 'Activer le son' });
    const disable = section.getByRole('button', { name: 'Couper le son' });
    if (policy !== 'allowed') await enable.press('Enter');
    await disable.waitFor();
    if (policy === 'blocked') {
      const loading = await readPlayer();
      assert.equal(loading.muted, false);
      assert.equal(loading.state, -1);
      await page.evaluate(key => window.filmPlayers[key].setState(1), film);
    }
    const audible = await readPlayer();
    assert.equal(audible.state, 1);
    assert.equal(audible.muted, false);
    await disable.click();
    await enable.waitFor();
    assert.equal((await readPlayer()).muted, true);
    assert.equal((await readPlayer()).state, 1);
    // A change from YouTube's own controls also updates the page button.
    await page.evaluate(key => window.filmPlayers[key].unMute(), film);
    await disable.waitFor();
    if (film === 'a3p') {
      const report = page.locator('[data-film="neo"]');
      await showPlayer(report);
      await page.waitForFunction(() => window.filmPlayers.neo?.getPlayerState() === 1);
      assert.equal((await readPlayer()).state, 2);
    }
    await page.close();
    console.log(`${path} · ${policy} · ${width}px OK`);
  }
  await context.close();
} finally {
  await browser.close();
}
