import { NextResponse } from 'next/server';
export const runtime='nodejs';
export async function GET(){return NextResponse.json({ok:true,hasAdminUsername:!!process.env.ADMIN_USERNAME,hasAdminPassword:!!process.env.ADMIN_PASSWORD,hasAdminSessionSecret:!!process.env.ADMIN_SESSION_SECRET,hasDatabaseUrl:!!process.env.DATABASE_URL});}
