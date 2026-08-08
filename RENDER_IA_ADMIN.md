# Déploiement Render — IA dynamique Intégrale Academy

Variables d’environnement à configurer :

- `DATABASE_URL` : URL PostgreSQL Render.
- `OPENAI_API_KEY` : clé API OpenAI côté serveur uniquement.
- `OPENAI_MODEL` : `gpt-5.4-mini` par défaut, possible `gpt-5.4` ou `gpt-5.5`.
- `ADMIN_USERNAME` : identifiant admin.
- `ADMIN_PASSWORD` : mot de passe admin.
- `ADMIN_SESSION_SECRET` : secret long et aléatoire pour signer le cookie de session.

Commandes recommandées :

- Build : `npm install && npm run prisma:generate && npm run build`
- Start : `npm run start`
- Post-deploy / migration : `npm run render:postdeploy`
- Seed seul : `npm run prisma:seed`

Notes sécurité :

- Les routes `/api/admin/*` et `/admin/ia/*` sont protégées par session admin.
- Les routes `/api/knowledge-health` et `/api/chat-debug` sont publiques temporairement pour debug : à protéger ou désactiver en production.
- Les notes internes de session ne sont pas incluses dans le contexte envoyé à l’IA.
