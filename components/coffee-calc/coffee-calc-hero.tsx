// Libraries
import { getTranslations } from "next-intl/server";
// Components (local)
import { renderTitleAccent } from "@/components/coffee-calc/coffee-calc-title";

export const CoffeeCalcHero = async () => {
  const t = await getTranslations("CoffeeCalc");

  return (
    <section className="coffee-calc-hero">
      <div className="coffee-calc-hero-icon" aria-hidden>
        ☕
      </div>
      <h1 className="coffee-calc-hero-title">
        {t.rich("title", {
          accent: renderTitleAccent,
        })}
      </h1>
      <p className="coffee-calc-subtitle">{t("subtitle")}</p>
    </section>
  );
};
