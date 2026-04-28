// Types
import type { CurrencyCode } from "@/lib/coffee-calc-data";
// Utils (lib)
import { isZeroDecimalCurrency } from "@/lib/coffee-calc-data";

export function formatAmountForLocale(n: number, currency: CurrencyCode): string {
  const opts: Intl.NumberFormatOptions = {
    maximumFractionDigits: isZeroDecimalCurrency(currency) ? 0 : 2,
  };
  return n.toLocaleString(undefined, opts);
}

export function pickFunFactForLocale(locale: string, facts: string[]): string {
  if (!facts.length) return "";
  const code = [...locale].reduce(
    (acc, ch, i) => acc + (ch.codePointAt(0) ?? 0) * (i + 1),
    0,
  );
  return facts[code % facts.length] ?? "";
}
