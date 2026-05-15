import type { Metadata, Viewport } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ConsentThirdParties } from "@/components/consent/consent-third-parties";
import { BASE_URL } from "@/lib/config";
import { openGraphLocaleTag } from "@/lib/seo-open-graph-locale";
import { cn } from "@/lib/utils";
import "../globals.css";

const consentModeDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
`;

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

export const viewport: Viewport = {
  themeColor: "#1b0e07",
};

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CoffeeCalc" });

  return {
    metadataBase: new URL(BASE_URL),
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
        "x-default": `${BASE_URL}/${routing.defaultLocale}`,
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
      locale: openGraphLocaleTag(locale),
      alternateLocale: routing.locales
        .filter((loc) => loc !== locale)
        .map(openGraphLocaleTag),
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
    appleWebApp: {
      capable: true,
      title: "CoffeeCalc",
      statusBarStyle: "black-translucent",
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
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          id="consent-mode-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: consentModeDefaultScript }}
        />
        <NextIntlClientProvider>
          <ConsentThirdParties>{children}</ConsentThirdParties>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
