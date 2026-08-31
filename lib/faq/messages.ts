import { hasLocale } from "next-intl";
import type { FaqMessages } from "@/lib/faq/types";
import { routing } from "@/i18n/routing";

const SUPPORTED_FAQ_LOCALES = ["en", "es"] as const;

export const loadFaqMessages = async (locale: string): Promise<FaqMessages> => {
  const resolvedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const faqLocale = (SUPPORTED_FAQ_LOCALES as readonly string[]).includes(
    resolvedLocale,
  )
    ? resolvedLocale
    : routing.defaultLocale;

  return (await import(`../../public/messages/faq/${faqLocale}.json`))
    .default as FaqMessages;
};
