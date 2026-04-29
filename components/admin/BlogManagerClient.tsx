"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

export function BlogManagerClient({ blogs }: { blogs: BlogPost[] }) {
  const router = useRouter();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  async function updateStatus(slug: string, published: boolean) {
    setPendingSlug(slug);
    await fetch(`/api/admin/blogs/${slug}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ published })
    });
    setPendingSlug(null);
    router.refresh();
  }

  async function remove(slug: string) {
    const confirmed = window.confirm("Delete this blog? This will permanently remove the Supabase record.");
    if (!confirmed) {
      return;
    }

    setPendingSlug(slug);
    await fetch(`/api/admin/blogs/${slug}`, { method: "DELETE" });
    setPendingSlug(null);
    router.refresh();
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-[#f6f3ee] text-left text-zinc-600">
            <tr>
              <th className="px-5 py-4 font-semibold">Title</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-molonglo-ink">{blog.title}</p>
                    <p className="text-xs text-zinc-500">/{blog.slug}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${blog.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-4 text-zinc-600">{blog.publishedAt}</td>
                <td className="px-5 py-4 text-zinc-600">{blog.category}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/blogs/${blog.id}/edit`} className="rounded-md border border-zinc-300 px-3 py-2 font-semibold text-zinc-700">
                      Edit
                    </Link>
                    <Link href={`/admin/blogs/${blog.id}/edit?preview=1`} className="rounded-md border border-zinc-300 px-3 py-2 font-semibold text-zinc-700">
                      Preview
                    </Link>
                    <button
                      type="button"
                      disabled={pendingSlug === blog.id}
                      onClick={() => updateStatus(blog.id, !blog.published)}
                      className="rounded-md border border-zinc-300 px-3 py-2 font-semibold text-zinc-700 disabled:opacity-50"
                    >
                      {blog.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      disabled={pendingSlug === blog.id}
                      onClick={() => remove(blog.id)}
                      className="rounded-md border border-red-200 px-3 py-2 font-semibold text-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
