import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        Agent-written pull requests are everywhere because they compress the most flattering part of engineering:
        producing a lot of code quickly. What they do not compress is accountability. Someone still has to decide
        whether the diff is correct, safe, maintainable, and worth shipping. Grim news for management decks, but that
        someone is still us.
      </p>

      <p>
        If your review process treats agent output like ordinary handwritten code, you will miss a predictable class of
        problems: broad diffs, confident nonsense, shallow tests, and architecture that looks clean right up until it
        meets production traffic and other humans.
      </p>

      <h2>Review the task framing before the code</h2>

      <p>
        Agent output quality is tightly coupled to the prompt and constraints. Before you review implementation details,
        check what the agent was actually asked to do.
      </p>

      <ul>
        <li>Was the task narrow enough to review in one sitting?</li>
        <li>Did it define acceptance criteria and non-goals?</li>
        <li>Did it tell the agent what not to touch?</li>
      </ul>

      <p>
        Bad prompt, bad diff. The code may still compile, but so do a lot of regrettable decisions.
      </p>

      <h2>Diff size is now a policy problem</h2>

      <p>
        Agents do not feel review fatigue, so they happily generate sprawling changes. Humans do feel it. That means
        teams need an explicit rule: if the change cannot be reviewed clearly, it should be split before anyone argues
        about style.
      </p>

      <ul>
        <li>Separate refactors from behavior changes.</li>
        <li>Separate generated cleanup from business logic.</li>
        <li>Separate tests from speculative “while I was here” edits.</li>
      </ul>

      <p>
        Smaller diffs are not aesthetic. They are how you stop automation from turning review into archaeology.
      </p>

      <h2>Interrogate boundaries first</h2>

      <p>
        Agent-written code often looks locally reasonable while being globally reckless. Review the boundaries before
        the implementation details.
      </p>

      <ul>
        <li>What happens on loading, error, empty, and retry states?</li>
        <li>Did it change validation, serialization, or API assumptions?</li>
        <li>Are logging, analytics, and monitoring still useful when things fail?</li>
        <li>Did it quietly increase coupling between modules that used to be separate?</li>
      </ul>

      <p>
        The sharpest bugs now hide in the seams because the center of the code looks suspiciously polished.
      </p>

      <h2>Ask for evidence, not confidence</h2>

      <p>
        Agents are excellent at sounding done. That is not the same thing as being done. Reviews should demand proof.
      </p>

      <ul>
        <li>Which tests were added for the risky paths?</li>
        <li>What manual scenarios were exercised?</li>
        <li>Is there a screenshot or recording for UI changes?</li>
        <li>What is the rollback path if the behavior is wrong in production?</li>
      </ul>

      <p>
        “It should work” is not evidence. It is a bedtime story for tired teams.
      </p>

      <h2>Require a readable change summary</h2>

      <p>
        A strong agent workflow includes a short explanation of what changed, why it changed, and what still feels
        risky. If the PR description is vague, the reviewer ends up reconstructing intent from code, which is the
        software version of excavating a ruin with a toothbrush.
      </p>

      <ol>
        <li>Require a clear summary.</li>
        <li>Require a list of touched systems or files.</li>
        <li>Require known risks, assumptions, and follow-up work.</li>
      </ol>

      <p>
        The point is not bureaucracy. The point is reducing interpretive fiction during review.
      </p>

      <h2>Keep the human accountable</h2>

      <p>
        The cleanest team rule is also the least glamorous: whoever delegates the task owns the result. Not the model,
        not the tooling vendor, not the mystical cloud of innovation hovering over the sprint board.
      </p>

      <p>
        Trade-off: agent-written PRs can absolutely speed up routine implementation and documentation work, but they
        also make it easier to generate polished mistakes at scale. The upside is leverage. The downside is that your
        review standards have to get stricter, not softer, or the speed turns into cleanup debt with excellent branding.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "how-to-review-agent-written-prs",
  title: "How to Review Agent-Written PRs Without Lowering the Bar",
  description:
    "A practical review workflow for AI-assisted pull requests: smaller diffs, sharper checks, better evidence, and human accountability.",
  publishedAt: "2026-04-06",
  tags: ["AI Agents", "Code Review", "Engineering"],
  readingTime: "7 min",
  Content,
};
