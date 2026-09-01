# Attack surface — delta review (layout metadata)

**In scope:** only the `verification.google` array in `generateMetadata`.

## Added / changed surface

| Item | Detail |
| ---- | ------ |
| Route | All `app/[locale]/*` pages inherit locale layout metadata |
| Output | Two `<meta name="google-site-verification" content="…">` tags |
| Source | Hardcoded string literals (not `searchParams`, locale, CMS, or env) |
| Client JS | None added |
| Storage | None |
| Third-party scripts | None added |
| Server Actions / fetch | None |

## Token inventory (public by design)

| Token (truncated) | Class |
| ----------------- | ----- |
| `lR2SJ2UVLxwIqtX8Yp4gNAcLmsZZSYGOE9Xw5M62els` | Existing GSC HTML-tag verification |
| `QITtAvbig7mPV9WpAzkPTSM8xsaa5YjXWOYZV-tMnpU` | Additional GSC HTML-tag verification |

Character set observed: `[A-Za-z0-9_-]` only.

## Not inventoried (out of scope)

Forms, auth, `localStorage`, `NEXT_PUBLIC_*`, third-party widgets, API routes, WebSockets.
