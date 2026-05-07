# ACT Suburb Location Page Pack

This folder is a Codex-ready content pack for creating indexable, unique location pages for Molonglo Construction Group.

It includes:

- `act-suburbs.ts` — TypeScript data source for all suburb/location pages.
- `act-suburbs.json` — JSON version of the same data.
- `codex-integration-prompt.md` — prompt to give Codex so it can integrate this into the Next.js site.
- `suburb-page-template.md` — recommended layout for every generated suburb page.
- `service-areas-page-brief.md` — UX/content brief for the searchable service areas hub.
- `copy-quality-rules.md` — rules to avoid thin doorway pages.

## Coverage

Total location entries: **127**

Includes ACT suburbs/district locations plus requested surrounding areas:
Queanbeyan, Googong, Jerrabomberra, Batemans Bay, Narooma, Bega, Pambula and Merimbula.

## Important SEO rule

Do not publish these as thin pages where only the suburb name changes. Each page should use the structured fields in `act-suburbs.ts`:

- `region`
- `suburbType`
- `introAngle`
- `buildingContext`
- `blockConsiderations`
- `planningConsiderations`
- `localTalkingPoints`
- `nearbySuburbs`
- `faqs`

Codex should use these fields to produce meaningfully different pages.

## Suggested route structure

Use the existing Molonglo style:

```txt
/builder-denman-prospect
/builder-coombs
/builder-wright-act
/builder-ainslie
/builder-queanbeyan
```

## Source context

The suburb/district structure was based on public ACT suburb/district resources and should be treated as a starting point. Before publishing a commercial SEO campaign at scale, verify priority pages against current ACT planning and mapping sources.
