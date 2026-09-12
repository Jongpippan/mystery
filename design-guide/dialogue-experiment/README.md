# Korean dialogue writing experiment

Package: `KDW-01` / version `1.0` / 2026-09-12
Status: the user reports a substantially better ChatGPT draft and subsequently accepted the refined direction on introduction clarity, cast pacing, and length. The generated screenplay and model/settings have not been supplied here; no direct text inspection or controlled comparison has been performed.

## Refinement used in the discussion

The user has now said the direction seems satisfactory. Keep this material for later reuse; do not automatically repeat the trial. For another local revision, use the [focused refinement prompt](04-refinement-prompt.md) in the ChatGPT conversation that contains the preferred draft. It preserves the successful voice, staggers the introductions, adds necessary situational clarity, and trims repetition. It explicitly overrides the baseline's single-scene format and length target for this follow-up. Keep the earlier draft to compare with the revision.

The original source and prompts below remain version 1.0 for traceability. The follow-up is `KDW-01-R1`, a changed editorial brief; it must not be presented as an unchanged-condition model comparison.

## Purpose and boundaries

Test whether a dedicated ChatGPT writing conversation produces more natural, distinctive Korean introductory scenes than a Codex writing conversation, using the same source and request. Compare actual outputs; do not assume a product-level winner.

The full game's scope is recorded in [current development direction](../current-direction.md): 5–7 substantial investigation chapters, each comparable in depth to the entire proposed movable-wall investigation. This short pre-incident writing test is not one of those chapters, a reduced game, or a test of mystery difficulty.

All hotel names, characters, relationships, props, and local events in the source are **provisional experimental fixtures**. They do not establish series canon. The old rejected demonstration dialogue is deliberately absent. No full case solution exists in this package.

## Files

| File | Role | Use |
|---|---|---|
| [01-writing-source.md](01-writing-source.md) | Self-contained English writing source, Korean canonical labels, scene brief and boundaries | Upload this file to the writing conversation |
| [02-prompts.md](02-prompts.md) | Copyable initial and revision prompts | Paste the selected fenced block as a message |
| [03-evaluation.md](03-evaluation.md) | Human comparison procedure and blank evaluation record | Keep for evaluation; do not add it to the initial writer's context |
| [04-refinement-prompt.md](04-refinement-prompt.md) | Follow-up editorial brief and copyable prompt based on the user's trial | Paste its fenced block into the conversation containing the preferred draft |

Only `01-writing-source.md` is required as an uploaded source. The initial prompt explicitly names it. No repository access, external links, earlier chat history, or additional planning documents are needed to write this fixture. If the uploaded file cannot be read, the writer must report that instead of inventing its contents.

Do not upload the old project, old scripts, the entire repository, or the earlier rejected samples for the first trial. The relevant source is already self-contained. The prompts and guide are user-run instructions; this package has not been sent to ChatGPT automatically.

## First run

1. Start a fresh ChatGPT writing conversation, optionally in a dedicated project. Attach `01-writing-source.md`.
2. Paste the **Initial scene prompt** from `02-prompts.md`. No edits or placeholders are required.
3. Save the complete output as the first draft. Read the scene without opening the author-only character notes. Do not ask the writer to explain why the scene is funny.
4. Preserve that draft, then paste the **Revision prompt** once. Save the revision separately.
5. Evaluate both with `03-evaluation.md`. The test includes both first-draft quality and response to editorial direction.

The character notes are for the writer. The reader should encounter the people in the screenplay itself, not through an introduction explaining their personalities.

## Comparison with Codex

Use a fresh writing conversation in each environment. Provide the same source version, initial prompt, target length, and one identical revision prompt. The current conversation already contains rejected drafts and discussion; comparing it directly to a fresh ChatGPT conversation is not a controlled context comparison.

Record model labels, exposed reasoning settings, date, any additional instructions or memory, and whether those settings were known. Match what can reasonably be matched. If the models or surrounding instructions differ, report a comparison of the two **workflows**, not proof that the application alone caused the difference. Never assume access to hidden settings.

Keep outputs unchanged for comparison. Label them A and B without model names before judging when practical. The user has already seen the source design, so their judgment is valuable but not a fully blind first-reader test; a reader who has not seen the source can separately assess introduction clarity.

One pair is a useful pilot. If the difference is small, repeat fresh runs of the same task rather than treating one lucky output as a universal ranking. Do not pad or truncate one output to hide a length mismatch.

## What this can and cannot establish

This can provide evidence about introductory scene quality, Korean dialogue, eccentric characterization, basic continuity, and one revision cycle for this fixture. It does not establish full-length script consistency, branching quality, mystery fairness, visual delivery, humor for all readers, or independent game-play quality.

If a draft is preferred, retain the Korean text as a candidate and review new details before incorporation. Do not automatically promote test names or improvised props into the future game.

## Preparation verification

- Source is self-contained and contains no dependency on discarded-project content.
- Full-game scale and experimental status are explicit.
- Initial and revision requests are ready to paste and require Korean-only screenplay output.
- The first scene is not supplied as a completed script or an approved style sample.
- The user's preference and remaining concerns are recorded in [the evaluation notes](03-evaluation.md). Detailed scores, direct screenplay review, a controlled model comparison, and playtesting remain unperformed.
