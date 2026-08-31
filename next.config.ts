import million from "million/compiler";
import createNextIntlPlugin from "next-intl/plugin";
import { routing } from "./i18n/routing";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return routing.locales.flatMap((locale) => [
      {
        source: `/${locale}/blog`,
        destination: `/${locale}/faq`,
        permanent: true,
      },
      {
        source: `/${locale}/blog/:slug`,
        destination: `/${locale}/faq`,
        permanent: true,
      },
    ]);
  },
};

const millionConfig = {
  auto: { rsc: true },
};

export default withNextIntl(
  million.next(
    nextConfig as unknown as Parameters<typeof million.next>[0],
    millionConfig,
  ),
);
