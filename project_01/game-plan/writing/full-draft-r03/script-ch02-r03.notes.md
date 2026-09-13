# CH02 r03 revision notes

## Scope and base

- Base: `working-base/script-ch02-r02.ko.md` from YEOWUL-FULL-v3, not the historical r02 notes.
- Working-base SHA-256 before r03 editing: `0f74f9a66efabe40c97165219d9160e90ad7ac92b49b917e1a5edd4fdd2dfefc`. The supplied working-base already contains the bounded local fixes from `10-local-fixes.json`; none were replayed or reverted.
- Accepted `05-accepted-pr-b01.ko.md` remains unchanged; SHA-256 `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45`.
- Focus findings addressed in this unit: F01 across all seven CH02 hint bundles and the named F02 production-speech line in `S_CH02_08_0001`.

## F01 — deterministic hint selection

Every CH02 hint bundle now has a normative selector that returns exactly one Korean S line for every H0–H4 request. Completion/known-later state is handled first where appropriate, then missing knowledge prerequisites, then an eligible recent-error/interruption overlay, then the requested all-held level. Missing knowledge always outranks a recent-error answer, so a high-level request cannot expose unacquired material.

### C_H_V02

- Q02 already corrected, any H0–H4 → `S_H_V02_0044`.
- K06 complete but Q02 unresolved → `S_H_V02_0043`.
- Appointment not started / E12 missing → `S_H_V02_0012` at any requested level.
- E12 held but E11 missing → `S_H_V02_0021`; E11 held but E14 missing → `S_H_V02_0022`, or `S_H_V02_0032` if comparison was interrupted.
- E11/E14 held with K06 unresolved → H0 `0003`, H1 `0011`, H2 `0023`, H3/H4 `0031`.

### C_H_D06

- K06 complete → `S_H_D06_0042` for any requested level.
- Missing prerequisite priority at every level: E12 `S_H_D06_0001` → E11 `0002` → E14 `0003`.
- All held: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0011`, H4 `0041`.
- Named recent errors at H3/H4 select `0031` / `0032` / `0033`, only after all sources are held.
- `S_H_D06_0043` retains its ID and now says “결론” rather than “정답 문장”; it remains acquisition-only if encountered in visible text.

### C_H_Q02

- E15/KQ02 complete → `S_H_Q02_0042` for any H0–H4.
- Before success, missing E12/E14 → `S_H_Q02_0002`; otherwise missing K06 → `S_H_Q02_0001`.
- All pre-success prerequisites held: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0003`, H4 `0041`.
- Recent `console_proves_murder` / `technician_mimicked_voice` at H3/H4 select `0031` / `0032` only when prerequisites are held.
- Post-success E15 summary `S_H_Q02_0022` is never selected before Q02 success.

### C_H_D07

- K07 complete → `S_H_D07_0042` at any level.
- Missing E11 → `0001`; missing E15/Q02 correction → `0002`; missing E12 → `0003`, regardless of requested level.
- All held: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0032`, H4 `0041`.
- Recent `file_time_is_death_time` at H3/H4 → `0031` only after all prerequisites are held.

### C_H_D08

- K08 complete → `S_H_D08_0042` at any level.
- New safe missing-K07 route: `S_H_D08_0002`. It directs the player to finish the 20:30 live-location separation before using the later direct-contact records and does not reveal the 20:10–20:12 answer.
- Then missing E16 → `0001`; missing E13 → `0012`.
- All held: H0 `0013`, H1 `0011`, H2 `0021`, H3 `0011`, H4 `0041`.
- Recent named errors select `0031` / `0032`; interrupted all-held H3/H4 selects `0033`.

### C_H_D09

- K09 complete → `S_H_D09_0042` at any level.
- Missing E12 → `0001`; missing E17 → `0012`; missing/reindex-incomplete E18 → `0013` at any requested level.
- All held: H0 `0014`, H1 `0011`, H2 `0021`, H3 `0011`, H4 `0041`.
- Named recent errors select `0031` / `0032`; interrupted all-held H3/H4 selects `0033`.

### C_H_D10

- K10 complete → `S_H_D10_0042` at any level.
- Missing K05 or K07 → `S_H_D10_0013`; then missing K08 → `0001`; missing K09 → `0012`.
- All held: H0 `0014`, H1 `0011`, H2 `0021`, H3 `0011`, H4 `0041`.
- Named recent errors select `0031` / `0032`; interrupted all-held H3/H4 selects `0033`.

## Representative selector walkthroughs

- Higher-level-before-acquisition: D06 H4 with E14 missing returns `S_H_D06_0003`, not `S_H_D06_0041`.
- Recent-error + missing: Q02 H4 after `console_proves_murder` but with E14 missing returns `S_H_Q02_0002`, not `S_H_Q02_0031`.
- Missing dependency discovered during later task: D08 H4 with K07 missing returns the new `S_H_D08_0002`.
- Interrupted: D09 H4 with all three sources held and interrupted drafting returns `S_H_D09_0033`.
- Completed: D10 any requested level after K10 returns `S_H_D10_0042`.
- Partial V02: H4 with only E12 held returns `S_H_V02_0021`; H4 after E11 is opened but before E14 is complete returns `S_H_V02_0022` or interrupted `0032`.

## F02 — visible production speech

- `S_CH02_08_0001` retains its ID but no longer says the photo “starts the next story” or that opening it obliges completion of a content block. P09 now gives an in-world reason: seeing the photo alone could bias the group toward the cover shape, so she wants the shooting position and cart route checked with it.
- The CH02 spoken-text audit found no remaining visible `제작/엔진/분기/플래그/제출 조건/획득 처리/정답 문장/애니메이션` phrasing after the minor `S_H_D06_0043` wording cleanup.
- Q02’s last pre-success help still asks only the contradiction; it does not reveal the manual-playback/permission confession before `S_Q02_v2`.

## ID accounting

- Retained working-base S IDs: 343/343.
- New S IDs: `S_H_D08_0002`, `S_CH02_08_0014`, `S_CH02_08_0015`, `S_CH02_08_0016`.
- Retired S IDs: none.
- Existing spoken text changed in this unit: `S_CH02_08_0001`, `S_H_D06_0043`.
- Selector metadata was added to all seven CH02 hint bundles without renaming their 35 H identities.

## Verification performed

- 347 S definitions / 347 unique IDs in the r03 CH02 file.
- Seven deterministic selectors present; each bundle still has exactly five H headings.
- Script-state walkthroughs covered missing→held, H4-before-acquisition, recent-error+missing, interrupted comparison, and completed revisit states.
- Q02 pre-success selector cannot select post-success E15 summary text.
- The specified F02 line was read without Context and now functions as ordinary P09 dialogue.

## Final cross-file addendum

- F04 handoff repair: after C_CH02_08's appointment, P00 visibly returns to L02 and P02 hands P01 back before CH03_01 later requests a new handoff. New lines: `S_CH02_08_0014..0016`.
- D08↔D09 remains genuinely order-independent; neither success auto-fills the other.
- F03 display cleanup: E11/E14 player-facing text uses natural names/source descriptions. The CH02 E18 section is now explicitly a read-only revisit of the PR13 evidence rather than a second formal E18 definition.
- No Q02 pre-success line volunteers the manual-replay/permission correction; the exclusive correction remains at `S_Q02_v2`.
