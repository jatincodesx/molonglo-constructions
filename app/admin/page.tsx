import { DatabaseSetupNotice } from "@/components/admin/DatabaseSetupNotice";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAdminStats } from "@/lib/admin-db";
import type { LeadRecord, PageViewRecord } from "@/lib/admin-db";
import { getAllBlogs } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { DatabaseSetupError } from "@/lib/supabase/errors";

export default async function AdminDashboardPage() {
  await requireAdminSession();
  let stats: {
    leads: LeadRecord[];
    pageViews: PageViewRecord[];
    topPages: { path: string; views: number }[];
    totalLeads: number;
    totalViews: number;
  };
  stats = {
    leads: [],
    pageViews: [],
    topPages: [],
    totalLeads: 0,
    totalViews: 0
  };
  let blogs: BlogPost[] = [];
  let setupRequired = false;

  try {
    [stats, blogs] = await Promise.all([getAdminStats(), getAllBlogs()]);
  } catch (error) {
    if (error instanceof DatabaseSetupError) {
      setupRequired = true;
    } else {
      throw error;
    }
  }

  const publishedBlogs = blogs.filter((blog) => blog.published).length;
  const draftBlogs = blogs.length - publishedBlogs;
  const recentBlogs = blogs.slice(0, 5);

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Overview</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Admin overview</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">
            Review blog activity, recent enquiries and the core content areas that need day-to-day management.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/blogs/new" className="rounded-md bg-molonglo-ink px-4 py-2 text-sm font-semibold text-white">
            Write new blog
          </Link>
          <Link href="/admin/blogs" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700">
            Manage blogs
          </Link>
          <Link href="/" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700">
            View website
          </Link>
        </div>
      </div>

      {setupRequired ? <DatabaseSetupNotice /> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total blog posts", String(blogs.length)],
          ["Published blog posts", String(publishedBlogs)],
          ["Draft blog posts", String(draftBlogs)],
          ["Lead enquiries", String(stats.totalLeads)]
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[1.5rem]">
            <CardContent>
              <p className="text-sm text-zinc-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-molonglo-ink">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[1.5rem]">
          <CardContent className="grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Recent blogs</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Latest blog activity</h2>
            </div>
            {recentBlogs.length ? recentBlogs.map((blog) => (
              <div key={blog.slug} className="rounded-xl border border-zinc-200 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-molonglo-ink">{blog.title}</p>
                    <p className="text-sm text-zinc-600">{blog.category} · {blog.published ? "Published" : "Draft"}</p>
                  </div>
                  <Link href={`/admin/blogs/${blog.id}/edit`} className="text-sm font-semibold text-molonglo-gold">
                    Edit
                  </Link>
                </div>
              </div>
            )) : <p className="text-sm text-zinc-600">{setupRequired ? "Run the database setup, then refresh this dashboard." : "No blogs have been created yet."}</p>}
          </CardContent>
        </Card>

        <Card className="rounded-[1.5rem]">
          <CardContent className="grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Recent leads</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Latest enquiries</h2>
            </div>
            {stats.leads.length ? stats.leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="rounded-xl border border-zinc-200 p-4">
                <p className="font-semibold text-molonglo-ink">{lead.name}</p>
                <p className="text-sm text-zinc-600">{lead.projectType} · {lead.suburb || "Suburb not supplied"}</p>
                <p className="mt-1 text-sm text-zinc-600">{lead.email} · {lead.phone}</p>
              </div>
            )) : <p className="text-sm text-zinc-600">{setupRequired ? "Lead data will appear here after the Supabase tables are created." : "No lead enquiries have been received yet."}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
