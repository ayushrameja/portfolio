# Plan 3: Infrastructure & Polish

**Estimated Time:** 2-3 hours  
**Risk Level:** Low to Medium  
**Priority:** Medium - Nice to have improvements
**Depends on:** Plan 1 and Plan 2

---

## Overview

This plan covers improvements that enhance DX, performance, and long-term maintainability but aren't blocking issues.

---

## Tasks

### 1. Migrate to next/font (30 min)

Replace Google Fonts link tags with Next.js font optimization.

**Current approach in `app/layout.tsx`:**
```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Google+Sans..." rel="stylesheet" />
```

**New approach:**

Since "Google Sans" isn't available in `next/font/google` (it's a proprietary font), you have two options:

**Option A: Use a similar font from Google Fonts**

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// In the component:
<html lang="en" className={`${inter.variable} scroll-smooth`}>
<body className="... font-sans">
```

**Option B: Self-host Google Sans (if you have license)**

```tsx
// app/layout.tsx
import localFont from "next/font/local";

const googleSans = localFont({
  src: [
    { path: "../public/fonts/GoogleSans-Regular.woff2", weight: "400" },
    { path: "../public/fonts/GoogleSans-Medium.woff2", weight: "500" },
    { path: "../public/fonts/GoogleSans-Bold.woff2", weight: "700" },
  ],
  variable: "--font-google-sans",
});
```

Then update `tailwind.config.ts`:

```tsx
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-google-sans)", "system-ui", "sans-serif"],
      },
    },
  },
};
```

- [ ] Decide on font strategy (Option A or B)
- [ ] Update `app/layout.tsx`
- [ ] Update `tailwind.config.ts`
- [ ] Remove old `<link>` tags from head
- [ ] Test font rendering

---

### 2. Centralize Types (15 min)

Move `BlogPost` type to `types/` directory.

**Current location:** `app/blogs/_posts/post.ts`

**New location:** `types/blog.ts`

```tsx
// types/blog.ts
import type { ReactElement } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  Content: () => ReactElement;
};
```

Then update imports in:
- `app/blogs/_posts/index.ts`
- `app/blogs/_posts/accessibility-fixes-10-minutes.tsx`
- `app/blogs/_posts/seo-for-developers-nextjs-checklist.tsx`
- `app/blogs/_components/BlogPostShell.tsx`

Also rename `IProject.ts` to `project.ts` for consistency:

```tsx
// types/project.ts (renamed from IProject.ts)
export type Project = {
  id: number;
  name: string;
  role: string;
  client: string;
  skills: string[];
  points: string[];
  link: string;
};
```

Update imports in:
- `utils/projectData.ts`
- `app/page.tsx` (or `ProjectsSection.tsx` after Plan 2)

- [ ] Create `types/blog.ts`
- [ ] Delete `app/blogs/_posts/post.ts`
- [ ] Update all BlogPost imports
- [ ] Rename `types/IProject.ts` to `types/project.ts`
- [ ] Rename `IProject` to `Project`
- [ ] Update all Project imports

---

### 3. Fix Rate Limiter (1-2 hours)

The current in-memory rate limiter resets on every serverless cold start.

**Current broken approach:**
```tsx
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
```

**Options:**

#### Option A: Upstash Redis (Recommended for Vercel)

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

```tsx
// app/api/contact/route.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  analytics: true,
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { 
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

  // ... rest of handler
}
```

#### Option B: Vercel KV

```bash
pnpm add @vercel/kv
```

Similar implementation but using `@vercel/kv`.

#### Option C: Accept the limitation (for low-traffic portfolio)

Add a comment documenting the limitation:

```tsx
// NOTE: This rate limiter resets on cold start.
// For a portfolio site with low traffic, this is acceptable.
// For production apps, use Upstash Redis or Vercel KV.
const rateLimitMap = new Map<...>();
```

- [ ] Choose rate limiting strategy
- [ ] If Upstash: Set up Upstash account and get credentials
- [ ] If Upstash: Add environment variables
- [ ] Implement chosen solution
- [ ] Test rate limiting works

---

### 4. Add Loading States (30 min)

Create meaningful Suspense fallbacks.

**Create `app/loading.tsx`:**

```tsx
export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
    </div>
  );
}
```

**Create `app/blogs/loading.tsx`:**

```tsx
export default function BlogsLoading() {
  return (
    <main className="min-h-dvh px-6 py-10 pb-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-8 dark:border-zinc-700/60 dark:bg-zinc-900/40">
          <div className="h-8 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          
          <div className="mt-10 grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-zinc-200/70 bg-white/50 p-6 dark:border-zinc-700/60 dark:bg-zinc-950/20">
                <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
```

**Update `app/ClientLayout.tsx` Suspense:**

```tsx
<Suspense fallback={<LoadingSpinner />}>
  {children}
  <Nav />
</Suspense>
```

- [ ] Create `app/loading.tsx`
- [ ] Create `app/blogs/loading.tsx`
- [ ] Update Suspense fallback in ClientLayout

---

### 5. Create hooks/ Directory Structure (15 min)

Organize hooks for discoverability.

**Create directory and index:**

```
hooks/
├── index.ts              # Re-exports all hooks
├── useContactForm.ts     # From Plan 2
├── useActiveSection.ts   # Extract from Nav.tsx (optional)
└── useTheme.ts           # Extract from ThemeToggle (optional)
```

**Create `hooks/index.ts`:**

```tsx
export { useContactForm } from "./useContactForm";
// Add more as you create them
```

This allows clean imports:
```tsx
import { useContactForm } from "@/hooks";
```

- [ ] Create `hooks/` directory
- [ ] Move `useContactForm.ts` (from Plan 2)
- [ ] Create `hooks/index.ts`
- [ ] Update imports to use barrel export

---

### 6. Optional: Extract Nav Hooks (30 min)

The Nav component has complex intersection observer logic that could be a hook.

**Create `hooks/useActiveSection.ts`:**

```tsx
import { useEffect, useState } from "react";

type Section = "about" | "projects" | "contact";

export function useActiveSection(enabled: boolean): Section {
  const [activeSection, setActiveSection] = useState<Section>("about");

  useEffect(() => {
    if (!enabled) return;

    const sections = ["about", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const next = visible[0]?.target?.id as Section | undefined;
        if (next) setActiveSection(next);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return activeSection;
}
```

Then in Nav.tsx:
```tsx
const activeHomeSection = useActiveSection(isHomeRoute);
```

- [ ] Create `hooks/useActiveSection.ts`
- [ ] Update Nav.tsx to use hook
- [ ] Test scroll behavior

---

## Checklist Summary

- [ ] Font loading migrated to next/font
- [ ] Types centralized in types/
- [ ] Type naming consistent (no "I" prefix)
- [ ] Rate limiter fixed or documented
- [ ] Loading states added
- [ ] hooks/ directory organized
- [ ] Nav hooks extracted (optional)

---

## Testing

1. Fonts render correctly (no FOUT/FOIT)
2. Type imports work across codebase
3. Rate limiter properly limits requests
4. Loading states show during navigation
5. `pnpm build` succeeds
6. `pnpm lint` passes

---

## PR Description Template

```
## Infrastructure & Polish

### Changes
- Migrate Google Fonts to next/font for better performance
- Centralize types in types/ directory
- Fix/document rate limiter limitation
- Add loading.tsx for better UX during navigation
- Organize hooks/ directory

### Why
- next/font eliminates render-blocking font requests
- Centralized types improve discoverability
- Loading states prevent blank screens
- Better DX with organized file structure

### Performance
- Fonts now self-hosted (faster load)
- No layout shift from fonts
```
