# Story Timeline Flow Integration

**Goal:** Integrate the Story timeline page into the main slide sequence as slide 10, creating a continuous navigation flow: Gallery (9) → Story (10) → Thanks (11). Add the engagement milestone to the timeline data.

**Architecture:** Convert the standalone `/story` page into a native StorySlide component that fits seamlessly into SlideManager's slide array. The Timeline component will be wrapped in SlideWrapper with scrolling enabled. The engagement milestone will be added to timelineData with proper ordering. BottomNav will be updated to navigate to Story as a slide instead of a separate page.

**Tech Stack:** Next.js App Router, React, Framer Motion, Tailwind CSS, SlideManager architecture

---

## Requirements

### 1. Timeline Data Update
Add engagement milestone as the 8th entry in the timeline:
- **Date**: December 21, 2025
- **Title**: Engagement-themed (suggest "Our Engagement" or "He Asked, She Said Yes")
- **Photo**: DSC00328.jpg
- **Emoji**: 💎 or 💍 (engagement-appropriate)
- **Location**: Jakarta
- **Description**: Romantic narrative about the engagement moment
- **Order**: 8 (between "One Year of Forever" and "Our Wedding Day")

### 2. StorySlide Component
Create a new slide that:
- Wraps the Timeline component in SlideWrapper
- Enables scrolling (`allowScroll: true`)
- Maintains consistent styling with other slides
- Shows all 8 timeline milestones
- Works with IntersectionObserver animations from Timeline

### 3. SlideManager Integration
Update SlideManager to:
- Import and register StorySlide as slide 10
- Update TOTAL_SLIDES from 11 to 12
- Update SLIDE_HASH_MAP to include `story: 10`
- Place StorySlide after GallerySlide and before ClosingSlide (renamed from ClosingSlide to represent slide 11)
- Maintain swipe/navigation consistency

### 4. BottomNav Update
Modify BottomNav to:
- Change Story from `href: "/story"` to `slide: 10`
- Update the slide number sequencing (Thanks becomes slide 11)
- Ensure active state detection works with slide-based Story navigation

### 5. Navigation Flow
Result: Gallery → Story → Thanks progression feels continuous
```
Slide 9: Gallery (photo gallery)
Slide 10: Story (timeline milestones with engagement added)
Slide 11: Thanks (closing/thank you slide)
```

---

## Data Structure: Engagement Milestone

```typescript
{
  id: 8,
  year: 2025,
  date: "December 21, 2025",
  emoji: "💎",
  title: "Our Engagement",
  location: "Jakarta",
  photo: "/photos/DSC00328.jpg",
  description: "A romantic narrative describing the engagement moment, emotions, and significance. Should follow the tone and style of existing milestones (romantic, first-person narrative, 2-3 sentences).",
  order: 8,
}
```

---

## Files to Modify/Create

1. **Create**: `app/components/slides/StorySlide.tsx`
   - Imports Timeline and timelineData
   - Wraps Timeline in SlideWrapper with scrolling enabled
   - Uses consistent styling (padding, max-width) with other slides

2. **Modify**: `app/data/timelineData.ts`
   - Add engagement milestone as 8th entry
   - Ensure all order values are sequential (1-8)

3. **Modify**: `app/components/SlideManager.tsx`
   - Import StorySlide
   - Add to SLIDE_COMPONENTS array at index 10
   - Update TOTAL_SLIDES to 12
   - Update SLIDE_HASH_MAP

4. **Modify**: `app/components/BottomNav.tsx`
   - Change Story from `href: "/story"` to `slide: 10`
   - Update Thanks slide number from 10 to 11

5. **Deprecate** (optional): `app/story/page.tsx` and `app/story/layout.tsx`
   - Can add redirect to home page or keep as fallback

---

## Testing Checklist

- [ ] All 8 timeline milestones display in Story slide
- [ ] Timeline animations trigger on scroll within the slide
- [ ] Swipe navigation works: Gallery → Story → Thanks
- [ ] BottomNav highlights correct slide when Story is active
- [ ] Engagement milestone photo (DSC00328.jpg) loads correctly
- [ ] Timeline layout responsive on mobile and desktop
- [ ] No hydration errors or console warnings
- [ ] Closing/Thanks slide still renders correctly as slide 11

---

## Notes

- The existing Timeline component and animations (whileInView, persistent reveal) will work within the StorySlide context
- SlideWrapper's `allowScroll` will enable vertical scrolling within the slide
- The engagement date (Dec 21, 2025) is between "One Year Anniversary" (March 27, 2025) and "Wedding Day" (May 30, 2026), so ordering is chronologically correct
