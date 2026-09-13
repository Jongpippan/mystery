# PR-B01 r01 intake and v2 export checks

Date:2026-09-12. Actual Python3 checks on delivered files, source correction, preserved v1 and new v2 export.

- Actual r01 coverage: five expected scenes,113 unique allocated spoken IDs, exactly four assigned speakers.
- Actual r01 branches: four assigned options, two resolvable merges and both B_PR_01 callbacks; this checks Markdown structure, not runtime branch execution.
- All three r01 evidence-original blocks match the local v1 brief exactly after joining line breaks; E02→E03→E01 order correct.
- Authoritative E02 particle repaired in plan-v1.1; the r01 Korean block was already correct and stays unchanged.
- Both received r01 originals unchanged byte-for-byte; v2 candidate copies exactly match.
- Relayed v1 ZIP matches the previous recorded hash; all five v1 loose sources match their archived bytes. Historical typo left intact there.
- v2 source fingerprints:16 current source/review/candidate inputs verified.
- v2 ZIP: exactly eight expected UTF-8 Markdown files, CRC valid, bytes equal loose sources.
- Local Markdown links checked in review/index/revision packet: 11; targets exist. Exported instructions need no repository navigation.
- Editorial verdict remains revision requested for R01–R08. No accepted-script file, runtime, build or independent reader result is created by passing these narrow checks.

Current ZIP SHA-256: `e89b32e303fd87429a616f240c85460554ebc2f43daea31ed20c1327fd440128`.

Verdict: PASS for receipt/structure/preservation/export integrity only. For actual Korean editorial findings and revision acceptance criteria, see[review](pr-b01-r01-review.md). Full G0 and all implementation/visual/play gates remain incomplete.

Preparation note: one multi-file patch failed because an index sentence continued on the same line; inspection confirmed no partial request/index changes, then the request and index were written separately. This was an editing-tool failure, not a draft/game test failure.

Repository check: `git diff --check` exited0. Existing `.DS_Store` changes and the unrelated untracked dialogue-experiment ZIP were left untouched; no commit or external message was sent.
