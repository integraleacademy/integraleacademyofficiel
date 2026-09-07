import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const gallery = read('src/components/TrainingMotionGallery.tsx');
const styles = read('src/components/TrainingMotionGallery.module.css');
const pages = {
  a3p: read('src/components/A3pReferencePage.tsx'),
  ssiap: read('src/components/SsiapReferencePage.tsx'),
  sst: read('src/components/SstReferencePage.tsx'),
  despVae: read('src/app/formations-securite/desp-vae/page.tsx'),
  despInitial: read('src/app/formations-securite/desp-initial/page.tsx'),
};

const expectedStories = {
  a3p: ['Préparer la mission', 'Analyser les risques', 'Reconnaître les lieux', 'Protéger en déplacement', 'Sécuriser les trajets', 'Briefer et débriefer'],
  ssiap: ['Effectuer une ronde', 'Vérifier les équipements', 'Exploiter le SSI', 'Lever le doute et alerter', 'Faciliter l’évacuation', 'Accueillir les secours'],
  sst: ['Protéger la zone', 'Examiner la victime', 'Alerter les secours', 'Réaliser le geste adapté', 'Pratiquer la réanimation', 'Utiliser un défibrillateur'],
  despVae: ['Analyser votre parcours', 'Établir la faisabilité', 'Rassembler les preuves', 'Démontrer les compétences', 'Préparer le jury', 'Faire reconnaître l’expérience'],
  despInitial: ['Construire le projet', 'Garantir la conformité', 'Piloter les finances', 'Développer l’activité', 'Recruter et manager', 'Préparer les démarches CNAPS'],
};

test('chaque formation affiche sa galerie motion design dédiée', () => {
  for (const [variant, source] of Object.entries(pages)) {
    assert.ok(source.includes(`import { TrainingMotionGallery } from '@/components/TrainingMotionGallery';`), `import manquant pour ${variant}`);
    assert.ok(source.includes(`<TrainingMotionGallery variant="${variant}"`), `galerie manquante pour ${variant}`);
  }
});

test('chaque galerie contient six scènes métier spécifiques', () => {
  for (const [variant, titles] of Object.entries(expectedStories)) {
    const start = gallery.indexOf(`  ${variant}: {`);
    const nextVariant = Object.keys(expectedStories)[Object.keys(expectedStories).indexOf(variant) + 1];
    const end = nextVariant ? gallery.indexOf(`  ${nextVariant}: {`, start) : gallery.indexOf('\n};', start);
    const block = gallery.slice(start, end);

    for (const title of titles) assert.ok(block.includes(title), `${variant} : scène manquante « ${title} »`);
    assert.equal((block.match(/^\s+\['/gm) || []).length, 6, `${variant} doit présenter exactement six scènes`);
  }
});

test('les scènes sont accessibles et ne chargent aucune photo', () => {
  assert.ok(gallery.includes('role="img" aria-label={description}'));
  assert.ok(gallery.includes("'aria-hidden': true"));
  assert.doesNotMatch(gallery, /<Image|\.jpg|\.jpeg|\.png|\.webp/);
});

test('la galerie reste compacte sur mobile et en grille sur grand écran', () => {
  assert.match(styles, /\.cards\s*\{[\s\S]*?grid-auto-flow:\s*column;[\s\S]*?overflow-x:\s*auto;[\s\S]*?scroll-snap-type:\s*x mandatory;/);
  assert.match(styles, /@media \(min-width: 640px\)[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(min-width: 1024px\)[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
});

test('les animations respectent la préférence de mouvement réduit', () => {
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?animation:\s*none !important;/);
});

test('A3P et SSIAP conservent leur scène principale en plus des cartes détaillées', () => {
  assert.match(pages.a3p, /<MissionAnimation variant="a3p"/);
  assert.match(pages.ssiap, /<MissionAnimation variant="ssiap"/);
});
