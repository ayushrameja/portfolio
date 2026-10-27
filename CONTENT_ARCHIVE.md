# Archived writing content

Extracted from the pre-redesign source on 2026-10-27. This preserves article text as Markdown (list numbering/layout normalized); original JSX and metadata remain in Git commit `0880144eb30ae2a0a161ce9fd6b24c171ca74aca`. Historical statements and dates are retained as written.

## Article inventory

| Article | Route | Desk | Date | Reading time |
| --- | --- | --- | --- | --- |
| Accessibility Fixes I Made That Took 10 Minutes and Helped Real People | `/blogs/accessibility-fixes-10-minutes` | engineering | 2026-02-03 | 5 min |
| Code Review Comments That Actually Improve the PR | `/blogs/code-review-comments-that-actually-help` | engineering | 2026-03-06 | 7 min |
| Engineering Decision Docs That Teams Will Actually Read | `/blogs/engineering-decision-docs-that-teams-actually-use` | engineering | 2026-03-20 | 7 min |
| A 10-Minute Daily Gita Practice (That You’ll Actually Do) | `/blogs/gita-10-minute-daily-practice` | life | 2026-02-01 | 8 min |
| Arjuna’s Anxiety: Decision-Making When Every Option Feels Wrong | `/blogs/gita-arjuna-anxiety-decision-making` | life | 2026-02-02 | 12 min |
| Detachment Isn’t Apathy: How to Care Without Spiraling | `/blogs/gita-detachment-vs-apathy` | life | 2026-02-03 | 9 min |
| Dharma vs People-Pleasing in Modern Life | `/blogs/gita-dharma-vs-people-pleasing` | life | 2026-03-21 | 9 min |
| Karma Yoga for Modern Work (Without Becoming a Doormat) | `/blogs/gita-karma-yoga-modern-work` | life | 2026-02-05 | 10 min |
| The Three Gunas: A Practical Model for Your Mood, Energy, and Choices | `/blogs/gita-three-gunas-practical-model` | life | 2026-02-04 | 11 min |
| How Developers Should Write Portfolio Case Studies | `/blogs/how-developers-should-write-portfolio-case-studies` | engineering | 2026-03-16 | 7 min |
| How I Scope Frontend Work When Everything Is Somehow Urgent | `/blogs/how-i-scope-frontend-work-when-everything-is-urgent` | engineering | 2026-03-11 | 8 min |
| How to Review Agent-Written PRs Without Lowering the Bar | `/blogs/how-to-review-agent-written-prs` | engineering | 2026-04-06 | 7 min |
| SEO for Developers: Practical Checklist for Next.js | `/blogs/seo-for-developers-nextjs-checklist` | engineering | 2026-02-03 | 6 min |

## Accessibility Fixes I Made That Took 10 Minutes and Helped Real People

Engineering · 2026-02-03 · 5 min

High-impact accessibility tweaks you can ship fast: focus states, labels, semantics, contrast, and motion.

Accessibility isn't a side quest. It's just… the main quest, except nobody gives you XP until you break something. Here are fixes that are genuinely "10 minutes" and actually help real people.

### 1) Visible focus (keyboard users exist)

If you remove focus rings, you're basically telling keyboard users "good luck, champ." Ensure interactive elements have a clear `:focus-visible` state.

### 2) Use semantic HTML (free a11y, no subscription)

- Use `<button>` for buttons, not `<div onClick>`.

- Use `<nav>`, `<main>`, `<header>`, `<footer>`.

- Headings in order (H1 → H2 → H3), not “whatever looks big.”

### 3) Label your inputs (screens readers aren't telepathic)

Every input needs a label: `<label htmlFor>` or `aria-label` if you truly can't show text. Placeholder text is not a label; it's a suggestion that disappears.

### 4) Color contrast (pretty is optional, readable isn't)

Check contrast for text and UI controls. Tailwind makes it easy to accidentally ship “zinc-400 on zinc-200” and call it minimalist.

### 5) Link text that makes sense out of context

“Click here” is useless when a screen reader lists links. Use descriptive text like “Read the SEO checklist” or “View resume.”

### 6) Reduced motion (not everyone wants the cinema experience)

If your UI has animations, respect `prefers-reduced-motion`. You can still be stylish without making users nauseous.

### 7) Images need alt text (and "image" isn't helpful)

- Decorative images: empty alt (alt="").

- Meaningful images: describe what matters in context.

### 8) Don't trap focus in modals/menus

If you open a dialog, focus should move into it, and keyboard users should be able to escape. Focus traps are a real thing. They are also how your website becomes a haunted house.

### Quick sanity checks

- Tab through the entire page.

- Turn on VoiceOver/Narrator for 2 minutes.

- Run Lighthouse a11y and fix the easy stuff.

The trade-off: a11y work is iterative. You'll "fix it" and then discover three more things. Congratulations— you've unlocked the infinite backlog, but at least your site is usable.

## Code Review Comments That Actually Improve the PR

Engineering · 2026-03-06 · 7 min

A practical rubric for reviewing code without drowning teams in noise, nitpicks, and fake rigor.

Code review has two possible outcomes: the PR gets better, or everyone roleplays as a linter with opinions. The difference is whether your comments reduce risk, clarify behavior, or improve maintainability. If they do not, you are mostly decorating the thread.

### Start with correctness and risk

The first pass is not about style. It is about behavior. Ask the boring, expensive questions first.

- Can this break a user flow?

- Can this silently fail?

- Does this change have the right loading, error, and empty states?

- Will this be painful to debug at 2 AM when logs are vague and hope is gone?

If you start with naming nits while ignoring a broken edge case, you are not reviewing. You are accessorizing.

### Separate blocking comments from optional ones

Not every comment deserves the same weight. A good review makes that obvious.

- **Blocking:** bugs, regressions, missing tests for risky behavior, security issues, broken accessibility, unclear data contracts.

- **Optional:** naming ideas, small refactors, readability tweaks, "could be cleaner" feedback.

This saves time and avoids the classic team ritual where people spend thirty minutes debating a helper name while a race condition sits in the corner sharpening a knife.

### Comment on the code, not the author

"This branch is hard to follow" is useful. "You made this confusing" is lazy and personal. The PR is a shared artifact, not a referendum on somebody's intelligence.

The best review comments are specific and easy to act on: point to the branch, the assumption, or the missing guarantee. Vague disappointment is not feedback. It is mood lighting.

### Ask for evidence, not vibes

"I think this might fail sometimes" is weaker than "what happens if the API returns partial data?" Good review comments attach to a scenario. Better ones also suggest how to prove it.

- Request a test for the branch that worries you.

- Ask for a screenshot or recording for UI changes.

- Ask what the rollback path is if the behavior changes in production.

- Ask whether analytics, logging, or monitoring will show failure clearly.

### Prefer fewer, sharper comments

Ten high-signal comments beat forty drive-by observations. If everything is urgent, nothing is. Reviewers who dump every thought into the thread usually create noise, fatigue, and the illusion of rigor.

If you see a repeated problem, summarize it once. "This component mixes fetch, transform, and presentation. Splitting those responsibilities would make the next change safer." One clear note beats six scattered sighs.

### A simple review rubric

- Is the behavior correct?

- Is the risk understood?

- Is the change testable and tested enough for its blast radius?

- Will the next engineer understand this without reading your mind?

- Are we shipping accidental complexity because nobody wanted the harder conversation?

### The reviewer still owns clarity

If a comment requires a follow-up call, write the first draft anyway. "Can we simplify this?" is weak. "Can we move the data transform to the server so the client component only renders state?" is review. Precision matters.

Trade-off: strong reviews take time and judgment. They are slower than emoji approvals and faster than production incidents. Like most good engineering habits, they feel inconvenient right up until they save you.

## Engineering Decision Docs That Teams Will Actually Read

Engineering · 2026-03-20 · 7 min

A practical template for writing decision docs that clarify options, trade-offs, and risks before the team wastes another meeting.

Most engineering decision docs fail for a very simple reason: by the time someone writes one, the decision is already emotionally married, politically protected, and about three Slack threads past reversible. At that point, the doc is not a decision tool. It is burial paperwork.

A useful decision doc is shorter, sharper, and less performative than teams expect. Its job is not to sound strategic. Its job is to reduce ambiguity, expose trade-offs, and make it harder for the same argument to keep respawning in meetings like some cursed backend service.

### Write the doc before the decision calcifies

If the recommendation is already locked and everyone knows it, be honest about that. Call it a record. Do not pretend it is still an exploration. A real decision doc is written early enough that alternatives can still win.

That timing matters because the value is not the document itself. The value is giving smart people one place to challenge assumptions before the cost of changing direction gets expensive.

### Keep the scope brutally narrow

A good doc answers one decision cleanly. It does not wander off to solve architecture, staffing, roadmap politics, and your childhood fear of under-documenting things.

- What exactly are we deciding?

- What problem triggered this decision?

- What options are still realistically on the table?

- What will change if we pick this path?

If the doc tries to cover five decisions at once, nobody will know what feedback to give. They will either comment on everything or nothing, both of which are classic team hobbies.

### The sections that actually matter

Most teams do not need a heavyweight template. They need a short structure that forces clarity.

- **Context:** What is happening now, and why does this decision exist?

- **Options:** What are the plausible approaches, not the fake ones added for decoration?

- **Recommendation:** Which path do you recommend, in one sentence?

- **Trade-offs:** What do we gain, and what pain are we consciously accepting?

- **Risks:** What could fail, regress, or become more expensive later?

- **Follow-up:** What needs validating after the decision is made?

That is enough for most frontend, platform, and product-facing engineering decisions. The rest is usually ornamentation wearing a confluence page.

### Options should be real competitors

Weak decision docs play a cheap trick: one serious option, one obviously bad option, and one imaginary option nobody would approve outside a fever dream. That is not analysis. That is set design.

If you want useful feedback, list the real alternatives people are genuinely considering. Then explain why the recommendation wins for this context, not for all time. Good decisions are local. Dogma is what happens when a pattern survives longer than its assumptions.

### Write trade-offs like an adult

Saying a choice is "scalable" or "simple" means very little without the bill attached. Every decent option costs something.

- Maybe the fast path increases operational complexity.

- Maybe the cleaner design delays the deadline.

- Maybe the lower-risk option creates more migration work next quarter.

Trade-offs are where trust gets built. People can work with a costly decision. They get nervous around decisions that pretend to be free.

### A template you can actually use

- **Decision:** One sentence on what is being decided.

- **Why now:** The trigger, risk, or business pressure behind it.

- **Options considered:** Two to four realistic paths.

- **Recommended path:** The preferred option and why it fits now.

- **Trade-offs and risks:** What gets worse or stays hard.

- **Validation plan:** What to measure or revisit after shipping.

If a decision cannot be explained in that shape, the problem is usually not the template. The problem is that the thinking is still mushy and the team is hoping formatting will save it.

### Decision docs are for alignment, not self-defense

The worst docs read like the author is trying to win a future argument. You can feel the defensive energy in every line. Good docs are calmer than that. They help the team see the choice clearly, make the call, and move.

Trade-off: strong decision docs take a bit more effort up front, and they surface disagreement earlier, which some teams interpret as inconvenience. Tragic. The upside is fewer circular debates, better records, and less expensive confusion later when everyone forgets why the architecture now looks like an apology.

## A 10-Minute Daily Gita Practice (That You’ll Actually Do)

Life · 2026-02-01 · 8 min

A tiny routine: attention, intention, action. Built for consistency, not spiritual cosplay.

If you want the Gita to be more than an aesthetic bookshelf accessory, you need a daily hook. Not an hour-long ritual you’ll abandon after three days. Ten minutes. Repeatable. Slightly boring. Effective.

### The goal

The goal isn’t to feel calm every day. The goal is to build the habit of returning: to attention, to values, to clean action. That’s the steady mind in practice.

### The 10-minute routine

#### Minute 0–2: attention (breath)

Sit. Count breaths 1 to 10. When you drift (you will), restart at 1 without commentary. The skill is returning, not being perfect.

#### Minute 2–5: intention (dharma sentence)

Write one sentence: “Today, my duty is to ____.” Make it concrete: finish the draft, call the doctor, have the hard conversation, do the workout, pay the bill.

#### Minute 5–10: action (first step now)

Do the first tiny step immediately. Open the doc. Write the first paragraph. Put on shoes. Send the message. The routine ends with action so your brain learns: we don’t just think—we move.

### How to keep it alive (common failure modes)

- **You aim too high:** keep the routine tiny. Add time only after 2–3 weeks of consistency.

- **You miss a day:** restart immediately. Missing is normal. Quitting is optional.

- **You want “results” fast:** measure returns, not feelings. Did you return to practice today?

- **You moralize it:** it’s not a purity contest. It’s training attention + action.

### A weekly check-in (5 minutes on Sunday)

- What actions felt most aligned?

- What triggers pulled me into reactivity?

- What’s one boundary or habit tweak for next week?

Trade-off: small practices don’t feel heroic. That’s exactly why they work. Heroic routines feed the ego and die young. Tiny routines survive long enough to change your life.

## Arjuna’s Anxiety: Decision-Making When Every Option Feels Wrong

Life · 2026-02-02 · 12 min

A grounded framework for tough choices: values, roles, consequences, and the smallest next action.

Arjuna’s opening crisis in the Gita is the most relatable thing in the book: he has information, competence, and reasons… and still can’t move. That’s not weakness. That’s what happens when the mind is overloaded with consequences, identity, and fear.

Modern versions show up as: “Should I quit?”, “Should I move?”, “Should I end this relationship?”, “Should I take this job?” The paralysis isn’t just about options—it’s about what each option says about who you are.

### Why hard decisions feel impossible

- You’re trying to predict every consequence (impossible).

- You’re trying to avoid regret (also impossible).

- You’re treating the decision as identity (“If I choose this, I am this”).

### A four-part framework (use it like a checklist)

#### 1) Values: what do you refuse to betray?

Pick two values. Not twelve. Examples: honesty, stability, growth, family, health, integrity. If you choose too many, you’ve chosen none.

#### 2) Roles: what responsibilities are real?

Dharma isn’t about guilt. It’s about acknowledging responsibilities you’ve accepted: dependents, promises, commitments, the impact your choice will have on others.

#### 3) Constraints: what is true whether you like it or not?

Money, health, visas, time, family realities, mental bandwidth. Constraints are not insults—they’re parameters. Fighting them wastes energy.

#### 4) Next action: what is the smallest testable step?

Most decisions don’t need certainty. They need experiments: talk to someone, try a role for a week, prototype the routine, run a budget, do a trial separation, whatever applies. Make the decision smaller.

### A quick template

- **Decision:** what am I choosing?

- **Values (2):** ____ and ____

- **Roles:** who is affected and what do I owe them?

- **Constraints:** what cannot be ignored?

- **Experiment:** what can I test in 7–14 days?

- **Review date:** when will I reassess?

### The trade-off

This framework won’t remove pain. Some choices are painful because they’re real. What it does remove is the extra suffering from pretending there’s a perfect option. There isn’t—there’s just the most aligned next step.

## Detachment Isn’t Apathy: How to Care Without Spiraling

Life · 2026-02-03 · 9 min

A modern reading of “equanimity”: feel fully, act cleanly, stop letting outcomes decide your self-worth.

“Be detached” is some of the worst advice on the internet, mostly because people confuse detachment with not caring. The Gita’s version is different: it’s steadiness. You can care deeply and still not be owned by the outcome.

In modern life, the outcome lottery is constant: likes, approvals, rejections, performance reviews, relationship outcomes, health news. If your nervous system is tied to those swings, you’ll live like a stock ticker.

### What detachment really means

Detachment is the ability to act from values instead of from craving or fear. You do the best action you can see, then you let reality be reality. That’s not passivity. That’s maturity.

### Apathy vs equanimity

- **Apathy:** shutting down to avoid pain. “Whatever. I don’t care.”

- **Equanimity:** staying steady while feeling pain. “This hurts. I’ll still act wisely.”

### The “spiral” usually starts here

Spiraling is often a control attempt: your mind tries to rehearse every future so you never feel surprised. But rehearsal doesn’t prevent reality. It just burns your energy early.

### A practical method: Feel → Name → Choose

- **Feel:** stop arguing with the emotion. It’s already here.

- **Name:** label it (“fear”, “anger”, “shame”, “grief”). Labels create distance.

- **Choose:** one value-aligned action (small is fine) instead of rumination.

#### Example: rejection

Apathy says: “I didn’t want it anyway.” Equanimity says: “I wanted it. I’m disappointed. I’ll learn, adjust, and try again.” One protects ego. The other builds resilience.

#### Example: praise

Detachment isn’t only for bad outcomes. Praise can also hook you into performance. Equanimity is enjoying the win without making it your identity.

### Three exercises that help fast

- **Two-column list:** control / no control. Put energy only in the first column.

- **One clean action:** pick the smallest next step. Do it now.

- **Return ritual:** 3 breaths + posture reset + repeat your value sentence.

### The trade-off

Equanimity can make you less dramatic. Some people will miss your drama because it made them feel important. The upside is you stop paying interest on emotions for outcomes you can’t control.

## Dharma vs People-Pleasing in Modern Life

Life · 2026-03-21 · 9 min

A practical reading of dharma as right action with boundaries, not approval-seeking disguised as kindness.

People-pleasing has excellent branding. It dresses up as kindness, flexibility, maturity, and being "good to work with." But most of the time it is fear with table manners. The Bhagavad Gita has a less flattering diagnosis: you are abandoning dharma because you cannot bear the friction of disappointing someone.

Dharma is not about performing goodness for applause. It is about right action, rightly held, even when the room does not clap for it. That is exactly why it is harder than approval-seeking. People-pleasing gives quick emotional relief. Dharma asks for steadiness.

### What dharma is, in practical terms

Dharma is not vague morality and it is not obedience. In daily life, it is closer to this: the responsibility, truth, or right action that is yours to honor in a given situation.

- Say the hard thing that needs saying.

- Do the work you actually owe, not the work that wins instant praise.

- Hold a boundary without turning cruel.

- Refuse the role that keeps the peace by betraying yourself.

That last part matters. A lot of people confuse peace with the absence of tension. The Gita is less naive. Sometimes tension is what truth feels like when it enters a polite room.

### How people-pleasing disguises itself

People-pleasing rarely introduces itself honestly. It uses nicer language.

- "I'm just trying to be helpful."

- "It's easier if I do it myself."

- "I don't want to make this awkward."

- "Maybe my needs are not that important."

Translation: "I am organizing my actions around managing other people's reactions." That is not kindness. It is emotional outsourcing. It also creates quiet resentment, because the self you keep abandoning is apparently expected to stay cheerful about it.

### Dharma is not selfishness

This is where people get nervous. They hear "stop people-pleasing" and imagine becoming cold, rigid, or impossible. Fair concern. There are enough faux-boundary philosophers wandering around already.

Dharma is not permission to become self-obsessed. It is a demand to act cleanly. You can be considerate without becoming available for misuse. You can be compassionate without making your nervous system a public utility.

### Three places this shows up fast

#### At work

Saying yes to every request is not collaboration. It is scope decay with a smile. Dharma at work often sounds like: "I can take this on next week, or I can do it now if we drop the other priority." Clear, useful, and mildly offensive to chaos.

#### In relationships

If honesty is constantly delayed to preserve comfort, the relationship becomes a performance. Dharma here is respectful truth. Not aggression. Not avoidance. Just the discipline of not editing yourself into acceptability.

#### In personal decisions

Many people know what they want and then immediately consult the imaginary panel of disappointed faces in their head. Dharma asks a better question: what is right, not just what is socially easier to explain?

### A simple dharma check before you say yes

- **What am I about to agree to?**

- **Why am I saying yes?** Duty, care, fear, guilt, image management?

- **What does this cost me?** Time, clarity, rest, self-respect?

- **Would I still choose this if nobody praised me for it?**

- **What would a truthful response sound like?**

If you run that check honestly, half your automatic yeses start looking less noble and more like habit.

### Right action often feels worse before it feels better

People-pleasing gives immediate relief and delayed damage. Dharma often does the reverse. The honest boundary can feel sharp in the moment. The clear no can feel rude to the part of you trained to be manageable. But over time, dharma creates coherence. Your actions stop splitting away from your values.

That is one of the quiet gifts of the Gita: it keeps reminding you that discomfort is not always a warning. Sometimes it is just the cost of standing upright.

### A line you can borrow

When you are stuck between approval and clarity, try this: "I want to respond honestly, not just pleasantly." It is simple, direct, and much cleaner than the elaborate fiction people-pleasing usually requires.

Trade-off: if you practice dharma instead of approval-seeking, some people will find you less convenient. That is unfortunate for them and deeply informative for you. The upside is that your yes starts meaning yes, your no stops sounding like an apology, and your life becomes harder to run on borrowed expectations.

## Karma Yoga for Modern Work (Without Becoming a Doormat)

Life · 2026-02-05 · 10 min

A pragmatic take on “action without attachment”: own the work, not the outcomes—or other people’s chaos.

Karma Yoga is one of the most misread ideas in the Bhagavad Gita. People hear “don’t be attached to results” and translate it into “care less.” That’s not the move. The move is: care about the quality of your action, and stop letting outcomes (and other people’s reactions) run your nervous system like a bad manager.

If you work in tech (or any modern workplace), you already live in a storm of outcomes: metrics, reviews, launches, layoffs, praise, blame, timelines that were invented in a meeting and then treated as law. Karma Yoga is a way to stay effective inside that storm without turning into a burnout with a calendar.

### The core idea (in plain English)

You control your effort, intent, and craft. You do not control: market conditions, other people’s judgment, timing surprises, “alignment,” and whatever the algorithm decides today. Karma Yoga says: commit to the part you own, release the part you don’t. Not because it’s spiritual. Because it’s accurate.

### What “non-attachment” is (and isn’t)

- **It is**: doing the right work for the right reasons, even when the reward is uncertain.

- **It is**: staying steady when the outcome swings—good or bad.

- **It is not**: lowering standards, avoiding responsibility, or pretending outcomes don’t matter.

- **It is not**: becoming emotionally flat. You can feel things and still act cleanly.

### A workplace translation: “Own inputs, negotiate outputs.”

Inputs are what you can promise. Outputs are what you can aim for. The healthiest professionals I’ve met are ruthless about this distinction. They commit to the craft and the process, and they negotiate scope and expectations instead of silently absorbing chaos.

#### Example: project deadlines

Bad attachment sounds like: “If we miss this deadline, I’m a failure.” Clean action sounds like: “Here is what we can ship with high confidence by Friday. If you want more, we trade time or cut scope.” One is identity. One is engineering.

#### Example: performance reviews

You can’t control the entire review system. You can control your evidence: shipped work, impact notes, decisions you made, mentoring, reliability. Karma Yoga in this context is building your “inputs dossier” and letting the review outcome be data—not a verdict on your worth.

### How to practice Karma Yoga (weekly, not mystical)

- **Define success as inputs.** Before starting a task, write 3 input goals (e.g., “ship PR”, “add tests”, “write doc”).

- **Separate identity from outcome.** Say it out loud: “A missed metric is a signal, not a sentence.”

- **Make trade-offs explicit.** When asked for more, answer with scope/time/quality trade-offs. No silent heroism.

- **Close the loop.** After shipping, review what worked and what didn’t—calmly—so your process improves.

- **Offer the work, keep the boundary.** “I can do X. I cannot do X+Y without dropping Z.”

### The common failure mode: using Karma Yoga as a coping mechanism

Some people weaponize “detachment” to avoid hard conversations: they tolerate bad scope, low trust, unclear goals, and call it “spiritual.” That’s not Karma Yoga. That’s conflict avoidance wearing a robe. Clean action includes boundaries and clarity.

### A simple template you can steal

- **Intent:** Why am I doing this? (useful, honest, aligned)

- **Inputs:** What can I control this week?

- **Constraints:** What can I not control?

- **Trade-offs:** What changes if scope increases?

- **Next action:** What is the smallest step I can do today?

Trade-off: if you practice this seriously, you’ll become harder to manipulate with guilt, urgency, or praise. Some environments don’t love that. The upside is you keep your dignity and your energy—two assets that don’t show up on a dashboard but determine your whole life.

## The Three Gunas: A Practical Model for Your Mood, Energy, and Choices

Life · 2026-02-04 · 11 min

Sattva, rajas, tamas—clarity, agitation, inertia. A no-nonsense way to diagnose your state and choose the right intervention.

If you’ve ever tried to fix a “bad day” with the wrong tool—coffee for anxiety, motivation videos for exhaustion, discipline for depression—you already understand why the three gunas are useful. They’re a diagnostic lens: what state am I in, and what action actually helps from here?

In the Gita’s broader philosophy, the gunas are qualities of nature that influence mind and behavior. You don’t need metaphysics to use the model. Treat it like weather: you can’t control the sky, but you can choose an umbrella.

### The three states (modern translation)

- **Sattva (clarity):** calm, steady, discerning. You can see what matters and act cleanly.

- **Rajas (agitation):** restless, driven, craving movement. Useful energy that can tip into compulsion.

- **Tamas (inertia):** heavy, foggy, avoidant. Low energy, low clarity, high “later.”

### Why this model beats “I’m just lazy”

Most self-talk is morally flavored: good/bad, disciplined/undisciplined. The gunas are more practical: “What’s the current mode?” That keeps you from turning temporary states into permanent identity claims.

### Interventions: what actually helps in each mode

#### If you’re in sattva (clarity)

- Protect it: reduce noise, avoid unnecessary conflict, keep your schedule sane.

- Do your highest-leverage work here (writing, design, deep thinking).

- Don’t waste clarity on doomscrolling like it’s a hobby.

#### If you’re in rajas (agitation)

- Move your body: walk, workout, clean your room—channel the energy.

- Timebox tasks and define “done” before starting.

- Reduce stimulants (yes, including “just one more” feed refresh).

#### If you’re in tamas (inertia)

- Use a 5-minute starter action: shower, sunlight, short walk, tidy one surface.

- Lower the bar: do the smallest viable version, then stop.

- Ask for help early. Tamas loves isolation because it can’t be challenged.

### A quick self-check (takes 30 seconds)

- **Body:** energized, wired, or heavy?

- **Mind:** clear, racing, or foggy?

- **Behavior:** focused, restless, or avoidant?

### The trap: trying to solve tamas with rajas

When you’re inert, you’ll often reach for stimulation—sugar, scrolling, adrenaline—to force movement. That can push you into rajas (restless) without giving you clarity. The better move is gentle structure and light: small actions that rebuild momentum.

### How to use the gunas in weekly planning

- Schedule one clarity block (sattva) for deep work.

- Schedule one movement block (rajas) to discharge stress.

- Schedule one recovery block (tamas) before you crash into it accidentally.

Trade-off: any model can become an excuse (“I’m tamasic, what can I do”). Don’t do that. The gunas describe a state, not a sentence. Use the label to choose an intervention, then move.

## How Developers Should Write Portfolio Case Studies

Engineering · 2026-03-16 · 7 min

A sharper way to write case studies that show judgment, constraints, trade-offs, and outcomes people can trust.

Most developer case studies read like they were assembled by a committee that feared specificity. "Built a modern platform." "Improved performance." "Delivered a seamless experience." Wonderful. That tells me absolutely nothing, which is impressive in its own way.

A good case study should make one thing easy for the reader: trusting your judgment. Not your adjective budget.

### Start with context and constraints

Before the screenshots and victory laps, explain the shape of the problem.

- What kind of product was it?

- Who was it for?

- What was broken, slow, unclear, or risky?

- What constraints mattered: time, team size, legacy code, SEO, performance, business pressure?

Constraints are the point. Anyone can look smart in a story where the requirements were perfect and time was infinite. That is fantasy, not engineering.

### Be precise about your role

"Built the project" is suspicious unless you were alone. Say what you owned.

- Did you design the architecture?

- Did you implement the frontend and collaborate on backend contracts?

- Did you lead the delivery, or contribute one critical slice?

Specific ownership makes your work more credible, not less. Mature readers are not looking for superheroes. They are looking for signal.

### Show decisions, not just outputs

The strongest part of a case study is usually the decision trail.

- Why Next.js instead of a custom stack?

- Why server rendering for this route?

- Why defer a refactor?

- Why choose a narrower first release?

This is where readers see taste, trade-off handling, and whether you can think beyond implementation. Screenshots are nice. Reasoning is what gets remembered.

### Use evidence that a skeptical person would accept

"Improved performance" means very little on its own. Give the before and after, or at least the direction and method.

- Reduced bundle size by X.

- Cut LCP from roughly A to B on the key landing page.

- Reduced support tickets for a workflow after simplifying the UI.

- Improved publish time by removing a manual step.

Even directional evidence is better than chest-thumping. Readers do not need perfection. They need something real enough to believe.

### Include what went wrong

A polished case study with zero friction reads like marketing copy. Mention one mistake, one revision, or one trade-off that cost something.

Examples:

- We over-scoped the first version and had to cut secondary flows.

- The initial animation hurt perceived performance, so we removed it.

- The data model looked clean in code and painful in the admin panel.

Imperfection, handled well, signals maturity. Pretending every decision was brilliant signals LinkedIn poisoning.

### A simple structure that works

- **Context:** product, audience, and business goal.

- **Constraints:** what made the problem non-trivial.

- **Role:** what you personally owned.

- **Decisions:** the important technical and product calls.

- **Outcome:** what changed, with evidence.

- **Trade-off:** what you would improve next.

Trade-off: better case studies take longer to write because they require memory, honesty, and actual reflection. Tragic, I know. The upside is that one sharp case study can do more for your portfolio than ten vague project cards with gradients.

## How I Scope Frontend Work When Everything Is Somehow Urgent

Engineering · 2026-03-11 · 8 min

A practical way to cut scope, protect quality, and ship real user value without turning delivery into myth.

Every frontend task becomes "urgent" the moment it lands in a sprint board. Then someone adds three edge cases, analytics, responsive tweaks, animation polish, and a dashboard request that was definitely not part of the original ask. Suddenly the ticket has become folklore.

Scoping is how you stop that slide. Not by being difficult. By being precise about what must ship, what can wait, and what quality bar is non-negotiable.

### 1) Start with the user outcome, not the component list

"Build a new settings modal" is not the goal. "Let users change notification preferences without contacting support" is the goal. Once the outcome is clear, a lot of decorative requirements suddenly look optional.

I try to write one sentence for the core user win before touching implementation:

- What can the user do after this ships that they cannot do now?

- What is the smallest version of that win?

### 2) Slice vertically

If you scope by layers, you get a lot of "frontend done, backend pending, analytics later, QA nervous." Slice by a complete user path instead. One thin, real flow is better than five half-built abstractions.

A vertical slice usually includes UI, validation, loading, error handling, and enough instrumentation to know it works. Glamorous? No. Useful? Annoyingly yes.

### 3) Make the trade-offs explicit

Most scoping fights are really trade-off fights wearing fake certainty. Put the actual options on the table.

- **Fastest:** ship the narrow path, skip advanced polish, follow existing patterns.

- **Safer:** keep the UI smaller, add test coverage, avoid broad refactors.

- **More flexible later:** extract primitives now, accept longer delivery.

Once stakeholders see the triangle, the conversation improves. Magic becomes harder to demand when the invoice is visible.

### 4) Protect the non-negotiables

Scope can shrink. Certain bars should not.

- Accessibility basics still apply.

- Error states still need to exist.

- Analytics or logging should still tell you if the feature is broken.

- Responsive behavior still matters if the product claims to support mobile.

Teams get into trouble when they cut the invisible parts first. That is how you "ship fast" and spend the next week deciphering screenshots from customer support.

### 5) Define what is explicitly out

A scope doc without exclusions is just optimism in a nicer font. Write the out-of-scope list while the work is still small.

- Not handling team-level permissions in this pass.

- Not redesigning the existing table component.

- Not adding export or bulk actions yet.

This is not bureaucracy. It is memory. Because two days later, someone will absolutely ask why export is not in the "simple UI update."

### A scoping template I reuse

- **User win:** the smallest meaningful outcome.

- **Included:** the end-to-end path for that outcome.

- **Excluded:** everything tempting but not essential.

- **Risks:** where the work could expand or break.

- **Trade-off chosen:** speed, safety, or flexibility.

Trade-off: tighter scoping can make you look less "accommodating" in the moment. Fine. It also makes you far more reliable. Products remember shipped work. Nobody remembers that you nodded politely while the ticket mutated into a swamp.

## How to Review Agent-Written PRs Without Lowering the Bar

Engineering · 2026-04-06 · 7 min

A practical review workflow for AI-assisted pull requests: smaller diffs, sharper checks, better evidence, and human accountability.

Agent-written pull requests are everywhere because they compress the most flattering part of engineering: producing a lot of code quickly. What they do not compress is accountability. Someone still has to decide whether the diff is correct, safe, maintainable, and worth shipping. Grim news for management decks, but that someone is still us.

If your review process treats agent output like ordinary handwritten code, you will miss a predictable class of problems: broad diffs, confident nonsense, shallow tests, and architecture that looks clean right up until it meets production traffic and other humans.

### Review the task framing before the code

Agent output quality is tightly coupled to the prompt and constraints. Before you review implementation details, check what the agent was actually asked to do.

- Was the task narrow enough to review in one sitting?

- Did it define acceptance criteria and non-goals?

- Did it tell the agent what not to touch?

Bad prompt, bad diff. The code may still compile, but so do a lot of regrettable decisions.

### Diff size is now a policy problem

Agents do not feel review fatigue, so they happily generate sprawling changes. Humans do feel it. That means teams need an explicit rule: if the change cannot be reviewed clearly, it should be split before anyone argues about style.

- Separate refactors from behavior changes.

- Separate generated cleanup from business logic.

- Separate tests from speculative “while I was here” edits.

Smaller diffs are not aesthetic. They are how you stop automation from turning review into archaeology.

### Interrogate boundaries first

Agent-written code often looks locally reasonable while being globally reckless. Review the boundaries before the implementation details.

- What happens on loading, error, empty, and retry states?

- Did it change validation, serialization, or API assumptions?

- Are logging, analytics, and monitoring still useful when things fail?

- Did it quietly increase coupling between modules that used to be separate?

The sharpest bugs now hide in the seams because the center of the code looks suspiciously polished.

### Ask for evidence, not confidence

Agents are excellent at sounding done. That is not the same thing as being done. Reviews should demand proof.

- Which tests were added for the risky paths?

- What manual scenarios were exercised?

- Is there a screenshot or recording for UI changes?

- What is the rollback path if the behavior is wrong in production?

“It should work” is not evidence. It is a bedtime story for tired teams.

### Require a readable change summary

A strong agent workflow includes a short explanation of what changed, why it changed, and what still feels risky. If the PR description is vague, the reviewer ends up reconstructing intent from code, which is the software version of excavating a ruin with a toothbrush.

- Require a clear summary.

- Require a list of touched systems or files.

- Require known risks, assumptions, and follow-up work.

The point is not bureaucracy. The point is reducing interpretive fiction during review.

### Keep the human accountable

The cleanest team rule is also the least glamorous: whoever delegates the task owns the result. Not the model, not the tooling vendor, not the mystical cloud of innovation hovering over the sprint board.

Trade-off: agent-written PRs can absolutely speed up routine implementation and documentation work, but they also make it easier to generate polished mistakes at scale. The upside is leverage. The downside is that your review standards have to get stricter, not softer, or the speed turns into cleanup debt with excellent branding.

## SEO for Developers: Practical Checklist for Next.js

Engineering · 2026-02-03 · 6 min

A pragmatic SEO checklist for Next.js App Router: metadata, sitemaps, structured data, and performance.

SEO has two modes: “this is fine” and “why is Google indexing my 404 page with my login screen title.” This is a practical checklist for Next.js apps using the App Router.

### 1) Get the basics right (Metadata)

- Set a **unique title + description** per page.

- Add **canonical URLs** to avoid duplicate pages competing with themselves.

- Use **Open Graph + Twitter** metadata so links look good when shared.

In Next.js App Router, prefer `export const metadata` for static pages, and `generateMetadata()` when it depends on route params.

### 2) Make pages crawlable (no accidental “invisible site”)

- Ensure `robots.txt` doesn't block your whole site (it happens more than you'd think).

- Don't hide important content behind client-only rendering if you can avoid it.

- Avoid requiring auth/cookies for public pages (bots don't RSVP).

### 3) Ship a sitemap (and keep it correct)

A sitemap is a polite list of URLs you want indexed. It won't magically rank you, but it makes discovery and recrawling easier—especially for new sites.

- Include only canonical, indexable pages.

- Exclude staging/preview domains.

- Update it when routes change (you will forget once).

### 4) Use structured data where it matters

If you have articles, add **JSON-LD** (Article schema). If you have projects/products, consider the relevant schema types. Structured data helps search engines understand your content; it doesn't guarantee fancy rich results, but it's the closest thing SEO has to documentation.

- Validate it using Google's Rich Results test.

- Don't lie in schema (you'll just get ignored or penalized).

### 5) Performance is SEO (because users bounce, and Google notices)

- Optimize images with `next/image` and sane sizes.

- Avoid shipping a nightclub of JS to render three paragraphs of text.

- Watch LCP/CLS/INP in the field, not just Lighthouse on your laptop.

### 6) Content hygiene (the boring part that wins)

- Write headings like you mean them (H1 once, H2/H3 for structure).

- Make URLs stable and human-readable.

- Keep your internal links intentional (help crawlers, help users).

### 7) A quick Next.js checklist

- Per-route metadata via `metadata`/`generateMetadata`

- Canonical URLs

- Open Graph + Twitter cards

- Sitemap

- Robots

- Accessible, semantic HTML

- Fast pages, minimal client JS

The trade-off: doing SEO "properly" means being disciplined about content structure and performance. It's not glamorous—like tests—but it saves you from explaining to your manager why your homepage ranks for “untitled document.”
