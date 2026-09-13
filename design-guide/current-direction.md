# Current decisions and project state

Updated: 2026-09-12 / new production started after common-document reset
Status updated2026-09-14: project_01 complete screenplay accepted as accepted-full-r03-c01; G0/G1 script/design review ready, implementation/verification next. Current facts and evidence are authoritative in [the project brief](../project_01/game-plan/00-brief.md) and [validation](../project_01/game-plan/10-validation.md).

## Adopted direction

The topic guides are the authoritative rules. This record identifies the decisions and their source locations rather than serving as a second competing specification.

| Decision | Authority |
|---|---|
| Novel-worthy case logic and player-led proof; situations clearly explained | [00](00-production-principles.md), [01](01-case-logic.md) |
| 5–7 substantial investigation chapters; the full movable-wall process is approximately one chapter | [00](00-production-principles.md), [01](01-case-logic.md) |
| Distinct substantial mysteries and multiple inferences per chapter, causally connected | [01](01-case-logic.md) |
| Detailed truth, people, player reasoning, structural walkthrough, full script/revision, then implementation | [00](00-production-principles.md) |
| Strong 나사 빠진 characterization, eccentric child companion, no intentional criminal participation | [04](04-characters-and-dialogue.md) |
| Clear first encounters, staggered cast introductions, shorter repetitive exchanges with extensive total script | [04](04-characters-and-dialogue.md) |
| English author MD; Korean actual screenplay, game text, and user communication | [04](04-characters-and-dialogue.md) |
| ChatGPT drafting/editorial work; Codex source management, logic review, game adaptation and implementation | [04](04-characters-and-dialogue.md) |
| Autonomous Codex planning/review/production; user relays ChatGPT files only and gives feedback after game delivery | [00](00-production-principles.md) |
| Versioned MD/prompt handoff and actual formatted screenplay/notes file returns | [Script handoff contract](script-handoff-format.md) |
| Scene default, modal investigation/deduction, right companion notes/settings, full tool access and draft persistence | [05](05-ui-and-investigation.md) |
| Interrogation-exclusive knowledge, wrong-claim costs, repeatable recovery, H0–H4 | [02](02-interrogation-and-hints.md) |
| All retained UI, character, investigation and continuity requirements | [08 requirement matrix](08-quality-gates.md) |

No inherited playtime, evidence, or challenge quota limits the full game. A local writing experiment's length or reduction target is not a game-wide cap.

## Reset baseline (historical, before new production)

- The old `project_01` directory and `series/cases/project_01-SPOILERS.md` have been deleted from the working tree in this cleanup. No replacement project directory or implementation scaffold has been created.
- The series registry and bible contain no registered works, established people, or adopted setting. Git history is not a creative reference source.
- Common guides and project/series templates have been revised in English. They describe how to write the actual work; they are not the work itself.
- The hotel is the current development candidate. Its working title, test cast, identities, relationships, setting details, full truth, and exact chapter architecture are not finalized. Reusing the folder name does not approve those choices.
- No full 5–7 chapter case, complete script, new implementation, new images, or independent game test has been produced.

## Dialogue experiment evidence

The user reports that the ChatGPT draft was substantially better than the earlier Codex examples. They requested clearer context for eccentric behavior, more spaced introductions, and shorter conversations, then said the resulting direction seemed satisfactory. Use that as practical workflow/editorial feedback.

The actual ChatGPT screenplay, model/settings, prompts actually used, and measured lengths are not present here. Do not claim direct line-by-line review, a controlled comparison, or approval of unseen text. Keep [the original test source and refinement brief](dialogue-experiment/README.md) as provisional fixtures; do not reconstruct the rejected demonstration dialogue as an approved style sample.

## Current production and execution policy

The user has now invoked full production. A new `project_01` contains independently authored facts for **여울관: 남겨 둔 자리**, six investigation chapters, project instructions and actual planning sources. The user subsequently requested more distinctive memorable names; the authoritative cast now uses 나여백, 나모눈, 봉만실, 차무록, 탁두철, 소해금, 배한술, 진새벽, 표문식 and 목백로. This is planned work, not a released case or proof of successful characterization.

Use [the writing packet index](../project_01/game-plan/writing/packet-index.md) for the exact external draft dependency. Earlier reset statements above are historical and must not be used to claim the new project is still absent. No discarded contents or test cast were restored.

The user delegates the full production process to Codex, with no intermediate creative reviews or stage approvals. Their only planned intermediate role is relaying the prepared ChatGPT sources/prompt and returning screenplay files. Codex makes planning and editorial decisions, prepares revisions, accepts scripts, implements, and verifies; user feedback comes after completed-game delivery.

Continue from actual project sources through full script/revision, then adaptation and implementation without requesting fresh approval at each stage. External screenplay returns are real dependencies, not user approval gates. The first bounded handoff does not establish full-script readiness. Reading this state file alone does not expand a separately scoped documentation-only request into implementation.

Refer to [the delivery audit](delivery-audit.md) for cleanup checks and [the restart handoff](restart-handoff-2026-09-12.md) for provenance. Recheck current files in future sessions rather than treating this dated record as proof forever.

The user requested fewer file exchanges. The active project now prepares one remaining-full-script packet with internal bounded writing units and a progress manifest, then reviews one assembled draft return. Consolidated revisions follow only where actual material issues require them. This changes transport cadence, not scope, writer responsibility or the full-script-before-implementation gate. See the project writing workflow for exact current outputs.
