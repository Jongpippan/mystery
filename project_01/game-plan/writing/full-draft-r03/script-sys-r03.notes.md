# SYS r03 revision notes

## Scope and base

- Base: `working-base/script-sys-r02.ko.md` from YEOWUL-FULL-v3. The corrected zero/edit/recovery behavior was preserved.
- Coverage: C_SYS_01..04.

## F04 presence guards

- C_SYS_01 now has an explicit presence selector: P01 branch only when P01 is already safely present; otherwise P07 branch only when P07 is actually present; otherwise P00-only. Neither first nor repeat recovery summons P07 into a P00/P05-only task such as Q02.
- The no-companion case reuses existing P00 recovery speech rather than adding a new fictional adult.
- C_SYS_03's first tutorial is defined as the first actual inspection/help opening. On the ordinary route this may first happen at D01 in L03, where P07 is absent, so P00+UI alone is sufficient. P07 lines are optional add-ons only when her current scene presence is true.
- Safe-inspection and official-handling follow-ups apply the same guard; absent P07 is never remote-played.

## Resource behavior preserved

- 6→4→2→0, recovery to 4, then 4→2→0 remains intact.
- At zero, draft editing, evidence/person/map/dialogue/note access and hints remain available; only a new committed submission pauses.
- Recovery is repeatable and preserves current draft, role/order choices and most recent feedback.

## ID accounting

- Retained working-base S IDs: 63/63.
- New S IDs: none.
- Retired S IDs: none.

## Checks performed

- Presence walkthroughs covered P01-present, P07-present, and neither-present recovery states, including a Q02-style P00/P05 context.
- C_SYS_03 was checked for first-use-without-P07 and official-handling-without-P07 paths.
- The local Korean particle fix in C_SYS_04 remains present.
