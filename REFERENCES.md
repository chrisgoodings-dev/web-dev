# Source references

Inline comments in the application refer to the identifiers below, for example `[C3]` or `[API5]`. These sources were used to verify standards, browser APIs and provider behaviour. The implementation was written for this project rather than copied verbatim from source examples.

Accessed: 4 October 2026.

## HTML and forms

- **[H1] MDN Web Docs.** *Structuring documents.* Semantic `header`, `nav`, `main`, `section`, `article` and `footer` usage. https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents
- **[H2] MDN Web Docs.** *`<search>` HTML generic search element.* Native semantic search/filter container. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search
- **[H3] MDN Web Docs.** *Forms and buttons in HTML.* Form controls, input types and browser validation. https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_forms
- **[H4] MDN Web Docs.** *`<fieldset>` HTML element.* Grouping related controls with a nested `<legend>`. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset
- **[H5] MDN Web Docs.** *Popover API.* Declarative `popover` and `popovertarget` behaviour. https://developer.mozilla.org/en-US/docs/Web/API/Popover_API

## Accessibility

- **[A1] MDN Web Docs.** *`<main>` HTML element.* Main landmark and skip-navigation target guidance. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main
- **[A2] W3C WAI.** *Providing Accessible Names and Descriptions.* Labels, `aria-label`, `aria-labelledby` and `aria-describedby`. https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- **[A3] W3C WAI.** *Disclosure (Show/Hide) Pattern.* Use of a button with `aria-expanded` and `aria-controls`. https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- **[A4] W3C WAI.** *Understanding Success Criterion 1.4.11: Non-text Contrast.* Contrast for user-interface boundaries and focus indicators. https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
- **[A5] W3C WAI.** *Understanding Success Criterion 2.4.7: Focus Visible.* Visible keyboard focus. https://www.w3.org/WAI/WCAG22/Understanding/focus-visible

## CSS

- **[C1] MDN Web Docs.** *`:focus-visible` CSS pseudo-class.* Input-modality-aware focus styling. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible
- **[C2] MDN Web Docs.** *Using media queries.* Responsive styles and user-preference media features. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using
- **[C3] MDN Web Docs.** *`container-type`* and *`@container`.* Component-level container queries. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/container-type
- **[C4] MDN Web Docs.** *View Transition API* and *`@view-transition`.* Same-origin cross-document transitions. https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- **[C5] MDN Web Docs.** *`prefers-reduced-motion`.* Respecting a user's reduced-motion preference. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

## JavaScript and browser APIs

- **[J1] MDN Web Docs.** *Fetch API.* Promise-based network requests and response handling. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **[J2] MDN Web Docs.** *AbortController.* Cancelling in-flight fetch requests with an AbortSignal. https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- **[J3] MDN Web Docs.** *Window.localStorage.* Origin-scoped persistence across browser sessions. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **[J4] MDN Web Docs.** *URLSearchParams.* Reading and constructing URL query strings. https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
- **[J5] MDN Web Docs.** *History.replaceState().* Updating the current URL/history entry without navigation. https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
- **[J6] MDN Web Docs.** *Client-side form validation.* HTML constraint validation enhanced with JavaScript. https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation

## API providers and research metadata

- **[API1] OpenAlex Help Center.** *API reference / endpoints overview.* Works endpoint structure, list and singleton behaviour. https://help.openalex.org/api/
- **[API2] OpenAlex Help Center.** *Search.* Works search fields, including `search.title` and `search.title_abstract_keywords`. https://help.openalex.org/api/searching/
- **[API3] OpenAlex Help Center.** *Get Singleton.* Retrieving one work with `GET /works/{id}`. https://help.openalex.org/api/get-single-entities/
- **[API4] OpenAlex Help Center.** *Works attributes.* DOI, publication metadata and Work fields. https://help.openalex.org/data/works/attributes/
- **[API5] Crossref.** *REST API.* Public API and `/works/{doi}` endpoint for a DOI metadata record. https://www.crossref.org/documentation/retrieve-metadata/rest-api/
- **[API6] OpenAlex Help Center.** *Open access.* Work `open_access` metadata, including `is_oa`. https://help.openalex.org/data/works/open-access/
- **[DATA1] OpenAlex Help Center.** *Works attributes: abstract_inverted_index.* Abstract words are mapped to their positions and can be reconstructed from the index. https://help.openalex.org/data/works/attributes/
