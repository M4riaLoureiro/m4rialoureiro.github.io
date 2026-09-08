# Agent Development Guide — Maria Loureiro Portfolio

This document contains everything an AI agent needs to understand, maintain, and extend this codebase.

---

## Project Overview

A static personal portfolio website for Maria Loureiro (ML Engineer, Bioengineering background). Hosted on GitHub Pages. No build process — pure HTML, CSS, and vanilla JavaScript. Visual identity is a warm editorial style: serif headlines, a paper-colored background, and terracotta/olive/gold accents — not a corporate resume look.

---

## Directory Structure

```
/
├── index.html                        # Homepage (narrative hero + story sections + selected writing)
├── agents.md                         # This file
├── CLAUDE.md -> agents.md            # Symlink for Claude Code
├── css/
│   └── styles.css                    # Single stylesheet
├── js/
│   └── script.js                     # Single JS file
├── assets/
│   └── images/
│       ├── maria-profile.jpeg        # Profile photo (displayed 160x160px circular)
│       └── maria-profile-favicon.png # Favicon
├── pages/
│   ├── media.html                    # Writing, Talks, Awards, Press (MAIN content hub)
│   ├── experience.html               # Work experience & technical projects
│   ├── education.html                # Formal education & certifications
│   ├── community.html                # Associations & volunteering
│   ├── contact.html                  # Contact methods (no contact form — email only)
│   └── travel.html                   # Personal travel map (secondary page, not in main nav)
└── .github/
    └── copilot-instructions.md
```

---

## Navigation

### Main Nav (appears in every page header)
```
About → index.html
Work → experience.html
Education → education.html
Community → community.html
Media → media.html   ← primary content hub
Contact → contact.html
```

Nav is a slim top bar: an italic serif wordmark ("Maria Loureiro") on the left, plain uppercase links on the right. There is **no hamburger menu** — on narrow screens the links simply stack under the wordmark (`.navbar` becomes `flex-direction: column`). Do not reintroduce a hamburger/icon-drawer pattern. The active page gets `class="active"` on its `<a>` tag. The same link set (minus the wordmark) repeats in the footer as `.footer-nav-links`.

`travel.html` is intentionally not in the main nav — it's linked from the homepage travel teaser paragraph and from its own footer.

### Section Nav (inside multi-section pages)
`experience.html`, `education.html`, and `community.html` have a sticky secondary nav bar `.section-nav-menu` that updates its active link via IntersectionObserver as the user scrolls. `media.html` instead uses a simple `.jump-nav-links` list (Writing / Talks / Awards / Press) since its sections are shorter.

---

## Page Inventory

| Page | Sections | IDs |
|------|----------|-----|
| index.html | Hero, Credibility strip, Narrative stories (Loka, Gen-H, Global Shapers, Davos), Selected writing, CTA | `#hero`, `#credibility`, `#narrative`, `#writing`, `#cta` |
| experience.html | Work Experience, Technical Projects | `#work-experience`, `#technical-projects` |
| education.html | Formal Education, Certifications | `#formal-education`, `#certifications` |
| community.html | Associations & Leadership, Volunteering | `#associations-leadership`, `#volunteering` |
| media.html | Writing, Talks, Awards, Press | `#writing`, `#talks`, `#awards`, `#press` |
| contact.html | Contact | — |
| travel.html | Interactive world map | — |

---

## HTML Component Patterns

### Editorial timeline row
Used for long chronological lists: `experience.html` (work + projects), `education.html` (degrees + certifications), `community.html` (associations + volunteering), and `media.html` (Writing, Talks, Press). Rows sit inside a `.timeline` wrapper, hairline-divided, with a date column on the left.

```html
<div class="timeline">
  <div class="timeline-row">
    <div class="timeline-date">Month Year – Present</div>
    <div>
      <div class="timeline-title-row">
        <h3>Role / Item Title</h3>
        <span class="timeline-dot"></span>  <!-- only for ongoing/current items -->
      </div>
      <div class="timeline-org">Org / publisher — other metadata</div>
      <div class="timeline-desc">
        <p>Description text.</p>
      </div>
      <a href="https://..." target="_blank" rel="noopener noreferrer" class="timeline-link">Read Article</a>
    </div>
  </div>
</div>
```

Link label variants (kept from the original card pattern): `Read Article`, `Read on LinkedIn`, `View Thesis`, `View on PhysioNet`, `Listen on Spotify`, `View Recording`, `Watch on YouTube`, `Visit Website`, `View Certificate`, `View on GitHub`.

For long lists, wrap the `.timeline` in `data-expandable`, mark items beyond the initial visible set with `expandable-hidden`, and end with a `.show-more-btn` (pill button with chevron). The toggle behavior lives in `js/script.js` — do not duplicate it per-page.

### Quote-card
Used for pull-quote-style highlights: homepage "Some things I've written" and `media.html` Awards. Flat, translucent background, colored left border (no rounded-corner-with-shadow look), slight rotation for a scrapbook feel.

```html
<div class="quote-card quote-card--terracotta quote-card--rotate-1">
  <p>"Quoted text."</p>
  <span class="quote-card-attribution">Context — Publisher, Year</span>
</div>
```

Border/rotation modifiers: `quote-card--terracotta` / `--olive` / `--gold`, `quote-card--rotate-1` / `--rotate-2` / `--rotate-3`. Vary the color and rotation across cards in the same grid — don't repeat the same modifier back to back.

### Photo placeholder
Used on the homepage narrative sections until real photos are dropped in.

```html
<div class="photo-placeholder photo-placeholder--terracotta photo-placeholder--rotate-right">
  <div class="photo-placeholder-block"></div>
  <span class="photo-placeholder-caption">Caption text</span>
</div>
```

Color modifiers: `--terracotta` / `--olive` / `--gold`. Rotation modifiers: `--rotate-left` / `--rotate-right`.

### Kicker
Small uppercase colored label above a heading: `<span class="kicker">Work</span>`.

### Pull-quote
Standalone oversized quote with a decorative quotation mark, used sparingly (currently only the homepage's "luck" quote): `<blockquote class="pull-quote">...</blockquote>`.

---

## Content Rules

### Ordering
- **All content is chronological, newest first.**
- This applies to writing, talks, press, awards, experience, and education.

### Date Format
- Timeline rows use short form: `Mon Year` or `Mon Year – Current` (e.g. `Jul 2024 – Current`), or a plain year range for education/associations.
- For year-only fields (awards): just the 4-digit year.

### Ongoing marker
Add `<span class="timeline-dot"></span>` next to the title in `.timeline-title-row` for current/ongoing roles. Past roles have no dot.

### External Links
All external links must have both attributes in the HTML:
```html
target="_blank" rel="noopener noreferrer"
```

### Meta Descriptions
Every active page has a `<meta name="description">` tag. When adding a new page, include one after the viewport meta tag.

### Where to Add New Content

| Content type | Primary file |
|---|---|
| Written article / blog post | `media.html` → `#writing` |
| Talk / workshop / podcast appearance | `media.html` → `#talks` |
| Award | `media.html` → `#awards` (as a quote-card) |
| Interview / feature about Maria | `media.html` → `#press` |
| Work experience | `experience.html` → `#work-experience` |
| Project | `experience.html` → `#technical-projects` |
| Education | `education.html` → `#formal-education` |
| Certification | `education.html` → `#certifications` |
| Association / leadership | `community.html` → `#associations-leadership` |
| Volunteering | `community.html` → `#volunteering` |
| New country / travel story | `pages/travel.html` inline `<script>` — add to the `travelStories` and `countryNames` objects, keyed by ISO 3166-1 alpha-2 code |

---

## CSS Design System

### Fonts (Google Fonts, loaded in every page's `<head>`)
```
https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;1,7..72,400;1,7..72,500&family=Work+Sans:wght@300;400;500;600&family=Caveat:wght@500;600&display=swap
```
- **Literata** (serif) — headlines, pull-quotes, quote-cards, the nav wordmark, italic emphasis.
- **Work Sans** — body text, nav, labels, metadata.
- **Caveat** (handwriting) — a small accent touch only (e.g. the "— Maria" signoff, photo captions). Don't force it into places it doesn't fit naturally.

### CSS Variables (defined in `:root`)
```css
--primary-color: #F6F1E8   /* paper background */
--secondary-color: #EFE7D8
--card-bg: rgba(255, 255, 255, 0.55)
--ink: #2B241C
--terracotta: #B5592E
--olive: #5F6B4A
--gold: #C98A2B
--muted: #6B6153
--muted-light: #8A8071
--dark-grey: #5A5142
--font-headline: 'Literata', Georgia, serif
--font-body: 'Work Sans', ...
--font-hand: 'Caveat', cursive
--inset-left: max(28px, 9vw)
--inset-right: max(28px, 5vw)
```
`accent-color`/`link-color` alias to terracotta for backward compatibility with older component classes.

The body background is a subtle grain: two overlaid `radial-gradient` dot patterns (`rgba(43,36,28,0.035)` / `rgba(43,36,28,0.025)`, 26px/17px), not a flat fill or an SVG noise filter.

### Layout
- **Container**: `width: 90%; max-width: 1200px; margin: 0 auto`, with asymmetric left/right padding (`--inset-left` / `--inset-right`) for the editorial off-center feel — the left inset is deliberately larger than the right.
- **Section padding**: `4rem 0`

### Colors in use
Terracotta, olive, and gold should appear throughout as kickers, left-border colors on quote-cards, timeline dots, and photo-placeholder blocks — not confined to one spot. Vary which color is used across repeated elements (e.g. don't make every quote-card terracotta).

### Responsive Breakpoints
| Breakpoint | Changes |
|---|---|
| `max-width: 950px` | Nav stacks into a plain vertical list (no drawer), grid column adjustments |
| `max-width: 768px` | Font 15px, single-column grids/timeline rows, flex column footer |
| `max-width: 480px` | Font 14px, container 95%, profile image 140px |

### Avoid
Gradients as backgrounds, emoji, rounded-corner cards with a left accent border as the *only* device, Inter/Roboto/Arial/Fraunces, numbered lists in flowing prose, a hamburger/drawer nav.

---

## JavaScript (script.js)

All functionality is vanilla JS, no libraries. Key behaviors:

| Feature | Trigger | Effect |
|---|---|---|
| Smooth scroll | Anchor `#id` click | `window.scrollTo`, offset 80px |
| Active nav link | Page load | Matches `pathname` to nav links |
| Section animations | IntersectionObserver | Adds `.section-visible` when section enters viewport |
| Section nav active | Scroll (IntersectionObserver) | Updates `.section-nav-links a.active` |
| Expand/collapse lists | Click on `.show-more-btn` | Toggles `.expandable-hidden` on items inside `[data-expandable]` |
| Card hover | mouseenter/mouseleave | `translateY(-8px)` or `translateX(8px)` |
| Back-to-top button | Scroll > 300px | Shows dynamically created button |
| Lazy images | Page load | Adds `loading="lazy"` to all `<img>` |
| External links | Page load | Adds `rel="noopener noreferrer"` |

There is no contact-form handler — `contact.html` has no form, by design (email-only). `travel.html` has its own small inline `<script>` for the map's hover/story behavior (page-specific, not in `script.js`).

Do not modify `script.js` unless specifically asked. All animation and interaction logic is handled automatically for any element with the right class names.

---

## Footer

All pages share the same footer structure: a `.footer-nav-links` list mirroring the header nav, then the copyright line and social icons. The copyright year is `2026`.

```html
<footer>
  <div class="container">
    <ul class="footer-nav-links">
      <li><a href="...">About</a></li>
      <!-- ...same links as header nav... -->
    </ul>
    <div class="footer-content">
      <div class="footer-info">
        <p>&copy; 2026 Maria Loureiro. All rights reserved.</p>
      </div>
      <div class="footer-links">
        <!-- GitHub SVG icon -->
        <!-- LinkedIn SVG icon -->
        <!-- Email SVG icon -->
      </div>
    </div>
  </div>
</footer>
```

---

## Paths & Asset References

All pages under `pages/` reference assets with `../` prefix:
- CSS: `../css/styles.css`
- JS: `../js/script.js`
- Images: `../assets/images/...`
- Nav links within `pages/`: `experience.html`, `media.html`, etc. (no path prefix)
- Nav links back to root: `../index.html`

`index.html` (root) references assets without prefix:
- CSS: `css/styles.css`
- JS: `js/script.js`
- Images: `assets/images/...`

---

## What NOT to Do

- Do not introduce build tools, npm, or bundlers — this is intentionally static.
- Do not add new CSS files; add styles to `css/styles.css`.
- Do not add new JS files; add scripts to `js/script.js` (page-specific one-off logic, like the travel map, can stay in an inline `<script>` on that page).
- Do not change the font or color system without being asked.
- Do not reintroduce a hamburger/drawer nav.
- Do not add emoji to titles or content unless the existing entry already has one.
- Do not reorder content — it is always newest-first within each section.
- Do not add a contact form back to `contact.html` without being asked — it was deliberately removed in favor of direct email.
