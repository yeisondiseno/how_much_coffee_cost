// Libraries
import { getTranslations } from "next-intl/server";
// Components (local)
import { Link } from "@/i18n/navigation";

const CONTACT_LINK_SECTIONS = {
  privacyQuestions: { href: "/privacy", labelKey: "privacyPageLink" },
  generalInquiries: { href: "/about", labelKey: "aboutPageLink" },
} as const;

type ContactLinkSection = keyof typeof CONTACT_LINK_SECTIONS;

export const ContactContent = async () => {
  const t = await getTranslations("Legal");
  const sectionKeys = [
    "whatWeHelpWith",
    "privacyQuestions",
    "generalInquiries",
    "feedback",
    "responseExpectations",
  ] as const;

  return (
    <article className="coffee-calc-legal-article">
      <h1 className="coffee-calc-legal-title">{t("Contact.title")}</h1>
      <p className="coffee-calc-legal-updated">{t("Contact.lastUpdated")}</p>
      <p className="coffee-calc-legal-intro">{t("Contact.intro")}</p>
      {sectionKeys.map((key) => {
        const linkConfig = CONTACT_LINK_SECTIONS[key as ContactLinkSection];

        return (
          <section key={key} className="coffee-calc-legal-section">
            <h2>{t(`Contact.sections.${key}.title`)}</h2>
            <p>{t(`Contact.sections.${key}.body`)}</p>
            {linkConfig ? (
              <p className="coffee-calc-legal-link-row">
                <Link href={linkConfig.href}>{t(`Contact.${linkConfig.labelKey}`)}</Link>
              </p>
            ) : null}
          </section>
        );
      })}
    </article>
  );
};
