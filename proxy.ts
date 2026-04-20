// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1]
    const payload = Buffer.from(base64Payload, "base64").toString("utf-8")
    return JSON.parse(payload)
  } catch (err) {
    return null
  }
}

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login' || pathname.startsWith('/login');
  const isDashboard = pathname.startsWith('/dashboard');

  // If authenticated with a valid HUB_MANAGER token, block access to login
  if (isLoginPage && token) {
    const decodedToken = parseJwt(token);
    if (decodedToken?.role === 'HUB_MANAGER') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Protect dashboard routes
  if (isDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const decodedToken = parseJwt(token);

    if (decodedToken?.role !== 'HUB_MANAGER') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}


