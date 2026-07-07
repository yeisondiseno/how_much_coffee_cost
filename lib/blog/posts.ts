import { BLOG_POST_SLUGS, type BlogPostSlug } from "@/lib/blog/types";

export { BLOG_POST_SLUGS };

export const isBlogPostSlug = (slug: string): slug is BlogPostSlug =>
  (BLOG_POST_SLUGS as readonly string[]).includes(slug);
