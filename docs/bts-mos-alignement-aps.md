# Présentation BTS MOS alignée sur la page APS

La page BTS MOS reprend les composants de présentation APS tout en conservant le contenu du diplôme et ses trois sections interactives.

| Repère APS | Adaptation BTS MOS |
| --- | --- |
| Hero de formation | Titre BTS MOS plus présent, intitulé distinct, illustration agrandie ; hauteur ajustée à l’écran en conservant le récapitulatif et les conditions de financement. |
| Métier et immersion | Sections « 01 / Votre futur métier », « 02 / Votre rythme », « 03 / Votre façon d’étudier » conservées avec leurs interactions. |
| PC sécurité | Même galerie de trois photos réelles et mêmes six familles d’équipements, avec des explications orientées organisation, coordination et management. |
| Bienvenue chez Intégrale Academy | Même présentation de l’école et même galerie administrable. Le repère « 12 maximum par session APS » est remplacé par les deux années du BTS. Le parcours à distance reste explicite. |
| Programme par onglets | Composant partagé avec APS : 1 350 heures, quatre blocs professionnels et trois enseignements généraux. Tous les contenus existants sont repris. Aucun volume horaire par matière n’est inventé. |
| Examen | Section dédiée avec repères, modalités, tableau complet des sept épreuves, coefficients et durées existants. |
| Pack et vie à l’école | Avantages propres au BTS : iPad et Londres, avec leurs conditions de contrat d’apprentissage conservées. |
| Inscription et financement | Deux accès en ligne et Parcoursup, étapes, alternance, conditions CNAPS et coordonnées d’Aurélie conservés. |
| Avis Google | Même composant que sur APS, alimenté par les avis publiés de catégorie « BTS MOS » ; libellés adaptés aux étudiants. Les modifications dans l’administration actualisent aussi cette page. |
| FAQ et contact | Contenus BTS et interlocutrice Aurélie conservés. |

Les illustrations restent distinctes. La scène de l’atelier pédagogique est déplacée dans le programme ; elle n’est pas dupliquée. Les photos du PC et de l’école restent des photos réelles.

## Vérifications

- Compilation de production et TypeScript.
- Comparaison des contenus existants avant/après, y compris les compétences et le tableau d’examen.
- Navigation des sept onglets MOS et des quatorze UV APS, au clic et au clavier.
- Missions, alternance, ancres, images, examen, affichages ordinateur/mobile et mode sombre.
- 34 tests ciblés réussis ; les deux échecs de `aps-official-program.test.mjs` sont également présents sur le commit de départ et concernent des assertions statiques sur l’ancienne structure APS.
- Les avis sont lus depuis la base de production ; aucun témoignage de démonstration n’est ajouté au site.
