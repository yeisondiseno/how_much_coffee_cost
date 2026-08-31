export const BASE_URL = "https://www.howmanycoffees.net";

export const GTM_ID = "GTM-MBD3HG86";

export const ADSENSE_CLIENT_ID = "ca-pub-8195825937047934";

/** Public author profiles for E-E-A-T (About page). */
export const AUTHOR_NAME = "Yeison Montoya";
export const AUTHOR_GITHUB = "https://github.com/yeisondiseno";

/** Last review date for reference drink prices shown in the calculator. */
export const PRICE_DATA_LAST_UPDATED = "August 2026";

/** Public contact email for privacy, feedback, and general inquiries. */
export const CONTACT_EMAIL = "contact@howmanycoffees.net";

/**
 * Hide ad unit placeholders until publisher approval.
 * The AdSense script and verification meta still load for Google review.
 * Set NEXT_PUBLIC_SHOW_ADS=true after approval.
 */
export const SHOW_ADS = process.env.NEXT_PUBLIC_SHOW_ADS === "true";

/** localStorage key for GDPR-style cookie consent (GTM + AdSense). */
export const CONSENT_STORAGE_KEY = "coffee-calc-cookie-consent";
