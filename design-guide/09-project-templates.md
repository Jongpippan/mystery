# 09. Project documents and source ownership

These are authoring templates, not existing project deliverables. When actual project planning begins, create its `AGENTS.md` from [the template](templates/AGENTS.md) and write substantive English documents in `game-plan/`. Do not create a blank project during common-guide cleanup. Write actual screenplay lines, directions, game strings, hints, and evidence originals in Korean.

## IDs and authoritative sources

| ID | Content |
|---|---|
| P | Person, mapped to a stable series ID when registered |
| L / R | Place / route |
| E | Evidence item or record |
| S | Exact spoken statement, versioned on correction |
| K | Proven proposition, distinct from possessing E |
| D / Q | Deduction / interrogation |
| C / V | Conversation / event |
| A | Visual or audio asset |
| B | Choice branch |
| H | Hint bundle for a specific D/Q or revisit bottleneck |

Keep IDs stable through renaming. Use the same IDs or explicit mappings in documents, data, tests, and continuity. Prefix requirement references with `REQ:` where necessary to distinguish R/C requirements from routes/conversations.

Actual world truth belongs in the truth ledger; an item's written/visible content in the evidence ledger; dialogue, choices, responses, feedback, and hint wording in the Korean script; judgment and activation conditions in challenge/event documents. Refer by ID rather than copying mutable text. A false document can legitimately differ from truth; record why. UI presentation state must not become an independent truth store.

## 00-brief.md — scope and status

```text
Project ID, provisional title, version, current production stage:
User requirements, authorized scope, proposals, and unknowns:
Execution responsibility: Codex owns intermediate decisions; user relays files only:
Current external dependency: exact packet/batch/revision and ready request, if any:
New work or registered sequel; relevant sources only:
5–7 substantial chapter commitment and definition of depth:
Core player experience, tone, investigation authority, content boundaries:
Direct player deductions vs facts characters may explain:
Estimated scale with authored basis; reading/reasoning/navigation time:
No inherited evidence quotas or local dialogue cap applied to whole game:
Planned runtime/input/save support (when decided):
Requirement map: R01–R17, U01–U09, C01–C06, I01–I07, N01–N08:
Exception, reason, alternative, and validation if needed:
```

## 01-concept.md — dramatic premise

```text
New theme, place, era, central emotion and surface problem:
Why the protagonist investigates; why the child participates:
What is strange, what the player initially believes, what remains open:
Relationship tensions and intended overall resolution:
Candidate vs accepted choices; rationale and unresolved design risks:
```

## 02-truth-SPOILERS.md — entire case truth

```text
Responsible people, acts, intent/responsibility boundaries, motives:
Preparation → execution → concealment → discovery:
Mechanism conditions, failure points, traces, physical calculations:
Absolute timeline: time | person | place | action | object | observer | trace
Object history: origin → holders/routes → transformations → final state
Knowledge per person: direct observation / hearsay / mistake / lie / reason
Actual time vs recorded/claimed time; independently established offsets:
Time ranges the player can actually prove:
Subsidiary incidents and effects on central evidence, observations, and alibis:
Companion actions/knowledge and non-complicity audit including memories:
Facts proven in play vs emotional details revealed in the ending:
```

## 03-deduction.md — hypotheses, proof, and chapter links

```text
Overall competing hypotheses (at least three substantively supported):
For each: claim / supporting E,S / plausibility / unresolved residue
Test action / refutation E,K / surviving facts and consequences:
For each D: player question / prerequisites / observation-to-proof steps
Accepted K / equivalent evidence sets and ordering / insufficiency reasons
Player-owned connections / permitted character explanation / feedback line IDs
Follow-up Q,V,L / cost policy reference / H bundle / shortest solution path:
Graph from final conclusion back to every actual acquisition action:
Cross-chapter map: resolution → changed interpretation → next investigable problem
Loops, shortcuts, early guesses, alternative routes, unverified assumptions:
```

## 04-characters.md — people and relationships

```text
P ID / series ID if registered / Korean display name / player-name behavior:
Role, work outside investigation, wants, fear, secrets, abilities, blind spots:
Pronounced eccentric behavior; speech/register with exact Korean examples:
Relations and concrete shared history; reason to cooperate, resist, or lie:
Knowledge limits and offscreen actions by time:
First encounter: current activity → meeting cause → name/role → memorable action
Introduction order and space before another new principal person:
Later encounters, changed behavior, ending/branch states:
Child: believable participation, supervision, own goals, contribution, limits:
No intentional criminal participation, including retrospective twists:
```

## 05-story-and-scenes.md and scripts/chXX.md — full story and actual text

```text
For each of the 5–7 main chapters, plus prologue/epilogue:
Distinct major mystery, opening interpretation, local question:
Independent investigation strands and multiple consequential D/Q:
Supported alternatives, rechecks, reinterpretation, substantive resolution:
Causal next-chapter consequence and relationship development:
Major events and revisits; player information/disclosure sequence:

For each C/scene:
Purpose / participants / L / story time / incoming knowledge and B,V state
Entry cause / forbidden disclosures / player-owned inference
Actual Korean S lines and observable action directions in script source
Choices: actual Korean protagonist utterance and each specific response
New E,S,K,B / event references / log title and correction links
Emotional/practical change / exit / repeat and revisit text / saved line position
```

The script covers ordinary investigation, first appearances, NPC interactions, personal/optional scenes, companion consultation, reenactments, interrogation before/after, correct/incorrect responses, recovery, H0–H4, rest, revisits, branches, and endings. No placeholders such as "joke here" count as finished. Full-script drafting/revision precedes implementation. Preserve breadth while trimming local repetition.

Use [the script handoff contract](script-handoff-format.md) to prepare actual per-batch MD sources and prompts and receive UTF-8 `.ko.md` screenplay plus `.notes.md` files. Record packet/revision, assigned coverage, stable C/S/B and condition references, and explicit missing items. Incoming versions remain candidates; the reviewed Korean script here is the accepted source. Do not create export or script placeholders before their actual content exists.

## 06-space-and-evidence.md — geometry and observable records

```text
Whole-site plan / floors / scale vs schematic / coordinates / zoom:
L: purpose, users, first-visit explanation, objects, sight and sound
R: endpoints/direction, travel ranges, access, dimensions, work/waiting
Actual and competing paths, carrying constraints, time calculations:
Player sources for geometry, knowledge-gated map, last-observed NPC positions:
First state → caused change V → revisit → reinterpretation and discovery route:

E: Korean name/type/original, purpose, author or generation process
Creation time vs acquisition time/location/action/condition
Visible shape, dimensions, writing, damage, arrangement, neutral context
Observation vs initial/later interpretation vs what it cannot establish
Authenticity/manipulation tests, independent-source grouping
Related P,L,S / thumbnail/detail A / required vs optional / missed acquisition route
Immediate-view queue and return reference / used by D,Q
```

## 07-events-and-state.md — activation and persistence

```text
V: cause, time/place, prerequisites E,K,B, trigger/blocker/priority
Actual world change vs discovery, natural cues, missed-event recovery
C and A references, new E,S,K, route/person changes, once-only effect ID
Start/running/end, return context, pending acquisition/acknowledgement order
Save/resume position and duplicate-effect prevention:

State authority and single public API for shared writable state:
Chapter/time/place/access; acquired E, proven K, S versions, D/Q completion
Conversation/event positions, branches/relationships, NPC last observations
Points/rewards/submissions/failures/hints; UI drafts/search/scroll/focus
Save version, migration/recovery rules; input → precondition → effect → persisted/UI result
```

## 08-challenges-and-hints.md — judging and recovery

```text
Point name/start/max, costs, optional rewards/replenishment, once-only rules:
Free actions; incomplete input; visible costs; error feedback line IDs:
Zero/recovery policy preserving records, knowledge, relationships, editable draft:
Q: target P/S version, prerequisites, free clarification script IDs
Submission statement + evidence + contradiction reason:
Valid and equivalent answers, insufficient sets, per-error explanations:
Exclusively unlocked E/K and their subsequent D/V use:
Logical vs strategic vs personality choices:
H per D/Q/mandatory revisit: conditions by knowledge/access/recent failure
H0–H4 script IDs, missing-evidence path, full solution and reason:
No future-information leaks; return and saved draft/hint state:
```

## 09-ui-and-direction.md — screens and assets

```text
Scene default, evidence/people/map/dialogue modals, spacious deduction modal:
Right companion area, notes/settings, understood objective's 추리하기 entry:
Objective revelation through events; chapter title; name-entry behavior:
Progressive people/places, image-centered evidence and immediate detail queue:
Directional scene exits consistent with map/routes; explicit travel vs inspection:
Compact searchable/filterable/sortable lists, sourced person details and timelines:
Conversation groups → list → full real branch and return:
Large dialogue portraits, same-size distinct-color italic action directions:
All answer types: tools, draft/order/text, close/Esc/Back/hint/save restoration:
Responsive/keyboard/touch/contrast/enlargement/long-title policies:
A: purpose/conditions/related facts, source/derivative, method, visible/hidden features
Alt text, crop/zoom, before/during/after state, actual review evidence:
```

## 10-validation.md — coverage, experiments, and actual results

```text
Requirement → exact design record → script scene → implementation → check/evidence
G0–G5 stage results, actual commands, build/date/environment:
Starting state/actions/expected/actual/source/verdict/unverified scope:
Failures and linked repairs/retests:
Writer packet version/model label if known, received draft, Codex editorial findings:
Revision actions, selected Korean source, fact changes and Codex acceptance:
Post-delivery user feedback (pending until the completed game is delivered):
Full script coverage and alternate knowledge/order review:
Independent first-reader and first-player conditions and actual observations:
Changes, rationale, affected IDs, rollback options and remaining risks:
```

## 11-series-handoff-SPOILERS.md — after the real work

Use [the case-record template](../series/templates/case-record-template.md). Reconcile actual outcomes, common/branch facts, character knowledge and relationships, unresolved threads, and implementation/testing limits. Only then update the registry, bible, and real case record. A future project path in this guide does not mean that file currently exists.

## Readiness test

A template containing only adjectives, counts, or "various clues" remains incomplete. Specify which observation contradicts which statement, why alternatives fail, what the player does, what actually changes, the Korean lines shown, and how it is checked. Document roles are organizational tools, not substitutes for full case and script quality.
