# Adaptation and implementation plan

Started2026-09-14 after `validation/full-r03-review.md` accepted G0/G1. Target is the complete playable six-chapter game, not the first integration slice. Sites capability path, portable Vinext/React starter in `project_01/game`; local saves are explicitly required, with no account/database gameplay dependency. The Site remains private until full implementation and validation permit deployment.

## Acceptance criteria

- All ten canonical script files feed the game without reauthoring Korean scenes in components; all170 scenes and36 required tasks retain their branches and knowledge boundaries.
- Scene-default UI, right companion tools and one accessible modal navigation surface support evidence/people/map/history/notes and every answer type with unchanged drafts.
- One shared game state/API owns acquired knowledge, scene/branch/event state, points, recovery, tool return state and versioned local saves. Commit errors cost once; incomplete input and inspections are free.
- Evidence has52 distinct meaningful views/thumbnails, original Korean text, acquisition queue, source/claim boundaries and caused physical changes. Character/location/event art follows the reviewed geometry and supervision.
- G2 behavior tests and G3 real desktop/phone, keyboard/touch and200% text checks must pass before delivery; G4 remains explicitly unverified without independent players. Source counts and a first slice cannot satisfy these.

## Steps and change boundaries

1. Create a deterministic importer for the accepted scripts with source hashes and stable utterance IDs. Preserve section/condition metadata for explicit scene adapters rather than rendering author notes.
2. Integrate the opening's actual text, relationship choice and saved position in the intended teal hotel scene / dark ink / paper tools theme. This tests the scene/state/tool boundary; it does not replace full adaptation.
3. Adapt all chapter scenes, physical visits, optional windows and relationship callbacks; add explicit typed proof roles and alternatives for every D/Q. Compile Korean utterances from accepted sources, never duplicate them in judging code.
4. Add accurate evidence documents/diagrams, image assets and meaningful before/during/after events. Inspect all actual asset views and prevent early metadata disclosure.
5. Test lawful alternate orders, costs/recovery/reload/idempotency, all tool round trips, all hint bottlenecks and full final role reconstruction. Run real lint/type/build commands and rendered QA.
6. Privately publish the verified complete game with Sites, verify the deployment, and update continuity/delivery records. Do not publish an incomplete slice.

## Skill and user instruction reconciliation

Sites-building requests a first meaningful local preview and asset-only image delegation. The first image subtask has exactly three opening assets, outside the Site checkout; only the owner edits/registers/hosts. The user asks for feedback only after completed-game delivery, so local testing does not become an intermediate review/approval request. Browser functional and visual QA is explicitly required by the user's adopted G3 requirements; perform it without asking again. No speculative backend, sign-in, uploads or social preview image is added.

## Risks, rollback and test scope

Primary risks are flattening alternate branches into one transcript, evidence collection automatically granting deductions, hints leaking correction-only facts, duplicate effects on restore, and image/text mismatch. The importer preserves source structure; scene adapters and judgment are explicit. Automated tests assert behavioral state transitions, not merely count data. Visual assets are generated separately from exact document typography/geometry.

Raw returns and reviewed snapshots stay frozen. Canonical sources remain in `game-plan/scripts/`; generated game data is a derived build artifact. Revert an implementation edit without changing accepted story sources. A newly found source defect requires a small logged editorial amendment and affected checks; it does not automatically require another writer relay. No goal scope reduction or user progress review is used as a shortcut.

Actual commands and outcomes will be recorded in `10-validation.md` as they exist; this plan does not claim implementation or testing completion.
