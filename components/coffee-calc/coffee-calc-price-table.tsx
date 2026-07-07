// Libraries
import { getTranslations } from "next-intl/server";
// Utils
import {
  COFFEE_PRICES_USD,
  COFFEE_TYPES,
  EXCHANGE_RATES,
} from "@/lib/coffee-calc-data";

const TABLE_CURRENCIES = ["USD", "EUR", "GBP"] as const;

const formatPrice = (usdPrice: number, currency: (typeof TABLE_CURRENCIES)[number]) => {
  const local = usdPrice * EXCHANGE_RATES[currency];
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(local);
};

export const CoffeeCalcPriceTable = async () => {
  const t = await getTranslations("CoffeeCalc");

  return (
    <div className="coffee-calc-seo-table-wrap">
      <table className="coffee-calc-seo-table">
        <caption>{t("comparisonCaption")}</caption>
        <thead>
          <tr>
            <th scope="col">{t("comparisonDrink")}</th>
            {TABLE_CURRENCIES.map((currency) => (
              <th key={currency} scope="col">
                {currency}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COFFEE_TYPES.map((coffee) => (
            <tr key={coffee.id}>
              <th scope="row">{t(`coffeeNames.${coffee.nameKey}`)}</th>
              {TABLE_CURRENCIES.map((currency) => (
                <td key={currency}>
                  {formatPrice(COFFEE_PRICES_USD[coffee.id], currency)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
