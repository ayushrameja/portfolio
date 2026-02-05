import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>If you’ve ever tried to fix a “bad day” with the wrong tool—coffee for anxiety, motivation videos for exhaustion, discipline for depression—you already understand why the three gunas are useful. They’re a diagnostic lens: what state am I in, and what action actually helps from here?</p>

      <p>In the Gita’s broader philosophy, the gunas are qualities of nature that influence mind and behavior. You don’t need metaphysics to use the model. Treat it like weather: you can’t control the sky, but you can choose an umbrella.</p>

      <h2>The three states (modern translation)</h2>

      <ul>
        <li><strong>Sattva (clarity):</strong> calm, steady, discerning. You can see what matters and act cleanly.</li>
        <li><strong>Rajas (agitation):</strong> restless, driven, craving movement. Useful energy that can tip into compulsion.</li>
        <li><strong>Tamas (inertia):</strong> heavy, foggy, avoidant. Low energy, low clarity, high “later.”</li>
      </ul>

      <h2>Why this model beats “I’m just lazy”</h2>

      <p>Most self-talk is morally flavored: good/bad, disciplined/undisciplined. The gunas are more practical: “What’s the current mode?” That keeps you from turning temporary states into permanent identity claims.</p>

      <h2>Interventions: what actually helps in each mode</h2>

      <h3>If you’re in sattva (clarity)</h3>

      <ul>
        <li>Protect it: reduce noise, avoid unnecessary conflict, keep your schedule sane.</li>
        <li>Do your highest-leverage work here (writing, design, deep thinking).</li>
        <li>Don’t waste clarity on doomscrolling like it’s a hobby.</li>
      </ul>

      <h3>If you’re in rajas (agitation)</h3>

      <ul>
        <li>Move your body: walk, workout, clean your room—channel the energy.</li>
        <li>Timebox tasks and define “done” before starting.</li>
        <li>Reduce stimulants (yes, including “just one more” feed refresh).</li>
      </ul>

      <h3>If you’re in tamas (inertia)</h3>

      <ul>
        <li>Use a 5-minute starter action: shower, sunlight, short walk, tidy one surface.</li>
        <li>Lower the bar: do the smallest viable version, then stop.</li>
        <li>Ask for help early. Tamas loves isolation because it can’t be challenged.</li>
      </ul>

      <h2>A quick self-check (takes 30 seconds)</h2>

      <ul>
        <li><strong>Body:</strong> energized, wired, or heavy?</li>
        <li><strong>Mind:</strong> clear, racing, or foggy?</li>
        <li><strong>Behavior:</strong> focused, restless, or avoidant?</li>
      </ul>

      <h2>The trap: trying to solve tamas with rajas</h2>

      <p>When you’re inert, you’ll often reach for stimulation—sugar, scrolling, adrenaline—to force movement. That can push you into rajas (restless) without giving you clarity. The better move is gentle structure and light: small actions that rebuild momentum.</p>

      <h2>How to use the gunas in weekly planning</h2>

      <ul>
        <li>Schedule one clarity block (sattva) for deep work.</li>
        <li>Schedule one movement block (rajas) to discharge stress.</li>
        <li>Schedule one recovery block (tamas) before you crash into it accidentally.</li>
      </ul>

      <p>Trade-off: any model can become an excuse (“I’m tamasic, what can I do”). Don’t do that. The gunas describe a state, not a sentence. Use the label to choose an intervention, then move.</p>
    </>
  );
}

export const post: BlogPost = {
  slug: "gita-three-gunas-practical-model",
  title: "The Three Gunas: A Practical Model for Your Mood, Energy, and Choices",
  description: "Sattva, rajas, tamas—clarity, agitation, inertia. A no-nonsense way to diagnose your state and choose the right intervention.",
  publishedAt: "2026-02-04",
  tags: ["Bhagavad Gita","Gunas","Habits","Mental Models"],
  readingTime: "11 min",
  coverImage: {
    src: "/assets/blog/gita-gunas.svg",
    alt: "Abstract cover art with three overlapping gradients representing clarity, agitation, and inertia.",
  },
  Content,
};
