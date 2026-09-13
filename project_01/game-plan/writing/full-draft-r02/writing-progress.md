# Writing progress — YEOWUL-FULL r02

- Packet: `YEOWUL-FULL-v2`
- Revision: `r02`
- Status: **draft-complete revision candidate; final package QA passed; not Codex-accepted**.
- Fixed accepted input: `05-accepted-pr-b01.ko.md` / `C_PR_01..05` remained unchanged.
- Assigned r02 C coverage: **165/165 finished in actual Korean screenplay text**.
- D/Q challenges: **36/36** with incomplete / success / retry states; all **71/71 received-r01 named error branches** preserved.
- Hint coverage: **42/42 bundles, 210/210 H0–H4 levels**.
- Evidence coverage: **E01–E52 all have actual definitions** across fixed accepted input + r02 files; provenance/limits retained.
- Q exclusivity: all six `S_Qnn_v1` and `S_Qnn_v2` definitions occur exactly once at their assigned C locations.
- S-ID uniqueness: **2,253/2,253 unique** across fixed accepted PR01–05 + nine r02 screenplay files.
- Runtime note: this is a screenplay/source QA pass, not an executable-engine playtest or external Codex acceptance.

## Final R01–R10 status

- **R01 — passed:** final spoken-text scan found no internal C/E/K/B/R/L/P identifiers or author/engine terminology in character utterances. UI/system-facing instructions remain only where player action/cost must be explained.
- **R02 — passed:** Q01–Q06 exclusive corrections are first disclosed only in their `C_Qnn` success text; assigned v1 locations are preserved.
- **R03 — passed:** every H bundle has actual state-selected missing/held/recent-error/interrupted/completed text appropriate to its local state.
- **R04 — passed:** CH03–CH06 investigation/custody/confrontation material is substantive scene text rather than title/summary placeholders; CH06_O1 is the P00/P01 sound-counter closure.
- **R05 — passed:** escorted eastern-record-table access, x7 window geometry, fixed desk lamp vs portable maintenance light, and low-safety-light visibility of P02/P05 are staged consistently.
- **R06 — passed:** bound lower original remains bound; upper working counterpart is distinct; L12 custody, simultaneous time-impression device, separate ordinary copier, and E49→E50 order are explicit.
- **R07 — passed:** required evidence originals/provenance are present, including E05 geometry, E15 Korean correction record, E36/E43 correction evidence, E37 acknowledgment, and E44 custody/body-garment linkage.
- **R08 — passed:** no extra evidence-count/order quota; at resource 0 only new committed submissions pause, draft/investigation tools remain usable, and repeatable recovery returns to 4. D30 supports two dependency-consistent presentation orders.
- **R09 — passed:** all 165 C have Context; Context cast matches actual speakers; P01 supervision/location, `{playerName}`, luggage, and EP04 zero-voice branch were cross-checked.
- **R10 — passed:** stable S IDs were preserved where function remained; new/retired IDs are accounted for below; fixed accepted opening fingerprint is unchanged.

## Fixed accepted opening fingerprint

- SHA-256 `05-accepted-pr-b01.ko.md`: `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45`

## Exact r01 → r02 S-ID accounting

| Unit | r01 IDs | r02 IDs | Retained | New | Retired |
|---|---:|---:|---:|---:|---:|
| PR | 277 | 279 | 277 | 2 | 0 |
| CH01 | 420 | 437 | 420 | 17 | 0 |
| CH02 | 293 | 343 | 293 | 50 | 0 |
| CH03 | 168 | 260 | 167 | 93 | 1 |
| CH04 | 152 | 215 | 152 | 63 | 0 |
| CH05 | 149 | 209 | 149 | 60 | 0 |
| CH06 | 167 | 267 | 162 | 105 | 5 |
| SYS | 60 | 63 | 60 | 3 | 0 |
| EP | 83 | 83 | 83 | 0 | 0 |

- Totals for nine revised screenplay files: **1769 r01 IDs → 2156 r02 IDs; 1763 retained, 393 new, 6 retired.**
- PR new: `S_PR_07_0021`, `S_PR_07_0022`.
- CH03 retired: `S_CH03_04_0002`.
- CH06 retired: `S_CH06_O1_0001`, `S_CH06_O1_0011`, `S_CH06_O1_0012`, `S_CH06_O1_0021`, `S_CH06_O1_0022`.
- Exact per-file new-ID lists are recorded in the matching `.notes.md`; no wholesale renumbering was performed.

## Q statement locations

| Q | v1 initial live statement | v2 first exclusive correction |
|---|---|---|
| Q01 | `C_CH01_02` | `C_Q01` |
| Q02 | `C_CH02_02` | `C_Q02` |
| Q03 | `C_CH03_02` | `C_Q03` |
| Q04 | `C_CH04_02` | `C_Q04` |
| Q05 | `C_CH05_02` | `C_Q05` |
| Q06 | `C_CH06_03` | `C_Q06` |

## Final QA actually run

- 165/165 assigned C headings found once; 0 missing / 0 extra; all 165 have `Context`.
- Context-versus-speaker audit: 0 scenes with a speaking P ID absent from local Context.
- 36/36 D/Q challenges expose incomplete, success and retry states.
- Full multiset comparison of received-r01 named D/Q error headings: 71/71 preserved, 0 missing / 0 extra.
- H headings: 210/210 unique.
- Q v1/v2 definitions: 12/12 unique and in assigned C locations.
- Evidence headings: E01–E52 all present.
- Spoken-text internal-ID / production-term scan: 0 flagged utterances after repair.
- Hardcoded adult-name audit: no non-P00 utterance addresses P00 as `여백`; customizable adult address uses `{playerName}` where required.
- Placeholder scan: no TODO/TBD/placeholder/unwritten marker in the nine screenplay files.
- Fixed accepted opening SHA-256 matches the intake fingerprint above.

## Complete 165-C coverage inventory

| Assigned C | Destination | Final r02 status |
|---|---|---|
| `C_PR_06` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_07` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_08` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_09` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_10` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_11` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_12` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_13` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_14` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_15` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_PR_16` | `script-pr-rest-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_01` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_02` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_03` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_04` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_05` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_06` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_07` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_08` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_O1` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_O2` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH01_O3` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D01` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D02` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D03` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D04` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D05` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_Q01` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D01` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D02` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D03` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D04` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D05` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_Q01` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_V01` | `script-ch01-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_01` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_02` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_03` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_04` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_05` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_06` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_07` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_08` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_O1` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_O2` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH02_O3` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D06` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D07` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D08` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D09` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D10` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_Q02` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D06` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D07` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D08` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D09` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D10` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_Q02` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_V02` | `script-ch02-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_01` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_02` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_03` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_04` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_05` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_06` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_07` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_08` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_O1` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_O2` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH03_O3` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D11` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D12` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D13` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D14` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D15` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_Q03` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D11` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D12` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D13` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D14` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D15` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_Q03` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_V03` | `script-ch03-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_01` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_02` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_03` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_04` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_05` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_06` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_07` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_08` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_O1` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_O2` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH04_O3` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D16` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D17` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D18` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D19` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D20` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_Q04` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D16` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D17` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D18` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D19` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D20` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_Q04` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_V04` | `script-ch04-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_01` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_02` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_03` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_04` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_05` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_06` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_07` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_08` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_O1` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_O2` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH05_O3` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D21` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D22` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D23` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D24` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D25` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_Q05` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D21` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D22` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D23` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D24` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D25` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_Q05` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_V05` | `script-ch05-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_01` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_02` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_03` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_04` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_05` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_06` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_07` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_08` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_O1` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_O2` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_CH06_O3` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D26` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D27` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D28` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D29` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_D30` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_Q06` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D26` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D27` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D28` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D29` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_D30` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_Q06` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_H_V06` | `script-ch06-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_SYS_01` | `script-sys-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_SYS_02` | `script-sys-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_SYS_03` | `script-sys-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_SYS_04` | `script-sys-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_EP_01` | `script-ep-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_EP_02` | `script-ep-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_EP_03` | `script-ep-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_EP_04` | `script-ep-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_EP_05` | `script-ep-r02.ko.md` | finished in actual r02 text; final QA passed |
| `C_EP_06` | `script-ep-r02.ko.md` | finished in actual r02 text; final QA passed |

## Unfinished / blocked items

- **None within the assigned r02 writing scope.**
- External status remains editorial: this package is ready to return to Codex/editor review but is not marked Codex-accepted.
