"use client";

// Libraries
import { useTranslations } from "next-intl";

export function CoffeeCalcSeoBlock() {
  const t = useTranslations("CoffeeCalc");

  return (
    <section className="coffee-calc-seo">
      <h2>{t("seoTitle")}</h2>
      <p>{t("seoText")}</p>
    </section>
  );
}
