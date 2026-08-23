import AxeBuilder from "@axe-core/playwright";
import { devices, expect, test } from "@playwright/test";

const routes = [
  "/",
  "/experience/autodesk",
  "/experience/siemens",
  "/experience/accenture",
  "/bakbak",
  "/blogs",
  "/blogs/how-to-review-agent-written-prs",
  "/resume",
] as const;

for (const route of routes) {
  test(`${route} renders without automated accessibility violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("main")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .exclude("object")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);

    const headingLevels = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((headings) =>
      headings.map((heading) => Number(heading.tagName.slice(1))),
    );
    expect(headingLevels.filter((level) => level === 1)).toHaveLength(1);
    for (let index = 1; index < headingLevels.length; index += 1) {
      expect(headingLevels[index]).toBeLessThanOrEqual(headingLevels[index - 1] + 1);
    }
  });
}

test("homepage leads with professional work and uses text navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("reliable product platforms");
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByText("Work", { exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByText("Writing", { exact: true })).toBeVisible();

  const professionalTop = await page.locator("#work").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  const personalTop = await page.locator(".bakbak-case-study").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  expect(professionalTop).toBeLessThan(personalTop);
});

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
]) {
  test(`mobile layout is clear at ${viewport.width}x${viewport.height}`, async ({ page, browserName }) => {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    await page.getByRole("button", { name: "Menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile primary navigation" });
    await expect(mobileNav.getByText("Work", { exact: true })).toBeVisible();
    await expect(mobileNav.getByText("Résumé", { exact: true })).toBeVisible();

    const controls = await page.locator(".site-header button:visible, .site-header a:visible, .site-footer a:visible").evaluateAll((elements) =>
      elements.filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }).map((element) => element.getBoundingClientRect().height),
    );
    expect(Math.min(...controls)).toBeGreaterThanOrEqual(43);

    if (browserName === "chromium") {
      const contactLink = mobileNav.getByRole("link", { name: "Contact" });
      await contactLink.focus();
      await page.keyboard.press("Tab");
      expect(await page.locator("#mobile-navigation").evaluate((dialog) => dialog.contains(document.activeElement))).toBeTruthy();
      await page.keyboard.press("Shift+Tab");
      expect(await page.locator("#mobile-navigation").evaluate((dialog) => dialog.contains(document.activeElement))).toBeTruthy();
    }

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();

    const narrowMap = page.locator(".ascii-system-map__narrow").first();
    await narrowMap.scrollIntoViewIfNeeded();
    const mapBounds = await narrowMap.evaluate((element) => {
      const map = element.getBoundingClientRect();
      const container = element.parentElement?.getBoundingClientRect();
      return { left: map.left, right: map.right, containerLeft: container?.left ?? 0, containerRight: container?.right ?? 0 };
    });
    expect(mapBounds.left).toBeGreaterThanOrEqual(mapBounds.containerLeft - 1);
    expect(mapBounds.right).toBeLessThanOrEqual(mapBounds.containerRight + 1);
  });
}

test("tablet uses the complete text navigation and stacked projects", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(nav.getByText("Work", { exact: true })).toBeVisible();
  await expect(page.locator(".selected-work-section")).not.toHaveClass(/is-pinned/);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("responsive hero visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".hero-section")).toHaveScreenshot(
      `homepage-hero-${viewport.width}.png`,
      { animations: "disabled" },
    );
  }
});

test("a coarse-pointer 1024px tablet keeps native, vertical scrolling", async ({ browser, browserName }) => {
  test.skip(browserName !== "chromium", "Pointer emulation is verified in Chromium.");
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".selected-work-section")).not.toHaveClass(/is-pinned/);
  expect(await page.evaluate(() => document.documentElement.classList.contains("lenis"))).toBeFalsy();
  await context.close();
});

test("skip navigation and current-page state work with a keyboard", async ({ page, browserName }) => {
  await page.goto("/blogs", { waitUntil: "networkidle" });
  const skipLink = page.getByText("Skip to content", { exact: true });
  const nextFocusableKey = browserName === "webkit" ? "Alt+Tab" : "Tab";
  for (let attempt = 0; attempt < 4; attempt += 1) {
    if (await skipLink.evaluate((element) => element === document.activeElement)) break;
    await page.keyboard.press(nextFocusableKey);
  }
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Writing" }),
  ).toHaveAttribute("aria-current", "page");
});

test("desktop selected work becomes a scroll-driven horizontal sequence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const section = page.locator(".selected-work-section");
  await expect(section).toHaveClass(/is-pinned/);
  const track = page.locator(".selected-work-track");
  const before = await track.evaluate((element) => getComputedStyle(element).transform);
  await section.evaluate((element) => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY + element.clientHeight * 0.7));
  await page.waitForTimeout(350);
  const after = await track.evaluate((element) => getComputedStyle(element).transform);
  expect(after).not.toBe(before);

  await section.evaluate((element) => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY));
  await page.waitForTimeout(350);
  const reversed = await track.evaluate((element) => getComputedStyle(element).transform);
  expect(reversed).not.toBe(after);

  const scrollBeforeFocus = await page.evaluate(() => window.scrollY);
  await section.locator(".selected-project-card").nth(2).getByRole("link", { name: /View case study/ }).focus();
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollBeforeFocus);

  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(section).not.toHaveClass(/is-pinned/);
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(section).toHaveClass(/is-pinned/);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(section).toHaveClass(/is-pinned/);
});

test("reduced motion uses static work and ASCII fallbacks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".selected-work-section")).not.toHaveClass(/is-pinned/);
  expect(await page.evaluate(() => document.documentElement.classList.contains("lenis"))).toBeFalsy();
  const ascii = page.locator(".ascii-system-map pre").first();
  const before = await ascii.textContent();
  await page.waitForTimeout(300);
  await expect(ascii).toHaveText(before ?? "");

  await page.locator("#contact").evaluate((element) => element.scrollIntoView());
  await expect(page.locator("html")).toHaveAttribute("data-active-palette", "cobalt");
});

test("the header palette follows the section at the viewport midpoint", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator(".selected-work-section").evaluate((element) => element.scrollIntoView());
  await expect(page.locator("html")).toHaveAttribute("data-active-palette", "ink");
  await page.locator("#contact").evaluate((element) => element.scrollIntoView());
  await expect(page.locator("html")).toHaveAttribute("data-active-palette", "cobalt");
});

test("experience pages select their nested section palettes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/experience/autodesk", { waitUntil: "networkidle" });
  await page.locator(".case-study-body").evaluate((element) => element.scrollIntoView());
  await expect(page.locator("html")).toHaveAttribute("data-active-palette", "mist");
  await page.locator(".case-study-projects").evaluate((element) => element.scrollIntoView());
  await expect(page.locator("html")).toHaveAttribute("data-active-palette", "paper");
});

test("cross-route anchors clear the fixed header", async ({ page }) => {
  await page.goto("/blogs", { waitUntil: "networkidle" });
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" }).click();
  await page.waitForURL(/\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  const positions = await page.evaluate(() => ({
    headerBottom: document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0,
    targetTop: document.querySelector("#work")?.getBoundingClientRect().top ?? 0,
  }));
  expect(positions.targetTop).toBeGreaterThanOrEqual(positions.headerBottom - 2);
  expect(positions.targetTop).toBeLessThan(positions.headerBottom + 120);
});

test("the canonical résumé PDF is local and downloadable", async ({ request, page }) => {
  const response = await request.get("/files/ayush-rameja-resume.pdf");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/pdf");

  await page.goto("/resume");
  await expect(page.locator('object[type="application/pdf"]')).toHaveAttribute("data", /ayush-rameja-resume\.pdf/);
  await expect(page.getByRole("link", { name: "Download PDF" })).toHaveAttribute("href", "/files/ayush-rameja-resume.pdf");
  await expect(page.getByRole("link", { name: "Open it in a new tab." })).toHaveAttribute("href", "/files/ayush-rameja-resume.pdf");
});

test("the résumé has a normal iPhone fallback link", async ({ browser, browserName }) => {
  test.skip(browserName !== "webkit", "iPhone behavior is verified with WebKit.");
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto("/resume", { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: "Open it in a new tab." })).toBeVisible();
  await context.close();
});
