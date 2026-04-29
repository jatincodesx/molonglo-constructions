import { DatabaseSetupNotice } from "@/components/admin/DatabaseSetupNotice";
import { BlogEditorClient } from "@/components/admin/BlogEditorClient";
import { requireAdminSession } from "@/lib/admin-auth";
import { getAllBlogs } from "@/lib/blog";
import { blogSeedIdeas } from "@/lib/content";
import { DatabaseSetupError } from "@/lib/supabase/errors";

export default async function AdminNewBlogPage() {
  await requireAdminSession();
  let setupRequired = false;

  try {
    await getAllBlogs();
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Write Blog</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-molonglo-ink">Create a new manual blog post</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">
          Write original articles for the public blog. Drafts stay private until you publish them.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Content Plan</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Starter topic ideas</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {blogSeedIdeas.map((idea) => (
            <div key={idea.title} className="rounded-xl border border-zinc-200 p-4">
              <p className="font-semibold text-molonglo-ink">{idea.title}</p>
              <p className="mt-1 text-sm text-zinc-600">{idea.category}</p>
            </div>
          ))}
        </div>
      </div>

      {setupRequired ? <DatabaseSetupNotice /> : <BlogEditorClient mode="create" previewMode={false} />}
    </div>
  );
}
