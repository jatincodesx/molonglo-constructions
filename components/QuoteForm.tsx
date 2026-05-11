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

const budgetRanges = [
  "$600k - $800k",
  "$800k - $1.1m",
  "$1.1m - $1.5m",
  "$1.5m+",
  "Not sure yet"
] as const;

const timeframeOptions = [
  "As soon as practical",
  "3-6 months",
  "6-12 months",
  "12+ months",
  "Still researching"
] as const;

const landStatusOptions = [
  "Own land",
  "Looking for land",
  "House to demolish",
  "House & land",
  "Not sure yet"
] as const;

const designStatusOptions = [
  "No plans yet",
  "Concept plans",
  "DA submitted",
  "Approved plans",
  "Not sure yet"
] as const;

const contactMethodOptions = [
  "Phone",
  "Email",
  "Either"
] as const;

function RequiredAsterisk() {
  return (
    <>
      <span aria-hidden="true" className="text-molonglo-gold"> *</span>
      <span className="sr-only"> required</span>
    </>
  );
}

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
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6 shadow-[0_22px_55px_rgba(23,26,24,0.08)]">
      <input type="hidden" name="source_page" value={source} />
      <p className="text-sm leading-6 text-zinc-600">
        Not sure where to start? Share what you know. We&apos;ll help you understand the next practical step.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          <span>Name<RequiredAsterisk /></span>
          <input required aria-required="true" name="name" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold" autoComplete="name" />
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Budget range
          <select name="budget_range" defaultValue="" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
            <option value="">Select a budget range</option>
            {budgetRanges.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Approximate timeframe
          <select name="timeframe" defaultValue="" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
            <option value="">Select a timeframe</option>
            {timeframeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Land status
          <select name="land_status" defaultValue="" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
            <option value="">Select land status</option>
            {landStatusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Design status
          <select name="design_status" defaultValue="" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
            <option value="">Select design status</option>
            {designStatusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Preferred contact method
        <select name="preferred_contact_method" defaultValue="" className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
          <option value="">Select a preference</option>
          {contactMethodOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        <span>Message<RequiredAsterisk /></span>
        <textarea
          required
          aria-required="true"
          name="message"
          rows={5}
          className="rounded-md border border-zinc-300 px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold"
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
