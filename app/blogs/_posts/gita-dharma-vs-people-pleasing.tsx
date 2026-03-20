import type { BlogPost } from "@/types/blog";

function Content() {
  return (
    <>
      <p>
        People-pleasing has excellent branding. It dresses up as kindness, flexibility, maturity, and being
        &quot;good to work with.&quot; But most of the time it is fear with table manners. The Bhagavad Gita has a less flattering
        diagnosis: you are abandoning dharma because you cannot bear the friction of disappointing someone.
      </p>

      <p>
        Dharma is not about performing goodness for applause. It is about right action, rightly held, even when the
        room does not clap for it. That is exactly why it is harder than approval-seeking. People-pleasing gives quick
        emotional relief. Dharma asks for steadiness.
      </p>

      <h2>What dharma is, in practical terms</h2>

      <p>
        Dharma is not vague morality and it is not obedience. In daily life, it is closer to this: the responsibility,
        truth, or right action that is yours to honor in a given situation.
      </p>

      <ul>
        <li>Say the hard thing that needs saying.</li>
        <li>Do the work you actually owe, not the work that wins instant praise.</li>
        <li>Hold a boundary without turning cruel.</li>
        <li>Refuse the role that keeps the peace by betraying yourself.</li>
      </ul>

      <p>
        That last part matters. A lot of people confuse peace with the absence of tension. The Gita is less naive.
        Sometimes tension is what truth feels like when it enters a polite room.
      </p>

      <h2>How people-pleasing disguises itself</h2>

      <p>
        People-pleasing rarely introduces itself honestly. It uses nicer language.
      </p>

      <ul>
        <li>&quot;I&apos;m just trying to be helpful.&quot;</li>
        <li>&quot;It&apos;s easier if I do it myself.&quot;</li>
        <li>&quot;I don&apos;t want to make this awkward.&quot;</li>
        <li>&quot;Maybe my needs are not that important.&quot;</li>
      </ul>

      <p>
        Translation: &quot;I am organizing my actions around managing other people&apos;s reactions.&quot; That is not kindness.
        It is emotional outsourcing. It also creates quiet resentment, because the self you keep abandoning is apparently
        expected to stay cheerful about it.
      </p>

      <h2>Dharma is not selfishness</h2>

      <p>
        This is where people get nervous. They hear &quot;stop people-pleasing&quot; and imagine becoming cold, rigid, or
        impossible. Fair concern. There are enough faux-boundary philosophers wandering around already.
      </p>

      <p>
        Dharma is not permission to become self-obsessed. It is a demand to act cleanly. You can be considerate without
        becoming available for misuse. You can be compassionate without making your nervous system a public utility.
      </p>

      <h2>Three places this shows up fast</h2>

      <h3>At work</h3>

      <p>
        Saying yes to every request is not collaboration. It is scope decay with a smile. Dharma at work often sounds
        like: &quot;I can take this on next week, or I can do it now if we drop the other priority.&quot; Clear, useful, and mildly
        offensive to chaos.
      </p>

      <h3>In relationships</h3>

      <p>
        If honesty is constantly delayed to preserve comfort, the relationship becomes a performance. Dharma here is
        respectful truth. Not aggression. Not avoidance. Just the discipline of not editing yourself into acceptability.
      </p>

      <h3>In personal decisions</h3>

      <p>
        Many people know what they want and then immediately consult the imaginary panel of disappointed faces in their
        head. Dharma asks a better question: what is right, not just what is socially easier to explain?
      </p>

      <h2>A simple dharma check before you say yes</h2>

      <ol>
        <li>
          <strong>What am I about to agree to?</strong>
        </li>
        <li>
          <strong>Why am I saying yes?</strong> Duty, care, fear, guilt, image management?
        </li>
        <li>
          <strong>What does this cost me?</strong> Time, clarity, rest, self-respect?
        </li>
        <li>
          <strong>Would I still choose this if nobody praised me for it?</strong>
        </li>
        <li>
          <strong>What would a truthful response sound like?</strong>
        </li>
      </ol>

      <p>
        If you run that check honestly, half your automatic yeses start looking less noble and more like habit.
      </p>

      <h2>Right action often feels worse before it feels better</h2>

      <p>
        People-pleasing gives immediate relief and delayed damage. Dharma often does the reverse. The honest boundary can
        feel sharp in the moment. The clear no can feel rude to the part of you trained to be manageable. But over time,
        dharma creates coherence. Your actions stop splitting away from your values.
      </p>

      <p>
        That is one of the quiet gifts of the Gita: it keeps reminding you that discomfort is not always a warning.
        Sometimes it is just the cost of standing upright.
      </p>

      <h2>A line you can borrow</h2>

      <p>
        When you are stuck between approval and clarity, try this: &quot;I want to respond honestly, not just pleasantly.&quot;
        It is simple, direct, and much cleaner than the elaborate fiction people-pleasing usually requires.
      </p>

      <p>
        Trade-off: if you practice dharma instead of approval-seeking, some people will find you less convenient. That
        is unfortunate for them and deeply informative for you. The upside is that your yes starts meaning yes, your no
        stops sounding like an apology, and your life becomes harder to run on borrowed expectations.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "gita-dharma-vs-people-pleasing",
  title: "Dharma vs People-Pleasing in Modern Life",
  description:
    "A practical reading of dharma as right action with boundaries, not approval-seeking disguised as kindness.",
  publishedAt: "2026-03-21",
  tags: ["Bhagavad Gita", "Dharma", "Boundaries", "Mindset"],
  readingTime: "9 min",
  coverImage: {
    src: "/assets/blog/gita-dharma.svg",
    alt: "Abstract cover art with luminous paths and centered geometry symbolizing dharma, clarity, and grounded boundaries.",
  },
  Content,
};
