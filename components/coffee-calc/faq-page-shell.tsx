// Components (local)
import { CoffeeCalcFooter } from "@/components/coffee-calc/coffee-calc-footer";
import {
  coffeeCalcDmSans,
  coffeeCalcPlayfair,
} from "@/components/coffee-calc/coffee-calc-fonts";
import { CoffeeCalcLangBar } from "@/components/coffee-calc/coffee-calc-lang-bar";
import { FaqContent } from "@/components/coffee-calc/faq-content";
import { Link } from "@/i18n/navigation";
// Utils
import { cn } from "@/lib/utils";
// Styles
import "./coffee-calc.css";

type FaqPageShellProps = Readonly<{
  backLabel: string;
}>;

export const FaqPageShell = async ({ backLabel }: FaqPageShellProps) => {
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
          ← {backLabel}
        </Link>
        <FaqContent />
      </div>
      <CoffeeCalcFooter />
    </main>
  );
};
