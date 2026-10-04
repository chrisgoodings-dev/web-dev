# Accessibility testing

This file records accessibility checks for the deployed Research Notes application.

Target standard: WCAG 2.2 AA.

Live site: https://chrisgoodings-dev.github.io/web-dev/

## Test pages

- Search: `index.html`
- Paper detail: `paper.html?id=W2741809807`
- Reading list: `reading-list.html`

## Automated testing

Run axe-core on each page after GitHub Pages has deployed the latest commit.

| Page | Tool / browser | Result | Issues found | Retest |
| --- | --- | --- | --- | --- |
| Search | axe-core | Pending | Pending | Pending |
| Paper detail | axe-core | Pending | Pending | Pending |
| Reading list | axe-core | Pending | Pending | Pending |

Record the exact number and severity of violations. Do not record "pass" until the scan has actually been run.

## Manual checks

| Check | Method | Expected result | Result |
| --- | --- | --- | --- |
| Keyboard navigation | Use Tab, Shift+Tab, Enter, Space and Escape without a mouse | All interactive controls are reachable, focus remains visible, menu and popover operate by keyboard | Pending |
| Skip link | Press Tab immediately after page load, then Enter on Skip to main content | Focus moves to the main content area | Pending |
| Search validation | Submit an empty/invalid search | Error is visible, linked to the field, and focus moves to the first invalid input | Pending |
| Dynamic status | Run a search, save notes and remove a paper | Status changes are announced without moving focus unnecessarily | Pending |
| Reflow | Test at 320 CSS px wide or equivalent 400% zoom at 1280px | No horizontal page scrolling is required for normal reading and operation | Pending |
| Text zoom | Increase text to 200% where supported | Text remains readable and controls do not overlap or clip | Pending |
| Reduced motion | Enable the operating system/browser reduced-motion preference | Page navigation remains usable and transition animation is removed | Pending |
| Popover | Open Why compare sources? by keyboard and close with Escape | Popover is operable without a pointer and returns to a sensible focus position | Pending |
| Screen reader | VoiceOver, NVDA or equivalent | Headings, landmarks, labels, status messages and control names are meaningful | Pending |
| Touch targets | Inspect mobile controls and links | Controls are comfortably operable without overlapping targets | Pending |

## Source-level checks already completed

- One H1 per page.
- Skip link present on every page.
- Main navigation has an accessible label.
- No duplicate IDs found.
- All `aria-describedby` references resolve to existing elements.
- Form controls have visible/programmatic labels.
- Radio controls are grouped with `fieldset` and `legend`.
- Invalid fields receive `aria-invalid` and linked error text.
- Dynamic status regions use `role="status"` and polite announcements.
- Visible two-tone keyboard focus is defined.
- Reduced-motion preferences are respected for View Transitions.
- External paper links warn that a new tab will open.
- Reading-list Remove buttons include the associated paper title in their accessible name.

## Issues and fixes

Add any problems found by axe, keyboard testing or assistive-technology testing here before submission. For each issue, record the page, problem, WCAG criterion if known, fix, and retest outcome.
