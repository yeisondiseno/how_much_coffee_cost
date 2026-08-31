import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqPageShell } from "@/components/coffee-calc/faq-page-shell";
import { BASE_URL } from "@/lib/config";
import { getFaqPageMetadata } from "@/lib/faq-metadata";
import { loadFaqMessages } from "@/lib/faq/messages";
import { FAQ_ITEM_KEYS } from "@/lib/faq/types";
import Script from "next/script";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const jsonLdStringify = (data: unknown) =>
  JSON.stringify(data).replaceAll("<", String.raw`\u003c`);

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getFaqPageMetadata(locale);
}

const FaqPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const [faq, t] = await Promise.all([
    loadFaqMessages(locale),
    getTranslations("Legal"),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/${locale}/faq#faq`,
    inLanguage: locale,
    mainEntity: FAQ_ITEM_KEYS.map((key) => ({
      "@type": "Question",
      name: faq.items[key].q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.items[key].a,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema-org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdStringify(jsonLd),
        }}
      />
      <FaqPageShell backLabel={t("backHome")} />
    </>
  );
};

export default FaqPage;
