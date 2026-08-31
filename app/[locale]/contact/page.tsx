import { setRequestLocale, getTranslations } from "next-intl/server";
// Components
import {
  coffeeCalcDmSans,
  coffeeCalcPlayfair,
} from "@/components/coffee-calc/coffee-calc-fonts";
import { CoffeeCalcFooter } from "@/components/coffee-calc/coffee-calc-footer";
import { CoffeeCalcLangBar } from "@/components/coffee-calc/coffee-calc-lang-bar";
import { ContactContent } from "@/components/coffee-calc/contact-content";
// Libraries
import { Link } from "@/i18n/navigation";
import { getLegalPageMetadata } from "@/lib/legal-metadata";
import { cn } from "@/lib/utils";
// Styles
import "@/components/coffee-calc/coffee-calc.css";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getLegalPageMetadata(locale, "contact");
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);
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
        <ContactContent />
      </div>
      <CoffeeCalcFooter />
    </main>
  );
};

export default ContactPage;
