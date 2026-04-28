"use client";

// Libraries
import { useLocale } from "next-intl";
// Components (local)
import { Link, usePathname } from "@/i18n/navigation";
// Constants
import { routing } from "@/i18n/routing";
// Utils
import { cn } from "@/lib/utils";

export function CoffeeCalcLangBar() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="coffee-calc-top-bar">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            "coffee-calc-lang-btn",
            locale === loc && "coffee-calc-lang-btn-active",
          )}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
