# Feature: Personal Identity Portfolio Redesign

The following plan should be complete, but it's important to validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils/types/models. Import from the right files etc. This is a static HTML/CSS/JS site — "importing" here means reusing existing CSS classes, `js/script.js` behaviors, and card component markup exactly as documented in `CLAUDE.md`, not adding new tooling.

## Feature Description

A full visual and narrative redesign of the homepage, a consistent restyle of all existing content pages (`experience.html`, `education.html`, `media.html`, `community.html`, `contact.html`) to match a new warm-earth-tone editorial design system, plus two new pieces of interactivity: a static SVG world travel map on a new `pages/travel.html`, and a real (Formspree-backed) contact form replacing the current simulated one.

## User Story

As an event organizer, recruiter, or collaborator vetting Maria before an invite, offer, or partnership
I want to land on a site that reads as a curated professional narrative rather than a resume list
So that I come away with a stronger, more memorable impression and reach out with more confidence

## Problem Statement

The current site (plain resume-style layout, generic blue/grey palette, Hero → About → Featured In homepage) doesn't convey Maria's distinct identity — a generalist spanning AI/ML, healthcare/biotech, and community/speaking — and defaults vetters back to LinkedIn or word of mouth.

## Solution Statement

Rebuild the homepage around a 6-section narrative flow, apply a new warm/editorial design system (clay-terracotta + amber accents, serif headline + sans body, subtle paper texture) across every existing page via `css/styles.css`, and add a travel map (personality layer, secondary, linked only from the homepage) and a working contact form — all within the existing static HTML/CSS/JS, no-build-step, GitHub Pages constraints.

## Out of Scope / Non-Goals

- Not changing the page-per-topic IA: `experience.html`, `education.html`, `media.html`, `community.html`, `contact.html` remain separate deep-dive pages, unchanged in structure/section order.
- Not rewriting existing page copy — work experience descriptions, education entries, article/talk/award listings, and community entries keep their current text. Only homepage copy (hero statement, narrative blocks, pull-quotes) is new.
- Not adding `pages/travel.html` to the main nav bar — it's linked only from the homepage travel-teaser section, per explicit user confirmation.
- Not implementing analytics (Plausible/GoatCounter) in this pass — flagged by the user as a "constraint" but the PRD marks analytics as open/TBD and it's an independent, low-risk addition; call out as a fast-follow in Open Questions rather than bundling into this already-large release. (Confirm before cutting — see Open Questions.)
- Not building a CMS, JSON content layer, or database — content stays hardcoded HTML per `CLAUDE.md`.
- Not finalizing the real Formspree endpoint — user will provide it later; this plan wires the form fully against a placeholder ID.
- Not touching `articles.html` / `talks.html` / `awards.html` legacy pages beyond whatever the site-wide CSS restyle naturally cascades to them (they're deprecated per git history "remove legacy pages" — verify they still exist before assuming; do not invest new design work in them).

## Feature Metadata

**Feature Type**: Enhancement (visual redesign + new interactive features)
**Estimated Complexity**: High (large surface area: 1 new design system applied across 6 pages, 1 new page, 1 new dataset-driven SVG interaction, 1 new external service integration)
**Primary Systems Affected**: `css/styles.css`, `index.html`, `pages/*.html`, `js/script.js` (site-wide behaviors only), new `pages/travel.html`
**Dependencies**: Google Fonts (Fraunces + Inter), a CC0/free-license SVG world map asset (to be sourced), Formspree free tier (endpoint TBD — placeholder used for now)

## Related Work

**Implements**: `personal-identity-portfolio-redesign.prd.md` (repo root) — includes the resolved Architecture section within the same document.

**Back-references**: none — first plan for this repo's `.claude/plans/` (directory did not exist before this plan).

**Forward-references**: (none yet)

---

## CONTEXT REFERENCES

### Relevant Codebase Files — READ THESE BEFORE IMPLEMENTING

- `CLAUDE.md` (repo root, full file) — Why: canonical source for card component HTML patterns (article, event, award, experience, project, education, certification, organization cards), nav structure, path conventions (`../` prefix inside `pages/`), footer structure, content rules (chronological ordering, `Month Day, Year` date format, `target="_blank" rel="noopener noreferrer"` on all external links). Every new page/section must follow these patterns exactly.
- `index.html` (full file, 148 lines) — Why: current homepage to be replaced. Note existing sections: `#hero` (lines 35-48, contains `.mission-box`, `.profile-container`, `.profile-image`, `.mission-icon`), `#about` (51-64), `#featured` id + `.featured-in` class (67-127, contains `.featured-grid` of `.featured-card` — **this pattern is what the new "Selected writing/media" section and the condensed Featured In content should reuse/adapt**, not reinvent). Footer (130-148) is copy-paste identical across all pages — do not alter its structure, only its CSS treatment.
- `pages/contact.html` (full file, 139 lines) — Why: (1) contains the external-link contact-methods pattern to preserve; (2) **contains an orphaned inline `<script>` (lines 122-137) that duplicates `js/script.js`'s own `#contactForm` handler (script.js:69-85), but there is currently no `<form id="contactForm">` element in the HTML body at all** — the form markup was removed at some point but both JS handlers were left in place. This must be fixed as part of the Formspree work: add the form back and reconcile the duplicate handlers (see Gotchas).
- `js/script.js` (full file, 273 lines) — Why: site-wide behavior lives here; **do not add page-specific logic to this file** per `CLAUDE.md` ("Do not modify script.js unless specifically asked"). Relevant existing hooks the redesign must not break: mobile menu toggle (3-9), active-nav-link-by-pathname matching (43-49) — new `pages/travel.html` needs a nav link somewhere matching this logic if it ever gets a nav entry (it won't, per scope), smooth-scroll anchor handling (20-40) — reusable for in-page CTA anchors, IntersectionObserver section-reveal (52-66) — every new `<section>` gets `.section-visible` automatically, generic `#contactForm`/`#formStatus` handler (69-85) — **this already does everything the inline script in contact.html duplicates; the Formspree wiring should replace/extend this shared handler, not add a second per-page one**, card hover enhancement (131-142) — targets a fixed list of card classes by name, back-to-top button (174-223), section-nav active-state observer (225-270) — only relevant to multi-section pages with `.section-nav-menu`, not needed for the homepage or travel.html.
- `css/styles.css` (full file, 1773 lines) — Why: single stylesheet, all new styles append here. Key anchors: `:root` variables (lines 3-20) — replaced wholesale by the new design tokens; `.hero` (206-, plus a second override block ~1566-1596) — note the codebase already has **duplicate/overriding rules for `.hero` and `.featured-card` at two different line ranges** (206 vs 1566, 1410/1475 vs 1606) — when redesigning, consolidate rather than adding a third override block; responsive breakpoints at lines 1181 (950px — hamburger/nav), 1241 (768px), 1313 (480px) plus page-specific ones further down (1664, 1670, 1765) — new component CSS must add its own responsive rules near these existing breakpoint blocks, not scattered ad hoc.
- `pages/media.html` (article-card / event-card / award-card usage) — Why: reference for pull-quote-free article card markup that the homepage's "Selected writing/media" section will need a pull-quote variant of.
- `pages/experience.html`, `pages/education.html`, `pages/community.html` — Why: each contains the card types (`experience-card`, `project-card`, `education-card`, `certification-card`, `organization-card`) whose CSS gets restyled (colors/type/texture) but whose HTML structure and content must not change.

### New Files to Create

- `pages/travel.html` — new standalone page hosting the full interactive SVG world map + story panel, linked only from the homepage travel-teaser (not in main nav).
- `assets/images/world-map.svg` (or similar name) — the sourced CC0/free-license SVG world map asset with per-country `<path id="XX">` elements.

### Relevant Documentation — READ BEFORE IMPLEMENTING

- [Google Fonts: Fraunces](https://fonts.google.com/specimen/Fraunces) — variable font, use the `opsz,wght@9..144,400;9..144,500;9..144,600` axis range for headline weights; confirm the `<link>` tag syntax for variable-axis Google Fonts (differs slightly from the current static-weight Inter link in every page's `<head>`).
- [Google Fonts: Inter](https://fonts.google.com/specimen/Inter) — already in use (weights 300/400/500/600/700), keep as body font, no change needed to the existing `<link>` beyond combining with Fraunces in one request.
- [MDN: SVG `<path>` and `tabindex`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/tabindex) — Why: SVG elements need `tabindex="0"` (and `focusable="true"` for older browser support) plus `:focus-visible` CSS to be keyboard-focusable, which plain `:hover` alone does not provide — required per the accessibility constraint on the map.
- [Formspree docs — AJAX form submission](https://help.formspree.io/hc/en-us/articles/360055613373-Submit-forms-with-AJAX-for-custom-error-and-thank-you-messages) — Why: shows the `fetch()` pattern (POST to `https://formspree.io/f/{form_id}` with `Accept: application/json` header) needed to replace the current `setTimeout`-simulated success message with a real network request while keeping the same `.form-status` UI states (`sending`/`success`/error).
- Simplemaps or amCharts free-tier world map SVGs — Why: source for the per-country map asset; **license must be checked before use/modification** per the architecture doc — confirm CC0 or a license permitting modification/redistribution before committing the file to the repo.

### Patterns to Follow

**Naming Conventions:** Component classes follow `{component}-card`, `{component}-header`, `{component}-body`, `{component}-detail`, `{component}-label`, `{component}-value` (see `CLAUDE.md` card patterns). New homepage sections should follow the same header/body split idiom even though they're not "cards" (e.g. `.narrative-block`, `.narrative-block-header`, `.narrative-block-body`) so the existing IntersectionObserver / hover-enhancement JS patterns can be extended consistently later if needed.

**External Links:** Every `<a target="_blank">` must carry `rel="noopener noreferrer"` — already partially automated by `js/script.js:88-96`, but write it into the HTML explicitly anyway per `CLAUDE.md`'s stated rule (the JS is a safety net, not the source of truth).

**Section structure (existing):**
```html
<section id="section-id" class="section-class-name">
  <div class="container">
    <h2>Section Title</h2>
    <!-- content -->
  </div>
</section>
```
Every new homepage section must follow this exact wrapper shape — the IntersectionObserver in `js/script.js:52-66` selects all `<section>` elements generically and adds `.section-visible`; skipping the wrapper breaks the reveal animation for that section.

**CSS variable usage:** every color in new component CSS must reference a `var(--token-name)`, never a literal hex — this is how the entire site's palette gets swapped in one place (`:root` block).

**Form status pattern (existing, to extend not duplicate):**
```js
// js/script.js:69-85 — existing generic handler, extend this in place
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = 'Sending message...';
    formStatus.className = 'form-status sending';
    // TODO: replace setTimeout simulation with real fetch() to Formspree
  });
}
```

---

## IMPLEMENTATION PLAN

### Phase 1: Design System Foundation

Establish the new design tokens and typography before any page-level markup changes, so every subsequent phase styles against a stable `:root`.

**Tasks:**

- Replace `:root` CSS variables in `css/styles.css` (lines 3-20) with the new warm-earth-tone token set (see Patterns/tokens below).
- Update the Google Fonts `<link>` tag in every HTML file's `<head>` (`index.html` + all 5 `pages/*.html` + `travel.html` once created) to load both Fraunces (variable, headline weights) and Inter (existing weights).
- Add `--font-headline` / `--font-body` variables and apply `--font-headline` to `h1, h2, h3` site-wide; keep `--font-body` on `body`.
- Add a subtle repeating background texture (inline SVG data-URI noise, no new asset file) applied via a new `.textured-bg` utility class or directly on `body`/section backgrounds.
- Consolidate the duplicate `.hero` (206 vs ~1566) and `.featured-card` (1410/1475 vs 1606) override blocks discovered during analysis into single definitions using the new tokens, rather than adding a third override layer.

### Phase 2: Homepage Rebuild

**Depends on:** Phase 1 (needs tokens/fonts in place to style against)

Rebuild `index.html` from the current 3-section layout (`#hero`, `#about`, `#featured`) into the confirmed 6-section narrative flow.

**Tasks:**

- Rebuild `#hero`: one-sentence positioning statement (not job title first) + existing profile photo, drop the emoji `.mission-icon` treatment for a design-system-appropriate accent instead (rocket emoji reads inconsistent with the new editorial tone — confirm removal is fine, flagged in Open Questions).
- Add new `#credibility` section: compact horizontal strip of 3-4 short anchors (Loka role, Davos 2026 Global Shaper, GenH, published writer), each linking to the relevant deep-dive page (`experience.html`, `community.html`, `media.html`).
- Add new `#narrative` section: 2-3 theme blocks (AI+healthcare / community & intergenerational bridging / global perspective), each a short paragraph + link to its deep-dive page. New copy — draft using existing `About` section prose (lines 55-60 of current `index.html`) as source material, don't fabricate new facts.
- Replace `#featured` with `#writing`: condense to 2-3 published pieces with a pull-quote each, linking to the full piece (external URL) — reuse `.featured-card` markup shape but add a `.featured-pullquote` element; the remaining "Featured In" items move to `media.html`'s existing `#featured-in` section if not already duplicated there (check for overlap before removing anything from `media.html`).
- Add new `#travel-teaser` section: visually secondary (smaller card, muted treatment relative to `#writing`/`#narrative`), links to `pages/travel.html`.
- Add new `#cta` section: single call-to-action for speaking/collaboration, linking to `pages/contact.html` — no scattered link list.
- Update `<meta name="description">` if the positioning statement materially changes what the page is about.

### Phase 3: Site-Wide Restyle of Existing Pages

**Independent of:** Phase 2 (same token dependency on Phase 1, but doesn't depend on homepage content) — can run in parallel with Phase 2 if split across sessions.

Apply the new design system's visual treatment (color, type, texture, spacing) to `experience.html`, `education.html`, `media.html`, `community.html`, `contact.html` without changing their HTML structure or copy.

**Tasks:**

- Verify each page's existing card types (`experience-card`, `project-card`, `education-card`, `certification-card`, `organization-card`, `article-card`, `event-card`, `award-card`) render correctly against the new tokens — since color is entirely var-driven from Phase 1, this should mostly be a verification pass, not new CSS, except where hardcoded hex values exist outside `:root` usage (grep for stray hex codes during this phase).
- Grep `css/styles.css` for any literal hex/rgb color values outside the `:root` block and replace with `var()` references so Phase 1's token swap actually reaches every component.
- Re-check the section-nav sticky bar (`.section-nav-menu`, IntersectionObserver-driven active state per `js/script.js:225-270`) still reads correctly against the new palette (active-state highlight color must use the new accent, not the old link-color default).

### Phase 4: Contact Form (Formspree)

**Depends on:** Phase 1 (form styling needs new tokens) — independent of Phases 2/3.

Fix the orphaned form-handler bug and wire a real submission.

**Tasks:**

- Add the missing `<form id="contactForm">` markup back to `pages/contact.html` (fields: name, email, message — minimum viable set; confirm field list, see Open Questions) inside `.contact-content`, alongside the existing `.contact-info` block.
- Add `<div id="formStatus" class="form-status"></div>` for status messages, matching the existing class contract (`sending`/`success` used by both JS handlers today).
- **Remove the duplicate inline `<script>` block from `pages/contact.html` (lines 122-137)** — it's dead weight duplicating `js/script.js:69-85` and will double-fire once a real `<form>` exists. Keep only the shared `js/script.js` handler.
- Update the shared handler in `js/script.js:69-85` to `fetch()` `https://formspree.io/f/YOUR_FORM_ID` with `Accept: application/json`, `body: new FormData(contactForm)`, replacing the `setTimeout` simulation — keep the same `.form-status` class transitions (`sending` → `success` or an `error` class on failure, which doesn't exist as a CSS class yet — add `.form-status.error` using `--error-color`).
- Leave `YOUR_FORM_ID` as a clearly-marked placeholder (e.g. `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // TODO: replace once Formspree account is created`).

### Phase 5: Travel Map

**Depends on:** Phase 1 (tokens) and Phase 2 (needs the `#travel-teaser` section on the homepage to link from) — the map page itself can be built in parallel with Phase 2/3/4 and wired up last.

**Tasks:**

- Source a CC0/free-to-modify SVG world map with per-country `<path id="XX">` elements (ISO 3166-1 alpha-2 ids); verify license terms explicitly before committing the file. Save as `assets/images/world-map.svg`.
- Create `pages/travel.html` following the standard page skeleton from `CLAUDE.md` (header/nav — same nav as every other page, **no new nav item for this page**, footer identical to other pages).
- Embed the SVG inline in the page (not via `<img>`) so individual `<path>` elements are stylable/interactive via CSS/JS.
- Add an inline `<script>` block (page-specific, per the `contact.html` precedent — do not put this in `js/script.js`) containing the country → story JS object (data below) keyed by alpha-2 code, plus hover/click/focus handlers that populate a story panel element.
- Color-code every country path: visited countries get the accent fill (`var(--accent-color)` or a lighter tint), non-visited countries a neutral/muted fill; countries with only "Visited." (ES, BE, LU, IT, GR, AL, SE) still get the visited color-code but their story panel shows just the country name, no fabricated anecdote.
- Add `tabindex="0"` to every visited `<path>` (non-visited paths don't need to be focusable) plus a `:focus-visible` CSS outline using the accent color, so keyboard users get the same story-panel reveal as mouse hover.
- Verify at mobile widths (test at 480px and 768px per existing breakpoints) that the map remains legible and the story panel doesn't break layout — SVG viewBox scaling should handle most of this, but panel positioning (overlay vs. below-map stacked) needs explicit mobile CSS.
- Add the `#travel-teaser` link target on the homepage (Phase 2) pointing to `pages/travel.html`.

**Travel map dataset** (verbatim from PRD, colocate as a JS object in `pages/travel.html`'s inline script):

```js
const travelStories = {
  PT: "Home country — where Maria has lived and is based.",
  US: "First visit in 2026, for the US Life Sciences Symposium in New York City. Also visited Boston, including MIT and the university's overall atmosphere.",
  MX: "A 2–3 week car road trip through different towns and cities, plus a scuba diving certification course along the way.",
  CO: "Three months living in Medellín and Bogotá as part of an explorer programme offered by Loka, the company Maria currently works for — also explored the country more broadly.",
  MA: "Maria's first trip outside Europe.",
  ES: null, // "Visited." only — story panel shows country name, no anecdote
  FR: "Visited Alsace, and lived for 6 months in Toulouse, in the south.",
  GB: "Maria's first trip abroad alone, and her first flight, at age 16.",
  NL: "A one-week cycling tour.",
  BE: null,
  LU: null,
  CH: "Visited for conferences; also organized a programme in 2026 that brought 15 Portuguese people to Switzerland to learn about the Basel ecosystem, through GenAI-related work.",
  IT: null,
  GR: null,
  AL: null,
  SE: null,
  TH: "Part of a month-long backpacking trip through Southeast Asia.",
  VN: "Part of the same month-long backpacking trip as Thailand.",
  SG: "Visited — also where Maria lost her passport for the first time.",
  ID: "A separate month-long backpacking trip, exploring different islands within the country."
};
```

---

## STEP-BY-STEP TASKS

### UPDATE css/styles.css (design tokens)
- **IMPLEMENT**: Replace `:root` block (lines 3-20) with the new token set (see design tokens below).
- **PATTERN**: `css/styles.css:3-20` (existing `:root` shape to replace in place)
- **GOTCHA**: `--success-color: #0039cb;;` has a double-semicolon typo in the current file — don't carry it forward.
- **VALIDATE**: Open `index.html` in a browser; confirm no broken var references (check devtools console for "unsupported property value" warnings).
- **SATISFIES**: Design direction (palette/typography confirmed with user)

### UPDATE css/styles.css (typography)
- **IMPLEMENT**: Add `--font-headline`/`--font-body` vars, apply to `h1-h6` / `body` respectively.
- **IMPORTS**: Google Fonts `<link>` for Fraunces + Inter (update in every HTML `<head>`)
- **GOTCHA**: Fraunces is a variable font — the `<link>` URL needs the `opsz,wght@` axis syntax, not the flat `wght@400;500;600` syntax currently used for Inter.
- **VALIDATE**: Inspect a rendered `<h1>` in devtools, confirm `font-family` resolves to Fraunces.
- **SATISFIES**: Design direction (typography)

### UPDATE index.html, pages/*.html (font links)
- **IMPLEMENT**: Update the Google Fonts `<link>` tag in every page's `<head>` to load both fonts in one request.
- **PATTERN**: existing tag e.g. `index.html:9`
- **VALIDATE**: `grep -L "Fraunces" index.html pages/*.html` returns nothing (i.e. every page updated).

### UPDATE css/styles.css (dedupe overrides)
- **IMPLEMENT**: Merge duplicate `.hero` rules (~206 and ~1566) into one; merge duplicate `.featured-card` rules (~1410/1475 and ~1606) into one.
- **GOTCHA**: Confirm merged rule doesn't drop any property only present in one of the two blocks — diff both blocks property-by-property before deleting either.
- **VALIDATE**: Visual check of homepage hero + featured cards renders identically in intent (new styling) with no missing properties.

### REFACTOR index.html (homepage rebuild)
- **IMPLEMENT**: Replace `#hero`/`#about`/`#featured` (lines 34-127) with the 6-section structure: `#hero`, `#credibility`, `#narrative`, `#writing`, `#travel-teaser`, `#cta`.
- **PATTERN**: `<section id="..." class="..."><div class="container">...</div></section>` wrapper — `index.html:35-48` shows the shape.
- **IMPORTS**: none (pure HTML)
- **GOTCHA**: Keep every `<section>` as a real `<section>` element (not `<div>`) — `js/script.js:52-66`'s IntersectionObserver selects `document.querySelectorAll('section')` generically.
- **VALIDATE**: Load `index.html`, scroll through; confirm each section gets `.section-visible` added in devtools as it enters viewport.
- **SATISFIES**: Homepage IA (confirmed 6-section flow)

### CREATE pages/travel.html
- **IMPLEMENT**: Standard page skeleton (header/nav identical to other pages, no new nav item) + inline SVG world map + story panel + inline `<script>` with `travelStories` data object and hover/click/focus handlers.
- **PATTERN**: `pages/contact.html:1-33` for header/nav skeleton; `pages/contact.html:122-137` for the inline-`<script>`-at-bottom-of-page pattern to mirror (page-specific logic stays out of `js/script.js`).
- **IMPORTS**: none beyond the two shared `<link>`/`<script src="../js/script.js">` tags every page has.
- **GOTCHA**: SVG paths need `tabindex="0"` AND a `:focus-visible` CSS rule — hover-only accessibility fails the architecture's explicit accessibility requirement.
- **VALIDATE**: Tab through the page with keyboard only; confirm every visited-country path receives a visible focus outline and reveals its story.
- **SATISFIES**: Travel map interactivity + accessibility requirement

### UPDATE index.html (#travel-teaser link)
- **IMPLEMENT**: Add a compact preview card/element linking to `pages/travel.html`.
- **VALIDATE**: Click the teaser from a rendered `index.html`, confirm it navigates to `pages/travel.html`.

### UPDATE pages/contact.html (form markup)
- **IMPLEMENT**: Add `<form id="contactForm">` with name/email/message fields + `<div id="formStatus">`, remove the duplicate inline `<script>` block (lines 122-137).
- **PATTERN**: field/label markup should follow the existing `.contact-method` visual rhythm for consistency, but this is a real `<form>`, not a link list.
- **GOTCHA**: Removing the inline script without first confirming `js/script.js`'s generic handler covers the same `#contactForm`/`#formStatus` ids will silently break the form — verify ids match exactly (`contactForm`, `formStatus`) before deleting.
- **VALIDATE**: Submit the form locally (even against the placeholder endpoint, expect a network/CORS error in console, not a JS crash) — confirms only one handler fires.

### UPDATE js/script.js (Formspree fetch)
- **IMPLEMENT**: Replace the `setTimeout` simulation (lines 78-83) with a `fetch()` POST to a `FORMSPREE_ENDPOINT` placeholder constant, using `FormData(contactForm)` as the body and `Accept: application/json` header; branch success/failure into `.form-status.success` / `.form-status.error`.
- **PATTERN**: `js/script.js:69-85` (existing handler to modify in place, not duplicate)
- **GOTCHA**: This is the one exception to "don't modify script.js unless asked" — the user explicitly asked for this via the PRD/architecture's contact-form requirement.
- **VALIDATE**: With a real Formspree endpoint swapped in later, submit the form and confirm an email arrives; until then, confirm the fetch call fires (network tab) and the error path shows `.form-status.error` gracefully.

### UPDATE css/styles.css (form status error state)
- **IMPLEMENT**: Add `.form-status.error { color: var(--error-color); }` alongside the existing `.sending`/`.success` states.
- **VALIDATE**: Visually trigger an error state (e.g. temporarily point fetch at an invalid URL) and confirm styling applies.

### UPDATE css/styles.css (site-wide token audit)
- **IMPLEMENT**: `grep -nE "#[0-9a-fA-F]{3,6}" css/styles.css` outside the `:root` block; replace any literal color with the matching `var()`.
- **VALIDATE**: Re-run the grep after — no literal hex colors remain outside `:root`.

---

## TESTING STRATEGY

This is a static site with no test framework (`CLAUDE.md` confirms: no build process, pure HTML/CSS/JS). "Testing" here means manual visual/functional verification, not automated unit tests.

### Manual Verification
- Load every page (`index.html`, all 5 `pages/*.html`, new `pages/travel.html`) in a browser at desktop width; confirm no visually broken layout, no console errors.
- Repeat at 950px, 768px, 480px breakpoints (matching existing responsive rules) for each page.
- Tab through `pages/travel.html` and the contact form using only the keyboard.
- Submit the contact form (expect a graceful error until the real Formspree endpoint is in place — never a JS exception).

### Edge Cases
- Countries with `null` story (ES, BE, LU, IT, GR, AL, SE) — confirm the story panel shows just the country name, not `"undefined"` or a blank/broken panel.
- Very long homepage narrative-block text at 480px width — confirm no overflow.
- Nav active-state logic (`js/script.js:43-49`) on `pages/travel.html` — since it's not in the nav, confirm no nav link incorrectly shows `.active`.

---

## VALIDATION COMMANDS

### Level 1: Syntax & Style
- No linter configured for this repo (static HTML/CSS/JS, no `package.json`). Use browser devtools console as the syntax check — zero errors/warnings on load for every page.
- `grep -rn "target=\"_blank\"" index.html pages/*.html | grep -v "rel="` — should return nothing (every external link has `rel` set).

### Level 2: Unit Tests
- N/A — no test framework in this repo.

### Level 3: Integration Tests
- N/A — no test framework in this repo.

### Level 4: Manual Validation
- Open each page in Chrome via the `claude-in-chrome` browser tools (or plain browser) and visually confirm the new design system renders (fonts, colors, texture) consistently across all pages.
- Confirm `pages/travel.html` map is present, hoverable, keyboard-focusable, and correctly color-codes all 19 countries from the dataset.
- Confirm the contact form shows a `sending` state on submit and does not crash even with the placeholder Formspree endpoint.

### Level 5: Additional Validation (Optional)
- Run the sourced SVG map through a quick license check (read the source's license page) before committing it to the repo.
- Lighthouse accessibility audit on `pages/travel.html` for the keyboard-focus requirement.

---

## ACCEPTANCE CRITERIA

- [ ] `:root` design tokens updated to the confirmed warm/earth-tone palette; no literal hex colors remain outside `:root`.
- [ ] Fraunces + Inter both load and apply to headline/body text respectively across all pages.
- [ ] Homepage (`index.html`) rebuilt into the 6-section flow: hero, credibility strip, narrative blocks, selected writing, travel-map teaser, single CTA.
- [ ] `experience.html`, `education.html`, `media.html`, `community.html`, `contact.html` visually restyled with no HTML structure or copy changes (beyond the contact form fix).
- [ ] `pages/travel.html` exists, is linked only from the homepage travel-teaser (not in main nav), and correctly renders all 19 countries from the dataset with hover + keyboard-focus story reveal.
- [ ] Countries with no anecdote (ES, BE, LU, IT, GR, AL, SE) still color-coded but show only the country name.
- [ ] Contact form markup restored in `pages/contact.html`; duplicate inline script removed; `js/script.js`'s shared handler wired to a placeholder Formspree endpoint via `fetch()`.
- [ ] No regressions: nav, mobile hamburger menu, smooth scroll, section-reveal animations, back-to-top button all still function on every page.
- [ ] All pages verified at 950px/768px/480px breakpoints.

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task's validation step passed immediately after that task
- [ ] Every page manually loaded and visually checked, zero console errors
- [ ] Full keyboard-navigation pass on `pages/travel.html` and the contact form
- [ ] Acceptance criteria all met
- [ ] SVG map asset license confirmed before commit

---

## OPEN QUESTIONS / ASSUMPTIONS

- **Assumed** — analytics (Plausible/GoatCounter) is deferred out of this release as a fast-follow, since the PRD marks it TBD/open and it's independent of everything else here. Confirm before execution if you actually want it bundled in.
- **Assumed** — contact form fields are name/email/message (the minimum viable set). Confirm field list before implementation, or the form markup task will guess.
- **Assumed** — removing the 🚀 `.mission-icon` emoji from the hero is correct for the new editorial tone (it reads inconsistent with "not corporate, not overly playful"). Flagging explicitly since it's a visible content removal, not just restyling.
- **Open** — legacy pages `articles.html` / `talks.html` / `awards.html`: git history shows a "remove legacy pages" commit already ran; verify during implementation whether these files still exist at all before deciding whether the CSS restyle needs to account for them.
- **Open** — exact SVG world map source not yet chosen; implementation must pick one (simplemaps/amCharts free tier suggested in the architecture doc) and verify its license before committing the asset.
- **Deferred by user** — real Formspree endpoint; plan wires the form fully against `YOUR_FORM_ID` placeholder, user will provide the real ID later (Phase 4 task already reflects this).

## NOTES (open canvas)

**Why clay/terracotta over olive** (design tokens decision made during planning, presented to and approved by the user): terracotta pairs more naturally with the amber/mustard saturated accent and reads warmer/more "editorial" per the target feel described ("young, credible ML engineer... not corporate, not startup-generic"); olive was the rejected alternative from the PRD's Architecture "Key decisions" as a secondary earth-tone option.

**Duplicate CSS discovered during analysis** — `.hero` and `.featured-card` each have two separate rule blocks at different line ranges in `css/styles.css` (206 vs ~1566/1596, 1410/1475 vs 1606). This is pre-existing technical debt, not something the redesign introduced — but since Phase 1 touches these exact selectors, it's the natural point to consolidate rather than adding a third override layer on top of two already-conflicting ones.

**Orphaned contact form handler** — `pages/contact.html` currently has zero `<form>` markup in its body but retains both an inline `<script>` handler (lines 122-137) AND is also matched by `js/script.js`'s generic `#contactForm` handler (lines 69-85). Since there's no form element, neither handler currently does anything — this is silent dead code today, but re-adding the form without removing the duplicate would cause a double-submit bug (both handlers firing `preventDefault` and setting `formStatus` text, racing each other). This is called out explicitly in Phase 4 as a "fix a latent bug while adding the feature" task, not just a new-feature task.

**Sequencing recommendation**: Phase 1 must go first (blocking). Phases 2, 3, 4 can be done in any order or in parallel (each only depends on Phase 1's tokens). Phase 5 (travel map) can be built in parallel with 2/3/4, but its final "wire the teaser link" step depends on Phase 2's homepage rebuild existing.

## AMENDMENTS

(none yet — plan not yet executed)
