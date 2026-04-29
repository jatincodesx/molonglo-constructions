import { DatabaseSetupNotice } from "@/components/admin/DatabaseSetupNotice";
import Link from "next/link";
import { BlogManagerClient } from "@/components/admin/BlogManagerClient";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAllBlogs } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { DatabaseSetupError } from "@/lib/supabase/errors";

export default async function AdminBlogsPage() {
  await requireAdminSession();
  let blogs: BlogPost[] = [];
  let setupRequired = false;

  try {
    blogs = await getAllBlogs();
  } catch (error) {
    if (error instanceof DatabaseSetupError) {
      setupRequired = true;
    } else {
      throw error;
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Blog Manager</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Manage blog posts</h1>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Create, edit, publish, unpublish and delete blog posts from one place.
          </p>
        </div>
        <Link href="/admin/blogs/new" className="rounded-md bg-molonglo-ink px-4 py-2 text-sm font-semibold text-white">
          Write Blog
        </Link>
      </div>

      {setupRequired ? <DatabaseSetupNotice /> : <BlogManagerClient blogs={blogs} />}
    </div>
  );
}
