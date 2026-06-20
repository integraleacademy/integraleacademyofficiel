import 'server-only';
import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';
const COOKIE='ia_admin_session';
function secret(){return process.env.ADMIN_SESSION_SECRET || 'dev-change-me'}
function sign(v:string){return createHmac('sha256',secret()).update(v).digest('hex')}
export async function createAdminSession(){const value=`${Date.now()+86400000}.${sign(String(Date.now()+86400000))}`;(await cookies()).set(COOKIE,value,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:86400});}
export async function clearAdminSession(){(await cookies()).delete(COOKIE)}
export async function isAdminAuthenticated(){const c=(await cookies()).get(COOKIE)?.value; if(!c)return false; const [exp,sig]=c.split('.'); if(!exp||!sig||Number(exp)<Date.now())return false; const expected=sign(exp); return timingSafeEqual(Buffer.from(sig),Buffer.from(expected));}
export function checkAdminCredentials(u:string,p:string){return !!process.env.ADMIN_USERNAME && !!process.env.ADMIN_PASSWORD && u===process.env.ADMIN_USERNAME && p===process.env.ADMIN_PASSWORD}
