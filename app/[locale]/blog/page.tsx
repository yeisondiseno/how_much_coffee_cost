import { setRequestLocale } from "next-intl/server";
// Components
import { BlogList } from "@/components/coffee-calc/blog-list";
import { BlogPageShell } from "@/components/coffee-calc/blog-page-shell";
// Libraries
import { loadBlogMessages } from "@/lib/blog/messages";
import { getBlogIndexMetadata } from "@/lib/blog-metadata";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getBlogIndexMetadata(locale);
}

const BlogIndexPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const blog = await loadBlogMessages(locale);

  return (
    <BlogPageShell backHref="/" backLabel={blog.backHome}>
      <header className="coffee-calc-blog-header">
        <h1 className="coffee-calc-legal-title">{blog.title}</h1>
        <p className="coffee-calc-legal-intro">{blog.intro}</p>
      </header>
      <BlogList />
    </BlogPageShell>
  );
};

export default BlogIndexPage;
