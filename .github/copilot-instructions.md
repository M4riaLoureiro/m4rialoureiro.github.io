# Copilot Instructions for AI Coding Agents

## Project Overview
This is a personal portfolio website built with static HTML, CSS, and JavaScript. The site consists of multiple standalone pages (e.g., `index.html`, `contact.html`, `projects.html`) and uses a single shared stylesheet (`css/styles.css`) and script file (`js/script.js`). Images are stored in the `images/` directory.

## Architecture & Structure
- **Pages:** Each `.html` file represents a separate section of the site (e.g., articles, awards, education).
- **Styling:** All pages use `css/styles.css` for consistent design. Update this file for global style changes.
- **Scripts:** Common JavaScript logic is centralized in `js/script.js`. Add page-specific logic with clear comments if needed.
- **Assets:** Images are stored in `images/`. Use relative paths for referencing assets.

## Developer Workflows
- **No build step:** This is a static site. Changes to HTML, CSS, or JS files are reflected immediately.
- **No tests:** There are no automated tests or test frameworks present.
- **Previewing:** Open `.html` files directly in a browser to preview changes. For local development, use a simple HTTP server (e.g., `python3 -m http.server` or VS Code Live Server extension) to avoid CORS issues with JS or images.

## Project-Specific Conventions
- **Navigation:** Each page is standalone; navigation is typically handled via `<a>` tags. If updating navigation, ensure consistency across all pages.
- **Accessibility:** Use semantic HTML tags (`<header>`, `<main>`, `<footer>`, etc.) where possible.
- **Responsiveness:** All styles should be mobile-friendly. Use media queries in `styles.css`.
- **Comments:** Use clear comments in JS and CSS to explain non-obvious logic or styles.

## Integration Points
- **External dependencies:** None detected. All code is custom and self-contained.
- **Cross-page communication:** No dynamic routing or shared state; each page loads independently.

## Examples
- To add a new section, create a new `.html` file, link to `css/styles.css` and `js/script.js`, and update navigation on all pages.
- To update the profile image, replace `images/maria-profile.jpeg` and update references in relevant HTML files.

## Key Files
- `index.html`: Main landing page
- `css/styles.css`: Global styles
- `js/script.js`: Global scripts
- `images/`: Asset storage

---
If any conventions or workflows are unclear, please ask for clarification or examples from the codebase.
