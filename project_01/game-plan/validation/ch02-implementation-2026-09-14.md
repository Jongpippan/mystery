# CH02 implementation and continuation — 2026-09-14

Status: CH02 core now connects the sound-booth visit to the cargo-investigation appointment. The full six-chapter game is still in production. Continue from C_CH03_01 without another writer relay or intermediate approval. The accepted-full-r03-c01 canonical screenplay remains unchanged.

## Implemented scope and source boundaries

- `lib/game/chapter-two.ts` explicitly adapts C_CH02_01–08, O1–O3 and D06/Q02/D07/D08/D09/D10. `lib/game/case.ts` dispatches chapter adapters; the original `state.ts` reducer remains the single writable state/save API. All twelve completed CH01/CH02 knowledge awards wait for their success dialogue to finish.
- E12, E11 and E14 establish operating plans and independently captured public output without identifying the operator automatically. E15 and S_Q02_v2 occur only in the successful Q02 response. D07 separates file creation, public playback and unknown physical presence. D08 and D09 can be solved in either order before D10.
- C_CH02_05 presents E16, E13 and E17 in the actual source order, with immediate individual detail views and persisted acknowledgment. E18 is reindexed through the public-event revisit rather than acquired again. The derived `V22_PUBLIC` prerequisite makes D09 wait for that actual observation; it is not an extra automatically awarded deduction.
- Both B_PLAYBACK_RESPONSE choices remain free, preserve earlier B_PR_02 callbacks and select the correct later common/optional dialogue. All three optional scenes can be visited; none is required for completion. The departure makes an appointment only and does not acquire CH03 cargo evidence.
- H0–H4 use the accepted deterministic selectors, including missing-source priority, error-specific H3, interrupted-task hints and completed summaries. V02's hints distinguish missing progress, interrupted comparison, K06 and completed Q02. A visit hint never discloses the correction early.
- Source captions show the aligned syllable/nonverbal overlap and interruption. E11 has one track; E14 has the two compared tracks. These are caption diagrams, not generated measurements or a claim that an audio asset exists. Booth event states display microphone-input-only and local click-file output separately. Recorded P08 lines are labeled as recordings. E12's planned route is visible in its detail only after the source's tab-unfolding direction has actually been read. E13 and E17 have distinct clock/power views.
- People detail retains the heard original claim and links to the separate correction only after E15 is acquired. Task drafts, all six investigation tools, point accounting, save compatibility and response interruption use the shared runtime.

## Adaptations, risks and rollback

1. Inline source `If` annotations apply to their adjacent callback, not all following prose. The CH02 adapter limits them to the named callback utterances, preserving common continuation in both branches. Stage-entry K08 remains frozen when the later investigation order changes.
2. C_CH02_O2:n0009 combines an editorial instruction with an actual brake action. The runtime omits only the editorial introduction and retains “둘이 동시에 여백을 본다. 해금이 카트 브레이크를 직접 확인한다.” The canonical source is unchanged. Pure author instructions about mandatory clues are excluded from playback.
3. Additional UI-only errors distinguish swapped audio times, recording mistaken for direct contact and incorrect event ordering from the source's named wrong premises. They cost the same two points without playing an unrelated authored accusation. Exact source-defined errors retain their dialogue.
4. Child supervision follows actual handoff/return nodes. D10's suspended adult interview remains at the entrance with P01 supervised in the lounge; optional conversation access resumes after the interview, preventing an implicit round trip during suspension. O1 remains available before D10. Tests check every P01 speech and the suspended D10 position.
5. Caption widths encode order and overlap, not milliseconds. Real voice/audio production, source waveform assets, full portraits/locations and all evidence thumbnails remain open full-production work. These diagrams do not substitute for the remaining visual/audio requirements.

Rollback affects adapters, components, derived fixtures and validation records only. Raw returns, accepted sources and acceptance fingerprints remain untouched. No deployment or commit has occurred.

## Executed checks

From `project_01/game`:

| Check | Actual result |
| --- | --- |
| `node scripts/import-screenplay.mjs` | Ten accepted source files;170 scenes;2,258 utterances;52 evidence originals. Generated canonical data unchanged. |
| `node --test tests/opening.test.mjs tests/chapter-one.test.mjs tests/chapter-two.test.mjs` | 39 tests passed. CH02 traverses both Q01 routes × both prior recording choices × both apology choices × both D08/D09 orders, plus completion without optional scenes. Checks include per-line restore, source acquisition order, delayed correction/K awards, common/selected dialogue, named errors, missing prerequisites, H0–H4/V02 and supervised child speech. |
| `npx.cmd tsc --noEmit` | Passed after adding the merged feedback map's string index and optional recorded-label guard. |
| `npm.cmd run lint` | Final run passed: zero errors and three existing raw-image optimization warnings. Initial unused test binding removed. |
| `npm.cmd run build` | Final run passed after the caption sizing repair. Large client chunk, framework deprecation and route-classification notices remain. |
| `node tests/browser-ch02.mjs` | Final run passed all20 groups: six tasks at desktop1440×900 and touch phone390×844 at200% text; all tools, H4, exact draft restore, keyboard containment, six evidence acquisitions, correction-link gating, both apology choices and three saved event stages. No page errors. Captures and results are in `ch02-browser/`. |

Browser fixtures are reproducible reducer-play outputs, not forged knowledge or user saves. Generate them with PowerShell `$env:YEOWUL_WRITE_FIXTURES='1'; node --test tests/chapter-two.test.mjs`. The resulting `runtime-ch02-fixtures.json` is git-ignored. Use the installed Playwright Chromium and local dev preview at port5173.

Direct visual inspection separately covered the desktop comparison, correction and input/compare event screens, plus phone200% chronology, comparison and file-output event screens. Initial phone inspection found the overlap caption exceeding its fixed-width grid cell despite the outer no-overflow assertion passing. Changed caption tracks/cells to font-relative widths, added explicit horizontal-scroll guidance, and stacked source/output labels on narrow screens. Added a child-cell overflow assertion; the final20 browser groups passed and the corrected phone comparison/event captures were directly inspected again. This is author inspection, not independent play.

`git diff --check` passed. Neither accepted screenplay files nor the regenerated canonical JSON has a content diff. Windows line-ending conversion notices do not change these results.

## Remaining production

Next implement CH03, then CH04–CH06 and the epilogue, retaining all24 remaining required tasks and accepted dialogue. Complete current/historical NPC revisits, directional free travel, richer evidence filtering and all required art/audio/assets across the whole game. The runtime stopping at the CH02 appointment is a checkpoint, not an ending or reduced deliverable.

G2/G3 remain partial; G4 independent play is unverified; G5 delivery remains pending. Automated traversal does not establish fun, difficulty or first-reader comprehension. Planning/adaptation authored: this record and current checkpoints. Screenplay: existing accepted source, unchanged. Implementation: PR and CH01/CH02 core. Automated checks, direct visual inspection and independent play must remain distinct evidence classes.
