import { NextRequest, NextResponse } from 'next/server';
import { checkAdminCredentials, createAdminSession } from '@/lib/admin/auth';
export const runtime='nodejs';
export async function POST(request:NextRequest){const data=await request.json().catch(()=>({})); if(!checkAdminCredentials(String(data.username||''),String(data.password||''))) return NextResponse.json({error:'Identifiants incorrects.'},{status:401}); await createAdminSession(); return NextResponse.json({ok:true});}
