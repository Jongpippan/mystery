# CH05 implementation and continuation — 2026-09-14

CH05 now connects the adult site-access request to the guesthouse overnight boundary. Thirty of thirty-six required tasks are implemented. The next core boundary is C_CH06_01, beginning with the actual conservation contact rather than an automatic readable clue. This remains incomplete full-game production; accepted-full-r03-c01 script sources are unchanged.

## Implemented behavior and adaptation

- C_CH05_01–08, D21/Q05/D22/D23/D24/D25 and all three optional scenes use accepted source nodes. Supervision passes explicitly to P02 before the adult route. Only the safe adult observation pair uses L07/L09; the temporary police barrier is distinct from the original warning/open gate.
- E40's clear ballroom window and frosted staff-corridor pane stay separate. E41 is the same witness's note, not a second observer. Q05 alone discloses the fuller contact/fall/cue account and E43; its detail opens and persists before KQ05 is awarded. People records link the original denial to the acquired correction.
- The three safe comparison sequences show different orders for stumble/help/push. Adults remain upright within the safe area and stop before the marked line; no fall is acted. E45 follows all three comparisons and is a feasibility record, not an independent recording of the previous day's event. Diagrams supplement the source originals and do not complete the photographic/event-art requirement.
- D22 and D23 are independently selectable after comparison. Two adapters for C_CH05_05 preserve its first-completed-task branch and later common aftermath. Each stage freezes entry knowledge so solving the other task or reloading cannot rewrite earlier lines. The unsolved task stays available. D23 accepts ordered cue/reset anchors with outward one-minute uncertainty and incident scope; it does not require an author-only precise minute or physiological death time.
- E44 shows physical garment correspondence and recovery provenance separately from the wearer claims. E47 is acquired before E46, with P04 and P03 interviewed in separate source turns. Both conflicting times persist. D25 preserves both remaining actor/coat hypotheses and requests the planted original/copy-custody comparison, rather than accepting the disputed copy as fact.
- The coat strand requires E10 even if the optional early CH01 photo request was skipped. The planned V52 fallback now requests that same photo from P02 in L02 before coat comparison, using the existing S_CH01_02_0031–35/source acquisition nodes. It remains Oct22, so the existing previous-night wording fits. No substitute photo, new timestamp or new screenplay is created; early holders skip this fallback. Source-ID history and actual acquisition remain intact.
- C_CH05_06 returns P01 to P00; coat travel explicitly leaves her with P02 again. Optional family/relationship/victim-memory scenes close before leaving. C_CH05_08 actually exits the hotel and ends at the prearranged town guesthouse. Save restoration there preserves both hypotheses and creates no E49/K.
- D22 wrong action ordering, D23 omitted clock margin and D25 unrelated-weapon answers receive narrow UI feedback and the common cost; named errors retain their authored dialogue and exact H3 binding. H4 stays complete, while missing sources retain priority. V05 handles request, supervision, interrupted adult route, each missing physical acquisition and completion.
- Source O2's final non-diegetic sentence about automatic crime/relationship flags is omitted from scene rendering; the actual dialogue and physical directions remain. No reconciliation flag is created. This is a presentation filter, not a canonical script edit.

All changes remain in explicit chapter adapters, the existing reducer, scene/evidence components and tests. There is no second writable state store. Rollback does not touch accepted scripts, raw writer returns or source fingerprints. No commit or deployment is performed.

## Executed verification

Commands from `project_01/game`:

| Command | Observed result |
| --- | --- |
| `node scripts/import-screenplay.mjs` | Ten files,170 scenes,2,258 utterances,52 originals; no canonical text delta. |
| `node --test tests/opening.test.mjs tests/chapter-one.test.mjs tests/chapter-two.test.mjs tests/chapter-three.test.mjs tests/chapter-four.test.mjs tests/chapter-five.test.mjs` |80 tests passed. Eleven CH05 tests include eight real PR-through-CH05 traversals combining early/late E10, D22/D23 order and optional on/off; every scene/task node restores through save validation. |
| `$env:YEOWUL_WRITE_FIXTURES='1'; node --test tests/chapter-five.test.mjs` |11 passed; actual traversals regenerate ignored browser saves, including event steps and both first-result states. |
| `npx.cmd tsc --noEmit` | Passed. |
| `npm.cmd run lint` | Final run: zero errors and three existing raw-image optimization warnings. Removed the extra unused-interruption-argument warning. |
| `npm.cmd run build` | Passed. Existing large client chunk and framework deprecation/route-classification notices remain. |
| `node tests/browser-ch05.mjs` |18 scenario groups passed on desktop1440×900 and touch phone390×844 at200% text. All six drafts/tools/H4/keyboard paths, eight immediate details, supervision/route hints, actual three-comparison→E45 progression, both remaining-task orders, late-photo ending, guesthouse state and Q05 links passed without page errors or horizontal overflow. |

The runtime-harness shares actual prior-chapter traversals and supports both early-photo histories; late facts are not injected. Browser fixtures are ignored by `validation/.gitignore`. Use installed Playwright Chromium with the development server at port5173. Captures/results are stored in `ch05-browser/`.

Direct visual inspection covers desktop two-pane separation, physical coat-match illustration, three-alternative evidence layout, help/push event diagrams, and phone200% push sequence, warning/barrier distinction and D23 draft. These are author checks, not independent playtests.

## Remaining full scope

Implement CH06's six required tasks and epilogue, then complete all current/historical NPC revisits, directional free travel, earlier access alternatives, evidence filters and all required thumbnails/character/location/event art/audio. Full proof reconstruction, end-to-end integration and actual deployment remain ahead. G2/G3 are partial, G4 independent play unverified and G5 pending. Planning/adaptation, accepted screenplay, implementation, automated checks, direct visual inspection and independent play are separate evidence classes; no enjoyment/difficulty claim is made.
