import { hasLocale } from "next-intl";
import type { BlogMessages } from "@/lib/blog/types";
import { routing } from "@/i18n/routing";

export const loadBlogMessages = async (locale: string): Promise<BlogMessages> => {
  const resolvedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return (await import(`../../public/messages/blog/${resolvedLocale}.json`))
    .default as BlogMessages;
};
