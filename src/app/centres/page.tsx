import { Hero, LocationCard, SectionTitle } from '@/components/ui';
import { AcademyHeroVisual, VisualSection } from '@/components/visuals';
import { contact } from '@/data/site';
export const metadata={title:'Nos centres',description:'Les centres Intégrale Academy à Puget-sur-Argens, Paris et Aurillac pour les formations sécurité, VTC et BTS.'};
export default function Page(){return <><Hero badge="Centres" title="Nos centres de formation" subtitle="Paris, Puget-sur-Argens / Côte d’Azur et Aurillac / Centre France selon les formations et plannings." visual={<AcademyHeroVisual/>}/><VisualSection tone="academy"><section className="mx-auto max-w-7xl px-4 py-12"><SectionTitle title="Implantations"/><div className="grid gap-5 md:grid-cols-3">{contact.locations.map(l=><LocationCard key={l.name} {...l}/>)}</div></section></VisualSection></>}
