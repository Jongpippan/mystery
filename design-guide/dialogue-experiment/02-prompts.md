# Copyable writing prompts

Package: KDW-01 / source version 1.0

Upload `01-writing-source.md`, then paste the entire first fenced block. The prompts are English author instructions. Every requested screenplay, including its action directions, must be Korean.

## Initial scene prompt

```text
Read the attached 01-writing-source.md (KDW-01, version 1.0) in full. If you cannot access it, say so in Korean and stop rather than inventing its contents.

Using that source, write scene S01 as a complete original Korean screenplay. The reader has never met any of these people and will not see the author-only character notes. Let the first encounters, current work, physical actions, and responses introduce them.

The scene must be understandable and natural while preserving pronounced 나사 빠진 캐릭터성. Give the people time to pursue their immediate wants. Do not reduce them to polite, sensible speakers, and do not arrange every exchange as a question that tees up a witty answer. Choose a few behaviors to develop instead of displaying every listed trait.

Follow the source's local facts, knowledge boundaries, start and end states, and approximate length of 3,500–5,000 Korean characters including spaces. Minor connective invention is allowed within those boundaries. The full game's 5–7 substantial mystery chapters are outside this scene-writing task; do not invent, compress, or summarize them.

Write directly in Korean. Output only the scene heading, speaker-labelled dialogue, and observable action directions. Do not preface it with a character introduction, synopsis, plan, explanation of the humor, or quality report. Do not add game UI, choices, future clues, or an ominous ending. No clarification is needed for the supplied test fixture.
```

## Revision prompt

Save the initial draft before pasting this block in the same conversation. Use the same revision request in both environments for the baseline comparison.

```text
Revise the S01 scene you just wrote, using the same attached 01-writing-source.md and preserving its fixed facts and boundaries.

Act as a Korean screenplay editor. Read the scene as if the character notes were unavailable to the reader. Repair any missing introduction, unexplained action, unnatural transition, or line that exists only to cue somebody else's joke. Let the cast react to what was actually said or done. Vary the rhythm where the dialogue has become a string of short symmetrical exchanges.

Preserve the conspicuously eccentric, 나사 빠진 personalities. Do not make the characters bland to make the dialogue smoother. A funny behavior can continue, inconvenience somebody, or be ignored; it does not need an explanatory punchline. Give the scene enough ordinary connective dialogue and physical continuity to work on its own. Do not manufacture sentiment to justify every oddity.

You may substantially rewrite the wording and blocking. Keep the photograph preparation as the local objective, the same four speaking characters, the pre-incident knowledge state, and roughly 3,500–5,000 Korean characters including spaces. Do not invent murder facts, future clues, choice branches, or a new ending incident.

Output only the entire revised Korean scene, including its heading, dialogue, and action directions. No critique, comparison, apology, or self-evaluation before or after it.
```

## Optional targeted follow-up — after the baseline comparison

This is not part of the equal-feedback baseline. Use it only after saving the baseline drafts and revisions. Replace the bracketed line with your own Korean notes and specific quotations; the user should identify what actually felt awkward rather than accept the writer's self-assessment.

```text
Keep using 01-writing-source.md. Revise the entire Korean scene in response to the reader feedback below. Preserve the source's fixed facts, pronounced eccentricity, and first-encounter clarity. Follow the same output format and approximate length as before.

Reader feedback:
[Paste specific lines that felt awkward, what was unclear, and any passages that should be preserved.]

Output only the full revised scene. Do not explain why the old version was funny or defend it. If a requested change would require changing a fixed source fact, identify that conflict briefly in Korean rather than silently changing the fact.
```
