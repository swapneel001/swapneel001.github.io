# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, single-page personal portfolio site for Swapneel Bhatt, deployed via GitHub Pages (custom domain `swapneelbhatt.com`, set in `CNAME`). There is no build step, package manager, or test suite — the site is plain HTML/CSS/JS served as-is.

It **was** built on the [devportfolio template](https://github.com/RyanFitzgerald/devportfolio-template) (Bootstrap 3 + jQuery) but has since been rewritten: no framework, no jQuery, no minified build artifacts. Don't reintroduce those.

## Working on this site

- `index.html` is the live page — the only HTML file that matters. Content sections (About, Experience, Education, Projects, Skills, Contact) are `<section id="...">` blocks matching the nav anchors.
- `index_updated.html` is a stale, unused draft/backup from the old template — do not edit it and do not treat it as a source of truth.
- Styling: `css/styles.css` only, hand-written and hand-edited (no preprocessor). Design tokens live in the `:root` block at the top — colors, fonts, radius, easing. **Change the palette there, not at call sites.** The scheme is dark: near-black backgrounds, white/gray text, a single yellow accent (`--accent: #ffd60a`).
- Behavior: `js/scripts.js` only, vanilla JS, loaded directly (no `.min` variant to keep in sync). It handles the sticky-header state, mobile menu, back-to-top, scroll-reveal, and nav scroll-spy — all via `IntersectionObserver`.
- Section entrance animations come from the `.reveal` class plus `IntersectionObserver`; add `reveal` to new cards to opt them in. `.no-js` and `prefers-reduced-motion` both fall back to fully visible.
- `libs/font-awesome/` is a vendored third-party library — don't hand-edit it.
- `css/bootstrap.min.css` and `js/scripts.min.js` are leftovers from the template and are **no longer referenced** by `index.html`. Don't wire them back up.

## Layout gotcha

The projects and education grids are CSS Grid. If you ever apply `display: grid` to a Bootstrap-style `.row`, its `:before`/`:after` clearfix pseudo-elements become grid items and silently consume the first cells (this previously pushed the project cards right). The current markup uses dedicated `.project-grid` / `.edu-grid` containers to avoid that entirely.
- Resume PDFs are versioned directly in the repo root (e.g. `SwapneelBhattResumeFallUpdated2025.pdf`); `index.html`'s "Download Resume" button links to the current one by exact filename — update that `href` when swapping in a new resume file.
- Images referenced by the Projects section live in `images/`; add new project images there and reference with a relative `images/<file>` path.

## Verifying changes

No build/lint/test commands exist. To preview, open `index.html` directly in a browser or serve the directory locally, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.
