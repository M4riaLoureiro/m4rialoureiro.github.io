
# Maria Loureiro Portfolio Website

This repository contains the source code for Maria Loureiro's personal portfolio website. The site is a static multi-page website built with HTML, CSS, and JavaScript, showcasing sections such as publications, awards, education, experience, projects, and more.

## Features
- **Multi-page static site:** Each section (e.g., publications, awards, contact) is a standalone HTML file, organized in the `pages/` directory.
- **Consistent styling:** All pages use a shared stylesheet (`css/styles.css`).
- **Global scripts:** Common JavaScript logic is centralized in `js/script.js`.
- **Modern navigation:** All pages use a hamburger menu for navigation, always visible and accessible on all screen sizes.
- **Responsive design:** Mobile-friendly layout using CSS media queries.
- **Semantic HTML:** Accessibility best practices with semantic tags.

## Directory Structure
```
├── index.html
├── pages/
│   ├── publications.html
│   ├── associations.html
│   ├── awards.html
│   ├── contact.html
│   ├── education.html
│   ├── experience.html
│   ├── projects.html
│   ├── talks.html
├── css/
│   └── styles.css
├── images/
│   └── maria-profile.jpeg
├── js/
│   └── script.js
```

## Getting Started
1. **Clone the repository:**
   ```sh
   git clone https://github.com/M4riaLoureiro/m4rialoureiro.github.io.git
   cd m4rialoureiro.github.io
   ```
2. **Preview locally:**
   - Open `index.html` or any file in `pages/` directly in your browser, or
   - Start a simple HTTP server (recommended for JS/image loading):
      ```sh
      python3 -m http.server
      ```
   - Or use the VS Code Live Server extension.

## Customization
- **Add a new section:** Create a new `.html` file in `pages/`, link to `../css/styles.css` and `../js/script.js`, and update navigation markup in all relevant files for consistency.
- **Update profile image:** Replace `images/maria-profile.jpeg` and update references in HTML files.
- **Modify styles:** Edit `css/styles.css` for global style changes.
- **Add scripts:** Place custom JS in `js/script.js` with clear comments for page-specific logic.

## Navigation Conventions
- Navigation is handled via a hamburger menu on all pages. The menu contains links to all sections and is implemented in each HTML file for consistency.
- If you update navigation links, ensure changes are reflected in all HTML files.

## Troubleshooting
- For local preview, use a simple HTTP server to avoid CORS issues with JavaScript or images.
- If images do not load, check the path and ensure the `images/` folder matches references in your HTML.

## Project Conventions
- No build step or automated tests; changes are reflected immediately.
- No external dependencies; all code is custom and self-contained.

## License

This project is open source. See the repository for license details.

---
For questions or suggestions, please contact Maria Loureiro via the contact page on the website.
