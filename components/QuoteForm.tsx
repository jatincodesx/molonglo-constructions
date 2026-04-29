"use client";

type QuoteFormProps = {
  source?: string;
  submitLabel?: string;
};

export function QuoteForm({ source = "website", submitLabel = "Request Consultation" }: QuoteFormProps) {
  return (
    <form action="/api/lead" method="post" className="grid gap-4 rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-soft">
      <input type="hidden" name="source" value={source} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input required name="name" className="rounded-md border border-zinc-300 px-3 py-3" autoComplete="name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Email
          <input required type="email" name="email" className="rounded-md border border-zinc-300 px-3 py-3" autoComplete="email" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          Phone
          <input required name="phone" className="rounded-md border border-zinc-300 px-3 py-3" autoComplete="tel" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Suburb
          <input name="suburb" className="rounded-md border border-zinc-300 px-3 py-3" autoComplete="address-level2" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        Project Type
        <select name="projectType" className="rounded-md border border-zinc-300 px-3 py-3">
          <option>Custom Home</option>
          <option>New Home</option>
          <option>Knockdown Rebuild</option>
          <option>Home Renovation</option>
          <option>Dual Occupancy</option>
          <option>Multi-Unit Project</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-md border border-zinc-300 px-3 py-3"
          placeholder="Tell us about your block, suburb, project goals and preferred timeframe."
        />
      </label>

      <button className="cta" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
