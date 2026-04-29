import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicAdminPaths = ["/admin/login", "/api/admin/login"];
  if (publicAdminPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const session = await verifyAdminToken(request.cookies.get(ADMIN_COOKIE)?.value).catch(() => null);
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const login = request.nextUrl.clone();
  login.pathname = "/admin/login";
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
