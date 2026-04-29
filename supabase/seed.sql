insert into public.blogs (
  title,
  slug,
  excerpt,
  content,
  meta_title,
  meta_description,
  featured_image_url,
  category,
  tags,
  author,
  status,
  published,
  published_at
)
values (
  'Cost to Build a House in Canberra',
  'cost-to-build-a-house-in-canberra',
  'Starter draft covering the main cost drivers Canberra homeowners should evaluate before committing to a build budget.',
  '# Cost to Build a House in Canberra

This starter draft gives the admin team a private blog entry they can expand after the database is linked and migrated.

## What affects build cost

- Block conditions and slope
- Home size and inclusions
- Planning, approvals and consultant scope
- Builder availability and programme timing

## Next step

Use the admin area to refine this draft, add local examples, and publish it when it is ready.',
  'Cost to Build a House in Canberra | Molonglo Construction Group',
  'Starter draft article for Canberra homeowners planning a realistic build budget.',
  '/assets/images/blog/sustainable-building.jpg',
  'Building Costs',
  array['Canberra', 'Building Costs'],
  'Molonglo Construction Group',
  'draft',
  false,
  null
)
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  featured_image_url = excluded.featured_image_url,
  category = excluded.category,
  tags = excluded.tags,
  author = excluded.author,
  status = excluded.status,
  published = excluded.published,
  published_at = excluded.published_at;

insert into public.seo_pages (path, title, meta_description, canonical_url, noindex)
values
  ('/', 'Home Builders Canberra | Molonglo Construction Group', 'Canberra builder for custom homes, knockdown rebuilds, new homes and residential construction with a refined process and local expertise.', 'https://molongloconstructions.com.au/', false),
  ('/about', 'About Molonglo Construction Group | Canberra Builder', 'Learn about Molonglo Construction Group, a Canberra-focused builder delivering custom homes and residential construction with a refined process.', 'https://molongloconstructions.com.au/about', false),
  ('/contact', 'Contact Molonglo Construction Group | Canberra', 'Contact Molonglo Construction Group for custom homes, rebuilds, renovations and residential construction enquiries in Canberra.', 'https://molongloconstructions.com.au/contact', false),
  ('/blog', 'Canberra Building Blog | Molonglo Construction Group', 'Helpful Canberra building articles on costs, custom homes, knockdown rebuilds, design planning and choosing the right builder.', 'https://molongloconstructions.com.au/blog', false),
  ('/custom-home-builders-canberra', 'Custom Home Builders Canberra | Molonglo Construction Group', 'Custom home builder guidance for Canberra homeowners planning a tailored residential build.', 'https://molongloconstructions.com.au/custom-home-builders-canberra', false),
  ('/knockdown-rebuild-canberra', 'Knockdown Rebuild Canberra | Molonglo Construction Group', 'Knockdown rebuild guidance for Canberra homeowners comparing rebuild scope, approvals and sequencing.', 'https://molongloconstructions.com.au/knockdown-rebuild-canberra', false),
  ('/construction-services-canberra', 'Construction Services Canberra | Molonglo Construction Group', 'Residential construction services in Canberra covering new homes, rebuilds and selected project pathways.', 'https://molongloconstructions.com.au/construction-services-canberra', false),
  ('/builder-canberra', 'Builder Canberra | Molonglo Construction Group', 'Local Canberra builder insights for homeowners comparing project pathways and builder fit.', 'https://molongloconstructions.com.au/builder-canberra', false),
  ('/builder-denman-prospect', 'Builder Denman Prospect | Molonglo Construction Group', 'Local builder guidance for Denman Prospect projects, site considerations and next steps.', 'https://molongloconstructions.com.au/builder-denman-prospect', false),
  ('/builder-wright-act', 'Builder Wright ACT | Molonglo Construction Group', 'Residential builder guidance for Wright, ACT projects and planning priorities.', 'https://molongloconstructions.com.au/builder-wright-act', false),
  ('/builder-coombs-act', 'Builder Coombs ACT | Molonglo Construction Group', 'Residential builder guidance for Coombs, ACT homeowners planning a new home or rebuild.', 'https://molongloconstructions.com.au/builder-coombs-act', false),
  ('/builder-molonglo-valley', 'Builder Molonglo Valley | Molonglo Construction Group', 'Molonglo Valley builder guidance for homeowners planning custom homes and residential construction.', 'https://molongloconstructions.com.au/builder-molonglo-valley', false)
on conflict (path) do update
set
  title = excluded.title,
  meta_description = excluded.meta_description,
  canonical_url = excluded.canonical_url,
  noindex = excluded.noindex;
