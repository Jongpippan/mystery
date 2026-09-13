# Author notes — script-ch01-r02.ko.md

## Packet / status

- Packet: `YEOWUL-FULL-v2`.
- Revision: `r02`.
- Delivery status: **draft; CH01 revision complete inside the still-incomplete full r02 assignment**.
- Fixed accepted `05-accepted-pr-b01.ko.md` is not modified.
- Baseline under revision: `received-r01/script-ch01-r01.ko.md`.

## Assigned coverage

- Core: `C_CH01_01..08`.
- Optional: `C_CH01_O1..O3`.
- Tasks: `C_D01..D05`, `C_Q01`.
- Hints/visit hint: `C_H_D01..D05`, `C_H_Q01`, `C_H_V01`.
- Actual C coverage in r02: **24/24**, each once.
- All 24 C now have a local `Context` covering place/cast/entry/exit/E-S-K-B/effects/repeat-resume at the level relevant to that scene.

## Editorial findings repaired in this file

### R01 — visible production language

- Removed route IDs such as `R05`/`R08` from spoken Korean in the adult route walk, D04 and H_D04. Characters now describe the actual guest door, service junction and pool-landing route.
- Removed engine-like spoken wording such as “획득한 것으로 처리” and several task-title/self-referential phrases. Internal IDs remain only in English metadata.
- Preserved useful physical terminology where it is observed in-world: the 6m/9m stops, fixed north window, fixed desk lamp and locked service-side strip.

### R02 — Q01 exclusive correction

- Sole live initial statement remains `S_Q01_v1` in `C_CH01_02`.
- Last pre-success clarification is `S_Q01_0002`: P02 **still defends** that two similar sightings mean the person remained there; it no longer admits the exclusive facts.
- First exclusive disclosure remains the sole `S_Q01_v2` inside `C_Q01`: approximately 20:08 / 20:25, no face identification, no continuous watch.
- Early route `E10+E18` and standard route `E06+E07+K02` both remain valid and converge on one correction. Early success does not skip D01/D02/V01.
- Current revisits use the corrected account; they do not reactivate `S_Q01_v1`.

### R03 — actual state-selected hints/retries

The seven CH01 hint bundles all retain H0–H4 and now map missing/held/recent-error/interrupted/completed states to actual text rather than concatenating incompatible states.

- `C_H_D01`: missing E03/E05 vs held geometry; recent wrong-window/wrong-coordinate premise; K01-complete return.
- `C_H_D02`: missing K01/E04/E05 vs held work history; separate recent `fresh_track_dates_exact_move` and `culprit_moved_alone`; K02-complete return.
- `C_H_V01`: pre-join, E04/E05 missing, active supervised test, interrupted-at-x6 resume, restored-x9/completed revisit.
- `C_H_Q01`: early-photo-route available/missing vs window-route available/missing; recent `uncertainty_proves_complicity`; already-corrected return. Hints do not quote the unseen v2 correction.
- `C_H_D03`: K01/K02/E07/E08 missing variants, all-held variants, optional E10/E18 support, recent `ambiguous_chair_identifies_murderer`, K03-complete return. New state lines: `S_H_D03_0012`, `S_H_D03_0033`.
- `C_H_D04`: K01/K03/E09 missing variants, all-held route wording, recent `route_crosses_closed_partition` and `feasible_route_proves_observed_use`, K04-complete return. New state lines: `S_H_D04_0012`, `S_H_D04_0034`.
- `C_H_D05`: K02/K03/K04 missing variants, all-held role separation, recent `collective_guilt` and `all_rooms_unlocked`, K05-complete return. New state lines: `S_H_D05_0012`, `S_H_D05_0034`.

All task retry branches retain the current draft/material and address the premise that actually failed.

### R05 / R07 — geometry, two lamps and E05

- `E05` now contains the actual room dimensions and fixed geometry required before D01: L03 12m E-W × 10m N-S; guest door x=3m; service door x=10m; north fixed viewing window centered x=7m; partition stops x=6m/x=9m; wheel-track limitation.
- C_CH01_03 uses the **fixed desk lamp** at the window/chair as the seated-face blocker. The portable maintenance light remains explicitly separate and is not brought into the sightline test.
- E06 keeps three neutral frames: jacket-only chair, seated adult with face obscured by the fixed desk lamp/lower pane, standing adult. It does not decide Q01 automatically.

### R09 — scene ownership and P01 supervision

- C_CH01_03: before P00/P02/P07 leave L02 for the adult viewing-walk check, P03 explicitly accepts same-place supervision of P01 (`S_CH01_03_0031..0033`).
- C_CH01_04: P00/P02 return to L02 first; P03 explicitly hands P01 back; P00 resumes direct supervision before the partition test (`S_CH01_04_0025..0027`).
- C_CH01_06/D04: P02 explicitly supervises P01 in L02 for the entire adult route walk; after D04 the adults retrace the public route and P00 returns to P01.
- C_CH01_08: P03 explicitly accepts same-place L02 supervision before P00 enters L03 (`S_CH01_08_0021..0023`); after K05/V02 appointment P00 returns and receives P01 back (`S_CH01_08_0024..0025`).
- No child is used to operate investigative equipment or enter the restricted route.

### R10 — stable-reference discipline

- All existing r01 S IDs were retained for the same utterance/function even where wording changed.
- New S IDs: `S_CH01_03_0031`, `S_CH01_03_0032`, `S_CH01_03_0033`, `S_CH01_04_0025`, `S_CH01_04_0026`, `S_CH01_04_0027`, `S_CH01_08_0021`, `S_CH01_08_0022`, `S_CH01_08_0023`, `S_CH01_08_0024`, `S_CH01_08_0025`, `S_H_D03_0012`, `S_H_D03_0033`, `S_H_D04_0012`, `S_H_D04_0034`, `S_H_D05_0012`, `S_H_D05_0034`.
- Retired S IDs: **none**.
- Renumbered S IDs: **none**.

## Preserved strengths / local resolution

- Kept the breakfast room-sketch confusion, P04's maintenance voice, the safe window test, the reversible x9→x6→x9 V01 demonstration, P01's “reserved place vs present person” observation, P03's fair non-guilt defense, and O1–O3 ordinary character texture.
- D03 still stops at “continuous presence not established”. D04 still distinguishes feasible route from observed use. D05 separates legitimate wall work, mistaken witness certainty, weakened alibi beneficiary and the still-open fatal actor.
- C_CH01_08 offers V02 without disclosing manual playback or any Q02-exclusive correction.

## Checks actually performed

- 24/24 assigned C headings present once.
- Every C has a `Context` section.
- S definitions in this file: **437/437 unique**.
- `S_Q01_v1`: exactly once; `S_Q01_v2`: exactly once.
- Exclusive Q01 time/no-face/no-continuous-watch wording appears first at the v2 correction, not in pre-success free clarification.
- H0–H4 headings present for all seven assigned hint bundles.
- Spoken-text scan found no `R05/R08`, `C_`, `E##`, `K##`, `S_` or `V##` internal IDs after the cleanup pass.
- r01→r02 S-ID set comparison: **17 new / 0 retired**.
- These CH01-local checks were subsequently included in the final nine-screenplay cross-file R01–R10 audit; no assigned CH01 item remains open.

## Proposed factual changes / unresolved matters

- Proposed case-truth changes: **none**.
- Unresolved inside CH01: **none identified after this bounded pass**.
- Final package audit completed after CH02–EP revision; project-wide status is summarized in `writing-progress.md`.
