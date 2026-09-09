import assert from 'node:assert/strict';
import test from 'node:test';
import { isAllowedAdminOrigin } from '../src/lib/admin/request-origin';

const renderHost = 'integraleacademyofficiel-1.onrender.com';
const internalUrl = 'http://localhost:10000/api/admin/aps-photos';
function request(headers: Record<string, string>, url = internalUrl) {
  return new Request(url, { method: 'POST', headers });
}

test('Render accepts the public HTTPS origin despite Next using an internal HTTP URL', () => {
  const upload = request({ host: renderHost, origin: `https://${renderHost}`, 'x-forwarded-proto': 'https' });
  assert.notEqual(new URL(upload.url).host, new URL(upload.headers.get('origin')!).host);
  assert.equal(isAllowedAdminOrigin(upload), true);
});

test('a recognised forwarded host works when Host is also internal', () => {
  assert.equal(isAllowedAdminOrigin(request({ host: 'localhost:10000', 'x-forwarded-host': renderHost, origin: `https://${renderHost}` })), true);
  assert.equal(isAllowedAdminOrigin(request({ host: 'localhost:10000', 'x-forwarded-host': `${renderHost}, internal-proxy`, origin: `https://${renderHost}` })), true);
});

test('both production domains work through the proxy, including standard HTTPS ports', () => {
  for (const host of ['integraleacademy.com', 'www.integraleacademy.com']) {
    assert.equal(isAllowedAdminOrigin(request({ host, origin: `https://${host}` })), true);
    assert.equal(isAllowedAdminOrigin(request({ host: `${host}:443`, origin: `https://${host}` })), true);
    assert.equal(isAllowedAdminOrigin(request({ host: 'localhost:10000', 'x-forwarded-host': host, origin: `https://${host}` })), true);
  }
});

test('other origins and lookalike domains stay blocked', () => {
  for (const origin of ['https://example.org', `https://${renderHost}.example.org`, `https://${renderHost}:444`, `http://${renderHost}`]) {
    assert.equal(isAllowedAdminOrigin(request({ host: renderHost, origin })), false, origin);
  }
});

test('an arbitrary forwarded host cannot authorise a foreign origin', () => {
  assert.equal(isAllowedAdminOrigin(request({ host: renderHost, 'x-forwarded-host': 'example.org', origin: 'https://example.org' })), false);
  assert.equal(isAllowedAdminOrigin(request({ host: renderHost, 'x-forwarded-host': `example.org, ${renderHost}`, origin: 'https://example.org' })), false);
});

test('malformed and opaque origins are rejected', () => {
  for (const origin of ['null', 'not a URL', `https://${renderHost}/path`, `https://user@${renderHost}`, `https://${renderHost}?query=1`]) {
    assert.equal(isAllowedAdminOrigin(request({ host: renderHost, origin })), false, origin);
  }
});

test('local requests and authenticated clients without Origin remain supported', () => {
  assert.equal(isAllowedAdminOrigin(request({ host: 'localhost:10000', origin: 'http://localhost:10000' })), true);
  assert.equal(isAllowedAdminOrigin(request({ origin: 'http://localhost:10000' })), true);
  assert.equal(isAllowedAdminOrigin(request({ host: renderHost })), true);
});
