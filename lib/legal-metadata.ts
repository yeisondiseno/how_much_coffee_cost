import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/config";
import {
  LEGAL_PAGE_NAMESPACE,
  type LegalPageSlug,
} from "@/lib/legal-sections";

const buildAlternates = (slug: LegalPageSlug, locale: string) => ({
  canonical: `${BASE_URL}/${locale}/${slug}`,
  languages: {
    "x-default": `${BASE_URL}/${routing.defaultLocale}/${slug}`,
    ...Object.fromEntries(
      routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}/${slug}`]),
    ),
  },
});

export const getLegalPageMetadata = async (
  locale: string,
  slug: LegalPageSlug,
): Promise<Metadata> => {
  const namespace = LEGAL_PAGE_NAMESPACE[slug];
  const t = await getTranslations({ locale, namespace: "Legal" });

  return {
    title: t(`${namespace}.metadataTitle`),
    description: t(`${namespace}.metadataDescription`),
    alternates: buildAlternates(slug, locale),
  };
};
