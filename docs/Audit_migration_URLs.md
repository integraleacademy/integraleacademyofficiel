# Préparation de la migration des URL — Intégrale Academy

Audit du 8 septembre 2026, initialement préparé et vérifié localement. **La publication du correctif sur le nouveau site Render a ensuite été autorisée par le propriétaire. La bascule de `www.integraleacademy.com` n'est pas incluse dans cette publication.**

Base de travail : dépôt `integraleacademy/integraleacademyofficiel`, commit `81ba181a8f67a2d996e602171e9a16e61881d918`. Branche locale `prepare/migration-urls-20260908`.

## Résultat

Les trois URL demandées sont préparées à la racine du site : `/dirigeant`, `/despvaeouinitial` et `/vaedirigeant`. Les URL actuelles du nouveau site redirigeront vers ces adresses. Les pages de formation gardent leurs contenus et leur présentation.

Le contrôle du [site actuel](https://www.integraleacademy.com/) et de son [sitemap](https://www.integraleacademy.com/pages-sitemap.xml) a recensé 32 pages dans le sitemap, complétées par deux pages accessibles hors sitemap (`/mentions-légales` et `/dossiersbts`). Les 34 pages ont répondu HTTP 200 lors du contrôle. `/sst`, vérifiée séparément, répond actuellement 404 sur l’ancien site : son futur alias est ajouté pour rejoindre la page SST existante du nouveau site.

Les trois chemins DESP souhaités, `/formations-securite/a3p`, `/robots.txt` et `/sitemap.xml` répondaient HTTP 404 sur le nouveau site pendant l’audit. Le code de la branche principale ne contenait aucune règle de redirection.

**Attention à la correspondance APS :** sur l’ancien site, `/securiteprivee` désigne la formation APS, `/securiteprivee-1` le catalogue sécurité et `/a3p` la protection rapprochée. Les campagnes A3P qui utilisent `/securiteprivee` doivent donc être corrigées séparément.

## Les trois pages DESP

| Chemin actuel sur le nouveau site | Adresse préparée sur le domaine définitif |
|---|---|
| `/formations-securite/desp-initial` | `https://www.integraleacademy.com/dirigeant` |
| `/formations-securite/desp` | `https://www.integraleacademy.com/despvaeouinitial` |
| `/formations-securite/desp-vae` | `https://www.integraleacademy.com/vaedirigeant` |

Les liens de l’accueil, du catalogue, des comparateurs, de l’assistant d’orientation, des tarifs et des données de formation utilisent les adresses retenues. Les identifiants internes des formations (`desp-initial`, `desp-vae`, etc.) restent ceux utilisés par les sessions. Les liens historiques déjà enregistrés sont normalisés à la lecture, sans lancer de migration de données ni réinitialiser de sessions.

## Correspondance des 32 pages du sitemap historique

| Ancien chemin | Destination préparée | État |
|---|---|---|
| `/dirigeant` | `/dirigeant` | Adresse conservée |
| `/contact` | `/contact` | Adresse conservée |
| `/vaedirigeant` | `/vaedirigeant` | Adresse conservée |
| `/gestion` | `/gestion` | Adresse conservée |
| `/candidature` | `https://inscriptionsbts.onrender.com/` | Redirection permanente préparée |
| `/bts` | `/bts` | Adresse conservée |
| `/rdvteldirigeant` | `https://assistance-alw9.onrender.com/demande-informations-formations?formation=DESP_INIT` | Redirection permanente vers le CRM |
| `/btsndrc` | `/bts/ndrc` | Redirection permanente préparée |
| `/despvaeouinitial` | `/despvaeouinitial` | Adresse conservée |
| `/btsmco` | `/bts/mco` | Redirection permanente préparée |
| `/formulairevtc` | `/dossiersfc#vtc` | Redirection permanente préparée |
| `/assistance` | `https://assistance-alw9.onrender.com/` | Redirection permanente préparée |
| `/btsmos` | `/bts/mos` | Redirection permanente préparée |
| `/planning` | `/planning` | Adresse conservée |
| `/` | `/` | Adresse conservée |
| `/cpsp` | `/formations-securite/cpsp` | Redirection permanente préparée |
| `/reservationrdvvtc` | `https://assistance-alw9.onrender.com/demande-informations-formations?formation=VTC` | Redirection permanente vers le CRM |
| `/a3p` | `/formations-securite/a3p-apr` | Redirection permanente préparée |
| `/ssiap1` | `/formations-securite/ssiap-1` | Redirection permanente préparée |
| `/faq` | `/faq` | Adresse conservée |
| `/cap` | `À décider` | En attente |
| `/rdvvtc` | `/rdvvtc` | Confirmation de rappel reprise, hors indexation |
| `/securiteprivee` | `/formations-securite/aps` | Redirection permanente préparée |
| `/dossiersfc` | `/dossiersfc` | Adresse conservée |
| `/vtc` | `/vtc` | Adresse conservée |
| `/btsprofessionsimmobilieres` | `/bts/professions-immobilieres` | Redirection permanente préparée |
| `/dossiervtc` | `/dossiersfc#vtc` | Redirection permanente préparée |
| `/securiteprivee-1` | `/formations-securite` | Redirection permanente préparée |
| `/rdvconfirmedirigeant` | `/rdvconfirmedirigeant` | Confirmation de rappel reprise, hors indexation |
| `/commerceinternational` | `/bts/commerce-international` | Redirection permanente préparée |
| `/alternance` | `/financements/alternance` | Redirection permanente préparée |
| `/ecole` | `/ecole` | Adresse conservée |

`/gestion` conserve les trois liens déjà présents sur l’ancien site : examen blanc ADEF, test de français et test de positionnement AFC. La page est exclue de l’indexation.

`/faq` est reprise avec les questions communes déjà présentes dans le catalogue BTS du nouveau site. L’ancienne FAQ contient des références à 2025 : il ne s’agit pas d’une copie exhaustive de ses anciens textes.

`/formulairevtc` et `/dossiervtc` rejoignent directement la carte du dossier VTC sur `/dossiersfc#vtc`. Les demandes de rappel rejoignent le formulaire existant du CRM avec la formation présélectionnée. Ces chemins ne déclenchent aucun envoi lors d’une simple visite.

## Autres redirections préparées

Les règles sont centralisées dans `src/data/url-redirects.json` et appliquées par `next.config.ts`.

| Chemin source | Destination |
|---|---|
| `/formations-securite/desp-initial` | `/dirigeant` |
| `/formations-securite/desp` | `/despvaeouinitial` |
| `/formations-securite/desp-vae` | `/vaedirigeant` |
| `/formations-securite/a3p` | `/formations-securite/a3p-apr` |
| `/sst` | `/formations-securite/sst` |
| `/mentions-légales` | `/mentions-legales` |
| `/mentions-l%C3%A9gales` | `/mentions-legales` |
| `/formations-vtc` | `/vtc` |
| `/pages-sitemap.xml` | `/sitemap.xml` |

Les redirections utilisent HTTP 308, le statut permanent natif de Next.js. Les paramètres de campagne et de session sont conservés. Les destinations internes utilisent des chemins relatifs afin de fonctionner sur le domaine de test comme sur le futur domaine public. Les redirections mènent directement à la destination finale. [Documentation Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).

## Documents et référencement

- Les **19 PDF** référencés sous `www.integraleacademy.com/_files/ugd/…` sont copiés à l’identique dans le nouveau site et gardent leurs chemins publics. Les programmes, agréments et documents déjà partagés resteront ainsi accessibles.
- Les **11 couvertures** des dossiers de présentation sont copiées dans le projet. L’affichage de ces couvertures ne dépend plus de Wix. Les liens de consultation Canva restent ceux existants.
- L’inventaire technique des 30 fichiers, avec URL source, taille et empreinte SHA-256, figure dans `docs/migration-assets-20260908.json`. Total : 20 394 638 octets. Il s’agit d’une conservation des fichiers, pas d’une validation de l’actualité de leur contenu.
- Les URL canoniques des pages publiques utilisent `https://www.integraleacademy.com`. Les deux canoniques de `/dossiersfc` et `/dossiersbts` qui pointaient encore vers le domaine Render sont corrigées.
- Un sitemap des pages publiques canoniques et un `robots.txt` sont ajoutés. Les anciennes redirections et les pages administratives sont exclues du sitemap. L’ancien `/pages-sitemap.xml` redirige vers `/sitemap.xml`.
- Le domaine de test `*.onrender.com` reçoit un en-tête `X-Robots-Tag: noindex, follow`. Cet en-tête ne s’applique pas à `www.integraleacademy.com`. Les routes administratives et API reçoivent `noindex, nofollow`.
- Le domaine affiché dans les mentions légales est préparé pour `www.integraleacademy.com`.

## Points à décider avant la migration

| Page | Constat | Traitement restant |
|---|---|---|
| `/cap` | Présente dans le sitemap de l’ancien site ; cinq CAP y sont proposés avec des informations 2025. Aucune page CAP correspondante dans le nouveau site. | Confirmer si l’offre CAP est conservée. Si oui, reprendre la page et actualiser son contenu ; sinon, organiser son retrait avec une réponse adaptée. Aucune redirection vers une formation sans rapport n’a été ajoutée. |

La page `/cap` reste non reprise : la décision sur l’offre CAP empêche de considérer la reprise du sitemap historique comme totalement achevée.

### Complément de vérification du 8 septembre 2026

La PR 372 est fusionnée dans `main` au commit `b1b7bfd8124432fe705fdf68e2abb5b8cd48077f`. Render confirme le déploiement `dep-dag4oq97lnhs7386otlg` en état `live`. Les 38 pages publiques du contrôle HTTP ont répondu 200. Le domaine `www.integraleacademy.com` sert toujours l’ancien site Wix.

La reprise du contrôle a identifié le parcours des deux confirmations : dans la version courante de `integraleacademy/assistance`, la route publique `POST /rappel` enregistre la demande puis redirige vers `/rdvvtc` ou `/rdvconfirmedirigeant`. Ces deux pages sont donc conservées aux mêmes adresses, avec leur message de confirmation et des liens vers les formations. Elles sont exclues de l’indexation et du sitemap. Aucun nouvel événement publicitaire n’est ajouté sur leur simple consultation ; le suivi configuré dans les plateformes publicitaires reste à contrôler lors de la bascule.

Les anciennes demandes de rappel `/rdvteldirigeant` et `/reservationrdvvtc` pointaient vers un formulaire de contact qui affichait un message local sans transmettre les informations. Elles sont corrigées pour rejoindre directement `/demande-informations-formations` sur le CRM. Les codes `DESP_INIT` et `VTC` sont reconnus par le formulaire courant, qui présélectionne `formation` depuis l’URL. Les paramètres publicitaires sont conservés par les redirections.

Sur `/contact`, le formulaire sans transmission est remplacé par un accès au formulaire du CRM, accompagné des contacts e-mail pour les BTS et les autres demandes. Le lien reprend la formation reconnue et les paramètres de campagne de la page. Les noms, e-mails et paramètres arbitraires ne sont pas recopiés dans cette URL. La vérification ne soumet aucune demande réelle.

Validation du complément : compilation de production avec TypeScript réussie, sept tests de migration réussis, vérification des deux pages de confirmation dans le HTML généré et des deux redirections 308 dans le manifeste de production. Le contrôle final des adresses déployées est effectué après publication. L’affichage et l’envoi complet du formulaire externe ne sont pas validés par ces tests.

## Contrôles à faire au changement de domaine

La future page d’accueil reste `/`. `/formations-securite` reste le catalogue sécurité. Ne pas rediriger l’ensemble du domaine ni toutes les anciennes pages vers ce seul catalogue.

Le contrôle Render avant publication confirme le service `integraleacademyofficiel-1` (`srv-d8pd2fs8aovs73efeuo0`), relié au dépôt `integraleacademy/integraleacademyofficiel`, branche `main`, avec déploiement automatique à chaque commit. Le déploiement actif au moment de ce contrôle utilise le commit `81ba181a8f67a2d996e602171e9a16e61881d918`. Aucune modification de domaine, de DNS ou de certificat n'est réalisée dans ce correctif. Le fichier `render.yaml` du dépôt n'associe aucun domaine personnalisé.

Au moment de la bascule, contrôler le service exact `integraleacademyofficiel-1.onrender.com`, raccorder `www.integraleacademy.com` et le domaine sans `www`, puis vérifier HTTPS et le domaine principal. Conserver la configuration de messagerie existante. Le sous-domaine Render peut rester accessible pour que ses liens continuent à fonctionner. [Documentation Render sur les domaines](https://render.com/docs/custom-domains).

Contrôler ensuite les formulaires de demande d’informations, les inscriptions BTS, les retours de formulaire et les événements publicitaires avec le domaine définitif. L’audit présent n’a envoyé aucun formulaire et n’a pas modifié le CRM, les campagnes publicitaires, les réseaux sociaux ou les documents Canva.

Après la bascule, soumettre le sitemap définitif à Search Console et surveiller les erreurs 404, les redirections et l’indexation. La correspondance précise de chaque URL et des redirections permanentes est recommandée par [Google pour une migration d’URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## Validation locale

- Compilation de production `npm run build` : réussie, contrôle TypeScript compris.
- 21 tests ciblés : réussis (URL de migration, cartes d’accueil, dossiers, couleurs des formations).
- 38 pages contrôlées en HTTP : réponse 200 et URL canonique correcte ; une page utilitaire `/gestion` est incluse et exclue de l’indexation.
- 26 redirections : réponse 308, destination correcte, conservation de `utm_source`, `gclid` et `session`, sans boucle ni chaîne entre règles. Pour les deux destinations externes, le contrôle porte sur l’URL de redirection, pas sur la soumission du formulaire externe.
- 30 fichiers servis en HTTP : contenu identique aux copies sauvegardées, contrôlé par SHA-256.
- 38 chemins de navigation interne contrôlés : destinations publiques accessibles et accès administrateur redirigé vers la connexion. Aucun compte administrateur n’a été connecté.
- Aucune ancre locale manquante dans les liens des pages préparées. Les anciens identifiants techniques Wix `#comp-…` ne sont pas tous repris : les liens de campagne qui utilisent ces fragments doivent être revus avant bascule.
- Domaine Render simulé : `noindex` présent ; domaine public simulé : aucune interdiction d’indexation appliquée.
- `robots.txt` et `sitemap.xml` : réponses 200, domaine définitif correct.
- Les tests utilisent les données de repli locales, sans connexion à la base de production et sans envoyer de formulaire.

Le relevé des pages et des résultats HTTP est conservé dans `docs/migration-http-results-20260908.json`. Ces résultats décrivent la copie locale préparée. Le déploiement autorisé doit être suivi d'un contrôle des nouvelles adresses et des redirections sur le service Render.
