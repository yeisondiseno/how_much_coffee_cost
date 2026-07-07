// Libraries
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
// Components (local)
import { CoffeeCalcFooter } from "@/components/coffee-calc/coffee-calc-footer";
import {
  coffeeCalcDmSans,
  coffeeCalcPlayfair,
} from "@/components/coffee-calc/coffee-calc-fonts";
import { CoffeeCalcLangBar } from "@/components/coffee-calc/coffee-calc-lang-bar";
import { Link } from "@/i18n/navigation";
// Libraries
import { loadBlogMessages } from "@/lib/blog/messages";
// Utils
import { cn } from "@/lib/utils";
// Styles
import "./coffee-calc.css";

type BlogPageShellProps = Readonly<{
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}>;

export const BlogPageShell = async ({
  children,
  backHref = "/",
  backLabel,
}: BlogPageShellProps) => {
  const locale = await getLocale();
  const blog = await loadBlogMessages(locale);

  return (
    <main
      className={cn(
        "coffee-calc-page",
        coffeeCalcPlayfair.variable,
        coffeeCalcDmSans.variable,
      )}
    >
      <CoffeeCalcLangBar />
      <div className="coffee-calc-legal coffee-calc-blog">
        <Link href={backHref} className="coffee-calc-legal-back">
          ← {backLabel ?? blog.backHome}
        </Link>
        {children}
      </div>
      <CoffeeCalcFooter />
    </main>
  );
};
