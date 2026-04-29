"use client";

import { useRouter } from "next/navigation";
import type { LeadRecord, LeadStatus } from "@/lib/admin-db";

export function LeadsManagerClient({ leads }: { leads: LeadRecord[] }) {
  const router = useRouter();

  async function updateStatus(id: string, status: LeadStatus) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status })
    });
    router.refresh();
  }

  async function remove(id: string) {
    const confirmed = window.confirm("Delete this lead? This cannot be undone.");
    if (!confirmed) return;
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-[#f6f3ee] text-left text-zinc-600">
            <tr>
              <th className="px-5 py-4 font-semibold">Lead</th>
              <th className="px-5 py-4 font-semibold">Project Type</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-molonglo-ink">{lead.name}</p>
                  <p className="text-zinc-600">{lead.email} · {lead.phone}</p>
                  <p className="text-xs text-zinc-500">{lead.suburb || "Suburb not supplied"}</p>
                  <p className="text-xs text-zinc-500">Source: {lead.source || "Unknown"}</p>
                </td>
                <td className="px-5 py-4 text-zinc-600">{lead.projectType}</td>
                <td className="px-5 py-4 text-zinc-600">{lead.createdAt.slice(0, 10)}</td>
                <td className="px-5 py-4 text-zinc-600">{lead.status}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => updateStatus(lead.id, "contacted")} className="rounded-md border border-zinc-300 px-3 py-2 font-semibold text-zinc-700">
                      Mark contacted
                    </button>
                    <button type="button" onClick={() => updateStatus(lead.id, "archived")} className="rounded-md border border-zinc-300 px-3 py-2 font-semibold text-zinc-700">
                      Archive
                    </button>
                    <button type="button" onClick={() => remove(lead.id)} className="rounded-md border border-red-200 px-3 py-2 font-semibold text-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
