// Libraries
import { getTranslations } from "next-intl/server";
// Components (local)
import { Link } from "@/i18n/navigation";
// Constants
import { routing } from "@/i18n/routing";

export const CoffeeCalcFooter = async () => {
  const t = await getTranslations("CoffeeCalc");
  const tl = await getTranslations("Legal");
  const tg = await getTranslations("global");

  return (
    <footer className="coffee-calc-footer">
      <p>{t("brandLine", { footer: t("footer") })}</p>
      <p style={{ marginTop: 6, fontSize: 11, opacity: 0.6 }}>
        {t("disclaimer")}
      </p>
      <nav className="coffee-calc-footer-legal" aria-label={tl("navAria")}>
        <Link href="/privacy">{tl("navPrivacy")}</Link>
        <Link href="/terms">{tl("navTerms")}</Link>
        <Link href="/about">{tl("navAbout")}</Link>
        <Link href="/contact">{tl("navContact")}</Link>
      </nav>
      <nav className="coffee-calc-footer-langs" aria-label={tg("langsNavAria")}>
        {routing.locales.map((loc) => (
          <Link key={loc} href="/" locale={loc} lang={loc}>
            {tg(`languageNames.${loc}`)}
          </Link>
        ))}
      </nav>
    </footer>
  );
};
