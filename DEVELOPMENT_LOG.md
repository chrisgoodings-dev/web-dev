# Development log

## 2026-10-04 — Search page

Built the first Assessment 2 stage.

Files added or changed:
- `index.html`: semantic search page, search form, results area, skip link and navigation.
- `styles.css`: mobile-first styling, responsive navigation, form states, results layout and visible focus styles.
- `js/api.js`: OpenAlex works search request.
- `js/nav.js`: mobile menu toggle.
- `js/validation.js`: keyword and result-count validation with field-linked errors.
- `js/search.js`: form handling, loading/empty/error states and safe result rendering.

Browser checks:
- Tested at 320 px and 1024 px in headless Chromium using Playwright from a scratch location outside the repository.
- Checked keyboard focus on the skip link, menu toggle behaviour, form validation, API parameter construction, result rendering, missing-data fallbacks, and loading/empty/error behaviour.
- API responses were mocked during the browser test because this execution environment blocks browser navigation and external network access.
- A live OpenAlex request and axe-core scan were not run in this session and remain to be verified.
