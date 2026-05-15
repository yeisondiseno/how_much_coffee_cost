// Libraries
import { getTranslations } from "next-intl/server";

export const CoffeeCalcSeoBlock = async () => {
  const t = await getTranslations("CoffeeCalc");

  const faqEntries = [
    { id: "faq1", q: t("faq1Q"), a: t("faq1A") },
    { id: "faq2", q: t("faq2Q"), a: t("faq2A") },
    { id: "faq3", q: t("faq3Q"), a: t("faq3A") },
    { id: "faq4", q: t("faq4Q"), a: t("faq4A") },
  ] as const;

  return (
    <article
      className="coffee-calc-seo"
      aria-labelledby="coffee-calc-seo-main-heading"
    >
      <h2 id="coffee-calc-seo-main-heading">{t("seoTitle")}</h2>
      <p>{t("seoText")}</p>

      <div className="coffee-calc-seo-faq">
        <h3 className="coffee-calc-seo-faq-heading">{t("faqTitle")}</h3>
        <dl className="coffee-calc-seo-faq-list">
          {faqEntries.map((item) => (
            <div key={item.id} className="coffee-calc-seo-faq-item">
              <dt className="coffee-calc-seo-faq-q">{item.q}</dt>
              <dd className="coffee-calc-seo-faq-a">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
};
