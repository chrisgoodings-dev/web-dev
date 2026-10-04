# Research Notes

A small client-side web application for finding research papers and keeping structured notes.

Live site: https://chrisgoodings-dev.github.io/web-dev/

## Purpose

Research Notes uses OpenAlex to search for papers. A user can open a paper, read its abstract, compare key metadata with Crossref, save it to a reading list, and keep evidence reported by the paper separate from their own interpretation.

## Pages

- `index.html` - search OpenAlex and view results.
- `paper.html` - view one paper, save it, and write notes.
- `reading-list.html` - review saved papers and notes.

## Technology

The application uses plain HTML, one external CSS file, and ES-module JavaScript. There is no framework, build step, npm dependency, backend, database or account system.

Saved papers and notes are stored only in the browser using `localStorage`.

The interface also uses progressive enhancement with the native `<search>` element, CSS container queries, the Popover API and cross-document View Transitions. Search requests use `AbortController` so a superseded request cannot overwrite newer results. Unsupported browsers keep the core HTML, CSS and JavaScript workflow. Reduced-motion preferences disable page transition animation.

## APIs

Two independent scholarly metadata providers are used:

- OpenAlex search: `https://api.openalex.org/works`
- OpenAlex work detail: `https://api.openalex.org/works/{id}`
- Crossref DOI metadata: `https://api.crossref.org/works/{doi}`

OpenAlex drives discovery and supplies the abstract. If the selected work has a DOI, Crossref is queried independently and the app compares the title, publication year and publication source. Crossref failure does not prevent the OpenAlex paper page from working.

## Accessibility

The application includes semantic HTML, skip links with focusable targets, labelled form controls, field-linked validation messages, live status announcements, descriptive control names, visible keyboard focus, keyboard-operable controls, mobile-first reflow and high-contrast text and control boundaries. See `ACCESSIBILITY_TESTING.md` for the test record.

## Testing

Manual testing has covered the main search, paper, notes and reading-list workflow on the deployed site, including mobile use. Search state is preserved when returning from a paper.

Source-level checks were also made for validation, loading, empty and error states. An axe-core scan should be completed before submission.

## Known limitations

OpenAlex and Crossref availability, rate limits and missing metadata are outside the application's control. Data is stored only in the current browser and can be lost if local site data is cleared.

## Future work

The following are deliberately outside the submitted project scope:

- accounts, a backend or database
- tags, folders or advanced reading-list organisation
- import, export or backup
- dashboards, charts or matrices
- offline support
- theme switching
- analytics
- an automated test framework

## References and development record

See `REFERENCES.md` for the documentation and standards cited inline from the source code.

See `DEVELOPMENT_LOG.md` for a factual record of development and testing sessions.
