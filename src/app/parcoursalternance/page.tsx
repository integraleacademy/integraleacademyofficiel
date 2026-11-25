import { SessionCalendarLink } from '@/components/SessionCalendarLink';
import type { Metadata } from 'next';
import { Fragment } from 'react';
import {
  adviserPhone,
  alternanceFaq,
  applicationSteps,
  applicationUrl,
  brochureUrl,
  calendar,
  commitments,
  documents,
  entryConditions,
  partnerSupport,
  qualifications,
  workplaces,
} from '@/data/parcours-alternance';
import { createPageMetadata } from '@/lib/seo';
import './presentation.css';

const pageMetadata = createPageMetadata('/parcoursalternance');
const previewImage = {
  url: '/images/formation-scenes-manuel/aps-atelier-radio.webp',
  alt: 'Des apprenants en sécurité s’exercent à la communication radio',
};

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: { ...pageMetadata.openGraph, images: [previewImage] },
  twitter: { ...pageMetadata.twitter, images: [previewImage] },
};

const stepNumber = (index: number) => String(index + 1).padStart(2, '0');

export default function ParcoursSecuriteAlternance() {
  return (
    <div className="parcours-alternance" id="main" tabIndex={-1}>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot"></span> RENTRÉE JANVIER 2027 · CÔTE D’AZUR
          </p>
          <h1>
            Apprends à protéger.
            <br />
            <em>Construis ton avenir.</em>
          </h1>
          <p className="intro">
            Tu as moins de 26 ans ? Prépare{' '}
            <strong>3 qualifications reconnues aux métiers de la sécurité en 1 an</strong>, gagne de l’expérience et
            touche un salaire pendant ton alternance.
          </p>
          <div className="hero-actions">
            <a className="button" href={applicationUrl}>
              Je commence ma candidature <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href={brochureUrl}>
              Télécharger la brochure <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="micro">Quelques minutes pour te présenter. Notre équipe prend ensuite le relais.</p>
          <div className="hero-proof">
            <span>
              <b>0 €</b> de frais de formation pour toi
            </span>
            <span>
              <b>1 an</b> pour passer à l’action
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/formation-scenes-manuel/aps-atelier-radio.webp"
            alt="Illustration d’apprenants en sécurité s’exerçant à la communication radio"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="visual-top">
            <span>APS</span>
            <b className="qualification-plus" aria-label="plus">
              +
            </b>
            <span>A3P</span>
            <b className="qualification-plus" aria-label="plus">
              +
            </b>
            <span>SSIAP 1</span>
          </div>
          <div className="visual-caption">
            <span>TON AVENIR COMMENCE SUR LE TERRAIN</span>
            <p>
              Des compétences.
              <br />
              De l’expérience.
              <br />
              <em>Et un vrai projet.</em>
            </p>
          </div>
          <div className="floating-label">
            <span aria-hidden="true">↗</span>
            <div>
              <strong>Puget-sur-Argens</strong>
              <small>Ton école sur la Côte d’Azur</small>
            </div>
          </div>
        </div>
      </section>
      <div className="promise-band">
        <div className="wrap">
          <span>
            <strong>Formation gratuite</strong> pour l’apprenti
          </span>
          <span>
            <strong>Alternance rémunérée</strong> dans le cadre du contrat
          </span>
          <span>
            <strong>3 formations</strong> complémentaires
          </span>
        </div>
      </div>
      <section className="section wrap" id="parcours">
        <div className="section-heading">
          <div>
            <p className="eyebrow">UN PARCOURS, PLUSIEURS POSSIBILITÉS</p>
            <h2>
              Une année pour apprendre.
              <br />
              <em>Trois façons de protéger.</em>
            </h2>
          </div>
          <p>
            Une opportunité unique de préparer deux titres professionnels et un diplôme de sécurité incendie dans un
            même parcours. Tu construis un profil polyvalent, recherché pour des missions variées.
          </p>
        </div>
        <div className="courses">
          {' '}
          {qualifications.map((course, index) => (
            <Fragment key={course.id}>
              {index > 0 && (
                <span className="course-joiner" aria-label="plus">
                  +
                </span>
              )}
              <article className={'course course-' + course.id.replace('formation-', '')} id={course.id}>
                <div className="course-image">
                  <img src={course.image} alt={course.alt} loading="lazy" width="800" height="550" />
                  <span>
                    {stepNumber(index)} / {course.code}
                  </span>
                </div>
                <div className="course-content">
                  <span className="course-hours">{course.duration.toUpperCase()} DE FORMATION</span>
                  <h3>
                    <a href={course.href} aria-label={'Découvrir la formation ' + course.code}>
                      {course.headline[0]}
                      <br />
                      {course.headline[1]}
                    </a>
                  </h3>
                  <p>{course.title}</p>
                  <ul>
                    {course.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Fragment>
          ))}
        </div>
        <p className="fineprint">
          Les titres et le diplôme sont délivrés sous réserve de réussite aux évaluations. L’exercice des activités de
          sécurité privée nécessite la carte professionnelle CNAPS correspondant aux missions confiées.
        </p>
      </section>
      <section className="funding-section" id="financement">
        <div className="wrap funding-grid">
          <div>
            <p className="eyebrow">TU TE FORMES. TU ES AUSSI SALARIÉ.</p>
            <h2>
              Ton énergie pour apprendre.
              <br />
              <em>Pas de frais de formation.</em>
            </h2>
            <p>
              Dans le cadre de ton contrat d’apprentissage,{' '}
              <strong>la formation est entièrement gratuite pour toi</strong>. Tu alternes entre l’école à
              Puget-sur-Argens et ton entreprise pour mettre en pratique ce que tu apprends.
            </p>
            <p>
              Le tarif habituel du parcours est de <strong>7 000 €</strong>, pris en charge par l’État dans le cadre
              du contrat d’apprentissage. La prise en charge est mise en œuvre par l’OPCO de ton employeur selon les
              règles applicables.
            </p>
            <a className="button button-light" href={applicationUrl}>
              Ça m’intéresse, je candidate <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="zero-card">
            <span>TES FRAIS PÉDAGOGIQUES</span>
            <p className="usual-price">
              Tarif habituel : <s>7 000 €</s>
            </p>
            <strong>
              0<em>€</em>
            </strong>
            <p>pour l’apprenti</p>
            <hr />
            <div>
              <b>+ un salaire</b>
              <small>dans le cadre de ton contrat d’apprentissage</small>
            </div>
          </div>
        </div>
        <div className="wrap salary-section">
          <div className="salary-heading">
            <p className="eyebrow">TON SALAIRE, CONCRÈTEMENT</p>
            <h3>
              Tu apprends.
              <br />
              <em>Tu touches un salaire chaque mois.</em>
            </h3>
            <p>Le temps passé en formation fait partie de ton temps de travail pendant le contrat.</p>
          </div>
          <div>
            <table className="salary-table">
              <caption>Repères généraux en 1re année d’apprentissage</caption>
              <thead>
                <tr>
                  <th scope="col">Ton âge</th>
                  <th scope="col">Rémunération minimale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">16–17 ans</th>
                  <td>
                    <strong>27 %</strong> du SMIC
                  </td>
                </tr>
                <tr>
                  <th scope="row">18–20 ans</th>
                  <td>
                    <strong>43 %</strong> du SMIC
                  </td>
                </tr>
                <tr>
                  <th scope="row">21–25 ans</th>
                  <td>
                    <strong>53 %</strong> du SMIC ou <strong>53 %</strong> du minimum conventionnel, selon le montant
                    le plus favorable
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="salary-note">
              Ton salaire dépend de ton âge, de ton parcours et de la convention collective. Ces repères ne préjugent
              pas de ton admission. Les règles et minima applicables en janvier 2027 seront précisés sur ton contrat.{' '}
              <a
                href="https://www.service-public.gouv.fr/particuliers/vosdroits/F2918"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consulter les repères Service Public ↗
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className="section wrap calendar-section" id="calendrier">
        <div className="calendar-aside">
          <p className="eyebrow">TON ANNÉE 2027, EN CLAIR</p>
          <h2>
            Un rythme.
            <br />
            Un engagement.
            <br />
            <em>Un vrai départ.</em>
          </h2>
          <p>
            Ce parcours demande ta disponibilité <strong>du 8 janvier 2027 au 8 janvier 2028</strong>, pour les cours, les
            examens et les périodes en entreprise.
          </p>
          <SessionCalendarLink id="parcours-securite-janvier-2027" />
          <p><a href="/planning?formation=parcoursalternance&dates=toutes#sessions">Voir aussi la promotion de juin 2027</a></p>
          <div className="commitment">
            <span aria-hidden="true">↗</span>
            <p>
              <strong>Tu t’engages pour l’année complète.</strong>Ce n’est pas une formation de quelques semaines :
              l’école et l’entreprise comptent sur ton assiduité.
            </p>
          </div>
          <div className="experience">
            <strong>1 106 h</strong>
            <span>prévues en entreprise sur le parcours</span>
          </div>
        </div>
        <div>
          <ol className="timeline">
            {calendar.map((phase, index) => (
              <li key={phase.period} className={'phase phase--' + phase.theme}>
                <span className="phase-number">{stepNumber(index)}</span>
                <div>
                  <span className="phase-period">{phase.period}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="fineprint">
            Les périodes sont indiquées dates incluses. Les jours travaillés en entreprise suivent le planning de l’employeur. Les missions dépendent des qualifications et autorisations obtenues.
          </p>
        </div>
      </section>
      <section className="section wrap field-section" aria-labelledby="field-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TES FUTURS ENVIRONNEMENTS DE TRAVAIL</p>
            <h2 id="field-title">
              Tu apprends à l’école.
              <br />
              <em>Tu progresses sur le terrain.</em>
            </h2>
          </div>
          <p>
            Tu mets tes acquis en pratique dans différents environnements. Tes missions évoluent avec les
            qualifications obtenues et les autorisations dont tu disposes.
          </p>
        </div>
        <div className="field-grid">
          {workplaces.map((item, index) => (
            <article key={item.title}>
              <span>{stepNumber(index)}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="field-values">
          <p>
            Observer, comprendre les consignes,
            <br />
            <strong>agir avec méthode.</strong>
          </p>
          <div>
            <span>Rigueur</span>
            <span>Sang-froid</span>
            <span>Discrétion</span>
          </div>
        </div>
        <p className="fineprint">
          Les affectations dépendent de l’entreprise et de ses besoins. La protection rapprochée et la sécurité
          incendie ne sont pas exercées avant validation des qualifications et autorisations nécessaires.
        </p>
      </section>
      <section className="partners-section" id="entreprise">
        <div className="wrap partners-grid">
          <div className="partner-callout">
            <p className="eyebrow">DES ENTREPRISES DÉJÀ À NOS CÔTÉS</p>
            <h2>
              Pas encore
              <br />
              d’entreprise ?<br />
              <em>Parlons-en.</em>
            </h2>
            <p>
              Intégrale Academy dispose déjà d’<a href="/entreprises#alternance">entreprises partenaires</a> dans la
              sécurité. Nous pouvons te mettre en relation selon ton profil et leurs besoins de recrutement.
            </p>
            <a className="button button-light" href="#contact">
              Je prépare mon projet avec Aurélie BAYARD-CHAUSSEZ ↗
            </a>
          </div>
          <div className="partner-support">
            {partnerSupport.map((item, index) => (
              <article key={item.title}>
                <span>{stepNumber(index)}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
            <p className="fineprint">
              L’embauche dépend de l’entretien, de l’accord de l’entreprise et de la validation des conditions du
              contrat. La mise en relation ne garantit pas un recrutement.
            </p>
          </div>
        </div>
      </section>
      <section className="section eligibility-section" id="conditions">
        <div className="wrap">
          <p className="eyebrow">EST-CE QUE C’EST POUR TOI ?</p>
          <h2>
            De la motivation.
            <br />
            <em>Et quelques indispensables.</em>
          </h2>
          <div className="conditions">
            {entryConditions.map((item, index) => (
              <article key={item.title}>
                <span>{stepNumber(index)}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="prerequisites">
            <div>
              <p className="eyebrow">TON DOSSIER, ÉTAPE PAR ÉTAPE</p>
              <h3>
                On vérifie les conditions.
                <br />
                <em>On t’explique les démarches.</em>
              </h3>
              <p>Aurélie BAYARD-CHAUSSEZ fait le point avec toi avant l’entrée en formation.</p>
            </div>
            <ul>
              {documents.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="accessibility-note">
            <span aria-hidden="true">↗</span>
            <p>
              <strong>Un besoin lié au handicap ?</strong> <a href="#contact">Contacte Aurélie BAYARD-CHAUSSEZ</a> pour étudier les
              aménagements possibles et les exigences des métiers.
            </p>
          </div>
          <p className="fineprint">
            Moins de 26 ans : il s’agit du public de cette session. L’apprentissage est généralement accessible
            jusqu’à 29 ans révolus, avec des dérogations. L’admission reste soumise à l’étude du dossier, aux
            prérequis, aux autorisations nécessaires et à la mise en place du contrat.
          </p>
        </div>
      </section>
      <section className="section wrap commitments-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TA MOTIVATION SE VOIT AU QUOTIDIEN</p>
            <h2>
              Une année pour avancer.
              <br />
              <em>Six engagements pour réussir.</em>
            </h2>
          </div>
          <p>À l’école comme en entreprise, ton attitude compte autant que ce que tu apprends.</p>
        </div>
        <ol className="commitment-grid">
          {commitments.map((item, index) => (
            <li key={item.title}>
              <span>{stepNumber(index)}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="section wrap next-steps" id="candidature">
        <div>
          <p className="eyebrow">ON AVANCE ENSEMBLE</p>
          <h2>
            La suite ?<br />
            <em>On fait connaissance.</em>
          </h2>
          <details className="secondary-contact" id="confidentialite">
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
        </div>
        <ol>
          {applicationSteps.map((item, index) => (
            <li key={item.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="academy-faq" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-layout">
          <div className="faq-intro">
            <span className="faq-badge">TES QUESTIONS, NOS RÉPONSES</span>
            <h2 id="faq-title">
              Tout comprendre.
              <br />
              <em>Avant de te lancer.</em>
            </h2>
            <p>Financement, entreprise, calendrier, démarches : les réponses pour préparer ton année sereinement.</p>
            <div className="faq-help">
              <div className="faq-help-heading">
                <span className="adviser-avatar adviser-avatar-small">
                  <img
                    src="/parcours-alternance/aurelie.webp"
                    alt="Mémoji d’Aurélie BAYARD-CHAUSSEZ"
                    width="384"
                    height="384"
                    loading="lazy"
                  />
                </span>
                <div>
                  <h3>Une autre question ?</h3>
                  <p>Aurélie BAYARD-CHAUSSEZ t’accompagne avant ta candidature et pendant les démarches.</p>
                </div>
              </div>
              <div className="faq-help-actions">
                <a className="button" href={adviserPhone}>
                  Appeler Aurélie BAYARD-CHAUSSEZ
                </a>
                <a className="button button-outline" href="mailto:aurelie@integraleacademy.com">
                  Lui écrire ↗
                </a>
              </div>
            </div>
          </div>
          <div className="faq-list">
            {alternanceFaq.map((item, index) => (
              <details className="faq-item" key={item.q}>
                <summary>
                  <span className="faq-question">
                    <span aria-hidden="true" className="faq-number">
                      {stepNumber(index)}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  <span aria-hidden="true" className="faq-toggle">
                    <span>+</span>
                    <span>−</span>
                  </span>
                </summary>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap adviser-section" id="contact" aria-labelledby="contact-title">
        <div className="adviser-intro">
          <p className="eyebrow">UNE PERSONNE À TES CÔTÉS</p>
          <h2 id="contact-title">
            Ton projet mérite
            <br />
            <em>une vraie rencontre.</em>
          </h2>
          <p>
            Une question, un doute, envie de te lancer ?{' '}
            <strong>Aurélie BAYARD-CHAUSSEZ s’occupe du parcours sécurité en alternance.</strong> Elle t’aide à préparer ta
            candidature, tes démarches et ton entrée en formation.
          </p>
          <div className="hero-actions">
            <a className="button" href={applicationUrl}>
              Je candidate pour 2027 <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href={brochureUrl}>
              La brochure complète <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="adviser-address">
            <strong>On se retrouve à l’école ?</strong>
            <br />
            54 chemin du Carreou
            <br />
            83480 Puget-sur-Argens
          </p>
        </div>
        <div className="adviser-card">
          <div className="adviser-profile">
            <span className="adviser-avatar">
              <img
                src="/parcours-alternance/aurelie.webp"
                alt="Mémoji d’Aurélie BAYARD-CHAUSSEZ"
                width="384"
                height="384"
                loading="lazy"
              />
            </span>
            <div>
              <span className="adviser-label">TON CONTACT ALTERNANCE</span>
              <h3>
                Aurélie <span>BAYARD-CHAUSSEZ</span>
              </h3>
              <p>Chargée des relations clients</p>
            </div>
          </div>
          <p className="adviser-quote">
            Un premier échange pour faire le point
            <br />
            et préparer la suite ensemble.
          </p>
          <div className="adviser-links">
            <a href={adviserPhone}>
              <span>
                Ligne directe<strong>04 87 83 06 15</strong>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href="tel:+33769390457">
              <span>
                Mobile<strong>07 69 39 04 57</strong>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="adviser-email" href="mailto:aurelie@integraleacademy.com">
              <span>
                E-mail
                <strong>
                  aurelie@
                  <wbr />
                  integraleacademy.com
                </strong>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <details className="secondary-contact">
            <summary>
              Un autre contact dans l’équipe <span aria-hidden="true">+</span>
            </summary>
            <p>
              <strong>Cassandre MENARD</strong>
              <br />
              Responsable commerciale
            </p>
            <a href="mailto:cassandre@integraleacademy.com">cassandre@integraleacademy.com</a>
            <p>
              Ligne directe : <a href="tel:+33487830616">04 87 83 06 16</a>
              <br />
              Mobile : <a href="tel:+33743582264">07 43 58 22 64</a>
            </p>
          </details>
        </div>
      </section>
      <div className="mobile-apply" data-fixed-actions="course">
        <a className="button" href={applicationUrl}>
          Je candidate <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
