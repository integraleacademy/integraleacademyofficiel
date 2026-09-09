import Link from 'next/link';
import { listApsPhotos } from '@/lib/aps-gallery-data';
import ApsPhotoManager from './ApsPhotoManager';

export const dynamic = 'force-dynamic';

export default async function ApsPhotosPage() {
  const { photos, available } = await listApsPhotos();
  return <>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Photos de la page APS</h1>
        <p className="mt-2 max-w-3xl text-stone-600">Ajoutez jusqu’à trois photos du PC sécurité et trois photos de l’école. Chaque enregistrement met à jour la page publique.</p>
        <p className="mt-2 text-sm text-stone-600">Formats JPEG, PNG ou WebP · 8 Mo maximum par photo. Les photos sont optimisées automatiquement.</p>
      </div>
      <Link href="/formations-securite/aps#pc-securite" target="_blank" rel="noopener noreferrer" className="rounded-full bg-academy-ink px-5 py-3 text-sm font-bold text-white">Voir la page APS ↗</Link>
    </div>
    {!available && <p role="alert" className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950">La gestion des photos est temporairement indisponible. Rechargez la page dans un instant.</p>}
    <ApsPhotoManager initialPhotos={photos} available={available} />
  </>;
}
