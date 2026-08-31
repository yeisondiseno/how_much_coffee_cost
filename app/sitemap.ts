import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/config";
import { LEGAL_PAGE_SLUGS } from "@/lib/legal-sections";

const buildAlternates = (pathSuffix: string) => ({
  languages: {
    ...Object.fromEntries(
      routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}${pathSuffix}`]),
    ),
    "x-default": `${BASE_URL}/${routing.defaultLocale}${pathSuffix}`,
  },
});

const sitemap = (): MetadataRoute.Sitemap => {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 1.0 : 0.8,
      alternates: buildAlternates(""),
    });

    for (const slug of LEGAL_PAGE_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: buildAlternates(`/${slug}`),
      });
    }

    entries.push({
      url: `${BASE_URL}/${locale}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: buildAlternates("/faq"),
    });
  }

  return entries;
};

export default sitemap;
