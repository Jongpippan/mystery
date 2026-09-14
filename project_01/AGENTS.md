# Project instructions — 여울관: 남겨 둔 자리

Adapted from `../design-guide/templates/AGENTS.md` on 2026-09-12.

## Project metadata

- ID: project_01; title: 여울관: 남겨 둔 자리.
- Status: completed local delivery, accepted-full-r03-c01, 2026-09-14. G0/G1 source readiness and G2/G3 implementation checks passed; G5 local handoff recorded. G4 independent first play remains unverified. No public deployment or sequel is implied.
- Scope: prologue, six substantial investigation chapters,36 required tasks,52 evidence originals, epilogue, actual branch archive and retained saves. No screenplay relay or intermediate user review is pending.
- Runtime: game/ (Vinext/React). Windows player launcher: 게임 시작.cmd; built URL http://127.0.0.1:4173/. Developer preview: npm.cmd run dev on5173.
- Verification from game/: npm.cmd test, npx.cmd tsc --noEmit, npm.cmd run lint, npm.cmd run build. Canonical import: node scripts/import-screenplay.mjs. Current unit total229 pass. Browser commands and exact results are in the final report; do not infer independent play from automation.

## Read first

1. ../AGENTS.md and shared design-guide/README.md,00-production-principles.md,current-direction.md and relevant topic guides; all00–09 for full production.
2. game-plan/validation/final-integration-2026-09-14.md and game-plan/14-assets-and-delivery.md for the delivered runtime, source selectors, generated assets, verification and explicit limits.
3. Actual requested files and game-plan source ledgers/scripts. Earlier chapter/integration checkpoints are historical, not an outstanding-work list.
4. ../series/README.md, series-bible-SPOILERS.md and cases/project_01-SPOILERS.md for actual common/branch continuity. Start another project only when requested.

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
