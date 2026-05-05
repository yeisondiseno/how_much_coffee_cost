import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/config";

const sitemap = (): MetadataRoute.Sitemap =>
  routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1.0 : 0.8,
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}`]),
        ),
        "x-default": BASE_URL,
      },
    },
  }));

export default sitemap;
