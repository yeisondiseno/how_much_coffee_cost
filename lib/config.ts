export const BASE_URL = "https://www.howmanycoffees.net";

export const GTM_ID = "GTM-MBD3HG86";

export const ADSENSE_CLIENT_ID = "ca-pub-8195825937047934";

/** Public contact email for privacy, feedback, and general inquiries. */
export const CONTACT_EMAIL = "contact@howmanycoffees.net";

/**
 * Hide AdSense slots until publisher approval (AdSense remediation).
 * Set NEXT_PUBLIC_SHOW_ADS=true in production after approval.
 */
export const SHOW_ADS = process.env.NEXT_PUBLIC_SHOW_ADS === "true";

/** localStorage key for GDPR-style cookie consent (GTM + AdSense). */
export const CONSENT_STORAGE_KEY = "coffee-calc-cookie-consent";
