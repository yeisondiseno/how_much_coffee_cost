import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { loadBlogMessages } from "@/lib/blog/messages";
import { isBlogPostSlug } from "@/lib/blog/posts";
import type { BlogPostSlug } from "@/lib/blog/types";
import { BASE_URL } from "@/lib/config";

const buildBlogAlternates = (pathSuffix: string, locale: string) => ({
  canonical: `${BASE_URL}/${locale}/blog${pathSuffix}`,
  languages: {
    "x-default": `${BASE_URL}/${routing.defaultLocale}/blog${pathSuffix}`,
    ...Object.fromEntries(
      routing.locales.map((loc) => [
        loc,
        `${BASE_URL}/${loc}/blog${pathSuffix}`,
      ]),
    ),
  },
});

export const getBlogIndexMetadata = async (locale: string): Promise<Metadata> => {
  const blog = await loadBlogMessages(locale);

  return {
    title: blog.metadataTitle,
    description: blog.metadataDescription,
    alternates: buildBlogAlternates("", locale),
  };
};

export const getBlogPostMetadata = async (
  locale: string,
  slug: string,
): Promise<Metadata | null> => {
  if (!isBlogPostSlug(slug)) return null;

  const blog = await loadBlogMessages(locale);
  const post = blog.posts[slug as BlogPostSlug];

  return {
    title: post.title,
    description: post.description,
    alternates: buildBlogAlternates(`/${slug}`, locale),
  };
};
