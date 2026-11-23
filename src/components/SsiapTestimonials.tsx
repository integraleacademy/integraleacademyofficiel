import { TrainingCourseTestimonials } from './TrainingCourseTestimonials';

export function SsiapTestimonials({ category = 'SSIAP 1' }: { category?: string }) {
  return <div id="avis-ssiap"><TrainingCourseTestimonials category={category} layout="home"
    copy={{ headingId: 'avis-ssiap-title', title: 'Leur formation. Leurs mots', eyebrow: 'Les retours de nos stagiaires',
      empty: 'Découvrez les expériences de nos stagiaires sur la fiche Google d’Intégrale Academy.',
      sourceLabel: 'Consulter les avis sur Google ↗' }} /></div>;
}
