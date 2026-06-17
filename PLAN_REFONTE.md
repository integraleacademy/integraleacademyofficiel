# Plan de refonte du site Intégrale Academy

Ce plan est créé avant tout développement, conformément à la demande. Il s'appuie sur `INVENTAIRE_SITE.md` et sert de feuille de route pour une refonte Next.js moderne, premium, responsive, SEO et déployable sur Render.

## 1. Nouvelle arborescence du site

### Menu principal
- `/` : Accueil
- `/formations-securite` : Formations sécurité
- `/bts` : BTS en alternance
- `/vtc` : Formation VTC
- `/financements` : Financements
- `/entreprises` : Entreprises
- `/planning` : Planning des formations
- `/contact` : Contact

### Pages formations sécurité
- `/formations-securite/aps` : APS - Agent de prévention et de sécurité
- `/formations-securite/ssiap-1` : SSIAP 1
- `/formations-securite/sst` : SST
- `/formations-securite/a3p-apr` : A3P / APR - Protection rapprochée
- `/formations-securite/desp` : Dirigeant d’entreprise de sécurité privée / DSSP / DESP

### Pages BTS
- `/bts/mos` : BTS MOS
- `/bts/mco` : BTS MCO
- `/bts/ndrc` : BTS NDRC
- `/bts/commerce-international` : BTS Commerce International
- `/bts/professions-immobilieres` : BTS Professions Immobilières
- `/bts/comptabilite-gestion` : BTS Comptabilité Gestion

### Pages financements
- `/financements/cpf` : CPF
- `/financements/france-travail` : France Travail
- `/financements/alternance` : Alternance

### Pages institutionnelles
- `/ecole` : Notre école
- `/centres` : Nos centres
- `/mentions-legales` : Mentions légales
- `/politique-confidentialite` : Politique de confidentialité

## 2. Pages à créer

1. Accueil avec hero fort, lieux, domaines, formations principales, avantages, centres, financements, accompagnement, entreprises, chiffres clés, FAQ, CTA final.
2. Formations sécurité avec cartes APS, SSIAP 1, SST, A3P/APR, DESP, CPSP mentionné comme formation issue de l'inventaire.
3. Pages formation avec structure commune : hero, résumé rapide, objectifs, programme, évaluation, débouchés, financement, pourquoi Intégrale Academy, FAQ, contact final.
4. VTC avec contenu e-learning, pratique Nice/Cannes/Toulon/Fréjus, CPF et textes réglementaires.
5. BTS en alternance avec explication alternance, rythme, accompagnement entreprise et cartes BTS.
6. Pages BTS détaillées selon l'inventaire.
7. Financements, CPF, France Travail, Alternance.
8. Entreprises : recruter alternant, former salariés, sécurité privée, BTS, avantages, formulaire.
9. Planning : cartes modifiables avec formation, lieu, date, statut, inscription.
10. Notre école et Nos centres.
11. Contact avec formulaire, téléphone, email à vérifier, adresses, WhatsApp, lieux.
12. Mentions légales et politique de confidentialité.

## 3. Composants à créer

- `Header`
- `Footer`
- `Hero`
- `Button`
- `FormationCard`
- `FeatureCard`
- `StatCard`
- `FAQ`
- `ContactBlock`
- `LocationCard`
- `FinancingCard`
- `SectionTitle`
- `Badge`
- `CTASection`
- `PageShell` / sections de mise en page
- `ContactForm` pour les pages contact et entreprises

## 4. Contenu repris depuis l’inventaire

### Pages et navigation
Les pages et liens sont repris depuis l'inventaire des pages actuelles : accueil, contact, école, hubs sécurité/BTS, planning, mentions légales, APS, SSIAP 1, A3P/APR, DESP/VAE, CPSP, VTC, BTS MOS, MCO, CI, NDRC, PI et Comptabilité Gestion.

### Formations
- APS : 175 h, 5 semaines, 1650 €, Puget-sur-Argens, CNAPS/RNCP 36648.
- SSIAP 1 : 70 h, 2 semaines, tarifs 980 € et 1230 € avec SST, RS 5641, agrément SSIAP n°8323.
- A3P/APR : 327 h, 9 semaines, 4200 €, RNCP 38002, hébergement possible.
- DESP/DSSP : 245 h initial, 4300 €, VAE 3800 €, distanciel + présentiel Paris/Puget/Aurillac, RNCP 40385.
- SST : mention INRS H34836/2020/SST-1/O/07, contenu détaillé à vérifier.
- VTC : 105 h, 1600 €, théorie e-learning, pratique Nice/Cannes/Toulon/Fréjus, agrément VTC-26-001.
- BTS MOS : 2 ans, 1350 h, alternance, gratuit apprentis, rythme 15 jours école/15 jours entreprise, RNCP 41000.
- BTS MCO, NDRC, CI, PI : contenus programmes/missions/qualités repris de l'inventaire.
- BTS Comptabilité Gestion : statut prochainement, 100 % à distance uniquement.

### Coordonnées
- Téléphone : 04 22 47 07 68.
- Horaires standard : lundi-vendredi 08h00-19h00 ; samedi 08h00-12h00.
- Puget-sur-Argens : 54 chemin du Carreou, ZI du Carreou, 83480 Puget-sur-Argens.
- Paris : 142 rue de Rivoli, 75001 Paris.
- Aurillac : Village d'entreprises, 14 avenue du Garric, 15000 Aurillac.
- WhatsApp : lien présent mais numéro exact non exposé dans l'inventaire.
- Email : lien présent mais adresse exacte non exposée dans l'inventaire.

### Informations légales et réglementaires
À préserver dans le footer et les pages concernées : NDA DREETS 93830600283, Qualiopi n°03169, UAI Côte d'Azur 0831774C, UAI Paris 0756548K, CNAPS FOR-083-2027-02-08-20200755135, ADEF APS 8320032701, ADEF A3P 8320111201, SSIAP n°8323, INRS SST H34836/2020/SST-1/O/07, VTC-26-001, SIREN 840 899 884 00026, SASU capital 4500 €.

## 5. Points à vérifier manuellement

- Contenu complet des PDF/dossiers de présentation externes.
- Destination exacte et champs des formulaires de rappel, devis et pré-inscription.
- Adresse email publique réelle.
- Numéro WhatsApp exact.
- Contenu complet des formations SST, MAC APS et MAC APR si elles ont des pages cachées.
- Dates de planning VTC/BTS non récupérées entièrement dans l'inventaire.
- Validité actuelle des agréments, RNCP/RS et numéros Qualiopi/CNAPS/ADEF.
- Témoignages : aucun témoignage exploitable n'a été trouvé dans l'inventaire ; prévoir une section prête à masquer ou alimenter.

## 6. Informations manquantes à ne pas inventer

- Email exact.
- Numéro WhatsApp exact.
- Témoignages clients/stagiaires.
- Champs exacts des formulaires actuels.
- PDF complets et fichiers téléchargeables.
- Détails complets SST/MAC APS/MAC APR.

## 7. Architecture technique prévue

- Next.js App Router avec TypeScript.
- Tailwind CSS avec palette Intégrale Academy : `#F7F7F4`, `#111111`, `#FFFFFF`, `#F4C45A`, `#EAEAEA`, `#22C55E`.
- Données centralisées dans `src/data/site.ts` pour éviter les duplications.
- Composants réutilisables dans `src/components`.
- Pages server components simples et rapides.
- Metadata SEO par page.
- Déploiement Render via scripts `npm run build` et `npm start`.
