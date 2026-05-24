"use client";

// React
import { useCallback, useSyncExternalStore } from "react";
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

export const COFFEE_CALC_DEFAULT_PREFS: CoffeeCalcPrefs = {
  amountInput: "100",
  currency: "USD",
  selectedCoffee: "cappuccino",
};

const DEFAULT = COFFEE_CALC_DEFAULT_PREFS;

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

let cachedRaw: string | null = null;
let cachedSnapshot: CoffeeCalcPrefs = DEFAULT;

const parseStoredPrefs = (raw: string | null): CoffeeCalcPrefs => {
  if (!raw) return DEFAULT;
  try {
    return { ...DEFAULT, ...(JSON.parse(raw) as Partial<CoffeeCalcPrefs>) };
  } catch {
    return DEFAULT;
  }
};

const getSnapshot = (): CoffeeCalcPrefs => {
  if (typeof window === "undefined") return DEFAULT;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedSnapshot;

    cachedRaw = raw;
    cachedSnapshot = parseStoredPrefs(raw);
    return cachedSnapshot;
  } catch {
    return DEFAULT;
  }
};

const getServerSnapshot = (): CoffeeCalcPrefs => DEFAULT;

const writeStorage = (prefs: CoffeeCalcPrefs): void => {
  try {
    const raw = JSON.stringify(prefs);
    localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedSnapshot = prefs;
    emitChange();
  } catch {
    /* storage unavailable */
  }
};

const updatePrefs = (updater: (prev: CoffeeCalcPrefs) => CoffeeCalcPrefs): void => {
  writeStorage(updater(getSnapshot()));
};

export const useCoffeeCalcStore = () => {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setAmountInput = useCallback((value: string) => {
    updatePrefs((prev) => ({ ...prev, amountInput: value }));
  }, []);

  const setCurrency = useCallback((value: CurrencyCode) => {
    updatePrefs((prev) => ({ ...prev, currency: value }));
  }, []);

  const setSelectedCoffee = useCallback((value: CoffeeId) => {
    updatePrefs((prev) => ({ ...prev, selectedCoffee: value }));
  }, []);

  return { ...prefs, setAmountInput, setCurrency, setSelectedCoffee };
};
