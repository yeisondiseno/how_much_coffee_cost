// Libraries
import { getTranslations } from "next-intl/server";
// Components (local)
import { Link } from "@/i18n/navigation";
// Libraries
import { CONTACT_EMAIL } from "@/lib/config";

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
      <section className="coffee-calc-legal-section coffee-calc-contact-email">
        <h2>{t("Contact.sections.email.title")}</h2>
        <p>{t("Contact.sections.email.body")}</p>
        <p className="coffee-calc-legal-link-row">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>{t("Contact.sections.email.responseTime")}</p>
      </section>
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
