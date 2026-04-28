import { use } from "react";
import { CoffeeCalcPage } from "@/components/coffee-calc/coffee-calc-page";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CoffeeCalc" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default function Home({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <CoffeeCalcPage />;
}
