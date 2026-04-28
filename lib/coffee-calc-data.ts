export const COFFEE_TYPES = [
  { id: "espresso" as const, emoji: "☕", nameKey: "espresso" },
  { id: "cappuccino" as const, emoji: "🤎", nameKey: "cappuccino" },
  { id: "latte" as const, emoji: "🥛", nameKey: "latte" },
  { id: "americano" as const, emoji: "🖤", nameKey: "americano" },
  { id: "mocha" as const, emoji: "🍫", nameKey: "mocha" },
  { id: "coldBrew" as const, emoji: "🧊", nameKey: "coldBrew" },
];

export type CoffeeId = (typeof COFFEE_TYPES)[number]["id"];

export const COFFEE_PRICES_USD: Record<CoffeeId, number> = {
  espresso: 2.5,
  cappuccino: 4.5,
  latte: 5,
  americano: 3,
  mocha: 5.5,
  coldBrew: 4,
};

export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  COP: 4200,
  MXN: 17.2,
  BRL: 5,
  ARS: 870,
  JPY: 150,
  CNY: 7.25,
  INR: 83.5,
  CAD: 1.36,
  AUD: 1.54,
  CHF: 0.88,
  KRW: 1340,
} as const;

export type CurrencyCode = keyof typeof EXCHANGE_RATES;

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  COP: "$",
  MXN: "$",
  BRL: "R$",
  ARS: "$",
  JPY: "¥",
  CNY: "¥",
  INR: "₹",
  CAD: "C$",
  AUD: "A$",
  CHF: "Fr",
  KRW: "₩",
};

export const CURRENCY_OPTIONS: { value: CurrencyCode; label: string }[] = [
  { value: "USD", label: "🇺🇸 USD" },
  { value: "EUR", label: "🇪🇺 EUR" },
  { value: "GBP", label: "🇬🇧 GBP" },
  { value: "COP", label: "🇨🇴 COP" },
  { value: "MXN", label: "🇲🇽 MXN" },
  { value: "BRL", label: "🇧🇷 BRL" },
  { value: "ARS", label: "🇦🇷 ARS" },
  { value: "JPY", label: "🇯🇵 JPY" },
  { value: "CNY", label: "🇨🇳 CNY" },
  { value: "INR", label: "🇮🇳 INR" },
  { value: "CAD", label: "🇨🇦 CAD" },
  { value: "AUD", label: "🇦🇺 AUD" },
  { value: "CHF", label: "🇨🇭 CHF" },
  { value: "KRW", label: "🇰🇷 KRW" },
];

export function isZeroDecimalCurrency(code: CurrencyCode): boolean {
  return code === "JPY" || code === "KRW" || code === "COP";
}
