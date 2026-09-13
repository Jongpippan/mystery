# CH05 r03 revision notes

## Scope and base

- Base: `working-base/script-ch05-r02.ko.md` from YEOWUL-FULL-v3. Historical r02 notes/progress were not treated as acceptance evidence.
- Working-base SHA-256 before r03 editing: `74012a7c55a29a93be57c455f5b08c44395d3d89777c68688867d6cf9b9056af`.
- The supplied working-base local repairs from `10-local-fixes.json` were preserved, including the body-linked E44 recovery wording and the PR13/L03 public-observation location corrections.
- Accepted `05-accepted-pr-b01.ko.md` remains untouched.
- Focus findings addressed in this unit: F01 across all seven CH05 hint bundles, F03 player-facing E43/E45/E47 evidence text, F04 CH05_08→CH06_01 morning-contact route, and F05 CH05_O3 chair continuity.

## F01 — deterministic hint selection

Every CH05 hint bundle now contains a normative selector that returns exactly one Korean S line per request. Missing prerequisites always outrank high requested H levels, recent-error overlays, and interrupted drafts. Completed states return only the completed/revisit line.

### C_H_V05

- V51 complete → `S_H_V05_0091` for any H0–H4.
- Visit not yet requested → `S_H_V05_0002` at any level.
- Visit requested but P01 supervision is not explicitly with P02 → `S_H_V05_0011` at any level.
- Interrupted safe adult route → `S_H_V05_0022`.
- E40 missing → `S_H_V05_0032`; else E41 missing → `S_H_V05_0033`; else E42 missing → `S_H_V05_0042`, independent of requested H level.
- With E40/E41/E42 held and V51 still active: H0 `0001`, H1 `0012`, H2 `0021`, H3 `0031`, H4 `0041`.
- H4 does not reveal Q05's correction; it tells the player to complete that live challenge before the safe action comparison.

### C_H_D21

- K21 complete → `S_H_D21_0091`.
- Missing E40 → `0002`; missing E42 → `0003`, at every H level.
- With both held: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent identity / nothing-visible errors at H3/H4 → `0032` / `0033`.

### C_H_Q05

- KQ05 complete → `S_H_Q05_0091`.
- Missing E41 → `0002`; missing K21 → `0003`, at every H level.
- With E41+K21 and the live v1 claim: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent same-witness-as-two / guessed-color errors at H3/H4 → `0032` / `0033`.
- Interrupted written question may use `0042` only when prerequisites are already held. No selector line leaks `S_Q05_v2`.

### C_H_D22

- K22 complete → `S_H_D22_0091`.
- Any E42/E43/E45 missing → `S_H_D22_0002` for any requested level.
- All held: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent gate-proves-push / test-is-past errors at H3/H4 → `0032` / `0033`.

### C_H_D23

- K23 complete → `S_H_D23_0091`.
- Missing E43 → `0002`.
- Missing any required cue/recovery/clock-comparison source → `0003`.
- All held: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent outage-only / 20:30-live errors at H3/H4 → `0032` / `0033`.

### C_H_D24

- K24 complete → `S_H_D24_0091`.
- Any E44/E46/E47/E10 missing → `0002` at every level.
- All held: H0 `0003`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent later-holder / silhouette-color errors at H3/H4 → `0032` / `0033`.

### C_H_D25

- K25 complete → `S_H_D25_0091`.
- Missing an earlier motive/action/time/coat-chain conclusion → `0002` at every level.
- Missing E27 or the already-secured but still unread E30 bound original → `0003` at every level. This line does not reveal E30's later readable times.
- All prerequisites held: H0 `0004`, H1 `0011`, H2 `0021`, H3 `0031`, H4 `0041`.
- Recent disputed-copy-as-fact error at H3/H4 → `0032`.

## Representative selector walkthroughs

- D21 H4 with E40 absent → `S_H_D21_0002`, not the all-held visible/not-visible answer.
- Q05 H4 with E41 held but K21 absent → `S_H_Q05_0003`; the corrected witness account remains unknown.
- D22 H4 before Q05/E43 → `S_H_D22_0002`; it does not invent the later contact sequence.
- D23 H4 after the 20:30-live error but without E43 → `S_H_D23_0002`; missing witness correction outranks the recent-error overlay.
- D25 H4 with the bound original secured but an earlier action/time conclusion missing → `S_H_D25_0002`; H4 never jumps to the next-day original-times conclusion.
- Completed D24 at any level → `S_H_D24_0091`.

## F03 — evidence display cleanup

- The supplied E44 local repair is preserved exactly in substance: the red strip is recorded as recovered with P08's body from the empty pool, then physically matched to the red raincoat; wearer identity remains a separate question.
- E43 no longer shows internal `E41` provenance or `E43/KQ05 acquired` text in the player-facing record. It now describes the same-witness relationship in natural Korean; internal acquisition/provenance is English metadata.
- E45 no longer says `P05의 E43` or `E12/E17/E18` in the visible evidence body. It describes the corrected witness account and previously established live cue/power/recovery records naturally, with internal links in English metadata.
- E47 player-facing text no longer exposes the internal `L08` place code; it says `서비스 접속부 랙`.
- No new forensic test, witness, corpse movement, time source, or evidence object was introduced.

## F04 — morning contact route

- CH05_08 previously promised that P07 would receive P09's message first and relay it to P00, while working-base CH06_01 actually begins with P09 calling P00 directly.
- `S_CH05_08_0011` retains its ID but now records the authored route: P07 asks P09 to contact `{playerName}` directly when the bound page is safe to unfold.
- This matches the existing CH06_01 phone contact and avoids an invisible relay/new messenger step.

## F05 — ordinary chair continuity

- C_CH05_O3 no longer conjures P08's distinctive `임시 수신함` chair into L02.
- P00 and P02 instead look at the already-held recovery photograph from the L03/north-window evidence line; the chair is visible in that photo while remaining under the existing scene/recovery history.
- The grief beat is preserved: P02 remembers P08 refusing to sit in his own improvised inbox, and P00 recalls the first encounter at the window-side chair.
- No second identical chair, undocumented movement, or custody event is created.
- Existing IDs `S_CH05_O3_0001..0004` are retained.

## ID accounting

- Retained working-base S IDs: 209/209.
- New S IDs: none.
- Retired S IDs: none.
- Existing S lines changed without ID reassignment: `S_CH05_08_0011`, `S_CH05_O3_0001`, `S_CH05_O3_0002`, `S_CH05_O3_0003`, `S_CH05_O3_0004`.
- Selector metadata was added to all seven CH05 hint bundles without renaming the 35 H identities.

## Verification performed

- 24 CH05 C headings remain present.
- 209 S definitions / 209 unique IDs; no new or retired S IDs.
- Seven deterministic selectors present; all seven hint bundles retain H0–H4 (35 H headings).
- `S_Q05_v1` and `S_Q05_v2` remain defined exactly once.
- All CH05 entries from `10-local-fixes.json` remain represented; the later `{playerName}` local fix intentionally supersedes its intermediate `여백 씨` repair.
- The old L02 physical-chair staging is absent; the replacement explicitly uses the existing recovery photo.
- The obsolete P07-relay promise is absent; the direct-P09-contact setup is present.
- Player-facing E43/E45 no longer expose their named internal evidence IDs.
- Accepted PR file was not edited.

## Final cross-file addendum

- F04 direct-contact continuity remains: P09 is the authored next-day contact route into CH06; no unseen P07 relay is promised.
- F05 chair continuity remains: C_CH05_O3 uses the existing L03 recovery photo instead of moving P08's distinctive chair into L02.
- F03 display cleanup: E40 names 봉만실/소해금 and the pool-landing sightline in natural language; the working-base E44 body-linked recovery fix remains intact.
- Q05 correction remains exclusive to `S_Q05_v2`.
