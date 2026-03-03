# Agent Development Guide — Maria Loureiro Portfolio

This document contains everything an AI agent needs to understand, maintain, and extend this codebase.

---

## Project Overview

A static personal portfolio website for Maria Loureiro (ML Engineer, Bioengineering background). Hosted on GitHub Pages. No build process — pure HTML, CSS, and vanilla JavaScript.

---

## Directory Structure

```
/
├── index.html                        # Homepage (hero + about + featured in)
├── agents.md                         # This file
├── CLAUDE.md -> agents.md            # Symlink for Claude Code
├── css/
│   └── styles.css                    # Single stylesheet (~1800 lines)
├── js/
│   └── script.js                     # Single JS file (~273 lines)
├── assets/
│   └── images/
│       ├── maria-profile.jpeg        # Profile photo (displayed 160x160px circular)
│       └── maria-profile-favicon.png # Favicon
├── pages/
│   ├── media.html                    # Articles, Talks, Awards, Featured In (MAIN content hub)
│   ├── experience.html               # Work experience & technical projects
│   ├── education.html                # Formal education & certifications
│   ├── community.html                # Associations & volunteering
│   ├── contact.html                  # Contact methods
│   ├── articles.html                 # Legacy articles-only page (kept for older nav)
│   ├── talks.html                    # Legacy talks-only page
│   └── awards.html                   # Legacy awards-only page
└── .github/
    └── copilot-instructions.md
```

---

## Navigation

### Main Nav (appears in every page header)
```
About → index.html
Work & Projects → experience.html
Education → education.html
Community Impact → community.html
Media & Recognition → media.html   ← primary content hub
Contacts → contact.html
```

The active page gets `class="active"` on its `<a>` tag. The hamburger menu is shown below 950px.

### Section Nav (inside multi-section pages)
Pages with multiple sections have a sticky secondary nav bar `.section-nav-menu` that updates its active link via IntersectionObserver as the user scrolls.

---

## Page Inventory

| Page | Sections | IDs |
|------|----------|-----|
| index.html | Hero, About, Featured In | `#hero`, `#about`, `#featured-in` |
| experience.html | Work Experience, Technical Projects | `#work-experience`, `#technical-projects` |
| education.html | Formal Education, Certifications | `#formal-education`, `#certifications` |
| community.html | Associations & Leadership, Volunteering | `#associations-leadership`, `#volunteering` |
| media.html | Articles & Publications, Talks & Workshops, Awards, Featured In | `#articles-publications`, `#talks-workshops`, `#awards`, `#featured-in` |
| contact.html | Contact | — |

---

## HTML Component Patterns

All components follow the same header/body split. Copy these exactly when adding new entries.

### Article / Publication Card
Used in: `media.html` (#articles-publications), `articles.html`

```html
<div class="article-card">
  <div class="article-header">
    <h3>Article Title</h3>
    <div class="article-publisher">Publisher Name</div>
  </div>
  <div class="article-body">
    <div class="article-date">Month Day, Year</div>
    <div class="article-link">
      <a href="https://..." target="_blank" class="view-article">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
        </svg>
        Read Article
      </a>
    </div>
  </div>
</div>
```

Link label variants: `Read Article`, `Read on LinkedIn`, `View Thesis`, `View on PhysioNet`, `Listen on Spotify`.

### Event / Talk Card
Used in: `media.html` (#talks-workshops), `talks.html`

```html
<div class="event-card">
  <div class="event-header">
    <h3>Talk Title</h3>
    <div class="event-name">Conference or Event Name</div>
  </div>
  <div class="event-body">
    <div class="event-detail">
      <div class="event-value">Month Day, Year</div>
    </div>
    <div class="event-link">
      <a href="https://..." target="_blank" class="view-event">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
        </svg>
        View Recording
      </a>
    </div>
  </div>
</div>
```

Link label variants: `View Recording`, `View on LinkedIn`, `Watch on YouTube`, `Listen on Spotify`.

### Award Card
Used in: `media.html` (#awards), `awards.html`

```html
<div class="award-card">
  <div class="award-header">
    <div>
      <h3>Award Title</h3>
      <div class="award-competition">Awarding Organization · Sub-entity</div>
    </div>
  </div>
  <div class="award-body">
    <div class="award-detail">
      <div class="award-label">Year:</div>
      <div class="award-value">2026</div>
    </div>
    <div class="award-description">
      <p>Description of the award and what was achieved.</p>
    </div>
  </div>
</div>
```

### Experience Card
Used in: `experience.html`, `community.html`

```html
<div class="experience-card ongoing">   <!-- or just "experience-card" for past roles -->
  <div class="experience-header">
    <h3>Position Title</h3>
    <div class="experience-company">
      <a href="https://company-website.com">Company Name</a>
    </div>
  </div>
  <div class="experience-body">
    <div class="experience-detail">
      <div class="experience-label">Location:</div>
      <div class="experience-value">City, Country (or Remote)</div>
    </div>
    <div class="experience-detail">
      <div class="experience-label">Duration:</div>
      <div class="experience-value">Month Year – Present (or end date)</div>
    </div>
    <div class="experience-detail">
      <div class="experience-value">
        <p>Description of role and responsibilities.</p>
      </div>
    </div>
    <div class="experience-status ongoing">Ongoing</div>  <!-- or class="past" with text "Past" -->
  </div>
</div>
```

Add `class="ongoing"` to the card and status div for current roles. Past roles have no modifier class on the card.

### Project Card
Used in: `experience.html` (#technical-projects)

```html
<div class="project-card">
  <div class="project-header">
    <h3>Project Title</h3>
  </div>
  <div class="project-body">
    <div class="project-detail">
      <div class="project-label">Context:</div>
      <div class="project-value">Description of context</div>
    </div>
    <div class="project-detail">
      <div class="project-label">Date:</div>
      <div class="project-value">Year</div>
    </div>
    <div class="project-detail">
      <div class="project-label">Grade:</div>
      <div class="project-value">e.g., 19/20</div>
    </div>
    <div class="project-link">
      <a href="https://github.com/..." target="_blank" class="view-project">
        View on GitHub
      </a>
    </div>
  </div>
</div>
```

### Education Card
Used in: `education.html` (#formal-education)

```html
<div class="education-card">
  <div class="education-header">
    <h3>Degree Title</h3>
    <div class="education-institution">Institution Name</div>
  </div>
  <div class="education-body">
    <div class="education-detail">
      <div class="education-label">Specialization:</div>
      <div class="education-value">Area of study</div>
    </div>
    <div class="education-detail">
      <div class="education-label">Grade:</div>
      <div class="education-value">e.g., 18/20</div>
    </div>
    <div class="education-detail">
      <div class="education-label">Period:</div>
      <div class="education-value">Year – Year</div>
    </div>
  </div>
</div>
```

### Certification Card
Used in: `education.html` (#certifications)

```html
<div class="certification-card">
  <div class="certification-header">
    <h3>Certification Name</h3>
    <div class="certification-institution">Issuing Organization</div>
  </div>
  <div class="certification-body">
    <div class="certification-detail">
      <div class="certification-label">Issued:</div>
      <div class="certification-value">Month Year</div>
    </div>
    <div class="certification-detail">
      <div class="certification-label">Expires:</div>
      <div class="certification-value">Month Year (or "No expiration")</div>
    </div>
    <div class="certification-link">
      <a href="https://..." target="_blank" class="view-certificate">View Certificate</a>
    </div>
  </div>
</div>
```

### Organization Card
Used in: `community.html` (#associations-leadership)

```html
<div class="organization-card">
  <div class="organization-header">
    <h3>Role / Position Title</h3>
    <div class="organization-name">Organization Name</div>
  </div>
  <div class="organization-body">
    <div class="organization-detail">
      <div class="organization-label">Period:</div>
      <div class="organization-value">Year – Present (or end year)</div>
    </div>
    <div class="organization-detail">
      <div class="organization-value">
        <p>Description of role and impact.</p>
      </div>
    </div>
    <div class="organization-link">
      <a href="https://..." target="_blank" class="view-organization">Learn More</a>
    </div>
  </div>
</div>
```

---

## Content Rules

### Ordering
- **All content is chronological, newest first.**
- This applies to articles, talks, awards, experience, and education.

### Date Format
- Always use: `Month Day, Year` — e.g., `February 18, 2026`
- For year-only fields (awards, education periods): just the 4-digit year.

### Status Classes
| Status | Card class | Status div class | Badge text |
|--------|-----------|-----------------|------------|
| Active/current | `experience-card ongoing` | `experience-status ongoing` | `Ongoing` |
| Completed | `experience-card` | `experience-status past` | `Past` |

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
| Written article / blog post | `media.html` → `#articles-publications` |
| Interview / feature about Maria | `media.html` → `#featured-in` |
| Talk / workshop | `media.html` → `#talks-workshops` |
| Award | `media.html` → `#awards` |
| Work experience | `experience.html` → `#work-experience` |
| Project | `experience.html` → `#technical-projects` |
| Education | `education.html` → `#formal-education` |
| Certification | `education.html` → `#certifications` |
| Association / leadership | `community.html` → `#associations-leadership` |
| Volunteering | `community.html` → `#volunteering` |


---

## CSS Design System

### CSS Variables (defined in `:root`)
```css
--primary-color: #ffffff
--secondary-color: #f5f5f5
--accent-color: #333333
--text-color: #212121
--light-grey: #e0e0e0
--medium-grey: #9e9e9e
--dark-grey: #616161
--link-color: #2962ff
--link-hover: #0039cb
--success-color: #0039cb
--error-color: #f44336
--shadow-sm: 0 2px 5px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 10px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.15)
--border-radius: 8px
--transition-speed: 0.3s
```

### Typography
- **Font**: Inter (Google Fonts), weights 300/400/500/600/700
- **Base**: 16px, line-height 1.6
- **H1**: 2.5rem, weight 500
- **H2**: 2rem, weight 600 — has `::after` underline (50px wide, 3px, `#333`)
- **H3**: 1.5rem, weight 600

### Layout
- **Container**: `width: 90%; max-width: 1200px; margin: 0 auto; padding: 0 20px`
- **Section padding**: `4rem 0`
- **Card gap**: `2rem`

### Grid Systems
| Class | Columns |
|---|---|
| `.articles-grid` | `auto-fill, minmax(280px, 1fr)` |
| `.events-grid` | `auto-fill, minmax(280px, 1fr)` |
| `.awards-grid` | `auto-fill, minmax(280px, 1fr)` |
| `.certification-grid` | `repeat(auto-fill, minmax(280px, 1fr))` |
| `.featured-grid` | `repeat(4, 1fr)` → 2 cols at 950px → 1 col at 480px |

### Responsive Breakpoints
| Breakpoint | Changes |
|---|---|
| `max-width: 950px` | Hamburger menu, grid column adjustments |
| `max-width: 768px` | Font 15px, single-column grids, flex column footer |
| `max-width: 480px` | Font 14px, container 95%, profile image 140px |

### Card Hover Effect (all cards)
```css
transform: translateY(-5px);
box-shadow: var(--shadow-md);
transition: transform 0.3s ease, box-shadow 0.3s ease;
```

---

## JavaScript (script.js)

All functionality is vanilla JS, no libraries. Key behaviors:

| Feature | Trigger | Effect |
|---|---|---|
| Mobile menu | Hamburger click | Toggle `.active` on nav |
| Smooth scroll | Anchor `#id` click | `window.scrollTo`, offset 80px |
| Active nav link | Page load | Matches `pathname` to nav links |
| Section animations | IntersectionObserver | Adds `.section-visible` when section enters viewport |
| Section nav active | Scroll (IntersectionObserver) | Updates `.section-nav-links a.active` |
| Card hover | mouseenter/mouseleave | `translateY(-8px)` or `translateX(8px)` |
| Back-to-top button | Scroll > 300px | Shows dynamically created button |
| Lazy images | Page load | Adds `loading="lazy"` to all `<img>` |
| External links | Page load | Adds `rel="noopener noreferrer"` |

Do not modify `script.js` unless specifically asked. All animation and interaction logic is handled automatically for any element with the right class names.

---

## Footer

All pages share the same footer structure. The copyright year is `2026`.

```html
<footer>
  <div class="container">
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
- Do not add new JS files; add scripts to `js/script.js`.
- Do not change the font or color system without being asked.
- Do not add emoji to titles or content unless the existing entry already has one.
- Do not change date formats — always `Month Day, Year`.
- Do not reorder content — it is always newest-first within each section.
- Do not add descriptions or summaries to article/event cards — the existing pattern has no description field, only title, publisher/event, date, and link.
