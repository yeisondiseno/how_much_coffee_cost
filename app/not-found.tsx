// Server component – renders outside [locale] layout, so must provide its own
// NextIntlClientProvider instead of relying on the layout's provider.
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";
// Components (local)
import {
  coffeeCalcDmSans,
  coffeeCalcPlayfair,
} from "@/components/coffee-calc/coffee-calc-fonts";
import { CoffeeCalcFooter } from "@/components/coffee-calc/coffee-calc-footer";
import { CoffeeCalcLangBar } from "@/components/coffee-calc/coffee-calc-lang-bar";
// Utils
import { cn } from "@/lib/utils";
// Styles
import "@/components/coffee-calc/coffee-calc.css";

export default async function NotFound() {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("NotFound");

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main
        className={cn(
          "coffee-calc-page",
          coffeeCalcPlayfair.variable,
          coffeeCalcDmSans.variable,
        )}
      >
        <CoffeeCalcLangBar />
        <section
          className="coffee-calc-hero"
          style={{ paddingTop: 60, paddingBottom: 40 }}
        >
          <div className="coffee-calc-hero-icon" aria-hidden>
            ☕
          </div>
          <div
            className="coffee-calc-result-number"
            style={{ marginTop: 16, display: "block" }}
          >
            404
          </div>
          <h1
            className="coffee-calc-hero-title"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", marginTop: 12 }}
          >
            {t("title")}
          </h1>
          <p className="coffee-calc-subtitle" style={{ marginTop: 10 }}>
            {t("message")}
          </p>
          <Link
            href={`/${locale}`}
            className="coffee-calc-share"
            style={{ marginTop: 32, textDecoration: "none" }}
          >
            ☕ {t("cta")}
          </Link>
        </section>
        <CoffeeCalcFooter />
      </main>
    </NextIntlClientProvider>
  );
}
