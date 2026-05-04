# Story Timeline Page Design Specification

**Date:** May 4, 2026  
**Feature:** Dedicated story timeline page showcasing Prana & Ester's love story  
**GitHub Issue:** [#1 - feat: Add story timeline page](https://github.com/pranahonk/prana-ester-wedding/issues/1)

---

## 1. Overview

A mobile-first, interactive timeline page that tells the romantic journey of Prana and Ester from their first meeting in 2019 through their wedding day on May 30, 2026. The page features expandable timeline cards with photos, locations, emojis, and intimate descriptions written in B2-level English. The design maintains the wedding site's existing navy/gold color palette and Framer Motion animation style.

---

## 2. Architecture & File Structure

### New Files to Create
```
app/
├── story/
│   ├── page.tsx                    # Main story page
│   ├── components/
│   │   ├── Timeline.tsx            # Timeline container
│   │   └── TimelineCard.tsx        # Individual expandable card
│   └── layout.tsx                  # Story page layout
├── data/
│   └── timelineData.ts             # Timeline milestones & story content
```

### Integration Points
- **BottomNav:** Add "Story" link navigating to `/story`
- **Navigation:** Hash support: `/story#2024` jumps to 2024 milestone

---

## 3. Data Structure

### TimelineData Schema

```typescript
interface TimelineMilestone {
  id: number;
  year: number;
  date: string;                      // "2019", "March 27, 2024"
  emoji: string;                     // 💕, 💔, 🔄, 💍, 🎉
  title: string;                     // "We Met", "Our First Anniversary"
  location: string;                  // "Kelapa Gading, Jakarta"
  photo: string;                     // "/photos/DSC00XXX.jpg"
  description: string;               // 3-5 sentences, romantic, B2 English
  order: number;                     // Display order (ascending)
}
```

### Milestones (7 total)

1. **2019 - We Met** (💕)
   - Location: Kelapa Gading, Jakarta
   - Story: Meeting through mutual friends, one working at BCA, one at Indosports
   - Focus: Initial connection, serendipity of meeting

2. **2019 - Taking It Further** (💕)
   - Location: Jakarta
   - Story: Deepening the relationship after meeting
   - Focus: Growing closeness, first romantic moments

3. **2019-2020 - Life Happens** (💔)
   - Location: Jakarta
   - Story: After 6 months together, circumstances led them apart
   - Focus: The pain of separation, life's challenges

4. **January 2024 - Found Again** (🔄)
   - Location: Jakarta
   - Story: Unexpectedly reconnecting, conversations reigniting old feelings
   - Focus: Second chances, destiny, deep talks

5. **March 27, 2024 - We Committed** (💍)
   - Location: Jakarta
   - Story: After 4 months of growing closer, officially committing to their relationship
   - Focus: Decision, promise, turning point

6. **March 27, 2025 - One Year of Forever** (✨)
   - Location: Jakarta
   - Story: Celebrating their first anniversary, reflecting on growth
   - Focus: Gratitude, bond strengthening, love deepening

7. **May 30, 2026 - Our Wedding Day** (💒)
   - Location: TBD (wedding venue)
   - Story: Beginning their forever journey, celebrating with loved ones
   - Focus: Joy, commitment, new chapter

---

## 4. Component Specifications

### TimelineCard Component

**Props:**
```typescript
interface TimelineCardProps {
  milestone: TimelineMilestone;
  isExpanded: boolean;
  onToggle: (id: number) => void;
  isActive: boolean;              // for scroll-reveal animation
}
```

**Collapsed State:**
- Date badge (left side): `{year}` or `{month} {day}, {year}`
- Timeline dot (center): animated circle matching emoji
- Title (right side): milestone title
- Emoji icon: positioned with dot
- Hover state: slight scale up, cursor pointer
- Height: ~60px

**Expanded State:**
- All collapsed elements remain visible
- Smooth slide-down animation (0.3s, easeInOut)
- Hero photo (full width): max-height 400px, object-cover
- Subtle gradient overlay: `linear-gradient(180deg, transparent, rgba(6,10,20,0.4))`
- Location badge: 📍 icon + location text, gold text color
- Description text: 3-5 sentences, romantic tone, B2 English, gold/light text
- Height: auto (expands to fit content)
- Collapse on tap/click outside card

**Animations (Framer Motion):**
- Enter: `fadeIn` + `slideDown` (0.3s)
- Exit: `slideUp` (0.2s)
- Only one card expanded at a time

### Timeline Component

**Props:**
```typescript
interface TimelineProps {
  milestones: TimelineMilestone[];
  initialExpanded?: number;         // which card to expand on load
}
```

**Behavior:**
- Render vertical timeline with connected dots and line
- Timeline line: navy/40, width 2px
- Dots: gold, size 16px, hover scale to 20px
- Cards alternate: left/right for visual balance, but on mobile (< 640px) all stack on right
- Only one card expanded at a time
- Track expanded card in state

**Scroll Animation:**
- Cards fade in + slide as they enter viewport
- Use Intersection Observer for performance
- Delay staggered by order (0.1s increment)

### Page Component (/app/story/page.tsx)

**Layout:**
```
Header Section:
  "Our Story" (font-script, large)
  "A Journey of Love" (subtitle, gold text)
  Divider (gold line)

Timeline Section:
  Timeline component with all milestones

Footer Section:
  CTA: "Let's Celebrate Together" or similar
  Link back to wedding page
```

**Styling:**
- Background: match main site (radial gradient + linear gradient, navy/dark)
- Padding: responsive (mobile: px-3, desktop: px-8)
- Max-width: similar to other pages (2xl container)
- Font: Reuse existing fonts (script for headings, sans for body)
- Colors: navy (#060a14, #0F1D33), gold (#D4AF37)

---

## 5. Interactions & Animations

### Card Interactions
1. **Initial Load:** All cards collapsed except optional first card
2. **Tap Card:** Expands smoothly, other open card collapses
3. **Scroll:** Cards fade/slide in as viewport reaches them
4. **Mobile:** Full-width tap targets, no hover states (smooth on touch)

### Animation Details
- **Expand/Collapse:** Framer Motion, 0.3s duration, easeInOut timing
- **Scroll Reveal:** Intersection Observer + fadeIn animation
- **Photo:** Subtle zoom on load (scale: 1 → 1.05)
- **Gradient Overlay:** Fade in with card expansion

### Navigation
- **Direct URL:** `/story` loads page
- **Hash Jump:** `/story#2024` scrolls to and opens 2024 milestone (on load)
- **Back Nav:** Link to return to main wedding page
- **Bottom Nav:** "Story" option in BottomNav component

---

## 6. Styling & Theme Consistency

### Color Palette (reuse from main site)
- Primary Navy: `#060a14`, `#0F1D33`, `#1B2A4A`
- Gold Accent: `#D4AF37`
- Gold/40: Gold with 40% opacity for subtle elements
- Text: Gold for headings, white/off-white for body

### Typography
- **Headings:** `font-script` (existing wedding font)
- **Titles:** `text-xl md:text-2xl`, gold color
- **Descriptions:** `text-sm md:text-base`, light gray/white, line-height 1.6
- **Dates:** `text-sm`, gold, monospace-style for consistency

### Responsive Design
- **Mobile (< 640px):** 
  - Single column, cards stack vertically
  - Timeline line on right side
  - Full-width cards with padding
  - Touch-optimized tap targets (min 44px height)
  
- **Tablet & Desktop (≥ 640px):**
  - Cards alternate left/right around center timeline
  - More breathing room, padding increase
  - Hover effects on cards

---

## 7. Content Tone & Language

**Target:** B2-level English, romantic & intimate, emotionally resonant

**Style Guidelines:**
- Focus on emotions, connection, shared experiences
- Use sensory details and poetic language
- Acknowledge challenges with grace
- Emphasize growth and rediscovery
- Build toward the wedding as a celebration of their journey

**Example Tone:**
> "In the bustling streets of Kelapa Gading, two worlds collided in the most beautiful way. Through mutual friends, you arrived—unexpected yet somehow inevitable. In that moment, we didn't know we were beginning a story that would define us both."

---

## 8. Testing & Verification

### Functional Tests
- [ ] Cards expand/collapse on tap with smooth animation
- [ ] Only one card expanded at a time
- [ ] Scroll animations trigger as cards enter viewport
- [ ] Hash navigation (`#2024`) works on page load
- [ ] Photos load and display correctly
- [ ] Responsive layout works on mobile, tablet, desktop

### Accessibility
- [ ] Keyboard navigation: Tab through cards, Enter to expand
- [ ] Screen reader: Cards announced with full content
- [ ] Color contrast: Gold on navy meets WCAG AA
- [ ] Touch targets: Min 44px height on mobile

### Performance
- [ ] Images optimized (Next.js Image component)
- [ ] Intersection Observer prevents unnecessary renders
- [ ] Animations smooth on mobile (60fps target)

---

## 9. Future Enhancements (Out of Scope)

- Video embeds in expanded cards
- Share individual milestones (social media)
- Timeline filtering by year/emotion
- Guest comments on milestones
- Photo gallery lightbox for each milestone

---

## 10. Notes

- **Photo Sourcing:** Use provided photos from user's Downloads folder; ensure all photos are optimized before deployment
- **Description Writing:** Draft descriptions following romantic tone guide; get user approval before finalizing
- **Deployment:** Test fully on mobile devices before production push
- **SEO:** Add meta tags for story page (og:image with timeline preview)
