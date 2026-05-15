// Libraries
import { getTranslations } from "next-intl/server";
// Components (local)
import { Link } from "@/i18n/navigation";
// Constants
import { routing } from "@/i18n/routing";

export const CoffeeCalcFooter = async () => {
  const t = await getTranslations("CoffeeCalc");
  const tg = await getTranslations("global");

  return (
    <footer className="coffee-calc-footer">
      <p>{t("brandLine", { footer: t("footer") })}</p>
      <p style={{ marginTop: 6, fontSize: 11, opacity: 0.6 }}>
        {t("disclaimer")}
      </p>
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
