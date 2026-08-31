# SEO / AdSense — CoffeeCalc (howmanycoffees.net)

## Stack

- Next.js App Router + next-intl (9 locales: en, es, fr, pt, de, ja, it, ko, pl)
- SEO: `generateMetadata` in `app/[locale]/layout.tsx`, JSON-LD in `app/[locale]/page.tsx`
- Sitemap: only locale home URLs (`app/sitemap.ts`)

## AdSense blockers (updated 2026-07)

1. ~~**No legal/trust pages**~~ — privacy, terms, about, contact implemented
2. ~~**Thin content**~~ — home expanded (~800+ words), blog with 5 articles (9 locales)
3. ~~**No real contact channel**~~ — contact@howmanycoffees.net added
4. **Consent gates AdSense script** — `consent-third-parties.tsx` loads ads only after accept
5. ~~**No privacy link in cookie banner**~~ — fixed
6. ~~**Ad slots visible pre-approval**~~ — hidden via `NEXT_PUBLIC_SHOW_ADS=false` (default)

**Remediation plan:** `specs/adsense-remediation-plan.md` — Phases A–E implemented in code (Jul 2026)

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
