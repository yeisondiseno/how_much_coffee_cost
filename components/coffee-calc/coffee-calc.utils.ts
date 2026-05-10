// Types
import type { CurrencyCode } from "@/lib/coffee-calc-data";
// Utils (lib)
import { CURRENCY_LOCALE, isZeroDecimalCurrency } from "@/lib/coffee-calc-data";

export function formatAmountForLocale(n: number, currency: CurrencyCode): string {
  const opts: Intl.NumberFormatOptions = {
    maximumFractionDigits: isZeroDecimalCurrency(currency) ? 0 : 2,
  };
  return n.toLocaleString(undefined, opts);
}

export const getDecimalSeparator = (locale: string): string => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
  return parts.find((p) => p.type === "decimal")?.value ?? ".";
};

export const getGroupSeparator = (locale: string): string => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1000);
  return parts.find((p) => p.type === "group")?.value ?? ",";
};

export const formatDisplayAmount = (n: number, currency: CurrencyCode): string => {
  if (!Number.isFinite(n) || n < 0) return "";
  const locale = CURRENCY_LOCALE[currency];
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: isZeroDecimalCurrency(currency) ? 0 : 2,
    useGrouping: true,
  }).format(n);
};

export function pickFunFactForLocale(locale: string, facts: string[]): string {
  if (!facts.length) return "";
  const code = [...locale].reduce(
    (acc, ch, i) => acc + (ch.codePointAt(0) ?? 0) * (i + 1),
    0,
  );
  return facts[code % facts.length] ?? "";
}
