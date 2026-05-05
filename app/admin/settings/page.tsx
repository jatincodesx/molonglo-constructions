import { site } from "@/lib/site";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminSettingsPage() {
  await requireAdminSession();
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Settings</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Admin and site configuration</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Business details</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-zinc-600">
            <p><strong>Name:</strong> {site.name}</p>
            <p><strong>Website URL:</strong> {site.url}</p>
            <p><strong>Phone:</strong> {site.phone}</p>
            <p><strong>Email:</strong> {site.email}</p>
            <p><strong>Address:</strong> {site.address}</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Admin authentication</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-zinc-600">
            <p><strong>Production env vars:</strong> <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD_HASH</code> and <code>SESSION_SECRET</code>.</p>
            <p><strong>Local fallback:</strong> development may use <code>ADMIN_PASSWORD</code> and legacy <code>ADMIN_JWT_SECRET</code>.</p>
            <p><strong>Recommended:</strong> use a bcrypt hash generated from <code>scripts/hash-password.mjs</code>.</p>
            <p><strong>Runtime:</strong> blog posts, leads and SEO overrides are stored in Supabase rather than the local filesystem.</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Business data TODOs</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600">
            <li>Confirm whether public opening hours should be shown on the contact page and in structured data.</li>
            <li>Confirm whether the address should continue to be published as the main office address on all marketing channels.</li>
            <li>Add real project case studies or finished-home descriptions if the team wants richer portfolio content.</li>
            <li>Add Supabase Storage-backed uploads for featured images if the team wants in-dashboard image uploads later.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
