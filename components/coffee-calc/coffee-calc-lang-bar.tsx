"use client";

// React
import { type ChangeEvent } from "react";
// Libraries
import { useLocale, useTranslations } from "next-intl";
// Components (local)
import { usePathname, useRouter } from "@/i18n/navigation";
// Constants
import { routing } from "@/i18n/routing";

export const CoffeeCalcLangBar = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("global");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <div className="coffee-calc-top-bar">
      <div className="coffee-calc-lang-dropdown">
        <select
          className="coffee-calc-lang-select"
          value={locale}
          onChange={handleChange}
          aria-label={t("selectLanguage")}
        >
          {routing.locales.map((loc) => (
            <option key={loc} value={loc}>
              {t(`languageNames.${loc}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
