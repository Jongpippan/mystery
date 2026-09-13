# CH01 r03 revision notes

## Scope and base

- Base: `working-base/script-ch01-r02.ko.md` from YEOWUL-FULL-v3, not the historical r02 notes.
- The working-base SHA-256 before r03 editing was `2a73932f508baffbcb12476c142396b94bf6a6bab7d4ef68c3703a520916e233`, matching the packet inventory. No local-fix operation was replayed; the supplied working-base was copied byte-for-byte before focused edits.
- Accepted `05-accepted-pr-b01.ko.md` remains unchanged; verified SHA-256 `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45`.
- Focus findings addressed in this unit: F01 across all seven CH01 hint bundles; F02 early-Q01 live-state conflict and one production-style revisit line.

## F01 — deterministic hint selection

Every CH01 hint bundle now contains a normative deterministic selector. One hint request returns exactly one Korean S line. Priority is explicit: completion first, then missing knowledge prerequisites, then eligible recent-error handling, then the requested held-source level. Interruption preserves the held/missing state and never concatenates another overlay. Missing knowledge always beats a recent-error answer.

### C_H_D01

- Any H0–H4 with E05 missing → `S_H_D01_0001`; with E03 missing → `S_H_D01_0002`.
- All held → H0 `S_H_D01_0003`, H1 `S_H_D01_0011`, H2 `S_H_D01_0021`, H3 `S_H_D01_0032`, H4 `S_H_D01_0042`.
- Recent `moving_window_or_door` with all sources held and H3/H4 → `S_H_D01_0033`.
- Completed K01, any requested level → `S_H_D01_0043`.
- `S_H_D01_0041` was retained but rewritten as a safe acquisition-only line; it no longer exposes x7/x6/x9 before E03/E05 are held.

### C_H_D02

- Missing K01/E04/E05 at any requested level → `S_H_D02_0001` / `0002` / `0003` in prerequisite order.
- All held → H0 `0004`, H1 `0011`, H2 `0021`, H3 `0032`, H4 `0042`.
- Recent named errors at H3/H4 → `0033` or `0034`, but only after prerequisites are held.
- Completed K02 → `0043` for any requested level.
- `S_H_D02_0041` now only directs acquisition and does not reveal the 19:40–19:46 joined answer while a source is missing.

### C_H_V01

- Not joined, completed, and interrupted-at-x6 each have a single mapping for every H0–H4 request.
- Representative interrupted trace: H4 while saved at x6 → `S_H_V01_0043`; it resumes at x6 and restores x9 instead of replaying the appointment.
- Defensive inconsistent-resume guards reuse `S_H_V01_0022`/`0023` if E04/E05 is unexpectedly absent; these guards do not create V01 eligibility.

### C_H_Q01 — both proof routes

- Completed/E08-held, any requested level → `S_H_Q01_0044`.
- Early-photo route before E10 is held, even if H4 is requested → `S_H_Q01_0001`; no correction times or face/gap facts are exposed.
- Standard route missing E06/E07 → `S_H_Q01_0002`; standard route missing K02 → `S_H_Q01_0003`.
- Route A complete: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0032`, H4 `0042`.
- Route B complete: H0 `0004`, H1 `0011`, H2 `0022`, H3 `0032`, H4 `0043`.
- If both are complete, the selector preserves the route by which the player is currently presenting the proof; it does not concatenate both final answers.
- Recent `uncertainty_proves_complicity` uses `S_H_Q01_0033` only when a valid route is already complete.

### C_H_D03 / D04 / D05

- D03 prerequisite priority at any level: missing K01 `S_H_D03_0001` → K02 `0002` → E08 `0003` → E07 `0004`; completed K03 → `0043`.
- D03 H2 uses `S_H_D03_0022` only when direct E10/E18 support is actually held; otherwise `0021`.
- D04 prerequisite priority: K03 `S_H_D04_0001` → K01 `0003` → E09 `0002`; completed K04 → `0043`.
- D05 prerequisite priority: K02 `S_H_D05_0001` → K03 `0002` → K04 `0003`; completed K05 → `0043`.
- Their retained H4 missing-source lines (`S_H_D03_0041`, `S_H_D04_0041`, `S_H_D05_0041`) were rewritten to acquisition-only language, so requesting H4 early does not leak the later conclusion.
- Representative `recent-error + missing` trace: D05 with recent `collective_guilt` but K04 missing returns `S_H_D05_0003`, not `S_H_D05_0032`.

## F02 — live Q01 state

- `C_CH01_03` now selects either unresolved `S_CH01_03_0010..0011` or already-corrected `S_CH01_03_0021..0022`; they no longer run as common text followed by a corrective paragraph.
- `C_CH01_04` likewise gates `S_CH01_04_0019` to unresolved Q01 only. Early success goes directly to `S_CH01_04_0021..0022`.
- `S_Q01_0091` retains its ID but now states a believable investigative boundary: if P02 has no further memory, P00 will not fill the unobserved interval by repeated questioning. It no longer speaks the production rule that no new time/person may be added.
- The sole `S_Q01_v1`/`S_Q01_v2` definitions and their evidence effects were not moved or duplicated.

## ID accounting

- Retained working-base S IDs: 437/437.
- New S IDs: none.
- Retired S IDs: none.
- Changed existing utterance text in this unit: `S_H_D01_0041`, `S_H_D02_0041`, `S_H_D03_0041`, `S_H_D04_0041`, `S_H_D05_0041`, `S_Q01_0091`.
- Existing IDs whose branch placement was corrected without changing their spoken text: `S_CH01_03_0010`, `S_CH01_03_0011`, `S_CH01_03_0021`, `S_CH01_03_0022`, `S_CH01_04_0019`, `S_CH01_04_0021`, `S_CH01_04_0022`, `S_CH01_04_0023`, `S_CH01_04_0024`.

## Verification performed

- 437 S definitions / 437 unique IDs.
- Script-state walkthroughs covered: D01 H4-before-E05, D01 all-held H4, D02 recent-error+missing, Q01 early-photo missing→held, Q01 standard route, interrupted V01 at x6, D03 interrupted/missing, D04 completed, D05 recent-error+missing, and completed-hint revisit.
- The five rewritten missing-source H4 lines were checked not to contain their later joined conclusions.
- Early-Q01 branch ordering was asserted so unresolved and corrected lines are mutually exclusive in CH01_03 and CH01_04.

## Final cross-file addendum

- F04 path repair: C_CH01_05 now starts from the actual post-C_CH01_04/V01 state in L03, with P01 already back under P00 supervision, then moves to L02. It no longer pretends the party has just returned from the earlier L04 sightline walk.
- F03 display cleanup: E08 names 봉만실 rather than exposing P02; E10 names 여백 rather than P00. Observable action text no longer exposes internal P/L/E/K/B/C/UI codes.
- No new or retired CH01 S IDs were needed for these final continuity/display repairs.
