// Libraries
import { getLocale } from "next-intl/server";
// Libraries (local)
import { loadFaqMessages } from "@/lib/faq/messages";
import { FAQ_SECTION_ITEMS, FAQ_SECTION_KEYS } from "@/lib/faq/types";

export const FaqContent = async () => {
  const locale = await getLocale();
  const faq = await loadFaqMessages(locale);

  return (
    <article className="coffee-calc-legal-article">
      <h1 className="coffee-calc-legal-title">{faq.title}</h1>
      <p className="coffee-calc-legal-updated">{faq.lastUpdated}</p>
      <p className="coffee-calc-legal-intro">{faq.intro}</p>

      {FAQ_SECTION_KEYS.map((sectionKey) => (
        <section key={sectionKey} className="coffee-calc-legal-section">
          <h2>{faq.sectionTitles[sectionKey]}</h2>
          <dl className="coffee-calc-seo-faq-list">
            {FAQ_SECTION_ITEMS[sectionKey].map((itemKey) => {
              const item = faq.items[itemKey];
              return (
                <div key={itemKey} className="coffee-calc-seo-faq-item">
                  <dt className="coffee-calc-seo-faq-q">{item.q}</dt>
                  <dd className="coffee-calc-seo-faq-a">{item.a}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </article>
  );
};
