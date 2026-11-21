import { adviserPhone, applicationUrl, brochureUrl } from '@/data/parcours-alternance';
import { PARIS_ADDRESS } from '@/data/locations';
import { ParcoursLogo } from './ParcoursLogo';

export function ParcoursFooter() {
  return (
    <footer className="academy-footer">
      <div className="wrap">
        <div className="af-main">
          <div className="af-identity">
            <a className="af-brand" href="/" aria-label="Accueil du site Intégrale Academy">
              <ParcoursLogo />
            </a>
            <p className="af-expertise">
              Centre de formation agréé Métiers de la sécurité privée, Formations professionnelles et BTS en alternance.
            </p>
            <div className="af-socials" aria-label="Réseaux sociaux officiels">
              <a
                href="https://www.facebook.com/integraleacademy"
                aria-label="Facebook Intégrale Academy"
                target="_blank"
                rel="noopener noreferrer"
              >
                f
              </a>
              <a
                href="https://www.linkedin.com/in/vaillantclement/"
                aria-label="LinkedIn — Clément VAILLANT"
                target="_blank"
                rel="noopener noreferrer"
              >
                in
              </a>
              <a
                href="https://www.instagram.com/integraleacademy/"
                aria-label="Instagram Intégrale Academy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></rect>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                  <circle cx="16.5" cy="7.5" r="1" fill="currentColor"></circle>
                </svg>
              </a>
              <a
                href="https://wa.me/33744304527"
                aria-label="WhatsApp Intégrale Academy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M7 18.4 4.8 19l.6-2.2A7.7 7.7 0 1 1 7 18.4Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M9.1 8.4c-.2.3-.6.8-.5 1.6.1 1.5 1.8 3.5 3.7 4.4.9.4 1.5.3 1.9.1l.9-1.1-1.9-.9-.7.8c-1.2-.4-2.2-1.4-2.7-2.6l.8-.8-.9-1.9-.6.4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <nav className="af-navigation" aria-label="Navigation du pied de page">
            <div className="af-navGroup">
              <h2 className="af-heading">Tes formations</h2>
              <ul>
                <li>
                  <a href="#formation-aps">Agent de sécurité · APS</a>
                </li>
                <li>
                  <a href="#formation-a3p">Protection des personnes · A3P</a>
                </li>
                <li>
                  <a href="#formation-ssiap">Sécurité incendie · SSIAP 1</a>
                </li>
                <li>
                  <a href="#parcours">Le parcours complet</a>
                </li>
              </ul>
            </div>
            <div className="af-navGroup">
              <h2 className="af-heading">Ton alternance</h2>
              <ul>
                <li>
                  <a href="#financement">Formation gratuite et salaire</a>
                </li>
                <li>
                  <a href="#calendrier">Ton année 2027</a>
                </li>
                <li>
                  <a href="#entreprise">Les entreprises partenaires</a>
                </li>
                <li>
                  <a href="#conditions">Les conditions d’accès</a>
                </li>
              </ul>
            </div>
            <div className="af-navGroup">
              <h2 className="af-heading">Ton projet</h2>
              <ul>
                <li>
                  <a href={applicationUrl}>Je candidate</a>
                </li>
                <li>
                  <a href={brochureUrl}>La brochure</a>
                </li>
                <li>
                  <a href="#faq">Tes questions</a>
                </li>
                <li>
                  <a href="#contact">Contacter Aurélie</a>
                </li>
              </ul>
            </div>
          </nav>
          <aside className="af-contact" aria-labelledby="footer-contact-title">
            <h2 className="af-heading" id="footer-contact-title">
              Parlons de ton projet
            </h2>
            <a className="af-phone" href={adviserPhone}>
              04 87 83 06 15
            </a>
            <p className="af-hours">
              Aurélie, ton contact pour le parcours sécurité en alternance.
              <br />
              Standard : <a href="tel:+33422470768">04 22 47 07 68</a>, du lundi au vendredi de 9 h à 17 h.
              <br />
              <a href="mailto:ecole@integraleacademy.com">ecole@integraleacademy.com</a>
            </p>
            <a className="af-contactLink" href="#contact">
              Contacter Aurélie <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
        <section className="af-credentials" aria-label="Certification, autorisation et financements">
          <div className="af-credential af-qualityCredential">
            <div className="af-logoArea">
              <img
                className="af-qualiopiLogo"
                src="/images/certifications/qualiopi.png"
                alt="Qualiopi — processus certifié, République française"
                width="633"
                height="338"
                loading="lazy"
              />
            </div>
            <div>
              <p className="af-authorization">Certificat Qualiopi n°03169 du 21/10/2024</p>
              <p className="af-certificationText">
                La certification qualité a été délivrée au titre des catégories d’actions suivantes : actions de
                formation, actions de formation en apprentissage, actions permettant de faire valider les acquis de
                l’expérience (VAE).
              </p>
            </div>
          </div>
          <div className="af-credential">
            <div className="af-logoArea">
              <img
                className="af-cnapsLogo"
                src="/images/certifications/cnaps.jpg"
                alt="CNAPS — Conseil national des activités privées de sécurité"
                width="338"
                height="215"
                loading="lazy"
              />
            </div>
            <p className="af-authorization">FOR-083-2027-02-08-20200755135</p>
          </div>
          <div className="af-credential">
            <div className="af-fundingLogos">
              <a href="#financement">
                <img
                  className="af-franceTravailLogo"
                  src="/images/financements/france-travail.svg"
                  alt="France Travail"
                  width="386"
                  height="358"
                  loading="lazy"
                />
              </a>
              <a href="#entreprise">
                <img
                  className="af-aktoLogo"
                  src="/images/financements/akto.svg"
                  alt="AKTO"
                  width="179"
                  height="46"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </section>
        <section className="af-organization" aria-label="Identité et adresses de l’organisme">
          <div className="af-company">
            <p>
              <strong>Intégrale Sécurité Formations (SASU)</strong> ·{' '}
              <span className="af-siren">SIREN 840 899 884</span>
            </p>
            <a
              className="af-verifyCompany"
              href="https://annuaire-entreprises.data.gouv.fr/etablissement/84089988400026"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vérifier l’entreprise ↗
            </a>
          </div>
          <ul className="af-locations">
            <li>
              <strong>Intégrale Academy Côte d’Azur :</strong> 54 chemin du Carreou, 83480 PUGET-SUR-ARGENS
            </li>
            <li>
              <strong>Intégrale Academy Paris :</strong> {PARIS_ADDRESS}
            </li>
          </ul>
        </section>
        <details className="af-privacy" id="confidentialite">
          <summary>
            Confidentialité des candidatures <span aria-hidden="true">+</span>
          </summary>
          <div>
            <p>
              Intégrale Sécurité Formations (SASU), 54 chemin du Carreou, 83480 Puget-sur-Argens, utilise les
              informations de ce formulaire pour étudier ta candidature et te recontacter. Les champs demandés sont
              nécessaires à ce traitement.
            </p>
            <p>
              Seule l’équipe chargée des candidatures y accède. Les confirmations sont transmises par notre prestataire
              de messagerie. Les informations sont conservées au maximum <strong>12 mois après l’envoi</strong> pour ce
              suivi. En cas d’inscription, le dossier de formation fait l’objet d’une information distincte.
            </p>
            <p>
              Tu peux demander l’accès, la rectification ou l’effacement de tes données et retirer ton accord en
              écrivant à <a href="mailto:ecole@integraleacademy.com">ecole@integraleacademy.com</a>. Tu peux aussi
              adresser une réclamation à la CNIL. Aucun abonnement publicitaire n’est créé par ce formulaire.
            </p>
          </div>
        </details>
        <div className="af-bottom">
          <p>Site créé par SAS Intégrale Group — Clément VAILLANT.</p>
          <nav aria-label="Informations légales">
            <a href="/mentions-legales">Mentions légales</a>
            <a href="#confidentialite">Confidentialité</a>
            <a href="https://www.integraleconnect.com/admin/parcours-alternance">Administration</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
