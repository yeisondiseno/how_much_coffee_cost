import { getTranslations, setRequestLocale } from "next-intl/server";
import { CoffeeCalcPage } from "@/components/coffee-calc/coffee-calc-page";
import { BASE_URL } from "@/lib/config";
import Script from "next/script";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const FAQ_COUNT = 10;

const jsonLdStringify = (data: unknown) =>
  JSON.stringify(data).replaceAll("<", String.raw`\u003c`);

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "CoffeeCalc" });

  const faqItems = Array.from({ length: FAQ_COUNT }, (_, index) => {
    const n = index + 1;
    return { question: t(`faq${n}Q`), answer: t(`faq${n}A`) };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "CoffeeCalc",
        inLanguage: locale,
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "CoffeeCalc",
        url: BASE_URL,
      },
      {
        "@type": "WebApplication",
        "@id": `${BASE_URL}/${locale}#webapp`,
        name: "CoffeeCalc",
        description: t("metadataDescription"),
        url: `${BASE_URL}/${locale}`,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        inLanguage: locale,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [t("schemaFeature1"), t("schemaFeature2"), t("schemaFeature3")],
      },
      {
        "@type": "HowTo",
        "@id": `${BASE_URL}/${locale}#howto`,
        name: t("howToName"),
        description: t("howToDescription"),
        inLanguage: locale,
        isPartOf: { "@id": `${BASE_URL}/${locale}#webapp` },
        step: [
          {
            "@type": "HowToStep",
            name: t("howToStep1Name"),
            text: t("howToStep1Text"),
          },
          {
            "@type": "HowToStep",
            name: t("howToStep2Name"),
            text: t("howToStep2Text"),
          },
          {
            "@type": "HowToStep",
            name: t("howToStep3Name"),
            text: t("howToStep3Text"),
          },
          {
            "@type": "HowToStep",
            name: t("howToStep4Name"),
            text: t("howToStep4Text"),
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/${locale}#faq`,
        inLanguage: locale,
        isPartOf: { "@id": `${BASE_URL}/${locale}#webapp` },
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdStringify(jsonLd),
        }}
      />

      <CoffeeCalcPage />
    </>
  );
}
