import { getTranslations, setRequestLocale } from "next-intl/server";
import { CoffeeCalcPage } from "@/components/coffee-calc/coffee-calc-page";
import { BASE_URL } from "@/lib/config";
import Script from "next/script";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "CoffeeCalc" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CoffeeCalc",
    description: t("metadataDescription"),
    url: `${BASE_URL}/${locale}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <Script
        id="application/ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll("<", String.raw`\u003c`),
        }}
      />
      <CoffeeCalcPage />
    </>
  );
}
