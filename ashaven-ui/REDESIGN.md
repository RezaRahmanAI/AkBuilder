# Ashaven Developers — UI/UX Redesign Guide

A contemporary, mobile-first system for the Ashaven real estate experience. The redesign leans on soft gradients, tactile cards, and editorial typography so every page feels intentional and high-end.

## 1) Modern UI/UX Direction

- **Layout & Structure:** Wide breathing room, 12-column responsive grids, sticky filter shells on listings, and anchored CTAs on every page. Hero sections pair serif headlines with concise body copy and stat cards. Cards use elevated borders, pill buttons, and rounded radii for a tactile feel.
- **Typography:** `Inter` (400/500/600/700) for UI, `Playfair Display` (500–700) for headlines and hero titles. Line height 1.55 for paragraphs, 1.1–1.2 for headings.
- **Color System:**
  - Primary: `#3C75BA` (brand blue), Dark: `#294F80`, Accent: `#FF771B`, Surface: `#FFFFFF`, Mist: `#ECF4FB`, Ink: `#000000`.
  - Shadows use `rgba(44, 92, 148, 0.2-0.35)` with blurred backdrops; borders stay subtle at 8–12% opacity.
- **Spacing:** Clamp-based spacing (1.25–2.5rem) for sections; cards use 1.5–1.8rem padding; generous line height for readability.
- **Iconography:** Remix Icons for system symbols; emoji accents in discovery cards; simple stroke dividers for elegance.
- **Interactions:** Hover lifts and subtle scale on cards/buttons; progress bars on sliders; focus-visible states for keyboard users; aria labels on filters and navigation.
- **Responsive Rules:**
  - **Desktop (≥1024px):** Multi-column grids, hero split layout with stat cards, exposed filters.
  - **Tablet (640–1023px):** Auto-fit grids, stacked heroes with centered text, collapsible filter areas.
  - **Mobile (<640px):** Single-column cards, sticky CTAs, reduced shadow intensity, increased tap targets.

## 2) Page Blueprints

### Home
- Hero slider with immersive imagery and CTA buttons.
- Blueprint cards (project storytelling, guided navigation, concierge support).
- Highlighted "Experience" panel with responsive chips and mobile-first badge.
- Featured projects carousel, vision banner, testimonials, and a CTA band for visit booking.

### Projects Listing
- Unified hero with stats (live listings, categories, booking availability).
- Sticky filter shell for category/type, curated project grid, and scannable chips for status & type.
- Contextual empty-state messaging and reset actions.

### Project Details
- "At a glance" hero with CTA to register, feature & amenities grid, gallery slider, interactive map, and contact form block with mirrored styling from listing.

### Gallery
- Gradient hero with total item counts, filter pills (all/photos/videos), responsive masonry grid, and lightbox with swipe support.

### Blog / Articles
- Editorial hero with cadence stats, centered layout, and digest sign-up block.
- Card-based article list with reading time and category labels.

### About
- Story-driven hero with stats, history/mission/vision sections, leadership spotlight, and team grid with modal details.

### Contact
- Conversational hero, get-in-touch form, contact info/map pairing, and FAQ accordions.

### Header & Footer
- Glassy nav bar with pill CTA, hover underlines, and mobile side-panel.
- Footer with brand story, quick links, contact stack, and social icons with hover lifts.

## 3) Component Library

| Component | Props / Usage | Interactions & Notes |
| --- | --- | --- |
| `app-page-hero` | `eyebrow`, `title`, `subtitle`, `accent`, `ctaLabel`, `ctaLink`, `secondaryLabel`, `secondaryLink`, `background`, `stats[]`, `alignment` | Gradient background, optional background image blend, stat cards, dual CTAs, centered/left alignment, responsive stack. |
| `app-navbar` | Internal links, CTA button, mobile toggle | Hover underline, glass backdrop, side-panel for small screens. |
| `app-project-explore` | Auto-fetches featured projects | Card lift on hover, badges for status/type, CTA to details. |
| `app-slider` / `app-hero-slide` | Splide-based sliders consuming project data | Progress bar, keyboard nav, hover/focus states, lazy-loaded images. |
| `app-vision-banner` | Static copy + CTA | Soft gradient background, floating badges. |
| `app-testimonial` | Carousel of testimonials | Card flip-in animation, dots navigation. |
| `app-blog-list` | Lists blog posts | Cards with category and read-time, responsive grid. |
| `app-blog-form` | Newsletter/contact capture | Inline form with validation, keyboard-friendly. |
| `app-footer` | Brand story, quick links, contacts | Lift-on-hover social buttons, radial glow background. |

## 4) Frontend Implementation Notes

- **Framework:** Angular standalone components with Tailwind utility classes plus custom CSS tokens defined in `src/styles.css`.
- **Patterns:** Section wrappers (`.neo-section`), pill buttons (`.neo-button`, `.neo-outline-button`), and card shadows reused across pages for consistency.
- **Accessibility:** Semantic headings, aria labels on filters, focus-visible styles, high contrast text, and keyboard-friendly sliders/lightboxes.
- **Performance:** Lazy-load hero/gallery imagery, debounce scroll-based effects, and reuse data services for listings and galleries.

Use this document as the source of truth when extending pages or creating new modules to ensure consistency across the Ashaven experience.
