# Molonglo Construction Group

Full-stack Next.js App Router website for Molonglo Construction Group, prepared for deployment to Cloudflare Workers with the OpenNext Cloudflare adapter and Supabase-backed blog, lead, and SEO data.

## 1. Project Overview

- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Hosting target: Cloudflare Workers via `@opennextjs/cloudflare`
- Database: Supabase Postgres
- Content storage: Supabase tables for blogs, leads, SEO pages, and site settings
- Supabase project: `molonglo-constructions`
- Supabase project ID: `vloamtiochlgrvouafgm`

## 2. Local Setup

```bash
npm install
```

Step 1: create `.env.local` from `.env.example`.

```bash
cp .env.example .env.local
```

Fill `.env.local` with real values for:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_SECRET_KEY` if you use it
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET`

This repository does not commit real secrets. Put real values only in `.env.local` and Cloudflare Worker secrets.

## 3. Supabase CLI Workflow

Step 2: log in to the Supabase CLI.

```bash
npx supabase login
```

Step 3: link the remote project.

```bash
npm run db:link
```

Step 4: push the database schema.

```bash
npm run db:push
```

Step 5: generate TypeScript database types.

```bash
npm run db:types
```

Step 6: run the app.

```bash
npm run dev
```

If public pages show missing table warnings for `blogs` or `seo_pages`, run:

```bash
npm run db:link
npm run db:push
```

## 4. Supabase Migrations

The source of truth is:

- `supabase/config.toml`
- `supabase/migrations/0001_initial_schema.sql`
- `supabase/schema.sql`
- `supabase/policies.sql`
- `supabase/seed.sql`

The initial migration creates:

- `blogs`
- `leads`
- `seo_pages`
- `site_settings`
- `public.set_updated_at()`
- triggers, constraints, indexes, and RLS policies

## 5. Environment Variables

Required values in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://vloamtiochlgrvouafgm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_SECRET_KEY=...
ADMIN_EMAIL=...
ADMIN_PASSWORD_HASH=...
SESSION_SECRET=...
```

Notes:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are browser-safe.
- `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET` must stay secret.
- `.env.local` is gitignored and must not be committed.

Optional notification variables already used by the app:

- `LEAD_NOTIFY_WEBHOOK_URL`
- `RESEND_API_KEY`
- `LEAD_NOTIFY_EMAIL`
- `LEAD_NOTIFY_FROM`

## 6. Admin Password Hash Generation

Generate a Workers-compatible password hash:

```bash
node scripts/generate-admin-password-hash.mjs "your-strong-password"
```

The script outputs a `pbkdf2_sha256:...` value. Put that value into `ADMIN_PASSWORD_HASH`.

## 7. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 8. Cloudflare/OpenNext Build

```bash
npm run build
npm run build:cf
```

`build:cf` uses the OpenNext Cloudflare adapter and writes output to `.open-next/`.

## 9. Cloudflare Preview

Log in to Cloudflare first:

```bash
npx wrangler login
```

Preview locally in the Workers runtime:

```bash
npm run preview:cf
```

First hosted deployment will use a Cloudflare preview URL, not the live GoDaddy domain.

## 10. Cloudflare Deploy

```bash
npm run deploy:cf
```

The Worker name is `molonglo-constructions`.

## 11. Cloudflare Environment Variables / Secrets

Set public vars in the Cloudflare dashboard or as Worker vars, and set secrets with Wrangler:

```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put SUPABASE_SECRET_KEY
npx wrangler secret put ADMIN_PASSWORD_HASH
npx wrangler secret put SESSION_SECRET
```

Also configure:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAIL`

Cloudflare secrets must be configured outside Git-tracked files. Store sensitive values as Worker secrets, not plain text vars.

## 12. GitHub Deployment Flow

1. Push changes to GitHub.
2. Review build output locally with `npm run build` and `npm run build:cf`.
3. Deploy to Cloudflare from the chosen branch.
4. Keep GoDaddy DNS unchanged until preview approval is complete.

## 13. Client Preview Workflow

1. Deploy to the generated Cloudflare preview URL.
2. Verify core marketing pages, blog pages, lead capture, and admin login.
3. Share the preview URL with the client for review.
4. Only attach `preview.molongloconstructions.com.au` or production domains after sign-off.

## 14. Later Custom Domain Setup

Later target domains:

- `preview.molongloconstructions.com.au`
- `molongloconstructions.com.au`
- `www.molongloconstructions.com.au`

Do not change GoDaddy DNS until preview deployment is approved.

## 15. Rollback Plan

1. Leave the current GoDaddy/cPanel site live until Cloudflare preview is approved.
2. When production cutover happens, keep the old hosting available during DNS propagation.
3. If the new Worker deployment has issues, point traffic back to the existing live site until fixed.

## 16. Security Notes

- No real Supabase keys should be committed.
- The admin session cookie is signed with `SESSION_SECRET`.
- Admin password verification uses a Web Crypto compatible PBKDF2 hash.
- The Supabase admin client is isolated in `lib/supabase/admin.ts` with `server-only`.
- Public blog reads use the anon key and RLS.
- Public lead creation uses RLS insert access only.

## Commands

```bash
npm install
npm run db:link
npm run db:push
npm run db:types
npm run dev
npm run build
npm run build:cf
npm run preview:cf
npm run deploy:cf
```
