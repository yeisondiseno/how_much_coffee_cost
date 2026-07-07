// Libraries
import { getLocale } from "next-intl/server";
// Components (local)
import { Link } from "@/i18n/navigation";
// Libraries
import { loadBlogMessages } from "@/lib/blog/messages";
import { BLOG_POST_SLUGS } from "@/lib/blog/posts";

export const BlogList = async () => {
  const locale = await getLocale();
  const blog = await loadBlogMessages(locale);

  return (
    <div className="coffee-calc-blog-list">
      {BLOG_POST_SLUGS.map((slug) => {
        const post = blog.posts[slug];

        return (
          <article key={slug} className="coffee-calc-blog-card">
            <h2>
              <Link href={`/blog/${slug}`}>{post.title}</Link>
            </h2>
            <p className="coffee-calc-blog-card-desc">{post.description}</p>
            <p className="coffee-calc-blog-card-meta">
              {blog.publishedOn.replace("{date}", post.publishedAt)}
            </p>
            <Link href={`/blog/${slug}`} className="coffee-calc-blog-card-link">
              {blog.readArticle} →
            </Link>
          </article>
        );
      })}
    </div>
  );
};
