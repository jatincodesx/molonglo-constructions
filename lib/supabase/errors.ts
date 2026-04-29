export type SupabaseErrorLike = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
};

const DB_SETUP_COMMAND = "npm run db:link then npm run db:push";

export const DB_SETUP_MESSAGE = `Database setup required. Run ${DB_SETUP_COMMAND}.`;

export class DatabaseSetupError extends Error {
  readonly table?: string;

  constructor(table?: string, message = DB_SETUP_MESSAGE) {
    super(message);
    this.name = "DatabaseSetupError";
    this.table = table;
  }
}

export function isMissingSupabaseTableError(error: SupabaseErrorLike | null | undefined, table?: string) {
  if (!error) {
    return false;
  }

  const message = `${error.message || ""} ${error.details || ""} ${error.hint || ""}`.toLowerCase();
  const tableName = table ? `public.${table}`.toLowerCase() : "";

  if (error.code === "PGRST205" || error.code === "42P01") {
    return !tableName || message.includes(tableName) || message.includes("relation") || message.includes("schema cache");
  }

  if (!message) {
    return false;
  }

  return (
    message.includes("schema cache") &&
    (!tableName || message.includes(tableName) || message.includes(`'${tableName}'`) || message.includes(`"${tableName}"`))
  );
}

export function logMissingSupabaseTableWarning(params: {
  table: string;
  action: string;
  error: SupabaseErrorLike;
}) {
  const { action, error, table } = params;

  console.warn(
    `[supabase] ${action}: table "public.${table}" is not available yet. Public pages will render without database-backed content until migrations are applied. Run ${DB_SETUP_COMMAND}.`,
    {
      code: error.code ?? null,
      details: error.details ?? null,
      hint: error.hint ?? null,
      message: error.message ?? null
    }
  );
}
