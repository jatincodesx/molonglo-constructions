import { NextResponse } from "next/server";
import { DatabaseSetupError } from "@/lib/supabase/errors";
import { createLead } from "@/lib/leads";

const PROJECT_TYPES = new Set([
  "Custom home",
  "Knockdown rebuild",
  "New home build",
  "House and land package",
  "Display home enquiry",
  "South Coast enquiry",
  "General enquiry"
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readLeadPayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json().catch(() => ({}));
  }

  const form = await request.formData().catch(() => null);
  return form ? Object.fromEntries(form.entries()) : {};
}

export async function POST(request: Request) {
  const data = await readLeadPayload(request);
  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const phone = String(data.phone || "").trim();
  const projectType = String(data.project_type || data.projectType || "").trim();
  const message = String(data.message || "").trim();
  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required.";
  if (!message) errors.message = "Message is required.";
  if (!email && !phone) errors.contact = "Please provide an email or phone number.";
  if (email && !isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (projectType && !PROJECT_TYPES.has(projectType)) errors.project_type = "Choose a valid project type.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the enquiry form.", errors }, { status: 400 });
  }

  try {
    const lead = await createLead({
      name,
      phone,
      email,
      suburb: String(data.suburb || ""),
      projectType,
      message,
      source: String(data.source_page || data.source || new URL(request.url).pathname)
    });
    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch (error) {
    if (error instanceof DatabaseSetupError && process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { error: "Leads table missing. Run npm run db:link then npm run db:push." },
        { status: 503 }
      );
    }

    console.error("[lead] unable to create lead", error);
    return NextResponse.json({ error: "Unable to submit enquiry. Please try again." }, { status: 500 });
  }
}
