create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  excerpt text,
  content text not null,
  meta_title text,
  meta_description text,
  featured_image_url text,
  category text,
  tags text[] not null default '{}'::text[],
  author text,
  status text not null default 'draft',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blogs_slug_idx unique (slug),
  constraint blogs_status_check check (status in ('draft', 'published'))
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  suburb text,
  project_type text,
  message text,
  status text not null default 'new',
  source_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_status_check check (status in ('new', 'contacted', 'archived'))
);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  title text,
  meta_description text,
  canonical_url text,
  noindex boolean not null default false,
  structured_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint seo_pages_path_idx unique (path)
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  value jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_settings_key_idx unique (key)
);

create index if not exists blogs_published_idx on public.blogs (published, status);
create index if not exists blogs_created_at_idx on public.blogs (created_at desc);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
before update on public.blogs
for each row
execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

drop trigger if exists seo_pages_set_updated_at on public.seo_pages;
create trigger seo_pages_set_updated_at
before update on public.seo_pages
for each row
execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.blogs enable row level security;
alter table public.leads enable row level security;
alter table public.seo_pages enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "public_can_read_published_blogs" on public.blogs;
create policy "public_can_read_published_blogs"
on public.blogs
for select
to anon, authenticated
using (published = true and status = 'published');

drop policy if exists "public_can_insert_leads" on public.leads;
create policy "public_can_insert_leads"
on public.leads
for insert
to anon, authenticated
with check (true);

drop policy if exists "public_can_read_indexable_seo_pages" on public.seo_pages;
create policy "public_can_read_indexable_seo_pages"
on public.seo_pages
for select
to anon, authenticated
using (noindex = false);

-- Supabase service_role bypasses RLS, so no explicit management policies are required
-- for server-side admin clients that use the service role key.
