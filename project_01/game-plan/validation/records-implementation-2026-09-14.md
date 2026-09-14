# People and historical conversation context — 2026-09-14

Full-game production continues from the evidence-discovery checkpoint. The previous turn implemented52 identification drawings, filters and source links with205 unit/24 browser groups passing. This continuation addresses sourced people/history context; it does not replace current NPC revisits, map travel, remaining systems, art/audio or final delivery.

## Source and implementation boundary

Read current project instructions,13,Windows continuation, shared05, actual RecordsPanels/state/presentation/prologue/epilogue and accepted scene contexts. Inspected the actual introductory passages for P00–P09, physical/phone/output passages in PR07/09/10/14/16 and CH03/CH06, all six exact before/after Q definitions, and selected relationship/observation/limit passages. A broad initial context dump exceeded the tool output budget; subsequent compact place/time inventories and targeted full passages supplied the actual source evidence. Author biographies were used only as an index and were never copied into player profiles.

`record-index.ts` indexes exact heard source-node IDs. Introductions, selected observed actions, attributed relationships and historical limits appear only after every referenced node has been heard and each named participant met. Introduction labels summarize only the actual received introduction. The index contains no author-only age, guilt, secret schedule, unsupported former-spouse label or unplayed optional relationship. Existing full heard dialogue remains available, grouped into conversations.

Player-facing people detail now separates received introduction, last direct conversation, before/after statements, selected direct action excerpts, attributed relationship excerpts, limits stated at that time, related held materials and expandable actual heard conversations. All excerpts link to the original historical scene; relations link to the other known person. Corrected statements retain their original version and unlock only after the exact correction has been heard and its E acquired. The six source definitions come from the same correction index as the ending archive.

History now groups actual encountered scenes as investigation, challenge, companion, NPC interaction, personal, ending or recovery/system. Type and speaker selectors combine with normalized keyword search over actual title, utterances, speaker labels and captured place/time. Options and counts derive only from actual logs. Conversation rows include voices and contextual places/times; the detail includes actual chosen lines, acquired-material links, correction links and the existing line replay. The phrase “voices in the record” does not certify a physically present cast.

## Recorded origins and old saves

New log entries carry optional `origin` with the **existing presentation's** place/time and a direct/output/remote mode. State remains owned by the reducer; the origin is a historical snapshot, not another mutable current-location model. Ordinary entry, challenge entry and recovery use the same recording helper. The pure presentation/state module dependency is evaluated only when a reducer event records a node, after module initialization; type checking and traversal tests exercise this boundary.

Source-mode classification preserves the critical distinctions:

- P08's PR14 public output remains output, without identifying its source as replay before Q02. It cannot replace his earlier direct PR07 encounter in a profile's last-direct-contact field.
- P01/P02's CH03 opening phone replies do not place them with the adults at the cargo site.
- P09's first CH06 phone replies are remote while P00 listens at the guesthouse; the later explicit lounge arrival starts a direct exchange. The displayed origin is the listener's location, not a claim to track the caller.
- A last direct conversation is explicitly historical. It does not imply the person remained there, is there now, or is alive at the current point in the story.

Old logs without origins remain valid. The UI explicitly says their place/time was not recorded instead of guessing from the source scene's default place or the player's current stage. This matters for late use of the early photo scene, phone output and scenes with handoff/movement tails. Legacy data cannot support a retrospectively exact location claim; no fabricated migration backfill is used. Existing voice labels/source IDs still identify remote/output records. New complete playthroughs record origins from the first scene.

Optional `View.historyFilters` and `View.expanded` persist through the existing tool stack/save API. Reducer/load validation rejects unknown or unencountered groups, speakers and expanded scene IDs or properties on the wrong tool. Evidence filters remain separate typed properties in the same View. Opening a source, reading history or changing filters never moves the player, grants evidence, alters answers or changes points.

## Visual and accessibility work

People rows retain compact wrapping labels; existing P00/P01 portraits remain. P02–P09 use clearly simple initial placeholders until their actual portrait production, still an outstanding full-game obligation. These placeholders are not claimed as character art. Exact source quotations and directions use readable Korean text, with directions visually distinct. Native labeled selectors and expandable conversations have keyboard controls and44px targets; long labels wrap. A single Radix dialog continues to own focus and back navigation.

No new screenplay or raster art was authored. Korean interface labels, typed indexing, runtime changes and English planning/verification records were authored. Canonical accepted-full-r03-c01 sources remain unchanged. Automated testing, direct rendered inspection and independent testing are reported separately below.

## Verification in progress

- `node --test tests/records.test.mjs`:6 new groups passed. They check accepted source kind/gating, actual origin changes and save round trips, old origins, no early playback disclosure, before/after correction gating, filtered history/save/expansion and remote child supervision.
- Full prior205 plus new6 suite, with regenerated EP browser fixtures: running at record creation.
- Type checking:passed. Lint:zero errors,three existing raw-image warnings. Production build:running at record creation.
- `node tests/browser-records.mjs`:pending regenerated fixtures. It exercises early privacy, output attribution, combined history/replay, Q06/phone source links, persisted conversation expansion, relationships, old logs, D30 tool returns and keyboard/layout on desktop and phone200%.
- `node tests/browser-evidence.mjs`:planned regression of all eight answer types after the record surface change.
- Direct visual inspection:pending new captures. Independent players:none; G4 remains unverified.

## Next full integration and rollback

Continue explicit map routes/permissions and actual current revisits using `integration-next-2026-09-14.md`. The record-origin mechanism must receive the true future travel/revisit presentation; it is not authorization to teleport or recycle a historical correction as fresh testimony. Preserve the child supervision and speaker-mode boundaries in every new adapter. Remaining system/early-access, full asset/audio register, performance and final delivery checks remain required. G2/G3 stay partial and G5 pending.

The change is isolated to record indexing/UI and optional historical/View fields. It can be reverted without altering canonical text or challenge judgments; old saves lack the new optional fields by design. No commit, deployment, independent playtest or release registration occurred.
