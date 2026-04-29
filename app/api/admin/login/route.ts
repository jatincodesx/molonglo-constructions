import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/admin-auth";
import { validAdminCredentials } from "@/lib/admin-credentials";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "");
  const password = String(body.password || "");

  try {
    if (!(await validAdminCredentials(email, password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Admin authentication is not configured." },
      { status: 500 }
    );
  }

  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, await createAdminToken(email), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create admin session." },
      { status: 500 }
    );
  }
}
