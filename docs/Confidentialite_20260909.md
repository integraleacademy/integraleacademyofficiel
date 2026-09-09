# Politique de confidentialité — 9 septembre 2026

## Mise à jour du site

La page `/politique-confidentialite` remplace les deux paragraphes initiaux par neuf rubriques accessibles par un sommaire : responsable, catégories de données, finalités et bases légales, destinataires, critères de conservation, stockages du navigateur, prestataires et transferts, orientation et droits. Le contact est `ecole@integraleacademy.com`, sans inventer de DPO.

Un avis apparaît avant l’ouverture du formulaire depuis la carte de contact. Il indique le traitement de la demande, son enregistrement progressif et le lien vers la politique. Les routes et métadonnées SEO sont conservées.

## Éléments vérifiés

- Identité et adresse : mentions légales existantes, SIREN 840 899 884.
- Service Render du site : région Francfort ; cette localisation ne permet pas de conclure que tous les traitements des prestataires restent dans l’EEE.
- `ThemeToggle`, `ProjectTrainingPopup` et `src/lib/admin/auth.ts` : préférence locale sans expiration programmée, fermeture de fenêtre pendant la session de l’onglet et session administrateur de 24 heures.
- `OrientationAssistant` et `VaeEligibilityModal` : réponses conservées dans l’état de la page ; l’orientation charge des sessions publiques mais n’envoie pas ces réponses.
- Liens et services utilisés : formulaire CRM, espace de candidature BTS, Calendly, Canva et ChatGPT externe. L’ancien composant `AIChatWidget` n’est pas monté dans le site ; les routes de discussion et de prise de contact restent présentes et nécessitent leur propre suivi si elles sont utilisées ou réactivées.
- Formulaire CRM : dépôt `integraleacademy/assistance`, `templates/demande_informations_formations.html`, blob `05345e1b40bfa33d02f18ef61ba3f409967c0a13`. Collecte de coordonnées, projet, financement, prérequis, attribution de campagne ; sauvegarde progressive avant validation ; présence de Google Tag Manager. Aucun envoi de demande réelle n’a été effectué pour cette vérification.

## Limites et suites à traiter dans les outils concernés

Cette publication améliore l’information des visiteurs ; elle ne vaut pas audit complet de conformité des systèmes externes.

- **Antécédents :** le formulaire CRM comporte une question `garde_vue` sur les gardes à vue ou prises d’empreintes. La base légale spécifique et la nécessité de cette collecte doivent être vérifiées au regard de l’article 10 du RGPD et du droit français. La politique ne prétend pas que des démarches précontractuelles suffisent à l’autoriser. Aucun champ ni dossier CRM n’a été modifié.
- **Conservation :** les échéances exactes par catégorie de dossier et les procédures de suppression/archivage du CRM et des candidatures n’ont pas été vérifiées. La page donne des critères de durée et un contact ; elle ne promet ni purge automatique ni délai uniforme. Un calendrier opérationnel de conservation reste à établir et appliquer dans chaque outil.
- **Information à la collecte et traceurs :** le formulaire externe doit présenter sa propre information avant l’enregistrement progressif et permettre les choix requis pour ses traceurs. Le conteneur GTM a été constaté, mais son contenu, les consentements et les règles de déclenchement n’ont pas été audités. Ajouter le lien dans le site ne modifie pas le formulaire accessible directement depuis une publicité.
- **Prestataires :** vérifier le registre, les accords de sous-traitance, les sous-traitants ultérieurs et les garanties de transfert réellement applicables à chaque outil. Ne pas assimiler la région du service web à celle de tous les traitements.

## Vérifications avant publication

- Compilation de production réussie sur la base `e6c8c854bc75e209d4002863561be6fb91398680`, qui inclut la correction de contrôle d’origine des photos APS.
- 13 tests existants réussis : métadonnées SEO et contrôle des origines administrateur.
- Requêtes HTTP locales sur `/politique-confidentialite` et `/contact` : statut 200, un H1, URL canonique et JSON-LD valides, liens du sommaire et contact présents, destination CRM conservée.
- L’en-tête `noindex, follow` des domaines Render est conservé. Aucun basculement du domaine public n’est inclus.

## Sources officielles consultées

- [CNIL — Information et transparence](https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence)
- [CNIL — Durées de conservation](https://www.cnil.fr/fr/passer-laction/les-durees-de-conservation-des-donnees)
- [CNIL — Répondre à une demande d’accès](https://www.cnil.fr/fr/repondre-une-demande-de-droit-dacces)
- [CNIL — Cookies et autres traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi)
- [RGPD, dont article 10](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)
- [Render — Accord de protection des données](https://render.com/dpa)
- [Calendly — Confidentialité](https://calendly.com/legal/privacy-notice)
- [Canva — Confidentialité](https://www.canva.com/policies/privacy-policy/)
- [OpenAI — Confidentialité](https://openai.com/policies/privacy-policy/)
