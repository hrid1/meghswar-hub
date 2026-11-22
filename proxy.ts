import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isHubManagerToken } from "./lib/auth";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/login");
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard && !isHubManagerToken(token)) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  if (isLoginPage && isHubManagerToken(token)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
