# SEO / AdSense — CoffeeCalc (howmanycoffees.net)

## Stack

- Next.js App Router + next-intl (9 locales: en, es, fr, pt, de, ja, it, ko, pl)
- SEO: `generateMetadata` in `app/[locale]/layout.tsx`, JSON-LD in `app/[locale]/page.tsx`
- Sitemap: only locale home URLs (`app/sitemap.ts`)

## AdSense blockers (audited 2026-06)

1. ~~**No legal/trust pages**~~ — privacy, terms, about, contact implemented (no public email)
2. **Thin content** — single-page tool; legal pages add depth but blog content still needed
3. **Consent gates AdSense script** — `consent-third-parties.tsx` loads ads only after accept
4. ~~**No privacy link in cookie banner**~~ — fixed

## Legal pages (implemented 2026-06)

- Routes: `/[locale]/privacy`, `/[locale]/terms`, `/[locale]/about`, `/[locale]/contact`
- Components: `legal-page-shell.tsx`, `legal-content.tsx`
- Translations: `Legal` namespace in all 9 locales (+ source files in `public/messages/legal/`)
- Footer links + consent banner privacy link
- Sitemap: 36 legal URLs (3 pages × 9 locales) + 9 home URLs

## Implemented SEO assets

- FAQPage + WebApplication + Organization JSON-LD
- robots.txt + sitemap.xml
- Google Search Console verification in metadata
- Consent Mode v2 defaults (denied until accept)

## Details

See `patterns.md` for code snippets (HowTo JSON-LD, manifest, meta descriptions).
