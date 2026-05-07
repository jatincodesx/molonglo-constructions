# Codex Integration Prompt: ACT Suburb Location Pages

You are Codex GPT-5.5 High acting as a senior Next.js production engineer, local SEO strategist and content systems architect.

Project:
`~/Documents/VSC/MologoloContructions`

Use this folder as the source content pack:
`act_suburb_location_pack`

## Branch workflow

Do not edit main directly.

Run:

```bash
git switch main
git pull origin main
git switch -c feature/act-suburb-location-seo
```

If uncommitted changes exist before branch creation, stop and report.

## Critical rules

- Do not touch env files.
- Do not commit `.env*`, `.next`, `.open-next`, `.DS_Store`, debug files or generated build output.
- Do not break admin/auth, Supabase, contact form, Cloudflare/OpenNext deployment, sitemap, robots, services, project pages or homepage.
- Do not create thin doorway pages.
- Use the provided suburb data to create meaningfully unique pages.
- Keep all links crawlable in server-rendered HTML.
- Preserve safe JSON-LD rendering. Do not reintroduce the previous `r["@context"].toLowerCase` crash.

## Files to copy into project

Copy:

```txt
act-suburbs.ts
```

into:

```txt
lib/act-suburbs.ts
```

Keep the markdown files as reference only. Do not commit this whole pack unless the project wants docs.

## Implementation tasks

### 1. Add static suburb pages

Create indexable pages for every entry in `actSuburbPages`.

Preferred URL format:

```txt
/builder-[slug]
```

Examples:

```txt
/builder-denman-prospect
/builder-coombs
/builder-wright-act
/builder-ainslie
/builder-queanbeyan
```

If the project already uses `app/[slug]/page.tsx` to serve dynamic pages, extend it carefully.
If a dedicated dynamic route is safer, use it, but preserve the preferred public URL format.

Every page must include:

- unique metadata title
- unique meta description
- one H1: `Builder in [Suburb]`
- intro using `introAngle`
- `Building in [Suburb]` section using `buildingContext`
- `Common project types in [Suburb]` section using `commonProjectTypes`
- `Site and planning considerations` using `blockConsiderations` and `planningConsiderations`
- nearby suburb links using `nearbySuburbs`
- service links using `relevantServices`
- FAQ section using `faqs`
- CTA using `ctaHeading` and `ctaText`
- BreadcrumbList schema
- FAQPage schema where possible
- Service schema if existing helpers support it safely

### 2. Create/update `/service-areas`

Use `service-areas-page-brief.md`.

The page must have:

- search box
- grouped suburb links by region
- crawlable links to every location page
- ACT and surrounds explanation
- selected South Coast section
- CTA
- FAQ section

Search is a UX enhancement only. Links must still render without JS.

### 3. Internal links

Update:

- Services dropdown "Canberra & ACT" to link to `/service-areas` or `/builder-canberra`
- Footer to include Service Areas and key pages
- Services page to link to `/service-areas`
- Homepage Where We Build section if present to link to `/service-areas`

Do not put all suburbs in the navbar.

### 4. Sitemap

Include every actual generated suburb page in `sitemap.xml`.

Do not include search-only states.

### 5. SEO/schema

Use existing metadata/schema helpers where possible.

Do not duplicate malformed schema.
Every JSON-LD item must have `@context` and `@type`.

### 6. Testing

Run:

```bash
npm run check:env:dev
npm run lint
npm run build
npm run build:cf
```

Check routes:

```txt
/service-areas
/builder-canberra
/builder-denman-prospect
/builder-coombs
/builder-wright-act
/builder-ainslie
/builder-griffith
/builder-gungahlin
/builder-queanbeyan
/builder-googong
/builder-jerrabomberra
/builder-batemans-bay
/sitemap.xml
/robots.txt
```

Run:

```bash
grep -R "Images open individually\|Project details are limited\|verified folder\|folder and location information\|placeholder\|dummy\|TODO\|Lorem\|coming soon\|sample" -n app components lib content public || true
```

Report any public-facing matches.

### 7. Commit

Commit message:

```txt
Add unique ACT suburb service area pages
```

Final report:
- branch name
- files changed
- number of suburb pages generated
- service areas search summary
- sitemap updates
- schema updates
- tests
- any assumptions
- confirm main untouched
