# OWASP Top 10 2021 matrix — delta: `verification.google`

Categories not touched by this change are **N/A (out of scope)**, not a full-site Pass.

| ID | Risk | Result | Notes |
| -- | ---- | ------ | ----- |
| A01 | Broken Access Control | N/A | No UI/auth change |
| A02 | Cryptographic Failures | **Pass** | Tokens are public GSC verification strings, not credentials |
| A03 | Injection | **Pass** | Static literals; React attribute encoding; no `dangerouslySetInnerHTML` for these values |
| A04 | Insecure Design | N/A | No security-control design change |
| A05 | Security Misconfiguration | **Pass** | Meta verification tags do not weaken CSP or headers |
| A06 | Vulnerable Components | N/A | No dependency change |
| A07 | Auth Failures | N/A | Not session/auth material |
| A08 | Integrity Failures | N/A | No new third-party scripts |
| A09 | Logging & Monitoring | N/A | Tokens not sent to analytics by this change |
| A10 | SSRF | N/A | No fetch URLs |
