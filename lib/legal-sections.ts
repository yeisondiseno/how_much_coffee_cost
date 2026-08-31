export const LEGAL_PAGE_SLUGS = ["privacy", "terms", "about", "contact"] as const;

export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number];

export const LEGAL_PAGE_NAMESPACE = {
  privacy: "Privacy",
  terms: "Terms",
  about: "About",
  contact: "Contact",
} as const satisfies Record<LegalPageSlug, string>;

export const LEGAL_PAGE_SECTIONS = {
  privacy: [
    "dataWeCollect",
    "cookies",
    "adsense",
    "analytics",
    "consent",
    "retention",
    "children",
    "changes",
    "inquiries",
  ],
  terms: [
    "acceptance",
    "service",
    "priceDisclaimer",
    "intellectualProperty",
    "prohibitedUse",
    "disclaimers",
    "liability",
    "changes",
    "governing",
  ],
  about: [
    "whatIs",
    "whoWeAre",
    "operator",
    "mission",
    "howItWorks",
    "accuracy",
    "connect",
  ],
  contact: [
    "email",
    "whatWeHelpWith",
    "privacyQuestions",
    "generalInquiries",
    "feedback",
    "responseExpectations",
  ],
} as const satisfies Record<LegalPageSlug, readonly string[]>;
