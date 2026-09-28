# 0004 · Content checks fail the build

**Status:** Accepted

**Context.** A bilingual site drifts: a string is added in English and forgotten in Spanish, or a `{{PLACEHOLDER}}` slips into production. Some content also must never be published.

**Decision.** Treat content like code. During static rendering, `assertContent()` throws on diverging translation keys or unfilled placeholders. Contract tests validate the data (diagram graphs, experience dates). A post-build script scans the output against a local, git-ignored list of confidential terms.

**Consequences.**

- Broken or incomplete copy cannot be deployed.
- The confidentiality list stays private; CI skips that one check and it runs on the author's machine before pushing.

**Reverses if:** content moves to a CMS with its own validation.
