# Project instructions — 여울관: 남겨 둔 자리

Adapted from `../design-guide/templates/AGENTS.md` on 2026-09-12.

## Project metadata

- ID: `project_01`; working Korean title: **여울관: 남겨 둔 자리**.
- Stage: complete screenplay accepted as accepted-full-r03-c01; G0/G1 internal script/design readiness passed on2026-09-14. Continue adaptation, implementation and G2/G3/G5 verification; G4 independent play is unverified. No writer return is pending.
- Authorized scope: six substantial investigation chapters, prologue and epilogue; full Korean script through ChatGPT file relay; autonomous editorial acceptance, adaptation, implementation, verification and playable delivery.
- New first work, with no inherited case, cast, code, assets or quotas. Project facts are planned, not released series canon.
- Actual runtime: `game/` (Vinext/React). From that directory run `npm run install:ci`, `node scripts/import-screenplay.mjs`, `node --test tests/opening.test.mjs`, `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `npm run dev`. Implementation remains incomplete; command existence does not imply a completed game.

## Read first

1. `../AGENTS.md` and `../design-guide/README.md`.
2. `../design-guide/00-production-principles.md`, `../design-guide/current-direction.md`, every topic guide 01–09 and `../design-guide/script-handoff-format.md`.
3. `../series/README.md`, `../series/series-bible-SPOILERS.md`, `../series/next-installment.md`. No predecessor case applies.
4. `game-plan/00-brief.md`, actual project ledgers, review records, accepted scripts when present, and pending packet inventory. Recheck actual incoming files before assuming a draft arrived.

## Working rules

- Reply in Korean. Write author-facing planning in English and actual screenplay, directions, evidence originals, choices, hints and UI in Korean.
- Keep full scope: the movable partition is CH01's complete local investigation, not the six-chapter architecture.
- Truth, people, routes, clues and player proof must agree. Finish the full script and G0/G1 review before any game scaffold or technical slice.
- Codex owns planning, structural/editorial decisions, revision requests, acceptance, integration and tests. No intermediate creative approvals. The user only transports ready ChatGPT packets and returned files, then gives feedback after completed-game delivery.
- Do not write substitute missing screenplay to evade the external drafting dependency. Minor format/consistency repairs are allowed with recorded provenance. One accepted Korean script source per scene.
- Create new material without consulting discarded files, Git history, or provisional dialogue fixtures as canon. Select art after design.
- Preserve clear first encounters, strong 나사 빠진 behavior, full dialogue breadth, actual NPC interaction and player-owned reasoning.
- P01 is eleven, supervised, and never knowingly assists crime, conceals evidence or performs hazardous/formal work. This is invariant in flashbacks, optional branches and sequels.
- Retain interrogation-exclusive facts, visible wrong-submission loss, repeatable recovery with editable drafts, all-tool access and H0–H4 for every required challenge and revisit.
- Follow scene-default/modal UI, right companion notes/settings, evidence detail acquisition queue, directional travel and knowledge-gated access. Use Tailwind/shadcn/ui preserving Radix semantics; prefer explicit components and local state. Shared writable state has one public API and one source.
- Common rules belong in `../design-guide`; concrete facts/scripts/results here; real supported continuity in `../series`. Reference IDs instead of creating competing truth or script stores.
- Log exceptions, rationale, alternatives and validation. Do not shrink scope or invent approval gates.

## Verification and delivery

Follow goal/criteria → inspection → steps/risks/rollback/checks → coherent edits → verification → report. Track every R01–R17, U01–U09, C01–C06, I01–I07 and N01–N08 against actual evidence and G0–G5.

Separate planning authored, script authored/reviewed, implemented, mechanically verified, visually inspected and independently playtested. No automatic walkthrough proves fun or first-reader comprehension. Do not invent commands or mark a draft as a release. Use the workspace commit/PR conventions only when those operations are requested.
