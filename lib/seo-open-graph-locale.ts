/** BCP 47-style tags expected by Open Graph consumers */
export function openGraphLocaleTag(locale: string): string {
  const map: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    fr: "fr_FR",
    pt: "pt_BR",
    de: "de_DE",
    ja: "ja_JP",
    it: "it_IT",
    ko: "ko_KR",
    pl: "pl_PL",
  };
  return map[locale] ?? locale;
}
