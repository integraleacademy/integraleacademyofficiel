# Référencement du site Intégrale Academy — 9 septembre 2026

## Périmètre

Optimisation des 37 pages publiques du nouveau site. Les trois pages utilitaires (tests et confirmations de rappel) possèdent également des métadonnées et restent exclues de l’indexation. Les adresses DESP demandées restent `/dirigeant`, `/despvaeouinitial` et `/vaedirigeant`.

## Changements

- Titres précis et distincts par page, avec une seule occurrence de la marque. L’accueil ne porte plus le titre générique « Accueil ». Suppression des anciens noms et des doublons de marque dans les métadonnées.
- Descriptions propres à chaque page, rédigées à partir des contenus existants : formation, métier, lieu ou besoin présenté. La description CPF ne répète plus la même formulation.
- Métadonnées Open Graph et Twitter cohérentes pour chaque page ; image de partage de 1 200 × 630 pixels avec le logo existant.
- URL canoniques absolues sur le domaine public prévu, sans paramètres de campagne. Les liens de conversion conservent leurs paramètres grâce au mécanisme de migration existant.
- Informations structurées EducationalOrganization et WebSite : identité, adresse principale, coordonnées et lieux de formation. Seuls les comptes Facebook et Instagram de l’école sont déclarés comme profils de l’organisme.
- Données WebPage et fil d’Ariane par page publique, avec navigation visible avant le bloc de contact. Les BTS renvoient vers leur catalogue, et les parcours DESP vers la page de choix.
- Uniformisation des données Course existantes : URL, identifiant et organisme communs ; maintien des FAQ existantes. Ajout des formations DESP initial, VTC et CPSP ; la VAE est décrite comme un service d’accompagnement.
- Protection de la sérialisation des données JSON-LD contre les délimiteurs de script.
- Sitemap alimenté par le même catalogue éditorial, contenant seulement les 37 pages publiques canoniques. Aucune date de modification fictive.
- Métadonnées noindex sur les confirmations, ressources internes et administration. Maintien des règles HTTP noindex du domaine Render et des API.
- Couvertures des brochures servies avec Next Image : dimensions réservées, tailles adaptées à l’écran et chargement différé des cartes.

## Vérifications avant publication

- 17 tests ciblés réussis : référencement, migration des liens et brochures.
- Compilation Next.js de production réussie, incluant la vérification TypeScript.
- Contrôle HTTP des 40 pages déclarées : statut 200, titre unique, description attendue, canonique, Open Graph, Twitter, un H1 et politique d’indexation attendue.
- Présence des données structurées dans le HTML envoyé par le serveur, sans dépendre de l’exécution JavaScript ; un seul fil d’Ariane sur chaque page publique hors accueil.
- Aucune image HTML sans attribut alt dans les 40 pages contrôlées. Les images décoratives peuvent conserver un alt vide.
- Neuf contrôles complémentaires : sitemap de 37 URL, robots.txt, deux routes inexistantes en 404/noindex, connexion administration, API, redirection DESP en 308 avec paramètre conservé, domaine Render non indexable et image de partage en PNG.
- Image de partage inspectée visuellement ; logo et textes lisibles, sans débordement.
- Contrôle local du Host public : absence d’en-tête noindex global. Contrôle local du Host Render : noindex, follow.

Ces contrôles vérifient la sortie du site. Ils ne constituent pas une mesure de trafic, de positionnement, de Core Web Vitals en conditions réelles ou de validation dans Search Console.

## Déploiement et suite de la migration

Les modifications sont destinées au service Render existant `integraleacademyofficiel-1`. Aucun changement de DNS ou de domaine n’est inclus. Le site Wix reste le site public tant que la bascule n’a pas été effectuée.

Les URL canoniques, le sitemap et l’image de partage pointent vers `https://www.integraleacademy.com` pour la version publique finale. Les aperçus sociaux utilisant ces adresses seront pleinement disponibles après la bascule. Le domaine Render garde son en-tête noindex pour éviter une indexation anticipée.

Après la bascule autorisée : contrôler les redirections et les documents sur le domaine public, soumettre le sitemap dans la propriété Search Console appropriée, inspecter les pages principales et suivre les erreurs et performances. Aucune propriété Search Console, Analytics ou fiche Google Business Profile n’a été modifiée dans cette intervention.

L’ancienne adresse `/cap` reste à arbitrer : confirmer si cette formation est encore proposée et quelle page doit reprendre son contenu. Aucune redirection vers une formation différente n’a été inventée.

Les titres et descriptions sont des propositions éditoriales : les moteurs peuvent afficher un autre extrait. Les données structurées décrivent les contenus sans promettre un résultat enrichi ni une position dans Google.

## Catalogue des pages

La marque « | Intégrale Academy » est ajoutée une seule fois à chaque titre ci-dessous.

| Page | Titre | Description | Indexation publique |
| --- | --- | --- | --- |
| / | Formations sécurité, VTC et BTS | Préparez votre métier avec Intégrale Academy : formations sécurité privée, incendie, VTC et BTS en alternance, à Puget-sur-Argens et à distance selon le parcours. | Oui, après bascule |
| /ecole | École de formation à Puget-sur-Argens | Découvrez Intégrale Academy à Puget-sur-Argens : notre école, l’équipe pédagogique et les espaces consacrés aux formations professionnelles et aux BTS. | Oui, après bascule |
| /centres | Nos écoles et lieux de formation | Retrouvez les adresses et accès aux lieux de formation Intégrale Academy à Puget-sur-Argens, Paris et Aurillac. Consultez les parcours et sessions proposés. | Oui, après bascule |
| /formations-securite | Formations sécurité privée et incendie | Découvrez les formations APS, A3P, DESP, SSIAP et SST : programmes, prérequis, dates et financements pour préparer votre métier dans la sécurité. | Oui, après bascule |
| /formations-securite/aps | Formation APS à Puget-sur-Argens (Var) | Préparez le métier d’agent de prévention et de sécurité avec la formation APS à Puget-sur-Argens : programme, distanciel, pratique, examen et financement. | Oui, après bascule |
| /formations-securite/a3p-apr | Formation A3P / APR – Protection rapprochée | Formez-vous à la protection rapprochée avec le parcours A3P à Puget-sur-Argens : 328 heures hors examen, mises en situation, prérequis et financements. | Oui, après bascule |
| /formations-securite/cpsp | Formation CPSP – Chef de poste sécurité privée | Découvrez la formation chef de poste en sécurité privée à Puget-sur-Argens : coordination d’équipe, consignes, suivi des prestations et encadrement de proximité. | Oui, après bascule |
| /formations-securite/ssiap | Formations SSIAP – Sécurité incendie | Choisissez votre parcours SSIAP à Puget-sur-Argens : SSIAP 1, 2 ou 3, recyclage et remise à niveau. Découvrez les métiers, prérequis et modalités. | Oui, après bascule |
| /formations-securite/ssiap-1 | Formation SSIAP 1 à Puget-sur-Argens | Préparez le diplôme SSIAP 1 d’agent de sécurité incendie à Puget-sur-Argens. Consultez le programme, les prérequis, l’examen et les prochaines sessions. | Oui, après bascule |
| /formations-securite/ssiap-2 | Formation SSIAP 2 – Chef d’équipe incendie | Évoluez vers le métier de chef d’équipe de sécurité incendie avec le SSIAP 2 à Puget-sur-Argens : programme, conditions d’accès, examen et inscription. | Oui, après bascule |
| /formations-securite/ssiap-3 | Formation SSIAP 3 – Chef de service incendie | Découvrez le SSIAP 3 pour préparer les responsabilités de chef de service de sécurité incendie : réglementation, gestion des risques, management et examen. | Oui, après bascule |
| /formations-securite/recyclage-remise-a-niveau-ssiap | Recyclage et remise à niveau SSIAP 1, 2 et 3 | Actualisez vos compétences en sécurité incendie : recyclage ou remise à niveau SSIAP 1, 2 et 3 à Puget-sur-Argens, selon votre diplôme et votre situation. | Oui, après bascule |
| /formations-securite/sst | Formation SST – Secourisme au travail | Apprenez à prévenir les risques et porter secours au travail : formation SST de 14 heures en présentiel à Puget-sur-Argens, avec exercices et mises en situation. | Oui, après bascule |
| /despvaeouinitial | DESP : formation initiale ou VAE ? | Vous souhaitez diriger une entreprise de sécurité privée ? Comparez le DESP en formation initiale et la VAE selon votre expérience, votre projet et vos besoins. | Oui, après bascule |
| /dirigeant | Formation DESP initial – Dirigeant sécurité privée | Préparez le titre de dirigeant d’entreprise de sécurité privée avec le DESP initial : formation à distance et en présentiel, gestion, réglementation et management. | Oui, après bascule |
| /vaedirigeant | VAE DESP – Dirigeant de sécurité privée | Faites reconnaître votre expérience avec la VAE DESP : étude de recevabilité, dossier de preuves, accompagnement et préparation au jury de certification. | Oui, après bascule |
| /vtc | Formation chauffeur VTC – Théorie et pratique | Préparez l’examen chauffeur VTC avec Intégrale Academy : théorie en ligne, conduite professionnelle, véhicule double commande et frais d’examen inclus. | Oui, après bascule |
| /bts | BTS en alternance dans le Var et à distance | Préparez un BTS en alternance à Puget-sur-Argens ou à distance : MOS, MCO, NDRC, commerce international, immobilier ou comptabilité. Découvrez les parcours. | Oui, après bascule |
| /bts/mos | BTS MOS en alternance – Management de la sécurité | Préparez le BTS Management opérationnel de la sécurité en alternance à Puget-sur-Argens ou à distance : prestations de sécurité, management et relation client. | Oui, après bascule |
| /bts/mco | BTS MCO en alternance – Commerce et management | Préparez le BTS Management commercial opérationnel en alternance à Puget-sur-Argens ou à distance : vente, relation client, gestion et management d’équipe. | Oui, après bascule |
| /bts/ndrc | BTS NDRC en alternance – Relation client | Préparez le BTS Négociation et digitalisation de la relation client à Puget-sur-Argens ou à distance : prospection, négociation, vente et outils numériques. | Oui, après bascule |
| /bts/commerce-international | BTS Commerce international en alternance | Préparez le BTS Commerce international en alternance, à Puget-sur-Argens ou à distance : langues, import-export et développement commercial international. | Oui, après bascule |
| /bts/professions-immobilieres | BTS Professions immobilières en alternance | Préparez le BTS Professions immobilières en alternance, à Puget-sur-Argens ou à distance : transaction, gestion locative, copropriété et conseil immobilier. | Oui, après bascule |
| /bts/comptabilite-gestion | BTS Comptabilité et gestion en alternance | Préparez le BTS Comptabilité et gestion en alternance, à Puget-sur-Argens ou à distance : comptabilité, fiscalité, gestion sociale et analyse financière. | Oui, après bascule |
| /planning | Dates des formations sécurité, VTC et BTS | Consultez les prochaines dates de formation Intégrale Academy. Filtrez par parcours et lieu pour préparer votre inscription et anticiper votre financement. | Oui, après bascule |
| /tarifs | Tarifs des formations sécurité et VTC | Comparez les tarifs, durées et prestations des formations APS, A3P, DESP, VAE, SSIAP, SST et VTC. Retrouvez les solutions de financement selon votre situation. | Oui, après bascule |
| /financements | Financer sa formation – CPF, alternance et aides | Étudiez les solutions pour financer votre formation : CPF, France Travail, alternance, employeur ou financement personnel. Intégrale Academy vous accompagne. | Oui, après bascule |
| /financements/cpf | Financer sa formation avec le CPF | Préparez votre financement CPF : vérification de vos droits, choix d’une formation éligible et démarches sur Mon Compte Formation avec Intégrale Academy. | Oui, après bascule |
| /financements/france-travail | Financement de formation avec France Travail | Construisez votre projet de formation avec France Travail : choix du parcours, devis, demande de financement et validation de votre dossier avec votre conseiller. | Oui, après bascule |
| /financements/alternance | Financement et inscription en BTS en alternance | Découvrez le fonctionnement de l’alternance chez Intégrale Academy : candidature en BTS, recherche d’entreprise, contrat et prise en charge de la formation. | Oui, après bascule |
| /entreprises | Recrutement et formation en sécurité privée | Recrutez et formez vos équipes avec Intégrale Academy : alternance, BTS MOS et parcours adaptés aux besoins des entreprises de sécurité privée. | Oui, après bascule |
| /contact | Contact et admission en formation | Contactez Intégrale Academy pour choisir votre formation, connaître les dates, préparer votre admission ou étudier votre financement avec notre équipe. | Oui, après bascule |
| /faq | FAQ BTS – Admission, alternance et financement | Retrouvez les réponses à vos questions sur les BTS Intégrale Academy : candidature, alternance, financement, rythme des cours et accompagnement. | Oui, après bascule |
| /dossiersfc | Brochures des formations sécurité et VTC | Consultez les brochures APS, A3P, SSIAP 1, DESP initial, VAE DESP et VTC pour découvrir les programmes, modalités et informations utiles à votre projet. | Oui, après bascule |
| /dossiersbts | Brochures des BTS en alternance | Consultez les dossiers de présentation de nos BTS en alternance : métiers visés, programmes, modalités et accompagnement pour préparer votre candidature. | Oui, après bascule |
| /mentions-legales | Mentions légales | Retrouvez les mentions légales du site Intégrale Academy : identité de l’éditeur, coordonnées, hébergement, publication et propriété intellectuelle. | Oui, après bascule |
| /politique-confidentialite | Politique de confidentialité et données personnelles | Découvrez comment Intégrale Academy traite les données transmises pour vos demandes d’informations et candidatures, ainsi que vos droits et les contacts utiles. | Oui, après bascule |
| /gestion | Tests et ressources de formation | Accès aux tests et ressources utiles aux candidats Intégrale Academy. | Non |
| /rdvvtc | Demande de rappel VTC confirmée | Confirmation de votre demande de rappel concernant la formation chauffeur VTC Intégrale Academy. | Non |
| /rdvconfirmedirigeant | Demande de rappel dirigeant confirmée | Confirmation de votre demande de rappel concernant le parcours dirigeant de sécurité privée Intégrale Academy. | Non |

## Références

- [Google — Guide de démarrage SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google — Titres des résultats de recherche](https://developers.google.com/search/docs/appearance/title-link)
- [Google — Migration avec changement d’URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Google — Données structurées Organization](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google — Fil d’Ariane](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Schema.org — Course](https://schema.org/Course)
- [Next.js — Métadonnées](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
