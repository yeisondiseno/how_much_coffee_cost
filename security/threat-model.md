# Threat model — delta review (layout metadata)

**Scope:** `app/[locale]/layout.tsx` `generateMetadata` → `verification.google` changed from one Search Console token to an array of two static tokens.

**Type:** Delta / on-change Agent 16 review. Not a full-site audit.

## Engagement

| Field | Value |
| ----- | ----- |
| Target | `app/[locale]/layout.tsx` (`generateMetadata.verification.google` only) |
| Stack | Next.js 16.2.4 Metadata API, React 19 (Server Component) |
| Data classes | Public Search Console HTML-tag verification tokens (not credentials) |
| Conformance | OWASP ASVS 4.0 Level 2 + Top 10 2021 (client-relevant), scoped to this change |
| Assumptions | Tokens are Google Search Console `google-site-verification` values; no user/runtime input |

## Trust boundaries

| Boundary | Data | Risk for this change |
| -------- | ---- | -------------------- |
| Server `generateMetadata` → HTML `<head>` | Static string literals | Tokens appear in every locale HTML response (intended) |
| Browser → Google crawler | Public meta `content` | Google reads tags to prove origin control |
| Git / source maps / page source | Same tokens | Public by design; not a secret channel |

No new client JavaScript, storage, network calls, or user-controlled fields.

## Threats considered

1. XSS / HTML injection via `meta content`
2. Attribute breakout (`"` / `>` in token)
3. Accidental secret leakage (misclassified API keys)
4. CSP bypass or new script origin
5. Token reuse as auth material

## Out of scope

Consent-mode inline script, AdSense, GTM, analytics, CSP headers, dependencies, auth, and other routes.
