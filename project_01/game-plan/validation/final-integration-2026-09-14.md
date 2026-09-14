# Final integration and local delivery verification

Date: 2026-09-14. Edition: accepted-full-r03-c01. Status: completed local delivery; G0/G1/G2/G3 and local G5 accepted, G4 independent first play unverified. This report supersedes the bounded integration-next checklist and its earlier216-test map checkpoint.

## Scope delivered by this integration

PR, six complete investigation chapters,36 required tasks,52 evidence originals, EP01–06 and the retained ending archive are integrated with current conversations, adjacent travel, authored rest/name flows, early lawful source requests, real sound files and scene imagery. All170 accepted scene node arrays and2258 spoken originals are preserved; parity tests cover the compact runtime import. No writer return, intermediate user approval, script replacement, chapter reduction or external deployment was used.

`14-assets-and-delivery.md` is the detailed asset/activation/source-adapter register. It documents the source-preserving choices, including safe current PR checkpoints, SYS03 read-only instructions, restricted R06/R09, recorded versus current voices, and the older V21 planning label that does not justify inventing a mute action absent from accepted script.

## Authorship and validation evidence classes

| Class | Actual evidence |
|---|---|
| Planning authored | Original00–13 plans plus14 asset/delivery register and explicit integration decisions |
| Script authored/reviewed | Accepted full-r03-c01; earlier full review/repair provenance remains authoritative. This integration does not claim new screenplay authorship |
| Implementation | Full existing PR/CH/EP progression, current rechecks, travel and exact returns, early source paths, preferences/name, conditional recovery/rest/help, scene art, audio/consent, archive/save slots and Windows launcher |
| Automated source/runtime checks | Import10 files /170 scenes /2258 S /52 E; compact/full parity; final npm test run229 tests passed, exit0 |
| Browser checks | Evidence24 and records16 groups pass after deferred loading; integration6 and art/audio30 groups pass against the built Worker on127.0.0.1:4173, desktop1440×900 and phone390×844 at200% text |
| Visual inspection | Direct review of generated portraits/locations and desktop/phone screenshots; earlier chapter event/evidence contact sheets retained. Final captures cover form, source table, sealed/open cargo, memo, landing, silhouette, unfolded original/copy, handoff, staff and departure. Caption contrast and memo fold bounds repaired |
| Independent play | G4 unverified: no independent first readers, players or listeners; no claimed measured fun, difficulty, duration or first-reader comprehension |
| Delivery | Local built Worker and `게임 시작.cmd`; clean build and launcher restart passed; final built integration6 and site2 groups passed. No public/remote release |

## Executed checks and observed repairs

- `node scripts/import-screenplay.mjs`: coverage10/170/2258/52, accepted source hashes retained. Runtime compact file879,121 bytes versus complete audit file2,112,237 bytes; no spoken text removed.
- `node --test tests/assets.test.mjs`: two tests pass, including exact source parity and actual PCM shared-origin alignment. Audio decode/real playback/exclusivity/mute and both EP files are separately tested in browser.
- `node tests/browser-evidence.mjs`:24 groups pass. Deferred component loading exposed an immediate-count race in the test; it now waits for the actual selector before asserting future-content absence and row counts. Focus/scroll restoration waits for deferred DOM insertion.
- `node tests/browser-records.mjs`:16 groups pass. Met-only portraits, historical/current attribution, actual corrections, filters and final-answer round trips remain intact.
- `node tests/browser-integration.mjs`:6 groups pass on the built server. Name blank/overlong/trim/back/reload/start, true phone200% preference setting, movement/current conversation/reload/exact return, two actual audio players and mute. Slider accessible name and pre-start preference retention were repaired.
- `node tests/browser-art.mjs`:30 groups pass on the built server.26 scene/profile combinations and4 school-file/profile playback combinations; loaded images, no horizontal page overflow and no browser page errors. Screenshots do not by themselves prove narrative comprehension.
- `npx.cmd tsc --noEmit`: pass after final interface changes.
- `npm.cmd run lint`: zero errors; four raw-img advisory warnings remain. All active rasters are explicitly pre-encoded WebP, with source PNGs retained; the warnings are not suppressed.
- `npm.cmd run build`: built successfully with split tool chunks. The compact script chunk remains about0.91MB uncompressed; all source text is local, and a >500KB chunk warning remains. The earlier monolithic Game chunk was1,950,033 bytes; post-split Game is about0.10MB, with shared code/data and on-demand tools separately cached. This is measured reduction, not a claim that all initial content is deferred.
- The final PR checkpoint addition exposed a test assuming the first appointment must be PR11. Its traversal now targets the actual public-count checkpoint; all seven affected travel/system tests pass. No public-interval travel restriction was weakened.
- Rebuilding while the local Worker was running produced a Windows EPERM directory lock. The specifically identified launcher-owned process tree was stopped; the development server and unrelated processes were retained. Clean rebuild/restart subsequently passed.

## Requirement evidence mapping

| Requirements | Concrete delivered evidence and limits |
|---|---|
| R01/R02/U09 | Acquired-only combined evidence search/filter/sort,52 distinct detail/thumbnail originals, exact text/diagrams, zoom, contact-sheet and desktop/phone checks |
| R03/R05/C03/C04/I04 | Heard-only introduction/action/relation/correction/history sources and origins; explicit current conversations with real cast/place/time; source-preserving chosen claims and replies |
| R04/U06/I05 | North-up known-site map, floor/route conditions, separate guest/service ports, permission-checked adjacent travel, exact return and PR witnessed-interval restriction |
| R06/U03/U05/I06/I07 | One modal tool stack; all answer types exercise source→person→history→map→same edited draft, filters/scroll/focus/reload retained; keyboard/touch checks |
| R07/U01/I01 |6/2/0/4 point/recovery rules, no inspection/incomplete/relationship costs, repeated recovery, valid name setup and saved display preferences |
| R08/R09/R11/N01 | All36 challenges, six exclusive interrogation corrections, alternate investigation orders and final-role prerequisite closure; expanded H0–H4. Depth/first-player difficulty reception remains unverified |
| R10/R12/U02/U04 | Caused appointments, source-node event states, evidence acknowledgment queues, visual before/after register, no acquisition-driven automatic conclusion or premature objective |
| R13/R14/R15/C01/C02/C05/C06/I02/N04/N05 | Full accepted Korean character/family/optional dialogue, supervised non-complicit child, distinct met-only portraits and scene expressions, explanatory demonstrations. Independent naturalness/recall/comprehension is G4 unverified |
| R16 | Actual common/branch epilogue, retained archive, corrected testimony and separate responsibilities; no invented judicial sentence or unsupported later conspiracy |
| R17/N02/N03/N06/N07/N08 | Project instructions, accepted source provenance before implementation, English planning/Korean game, fresh-work scope, no discarded-source reuse or script shrink |
| U07/I03 | Readable equal-size directions, visible chapter context without hidden answer labels, phone200% layout/contrast inspection |

## Final terminal results

- `npm.cmd test -- --test-reporter=dot`:229 tests, exit0 after the PR11 test-target correction.
- `npx.cmd tsc --noEmit`: exit0; `npm.cmd run lint`: exit0, zero errors/four image advisories.
- Clean `npm.cmd run build`: exit0. Final script chunk912,072 bytes; Game chunk107,943 bytes. Size warning remains disclosed above.
- `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/Start-Game.ps1 -NoBrowser`: exit0; matching game served at http://127.0.0.1:4173/.
- Final built `browser-integration.mjs`:6 groups passed; `browser-site.mjs`:2 groups passed. Built art/audio30 groups and the evidence24/records16 regressions remain as recorded above; no subsequent change altered their tested asset contents or tool semantics.
- `git diff --check`: exit0, only Windows line-ending advisories. Canonical screenplay and full audit import have no content diff.

The game is delivered locally with the player guide and substantive common/branch continuity record. G4 remains unverified; mechanical completion does not assert independent reception, enjoyment or measured difficulty. No intermediate user review was requested.

## Reproduction and rollback

From `project_01/game`: `npm.cmd test`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`. The build output is disposable; canonical scripts and source PNGs remain. Generate derivatives with `node scripts/import-screenplay.mjs` and `node scripts/encode-art.mjs`. Audio regeneration uses the documented installed Korean voice; playable generated WAV files ship locally. Browser tests consume the actual EP fixture file; set `YEOWUL_BASE_URL=http://127.0.0.1:4173/` to check the built Worker. Run the launcher only after building. Saves remain in the user's browser, and test contexts use separate temporary profiles.
