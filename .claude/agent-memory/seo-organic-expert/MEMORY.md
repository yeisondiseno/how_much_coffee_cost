# SEO Agent Memory — howmanycoffees.net

## Project Overview

- **Domain**: https://www.howmanycoffees.net
- **Type**: Single-page utility / coffee price calculator
- **Stack**: Next.js 16.2.4, React 19, TypeScript, next-intl 4.9.1, Tailwind CSS 4
- **Locales**: en (default), es, fr, pt, de, ja — all via `app/[locale]/` route
- **Monetization**: Google AdSense (pub-8195825937047934), slots 4872820829 and 2403493591

## File Map (key SEO files)

- `app/[locale]/layout.tsx` — generateMetadata, hreflang alternates, OG/Twitter, AdSense script
- `app/[locale]/page.tsx` — WebApplication JSON-LD structured data
- `app/sitemap.ts` — locale-per-URL sitemap with alternates/hreflang
- `app/robots.ts` — allows all, points to sitemap
- `app/not-found.tsx` — 404 page (outside [locale], self-provides NextIntlClientProvider)
- `lib/config.ts` — BASE_URL constant
- `lib/coffee-calc-data.ts` — coffee types, prices, 14 currencies
- `i18n/routing.ts` — defineRouting with locales array
- `public/messages/{en,es,fr,pt,de,ja}.json` — translation files
- `components/coffee-calc/coffee-calc-seo-block.tsx` — server-rendered H2 + paragraph
- `components/coffee-calc/coffee-calc-hero.tsx` — CLIENT component with H1 (SEO risk)
- `components/coffee-calc/coffee-calc-fonts.ts` — Playfair Display + DM Sans

## Confirmed Patterns Already Implemented

- `generateMetadata` (not `export const metadata`) used correctly in locale layout
- hreflang alternates in both layout metadata AND sitemap with x-default pointing to /en
- Twitter card: summary_large_image
- Open Graph: website type, locale-aware
- JSON-LD: WebApplication schema on page.tsx (server component)
- Google Search Console verification tag in metadata
- `setRequestLocale` called in both layout and page for static rendering
- `generateStaticParams` in layout for all locales
- `next/font/google` for all fonts (zero layout shift)
- `lang={locale}` on `<html>` element

## Known SEO Issues (from 2026-05-04 audit)

1. H1 is inside a "use client" component (CoffeeCalcHero) — LCP candidate rendered client-side
2. metadataTitle uses emoji prefix (☕) — strips ~3 chars from 50-60 char budget; some locales run short on description
3. No OG image / twitter:image defined — social cards will show no image
4. sitemap only covers root locale URLs, no sub-pages (only one page exists, so acceptable)
5. Emoji in metadataTitle rendered as text in SERP — non-standard, Google may strip
6. CoffeeCalcFunFact is client-rendered — fine for UX but fun facts not crawlable
7. seoText and seoTitle (H2) are server-rendered — good
8. Exchange rates are hardcoded — stale data risk flagged
9. No favicon beyond favicon.ico — no apple-touch-icon, no manifest.webmanifest
10. No `<meta name="theme-color">` — minor PWA/mobile signal
11. Japanese locale: font subset only "latin" — CJK characters may fall back to system font; not an SEO issue but UX/CWV risk
12. Three font families loaded in root layout (Figtree, Geist, Geist_Mono) that appear unused in coffee-calc components

## Keyword Strategy Decisions (recorded 2026-05-04)

- Primary EN: "coffee price calculator", "how many coffees", "convert price to coffee"
- Secondary EN: "espresso latte price calculator", "currency coffee converter"
- EN description is strong (151 chars); ES/FR/DE descriptions are short (under 100 chars) — expand them
- PT description is already expanded and mirrors EN quality

## Structured Data Already Present

- WebApplication schema on page.tsx with: name, description, url, applicationCategory, operatingSystem, inLanguage, offers (free)
- Missing: breadcrumb, FAQ, SiteLinksSearchBox (not applicable for single-page)
- Could add: HowTo schema explaining calculator steps

## Link to Detailed Notes

See `patterns.md` for implementation code snippets.
