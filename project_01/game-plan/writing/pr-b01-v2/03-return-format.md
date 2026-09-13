# Attached return contract — YEOWUL-PR-B01-v2

Task-specific IDs, outputs and source versions are in00-task.md. This full contract has repository links removed; included source text provides required rules. Return complete r02, preserving stable IDs; no patch-only delivery.

# Script handoff and Markdown return format

Version: 1.1 / 2026-09-12
Status: production contract and templates. Actual project exports, returned files and acceptance are tracked in each active project's writing index; the existence of an export never establishes a completed screenplay.

## 1. Place in production

Follow the production sequence. Design the entire case, people, 5–7 substantial chapters, player reasoning, and information disclosure before full script production. A small style experiment may happen earlier, but cannot establish the full case or authorize implementation.

Codex prepares versioned authoring packets from repository originals. The user supplies those files and the request to ChatGPT, then brings the returned files back for inspection and incorporation. This workflow description does not itself upload files, send messages, or create a ChatGPT project.

ChatGPT drafts and revises actual Korean scenes. Codex owns editorial judgment, factual support, knowledge limits, player agency, branches, references, revision requests, acceptance, and integration. The user is the file courier during production, not an intermediate reviewer. User feedback comes after delivery of the completed playable game. Follow the execution responsibility policy in guide 00; do not stop for user approval of each draft or stage.

On each handoff, provide the exact attachment inventory and ready-to-paste prompt. On return, inspect the actual files and continue automatically. Codex may repair small format or consistency issues directly while preserving the selected voice, recording any substantive source effects. For substantial writing revisions, prepare a targeted ChatGPT packet; consolidate related fixes and do not ask the user to diagnose problems or choose a preferred draft. Incorporate only a reviewed revision into the accepted repository script.

Finish and review the full script, including alternate responses and supplemental scenes, before game implementation. The technical slice remains a later integration step.

## 2. Packet prepared for each writing assignment

Generate the following files only when the relevant actual planning exists. English instructions accompany exact Korean names, voice examples, originals, and accepted lines where wording matters. This is an export of the authoritative plan, not a second independently maintained plan.

| File | Required content |
|---|---|
| `00-task.md` | Packet ID/version, project/chapter/batch ID, exact assigned C/S/B/D/Q/H IDs, draft or revision task, source inventory and versions, exact output filenames/revision, completion checklist, local editorial goals, required and deliberately deferred content |
| `01-writing-context.md` | Full central truth and chapter architecture, necessary mechanisms and assumptions, actual timeline, character motives/relationships/voice/knowledge, authoritative terminology, and unresolved facts explicitly labeled |
| `02-scene-brief.md` | Ordered and branching scene map for this batch, who has met whom, entry/exit conditions, current E/S/K/B, character objectives, unfamiliar context to introduce, permitted disclosures, forbidden disclosures, player-owned deductions, required actual choice/error/hint/revisit responses, and exact relevant evidence originals |
| `03-return-format.md` | A copy of this return-format contract; task-specific IDs and outputs are supplied by `00-task.md` |
| `04-request.md` | The writing or revision prompt with actual task details, ready for the user to paste without filling placeholders |
| Previous accepted text / draft under revision | Attach when continuity or revision requires it; identify its exact version and whether it is accepted or still a candidate |

The packet inventory must enumerate every necessary attachment, including previous text. Check it against the current truth, reasoning, character, scene, evidence, and challenge originals. A synopsis must not replace wording or physical details needed to avoid errors. Include the real full truth for the author while separately marking what a character or player can know at each scene. Reading a spoiler source is never permission to disclose it in dialogue.

Make the exported packet self-contained. Include the normative guidance the assignment needs; repository paths are provenance references, not files ChatGPT can be assumed to open. Remove repository-navigation links from the exported format copy or include the necessary referenced text in the packet. An inaccessible link must not be the only source of a writing rule or required fact.

If the actual plan is insufficient, Codex repairs it before exporting. Resolve ordinary design questions within scope; record any genuinely unresolved dependency explicitly instead of making routine creative choices a user approval gate. Do not ask the writer to quietly invent a culprit, device behavior, timeline, accepted answer, or essential clue. Incidental wording/blocking can be flexible within defined boundaries.

## 3. Writing units and full coverage

A chapter is a planning unit, not necessarily one model response. Assign a manageable group of complete scenes with explicit boundaries. Introductions, ordinary investigation, confrontation, errors/hints, revisits, and endings can be separate assignments. Do not split mid-utterance or shorten a whole chapter to fit one response.

A new batch includes the chapter map and relevant accepted preceding scenes; a different chat is not assumed to remember earlier work. Review chapter-wide continuity after assembling batches, then cross-chapter continuity after the full script is drafted. Track all main and alternate paths, not only the ideal solution run.

Local pacing targets are editorial guidance, not fixed global quotas. Preserve the strong characterization and natural Korean that the user preferred, stagger introductions, explain immediate situations, and cut repeated exchanges rather than necessary context.

## 4. Returned files

Return **two actual UTF-8 Markdown files**, with filenames specified in `00-task.md`. Example naming only:

- `script-ch01-b01-r01.ko.md`: Korean screenplay with minimal author metadata and explicit branch structure.
- `script-ch01-b01-r01.notes.md`: English author notes, coverage, unresolved matters, changes, and proposed factual revisions. Quote exact Korean passages when needed.

Increase the revision number on revision. Return the complete assigned batch, including unchanged scenes, not only a patch or a list of changed lines. Keep previous revisions distinguishable. The main file's status remains `draft` on delivery; acceptance is Codex's repository review decision, with no intermediate user sign-off.

Provide real file attachments/download links when supported. A claimed filename, a fake link, or a chat synopsis is not a returned file. If the environment cannot create downloadable files, state the limitation and provide each complete file in its own labeled fenced block as a fallback, marking delivery `text-only`. It must still be saved and checked as a file before incorporation; do not claim the attachment requirement was met.

## 5. Screenplay file structure

Use Markdown paragraphs rather than a table or JSON for actual dialogue. Keep IDs and structural metadata distinct from player-visible content. The following skeleton is a format example, not a finished scene or fictional fact:

````markdown
# CH01 — [한국어 장 제목]

- Packet: [ID and version from 00-task.md]
- Batch: [assigned batch ID]
- Revision: [requested revision]
- Status: draft

## C_CH01_001 — [한국어 장면 제목]

### Context
- Place: [L ID]
- Cast: [P IDs]
- Entry: [source condition reference]
- Exit: [source condition reference]
- World effects: [source V/E/K/B references, or none]

### Script

*[관찰 가능한 실제 한국어 행동 지문]*

**P01 | [표시 이름] [S_CH01_001_001]**

[한국어 실제 대사]

**P02 | [표시 이름] [S_CH01_001_002]**

[앞말과 행동에 반응하는 실제 한국어 대사]

### Choice B_CH01_001

- Type: [logical / strategy / relationship, as assigned]
- Rule: [source challenge/branch condition reference]

#### Option [assigned option key]

- Label: [실제 한국어 선택지 문구]
- Next: [assigned branch/scene/merge reference]

**P01 | [표시 이름] [assigned S ID]**

[이 선택에서 실제로 말하는 한국어 대사]

**P02 | [표시 이름] [assigned S ID]**

[이 선택에 대한 실제 한국어 응답]

### Merge [assigned merge reference]

[공통으로 이어지는 실제 한국어 대사와 행동]
````

Use the provided IDs, not literal placeholders. Omit Choice/Merge sections for a linear scene. For a branching scene, include **every assigned option and its actual consequences**, including failure/retry or other branch endings. Do not merge branches whose knowledge, relationship, or subsequent text differ; preserve their separate references or explicitly supplied conditions. Not all branches have a merge.

Place hints, failure responses, recovery, and revisits in their own assigned C sections with D/Q/H/condition references. A task can end at an explicit `Player task: D...` or `Player task: Q...` checkpoint; write any preceding lines and every assigned post-task result path. The checkpoint represents deliberate player activity, not missing dialogue, and must not be replaced by automatic solution speech.

Every spoken S ID is unique in the complete project. The exporter allocates collision-free IDs/ranges for new lines; retain IDs when revising an existing utterance. Do not renumber an entire batch because lines moved. Retired and newly used IDs are reported in notes. Substantive changes to established testimony also require review of its meaning/version and dependent evidence or tasks.

Actual utterances, choice labels, scene titles, and observable action directions are Korean, written directly in Korean. English Context fields and IDs are author metadata, not dialogue or game UI. Keep speaker-display names within the supplied public knowledge; do not expose a hidden identity through a label. Do not invent catchphrases, mysteries, or biographical exposition merely to populate metadata.

Do not insert a cast biography or explanation of why the humor works. Explain necessary situational context naturally in the scene. An action direction may be a readable sentence or paragraph; later UI must preserve its required size/color/italics. Do not put implementation instructions into the player-facing lines.

## 6. Notes file structure

```text
Packet / chapter / batch / revision / source versions:
Delivery: files or text-only
Coverage: assigned scene, option, failure, revisit, and hint IDs
For each item: written / blocked / deliberately not assigned; exact reason
New S IDs / retired S IDs / unchanged identities:
Proposed fact changes: none, or old source → proposed change → reason → affected IDs
Unresolved source conflicts or required context:
Revision summary with exact affected IDs:
Actual checks performed and their limits:
```

Do not claim fun, naturalness, difficulty, or complete coverage without evidence. Do not use `complete` for a batch with missing assigned paths. If a task exceeds the response/file limit, deliver only complete bounded sections, list the exact outstanding IDs in notes, and mark the batch incomplete. Continue from those IDs; never summarize away the missing content or silently shrink the task.

## 7. Reusable request template

For an actual assignment, Codex writes `04-request.md` from this template and the completed task packet. The generic block below depends on the actual attachments; it is not a ready new-game request while no plan exists.

```text
Read every source file listed in the attached 00-task.md, including the return-format contract and any previous accepted text or draft under revision. If a required source is inaccessible or conflicting, record the exact issue in the author notes for Codex instead of inventing it. Do not require the user to make editorial or design decisions; the user relays the files.

Complete exactly the scene batch assigned by 00-task.md. Use the full author truth only to preserve consistency; obey each scene's character/player knowledge and disclosure boundaries. Leave player-owned deductions to the supplied task checkpoints. Write actual Korean dialogue, action directions, choices, and all assigned alternate responses directly in Korean.

Preserve pronounced 나사 빠진 characterization, clear first encounters, spaced introductions, and natural responsive Korean. Shorten repeated demonstrations and redundant negotiation while retaining situational explanation and the full assigned coverage. Do not add a cast biography or explain the jokes.

Create the two UTF-8 Markdown files named in 00-task.md, following 03-return-format.md: the Korean screenplay and separate English author notes. Use the assigned scene/statement/branch IDs and source condition references. Return the complete batch on revision, preserving stable IDs and reporting new or retired ones. Do not silently change facts, judging rules, access, or event effects; place proposed changes in the notes.

Check required scenes, options, speaker IDs, transitions, language, and unfinished content against the task list. Report only checks actually performed. If any assigned content remains unwritten, list the exact missing IDs and mark the batch incomplete rather than replacing them with a summary.

Reply briefly in Korean with links to the actual generated files. Do not paste the whole screenplay into the chat when downloadable files are available. If file creation is unavailable, say so and return each complete file in a separately labelled code block, marked as text-only delivery. Never claim a file exists when it does not.
```

## 8. Receiving, review, and incorporation

1. Inspect actual returned files: readable UTF-8, correct packet/revision, assigned coverage, unique/resolved IDs, valid branch transitions, and no placeholder text. An attachment's existence is not proof of script completion.
2. Compare factual assertions, character knowledge, evidence wording, player checkpoints, costs/effects, and branch outcomes with source originals. Unexpected author proposals require explicit resolution rather than silent canon changes.
3. Codex reads the Korean scenes for clarity, first appearances, memory load, voice, eccentricity, local length, and meaningful responses. Record concrete editorial findings separately from mechanical checks; do not request intermediate user feedback or represent self-review as independent reader evidence.
4. Fix minor issues directly where appropriate, or prepare a concrete revision task containing affected IDs, observed problems, preserved strengths, current sources, and requested output revision. For ChatGPT revisions, supply complete ready-to-relay files and request complete revised files again. Further rounds depend on actual unresolved findings, not a mandatory user review ritual.
5. Incorporate the reviewed candidate into `game-plan/scripts/chXX.md` or explicitly indexed scene files when a real project exists. Keep a coverage index and provenance in validation records. Incoming files are versioned candidates, not a parallel public script source.
6. Reconcile chapter-wide and then full-game continuity, knowledge, alternate paths, full required script coverage, and G0/G1 before implementation. Codex then continues into adaptation and full implementation without a new user approval request. Convert to runtime data afterward; the Markdown is an authoring contract, not an already implemented importer.

No new project, export folder, runtime schema, or parser is required just to define this process.

