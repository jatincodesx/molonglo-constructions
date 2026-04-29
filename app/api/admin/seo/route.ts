import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { saveSeoOverride } from "@/lib/admin-db";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const path = String(body.path || "");
  const title = String(body.title || "");
  const description = String(body.description || "");
  const schema = String(body.schema || "");
  const noindex = body.noindex === true;

  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "Path must start with /" }, { status: 400 });
  }

  try {
    const override = await saveSeoOverride({ path, title, description, schema, noindex });
    return NextResponse.json({ ok: true, override });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save SEO settings." },
      { status: 400 }
    );
  }
}
