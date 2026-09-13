# CH06 r03 revision notes

## Scope and base

- Base: `working-base/script-ch06-r02.ko.md` from YEOWUL-FULL-v3. Historical r02 notes/progress were not treated as acceptance evidence.
- Working-base SHA-256: `1f288d63dc69e788a1facb3a46d91fccec44420e3783570c40faa7b306fc73ad`.
- The supplied working-base local repairs in `10-local-fixes.json` were preserved, including the direct P09 morning contact, cargo-shelter wording, already-cut seal/custody wording, kitchen copier location, no immediate-return promise, and natural location wording in the affected CH06 utterances.
- Accepted `05-accepted-pr-b01.ko.md` remains untouched.
- Focus findings addressed in this unit: F01 across all seven CH06 hint bundles; F02 named V06 production speech; F03 player-facing E49/E50 provenance/custody text; F04 final-briefing supervision; F05 recorder/ordinary-prop closure.

## F01 — deterministic hint selection

Every CH06 hint bundle now contains a normative selector that returns exactly one Korean S line per request. Completed states outrank all other overlays; missing knowledge/physical prerequisites outrank requested high hint levels, recent errors and interruption. A recent error is only selected when its prerequisite knowledge is actually held.

### C_H_V06

- D26 complete → `S_H_V06_0091` for any H0–H4.
- K25 missing → `S_H_V06_0001` at any requested level.
- K25 held but the next-morning direct P09 contact not yet confirmed → `S_H_V06_0002` at any level.
- Contact confirmed but P01 supervision not explicitly handed to P02 → `S_H_V06_0012`.
- Interrupted return/handoff → `S_H_V06_0013`.
- At L12 before E49: not begun → `S_H_V06_0021`; interrupted after setup → `S_H_V06_0022`.
- E49 held / E50 missing → `S_H_V06_0032` at any level.
- E49+E50 held / D26 incomplete: H0–H2 `S_H_V06_0042`; H3 `0031`; H4 `0041`.
- No selector path tells the player to wait in real time or repeat an already-completed opening animation.

### C_H_D26

- K26 complete → `S_H_D26_0091`.
- E49/unfolded view missing → `0002`; E50 missing → `0003`; E29 or E28 missing → `0004`, at every H level.
- All held: H0 `0001`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent label/profession error at H3/H4 → `0032`; interrupted all-held H4 may use `0042`.

### C_H_D27

- K27 complete → `S_H_D27_0091`.
- K26 missing → `0002`; E48 or E51 missing → `0003`, at every H level.
- All held: H0 `0001`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent printer-shift / all-pages-forged errors at H3/H4 → `0032` / `0033`; interrupted all-held H4 may use `0042`.

### C_H_Q06

- KQ06 complete → `S_H_Q06_0091`.
- K27 missing → `0002`.
- K27 held but E28 missing → `0003` at every H level.
- K27+E28 held but E51 missing → new safe line `S_H_Q06_0005` at every H level.
- With K27+E28+E51 and live `S_Q06_v1`: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent murder-scope / original-clock errors at H3/H4 → `0032` / `0033`; interrupted all-held H4 may use `0042`.
- The former combined E28/E51 text was split. Before Q06 success, no selector line discloses the 20:40–20:50 solo-copy interval, nonreturn or P03 exclusive access.

### C_H_D28

- K28 complete → `S_H_D28_0091`.
- K26/E49 missing → `0002`; E52 missing → `0003`; E13 or K23 missing → `0004`, at every level.
- All held: H0 `0001`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent walking-speed / copied-corroboration errors at H3/H4 → `0032` / `0033`; interrupted all-held H4 may use `0042`.

### C_H_D29

- K29 complete → `S_H_D29_0091`.
- Any K18/K19/K24 missing → `0001` at any level.
- K27 or KQ06 missing → `0003`; K28 missing → `0002`; any E10/E19/E46/E18 missing → `0004`.
- All held: H0 `0001`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent name-only / motive-or-copy-only / unsupported-conspiracy errors at H3/H4 → `0032` / `0033` / `0034`.
- This closes the review's specific hole: a high-level hint cannot reveal the later person-selection result while K28 or KQ06 is absent.

### C_H_D30

- K30 complete → `S_H_D30_0091`.
- Missing act/time support including K22/K23 → `0002` at any level.
- Missing coat/alibi support including K24/K28 → `0003`.
- Missing altered-copy support K27/KQ06 → `0004`.
- Missing another required earlier conclusion among K05/K10/K15/K20/K29 → `0001`.
- All prerequisites held: H0 `0001`, H1 `0011`, H2 `0021`, H3 `0031`; H4 `0041` for chronology-first or `0042` for stored concealment-first. Interrupted all-held H4 may use `0043`.
- Recent wrong-interval / wearer=holder / one-origin-corroboration / complicity-or-collateral errors at H3/H4 → `0032` / `0033` / `0034` / `0035`.

## Representative selector walkthroughs

- V06 H4 before the morning P09 contact → `S_H_V06_0002`, not the unfolding/originality answer.
- D26 H4 after E49 but before E50 → `S_H_D26_0003`.
- D27 H4 before E51 → `S_H_D27_0003`, even if a printer-error flag exists.
- Q06 H4 with E28 missing → `S_H_Q06_0003`; with E28 held but E51 missing → `S_H_Q06_0005`; neither reveals E52.
- D28 H4 after a walking-speed error but before E52 → `S_H_D28_0003`; missing Q06 correction outranks the recent-error overlay.
- D29 H4 with KQ06 missing → `S_H_D29_0003`; with KQ06 held but K28 missing → `S_H_D29_0002`.
- D30 H4 with K24 missing → `S_H_D30_0003`; a stored final-order preference does not bypass the coat/alibi prerequisite.
- Completed CH06 challenges return their `0091` line at every requested hint level.

## F02 — V06 production-language cleanup

- `S_H_V06_0002` retains its ID but no longer says that the player is about to enter a “scene.” It now states the actual authored next-morning direct P09 contact and where to resume.
- `S_H_V06_0022` no longer tells the player not to repeat an “animation.” It says the already-started custody/opening procedure need not be recreated and resumes from the physical unfolding step.
- Q06's live v1/v2 boundary is unchanged. The exact solo-copy/nonreturn correction remains exclusive to `S_Q06_v2`.

## F03 — E49/E50 visible evidence and custody

- E49 player-facing text no longer says `E30` or `UI`. It describes the same previously wet, folded lower counterpart in natural Korean, with the actual 20:14/20:24 fields and the agreed privacy treatment.
- E50 player-facing text no longer cites `E49/E30/E29`. It describes the bound-leaf, adjacent serial, perforation/tear-line/fold and pre-opening seal-photo match directly.
- Evidence order remains E49 first, E50 second. The lower counterpart is never detached from the ledger.
- The supplied local fixes remain: the old cargo-box seal was cut at CH03 opening; CH06 uses the retained seal photo/custody record and intact book binding rather than inventing an intact old seal.

## F04 — final briefing supervision

- P01 remains with P02 in L02 throughout C_CH06_07/D30; P01 is not brought into the formal briefing and no unlisted supervisor is invented.
- `S_D30_0062` retains its ID but its speaker changes from off-scene P02 to present P07. P07 states that P02's actual loan responsibility remains in the record without calling her away from P01.
- D30 Context and C_CH06_07 Cast metadata were aligned to that actual path. C_CH06_08 still performs the explicit P00↔P02 reunion/handoff afterward.

## F05 — ordinary recorder closure

- C_CH06_O1 no longer invents an automatic listening mode, sound classifier, counter or speech-exclusion capability.
- P01 manually replays the one chair-friction file she actually recorded with P05's permission in PR09.
- No new sound is automatically detected or counted; no existing sample is reset, deleted or re-recorded.
- P01 deliberately makes no new recording of the current conversation. This remains separate from the later B_SOUND consent branch and creates no new consent state.
- Existing IDs `S_CH06_O1_0101..0108` are retained with revised wording/actions.

## ID accounting

- Retained working-base S IDs: 267/267.
- New S IDs: `S_H_Q06_0005` only.
- Retired S IDs: none.
- `S_D30_0062` retains its identity/function as the collateral-responsibility correction but uses an actually present speaker.
- All 35 existing CH06 H identities remain; selector metadata does not rename them.

## Verification performed

- 24 CH06 C headings remain present.
- 268 S definitions / 268 unique IDs; no duplicate S ID.
- Seven deterministic selectors present; all seven bundles retain H0–H4 (35 H headings).
- Every S ID referenced by the seven selector tables exists in the screenplay.
- `S_Q06_v1` and `S_Q06_v2` remain defined exactly once; pre-v2 player-visible dialogue/hints do not disclose the solo-copy/nonreturn correction.
- Q06 missing-E28 and missing-E51 states resolve to different safe S lines.
- D30 formal-briefing segment contains no P02 speaker; P02 remains the off-scene P01 supervisor until C_CH06_08.
- C_CH06_O1 contains no automatic `듣기` mode/counter/classifier behavior and explicitly reuses the existing PR09 chair sample.
- The CH06 local-fix anchors checked in `10-local-fixes.json` remain represented, including the direct contact, cargo-shelter location, cut-seal history and separate kitchen copier wording.
- E49/E50 visible evidence bodies no longer expose their named internal evidence IDs/UI wording.
- Accepted PR file was not edited.

## Final cross-file addendum

- F04 formal-briefing supervision remains fixed: P01 stays with P02 in L02; P07 supplies the relevant collateral-responsibility response in D30.
- F05 recorder closure remains manual: P01 replays the existing PR09 chair sample and creates no automatic classifier/counter or new recording.
- F03 display cleanup: E52 uses natural `주방 일반 복사기` and `공개용 인계 사본` wording rather than L05/E27 codes.
- Both D30 valid presentation orders remain authored and resume-safe.
