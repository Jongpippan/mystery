# CH03 implementation and continuation — 2026-09-14

The runtime now connects CH02's appointment through CH03's cargo, custody and conservation investigation to the CH04 originals-meeting appointment. This is core implementation through eighteen of thirty-six required tasks, not completed-game delivery. The next main boundary is C_CH04_01. The accepted-full-r03-c01 screenplay and generated canonical text remain unchanged.

## Implemented behavior

- C_CH03_01–08, all three optional scenes and D11/D12/Q03/D13/D14/D15 read accepted source nodes through `chapter-three.ts`. The existing single reducer owns progress, knowledge, drafts, points, views and saves; `case.ts` only dispatches chapter adapters.
- Q03 is available immediately after E20/E27, before the cart demonstration or D12, and also after them. E24 and the exclusive removal/escort correction occur only within successful Q03 dialogue. Photo shape never establishes corpse contents. Relevant extra evidence selections are accepted.
- Ash inspection can precede Q03. The initial limited exchange remains in history; a separate `ch3-ash-follow` adapter subsequently plays the unresolved responsibility conversation without reacquiring E25 or repeating the inspection. Each segment freezes its entry knowledge.
- KQ03 + K12 permits the escorted opening even if K11 is unfinished. D11 can remain outstanding until after opening/conservation, but the chapter cannot converge without K11. D13 follows the completed opening; C_CH03_06 follows K13 and leaves the intact book in protected L12 custody; D14 uses observations/photos after returning to the kitchen. D15 separates removal/burning from the still-unproven fatal act.
- The opening persists joined/supervision, route, seal exterior, opened and completed states. E23 → E26 → E29 → E30 are individually displayed and acknowledged in order. Neither the scene diagram nor H4 exposes the opaque box's interior before opening. Future E49 is never acquired. E30 remains an unreadable, bound lower counterpart; no detached leaf, invented interior text or automatic drying timer is introduced.
- The child remains with P02 in the lounge during adult investigation. The opening supervision call visibly labels remote speech and shows no colocated child portrait. The accepted return scene reunites P00/P01 before the optional family conversations and chapter closure.
- All six task forms retain the shared tools, selected fields/evidence, notes, source-based H0–H4, two-point incorrect-submission cost, idempotent attempts and saved return state. V03's stage-specific hints are accessible from the scene. D13 hints distinguish sealed exterior, partial opening acquisition and completed sources. D15's missing-K11 hint routes back to the silhouette inference rather than skipping it.
- Evidence-specific views now include the measured cart/opening-width comparison, closed/open cargo states, the redacted E27 disclosure copy and the bound, wet E30 conservation view. These are deterministic explanatory diagrams; E20's full photographic art and other production assets are still pending. Q03's original denial remains in people/history with a later acquired-E24 correction link.

## Adaptation decisions and observed repairs

1. The earlier chapter section helper deliberately drops inline conditional nodes. Reusing it initially removed both CH03 ash branches, causing seventeen of nineteen CH03 tests to fail, including a repeat loop on an empty followup. CH03 now selects actual Script nodes first and evaluates the Q03/K12 predicates explicitly. All nineteen CH03 tests then passed. Accepted source text was not edited to hide the defect.
2. `ch3-ash-follow` uses only the remaining post-correction exchange. It does not present burned fragments as new evidence. Full free revisits/current-vs-historical NPC behavior remains a separate integration requirement.
3. Task action labels explicitly return to the loading desk for Q03/late D11 and to the kitchen for D14. Presentation follows actual stage travel, active/suspended tasks and the most recent completed task. Optional adult conversation returns to its recorded investigation origin. These are navigation labels, not substituted screenplay dialogue.
4. A D15 selection incorrectly treating the copied time as independent clock memory gets `copy_as_independent` UI feedback and the standard cost. The source's two named errors keep their authored dialogue; an unrelated accusation is not substituted. The runtime localizes the source's display-only `Objective:` label to Korean.
5. Cart geometry uses two widths on the same scale (0.72m vs0.70m), avoiding a schematic corridor whose drawn width might misleadingly suggest passage. It does not infer that carried cargo cannot use the stairs. Physical image production must still respect actual geometry.
6. Reducer traversal/answers shared by CH02 and CH03 tests moved into `tests/runtime-harness.mjs`. Fixtures originate in actual PR→CH01→CH02 traversal; they are not constructed by injecting late knowledge. Only disposable verified OS temporary bundles are removed.
7. A suspended task must not override a later physical visit. Location presentation now uses the active task or the latest actual task scene rather than an arbitrary saved draft. Added D08→public revisit and Q03→kitchen-ash→Q03 regression checks. The first D08 test fixture accidentally captured an already solved source hub; constrained capture to unresolved K08/K09 and asserted task entry. Both regressions now pass.

Rollback is confined to chapter adapters, components, tests and this implementation checkpoint. No accepted source, raw writer return or editorial fingerprint has been changed. No commit or deployment was performed.

## Verification evidence

Commands run from `project_01/game`:

| Command | Observed result |
| --- | --- |
| `node scripts/import-screenplay.mjs` | Ten accepted files;170 scenes;2,258 utterances;52 evidence originals. |
| `node --test tests/opening.test.mjs tests/chapter-one.test.mjs tests/chapter-two.test.mjs tests/chapter-three.test.mjs` | Final60 tests passed, including twenty CH03 tests. Sixteen CH03 routes combine early/late Q03, early/later ash, early/late D11 and optional on/off. Every traversed node is restored through save validation. Assertions cover source order, delayed corrections, chapter convergence, child position, named errors, source supersets, deterministic hints and suspended-task travel. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run lint` | Final run passed with zero errors and three raw-image optimization warnings. Initial unused harness import removed. |
| `npm.cmd run build` | Final run passed after the cart-width/caption and suspended-task location changes. Large client chunk and framework deprecation/route-classification notices remain. |
| `node tests/browser-ch03.mjs` | Final run passed eighteen scenario groups across desktop1440×900 and touch phone390×844 at200% text. All six task forms/tool/hint/draft round trips, keyboard containment, immediate evidence views, actual four-item opening queue, sealed H4, remote-child presentation and correction links passed. No page errors. |

Generate ignored browser fixtures with PowerShell `$env:YEOWUL_WRITE_FIXTURES='1'; node --test tests/chapter-three.test.mjs`. Use installed Playwright Chromium and the local dev server on port5173. Captures and machine assertions are in `ch03-browser/`; fixture JSON is excluded through `validation/.gitignore`.

Direct visual inspection is separate: desktop open/sealed cargo, cart measurement and phone200% E27, E30 and D13 draft captures were inspected. The old corridor schematic was replaced with a same-scale width comparison; the final desktop/phone replacement and phone open-cargo captures were inspected again. No independent first player or proof of enjoyment/difficulty is claimed.

## Remaining complete-game work

Continue CH04–CH06 and epilogue with all eighteen remaining tasks and accepted dialogue, then complete directional free travel/current NPC revisits, pending PR/earlier-chapter access, evidence filters, all52 thumbnails and remaining photographic/character/location/event art and audio. The standalone early prop-list request needed for D11 before the physical cart demonstration is not exposed yet; current core obtains E22 in the accepted C_CH03_03 sequence. Preserve that planned alternate access during free-visit integration.

G2/G3 remain partial. G4 independent play remains unverified. G5 completed delivery and release registration remain pending. No intermediate user approval or writer relay is needed. Planning/adaptation authored: this record and linked checkpoint; screenplay: existing accepted source unchanged; implementation, automated verification, author visual inspection and independent play are separate evidence classes.
