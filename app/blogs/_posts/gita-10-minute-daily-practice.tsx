import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>If you want the Gita to be more than an aesthetic bookshelf accessory, you need a daily hook. Not an hour-long ritual you’ll abandon after three days. Ten minutes. Repeatable. Slightly boring. Effective.</p>

      <h2>The goal</h2>

      <p>The goal isn’t to feel calm every day. The goal is to build the habit of returning: to attention, to values, to clean action. That’s the steady mind in practice.</p>

      <h2>The 10-minute routine</h2>

      <h3>Minute 0–2: attention (breath)</h3>

      <p>Sit. Count breaths 1 to 10. When you drift (you will), restart at 1 without commentary. The skill is returning, not being perfect.</p>

      <h3>Minute 2–5: intention (dharma sentence)</h3>

      <p>Write one sentence: “Today, my duty is to ____.” Make it concrete: finish the draft, call the doctor, have the hard conversation, do the workout, pay the bill.</p>

      <h3>Minute 5–10: action (first step now)</h3>

      <p>Do the first tiny step immediately. Open the doc. Write the first paragraph. Put on shoes. Send the message. The routine ends with action so your brain learns: we don’t just think—we move.</p>

      <h2>How to keep it alive (common failure modes)</h2>

      <ul>
        <li><strong>You aim too high:</strong> keep the routine tiny. Add time only after 2–3 weeks of consistency.</li>
        <li><strong>You miss a day:</strong> restart immediately. Missing is normal. Quitting is optional.</li>
        <li><strong>You want “results” fast:</strong> measure returns, not feelings. Did you return to practice today?</li>
        <li><strong>You moralize it:</strong> it’s not a purity contest. It’s training attention + action.</li>
      </ul>

      <h2>A weekly check-in (5 minutes on Sunday)</h2>

      <ul>
        <li>What actions felt most aligned?</li>
        <li>What triggers pulled me into reactivity?</li>
        <li>What’s one boundary or habit tweak for next week?</li>
      </ul>

      <p>Trade-off: small practices don’t feel heroic. That’s exactly why they work. Heroic routines feed the ego and die young. Tiny routines survive long enough to change your life.</p>
    </>
  );
}

export const post: BlogPost = {
  slug: "gita-10-minute-daily-practice",
  title: "A 10-Minute Daily Gita Practice (That You’ll Actually Do)",
  description: "A tiny routine: attention, intention, action. Built for consistency, not spiritual cosplay.",
  publishedAt: "2026-02-01",
  tags: ["Bhagavad Gita","Practice","Meditation","Habits"],
  readingTime: "8 min",
  coverImage: {
    src: "/assets/blog/gita-practice.svg",
    alt: "Abstract cover art with a circular clock-like motif and soft gradients, symbolizing daily practice.",
  },
  Content,
};
