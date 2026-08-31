import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { loadFaqMessages } from "@/lib/faq/messages";
import { BASE_URL } from "@/lib/config";

const buildAlternates = (locale: string) => ({
  canonical: `${BASE_URL}/${locale}/faq`,
  languages: {
    "x-default": `${BASE_URL}/${routing.defaultLocale}/faq`,
    ...Object.fromEntries(
      routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}/faq`]),
    ),
  },
});

export const getFaqPageMetadata = async (locale: string): Promise<Metadata> => {
  const faq = await loadFaqMessages(locale);

  return {
    title: faq.metadataTitle,
    description: faq.metadataDescription,
    alternates: buildAlternates(locale),
  };
};
