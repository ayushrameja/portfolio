import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        Most engineering decision docs fail for a very simple reason: by the time someone writes one, the decision is
        already emotionally married, politically protected, and about three Slack threads past reversible. At that
        point, the doc is not a decision tool. It is burial paperwork.
      </p>

      <p>
        A useful decision doc is shorter, sharper, and less performative than teams expect. Its job is not to sound
        strategic. Its job is to reduce ambiguity, expose trade-offs, and make it harder for the same argument to keep
        respawning in meetings like some cursed backend service.
      </p>

      <h2>Write the doc before the decision calcifies</h2>

      <p>
        If the recommendation is already locked and everyone knows it, be honest about that. Call it a record. Do not
        pretend it is still an exploration. A real decision doc is written early enough that alternatives can still win.
      </p>

      <p>
        That timing matters because the value is not the document itself. The value is giving smart people one place to
        challenge assumptions before the cost of changing direction gets expensive.
      </p>

      <h2>Keep the scope brutally narrow</h2>

      <p>
        A good doc answers one decision cleanly. It does not wander off to solve architecture, staffing, roadmap
        politics, and your childhood fear of under-documenting things.
      </p>

      <ul>
        <li>What exactly are we deciding?</li>
        <li>What problem triggered this decision?</li>
        <li>What options are still realistically on the table?</li>
        <li>What will change if we pick this path?</li>
      </ul>

      <p>
        If the doc tries to cover five decisions at once, nobody will know what feedback to give. They will either
        comment on everything or nothing, both of which are classic team hobbies.
      </p>

      <h2>The sections that actually matter</h2>

      <p>
        Most teams do not need a heavyweight template. They need a short structure that forces clarity.
      </p>

      <ul>
        <li>
          <strong>Context:</strong> What is happening now, and why does this decision exist?
        </li>
        <li>
          <strong>Options:</strong> What are the plausible approaches, not the fake ones added for decoration?
        </li>
        <li>
          <strong>Recommendation:</strong> Which path do you recommend, in one sentence?
        </li>
        <li>
          <strong>Trade-offs:</strong> What do we gain, and what pain are we consciously accepting?
        </li>
        <li>
          <strong>Risks:</strong> What could fail, regress, or become more expensive later?
        </li>
        <li>
          <strong>Follow-up:</strong> What needs validating after the decision is made?
        </li>
      </ul>

      <p>
        That is enough for most frontend, platform, and product-facing engineering decisions. The rest is usually
        ornamentation wearing a confluence page.
      </p>

      <h2>Options should be real competitors</h2>

      <p>
        Weak decision docs play a cheap trick: one serious option, one obviously bad option, and one imaginary option
        nobody would approve outside a fever dream. That is not analysis. That is set design.
      </p>

      <p>
        If you want useful feedback, list the real alternatives people are genuinely considering. Then explain why the
        recommendation wins for this context, not for all time. Good decisions are local. Dogma is what happens when a
        pattern survives longer than its assumptions.
      </p>

      <h2>Write trade-offs like an adult</h2>

      <p>
        Saying a choice is &quot;scalable&quot; or &quot;simple&quot; means very little without the bill attached. Every decent
        option costs something.
      </p>

      <ul>
        <li>Maybe the fast path increases operational complexity.</li>
        <li>Maybe the cleaner design delays the deadline.</li>
        <li>Maybe the lower-risk option creates more migration work next quarter.</li>
      </ul>

      <p>
        Trade-offs are where trust gets built. People can work with a costly decision. They get nervous around decisions
        that pretend to be free.
      </p>

      <h2>A template you can actually use</h2>

      <ol>
        <li>
          <strong>Decision:</strong> One sentence on what is being decided.
        </li>
        <li>
          <strong>Why now:</strong> The trigger, risk, or business pressure behind it.
        </li>
        <li>
          <strong>Options considered:</strong> Two to four realistic paths.
        </li>
        <li>
          <strong>Recommended path:</strong> The preferred option and why it fits now.
        </li>
        <li>
          <strong>Trade-offs and risks:</strong> What gets worse or stays hard.
        </li>
        <li>
          <strong>Validation plan:</strong> What to measure or revisit after shipping.
        </li>
      </ol>

      <p>
        If a decision cannot be explained in that shape, the problem is usually not the template. The problem is that
        the thinking is still mushy and the team is hoping formatting will save it.
      </p>

      <h2>Decision docs are for alignment, not self-defense</h2>

      <p>
        The worst docs read like the author is trying to win a future argument. You can feel the defensive energy in
        every line. Good docs are calmer than that. They help the team see the choice clearly, make the call, and move.
      </p>

      <p>
        Trade-off: strong decision docs take a bit more effort up front, and they surface disagreement earlier, which
        some teams interpret as inconvenience. Tragic. The upside is fewer circular debates, better records, and less
        expensive confusion later when everyone forgets why the architecture now looks like an apology.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "engineering-decision-docs-that-teams-actually-use",
  title: "Engineering Decision Docs That Teams Will Actually Read",
  description:
    "A practical template for writing decision docs that clarify options, trade-offs, and risks before the team wastes another meeting.",
  publishedAt: "2026-03-20",
  tags: ["Engineering", "Communication", "Teams"],
  readingTime: "7 min",
  Content,
};
