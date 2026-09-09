import { createPageMetadata } from '@/lib/seo';
import { Button, Hero } from '@/components/ui';

export const metadata = createPageMetadata('/gestion');

const resources = [
  ['Examen blanc ADEF', 'https://extranet.adef-securite.fr/Login'],
  ['Test de français', 'https://testb1.lapreventionsecurite.org/Public/'],
  ['Test de positionnement AFC', 'https://gestionstagiaires-r5no.onrender.com/test-positionnement'],
] as const;

export default function ResourcesPage() {
  return <>
    <Hero badge="Ressources" title="Tests et ressources de formation" subtitle="Retrouvez les accès communiqués par votre équipe pédagogique." />
    <section className="page-container grid gap-5 py-12 md:grid-cols-3">
      {resources.map(([label, href]) => <div key={href} className="rounded-3xl border border-academy-line bg-academy-surface p-6">
        <h2 className="mb-6 text-xl font-black">{label}</h2>
        <Button href={href} variant="secondary">Accéder au service</Button>
      </div>)}
    </section>
  </>;
}
