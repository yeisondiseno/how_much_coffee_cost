"use client";

// Components (local)
import { CoffeeCalcAd } from "@/components/coffee-calc/coffee-calc-ad";
import { CoffeeCalcConverterCard } from "@/components/coffee-calc/coffee-calc-converter-card";
import {
  coffeeCalcDmSans,
  coffeeCalcPlayfair,
} from "@/components/coffee-calc/coffee-calc-fonts";
import { CoffeeCalcFooter } from "@/components/coffee-calc/coffee-calc-footer";
import { CoffeeCalcFunFact } from "@/components/coffee-calc/coffee-calc-fun-fact";
import { CoffeeCalcHero } from "@/components/coffee-calc/coffee-calc-hero";
import { CoffeeCalcLangBar } from "@/components/coffee-calc/coffee-calc-lang-bar";
import { CoffeeCalcSeoBlock } from "@/components/coffee-calc/coffee-calc-seo-block";
// Utils
import { cn } from "@/lib/utils";
// Styles
import "./coffee-calc.css";

export function CoffeeCalcPage() {
  return (
    <div
      className={cn(
        "coffee-calc-page",
        coffeeCalcPlayfair.variable,
        coffeeCalcDmSans.variable,
      )}
    >
      <CoffeeCalcLangBar />
      <CoffeeCalcHero />
      <CoffeeCalcConverterCard />
      <CoffeeCalcAd variant="728" />
      <CoffeeCalcFunFact />
      <CoffeeCalcSeoBlock />
      <CoffeeCalcAd variant="300" />
      <CoffeeCalcFooter />
    </div>
  );
}
