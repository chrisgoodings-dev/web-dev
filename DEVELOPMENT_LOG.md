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

## 2026-10-04 — Search workflow refinement

Changes made after live mobile testing:
- Removed a literal `\\n` sequence that appeared in the mobile navigation.
- Preserved the search state in the page URL, including query, search scope, result count, sort order and open-access filter.
- Search-result links now carry a validated return URL to the paper page.
- The paper page's Back to search link restores the previous search and automatically reruns it.

Design decision:
- Used persistent search rather than adding a second quick-save interaction to the results page. This fixes the workflow problem without duplicating reading-list behaviour or expanding the feature set.

Checks performed:
- Reviewed the generated HTML to confirm the stray navigation text is removed.
- Reviewed the search-state and return-link logic after commit.
- Current size is 482 JavaScript lines across 7 files and 827 application-source lines overall.
- Live deployment status was checked through GitHub Pages. Browser interaction still requires manual verification on the deployed site.

## 2026-10-04 — Final requirements and accessibility audit

- Added a README with scope, API details, testing notes, known limitations and future work.
- Checked all three pages have unique titles, one H1, a skip link and labelled main navigation.
- Checked form controls, field-linked error references and IDs for missing or duplicate relationships.
- Confirmed the required CSS selector types, custom properties, Grid and mobile-first media query are present.
- Confirmed JavaScript covers menu interaction, validation, fetch, loading, empty and error states.
- Strengthened the custom keyboard focus indicator with a two-tone focus treatment.
- Core text colours were checked against their backgrounds and exceed the WCAG AA 4.5:1 contrast threshold.
- axe-core could not be run in this environment and remains a pre-submission manual check.

## 2026-10-04 — Multi-provider metadata provenance

Expanded the project scope from 20 to 30 hours and raised the agreed implementation limits to 1,300 application-source lines and 700 JavaScript lines.

Changes made:
- Added Crossref as a second API provider using DOI lookup.
- Paper detail now compares title, publication year and publication source from OpenAlex and Crossref.
- Added explicit Matches, Different and Not supplied states rather than inventing a numerical confidence score.
- Kept Crossref enrichment non-blocking so the OpenAlex paper view still works if Crossref fails or the paper has no DOI.
- Added a native Popover API explanation for metadata provenance, with an inline fallback when popovers are unsupported.
- Added DOI display to the paper metadata and updated the README/API documentation.

Verification:
- Crossref documentation confirms public anonymous access and the `/works/{doi}` endpoint.
- JavaScript syntax and live Crossref browser behaviour still require checking after GitHub Pages deploys this stage.

## 2026-10-04 — Modern platform enhancements

Added standards-based progressive enhancements without introducing a framework or build step.

Changes made:
- Replaced the generic search wrapper with the native `<search>` element to expose a semantic search landmark.
- Added a container query so search-result cards respond to the width of their component area rather than only the viewport.
- Added same-origin cross-document View Transitions for navigation between the three HTML pages.
- Added `prefers-reduced-motion` handling so transition animation is disabled for users who request reduced motion.
- Kept every enhancement progressive: browsers without these capabilities retain the normal multi-page navigation and mobile-first layout.

Verification:
- Source structure was reviewed after the change.
- Live rendering and reduced-motion behaviour remain to be checked on the deployed GitHub Pages site.

## 2026-10-04 — Request cancellation and stale-response protection

Improved the asynchronous search workflow with the native AbortController API.

Changes made:
- Each new search cancels any earlier OpenAlex search that is still in flight.
- The API helper now accepts an AbortSignal and passes it directly to fetch.
- Results are only rendered when the response belongs to the currently active request.
- AbortError is treated as an expected cancellation rather than a user-facing failure.
- The loading state is only cleared by the request that currently owns it, preventing an older request from resetting a newer search.

This removes a race condition where an older, slower response could otherwise replace results from a newer search.

## 2026-10-04 — Post-enhancement accessibility recheck

Rechecked the three HTML pages after the modern-platform and request-cancellation changes.

- Each page still has one H1, a skip link and labelled main navigation.
- No duplicate IDs were found.
- All aria-describedby references resolve to existing elements.
- ID-based form controls remain labelled.
- Request cancellation uses AbortController, ignores expected AbortError failures and prevents stale responses from replacing newer results.
- axe-core still requires a browser-based run on the deployed site before submission.

## 2026-10-04 — Accessibility source fixes

Changes made after WCAG-focused source review:
- Added a darker control-border colour for inputs, selects, textareas, menu and secondary buttons so interactive boundaries are more distinct from white backgrounds.
- Made each main-content skip-link target programmatically focusable with `tabindex="-1"`.
- Added descriptive accessible names to reading-list Remove buttons using the paper title.
- Changed the external paper link text to warn that it opens in a new tab.
- Prepared a separate accessibility test record for axe, keyboard, reflow, zoom, reduced motion and screen-reader checks.

These changes address source-level issues. Automated and assistive-technology test results must still be recorded separately rather than assumed.

## 2026-10-04 — Source-reference pass

Added a central `REFERENCES.md` and inline reference identifiers across all HTML, CSS and JavaScript source files.

- HTML comments cite semantic structure, forms, skip navigation, accessible naming and the Popover API.
- CSS comments cite focus visibility, non-text contrast, media queries, container queries, View Transitions and reduced-motion handling.
- JavaScript comments cite Fetch, AbortController, URL/history state, localStorage, form validation and accessible disclosure behaviour.
- API code cites OpenAlex search/single-work/open-access documentation, the OpenAlex abstract representation, and the Crossref DOI endpoint.
- Authoritative provider, MDN and W3C/WAI documentation was preferred. No Stack Overflow code was copied into the project.
