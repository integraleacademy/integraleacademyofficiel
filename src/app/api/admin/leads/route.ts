import { NextResponse } from 'next/server';import { requireAdmin } from '@/lib/admin/guard';import { listLeads } from '@/lib/training-data';
export const runtime='nodejs';
export async function GET(){const denied=await requireAdmin(); if(denied)return denied; return NextResponse.json(await listLeads())}
