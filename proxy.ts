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

  const isMerchant = request.nextUrl.pathname.startsWith('/dashboard');
  
  // Protect dashboard routes
  if (isMerchant) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const decodedToken = parseJwt(token);

    console.log("decodedToken", decodedToken);

    if (decodedToken?.role !== 'HUB_MANAGER') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}


