import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { deleteBlog, getBlogById, updateBlog } from "@/lib/blog";

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug: id } = await params;
  try {
    const existing = await getBlogById(id);
    if (!existing) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const blog = await updateBlog(id, {
      title: String(body.title || existing.title),
      slug: String(body.slug || existing.slug),
      excerpt: String(body.excerpt ?? existing.excerpt),
      metaTitle: String(body.metaTitle ?? existing.metaTitle),
      metaDescription: String(body.metaDescription ?? existing.metaDescription),
      published: typeof body.published === "boolean" ? body.published : existing.published,
      publishedAt: String(body.publishedAt || existing.publishedAt),
      author: String(body.author || existing.author),
      category: String(body.category || existing.category),
      tags: Array.isArray(body.tags) ? body.tags.map((tag: unknown) => String(tag)) : existing.tags,
      featuredImage: String(body.featuredImage || existing.featuredImage),
      content: String(body.content || existing.content)
    });

    return NextResponse.json({ ok: true, blog });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update blog." },
      { status: 400 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug: id } = await params;

  try {
    await deleteBlog(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete blog." },
      { status: 400 }
    );
  }
}
