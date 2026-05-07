# Service Areas Page Brief

Create or enhance `/service-areas`.

## Purpose

This page should be a crawlable, user-friendly hub for where Molonglo Construction Group builds.

## UX requirements

- H1: `Canberra & ACT Building Service Areas`
- Intro about Canberra, ACT, surrounds and selected South Coast availability.
- Search box for suburb/location.
- Grouped region sections.
- Crawlable links to every suburb/location page.
- CTA for users who cannot find their exact suburb.
- FAQ section.

## Search behaviour

- Search filters suburb cards client-side.
- Every suburb link must still exist in server-rendered HTML.
- If no result, show:
  `If your suburb is not listed, contact us — we can confirm whether your site is within our service area.`

## Suggested regions

Use `actSuburbRegions` from `act-suburbs.ts`.

## Avoid clutter

Use:
- Search
- Region accordion/grouping
- Popular links
- Clean cards

Do not put all suburbs in the navbar.
