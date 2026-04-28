"use client";

// Libraries
import { useTranslations } from "next-intl";

// Types (module-local)
type AdVariant = "728" | "300";

const AD_KEYS: Record<
  AdVariant,
  Readonly<{ title: "ad728" | "ad300"; hint: "ad728Hint" | "ad300Hint" }>
> = {
  "728": { title: "ad728", hint: "ad728Hint" },
  "300": { title: "ad300", hint: "ad300Hint" },
};

type Props = Readonly<{ variant: AdVariant }>;

export function CoffeeCalcAd({ variant }: Props) {
  const t = useTranslations("CoffeeCalc");
  const keys = AD_KEYS[variant];

  return (
    <div className="coffee-calc-ad">
      <div className="coffee-calc-ad-box">
        {t(keys.title)}
        <span>{t(keys.hint)}</span>
      </div>
    </div>
  );
}
