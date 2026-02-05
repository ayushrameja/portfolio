import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>Arjuna’s opening crisis in the Gita is the most relatable thing in the book: he has information, competence, and reasons… and still can’t move. That’s not weakness. That’s what happens when the mind is overloaded with consequences, identity, and fear.</p>

      <p>Modern versions show up as: “Should I quit?”, “Should I move?”, “Should I end this relationship?”, “Should I take this job?” The paralysis isn’t just about options—it’s about what each option says about who you are.</p>

      <h2>Why hard decisions feel impossible</h2>

      <ul>
        <li>You’re trying to predict every consequence (impossible).</li>
        <li>You’re trying to avoid regret (also impossible).</li>
        <li>You’re treating the decision as identity (“If I choose this, I am this”).</li>
      </ul>

      <h2>A four-part framework (use it like a checklist)</h2>

      <h3>1) Values: what do you refuse to betray?</h3>

      <p>Pick two values. Not twelve. Examples: honesty, stability, growth, family, health, integrity. If you choose too many, you’ve chosen none.</p>

      <h3>2) Roles: what responsibilities are real?</h3>

      <p>Dharma isn’t about guilt. It’s about acknowledging responsibilities you’ve accepted: dependents, promises, commitments, the impact your choice will have on others.</p>

      <h3>3) Constraints: what is true whether you like it or not?</h3>

      <p>Money, health, visas, time, family realities, mental bandwidth. Constraints are not insults—they’re parameters. Fighting them wastes energy.</p>

      <h3>4) Next action: what is the smallest testable step?</h3>

      <p>Most decisions don’t need certainty. They need experiments: talk to someone, try a role for a week, prototype the routine, run a budget, do a trial separation, whatever applies. Make the decision smaller.</p>

      <h2>A quick template</h2>

      <ul>
        <li><strong>Decision:</strong> what am I choosing?</li>
        <li><strong>Values (2):</strong> ____ and ____</li>
        <li><strong>Roles:</strong> who is affected and what do I owe them?</li>
        <li><strong>Constraints:</strong> what cannot be ignored?</li>
        <li><strong>Experiment:</strong> what can I test in 7–14 days?</li>
        <li><strong>Review date:</strong> when will I reassess?</li>
      </ul>

      <h2>The trade-off</h2>

      <p>This framework won’t remove pain. Some choices are painful because they’re real. What it does remove is the extra suffering from pretending there’s a perfect option. There isn’t—there’s just the most aligned next step.</p>
    </>
  );
}

export const post: BlogPost = {
  slug: "gita-arjuna-anxiety-decision-making",
  title: "Arjuna’s Anxiety: Decision-Making When Every Option Feels Wrong",
  description: "A grounded framework for tough choices: values, roles, consequences, and the smallest next action.",
  publishedAt: "2026-02-02",
  tags: ["Bhagavad Gita","Dharma","Anxiety","Decision Making"],
  readingTime: "12 min",
  coverImage: {
    src: "/assets/blog/gita-arjuna.svg",
    alt: "Abstract cover art with a split horizon and converging paths, symbolizing difficult choices.",
  },
  Content,
};
