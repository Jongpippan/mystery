# Site and current-conversation foundation

This is a bounded implementation checkpoint, not completion of travel or the game.

## Source and implementation

`06-space-and-evidence.md` supplies the twelve places and routes. `site.ts` derives a north-up, two-level schematic with separate R05 guest-door and R06 service-door descriptors, the L03 booth doorway, and restricted pool access. E03 initially reveals only its four named public rooms; other locations require encountered origin context, with E09 explicitly revealing L08. Old logs do not receive invented location snapshots. Route conditions are explanatory requirements, not granted movement permissions. The current scene and supervision come from the existing presentation API. The map remains read-only; explicit adjacent movement is still outstanding.

`revisits.ts` selects accepted CH01 utterances 0091–0092 from C_CH01_04, C_CH01_05 and C_CH01_07. These are current conversations at the same completed investigation hub, gated by K02, KQ01 and K04 respectively. They do not adapt the interrupted x6 experiment as a new event. Optional `GameState.revisit` stores the active source and line; the existing reducer validates it, records its actual context, blocks scene/task changes during the exchange, and restores the unchanged underlying cursor and suspended answer. Repetition does not duplicate evidence, knowledge, logs or the completed experiment. Existing saves remain valid.

No screenplay was authored or changed. This implements three same-place current exchanges; free departure/return and the remaining PR/CH01–CH06 current conversations remain required. Do not interpret these controls as full free travel.

## Verification

- `node --test tests/revisits.test.mjs tests/site.test.mjs`: five tests pass. They cover all three exchanges, source/save/tool returns, unchanged drafts/facts/position, invalid index rejection, known-map disclosure and distinct door topology.
- `node tests/browser-site.mjs`: desktop and phone200% groups pass, exercising the actual aftermath exchange, map opening, reload, exact line return and suspended D03 answer preservation. Captures and results are in `site-browser/`. Capture animations were disabled after the initial image caught the dialog transition.
- `node tests/browser-evidence.mjs`:24 regression groups pass after the map change, before the subsequent revisit reducer addition. This timing is deliberate; it is not claimed as a post-revisit full regression.
- Type checking and lint pass (three existing image warnings). Production build passes with existing chunk/deprecation/route-classification notices.
- Full216-test regression passes: the prior211 tests plus the five new site/revisit tests all completed with exit0.
- Visual inspection: phone200% current conversation and transition-free desktop/phone map captures inspected directly. Inspection exposed excess empty map height for an early four-room map; the SVG now fits the disclosed places and caps desktop width. Both browser groups and type checking passed again after that repair; the final phone map was directly inspected. `git diff --check` passes.
- Independent playtesting: not performed. G2/G3 remain partial, G4 unverified, G5 pending.

## Remaining work and rollback

Continue explicit adjacency/permission/supervision state, PR fixed-event restrictions, all remaining current visits, preserved appointments/alternate access, system adapters, complete art/audio and final delivery checks. Keep R05/R06 ports distinct in any actual movement graph. The new files and narrow Game/state integration are separable review points; do not revert unrelated worktree changes. Removing an active revisit adapter would require migration for its saved optional field, rather than silently discarding a player's line.
