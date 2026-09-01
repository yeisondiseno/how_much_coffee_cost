# Frontend security audit — `verification.google` metadata

**Verdict: Pass**  
**Merge: allowed** (no Critical/High findings)  
**Date:** 2026-08-31  
**Scope:** `app/[locale]/layout.tsx` `generateMetadata.verification.google` only  
**Standards:** OWASP Top 10 2021 (A03, A02, A05) · ASVS 4.0 V5 / V8 / V14 (spot-check)

## Summary

The change replaces a single static Google Search Console token with a two-element array. Next.js 16 Metadata API types and renderer support `verification.google` as `string | (string | number)[]`. Each value is emitted as a separate React `<meta name="google-site-verification" content={String(value)} />`. Values are compile-time literals, HTML-attribute-encoded by React, and are **not secrets**.

No XSS, injection, CSP impact, or credential leakage.

## Findings

### SEC-016-001 — Search Console tokens are public by design (Info)

**OWASP:** A02:2021 Cryptographic Failures (negative finding — not a secret)  
**ASVS:** V8.3.4 (sensitive data in client) — **N/A / Pass** for this token class  
**Location:** `app/[locale]/layout.tsx` lines 72–77  
**Evidence:** Hardcoded tokens in `verification.google` array; rendered into HTML `<head>`  
**Impact:** Anyone can read both tokens from page source or git. That is how HTML-tag verification works. Possession of a token does not grant Search Console login, Google account access, or origin control.  
**PoC:** View source on any locale page; two `google-site-verification` meta tags are present.  
**Fix:** None required. Do not treat these as API keys or put them in a secrets manager expecting confidentiality.  
**Retest:** N/A

## Checks with no finding

| Check | Result |
| ----- | ------ |
| XSS via meta `content` | **Pass.** Tokens are static; charset `[A-Za-z0-9_-]`; React encodes attributes. Browsers do not execute `google-site-verification` as script. |
| HTML / attribute injection | **Pass.** No quotes, `>`, `<`, or `javascript:` in values. Renderer uses JSX `content={String(value)}`, not string-concatenated HTML. |
| User-controlled input | **Pass.** Locale is used for copy, not for verification tokens. |
| Secret leakage | **Pass.** These are ownership-proof strings, same class as the existing token and AdSense publisher id. Hardcoding is appropriate. |
| CSP | **Pass.** Tags are not `http-equiv="Content-Security-Policy"`. No new scripts, inline JS, or origins. |
| Array rendering | **Pass.** Next.js `ResolvedVerification.google` is `(string \| number)[]`; `metadata.js` loops and emits one meta tag per value. |

## Gate

| Rule | Status |
| ---- | ------ |
| Block on Critical/High | None open |
| Sign-off | **Pass** — merge may proceed for this change |
