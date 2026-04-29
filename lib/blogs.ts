import { markdownToHtml } from "@/lib/markdown";
import {
  DatabaseSetupError,
  isMissingSupabaseTableError,
  logMissingSupabaseTableWarning,
  type SupabaseErrorLike
} from "@/lib/supabase/errors";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export type BlogCategory =
  | "Building Costs"
  | "Custom Homes"
  | "Knockdown Rebuilds"
  | "Canberra Building Guides"
  | "Design & Planning"
  | "Approvals & Process";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  category: BlogCategory | string;
  tags: string[];
  featuredImage: string;
  status: "draft" | "published";
  content: string;
  faqs: { question: string; answer: string }[];
};

export type BlogInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
  publishedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  content: string;
};

type BlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  author: string | null;
  status: "draft" | "published";
  published: boolean;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

const DEFAULT_AUTHOR = "Molonglo Construction Group";
const DEFAULT_CATEGORY = "Canberra Building Guides";
const DEFAULT_IMAGE = "/assets/images/blog/sustainable-building.jpg";

function mapBlog(row: BlogRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    metaTitle: row.meta_title || `${row.title} | Molonglo Construction Group`,
    metaDescription: row.meta_description || row.excerpt || "",
    published: row.published,
    publishedAt: row.published_at || row.created_at || new Date().toISOString(),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || row.created_at || new Date().toISOString(),
    author: row.author || DEFAULT_AUTHOR,
    category: row.category || DEFAULT_CATEGORY,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featuredImage: row.featured_image_url || DEFAULT_IMAGE,
    status: row.status,
    content: row.content,
    faqs: []
  };
}

function normalizeBlogInput(input: BlogInput) {
  const title = input.title.trim();
  const content = input.content.trim();
  const slug = slugify(input.slug?.trim() || title);

  if (!title) {
    throw new Error("Blog title is required.");
  }

  if (!content) {
    throw new Error("Blog content is required.");
  }

  if (!slug) {
    throw new Error("Blog slug is required.");
  }

  const published = input.published === true;
  const now = new Date().toISOString();
  const publishedAt = input.publishedAt?.trim() || now;

  return {
    title,
    slug,
    excerpt: input.excerpt?.trim() || "",
    meta_title: input.metaTitle?.trim() || `${title} | Molonglo Construction Group`,
    meta_description: input.metaDescription?.trim() || "",
    featured_image_url: input.featuredImage?.trim() || DEFAULT_IMAGE,
    category: input.category?.trim() || DEFAULT_CATEGORY,
    tags: (input.tags || []).map((tag) => tag.trim()).filter(Boolean),
    author: input.author?.trim() || DEFAULT_AUTHOR,
    status: published ? "published" : "draft",
    published,
    published_at: published ? publishedAt : null,
    content
  };
}

function throwIfSupabaseError(
  error: SupabaseErrorLike | null,
  options: {
    action: string;
    allowMissingTable?: boolean;
  }
) {
  if (!error) {
    return false;
  }

  if (isMissingSupabaseTableError(error, "blogs")) {
    if (options.allowMissingTable) {
      logMissingSupabaseTableWarning({
        action: options.action,
        error,
        table: "blogs"
      });

      return true;
    }

    throw new DatabaseSetupError("blogs");
  }

  if (error.code === "23505") {
    throw new Error("A blog with this slug already exists.");
  }

  throw new Error(error.message || "Supabase request failed.");
}

export async function getPublishedBlogs() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .order("updated_at", { ascending: false });

  if (throwIfSupabaseError(error, { action: "fetching published blogs", allowMissingTable: true })) {
    return [];
  }

  return (data || []).map((row) => mapBlog(row as BlogRow));
}

export async function getAllBlogsForAdmin() {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false });

  throwIfSupabaseError(error, { action: "fetching admin blogs" });
  return (data || []).map((row) => mapBlog(row as BlogRow));
}

export async function getBlogBySlug(slug: string, options: { includeDrafts?: boolean } = {}) {
  const supabase = options.includeDrafts ? createAdminSupabaseClient() : createServerSupabaseClient();
  let query = supabase.from("blogs").select("*").eq("slug", slug).limit(1);

  if (!options.includeDrafts) {
    query = query.eq("published", true).eq("status", "published");
  }

  const { data, error } = await query.maybeSingle();
  if (
    throwIfSupabaseError(error, {
      action: `fetching blog "${slug}"`,
      allowMissingTable: !options.includeDrafts
    })
  ) {
    return null;
  }

  return data ? mapBlog(data as BlogRow) : null;
}

export async function getBlogById(id: string) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("blogs").select("*").eq("id", id).limit(1).maybeSingle();

  throwIfSupabaseError(error, { action: `fetching admin blog "${id}"` });
  return data ? mapBlog(data as BlogRow) : null;
}

export async function createBlog(input: BlogInput) {
  const supabase = createAdminSupabaseClient();
  const payload = normalizeBlogInput(input);
  const { data, error } = await supabase.from("blogs").insert(payload).select("*").single();

  throwIfSupabaseError(error, { action: "creating a blog" });
  return mapBlog(data as BlogRow);
}

export async function updateBlog(id: string, input: BlogInput) {
  const supabase = createAdminSupabaseClient();
  const payload = normalizeBlogInput(input);
  const { data, error } = await supabase.from("blogs").update(payload).eq("id", id).select("*").single();

  throwIfSupabaseError(error, { action: `updating blog "${id}"` });
  return mapBlog(data as BlogRow);
}

export async function deleteBlog(id: string) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  throwIfSupabaseError(error, { action: `deleting blog "${id}"` });
}

export async function publishBlog(id: string) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("blogs")
    .update({
      published: true,
      status: "published",
      published_at: new Date().toISOString()
    })
    .eq("id", id)
    .select("*")
    .single();

  throwIfSupabaseError(error, { action: `publishing blog "${id}"` });
  return mapBlog(data as BlogRow);
}

export async function unpublishBlog(id: string) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("blogs")
    .update({
      published: false,
      status: "draft",
      published_at: null
    })
    .eq("id", id)
    .select("*")
    .single();

  throwIfSupabaseError(error, { action: `unpublishing blog "${id}"` });
  return mapBlog(data as BlogRow);
}

export { markdownToHtml };
