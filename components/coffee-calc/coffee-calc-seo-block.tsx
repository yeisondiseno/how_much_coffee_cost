// Libraries
import { getTranslations } from "next-intl/server";
// Components (local)
import { CoffeeCalcPriceTable } from "@/components/coffee-calc/coffee-calc-price-table";
import { Link } from "@/i18n/navigation";
import { HOME_FAQ_COUNT } from "@/lib/faq/types";

const FAQ_COUNT = HOME_FAQ_COUNT;

export const CoffeeCalcSeoBlock = async () => {
  const t = await getTranslations("CoffeeCalc");

  const faqEntries = Array.from({ length: FAQ_COUNT }, (_, index) => {
    const n = index + 1;
    return {
      id: `faq${n}`,
      q: t(`faq${n}Q`),
      a: t(`faq${n}A`),
    };
  });

  const useCaseKeys = ["useCase1", "useCase2", "useCase3"] as const;
  const howItWorksSteps = [
    "howItWorksStep1",
    "howItWorksStep2",
    "howItWorksStep3",
    "howItWorksStep4",
  ] as const;

  return (
    <article
      className="coffee-calc-seo"
      aria-labelledby="coffee-calc-seo-main-heading"
    >
      <h2 id="coffee-calc-seo-main-heading">{t("seoTitle")}</h2>
      <p>{t("seoText")}</p>

      <section className="coffee-calc-seo-section">
        <h3>{t("howItWorksTitle")}</h3>
        <p>{t("howItWorksIntro")}</p>
        <ol className="coffee-calc-seo-steps">
          {howItWorksSteps.map((stepKey) => (
            <li key={stepKey}>{t(stepKey)}</li>
          ))}
        </ol>
        <p>{t("howItWorksExample")}</p>
      </section>

      <section className="coffee-calc-seo-section">
        <h3>{t("methodologyTitle")}</h3>
        <p>{t("methodologyText")}</p>
        <p>{t("methodologyDisclaimer")}</p>
      </section>

      <section className="coffee-calc-seo-section">
        <h3>{t("comparisonTitle")}</h3>
        <CoffeeCalcPriceTable />
      </section>

      <section className="coffee-calc-seo-section">
        <h3>{t("useCasesTitle")}</h3>
        {useCaseKeys.map((key) => (
          <div key={key} className="coffee-calc-seo-use-case">
            <h4>{t(`${key}Title`)}</h4>
            <p>{t(`${key}Text`)}</p>
          </div>
        ))}
      </section>

      <section className="coffee-calc-seo-section coffee-calc-seo-faq-cta">
        <h3>{t("faqCtaTitle")}</h3>
        <p>{t("faqCtaText")}</p>
        <Link href="/faq" className="coffee-calc-seo-blog-link">
          {t("faqCtaLink")} →
        </Link>
      </section>

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
        <p className="coffee-calc-seo-faq-more">
          <Link href="/faq">{t("faqCtaLink")} →</Link>
        </p>
      </div>
    </article>
  );
};
