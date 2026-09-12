# 05. Scene-first UI and investigation flow

## Default screen and tools

The **scene is the default screen**. Evidence, people, map, dialogue history, and deduction open as modal tools over the current investigation context. The right-hand companion area holds the companion, current understood objective, notes, and settings. The objective's **추리하기** button opens a spacious deduction modal; deduction is not confined to a sidebar workspace.

Small-screen layouts may reposition controls but must retain equivalent access. A modal needs accessible controls inside the active interaction surface; buttons visible behind an inert overlay do not count as usable. Preserve Radix dialog behavior and semantic controls when implementing with shadcn/ui and Tailwind.

Show the current chapter title and understood context. Reveal an objective only after arrival, relationships/situation, problem recognition, and the formation of a question make it intelligible. Apply that order to later chapters too. Names or summaries must not reveal future conclusions.

## Acquiring and understanding evidence

On acquisition, open the evidence's actual detail and image once, then return to the correct scene/line when closed. A toast is insufficient. Define ordering for multiple acquisitions and simultaneous events, with pending/current/completed acknowledgement state for save/resume. Do not replay completed popups or skip unacknowledged evidence when loading. Keep every acquired item available for later inspection.

Evidence should be visually informative, with readable original text, measurements, damage, layout, and features. Supply enough context to understand an unfamiliar object's purpose, appearance, present state, and role through images, demonstrations, and dialogue. Keep detail text focused; do not remove necessary explanation just to make a panel short. See [visual guidance](06-visual-direction.md).

## Compact, distinguishable lists

Reduce excessive card height, decoration, portraits, and whitespace rather than shrinking text. These are design starting points, not absolute layout requirements:

| Element | Starting point |
|---|---|
| Evidence/person row | About 64–88 CSS px, grows with content |
| Evidence thumbnail | 48–64 px, unique visual identity |
| List portrait | 40–56 px; dialogue portraits must be substantially more legible |
| Internal spacing | Around 8–12 px |
| Body text | Around 16 px with enlargement support |
| Main touch target | Aim for at least 44×44 px |

At 1440×900, initially aim to compare eight evidence items or six known people within the list area rather than two giant cards. At 390×844, use readable single-column flow without horizontal overflow. Enlargement takes priority over fitting an item quota.

Give every item its own meaningful thumbnail, not a duplicated icon with a new number/color. Provide search, combined type/person/place filters, and acquisition/story-time sorting. Do not leak unacquired titles, images, counts, people, or secret places through filters, empty slots, or previews.

## People and dialogue presentation

Register a person only after meeting them. People detail contains the known introduction, actual heard statements with time/place and log links, original/corrected versions, confirmed actions vs claims vs uncertain gaps, related acquired evidence, and observed relationships. Link each timeline entry to its source. Do not display author-only schedules, guilt, secrets, or unsourced live location.

Dialogue portraits must be large enough to recognize the speaker and expression; list portrait dimensions are not dialogue dimensions. Action directions use **the same text size as dialogue, a different readable color, and italics**. Preserve adequate contrast at enlarged text and mobile sizes. Do not rely on color alone to convey status or meaning.

Support player name entry while keeping the protagonist's stable identity. Use the chosen display name in actual lines and records where appropriate. A choice results in a real protagonist utterance and specific response, not only a result message.

Dialogue history follows **type group → conversation list → full conversation**. Include ordinary investigation, interrogation, companion, NPC events, personal scenes, and endings as relevant. Search by type, speaker, and keyword. Show participants, location, time, actual selections/responses, correction links, and acquired information. Do not include unchosen branches or make each utterance its own list card. Label old conversations as historical rather than new current testimony.

## Every answer type retains all investigation tools

For interrogation, evidence presentation, person selection, evidence linking, time ordering, and final reconstruction, allow evidence, people, map, dialogue, and notes inspection, then return to the **same answer draft**. Provide reachable navigation in the deduction modal and a defined return stack. Avoid inaccessible nested dialogs and background-focus escapes. A single evidence-picker shortcut is insufficient.

Preserve task ID, step, selected people/statements/items, evidence order, time-card arrangement, text/notes, search/filter/sort, scroll positions, focus, points, and hint stage. Keep relevant drafts and conversation/event positions in saves. Closing deduction suspends the draft rather than discarding it. An explicit clear action is separate.

A representative path is evidence detail → related person → corrected statement → old conversation → map → answer. It must neither submit the answer nor cost points, advance time, or move the player. Map travel requires an explicit separate action; map inspection remains available even if travel is restricted during a task.

Distinguish **view details** from **select as evidence**. Show selected count and deselection; do not silently replace an earlier item when a limit is reached. Explain incomplete input before submission without a penalty.

## Navigation, accessibility, and resume

Opening a modal moves focus appropriately. Close, Esc, and Back return to the correct layer and its prior scroll/filter/focus; Esc closes the active inspection surface first and does not erase the underlying answer. Maintain semantic buttons/links, accessible names, focus containment, keyboard and touch access, readable contrast, and text enlargement. Notes and settings must remain usable from the companion area or its responsive equivalent.

When closing evidence detail, return to the prior list or acquisition scene as appropriate. After hints, recover the edited answer and focus. Save/resume during dialogue, events, error feedback, zero points, recovery, and answer editing must resume intelligibly without duplicate effects.

Test all answer types and the acquisition queue with long Korean titles, multiple filters, large text, keyboard-only input, touch, small screens, and saved drafts. Actual rendered behavior is required evidence; a screenshot of visible but disabled controls is not sufficient.
