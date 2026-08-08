import { redirect } from 'next/navigation';
import { checkAdminCredentials, createAdminSession, isAdminAuthenticated } from '@/lib/admin/auth';

export default async function Login({searchParams}:{searchParams?:Promise<{error?:string}>}){
  if(await isAdminAuthenticated()) redirect('/admin/ia');
  const params=await searchParams;
  async function login(formData:FormData){
    'use server';
    const username=String(formData.get('username')||'');
    const password=String(formData.get('password')||'');
    if(checkAdminCredentials(username,password)){
      await createAdminSession();
      redirect('/admin/ia');
    }
    redirect('/admin/ia/login?error=1');
  }
  return <main className="min-h-screen bg-academy-ink px-6 py-16 text-white"><form action={login} className="mx-auto max-w-md rounded-3xl border border-academy-gold/40 bg-white p-8 text-academy-ink shadow-2xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-academy-gold">Administration IA</p><h1 className="mt-2 text-3xl font-bold">Administration IA</h1>{params?.error?<p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">Identifiant ou mot de passe incorrect.</p>:null}<label className="mt-6 block text-sm font-bold" htmlFor="username">Identifiant</label><input id="username" name="username" autoComplete="username" required className="mt-2 w-full rounded-xl border p-3"/><label className="mt-4 block text-sm font-bold" htmlFor="password">Mot de passe</label><input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border p-3"/><button className="mt-5 w-full rounded-xl bg-academy-gold px-4 py-3 font-bold">Connexion</button><p className="mt-4 text-xs text-stone-500">Accès protégé par ADMIN_USERNAME, ADMIN_PASSWORD et ADMIN_SESSION_SECRET.</p></form></main>;
}
