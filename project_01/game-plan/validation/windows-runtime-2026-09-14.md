# Windows runtime continuation — 2026-09-14

Latest integration: [evidence discovery and identification](evidence-implementation-2026-09-14.md) records52 sourced descriptors/drawings, combined filters, source links, saved tool returns,205 passing unit tests and24 evidence browser groups. Type checking/lint/build/import pass with the existing warning categories. The main route already reaches the EP archive; people/history enrichment, current revisits/travel, system/early-access adapters and complete art/audio remain unfinished. The original Windows repair below is preserved as history.

The user replaced the checkout with the correct Yeowul project. The accepted r03 scripts, snapshots, art and Vinext starter were present. No discarded project was used as implementation or creative reference.

## Changes

- Installed the existing lockfile with Node 26.7.0 and `npm.cmd run install:ci`; no starter or Site was recreated.
- Source import initially failed because CRLF left `Context` headings unmatched. Normalize line endings only in the parser input. Canonical files and copied snapshots retain their actual bytes; generated provenance hashes consequently identify Windows checkout bytes rather than historical LF hashes. Historical acceptance fingerprints are unchanged.
- Replaced an erroneous assertion that a real chosen line must never appear. The accepted ask-voice-later branch includes S_PR_04_0041; the alternative includes S_PR_04_0031.
- Connected C_PR_01..16 main sequences. Adapted PR12's two local response headings into one stored choice; excluded replay/revisit/resume, tool-return scripts and the English state-boundary annotation from automatic main playback.
- Derived visible prologue place and child presence from actual sequence milestones. Anonymous speakers use source labels; the offscreen caller does not enter the people list. P01 stays with P02 during PR10 and the relevant PR15/16 adult-only intervals.
- Validate saved field shapes, legal choice values, cursor bounds and referenced IDs before restore. Unseen evidence cannot be acknowledged; repeated acknowledgments have no effect.
- Display-name substitution now changes only the authored `{playerName}` token. Blanket substitution of the Korean word `여백` could corrupt ordinary document terminology; stable canonical narration is preserved.

## Actual checks

From `project_01/game`:

| Command | Result |
| --- | --- |
| `npm.cmd run install:ci` | pass, 671 packages |
| `node scripts/import-screenplay.mjs` | pass after CRLF repair: 10 files, 170 scenes, 2258 utterances, 52 evidence definitions |
| `node --test tests/opening.test.mjs` | 9 pass: eight prologue branch combinations plus malformed saves / unseen acknowledgment |
| `npx.cmd tsc --noEmit` | pass |
| `npm.cmd run lint` | zero errors; three existing raw-image optimization warnings |
| `npm.cmd run build` | pass; large client chunk and framework route-classification notices |

Source inventory does not establish runtime coverage. Tests restore every traversed node, preserve notes and six points, verify selected callbacks and count wording, verify exclusive history and exact acquired/met sets, and prevent skipping choices or unacknowledged acquisitions. Temporary bundle cleanup checks its resolved OS temporary parent and task prefix before recursive removal.

## Remaining work

Historical boundary: the paragraph below describes the initial Windows repair. The subsequent CH01-CH06 records and latest [EP continuation](ep-implementation-2026-09-14.md) supersede its PR16 stopping point and record the playable core ending/archive,36 tasks,200 passing automated tests,14 EP browser groups and26 rerun CH06 groups. [Remaining integration](integration-next-2026-09-14.md) is the next work boundary. Full-game production remains incomplete.

Main prologue playback is integrated, but optional revisit access and name-setup screenplay are not yet wired. It currently stops at PR16, not at the game ending. The six investigation chapters, all 36 required tasks, hints, recovery, full tool-return state, evidence illustrations and event art remain to implement. The current local tool state does not yet satisfy complete save/return requirements. No rendered UI inspection, independent playtest or deployment is claimed. Continue the full scope in `../13-implementation.md`.
