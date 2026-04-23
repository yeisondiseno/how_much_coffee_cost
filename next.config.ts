import million from "million/compiler";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: true, // if you're using RSC: auto: { rsc: true },
};

export default withNextIntl(
  million.next(
    nextConfig as unknown as Parameters<typeof million.next>[0],
    millionConfig,
  ),
);
