import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE = 'paroisse_admin_session';

async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 16) return null;
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/connexion')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = await verifySessionToken(token);

    if (!session) {
      const loginUrl = new URL('/admin/connexion', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
