export const BLOG_POST_SLUGS = [
  "coffee-prices-by-country",
  "monthly-coffee-budget",
  "drink-price-guide",
  "coffee-rule-explained",
  "why-coffee-as-unit",
] as const;

export type BlogPostSlug = (typeof BLOG_POST_SLUGS)[number];

export type BlogPostSection = {
  title: string;
  body: string;
};

export type BlogPost = {
  title: string;
  description: string;
  publishedAt: string;
  sectionOrder: readonly string[];
  sections: Record<string, BlogPostSection>;
};

export type BlogMessages = {
  metadataTitle: string;
  metadataDescription: string;
  title: string;
  intro: string;
  navBlog: string;
  backToBlog: string;
  backHome: string;
  readArticle: string;
  publishedOn: string;
  relatedPosts: string;
  posts: Record<BlogPostSlug, BlogPost>;
};
