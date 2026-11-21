import Image from 'next/image';
import Link from 'next/link';
import { FAQ } from '@/components/FAQ';
import { TeamPortrait } from '@/components/TeamPortrait';
import {
  TrainingReferenceAction,
  TrainingReferenceHero,
  TrainingReferenceMobileBar,
  TrainingReferencePage,
  TrainingReferenceSection as Section,
} from '@/components/TrainingReferenceLayout';
import { TrainingSectionNavigation } from '@/components/TrainingSectionNavigation';
import {
  adviserPhone, alternanceFaq, applicationSteps, applicationUrl, brochureUrl, calendar,
  commitments, documents, entryConditions, partnerSupport, qualifications, workplaces,
} from '@/data/parcours-alternance';
import { originalArtwork } from '@/data/originalArtwork';
import { createPageMetadata } from '@/lib/seo';
import styles from './parcours.module.css';

export const metadata = createPageMetadata('/parcoursalternance');

const navigation = [
  { label: 'Les formations', href: '#parcours' },
  { label: 'Ton année', href: '#calendrier' },
  { label: 'Financement et salaire', href: '#financement' },
  { label: 'Admission', href: '#conditions' },
  { label: 'Ton entreprise', href: '#entreprise' },
  { label: 'Candidature', href: '#candidature' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;

function DetailList({ items }: { items: readonly { title: string; description: string }[] }) {
  return <dl className={styles.details}>{items.map(item => (
    <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>
  ))}</dl>;
}

export default function ParcoursAlternancePage() {
  return <TrainingReferencePage theme="blue">
    <TrainingReferenceHero
      id="alternance" badge="Rentrée janvier 2027 · Côte d’Azur"
      heading="Parcours sécurité " accent="en alternance"
      tagline="L’APS, l’A3P et le SSIAP 1 en un an."
      description={<p>Tu as moins de 26 ans ? Apprends à protéger les personnes et les biens à Puget-sur-Argens, exerce-toi en entreprise et touche un salaire pendant ton apprentissage.</p>}
      illustration={originalArtwork['aps-atelier-radio']} caption="Apprendre les transmissions radio" title="Atelier de prévention et de sécurité"
      primaryAction={{ href: applicationUrl, label: 'Je candidate pour 2027' }}
      secondaryAction={{ href: brochureUrl, label: 'Télécharger la brochure (PDF)' }}
    >
      <dl className={styles.facts}>
        <div><dt>Durée du parcours</dt><dd>Janvier à décembre 2027</dd></div>
        <div><dt>Temps prévu en entreprise</dt><dd>Plus de 1 100 h</dd></div>
        <div><dt>Frais de formation pour toi</dt><dd>0 € en apprentissage</dd></div>
      </dl>
    </TrainingReferenceHero>
    <TrainingSectionNavigation mark="IA" title="Parcours sécurité" eyebrowLabel="Ton alternance" items={navigation}
      registrationHref={applicationUrl} registrationLabel="Je candidate" />

    <Section id="parcours" title={<>Trois qualifications <em>en un an</em></>}
      intro="Tu prépares deux titres à finalité professionnelle et un diplôme de sécurité incendie.">
      <div className={styles.courses}>
        {qualifications.map(course => <article key={course.id} id={course.id} className={styles.course}>
          <Image src={course.image} alt={course.alt} width={720} height={480} sizes="(max-width: 760px) 92vw, 32vw" />
          <div className={styles.courseBody}>
            <div className={styles.courseHeading}><h3>{course.code}</h3><span>{course.duration}</span></div>
            <p>{course.title}</p>
            <ul>{course.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
            <Link href={course.href} className={styles.textLink}>Découvrir la formation {course.code} <span aria-hidden="true">→</span></Link>
          </div>
        </article>)}
      </div>
      <p className={styles.note}>Chaque qualification est délivrée après réussite aux évaluations. Pour exercer en sécurité privée, tu dois obtenir la carte professionnelle CNAPS correspondant aux missions confiées.</p>
    </Section>

    <Section id="calendrier" tone="paper" title={<>Ton année <em>entre école et entreprise</em></>}
      intro="De janvier à décembre 2027, tu alternes les cours, les examens et les missions sur le terrain.">
      <ol className={styles.calendar}>{calendar.map(phase => (
        <li key={phase.period}><span>{phase.period}</span><div><h3>{phase.title}</h3><p>{phase.description}</p></div></li>
      ))}</ol>
      <p className={styles.note}>Ce calendrier est prévisionnel. Les dates précises des cours et des examens seront confirmées à l’inscription. Les périodes de formation A3P et SSIAP 1 interrompent les périodes en entreprise.</p>
    </Section>

    <Section id="financement" title={<>Ta formation <em>et ton salaire</em></>}
      intro="Tu es salarié dès la prise d’effet de ton contrat d’apprentissage. Le temps passé en formation fait partie de ton temps de travail.">
      <div className={styles.funding}>
        <div className={styles.price}>
          <h3>Tes frais pédagogiques</h3><strong>0 €</strong>
          <p>Le tarif habituel du parcours est de <b>7 000 €</b>. Dans le cadre du contrat d’apprentissage, l’OPCO de ton employeur met en œuvre la prise en charge selon les règles applicables.</p>
        </div>
        <div className={styles.pay}>
          <table><caption>Rémunération minimale en première année</caption>
            <thead><tr><th scope="col">Ton âge</th><th scope="col">Salaire mensuel brut</th></tr></thead>
            <tbody>
              <tr><th scope="row">16–17 ans</th><td>27 % du SMIC</td></tr>
              <tr><th scope="row">18–20 ans</th><td>43 % du SMIC</td></tr>
              <tr><th scope="row">21–25 ans</th><td>53 % du SMIC ou 53 % du minimum conventionnel si ce montant est plus favorable</td></tr>
            </tbody>
          </table>
          <p>Ce sont des repères généraux. Ton âge, ton parcours, la convention collective et les règles en vigueur en janvier 2027 déterminent le montant inscrit sur ton contrat.</p>
          <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F2918" className={styles.textLink}>Consulter Service Public <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </Section>

    <Section id="conditions" tone="paper" title={<>Les conditions <em>d’admission</em></>}
      intro="Aurélie vérifie avec toi les conditions d’entrée et les justificatifs à préparer avant chaque formation.">
      <DetailList items={entryConditions} />
      <details className={styles.disclosure}><summary>Les pièces et autorisations nécessaires</summary><DetailList items={documents} /></details>
      <details className={styles.disclosure}><summary>Tes engagements à l’école et en entreprise</summary><DetailList items={commitments} /></details>
      <p className={styles.note}>La session s’adresse aux moins de 26 ans. L’apprentissage est généralement accessible jusqu’à 29 ans révolus, avec des dérogations. L’entrée dans ce parcours dépend du dossier, des prérequis, des autorisations et de la mise en place du contrat.</p>
      <a className={styles.textLink} href="#contact">Étudier un aménagement lié au handicap avec Aurélie <span aria-hidden="true">→</span></a>
    </Section>

    <Section id="entreprise" title={<>Trouver <em>ton entreprise</em></>}
      intro="Tu peux candidater même si tu cherches encore un employeur. Selon ton profil et les recrutements en cours, Intégrale Academy peut te mettre en relation avec ses entreprises partenaires.">
      <DetailList items={partnerSupport} />
      <details className={styles.disclosure}><summary>Les environnements de travail et les missions possibles</summary>
        <DetailList items={workplaces} />
        <p>Les affectations dépendent de l’entreprise et de ses besoins. Les missions de protection rapprochée et de sécurité incendie nécessitent les qualifications et autorisations correspondantes.</p>
      </details>
      <p className={styles.note}>L’embauche dépend de ton entretien, de l’accord de l’entreprise et de la validation du contrat. Poursuis aussi tes propres recherches.</p>
      <Link href="/entreprises#alternance" className={styles.textLink}>Tu représentes une entreprise ? Découvre le parcours employeur <span aria-hidden="true">→</span></Link>
    </Section>

    <Section id="candidature" tone="paper" title={<>Comment <em>candidater ?</em></>}
      intro="Prépare ta pièce d’identité, ta photo d’identité et ta carte Vitale. Tu peux aussi joindre un CV et une lettre de motivation.">
      <ol className={styles.steps}>{applicationSteps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
      <div className={styles.actions}><TrainingReferenceAction href={applicationUrl}>Je commence ma candidature</TrainingReferenceAction>
        <a href={brochureUrl} className={styles.textLink}>Télécharger la brochure (PDF) <span aria-hidden="true">↓</span></a></div>
      <details id="confidentialite" className={styles.disclosure}><summary>Confidentialité des candidatures</summary>
        <p>Intégrale Sécurité Formations utilise ton dossier pour étudier ta candidature et te recontacter. Seule l’équipe chargée des admissions y accède. Les confirmations passent par notre prestataire de messagerie. Nous conservons ces informations pendant 12 mois au maximum pour ce suivi. En cas d’inscription, tu reçois une information distincte sur le dossier de formation.</p>
        <p>Pour retirer ton accord ou exercer tes droits d’accès, de rectification ou d’effacement, écris à <a href="mailto:ecole@integraleacademy.com">ecole@integraleacademy.com</a>. Tu peux aussi adresser une réclamation à la CNIL.</p>
      </details>
    </Section>

    <Section id="faq" title={<>Tes questions <em>sur l’alternance</em></>}>
      <FAQ items={alternanceFaq} theme="blue" />
    </Section>

    <Section id="contact" tone="paper" title={<>Parle de ton projet <em>avec Aurélie</em></>}
      intro="Une question sur ton dossier, ton entreprise ou ton entrée en formation ? Aurélie est ton interlocutrice pour le parcours sécurité en alternance.">
      <div className={styles.contact}>
        <div className={styles.person}><TeamPortrait person="aurelie" size={104} alt="Aurélie Bayard-Chaussez" /><div><h3>Aurélie Bayard-Chaussez</h3><p>Chargée des relations clients</p></div></div>
        <address>
          <a href={adviserPhone}><span>Ligne directe</span>04 87 83 06 15</a>
          <a href="tel:+33769390457"><span>Mobile</span>07 69 39 04 57</a>
          <a href="mailto:aurelie@integraleacademy.com"><span>E-mail</span>aurelie@integraleacademy.com</a>
        </address>
      </div>
      <p className={styles.note}>Intégrale Academy Côte d’Azur · 54 chemin du Carreou, 83480 Puget-sur-Argens. <Link className={styles.textLink} href="/ecole#photos">Visiter l’école <span aria-hidden="true">→</span></Link></p>
      <details className={styles.disclosure}><summary>Contacter aussi Cassandre Ménard</summary>
        <p>Responsable commerciale · <a href="tel:+33487830616">04 87 83 06 16</a> · <a href="tel:+33743582264">07 43 58 22 64</a> · <a href="mailto:cassandre@integraleacademy.com">cassandre@integraleacademy.com</a></p>
      </details>
    </Section>
    <TrainingReferenceMobileBar phoneHref={adviserPhone} phoneLabel="Appeler Aurélie" href={applicationUrl} label="Je candidate" />
  </TrainingReferencePage>;
}
