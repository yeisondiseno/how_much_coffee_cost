"use client";

// Libraries
import { useTranslations } from "next-intl";

export function CoffeeCalcFooter() {
  const t = useTranslations("CoffeeCalc");

  return (
    <footer className="coffee-calc-footer">
      <p>{t("brandLine", { footer: t("footer") })}</p>
      <p style={{ marginTop: 6, fontSize: 11, opacity: 0.6 }}>
        {t("disclaimer")}
      </p>
    </footer>
  );
}
