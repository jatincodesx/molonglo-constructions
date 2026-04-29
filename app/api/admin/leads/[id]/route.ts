import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { deleteLead, updateLeadStatus, type LeadStatus } from "@/lib/admin-db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const status = String(body.status || "") as LeadStatus;

  if (!["new", "contacted", "archived"].includes(status)) {
    return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
  }

  try {
    await updateLeadStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update lead." },
      { status: 400 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteLead(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete lead." },
      { status: 400 }
    );
  }
}
