import type { LeadRecord } from "@/lib/leads";
import { site } from "@/lib/site";

export async function sendLeadNotification(lead: LeadRecord) {
  const subject = `New Molonglo lead: ${lead.projectType}`;
  const text = [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Suburb: ${lead.suburb || "Not supplied"}`,
    `Project: ${lead.projectType}`,
    `Message: ${lead.message || "No message provided"}`
  ].join("\n");

  if (process.env.LEAD_NOTIFY_WEBHOOK_URL) {
    await fetch(process.env.LEAD_NOTIFY_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ subject, text, lead })
    }).catch(() => undefined);
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: process.env.LEAD_NOTIFY_FROM || `Molonglo Website <leads@${new URL(site.url).hostname}>`,
        to: [process.env.LEAD_NOTIFY_EMAIL],
        subject,
        text
      })
    }).catch(() => undefined);
  }
}
