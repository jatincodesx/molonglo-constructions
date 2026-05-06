import {
  DatabaseSetupError,
  isMissingSupabaseTableError,
  logMissingSupabaseTableWarning,
  type SupabaseErrorLike
} from "@/lib/supabase/errors";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export type LeadStatus = "new" | "contacted" | "archived";

export type LeadRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  email: string;
  suburb: string;
  projectType: string;
  message: string;
  source: string;
  status: LeadStatus;
};

type LeadRow = {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  suburb: string | null;
  project_type: string | null;
  message: string | null;
  source_page: string | null;
  status: LeadStatus;
};

type LeadInput = {
  name: string;
  phone?: string;
  email?: string;
  suburb?: string;
  projectType?: string;
  message: string;
  source?: string;
};

function mapLead(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || row.created_at || new Date().toISOString(),
    name: row.name,
    phone: row.phone || "",
    email: row.email || "",
    suburb: row.suburb || "",
    projectType: row.project_type || "",
    message: row.message || "",
    source: row.source_page || "",
    status: row.status
  };
}

function throwIfSupabaseError(
  error: SupabaseErrorLike | null,
  options: {
    action: string;
    allowMissingTable?: boolean;
  }
) {
  if (!error) {
    return false;
  }

  if (isMissingSupabaseTableError(error, "leads")) {
    if (options.allowMissingTable) {
      logMissingSupabaseTableWarning({
        action: options.action,
        error,
        table: "leads"
      });

      return true;
    }

    throw new DatabaseSetupError("leads");
  }

  throw new Error(error.message || "Supabase request failed.");
}

export async function createLead(input: LeadInput) {
  const name = input.name.trim();
  const message = input.message.trim();

  if (!name) {
    throw new Error("Lead name is required.");
  }

  if (!message) {
    throw new Error("Lead message is required.");
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      name,
      email: input.email?.trim() || null,
      phone: input.phone?.trim() || null,
      suburb: input.suburb?.trim() || null,
      project_type: input.projectType?.trim() || null,
      message,
      source_page: input.source?.trim() || null
    })
    .select("*")
    .single();

  throwIfSupabaseError(error, { action: "creating a lead" });
  return mapLead(data as LeadRow);
}

export async function getLeadsForAdmin() {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  throwIfSupabaseError(error, { action: "fetching admin leads" });
  return (data || []).map((row) => mapLead(row as LeadRow));
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  throwIfSupabaseError(error, { action: `updating lead "${id}"` });
  return mapLead(data as LeadRow);
}

export async function deleteLead(id: string) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  throwIfSupabaseError(error, { action: `deleting lead "${id}"` });
}
