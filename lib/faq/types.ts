export const FAQ_SECTION_KEYS = [
  "calculator",
  "prices",
  "budget",
  "privacy",
] as const;

export type FaqSectionKey = (typeof FAQ_SECTION_KEYS)[number];

export const FAQ_ITEM_KEYS = [
  "faq1",
  "faq2",
  "faq3",
  "faq4",
  "faq5",
  "faq6",
  "faq7",
  "faq8",
  "faq9",
  "faq10",
  "faq11",
  "faq12",
  "faq13",
  "faq14",
  "faq15",
  "faq16",
  "faq17",
  "faq18",
  "faq19",
  "faq20",
] as const;

export type FaqItemKey = (typeof FAQ_ITEM_KEYS)[number];

export const HOME_FAQ_COUNT = 5;

export const FAQ_SECTION_ITEMS: Record<FaqSectionKey, readonly FaqItemKey[]> = {
  calculator: ["faq1", "faq2", "faq3", "faq4", "faq5"],
  prices: ["faq6", "faq7", "faq8", "faq9", "faq10"],
  budget: ["faq11", "faq12", "faq13", "faq14", "faq15"],
  privacy: ["faq16", "faq17", "faq18", "faq19", "faq20"],
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqMessages = {
  metadataTitle: string;
  metadataDescription: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sectionTitles: Record<FaqSectionKey, string>;
  items: Record<FaqItemKey, FaqItem>;
};
