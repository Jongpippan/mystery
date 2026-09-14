# Evidence discovery and identification — 2026-09-14

The authorized full-game production continues from the playable EP/archive checkpoint. This change completes the evidence index/filter/thumbnail boundary in `integration-next-2026-09-14.md`; people/history enrichment, current revisits, travel, systems and full imagery/audio remain in scope. No intermediate user review or writer relay is required. G2/G3 remain partial, G4 unverified and G5 pending.

## Source and implementation

All52 accepted Korean evidence originals were read alongside their source scene contexts. The originals in `scripts/*.ko.md` and generated screenplay remain authoritative and unchanged. No new screenplay, clue, correction or conclusion was authored. Korean search/filter/navigation labels and English implementation documentation were authored separately.

`lib/game/evidence-index.ts` owns the runtime type, related people/places, attributed story-time key, identification motif and explicit comparison families. The same index serves the list, detail context, related-source links and identification drawings. Existing duplicate character-name labels in Game/RecordsPanels now use its shared names. This is descriptive source indexing, not a second game truth or writable state store.

- Type/person/place filters combine with AND and search the actual acquired title/original. Full-width text normalizes to NFKC; authored player-name substitution uses `displayText`, never global replacement of ordinary words. Acquisition order uses the actual saved E order; newest reverses it. No hidden item total or unacquired preview exists.
- Filter options derive only from held sources and met people. Related-source links intersect explicit comparison families with held IDs; related-person controls intersect tags with met IDs. Viewing them never acquires evidence or changes a conclusion. A document mentioning a known room can make that room a filter option without granting travel permission.
- The location dimension is labeled **related place**, not acquisition location or current NPC position. Some originals span several places and times, and existing adapters can replay a source at a later physical meeting. A single invented acquisition location would be misleading. Exact current/revisit location tracking remains a separate integration obligation. Existing acquisition-scene controls open the actual heard source transcript.
- Story sorting retains source qualifications: E27's public-copy inscription and E49's bound-original inscription are distinct claims. Undated records sort last; unknown clocks follow known clocks within their date. E46's conflicting before/approximately statements have no invented exact sorting clock. E30 remains folded and its index contains no future digits even after the distinct E49 record becomes available. This is ordering by what the source addresses, not certifying a single true chronology.
- Optional `View.filters` lives in the existing reducer/save schema. Old views omit it and receive defaults. Invalid/unheld filters and filters on another tool are rejected; normal saves retain search, filters, sort, focus and scroll together. Other tools and partial answer state remain owned by the same reducer.

`EvidenceList.tsx` provides native labeled selectors, normalized search, reset, held-result count and compact wrapping rows. The time-sort explanation opens on demand. Long selected person/place labels also wrap outside the native selector. `EvidenceContext` links held comparison materials and encountered people to existing history/correction controls.

## Visual production and inspection

`EvidenceThumbnail.tsx` contains52 individual deterministic SVG compositions using shared drawing primitives. Documents, windows, coats, folded/bound pages, paired slips, carts, prop legs, waveforms, clocks and copying devices reflect each original's identifying features. They are labeled as **identification drawings**, not photographic originals, and do not replace the actual Korean source or existing detailed interactive diagrams. All52 drawings activate only for held records; the folded E30 stays visually distinct from the later readable E49. No image-generation skill applies to this code-native vector task.

The rendered contact sheet in `evidence-browser/thumbnail-sheet.html` and `.png` comes from the actual list SVGs. Direct inspection covered all52 compositions plus desktop list/combined-filter and phone200% list/combined-filter captures, including the final collapsed explanation and wrapping long-name/place captures. Full-size evidence illustrations, the remaining place/portrait/event raster art and actual sound remain separate incomplete asset obligations; this checkpoint does not close U09.

At1440×900 the default top-of-list capture shows seven complete readable rows, with64×48 identification drawings and16px title text. This is an explicit density adaptation to preserve44px controls and all filters in the existing modal. Eight rows was a starting aim, not permission to shrink text or omit controls. At390×844/200%, rows and controls wrap and the list scrolls vertically. Visual inspection found that the expanded time-order explanation pushed results far below the mobile fold; it now starts collapsed. Long native-selector labels receive a wrapping selected-label line. No horizontal overflow was observed in the executed browser assertions.

## Executed verification

From `project_01/game`:

| Command | Result |
| --- | --- |
| `node --test --test-reporter=dot tests/opening.test.mjs tests/chapter-one.test.mjs tests/chapter-two.test.mjs tests/chapter-three.test.mjs tests/chapter-four.test.mjs tests/chapter-five.test.mjs tests/chapter-six.test.mjs tests/epilogue.test.mjs tests/evidence-index.test.mjs` |205 pass: previous200 plus5 index/filter/save groups |
| `npx.cmd tsc --noEmit` |pass after final UI edits |
| `npm.cmd run lint` |zero errors;three existing raw-image warnings |
| `npm.cmd run build` |pass after final UI edits; existing deprecation, large client chunk and route-classification notices |
| `node scripts/import-screenplay.mjs` |10 files,170 scenes,2258 utterances,52 evidence; no source rewrite |
| `node tests/browser-evidence.mjs` |24 groups pass:12 per desktop and touch phone200% after final UI edits |
| `git diff --check` |pass; Windows line-ending notices only |

The five new unit groups check coverage without assuming source-definition order, distinct motif labels, qualified and unknown times, combined filtering, normalized search, acquired-only options/links, invalid filters, old-save defaults and a real D01 answer/tool/save round trip. The first test run exposed an incorrect test assumption that dictionary definition order equals evidence ID order; the coverage assertion now compares sorted keys. Acquisition sorting still uses runtime order.

Browser tests restore fixtures produced by the actual EP route suite. They cover early privacy, all52 distinct SVG compositions, combined search/filter/sort/reset, evidence → related evidence → person → correction → history → map → same filtered list, exact row focus/scroll and save reload. Eight actual answer types are edited through the UI: D01 diagram, D04 route, D17 linking, D20 responsibility, D23 ordering, Q06 interrogation, D29 person and D30 final reconstruction. Each traverses all six tools, reloads and retains exact task/draft/knowledge/log/choices/points. Both desktop and touch phone200% run these checks. The final extension also checks long names/places, native keyboard sorting, modal Tab containment and44px selector targets.

The first browser run did not actually scroll before asserting a positive restored offset because its selected row was already visible. The test now deliberately scrolls that row to the top before inspection and verifies the same nonzero position after back/reload. This was a test setup repair, not a silently waived scroll assertion.

To regenerate browser fixtures in PowerShell: `$env:YEOWUL_WRITE_FIXTURES='1'; node --test --test-reporter=dot tests/epilogue.test.mjs`. Clear that environment variable afterward if desired. Then keep `npm.cmd run dev` available on localhost5173 and run `node tests/browser-evidence.mjs`. The fixture JSON is ignored; captures and results are review artifacts. Playwright uses the installed locked dependency/browser setup from the EP validation record.

## Remaining scope and rollback

Continue with sourced people/history context and current revisits/map permissions as specified by the integration index. Do not represent historical source replay as a fresh conversation or use a related-place filter as a travel permission. Full art/audio, source-system variants, early-access adapters, performance and final delivery verification remain required. No independent player participated; this work establishes neither enjoyment nor first-reader comprehension.

The change is isolated to the evidence index/components, optional View validation and list/context wiring. Reverting that boundary restores the earlier list; canonical sources and task logic do not need rewriting. Earlier view saves without filter properties remain loadable. No commit, deployment or release registration occurred.
