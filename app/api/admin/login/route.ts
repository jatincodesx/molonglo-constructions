import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/admin-auth";
import { AdminAuthConfigError, getAdminAuthConfig, getAdminAuthDiagnostics } from "@/lib/admin-auth-config";
import { validAdminCredentials } from "@/lib/admin-credentials";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";
    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";

    if (!configuredEmail) {
      getAdminAuthConfig();
    }

    if (!password || email.trim().toLowerCase() !== configuredEmail) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

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
          ...(process.env.NODE_ENV !== "production"
            ? { detail: error.message, missing: error.missing, diagnostics: getAdminAuthDiagnostics() }
            : {})
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
