import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/config";
import { cn } from "@/lib/utils";
import "../globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CoffeeCalc" });

  return {
    title: {
      default: t("metadataTitle"),
      template: "%s · CoffeeCalc",
    },
    description: t("metadataDescription"),
    verification: {
      google: "QITtAvbig7mPV9WpAzkPTSM8xsaa5YjXWOYZV-tMnpU",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "x-default": BASE_URL,
        ...Object.fromEntries(
          routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}`]),
        ),
      },
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      url: `${BASE_URL}/${locale}`,
      siteName: "CoffeeCalc",
      locale,
      type: "website",
      images: [
        {
          url: `${BASE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t("metadataTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      images: [`${BASE_URL}/${locale}/opengraph-image`],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8195825937047934"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleTagManager gtmId="GTM-MBD3HG86" />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
