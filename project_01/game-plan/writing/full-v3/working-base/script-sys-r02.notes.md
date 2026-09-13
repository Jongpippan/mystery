# Author notes — script-sys-r02.ko.md

## Packet / revision / source discipline

- Packet: `YEOWUL-FULL-v2`.
- Revision: `r02`.
- Unit: shared system scenes `C_SYS_01..04`.
- Revision basis: v2 sources/review and immutable `received-r01/script-sys-r01.ko.md`.
- Fixed accepted PR01..05 and `received-r01/` were not edited.
- Delivery state: **r02 SYS revision complete; final package audit candidate, not Codex-accepted**.

## Actual coverage

- Revised `C_SYS_01`, `C_SYS_02`, `C_SYS_03`, `C_SYS_04`: **4/4 C**.
- Every C has local Context with state/cost/resume behavior.
- Screenplay S IDs: **63/63 unique**.
- Retained r01 S IDs: **60/60**.
- New r02 S IDs: **3**.
- Retired r01 S IDs: **0**.

## R01 — natural system dialogue

- `S_SYS_01_0022` no longer tells the game not to summon an absent child; P00 simply agrees to work with the records and people actually present.
- `S_SYS_03_0022` no longer speaks about eligible events or hidden future evidence; P07 naturally explains that only authorized handling proceeds and currently unavailable originals remain closed.
- System/author metadata stays in Context/UI rather than being voiced by characters.

## R08 — zero/recovery behavior

- At `여유 0`, **only new committed submission is paused**. Draft text/role edits, evidence/person/map/dialogue/note tools, cancellation and hints remain usable.
- Recovery restores **4/6**, preserves the same task, current draft, selected order, recent feedback, all E/K/S/B/notes/history, and re-enables committed submission.
- Recovery is repeatable without limit and does not force a hint or alter ending/relationships.
- The script now explicitly covers `6→4→2→0→recovery4→2→0` with different wrong claims allowed at each boundary. It no longer assumes the player repeated one premise three times.
- Save/resume at zero keeps the editable draft and last feedback.

## C_SYS_02

- Voluntary rests after CH02/CH04/CH05 remain free and substantive but do not restore 여유, create evidence, farm rewards or advance time outside explicit transitions.
- Repeated rest stays available without reward effects.

## C_SYS_03

- Free inspection/draft editing is separated from official physical handling.
- Incomplete input names the missing field, costs 0 and preserves current input.
- Tool return restores the exact answer surface and recent feedback.

## C_SYS_04 / R09 name continuity

- Default, entered, re-entry, empty, overlength, whitespace-trim, resume-before-confirm and resume-after-confirm paths remain.
- `{playerName}` changes display/address only; P00 identity/settings remain stable and P01 continues to say `이모`.
- Unconfirmed text remains editable; confirmed name is not requested again.

### New r02 S IDs — exact

- `S_SYS_01_0101`
- `S_SYS_01_0102`
- `S_SYS_01_0103`

### Retired r01 S IDs — exact

- none

## Checks actually performed

- 4/4 assigned C headings present once; all four contain Context.
- S definitions: **63/63 unique**.
- `여유 6 / 6`, `4 / 6`, `2 / 6`, `0 / 6` boundary text and repeat recovery are present.
- No `입력창이 잠긴`, `현장에 없는 모눈을`, `현재 허가된 이벤트`, `잠긴 미래 증거`, or `작가용` phrasing remains.

## Final package note

- SYS01–04 are complete for r02 and were included in the final cross-file audit with the ending units.
- No assigned SYS item remains open; final package status is recorded in `writing-progress.md`.
