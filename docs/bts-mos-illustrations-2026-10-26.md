# Illustrations BTS MOS — harmonisation du 26 octobre 2026

Mode : outil intégré ImageGen. Huit créations originales, 1536 × 1024 pixels, converties en WebP (qualité 88) sans recadrage.

Référence fournie : « Capture d’écran 2026-10-26 à 05.28.36.png » (contrôle d’accès d’un véhicule). Référence de style uniquement, sans reproduction de la scène.

Consigne de style commune : illustration pédagogique française, contours bleu marine nets, proportions adultes naturelles, visages simples, aplats bleus et verts, ombres légères, architecture blanche et bleu clair, végétation verte, ambiance professionnelle et lumineuse. Pas de rendu photographique, 3D ou manga ; pas de texte, filigrane, cadre ou collage. Format paysage 3:2.

Les fichiers sont dans `public/images/bts/mos-unifie-2026/`. Chaque scène est affectée à un seul emplacement de la page. Les illustrations existantes d’accueil et du parcours restent distinctes. La photo réelle du campus, les logos et le portrait d’Aurélie sont conservés.

## Prompts des scènes

### reperer.webp

A female security manager with a navy uniform and tablet, and a male security agent, stand in an industrial yard. She points toward an obstructed pedestrian route with boxes near a glass entrance. They are surveying access routes and risks before preparing a service. Clearly different scene from the reference vehicle interaction.

### organiser.webp

Inside a bright modern security office, a female security manager and two adult trainees in simple civilian clothes prepare the roster together. They point at a large paper site plan on a desk with a radio and laptop. Behind them a simple colored scheduling board, no text or readable numbers. A calm planning scene with no wall of surveillance screens.

### manager.webp

At the outdoor entrance of a modern building, a female security team leader holds a clipboard and briefs three uniformed agents standing in a friendly semicircle. One agent asks a question, the leader explains the assignment with an open hand gesture. Medium wide scene with full figures, light blue building, green foliage.

### bilan-client.webp

Inside a bright office overlooking a blue industrial site, a female security manager in navy jacket shows a simple report on her tablet to a client seated across a desk. A modest paper report and pen on desk, a small chart behind them without text. Focus on their calm conversation about service quality, different staging from a classroom or briefing.

### cours-distance.webp

A young adult BTS student in a simple cream sweater sits at a desk in a bright home study, taking notes while attending a live online class on a laptop showing one teacher and three students in simple screen tiles. A navy notebook, a pen, a blue mug, window and greenery. View from beside the student so the face and screen are clearly visible. A real live class, not self paced learning.

### atelier-pedagogique.webp

Inside a bright educational security training room, an adult female instructor in civilian clothing shows two BTS students how to check a training security control panel and use a handheld radio. A small bank of four simple CCTV screens behind them, blue and white furniture, greenery outside. Clearly a practical classroom exercise; no reused meeting-table or site-plan scene.

### ipad.webp

A young adult female BTS student in a cream sweater sits in a bright college study space and writes with a stylus on a tablet in landscape orientation, with an open notebook beside her. Another student is visible softly in the background studying. Blue chairs, white modern windows and green trees. Tablet screen with simple educational notes, no readable text or logos.

### londres.webp

Four young adult French college students, two women and two men with varied skin tones, in casual navy and cream outerwear and backpacks, explore London together by the Thames. One points happily at Big Ben across the river while the others chat. Westminster architecture simplified, bright blue sky, green tree at edge. Friendly educational trip, no security uniforms.


## Validation

- Compilation de production et vérification TypeScript.
- Vérification des contenus de la page, des quatre étapes métier, du calendrier d’alternance, des ancres et du lien de rendez-vous APS.
- Vérification visuelle sur ordinateur et mobile.
- Les huit échecs anciens des tests statiques `aps-ux-normalization` et `training-section-navigation` ont été reproduits sur le commit de départ : ils concernent des structures de pages remplacées avant cette modification.
