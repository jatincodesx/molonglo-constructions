"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { blogCategories } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import type { BlogPost } from "@/lib/blog";
import { slugify } from "@/lib/utils";

type BlogEditorClientProps = {
  mode: "create" | "edit";
  blog?: BlogPost;
  previewMode?: boolean;
};

export function BlogEditorClient({ mode, blog, previewMode = false }: BlogEditorClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState(blog?.title || "");
  const [slug, setSlug] = useState(blog?.slug || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [metaTitle, setMetaTitle] = useState(blog?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(blog?.metaDescription || "");
  const [publishedAt, setPublishedAt] = useState(blog?.publishedAt || new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState(blog?.author || "Molonglo Construction Group");
  const [category, setCategory] = useState(blog?.category || blogCategories[0]);
  const [tags, setTags] = useState(blog?.tags.join(", ") || "");
  const [featuredImage, setFeaturedImage] = useState(blog?.featuredImage || "/assets/images/blog/sustainable-building.jpg");
  const [content, setContent] = useState(blog?.content || "");
  const [published, setPublished] = useState(blog?.published || false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug && title) {
      setSlug(slugify(title));
    }
    if (!metaTitle && title) {
      setMetaTitle(`${title} | Molonglo Construction Group`);
    }
  }, [title, slug, metaTitle]);

  async function save(nextPublished: boolean) {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      setMessage("Title, slug and content are required.");
      return;
    }

    setSaving(true);
    setMessage("");

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      metaTitle: metaTitle.trim() || `${title.trim()} | Molonglo Construction Group`,
      metaDescription: metaDescription.trim(),
      published: nextPublished,
      publishedAt,
      author: author.trim() || "Molonglo Construction Group",
      category,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      featuredImage: featuredImage.trim() || "/assets/images/blog/sustainable-building.jpg",
      content
    };

    const endpoint = mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${blog?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(endpoint, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error || "Unable to save the blog.");
      return;
    }

    setPublished(nextPublished);
    setMessage(nextPublished ? "Blog published." : "Draft saved.");
    router.push(`/admin/blogs/${data.blog.id}/edit`);
    router.refresh();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Blog Details</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">
              {mode === "create" ? "Write a new blog" : "Edit blog"}
            </h2>
          </div>

          <div className="grid gap-4">
            <Field label="Title">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} required />
            </Field>
            <Field label="Slug">
              <Input value={slug} onChange={(event) => setSlug(slugify(event.target.value))} required />
            </Field>
            <Field label="Excerpt">
              <Textarea rows={4} value={excerpt} onChange={(event) => setExcerpt(event.target.value)} />
            </Field>
            <Field label="Meta Title">
              <Input value={metaTitle} onChange={(event) => setMetaTitle(event.target.value)} />
            </Field>
            <Field label="Meta Description">
              <Textarea rows={4} value={metaDescription} onChange={(event) => setMetaDescription(event.target.value)} />
            </Field>
            <Field label="Publish Date">
              <Input type="date" value={publishedAt} onChange={(event) => setPublishedAt(event.target.value)} />
            </Field>
            <Field label="Author">
              <Input value={author} onChange={(event) => setAuthor(event.target.value)} />
            </Field>
            <Field label="Category">
              <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                {blogCategories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            </Field>
            <Field label="Tags">
              <Input value={tags} onChange={(event) => setTags(event.target.value)} />
            </Field>
            <Field label="Featured Image">
              <Input value={featuredImage} onChange={(event) => setFeaturedImage(event.target.value)} />
            </Field>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" disabled={saving} onClick={() => save(false)}>
              {saving ? "Saving..." : "Save Draft"}
            </Button>
            <Button type="button" disabled={saving} onClick={() => save(true)}>
              {published ? "Update Published Blog" : "Publish Blog"}
            </Button>
          </div>
          {message ? <p className="mt-4 text-sm font-semibold text-molonglo-gold">{message}</p> : null}
          {!metaDescription.trim() ? <p className="mt-3 text-sm text-zinc-600">Recommendation: add a meta description for stronger search snippets.</p> : null}
          {!metaTitle.trim() ? <p className="mt-2 text-sm text-zinc-600">Recommendation: add a meta title before publishing.</p> : null}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-molonglo-gold">Editor</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Content and preview</h2>
          </div>
          {previewMode ? <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">Preview mode</span> : null}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="grid gap-3">
            <Field label="Markdown Content">
              <Textarea rows={28} value={content} onChange={(event) => setContent(event.target.value)} required />
            </Field>
          </div>

          <div className="rounded-[1.25rem] border border-zinc-200 bg-[#f6f3ee] p-6">
            <p className="text-sm font-semibold text-zinc-500">Live preview</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-molonglo-ink">
              {title || "Untitled blog"}
            </h3>
            <p className="mt-4 text-sm leading-7 text-zinc-600">{excerpt || "Add an excerpt to describe the article for readers and search results."}</p>
            <div className="prose-seo mt-8" dangerouslySetInnerHTML={{ __html: markdownToHtml(content || "Start writing your blog content here.") }} />
          </div>
        </div>
      </div>
    </div>
  );
}
