// Libraries
import { getTranslations } from "next-intl/server";

export const CoffeeCalcSeoBlock = async () => {
  const t = await getTranslations("CoffeeCalc");

  return (
    <section className="coffee-calc-seo">
      <h2>{t("seoTitle")}</h2>
      <p>{t("seoText")}</p>
    </section>
  );
};
