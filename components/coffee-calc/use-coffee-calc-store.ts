"use client";

// React
import { useCallback, useState } from "react";
// Types
import type { CoffeeId, CurrencyCode } from "@/lib/coffee-calc-data";
// Constants
const STORAGE_KEY = "coffee-calc-prefs";

// Types (module-local)
interface CoffeeCalcPrefs {
  amountInput: string;
  currency: CurrencyCode;
  selectedCoffee: CoffeeId;
}

const DEFAULT: CoffeeCalcPrefs = {
  amountInput: "100",
  currency: "USD",
  selectedCoffee: "cappuccino",
};

const readStorage = (): CoffeeCalcPrefs => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...(JSON.parse(raw) as Partial<CoffeeCalcPrefs>) };
  } catch {
    return DEFAULT;
  }
};

const writeStorage = (prefs: CoffeeCalcPrefs): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* storage unavailable */
  }
};

const getInitialPrefs = (): CoffeeCalcPrefs => {
  if (typeof window === "undefined") return DEFAULT;
  return readStorage();
};

export const useCoffeeCalcStore = () => {
  // State
  const [prefs, setPrefs] = useState<CoffeeCalcPrefs>(getInitialPrefs);

  // Actions
  const setAmountInput = useCallback((value: string) => {
    setPrefs((prev) => {
      const next = { ...prev, amountInput: value };
      writeStorage(next);
      return next;
    });
  }, []);

  const setCurrency = useCallback((value: CurrencyCode) => {
    setPrefs((prev) => {
      const next = { ...prev, currency: value };
      writeStorage(next);
      return next;
    });
  }, []);

  const setSelectedCoffee = useCallback((value: CoffeeId) => {
    setPrefs((prev) => {
      const next = { ...prev, selectedCoffee: value };
      writeStorage(next);
      return next;
    });
  }, []);

  return { ...prefs, setAmountInput, setCurrency, setSelectedCoffee };
};
