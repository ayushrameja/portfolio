import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>Karma Yoga is one of the most misread ideas in the Bhagavad Gita. People hear “don’t be attached to results” and translate it into “care less.” That’s not the move. The move is: care about the quality of your action, and stop letting outcomes (and other people’s reactions) run your nervous system like a bad manager.</p>

      <p>If you work in tech (or any modern workplace), you already live in a storm of outcomes: metrics, reviews, launches, layoffs, praise, blame, timelines that were invented in a meeting and then treated as law. Karma Yoga is a way to stay effective inside that storm without turning into a burnout with a calendar.</p>

      <h2>The core idea (in plain English)</h2>

      <p>You control your effort, intent, and craft. You do not control: market conditions, other people’s judgment, timing surprises, “alignment,” and whatever the algorithm decides today. Karma Yoga says: commit to the part you own, release the part you don’t. Not because it’s spiritual. Because it’s accurate.</p>

      <h2>What “non-attachment” is (and isn’t)</h2>

      <ul>
        <li><strong>It is</strong>: doing the right work for the right reasons, even when the reward is uncertain.</li>
        <li><strong>It is</strong>: staying steady when the outcome swings—good or bad.</li>
        <li><strong>It is not</strong>: lowering standards, avoiding responsibility, or pretending outcomes don’t matter.</li>
        <li><strong>It is not</strong>: becoming emotionally flat. You can feel things and still act cleanly.</li>
      </ul>

      <h2>A workplace translation: “Own inputs, negotiate outputs.”</h2>

      <p>Inputs are what you can promise. Outputs are what you can aim for. The healthiest professionals I’ve met are ruthless about this distinction. They commit to the craft and the process, and they negotiate scope and expectations instead of silently absorbing chaos.</p>

      <h3>Example: project deadlines</h3>

      <p>Bad attachment sounds like: “If we miss this deadline, I’m a failure.” Clean action sounds like: “Here is what we can ship with high confidence by Friday. If you want more, we trade time or cut scope.” One is identity. One is engineering.</p>

      <h3>Example: performance reviews</h3>

      <p>You can’t control the entire review system. You can control your evidence: shipped work, impact notes, decisions you made, mentoring, reliability. Karma Yoga in this context is building your “inputs dossier” and letting the review outcome be data—not a verdict on your worth.</p>

      <h2>How to practice Karma Yoga (weekly, not mystical)</h2>

      <ul>
        <li><strong>Define success as inputs.</strong> Before starting a task, write 3 input goals (e.g., “ship PR”, “add tests”, “write doc”).</li>
        <li><strong>Separate identity from outcome.</strong> Say it out loud: “A missed metric is a signal, not a sentence.”</li>
        <li><strong>Make trade-offs explicit.</strong> When asked for more, answer with scope/time/quality trade-offs. No silent heroism.</li>
        <li><strong>Close the loop.</strong> After shipping, review what worked and what didn’t—calmly—so your process improves.</li>
        <li><strong>Offer the work, keep the boundary.</strong> “I can do X. I cannot do X+Y without dropping Z.”</li>
      </ul>

      <h2>The common failure mode: using Karma Yoga as a coping mechanism</h2>

      <p>Some people weaponize “detachment” to avoid hard conversations: they tolerate bad scope, low trust, unclear goals, and call it “spiritual.” That’s not Karma Yoga. That’s conflict avoidance wearing a robe. Clean action includes boundaries and clarity.</p>

      <h2>A simple template you can steal</h2>

      <ul>
        <li><strong>Intent:</strong> Why am I doing this? (useful, honest, aligned)</li>
        <li><strong>Inputs:</strong> What can I control this week?</li>
        <li><strong>Constraints:</strong> What can I not control?</li>
        <li><strong>Trade-offs:</strong> What changes if scope increases?</li>
        <li><strong>Next action:</strong> What is the smallest step I can do today?</li>
      </ul>

      <p>Trade-off: if you practice this seriously, you’ll become harder to manipulate with guilt, urgency, or praise. Some environments don’t love that. The upside is you keep your dignity and your energy—two assets that don’t show up on a dashboard but determine your whole life.</p>
    </>
  );
}

export const post: BlogPost = {
  slug: "gita-karma-yoga-modern-work",
  title: "Karma Yoga for Modern Work (Without Becoming a Doormat)",
  description: "A pragmatic take on “action without attachment”: own the work, not the outcomes—or other people’s chaos.",
  publishedAt: "2026-02-05",
  tags: ["Bhagavad Gita","Karma Yoga","Work","Mindset"],
  readingTime: "10 min",
  coverImage: {
    src: "/assets/blog/gita-karma-yoga.svg",
    alt: "Abstract cover art with a luminous gradient and wheel-like geometry symbolizing action and discipline.",
  },
  Content,
};
