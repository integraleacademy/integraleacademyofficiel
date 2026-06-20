import { revalidatePath } from 'next/cache';
import { getPrisma } from '@/lib/db';
import { listSessions, sessionStatuses } from '@/lib/training-data';

const displayDate=(v:any)=>v?new Date(v).toLocaleDateString('fr-FR'):'';
const inputDate=(v:any)=>v?new Date(v).toISOString().slice(0,10):'';
const nullableNumber=(v:FormDataEntryValue|null)=>{const s=String(v||'').trim(); return s===''?null:Number(s);};
const nullableDate=(v:FormDataEntryValue|null)=>{const s=String(v||'').trim(); return s?new Date(s):null;};

async function updateSession(formData:FormData){
  'use server';
  const prisma=await getPrisma();
  if(!prisma) return;
  const id=String(formData.get('id')||'');
  await prisma.trainingSession.update({where:{id},data:{
    title:String(formData.get('title')||''),
    startDate:new Date(String(formData.get('startDate')||'')),
    endDate:new Date(String(formData.get('endDate')||'')),
    examDate:nullableDate(formData.get('examDate')),
    priceCents:Number(formData.get('priceCents')||0),
    priceLabel:String(formData.get('priceLabel')||''),
    status:String(formData.get('status')||'OPEN') as any,
    seatsTotal:nullableNumber(formData.get('seatsTotal')),
    seatsLeft:nullableNumber(formData.get('seatsLeft')),
    registrationUrl:String(formData.get('registrationUrl')||''),
  }});
  revalidatePath('/admin/ia/sessions');
}

export default async function Sessions(){
  const rows=await listSessions();
  const canEdit=!!(await getPrisma());
  return <><h1 className="text-3xl font-bold">Sessions</h1><p className="mt-2 text-sm text-stone-600">Modifiez les dates, tarifs, examens, places et statuts des sessions. Les notes internes ne sont jamais envoyées à l’IA.</p>{!canEdit?<p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">DATABASE_URL est requis pour enregistrer les modifications.</p>:null}<div className="mt-6 space-y-4">{rows.map((r:any)=><form key={r.id} action={updateSession} className="rounded-2xl bg-white p-5 shadow"><input type="hidden" name="id" value={r.id}/><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-academy-gold">{r.training?.name}</p><input name="title" defaultValue={r.title} className="mt-2 w-full rounded-xl border p-3 text-lg font-bold" disabled={!canEdit}/></div><button disabled={!canEdit} className="rounded-xl bg-academy-ink px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Enregistrer</button></div><div className="mt-4 grid gap-4 md:grid-cols-4"><label className="text-sm font-semibold">Début<input name="startDate" type="date" defaultValue={inputDate(r.startDate)} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Fin<input name="endDate" type="date" defaultValue={inputDate(r.endDate)} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Examen<input name="examDate" type="date" defaultValue={inputDate(r.examDate)} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Statut<select name="status" defaultValue={r.status} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}>{sessionStatuses.map(status=><option key={status} value={status}>{status}</option>)}</select></label><label className="text-sm font-semibold">Tarif centimes<input name="priceCents" type="number" min="0" defaultValue={r.priceCents} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Libellé tarif<input name="priceLabel" defaultValue={r.priceLabel} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Places totales<input name="seatsTotal" type="number" min="0" defaultValue={r.seatsTotal ?? ''} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><label className="text-sm font-semibold">Places restantes<input name="seatsLeft" type="number" min="0" defaultValue={r.seatsLeft ?? ''} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label></div><label className="mt-4 block text-sm font-semibold">Lien d'inscription<input name="registrationUrl" defaultValue={r.registrationUrl} className="mt-1 w-full rounded-xl border p-3" disabled={!canEdit}/></label><p className="mt-3 text-xs text-stone-500">Affichage public actuel : du {displayDate(r.startDate)} au {displayDate(r.endDate)} · examen {displayDate(r.examDate)||'non précisé'} · {r.priceLabel} · {r.seatsLeft ?? '—'} places restantes.</p></form>)}</div></>;
}
