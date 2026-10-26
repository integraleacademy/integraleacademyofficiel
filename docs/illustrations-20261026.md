# Illustrations du site — 26 octobre 2026

Les scènes répétées sur une même page ont été remplacées par des scènes distinctes. La référence graphique est l’illustration SSIAP fournie par Clément : dessin pédagogique 2D, contours bleu marine, aplats colorés, architecture claire bleue et blanche, végétation verte et personnages adultes expressifs.

## Modifications

- Accueil : scènes différentes pour le carrousel sécurité, la mise en pratique du parcours et l’accompagnement au campus. L’atelier radio reste réservé au volet pratique des méthodes pédagogiques.
- SSIAP 1 : cinq illustrations de programme distinctes, une scène d’assistance et une scène d’examen, pour supprimer les répétitions avec les missions et la galerie pédagogique.
- SST : deux nouvelles scènes pour le rôle du sauveteur et la prévention, distinctes de la galerie.
- Planning : une image différente pour chaque aperçu et chaque filtre ; nouveaux paysages Paris et Côte d’Azur dans le même style que les personnages.
- BTS : nouvelles scènes tablette et Londres, cohérentes avec la référence.
- DESP initial : scène de création d’entreprise distincte de celle du parcours.
- Contact : illustration différente pour chacun des quatre projets proposés.

Les photos du campus, portraits de l’équipe, couvertures de manuels et pictogrammes conservent leur fonction propre. Les illustrations existantes déjà cohérentes avec la référence sont conservées. Une scène peut accompagner le même sujet sur plusieurs pages ; elle ne se répète pas dans les emplacements illustrés d’une même page.

## Fichiers générés

Les 16 scènes sont livrées en WebP, 1536 × 1024 pixels, dans [`public/images/illustrations-2026`](../public/images/illustrations-2026/) :

| Usage | Fichiers |
| --- | --- |
| Accueil et accompagnement | `accueil-securite.webp`, `parcours-pratique.webp`, `campus-accompagnement.webp` |
| Lieux de formation | `destination-paris.webp`, `destination-cote-azur.webp` |
| Programme SSIAP | `ssiap-feu.webp`, `ssiap-batiment.webp`, `ssiap-installations.webp`, `ssiap-main-courante.webp`, `ssiap-exercice.webp` |
| Assistance et évaluation SSIAP | `ssiap-assistance.webp`, `ssiap-examen.webp` |
| SST | `sst-situation.webp`, `sst-prevention.webp` |
| Vie étudiante BTS | `bts-londres.webp`, `bts-tablette.webp` |

Outil de génération : `image_gen.imagegen`, avec la pièce jointe comme référence de style. Les instructions exactes de chaque génération sont conservées dans [`illustrations-20261026-prompts.json`](./illustrations-20261026-prompts.json).

## Validation

- Compilation de production Next.js et vérification TypeScript réussies.
- 20 tests ciblés accueil, planning et filtres géographiques réussis.
- Audit navigateur de 35 pages publiques, des interactions de l’accueil et du contact, et des vues à 390 et 768 pixels.
- Vérification des 16 fichiers WebP et contrôle visuel des principaux emplacements.
- La suite historique `.mjs` conserve ses 30 échecs préexistants (97 tests réussis), confirmés identiques sur le commit de départ `9221362efadde3f07da4512c70b5c2aa7b684e70`. Aucun nouvel échec dans cette suite.
