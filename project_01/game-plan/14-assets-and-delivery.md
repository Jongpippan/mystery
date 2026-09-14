# Runtime asset and adaptation register

Date: 2026-09-14. Source: accepted-full-r03-c01. This register describes implemented presentation; the final execution verdict belongs to `validation/final-integration-2026-09-14.md`. Canonical Korean originals remain in `scripts/`; geometry and object identity remain in06. No screenplay was shortened or rewritten for this integration.

## Location and portrait activation

`game/lib/game/art.ts` owns current portrait/location selection. `presentation.ts` supplies actual current location; travel snapshots the original scene and substitutes only the visited port. Paintings are atmosphere, not evidence photographs or scale plans. Exact dimensions, readable Korean and inference-relevant transformations use deterministic foregrounds. The same room painting can accompany a revisit; its changed objects and documents use saved foreground state.

| Asset | Runtime activation and visible facts | Limits / inspection |
|---|---|---|
| L01 | Reception and entrance scenes, including start/departure; `l01.webp` | No hidden records in the background |
| L02 | Current lounge/supervision/rest; `l02.webp` | Occupancy comes from current source, never painted people |
| L03 | `l03-east.webp` for PR06/07 eastern records table; `l03-v2.webp` for public room after the move and investigations | Continuous opaque partition on the appropriate side of fixed window/desk. Window frosting height, door coordinates, x6/x9 stops and experiment states come from BallroomPlan/E05/E06/E09. Original `l03.png` was rejected because the partition was too low; retained as provenance, never selected |
| L04 | Authorized north walk; `l04.webp` | Lower frosted viewing portion, window and lamp; no person identity inferred from illustration |
| L05 | Kitchen/copier/stove scenes; `l05-v2.webp` | Closed cold cast-iron stove added after review; original `l05.png` retained but not selected. Ash and documents appear only in their actual foreground/detail |
| L06 | Loading/record desk; `l06.webp` | Ordinary imprint device and closed records; no future values |
| L07 | Actual sound booth; `l07.webp` | Separate clear ballroom window and raised frosted landing pane. BoothPanes/E40 provide exact comparison |
| L08 | Service junction/stairs; `l08.webp` | Guest and service ports stay distinct in data; no passage through partition |
| L09 | Secured landing only after E42; `l09.webp` | Temporary barrier is not shown before its installation; SecuredGate labels existing gate versus later barrier |
| L10 | Adult-sourced map/diagram after E42; no player movement | `l10.png/webp` exists as a reviewed atmosphere study, not a selectable player scene. Exact source diagram is used in the game; no body or child in pool |
| L11 | Authorized covered ramp; `l11.webp` | Solid shore route, no water crossing |
| L12 | Current shore storehouse; `l12.webp` | Exterior atmosphere; sealed/open/drying/unfolded contents are separate gated foregrounds |
| P00–P09 | Ten distinct neutral local portraits, main dialogue only for direct current speaker, met-only people list | Recorded/telephone voices do not masquerade as current physical portraits. Names come from stable P IDs; neutral list images have empty alt beside the same visible name |
| P00 serious | Current investigation | Same identity/clothing; no hidden culprit selector |
| P01 reflective | Authored voluntary rest | Eleven-year-old companion, same clothes; never in hazardous scene |
| P02 concerned | Post-incident investigation | Concern does not imply responsibility |
| P03 strained | EP accounting conversation | Same neutral clothing; no red-coat guilt cue |

All new paintings/portraits were generated using the image tool and directly inspected. Prompt/provenance records: `validation/portrait-prompts-2026-09-14.json`, `art-continuation-2026-09-14.json`, `l03-east-art-2026-09-14.json`; earlier L01/P00/P01 provenance remains in the opening records. Runtime uses WebP derivatives; PNG source files remain untouched. `scripts/encode-art.mjs` performs encoding only, without altering content or geometry.29 encodings total61,452,473 source bytes →5,514,102 delivery bytes. This includes rejected studies; not every encoded file is activated. Crop is responsive cover for room atmosphere and contained portrait; critical source details never depend on a background crop.

## Evidence and event foregrounds

E01–E52 each retain their exact accepted original in `EvidenceView` and a distinct acquisition-only thumbnail from `EvidenceThumbnail`. Full detail text is sourced from the canonical import; complex originals use the specialized Sound/Cargo/Paper/Visibility/Original components. E30 and E49 remain the same object's before/after; the unreadable inner values never appear early. See the evidence verification record for the complete52-item contact sheet and filter/source/zoom inspection. A thumbnail does not replace the full original.

| Events | Actual foreground/transition and disclosure boundary |
|---|---|
| V01 | BallroomPlan x9→x6→x9 at actual source nodes; fixed doors/window; adults operate it |
| V11 | Q01 chosen statement/correction with E08 queue; original and corrected accounts retained side-by-side in records |
| V12 | EventStill guest rope moved/service door still sealed; subsequent E09 physical route diagram. No pool entry |
| V02 | SoundRoutes microphone/file distinction, actual click sample, rehearsal/output comparison and acquisition queue |
| V21 | Q02 actual response and E15 correction; operator lowering her hand in accepted source. The older planning phrase “mic muted” is not implemented as an invented new physical action; console/player state and corrected record carry the change |
| V22 | EventStill people/clock/power source envelopes at the actual reception table, then their separate originals |
| V31/V03 | Explicit escorted route and supervision; CargoBox sealed→cut→opened, four acknowledged originals, no through-box view |
| V32 | BoundOriginal protection/drying; later appointment, no early unfolding |
| V04/V41 | PurposeEnvelopes before/after separated purpose labels; PageConnections exact sheet relationships; four initial originals plus Q04 correction |
| V42 | EventStill folded memo appears when brought, returns in original fold direction; full E38 detail is separate |
| V51/V05 | SecuredGate distinguishes old gate from installed barrier; BoothPanes and labeled stumble/help/push comparisons; no acted fall |
| V52 | CoatComparison plus separately attributed contradictory custody statements; no automatic actor conclusion |
| V06/V61 | Conserved ReadableOriginal, ImprintTest, CopyOverlay and ObservationBands; Q06 remains at ordinary kitchen copier; copied numbers are not certified merely by looking |
| V62 | Editable five-role FinalProof, both presentation orders, actual selected claims/responses, retained wrong/zero drafts |
| V63 | EventStill three distinct handoff bundles before/after signature, staff document display, luggage clear of doorway; actual branch dialogue, archive and separate school recording |

The new PR10 form foreground shows blank→receipt→end→separated paired example, using19:10/19:12 only after their actual source actions. No future event form is fabricated. SVG/document text has accessible descriptions; full explanatory prose accompanies compact labels. EventStill caption contrast and memo-fold bounds were corrected following direct desktop/phone inspection.

## Sound files and consent

`scripts/render-voices.ps1` uses locally installed Microsoft Heami Desktop Korean synthesis. `scripts/render-audio.mjs` constructs the actual PCM files; no real person or microphone is recorded. Credits disclose synthesis. `public/audio/manifest.json` records exact accepted spoken IDs/text, source relationship and timings.

- Rehearsal includes S_CH02_02_0006 setup count and S_CH02_02_0007 interrupted speech. Field output omits the setup and derives from that same take with output filtering/echo. The chair sound aligns in the common passage. Captions/visual alignment remain usable without hearing.
- PR09 `chair-sample.wav` contains one permitted chair sound and no voices; CH06_O1 plays that same file without recording new conversation.
- CH02 `click_test.wav` demonstrates local playback separately from microphone input.
- EP environmental branch has wind/chair/three drops and no voice. Voice branch contains only the newly consented S_EP_04_0302 sentence and quiet background. P00 refusal, P01 start/stop remarks and P08 rehearsal are excluded.
- Playback is explicit, never autoplay; starting a second player pauses the first. Leaving a mounted player pauses it. Saved volume/mute and transcripts apply to both forensic and school files.

Browser decoding/playback and sample construction are verified separately from human listening quality. No independent listener or actor performance review is claimed.

## Source-preserving adapters and persistence

Current exchanges use explicit accepted node selectors in `revisits.ts`; historical replay cannot become new witness testimony. PR06/08/10 end checkpoints retain original source cursors and offer optional same-place rechecks. PR16 boundary repeats only while P07 is actually with P00 at reception after her boundary explanation, before the child reunion. PR11 alone permits public travel before joining the witnessed count; PR12–14 never permit retrospective wandering. Completed D/Q/H sections remain task/hint returns, not free current NPC conversations.

Adjacent travel uses R permissions and separate L03 guest/service ports. The return trail restores the exact original source/task/draft. Required escorted visits retain their authored walks; free movement does not replace those procedures. R06 remains key/escort restricted; R09 is never player travel. Companion presence follows supervision, not a universal sidekick portrait. Current same-place exchanges do not authorize moving a distant NPC.

Early console request acquires identical E11/E12/E14 without conclusions; later CH02 resumes without duplicate demo. CH03 props can precede cart proof, and CH06 visible overlap can precede authentication; neither grants the later K. These are source-selector adapters, not new screenplay.

SYS name entry preserves overlong/blank edits, explicit trimming/confirmation/back, default identity and family address. Voluntary/repeat rests preserve all resources. Zero recovery chooses only actually present P01/P07 or P00 alone. SYS03 is a repeatable read-only help surface, including incomplete-input, safe handling, tool-return and resume instructions; it does not manufacture a new story conversation every time a tool opens. Boundary example lines0101/0102 describe specific errors and are not indiscriminately replayed after unrelated failures; actual task-specific feedback and exact point changes remain visible. This avoids inventing a repeated-error narrative.

The full audit import remains `screenplay.generated.json`. `screenplay.runtime.json` omits duplicate utterance storage and unused author contexts; all170 scene node arrays,2258 spoken originals and52 evidence originals are parity-tested. Tool components load on demand. Saved filter/scroll/focus restoration waits for deferred content. Preferences persist before name setup and across new-game start; case slots retain their own state and ending records.

## Delivery operation

Windows: `project_01/게임 시작.cmd` starts the built local Worker on127.0.0.1:4173 and opens the game. Existing matching server is reused. No deployment, account, gameplay database or external message is required. The launcher preserves source/saves and logs startup failures under `game/.vinext/`. Developer preview remains on5173. Local browser saves are origin-specific; the launcher consistently uses127.0.0.1:4173.

Final command/results, rendered inspection and remaining G4 limits are recorded in the final integration report. A browser walkthrough or sound decoder check is not independent first-play evidence.
