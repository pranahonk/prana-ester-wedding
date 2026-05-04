# Story Timeline Flow Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Story timeline as slide 10 into the main slide sequence and add engagement milestone to create Gallery (9) → Story (10) → Thanks (11) flow.

**Architecture:** Add engagement milestone to timelineData, create StorySlide wrapper component, register it in SlideManager at position 10 (pushing Thanks to 11), update BottomNav to navigate to Story as a slide instead of a separate page link.

**Tech Stack:** Next.js App Router, React, Framer Motion, Tailwind CSS, SlideManager architecture

---

## Task 1: Add Engagement Milestone to Timeline Data

**Files:**
- Modify: `app/data/timelineData.ts:70-90` (insert new milestone before Wedding Day)

- [ ] **Step 1: Read current timelineData to see all milestones**

Run: `head -95 app/data/timelineData.ts | tail -30`
Expected: Last milestone is "Our Wedding Day" (id: 7, May 30, 2026)

- [ ] **Step 2: Add engagement milestone object**

Edit `app/data/timelineData.ts` and insert after milestone id 6 and before id 7:

```typescript
  {
    id: 8,
    year: 2025,
    date: "December 21, 2025",
    emoji: "💎",
    title: "Our Engagement",
    location: "Jakarta",
    photo: "/photos/DSC00328.jpg",
    description: "On this beautiful December evening, you got down on one knee, and I said yes without hesitation. In that moment, surrounded by the life we've built together, I knew this was forever. This wasn't just a proposal—it was a promise, a celebration of our journey, and the beginning of our next chapter together.",
    order: 8,
  },
```

- [ ] **Step 3: Update Wedding Day milestone to id 8 and order 8**

Change the "Our Wedding Day" milestone from `id: 7` to `id: 8` and `order: 8` (currently at line ~80)

- [ ] **Step 4: Verify structure and commit**

Run: `npm run build 2>&1 | grep -i "error\|warning" | head -5`
Expected: No errors related to timelineData

```bash
git add app/data/timelineData.ts
git commit -m "feat: add engagement milestone to timeline (Dec 21, 2025)"
```

---

## Task 2: Create StorySlide Component

**Files:**
- Create: `app/components/slides/StorySlide.tsx`

- [ ] **Step 1: Create the StorySlide component file**

Create `app/components/slides/StorySlide.tsx`:

```typescript
"use client";

import SlideWrapper from "./SlideWrapper";
import Timeline from "@/app/story/components/Timeline";
import { timelineData } from "@/app/data/timelineData";

export default function StorySlide() {
  return (
    <SlideWrapper allowScroll padding="pt-8 sm:pt-10 px-4 sm:px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-gold/40 text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-sans">
            Our Journey
          </p>
          <h1 className="font-script text-4xl sm:text-5xl text-gold mb-3">
            Our Story
          </h1>
          <p className="text-gold/70 text-sm sm:text-base font-sans">
            A Journey of Love
          </p>
        </div>

        {/* Timeline component */}
        <Timeline milestones={timelineData} />
      </div>
    </SlideWrapper>
  );
}
```

- [ ] **Step 2: Verify file is created**

Run: `test -f app/components/slides/StorySlide.tsx && echo "File created successfully"`
Expected: "File created successfully"

- [ ] **Step 3: Check for TypeScript errors**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors about StorySlide

- [ ] **Step 4: Commit**

```bash
git add app/components/slides/StorySlide.tsx
git commit -m "feat: create StorySlide component with Timeline"
```

---

## Task 3: Update SlideManager to Register StorySlide

**Files:**
- Modify: `app/components/SlideManager.tsx:1-40` (imports and constants)

- [ ] **Step 1: Read SlideManager imports section**

Run: `head -25 app/components/SlideManager.tsx`
Expected: See all slide imports ending with GallerySlide and ClosingSlide

- [ ] **Step 2: Add StorySlide import**

After the line `import GallerySlide from "./slides/GallerySlide";` add:

```typescript
import StorySlide from "./slides/StorySlide";
```

- [ ] **Step 3: Update TOTAL_SLIDES constant**

Find the line `const TOTAL_SLIDES = 11;` and change to:

```typescript
const TOTAL_SLIDES = 12;
```

- [ ] **Step 4: Update SLIDE_HASH_MAP**

Find the SLIDE_HASH_MAP object and add `story: 10` to it. It should look like:

```typescript
const SLIDE_HASH_MAP: Record<string, number> = {
  opening: 1,
  groom: 2,
  bride: 3,
  verse: 4,
  event: 5,
  rsvp: 6,
  wishes: 7,
  gift: 8,
  gallery: 9,
  story: 10,
  closing: 11,
};
```

- [ ] **Step 5: Find and update SLIDE_COMPONENTS array**

Read lines 80-110 to locate where slides are registered:

Run: `sed -n '80,130p' app/components/SlideManager.tsx | grep -n "CoverSlide\|ClosingSlide"`
Expected: See the array structure

- [ ] **Step 6: Insert StorySlide in SLIDE_COMPONENTS array**

Find the line with `<GallerySlide {...slideProps} />` and add after it:

```typescript
        <StorySlide {...slideProps} />
```

Before `<ClosingSlide {...slideProps} />`

- [ ] **Step 7: Verify structure**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors

- [ ] **Step 8: Commit**

```bash
git add app/components/SlideManager.tsx
git commit -m "feat: add StorySlide to SlideManager as slide 10"
```

---

## Task 4: Update BottomNav for Story Navigation

**Files:**
- Modify: `app/components/BottomNav.tsx:103-123` (NAV_ITEMS array)

- [ ] **Step 1: Read BottomNav NAV_ITEMS around Story and Thanks**

Run: `sed -n '100,125p' app/components/BottomNav.tsx`
Expected: See Story with `href: "/story"` and Thanks with `slide: 10`

- [ ] **Step 2: Update Story navigation item**

Find the Story item (around line 104-112) and change from:

```typescript
  {
    label: "Story",
    href: "/story",
    icon: (...),
  },
```

To:

```typescript
  {
    label: "Story",
    slide: 10,
    icon: (...),
  },
```

- [ ] **Step 3: Update Thanks slide number**

Find the Thanks item and change `slide: 10` to `slide: 11`

- [ ] **Step 4: Verify BottomNav structure**

Run: `npx tsc --noEmit 2>&1 | grep -i "bottomnav\|nav_items"`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add app/components/BottomNav.tsx
git commit -m "feat: update BottomNav Story to slide-based navigation"
```

---

## Task 5: Build and Verify Full Integration

**Files:**
- None (verification only)

- [ ] **Step 1: Full TypeScript check**

Run: `npx tsc --noEmit`
Expected: Clean output, no errors

- [ ] **Step 2: Build the project**

Run: `npm run build 2>&1 | tail -20`
Expected: All routes compile successfully, including /story page still works

- [ ] **Step 3: Verify slide count in build output**

Run: `npm run build 2>&1 | grep -A 15 "Route (app)"`
Expected: See routes including /story (deprecated page) and all slides render

- [ ] **Step 4: Test navigation flow manually**

The flow should now work as:
- Swipe/navigate through slides 1-9 (Opening → Gallery)
- Story becomes slide 10 (swipe to Story)
- Thanks becomes slide 11 (swipe to Thanks)
- BottomNav shows Story with slide icon, not link icon

- [ ] **Step 5: Verify no TypeScript issues**

Run: `npx tsc --noEmit && echo "✅ Build successful"`
Expected: "✅ Build successful"

---

## Task 6: Final Commit and Deploy

**Files:**
- None (final verification)

- [ ] **Step 1: Verify git status**

Run: `git status`
Expected: All changes committed, clean working directory

- [ ] **Step 2: Check recent commits**

Run: `git log -5 --oneline`
Expected: See all task commits in order

- [ ] **Step 3: Build final production version**

Run: `npm run build`
Expected: Successful build with no errors

- [ ] **Step 4: Deploy to Vercel**

Run: `vercel deploy --prod`
Expected: Deployment succeeds, new URL generated

- [ ] **Step 5: Verify deployment**

The following should now work:
- Gallery slide (9) displays
- Swipe right goes to Story slide (10)
- Timeline shows all 8 milestones including engagement (Dec 21, 2025)
- Swipe right goes to Thanks slide (11)
- BottomNav highlights correct slide

---

## Testing Checklist

- [ ] All 8 timeline milestones render in Story slide
- [ ] Engagement milestone (Dec 21, 2025) displays correctly with DSC00328 photo
- [ ] Timeline animations trigger on scroll within Story slide
- [ ] Swipe navigation: Gallery → Story → Thanks works
- [ ] BottomNav highlights Story (slide 10) when active
- [ ] BottomNav highlights Thanks (slide 11) when active
- [ ] No hydration errors in browser console
- [ ] Mobile responsive (test on iOS/Android)
- [ ] TypeScript clean (`npx tsc --noEmit`)
- [ ] Build succeeds without warnings

---

## Out of Scope

- Deprecating `/story` page and routes (can keep as fallback redirect)
- Modifying existing timeline animations
- Adding new photos beyond DSC00328
- Changing wedding date or other existing milestones

---

## Notes

- The engagement date (Dec 21, 2025) chronologically fits between first anniversary (March 27, 2025) and wedding day (May 30, 2026)
- Timeline component reuses existing IntersectionObserver and whileInView animations
- StorySlide uses the same SlideWrapper pattern as other slides for consistency
- BottomNav's getActiveIdx() function already supports both slide-based and href-based navigation items
