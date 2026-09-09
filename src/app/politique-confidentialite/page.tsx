import Link from 'next/link';
import type { ReactNode } from 'react';
import { Hero } from '@/components/ui';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('/politique-confidentialite');

const privacyEmail = 'ecole@integraleacademy.com';
const rightsHref = `mailto:${privacyEmail}?subject=Exercice%20de%20mes%20droits%20sur%20mes%20donn%C3%A9es`;
const linkClass = 'font-bold text-academy-ink underline decoration-academy-gold underline-offset-4 hover:text-academy-gold-strong dark:text-white';

const sections = [
  ['responsable', 'Qui traite vos données ?'],
  ['donnees', 'Les données concernées'],
  ['utilisations', 'Pourquoi les utiliser ?'],
  ['destinataires', 'Qui peut y accéder ?'],
  ['conservation', 'Combien de temps ?'],
  ['cookies', 'Cookies et préférences'],
  ['services-externes', 'Services externes et hébergement'],
  ['outils-orientation', 'Les outils d’orientation'],
  ['vos-droits', 'Exercer vos droits'],
] as const;

function PrivacySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titre`} className="scroll-mt-28 rounded-[1.7rem] border border-academy-line/70 bg-academy-surface p-5 sm:p-8">
      <h2 id={`${id}-titre`} className="text-2xl font-black tracking-tight text-academy-ink dark:text-white">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-academy-muted sm:text-base sm:leading-8">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Hero badge="Vos données personnelles" title="Politique de confidentialité" subtitle="Comprendre l’utilisation de vos informations et savoir comment exercer vos droits." />

      <div className="page-container py-10 sm:py-14">
        <div className="mb-8 rounded-[1.7rem] border border-academy-gold/30 bg-academy-gold-soft/25 p-5 sm:p-7">
          <p className="text-xs font-bold text-academy-gold-strong">Mise à jour le <time dateTime="2026-09-09">9 septembre 2026</time></p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-academy-muted sm:text-base">
            Cette politique concerne le site Intégrale Academy et le traitement de vos demandes d’informations, de rappel et de candidature par notre équipe. Elle explique aussi ce qui se passe lorsque vous ouvrez nos formulaires ou un service externe.
          </p>
          <a href={rightsHref} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-academy-gold px-6 py-3 text-center text-sm font-black text-academy-gold-text transition hover:-translate-y-0.5">Contacter l’équipe au sujet de mes données</a>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[.3fr_.7fr] lg:gap-8">
          <nav aria-label="Sommaire de la politique de confidentialité" className="rounded-[1.7rem] border border-academy-line/70 bg-academy-surface p-5 lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-wider text-academy-gold-strong">Dans cette page</p>
            <ol className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {sections.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 text-sm font-bold text-academy-muted transition hover:bg-academy-bg hover:text-academy-ink dark:hover:text-white">
                    <span aria-hidden="true" className="text-xs text-academy-gold-strong">{String(index + 1).padStart(2, '0')}</span>{label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 space-y-5">
            <PrivacySection id="responsable" title="Qui traite vos données ?">
              <p>Le responsable du traitement est <strong>INTEGRALE SECURITE FORMATIONS</strong>, SAS exerçant sous l’enseigne <strong>Intégrale Academy</strong>, immatriculée sous le numéro SIREN 840 899 884.</p>
              <address className="not-italic">
                54 chemin du Carreou – ZI du Carreou<br />83480 Puget-sur-Argens, France<br />
                <a href={`mailto:${privacyEmail}`} className={`${linkClass} break-all`}>{privacyEmail}</a>
              </address>
              <p>Vous pouvez utiliser cette adresse pour toute question concernant vos données. Les autres informations sur l’entreprise figurent dans les <Link href="/mentions-legales" className={linkClass}>mentions légales</Link>.</p>
            </PrivacySection>

            <PrivacySection id="donnees" title="Les données concernées">
              <p>Selon votre démarche, les informations recueillies directement auprès de vous comprennent :</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-academy-gold-strong">
                <li>votre identité et vos coordonnées : nom, prénom, adresse électronique et téléphone ;</li>
                <li>votre projet : formation, centre, session ou examen souhaité, demande de devis ou de rendez-vous ;</li>
                <li>votre situation de financement : informations déclarées sur le CPF, France Travail ou un financement personnel ;</li>
                <li>les réponses relatives aux prérequis de la formation et, pour une candidature, les éléments de parcours et justificatifs que vous transmettez ;</li>
                <li>vos messages et l’historique des échanges avec notre équipe ;</li>
                <li>l’origine de votre demande : paramètres de campagne et identifiants publicitaires présents dans le lien utilisé ;</li>
                <li>les informations techniques nécessaires au fonctionnement et à la sécurité des services, notamment l’adresse IP et les journaux de connexion.</li>
              </ul>
              <div className="rounded-2xl border border-academy-gold/30 bg-academy-gold-soft/20 p-4">
                <p className="font-bold text-academy-ink dark:text-white">Enregistrement pendant la saisie</p>
                <p className="mt-2">Le formulaire dédié de demande d’informations enregistre progressivement les réponses saisies, avant même sa validation finale. Une demande incomplète peut donc être conservée dans l’outil de suivi des demandes.</p>
              </div>
              <p>Les champs signalés comme obligatoires servent à traiter la démarche concernée. Sans les informations nécessaires, nous ne pourrons pas vous recontacter ou instruire votre demande. Les champs facultatifs permettent de la préciser.</p>
              <p>Pour les formations réglementées, le formulaire comporte des questions sur les conditions d’accès, notamment le CNAPS, le titre de séjour, le secourisme et les antécédents déclarés. Les données relatives aux infractions et condamnations sont soumises à un cadre légal spécifique. N’ajoutez pas de détails judiciaires ou médicaux dans les champs libres et n’envoyez pas de justificatif sensible qui ne vous a pas été demandé.</p>
            </PrivacySection>

            <PrivacySection id="utilisations" title="Pourquoi utiliser ces informations ?">
              <dl className="space-y-5">
                <div><dt className="font-bold text-academy-ink dark:text-white">Répondre à votre projet de formation</dt><dd>Étudier une demande, préparer un devis, organiser un rappel ou instruire une candidature repose sur les démarches précontractuelles effectuées à votre demande. Pour une question générale, notre intérêt légitime est de vous apporter une réponse et d’en assurer le suivi.</dd></div>
                <div><dt className="font-bold text-academy-ink dark:text-white">Gérer une inscription et la formation</dt><dd>Lorsque vous vous inscrivez, les données nécessaires à l’organisation, au suivi administratif et pédagogique et au financement sont traitées pour exécuter le contrat et respecter les obligations légales applicables à l’organisme de formation. Les vérifications réglementaires particulières doivent reposer sur les textes qui les autorisent.</dd></div>
                <div><dt className="font-bold text-academy-ink dark:text-white">Communiquer sur nos formations</dt><dd>Une réponse à votre demande se distingue d’un message publicitaire. La prospection repose sur votre consentement lorsqu’il est requis, ou sur l’intérêt légitime dans les cas autorisés. Vous pouvez demander à ne plus recevoir de sollicitations à tout moment en nous écrivant.</dd></div>
                <div><dt className="font-bold text-academy-ink dark:text-white">Faire fonctionner et sécuriser les services</dt><dd>Notre intérêt légitime est de maintenir le site disponible, protéger les accès et prévenir les abus. Les traceurs publicitaires ou de mesure d’audience soumis au consentement relèvent d’un choix distinct ; une demande d’informations ne vaut pas consentement publicitaire.</dd></div>
              </dl>
            </PrivacySection>

            <PrivacySection id="destinataires" title="Qui peut accéder à vos données ?">
              <p>Les données utiles à votre dossier sont destinées aux personnes habilitées d’Intégrale Academy chargées de l’accueil, des admissions, du suivi commercial, administratif ou pédagogique, selon leur mission.</p>
              <p>Les prestataires nécessaires au service interviennent pour l’hébergement, les formulaires, la messagerie ou la prise de rendez-vous. Lorsqu’un dossier de formation le nécessite, les informations pertinentes sont également destinées au financeur, à l’employeur concerné, aux organismes de certification ou aux autorités habilitées. Une simple visite du site n’entraîne pas l’envoi d’un dossier à ces organismes.</p>
            </PrivacySection>

            <PrivacySection id="conservation" title="Combien de temps les données sont-elles conservées ?">
              <p>La durée dépend de la démarche et du document concerné. Les critères de conservation sont les suivants :</p>
              <dl className="space-y-4">
                <div><dt className="font-bold text-academy-ink dark:text-white">Demandes, devis et formulaires incomplets</dt><dd>Le traitement de votre projet et les échanges nécessaires à son suivi déterminent la durée utile. Sa clôture, son abandon et la date du dernier contact permettent d’identifier les dossiers devenus inactifs. Vous pouvez demander la suppression d’une demande, y compris incomplète.</dd></div>
                <div><dt className="font-bold text-academy-ink dark:text-white">Candidatures et dossiers de formation</dt><dd>Les candidatures sont utiles pendant leur examen et le suivi de l’admission. En cas d’inscription, les éléments nécessaires rejoignent le dossier de formation. Les pièces administratives, contractuelles et comptables peuvent ensuite être archivées pendant les délais légaux de conservation, de contrôle ou de prescription propres à chaque pièce.</dd></div>
                <div><dt className="font-bold text-academy-ink dark:text-white">Sécurité et exercice des droits</dt><dd>Les journaux techniques servent à détecter et traiter les incidents ; un incident ou un litige peut justifier la conservation des éléments de preuve nécessaires. Les demandes d’exercice des droits sont conservées pour leur traitement et sa justification. Les informations minimales nécessaires au respect d’une opposition peuvent être gardées afin de ne plus vous solliciter.</dd></div>
              </dl>
              <p>Pour connaître la durée applicable à une pièce de votre dossier, son éventuel motif d’archivage ou demander son effacement, contactez <a href={rightsHref} className={`${linkClass} break-all`}>{privacyEmail}</a>. Les durées des stockages du navigateur sont précisées ci-dessous.</p>
            </PrivacySection>

            <PrivacySection id="cookies" title="Cookies et préférences du navigateur">
              <p>Le site mémorise certains choix de fonctionnement dans votre navigateur :</p>
              <dl className="space-y-3">
                <div className="rounded-2xl bg-academy-bg p-4"><dt className="font-bold text-academy-ink dark:text-white">Affichage clair ou sombre</dt><dd>Votre préférence est conservée jusqu’à sa modification ou à l’effacement des données du site dans votre navigateur.<span className="mt-1 block break-all text-xs">Stockage local : integrale-academy-theme</span></dd></div>
                <div className="rounded-2xl bg-academy-bg p-4"><dt className="font-bold text-academy-ink dark:text-white">Fermeture de la fenêtre de contact</dt><dd>Ce choix évite de réafficher la fenêtre pendant la session de l’onglet.<span className="mt-1 block break-all text-xs">Stockage de session : integrale-academy-project-popup-dismissed</span></dd></div>
                <div className="rounded-2xl bg-academy-bg p-4"><dt className="font-bold text-academy-ink dark:text-white">Connexion à l’administration</dt><dd>Un cookie de session réservé aux administrateurs authentifiés expire après 24 heures.<span className="mt-1 block break-all text-xs">Cookie : ia_admin_session</span></dd></div>
              </dl>
              <p>Vous pouvez effacer ces informations dans les réglages de votre navigateur ; cela réinitialise les préférences ou déconnecte l’administration.</p>
              <p>Le formulaire externe de demande d’informations utilise aussi Google Tag Manager et mémorise des informations d’origine publicitaire. Les services externes peuvent appliquer leurs propres cookies et règles de confidentialité. Les préférences de fonctionnement décrites ci-dessus ne constituent pas un consentement à ces traceurs. Consultez les informations et réglages du service utilisé ainsi que les <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi" className={linkClass}>explications de la CNIL sur les cookies</a>.</p>
            </PrivacySection>

            <PrivacySection id="services-externes" title="Services externes et hébergement">
              <p>Le service web principal est hébergé par <strong>Render Services, Inc.</strong>, avec une région d’hébergement configurée à Francfort, en Allemagne. Cela ne signifie pas que tous les prestataires, leurs équipes ou leurs sous-traitants interviennent exclusivement dans l’Union européenne.</p>
              <p>Le parcours peut vous conduire vers nos espaces dédiés de demande d’informations et de candidature BTS, vers Calendly pour un rendez-vous, Canva pour une brochure, ou ChatGPT, proposé par OpenAI, pour un échange avec l’assistant externe. Lorsque vous ouvrez ces services, les informations que vous y saisissez et certaines données de connexion sont traitées dans leur environnement.</p>
              <p>Les prestataires internationaux peuvent traiter des données hors de l’Espace économique européen. Leurs documents précisent les pays et les mécanismes de protection applicables, notamment les clauses contractuelles types lorsqu’elles sont utilisées. Vous pouvez nous demander des précisions sur un prestataire intervenant dans votre dossier et sur les garanties associées.</p>
              <ul className="list-disc space-y-1 pl-5 marker:text-academy-gold-strong">
                <li><a href="https://render.com/dpa" className={linkClass}>Accord de protection des données de Render</a></li>
                <li><a href="https://calendly.com/legal/privacy-notice" className={linkClass}>Confidentialité de Calendly</a></li>
                <li><a href="https://www.canva.com/policies/privacy-policy/" className={linkClass}>Confidentialité de Canva</a></li>
                <li><a href="https://openai.com/policies/privacy-policy/" className={linkClass}>Confidentialité d’OpenAI</a></li>
              </ul>
            </PrivacySection>

            <PrivacySection id="outils-orientation" title="Les outils d’orientation">
              <p>Les réponses aux questions de l’outil d’orientation et du test indicatif d’éligibilité VAE affichés sur le site sont traitées dans votre navigateur pendant l’ouverture de la page. Leur résultat vous aide à vous orienter ; il ne constitue pas une décision d’admission.</p>
              <p>Si vous poursuivez par un formulaire, un rendez-vous ou l’assistant ChatGPT externe, les informations que vous communiquez à cette étape suivent les règles du service concerné. Évitez de transmettre des informations sensibles dans une conversation d’orientation.</p>
            </PrivacySection>

            <PrivacySection id="vos-droits" title="Comment exercer vos droits ?">
              <p>Selon la situation et la base légale du traitement, vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation de leur utilisation, vous opposer à certains traitements ou demander leur portabilité. Lorsqu’un traitement repose sur votre consentement, vous pouvez le retirer sans remettre en cause les opérations antérieures.</p>
              <p>Écrivez à <a href={rightsHref} className={`${linkClass} break-all`}>{privacyEmail}</a>, ou par courrier à INTEGRALE SECURITE FORMATIONS, à l’adresse indiquée en début de page. Précisez votre demande et les coordonnées utilisées dans vos échanges avec nous pour nous permettre de retrouver votre dossier.</p>
              <p>Une pièce d’identité n’est pas demandée systématiquement. Des informations complémentaires peuvent être nécessaires en cas de doute raisonnable sur votre identité.</p>
              <p>Une réponse doit vous être apportée sous un mois. Ce délai peut être prolongé de deux mois lorsque la complexité ou le nombre de demandes le justifie ; vous en êtes alors informé dans le premier mois. Certains documents peuvent devoir être conservés pour respecter une obligation légale ou défendre un droit : le motif d’un éventuel refus vous est expliqué.</p>
              <p>Vous pouvez également <a href="https://www.cnil.fr/fr/adresser-une-plainte" className={linkClass}>adresser une réclamation à la CNIL</a>. Pour en savoir plus, consultez les <a href="https://www.cnil.fr/fr/passer-laction/les-droits-des-personnes-sur-leurs-donnees" className={linkClass}>droits des personnes sur leurs données</a>.</p>
              <p>Cette politique est mise à jour lorsque les services ou les traitements évoluent. La date figurant en haut de page indique sa dernière révision.</p>
            </PrivacySection>
          </div>
        </div>
      </div>
    </>
  );
}
