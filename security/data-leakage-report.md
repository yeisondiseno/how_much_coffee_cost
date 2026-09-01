# Data leakage report — delta: `verification.google`

## Hunt (scoped)

| Vector | Result |
| ------ | ------ |
| `NEXT_PUBLIC_*` / env | Not used for these tokens |
| Client bundle / `__NEXT_DATA__` | Tokens appear in HTML `<head>` (intended), not as JS secrets |
| `localStorage` / cookies | Unchanged |
| Query string / hash | Unchanged |
| Analytics / error SDKs | This change does not add telemetry of the tokens |
| HTML comments / `data-*` | Tokens only in standard `google-site-verification` meta |
| Source maps / git | Tokens visible in repo — expected for HTML-tag verification |

## Classification

Google Search Console HTML meta verification tokens prove that the publisher can edit the origin’s HTML. They are **not**:

- OAuth client secrets
- API keys
- Session tokens
- Webmaster account passwords

Publishing them in `<head>` is the verification method. Adding a second token (second property or Google account) does not expand confidentiality risk beyond the first token already in the layout.

**No leakage finding.**
