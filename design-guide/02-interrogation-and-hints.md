# 02. Interrogation, choices, points, recovery, and hints

## Evidence-based conversation

Distinguish free questions and clarification from committed logical challenges. Let the player connect **target statement → evidence → reason for contradiction** before submitting. Randomly throwing items at a speaker is not the intended reasoning.

Successful interrogation must unlock core information for the first time, with real downstream deductions and events. Distribute these across the substantial chapters; the planning floor is at least two such unlocks involving different people, not an adequate full-game content budget. Do not give the same knowledge automatically elsewhere first. All prerequisites must be available before the challenge, and failure must not permanently close its essential information.

For each Q record target P, original S/version, prerequisite E/K, accepted evidence combinations and logic, plausible error classes, cost, new E/K, corrected S, follow-up V/D, hint bundle, and retry point. Retain original and corrected testimony with the correction's cause, time, and source.

## Submission flow

```text
Prerequisites and target statement available
→ free clarification
→ draft statement/evidence/reason selections
→ visible submission cost
→ success: correction + new information + world/relationship response
→ failure: specific feedback + one point deduction + retained draft for revision
```

Write the protagonist's chosen claim and the other person's concrete response as actual Korean dialogue. Log only the branch taken. Do not replace these with a result label.

| Choice type | Judgment |
|---|---|
| Logical claim | Right/wrong from available facts; display any error cost before submission |
| Approach strategy | Changes access order, method, or relationships; not automatically a logical mistake |
| Personality/relationship | No correct-answer label or point penalty; preserve character and later consequences |

Do not ask players to guess an unknown person's preferred tone as a logic quiz. Different approaches may change the route to information, not past truth.

## Point policy

The name, maximum/start value, costs, rewards, and recovery values are project decisions. No old game's numbers are binding. A project must write and verify a complete policy with these invariants:

- Reading, comparing, maps, people, dialogue, notes, general questions, clarification, hints, draft changes, and cancellation are free.
- An explicitly submitted incorrect challenge, evidence claim, or logical conclusion incurs the displayed cost.
- Block incomplete UI input before submission without a penalty. Do not charge separately for multiple errors within one submission.
- One input event cannot charge twice. A later intentional resubmission is a new attempt.
- Show current points and anticipated loss clearly. Attach an appropriate in-world response.
- If success rewards or chapter replenishment are used, apply them once per stable completion ID. Replaying a success or chapter does not farm recovery.
- The default game retains meaningful error costs. An optional easy mode cannot erase this requirement from the default.

## Zero points and retry

At zero, pause the current challenge for an intelligible recovery interaction. Keep evidence, notes, proven knowledge, relationships, dialogue, and the **editable answer draft**. Preserve useful error feedback so the player can correct the failed premise. A failed draft is not a proven proposition.

Recovery returns enough points to retry and resumes the unresolved task. It is repeatable without limit, does not restart the case, silently reset the answer, invent knowledge, or change truth. Any explicit user-requested clear action is separate from recovery. Hints may be offered after repeated failure but open only on request. Using them must not create a bad ending or relationship punishment.

## H0–H4 hints

Every required D/Q and mandatory revisit bottleneck needs actual Korean hints, selected by task ID, held facts, available places, and recent failure reason.

| Stage | Function |
|---|---|
| H0 | A currently possible investigation action |
| H1 | The contradiction or feature worth attending to |
| H2 | Specific available records, statements, or routes to compare |
| H3 | How to connect them |
| H4 | Explicit current solution, valid selections, and reasoning |

When evidence is missing, guide acquisition; when possessed, guide comparison. Do not disclose future titles, unseen suspects, or later solutions in early hints. H4 must actually release the current bottleneck, not repeat vague encouragement. Ordinary companion dialogue must not automatically recite these answers.

## Persistence and checks

Persist points, first-success/replenishment IDs, processed submission IDs, failures, hint stage, statement versions, task, and draft. Save/resume at failure, zero, recovery, and success must not repeat deductions, rewards, or unlocks. Specify atomic transitions in the project's implementation design.

Run the actual path: wrong claim → displayed loss → free tool inspection → another failure → zero → preserved draft and records → recovery → requested hint → correct challenge → genuinely new core information → downstream task. Verify logical vs relationship costs, duplicate input, valid alternate evidence sets, and all answer types. See [UI return rules](05-ui-and-investigation.md).
