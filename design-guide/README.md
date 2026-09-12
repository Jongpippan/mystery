# Mystery production guide

Version 3.0 / 2026-09-12

Build a deeply reasoned mystery with memorable eccentric people, extensive Korean scenes, and investigation tools that support the player's own proof. These guides contain common rules, not a finished case or inherited world.

## Current state and first read

Read [workspace instructions](../AGENTS.md), [production principles](00-production-principles.md), and [current decisions](current-direction.md). The discarded `project_01` and its residual case record have been removed from the working tree. No replacement project has been created. [The registry](../series/README.md) has no works; test characters and the hotel premise remain proposals.

The next work requires 5–7 substantial investigation chapters. The entire proposed movable-wall reasoning sequence is approximately one chapter, not the entire game's architecture. Detailed truth/player-reasoning design, non-code walkthroughs, and full Korean script drafting/revision precede implementation.

Author-facing MD is English; actual screenplay dialogue, action directions, choices, hints, evidence originals, game UI, and user communication are Korean. Preserve exact Korean source wording where voice or logic depends on it.

## Document map

| Document | Authoritative responsibility |
|---|---|
| [00 Production](00-production-principles.md) | Scope, chapter depth, full production sequence |
| [01 Case logic](01-case-logic.md) | Truth, alternatives, proof, disclosure, cross-chapter inference |
| [02 Challenges](02-interrogation-and-hints.md) | Interrogation, costs, preserved drafts, recovery, H0–H4 |
| [03 Space/events](03-space-and-events.md) | Physical geometry, travel, access, discovery, revisits and events |
| [04 Characters/script](04-characters-and-dialogue.md) | Child companion, eccentricity, introductions, Korean writing workflow |
| [05 UI](05-ui-and-investigation.md) | Scene default, modals, companion tools, evidence display, return/save/accessibility |
| [06 Visuals](06-visual-direction.md) | Observable evidence images, unique thumbnails, situation states |
| [07 Continuity](07-series-continuity.md) | New-series records, fact status, branches and later handoffs |
| [08 Quality](08-quality-gates.md) | All requirement IDs and scope-matched completion evidence |
| [09 Templates](09-project-templates.md) | Concrete project documents, script ownership, IDs and records |
| [Project instructions](templates/AGENTS.md) | Copy only when actual project planning begins |
| [Script handoff](script-handoff-format.md) | MD source packets, ChatGPT requests, returned screenplay/notes files and review |
| [Current decisions](current-direction.md) | Adopted direction, undecided content, current filesystem stage |
| [Restart handoff](restart-handoff-2026-09-12.md) | Requirement provenance and how the direction evolved |
| [Session request](restart-session-prompt.md) | A copyable full-production request with user file relay only |
| [Dialogue experiment](dialogue-experiment/README.md) | Provisional writing sources and prompts; not series canon |
| [Delivery audit](delivery-audit.md) | What this cleanup actually changed and verified |
| [Series registry](../series/README.md) | Real work membership and continuity sources |

Read all guides 00–09 for complete game production. For a scoped task, read 00, its subject and dependencies, 08, and the actual active project's sources. Current user directions always take precedence. Requirements tables point to their topic authorities; do not maintain divergent copies of the same rule.

## Storage and creation

```text
AGENTS.md                     workspace instructions
 design-guide/                common rules, decisions, templates and experiments
 series/                      registry, bible and real future case records
 reusable-assets/             optional generic art, selected only after design
 project_01/                  future reused path; currently absent
   AGENTS.md                  create with actual new-project planning
   game-plan/                 substantive new facts and Korean scripts
```

Common-document cleanup does not create a blank project or game scaffold. On starting the new work, reuse `project_01` only as a name: create new instructions and substantive planning, not copies of discarded content. Do not inspect the old tree or Git history for creative material. The optional generic asset directory does not choose the premise or characters.

**Required** rules define necessary behavior and quality. **Planning floors** help catch missing coverage but never prove adequate depth. **Examples/test fixtures** are not canon. **Undecided** facts must remain undecided until actually designed. No old numeric quota constrains the new game's content.

Most planning and all SPOILERS records are author-facing. Never expose their truth ledger directly as player knowledge. Use the full requirement matrix and actual evidence before reporting completion.
