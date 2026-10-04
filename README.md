# Research Notes

A small client-side web application for finding research papers and keeping structured notes.

Live site: https://chrisgoodings-dev.github.io/web-dev/

## Purpose

Research Notes uses OpenAlex to search for papers. A user can open a paper, read its abstract, save it to a reading list, and keep evidence reported by the paper separate from their own interpretation.

## Pages

- `index.html` - search OpenAlex and view results.
- `paper.html` - view one paper, save it, and write notes.
- `reading-list.html` - review saved papers and notes.

## Technology

The application uses plain HTML, one external CSS file, and ES-module JavaScript. There is no framework, build step, npm dependency, backend, database or account system.

Saved papers and notes are stored only in the browser using `localStorage`.

## API

Only the OpenAlex Works API is used:

- Search: `https://api.openalex.org/works`
- Get one work: `https://api.openalex.org/works/{id}`

Search terms, search scope, result count, sort order and the open-access option drive the search request.

## Accessibility

The application includes semantic HTML, skip links, labelled form controls, field-linked validation messages, live status announcements, visible keyboard focus, keyboard-operable controls, mobile-first reflow and high-contrast text.

## Testing

Manual testing has covered the main search, paper, notes and reading-list workflow on the deployed site, including mobile use. Search state is preserved when returning from a paper.

Source-level checks were also made for validation, loading, empty and error states. An axe-core scan should be completed before submission.

## Known limitations

OpenAlex availability, rate limits and missing metadata are outside the application's control. Data is stored only in the current browser and can be lost if local site data is cleared.

## Future work

The following are deliberately outside the submitted project scope:

- accounts, a backend or database
- additional APIs
- tags, folders or advanced reading-list organisation
- import, export or backup
- dashboards, charts or matrices
- offline support
- theme switching
- analytics
- an automated test framework

## Development record

See `DEVELOPMENT_LOG.md` for a factual record of development and testing sessions.
