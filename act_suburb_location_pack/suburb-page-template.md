# Suburb Page Template

Use this structure for each `/builder-[suburb-slug]` page.

## Metadata

Title:
`Builder [Suburb] | Molonglo Construction Group`

Description:
Use the suburb's `metaDescription` from `act-suburbs.ts`.

## Page structure

1. Breadcrumbs
   - Home
   - Service Areas
   - Builder [Suburb]

2. Hero
   - Eyebrow: `[Region] builder`
   - H1: `Builder in [Suburb]`
   - Intro: use `introAngle`
   - CTA: Start a Build

3. Building in [Suburb]
   - Use `buildingContext`
   - Add 1–2 `localTalkingPoints`

4. Common project types in [Suburb]
   - Render `commonProjectTypes`
   - Link to `relevantServices`

5. Site and planning considerations
   - Use `blockConsiderations`
   - Use `planningConsiderations`
   - Avoid pretending to provide architectural/legal/planning advice.

6. Nearby suburbs
   - Render crawlable links to nearby suburb pages.

7. FAQs
   - Render suburb-specific FAQs from data.
   - Add FAQPage schema.

8. CTA
   - Heading: `ctaHeading`
   - Text: `ctaText`
   - Button: Contact / Start a Build

## Schema

Use:
- BreadcrumbList
- FAQPage
- Service schema if existing helpers support it safely
- LocalBusiness/HomeAndConstructionBusiness only if existing schema helper supports it safely

Do not render malformed JSON-LD.
