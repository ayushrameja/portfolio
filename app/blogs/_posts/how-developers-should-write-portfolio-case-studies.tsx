import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        Most developer case studies read like they were assembled by a committee that feared specificity. &quot;Built a
        modern platform.&quot; &quot;Improved performance.&quot; &quot;Delivered a seamless experience.&quot; Wonderful.
        That tells me absolutely nothing, which is impressive in its own way.
      </p>

      <p>
        A good case study should make one thing easy for the reader: trusting your judgment. Not your adjective budget.
      </p>

      <h2>Start with context and constraints</h2>

      <p>
        Before the screenshots and victory laps, explain the shape of the problem.
      </p>

      <ul>
        <li>What kind of product was it?</li>
        <li>Who was it for?</li>
        <li>What was broken, slow, unclear, or risky?</li>
        <li>What constraints mattered: time, team size, legacy code, SEO, performance, business pressure?</li>
      </ul>

      <p>
        Constraints are the point. Anyone can look smart in a story where the requirements were perfect and time was
        infinite. That is fantasy, not engineering.
      </p>

      <h2>Be precise about your role</h2>

      <p>
        &quot;Built the project&quot; is suspicious unless you were alone. Say what you owned.
      </p>

      <ul>
        <li>Did you design the architecture?</li>
        <li>Did you implement the frontend and collaborate on backend contracts?</li>
        <li>Did you lead the delivery, or contribute one critical slice?</li>
      </ul>

      <p>
        Specific ownership makes your work more credible, not less. Mature readers are not looking for superheroes.
        They are looking for signal.
      </p>

      <h2>Show decisions, not just outputs</h2>

      <p>
        The strongest part of a case study is usually the decision trail.
      </p>

      <ul>
        <li>Why Next.js instead of a custom stack?</li>
        <li>Why server rendering for this route?</li>
        <li>Why defer a refactor?</li>
        <li>Why choose a narrower first release?</li>
      </ul>

      <p>
        This is where readers see taste, trade-off handling, and whether you can think beyond implementation. Screenshots
        are nice. Reasoning is what gets remembered.
      </p>

      <h2>Use evidence that a skeptical person would accept</h2>

      <p>
        &quot;Improved performance&quot; means very little on its own. Give the before and after, or at least the
        direction and method.
      </p>

      <ul>
        <li>Reduced bundle size by X.</li>
        <li>Cut LCP from roughly A to B on the key landing page.</li>
        <li>Reduced support tickets for a workflow after simplifying the UI.</li>
        <li>Improved publish time by removing a manual step.</li>
      </ul>

      <p>
        Even directional evidence is better than chest-thumping. Readers do not need perfection. They need something real
        enough to believe.
      </p>

      <h2>Include what went wrong</h2>

      <p>
        A polished case study with zero friction reads like marketing copy. Mention one mistake, one revision, or one
        trade-off that cost something.
      </p>

      <p>
        Examples:
      </p>

      <ul>
        <li>We over-scoped the first version and had to cut secondary flows.</li>
        <li>The initial animation hurt perceived performance, so we removed it.</li>
        <li>The data model looked clean in code and painful in the admin panel.</li>
      </ul>

      <p>
        Imperfection, handled well, signals maturity. Pretending every decision was brilliant signals LinkedIn poisoning.
      </p>

      <h2>A simple structure that works</h2>

      <ol>
        <li><strong>Context:</strong> product, audience, and business goal.</li>
        <li><strong>Constraints:</strong> what made the problem non-trivial.</li>
        <li><strong>Role:</strong> what you personally owned.</li>
        <li><strong>Decisions:</strong> the important technical and product calls.</li>
        <li><strong>Outcome:</strong> what changed, with evidence.</li>
        <li><strong>Trade-off:</strong> what you would improve next.</li>
      </ol>

      <p>
        Trade-off: better case studies take longer to write because they require memory, honesty, and actual reflection.
        Tragic, I know. The upside is that one sharp case study can do more for your portfolio than ten vague project
        cards with gradients.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "how-developers-should-write-portfolio-case-studies",
  title: "How Developers Should Write Portfolio Case Studies",
  description: "A sharper way to write case studies that show judgment, constraints, trade-offs, and outcomes people can trust.",
  publishedAt: "2026-03-16",
  tags: ["Portfolio", "Writing", "Career"],
  readingTime: "7 min",
  Content,
};
