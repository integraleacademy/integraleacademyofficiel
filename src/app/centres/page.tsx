import { createPageMetadata } from '@/lib/seo';
import { Hero, LocationCard, SectionTitle } from '@/components/ui';
import { contact } from '@/data/site';
export const metadata=createPageMetadata('/centres');
export default function Page(){return <><Hero badge="Centres" title="Nos centres de formation" subtitle="Paris, Puget-sur-Argens / Côte d’Azur et Aurillac / Centre France selon les formations et plannings."/><section className="page-container py-12"><SectionTitle title="Implantations"/><div className="grid gap-5 md:grid-cols-3">{contact.locations.map(l=><LocationCard key={l.name} {...l}/>)}</div></section></>}
