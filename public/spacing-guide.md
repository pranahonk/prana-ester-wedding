# Spacing Guide

Reference for standardized spacing values across all slides.

## BottomNav Constraint

- BottomNav is **72px tall** + `env(safe-area-inset-bottom)`
- Fixed at `bottom: 0`, visible on slides 1-9 (hidden on slide 0 / Cover)
- All slides must leave enough bottom padding to avoid content hidden behind the nav

## Slide Categories

### Category A: Centered Slides (no scrolling, `justify-center`)

Slides: **Cover (0), Greeting (1), Groom (2), Bride (3), Verse (4), Gift (7), Closing (9)**

These slides vertically center content. Bottom padding shifts the visual center upward so content doesn't appear to sit behind the nav.

### Category B: Scrollable Slides (`allowScroll`, `justify-start`)

Slides: **Event (5), RSVP/Wishes (6), Gallery (8)**

These slides scroll vertically. Bottom padding ensures the last content is fully visible when scrolled to the bottom.

---

## Standardized Values

### 1. Bottom Padding (clearance above BottomNav)

| Category | Value | Rationale |
|---|---|---|
| Cover (no nav) | `pb-0` | No BottomNav on cover |
| Centered slides | `pb-24` (96px) | 96px = 72px nav + 24px breathing room |
| Scrollable slides | `pb-28` (112px) | 112px = 72px nav + 40px clear zone |

### 2. Top Padding (scrollable slides)

| Slide | Value | Rationale |
|---|---|---|
| EventSlide | `pt-12 sm:pt-16` | Compact event cards need less top space |
| RSVPWishesSlide | `pt-12 sm:pt-16` | Aligned with EventSlide |
| GallerySlide | `pt-12 sm:pt-16` | Aligned with EventSlide |

### 3. Horizontal Padding

| Slide | Value | Rationale |
|---|---|---|
| Cover | `px-10 sm:px-16` (inner) | Intentionally inset for elegance |
| Greeting | `px-4 sm:px-6` (inner div) | Wide content (names), inner div handles it |
| Groom/Bride | `px-4 sm:px-6` | Standard |
| Verse | `px-4 sm:px-8` | Wider padding suits reading text |
| Event | `px-4 sm:px-6` | Standard |
| RSVP/Wishes | `px-4 sm:px-6` | Standard |
| Gift | `px-4 sm:px-6` | Standard |
| Gallery | `px-3 sm:px-4` | Tighter for photo grid is intentional |
| Closing | `px-4 sm:px-6` | Standard |

### 4. Max-Width Containers

| Slide | Value | Rationale |
|---|---|---|
| Cover | `max-w-lg` | Focused, narrow content |
| Greeting | `max-w-2xl` | Wide names need room |
| Groom/Bride | `max-w-sm` | Single-person profile, narrow |
| Verse | `max-w-md sm:max-w-xl md:max-w-2xl` | Responsive for readability |
| Event | `max-w-md` | Compact card layout |
| RSVP/Wishes | `max-w-lg` | Forms need moderate width |
| Gift | `max-w-md` | Bank cards fit well |
| Gallery | `max-w-2xl` | Grid benefits from width |
| Closing | `max-w-xs sm:max-w-sm` (on quote) | Minimal, centered |

### 5. Section Header Spacing (mb after header)

| Context | Value | Usage |
|---|---|---|
| Header to main content | `mb-6` | After title+divider block |
| Header to main content (scrollable) | `mb-5 sm:mb-6` | Slightly tighter on mobile for scrollable slides |
