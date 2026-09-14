# Epilogue, archive and save-slot implementation — 2026-09-14

Source: accepted-full-r03-c01, unchanged canonical `scripts/ep.ko.md`. Windows PowerShell, Node26.7.0, Vinext/React at localhost5173. The actual CH06 aftermath now enters EP01–06, a working ending archive and separate replay save slots. The previous goal turn made authoritative progress through CH06; this continuation implements the ending. It does not close the full production goal.

## Implemented source behavior

- EP01 separates observed materials, attributed statements/corrections and supported conclusions during formal handoff. The travel control explicitly leaves P01 supervised with P02. EP02 preserves P03's attributed current account with P07; it adds no confession, decisive clue or revoked conclusion. EP02 and EP03 can be visited in either order, and both finish before the school project/departure.
- EP03 snapshots choices on actual scene entry using an optional `stageChoices` field in the existing investigation state. A late B_EXHIBIT choice plays its own new dialogue and never flips into the already-selected callback after save/load. Existing choices receive no repeated question. Common staff responsibility discussion remains intact.
- EP04 uses only actual B_PR_02 and apology callbacks. B_SOUND expresses the newly selected project scope independently of forgiveness. The recorder is visibly off during permissions, refusal and P01's start announcement. Only P05's newly permitted sentence lies inside the voice recording interval. The environment branch begins after speech, has the authored ventilation/chair/three-drop directions, and ends before anyone speaks again. This is authored fictional recorder-state playback; audio assets are still an outstanding production obligation, not claimed as recorded files or audible clips.
- EP05 retains both original B_PR_01 callbacks, the actual B_SOUND recap and the **common**0061–64/n0021 departure tail despite that tail's generated section nesting. The three pieces of luggage remain one travel suitcase, P00's document bag and P01's backpack. The ordinary receipt adds no new E. EP06 plays the complete sourced summary, responsibility card, five actual branch recaps and closing P00/P01 exchange.

No new Korean screenplay was authored. UI labels adapt the accepted controls; exact Korean narrative remains imported. English planning/adaptation notes were authored separately. End credits identify the actual AI-assisted production and framework sources without claiming a completed/released work.

## Working archive and persistence

The archive opens only after the final closing exchange. Its controls expose52 actually acquired materials with acquisition-scene links,36 successful deductions and stored submissions, D30's five role/source/note cards and chosen presentation order, all six heard before/after corrections, five source-selected recaps, actual history and credits. History offers line-by-line replay using a saved view cursor, without changing the story cursor, log, choices, points or conclusions. This does not replace still-required **current** NPC revisit exchanges.

`save-store.ts` is the persistence API. A single `yeowul-saves-v2` document holds the active slot and preserved play snapshots; the current game remains owned by the reducer. A legacy `yeowul-save-v1` record is read and migrated without deleting its original bytes. New-play creation first preserves the current state, then allocates a distinct slot before resetting game progress. Manual save, automatic save, home-screen slot selection and settings slot selection are usable controls. Invalid or failed storage operations show an error rather than deleting existing slots. Old CH01–CH06 game-state saves remain compatible; newly entered EP scenes carry their required entry-choice snapshot.

## Executed verification

From `project_01/game`:

| Command | Actual result |
| --- | --- |
| `node --test --test-reporter=dot tests/epilogue.test.mjs` |99 pass:96 complete branch/order routes plus3 state/archive/save groups |
| `node --test --test-reporter=dot tests/opening.test.mjs tests/chapter-one.test.mjs tests/chapter-two.test.mjs tests/chapter-three.test.mjs tests/chapter-four.test.mjs tests/chapter-five.test.mjs tests/chapter-six.test.mjs` |101 existing tests pass after integration;200 total across the two commands |
| `npx.cmd tsc --noEmit` |pass |
| `npm.cmd run lint` |zero errors,three existing raw-image warnings |
| `npm.cmd run build` |pass; framework deprecation,large client chunk and route-classification notices |
| `node tests/browser-ep.mjs` |14 groups pass:seven on desktop1440×900 and seven on touch390×844 at200% text |
| `node tests/browser-ch06.mjs` |26 groups pass after save migration, including all six CH06 tasks and both final presentations |
| `node scripts/import-screenplay.mjs` |pass:10 files,170 scenes,2258 utterances,52 evidence definitions; canonical and generated source have no substantive diff |
| `git diff --check` |pass; Windows line-ending notices only |

The96 ending routes start with24 **actually traversed** PR/CH01–CH06 paths, varying both B_PR_01, both B_PR_02, both apology answers, and absent/each early B_EXHIBIT. Each then tests both B_SOUND choices and both EP02/03 orders. Both D30 orders occur in inherited actual runs. Every traversed node is saved/validated/restored. All routes retain52 E,36 K and six points; unplayed callbacks stay absent; the common departure and closing exchange always occur. Targeted checks cover late-choice cursor stability, actual off/recording/stopped source boundaries, adult supervision, archive view/replay serialization, malformed EP saves, legacy migration, retained ending drafts, switching active slots and a simulated storage-write failure.

Browser QA executes both school-project branches through their real controls, late exhibition choice/reload, all archive menu destinations, source-scene navigation, actual line replay/reload, manual save, new-slot start and restoring the ending from the title screen. It verifies no knowledge/log/choice mutations from replay, old ending retention, dialog keyboard containment, no page errors and no horizontal overflow. Previous chapter browser scripts now use the same new save-store readout and clear only their isolated browser QA migration key when injecting fixtures.

Reproduce fixtures and browser checks:

```powershell
$env:YEOWUL_WRITE_FIXTURES='1'
node --test --test-reporter=dot tests/epilogue.test.mjs
node tests/browser-ep.mjs
```

`runtime-ep-fixtures.json` is an ignored, reproducible machine-play artifact. Results and captures are in `ep-browser/`.

## Direct inspection and repairs

Directly inspected desktop archive/recap and phone200% archive/correction captures. The first archive capture caught a modal fade mid-animation, producing temporary apparent translucency; capture now disables animations and the actual settled paper surface is opaque/readable. The inspection also found old investigation-appointment buttons remaining behind the ending; all are now hidden during EP, with a browser assertion. The corrected archive and recap were inspected again. Type checking initially found the newly added archive tool missing from the local Tool union; it was integrated before browser testing. Removed unused old save constants/imports after migration; lint returned to its existing three image warnings.

## Remaining production and verification limits

The full main path now reaches the end, but full-game delivery is unproven. Current NPC revisit dialogue, directional free travel/permissions and known map layers, optional PR name-setup and system scenes, early independent acquisition opportunities, combined evidence filters/sorts and52 meaningful thumbnails, people/history context enrichment, remaining character/location/event imagery and actual audio/settings still require implementation and review. G2/G3 remain partial. G4 independent first-player comprehension, difficulty and enjoyment remain unverified; no automatic route or screenshot is an independent playtest. G5 delivery and release registration remain pending. No commit or deployment occurred.
