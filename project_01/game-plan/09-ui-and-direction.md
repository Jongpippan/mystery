# UI and art direction requirements for adaptation

Version: `plan-v1`. Planned presentation; no runtime, images or visual verification yet. The full script comes first. This file records concrete design constraints now so writing does not omit necessary actions and explanations.

## Scene and tools

Main view: current physical scene, legible portrait and Korean dialogue/action. Right companion area: 나모눈 when actually present, otherwise a clearly attributed safe-area note; current understood objective, **추리하기**, notes, settings. Never render an absent child as attending a dangerous scene. Chapter title visible without an answer-spoiling summary; objective appears only after each CHnn_02's problem recognition, as specified in scene source.

Evidence, people, map and grouped conversation history open as modal tools. Deduction is a spacious modal launched by the objective button, with **usable** evidence/people/map/history/notes controls within its active surface. Use one accessible dialog surface with internal view/return navigation if this best preserves Radix behavior; do not stack inaccessible modal traps or rely on inert background buttons. Closing suspends a task draft. Esc closes current inspection first; Back restores prior view, scroll/filter/focus; explicit travel/submit/clear are distinct actions.

Every answer type is exercised by the designed case: diagram/route selection D01/D04; evidence presentation Q; person selection D29; linking D17/D24; time ordering D09/D23; responsibility matrix D20; multi-step final D30. All have identical access to the full investigation tool set, with saved selections/order/text and no point/time effect from inspection.

## Evidence, people and history

At acquisition, show actual detail/image once with queue and acknowledgment persistence, including V03's four-item acquisition. Close returns to source scene/line, not a generic menu. Unique evidence thumbnails use object silhouettes/composition, exact text forms and physical features from the evidence ledger. E27 loose copy versus E49 bound leaf remain neutrally distinguishable without labeling the answer. E30 folded leaf's metadata never exposes future digits.

Evidence list: initially aim at eight rows at1440×900, around72px per row, 56px thumbnails, 16px readable text; let long Korean titles wrap rather than clipping key words. People list six visible known people, around72px rows and48px portraits. These are starting values, subordinate to readability/enlargement. Search plus combinable type/person/place filters and acquisition/story-time sort. Options derive from acquired/met knowledge, never future names or total hidden counts.

People detail: heard introduction, original/corrected statements with source links/time/place, observed actions separately from claims and uncertainty, related acquired E and observed relations. Stable P00 regardless display name. NPC position is last observed with source/time, not live omniscient tracking. Family calls protagonist '이모' even with entered display name.

History groups: ordinary investigation, challenge, companion, NPC event, personal, ending → conversation list with participants/place/time → full actual chosen transcript. Search by type/speaker/keyword. No one-card-per-utterance list; no unchosen answer paths. Original statements remain historical with explicit correction links. Action directions same text size as dialogue, distinct high-contrast color and italics; no text-size shrink to fit extra lines. Dialogue portraits substantially larger than list portraits, initially240px desktop/120px mobile with expression recognition verified later.

## Map and safe movement

Use north-up schematic geometry and explicit 'not to scale' label, zoom, known floors/site overview. Scene exits align R directions, with actual permission states. L03 partition has fixed window/doors and two stops; known configuration reflects observation and tests, not author-only history. L07's clear and frosted panes must not be confused. L10 may appear in adult-sourced diagrams once disclosed, but is not child-accessible free travel. Map inspection during any task is free; travel is a separate explicit action that respects current scene/event restrictions.

## Art direction and asset coverage

Visual approach: hand-painted contemporary coastal interior, washed teal/cream hotel surfaces and practical warm lamplight; warm absurd everyday actions, serious night incident without gore. Do not adopt existing generic assets as setting. Character silhouettes and faces should distinguish ages/body shapes/jobs without making everyone wear a clue-like costume. Distinct current names alone do not prove visual or vocal memorability.

Asset register at adaptation must expand these concrete obligations:

- `A_L01..12` actual places with first/revisit states; pool adult diagram and secured landing rather than graphic remains. Every exit/door agrees with ledger geometry.
- `A_P00..09` portraits with scene-needed expressions, consistent clothing/handoffs. Red repaired coat unique to relevant evidence scene; do not put a guilt-signaling color on every P03 image.
- `A_E01..52` distinct detail and thumbnail, accurate original wording/features; E30→E49 preserved physical identity, not generic newly found paper. Exact Korean documents, clocks and diagrams use text/vector rendering, not unreliable generated lettering.
- Every named V in events gets before/action/after composition or a meaningful state transformation; prioritize partition relocation, playback admission, crate opening/drying, staff-purpose comparison, safe silhouette test, lapel alignment, conserved original and final handoff. Main events cannot all be a static room with portrait swaps.
- E11/E14 audio or audiovisual comparison must be accessible by captions/transcript and visual alignment. Whether voice/sound is recorded or synthesized is a later production decision; do not claim clips exist yet.

For each actual A later record source/derivative, activation, linked E/V/P/L, visible facts, prohibited disclosures, neutral alt text, crop/zoom and inspection evidence. Photo/portrait illustration uses suitable image tools; exact plans and document text use deterministic rendering. No asset-generation skill is needed for these planning-only files.

## Required rendered checks

1440×900 desktop and390×844 phone, keyboard-only and touch, at least200% text enlargement, long Korean labels and chosen name. Focus containment, accessible names,44px target aim, contrast, meaningful alt/transcripts. Exercise evidence detail→person→corrected statement→old conversation→map→same partial answer with filters/order/notes/scroll/focus/points unchanged. Do this for every answer type, not just evidence picker. Verify save/load during acquisition, dialogue, zero/recovery, hints and final draft, and before/during/after event imagery. Screenshots alone do not prove controls actually work; all results remain unverified now.
