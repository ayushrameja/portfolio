# Repository instructions

## Direction and change records

- Before changing a feature, read its relevant record in `directions/`. Start with `directions/README.md`.
- Keep feature decisions and change history in `directions/`, rather than expanding the root README with implementation history.
- After making a requested change, update the matching direction record in the same work session. Create a new topic file when no existing record fits, and add it to the index.
- Record the user's intended outcome, what changed and why, rejected approaches and their lessons, the current accepted baseline, deferred decisions, and verification actually performed.
- Keep the current baseline easy to find. Append dated history entries; preserve earlier corrections instead of silently rewriting them as though the rejected approach had been intended.
- Distinguish user-approved direction from an implementation assumption or an unreviewed proposal. When feedback changes the direction, update the baseline and explain what it supersedes.
- Use the current code to verify implementation details. These records provide context, not proof that old checks still pass or permission to expand the task.

## Communication

- Keep responses short and direct. Light humor is welcome when it fits.
- Ask focused questions before implementation when a material design ambiguity remains; use already-established decisions without asking again.
