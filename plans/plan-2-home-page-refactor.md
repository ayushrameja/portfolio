# Plan 2: Home Page Refactor

**Estimated Time:** 3-4 hours  
**Risk Level:** Medium  
**Priority:** High - Core structural improvement
**Depends on:** Plan 1 (optional but recommended)

---

## Overview

The current `app/page.tsx` is 580+ lines handling everything. This plan breaks it into focused, testable components.

### Target Structure

```
app/
├── page.tsx                    # ~50 lines, Server Component
├── _components/
│   ├── HeroSection.tsx         # ~180 lines
│   ├── ProjectsSection.tsx     # ~80 lines
│   ├── ContactSection.tsx      # ~200 lines, Client Component
│   └── Footer.tsx              # ~20 lines
hooks/
├── useContactForm.ts           # Form state & submission logic
lib/
├── animations.ts               # Shared Framer Motion variants
```

---

## Tasks

### 1. Create Shared Animation Variants (30 min)

Create `lib/animations.ts`:

```tsx
import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  },
};

export const staggerContainer = (
  staggerChildren = 0.4, 
  delayChildren = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5 } 
  },
};
```

- [ ] Create `lib/animations.ts`

---

### 2. Extract Contact Form Hook (45 min)

Create `hooks/useContactForm.ts`:

```tsx
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormReturn {
  formState: FormState;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submittedName: string;
  updateField: (field: keyof FormState, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function useContactForm(): UseContactFormReturn {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setSubmittedName(formState.name);
      setFormState(initialState);
      toast.success("Message sent. I'll get back to you soon.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitted(false);
    setSubmittedName("");
  };

  return {
    formState,
    isSubmitting,
    isSubmitted,
    submittedName,
    updateField,
    handleSubmit,
    reset,
  };
}
```

- [ ] Create `hooks/useContactForm.ts`

---

### 3. Create HeroSection Component (1 hour)

Create `app/_components/HeroSection.tsx`:

This component contains:
- The hero background with gradients
- Profile card
- "What I do" section
- Quick links
- Scroll indicator

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center px-6 py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* ... gradient backgrounds from original ... */}
      </div>
      
      <motion.div
        className="mx-auto w-full max-w-6xl"
        variants={staggerContainer()}
        initial="hidden"
        animate="visible"
      >
        {/* ... hero content ... */}
      </motion.div>
    </section>
  );
}
```

**Note:** Copy the full section from `app/page.tsx` lines 94-286.

- [ ] Create `app/_components/HeroSection.tsx`
- [ ] Move hero section code
- [ ] Update imports

---

### 4. Create ProjectsSection Component (30 min)

Create `app/_components/ProjectsSection.tsx`:

```tsx
import Link from "next/link";
import { IProject } from "@/types/IProject";
import { projects } from "@/utils/projectData";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Selected work
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              A few projects that highlight my role, skills, and impact.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {projects.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border ...">
      {/* ... project card JSX from original ... */}
    </div>
  );
}
```

**Note:** This can be a Server Component (no "use client" needed).

- [ ] Create `app/_components/ProjectsSection.tsx`
- [ ] Extract ProjectCard as sub-component
- [ ] Move projects section code

---

### 5. Create ContactSection Component (1 hour)

Create `app/_components/ContactSection.tsx`:

```tsx
"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { LINKS } from "@/constants/links"; // From Plan 1

export default function ContactSection() {
  const {
    formState,
    isSubmitting,
    isSubmitted,
    submittedName,
    updateField,
    handleSubmit,
    reset,
  } = useContactForm();

  return (
    <section id="contact" className="px-6 py-20">
      {/* ... contact section JSX ... */}
    </section>
  );
}
```

- [ ] Create `app/_components/ContactSection.tsx`
- [ ] Use `useContactForm` hook
- [ ] Move contact section code

---

### 6. Create Footer Component (15 min)

Create `app/_components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="px-6 pb-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
        <div className="mt-6 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ayush Rameja. All rights reserved.</p>
          <p className="text-zinc-500 dark:text-zinc-400">
            Code licensed under Apache License 2.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] Create `app/_components/Footer.tsx`

---

### 7. Refactor Main Page (30 min)

Rewrite `app/page.tsx`:

```tsx
import HeroSection from "./_components/HeroSection";
import ProjectsSection from "./_components/ProjectsSection";
import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="min-h-dvh pb-28">
      <HeroSection />
      
      <div className="px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
        </div>
      </div>
      
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
```

**Key change:** The main page is now a **Server Component**. Only `HeroSection` and `ContactSection` need "use client".

- [ ] Rewrite `app/page.tsx` to compose sections
- [ ] Remove "use client" from main page
- [ ] Verify all imports work

---

## Checklist Summary

- [ ] `lib/animations.ts` created with shared variants
- [ ] `hooks/useContactForm.ts` created
- [ ] `app/_components/HeroSection.tsx` created
- [ ] `app/_components/ProjectsSection.tsx` created  
- [ ] `app/_components/ContactSection.tsx` created
- [ ] `app/_components/Footer.tsx` created
- [ ] `app/page.tsx` refactored to ~50 lines
- [ ] Main page is Server Component
- [ ] All animations still work
- [ ] Contact form still submits

---

## Testing

1. Visual regression: Compare before/after screenshots
2. Contact form: Submit a test message
3. Animations: Verify stagger animations on load
4. Mobile: Check responsive layout
5. Build: `pnpm build` succeeds
6. Bundle size: Check if JS bundle decreased (should slightly)

---

## Rollback Plan

If something breaks:
1. The original `page.tsx` is in git history
2. Can revert individual component extractions
3. No database or API changes involved

---

## PR Description Template

```
## Home Page Refactor

### Changes
- Split 580-line page.tsx into focused components
- Extract useContactForm hook for form state management
- Create shared animation variants in lib/animations.ts
- Convert main page to Server Component

### New Files
- app/_components/HeroSection.tsx
- app/_components/ProjectsSection.tsx  
- app/_components/ContactSection.tsx
- app/_components/Footer.tsx
- hooks/useContactForm.ts
- lib/animations.ts

### Why
- Easier to maintain and test individual sections
- Reduces merge conflict potential
- Server-renders static content (hero, projects, footer)
- Only ships client JS for interactive parts (contact form)

### Testing
- All animations work as before
- Contact form submits successfully
- No visual regressions
- Build succeeds
```
