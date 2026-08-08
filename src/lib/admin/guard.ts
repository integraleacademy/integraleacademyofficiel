import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin/auth';
export async function requireAdmin(){ if(await isAdminAuthenticated()) return null; return NextResponse.json({error:'Non autorisé.'},{status:401}); }
