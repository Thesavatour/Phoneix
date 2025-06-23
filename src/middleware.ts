import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');

  const publicPaths = ['/sign-in', '/sign-up', '/reset-password'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth-bg/|menu-card-bg/).*)',
  ],
};
