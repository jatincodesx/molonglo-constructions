"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/blogs", label: "Blog Manager" },
  { href: "/admin/blogs/new", label: "Write Blog" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/seo", label: "SEO Manager" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Settings" }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="min-h-screen bg-[#f3efe8] text-zinc-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <div className="grid min-h-screen xl:grid-cols-[280px_1fr]">
        <aside className="border-b border-zinc-200 bg-white xl:border-b-0 xl:border-r">
          <div className="border-b border-zinc-200 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Molonglo Construction</p>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Admin Dashboard</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Manage blogs, metadata, lead enquiries and site settings.</p>
          </div>

          <nav className="grid gap-1 p-4">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-[#f6f3ee]",
                    active && "bg-molonglo-ink text-white hover:bg-molonglo-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-zinc-200 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Protected Area</p>
                <p className="text-lg font-semibold text-molonglo-ink">Molonglo Construction Group</p>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
                  View Website
                </Link>
                <form action="/api/admin/logout" method="post">
                  <button className="rounded-md bg-molonglo-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </header>

          <main className="p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
