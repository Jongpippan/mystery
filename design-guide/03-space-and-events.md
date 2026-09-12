# 03. Physical space, revisits, and events

## One spatial model

Use a coherent floor plan for spatial reasoning, not a set of arbitrarily arranged room cards. Define floors, doors, corridors, stairs, windows, locks, alternative routes, line of sight, sound propagation, object dimensions, carrying requirements, and access rights wherever relevant.

The map, observation view, exits, and movement data must agree. Show adjacent reachable places in their actual directions in the scene and allow explicit movement through their connections. Do not pass through walls or unopened routes. Establish whether a map is to scale; a schematic cannot imply travel duration from line length, so give sourced time ranges where needed. Support zoom and understanding the whole building/site.

| Route field | Content |
|---|---|
| Endpoints, floor, direction | Include one-way/two-way behavior |
| Distance or travel interval | Walking, carrying, stairs, and other conditions |
| Access | Keys, authority, locks, event/time restrictions |
| Observation | Who can see or hear what from where |
| Object constraints | Width, height, carrying people, work and waiting |
| Player source | Plan, measurement, experiment, or attributed testimony |

Check travel + opening/work + waiting/observation intervals for both the real path and competing routes. Separate actual geometry from what the player has learned; never secretly change the past to match their theory.

## Progressive access and encounter

Places open for situational reasons: permission, introductions, completed work, discovered routes, or consequences of actions. Do not expose every location at the beginning. Explain currently known restrictions without listing secret places. Character records unlock only after meeting the person. A meaningful encounter establishes their role, current activity, relationship, and reason for being there.

Display confirmed or last-observed positions with their observation time/source. Do not track NPCs live without an in-world basis. Map inspection and historical reconstruction are separate from explicit travel. Reading tools does not advance time or move the player.

## A place's life

For each major location write first visit → cause of change → revisit → later reinterpretation. Plan meaningful changes in at least three major locations as an initial coverage floor, and expand to support the full chapter architecture.

Changes may come from purposeful NPC movement, work, repair, delivery, a reply to a request, changed lighting/sound, a new way to inspect an old trace, or consequences of player choices. Specify who did what, when, why it was absent/unreadable before, and what remains. A chapter number alone cannot generate an answer document.

Every essential change needs a discoverable route: an appointment or normal activity, observable signs, dialogue, or state-aware hints. Do not require blind re-clicking of all rooms. Essential events must wait or have a recovery/discovery route if missed; optional events must not own the only proof of a required conclusion. Preserve an explanation for traces remaining after world changes.

## Event record

```text
V ID / actual cause / prerequisite E, K, and choices
Eligible location and story time / trigger / blocker / priority
World change / how and when the player discovers it
Scene and dialogue IDs / image A / new E, K, S
Character and route changes / once-only effects
Start, end, and return state / missed-event alternative
Pending, running, completed state / save-resume position
```

World change and discovery are different events: arriving after transport does not make the player its eyewitness. Handle simultaneous events with explicit ordering so scenes do not overwrite each other. Evidence acquired during them follows the immediate-view queue in [05](05-ui-and-investigation.md).

## Scenes and tempo

Each chapter needs multiple major events plus investigation and relationship reactions. Two or three major events can be an initial scheduling check, never a ceiling or proof of adequate content. An event changes information, relationships, access, goals, or danger; an acquisition notification is not a major scene.

Make introductions, departures, meetings, requests, mistakes, experiments, confrontations, and aftermath actual scenes. Use natural causes and in-world signs for next actions rather than characters announcing software state. Put necessary controls and costs clearly in the UI.

Show important events in the main scene with meaningful situation images and before/after reactions. Let the player acknowledge important visual changes. Default story time follows actions and events, not reading speed. If a timed mechanic is chosen, define reading/tool behavior and recovery explicitly.

Save/resume during an event restores the scene and line without duplicate evidence, reward, or movement. On completion, return to the location image matching the actual new world state.
