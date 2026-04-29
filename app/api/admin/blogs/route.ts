import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { createBlog } from "@/lib/blog";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  try {
    const blog = await createBlog({
      title: String(body.title || ""),
      slug: String(body.slug || ""),
      excerpt: String(body.excerpt || ""),
      metaTitle: String(body.metaTitle || ""),
      metaDescription: String(body.metaDescription || ""),
      published: body.published === true,
      publishedAt: String(body.publishedAt || new Date().toISOString().slice(0, 10)),
      author: String(body.author || "Molonglo Construction Group"),
      category: String(body.category || "Canberra Building Guides"),
      tags: Array.isArray(body.tags) ? body.tags.map((tag: unknown) => String(tag)) : [],
      featuredImage: String(body.featuredImage || "/assets/images/blog/sustainable-building.jpg"),
      content: String(body.content || "")
    });

    return NextResponse.json({ ok: true, blog });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create blog." },
      { status: 400 }
    );
  }
}
