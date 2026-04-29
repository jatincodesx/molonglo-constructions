import { DatabaseSetupNotice } from "@/components/admin/DatabaseSetupNotice";
import { SeoManagerClient } from "@/components/admin/SeoManagerClient";
import { requireAdminSession } from "@/lib/admin-auth";
import { getIndexablePages } from "@/lib/admin-pages";
import type { PageRecord } from "@/lib/admin-pages";
import { getSeoOverrides } from "@/lib/admin-db";
import type { SeoOverride } from "@/lib/admin-db";
import { DatabaseSetupError } from "@/lib/supabase/errors";

export default async function AdminSeoPage() {
  await requireAdminSession();
  let pages: PageRecord[] = [];
  let overrides: SeoOverride[] = [];
  let setupRequired = false;

  try {
    [pages, overrides] = await Promise.all([getIndexablePages(), getSeoOverrides()]);
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">SEO Manager</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Manage page metadata</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Review titles, descriptions and page-level SEO warnings, then save overrides for editable pages.
        </p>
      </div>

      {setupRequired ? <DatabaseSetupNotice /> : <SeoManagerClient pages={pages} overrides={overrides} />}
    </div>
  );
}
