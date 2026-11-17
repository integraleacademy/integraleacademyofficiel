import { TrainingActionLink } from '@/components/TrainingActionLink';
import { questionsByTopic } from '@/data/faq/catalogue';
import { findFaqTopic } from '@/data/faq/topics';
import { contactInfo } from '@/data/locations';
import { INFORMATION_REQUEST_URL } from '@/lib/contact-request';
import { createPageMetadata, serializeJsonLd } from '@/lib/seo';
import { FaqDirectory } from './FaqDirectory';
import styles from './faq.module.css';

export const metadata = createPageMetadata('/faq');
const uniqueQuestions = [...new Map(Object.values(questionsByTopic).flat().map(item => [JSON.stringify([item.q, item.a]), item])).values()];
const schema = serializeJsonLd({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: uniqueQuestions.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
});

export default async function FaqPage({ searchParams }: { searchParams: Promise<{ formation?: string | string[]; q?: string | string[] }> }) {
  const params = await searchParams;
  const formation = findFaqTopic(Array.isArray(params.formation) ? params.formation[0] : params.formation);
  const query = (Array.isArray(params.q) ? params.q[0] : params.q) ?? '';
  return <div className={styles.page}>
    {!formation && !query && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />}
    <FaqDirectory key={JSON.stringify([formation, query])} initialFormation={formation} initialQuery={query} questions={questionsByTopic} />
    <section className={styles.contactBand} aria-labelledby="faq-contact-title">
      <div className={styles.bandInner}>
        <h2 id="faq-contact-title">Faites le premier pas<br /><em>vers votre futur métier</em></h2>
        <div className={styles.bandActions}>
          <TrainingActionLink className={styles.appointment} href={INFORMATION_REQUEST_URL}>Prendre un rendez-vous téléphonique <span aria-hidden="true">→</span></TrainingActionLink>
          <a className={styles.standard} href={contactInfo.phoneHref}>Appeler le standard <strong>{contactInfo.phone}</strong></a>
          <p>{contactInfo.hours}</p>
        </div>
      </div>
    </section>
  </div>;
}
