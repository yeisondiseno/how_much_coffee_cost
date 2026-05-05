# Implementation Patterns & Code Snippets

## OG Image — Add to generateMetadata
```ts
openGraph: {
  images: [
    {
      url: `${BASE_URL}/og-image.png`,  // 1200x630 static asset in /public
      width: 1200,
      height: 630,
      alt: t("metadataTitle"),
    },
  ],
},
twitter: {
  card: "summary_large_image",
  images: [`${BASE_URL}/og-image.png`],
},
```

## HowTo JSON-LD — Add to page.tsx alongside WebApplication
```ts
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: t("howToName"),  // "How to convert a price into coffees"
  description: t("metadataDescription"),
  step: [
    { "@type": "HowToStep", name: t("step1"), text: t("step1Text") },
    { "@type": "HowToStep", name: t("step2"), text: t("step2Text") },
    { "@type": "HowToStep", name: t("step3"), text: t("step3Text") },
  ],
};
```

## Web App Manifest — /public/manifest.webmanifest
```json
{
  "name": "CoffeeCalc",
  "short_name": "CoffeeCalc",
  "description": "Convert any price into cups of coffee",
  "start_url": "/en",
  "display": "standalone",
  "background_color": "#fff8f0",
  "theme_color": "#1b0e07",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```
Link in generateMetadata:
```ts
manifest: "/manifest.webmanifest",
```

## metadataDescription targets (all locales)
- EN (current): 151 chars — good
- ES (current): 78 chars — TOO SHORT, expand to ~150
- FR (current): 74 chars — TOO SHORT, expand to ~150
- DE (current): 62 chars — TOO SHORT, expand to ~150
- PT (current): 148 chars — good
- JA: need to verify char count

## H1 SSR Fix — Convert CoffeeCalcHero to Server Component
The H1 is currently in a "use client" component. Move the static heading parts
to a server wrapper; keep only the interactive calculator card as client.
CoffeeCalcHero only uses useTranslations + t.rich — both are available server-side
via getTranslations, so the component can be converted to an async server component.
