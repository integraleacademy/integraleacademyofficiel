import school from './ecole.module.css';
import styles from './school-commitments.module.css';

function ReferenceIcon({ kind }: { kind: 'certificate' | 'shield' | 'school' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'certificate' && <><path d="M14 3H5v17h6M8 7h7M8 11h4" /><circle cx="17" cy="14" r="4" /><path d="m14.5 17.2-.5 5 3-1.8 3 1.8-.5-5M16 3h3v6" /></>}
    {kind === 'shield' && <><path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>}
    {kind === 'school' && <><path d="m3 9 9-6 9 6M5 9v11h14V9M3 21h18M9 20v-6h6v6M8 10h1m6 0h1" /></>}
  </svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" /></svg>;
}

export function SchoolCommitments() {
  return <section id="agrements" className={`${school.section} ${styles.commitments}`} aria-labelledby="certifications-title">
    <div className={school.container}>
      <div className={school.sectionHeading}>
        <div><p className={school.eyebrow}>05 / Nos engagements</p><h2 id="certifications-title">La confiance se construit.<br /><em>Elle se vérifie aussi.</em></h2></div>
        <p>Certifications, agréments et habilitations : retrouvez les références de l’école et les documents qui les accompagnent.</p>
      </div>

      <div className={styles.featured}>
        <article className={`${styles.documentCard} ${styles.qualiopi}`} aria-labelledby="qualiopi-title">
          <div className={styles.cardKicker}><span className={styles.icon}><ReferenceIcon kind="certificate" /></span><span>Certification nationale qualité</span><span className={styles.documentType}>PDF</span></div>
          <div className={styles.documentTitle}><h3 id="qualiopi-title">QUALIOPI</h3><span>n°03169</span></div>
          <p className={styles.documentIntro}>Certification délivrée par <strong>SGS</strong> en date du <strong>21/10/2024</strong>.</p>
          <p className={styles.scopeIntro}>La certification qualité a été délivrée au titre des catégories d’actions suivantes :</p>
          <ul className={styles.scopeList}>
            <li><span aria-hidden="true">01</span><span>Actions de formation</span></li>
            <li><span aria-hidden="true">02</span><span>Actions de formation en apprentissage</span></li>
            <li><span aria-hidden="true">03</span><span>Actions permettant de faire valider les acquis de l’expérience <strong>(VAE)</strong></span></li>
          </ul>
          <a className={styles.download} href="https://www.integraleacademy.com/_files/ugd/008e7b_86df83a7b7bd48a888a733f301d43fef.pdf" target="_blank" rel="noopener noreferrer">Télécharger le certificat Qualiopi <DownloadIcon /><span className="sr-only"> (PDF, nouvel onglet)</span></a>
        </article>

        <article className={`${styles.documentCard} ${styles.ssiap}`} aria-labelledby="ssiap-title">
          <div className={styles.cardKicker}><span className={styles.icon}><ReferenceIcon kind="shield" /></span><span>Sécurité incendie</span><span className={styles.documentType}>PDF</span></div>
          <div className={styles.documentTitle}><h3 id="ssiap-title">SSIAP</h3><span>Agrément n°8323</span></div>
          <p className={styles.documentIntro}>Notre agrément pour la formation à la sécurité incendie et à l’assistance à personnes.</p>
          <div className={styles.decree}>
            <p>Attribué par arrêté préfectoral</p>
            <strong>n°26/099</strong>
            <span>en date du <b>29/05/2026</b></span>
          </div>
          <a className={styles.download} href="https://www.integraleacademy.com/_files/ugd/008e7b_cc8ed006f785482f9eee3f22e08c323c.pdf" target="_blank" rel="noopener noreferrer">Télécharger l’agrément SSIAP <DownloadIcon /><span className="sr-only"> (PDF, nouvel onglet)</span></a>
        </article>
      </div>

      <div id="references" className={styles.referencesGrid}>
        <article className={styles.referencePanel} aria-labelledby="school-registration-title">
          <div className={styles.panelHeading}>
            <span className={styles.icon}><ReferenceIcon kind="school" /></span>
            <div><p>L’organisme de formation</p><h3 id="school-registration-title">Une école identifiée.</h3></div>
          </div>
          <dl className={styles.referenceList}>
            <div><dt>Déclaration d’activité</dt><dd>Déclarée auprès du Préfet de la Région Provence Alpes Côte d’Azur (DIRECCTE).<strong>NDA 93830600283</strong></dd></div>
            <div><dt>Immatriculation RCS</dt><dd>Enregistrée au Registre des commerces et des sociétés (RCS) de Fréjus.<strong>Numéro 840 899 884</strong></dd></div>
            <div><dt>Centre de formation d’apprentis</dt><dd>CFA immatriculé par le Ministère de l’Éducation Nationale.<strong>UAI Côte d’Azur : 0831774C</strong><strong>UAI Paris : 0756548K</strong></dd></div>
            <div><dt>Datadock</dt><dd>Datadocké <strong className={styles.inlineReference}>n°0081088</strong></dd></div>
            <div><dt>Référencement Pôle Emploi</dt><dd>Référencé Qualité Pôle Emploi en date du <strong className={styles.inlineReference}>26/10/2020</strong>.</dd></div>
          </dl>
        </article>

        <article className={styles.referencePanel} aria-labelledby="school-authorizations-title">
          <div className={styles.panelHeading}>
            <span className={styles.icon}><ReferenceIcon kind="shield" /></span>
            <div><p>Les formations professionnelles</p><h3 id="school-authorizations-title">Des habilitations précises.</h3></div>
          </div>
          <dl className={styles.referenceList}>
            <div><dt>CNAPS · Sécurité privée</dt><dd>Autorisation d’exercice CNAPS<strong>n°FOR-083-2027-02-08-20200755135</strong></dd></div>
            <div><dt>ADEF · Agréments de formation</dt><dd><ul className={styles.adefList}>
              <li><span>Agrément ADEF APS</span><strong>8320032701</strong></li>
              <li><span>Agrément ADEF A3P</span><strong>8320111201</strong></li>
              <li><span>Agrément ADEF CPSP</span><strong>8325091511</strong></li>
            </ul></dd></div>
            <div><dt>INRS · Sauveteur secouriste du travail</dt><dd>Habilité par l’INRS pour les formations SST.<strong>Habilitation n°H34836/2020/SST-1/O/07</strong></dd></div>
            <div><dt>VTC · Transport de personnes</dt><dd>Agrément préfectoral<strong>VTC-26-001</strong></dd></div>
          </dl>
        </article>
      </div>
    </div>
  </section>;
}
