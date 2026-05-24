import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "pt", "de", "ja", "it", "ko", "pl"],
  defaultLocale: "en",
  /** Always use `/en`, `/es`, etc. so `/` can redirect to one canonical locale URL. */
  localePrefix: "always",
});
