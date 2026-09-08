import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const gallery = read('src/components/TrainingMotionGallery.tsx');
const styles = read('src/components/TrainingMotionGallery.module.css');
const despCards = read('src/components/DespIllustratedCards.tsx');
const pages = {
  a3p: read('src/components/A3pReferencePage.tsx'),
  ssiap: read('src/components/SsiapReferencePage.tsx'),
  sst: read('src/components/SstReferencePage.tsx'),
  despVae: read('src/app/formations-securite/desp-vae/page.tsx'),
  despInitial: read('src/app/formations-securite/desp-initial/page.tsx'),
  btsMos: read('src/components/BtsMosReferencePage.tsx'),
  btsMco: read('src/components/BtsMcoReferencePage.tsx'),
  btsNdrc: read('src/components/BtsNdrcReferencePage.tsx'),
  btsCi: read('src/components/BtsCiReferencePage.tsx'),
  btsPi: read('src/components/BtsPiReferencePage.tsx'),
  btsCg: read('src/components/BtsCgReferencePage.tsx'),
  vtc: read('src/app/vtc/page.tsx'),
};

const expectedStories = {
  a3p: ['Préparer la mission', 'Analyser les risques', 'Reconnaître les lieux', 'Protéger en déplacement', 'Sécuriser les trajets', 'Briefer et débriefer'],
  ssiap: ['Effectuer une ronde', 'Vérifier les équipements', 'Exploiter le SSI', 'Lever le doute et alerter', 'Faciliter l’évacuation', 'Accueillir les secours'],
  sst: ['Protéger la zone', 'Examiner la victime', 'Alerter les secours', 'Réaliser le geste adapté', 'Pratiquer la réanimation', 'Utiliser un défibrillateur'],
  despVae: ['Analyser votre parcours', 'Établir la faisabilité', 'Rassembler les preuves', 'Démontrer les compétences', 'Préparer le jury', 'Faire reconnaître l’expérience'],
  despInitial: ['Construire le projet', 'Garantir la conformité', 'Piloter les finances', 'Développer l’activité', 'Recruter et manager', 'Préparer les démarches CNAPS'],
  btsMos: ['Planifier les missions', 'Superviser le terrain', 'Coordonner les équipes', 'Piloter depuis le poste', 'Rendre compte au client', 'Garantir la conformité'],
  btsMco: ['Piloter l’unité commerciale', 'Comprendre les clients', 'Développer les ventes', 'Gérer l’offre et les stocks', 'Suivre la performance', 'Animer l’équipe'],
  btsNdrc: ['Identifier les prospects', 'Entrer en relation', 'Négocier et vendre', 'Personnaliser le suivi', 'Fidéliser les clients', 'Animer les réseaux'],
  btsCi: ['Étudier les marchés', 'Organiser les flux', 'Piloter la logistique', 'Maîtriser les formalités', 'Négocier à l’international', 'Suivre la performance export'],
  btsPi: ['Découvrir et estimer un bien', 'Comprendre le projet client', 'Organiser les visites', 'Négocier la transaction', 'Sécuriser les dossiers', 'Gérer biens et copropriétés'],
  btsCg: ['Enregistrer les opérations', 'Contrôler les écritures', 'Respecter les obligations', 'Construire les budgets', 'Analyser les écarts', 'Préparer la clôture'],
  vtc: ['Organiser la réservation', 'Préparer l’itinéraire', 'Accueillir le passager', 'Conduire en sécurité', 'Calculer et facturer', 'Fidéliser la clientèle'],
};

test('chaque formation affiche ses scènes dans la galerie ou les cartes métier', () => {
  for (const [variant, source] of Object.entries(pages)) {
    if (variant === 'a3p') {
      const immersion = source.slice(source.indexOf('<Section id="pedagogie"'), source.indexOf('<Section id="certification"'));
      const card = immersion.slice(immersion.indexOf('<article key={practice.title}'), immersion.indexOf('</article>'));
      assert.ok(card.includes('<TrainingMotionIllustration kind={practice.scene} theme="green" description={practice.visualDescription} />'));
      assert.doesNotMatch(source, /<TrainingMotionGallery variant="a3p"/);
      const practices = source.slice(source.indexOf('const practices = ['), source.indexOf('const examSteps = ['));
      for (const scene of ['mission-map', 'risk-radar', 'site-check', 'close-protection', 'secure-vehicle', 'hazard', 'cpr', 'briefing']) {
        assert.ok(practices.includes(`scene: '${scene}'`), `visuel A3P manquant : ${scene}`);
      }
      assert.ok(practices.includes('Secours aux personnes'));
      continue;
    }
    if (variant === 'despInitial' || variant === 'despVae') {
      const initial = variant === 'despInitial';
      const sectionId = initial ? 'metier' : 'parcours';
      const items = initial ? 'jobMissions' : 'steps';
      const section = source.slice(source.indexOf(`id="${sectionId}"`), source.indexOf(initial ? '</TextSection>' : '</section>', source.indexOf(`id="${sectionId}"`)));
      assert.ok(section.includes(`<DespIllustratedCards items={${items}}/>`), `${variant} : visuels absents des cartes existantes`);
      assert.doesNotMatch(source, /<TrainingMotionGallery/);
      const card = despCards.slice(despCards.indexOf('<article key={item.title}'), despCards.indexOf('</article>'));
      assert.ok(card.includes('<TrainingMotionIllustration kind={scene.kind} theme="orange" description={scene.description} />'));
      const scenes = initial
        ? ['business', 'compliance', 'finance', 'commercial', 'team', 'approval', 'evidence', 'site-check', 'briefing']
        : ['profile-review', 'feasibility', 'approval', 'evidence', 'competencies', 'jury', 'certificate'];
      for (const scene of scenes) assert.ok(source.includes(`kind: '${scene}'`), `${variant} : visuel manquant ${scene}`);
      continue;
    }
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

test('les six BTS conservent leur scène principale en plus de leur galerie détaillée', () => {
  for (const [variant, animation] of [
    ['btsMos', 'mos'],
    ['btsMco', 'mco'],
    ['btsNdrc', 'ndrc'],
    ['btsCi', 'ci'],
    ['btsPi', 'pi'],
    ['btsCg', 'cg'],
  ]) {
    assert.match(pages[variant], new RegExp(`<MissionAnimation variant="${animation}"`));
  }
});

test('la page VTC conserve son animation d’itinéraire et ajoute sa galerie violette', () => {
  assert.match(pages.vtc, /<MissionAnimation variant="vtc"/);
  assert.match(pages.vtc, /<TrainingMotionGallery variant="vtc"/);
  assert.match(gallery, /vtc:[\s\S]*?theme: 'violet'/);
  assert.match(styles, /\.violet\s*\{[\s\S]*?--accent:\s*#7c3aed/);
});
