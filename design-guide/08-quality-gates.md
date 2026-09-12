# 08. Requirements, quality gates, and completion evidence

## Evidence discipline

Track `planned / authored / editorially reviewed / implemented / mechanically verified / visually inspected / independently playtested / unverified / failed / not applicable with reason`. These are distinct claims. A file does not prove implementation; automatic completion does not prove difficulty, humor, or enjoyment. Do not mark mandatory requirements inapplicable to remove them.

For each check record source/build/version, date, environment, starting state, actions, expected vs actual behavior, evidence location, verdict, and untested scope. Keep failed checks and link their retest rather than deleting history. Requirement IDs identify obligations; script IDs identify content.

## Retained requirements R01–R17

| ID | Requirement | Design authority | Completion evidence |
|---|---|---|---|
| R01 | Compact evidence/person lists without unreadable text | [05](05-ui-and-investigation.md) | Actual density, large-text and small-screen inspection |
| R02 | Distinct meaningful thumbnails for each evidence item | [06](06-visual-direction.md) | Whole thumbnail sheet and real item-finding observation |
| R03 | People detail with sourced statements and timelines | [05](05-ui-and-investigation.md) | Heard statements, correction links, no hidden knowledge |
| R04 | Physically coherent map and routes | [03](03-space-and-events.md) | Floor plan/data comparison, access and travel calculations |
| R05 | Grouped conversations and full logs | [05](05-ui-and-investigation.md) | Group/list/detail/return, actual branch only |
| R06 | All investigation tools available during every answer task | [05](05-ui-and-investigation.md) | Tool round trip with drafts, points, scroll and focus retained |
| R07 | Real wrong-claim point loss and recovery | [02](02-interrogation-and-hints.md) | Free inspection, correct cost, zero recovery, persistence |
| R08 | Interrogation-exclusive core facts and logical choices | [02](02-interrogation-and-hints.md) | Solvable prerequisites, new information, downstream use, retry |
| R09 | Misdirection that materially affects the central case | [01](01-case-logic.md) | Support, causal effects, refutation, surviving facts |
| R10 | Caused revisit evidence, conversations, and events | [03](03-space-and-events.md) | First state/cause/change/discovery, missed-visit route |
| R11 | Deep case/chapter reasoning and complete hint ladders | [01](01-case-logic.md), [02](02-interrogation-and-hints.md) | Full graph, alternatives, shortest path, H0–H4, first-play reasoning |
| R12 | Multiple meaningful events and situation images | [03](03-space-and-events.md), [06](06-visual-direction.md) | Chapter events and before/during/after visual states |
| R13 | Protagonist/companion narrative and investigation roles; no deliberate companion complicity | [04](04-characters-and-dialogue.md) | Actual actions/knowledge, scenes, truth and flashback review |
| R14 | Extensive protagonist-companion conversation and humor | [04](04-characters-and-dialogue.md) | Varied full scenes, relationship change, reader response |
| R15 | NPC individuality, humor, and direct interaction | [04](04-characters-and-dialogue.md) | Distinct actual behavior, speech, and NPC-to-NPC scenes |
| R16 | Series themes, roles, progress, and later continuity | [07](07-series-continuity.md) | New work sources; later branch/knowledge reconciliation |
| R17 | Shared MD and active-project instructions | [README](README.md), [template](templates/AGENTS.md) | Correct reading paths and substantive project documents when a project starts |

## Direct UI corrections U01–U09

| ID | Requirement | Authority | Evidence |
|---|---|---|---|
| U01 | In-world reasons guide action; explicit controls/costs remain clear | [03](03-space-and-events.md), [04](04-characters-and-dialogue.md) | Natural appointments/signs/dialogue plus usable UI |
| U02 | Acquisition immediately opens actual evidence detail and image | [05](05-ui-and-investigation.md) | Single/multiple acquisition, acknowledgement queue, close/resume |
| U03 | Scene default; evidence/people/map/dialogue modals; right companion notes/settings | [05](05-ui-and-investigation.md) | Desktop and responsive navigation with reachable controls |
| U04 | Reveal objectives after understanding the situation through events | [05](05-ui-and-investigation.md) | Opening and later chapter disclosure sequence |
| U05 | Objective's 추리하기 opens a spacious deduction modal | [05](05-ui-and-investigation.md) | Actual entry action and full tool round trip |
| U06 | Scene exits match physical direction and support travel | [03](03-space-and-events.md) | Observation/map/data agreement, locked-route behavior |
| U07 | Action directions match dialogue size, use distinct readable color and italics | [05](05-ui-and-investigation.md) | Rendered contrast, enlargement, mobile readability |
| U08 | Understand unfamiliar evidence/places with sufficient context | [04](04-characters-and-dialogue.md), [06](06-visual-direction.md) | Unbriefed reader/player explains purpose and current state |
| U09 | Image-centered evidence conveys described facts, with needed text and life detail | [06](06-visual-direction.md) | Original/image agreement, detail zoom, no missing crucial information |

U08 and U09 reinforce each other: distribute needed explanation across scenes and images while avoiding bloated detail panels. Do not remove essential information to shorten text.

## Direct character corrections C01–C06

| ID | Requirement | Authority | Evidence |
|---|---|---|---|
| C01 | Eccentric child companion, identity and relationship designed anew | [04](04-characters-and-dialogue.md) | Age-credible voice, supervision, contribution, independent characterization |
| C02 | Natural actual exchanges instead of robotic abbreviated dialogue | [04](04-characters-and-dialogue.md) | Concrete dialogue passages and first-reader feedback |
| C03 | Motivated first appearances, reappearances, and joining events | [03](03-space-and-events.md), [04](04-characters-and-dialogue.md) | Actual scenes showing activity, purpose, introduction, relationships |
| C04 | Register met people and unlock places situationally | [03](03-space-and-events.md), [05](05-ui-and-investigation.md) | Initial/encounter/unlock states without preview leaks |
| C05 | Introduce unfamiliar objects, roles, and terms naturally | [04](04-characters-and-dialogue.md) | Demonstration/dialogue/image comprehension before inference |
| C06 | Extensive actual dialogue across the whole game | [04](04-characters-and-dialogue.md) | Full coverage of main, optional, relationship, revisit, failure, hint and ending scenes |

The earlier request's unfamiliar-object examples were complaints about discarded content, not instructions to reuse those objects.

## Retained handoff context I01–I07

These IDs organize previously retained context; they are not fabricated verbatim user quotations.

| ID | Obligation | Authority | Evidence |
|---|---|---|---|
| I01 | Player name input with a stable protagonist identity | [04](04-characters-and-dialogue.md), [05](05-ui-and-investigation.md) | Name used in actual lines/records without changing stable IDs |
| I02 | Large readable dialogue portraits, compact list portraits | [05](05-ui-and-investigation.md) | Recognizable expressions at supported sizes |
| I03 | Visible chapter title/context without future answers | [05](05-ui-and-investigation.md) | Chapter transition and early-display audit |
| I04 | Chosen claim/question and actual response are spoken and logged | [02](02-interrogation-and-hints.md), [05](05-ui-and-investigation.md) | Selected branch lines; unselected branches absent |
| I05 | Understand the whole site with routes, direction, timing and zoom | [03](03-space-and-events.md) | Usable whole-space map and sourced travel information |
| I06 | Deduction does not take away investigation context/tools or drafts | [05](05-ui-and-investigation.md) | Every answer type and modal layer tested |
| I07 | Return to prior list/filter/scroll/focus and resume saved work | [05](05-ui-and-investigation.md) | Close/Esc/Back/hint/save round trips |

## Latest decisions N01–N08

| ID | Obligation | Authority | Evidence |
|---|---|---|---|
| N01 | 5–7 substantial chapters; full wall investigation is one chapter-scale reference | [00](00-production-principles.md), [01](01-case-logic.md) | Distinct chapter mysteries, internal proof chains, causal cross-chapter graph |
| N02 | Complete case/player-reasoning design and full script before implementation | [00](00-production-principles.md) | Full truth, structural walkthrough and reviewed script coverage |
| N03 | English planning, Korean actual script/game/user communication | [04](04-characters-and-dialogue.md) | Direct Korean wording; authoritative source ownership |
| N04 | Strong 나사 빠진 characterization, not interchangeable witty people | [04](04-characters-and-dialogue.md) | Observable behavior and reader preference |
| N05 | Clear situations and staggered memorable first encounters | [04](04-characters-and-dialogue.md) | Reader can associate role/name/action before another new focus |
| N06 | Trim local repetition without shrinking full dialogue or inference scope | [04](04-characters-and-dialogue.md) | Actual editorial comparisons and retained full coverage |
| N07 | ChatGPT drafting, repository-based source/logic/integration workflow | [04](04-characters-and-dialogue.md), [file handoff](script-handoff-format.md) | Versioned ready-to-relay packet, actual screenplay/notes files, stable IDs and branch coverage, Codex editorial findings/acceptance, post-delivery user feedback |
| N08 | Fresh start; discarded project/record removed; no premature new scaffold | [README](README.md), [current decisions](current-direction.md) | Actual filesystem, empty registry, no inherited facts or new implementation |

## Responsibility for gates

Codex performs the production reviews and decides readiness within the agreed scope. G0–G5 do not require intermediate user approvals. The user relays ChatGPT files and gives feedback after delivery of the completed game. Record internal editorial findings, functional/visual checks, and independent reader/player evidence separately; do not claim independent validation from author self-review.

## G0. Script readiness before implementation

Review the complete Korean script, not just a sample. Check all coverage in 04, all actual responses, first appearances, unfamiliar objects, scene transitions, emotional rhythms, and staggered introductions. Read scenes without character sheets and separately examine different knowledge/visit orders. Verify the player still owns key connections. Maintain the selected script and proposed fact changes separately. User-reported preference is evidence of preference, not an unseen screenplay's verified compliance.

For external drafting, inspect actual returned files, source/revision provenance, assigned scene/option/hint coverage, stable and resolvable IDs, knowledge boundaries, and explicit incomplete items against [the return contract](script-handoff-format.md). Review assembled batches and chapters before claiming full-script readiness. A file link, valid Markdown, or partial batch is not evidence that all requested paths were written.

## G1. Entire case and chapter reasoning

Trace every final claim backward to acquired facts and actual actions. Inspect all 5–7 chapters, each major mechanism, multiple investigation strands, consequential deductions and rechecks, strongest alternatives, source independence, shortest proof path, time/space/object feasibility, and cross-chapter consequences. Verify subsidiary incidents leave effects and revisits have causes. Review companion actions/knowledge through truth and memories. Evidence: actual truth ledger, player knowledge graph, refutation tables, physical calculations, walkthrough results, and unverified assumptions.

## G2. Systems and recovery

Use meaningful behavioral tests for progression, points, choices, events, and saves; checking a constant against itself does not validate a rule. Cover:

1. Different lawful investigation orders reaching the core information and ending.
2. Logical vs relationship choice costs, one charge per submitted attempt, free tools, incomplete answers.
3. Zero → retained evidence/notes/knowledge/relationships/draft → recovery → successful retry.
4. Equivalent valid evidence sets accepted, plausible insufficient sets rejected with useful feedback.
5. Event prerequisites, delayed revisits, simultaneous event/acquisition queues, and missed-essential recovery.
6. Saves during dialogue, events, wrong answers, zero, recovery, and edited final answers.
7. Repeat clicks/reloads without duplicate awards, evidence, costs, or events.
8. Every mandatory D/Q and revisit bottleneck has H0–H4 that fits current knowledge and actually releases the bottleneck.

## G3. Actual UI and visual behavior

Run the full investigation-tool round trip during evidence presentation, person selection, linking, time ordering, interrogation, and final deduction. Test close/Esc/Back/hints/save with partial drafts, filters, scroll, and focus. Verify objective timing, encountered-person registration, spatial exits, acquisition detail ordering, dialogue portrait/direction readability, notes/settings, real log branches, image state, and no early information leaks. Inspect supported desktop/mobile, long Korean titles, keyboard, touch, and large text. Image-file existence is only supporting evidence.

## G4. Independent first play

Recommended baseline: at least three people unfamiliar with the truth and with varied mystery experience. If unavailable, mark this gate unverified; author or automatic play is not independent. Collect only agreed necessary records. Do not require the user to play or review an intermediate build to satisfy this gate. If no independent players are available, deliver the completed game after the other required checks with G4 explicitly unverified; collect user feedback afterward.

Record chapter time separated into reading, inference, and navigation; actual hypotheses/support; reversals; errors/costs/recovery; requested hint stage; revisit reasons; remembered people/scenes; and confusion. An early culprit guess can coexist with deep proof. A single record solving everything is a failure. Unclear questions/terms require clearer presentation; blind repeated room clicking requires better discovery signals. H4 that cannot help progress, repetitive penalties without learning, answer-spoiling companion speech, or unmemorable interchangeable people require revision. Do not remove core puzzles as the default repair.

## G5. Handoff and report

Update planning, accepted script, case/branch/knowledge records, and audit to match actual work. Complete the required script, logic, functional, and visual checks before reporting production complete. Disclose any unverified independent-play evidence under G4; completed production does not imply verified reception or difficulty. For documentation-only work, verify requirements coverage, concrete templates, links, stale defaults, source roles, and requested cleanup; do not claim game lint/build/play results. Verify the filesystem before reporting deletion or creation.
