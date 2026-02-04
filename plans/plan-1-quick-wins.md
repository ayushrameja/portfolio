# Plan 1: Quick Wins & Critical Fixes

**Estimated Time:** 1-2 hours  
**Risk Level:** Low  
**Priority:** High - Ship first

---

## Tasks

### 1. Add Error Boundaries (20 min)

Create `app/error.tsx`:

```tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          Something went wrong
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          An unexpected error occurred.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-zinc-50 transition hover:bg-black dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
```

Create `app/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          Page not found
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-zinc-50 transition hover:bg-black dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
```

- [ ] Create `app/error.tsx`
- [ ] Create `app/not-found.tsx`

---

### 2. Fix Resume Metadata (5 min)

**File:** `app/resume/page.tsx`

Remove the useEffect hack:

```tsx
// DELETE THIS:
useEffect(() => {
  document.title = "Resume: Ayush Rameja";
}, []);
```

Add proper metadata export at the top (before the component):

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Ayush Rameja",
  description: "View and download Ayush Rameja's resume.",
};
```

- [ ] Remove `useEffect` for document.title
- [ ] Add `metadata` export
- [ ] Remove unused `useEffect` import if no longer needed

---

### 3. Remove Dead Code (15 min)

#### 3a. Remove unused `navClass` from store

**File:** `store/store.ts`

Remove these lines:
- `navClass: string;` from interface
- `setNavClass: (navClass: string) => void;` from interface
- `navClass: "grey",` from initial state
- `setNavClass: (navClass: string) => set({ navClass }),` from actions

**File:** `app/ClientLayout.tsx`

Remove:
- `const setNavClass = useAppStore((state) => state.setNavClass);`
- `setNavClass("grey");`

- [ ] Clean up `store/store.ts`
- [ ] Clean up `app/ClientLayout.tsx`

#### 3b. Remove unused `lenis` dependency

```bash
pnpm remove lenis
```

- [ ] Remove `lenis` package

#### 3c. Remove or use dead video asset

**File:** `public/assets/video/bg-video.mp4`

Either delete this file or document why it exists.

- [ ] Delete `public/assets/video/bg-video.mp4`

---

### 4. Extract Constants (20 min)

Create `constants/links.ts`:

```tsx
export const LINKS = {
  email: "ayushrameja@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayushrameja/",
  github: "https://github.com/ayushrameja",
  autodesk: "https://www.autodesk.com",
} as const;

export const RESUME = {
  driveId: "1KH4dnH50ocYFxv0Cut7gqMltRDHgC088",
  get previewUrl() {
    return `https://drive.google.com/file/d/${this.driveId}/preview`;
  },
  get downloadUrl() {
    return `https://drive.google.com/uc?export=download&id=${this.driveId}`;
  },
} as const;
```

Then update these files to import from constants:
- `app/page.tsx` (email, linkedin, github, autodesk links)
- `app/resume/page.tsx` (resume URLs)

- [ ] Create `constants/links.ts`
- [ ] Update `app/page.tsx` to use constants
- [ ] Update `app/resume/page.tsx` to use constants

---

### 5. Add Sitemap & Robots (30 min)

Create `app/sitemap.ts`:

```tsx
import type { MetadataRoute } from "next";
import { allPosts } from "./blogs/_posts";

const BASE_URL = "https://ayushrameja.com"; // Update with your domain

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = allPosts.map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogPosts,
  ];
}
```

Create `app/robots.ts`:

```tsx
import type { MetadataRoute } from "next";

const BASE_URL = "https://ayushrameja.com"; // Update with your domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

- [ ] Create `app/sitemap.ts`
- [ ] Create `app/robots.ts`
- [ ] Update BASE_URL with actual domain

---

## Checklist Summary

- [ ] `app/error.tsx` created
- [ ] `app/not-found.tsx` created
- [ ] Resume metadata fixed
- [ ] Dead `navClass` code removed
- [ ] `lenis` package removed
- [ ] Dead video asset removed
- [ ] `constants/links.ts` created
- [ ] Constants used in pages
- [ ] `app/sitemap.ts` created
- [ ] `app/robots.ts` created

---

## Testing

After completing:

1. Visit `/some-random-path` → should see 404 page
2. Visit `/resume` → check title in browser tab
3. Run `pnpm build` → should succeed without lenis
4. Visit `/sitemap.xml` → should render sitemap
5. Visit `/robots.txt` → should render robots

---

## PR Description Template

```
## Quick Wins & Critical Fixes

### Changes
- Add error.tsx and not-found.tsx for proper error handling
- Fix resume page metadata (was using useEffect hack)
- Remove dead code: unused navClass state, lenis package, video asset
- Extract hardcoded URLs to constants/links.ts
- Add sitemap.ts and robots.ts for SEO

### Why
- Error boundaries prevent raw error screens in production
- Proper metadata improves SEO and follows Next.js conventions
- Dead code removal reduces bundle size and confusion
- Constants improve maintainability
- Sitemap/robots are SEO basics we were missing

### Testing
- Verified 404 page renders
- Verified error boundary catches errors
- Build succeeds
- Sitemap and robots accessible
```
