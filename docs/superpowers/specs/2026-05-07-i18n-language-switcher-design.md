# i18n Language Switcher Design

**Date:** 2026-05-07
**Status:** Approved

## Overview

A floating ID/EN language switcher for the Prana & Ester wedding invitation site. Default language is Indonesian (ID). Language preference persists via `localStorage`. No URL changes — purely client-side state toggle.

## Architecture

Four new files added. No routing changes, no new dependencies, no changes to `next.config.ts`.

```
app/
  context/
    LanguageContext.tsx    ← Provider + useLanguage hook
  data/
    translations.ts        ← All ID/EN strings keyed by slide
  components/
    LanguageSwitcher.tsx   ← Floating flag button
```

`LanguageProvider` wraps `SlideManager` in `app/page.tsx`. This keeps it co-located with `MusicPlayer`, which is also rendered inside `SlideManager`.

## LanguageContext

```ts
type Language = 'id' | 'en';

interface LanguageContextValue {
  lang: Language;
  t: typeof translations['id'];
  setLang: (lang: Language) => void;
}
```

- On mount: reads `localStorage.getItem('lang')`, defaults to `'id'`
- On language change: writes `localStorage.setItem('lang', lang)`
- `t` is `translations[lang]` — the active translation object passed directly through context
- No selector functions or memoization — the translations object is small enough that this is not a concern

## Translation Structure

Strings grouped by slide in `app/data/translations.ts`:

```ts
export const translations = {
  id: {
    greeting:  { together: "...", ... },
    event:     { ceremony: "Pemberkatan Nikah", reception: "Resepsi", ... },
    bride:     { title: "Mempelai Wanita", ... },
    groom:     { title: "Mempelai Pria", ... },
    rsvp:      { title: "Konfirmasi Kehadiran", attend: "Hadir", notAttend: "Tidak Hadir", ... },
    wishes:    { title: "Doa & Ucapan", placeholder: "Tulis doa atau ucapan...", send: "Kirim", ... },
    gift:      { title: "Hadiah", ... },
    story:     { title: "Kisah Kami", ... },
    closing:   { ... },
    nav:       { /* bottom nav labels */ },
  },
  en: {
    greeting:  { together: "Together with their families", ... },
    event:     { ceremony: "Wedding Ceremony", reception: "Reception", ... },
    // same keys, English values
  }
}
```

Full string values are populated during implementation by reading each slide component.

## LanguageSwitcher Button

**Position:** `fixed top-20 right-6 z-40` — 80px from top, 8px gap below MusicPlayer (`top-6` + `h-12` = 72px).

**Appearance:** Matches MusicPlayer styling — same `w-12 h-12 rounded-full` shape, navy background (`#1B2A4A → #0F1D33`), gold border (`rgba(212,175,55,0.25)`), same box shadow.

**Content:** Both flags side by side — 🇮🇩 🇬🇧 at `text-lg`. Active flag at `opacity-100`, inactive flag at `opacity-35`.

**Interaction:** Tap toggles between `'id'` and `'en'`. No animation on the toggle itself — language state change is the feedback.

**Hydration:** Reads `localStorage` in a `useEffect` on mount to avoid SSR/client mismatch. Renders default `'id'` on server.

## Slide Updates

Slides that require translation — one `const { t } = useLanguage()` line added, hardcoded strings replaced:

| Slide | Key namespace |
|---|---|
| GreetingSlide | `t.greeting` |
| BrideSlide | `t.bride` |
| GroomSlide | `t.groom` |
| EventSlide | `t.event` |
| RSVPSlide | `t.rsvp` |
| WishesSlide | `t.wishes` |
| GiftSlide | `t.gift` |
| StorySlide | `t.story` |
| ClosingSlide | `t.closing` |
| VerseSlide | `t.verse` |
| BottomNav | `t.nav` |

**Out of scope — not translated:**
- Proper names: Prana, Ester, family names
- Dates and venue names (GMS Kelapa Gading, etc.)
- Bible verses (kept in original language)
- Admin pages (`/admin`)

## Implementation Order

1. `app/data/translations.ts` — populate all strings by reading each slide
2. `app/context/LanguageContext.tsx` — provider and hook
3. `app/components/LanguageSwitcher.tsx` — floating button
4. Mount `LanguageProvider` in `app/page.tsx` around `SlideManager`
5. Mount `LanguageSwitcher` inside `SlideManager` alongside `MusicPlayer`
6. Update each slide component to use `t.*` keys
