import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const globals = readFileSync('src/app/globals.css', 'utf8');
const layout = readFileSync('src/app/layout.tsx', 'utf8');
const mobileCta = readFileSync('src/components/GlobalMobileCTA.tsx', 'utf8');
const header = readFileSync('src/components/ui.tsx', 'utf8');
const mobileMenu = readFileSync('src/components/MobileHeaderMenu.tsx', 'utf8');
const popup = readFileSync('src/components/ProjectTrainingPopup.tsx', 'utf8');
const rating = readFileSync('src/components/GoogleRatingBadge.tsx', 'utf8');
const assistant = readFileSync('src/components/OrientationAssistant.tsx', 'utf8');
const contactCta = readFileSync('src/components/GlobalContactCTA.tsx', 'utf8');
const homeCss = readFileSync('src/app/home.module.css', 'utf8');
const vtcCss = readFileSync('src/app/vtc/vtc.module.css', 'utf8');

test('les conteneurs mobiles utilisent toute la largeur utile sans débordement horizontal', () => {
  assert.match(globals, /body \{[^}]*overflow-x: hidden;[^}]*overflow-x: clip;/);
  assert.match(globals, /@media \(max-width: 640px\) \{[\s\S]*?width: min\(100% - 24px, 1320px\);[\s\S]*?padding-left: 0;[\s\S]*?padding-right: 0;/);
});

test('une seule barre mobile est affichée selon le gabarit de page', () => {
  assert.match(layout, /<GlobalMobileCTA\/>/);
  assert.doesNotMatch(layout, /StickyMobileCTA/);
  assert.match(mobileCta, /normalizedPath === '\/planning'/);
  assert.match(mobileCta, /\^\\\/bts\\\/\[\^\/\]\+\$/);
  for (const slug of ['aps', 'ssiap-1', 'sst', 'a3p-apr']) {
    assert.match(mobileCta, new RegExp(`/formations-securite/${slug}`));
  }
  assert.match(mobileCta, /env\(safe-area-inset-bottom\)/);
});

test('les barres propres aux pages respectent aussi la zone sûre des téléphones', () => {
  const dedicatedPages = [
    'ApsReferencePage.tsx',
    'SsiapReferencePage.tsx',
    'SstReferencePage.tsx',
    'A3pReferencePage.tsx',
    'BtsMosReferencePage.tsx',
    'BtsMcoReferencePage.tsx',
    'BtsNdrcReferencePage.tsx',
    'BtsCiReferencePage.tsx',
    'BtsPiReferencePage.tsx',
    'BtsCgReferencePage.tsx',
  ];

  for (const filename of dedicatedPages) {
    const source = readFileSync(`src/components/${filename}`, 'utf8');
    assert.match(source, /pb-\[calc\(\.75rem\+env\(safe-area-inset-bottom\)\)\]/, filename);
  }

  const planning = readFileSync('src/app/planning/PlanningClient.tsx', 'utf8');
  assert.match(planning, /bottom-\[calc\(\.75rem\+env\(safe-area-inset-bottom\)\)\]/);
});

test('le header et son menu restent compacts et lisibles sur téléphone', () => {
  assert.match(header, /h-\[44px\] w-\[46px\]/);
  assert.match(header, /text-\[11px\]/);
  assert.match(mobileMenu, /text-academy-ink/);
  assert.match(mobileMenu, /max-h-\[calc\(100dvh-5rem\)\]/);
  assert.match(mobileMenu, /overscroll-contain/);
});

test('les éléments flottants ne se recouvrent plus et restent dans le viewport', () => {
  assert.doesNotMatch(popup, /calc\(100%-2rem\)/);
  assert.match(popup, /inset-x-3/);
  assert.match(popup, /max-h-\[calc\(100dvh-7rem\)\]/);
  assert.match(rating, /bottom-\[calc\(5\.5rem\+env\(safe-area-inset-bottom\)\)\] left-3 right-auto/);
  assert.match(assistant, /lg:bottom-24 lg:right-6/);
});

test('les composants denses se réorganisent pour les petites largeurs', () => {
  assert.match(assistant, /grid grid-cols-2 gap-2\.5 xl:grid-cols-5/);
  assert.match(assistant, /last:col-span-2/);
  assert.match(contactCta, /grid h-full w-full place-items-center/);
  assert.match(homeCss, /font-size:clamp\(2\.35rem,12vw,47px\)/);
  assert.match(homeCss, /@media\(max-width:420px\)\{\.heroActions\{grid-template-columns:1fr\}/);
  assert.match(vtcCss, /font-size:clamp\(2\.45rem,12vw,47px\)/);
});
