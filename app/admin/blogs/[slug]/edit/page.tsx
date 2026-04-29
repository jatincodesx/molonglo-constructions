import { DatabaseSetupNotice } from "@/components/admin/DatabaseSetupNotice";
import { notFound } from "next/navigation";
import { BlogEditorClient } from "@/components/admin/BlogEditorClient";
import { requireAdminSession } from "@/lib/admin-auth";
import { getBlogById } from "@/lib/blog";
import { DatabaseSetupError } from "@/lib/supabase/errors";

export default async function AdminEditBlogPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  await requireAdminSession();
  const { slug: id } = await params;
  const query = await searchParams;
  let blog = null;

  try {
    blog = await getBlogById(id);
  } catch (error) {
    if (error instanceof DatabaseSetupError) {
      return (
        <div className="grid gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Edit Blog</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Edit blog post</h1>
          </div>
          <DatabaseSetupNotice />
        </div>
      );
    }

    throw error;
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Edit Blog</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Edit blog post</h1>
      </div>
      <BlogEditorClient mode="edit" blog={blog} previewMode={query.preview === "1"} />
    </div>
  );
}
