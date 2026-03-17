import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        Code review has two possible outcomes: the PR gets better, or everyone roleplays as a linter with opinions. The
        difference is whether your comments reduce risk, clarify behavior, or improve maintainability. If they do not,
        you are mostly decorating the thread.
      </p>

      <h2>Start with correctness and risk</h2>

      <p>
        The first pass is not about style. It is about behavior. Ask the boring, expensive questions first.
      </p>

      <ul>
        <li>Can this break a user flow?</li>
        <li>Can this silently fail?</li>
        <li>Does this change have the right loading, error, and empty states?</li>
        <li>Will this be painful to debug at 2 AM when logs are vague and hope is gone?</li>
      </ul>

      <p>
        If you start with naming nits while ignoring a broken edge case, you are not reviewing. You are accessorizing.
      </p>

      <h2>Separate blocking comments from optional ones</h2>

      <p>
        Not every comment deserves the same weight. A good review makes that obvious.
      </p>

      <ul>
        <li>
          <strong>Blocking:</strong> bugs, regressions, missing tests for risky behavior, security issues, broken
          accessibility, unclear data contracts.
        </li>
        <li>
          <strong>Optional:</strong> naming ideas, small refactors, readability tweaks, &quot;could be cleaner&quot; feedback.
        </li>
      </ul>

      <p>
        This saves time and avoids the classic team ritual where people spend thirty minutes debating a helper name while
        a race condition sits in the corner sharpening a knife.
      </p>

      <h2>Comment on the code, not the author</h2>

      <p>
        &quot;This branch is hard to follow&quot; is useful. &quot;You made this confusing&quot; is lazy and personal. The
        PR is a shared artifact, not a referendum on somebody&apos;s intelligence.
      </p>

      <p>
        The best review comments are specific and easy to act on: point to the branch, the assumption, or the missing
        guarantee. Vague disappointment is not feedback. It is mood lighting.
      </p>

      <h2>Ask for evidence, not vibes</h2>

      <p>
        &quot;I think this might fail sometimes&quot; is weaker than &quot;what happens if the API returns partial
        data?&quot; Good review comments attach to a scenario. Better ones also suggest how to prove it.
      </p>

      <ul>
        <li>Request a test for the branch that worries you.</li>
        <li>Ask for a screenshot or recording for UI changes.</li>
        <li>Ask what the rollback path is if the behavior changes in production.</li>
        <li>Ask whether analytics, logging, or monitoring will show failure clearly.</li>
      </ul>

      <h2>Prefer fewer, sharper comments</h2>

      <p>
        Ten high-signal comments beat forty drive-by observations. If everything is urgent, nothing is. Reviewers who
        dump every thought into the thread usually create noise, fatigue, and the illusion of rigor.
      </p>

      <p>
        If you see a repeated problem, summarize it once. &quot;This component mixes fetch, transform, and presentation.
        Splitting those responsibilities would make the next change safer.&quot; One clear note beats six scattered sighs.
      </p>

      <h2>A simple review rubric</h2>

      <ol>
        <li>Is the behavior correct?</li>
        <li>Is the risk understood?</li>
        <li>Is the change testable and tested enough for its blast radius?</li>
        <li>Will the next engineer understand this without reading your mind?</li>
        <li>Are we shipping accidental complexity because nobody wanted the harder conversation?</li>
      </ol>

      <h2>The reviewer still owns clarity</h2>

      <p>
        If a comment requires a follow-up call, write the first draft anyway. &quot;Can we simplify this?&quot; is weak.
        &quot;Can we move the data transform to the server so the client component only renders state?&quot; is review.
        Precision matters.
      </p>

      <p>
        Trade-off: strong reviews take time and judgment. They are slower than emoji approvals and faster than production
        incidents. Like most good engineering habits, they feel inconvenient right up until they save you.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "code-review-comments-that-actually-help",
  title: "Code Review Comments That Actually Improve the PR",
  description: "A practical rubric for reviewing code without drowning teams in noise, nitpicks, and fake rigor.",
  publishedAt: "2026-03-06",
  tags: ["Code Review", "Engineering", "Teams"],
  readingTime: "7 min",
  Content,
};
