import { createPageMetadata } from '@/lib/seo';
import { Hero, LocationCard, SectionTitle } from '@/components/ui';
import { contact } from '@/data/site';
import { PARIS_TRAINING_SUMMARY } from '@/data/locations';
export const metadata=createPageMetadata('/centres');
export default function Page(){return <><Hero badge="Centres" title="Nos centres de formation" subtitle={`Retrouvez nos formations à Puget-sur-Argens, sur la Côte d’Azur. ${PARIS_TRAINING_SUMMARY}`}/><section className="page-container py-12"><SectionTitle title="Implantations"/><div className="grid gap-5 md:grid-cols-2">{contact.locations.map(l=><LocationCard key={l.name} {...l}/>)}</div></section></>}
