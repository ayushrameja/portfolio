# Portfolio Refactoring Plans

This directory contains actionable refactoring plans identified during a comprehensive code review.

---

## Overview

| Plan | Focus | Time | Risk | Status |
|------|-------|------|------|--------|
| [Plan 1](./plan-1-quick-wins.md) | Quick Wins & Critical Fixes | 1-2 hrs | Low | ⬜ Not Started |
| [Plan 2](./plan-2-home-page-refactor.md) | Home Page Refactor | 3-4 hrs | Medium | ⬜ Not Started |
| [Plan 3](./plan-3-infrastructure-polish.md) | Infrastructure & Polish | 2-3 hrs | Low-Medium | ⬜ Not Started |

**Recommended order:** Plan 1 → Plan 2 → Plan 3

---

## Plan Summaries

### Plan 1: Quick Wins & Critical Fixes
Low-risk, high-impact changes that can ship immediately:
- Add `error.tsx` and `not-found.tsx`
- Fix resume page metadata
- Remove dead code (unused state, packages, assets)
- Extract constants
- Add sitemap and robots.txt

### Plan 2: Home Page Refactor
Structural improvement to the main page:
- Split 580-line `page.tsx` into focused components
- Extract `useContactForm` hook
- Create shared animation variants
- Convert to Server Component where possible

### Plan 3: Infrastructure & Polish
DX and performance improvements:
- Migrate to `next/font`
- Centralize types
- Fix rate limiter
- Add loading states
- Organize hooks directory

---

## How to Use These Plans

1. **Pick a plan** - Start with Plan 1 (quick wins)
2. **Create a branch** - `git checkout -b refactor/plan-1-quick-wins`
3. **Work through tasks** - Check off items as you complete them
4. **Test thoroughly** - Each plan has a testing section
5. **Open PR** - Use the PR template provided in each plan
6. **Update status** - Mark plan complete in this README

---

## Key Issues Identified

### Critical
- ❌ No error boundaries (`error.tsx`, `not-found.tsx`)
- ❌ God component (`page.tsx` at 580+ lines)
- ❌ Resume page uses `useEffect` for metadata

### Important
- ⚠️ Entire home page is client-rendered
- ⚠️ In-memory rate limiter doesn't work in serverless
- ⚠️ Dead code: `navClass`, `lenis`, unused video

### Nice to Have
- 💡 Font loading not optimized
- 💡 Types scattered across codebase
- 💡 Animation variants duplicated

---

## After Completion

Once all plans are complete, this directory can be deleted or archived. The codebase will have:

- ✅ Proper error handling
- ✅ Modular, testable components
- ✅ Centralized types and constants
- ✅ Optimized fonts and assets
- ✅ SEO best practices (sitemap, robots)
- ✅ Clean hooks organization

---

## Questions?

Each plan is self-contained with:
- Detailed task breakdowns
- Code examples
- Testing instructions
- PR description templates

Start with Plan 1 and work your way through!
