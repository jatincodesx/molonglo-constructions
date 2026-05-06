"use client";

import { useState } from "react";

type QuoteFormProps = {
  source?: string;
  submitLabel?: string;
};

const projectTypes = [
  "Custom home",
  "Knockdown rebuild",
  "New home build",
  "House and land package",
  "Display home enquiry",
  "South Coast enquiry",
  "General enquiry"
] as const;

export function QuoteForm({ source = "website", submitLabel = "Request Consultation" }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setMessage(typeof data.error === "string" ? data.error : "Unable to submit enquiry. Please try again.");
      return;
    }

    form.reset();
    setStatus("success");
    setMessage("Thanks. Your enquiry has been received and we will respond with the next step.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
      <input type="hidden" name="source_page" value={source} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input required name="name" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" autoComplete="name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Email
          <input type="email" name="email" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" autoComplete="email" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Phone
          <input name="phone" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" autoComplete="tel" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Suburb
          <input name="suburb" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" autoComplete="address-level2" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Project Type
        <select name="project_type" defaultValue="" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
          <option value="">Select a project type</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"
          placeholder="Tell us about your block, suburb, project goals and preferred timeframe."
        />
      </label>

      <p className="text-sm leading-6 text-zinc-600">Please provide at least an email or phone number.</p>

      {message ? (
        <p
          className={`rounded-md p-3 text-sm font-semibold ${status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}

      <button className="cta disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
