# Mystery workspace instructions

This workspace holds shared mystery-game production guidance and future project directories. Reply to the user in Korean. Write author-facing planning MD in English; write actual screenplay dialogue, action directions, evidence originals, hints, choices, and game UI in Korean.

## Start here

1. Establish the user's requested project and scope. A document request does not authorize game implementation.
2. Read [the guide](design-guide/README.md), [production principles](design-guide/00-production-principles.md), and [current decisions](design-guide/current-direction.md).
3. Read the relevant topic guides and [quality gates](design-guide/08-quality-gates.md). Read all guides 00–09 for full production.
4. Read the target project's instructions, actual files, and game plan if an active project exists. Do not inspect excluded or discarded projects as creative reference.
5. Read [the series registry](series/README.md) and [bible](series/series-bible-SPOILERS.md). Read case records only for registered works relevant to an actual sequel.

## Scope and continuity

- Current and accumulated user instructions take precedence. Apply common rules within the authorized scope.
- Start the new series without inheriting discarded incidents, tricks, people, worlds, images, implementation structures, or numeric content quotas. Residual files and Git history are not creative sources.
- Shared principles belong in `design-guide/`; concrete project facts, scripts, and results belong in that project's `game-plan/`; continuity belongs in `series/`.
- The current hotel discussion and dialogue fixture are proposals, not registered canon. An approved writing direction does not approve every test character or setting.
- Do not create an empty project or implementation scaffold during common-document cleanup. When actual new-project planning begins, create its instructions from [the template](design-guide/templates/AGENTS.md) and write substantive planning documents.
- Reusing the folder name `project_01` does not revive its discarded contents. Choose assets only after the new design establishes their suitability.
- The child companion must never knowingly participate in crime, including retrospective sequel twists.
- Do not shrink chapter depth, total scope, dialogue breadth, or required systems to make completion easier. Explain any design exception, alternative, and validation in the project plan; ordinary decisions within the authorized scope do not need an invented approval process.
- For full-game production, Codex owns all planning, editorial acceptance, implementation, and verification decisions within scope; do not request intermediate user review. The user only relays ChatGPT source/prompt and returned files, then gives feedback after the completed game is delivered. Follow the execution policy in guide 00.
- Preserve one source for each fact and accepted script. Identify proposals, unknowns, branches, and verified facts explicitly.

## Work and reporting

Restate the goal and acceptance criteria, inspect relevant paths, identify small change points, plan steps/risks/rollback/verification, implement coherent changes, and run checks appropriate to the actual work. Keep edits reviewable and avoid unnecessary abstractions. For UI implementation, prefer Tailwind and shadcn/ui while preserving Radix accessibility. Prefer local state; shared writable state needs one source of truth and one public API.

Report planning authored, script authored/reviewed, implementation, automated checks, visual inspection, and independent playtests separately. A document, asset file, green test, or automatic walkthrough does not prove fun, difficulty, or first-reader comprehension. Use the project's real commands; do not invent test results.

Use `type: short summary` commits if committing is requested; allowed types are feat, fix, refactor, chore, docs, test, perf, ci. PRs should cover Issue/Background, Summary of changes, Review points, UI changes, and Test results.
