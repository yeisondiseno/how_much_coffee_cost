import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
// Components
import { BlogPageShell } from "@/components/coffee-calc/blog-page-shell";
import { BlogPostContent } from "@/components/coffee-calc/blog-post-content";
// Libraries
import { loadBlogMessages } from "@/lib/blog/messages";
import { isBlogPostSlug } from "@/lib/blog/posts";
import { getBlogPostMetadata } from "@/lib/blog-metadata";

type Props = Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  return getBlogPostMetadata(locale, slug);
}

export async function generateStaticParams() {
  const { BLOG_POST_SLUGS } = await import("@/lib/blog/posts");
  const { routing } = await import("@/i18n/routing");

  return routing.locales.flatMap((locale) =>
    BLOG_POST_SLUGS.map((slug) => ({ locale, slug })),
  );
}

const BlogPostPage = async ({ params }: Props) => {
  const { locale, slug } = await params;

  if (!isBlogPostSlug(slug)) notFound();

  setRequestLocale(locale);
  const blog = await loadBlogMessages(locale);

  return (
    <BlogPageShell backHref="/blog" backLabel={blog.backToBlog}>
      <BlogPostContent slug={slug} />
    </BlogPageShell>
  );
};

export default BlogPostPage;
