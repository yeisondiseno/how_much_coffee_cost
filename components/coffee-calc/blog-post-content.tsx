// Libraries
import { getLocale } from "next-intl/server";
// Components (local)
import { Link } from "@/i18n/navigation";
// Libraries
import { loadBlogMessages } from "@/lib/blog/messages";
import { BLOG_POST_SLUGS, isBlogPostSlug } from "@/lib/blog/posts";
import type { BlogPostSlug } from "@/lib/blog/types";

type BlogPostContentProps = Readonly<{
  slug: string;
}>;

export const BlogPostContent = async ({ slug }: BlogPostContentProps) => {
  if (!isBlogPostSlug(slug)) return null;

  const locale = await getLocale();
  const blog = await loadBlogMessages(locale);
  const post = blog.posts[slug as BlogPostSlug];
  const relatedSlugs = BLOG_POST_SLUGS.filter((s) => s !== slug).slice(0, 3);

  return (
    <article className="coffee-calc-legal-article coffee-calc-blog-article">
      <h1 className="coffee-calc-legal-title">{post.title}</h1>
      <p className="coffee-calc-legal-updated">
        {blog.publishedOn.replace("{date}", post.publishedAt)}
      </p>
      {post.sectionOrder.map((sectionKey) => {
        const section = post.sections[sectionKey];
        if (!section) return null;

        return (
          <section key={sectionKey} className="coffee-calc-legal-section">
            {section.title ? <h2>{section.title}</h2> : null}
            <p>{section.body}</p>
          </section>
        );
      })}
      <section className="coffee-calc-blog-related">
        <h2>{blog.relatedPosts}</h2>
        <ul className="coffee-calc-blog-related-list">
          {relatedSlugs.map((relatedSlug) => (
            <li key={relatedSlug}>
              <Link href={`/blog/${relatedSlug}`}>
                {blog.posts[relatedSlug].title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
