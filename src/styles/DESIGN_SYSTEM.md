# Design System (Selected UI Patterns)

## Specialities Feature Sections

**Scope**
- Applies to: Specialities landing page sections inside `.specialities-page`
- Components: speciality feature sections (`.treatments-feature`) and the stroke topic grid (`.stroke-topic-nav`)

**Goals**
- Keep headings non-duplicative for screen readers.
- Maintain consistent spacing, readable line length, and strong CTA hierarchy.
- Prevent layout shift by reserving space for media via `aspect-ratio`.

### Feature Section (Media + Copy)

**Structure**
- Section: `.treatments-feature` + `.treatments-feature-mi`
- Inner grid: `.treatments-feature-inner`
- Media container: `.treatments-feature-media` (uses `aspect-ratio`)
- Media element: `.treatments-feature-video` (`object-fit: cover`)
- Copy container: `.treatments-feature-copy`
- Accent: `.treatments-feature-accent`
- Body copy: `.treatments-feature-body`
- CTA: `.treatment-card-button`

**Accessibility**
- Use a single visible heading for the section via `aria-labelledby` pointing to the `<h2>`.
- Avoid repeating the speciality title inside the copy block.

### Stroke Topic Grid

**Structure**
- Section: `.home-section-mainpain-cards` (scoped on Specialities page)
- Grid nav: `.stroke-topic-nav` (`<nav aria-label="Stroke medicine topics">`)
- Card links: `.stroke-topic-navLink` (background image set per-link)

**Accessibility**
- Each card is a real link element and includes an `aria-label` that describes the destination.
- Visible focus style uses `:focus-visible` with a high-contrast outline.

**Performance**
- Feature sections use `content-visibility: auto` (with `contain-intrinsic-size`) to reduce main-thread work below the fold.
