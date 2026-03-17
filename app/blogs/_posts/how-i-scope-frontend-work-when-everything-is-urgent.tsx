import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        Every frontend task becomes &quot;urgent&quot; the moment it lands in a sprint board. Then someone adds three
        edge cases, analytics, responsive tweaks, animation polish, and a dashboard request that was definitely not part
        of the original ask. Suddenly the ticket has become folklore.
      </p>

      <p>
        Scoping is how you stop that slide. Not by being difficult. By being precise about what must ship, what can wait,
        and what quality bar is non-negotiable.
      </p>

      <h2>1) Start with the user outcome, not the component list</h2>

      <p>
        &quot;Build a new settings modal&quot; is not the goal. &quot;Let users change notification preferences without
        contacting support&quot; is the goal. Once the outcome is clear, a lot of decorative requirements suddenly look
        optional.
      </p>

      <p>
        I try to write one sentence for the core user win before touching implementation:
      </p>

      <ul>
        <li>What can the user do after this ships that they cannot do now?</li>
        <li>What is the smallest version of that win?</li>
      </ul>

      <h2>2) Slice vertically</h2>

      <p>
        If you scope by layers, you get a lot of &quot;frontend done, backend pending, analytics later, QA nervous.&quot;
        Slice by a complete user path instead. One thin, real flow is better than five half-built abstractions.
      </p>

      <p>
        A vertical slice usually includes UI, validation, loading, error handling, and enough instrumentation to know it
        works. Glamorous? No. Useful? Annoyingly yes.
      </p>

      <h2>3) Make the trade-offs explicit</h2>

      <p>
        Most scoping fights are really trade-off fights wearing fake certainty. Put the actual options on the table.
      </p>

      <ul>
        <li>
          <strong>Fastest:</strong> ship the narrow path, skip advanced polish, follow existing patterns.
        </li>
        <li>
          <strong>Safer:</strong> keep the UI smaller, add test coverage, avoid broad refactors.
        </li>
        <li>
          <strong>More flexible later:</strong> extract primitives now, accept longer delivery.
        </li>
      </ul>

      <p>
        Once stakeholders see the triangle, the conversation improves. Magic becomes harder to demand when the invoice is
        visible.
      </p>

      <h2>4) Protect the non-negotiables</h2>

      <p>
        Scope can shrink. Certain bars should not.
      </p>

      <ul>
        <li>Accessibility basics still apply.</li>
        <li>Error states still need to exist.</li>
        <li>Analytics or logging should still tell you if the feature is broken.</li>
        <li>Responsive behavior still matters if the product claims to support mobile.</li>
      </ul>

      <p>
        Teams get into trouble when they cut the invisible parts first. That is how you &quot;ship fast&quot; and spend
        the next week deciphering screenshots from customer support.
      </p>

      <h2>5) Define what is explicitly out</h2>

      <p>
        A scope doc without exclusions is just optimism in a nicer font. Write the out-of-scope list while the work is
        still small.
      </p>

      <ul>
        <li>Not handling team-level permissions in this pass.</li>
        <li>Not redesigning the existing table component.</li>
        <li>Not adding export or bulk actions yet.</li>
      </ul>

      <p>
        This is not bureaucracy. It is memory. Because two days later, someone will absolutely ask why export is not in
        the &quot;simple UI update.&quot;
      </p>

      <h2>A scoping template I reuse</h2>

      <ol>
        <li><strong>User win:</strong> the smallest meaningful outcome.</li>
        <li><strong>Included:</strong> the end-to-end path for that outcome.</li>
        <li><strong>Excluded:</strong> everything tempting but not essential.</li>
        <li><strong>Risks:</strong> where the work could expand or break.</li>
        <li><strong>Trade-off chosen:</strong> speed, safety, or flexibility.</li>
      </ol>

      <p>
        Trade-off: tighter scoping can make you look less &quot;accommodating&quot; in the moment. Fine. It also makes
        you far more reliable. Products remember shipped work. Nobody remembers that you nodded politely while the ticket
        mutated into a swamp.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "how-i-scope-frontend-work-when-everything-is-urgent",
  title: "How I Scope Frontend Work When Everything Is Somehow Urgent",
  description: "A practical way to cut scope, protect quality, and ship real user value without turning delivery into myth.",
  publishedAt: "2026-03-11",
  tags: ["Frontend", "Product", "Delivery"],
  readingTime: "8 min",
  Content,
};
