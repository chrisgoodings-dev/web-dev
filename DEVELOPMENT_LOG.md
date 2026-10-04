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

## 2026-10-04 — Paper detail page

Built the second Assessment 2 stage.

Files added or changed:
- `paper.html`: paper metadata, abstract and separate evidence/interpretation note fields.
- `js/api.js`: added the OpenAlex get-by-ID endpoint.
- `js/paper.js`: loads and renders one work, reconstructs abstracts, handles invalid IDs, and saves/removes notes.
- `js/storage.js`: localStorage helper for the reading list and notes.
- `styles.css`: paper-detail and textarea styling, including visible textarea focus.

Checks performed:
- Confirmed a live OpenAlex get-by-ID response for work `W2741809807` and checked the fields used by the page.
- Confirmed GitHub Pages successfully deployed the latest commit for this stage.
- Checked current project size: 372 JavaScript lines across 6 JavaScript files, 667 source lines overall.
- Attempted an automated Chromium browser check. The available Chromium instance is controlled by an organisation policy that blocks local, file, and external page navigation, so the live browser interaction test could not be completed in this environment.
- The GitHub Pages URL is also not fetchable by the available web retrieval tool, so live-page rendering, CORS behaviour, 320 px reflow and note persistence on the deployed origin remain to be manually verified.

## 2026-10-04 — Reading list page

Built the third Assessment 2 page.

Files added or changed:
- `reading-list.html`: saved-paper list with unique page title, navigation and status region.
- `js/reading-list.js`: renders saved papers, displays evidence/interpretation notes and removes papers.
- `index.html` and `paper.html`: added Reading list navigation.
- `styles.css`: added reading-note and secondary-button styling.

Checks performed:
- Confirmed JavaScript syntax for the new reading-list module with Node.
- Confirmed GitHub Pages successfully deployed the final commit for this stage.
- Checked current project size: 439 JavaScript lines across 7 JavaScript files, 783 source lines overall.
- Attempted a Chromium browser check again. Navigation is blocked by the managed browser policy in this environment, including data, file, local and external URLs, so the rendered Reading list page could not be verified here.
- A live reading-list interaction check, 320 px reflow check and axe-core scan therefore remain to be completed manually on the deployed site.
