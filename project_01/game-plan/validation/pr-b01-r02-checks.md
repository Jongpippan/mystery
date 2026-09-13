# PR-B01 r02 — actual mechanical checks

Date: 2026-09-12. Method: local Python 3 pathlib/re/hashlib/zipfile assertions against actual UTF-8 files, not the writer's reported checks. All assertions passed.

- Original r01/r02 screenplay and note hashes match the recorded received bytes.
- Historical v1/v2 archives match recorded SHA-256; CRC passes and every archived file equals its historical loose source.
- Spoken definitions: r01=113, r02=98, accepted=97; each has unique IDs. r02 introduces no IDs; acceptance retires only S_PR_03_0019.
- Candidate and accepted: exactly C_PR_01..05; all four relationship option keys, both merges, and ordered E02/E03/E01 sections remain. All three evidence sections are byte-identical between r02 and acceptance. Correct display-name self-introduction and E02 wording are present.
- The accepted source fingerprint matches the three local changes recorded in the editorial review. Conditional callbacks and all four combined choice paths were read editorially; they were not executed in a runtime.

## Retired IDs

r01 → r02: `S_PR_01_0010`, `S_PR_01_0011`, `S_PR_01_0012`, `S_PR_01_0013`, `S_PR_02_0034`, `S_PR_02_0035`, `S_PR_03_0017`, `S_PR_03_0018`, `S_PR_05_0015`, `S_PR_05_0016`, `S_PR_05_0017`, `S_PR_05_0018`, `S_PR_05_0020`, `S_PR_05_0022`, `S_PR_05_0023`.

r02 → accepted: `S_PR_03_0019`.

## Preserved source fingerprints

| File | SHA-256 |
|---|---|
| `script-pr-b01-r01.ko.md` | `e0cf33b7d38a73bfcdb057441cffe4734d8eb49752e657277f65ce16b2e498e4` |
| `script-pr-b01-r01.notes.md` | `1ae6d7aa4833e5188032e09e7d37370e3acf5324f28abf3bae9ca1bd8d35fad7` |
| `script-pr-b01-r02.ko.md` | `af778a456ae2db0f6a830542a88504697a22b80ed2d65a2b94786d1cf764453c` |
| `script-pr-b01-r02.notes.md` | `b7f427229812156a6f4fe19df8751a8dab7b7968903e89d7d6921f46e19abeaf` |
| `YEOWUL-PR-B01-v1.zip` | `04bf7f3fd750cd33456d16c6b4c3d0e65f81bed6722ad40f228e776f8d9ede5a` |
| `YEOWUL-PR-B01-v2.zip` | `e89b32e303fd87429a616f240c85460554ebc2f43daea31ed20c1327fd440128` |
| `scripts/pr-b01.ko.md` | `fa68fb03126949332878567a521044667129b99a340ee4b2d1c727fa44fead45` |

No game lint/build, branch execution, rendered visuals or independent reading/playtest exists. These checks establish source preservation and narrow structural consistency only.
