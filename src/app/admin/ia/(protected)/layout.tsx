import Link from 'next/link';
import { redirect } from 'next/navigation';
import { clearAdminSession, isAdminAuthenticated } from '@/lib/admin/auth';

export default async function ProtectedAdminLayout({children}:{children:React.ReactNode}){
  if(!(await isAdminAuthenticated())) redirect('/admin/ia/login');
  async function logout(){
    'use server';
    await clearAdminSession();
    redirect('/admin/ia/login');
  }
  return <main className="min-h-screen bg-stone-100 text-academy-ink"><header className="bg-academy-ink text-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5"><Link href="/admin/ia" className="text-xl font-bold text-academy-gold">Intégrale Academy · IA</Link><nav className="flex flex-wrap gap-3 text-sm"><Link href="/admin/ia/formations">Formations</Link><Link href="/admin/ia/sessions">Sessions</Link><Link href="/admin/ia/leads">Leads</Link><form action={logout}><button>Déconnexion</button></form></nav></div></header><div className="mx-auto max-w-7xl px-6 py-8">{children}</div></main>;
}
