# Author notes — script-ch02-r02.ko.md

## Packet / revision / source discipline

- Packet: `YEOWUL-FULL-v2`.
- Revision: `r02`.
- Unit: CH02 — 남아 있던 목소리.
- Revision basis: `00-task.md`, `08-editorial-review.md`, `09-intake-checks.md`, remaining v2 source files, and immutable `received-r01/script-ch02-r01.ko.md`.
- Fixed accepted `05-accepted-pr-b01.ko.md` was not edited. `received-r01/` was read only.
- Delivery state for this file: **r02 chapter revision complete, not project-final and not Codex-accepted**.

## Actual coverage

- Revised all assigned CH02 records: `C_CH02_01..08`, `C_CH02_O1..O3`, `C_D06..D10`, `C_Q02`, `C_H_D06..D10`, `C_H_Q02`, `C_H_V02`.
- Worklist C records in this file: **24/24 revised**.
- Current screenplay S IDs: **343/343 unique within the file**.
- Existing r01 S IDs retained: **291/291**.
- New r02 S IDs: **50**.
- Retired r01 S IDs: **0**.
- Renumbered IDs: **0**.

## R01 / natural-language repair

- Removed or rewrote player-facing engine language such as `획득 처리`, task-label recitation and “완성 답안” phrasing in character speech.
- E15 is now a Korean correction record. It no longer exposes internal `P/S/E/K` references or English policy wording as visible evidence prose.
- E13 and E16 visible originals use `진새벽`, `목백로`, `표문식`, `배한술` rather than internal P numbers.
- D06/D07/D08/D09/D10 H4 text remains a usable direct hint, but P00 now speaks it as a natural proposed summary rather than reading a production instruction.
- Author-facing `Context`, condition, branch and K metadata remain metadata and are not character knowledge.

## R02 / Q02 exclusivity

- Sole definition of `S_Q02_v1` remains in `C_CH02_02`: `그 안내는 문식 씨가 그때 마이크로 직접 말한 거예요.`
- Before Q02 success, P05 can discuss ordinary sound-booth capability and the separate question of who controls schedule/voice-use authority, but nobody states the exclusive correction that P05 selected the 18:10 file at 20:30 or lacked absent-speaker public-playback permission.
- `H_Q02_4` was repaired: it may tell the player how to challenge the contradiction, but no longer pre-writes the operator/permission confession.
- Last pre-success challenge text: `S_Q02_0041` asks P05 to reconcile the same-recorded-segment proof with the still-current direct-microphone claim; it does not supply the answer.
- First and sole exclusive disclosure: `S_Q02_v2` in `C_Q02`, where P05 admits selecting/playing the 18:10 rehearsal file at 20:30 and admits that rehearsal-recording permission did not authorize public playback in P08's absence.
- E15/KQ02 are created only after that line. `S_Q02_v1` becomes historical after success and is never made current again.

## R03 / hint and retry state repair

- `C_H_V02`, `C_H_D06`, `C_H_Q02`, `C_H_D07` retain/expand source-missing, all-held, interrupted/recent-error and completed/revisit responses.
- `C_H_D08`, `C_H_D09`, `C_H_D10` were expanded from one generic line per level into actual state-selected text:
  - missing prerequisite source(s),
  - all required sources/priors held,
  - each named recent wrong premise,
  - interrupted draft with held state,
  - already-completed revisit.
- H0–H4 do not create evidence/K, do not advance an unearned correction, and do not reveal an exact fall/death time.

## R07 / evidence completeness

- E13 visibly includes the three-clock tolerance and provenance: 10/22 recheck by 진새벽 plus 10/21 pre-event card held by 목백로.
- E16 visibly records P08→P06 direct receipt in the 20:10–20:12 range and states the correct limit: last recorded live contact, not continued stay/death time.
- E17 remains the generator-controller record `20:19 차단 / 20:20 복귀`, explicitly limited to the power event.
- E18 reindex now matches the revised prologue physical rule: ceiling/main light interruption with low safety light preserving continuous visibility of 봉만실 at the public table and 소해금 at the booth; it does not reveal L09.

## R08 / order and judgment behavior

- D08 may be solved immediately after C_CH02_05 or left open.
- C_CH02_06/D09 can proceed while D08 is unresolved. C_CH02_06 has different actual Korean introductions for `K08 held` versus `K08 not held`.
- D09 success does not auto-fill D08; D08 success does not auto-fill D09.
- C_CH02_07 waits until both K08 and K09 are held, regardless of order; D10 converges only after both plus K05/K07.
- Named error branches remain distinct: continued-kitchen-stay/death-time for D08; schedule-as-performance/perfect-clock for D09; automatic-culprit/exact-death-minute for D10.

## R09 / physical continuity and supervision

- CH02_03: before the adult P05/P03 authority dispute, P02 receives P01 in L02 and remains with her.
- Q02/C_CH02_04: P00 returns to L02 before involving P01 in the apology conversation; P01 is asked whether she wants to hear it and is reminded that listening is not recording consent.
- C_CH02_05: P00/P01 return together to L02; P03 explicitly receives P01 before P00 goes alone to L01.
- C_CH02_06/D08/D09: P01 remains continuously with P03 in L02 while P00 moves between L01/L03. D09 now has an actual L03→L01 return and P05 arrival from L07.
- C_CH02_07: after both D08/D09 close, P00 returns to L02 and P03 explicitly hands P01 back. P03 stays at another L02 table rather than teleporting away.
- C_D10: P00 explicitly hands P01 back to P03 before returning to L01; on success P00 returns to L02 and receives P01 again.
- C_CH02_08: before P00 makes the cargo-investigation appointment at L01, P02 explicitly receives P01 in L02; P00 does not inspect E20 early.
- O2 is pinned to the window where P01 is already with P03. O3 is pinned after C_CH02_08, with P01 physically present in L02 under the established supervision state.

## Branch continuity

- `B_PLAYBACK_RESPONSE=accept_apology` and `need_time` both preserve E15/access and grant no recording permission.
- `need_time` is never rewritten as later forgiveness. Later dialogue explicitly leaves the response open.
- O1 exposes only the selected callback and never shows the unselected branch.

## Stable-ID change log

### Added in r02

`S_CH02_03_0014`, `S_CH02_03_0015`, `S_CH02_03_0016`,
`S_CH02_04_0035`, `S_CH02_04_0036`, `S_CH02_04_0037`, `S_CH02_04_0038`,
`S_CH02_05_0012`, `S_CH02_05_0013`, `S_CH02_05_0014`,
`S_CH02_06_0010`, `S_CH02_06_0011`,
`S_CH02_07_0040`, `S_CH02_07_0041`, `S_CH02_07_0042`,
`S_CH02_08_0010`, `S_CH02_08_0011`, `S_CH02_08_0012`, `S_CH02_08_0013`,
`S_D10_0002`, `S_D10_0003`, `S_D10_0004`, `S_D10_0005`, `S_D10_0025`, `S_D10_0026`,
`S_H_D06_0012`, `S_H_D06_0043`,
`S_H_D07_0012`, `S_H_D07_0043`,
`S_H_D08_0012`, `S_H_D08_0013`, `S_H_D08_0032`, `S_H_D08_0033`, `S_H_D08_0042`,
`S_H_D09_0012`, `S_H_D09_0013`, `S_H_D09_0014`, `S_H_D09_0032`, `S_H_D09_0033`, `S_H_D09_0042`,
`S_H_D10_0012`, `S_H_D10_0013`, `S_H_D10_0014`, `S_H_D10_0032`, `S_H_D10_0033`, `S_H_D10_0042`,
`S_H_Q02_0012`, `S_H_Q02_0033`,
`S_H_V02_0012`, `S_H_V02_0032`.

### Retired / renumbered

- Retired: none.
- Renumbered: none.

## Checks actually run

- 24/24 assigned C headings present once; every C has a `Context` block.
- 343/343 S IDs unique within CH02.
- r01→r02 ID delta: 50 new / 0 retired.
- `S_Q02_v1` and `S_Q02_v2` definition regex each returns exactly one.
- Pre-v2 search confirms no pre-success statement of `20:30에 리허설 파일을 골라 수동 재생`, `본인이 없는 자리 공개 재생 허락 없음`, or equivalent completed correction.
- D06–D10/Q02 retain incomplete/success/retry and named error branches.
- H0–H4 exist for all seven CH02 hint bundles.
- Accepted PR01..05 SHA-256 remains `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45`.
- This check is editorial/continuity QA for CH02 only; later chapters and final 19-file package are not yet complete.

## Next unfinished unit

- `C_CH03_01` onward in `script-ch03-r02.ko.md`.
- CH03 priority findings from the integrated review: R04 substantive scene expansion, R02/Q03 exclusivity, R03 state-specific hints/retries, R06 physical custody/opening process, R07 E37/E44 later dependencies, R08 Q03 alternate early path, and R09 supervision/travel continuity.


## Final package note

- CH02 is complete for r02 and was included in the final cross-file audit. No assigned CH02 item remains open.
