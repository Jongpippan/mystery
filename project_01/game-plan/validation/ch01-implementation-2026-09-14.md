# CH01 implementation and continuation — 2026-09-14

Status: implemented core progression through CH01's local resolution and sound-booth appointment. This is **not the completed six-chapter game**. Continue the unchanged objective in [13-implementation](../13-implementation.md). No writer return or intermediate user approval is needed.

## Authoritative scope and source ownership

The canonical `accepted-full-r03-c01` screenplay is unchanged. Runtime adapters read its imported node/section IDs. `lib/game/chapter-one.ts` specifies the six CH01 tasks and explicit scene sections; `lib/game/state.ts` is the sole writable progress/draft/tool/save API. The initial Windows continuation is historical evidence in [windows-runtime-2026-09-14](windows-runtime-2026-09-14.md).

Implemented:

- PR16 -> next-morning return -> CH01 field investigation -> D01/D02/Q01/D03/D04/D05 -> local resolution, child reunion and the CH02 appointment.
- Both Q01 routes: early E10/E18 photo/counted-event counterexample, or E06/E07/K02 sightline/configuration. Early correction does not waive geometry, work history, the adult partition test or route verification. E08 appears only during the successful Q01 response, before its completion award. E10 is also requestable later from the safe CH01 conversation areas.
- The three optional personal conversations and the accepted B_PR_02 callback, with explicit return to the interrupted investigation stage. Accepted main sections, selected claims, named failures, free clarification and success aftermath remain separate from author annotations and unselected branches.
- All six task forms retain selected evidence, fields and notes. Evidence supersets are accepted; incomplete required input is free; complete incorrect submissions cost two once per attempt. Three errors reach zero, drafts remain editable and recovery restores four repeatedly. Successful dialogue completes before K is awarded.
- Original and corrected statements remain in the actual log. People detail links to heard conversations and the Q01 correction. History has group/list/detail navigation. Evidence, people, map, history, notes and settings are available in the same dialog surface as tasks. Stack, search, detail, scroll, focus anchor, diagram zoom, task response cursor, error and hint state persist in the save.
- CH01 H0–H4 selectors follow the canonical deterministic priorities. V01 includes pending/current-x6/completed branches and is reachable from the scene on desktop and phone.
- E05's two measured diagrams and E09's measured route rendering use deterministic geometry/Korean text. V01 displays a labeled current experiment state x9 -> x6 -> x9. Most other evidence still needs its required distinct visual/thumbnail.

## Bounded adaptation decisions and risks

1. **Physical return before D02:** split only the opening handback portion of C_CH01_04 (through `C_CH01_04:n0005`) into `handback`, following C_CH01_03 and preceding the L03 D02 question. This preserves every selected Korean line and physically reunites P00/P01 before the L03 task. The actual experiment remainder still requires K02. The alternative was leaving P00 at L04 while showing a task whose speakers/place were L03. No truth, permission, supervision or past action changes.
2. **Entry knowledge is immutable scene context:** record known IDs when each scene segment starts. Later Q01 success must not rebuild the already-read V01 response as the early-correction variant. Tests assert the exclusive C_CH01_04 branch on both routes. Current knowledge still controls later task/event eligibility.
3. **Typed selection judging:** freeform notes are not falsely presented as machine-judged proof. Multi-field diagram, proposition/source, route and responsibility choices implement the actual logical roles. Korean option labels are adaptation UI; spoken claims/responses come from accepted IDs.
4. **Additional UI-only errors:** an incorrect side selection with an explicitly fixed window must not play the accepted speech claiming the player moved the window. Similarly, skipping a connecting route is distinct from crossing the partition. `wrong_partition_side`, `unconnected_route`, and insufficient selected evidence use concrete UI feedback and the same two-point cost. They do not fabricate new screenplay dialogue. Source-defined errors continue to play their authored exchanges.
5. **Save compatibility:** the existing version-1 prologue format remains valid. The optional, validated investigation/view extension begins at CH01; existing prologue saves do not restart. Derived test fixtures are machine-play saves, not user saves or a separate story source.

Rollback is limited to implementation/adaptation edits. Accepted scripts, raw returns and editorial fingerprints have not been rewritten. No deployment or commit was performed.

## Actual automated and browser evidence

From `project_01/game`:

| Check | Actual scope / result |
| --- | --- |
| `node --test tests/opening.test.mjs tests/chapter-one.test.mjs` | 19 passing tests: eight prologue combinations; CH01 photo/sightline x with/without optional scenes; per-node save validation; chosen-branch exclusivity; costs/repeated recovery; suspended Q acquisition; sufficient/insufficient sources; hint precedence; malformed saves. |
| `npx.cmd tsc --noEmit` | Passed after correcting the tool-name map type. |
| `npm.cmd run lint` | Passed with zero errors and three existing-category raw-image optimization warnings, after fixing render-time ref writes and a const declaration. |
| `npm.cmd run build` | Passed. Large-client-chunk, Vinext route-classification and framework deprecation notices remain; chapter code/content splitting is still pending. |
| `node tests/browser-ch01.mjs` | Final run passed all 11 profile/scenario groups in `ch01-browser/results.json`. D01 tool round trips at 1440x900, 390x844 and phone 200% text; touch resume; keyboard containment; diagram zoom and exact Esc list focus; Q01 acquisition/restore; zero recovery; the remaining five task tool surfaces; V01 saved visual stages. Captures are in the same directory. |

The git-ignored browser fixtures are regenerated from actual reducer traversal using PowerShell `$env:YEOWUL_WRITE_FIXTURES='1'; node --test tests/chapter-one.test.mjs`. Install browser tooling with `npx.cmd playwright install chromium` once and start `npm.cmd run dev` (port 5173) before the browser script. `@playwright/test` is a locked development dependency.

Observed failures and repairs: initial lint found invalid render-time ref writes; they now update in effects. Initial desktop diagram-zoom assertion showed that the enlarged minimum width remained smaller than the viewport; increase the inner diagram width, preserving the outer modal's bounded scroll. Early rendered captures also showed small diagram labels on phone; explicit diagram enlargement was added. Final rerun results supersede these initial failures, but do not imply whole-game verification.

Visual inspection is separate from browser assertions: the desktop task layout, phone task layout at 200%, phone E05 diagrams, Q01 correction acquisition and all three V01 x9/x6/x9 captures were directly inspected. The V01 inspection found the scene vignette darkening the diagram caption; disable the vignette for experiment diagrams. Capture screenshots with animations disabled so dialog fade-in does not produce an accidentally translucent evidence page. This is author inspection, not independent first play.

## Unfinished production — next actions

- Implement CH02–CH06 and epilogue, all remaining 30 D/Q tasks, events and knowledge-sensitive scene branches. The current executable stops after the CH01 appointment; it does not yet enter C_CH02_01.
- Complete freely revisitable current scene responses, prologue name-setup/optional revisits and missed-event access. The CH01 adapter currently offers authored linked investigation actions and optional windows; it is not the complete directional free-travel map.
- Expand evidence-specific art and all 52 distinguishable thumbnails, portraits/expressions and remaining location/event imagery. The three inherited-in-this-new-project opening assets are retained; no discarded project was consulted. Diagrams alone do not satisfy complete visual production.
- Add evidence type/person/place filtering and sorting, richer sourced person timelines, whole-site zoom/navigation, all later answer types and full ending-state recovery tests. Broaden rendered checks to those actual implementations, including complete physical scene/portrait agreement.
- Maintain G2/G3 as partial, G4 unverified and G5 pending. No independent reader/player results, enjoyment, difficulty or first-reader comprehension are claimed. Do not ask the user to test an intermediate build.
- Private release/deployment remains pending and must use available current capabilities only after full implementation and required checks. Update series continuity from the actual implemented ending, not from this partial chapter.

Planning/adaptation authored: this record and the linked implementation status. Screenplay authored/reviewed: existing accepted full r03 source, unchanged. Implementation: PR + CH01 core, incomplete full game. Automated checks, rendered inspection and independent play evidence remain separate as above.
