import { DB_SETUP_MESSAGE } from "@/lib/supabase/errors";

type DatabaseSetupNoticeProps = {
  message?: string;
};

export function DatabaseSetupNotice({ message = DB_SETUP_MESSAGE }: DatabaseSetupNoticeProps) {
  return (
    <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6 text-amber-950">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Setup Required</p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em]">Database setup required</h2>
      <p className="mt-3 text-sm leading-7">{message}</p>
    </div>
  );
}
