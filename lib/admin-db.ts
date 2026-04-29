import {
  deleteLead,
  getLeadsForAdmin,
  type LeadRecord,
  type LeadStatus,
  updateLeadStatus
} from "@/lib/leads";
import {
  DatabaseSetupError,
  isMissingSupabaseTableError,
  logMissingSupabaseTableWarning,
  type SupabaseErrorLike
} from "@/lib/supabase/errors";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type { LeadRecord, LeadStatus };

export type PageViewRecord = {
  id: string;
  path: string;
  referrer: string;
  userAgent: string;
  createdAt: string;
};

export type SeoOverride = {
  path: string;
  title: string;
  description: string;
  schema: string;
  updatedAt: string;
  noindex: boolean;
};

type SeoPageRow = {
  path: string;
  title: string | null;
  meta_description: string | null;
  structured_data: unknown;
  updated_at: string | null;
  noindex: boolean | null;
};

function mapSeoOverride(row: SeoPageRow): SeoOverride {
  return {
    path: row.path,
    title: row.title || "",
    description: row.meta_description || "",
    schema: row.structured_data ? JSON.stringify(row.structured_data, null, 2) : "",
    updatedAt: row.updated_at || new Date().toISOString(),
    noindex: row.noindex === true
  };
}

function parseStructuredData(schema: string) {
  if (!schema.trim()) {
    return null;
  }

  try {
    return JSON.parse(schema) as Record<string, unknown>;
  } catch {
    throw new Error("Structured data must be valid JSON.");
  }
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

  if (isMissingSupabaseTableError(error, "seo_pages")) {
    if (options.allowMissingTable) {
      logMissingSupabaseTableWarning({
        action: options.action,
        error,
        table: "seo_pages"
      });

      return true;
    }

    throw new DatabaseSetupError("seo_pages");
  }

  throw new Error(error.message || "Supabase request failed.");
}

export async function getLeads() {
  return getLeadsForAdmin();
}

export async function getPageViews() {
  return [] as PageViewRecord[];
}

export async function addPageView(_: Omit<PageViewRecord, "id" | "createdAt">) {
  return null;
}

export async function getSeoOverrides() {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("seo_pages").select("*").order("path", { ascending: true });

  throwIfSupabaseError(error, { action: "fetching SEO overrides" });
  return (data || []).map((row) => mapSeoOverride(row as SeoPageRow));
}

export async function getPublicSeoOverride(pagePath: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("path", pagePath)
    .eq("noindex", false)
    .limit(1)
    .maybeSingle();

  if (throwIfSupabaseError(error, { action: `fetching SEO override "${pagePath}"`, allowMissingTable: true })) {
    return undefined;
  }

  return data ? mapSeoOverride(data as SeoPageRow) : undefined;
}

export async function saveSeoOverride(input: Omit<SeoOverride, "updatedAt">) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("seo_pages")
    .upsert(
      {
        path: input.path,
        title: input.title.trim() || null,
        meta_description: input.description.trim() || null,
        structured_data: parseStructuredData(input.schema),
        noindex: input.noindex
      },
      { onConflict: "path" }
    )
    .select("*")
    .single();

  throwIfSupabaseError(error, { action: `saving SEO override "${input.path}"` });
  return mapSeoOverride(data as SeoPageRow);
}

export async function getAdminStats() {
  const leads = await getLeadsForAdmin();

  return {
    leads,
    pageViews: [] as PageViewRecord[],
    topPages: [] as { path: string; views: number }[],
    totalLeads: leads.length,
    totalViews: 0
  };
}

export { deleteLead, updateLeadStatus };
