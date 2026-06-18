// Libraries
import { getTranslations } from "next-intl/server";
// Types
import type { LegalPageSlug } from "@/lib/legal-sections";
import { LEGAL_PAGE_NAMESPACE, LEGAL_PAGE_SECTIONS } from "@/lib/legal-sections";

type LegalContentProps = Readonly<{
  pageKey: LegalPageSlug;
}>;

export const LegalContent = async ({ pageKey }: LegalContentProps) => {
  const namespace = LEGAL_PAGE_NAMESPACE[pageKey];
  const sectionKeys = LEGAL_PAGE_SECTIONS[pageKey];
  const t = await getTranslations("Legal");

  return (
    <article className="coffee-calc-legal-article">
      <h1 className="coffee-calc-legal-title">{t(`${namespace}.title`)}</h1>
      <p className="coffee-calc-legal-updated">{t(`${namespace}.lastUpdated`)}</p>
      <p className="coffee-calc-legal-intro">{t(`${namespace}.intro`)}</p>
      {sectionKeys.map((key) => (
        <section key={key} className="coffee-calc-legal-section">
          <h2>{t(`${namespace}.sections.${key}.title`)}</h2>
          <p>{t(`${namespace}.sections.${key}.body`)}</p>
        </section>
      ))}
    </article>
  );
};
