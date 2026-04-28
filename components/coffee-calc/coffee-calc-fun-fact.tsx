"use client";

// React
import { useMemo } from "react";
// Libraries
import { useLocale, useTranslations } from "next-intl";
// Utils (local)
import { pickFunFactForLocale } from "@/components/coffee-calc/coffee-calc.utils";

export function CoffeeCalcFunFact() {
  const t = useTranslations("CoffeeCalc");
  const locale = useLocale();

  const factText = useMemo(() => {
    const list = t.raw("funFacts") as string[];
    return pickFunFactForLocale(locale, list);
  }, [locale, t]);

  return (
    <div className="coffee-calc-fun-fact">
      <div className="coffee-calc-fun-fact-label">{t("funFactLabel")}</div>
      <span>{factText}</span>
    </div>
  );
}
