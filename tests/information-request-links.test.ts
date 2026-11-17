import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TrainingActionLink } from '../src/components/TrainingActionLink';
import { INFORMATION_REQUEST_URL } from '../src/lib/contact-request';

const renderLink = (href?: string) => renderToStaticMarkup(createElement(TrainingActionLink, { href }, 'Continuer'));

test('le formulaire et ses anciennes adresses ouvrent un nouvel onglet dès le rendu HTML', () => {
  for (const href of [undefined, INFORMATION_REQUEST_URL, `${INFORMATION_REQUEST_URL}/?formation=APS`, '/reservationrdvvtc?utm_source=site']) {
    const html = renderLink(href);
    assert.ok(html.includes(INFORMATION_REQUEST_URL));
    assert.match(html, /target="_blank"/);
    assert.match(html, /rel="noopener noreferrer"/);
  }
  assert.ok(renderLink('/reservationrdvvtc?utm_source=site').includes('formation=VTC&amp;utm_source=site'));
});

test('un parcours interne, le standard et les autres actions conservent leur destination', () => {
  for (const href of ['/contact?formation=bts', '#dates-tarifs', 'tel:+33422470768', `${INFORMATION_REQUEST_URL}-autre`]) {
    const html = renderLink(href);
    assert.ok(html.includes(`href="${href}"`));
    assert.doesNotMatch(html, /target="_blank"/);
  }
});
