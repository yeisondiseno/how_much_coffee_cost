import { setRequestLocale } from "next-intl/server";
import { LegalPageShell } from "@/components/coffee-calc/legal-page-shell";
import { getLegalPageMetadata } from "@/lib/legal-metadata";

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getLegalPageMetadata(locale, "about");
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPageShell pageKey="about" />;
};

export default AboutPage;
