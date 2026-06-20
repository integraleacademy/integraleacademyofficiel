import { listSessions } from '@/lib/training-data';
import { SessionsClient } from './SessionsClient';

export default async function Sessions() {
  const rows = await listSessions();
  return <>
    <h1 className="text-3xl font-bold">Sessions</h1>
    <p className="mt-2 text-sm text-stone-600">Modifiez les dates, tarifs, examens, places et statuts des sessions. Les notes internes ne sont jamais envoyées à l’IA.</p>
    <SessionsClient initialRows={JSON.parse(JSON.stringify(rows))} />
  </>;
}
