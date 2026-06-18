// Libraries
import { getTranslations } from "next-intl/server";
// Components (local)
import { CoffeeCalcFooter } from "@/components/coffee-calc/coffee-calc-footer";
import {
  coffeeCalcDmSans,
  coffeeCalcPlayfair,
} from "@/components/coffee-calc/coffee-calc-fonts";
import { CoffeeCalcLangBar } from "@/components/coffee-calc/coffee-calc-lang-bar";
import { LegalContent } from "@/components/coffee-calc/legal-content";
import { Link } from "@/i18n/navigation";
// Types
import type { LegalPageSlug } from "@/lib/legal-sections";
// Utils
import { cn } from "@/lib/utils";
// Styles
import "./coffee-calc.css";

type LegalPageShellProps = Readonly<{
  pageKey: LegalPageSlug;
}>;

export const LegalPageShell = async ({ pageKey }: LegalPageShellProps) => {
  const t = await getTranslations("Legal");

  return (
    <main
      className={cn(
        "coffee-calc-page",
        coffeeCalcPlayfair.variable,
        coffeeCalcDmSans.variable,
      )}
    >
      <CoffeeCalcLangBar />
      <div className="coffee-calc-legal">
        <Link href="/" className="coffee-calc-legal-back">
          ← {t("backHome")}
        </Link>
        <LegalContent pageKey={pageKey} />
      </div>
      <CoffeeCalcFooter />
    </main>
  );
};
