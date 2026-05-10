"use client";

// React
import { type ChangeEvent, useCallback, useMemo, useState } from "react";
// Libraries
import { useTranslations } from "next-intl";
// Hooks
import { useCoffeeCalcStore } from "@/components/coffee-calc/use-coffee-calc-store";
// Components
import { Input } from "@/components/ui/input";
// Utils
import {
  formatAmountForLocale,
  formatDisplayAmount,
  getDecimalSeparator,
  getGroupSeparator,
} from "@/components/coffee-calc/coffee-calc.utils";
import { cn } from "@/lib/utils";
// Constants
import {
  COFFEE_PRICES_USD,
  COFFEE_TYPES,
  CURRENCY_LOCALE,
  CURRENCY_OPTIONS,
  CURRENCY_SYMBOLS,
  EXCHANGE_RATES,
  isZeroDecimalCurrency,
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
  const [displayValue, setDisplayValue] = useState(() => {
    const n = Number.parseFloat(amountInput);
    return Number.isFinite(n) && n > 0
      ? formatDisplayAmount(n, currency)
      : amountInput;
  });

  // Hooks
  const locale = CURRENCY_LOCALE[currency];
  const decSep = useMemo(() => getDecimalSeparator(locale), [locale]);
  const groupSep = useMemo(() => getGroupSeparator(locale), [locale]);

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
  const handleAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;
      const isZeroDec = isZeroDecimalCurrency(currency);

      // Strip thousands separators to isolate digit+decimal input
      const escapedGroup = groupSep.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const stripped = inputVal.replaceAll(new RegExp(escapedGroup, "g"), "");

      let rawNumeric: string;
      if (isZeroDec) {
        rawNumeric = stripped.replaceAll(/\D/g, "");
      } else {
        const parts = stripped.split(decSep);
        const intDigits = parts[0].replaceAll(/\D/g, "");
        const decDigits =
          parts.length > 1
            ? parts.slice(1).join("").replaceAll(/\D/g, "").slice(0, 2)
            : null;
        rawNumeric =
          decDigits !== null ? `${intDigits}.${decDigits}` : intDigits;
      }

      setAmountInput(rawNumeric);

      if (!rawNumeric) {
        setDisplayValue("");
        return;
      }

      const n = Number.parseFloat(rawNumeric) || 0;
      const endsWithDec = !isZeroDec && stripped.endsWith(decSep);

      if (endsWithDec) {
        const intFormatted = new Intl.NumberFormat(locale, {
          maximumFractionDigits: 0,
          useGrouping: true,
        }).format(n);
        setDisplayValue(intFormatted + decSep);
      } else {
        const decIdx = stripped.lastIndexOf(decSep);
        const userDecPlaces =
          decIdx >= 0
            ? stripped.slice(decIdx + 1).replaceAll(/\D/g, "").length
            : 0;
        const formatted = new Intl.NumberFormat(locale, {
          minimumFractionDigits: isZeroDec ? 0 : Math.min(userDecPlaces, 2),
          maximumFractionDigits: isZeroDec ? 0 : 2,
          useGrouping: true,
        }).format(n);
        setDisplayValue(formatted);
      }
    },
    [currency, decSep, groupSep, locale, setAmountInput],
  );

  const handleCurrencyChange = useCallback(
    (newCurrency: CurrencyCode) => {
      setCurrency(newCurrency);
      const n = Number.parseFloat(amountInput);
      if (Number.isFinite(n) && n > 0) {
        setDisplayValue(formatDisplayAmount(n, newCurrency));
      }
    },
    [amountInput, setCurrency],
  );

  const handleAmountBlur = useCallback(() => {
    const n = Number.parseFloat(amountInput);
    setDisplayValue(
      Number.isFinite(n) && n > 0 ? formatDisplayAmount(n, currency) : "",
    );
  }, [amountInput, currency]);

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
                type="text"
                inputMode={
                  isZeroDecimalCurrency(currency) ? "numeric" : "decimal"
                }
                className="coffee-calc-amount-input"
                placeholder="100"
                value={displayValue}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
              />
            </div>
            <select
              className="coffee-calc-currency-select"
              value={currency}
              onChange={(e) =>
                handleCurrencyChange(e.target.value as CurrencyCode)
              }
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
