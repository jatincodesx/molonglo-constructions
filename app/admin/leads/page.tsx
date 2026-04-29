import { DatabaseSetupNotice } from "@/components/admin/DatabaseSetupNotice";
import { LeadsManagerClient } from "@/components/admin/LeadsManagerClient";
import { requireAdminSession } from "@/lib/admin-auth";
import { getLeads } from "@/lib/admin-db";
import type { LeadRecord } from "@/lib/admin-db";
import { DatabaseSetupError } from "@/lib/supabase/errors";

export default async function AdminLeadsPage() {
  await requireAdminSession();
  let leads: LeadRecord[] = [];
  let setupRequired = false;

  try {
    leads = await getLeads();
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Leads</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Lead enquiries</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Review form submissions, mark them as contacted or archive them after follow-up.
        </p>
      </div>

      {setupRequired ? <DatabaseSetupNotice /> : <LeadsManagerClient leads={leads} />}
    </div>
  );
}
