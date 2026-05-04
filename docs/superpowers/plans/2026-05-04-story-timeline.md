# Story Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive story timeline page showcasing Prana & Ester's love story with expandable cards, vertical timeline design, and romantic descriptions.

**Architecture:** Separate `/story` route with reusable TimelineCard and Timeline components. Timeline data stored in a dedicated data file for easy updates. Framer Motion handles expand/collapse animations. Mobile-first responsive design using Tailwind CSS.

**Tech Stack:** Next.js 14+ (App Router), React, Framer Motion, Tailwind CSS, TypeScript

---

## File Structure

**New Files:**
- `app/data/timelineData.ts` - Timeline milestones data with interface definitions
- `app/story/page.tsx` - Main story page (client component)
- `app/story/layout.tsx` - Story page layout with metadata
- `app/story/components/Timeline.tsx` - Timeline container managing state
- `app/story/components/TimelineCard.tsx` - Expandable card component

**Modified Files:**
- `app/components/BottomNav.tsx` - Add "Story" navigation link

---

## Task 1: Create Timeline Data Structure

**Files:**
- Create: `app/data/timelineData.ts`

- [ ] **Step 1: Create timelineData.ts with interfaces and data**

```typescript
// app/data/timelineData.ts
export interface TimelineMilestone {
  id: number;
  year: number;
  date: string;
  emoji: string;
  title: string;
  location: string;
  photo: string;
  description: string;
  order: number;
}

export const timelineData: TimelineMilestone[] = [
  {
    id: 1,
    year: 2019,
    date: "2019",
    emoji: "💕",
    title: "We Met",
    location: "Kelapa Gading, Jakarta",
    photo: "/photos/DSC00187.jpg",
    description: "In the bustling streets of Kelapa Gading, two worlds collided in the most beautiful way. Through mutual friends, you arrived—unexpected yet somehow inevitable. I was working at Indosports, and you worked for BCA, but that day, destiny brought us together. In that moment, we didn't know we were beginning a story that would define us both.",
    order: 1,
  },
  {
    id: 2,
    year: 2019,
    date: "2019",
    emoji: "💕",
    title: "Taking It Further",
    location: "Jakarta",
    photo: "/photos/DSC00191.jpg",
    description: "Days turned into weeks, and weeks into months of discovering each other. Every conversation deepened our connection. Your laughter became my favorite song, and your presence, my greatest comfort. We were building something precious, something that felt like it could last forever. In those early days, love felt simple, pure, and undeniably real.",
    order: 2,
  },
  {
    id: 3,
    year: 2019,
    date: "2019-2020",
    emoji: "💔",
    title: "Life Happens",
    location: "Jakarta",
    photo: "/photos/DSC00220.jpg",
    description: "After six beautiful months, life's circumstances pulled us apart. It wasn't anyone's fault—sometimes the timing and the world around us make it impossible to stay. The pain of separation was deep, but it also taught us something invaluable. We learned that what we had was real, and that some connections don't fade, no matter how far apart we drift.",
    order: 3,
  },
  {
    id: 4,
    year: 2024,
    date: "January 2024",
    emoji: "🔄",
    title: "Found Again",
    location: "Jakarta",
    photo: "/photos/DSC00312.jpg",
    description: "Years passed, and unexpectedly, you came back into my life. It was like the universe refused to let us go. We talked for hours, rediscovering each other, and discovering that our feelings had never truly disappeared. They had merely been waiting, growing stronger in silence. In January 2024, we realized that second chances do exist, and we were brave enough to take it.",
    order: 4,
  },
  {
    id: 5,
    year: 2024,
    date: "March 27, 2024",
    emoji: "💍",
    title: "We Committed",
    location: "Jakarta",
    photo: "/photos/DSC00314.jpg",
    description: "After four months of conversations that healed old wounds and built new dreams, we made a promise to each other. On March 27, 2024, we officially committed to our relationship. This wasn't just a decision—it was a declaration. A promise that we would choose each other, day after day, come what may. Our forever officially began.",
    order: 5,
  },
  {
    id: 6,
    year: 2025,
    date: "March 27, 2025",
    emoji: "✨",
    title: "One Year of Forever",
    location: "Jakarta",
    photo: "/photos/DSC00317.jpg",
    description: "One year together felt like a lifetime of love compressed into moments of pure joy. We celebrated how far we've come, how much we've grown, and how our love has only deepened with each passing day. On our first anniversary, we didn't just look back—we looked forward to all the years ahead, grateful for second chances and eternal love.",
    order: 6,
  },
  {
    id: 7,
    year: 2026,
    date: "May 30, 2026",
    emoji: "💒",
    title: "Our Wedding Day",
    location: "Wedding Venue, Jakarta",
    photo: "/photos/DSC00479.jpg",
    description: "Today, surrounded by those we love, we celebrate not just our love, but the journey that brought us here. From that first meeting in Kelapa Gading to this moment, every chapter has led us to say 'yes' forever. This is the beginning of the rest of our lives—a promise kept, a story continued, and love that will endure for all our days.",
    order: 7,
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles without errors**

Run: `npx tsc --noEmit`

Expected: No compilation errors

- [ ] **Step 3: Commit**

```bash
git add app/data/timelineData.ts
git commit -m "data: add timeline milestones with romantic descriptions"
```

---

## Task 2: Create TimelineCard Component

**Files:**
- Create: `app/story/components/TimelineCard.tsx`

- [ ] **Step 1: Create component with full implementation**

```typescript
// app/story/components/TimelineCard.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TimelineMilestone } from "@/app/data/timelineData";

interface TimelineCardProps {
  milestone: TimelineMilestone;
  isExpanded: boolean;
  onToggle: (id: number) => void;
  isActive: boolean;
  isLeft?: boolean;
}

export default function TimelineCard({
  milestone,
  isExpanded,
  onToggle,
  isActive,
  isLeft = false,
}: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`relative flex ${isLeft ? "flex-row-reverse" : "flex-row"} gap-4 mb-8 md:gap-8`}
    >
      {/* Timeline dot and connector line */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={() => onToggle(milestone.id)}
          className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-gold/80 flex items-center justify-center text-xl md:text-2xl hover:scale-110 transition-transform cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {milestone.emoji}
        </motion.button>
        <div className="w-1 h-16 md:h-20 bg-gold/20 mt-4" />
      </div>

      {/* Card content */}
      <motion.div
        onClick={() => onToggle(milestone.id)}
        className="flex-1 cursor-pointer mt-2"
      >
        <motion.div
          layout
          className="bg-gradient-to-br from-navy/40 to-navy/20 border border-gold/20 rounded-lg p-4 sm:p-6 hover:border-gold/40 transition-all"
        >
          {/* Header with date and title */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <p className="text-gold/60 text-xs uppercase tracking-wider font-sans">
                {milestone.date}
              </p>
              <h3 className="font-script text-2xl md:text-3xl text-gold mt-1">
                {milestone.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gold/40 ml-4 flex-shrink-0"
            >
              ▼
            </motion.div>
          </div>

          {/* Location badge (always visible) */}
          <p className="text-gold/70 text-sm flex items-center gap-2 mb-4 font-sans">
            <span>📍</span>
            <span>{milestone.location}</span>
          </p>

          {/* Expanded content with animation */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Hero photo */}
                <div className="relative w-full h-56 sm:h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={milestone.photo}
                    alt={milestone.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={milestone.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                </div>

                {/* Description text */}
                <p className="text-white/80 text-sm leading-relaxed font-sans">
                  {milestone.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand hint for collapsed state */}
          {!isExpanded && (
            <p className="text-gold/40 text-xs uppercase tracking-wide mt-2 font-sans">
              Tap to read more
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/story/components/TimelineCard.tsx
git commit -m "feat: create TimelineCard expandable component with animations"
```

---

## Task 3: Create Timeline Container Component

**Files:**
- Create: `app/story/components/Timeline.tsx`

- [ ] **Step 1: Create Timeline component with state management**

```typescript
// app/story/components/Timeline.tsx
"use client";

import { useState, useEffect } from "react";
import TimelineCard from "./TimelineCard";
import { TimelineMilestone } from "@/app/data/timelineData";

interface TimelineProps {
  milestones: TimelineMilestone[];
  initialExpanded?: number;
}

export default function Timeline({
  milestones,
  initialExpanded,
}: TimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(
    initialExpanded || null
  );
  const [activeIds, setActiveIds] = useState<Set<number>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  // Handle expand/collapse (only one card expanded at a time)
  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Track which cards are in viewport for scroll animations
  useEffect(() => {
    setIsMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        const newActive = new Set(activeIds);
        entries.forEach((entry) => {
          const id = parseInt(
            entry.target.getAttribute("data-milestone-id") || "0"
          );
          if (entry.isIntersecting) {
            newActive.add(id);
          }
        });
        setActiveIds(newActive);
      },
      { threshold: 0.1 }
    );

    // Observe all milestone cards
    setTimeout(() => {
      document.querySelectorAll("[data-milestone-id]").forEach((el) => {
        observer.observe(el);
      });
    }, 0);

    return () => observer.disconnect();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative py-8 sm:py-12">
      {/* Vertical timeline line */}
      <div className="absolute left-[1.75rem] md:left-1/2 top-0 bottom-0 w-1 bg-gold/10 transform md:-translate-x-1/2" />

      {/* Timeline cards */}
      <div className="space-y-8 relative z-10 max-w-2xl mx-auto px-4">
        {milestones.map((milestone, idx) => (
          <div key={milestone.id} data-milestone-id={milestone.id}>
            <TimelineCard
              milestone={milestone}
              isExpanded={expandedId === milestone.id}
              onToggle={handleToggle}
              isActive={activeIds.has(milestone.id)}
              isLeft={idx % 2 === 0 && typeof window !== "undefined" && window.innerWidth > 768}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/story/components/Timeline.tsx
git commit -m "feat: create Timeline container with expand/collapse and scroll animations"
```

---

## Task 4: Create Story Page Layout

**Files:**
- Create: `app/story/layout.tsx`

- [ ] **Step 1: Create layout file with metadata**

```typescript
// app/story/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story - Prana & Ester",
  description:
    "The love story of Prana and Ester, from their first meeting in Kelapa Gading to their wedding day. A journey of love, second chances, and forever.",
  openGraph: {
    title: "Our Story - Prana & Ester",
    description:
      "A beautiful journey of love, reconnection, and commitment leading to forever.",
    type: "website",
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/story/layout.tsx
git commit -m "feat: add story page layout with SEO metadata"
```

---

## Task 5: Create Main Story Page

**Files:**
- Create: `app/story/page.tsx`

- [ ] **Step 1: Create story page with Timeline component**

```typescript
// app/story/page.tsx
"use client";

import { motion } from "framer-motion";
import Timeline from "./components/Timeline";
import { timelineData } from "@/app/data/timelineData";
import Link from "next/link";

export default function StoryPage() {
  return (
    <div
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4"
      style={{
        background: `
          radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 50%),
          linear-gradient(180deg, #060a14 0%, #0F1D33 25%, #1B2A4A 50%, #0F1D33 75%, #060a14 100%)
        `,
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 md:mb-20 max-w-2xl mx-auto"
      >
        <p className="text-gold/40 text-xs sm:text-sm uppercase tracking-[0.3em] mb-4 font-sans">
          Our Journey
        </p>
        <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-gold mb-4">
          Our Story
        </h1>
        <p className="text-gold/70 text-lg sm:text-xl font-sans mb-6">
          A Journey of Love
        </p>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-2 h-2 rotate-45 border border-gold/40" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </motion.div>

      {/* Timeline Section */}
      <Timeline milestones={timelineData} />

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-16 sm:mt-20 md:mt-28 max-w-2xl mx-auto"
      >
        <p className="text-gold/60 text-lg sm:text-xl mb-8 font-sans">
          Let's celebrate this beautiful journey together
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 sm:px-8 py-3 border border-gold/40 text-gold hover:bg-gold/10 transition-all rounded-lg font-sans text-sm sm:text-base"
          >
            Back to Wedding
          </Link>
          <Link
            href="/#event"
            className="px-6 sm:px-8 py-3 bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 transition-all rounded-lg font-sans text-sm sm:text-base"
          >
            View Events
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Test page loads without errors**

Run dev server:
```bash
npm run dev
```

Navigate to `http://localhost:3000/story` 

Expected: Page loads with header, timeline, and footer visible. No console errors.

- [ ] **Step 3: Commit**

```bash
git add app/story/page.tsx
git commit -m "feat: create story timeline page with header and footer"
```

---

## Task 6: Update BottomNav Component

**Files:**
- Modify: `app/components/BottomNav.tsx`

- [ ] **Step 1: Read current BottomNav to understand structure**

Open and review `app/components/BottomNav.tsx` to understand how navigation items are defined.

- [ ] **Step 2: Add Story navigation link**

Find the navigation items array/section and add Story link. Example pattern (adjust based on actual structure):

If using an array pattern:
```typescript
const navItems = [
  // ... existing items
  {
    label: "Story",
    icon: "📖",
    href: "/story",
  },
];
```

If using JSX pattern, add:
```typescript
<Link
  href="/story"
  className="flex flex-col items-center gap-1 px-3 sm:px-4 py-2 text-gold/60 hover:text-gold transition-colors"
  title="Our Story"
>
  <span className="text-lg sm:text-xl">📖</span>
  <span className="text-xs hidden sm:block">Story</span>
</Link>
```

- [ ] **Step 3: Test navigation link**

Run dev server and verify:
- Story link appears in BottomNav
- Clicking Story link navigates to `/story`
- URL changes to `/story`

- [ ] **Step 4: Commit**

```bash
git add app/components/BottomNav.tsx
git commit -m "feat: add Story link to bottom navigation"
```

---

## Task 7: Add Timeline Photos

**Files:**
- Modify: `app/data/timelineData.ts`
- Create/Copy: `public/photos/[timeline-photos]`

- [ ] **Step 1: Verify photos exist in public/photos directory**

Run: `ls -la public/photos/ | grep -E "(DSC00187|DSC00191|DSC00220|DSC00312|DSC00314|DSC00317|DSC00479)"`

Expected: Photos should already exist from the main gallery. If not, copy them from user's Downloads folder.

- [ ] **Step 2: Verify photo paths in timelineData.ts**

The photo paths are already set in Task 1:
- `/photos/DSC00187.jpg` - We Met
- `/photos/DSC00191.jpg` - Taking It Further
- `/photos/DSC00220.jpg` - Life Happens
- `/photos/DSC00312.jpg` - Found Again
- `/photos/DSC00314.jpg` - We Committed
- `/photos/DSC00317.jpg` - One Year of Forever
- `/photos/DSC00479.jpg` - Our Wedding Day

If using different photos, update the `photo` field in timelineData.ts:

```typescript
photo: "/photos/[actual-filename].jpg"
```

- [ ] **Step 3: Test photos load on page**

Run dev server and navigate to `/story`. 

Expected: All 7 photos display without broken image icons. Expand each card to see full photo.

- [ ] **Step 4: Commit (if photos were copied/moved)**

```bash
git add public/photos/
git commit -m "feat: add timeline photos"
```

---

## Task 8: Test Mobile Responsiveness

**Files:**
- Test: All story components

- [ ] **Step 1: Test on mobile (< 640px)**

Using DevTools, set viewport to:
- iPhone 12 (390px)
- iPhone SE (375px)

Verify:
- Cards stack in single column ✓
- Timeline line appears on left side (not centered) ✓
- All text readable ✓
- Emoji dots are appropriately sized ✓
- Tap to expand works smoothly ✓
- No horizontal overflow ✓
- Bottom nav visible and Story link clickable ✓

- [ ] **Step 2: Test on tablet (640px - 1024px)**

Set viewport to iPad (768px) or tablet.

Verify:
- Cards start to expand side-by-side OR continue stacking (check design) ✓
- Spacing is balanced ✓
- Animations remain smooth ✓
- Text scales appropriately ✓

- [ ] **Step 3: Test on desktop (> 1024px)**

Full desktop browser.

Verify:
- Cards alternate left/right around center timeline ✓
- Hover effects trigger on card hover ✓
- Expand animation smooth ✓
- Layout is visually balanced ✓

- [ ] **Step 4: Test on actual mobile device**

Use actual phone (not emulator) to test:
- Touch interactions feel responsive ✓
- No layout shift on expand ✓
- Photos load quickly ✓
- Scroll is smooth ✓

---

## Task 9: Test Interactive Features

**Files:**
- Test: TimelineCard and Timeline components

- [ ] **Step 1: Test expand/collapse functionality**

Navigate to `/story` and perform:
1. Click first card → should expand smoothly
2. Click different card → first should collapse, new one expands
3. Click same card again → should collapse
4. Repeat for all 7 cards

Expected: Only one card expanded at a time, smooth Framer Motion animations, no jank

- [ ] **Step 2: Test scroll-reveal animations**

Navigate to `/story` and scroll slowly down the page.

Expected: 
- Cards fade in as they enter viewport ✓
- Staggered animation delays work (each card slightly delayed) ✓
- Smooth entrance, not abrupt ✓

- [ ] **Step 3: Test navigation links**

Click both footer buttons:
- "Back to Wedding" → should navigate to home page `/`
- "View Events" → should navigate to events section `/#event`

Expected: Navigation works, history allows back button

- [ ] **Step 4: Test BottomNav Story link**

From home page or any page, click Story link in BottomNav.

Expected: Smoothly navigates to `/story`

---

## Task 10: Lighthouse & Accessibility Audit

**Files:**
- Test: All story page components

- [ ] **Step 1: Run Lighthouse audit**

Build and start production server:
```bash
npm run build
npm run start
```

Open DevTools > Lighthouse and analyze `/story`:

Run audit for: Performance, Accessibility, Best Practices

Target scores:
- Performance: ≥ 85
- Accessibility: ≥ 95
- Best Practices: ≥ 90

If below targets, check:
- Image optimization (using Next.js Image component)
- Unused CSS/JavaScript
- Layout shift during expand animations
- Font loading optimization

Expected: All scores at or above targets

- [ ] **Step 2: Test keyboard navigation**

On `/story` page, use only Tab key:
- Tab through all interactive elements (cards, links)
- Verify focus states are visible (gold border/outline)
- Press Enter on focused card to expand/collapse
- Press Enter on links to navigate

Expected: All interactive elements accessible via keyboard

- [ ] **Step 3: Test with screen reader**

Using system screen reader (VoiceOver on Mac/iOS, NVDA on Windows):

Verify:
- "Our Story" heading announced ✓
- Each milestone card announced with: date, emoji, title, location, description ✓
- Links announced with destination ✓
- Expand/collapse state announced ✓

Expected: Full page readable with screen reader

- [ ] **Step 4: Verify color contrast**

Using WebAIM Color Contrast Checker:

Verify:
- Gold (#D4AF37) on navy (#060a14): ✅ WCAG AA (ratio: 7.5:1)
- White text on navy: ✅ WCAG AA (ratio: 12.6:1)
- Gold/60 on navy: ✅ WCAG AA (ratio: 4.5:1)

Expected: All text meets WCAG AA minimum 4.5:1 ratio

- [ ] **Step 5: Commit accessibility changes (if any)**

```bash
git add .
git commit -m "test: verify accessibility and performance"
```

---

## Task 11: Final Quality Check & Completion

**Files:**
- Verify: Complete feature integration

- [ ] **Step 1: Run TypeScript type check**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors or warnings

- [ ] **Step 2: Build for production**

```bash
npm run build
```

Expected: Build completes successfully, no errors

- [ ] **Step 3: Manual end-to-end test**

Perform complete user journey:
1. Home page → click Story in BottomNav
2. Read "Our Story" header
3. Expand each of 7 cards in order
4. Verify all photos display
5. Verify all descriptions are readable
6. Test on mobile, tablet, desktop
7. Click "Back to Wedding" → return to home
8. Click "View Events" → navigate to events

Expected: Entire flow works smoothly without errors

- [ ] **Step 4: Final verification checklist**

- ✅ 7 milestones display with correct dates, emojis, titles, locations
- ✅ Photos load and display correctly in expanded state
- ✅ Cards expand/collapse with smooth Framer Motion animations
- ✅ Only one card expanded at a time
- ✅ Scroll-reveal animations work when scrolling
- ✅ Mobile responsive (single column)
- ✅ Tablet responsive
- ✅ Desktop responsive (alternating cards)
- ✅ Bottom Nav Story link works
- ✅ Footer navigation links work
- ✅ Lighthouse Performance ≥ 85
- ✅ Lighthouse Accessibility ≥ 95
- ✅ Lighthouse Best Practices ≥ 90
- ✅ Keyboard navigation accessible
- ✅ Screen reader compatible
- ✅ Color contrast WCAG AA compliant
- ✅ TypeScript compiles without errors
- ✅ Production build succeeds
- ✅ No console errors in browser

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: story timeline complete, tested, and ready for production"
```

---

## Success Criteria

Feature is complete when:
1. ✅ All 7 story milestones display with romantic descriptions
2. ✅ Interactive expand/collapse works smoothly
3. ✅ Mobile-first responsive design works on all screen sizes
4. ✅ Matches existing wedding site navy/gold theme
5. ✅ Accessible (keyboard, screen reader, color contrast)
6. ✅ Performant (Lighthouse scores ≥ 85)
7. ✅ Integrated into BottomNav
8. ✅ Production-ready (builds, no errors)
