import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const navigation = read('src/components/TrainingSectionNavigation.tsx');
const navigationStyles = read('src/components/TrainingSectionNavigation.module.css');
const btsNavigation = read('src/components/BtsSectionNavigation.tsx');

const pages = {
  a3p: read('src/components/A3pReferencePage.tsx'),
  vtc: read('src/app/vtc/page.tsx'),
  despInitial: read('src/app/formations-securite/desp-initial/page.tsx'),
  despVae: read('src/app/formations-securite/desp-vae/page.tsx'),
};

const btsPages = [
  ['MOS', 'src/components/BtsMosReferencePage.tsx', '#metier', '#faq-mos'],
  ['MCO', 'src/components/BtsMcoReferencePage.tsx', '#metier', '#faq-mco'],
  ['NDRC', 'src/components/BtsNdrcReferencePage.tsx', '#competences', '#faq-ndrc'],
  ['CI', 'src/components/BtsCiReferencePage.tsx', '#competences', '#faq-ci'],
  ['PI', 'src/components/BtsPiReferencePage.tsx', '#competences', '#faq-pi'],
  ['CG', 'src/components/BtsCgReferencePage.tsx', '#competences', '#faq-cg'],
];

test('le nouveau sommaire reprend le comportement lisible et fixe de la page APS', () => {
  assert.match(navigation, /^'use client';/);
  assert.match(navigation, /IntersectionObserver/);
  assert.match(navigation, /getComputedStyle\(nav\)\.top/);
  assert.match(navigation, /nav\.offsetHeight \+ 20/);
  assert.match(navigation, /section\.style\.scrollMarginTop = scrollMarginTop/);
  assert.match(navigation, /new ResizeObserver/);
  assert.match(navigation, /alignInitialHash/);
  assert.match(navigation, /aria-current=\{active \? 'location' : undefined\}/);
  assert.doesNotMatch(navigation, /index|padStart\(2/);
  assert.match(navigationStyles, /\.courseNav\s*\{[^}]*position:\s*sticky;[^}]*top:\s*55px;/s);
  assert.match(navigationStyles, /@media \(min-width: 1280px\)[\s\S]*\.courseNav\s*\{[^}]*top:\s*75px;/);
  assert.match(navigationStyles, /\.courseNavScroller\s*\{[^}]*overflow-x:\s*auto;/s);
  assert.match(navigationStyles, /@media \(max-width: 1180px\)[\s\S]*\.courseNavScroller\s*\{[^}]*grid-row:\s*2;/);
  assert.doesNotMatch(navigationStyles, /\.courseNav\s*\{[^}]*display:\s*none;/s);
});

test('A3P, VTC et les deux parcours DESP utilisent le même sommaire thématisé', () => {
  assert.match(pages.a3p, /mark="A3P"[\s\S]*title="TFP A3P"[\s\S]*theme="green"/);
  assert.match(pages.vtc, /mark="VTC"[\s\S]*title="Chauffeur VTC"[\s\S]*theme="violet"/);
  assert.match(pages.despInitial, /mark="DESP"[\s\S]*title="DESP initial"[\s\S]*theme="orange"/);
  assert.match(pages.despVae, /mark="DESP"[\s\S]*title="DESP en VAE"[\s\S]*theme="orange"/);

  for (const page of Object.values(pages)) {
    assert.match(page, /<TrainingSectionNavigation/);
    assert.match(page, /overflow-x-clip|className=\{styles\.page\}/);
  }
});

test('les sommaires des formations courtes pointent vers des rubriques présentes', () => {
  for (const [name, page] of Object.entries(pages)) {
    const hrefs = [...page.matchAll(/href: '(#[^']+)'/g)].map((match) => match[1]);
    assert.ok(hrefs.length >= 8, `${name} doit proposer au moins huit rubriques`);
    for (const href of hrefs) {
      assert.ok(page.includes(`id="${href.slice(1)}"`) || href === '#dates-tarifs', `${name} : cible absente ${href}`);
    }
  }
});

test('les six pages BTS ont le nouveau sommaire, sans ancienne barre masquée sur mobile', () => {
  for (const [code, path, competencyHref, faqHref] of btsPages) {
    const page = read(path);
    assert.ok(page.includes(`<BtsSectionNavigation code="${code}"`), `${code} : composant absent`);
    assert.ok(page.includes(`competencyHref="${competencyHref}"`), `${code} : rubrique métier incorrecte`);
    assert.ok(page.includes(`faqHref="${faqHref}"`), `${code} : FAQ incorrecte`);
    assert.match(page, /<main className="relative overflow-x-clip/);
    assert.doesNotMatch(page, /<nav aria-label="Sommaire du BTS/);
    assert.doesNotMatch(page, /sticky top-0 z-30 hidden/);
  }

  assert.match(btsNavigation, /label: 'Admissions'/);
  assert.match(btsNavigation, /registrationLabel="Je candidate"/);
  assert.match(btsNavigation, /externalRegistration/);
});

test('les boutons des formations courtes ouvrent le formulaire de demande demandé', () => {
  for (const [name, page] of Object.entries(pages)) {
    assert.ok(
      page.includes("https://assistance-alw9.onrender.com/demande-informations-formations"),
      `${name} : formulaire d’inscription incorrect`,
    );
  }
});
