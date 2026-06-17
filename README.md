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
- Remplacer les placeholders éventuels par des images autorisées.
- Relire `INVENTAIRE_SITE.md` pour garantir qu’aucune information utile n’est perdue.
