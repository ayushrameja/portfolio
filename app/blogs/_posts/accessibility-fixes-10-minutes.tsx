import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        Accessibility isn&apos;t a side quest. It&apos;s just… the main quest, except nobody gives you XP until you break
        something. Here are fixes that are genuinely &quot;10 minutes&quot; and actually help real people.
      </p>

      <h2>1) Visible focus (keyboard users exist)</h2>
      <p>
        If you remove focus rings, you&apos;re basically telling keyboard users &quot;good luck, champ.&quot; Ensure interactive
        elements have a clear <code>:focus-visible</code> state.
      </p>

      <h2>2) Use semantic HTML (free a11y, no subscription)</h2>
      <ul>
        <li>
          Use <code>&lt;button&gt;</code> for buttons, not <code>&lt;div onClick&gt;</code>.
        </li>
        <li>
          Use <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>.
        </li>
        <li>
          Headings in order (H1 → H2 → H3), not “whatever looks big.”
        </li>
      </ul>

      <h2>3) Label your inputs (screens readers aren&apos;t telepathic)</h2>
      <p>
        Every input needs a label: <code>&lt;label htmlFor&gt;</code> or <code>aria-label</code> if you truly can&apos;t show
        text. Placeholder text is not a label; it&apos;s a suggestion that disappears.
      </p>

      <h2>4) Color contrast (pretty is optional, readable isn&apos;t)</h2>
      <p>
        Check contrast for text and UI controls. Tailwind makes it easy to accidentally ship “zinc-400 on zinc-200” and
        call it minimalist.
      </p>

      <h2>5) Link text that makes sense out of context</h2>
      <p>
        “Click here” is useless when a screen reader lists links. Use descriptive text like “Read the SEO checklist” or
        “View resume.”
      </p>

      <h2>6) Reduced motion (not everyone wants the cinema experience)</h2>
      <p>
        If your UI has animations, respect <code>prefers-reduced-motion</code>. You can still be stylish without making
        users nauseous.
      </p>

      <h2>7) Images need alt text (and &quot;image&quot; isn&apos;t helpful)</h2>
      <ul>
        <li>Decorative images: empty alt (alt=&quot;&quot;).</li>
        <li>Meaningful images: describe what matters in context.</li>
      </ul>

      <h2>8) Don&apos;t trap focus in modals/menus</h2>
      <p>
        If you open a dialog, focus should move into it, and keyboard users should be able to escape. Focus traps are a
        real thing. They are also how your website becomes a haunted house.
      </p>

      <h2>Quick sanity checks</h2>
      <ul>
        <li>Tab through the entire page.</li>
        <li>Turn on VoiceOver/Narrator for 2 minutes.</li>
        <li>Run Lighthouse a11y and fix the easy stuff.</li>
      </ul>

      <p>
        The trade-off: a11y work is iterative. You&apos;ll &quot;fix it&quot; and then discover three more things. Congratulations—
        you&apos;ve unlocked the infinite backlog, but at least your site is usable.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "accessibility-fixes-10-minutes",
  title: "Accessibility Fixes I Made That Took 10 Minutes and Helped Real People",
  description: "High-impact accessibility tweaks you can ship fast: focus states, labels, semantics, contrast, and motion.",
  publishedAt: "2026-02-03",
  tags: ["Accessibility", "Frontend", "UX"],
  readingTime: "5 min",
  Content,
};
