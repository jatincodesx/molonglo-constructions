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

const BUDGET_RANGES = new Set([
  "$600k - $800k",
  "$800k - $1.1m",
  "$1.1m - $1.5m",
  "$1.5m+",
  "Not sure yet"
]);

const TIMEFRAMES = new Set([
  "As soon as practical",
  "3-6 months",
  "6-12 months",
  "12+ months",
  "Still researching"
]);

const LAND_STATUSES = new Set([
  "Own land",
  "Looking for land",
  "House to demolish",
  "House & land",
  "Not sure yet"
]);

const DESIGN_STATUSES = new Set([
  "No plans yet",
  "Concept plans",
  "DA submitted",
  "Approved plans",
  "Not sure yet"
]);

const CONTACT_METHODS = new Set(["Phone", "Email", "Either"]);

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
  const budgetRange = String(data.budget_range || data.budgetRange || "").trim();
  const timeframe = String(data.timeframe || "").trim();
  const landStatus = String(data.land_status || data.landStatus || "").trim();
  const designStatus = String(data.design_status || data.designStatus || "").trim();
  const preferredContactMethod = String(data.preferred_contact_method || data.preferredContactMethod || "").trim();
  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required.";
  if (!message) errors.message = "Message is required.";
  if (!email && !phone) errors.contact = "Please provide an email or phone number.";
  if (email && !isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (projectType && !PROJECT_TYPES.has(projectType)) errors.project_type = "Choose a valid project type.";
  if (budgetRange && !BUDGET_RANGES.has(budgetRange)) errors.budget_range = "Choose a valid budget range.";
  if (timeframe && !TIMEFRAMES.has(timeframe)) errors.timeframe = "Choose a valid timeframe.";
  if (landStatus && !LAND_STATUSES.has(landStatus)) errors.land_status = "Choose a valid land status.";
  if (designStatus && !DESIGN_STATUSES.has(designStatus)) errors.design_status = "Choose a valid design status.";
  if (preferredContactMethod && !CONTACT_METHODS.has(preferredContactMethod)) errors.preferred_contact_method = "Choose a valid contact method.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the enquiry form.", errors }, { status: 400 });
  }

  try {
    const leadDetails = [
      ["Budget range", budgetRange],
      ["Approximate timeframe", timeframe],
      ["Land status", landStatus],
      ["Design status", designStatus],
      ["Preferred contact method", preferredContactMethod]
    ].filter(([, value]) => value);
    const enrichedMessage = leadDetails.length
      ? `${message}\n\nLead details:\n${leadDetails.map(([label, value]) => `${label}: ${value}`).join("\n")}`
      : message;

    const lead = await createLead({
      name,
      phone,
      email,
      suburb: String(data.suburb || ""),
      projectType,
      message: enrichedMessage,
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
