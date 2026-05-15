# Molonglo Construction Group

Full-stack Next.js App Router website for Molonglo Construction Group, prepared for deployment to Cloudflare Workers with the OpenNext Cloudflare adapter and Supabase-backed blog, lead, and SEO data.

## 1. Project Overview

- More Photos at https://cafe.batch.media/delivery/xpszkXO-2MQT
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

Step 1: create `.env.development.local` from `.env.example`.

```bash
cp .env.example .env.development.local
```

Fill `.env.development.local` with real values for:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_SECRET_KEY` if you use it
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` for local development, or `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET`, or `ADMIN_JWT_SECRET` for local development fallback

This repository does not commit real secrets. Put real local values only in ignored env files and Cloudflare Worker secrets.

For local development only, admin login can fall back to `ADMIN_PASSWORD` when `ADMIN_PASSWORD_HASH` is not set, and `ADMIN_JWT_SECRET` when `SESSION_SECRET` is not set. Production must use `ADMIN_PASSWORD_HASH` and `SESSION_SECRET`; do not configure plain `ADMIN_PASSWORD` in production.

## 3. Environment Setup: Local vs Cloudflare

### Local dev

Use `.env.development.local` for local development values. `ADMIN_PASSWORD` is allowed only here.

```bash
npm run check:env:dev
npm run dev
```

### Manual Cloudflare deploy

Do not set `ADMIN_PASSWORD` in any production or deploy env file. Use `ADMIN_PASSWORD_HASH` and `SESSION_SECRET`.

If local production build values are needed, put them in `.env.production.local`. Keep `ADMIN_PASSWORD` out of that file.

```bash
npm run check:env:deploy
npm run deploy:cf
```

`deploy:cf` runs the deploy env check before building and deploying. Do not deploy if the check fails.

Cloudflare Worker secrets required:

- `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_SECRET_KEY`

Cloudflare Worker secret optional/fallback:

- `ADMIN_JWT_SECRET`

Cloudflare Worker vars:

- `ADMIN_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### GitHub auto deploy

The workflow in `.github/workflows/deploy-cloudflare.yml` deploys pushes to `main` and can also be run manually.

Add these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Do not put app secrets in GitHub Actions. Cloudflare Worker secrets remain configured in the Cloudflare dashboard or with Wrangler.

## 4. Supabase CLI Workflow

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

## 5. Supabase Migrations

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

## 6. Environment Variables

Required local values in `.env.development.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://vloamtiochlgrvouafgm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_SECRET_KEY=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
ADMIN_PASSWORD_HASH=... # optional when ADMIN_PASSWORD is set locally
SESSION_SECRET=... # or ADMIN_JWT_SECRET locally
ADMIN_JWT_SECRET=... # legacy local fallback only
```

Notes:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are browser-safe.
- `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `ADMIN_PASSWORD`, and `ADMIN_JWT_SECRET` must stay secret.
- `.env.local`, `.env.development.local`, and `.env.production.local` are gitignored and must not be committed.

Optional future contact email placeholders. The contact form stores leads in Supabase and does not require email sending:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## 7. Admin Password Hash Generation

Generate a bcrypt password hash with the same library used by the login route:

```bash
node scripts/hash-password.mjs "Admin12345!"
```

Copy the local env output line into `.env.development.local` or `.env.production.local`. Keep the single quotes and escaped dollar signs so Next dotenv loading does not expand the hash:

```bash
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH='\$2b\$12\$...'
SESSION_SECRET=<long-random-secret>
```

For a Cloudflare secret, paste only the raw hash value:

```text
$2b$12$...
```

Then sign in at `/admin/login` with:

```text
Email = ADMIN_EMAIL
Password = Admin12345!
```

Do not type the hash into the login form. The hash belongs only in `ADMIN_PASSWORD_HASH`.

For quick local testing, you may instead set `ADMIN_PASSWORD=<plain-local-password>` without `ADMIN_PASSWORD_HASH`. This fallback is ignored in production and must never be committed.

## 8. Local Development

```bash
npm run check:env:dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 9. Cloudflare/OpenNext Build

```bash
npm run build
npm run build:cf
```

`build:cf` uses the OpenNext Cloudflare adapter and writes output to `.open-next/`.

## Public UI Notes

The public marketing UI should remain calm, crawlable, and usable without JavaScript. Advanced text measurement experiments such as Pretext may be explored later for editorial text-wrapping tests, but they are not part of the production homepage approach.

## 10. Cloudflare Preview

Log in to Cloudflare first:

```bash
npx wrangler login
```

Preview locally in the Workers runtime:

```bash
npm run preview:cf
```

First hosted deployment will use a Cloudflare preview URL, not the live GoDaddy domain.

## 11. Cloudflare Deploy

```bash
npm run check:env:deploy
npm run deploy:cf
```

The Worker name is `molonglo-constructions`. Never set `ADMIN_PASSWORD` for Cloudflare production; use `ADMIN_PASSWORD_HASH` and `SESSION_SECRET`.

## 12. Cloudflare Environment Variables / Secrets

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
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `ADMIN_EMAIL`

Cloudflare secrets must be configured outside Git-tracked files. Store sensitive values as Worker secrets, not plain text vars.

## 13. GitHub Deployment Flow

1. Add GitHub repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
2. Keep application secrets configured in Cloudflare Worker settings, not GitHub.
3. Push to `main` to trigger the Cloudflare deployment workflow.
4. Keep GoDaddy DNS unchanged until preview approval is complete.

## 14. Client Preview Workflow

1. Deploy to the generated Cloudflare preview URL.
2. Verify core marketing pages, blog pages, lead capture, and admin login.
3. Share the preview URL with the client for review.
4. Only attach `preview.molongloconstructions.com.au` or production domains after sign-off.

## 15. Later Custom Domain Setup

Later target domains:

- `preview.molongloconstructions.com.au`
- `molongloconstructions.com.au`
- `www.molongloconstructions.com.au`

Do not change GoDaddy DNS until preview deployment is approved.

## 16. Rollback Plan

1. Leave the current GoDaddy/cPanel site live until Cloudflare preview is approved.
2. When production cutover happens, keep the old hosting available during DNS propagation.
3. If the new Worker deployment has issues, point traffic back to the existing live site until fixed.

## 17. Security Notes

- No real Supabase keys should be committed.
- The admin session cookie is signed with `SESSION_SECRET`.
- Admin password verification uses a bcrypt hash generated by `bcryptjs`.
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
