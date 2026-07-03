# Styles Organization

## Goals
- Keep page-specific CSS isolated to the page that owns it.
- Put cross-page patterns into shared layout/component styles.
- Avoid importing one page’s stylesheet from other pages.
- Prefer small, clearly named files over large “kitchen sink” stylesheets.

## Folder Structure
- `src/styles/base/`
  - `app-base.css` – application-wide base entry imported by `App.jsx`
  - `foundation.css` – global foundation styles (fonts, body defaults, shared helpers)
- `src/styles/layout/`
  - `site-sections.css` – shared section/hero/layout rules used across multiple pages
  - `treatments-shared.css` – shared treatment layout rules used across treatment-related pages
  - `article-layout.css` – shared article/blog layout rules
  - `specialities-layout.css` – shared specialities layout rules
- `src/styles/components/`
  - `search-component.css`
  - `social-share-component.css`
- `src/styles/pages/`
  - `about-page.css`
  - `contact-page.css`
  - `resources-page.css`
  - `doctor-detail-page.css`
  - `blog-page.css`
  - `treatments/`
    - `non-invasive/*-page.css`
    - `minimally-invasive/*-page.css`
    - `surgical/*-page.css`
  - `company/*-page.css`
  - `gethelp/*-page.css`
  - `resources/testimonials/*-page.css`
- `src/styles/`
  - `treatments-feature.css` – shared “feature section” styles used by multiple pages

## Naming Convention
- Pages: `kebab-case` + `-page.css` (example: `about-page.css`)
- Components: `kebab-case` + `-component.css` (example: `search-component.css`)
- Cross-page layout: placed in `layout/` with descriptive names (`article-layout.css`)

## Import Rules
- Pages import:
  - their page stylesheet (`src/styles/pages/*-page.css`)
  - any needed shared layout stylesheet from `src/styles/layout/`
- Components import:
  - their component stylesheet from `src/styles/components/`

## Legacy CSS Compatibility
- Some original CSS files still exist under `src/pages/**` and `src/components/**`.
- When a page/component is migrated, prefer turning the original CSS file into an `@import` shim to the new `src/styles/**` path so older imports remain functional.

## CSS Loading Stability
- Initial paint: `index.html` applies an `apc-hydrating` gate to keep `#root` hidden until styles settle, preventing FOUC on hard refresh.
- Route transitions: the router waits for dynamically injected stylesheets to load before swapping the rendered route location.
- Monitoring: the last observed stylesheet settle duration is exposed as `window.__apcStyleLoad` (useful for manual QA and regression checks).

## Design System Docs
- UI patterns documentation: [DESIGN_SYSTEM.md](file:///Users/antoniochagas/Desktop/apc-react-main%202/src/styles/DESIGN_SYSTEM.md)
