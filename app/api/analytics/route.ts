import { NextResponse } from "next/server";
import { addPageView } from "@/lib/admin-db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const path = typeof body.path === "string" ? body.path : "/";
  if (!path.startsWith("/admin") && !path.startsWith("/api")) {
    await addPageView({
      path,
      referrer: typeof body.referrer === "string" ? body.referrer : "",
      userAgent: request.headers.get("user-agent") || ""
    });
  }

  return NextResponse.json({ ok: true });
}
