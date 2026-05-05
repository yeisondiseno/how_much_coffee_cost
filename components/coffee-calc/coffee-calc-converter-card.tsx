"use client";

// React
import { useCallback, useMemo, useState } from "react";
// Libraries
import { useTranslations } from "next-intl";
// Hooks
import { useCoffeeCalcStore } from "@/components/coffee-calc/use-coffee-calc-store";
// Components
import { Input } from "@/components/ui/input";
// Utils
import { formatAmountForLocale } from "@/components/coffee-calc/coffee-calc.utils";
import { cn } from "@/lib/utils";
// Constants
import {
  COFFEE_PRICES_USD,
  COFFEE_TYPES,
  CURRENCY_OPTIONS,
  CURRENCY_SYMBOLS,
  EXCHANGE_RATES,
  type CurrencyCode,
} from "@/lib/coffee-calc-data";

export const CoffeeCalcConverterCard = () => {
  // Hooks
  const t = useTranslations("CoffeeCalc");
  const tCoffee = useTranslations("CoffeeCalc.coffeeNames");
  const {
    amountInput,
    currency,
    selectedCoffee,
    setAmountInput,
    setCurrency,
    setSelectedCoffee,
  } = useCoffeeCalcStore();

  // State
  const [shareIdle, setShareIdle] = useState(true);

  // Values
  const amount = useMemo(() => {
    const n = Number.parseFloat(amountInput);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [amountInput]);

  const coffeeCount = useMemo(() => {
    if (amount <= 0) return 0;
    const amountUSD = amount / EXCHANGE_RATES[currency];
    return Math.floor(amountUSD / COFFEE_PRICES_USD[selectedCoffee]);
  }, [amount, currency, selectedCoffee]);

  const formattedPrice = useMemo(() => {
    const localPrice =
      COFFEE_PRICES_USD[selectedCoffee] * EXCHANGE_RATES[currency];
    return (
      CURRENCY_SYMBOLS[currency] + formatAmountForLocale(localPrice, currency)
    );
  }, [currency, selectedCoffee]);

  const coffeeName = tCoffee(selectedCoffee);

  const cupsVisual = useMemo(() => {
    const shown = Math.min(coffeeCount, 50);
    const items = Array.from({ length: shown }, (_, i) => (
      <span
        key={i}
        className="coffee-calc-mini-cup"
        style={{ animationDelay: `${i * 30}ms` }}
      >
        ☕
      </span>
    ));

    if (coffeeCount <= 50) return items;

    return [
      ...items,
      <span
        key="more"
        className="coffee-calc-mini-cup"
        style={{
          animationDelay: `${50 * 30}ms`,
          fontSize: "14px",
          color: "var(--coffee-crema)",
        }}
      >
        ...
      </span>,
    ];
  }, [coffeeCount]);

  // Actions
  const shareResult = useCallback(async () => {
    const text = t("shareText", {
      amount: formatAmountForLocale(amount, currency),
      currency,
      count: coffeeCount.toLocaleString(),
      type: coffeeName,
    });

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        /* user cancelled or share failed */
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      setShareIdle(false);
      globalThis.setTimeout(() => setShareIdle(true), 2000);
    }
  }, [amount, coffeeCount, coffeeName, currency, t]);

  return (
    <div className="coffee-calc-card">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="coffee-calc-input-group">
          <label className="coffee-calc-input-label" htmlFor="coffee-amount">
            {t("labelAmount")}
          </label>
          <div className="coffee-calc-amount-row">
            <div className="coffee-calc-amount-wrap">
              <span className="coffee-calc-currency-symbol" aria-hidden>
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <Input
                id="coffee-amount"
                type="number"
                className="coffee-calc-amount-input"
                placeholder="100"
                min={0}
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
              />
            </div>
            <select
              className="coffee-calc-currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Currency"
            >
              {CURRENCY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset
          className="coffee-calc-input-group"
          style={{ border: "none", padding: 0, margin: 0 }}
        >
          <legend className="coffee-calc-input-label">
            {t("labelCoffee")}
          </legend>
          <ul className="coffee-calc-types list-none p-0 m-0">
            {COFFEE_TYPES.map((c) => {
              const localPrice =
                COFFEE_PRICES_USD[c.id] * EXCHANGE_RATES[currency];
              const label = formatAmountForLocale(localPrice, currency);
              const name = tCoffee(c.id);
              return (
                <li key={c.id} className="contents">
                  <button
                    type="button"
                    className={cn(
                      "coffee-calc-type",
                      selectedCoffee === c.id && "coffee-calc-type-active",
                    )}
                    onClick={() => setSelectedCoffee(c.id)}
                  >
                    <span className="coffee-calc-type-emoji" aria-hidden>
                      {c.emoji}
                    </span>
                    <span className="coffee-calc-type__cont">
                      <span className="coffee-calc-type-name">{name}</span>
                      <span className="coffee-calc-type-price">
                        {CURRENCY_SYMBOLS[currency]}
                        {label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className="coffee-calc-divider">
          <div className="coffee-calc-divider-line" />
          <span className="coffee-calc-divider-icon" aria-hidden>
            ⬇️
          </span>
          <div className="coffee-calc-divider-line" />
        </div>

        <output htmlFor="coffee-amount" className="coffee-calc-result">
          <div className="coffee-calc-result-number">
            {amount > 0 ? coffeeCount.toLocaleString() : "—"}
          </div>
          <div className="coffee-calc-result-label">
            {t("resultLabel", { type: coffeeName })}
          </div>
          <div className="coffee-calc-result-detail">
            {amount > 0
              ? t("resultDetail", { price: formattedPrice, currency })
              : ""}
          </div>
          <div className="coffee-calc-cups" aria-hidden>
            {cupsVisual}
          </div>
        </output>

        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className="coffee-calc-share"
            onClick={() => void shareResult()}
          >
            📤 {shareIdle ? t("shareBtn") : `✅ ${t("copied")}`}
          </button>
        </div>
      </form>
    </div>
  );
};
