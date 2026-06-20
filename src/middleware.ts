import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SESSION_COOKIE='ia_admin_session';
const protectedAdminPaths=new Set(['/admin/ia','/admin/ia/formations','/admin/ia/sessions','/admin/ia/leads']);
const publicPrefixes=['/_next','/static'];
const publicAdminApiPaths=new Set(['/api/admin/login','/api/admin/logout','/api/admin/auth-health']);

function isStaticFile(pathname:string){return pathname==='/favicon.ico' || /\.[\w-]+$/.test(pathname);}

export function middleware(request:NextRequest){
  const {pathname}=request.nextUrl;
  if(publicPrefixes.some(prefix=>pathname.startsWith(prefix)) || isStaticFile(pathname) || publicAdminApiPaths.has(pathname) || pathname==='/admin/ia/login'){
    return NextResponse.next();
  }
  if(protectedAdminPaths.has(pathname) && !request.cookies.has(ADMIN_SESSION_COOKIE)){
    return NextResponse.redirect(new URL('/admin/ia/login',request.url));
  }
  return NextResponse.next();
}

export const config={matcher:['/admin/ia/:path*','/api/admin/:path*','/_next/:path*','/favicon.ico']};
