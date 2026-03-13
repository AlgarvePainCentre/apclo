# Design System Documentation

This document outlines the design system used for the article card ecosystem and related components. It provides guidelines for maintaining visual consistency across the application.

## 1. Core Principles
- **Modern & Clean**: Uses ample whitespace, subtle shadows, and rounded corners.
- **Responsive**: Mobile-first approach with fluid grids and flexible layouts.
- **Accessible**: High contrast ratios, semantic HTML, and focus states.
- **Interactive**: meaningful hover states and transitions for better user feedback.

## 2. Colors

### Primary Palette
| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| Slate 900  | `#0f172a` | Footer background, deep headers |
| Gray 900   | `#111827` | Primary text, headings |
| Gray 700   | `#374151` | Secondary text |
| Gray 600   | `#4b5563` | Body text, descriptions |
| Gray 500   | `#6b7280` | Meta text, dates |
| White      | `#ffffff` | Card backgrounds, page background |

### Brand & Accent Colors
| Color Name      | Hex Value | Usage |
|-----------------|-----------|-------|
| Blue Dark       | `#0b3c6f` | Primary brand color, headings |
| Teal 700        | `#0f766e` | Links, primary actions |
| Teal 600        | `#0d9488` | Links hover state |
| Gradient Orange | `#f97316` | Accents, gradients |
| Gradient Rose   | `#fb7185` | Accents, gradients |

### CSS Variables
```css
:root {
  --color-blue: #0b3c6f;
  --color-white: #ffffff;
  --warm-yellow: #fbd38d;
  --warm-orange: #f6ad55;
  --warm-coral: #f58b8b;
}
```

## 3. Typography

### Hierarchy
- **Section Titles**: `36px` (Desktop) / `28px` (Mobile), Weight 700, Color `#111827`
- **Card Titles**: `22px`, Weight 700, Color `#1e293b`
- **Body Text**: `15px`, Line Height `1.6` to `1.8`, Color `#4b5563`
- **Meta Text**: `13px`, Weight 500, Color `#64748b`
- **Tags**: `12px`, Uppercase, Weight 600, Letter Spacing `0.025em`

### Font Family
The system inherits the project's default font family (Inter, system-ui, sans-serif).

## 4. Components

### Article Card (`TreatmentCard`)

The `TreatmentCard` is the primary component for displaying article/treatment summaries.

#### Structure
- **Header**: Contains the illustration/icon and category tag.
- **Body**: Contains meta info, title, excerpt, and call-to-action link.

#### Usage
```jsx
<TreatmentCard
  item={{
    title: "Article Title",
    category: "Category Name",
    author: "Author Name",
    date: "Date String",
    readTime: "5 min read",
    description: "Brief summary...",
    link: "/path/to/article",
    icon: "/path/to/icon.png"
  }}
/>
```

#### Visual Specs
- **Border Radius**: `24px`
- **Shadow (Default)**: `0 4px 6px -1px rgba(0, 0, 0, 0.05)`
- **Shadow (Hover)**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Border**: `1px solid rgba(229, 231, 235, 0.5)`

#### Interactive States
- **Card Hover**: Lifts up (`translateY(-8px)`), shadow increases, border darkens.
- **Icon Hover**: Scales (`1.1`) and rotates (`3deg`).
- **Link Hover**: Color change to Teal 600, icon moves right.

## 5. Spacing & Layout

### Grid System
- **Desktop**: 3-column grid (`grid-template-columns: repeat(3, minmax(0, 1fr))`)
- **Tablet**: 2-column or fluid grid depending on container width.
- **Mobile**: Single column stack (`flex-direction: column`)

### Spacing Scale
- **Section Padding**: `40px` to `64px` vertical.
- **Card Padding**: `28px` (Body), `86px` (Header/Illustration).
- **Gap**: `24px` between grid items.

## 6. Accessibility (WCAG 2.1)

- **Contrast**: Text colors meet AA standards against backgrounds.
- **Focus**: Interactive elements maintain default focus outlines (or custom accessible focus styles).
- **Semantic HTML**: Uses `<article>`, `<h3>`, `<p>`, and `<nav>` landmarks.
- **ARIA**:
  - `aria-label` on "Read Article" links for context (e.g., "Read Article about Spinal Fusion").
  - `aria-hidden="true"` on decorative icons/images.

## 7. Coding Standards

### React
- Prefer route-level code splitting with `React.lazy` + `Suspense` for large pages.
- Avoid `process.env.*` in Vite; use `import.meta.env.*`.
- Keep state derived from URL query params normalized to avoid navigation loops.

### Security
- For `target="_blank"` links, always include `rel="noopener noreferrer"`.
- Avoid `dangerouslySetInnerHTML`; if required for JSON-LD, serialize with escaping to prevent `</script>` breakouts.
- Redirect to HTTPS for non-localhost environments in client entrypoint code.

### Forms
- Validate and normalize user input (trim, max length) before processing.
- Use honeypot fields and rate limiting as lightweight bot mitigation for client-only forms.
- CSRF protection and secure authentication must be implemented server-side; client-only implementations cannot be relied on.

## 8. Code Review Changes
- Added safe JSON serialization for JSON-LD script tags to reduce XSS risk.
- Enforced HTTPS redirects for non-localhost environments.
- Improved external link hardening (`noopener noreferrer`) for new-tab navigation.
- Reduced initial bundle size by lazy-loading route components.
- Removed unused page transition utility code.
