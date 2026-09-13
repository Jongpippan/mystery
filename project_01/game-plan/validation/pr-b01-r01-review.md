# PR-B01 r01 — receipt and editorial review

Date:2026-09-12. Reviewer: Codex (author/editor), not an independent reader. Decision: **revision requested; not accepted**. Scope: the actual complete returned first prologue batch and its notes, not the whole prologue or game. The user delivered files and was not asked to make editorial decisions.

## Receipt and provenance

- Source packet: `YEOWUL-PR-B01-v1`; source snapshot `plan-v1`.
- Candidate: [script-pr-b01-r01.ko.md](../writing/script-pr-b01-r01.ko.md).
- Candidate SHA-256: `e0cf33b7d38a73bfcdb057441cffe4734d8eb49752e657277f65ce16b2e498e4`.
- Notes: [script-pr-b01-r01.notes.md](../writing/script-pr-b01-r01.notes.md).
- Notes SHA-256: `1ae6d7aa4833e5188032e09e7d37370e3acf5324f28abf3bae9ca1bd8d35fad7`.
- Delivered as actual readable UTF-8 files. Model/settings are unreported. The writer's own check claims remain attributed to the notes, not automatically verified by this review.
- Original candidate files and already-relayed v1 ZIP/loose sources remain unchanged. No accepted script source has been created.

## Actual reading and narrow checks

Read the Korean screenplay continuously before using the returned author notes as a checklist, then compared both B_PR_01 paths, both B_PR_02 paths and their conditional callbacks against the task brief, source originals and current facts. No character-biography prose was needed to identify the host's role or the manager's immediate work. This is an editor's reading, not proof an unfamiliar player will remember everyone or find the scene funny.

Mechanical scan of the actual candidate:

- Five distinct expected scene headers C_PR_01..05.
-113 spoken S IDs, all unique and in the allocated scene ranges; per scene13/24/20/33/23. These counts include mutually exclusive branches and are not a reading-time or quality claim.
- Four expected option keys: help_queue, protect_papers, environment_first, ask_voice_later; both merges and both prior-choice callbacks present.
- Evidence sections appear E02→E03→E01, at the assigned scenes. Exact blocks match the task-local Korean originals; the source-ledger E02 typo is addressed below.
- Only P00/P01/P02/P03 are introduced. No new crime, guilty identification, D/Q/H task or later named cast is written.
- No game runtime, visuals, branch-execution/save behavior or independent first read/play was tested. A valid file structure does not clear G0.

## Strengths to retain

1. P02's umbrella system physically blocks dry passage, and she must rearrange it. C_PR_02 gives her a job, name and role before the next new principal; the two player responses change who does the work.
2. C_PR_04 gives the established aunt/niece a quieter scene before P03. B_PR_01 callbacks remember the actual choice, and B_PR_02 gives concrete consent-respecting responses rather than a scored personality quiz.
3. P03 enters because P02 delegated the real work packet. At S_PR_05_0003–0008 his clip recovery conflicts with P00's need to inspect the initial binding; no ominous villain sign is needed.
4. C_PR_03 makes the safe area, public orientation and off-site lodging understandable. These practical facts should survive revision even though the repeated recitation should not.
5. Evidence originals and return notes are substantive. The writer explicitly identified a real source typo instead of silently inventing a different fact.

## Findings and exact revision actions

### R01 — input name must appear in self-introduction

S_PR_02_0003 currently says `나여백입니다.` while P02 uses the user-entered name. Keep the P00 author identity/default speaker label, but use the intended display token in the actual self-introduction: `{playerName}입니다.` Remove Markdown inline-code styling around the token in spoken sentences; metadata may still use code formatting. Preserve stable P00 and the child's **이모** address. This is required behavior, not a stylistic preference.

Default protagonist names in author-facing speaker labels remain valid and bind to P00 during adaptation. Player-visible narration that uses the default name must also resolve through P00 when adapted; do not introduce a new nickname/identity to evade the display-name requirement. No new runtime token language is required in this revision.

### R02 — resolve the actual source typo, with responsibility assigned correctly

The original E02 ledger said `모눈와`; the local exact brief and returned evidence correctly say `모눈과`. The error came from Codex's name substitution in the planning source. Correct authoritative E02 to **모눈과**, record that ledger as plan-v1.1, and preserve the already correct returned E02 wording. No mystery fact or permission changes. The old v1 export is an immutable historical snapshot; v2 includes the correction explicitly.

### R03 — remove author IDs from observable action prose

C_PR_03's final direction says `E02와 E03은 탁자 위에서…`; C_PR_05 directions include `E01 모서리` and `E01과 봉투 안쪽 서류…`. These are observable/player-readable directions, not Context. Replace them with the actual Korean item names or natural object nouns. Keep E IDs in Context and evidence section headers, where the contract expects metadata. This separation matters because actions are displayed at dialogue size, not discarded as implementation notes.

### R04 — shorten the prolonged unmet toilet need and repair small physical jumps

C_PR_01 S0001–0013 and C_PR_02 through the merge repeatedly hold the same urgent practical need while introducing several other exchanges. Preserve P00's foolish labeling priority and P01's impossible lost-property idea, but let the practical sequence advance without more rounds of toilet jokes. In C_PR_02, resolve the dry passage and point to the nearby toilet promptly; C_PR_03 may show P01 returning. Keep all five scenes and both B_PR_01 responses.

C_PR_01 introduces a bag already containing P01's wet socks without a preceding action establishing it; prefer removing this incidental prop or showing an ordinary coherent action, not an unexplained jump. In protect_papers, the document bag is behind the desk on a dry shelf, then the merge relocates luggage together: show its retrieval/carry to L02 briefly. These are continuity repairs, not new clues or a request for meticulous narration of every movement.

### R05 — stop restating settled boundaries and job instructions

E02 already states the safe-area rule. C_PR_03 S0008–0013 repeats it across four voices; S0016–0018 rehearses the work/supervision scope again before C_PR_05/E01. Retain the clear exact evidence cards, one credible acknowledgment and one concrete supervision arrangement; let the next response react to what was just done rather than repeat the same rule.

The original brief also over-prescribed these confirmations. This revision relaxes repeated formulations while retaining the same safety, access, consent and family facts. Do not cut necessary orientation, E02/E03 or the child's actual reaction. This is local removal of redundancy, not a reduction of dialogue breadth across the game.

### R06 — use a concrete scene ending instead of stating its theme

S_PR_04_0051 (`내 일은 원본이 어디서 왔는지 놓치지 않는 것. 네 일은 녹음할 때 사람을 놓치지 않는 것.`) explicitly summarizes the work's theme; S0052–0053 then returns to the already resolved toilet joke. Replace this ending with a practical action/reaction that leaves their differing recording plan and settled consent rule intact. Do not replace it with another maxim. Retain both B_PR_02 paths and both prior-choice callbacks.

The short cough/sneeze escalation S_PR_04_0023–0027 can remain if it earns its space after other repetition is removed; this is not a demand to make the child entirely sensible or strip the scene of playfulness.

### R07 — end the clip dispute once it has changed the work

C_PR_05 S0003–0008 establishes a useful conflict and the concrete inspection-first solution. S0015–0018 and S0022–0023 reopen the same clip terms after agreement. Keep the strongest initial interaction, P03's real job instructions and a distinctive departure; remove repeated negotiation. Do not flatten P03 into a generic polite clerk, make him sinister, drop E01 or collapse his first encounter into a summary.

### R08 — keep incidental umbrella labels from adding a new building

The initial umbrella labels include `별관 2`, although no hotel annex is designed. The owner's imaginary room assignments may remain absurd, but remove the unplanned annex label. If numerical umbrella 'rooms' remain, they are her labels, not an expansion of accessible hotel geometry, a new asset requirement or a clue. No new location or mystery should be added to explain the joke.

## Acceptance criteria for r02

- All five C, four explicit options, two merges and two conditional callbacks remain complete with actual spoken reactions and coherent physical transitions.
- R01–R03 source/name/metadata corrections are resolved exactly; E01/E02/E03 content and acquisition order remain intact.
- Toilet need, safety rule, work scope and clip disagreement progress once understood. No global percentage/line/word target and no reduced full-game scope.
- C_PR_04 ends in an action/exchange, not an explicit theme statement plus recycled joke. Eccentricity still causes visible inconvenience and gives the four people different priorities.
- No new culprit clue, essential mechanism, cast member, place, access, knowledge or ending fact is invented.
- Reuse S IDs for retained/reworded utterances in the same conversational role; never reuse a retired ID for an unrelated new line. List retired/new/retained IDs. Return the complete r02 batch, not a patch.

This is one concrete revision request based on actual findings, not a ritual requirement for more rounds. Review r02 against these criteria and accept if resolved; do not invent a mandatory number of revisions or ask the user for intermediate feedback.

## Next work and rollback

Export `YEOWUL-PR-B01-v2` with updated full context, exact five-scene brief, return contract, this review and both unchanged r01 files. Required new outputs: `script-pr-b01-r02.ko.md` and `script-pr-b01-r02.notes.md`. Preserve v1/r01 bytes to compare actual edits and roll back a proposed revision without losing the selected voice.

After r02 acceptance, PR-B02 will include actual accepted predecessor text and cover C_PR_06..11. Full Korean tasks/hints/branches across all six chapters remain unwritten; implementation is still premature. Author review, mechanics, visuals and independent reader/player evidence must remain distinct.
