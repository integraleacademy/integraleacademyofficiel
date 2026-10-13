# Intégrale Academy — refonte Next.js

Refonte du site vitrine Intégrale Academy en Next.js App Router, TypeScript et Tailwind CSS.

## Prérequis

- Node.js 20 ou supérieur recommandé
- npm

## Installation locale

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Build production

```bash
npm run build
npm start
```

## Déploiement Render

Le fichier `render.yaml` est fourni. Configuration prévue :

- Build command : `npm install && npm run build`
- Start command : `npm start`
- Runtime : Node

## Organisation des données

- `src/data/formations.ts` : formations sécurité, VTC et BTS.
- `src/data/locations.ts` : lieux, adresses, coordonnées et horaires.
- `src/data/faq.ts` : FAQ globales et formations.
- `src/data/site.ts` : exports de compatibilité pour les composants existants.

## Images et inspirations

Dossiers prévus :

- `public/images` : images de production autorisées.
- `public/logos` : logos et marques propres au projet.
- `public/inspirations` : captures d’inspiration uniquement, à ne pas réutiliser directement sans autorisation.

Si une image manque, le site utilise actuellement des blocs visuels propres en CSS plutôt que des images externes non autorisées.

## Formulaire de contact

Le formulaire contient : nom, prénom, téléphone, email, formation souhaitée, lieu souhaité, message, consentement RGPD et bouton envoyer.

L’envoi réel d’email n’est pas encore connecté. Pour le connecter :

1. Créer une route API Next.js, par exemple `src/app/api/contact/route.ts`.
2. Choisir un fournisseur email autorisé : SMTP, Resend, SendGrid, Brevo ou autre.
3. Stocker les secrets dans les variables d’environnement Render.
4. Remplacer la confirmation locale de `src/components/ContactForm.tsx` par un `fetch('/api/contact')`.
5. Ajouter une validation serveur des champs et du consentement RGPD.
6. Mettre à jour la politique de confidentialité avec le traitement réel des données.

## Vérifications avant mise en production

- Valider l’email public et le numéro WhatsApp exact.
- Importer les brochures/PDF officiels si disponibles.
- Vérifier les RNCP/RS, agréments, Qualiopi, CNAPS, ADEF, SSIAP, INRS et UAI.
- Connecter les formulaires et tester l’envoi réel.
- Remplacer les textes provisoires éventuels par des images autorisées.
- Relire `INVENTAIRE_SITE.md` pour garantir qu’aucune information utile n’est perdue.

## Tchat IA Intégrale Academy

Le site embarque un widget de tchat IA connecté à la route serveur `POST /api/chat`. La clé OpenAI reste uniquement côté serveur et ne doit jamais être exposée dans le frontend.

### Variables d’environnement Render

Dans Render, ouvrir le service web puis **Environment** et ajouter :

- `OPENAI_API_KEY` : clé API OpenAI serveur.
- `OPENAI_MODEL` : modèle utilisé par le tchat, par exemple `gpt-4o-mini` ou un autre modèle compatible Chat Completions.

Après modification, redéployer le service. En local, les mêmes variables peuvent être placées dans un fichier `.env.local` non versionné.

### Évolution leads

Le tchat peut proposer un rappel. Une future route dédiée pourra enregistrer : nom, prénom, téléphone, email, formation souhaitée et message, avec consentement RGPD explicite.

## Avis Google

- Gestion protégée : `/admin/ia/avis-google` (lien dans le menu et le tableau de bord).
- Plusieurs formations par avis, extrait modifiable, publication/masquage et mise en avant. Enregistrer chaque avis après modification.
- L’accueil lit uniquement les avis publiés notés 5 étoiles en PostgreSQL. Les filtres et compteurs reflètent ces données ; aucune moyenne globale n’est calculée à partir de cette sélection.
- La migration `20261013040000_google_reviews` crée la table et importe 41 avis/extraits, avec dédoublonnage de la sélection historique. Il s’agit d’un import partiel et manuel, pas d’une synchronisation exhaustive avec Google Business Profile. La provenance du lot initial figure dans `src/data/google-reviews-seed.json`.
- Les nouveaux avis peuvent être ajoutés dans l’administration avec leur nom, date, lien Google et extrait corrigé. Les modifications ultérieures sont conservées en base et ne sont pas réinitialisées au déploiement.
- Vérification ciblée : `node --import tsx --test tests/google-reviews.test.ts tests/admin-request-origin.test.ts`.
