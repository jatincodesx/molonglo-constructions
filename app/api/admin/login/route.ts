import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/admin-auth";
import { AdminAuthConfigError, getAdminAuthConfig } from "@/lib/admin-auth-config";
import { validAdminCredentials } from "@/lib/admin-credentials";

export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV !== "production") {
      console.error("[admin-login] config", {
        hasAdminEmail: Boolean(process.env.ADMIN_EMAIL),
        hasPasswordHash: Boolean(process.env.ADMIN_PASSWORD_HASH),
        passwordHashLength: process.env.ADMIN_PASSWORD_HASH?.length ?? 0,
        hasSessionSecret: Boolean(process.env.SESSION_SECRET)
      });
    }

    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    const config = getAdminAuthConfig();

    if (!(await validAdminCredentials(email, password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, await createAdminToken(config.adminEmail), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12
    });
    return response;
  } catch (error) {
    if (error instanceof AdminAuthConfigError) {
      return NextResponse.json(
        {
          error: "Admin authentication is not configured.",
          ...(process.env.NODE_ENV !== "production" && error.missing.length > 0 ? { missing: error.missing } : {})
        },
        { status: 500 }
      );
    }

    console.error("[admin-login] unexpected error", error);
    return NextResponse.json(
      { error: "Unable to sign in. Please try again later." },
      { status: 500 }
    );
  }
}
