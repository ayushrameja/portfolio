import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>“Be detached” is some of the worst advice on the internet, mostly because people confuse detachment with not caring. The Gita’s version is different: it’s steadiness. You can care deeply and still not be owned by the outcome.</p>

      <p>In modern life, the outcome lottery is constant: likes, approvals, rejections, performance reviews, relationship outcomes, health news. If your nervous system is tied to those swings, you’ll live like a stock ticker.</p>

      <h2>What detachment really means</h2>

      <p>Detachment is the ability to act from values instead of from craving or fear. You do the best action you can see, then you let reality be reality. That’s not passivity. That’s maturity.</p>

      <h2>Apathy vs equanimity</h2>

      <ul>
        <li><strong>Apathy:</strong> shutting down to avoid pain. “Whatever. I don’t care.”</li>
        <li><strong>Equanimity:</strong> staying steady while feeling pain. “This hurts. I’ll still act wisely.”</li>
      </ul>

      <h2>The “spiral” usually starts here</h2>

      <p>Spiraling is often a control attempt: your mind tries to rehearse every future so you never feel surprised. But rehearsal doesn’t prevent reality. It just burns your energy early.</p>

      <h2>A practical method: Feel → Name → Choose</h2>

      <ul>
        <li><strong>Feel:</strong> stop arguing with the emotion. It’s already here.</li>
        <li><strong>Name:</strong> label it (“fear”, “anger”, “shame”, “grief”). Labels create distance.</li>
        <li><strong>Choose:</strong> one value-aligned action (small is fine) instead of rumination.</li>
      </ul>

      <h3>Example: rejection</h3>

      <p>Apathy says: “I didn’t want it anyway.” Equanimity says: “I wanted it. I’m disappointed. I’ll learn, adjust, and try again.” One protects ego. The other builds resilience.</p>

      <h3>Example: praise</h3>

      <p>Detachment isn’t only for bad outcomes. Praise can also hook you into performance. Equanimity is enjoying the win without making it your identity.</p>

      <h2>Three exercises that help fast</h2>

      <ul>
        <li><strong>Two-column list:</strong> control / no control. Put energy only in the first column.</li>
        <li><strong>One clean action:</strong> pick the smallest next step. Do it now.</li>
        <li><strong>Return ritual:</strong> 3 breaths + posture reset + repeat your value sentence.</li>
      </ul>

      <h2>The trade-off</h2>

      <p>Equanimity can make you less dramatic. Some people will miss your drama because it made them feel important. The upside is you stop paying interest on emotions for outcomes you can’t control.</p>
    </>
  );
}

export const post: BlogPost = {
  slug: "gita-detachment-vs-apathy",
  title: "Detachment Isn’t Apathy: How to Care Without Spiraling",
  description: "A modern reading of “equanimity”: feel fully, act cleanly, stop letting outcomes decide your self-worth.",
  publishedAt: "2026-02-03",
  tags: ["Bhagavad Gita","Equanimity","Emotions","Mindset"],
  readingTime: "9 min",
  coverImage: {
    src: "/assets/blog/gita-detachment.svg",
    alt: "Abstract cover art with calm waves and a centered light, symbolizing steadiness amid change.",
  },
  Content,
};
