
# Maria Loureiro Portfolio Website

This repository contains the source code for Maria Loureiro's personal portfolio website. The site is built as a static website using HTML, CSS, and JavaScript, and showcases sections such as articles, awards, education, experience, projects, volunteering, and more.

## Features
- **Multi-page static site:** Each section (e.g., articles, awards, contact) is a standalone HTML file, now organized in the `pages/` directory.
- **Consistent styling:** All pages use a shared stylesheet (`css/styles.css`).
- **Global scripts:** Common JavaScript logic is centralized in `js/script.js`.
- **Responsive design:** Mobile-friendly layout using CSS media queries.
- **Semantic HTML:** Accessibility best practices with semantic tags.

## Directory Structure
```
├── index.html
├── pages/
│   ├── articles.html
│   ├── associativism.html
│   ├── awards.html
│   ├── contact.html
│   ├── education.html
│   ├── experience.html
│   ├── projects.html
│   ├── speaking.html
│   └── volunteering.html
├── css/
│   └── styles.css
├── assets/
│   └── images/
│       └── maria-profile.jpeg
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
- **Add a new section:** Create a new `.html` file in `pages/`, link to `../css/styles.css` and `../js/script.js`, and update navigation links in all relevant files.
- **Update profile image:** Replace `assets/images/maria-profile.jpeg` and update references in HTML files.
- **Modify styles:** Edit `css/styles.css` for global style changes.
- **Add scripts:** Place custom JS in `js/script.js` with clear comments for page-specific logic.

## Conventions
- Navigation is handled via `<a>` tags; update all pages for consistency. All navigation now points to files in `pages/`.
- No build step or automated tests; changes are reflected immediately.
- No external dependencies; all code is custom and self-contained.

## License
This project is open source. See the repository for license details.

---
For questions or suggestions, please contact Maria Loureiro via the contact page on the website.
