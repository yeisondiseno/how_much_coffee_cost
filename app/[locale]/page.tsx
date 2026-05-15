import { getTranslations, setRequestLocale } from "next-intl/server";
import { CoffeeCalcPage } from "@/components/coffee-calc/coffee-calc-page";
import { BASE_URL } from "@/lib/config";
import Script from "next/script";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const jsonLdStringify = (data: unknown) =>
  JSON.stringify(data).replaceAll("<", String.raw`\u003c`);

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "CoffeeCalc" });

  const faqItems = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
    { question: t("faq4Q"), answer: t("faq4A") },
  ];

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
