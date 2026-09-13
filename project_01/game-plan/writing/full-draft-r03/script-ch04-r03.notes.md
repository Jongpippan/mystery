# CH04 r03 revision notes

## Scope and base

- Base: `working-base/script-ch04-r02.ko.md` from YEOWUL-FULL-v3. Historical r02 notes/progress were not used as acceptance evidence.
- Working-base SHA-256 before r03 editing: `3f13a80795c2cafb50477ad13a9d09936c4ac341ca1b3f73871ee8cd18903ba5`.
- The supplied working-base already contains the bounded local consistency fixes from `10-local-fixes.json`; none were replayed or reverted.
- Accepted `05-accepted-pr-b01.ko.md` remains unchanged.
- Focus findings addressed in this unit: F01 across all seven CH04 hint bundles, the named F02 production-speech line `S_CH04_O2_0091`, and the F05 CH03_08 → CH04_01 continuity issue.

## F01 — deterministic hint selection

Every CH04 hint bundle now contains a normative selector that returns exactly one Korean S line for each H0–H4 request. Missing prerequisites outrank recent-error/interruption overlays and all-held answer text. Completion lines are selected only after the corresponding completion key exists.

### C_H_V04

- Before joining the appointment, any requested level → `S_H_V04_0001`.
- After joining, if any E31–E34 purpose original is missing, any level → `S_H_V04_0002`.
- With E31–E34 held while the staff-scope comparison is still active: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Interrupted purpose reading may use `0041` at H1–H4; this never skips a missing unopened original.
- After the staff-scope work, if the later E35/E37 transaction packet is the missing next acquisition, any level → `0032`.
- After the V04 acquisition chain has opened the required purpose/transaction material, any level → `0091`.
- Purpose-missing and transaction-missing lines are mutually exclusive; the selector never concatenates them.

### C_H_D16

- K16 complete → `S_H_D16_0091`.
- Any E31/E32/E33/E34 missing → `0002` at every requested level.
- All held: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent same-scope/all-forged errors at H3/H4 → `0032` / `0033`, only after all four originals are held.
- Interrupted all-held draft at H1–H4 may use `0042`.

### C_H_D17

- K17 complete → `S_H_D17_0091`.
- Missing K16, E33, E34 or the documented E26 custody view → `0002` at any level.
- All held: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent handwriting/tear-murderer errors at H3/H4 → `0032` / `0033`.
- Interrupted all-held comparison at H1–H4 may use `0042`.
- No selector line asks the player to move the wet bound original from custody.

### C_H_Q04

- KQ04 complete → `S_H_Q04_0091`.
- Missing K17/E31/E34 → `0002` at any level.
- Live v1 with all prerequisites: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent `owner_authorized_no_loan` at H3/H4 → `0032`.
- Interrupted all-held challenge at H1–H4 may use `0042`.
- No pre-success selector line reveals the delegation/assembly/no-waiver-meeting facts first disclosed by `S_Q04_v2` / E36.

### C_H_D18

- K18 complete → `S_H_D18_0091`.
- Missing E35 or E37 → `0002` at any level.
- Transaction sources held but K16 or E36 missing → `0003` at any level.
- All held: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent contact-only / pledge-equals-receipt / same-origin errors at H3/H4 → `0032` / `0033` / `0034`.
- Interrupted all-held draft at H1–H4 may use `0042`.

### C_H_D19

- K19 complete → `S_H_D19_0091`.
- Any E19/E37/E38/E39/K18 missing → `0002` at any level.
- All held: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent rudeness/murder-plan errors at H3/H4 → `0032` / `0033`.
- Interrupted all-held draft at H1–H4 may use `0042`.

### C_H_D20

- K20 complete → `S_H_D20_0091`.
- Any K16/K17/K18/K19 missing → `0002` at any level.
- All four held: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent one-person/finance-proves-push errors at H3/H4 → `0032` / `0033`.
- Interrupted all-held matrix at H1–H4 may use `0042`.

## Representative selector walkthroughs

- Higher-level-before-acquisition: D18 H4 with E35 absent → `S_H_D18_0002`, not the all-held diversion conclusion.
- Recent-error + missing: D17 H4 after the handwriting error but without the E26 custody view → `S_H_D17_0002`, not `0032`.
- Interrupted live challenge: Q04 H4 with K17/E31/E34 held and an interrupted question → `S_H_Q04_0042`; with any prerequisite missing, `0002` still wins.
- Completed revisit: D20 any H level after K20 → `S_H_D20_0091`.
- V04 transition: after E31–E34 are held and staff scope is settled, but before E35/E37 are collected, even H4 → `S_H_V04_0032`.

## F02 — production speech

- `S_CH04_O2_0091` retains its ID but no longer tells the player that a “display-method choice” changes only presentation while facts stay fixed.
- The revisit now states the actually chosen joint-annotation practice in-world: originals remain unchanged and each participant adds only their own scope/unknown/responsibility note.
- CH04 spoken-text scan found no targeted production terms or internal C/E/K/B/R/L/P identifiers in actual utterances.

## F05 — CH03_08 → CH04_01 continuity

- C_CH03_08 already removed the `직원 대표석` label and renamed the shared surface `원본 대조 자리`.
- C_CH04_01 now remembers that exact settled state. The `원본 대조 자리` note remains on the table; P02 explicitly remembers removing `대표석` and does not recreate it.
- Existing S IDs `S_CH04_01_0001..0008` are retained while their dialogue continues the prior scene instead of restarting the same argument.
- The purpose of the meeting is unchanged: each adult presents and explains their own original rather than allowing a representative to substitute for others.

## ID accounting

- Retained working-base S IDs: 215/215.
- New S IDs: none.
- Retired S IDs: none.
- Existing lines changed without ID reassignment: `S_CH04_01_0001`, `S_CH04_01_0002`, `S_CH04_01_0003`, and `S_CH04_O2_0091`.
- Selector metadata was added to all seven CH04 hint bundles without renaming their 35 H identities.

## Verification performed

- 24 C headings remain present and unique.
- 215 S definitions / 215 unique IDs; no new or retired S IDs.
- Seven deterministic selectors present; every CH04 hint bundle still has exactly H0–H4.
- `S_Q04_v1` and `S_Q04_v2` each remain defined exactly once.
- Pre-success Q04 text was checked for the exclusive delegation/assembly/no-waiver-meeting correction; those facts first appear in `S_Q04_v2`.
- Actual utterance scan found no targeted production terms and no internal identifiers.
- Accepted PR file was not edited.

## Final cross-file addendum

- F05 continuity remains fixed: CH04_01 remembers CH03_08's settled `원본 대조 자리` rather than restarting a representative-chair dispute.
- F03 player-facing cleanup: E34 refers to the problematic waiver compilation naturally rather than E33; E36 acquisition routing is metadata, not visible evidence prose.
- Q04 exclusive no-waiver-meeting/delegation correction remains at `S_Q04_v2`.
