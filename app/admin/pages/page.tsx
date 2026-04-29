import { DatabaseSetupNotice } from "@/components/admin/DatabaseSetupNotice";
import { getIndexablePages } from "@/lib/admin-pages";
import type { PageRecord } from "@/lib/admin-pages";
import { requireAdminSession } from "@/lib/admin-auth";
import { DatabaseSetupError } from "@/lib/supabase/errors";

export default async function AdminPagesPage() {
  await requireAdminSession();
  let pages: PageRecord[] = [];
  let setupRequired = false;

  try {
    pages = await getIndexablePages();
  } catch (error) {
    if (error instanceof DatabaseSetupError) {
      setupRequired = true;
    } else {
      throw error;
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Pages</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Public page inventory</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Review every public page, including static service pages, location pages and blog URLs.
        </p>
      </div>

      {setupRequired ? <DatabaseSetupNotice /> : null}

      <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-[#f6f3ee] text-left text-zinc-600">
              <tr>
                <th className="px-5 py-4 font-semibold">Path</th>
                <th className="px-5 py-4 font-semibold">Title</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {pages.map((page) => (
                <tr key={page.path}>
                  <td className="px-5 py-4 font-semibold text-molonglo-ink">{page.path}</td>
                  <td className="px-5 py-4 text-zinc-600">{page.title}</td>
                  <td className="px-5 py-4 text-zinc-600">{page.status}</td>
                  <td className="px-5 py-4 text-zinc-600">{page.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
