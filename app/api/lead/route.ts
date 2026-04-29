import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { sendLeadNotification } from "@/lib/notifications";

export async function POST(request: Request) {
  const data = Object.fromEntries((await request.formData()).entries());
  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const phone = String(data.phone || "").trim();
  const projectType = String(data.projectType || "").trim();
  const message = String(data.message || "").trim();

  if (!name || !email || !phone || !projectType || !message) {
    return NextResponse.json({ error: "Name, email, phone, project type and message are required." }, { status: 400 });
  }

  try {
    const lead = await createLead({
      name,
      phone,
      email,
      suburb: String(data.suburb || ""),
      projectType,
      message,
      source: String(data.source || new URL(request.url).pathname)
    });
    await sendLeadNotification(lead);
    return NextResponse.redirect(new URL("/contact?submitted=true", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/contact?error=setup", request.url), 303);
  }
}
