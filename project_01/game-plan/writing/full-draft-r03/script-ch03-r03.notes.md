# CH03 r03 revision notes

## Scope and base

- Base: `working-base/script-ch03-r02.ko.md` from YEOWUL-FULL-v3. Historical r02 notes/progress were not used as acceptance evidence.
- Working-base SHA-256 before r03 editing: `02cba69a157e6a57bb2ba21b05538e419ab2ff1eca7c370940c2f03724b90f86`.
- The supplied working-base already contains the bounded local consistency fixes from `10-local-fixes.json`; none were replayed or reverted.
- Accepted `05-accepted-pr-b01.ko.md` remains unchanged; SHA-256 `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45`.
- Focus findings addressed in this unit: F01 across all seven CH03 hint bundles, the named CH03 F02 live-claim/production-speech issues, and the CH03 cargo-box portion of F03.

## F01 — deterministic hint selection

Every CH03 hint bundle now contains a normative selector that returns exactly one Korean S line for each H0–H4 request. Missing knowledge prerequisites always outrank recent-error, interruption, or high-level answer text. Completion is handled only when the completion key itself exists. No selector concatenates multiple state lines.

### C_H_Q03

- KQ03 complete → `S_H_Q03_0091` at any requested level.
- Missing E20 → `S_H_Q03_0002`; otherwise missing E27 → `S_H_Q03_0003`, at any level.
- E20/E27 held and unsolved: H0 `0001`, H1 `0011` (interrupted `0012`), H2 `0021`, H3 `0032`, H4 `0041`.
- Recent `cart_photo_proves_corpse` with both sources held: H3/H4 → `0031`.
- Q03 remains legitimately solvable before D11/D12 geometry. The selector does not require K11/K12 and does not expose E24/S_Q03_v2 before success.

### C_H_D11

- K11 complete → `S_H_D11_0091`.
- Missing E20 → `0002`; missing E22 → `0003`, at any H level.
- All held: H0 `0001`, H1 `0011` (interrupted `0012`), H2 `0021`, H3 `0033`, H4 `0041`.
- Recent `shape_proves_body` / `shape_proves_no_body` at H3/H4 → `0031` / `0032` only after both sources are held.

### C_H_D12

- K12 complete → `S_H_D12_0091`.
- Missing E21 → `0002`; missing prior route context → `0003`, at any H level.
- All held: H0 `0001`, H1 `0011` (interrupted `0012`), H2 `0021`, H3 `0033`, H4 `0041`.
- Recent width/stair errors at H3/H4 select `0031` / `0032` only after prerequisites are held.

### C_H_V03

- V03 complete → `S_H_V03_0091`.
- Missing KQ03 → `0002`; missing K12 → `0003`, at any requested level.
- Ready but not joined: H0 `0001`, H1/H2 `0011`, H3 `0012`, H4 `0041`.
- Joined, supervision confirmed, route incomplete: H0/H1 `0012`; H2–H4 `0021`, or interrupted route `0022`.
- Arrived with opaque crate still sealed: every H0–H4 request → `S_H_V03_0031`; this line now names only container exterior/seal features before opening.
- Opened with partial acquisition: H0–H3 `0032`; H4 `0042`.

### C_H_D13

- K13 complete → `S_H_D13_0091`.
- Missing E24/KQ03 → `0002`; missing K12 → `0003`.
- V03 not completed → `0004`; opened visit interrupted with E23/E29 not yet acknowledged → `0012`.
- All required held: H0 `0001`, H1 `0011`, H2 `0021`, H3 `0033`, H4 `0041`.
- Recent `present_contents_prove_past_contents` / `engineer_escorts_continuously_after_24` at H3/H4 → `0031` / `0032`.
- A missing Q03 correction never routes directly to the crate opening that depends on it.

### C_H_D14

- K14 complete → `S_H_D14_0091`.
- Missing E25 → `0002`; missing E26 → `0003`, at any H level.
- `S_H_D14_0003` was rewritten so it no longer reveals “surviving bound interior leaves” before the opaque cargo box is opened. It now routes through Q03/route/seal/opening steps and explicitly refuses to name the contents early.
- E25/E26 held: H0 `0001`, H1 `0011` (interrupted `0012`), H2 `0021`, H3 `0032`, H4 `0041`.
- Recent `ash_title_proves_all_originals_destroyed` at H3/H4 → `0031`.

### C_H_D15

- K15 complete → `S_H_D15_0091`.
- Missing K13 → `0002`; missing K14 → `0003`; missing E24 → `0004`; missing E26/E30 after interrupted V03 → `0005`.
- All held: H0 `0001`, H1 `0011` (interrupted `0012`), H2 `0021`, H3 `0033`, H4 `0041`.
- Recent `cargo_clears_all_helpers` / `removal_proves_murder` at H3/H4 → `0031` / `0032`.
- E30 being held but unreadable is treated as a valid held state; no hint invents the hidden text.

## Representative selector walkthroughs

- Q03-before-geometry: E20/E27 held, K11/K12 absent, H4 → `S_H_Q03_0041`; this is legitimate because Q03 is intentionally eligible before geometry.
- Higher-level-before-acquisition: D14 H4 with E26 absent → `S_H_D14_0003`, not the all-held H4 conclusion.
- Recent-error + missing: D13 H4 after `present_contents_prove_past_contents` but with K12 missing → `S_H_D13_0003`, not `0031`.
- Sealed opaque crate: V03 H4 after arrival but before seal cutting → `S_H_V03_0031`; no ledger label, crease, bound leaves, or E30 content is revealed.
- Interrupted acquisition: V03 H4 after opening but before all four acknowledgements → `S_H_V03_0042`.
- Completed revisit: D15 any requested level after K15 → `S_H_D15_0091`.

## F02 — live claims and character speech

- `S_CH03_02_0005` retains its ID but no longer has P09 concede his later Q06 memory/source correction. He now owns only the public-copy provenance and the fact that he saw P04/P06 at the handoff; the time values are deferred to original comparison.
- `S_CH03_02_0081` now explicitly attributes the copied-time correction to P06, preventing P09's separate Q06 correction from being smuggled into a CH03 revisit.
- `S_CH03_04_0011` is now P06's believable defensive account: she accepts that she appears in the photo but resists having cargo contents/removal inferred before the challenge.
- `S_CH03_04_0040` is now P04's in-world boundary about what he personally saw/admitted, rather than a production-style statement that it is “not his role to correct” P06.
- `S_CH03_06_0005` no longer retrospectively admits that an original had been taken out “yesterday for easy copying.” It commits to current cabinet/custody handling only.
- P06's own copied-time correction remains exclusive to `S_Q03_v2`; P09's separate direct-interval/copier-memory correction remains reserved for Q06.
- Spoken-text audit for CH03 found no remaining actual utterance containing internal L/P/E/K identifiers or the targeted production phrases (`제작`, `엔진`, `분기`, `플래그`, `제출 조건`, `획득 처리`, `정답 문장`, `애니메이션`).

## F03 — cargo display and custody order

### C_CH03_05 physical viewing order

The sealed cargo box is treated as opaque.

1. Before seal cutting, P00/P07/P09 inspect only the **container exterior and seal number** against the pre-opening photograph.
2. P07 records the opening and cuts the seal.
3. E23 records the witnessed current contents.
4. E26 records the surviving bound ledger material after opening.
5. Only after the ledger is physically visible does the scene compare its outer label and folded-sheet crease to the pre-opening intake photograph, creating E29.
6. E30 is then observed still bound in the ledger, wet/stuck/unreadable, and is not detached.

The required evidence order remains `E23 → E26 → E29 → E30`. A mechanical check confirmed that `장부 외부 라벨`, `연속 주름`, and `접힌 두 장` no longer occur in the pre-opening portion of C_CH03_05.

### Evidence display cleanup in this chapter

- E24 remains the same evidence ID but its player-visible original is now an attributed Korean correction record with natural place names (`적재 데스크`, `동쪽의 덮인 경사로`, `호숫가 보관 창고`) instead of internal L06/L11/L12 prose.
- E24 acquisition/gating/provenance was moved to English non-player-facing metadata.
- E20–E23 and E25–E30 were checked for their first visible detail in CH03. They remain photos/observations/documents rather than editorial engine instructions; the opaque-box boundary above governs when interior details first become visible.
- Later global F03 work still has to audit the review's cross-file named evidence originals such as E08, E43, E49 and E50 and produce the all-52 first-visible-detail map.

## ID accounting

- Retained working-base S IDs: 260/260.
- New S IDs: none.
- Retired S IDs: none.
- Existing spoken/evidence text changed without ID reassignment: `S_CH03_02_0005`, `S_CH03_02_0081`, `S_CH03_04_0011`, `S_CH03_04_0040`, `S_CH03_05_0005`, `S_CH03_06_0005`, `S_H_D14_0003`, E24 player-visible text, and the C_CH03_05/V03 pre-opening descriptions.
- Selector metadata was added to all seven CH03 hint bundles without renaming their 35 H identities.

## Verification performed

- 260 S definitions / 260 unique IDs; no new or retired S IDs.
- Seven deterministic selectors present; every CH03 hint bundle still has exactly H0–H4.
- `S_Q03_v1` and `S_Q03_v2` each remain defined exactly once.
- E23/E26/E29/E30 heading order inside C_CH03_05 is preserved and strictly increasing.
- Pre-opening C_CH03_05 text contains no ledger outer-label/crease/folded-sheet inspection.
- Accepted PR SHA-256 remains unchanged.

## Final cross-file addendum

- F03 custody order remains: sealed opaque container exterior/number first, then opening, then E26/E29/E30 interior/book details. The bound original is never detached.
- Observable action text uses natural place names rather than L05/L06/L11/L12 codes.
- Q03 retains both early-before-geometry and later routes; its copied-time correction remains exclusive to `S_Q03_v2`.
